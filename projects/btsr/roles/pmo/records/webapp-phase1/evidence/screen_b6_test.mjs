// 묶음 6 화면 시험 — 화면 10(판 고르기) · 11(고칠 점 ?) · 12(v3 만드는 중) · 13(규격 맞추는 중 ?) · 승인 → Post(고칠 점 없음). 저장소 밖 시험 도구
// node screen_b6_test.mjs <주소> <그림 폴더> <chrome> <python> <state.py> <시험 폴더> <저장소>   (TEST_PIN은 시험 값)
import { spawn, execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
const [,, base, outDir, chrome, py, statepy, tdir, repo] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const setState = s => JSON.parse(execFileSync(py, [statepy, tdir, repo, s], { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } }).trim().split('\n').pop());
const prof = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'b6-chrome-'));
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
const band = () => ev(`({ t: document.querySelector('#nowBand .l1').firstChild.textContent, w: (document.querySelector('#nowBand .barf') || { style: {} }).style.width, pg: !!document.querySelector('#nowBand .pg'), q: !!document.querySelector('#nowBand [data-qb]') })`);
const card = () => ev(`document.getElementById('nowCard').innerText`);
const chips = () => ev(`[...document.querySelectorAll('#nowCard .chip')].map(c => c.textContent + (c.classList.contains('on') ? '*' : '')).join('|')`);
const click = sel => ev(`document.querySelector(${JSON.stringify(sel)}).click()`);
try {
  await cdp('Page.enable'); await cdp('Runtime.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1200);
  await ev(`fetch('/api/login', {method:'POST', headers:{'X-Upload-App':'1','Content-Type':'application/json'}, body: JSON.stringify({pin: '${process.env.TEST_PIN}'})})`);
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1500);

  // 화면 10 — 다 됐어요: 판 고르기 v1 · v2
  setState('s10'); await ev(`show('jobs')`); await sleep(1200);
  let b = await band();
  check('화면 10: 다 됐어요 — 확인해 주세요 · Done 8 / 9 · 89%', b.t === '다 됐어요 — 확인해 주세요' && b.w === '89%' && b.pg, JSON.stringify(b));
  check('화면 10: 판 고르기 v1 · v2(새 것) · "v2 · 14.4초" · 규격 맞음 ✓', (await chips()) === 'v1|v2*' && (await card()).includes('v2 · 14.4초') && (await card()).includes('릴스 규격에 맞아요 ✓'));
  check('화면 10: 「승인」 「사진 앱에 저장」 「고칠 점 적기」', (await ev(`[...document.querySelectorAll('#nowCard button[data-act]')].map(b => b.textContent).join('|')`)) === '승인|사진 앱에 저장|고칠 점 적기');
  check('화면에 설정 줄 · 바뀐 곳 없음', !/목소리:|음악:|바뀐 곳|장면 \d/.test(await card()));
  await shot('b6_s10_versions.png');
  await click('[data-selv="1"]'); await sleep(900);
  check('앞 판 고르기: v1 · 14.2초 · 저장만(승인 · 고칠 점 없음)', (await chips()) === 'v1*|v2' && (await card()).includes('v1 · 14.2초') && (await ev(`[...document.querySelectorAll('#nowCard button[data-act]')].map(b => b.textContent).join('|')`)) === '사진 앱에 저장');
  await click('[data-selv="2"]'); await sleep(900);

  // 화면 11 — 고칠 점 적기 + ?
  await click('#nowCard [data-act="fix"]'); await sleep(300);
  await click('[data-qs]'); await sleep(200);
  check('화면 11: 고칠 점 적기 ? — "보내면 새 영상(v3)으로 만들어요. 지금 영상(v2)은 그대로 남아요."', (await ev(`document.getElementById('qpops').textContent`)) === '보내면 새 영상(v3)으로 만들어요. 지금 영상(v2)은 그대로 남아요.'
    && (await ev(`[...document.querySelectorAll('#sheetBox .row button')].map(b => b.textContent).join('|')`)) === '취소|보내기');
  await shot('b6_s11_fix_sheet.png');
  await ev(`document.getElementById('fixText').value = '끝의 2초는 잘라 주세요'`); await click('[data-sendfix]'); await sleep(1500);

  // 화면 12 — v3 만드는 중
  b = await band();
  check('화면 12: v3을 만드는 중이에요(조사는 받침대로 — 3판 「v2를」) · 바 네 칸 가운데 하나 · 단계 이름 없음', b.t === 'v3을 만드는 중이에요' && b.w === '25%' && !b.pg, JSON.stringify(b));
  check('화면 12: 칩 v1 · v2 · "v3 만드는 중" · 고칠 점 한 줄 · 「고칠 점 적기」 잠김', (await chips()) === 'v1|v2*|v3 만드는 중' && (await card()).includes('끝의 2초는 잘라 주세요')
    && (await ev(`document.querySelector('#nowCard button[disabled]').textContent`)) === '고칠 점 적기');
  const s12 = setState('show');
  check('서버: 차례표에 edit(v3) · busy', s12.queue.some(n => n.endsWith('_edit.json')) && s12.busy === '2099-12-02_1200' && s12.fixes[1].to_v === 3, JSON.stringify(s12));
  await shot('b6_s12_making.png');

  // 화면 13 — 규격을 맞추는 중
  setState('s13'); await ev(`loadJob()`); await sleep(1000);
  b = await band();
  check('화면 13: 규격을 맞추는 중이에요 ? · 단계 이름 없음', b.t === '규격을 맞추는 중이에요' && b.q && !b.pg, JSON.stringify(b));
  await click('[data-qb]'); await sleep(200);
  check('? 글: "규격을 맞춘 영상이 나와야 승인할 수 있어요."', (await ev(`document.getElementById('qpopb').textContent`)) === '규격을 맞춘 영상이 나와야 승인할 수 있어요.');
  check('화면 13: ⚠ 릴스 규격과 달라요 · 지금 세로 720×1280 · 저장 잠김 · 「의견 · 고칠 점 적기」', (await card()).includes('⚠ 릴스 규격과 달라요') && (await card()).includes('지금 세로 720×1280')
    && (await ev(`document.querySelector('#nowCard [data-act="save"]').classList.contains('off')`)) && (await ev(`document.querySelector('#nowCard [data-act="fix"]').textContent`)) === '의견 · 고칠 점 적기');
  await shot('b6_s13_spec.png');
  await click('#nowCard [data-act="ok"]'); await sleep(1000);
  const s13 = setState('show');
  check('규격 다른 판의 「승인」 → 의견 · Jobs 그대로 · busy 그대로', (await ev(`view`)) === 'jobs' && s13.approvals.slice(-1)[0].kind === 'opinion' && s13.busy === '2099-12-02_1200', JSON.stringify(s13.approvals));

  // 규격 맞는 판 → 승인 → Post (고칠 점 없음)
  setState('s13ok'); await ev(`loadJob()`); await sleep(1000);
  await click('#nowCard [data-act="ok"]'); await sleep(1500);
  const s14 = setState('show');
  check('승인 → Post 탭 · busy 아님 · 차례표에 caption', (await ev(`view`)) === 'post' && s14.busy === null && s14.queue.some(n => n.endsWith('_caption.json')), JSON.stringify(s14));
  check('Post 카드: 「고칠 점 적기」 없음 · 영상은 승인한 v4', !(await ev(`!!document.querySelector('[data-fixpost]')`)) && (await ev(`document.querySelector('#postList [data-save]').dataset.save`)) === '2099-12-02_1200_v4.mp4');
  await shot('b6_post.png');
} catch (e) { check('스크립트 오류', false, String(e)); }
fs.writeFileSync(path.join(outDir, 'screen_report_b6.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ total: report.length, ok: report.filter(r => r.ok).length, bad: report.filter(r => !r.ok) }));
ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(report.every(r => r.ok) ? 0 : 1); }, 800);
