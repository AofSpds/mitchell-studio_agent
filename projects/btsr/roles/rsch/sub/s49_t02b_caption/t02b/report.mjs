import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { here, work, log, kst } from './common.mjs';

const now = await kst();
const fullLog = await readFile(path.join(here, 'results.txt'), 'utf8');
const current = fullLog.split('=== S48 CONFIGURATION ===').at(-1);
const history = [...current.matchAll(/^=== (PLAN|PREPARE|PREFLIGHT|RENDER|VERIFY) ===\n([\s\S]*?)(?=^=== |$(?![\s\S]))/gm)].map(m => {
  const result = m[2].match(/^STAGE_SUMMARY \w+ (\{.*\})$/m);
  if (!result) throw new Error(`Incomplete stage: ${m[1]}`);
  return { name: m[1], ...JSON.parse(result[1]), stop: m[2].match(/^STAGE_STOP .*$/m)?.[0] ?? null };
});
const stages = ['PLAN', 'PREPARE', 'PREFLIGHT', 'RENDER', 'VERIFY'].map(name => {
  const latest = history.filter(s => s.name === name).at(-1);
  if (!latest || latest.fail || latest.stop) throw new Error(`Successful final stage missing: ${name}`);
  return latest;
});
const resolvedStops = history.filter(s => s.stop);
const expectedStop = "STAGE_STOP PREPARE Error: EPERM: operation not permitted, mkdir 'C:\\Users\\ms1pk\\dev\\mitchell-studio_t02\\work_t02b'";
if (history.some(s => s.fail) || resolvedStops.some(s => s.stop !== expectedStop)) throw new Error('Unresolved failure or unexpected stop; do not claim completion.');
const pass = stages.reduce((n, stage) => n + stage.pass, 0);
const fail = stages.reduce((n, stage) => n + stage.fail, 0);
const verification = JSON.parse(await readFile(path.join(work, 'verification.json'), 'utf8'));
const summary = { completedKst: now, pass, fail, stages, resolvedStops, priorTemporaryLayoutChecks: 25, totalHistoricalPass: (fullLog.match(/^PASS /gm) ?? []).length, ...verification };
await writeFile(path.join(work, 'summary.json'), JSON.stringify(summary, null, 2), { encoding: 'utf8', flag: 'wx' });
const readmePath = path.join(here, 'README.md');
let readme = await readFile(readmePath, 'utf8');
readme = readme.replace(/^상태:.*$/m, `상태: ${now} 완료. 최종 단계 검사 통과 ${pass} / 실패 ${fail}; 이전 임시 검사 25개·권한 중단 1건 별도 보존.`);
if (readme.split('\n').length > 80) throw new Error('README exceeds 80 lines');
await writeFile(readmePath, readme, 'utf8');
await log(`\nAUTHORIZED_PERMISSION_RETRY RSCH explicitly authorized the same prepare command with formal elevation. Reviewer allowed; original EPERM and its 4 completed checks remain in history.\nFINAL_MACHINE_SUMMARY ${JSON.stringify({ completedKst: now, pass, fail, stages, resolvedStops, output: verification.measured, frames: verification.frames })}`);
await log('PENDING RSCH direct scene-image judgement. No web, installation, new downloads, deletion, progress dashboard, commit or push during resumed S48 work.');
console.log(JSON.stringify({ completedKst: now, pass, fail, frames: verification.frames.length }));
