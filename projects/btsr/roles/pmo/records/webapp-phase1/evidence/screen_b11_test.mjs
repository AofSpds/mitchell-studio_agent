// 묶음 1-1 화면 시험 — 다섯 화면 머리에 「건의하기」만 · 「Feedback」 글자 없음 · 시트가 열림. 저장소 밖 시험 도구
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
const [,, base, outDir, chrome, job] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const prof = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'b11-chrome-'));
const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets; for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {} await sleep(200); }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const wait = {};
ws.onmessage = m => { const j = JSON.parse(m.data); if (j.id && wait[j.id]) { wait[j.id](j); delete wait[j.id]; } };
const cdp = (method, params = {}) => new Promise(r => { const i = ++id; wait[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400)); return r.result.result.value; };
const shot = async name => { const r = await cdp('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(outDir, name), Buffer.from(r.result.data, 'base64')); };
const report = []; const check = (name, ok, detail) => report.push({ name, ok: !!ok, detail });
try {
  await cdp('Page.enable'); await cdp('Runtime.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1500);
  await ev(`fetch('/api/login', {method:'POST', headers:{'X-Upload-App':'1','Content-Type':'application/json'}, body: JSON.stringify({pin: '${process.env.TEST_PIN}'})})`);
  await cdp('Page.navigate', { url: base + '/' }); await sleep(2000);
  for (const v of ['up', 'jobs', 'job', 'post', 'man']) {
    if (v === 'job') await ev(`current = '${job}'; show('job')`); else await ev(`show('${v}')`);
    await sleep(1300);
    const label = await ev(`document.getElementById('fbBtn').innerText.trim()`);
    check(`머리 단추 글이 「건의하기」만 · ${v}`, label === '건의하기', label);
    check(`화면에 「Feedback」 글자 없음 · ${v}`, !(await ev(`document.body.innerText.includes('Feedback')`)));
    await ev(`document.getElementById('fbBtn').click()`); await sleep(800);
    const title = await ev(`(document.querySelector('#sheetBox h2') || {}).innerText || ''`);
    check(`시트가 열리고 제목이 「건의하기」 · ${v}`, !(await ev(`document.getElementById('sheet').hidden`)) && title.trim() === '건의하기', title);
    check(`시트에도 「Feedback」 글자 없음 · ${v}`, !(await ev(`document.getElementById('sheetBox').innerText.includes('Feedback')`)));
    if (v === 'job') await shot('b11_job_sheet.png');
    await ev(`closeSheet()`);
  }
  await ev(`show('up')`); await sleep(800); await shot('b11_header.png');
} catch (e) { check('스크립트 오류', false, String(e)); }
fs.writeFileSync(path.join(outDir, 'screen_report_b11.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ total: report.length, ok: report.filter(r => r.ok).length, bad: report.filter(r => !r.ok) }));
ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(report.every(r => r.ok) ? 0 : 1); }, 800);
