import { readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { here, work, sourceWork, config, stage, log, ffmpegCalls, mediaProbeCalls } from './common.mjs';
import { renderPlan } from './renderer.mjs';
import { validatePlan } from './validator.mjs';

const exists = async target => {
  try { await access(target); return true; } catch (error) { if (error.code === 'ENOENT') return false; throw error; }
};
await stage('PREFLIGHT', async checks => {
  const tools = await config(), plan = JSON.parse(await readFile(path.join(here, 'edit-plan.json'), 'utf8'));
  const good = await validatePlan(plan, tools.ffprobe);
  await checks.check('valid seven-scene edit plan', good.durationMs === 22000 && good.frames === 660);
  const cases = [];
  const tooMany = structuredClone(plan);
  tooMany.scenes[0].caption = '첫째 줄\n둘째 줄\n셋째 줄\n넷째 줄\n다섯째 줄\n여섯째 줄';
  cases.push({ name: 'caption_lines', plan: tooMany, expected: 'CAPTION_LINE_LIMIT', caption: true });
  const unsafe = structuredClone(plan);
  unsafe.output.captionSafeArea.top = 1150;
  cases.push({ name: 'caption_safe_area', plan: unsafe, expected: 'CAPTION_OUTSIDE_SAFE_AREA', caption: true });
  const range = structuredClone(plan);
  range.scenes[2].sourceInMs = 7500;
  cases.push({ name: 'source_range', plan: range, expected: 'SOURCE_RANGE' });
  const missing = structuredClone(plan);
  missing.assets[0].path = path.join(sourceWork, 'assets', 'nonexistent.png');
  cases.push({ name: 'missing_asset', plan: missing, expected: 'MISSING_ASSET_FILE' });
  for (const test of cases) {
    await writeFile(path.join(work, `invalid_${test.name}.json`), JSON.stringify(test.plan, null, 2), { encoding: 'utf8', flag: 'wx' });
    const calls = ffmpegCalls.count, probes = mediaProbeCalls.count, runName = `run_invalid_${test.name}`;
    let rejected;
    try { await renderPlan(test.plan, tools, runName); } catch (error) {
      // A permission failure is a real stop, never an expected invalid-plan rejection.
      if (['EPERM', 'EACCES'].includes(error.code)) throw error;
      rejected = error;
    }
    await log(`EXPECTED_REJECTION ${JSON.stringify({ name: test.name, code: rejected?.code, reason: rejected?.message })}`);
    await checks.check(`${test.name} rejected before FFmpeg, folder or output`, rejected?.code === test.expected && calls === ffmpegCalls.count && !(await exists(path.join(work, runName))) && !(await exists(path.join(work, `${runName}.mp4`))));
    if (test.caption) await checks.check(`${test.name} rejected before ffprobe too`, probes === mediaProbeCalls.count);
  }
  for (const edge of ['top', 'bottom']) {
    const invalid = structuredClone(plan);
    invalid.output.captionSafeArea[edge] = edge === 'top' ? 1150 : 1400;
    const calls = ffmpegCalls.count, probes = mediaProbeCalls.count;
    let rejected;
    try { await validatePlan(invalid, tools.ffprobe); } catch (error) {
      if (['EPERM', 'EACCES'].includes(error.code)) throw error;
      rejected = error;
    }
    await log(`EXPECTED_REJECTION ${edge} ${rejected?.message}`);
    await checks.check(`safe margin ${edge} obeyed before media processes`, rejected?.code === 'CAPTION_OUTSIDE_SAFE_AREA' && calls === ffmpegCalls.count && probes === mediaProbeCalls.count);
  }
});
