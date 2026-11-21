// 묶음 3 화면 시험 — 물음 셋을 한 번에 하나 · 고르는 단추 · 다른 답 적기 · 마지막 답 뒤 물음 없음. 저장소 밖 시험 도구
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
const [,, base, outDir, chrome, job] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const prof = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'b3-chrome-'));
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
const qtext = `(document.querySelector('#stepList .card .note') || {}).textContent || ''`;
try {
  await cdp('Page.enable'); await cdp('Runtime.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1500);
  await ev(`fetch('/api/login', {method:'POST', headers:{'X-Upload-App':'1','Content-Type':'application/json'}, body: JSON.stringify({pin: '${process.env.TEST_PIN}'})})`);
  await cdp('Page.navigate', { url: base + '/' }); await sleep(2000);
  await ev(`current = '${job}'; show('job')`); await sleep(1800);
  check('물음 1/3 · 소재 물음 · 고르는 단추 넷', (await ev(qtext)) === '물음 1/3' && (await ev(`document.querySelectorAll('[data-qchoice]').length`)) === 4, await ev(qtext));
  check('물음은 한 번에 하나', (await ev(`document.querySelectorAll('[data-qid]').length`)) === 4 && (await ev(`new Set([...document.querySelectorAll('[data-qid]')].map(b => b.dataset.qid)).size`)) === 1);
  check('소재 격자에 꼬리표', (await ev(`document.querySelectorAll('#stepList .thumbs span').length`)) >= 2);
  await shot('b3_q1.png');
  await ev(`document.querySelector('[data-qchoice="시술 후"]').click()`); await sleep(1800);
  check('답하면 물음 2/3 (사실)', (await ev(qtext)) === '물음 2/3', await ev(qtext));
  await ev(`document.querySelector('[data-qchoice="다른 답 적기"]').click()`); await sleep(300);
  check('「다른 답 적기」 → 글 칸', !(await ev(`document.getElementById('qaOther').hidden`)));
  await ev(`document.getElementById('qaText').value = '60대 초반'; document.querySelector('[data-qsend]').click()`); await sleep(1800);
  check('물음 3/3 (빠진 자료) · 더 보내기 · 이대로 만들기', (await ev(qtext)) === '물음 3/3' && (await ev(`[...document.querySelectorAll('[data-qchoice]')].map(b => b.textContent).join('|')`)) === '더 보내기|이대로 만들기');
  await shot('b3_q3.png');
  await ev(`document.querySelector('[data-qchoice="이대로 만들기"]').click()`); await sleep(1800);
  check('다 답하면 물음 카드가 없어짐', !(await ev(`!!document.querySelector('[data-qchoice]')`)));
  await ev(`(document.querySelector('[data-show="1"]') || {click(){}}).click()`); await sleep(300); // 접수가 끝나 접힌 칸을 펼침
  check('사실 표에 답이 보임', await ev(`document.getElementById('stepList').innerText.includes('60대 초반')`));
  check('화면에 개발 말(카드 · 모델 · Claude) 없음 — 접수 칸', !(await ev(`/카드|Claude|프롬프트/.test(document.querySelector('#stepList .step:nth-child(2)').innerText)`)));
} catch (e) { check('스크립트 오류', false, String(e)); }
fs.writeFileSync(path.join(outDir, 'screen_report_b3.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ total: report.length, ok: report.filter(r => r.ok).length, bad: report.filter(r => !r.ok) }));
ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(report.every(r => r.ok) ? 0 : 1); }, 800);
