// 묶음 4-a 화면 시험 — 한 편 · 한 줄 + 바 · ask + 단추 · Send 흐림 ↔ 켜짐(바뀜 신호) · 그 자리 「더 보내기」 · 승인 → Post. 저장소 밖 시험 도구
// node screen_b4a_test.mjs <주소> <그림 폴더> <chrome> <python> <state.py> <시험 폴더> <저장소>   (TEST_PIN은 시험 값)
import { spawn, execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
const [,, base, outDir, chrome, py, statepy, tdir, repo] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const setState = s => JSON.parse(execFileSync(py, [statepy, tdir, repo, s], { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } }).trim().split('\n').pop());
const prof = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'b4a-chrome-'));
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
const DEV = /카드|스레드|프롬프트|Claude|ChatGPT|Codex|Preflight|하실 일 없어요|다른 작업은 그대로|①|②|③|④|⑤|⑥|⑦|⑧|⑨/;
const band = async () => ev(`({ t: document.querySelector('#nowBand .l1').textContent, w: (document.querySelector('#nowBand .barf') || {}).style ? document.querySelector('#nowBand .barf').style.width : null, pg: (document.querySelector('#nowBand .pg') || {}).innerText || '', cls: document.getElementById('nowBand').className, stop: !!document.querySelector('#nowBand .barf.stop'), badge: document.getElementById('jobBadge').hidden ? '' : document.getElementById('jobBadge').textContent })`);
const btns = async () => ev(`[...document.querySelectorAll('#nowCard button[data-act], #nowCard .chip')].map(b => b.textContent).join('|')`);
const until = async (expr, ms = 6000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(expr)) return Date.now() - t0; await sleep(250); } return -1; };
try {
  await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('DOM.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1200);
  await ev(`fetch('/api/login', {method:'POST', headers:{'X-Upload-App':'1','Content-Type':'application/json'}, body: JSON.stringify({pin: '${process.env.TEST_PIN}'})})`);
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1800);

  // 빈 Jobs · Send 켜짐
  await ev(`show('jobs')`); await sleep(1000);
  check('빈 Jobs: 한 줄 "아직 작업이 없어요"', (await ev(`document.getElementById('jobEmpty').hidden ? '' : document.getElementById('jobEmptyText').textContent`)) === '아직 작업이 없어요');
  await shot('b4a_empty.png');
  await ev(`show('up')`); await sleep(800);
  check('Send 켜짐 (만드는 것 없음)', !(await ev(`document.getElementById('pickBtn').disabled`)) && (await ev(`document.getElementById('sendBusy').hidden`)));
  check('Send: 안내 글 없음 · Options 머리 "기본값"', !/손님 이름|전화번호|🎤|찍은 영상·사진을 맥으로/.test(await ev(`document.getElementById('s-start').innerText`)) && (await ev(`document.getElementById('optSum').textContent`)).startsWith('기본값'));

  // 화면 2 — 보낸 뒤 (Send 화면을 열어 둔 채로 새 편 → 흐림이 스스로)
  setState('new');
  const t7 = await until(`document.getElementById('pickBtn').disabled && !document.getElementById('sendBusy').hidden`);
  check('화면 7: Send가 스스로 흐려짐 (바뀜 신호)', t7 >= 0 && t7 < 5000, `${t7}ms`);
  check('화면 7: "지금 한 편을 만드는 중이에요" · Request · Options 흐림', (await ev(`document.getElementById('sendBusyText').textContent`)) === '지금 한 편을 만드는 중이에요' && (await ev(`document.getElementById('reqCard').classList.contains('offc') && document.getElementById('upOpt').classList.contains('offc')`)));
  await shot('b4a_s07_send_busy.png');
  await ev(`show('jobs')`); await sleep(1200);
  let b = await band();
  check('화면 2: 보내신 것을 살펴보는 중이에요 · Intake 2 / 9 · 22%', b.t === '보내신 것을 살펴보는 중이에요' && b.pg.replace(/\s+/g, ' ') === 'Intake 2 / 9' && b.w === '22%', JSON.stringify(b));
  check('한 편만: 목록 · ← Jobs · 점 없음', !(await ev(`!!document.querySelector('.job, .dots, #backBtn, #jobList')`)));
  await shot('b4a_s02_intake.png');

  // 화면 3 — 스스로 바뀜
  setState('s3');
  const t3 = await until(`document.querySelector('#nowBand .l1').textContent === '원고를 쓰는 중이에요'`);
  check('화면 3: 원고를 쓰는 중이에요 · Script 3 / 9 — 다시 읽지 않아도 스스로', t3 >= 0 && t3 < 5000 && (await band()).pg.includes('3 / 9'), `${t3}ms`);

  // 화면 4 — 빠진 자료
  setState('s4'); await sleep(200); await ev(`loadJob()`); await sleep(1000);
  b = await band();
  check('화면 4: 확인해 주세요 · Intake 2 / 9 · 노랑 띠 · 배지 1', b.t === '확인해 주세요' && b.pg.includes('2 / 9') && / w$/.test(b.cls) && b.badge === '1', JSON.stringify(b));
  check('화면 4: 시술 전 사진이 없어요 · 「더 보내기」 「이대로 만들기」', (await ev(`document.querySelector('#nowCard .ask').textContent`)) === '시술 전 사진이 없어요' && (await btns()) === '더 보내기|이대로 만들기');
  check('화면 4: 칸 — 시술 전 없음 · AI 얼굴 만들 예정', /시술 전\s*없음/.test(await ev(`document.querySelector('#nowCard .thumbs').innerText`)) && /AI 얼굴\s*만들 예정/.test(await ev(`document.querySelector('#nowCard .thumbs').innerText`)));
  await shot('b4a_s04_missing.png');
  // 기준 3-1: 그 자리에서 더 보내기 — Send 탭으로 가지 않음
  fs.writeFileSync(path.join(tdir, 'more.png'), Buffer.from('89504e470d0a1a0a', 'hex'));
  await ev(`MORE = { kind: "more", qid: "missing", label: "더 보내기" }`);
  const doc = await cdp('DOM.getDocument'); const node = await cdp('DOM.querySelector', { nodeId: doc.result.root.nodeId, selector: '#jobPicker' });
  await cdp('DOM.setFileInputFiles', { nodeId: node.result.nodeId, files: [path.join(tdir, 'more.png')] }); await sleep(2500);
  check('기준 3-1: 더 보내기 받아짐 → 그 한 편 화면 (Jobs 그대로 · 접수 다시)', (await ev(`view`)) === 'jobs' && (await band()).t === '보내신 것을 살펴보는 중이에요', JSON.stringify(await band()));
  check('기준 3-1: 올린 파일이 같은 묶음에', fs.existsSync(path.join(tdir, 'data', 'incoming', '2099-11-01_1200', 'more.png')));
  check('기준 3-1: Send 탭은 흐린 채', (await ev(`fetch('/api/now').then(r => r.json()).then(j => j.busy)`)) === '2099-11-01_1200' && (await ev(`document.getElementById('pickBtn').disabled`)));

  // 원고 확인
  setState('script'); await ev(`loadJob()`); await sleep(900);
  check('원고 확인: 원고 · 「이 원고로 갈게요 →」 「고칠 점 적기」', (await btns()) === '이 원고로 갈게요 →|고칠 점 적기' && (await ev(`document.querySelectorAll('#nowCard ol.script li').length`)) === 3);

  // 화면 5 — Face · ? 표
  setState('s5'); await ev(`loadJob()`); await sleep(900);
  b = await band();
  check('화면 5: 확인해 주세요 · Face 4 / 9 · 44%', b.t === '확인해 주세요' && b.pg.includes('Face') && b.pg.includes('4 / 9') && b.w === '44%', JSON.stringify(b));
  check('화면 5: 머리 색과 모양이 같은가요? · 사진 둘 · 「이 사진으로 갈게요 →」 「다시 만들기」', (await ev(`document.querySelector('#nowCard .ask').firstChild.textContent`)) === '머리 색과 모양이 같은가요?' && (await ev(`document.querySelectorAll('#nowCard .vid').length`)) === 2 && (await btns()).startsWith('이 사진으로 갈게요 →|다시 만들기'));
  check('화면 5: 합성 표시가 사진 위에', (await ev(`document.querySelector('#nowCard .vid em').textContent`)) === '얼굴 : AI 합성');
  await ev(`document.querySelector('[data-q]').click()`); await sleep(200);
  check('? 표: 글 그대로 (몇 번 더는 FACE_REMAKES)', (await ev(`document.getElementById('qpop').hidden ? '' : document.getElementById('qpop').textContent`)) === '머리는 그대로 두고 얼굴만 새로 만든 사진이에요. 다시 만들기는 3번 더 할 수 있어요.');
  await shot('b4a_s05_face.png');

  // 화면 6 — 만드는 중
  setState('s6'); await ev(`loadJob()`); await sleep(900);
  b = await band();
  check('화면 6: 목소리를 넣는 중이에요 · Voice · Music · Fit · Export 7 / 9 · 78% · 배지 없음', b.t === '목소리를 넣는 중이에요' && b.pg.includes('Voice · Music · Fit · Export') && b.pg.includes('7 / 9') && b.w === '78%' && b.badge === '', JSON.stringify(b));
  check('화면 6: 둘째 줄 안내 · 단추 없음', (await ev(`document.getElementById('nowCard').hidden`)) && (await ev(`document.querySelectorAll('#nowBand > div').length`)) === 3);
  check('Jobs 화면에 개발 말 · 숫자 칸 없음', !DEV.test(await ev(`document.getElementById('v-jobs').innerText`)));
  await shot('b4a_s06_making.png');

  // 화면 8(막힘 — 17번 뒤: 지금 글 + 빨간 바)
  setState('s8'); await ev(`loadJob()`); await sleep(900);
  b = await band();
  check('막힘: 빨간 바 · Edit 5 / 9 · 지금 글 그대로', b.stop && / b$/.test(b.cls) && b.pg.includes('5 / 9') && b.t === '장면을 이어 붙이지 못했어요', JSON.stringify(b));
  await shot('b4a_s08_stop.png');

  // 화면 10 — 다 됨 → 승인 → Post · Send 켜짐
  setState('s10'); await ev(`loadJob()`); await sleep(900);
  b = await band();
  check('화면 10: 다 됐어요 — 확인해 주세요 · Done 8 / 9 · 89%', b.t === '다 됐어요 — 확인해 주세요' && b.pg.includes('8 / 9') && b.w === '89%', JSON.stringify(b));
  check('화면 10: 「승인」 「사진 앱에 저장」 「고칠 점 적기」', (await btns()) === '승인|사진 앱에 저장|고칠 점 적기');
  await shot('b4a_s10_done.png');
  await ev(`document.querySelector('#nowCard [data-act="ok"]').click()`); await sleep(1500);
  check('승인 → Post 탭', (await ev(`view`)) === 'post');
  await ev(`show('up')`); await sleep(800);
  check('승인 뒤 Send 켜짐', !(await ev(`document.getElementById('pickBtn').disabled`)) && (await ev(`document.getElementById('sendBusy').hidden`)));
} catch (e) { check('스크립트 오류', false, String(e)); }
fs.writeFileSync(path.join(outDir, 'screen_report_b4a.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ total: report.length, ok: report.filter(r => r.ok).length, bad: report.filter(r => !r.ok) }));
ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(report.every(r => r.ok) ? 0 : 1); }, 800);
