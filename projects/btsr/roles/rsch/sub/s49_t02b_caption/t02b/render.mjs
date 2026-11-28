import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config, work, here, stage } from './common.mjs';
import { renderPlan } from './renderer.mjs';

await stage('RENDER', async checks => {
  const tools = await config();
  const plan = JSON.parse(await readFile(path.join(here, 'edit-plan.json'), 'utf8'));
  const outputs = [];
  for (const runName of ['run_1', 'run_2']) {
    console.log(`Rendering ${runName}`);
    const result = await renderPlan(plan, tools, runName);
    outputs.push(result);
    await checks.check(`${runName} render process completed`, true, result.output);
    await checks.check(`${runName} long caption wrapped`, result.captions[1].wrapped.split('\n').length > 1, `${result.captions[1].wrapped.split('\n').length} lines`);
  }
  await checks.check('both renders use identical plan hash', outputs[0].planHash === outputs[1].planHash, outputs[0].planHash);
  await writeFile(path.join(work, 'render-outputs.json'), JSON.stringify(outputs, null, 2), { encoding: 'utf8', flag: 'wx' });
});
