import { mkdir, access, writeFile, appendFile, readdir, readFile } from 'node:fs/promises';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createHash } from 'node:crypto';
import { get } from 'node:https';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = 'C:/Users/ms1pk/dev/mitchell-studio_t02';
const downloadDir = path.join(root, 'ffmpeg_dl');
const work = path.join(root, 'work');
const results = path.join(here, 'results.txt');
const powershell = 'C:/Windows/System32/WindowsPowerShell/v1.0/powershell.exe';
const zipUrl = 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip';
const shaUrl = `${zipUrl}.sha256`;
const started = performance.now();
const log = line => appendFile(results, `${line}\n`, 'utf8');

async function execute(exe, args, input = '') {
  await log(`COMMAND ${JSON.stringify({ exe, args, input, cwd: here, shell: false })}`);
  return new Promise((resolve, reject) => {
    const child = spawn(exe, args, { cwd: here, shell: false, windowsHide: true });
    child.stdin.end(input);
    let stdout = '', stderr = '';
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve({ stdout, stderr }) : reject(new Error(`Command exit ${code}: ${stderr}`)));
  });
}

async function kst() {
  const result = await execute(powershell, ['-NoProfile', '-NonInteractive', '-Command', "[TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow,'Korea Standard Time').ToString('yyyy-MM-dd HH:mm:ss')"]);
  return `${result.stdout.trim()} KST`;
}

async function exists(target) {
  try { await access(target); return true; } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function download(url, target) {
  await log(`DOWNLOAD ${JSON.stringify({ url, target, followRedirects: false })}`);
  await new Promise((resolve, reject) => {
    const request = get(url, { timeout: 120000 }, async response => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Download stopped: HTTP ${response.statusCode}; no redirects or alternate URL allowed.`));
        return;
      }
      try {
        await pipeline(response, createWriteStream(target, { flags: 'wx' }));
        resolve();
      } catch (error) { reject(error); }
    });
    request.on('timeout', () => request.destroy(new Error('Download timeout; no retry.')));
    request.on('error', reject);
  });
}

async function sha256(target) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(target)) hash.update(chunk);
  return hash.digest('hex');
}

try {
  await writeFile(results, 'T02 SETUP\n', { encoding: 'utf8', flag: 'wx' });
  await log(`COMMAND ${JSON.stringify({ exe: process.execPath, args: process.argv.slice(1), cwd: process.cwd(), shell: false })}`);
  await log(`START ${await kst()}`);
  if (await exists(downloadDir)) throw new Error('ffmpeg_dl already exists. Stop without changing it.');
  if (await exists(work)) throw new Error('work already exists. Stop without changing it.');
  await mkdir(root, { recursive: true });
  await mkdir(downloadDir);
  await log('PASS download directory newly created and empty');
  const zip = path.join(downloadDir, 'ffmpeg-release-essentials.zip');
  const checksum = `${zip}.sha256`;
  await download(shaUrl, checksum);
  const checksumText = (await readFile(checksum, 'utf8')).trim();
  const match = checksumText.match(/^([a-fA-F0-9]{64})(?:\s+\*?[^\r\n]+)?$/);
  if (!match) throw new Error('Published SHA-256 is not in the expected format.');
  const expected = match[1].toLowerCase();
  await download(zipUrl, zip);
  const actual = await sha256(zip);
  await log(`ZIP_SHA256 published=${expected} actual=${actual}`);
  if (actual !== expected) throw new Error('ZIP SHA-256 mismatch. Files retained; no extraction or execution.');
  await log('PASS ZIP SHA-256 matches published value');
  // Fixed PowerShell system utility expression. Paths are JSON data on stdin, never executable text.
  const extract = "$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.IO.Compression.FileSystem; $data=[Console]::In.ReadToEnd() | ConvertFrom-Json; $zipPath=$data.zip; $dest=$data.destination; $boundary=[IO.Path]::GetFullPath($dest)+[IO.Path]::DirectorySeparatorChar; $archive=[IO.Compression.ZipFile]::OpenRead($zipPath); try { foreach ($entry in $archive.Entries) { $resolved=[IO.Path]::GetFullPath([IO.Path]::Combine($dest,$entry.FullName)); if (-not $resolved.StartsWith($boundary,[StringComparison]::OrdinalIgnoreCase)) { throw 'Archive path outside download directory' } } } finally { $archive.Dispose() }; [IO.Compression.ZipFile]::ExtractToDirectory($zipPath,$dest)";
  await log(`EXTRACT_SYSTEM_EXPRESSION ${extract}`);
  await execute(powershell, ['-NoProfile', '-NonInteractive', '-EncodedCommand', Buffer.from(extract, 'utf16le').toString('base64')], JSON.stringify({ zip, destination: downloadDir }));
  const folders = (await readdir(downloadDir, { withFileTypes: true })).filter(entry => entry.isDirectory());
  if (folders.length !== 1) throw new Error('Unexpected extracted folder count.');
  const bin = path.join(downloadDir, folders[0].name, 'bin');
  const ffmpeg = path.join(bin, 'ffmpeg.exe');
  const ffprobe = path.join(bin, 'ffprobe.exe');
  await access(ffmpeg);
  await access(ffprobe);
  const version = (await execute(ffmpeg, ['-version'])).stdout;
  await log(`FFMPEG_VERSION ${version.split(/\r?\n/)[0]}`);
  if (!version.includes('--enable-libfreetype')) throw new Error('libfreetype not enabled.');
  await log('PASS libfreetype enabled');
  const filters = await execute(ffmpeg, ['-hide_banner', '-filters']);
  if (!/\bdrawtext\b/.test(filters.stdout + filters.stderr)) throw new Error('drawtext not enabled.');
  await log('PASS drawtext enabled');
  await mkdir(work);
  await writeFile(path.join(work, 'setup.json'), JSON.stringify({ ffmpeg, ffprobe, zip, expected, actual, version: version.split(/\r?\n/)[0] }, null, 2), 'utf8');
  await log(`SETUP_END ${await kst()} elapsedSeconds=${((performance.now() - started) / 1000).toFixed(3)}`);
  console.log('SETUP COMPLETE: checksum, libfreetype, drawtext verified.');
} catch (error) {
  await log(`FAIL SETUP ${error.message}`).catch(() => {});
  await log(`SETUP_STOP elapsedSeconds=${((performance.now() - started) / 1000).toFixed(3)}`).catch(() => {});
  console.error(error.message);
  process.exitCode = 1;
}
