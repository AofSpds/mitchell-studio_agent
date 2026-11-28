import { stat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { probe, sourceWork } from './common.mjs';
import { layoutCaptions } from './captions.mjs';

export class PlanError extends Error {
  constructor(code, detail) { super(`${code}: ${detail}`); this.code = code; }
}
const requireThat = (condition, code, detail) => { if (!condition) throw new PlanError(code, detail); };
function fields(value, names, where) {
  requireThat(value && typeof value === 'object' && !Array.isArray(value), 'OBJECT', where);
  for (const name of names) requireThat(Object.hasOwn(value, name), 'MISSING_FIELD', `${where}.${name}`);
  for (const name of Object.keys(value)) requireThat(names.includes(name), 'UNKNOWN_FIELD', `${where}.${name}`);
}
function identifier(value, where) {
  requireThat(typeof value === 'string' && /^[a-z][a-z0-9_]{0,39}$/.test(value) && !['constructor', 'prototype'].includes(value), 'IDENTIFIER', where);
}
function integer(value, minimum, code, where) {
  requireThat(Number.isSafeInteger(value) && value >= minimum, code, where);
}
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

export async function validatePlan(plan, ffprobe) {
  fields(plan, ['schemaVersion', 'jobId', 'revision', 'assets', 'scenes', 'output'], 'plan');
  requireThat(plan.schemaVersion === 1, 'SCHEMA_VERSION', 'schemaVersion=1');
  identifier(plan.jobId, 'jobId');
  integer(plan.revision, 1, 'REVISION', 'revision');
  fields(plan.output, ['width', 'height', 'fps', 'captionSafeArea'], 'output');
  requireThat(plan.output.width === 1080 && plan.output.height === 1920 && plan.output.fps === 30, 'OUTPUT', '1080x1920/30');
  requireThat(Array.isArray(plan.assets) && plan.assets.length === 4, 'ASSETS', 'four generated assets');
  requireThat(Array.isArray(plan.scenes) && plan.scenes.length >= 4, 'SCENE_COUNT', 'at least four scenes');
  // Caption failures are detected without ffprobe, FFmpeg, text files or render folders.
  const captions = await layoutCaptions(plan);
  const assets = new Map();
  const sourceRoot = `${path.resolve(sourceWork, 'assets')}${path.sep}`.toLowerCase();
  for (const asset of plan.assets) {
    fields(asset, ['assetId', 'durationMs', 'kind', 'path'], 'asset');
    identifier(asset.assetId, 'assetId');
    requireThat(!assets.has(asset.assetId), 'DUPLICATE_ASSET_ID', asset.assetId);
    integer(asset.durationMs, 1, 'ASSET_DURATION', asset.assetId);
    requireThat(['photo', 'video'].includes(asset.kind), 'ASSET_KIND', asset.assetId);
    requireThat(typeof asset.path === 'string' && path.isAbsolute(asset.path) && path.resolve(asset.path).toLowerCase().startsWith(sourceRoot), 'ASSET_PATH', asset.assetId);
    let file;
    try { file = await stat(asset.path); } catch (error) {
      if (error.code === 'ENOENT') throw new PlanError('MISSING_ASSET_FILE', asset.assetId);
      throw error;
    }
    requireThat(file.isFile(), 'ASSET_FILE', asset.assetId);
    requireThat((await realpath(asset.path)).toLowerCase().startsWith(sourceRoot), 'ASSET_PATH', asset.assetId);
    const info = await probe(ffprobe, asset.path);
    const video = info.streams.find(stream => stream.codec_type === 'video');
    requireThat(Boolean(video), 'NO_VIDEO', asset.assetId);
    const actualMs = asset.kind === 'video' ? Number(video.duration ?? info.format.duration) * 1000 : asset.durationMs;
    requireThat(Number.isFinite(actualMs) && actualMs > 0, 'ACTUAL_DURATION', asset.assetId);
    if (asset.kind === 'video') requireThat(Math.abs(actualMs - asset.durationMs) <= 1000 / 30, 'ASSET_DURATION_MISMATCH', asset.assetId);
    else requireThat(video.codec_name === 'png', 'PHOTO_FORMAT', asset.assetId);
    assets.set(asset.assetId, { ...asset, actualMs, hasAudio: info.streams.some(stream => stream.codec_type === 'audio') });
  }
  requireThat(Array.isArray(plan.scenes) && plan.scenes.length >= 4, 'SCENE_COUNT', 'at least four scenes');
  const sceneIds = new Set(), used = new Set();
  let timelineEnd = 0;
  for (const scene of plan.scenes) {
    fields(scene, ['sceneId', 'assetId', 'sourceInMs', 'durationMs', 'timelineStartMs', 'caption', 'fit'], 'scene');
    identifier(scene.sceneId, 'sceneId');
    identifier(scene.assetId, 'scene.assetId');
    requireThat(!sceneIds.has(scene.sceneId), 'DUPLICATE_SCENE_ID', scene.sceneId);
    sceneIds.add(scene.sceneId);
    requireThat(assets.has(scene.assetId), 'UNKNOWN_ASSET', scene.assetId);
    used.add(scene.assetId);
    integer(scene.sourceInMs, 0, 'SOURCE_START', scene.sceneId);
    integer(scene.durationMs, 1, 'DURATION', scene.sceneId);
    integer(scene.timelineStartMs, 0, 'TIMELINE_START', scene.sceneId);
    requireThat(scene.durationMs * plan.output.fps % 1000 === 0, 'FRAME_ALIGNMENT', scene.sceneId);
    const asset = assets.get(scene.assetId);
    if (asset.kind === 'photo') requireThat(scene.sourceInMs === 0, 'PHOTO_SOURCE_START', scene.sceneId);
    requireThat(scene.sourceInMs + scene.durationMs <= Math.min(asset.durationMs, asset.actualMs), 'SOURCE_RANGE', scene.sceneId);
    requireThat(scene.timelineStartMs >= timelineEnd, 'TIMELINE_OVERLAP', scene.sceneId);
    requireThat(scene.timelineStartMs === timelineEnd, 'TIMELINE_GAP', scene.sceneId);
    requireThat(typeof scene.caption === 'string' && /[가-힣]/u.test(scene.caption) && !scene.caption.includes('\0'), 'CAPTION', scene.sceneId);
    requireThat(['cover', 'contain'].includes(scene.fit), 'FIT', scene.sceneId);
    timelineEnd += scene.durationMs;
    requireThat(Number.isSafeInteger(timelineEnd), 'TIMELINE_RANGE', scene.sceneId);
  }
  requireThat(used.size === assets.size, 'UNUSED_ASSET', 'all four assets must be used');
  return { assets, captions, durationMs: timelineEnd, frames: timelineEnd * plan.output.fps / 1000, planHash: createHash('sha256').update(canonical(plan)).digest('hex') };
}
