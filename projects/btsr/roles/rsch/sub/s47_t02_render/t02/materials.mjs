import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config, work, run, log, probe, sha256, stage, baseArgs } from './common.mjs';

await stage('MATERIALS', async checks => {
  const { ffmpeg, ffprobe } = await config();
  const dir = path.join(work, 'assets');
  await mkdir(dir);
  const items = [
    { assetId: 'photo_portrait', kind: 'photo', file: '세로사진_01.png', width: 3024, height: 4032,
      filter: 'color=c=0x143348:s=3024x4032:r=1,drawbox=x=350:y=500:w=950:h=2500:color=0x2ec4b6:t=fill,drawbox=x=1750:y=900:w=850:h=1500:color=0xffbf69:t=fill' },
    { assetId: 'photo_landscape', kind: 'photo', file: 'landscape_photo.png', width: 4000, height: 3000,
      filter: 'color=c=0x42275a:s=4000x3000:r=1,drawbox=x=200:y=350:w=1000:h=2300:color=0xf45b69:t=fill,drawbox=x=1550:y=800:w=900:h=1400:color=0xf7d08a:t=fill,drawbox=x=2800:y=350:w=1000:h=2300:color=0x59c3c3:t=fill' },
    { assetId: 'video_landscape', kind: 'video', file: 'landscape_audio.mp4', width: 1920, height: 1080, fps: 30, durationMs: 8000, audio: true,
      filter: 'color=c=0x0c2544:s=1920x1080:r=30:d=8,drawbox=x=180:y=150:w=600:h=700:color=0x00b4d8:t=fill,drawbox=x=1080:y=250:w=500:h=450:color=0xffc857:t=fill,hue=h=20*t' },
    { assetId: 'video_portrait', kind: 'video', file: 'portrait_silent.mp4', width: 1080, height: 1920, fps: 60, durationMs: 6000, audio: false,
      filter: 'color=c=0x1e2a3a:s=1080x1920:r=60:d=6,drawbox=x=100:y=250:w=350:h=1200:color=0xff6b6b:t=fill,drawbox=x=630:y=500:w=350:h=900:color=0x4ecdc4:t=fill,hue=h=30*t' }
  ];
  for (const item of items) {
    const target = path.join(dir, item.file);
    const args = [...baseArgs, '-f', 'lavfi', '-i', item.filter];
    if (item.kind === 'photo') {
      args.push('-frames:v', '1', '-c:v', 'png', '-pix_fmt', 'rgb24', '-threads', '2', '-update', '1');
    } else {
      if (item.audio) args.push('-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000:duration=8');
      args.push('-t', String(item.durationMs / 1000), '-map', '0:v:0');
      if (item.audio) args.push('-map', '1:a:0', '-c:a', 'aac', '-ar', '48000', '-ac', '2');
      else args.push('-an');
      args.push('-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '23', '-threads', '2', '-pix_fmt', 'yuv420p', '-movflags', '+faststart');
    }
    args.push(target);
    await run(ffmpeg, args);
    const info = await probe(ffprobe, target);
    const video = info.streams.find(stream => stream.codec_type === 'video');
    const audio = info.streams.find(stream => stream.codec_type === 'audio');
    await checks.check(`${item.assetId} dimensions`, video?.width === item.width && video?.height === item.height, `${video?.width}x${video?.height}`);
    if (item.kind === 'video') {
      await checks.check(`${item.assetId} fps`, video.avg_frame_rate === `${item.fps}/1`, video.avg_frame_rate);
      await checks.check(`${item.assetId} duration`, Math.abs(Number(info.format.duration) * 1000 - item.durationMs) <= 1000 / item.fps, info.format.duration);
      await checks.check(`${item.assetId} audio`, Boolean(audio) === item.audio, `present=${Boolean(audio)}`);
    } else await checks.check(`${item.assetId} PNG`, video.codec_name === 'png', video.codec_name);
    item.path = target;
    item.sha256Before = await sha256(target);
    await log(`ASSET_HASH_BEFORE ${JSON.stringify({ assetId: item.assetId, path: target, sha256: item.sha256Before })}`);
    delete item.filter;
    console.log(`Created ${item.assetId}`);
  }
  await writeFile(path.join(work, 'assets-before.json'), JSON.stringify(items, null, 2), { encoding: 'utf8', flag: 'wx' });
});
