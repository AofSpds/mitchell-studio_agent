import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { digest, PlanError, validatePlan, validateBatch } from './validator.mjs';
import { Workflow, STAGES, SimulatedInterruption, kstNow } from './workflow.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const fixtures = JSON.parse(readFileSync(path.join(ROOT, 'fixtures.json'), 'utf8'));
const plans = fixtures.valid.map(item => item.plan);
const quotePS = text => `'${text.replaceAll("'", "''")}'`;
const script = path.relative(process.cwd(), fileURLToPath(import.meta.url)).split(path.sep).join('/');
const lines = [
  'T01 편집표·단계 기록 연구 모형 — 실제 실행 결과',
  `명령: & ${quotePS(process.execPath)} ${quotePS(script)}`,
  `실행기: ${process.version}`,
  `시작: ${kstNow()}`,
  '범위: 합성 JSON·Node 내장 기능·단일 프로세스·상태 파일 다시 읽기; 영상/청구/외부 호출 없음'
];
const runtime = mkdtempSync(path.join(ROOT, '.run-state-'));
let passed = 0;
let failed = 0;
let stateNumber = 0;
const started = performance.now();
const metrics = { valid: 0, invalid: 0, interruptions: 0, resumes: 0, completedExtra: 0, mixed: 0 };
const say = text => lines.push(text);

function test(name, fn) {
  try {
    fn();
    passed++;
    say(`통과 ${name}`);
  } catch (error) {
    failed++;
    say(`실패 ${name}: ${error.stack}`);
  }
}

function fresh() {
  return new Workflow(path.join(runtime, `state-${++stateNumber}.json`), plans);
}

function approve(flow, jobId, approvalId = `approval_${jobId}`) {
  const job = flow.snapshot().jobs[jobId];
  return flow.approve({ jobId, revision: job.plan.revision, planHash: job.planHash, approvalId });
}

function count(flow, event, jobId, stage) {
  return flow.snapshot().events.filter(item => item.event === event
    && (!jobId || item.jobId === jobId) && (!stage || item.stage === stage)).length;
}

function finishedCounts(flow, jobId) {
  const job = flow.snapshot().jobs[jobId];
  return Object.fromEntries(STAGES.filter(stage => job.stages[stage].status === 'done')
    .map(stage => [stage, count(flow, 'execute', jobId, stage)]));
}

function unchangedFinished(flow, jobId, before) {
  for (const [stage, executions] of Object.entries(before)) {
    const extra = count(flow, 'execute', jobId, stage) - executions;
    metrics.completedExtra += extra;
    assert.equal(extra, 0, `${stage} 완료 뒤 추가 실행`);
  }
}

function audit(name, flow) {
  for (const event of flow.snapshot().events) say(`기록 ${name} ${JSON.stringify(event)}`);
}

try {
  test('F00 표본 수와 서로 다른 거부 까닭', () => {
    assert.equal(fixtures.valid.length, 3);
    assert.equal(fixtures.invalid.length, 10);
    assert.equal(new Set(fixtures.invalid.map(item => item.expectedCode)).size, 10);
    assert.equal(validateBatch(plans).length, 3);
  });

  for (const item of fixtures.valid) test(`${item.caseId} 정상 편집표`, () => {
    const result = validatePlan(item.plan);
    assert.equal(result.jobId, item.plan.jobId);
    assert.ok(result.durationMs > 0);
    metrics.valid++;
    say(`근거 ${item.caseId} job=${result.jobId} durationMs=${result.durationMs} hash=${result.planHash}`);
  });

  for (const item of fixtures.invalid) test(`${item.caseId} ${item.reason}`, () => {
    assert.throws(() => validatePlan(item.plan, new Set(item.existingJobIds ?? [])), error => {
      assert.ok(error instanceof PlanError);
      assert.equal(error.code, item.expectedCode);
      say(`근거 ${item.caseId} expected=${item.expectedCode} actual=${error.code} detail=${error.message}`);
      return true;
    });
    metrics.invalid++;
  });

  test('W01 같은 승인 두 번·새 승인 번호의 반복', () => {
    let flow = fresh();
    assert.equal(approve(flow, 'job_a'), 'approved');
    flow = new Workflow(flow.file);
    assert.equal(approve(flow, 'job_a'), 'duplicate');
    assert.equal(approve(flow, 'job_a', 'approval_again'), 'already_approved');
    assert.equal(count(flow, 'approved', 'job_a'), 1);
    assert.equal(count(flow, 'execute', 'job_a'), 0);
    flow.runToEnd('job_a');
    const before = finishedCounts(flow, 'job_a');
    assert.equal(approve(flow, 'job_a'), 'duplicate');
    flow.runToEnd('job_a');
    unchangedFinished(flow, 'job_a', before);
    assert.equal(count(flow, 'execute', 'job_a'), 3);
    say('근거 W01 동일 승인 2회 → 승인 저장 1회; 다른 승인 번호 반복도 추가 승인 0; 완료 뒤 재요청 추가 실행 0');
  });

  test('W02 승인 전 실행·다른 판과 표 해시의 승인 거부', () => {
    const flow = fresh();
    const job = flow.snapshot().jobs.job_a;
    assert.throws(() => flow.next('job_a'), /NOT_APPROVED/);
    assert.throws(() => flow.approve({ jobId: 'job_a', revision: 2, planHash: job.planHash, approvalId: 'wrong_rev' }), /APPROVAL_PLAN_MISMATCH/);
    const changed = structuredClone(job.plan);
    changed.scenes[0].caption = '가상 바뀐 문구';
    assert.throws(() => flow.approve({ jobId: 'job_a', revision: 1, planHash: digest(changed), approvalId: 'wrong_hash' }), /APPROVAL_PLAN_MISMATCH/);
    assert.equal(count(flow, 'execute'), 0);
    say('근거 W02 미승인·다른 판·같은 판의 바뀐 내용 3건 거부; 실행 0');
  });

  test('W03 중단 2회·파일 재읽기 재개 2회', () => {
    let flow = fresh();
    approve(flow, 'job_a');
    for (let interruption = 1; interruption <= 2; interruption++) {
      assert.throws(() => flow.runToEnd('job_a', { interruptAfter: 1 }), SimulatedInterruption);
      metrics.interruptions++;
      const before = finishedCounts(flow, 'job_a');
      assert.equal(Object.keys(before).length, interruption);
      const file = flow.file;
      flow = new Workflow(file);
      metrics.resumes++;
      // 다음 단계의 요청만 만들고, 완료는 다음 회차에서 처리한다.
      const request = flow.next('job_a');
      assert.equal(request.stage, STAGES[interruption]);
      unchangedFinished(flow, 'job_a', before);
      say(`근거 W03 재개${interruption} 이전완료=${JSON.stringify(before)} 다음=${request.stage} 완료단계추가실행=0`);
    }
    const before = finishedCounts(flow, 'job_a');
    flow.runToEnd('job_a');
    unchangedFinished(flow, 'job_a', before);
    assert.deepEqual(finishedCounts(flow, 'job_a'), { edit: 1, captions: 1, final_marker: 1 });
    assert.equal(count(flow, 'simulated_interruption'), 2);
    say('근거 W03 중단=2 재개=2 최종실행={"edit":1,"captions":1,"final_marker":1} 완료단계추가실행=0');
    audit('W03', flow);
  });

  test('W04 늦은 응답·중복 응답·판이 다른 응답', () => {
    let flow = fresh();
    approve(flow, 'job_a');
    const oldRequest = flow.next('job_a');
    const oldOutput = flow.mockOutput(oldRequest);
    const current = flow.retry('job_a');
    assert.equal(current.attempt, 2);
    assert.notEqual(current.requestId, oldRequest.requestId);
    flow = new Workflow(flow.file);
    assert.equal(flow.finish(oldRequest, oldOutput), 'stale');
    assert.equal(flow.snapshot().jobs.job_a.stages.edit.status, 'running');
    assert.equal(flow.finish({ ...current, revision: 99 }, flow.mockOutput(current)), 'mismatch');
    const output = flow.mockOutput(current);
    assert.equal(flow.finish(current, output), 'accepted');
    const accepted = flow.snapshot().jobs.job_a.stages.edit;
    assert.equal(flow.finish(oldRequest, oldOutput), 'stale');
    assert.equal(flow.finish(current, output), 'duplicate');
    assert.deepEqual(flow.snapshot().jobs.job_a.stages.edit, accepted);
    const before = finishedCounts(flow, 'job_a');
    flow.runToEnd('job_a');
    unchangedFinished(flow, 'job_a', before);
    assert.equal(count(flow, 'completed', 'job_a', 'edit'), 1);
    assert.equal(count(flow, 'execute', 'job_a', 'edit'), 2);
    say('근거 W04 이전응답=stale(새응답 전/후) 중복=duplicate 다른판=mismatch; 미완료재시도=1 완료뒤추가실행=0');
    audit('W04', flow);
  });

  test('W05 3작업 교차 실행·역순 응답·자막 섞기 거부', () => {
    let flow = fresh();
    for (const plan of plans) approve(flow, plan.jobId);
    let rejectedMix = 0;
    for (const stage of STAGES) {
      const requests = plans.map(plan => flow.next(plan.jobId));
      assert.ok(requests.every(request => request.stage === stage));
      assert.equal(flow.finish(requests[0], flow.mockOutput(requests[1])), 'output_mismatch');
      rejectedMix++;
      const mixedCaption = flow.mockOutput(requests[0]);
      mixedCaption.captions = flow.mockOutput(requests[1]).captions;
      assert.equal(flow.finish(requests[0], mixedCaption), 'output_mismatch');
      rejectedMix++;
      assert.equal(flow.finish({ ...requests[0], jobId: 'job_b' }, flow.mockOutput(requests[1])), 'mismatch');
      rejectedMix++;
      for (const request of requests.toReversed()) {
        assert.equal(flow.finish(request, flow.mockOutput(request)), 'accepted');
      }
      flow = new Workflow(flow.file);
    }
    for (const plan of plans) {
      const job = flow.snapshot().jobs[plan.jobId];
      for (const stage of STAGES) {
        const slot = job.stages[stage];
        const mixed = slot.output.jobId !== plan.jobId || slot.output.planHash !== digest(plan)
          || JSON.stringify(slot.output.captions) !== JSON.stringify(plan.scenes.map(scene => scene.caption));
        metrics.mixed += Number(mixed);
        assert.equal(mixed, false);
        assert.equal(slot.status, 'done');
        assert.equal(count(flow, 'execute', plan.jobId, stage), 1);
      }
    }
    assert.equal(rejectedMix, 9);
    assert.equal(metrics.mixed, 0);
    say(`근거 W05 3작업×3단계 결과=9; 섞인 응답/자막/작업번호 주입 거부=${rejectedMix}; 저장된 작업 섞임=${metrics.mixed}; 실행=9`);
  });

  test('W06 응답 대기 중 재개는 새 실행을 만들지 않음', () => {
    let flow = fresh();
    approve(flow, 'job_a');
    const request = flow.next('job_a');
    flow = new Workflow(flow.file);
    assert.deepEqual(flow.next('job_a'), request);
    assert.equal(count(flow, 'execute', 'job_a', 'edit'), 1);
    assert.equal(flow.finish(request, flow.mockOutput(request)), 'accepted');
    flow.runToEnd('job_a');
    assert.equal(count(flow, 'execute', 'job_a'), 3);
    say('근거 W06 응답 대기 상태를 파일에서 복원; 기존 요청 UUID 유지; 재개 자체의 새 실행=0');
  });
} finally {
  // 삭제 대상은 직접 만든 이 폴더의 자식인지 절대 경로로 확인한다.
  const target = path.resolve(runtime);
  assert.equal(path.dirname(target), ROOT);
  assert.ok(path.basename(target).startsWith('.run-state-'));
  rmSync(target, { recursive: true });
  say(`측정 합계: ${JSON.stringify(metrics)}`);
  say(`결과: 통과 ${passed} / 실패 ${failed} / 전체 ${passed + failed}`);
  say(`종료: ${kstNow()}`);
  say(`경과: ${(performance.now() - started).toFixed(1)} ms`);
  say('한계: 저장 직후의 모의 예외이며 실제 강제 종료 아님; 실제 영상·청구·외부 응답·저장 손상·다중 컴퓨터 미검증');
  writeFileSync(path.join(ROOT, 'results.txt'), lines.join('\n') + '\n', 'utf8');
  process.stdout.write(lines.join('\n') + '\n');
  process.exitCode = failed ? 1 : 0;
}
