// 시험 5 — 휴대폰 폭 화면에서 Feedback (시험용 웹앱, 화면 없는 Chrome + DevTools 프로토콜). 시험 도구 — 저장소 밖
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
const [,, base, outDir, chrome] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const prof = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'b1-chrome-'));
const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets; for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {} await sleep(200); }
const page = targets.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const wait = {};
ws.onmessage = m => { const j = JSON.parse(m.data); if (j.id && wait[j.id]) { wait[j.id](j); delete wait[j.id]; } };
const cdp = (method, params = {}) => new Promise(r => { const i = ++id; wait[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400)); return r.result.result.value; };
const shot = async name => { const r = await cdp('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(outDir, name), Buffer.from(r.result.data, 'base64')); };
const report = [];
const check = (name, ok, detail) => { report.push({ name, ok: !!ok, detail }); };
try {
  await cdp('Page.enable'); await cdp('Runtime.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1500);
  await ev(`fetch('/api/login', {method:'POST', headers:{'X-Upload-App':'1','Content-Type':'application/json'}, body: JSON.stringify({pin: '${process.env.TEST_PIN}'})}).then(r => r.status)`);
  await cdp('Page.navigate', { url: base + '/' }); await sleep(2000);
  const views = [['up', 'v-up'], ['jobs', 'v-jobs'], ['post', 'v-post'], ['man', 'v-man']];
  for (const [v] of views) {
    await ev(`show('${v}')`); await sleep(1200);
    await ev(`window.scrollTo(0, document.body.scrollHeight)`); await sleep(300);
    const vis = await ev(`(() => { const r = document.getElementById('fbBtn').getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight && r.width > 0; })()`);
    check(`Feedback 단추가 스크롤 뒤에도 보임 · ${v}`, vis);
    await ev(`window.scrollTo(0, 0)`);
    await ev(`document.getElementById('fbBtn').click()`); await sleep(800);
    const opened = await ev(`!document.getElementById('sheet').hidden && !!document.getElementById('fbText')`);
    check(`Feedback 시트가 열림 · ${v}`, opened);
    await shot(`feedback_${v}.png`);
    await ev(`closeSheet()`);
  }
  // 작업 화면
  await ev(`show('jobs')`); await sleep(1200);
  const jobId = await ev(`JOBS.length ? JOBS[0].id : null`);
  check('시험 작업이 Jobs에 보임', jobId, jobId);
  await ev(`current = JOBS[0].id; show('job')`); await sleep(1500);
  await shot('job_view.png');
  const whoLines = await ev(`[...document.querySelectorAll('#stepList .who')].map(x => x.textContent)`);
  check('단계 설명 줄이 쉬운 말', whoLines.length === 8 && !whoLines.some(t => /Claude|ChatGPT|카드/.test(t)), whoLines.join(' / '));
  await ev(`document.getElementById('fbBtn').click()`); await sleep(1000);
  const note = await ev(`document.getElementById('sheetBox').innerText`);
  check('작업 화면에서 열면 고칠 점 안내 줄', /이 영상을 고치려면 작업 화면의 「고칠 점 적기」/.test(note), note.split('\n')[1]);
  const disabled = await ev(`document.getElementById('fbSend').disabled`);
  check('갈래를 고르기 전에는 보내기 꺼짐', disabled);
  await ev(`document.querySelector('[data-fbkind=wish]').click()`); await sleep(200);
  check('갈래를 고르면 보내기 켜짐', !(await ev(`document.getElementById('fbSend').disabled`)));
  await ev(`document.getElementById('fbText').value = '화면 시험 — 보내기 단추가 더 컸으면 해요'`);
  await ev(`document.getElementById('fbSend').click()`); await sleep(1500);
  const toast = await ev(`document.getElementById('toast').hidden ? '' : document.getElementById('toast').textContent`);
  check('보낸 뒤 toast', toast === '받았어요. 개발자가 읽어요.', toast);
  const mine = await ev(`document.getElementById('fbList').innerText`);
  check('「내가 보낸 건의」에 보임', /화면 시험 — 보내기 단추가/.test(mine), mine.split('\n')[0]);
  await shot('job_feedback_sent.png');
  await ev(`closeSheet()`);
  // Manual 개발자용
  await ev(`show('man')`); await sleep(1500);
  const dev = await ev(`(() => { const d = document.getElementById('devBox'); return d && !d.open; })()`);
  check('Manual 맨 아래 「개발자용」이 접혀 있음', dev);
  const prac = await ev(`document.getElementById('pracBox').hidden`);
  check('Jobs의 연습 줄은 숨김', prac);
} catch (e) { check('스크립트 오류', false, String(e)); }
fs.writeFileSync(path.join(outDir, 'screen_report.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(report.every(r => r.ok) ? 0 : 1); }, 800);
