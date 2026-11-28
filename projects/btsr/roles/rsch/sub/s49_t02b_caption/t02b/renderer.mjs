import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { run, log, work, baseArgs } from './common.mjs';
import { validatePlan } from './validator.mjs';
import { style } from './captions.mjs';

export function captionFilter(textfile, layout, boxcolor = 'black@0.72') {
  return `drawtext=fontfile='C\\:/Windows/Fonts/malgun.ttf':textfile='${textfile}':expansion=none:text_shaping=0:fontsize=${style.fontSize}:fontcolor=white:line_spacing=${style.lineSpacing}:box=1:boxcolor=${boxcolor}:boxborderw=${style.border}:x=${layout.centerX}-text_w/2:y=h-text_h-${layout.bottomText}`;
}

export async function renderPlan(plan, tools, runName) {
  // Nothing is created, and FFmpeg is never spawned, until real media validation succeeds.
  const validated = await validatePlan(plan, tools.ffprobe);
  if (!/^run_[a-z0-9_]+$/u.test(runName)) throw new Error('Invalid render run name.');
  const cwd = path.join(work, runName);
  await mkdir(cwd);
  await mkdir(path.join(cwd, 'captions'));
  const args = [...baseArgs, '-filter_complex_threads', '1'];
  const filters = [], captions = [];
  const { width, height, fps } = plan.output;
  for (const [index, scene] of plan.scenes.entries()) {
    const asset = validated.assets.get(scene.assetId);
    if (asset.kind === 'photo') args.push('-loop', '1', '-framerate', String(fps), '-t', String(scene.durationMs / 1000));
    args.push('-threads', '2', '-i', asset.path);
    const duration = scene.durationMs / 1000;
    const sourceIn = scene.sourceInMs / 1000;
    const scale = scene.fit === 'cover'
      ? `scale=${width}:${height}:force_original_aspect_ratio=increase:force_divisible_by=2,crop=${width}:${height}`
      : `scale=${width}:${height}:force_original_aspect_ratio=decrease:force_divisible_by=2,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=0x101820`;
    const layout = validated.captions[index];
    const caption = layout.wrapped;
    const textfile = `captions/${scene.sceneId}.txt`;
    await writeFile(path.join(cwd, textfile), caption, { encoding: 'utf8', flag: 'wx' });
    captions.push({ ...layout, textfile: path.join(cwd, textfile) });
    // Font drive colon is escaped for FFmpeg's filter grammar; text never enters that grammar.
    const drawtext = captionFilter(textfile, layout);
    filters.push(`[${index}:v:0]trim=start=${sourceIn}:duration=${duration},setpts=PTS-STARTPTS,fps=${fps},${scale},setsar=1,format=yuv420p,${drawtext},settb=AVTB[v${index}]`);
    if (asset.hasAudio) {
      filters.push(`[${index}:a:0]atrim=start=${sourceIn}:duration=${duration},asetpts=PTS-STARTPTS,aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,apad=whole_dur=${duration},atrim=duration=${duration}[a${index}]`);
    } else {
      filters.push(`anullsrc=r=48000:cl=stereo,atrim=duration=${duration},asetpts=PTS-STARTPTS[a${index}]`);
    }
  }
  const labels = plan.scenes.map((_, index) => `[v${index}][a${index}]`).join('');
  filters.push(`${labels}concat=n=${plan.scenes.length}:v=1:a=1[vout][aout]`);
  const output = path.join(work, `${runName}.mp4`);
  args.push('-filter_complex', filters.join(';'), '-map', '[vout]', '-map', '[aout]', '-t', String(validated.durationMs / 1000),
    '-fps_mode', 'cfr', '-r', String(fps), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-threads', '2', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', '-ar', '48000', '-ac', '2', '-movflags', '+faststart', output);
  await log(`RENDER_PLAN ${JSON.stringify({ runName, planHash: validated.planHash, durationMs: validated.durationMs, frames: validated.frames, captions })}`);
  await run(tools.ffmpeg, args, cwd);
  return { output, durationMs: validated.durationMs, frames: validated.frames, planHash: validated.planHash, captions };
}
