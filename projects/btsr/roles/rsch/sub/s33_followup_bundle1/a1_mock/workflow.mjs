import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { canonical, digest, validateBatch } from './validator.mjs';

export const STAGES = ['edit', 'captions', 'final_marker'];
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const copy = value => structuredClone(value);
export const kstNow = () => new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
}).format(new Date()) + ' KST';

export class SimulatedInterruption extends Error {}

export class Workflow {
  constructor(file, initialPlans) {
    this.file = path.resolve(file);
    const relative = path.relative(ROOT, this.file);
    if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      throw new Error('상태 파일은 a1_mock 안에서만 쓴다');
    }
    if (initialPlans) {
      validateBatch(initialPlans);
      this.state = { schemaVersion: 1, jobs: {}, events: [] };
      for (const plan of initialPlans) {
        this.state.jobs[plan.jobId] = {
          plan: copy(plan), planHash: digest(plan), approval: null,
          stages: Object.fromEntries(STAGES.map(stage => [stage, {
            status: 'waiting', attempt: 0, request: null, output: null
          }]))
        };
      }
      this.save();
    } else {
      this.state = JSON.parse(readFileSync(this.file, 'utf8'));
    }
  }

  save() {
    writeFileSync(`${this.file}.tmp`, JSON.stringify(this.state, null, 2) + '\n', 'utf8');
    renameSync(`${this.file}.tmp`, this.file);
  }

  log(event, details = {}) {
    this.state.events.push({ seq: this.state.events.length + 1, atKst: kstNow(), event, ...copy(details) });
  }

  snapshot() { return copy(this.state); }

  job(jobId) {
    if (!Object.hasOwn(this.state.jobs, jobId)) throw new Error('UNKNOWN_JOB');
    return this.state.jobs[jobId];
  }

  approve({ jobId, revision, planHash, approvalId }) {
    const job = this.job(jobId);
    if (revision !== job.plan.revision || planHash !== job.planHash) throw new Error('APPROVAL_PLAN_MISMATCH');
    if (typeof approvalId !== 'string' || !approvalId) throw new Error('APPROVAL_ID');
    if (job.approval) {
      const status = job.approval.approvalId === approvalId ? 'duplicate' : 'already_approved';
      this.log('approval_ignored', { jobId, status });
      this.save();
      return status;
    }
    job.approval = { approvalId, revision, planHash, atKst: kstNow() };
    this.log('approved', { jobId, revision, planHash, approvalId });
    this.save();
    return 'approved';
  }

  next(jobId) {
    const job = this.job(jobId);
    if (!job.approval) throw new Error('NOT_APPROVED');
    const stage = STAGES.find(name => job.stages[name].status !== 'done');
    if (!stage) return null;
    const slot = job.stages[stage];
    if (slot.status === 'running') return copy(slot.request);
    return this.#begin(jobId, stage);
  }

  #begin(jobId, stage) {
    const job = this.job(jobId);
    const slot = job.stages[stage];
    slot.attempt++;
    slot.status = 'running';
    slot.request = {
      jobId, revision: job.plan.revision, planHash: job.planHash,
      stage, attempt: slot.attempt, requestId: randomUUID()
    };
    this.log('execute', slot.request);
    this.save();
    return copy(slot.request);
  }

  retry(jobId) {
    const job = this.job(jobId);
    const stage = STAGES.find(name => job.stages[name].status !== 'done');
    if (!stage || job.stages[stage].status !== 'running') throw new Error('NO_PENDING_ATTEMPT');
    this.log('superseded', job.stages[stage].request);
    return this.#begin(jobId, stage);
  }

  mockOutput(request) {
    const job = this.job(request.jobId);
    return {
      jobId: request.jobId, revision: request.revision, planHash: request.planHash,
      stage: request.stage, marker: '했음', captions: job.plan.scenes.map(scene => scene.caption)
    };
  }

  finish(request, output) {
    const reject = status => {
      this.log('response_ignored', { ...request, status });
      this.save();
      return status;
    };
    if (!Object.hasOwn(this.state.jobs, request.jobId)) return reject('mismatch');
    const job = this.job(request.jobId);
    if (!STAGES.includes(request.stage)) return reject('mismatch');
    const slot = job.stages[request.stage];
    if (request.planHash !== job.planHash || request.revision !== job.plan.revision) return reject('mismatch');
    if (!slot.request || canonical(request) !== canonical(slot.request)) return reject('stale');
    if (slot.status === 'done') return reject('duplicate');
    if (canonical(output) !== canonical(this.mockOutput(request))) return reject('output_mismatch');
    slot.output = copy(output);
    slot.status = 'done';
    this.log('completed', { ...request, outputHash: digest(output) });
    this.save();
    return 'accepted';
  }

  runToEnd(jobId, { interruptAfter = Infinity } = {}) {
    let completedThisCall = 0;
    for (let request = this.next(jobId); request; request = this.next(jobId)) {
      if (this.finish(request, this.mockOutput(request)) !== 'accepted') throw new Error('UNEXPECTED_RESPONSE');
      completedThisCall++;
      if (completedThisCall === interruptAfter) {
        this.log('simulated_interruption', { jobId, afterStage: request.stage });
        this.save();
        throw new SimulatedInterruption(`저장 뒤 중단: ${request.stage}`);
      }
    }
  }
}
