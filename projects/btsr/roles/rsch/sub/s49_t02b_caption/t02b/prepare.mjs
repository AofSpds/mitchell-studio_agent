import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { here, work, sourceCode, fontPath, stage, sha256, log, config, run } from './common.mjs';

await stage('PREPARE', async checks => {
  const plan = JSON.parse(await readFile(path.join(here, 'edit-plan.json'), 'utf8'));
  const assets = [];
  for (const asset of plan.assets) {
    const sha256Before = await sha256(asset.path);
    assets.push({ ...asset, sha256Before });
    await log(`ASSET_HASH_BEFORE ${JSON.stringify(assets.at(-1))}`);
    await checks.check(`${asset.assetId} source hash recorded`, /^[a-f0-9]{64}$/u.test(sha256Before), sha256Before);
  }
  const sourceHashes = [];
  for (const name of ['README.md', 'common.mjs', 'renderer.mjs', 'validator.mjs', 'render.mjs', 'verify.mjs', 'plan.mjs', 'edit-plan.json']) {
    const target = path.join(sourceCode, name);
    sourceHashes.push({ path: target, sha256Before: await sha256(target) });
  }
  await log(`T02_CODE_HASHES_BEFORE ${JSON.stringify(sourceHashes)}`);
  await log(`FONT_SHA256 ${await sha256(fontPath)}`);
  // Exclusive creation: never overwrite, reuse, clean, or remove an existing work directory.
  await mkdir(work);
  await writeFile(path.join(work, 'assets-before.json'), JSON.stringify(assets, null, 2), { encoding: 'utf8', flag: 'wx' });
  await writeFile(path.join(work, 'source-before.json'), JSON.stringify(sourceHashes, null, 2), { encoding: 'utf8', flag: 'wx' });
  await checks.check('new work_t02b directory exclusively created', true, work);
  const tools = await config();
  const version = (await run(tools.ffmpeg, ['-version'])).stdout.split(/\r?\n/u)[0];
  await log(`EXISTING_FFMPEG ${version}`);
  await checks.check('existing FFmpeg version readable', version.startsWith('ffmpeg version 9.1'), version);
});
