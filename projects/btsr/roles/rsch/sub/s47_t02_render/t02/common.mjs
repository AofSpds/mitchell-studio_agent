import { appendFile, readFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const here = path.dirname(fileURLToPath(import.meta.url));
export const work = 'C:/Users/ms1pk/dev/mitchell-studio_t02/work';
export const powershell = 'C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe';
export const log = line => appendFile(path.join(here, 'results.txt'), `${line}\n`, 'utf8');
export const config = async () => JSON.parse(await readFile(path.join(work, 'setup.json'), 'utf8'));
export const ffmpegCalls = { count: 0 };

export async function run(exe, args, cwd = here) {
  if (!path.isAbsolute(exe)) throw new Error('Executable path must be absolute.');
  if (path.resolve(cwd).toLowerCase().includes('ffmpeg_dl')) throw new Error('Never run in download directory.');
  await log(`COMMAND ${JSON.stringify({ exe, args, cwd, shell: false })}`);
  if (path.basename(exe).toLowerCase() === 'ffmpeg.exe') ffmpegCalls.count++;
  const started = performance.now();
  const result = await new Promise((resolve, reject) => {
    const child = spawn(exe, args, { cwd, shell: false, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '', stderr = '';
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', code => resolve({ code, stdout, stderr }));
  });
  await log(`COMMAND_END code=${result.code} elapsedSeconds=${((performance.now() - started) / 1000).toFixed(3)}`);
  if (result.code !== 0) {
    await log(`COMMAND_ERROR ${result.stderr}`);
    throw new Error(`Command failed (${result.code}); stop without alternate invocation.`);
  }
  return result;
}

export async function kst() {
  const { stdout } = await run(powershell, ['-NoProfile', '-NonInteractive', '-Command', "[TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow,'Korea Standard Time').ToString('yyyy-MM-dd HH:mm:ss')"]);
  return `${stdout.trim()} KST`;
}

export async function sha256(target) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(target)) hash.update(chunk);
  return hash.digest('hex');
}

export async function probe(exe, target, countFrames = false) {
  const args = ['-v', 'error'];
  if (countFrames) args.push('-count_frames');
  args.push('-show_streams', '-show_format', '-of', 'json', target);
  return JSON.parse((await run(exe, args)).stdout);
}

export function checker() {
  let pass = 0, fail = 0;
  return {
    async check(name, condition, detail = '') {
      if (condition) pass++; else fail++;
      await log(`${condition ? 'PASS' : 'FAIL'} ${name}${detail ? ` | ${detail}` : ''}`);
      if (!condition) throw new Error(name);
    },
    summary: () => ({ pass, fail })
  };
}

export const baseArgs = ['-hide_banner', '-loglevel', 'error', '-nostdin', '-n'];

export async function stage(name, task) {
  const started = performance.now();
  const checks = checker();
  await log(`\n=== ${name} ===\nSTART ${await kst()}`);
  await log(`COMMAND ${JSON.stringify({ exe: process.execPath, args: process.argv.slice(1), cwd: process.cwd(), shell: false })}`);
  try {
    await task(checks);
    await log(`STAGE_SUMMARY ${name} ${JSON.stringify(checks.summary())}`);
    console.log(`${name} COMPLETE ${JSON.stringify(checks.summary())}`);
  } catch (error) {
    await log(`STAGE_STOP ${name} ${error.stack}\nSTAGE_SUMMARY ${name} ${JSON.stringify(checks.summary())}`);
    console.error(`${name} STOP: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await log(`END ${await kst()} elapsedSeconds=${((performance.now() - started) / 1000).toFixed(3)}`);
  }
}
