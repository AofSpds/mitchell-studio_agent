import { createHash } from 'node:crypto';

export class PlanError extends Error {
  constructor(code, detail) {
    super(`${code}: ${detail}`);
    this.code = code;
  }
}

function requireThat(condition, code, detail) {
  if (!condition) throw new PlanError(code, detail);
}

function fields(value, names, where) {
  requireThat(value !== null && typeof value === 'object' && !Array.isArray(value), 'OBJECT', where);
  for (const name of names) requireThat(Object.hasOwn(value, name), 'MISSING_FIELD', `${where}.${name}`);
  for (const name of Object.keys(value)) requireThat(names.includes(name), 'UNKNOWN_FIELD', `${where}.${name}`);
}

function identifier(value, where) {
  requireThat(typeof value === 'string' && /^[a-z][a-z0-9_]{0,39}$/.test(value)
    && !['constructor', 'prototype'].includes(value), 'IDENTIFIER', where);
}

function integer(value, minimum, code, where) {
  requireThat(Number.isSafeInteger(value) && value >= minimum, code, where);
}

export function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function digest(value) {
  return createHash('sha256').update(canonical(value)).digest('hex');
}

export function validatePlan(plan, existingJobIds = new Set()) {
  fields(plan, ['schemaVersion', 'jobId', 'revision', 'assets', 'scenes'], 'plan');
  requireThat(plan.schemaVersion === 1, 'SCHEMA_VERSION', 'schemaVersion은 1');
  identifier(plan.jobId, 'jobId');
  integer(plan.revision, 1, 'REVISION', 'revision');
  requireThat(!existingJobIds.has(plan.jobId), 'DUPLICATE_JOB_ID', plan.jobId);
  requireThat(Array.isArray(plan.assets) && plan.assets.length > 0, 'ASSETS', '가짜 파일 목록');
  const assets = new Map();
  for (const asset of plan.assets) {
    fields(asset, ['assetId', 'durationMs'], 'asset');
    identifier(asset.assetId, 'assetId');
    integer(asset.durationMs, 1, 'ASSET_DURATION', asset.assetId);
    requireThat(!assets.has(asset.assetId), 'DUPLICATE_ASSET_ID', asset.assetId);
    assets.set(asset.assetId, asset.durationMs);
  }
  requireThat(Array.isArray(plan.scenes) && plan.scenes.length === 3, 'SCENE_COUNT', '장면은 3개');
  const sceneIds = new Set();
  let timelineEnd = 0;
  for (const scene of plan.scenes) {
    fields(scene, ['sceneId', 'assetId', 'sourceInMs', 'durationMs', 'timelineStartMs', 'caption'], 'scene');
    identifier(scene.sceneId, 'sceneId');
    identifier(scene.assetId, 'scene.assetId');
    requireThat(!sceneIds.has(scene.sceneId), 'DUPLICATE_SCENE_ID', scene.sceneId);
    sceneIds.add(scene.sceneId);
    requireThat(assets.has(scene.assetId), 'UNKNOWN_ASSET', scene.assetId);
    integer(scene.sourceInMs, 0, 'SOURCE_START', scene.sceneId);
    integer(scene.durationMs, 1, 'DURATION', scene.sceneId);
    integer(scene.timelineStartMs, 0, 'TIMELINE_START', scene.sceneId);
    requireThat(scene.sourceInMs + scene.durationMs <= assets.get(scene.assetId), 'SOURCE_RANGE', scene.sceneId);
    requireThat(scene.timelineStartMs >= timelineEnd, 'TIMELINE_OVERLAP', scene.sceneId);
    requireThat(scene.timelineStartMs === timelineEnd, 'TIMELINE_GAP', scene.sceneId);
    requireThat(typeof scene.caption === 'string' && scene.caption.trim().length > 0, 'CAPTION', scene.sceneId);
    timelineEnd += scene.durationMs;
    requireThat(Number.isSafeInteger(timelineEnd), 'TIMELINE_RANGE', scene.sceneId);
  }
  return { jobId: plan.jobId, planHash: digest(plan), durationMs: timelineEnd };
}

export function validateBatch(plans) {
  const seen = new Set();
  return plans.map(plan => {
    const result = validatePlan(plan, seen);
    seen.add(plan.jobId);
    return result;
  });
}
