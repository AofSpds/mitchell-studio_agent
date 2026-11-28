import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { config, work, here, run, log, probe, sha256, stage, baseArgs, ffmpegCalls } from './common.mjs';
import { renderPlan } from './renderer.mjs';

const exists = async target => {
  try { await access(target); return true; } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
};

await stage('VERIFY', async checks => {
  const tools = await config();
  const plan = JSON.parse(await readFile(path.join(here, 'edit-plan.json'), 'utf8'));
  const rendered = JSON.parse(await readFile(path.join(work, 'render-outputs.json'), 'utf8'));
  const expectedMs = plan.scenes.reduce((total, scene) => total + scene.durationMs, 0);
  const expectedFrames = expectedMs * plan.output.fps / 1000;
  const toleranceMs = 1000 / plan.output.fps;
  const measured = [];
  for (const render of rendered) {
    const label = path.basename(render.output);
    const info = await probe(tools.ffprobe, render.output, true);
    const video = info.streams.find(stream => stream.codec_type === 'video');
    const audios = info.streams.filter(stream => stream.codec_type === 'audio');
    const audio = audios[0];
    await log(`OUTPUT_PROBE ${JSON.stringify({ path: render.output, format: info.format, video, audio })}`);
    await checks.check(`${label} dimensions`, video?.width === 1080 && video?.height === 1920, `${video?.width}x${video?.height}`);
    await checks.check(`${label} fps`, video.avg_frame_rate === '30/1' && video.r_frame_rate === '30/1', `average=${video.avg_frame_rate} nominal=${video.r_frame_rate}`);
    await checks.check(`${label} MP4 format`, info.format.format_name.split(',').includes('mp4'), info.format.format_name);
    await checks.check(`${label} H264 YUV420p`, video.codec_name === 'h264' && video.pix_fmt === 'yuv420p', `${video.codec_name}/${video.pix_fmt}`);
    await checks.check(`${label} total duration within one frame`, Math.abs(Number(info.format.duration) * 1000 - expectedMs) <= toleranceMs, `actual=${info.format.duration}s expected=${expectedMs}ms tolerance=${toleranceMs}ms`);
    await checks.check(`${label} decoded frame count`, Number(video.nb_read_frames) === expectedFrames, `${video.nb_read_frames}/${expectedFrames}`);
    await checks.check(`${label} one audio stream`, audios.length === 1, `${audios.length}`);
    await checks.check(`${label} AAC stereo 48kHz`, audio.codec_name === 'aac' && audio.channels === 2 && audio.sample_rate === '48000', `${audio.codec_name}/${audio.channels}/${audio.sample_rate}`);
    await checks.check(`${label} audio covers timeline`, Math.abs(Number(audio.start_time)) <= 1 / 48000 && Math.abs(Number(audio.duration) * 1000 - expectedMs) <= toleranceMs, `start=${audio.start_time}s duration=${audio.duration}s`);
    const packets = JSON.parse((await run(tools.ffprobe, ['-v', 'error', '-select_streams', 'a:0', '-show_packets', '-show_entries', 'packet=pts_time,duration_time', '-of', 'json', render.output])).stdout).packets;
    let maxGap = 0;
    for (let index = 1; index < packets.length; index++) {
      const expected = Number(packets[index - 1].pts_time) + Number(packets[index - 1].duration_time);
      maxGap = Math.max(maxGap, Math.abs(Number(packets[index].pts_time) - expected));
    }
    const audioEnd = Number(packets.at(-1)?.pts_time) + Number(packets.at(-1)?.duration_time);
    await checks.check(`${label} continuous audio packet timestamps`, packets.length > 0 && maxGap <= 1 / 48000 && Math.abs(audioEnd * 1000 - expectedMs) <= toleranceMs, `packets=${packets.length} maximumGapSeconds=${maxGap} end=${audioEnd}`);
    measured.push({ path: render.output, duration: info.format.duration, frames: Number(video.nb_read_frames), audioDuration: audio.duration, maxAudioPacketGapSeconds: maxGap });
  }
  await checks.check('repeat render duration identical', measured[0].duration === measured[1].duration, `${measured[0].duration}/${measured[1].duration}`);
  await checks.check('repeat render frame count identical', measured[0].frames === measured[1].frames, `${measured[0].frames}/${measured[1].frames}`);

  await mkdir(path.join(work, 'frames'));
  const frames = [];
  for (const scene of plan.scenes) {
    const midpoint = (scene.timelineStartMs + scene.durationMs / 2) / 1000;
    const target = path.join(work, 'frames', `${scene.sceneId}_midpoint.png`);
    await run(tools.ffmpeg, [...baseArgs, '-i', rendered[0].output, '-ss', String(midpoint), '-frames:v', '1', '-c:v', 'png', '-threads', '2', '-update', '1', target]);
    const png = (await probe(tools.ffprobe, target)).streams.find(stream => stream.codec_type === 'video');
    await checks.check(`${scene.sceneId} midpoint PNG`, png?.codec_name === 'png' && png.width === 1080 && png.height === 1920, `requestedTime=${midpoint}s path=${target}`);
    frames.push({ sceneId: scene.sceneId, requestedTimeSeconds: midpoint, path: target });
    // Sample away from transitions to verify generated tone vs filled silence, not subjective quality.
    const level = await run(tools.ffmpeg, ['-hide_banner', '-loglevel', 'info', '-nostdin', '-ss', String(midpoint - 0.1), '-i', rendered[0].output, '-t', '0.2', '-vn', '-af', 'volumedetect', '-f', 'null', '-']);
    const match = level.stderr.match(/mean_volume:\s*(-?[\d.]+) dB/u);
    const meanDb = match ? Number(match[1]) : NaN;
    const expectTone = scene.assetId === 'video_landscape';
    await checks.check(`${scene.sceneId} ${expectTone ? 'tone' : 'silence'} sample`, Number.isFinite(meanDb) && (expectTone ? meanDb > -50 : meanDb < -75), `mean_volume=${meanDb}dB sample=0.2s`);
  }

  const invalidRange = structuredClone(plan);
  invalidRange.scenes[2].sourceInMs = 7500;
  const invalidMissing = structuredClone(plan);
  invalidMissing.assets[0].path = path.join(work, 'assets', 'nonexistent.png');
  for (const test of [
    { name: 'source_range', plan: invalidRange, expected: 'SOURCE_RANGE' },
    { name: 'missing_asset', plan: invalidMissing, expected: 'MISSING_ASSET_FILE' }
  ]) {
    await writeFile(path.join(work, `invalid_${test.name}.json`), JSON.stringify(test.plan, null, 2), { encoding: 'utf8', flag: 'wx' });
    const countBefore = ffmpegCalls.count;
    let rejection;
    try { await renderPlan(test.plan, tools, `run_invalid_${test.name}`); } catch (error) { rejection = error; }
    await checks.check(`invalid ${test.name} rejected before FFmpeg or render folder`, rejection?.code === test.expected && ffmpegCalls.count === countBefore && !(await exists(path.join(work, `run_invalid_${test.name}`))), `expected=${test.expected} actual=${rejection?.code} ffmpegCallsBefore=${countBefore} after=${ffmpegCalls.count}`);
  }

  const originals = JSON.parse(await readFile(path.join(work, 'assets-before.json'), 'utf8'));
  const hashes = [];
  for (const asset of originals) {
    const after = await sha256(asset.path);
    await log(`ASSET_HASH_AFTER ${JSON.stringify({ assetId: asset.assetId, path: asset.path, before: asset.sha256Before, after })}`);
    await checks.check(`${asset.assetId} original unchanged`, after === asset.sha256Before, after);
    hashes.push({ assetId: asset.assetId, before: asset.sha256Before, after });
  }
  await writeFile(path.join(work, 'verification.json'), JSON.stringify({ expectedMs, expectedFrames, measured, frames, hashes, visualCaptionJudgement: 'Pending RSCH direct image review' }, null, 2), { encoding: 'utf8', flag: 'wx' });
  await log('VISUAL_CAPTION_JUDGEMENT pending RSCH direct image review; no visual-quality pass claimed.');
  console.log('Frames for RSCH:', frames.map(frame => frame.path).join('\n'));
});
