// 묶음 2 화면 시험 — 보내기 끝 → 작업 화면 · 물음 답하기 (시험용 웹앱, 화면 없는 Chrome). 저장소 밖 시험 도구
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
const [,, base, outDir, chrome, batch, qjob] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const prof = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'b2-chrome-'));
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
  // 보내기 끝 → 작업 화면 (업로드는 이미 한 묶음으로)
  await ev(`S.batch = '${batch}'; S.items = []; startJob()`); await sleep(2000);
  check('보내기 끝 → 작업 화면이 열림', await ev(`view === 'job' && !!current`), await ev(`current`));
  check('작업 화면에 ② 「업로드 확인」 안내 없음', !(await ev(`document.body.innerText.includes('업로드 확인')`)));
  await shot('after_send_job.png');
  // 물음 답하기
  await ev(`current = '${qjob}'; show('job')`); await sleep(1800);
  check('접수 물음과 글 칸이 보임', await ev(`!!document.querySelector('[data-qa]') && document.body.innerText.includes('물어볼 것이 있어요')`));
  await shot('question.png');
  await ev(`document.querySelector('[data-answer]').click()`); await sleep(600);
  check('빈 답은 안 보냄', await ev(`document.getElementById('qaMsg').textContent`) === '물음마다 답을 적어 주세요');
  await ev(`document.querySelector('[data-qa]').value = '50대예요'; document.querySelector('[data-answer]').click()`); await sleep(1500);
  check('답을 보내면 물음이 사라지고 이어 하기 안내', await ev(`!document.querySelector('[data-qa]') && document.body.innerText.includes('답을 받았어요')`));
  await shot('answered.png');
} catch (e) { check('스크립트 오류', false, String(e)); }
fs.writeFileSync(path.join(outDir, 'screen_report_b2.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report));
ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(report.every(r => r.ok) ? 0 : 1); }, 800);
