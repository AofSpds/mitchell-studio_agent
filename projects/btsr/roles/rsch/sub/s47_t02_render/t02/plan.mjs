import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config, work, here, log, stage } from './common.mjs';
import { validatePlan } from './validator.mjs';

await stage('PLAN', async checks => {
  const materials = JSON.parse(await readFile(path.join(work, 'assets-before.json'), 'utf8'));
  const plan = {
    schemaVersion: 1, jobId: 't02_first_render', revision: 1,
    assets: materials.map(asset => ({ assetId: asset.assetId, durationMs: asset.durationMs ?? 6000, kind: asset.kind, path: asset.path })),
    output: { width: 1080, height: 1920, fps: 30 },
    scenes: [
      { sceneId: 's1', assetId: 'photo_portrait', sourceInMs: 0, durationMs: 2500, timelineStartMs: 0, caption: '세로 사진: 화면을 가득 채워요', fit: 'cover' },
      { sceneId: 's2', assetId: 'photo_landscape', sourceInMs: 0, durationMs: 3500, timelineStartMs: 2500, caption: '긴 자막 시험: 가로 사진을 온전히 담고 한글 문장이 여러 줄로 이어질 때 양옆과 아래쪽 글자가 잘리지 않는지 살펴봅니다', fit: 'contain' },
      { sceneId: 's3', assetId: 'video_landscape', sourceInMs: 1000, durationMs: 4000, timelineStartMs: 6000, caption: '가로 영상: 색이 바뀌고 소리가 나요', fit: 'cover' },
      { sceneId: 's4', assetId: 'video_portrait', sourceInMs: 1500, durationMs: 3000, timelineStartMs: 10000, caption: "세로 영상: '무음'도 끝까지 이어져요", fit: 'contain' }
    ]
  };
  const result = await validatePlan(plan, (await config()).ffprobe);
  await checks.check('valid T02 plan', result.durationMs === 13000 && result.frames === 390, `durationMs=${result.durationMs}, frames=${result.frames}, planHash=${result.planHash}`);
  await checks.check('long Korean source caption has no manual line break', plan.scenes[1].caption.length > 50 && !plan.scenes[1].caption.includes('\n'));
  await writeFile(path.join(here, 'edit-plan.json'), JSON.stringify(plan, null, 2), { encoding: 'utf8', flag: 'wx' });
  await log('T01_UNCHANGED_NOT_REUSED exactly 3 scenes and strict field allowlists conflict with T02. Separate validator.mjs retains identifiers, integer timing, no gaps/overlaps, range checks and adds actual media probing.');
});
