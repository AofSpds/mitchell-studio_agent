// 묶음 4-a-2 화면 시험 — 화면 7(막힌 Send + 처음부터 시작) · 8 · 9 · 15 · 보내는 중 · 빈 Jobs. 저장소 밖 시험 도구
// node screen_b4a2_test.mjs <주소> <그림 폴더> <chrome> <python> <state.py> <시험 폴더> <저장소>   (TEST_PIN은 시험 값)
import { spawn, execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
const [,, base, outDir, chrome, py, statepy, tdir, repo] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const setState = s => JSON.parse(execFileSync(py, [statepy, tdir, repo, s], { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } }).trim().split('\n').pop());
const prof = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'b4a2-chrome-'));
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
const band = () => ev(`({ t: document.querySelector('#nowBand .l1').textContent, s: (document.querySelector('#nowBand .l2') || {}).textContent || '', stop: !!document.querySelector('#nowBand .barf.stop'), pg: (document.querySelector('#nowBand .pg') || {}).innerText || '' })`);
const btns = () => ev(`[...document.querySelectorAll('#nowCard button[data-act]')].map(b => b.textContent).join('|')`);
const click = sel => ev(`document.querySelector(${JSON.stringify(sel)}).click()`);
const until = async (expr, ms = 8000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(expr)) return Date.now() - t0; await sleep(200); } return -1; };
const setFiles = async (sel, files) => { const doc = await cdp('DOM.getDocument'); const n = await cdp('DOM.querySelector', { nodeId: doc.result.root.nodeId, selector: sel }); await cdp('DOM.setFileInputFiles', { nodeId: n.result.nodeId, files }); };
try {
  await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('DOM.enable'); await cdp('Network.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1200);
  await ev(`fetch('/api/login', {method:'POST', headers:{'X-Upload-App':'1','Content-Type':'application/json'}, body: JSON.stringify({pin: '${process.env.TEST_PIN}'})})`);
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1500);

  // 빈 Jobs
  await ev(`show('jobs')`); await sleep(900);
  check('빈 Jobs: "지금 만드는 것이 없어요" + 「Send」 · 「⚙ 기본 옵션」 그대로', (await ev(`document.getElementById('jobEmptyText').textContent`)) === '지금 만드는 것이 없어요'
    && (await ev(`[...document.querySelectorAll('#jobEmpty button')].map(b => b.textContent).join('|')`)) === '⚙ 기본 옵션|Send');
  await shot('b4a2_empty.png');

  // 화면 7 — 만드는 중의 Send + 「처음부터 시작」
  setState('new'); await ev(`show('up')`);
  await until(`!document.getElementById('restartBtn').hidden`);
  check('화면 7: 흐린 Send · "지금 한 편을 만드는 중이에요" · 「처음부터 시작」', (await ev(`document.getElementById('pickBtn').disabled`)) && (await ev(`document.getElementById('sendBusyText').textContent`)) === '지금 한 편을 만드는 중이에요' && !(await ev(`document.getElementById('restartBtn').hidden`)));
  await shot('b4a2_s07_send_restart.png');

  // 화면 8 — ⑥ 고르는 물음 + 「모르겠어요 — 개발자에게 알리기」
  setState('s8'); await ev(`show('jobs')`); await sleep(1000);
  let b = await band();
  check('화면 8: 잠깐 멈췄어요 · 빨간 바 · 7 / 9', b.t === '잠깐 멈췄어요' && b.stop && b.pg.includes('7 / 9'), JSON.stringify(b));
  check('화면 8: 물음 한 줄 · 고르는 단추 · 「모르겠어요 — 개발자에게 알리기」(줄 단추)', (await ev(`document.querySelector('#nowCard .ask').textContent`)) === '고른 음악을 못 찾았어요'
    && (await btns()) === '비슷한 곡으로|음악 없이|모르겠어요 — 개발자에게 알리기' && (await ev(`document.querySelector('#nowCard .btn.line').textContent`)) === '모르겠어요 — 개발자에게 알리기');
  check('화면 8: Send는 흐림(busy)', (await ev(`fetch('/api/now').then(r => r.json()).then(j => j.busy)`)) === '2099-12-01_1200');
  await shot('b4a2_s08_ask.png');

  // 화면 9 — 개발자에게 알렸어요
  await click('#nowCard .btn.line'); await sleep(1200);
  b = await band();
  check('화면 9: 개발자에게 알렸어요 · 무엇이 막혔는지 한 줄 · 빨간 바', b.t === '개발자에게 알렸어요' && b.s === '음악을 넣지 못했어요' && b.stop, JSON.stringify(b));
  check('화면 9: 「처음부터 시작」 「여기까지 만든 것 보기」', (await btns()) === '처음부터 시작|여기까지 만든 것 보기');
  check('화면 9: dev는 busy 아님 (Send 켜짐) · 배지 없음', (await ev(`fetch('/api/now').then(r => r.json()).then(j => j.busy)`)) === null && (await ev(`document.getElementById('jobBadge').hidden`)));
  await shot('b4a2_s09_dev.png');
  await click('#nowCard [data-act="made"]'); await sleep(300);
  check('여기까지 만든 것 보기: 원고', (await ev(`document.querySelectorAll('#sheetBox ol.script li').length`)) === 3);
  await ev(`closeSheet()`);

  // 처음부터 시작 → 한 번 더 묻기 → 화면 15
  await click('#nowCard [data-act="restart"]'); await sleep(300);
  check('한 번 더 묻기: "지금 만드는 것을 멈추고 처음부터 할까요?" 「아니요」 「처음부터」', (await ev(`document.querySelector('#sheetBox h2').textContent`)) === '지금 만드는 것을 멈추고 처음부터 할까요?'
    && (await ev(`[...document.querySelectorAll('#sheetBox button')].map(b => b.textContent).join('|')`)) === '아니요|처음부터');
  await click('[data-restartyes]'); await sleep(1200);
  check('화면 15: Send로 돌아감 · 올린 것 둘 + 「+」 · 요청 글 그대로 · Send 켜짐', (await ev(`view`)) === 'up' && (await ev(`document.querySelectorAll('#draftTiles [data-dx]').length`)) === 2
    && !!(await ev(`document.querySelector('#draftTiles [data-dplus]')`)) && (await ev(`document.getElementById('req0').value`)) === '레이어드 컷, 긴 머리, 가볍게 떨어지는 느낌' && !(await ev(`document.getElementById('pickBtn').disabled`)));
  const s1 = setState('show');
  check('옛 편: 화면에서 빠짐 · 파일 그대로', s1.current === null && s1.batches['2099-12-01_1200'].includes('a.png'));
  await shot('b4a2_s15_draft.png');
  await click('[data-dx="b.png"]'); await sleep(200);
  check('×로 빼기', (await ev(`document.querySelectorAll('#draftTiles [data-dx]').length`)) === 1);
  const big = path.join(tdir, 'more.mov'); fs.writeFileSync(big, Buffer.alloc(3 * 1024 * 1024, 7));
  await setFiles('#draftPicker', [big]); await sleep(300);
  check('+로 더하기', (await ev(`document.querySelectorAll('#draftTiles [data-dadd]').length`)) === 1);

  // 보내는 중 n / 전체 (느린 망으로)
  await cdp('Network.emulateNetworkConditions', { offline: false, latency: 50, downloadThroughput: 4e6, uploadThroughput: 300 * 1024 });
  await click('#pickBtn');
  await until(`!document.getElementById('s-progress').hidden && /보내는 중 \\d \\/ \\d/.test(document.getElementById('pTitle').textContent)`);
  const pt = await ev(`document.getElementById('pTitle').textContent`);
  check('보내는 중: "보내는 중 n / 전체" · 바 · 「그만 보내기」', /^보내는 중 2 \/ 2$/.test(pt) && !(await ev(`document.getElementById('stopBtn').hidden`)), pt);
  await shot('b4a2_sending.png');
  await cdp('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await until(`view === 'jobs' && !document.getElementById('jobOne').hidden`, 30000); await sleep(800);
  const s2 = setState('show');
  const nb = Object.keys(s2.batches).find(k => k !== '2099-12-01_1200');
  check('보내면 새 편: 남긴 사진은 베끼고 더한 것은 올림 · 옛 묶음 그대로', s2.current && s2.current !== '2099-12-01_1200' && JSON.stringify(s2.batches[nb].filter(n => !n.endsWith('.txt') && !n.endsWith('.json'))) === JSON.stringify(['a.png', 'more.mov'])
    && s2.batches['2099-12-01_1200'].includes('b.png'), JSON.stringify(s2.batches));
  check('새 편 Jobs: 보내신 것을 살펴보는 중이에요', (await band()).t === '보내신 것을 살펴보는 중이에요');
  check('초안은 비워짐', (await ev(`DRAFT === null && document.getElementById('draftCard').hidden`)));
} catch (e) { check('스크립트 오류', false, String(e)); }
fs.writeFileSync(path.join(outDir, 'screen_report_b4a2.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ total: report.length, ok: report.filter(r => r.ok).length, bad: report.filter(r => !r.ok) }));
ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(report.every(r => r.ok) ? 0 : 1); }, 800);
