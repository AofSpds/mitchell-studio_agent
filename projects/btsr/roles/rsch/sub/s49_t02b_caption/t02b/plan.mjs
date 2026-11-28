import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { here, sourceCode, stage, log } from './common.mjs';
import { loadFont, layoutCaptions, wrapCaption, style } from './captions.mjs';

await log('\n=== S48 CONFIGURATION ===\nRSCH supplied x=100..880 y=430..1200; no prior video render. Original temporary-plan checks remain above.');
await stage('PLAN', async checks => {
  const plan = JSON.parse(await readFile(path.join(sourceCode, 'edit-plan.json'), 'utf8'));
  plan.jobId = 't02b_caption';
  plan.output.captionSafeArea = { top: 430, bottom: 720, left: 100, right: 200 };
  // Original four scenes and all their caption text remain unchanged.
  plan.scenes.push(
    { sceneId: 's5', assetId: 'photo_portrait', sourceInMs: 0, durationMs: 3000, timelineStartMs: 13000, caption: '띄어쓰기가 많은 긴 문장도 어절을 지키며 접어요 양옆과 아래쪽 글자가 잘리지 않는지 살펴봅니다', fit: 'cover' },
    { sceneId: 's6', assetId: 'photo_landscape', sourceInMs: 0, durationMs: 3000, timelineStartMs: 16000, caption: '한어절이아주길어서한줄의너비를넘어서는경우에만글자사이에서나누어표시합니다', fit: 'contain' },
    { sceneId: 's7', assetId: 'video_landscape', sourceInMs: 1000, durationMs: 3000, timelineStartMs: 19000, caption: '1080×1920 세로 영상 OK! 한글과 English 12345, WIDE iii, 30fps / 48kHz를 섞어서 줄 너비를 확인합니다.', fit: 'cover' }
  );
  const captions = await layoutCaptions(plan), font = await loadFont();
  await checks.check('seven scenes, original four unchanged', plan.scenes.length === 7 && plan.scenes[3].timelineStartMs + plan.scenes[3].durationMs === 13000);
  await checks.check('proportional font widths distinguish equal character counts', font.width('WWWW') > font.width('iiii'), `WWWW=${font.width('WWWW')} iiii=${font.width('iiii')}`);
  for (const caption of captions) {
    await checks.check(`${caption.sceneId} within ${style.maxLines} lines and ${caption.maxWidth}px`, caption.lines.length <= style.maxLines && caption.widths.every(w => w <= caption.maxWidth));
    await checks.check(`${caption.sceneId} non-whitespace text preserved`, caption.source.replace(/\s/gu, '') === caption.wrapped.replace(/\s/gu, ''));
    if (caption.sceneId !== 's6') {
      await checks.check(`${caption.sceneId} whole tokens preserved`, caption.forcedBreaks.length === 0 && caption.source.trim().split(/\s+/u).join('|') === caption.lines.join(' ').split(/\s+/u).join('|'));
    }
    await log(`CAPTION_LAYOUT ${JSON.stringify(caption)}`);
  }
  await checks.check('oversized single token split and explicitly recorded', captions[5].forcedBreaks.length === 1 && captions[5].lines.length > 1 && captions[5].forcedBreaks[0].pieces.join('') === plan.scenes[5].caption);
  await checks.check('all three added long captions wrap', captions.slice(4).every(c => c.lines.length > 1));
  const manual = wrapCaption('가로\n세로', font, captions[0].maxWidth);
  await checks.check('explicit newlines retained', manual.lines.length === 2 && manual.wrapped === '가로\n세로');
  await writeFile(path.join(here, 'edit-plan.json'), JSON.stringify(plan, null, 2) + '\n', 'utf8');
  await log(`S48_SAFE_AREA ${JSON.stringify(plan.output.captionSafeArea)} 값 근거: sub/s48_caption_safe_area/S48_SAFE_AREA.md 끝 표 · 임시 공통 영역(읽은 이의 판단)`);
});
