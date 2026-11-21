// 묶음 5 + 3-2 화면 시험 — Face 확인(화5-2) · 고르는 물음(화7 가) · 개발자(화7 나) · 사용량(화7 다) · '지금' 줄 · 없앤 것. 저장소 밖 시험 도구
// node screen_b5_test.mjs <주소> <그림 폴더> <chrome> — 작업은 b5_setup.py가 만든 다섯 (TEST_PIN은 시험 값)
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
const [,, base, outDir, chrome] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const prof = fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'b5-chrome-'));
const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets; for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {} await sleep(200); }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const wait = {};
ws.onmessage = m => { const j = JSON.parse(m.data); if (j.id && wait[j.id]) { wait[j.id](j); delete wait[j.id]; } };
const cdp = (method, params = {}) => new Promise(r => { const i = ++id; wait[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400)); return r.result.result.value; };
const shot = async name => { const r = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true }); fs.writeFileSync(path.join(outDir, name), Buffer.from(r.result.data, 'base64')); };
const report = []; const check = (name, ok, detail) => report.push({ name, ok: !!ok, detail });
const txt = `document.getElementById('stepList').innerText`;
const DEV = /카드|스레드|프롬프트|Claude|ChatGPT|Codex|Preflight|Copy Prompt|Do It Myself|Mark Done|시작 전 점검/;
const open = async j => { await ev(`current = '${j}'; show('job')`); await sleep(1500); };
try {
  await cdp('Page.enable'); await cdp('Runtime.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1500);
  await ev(`fetch('/api/login', {method:'POST', headers:{'X-Upload-App':'1','Content-Type':'application/json'}, body: JSON.stringify({pin: '${process.env.TEST_PIN}'})})`);
  await cdp('Page.navigate', { url: base + '/' }); await sleep(1500);
  await ev(`show('jobs')`); await sleep(1500);
  check('Jobs: 작업 다섯 · 점 9개씩', (await ev(`[...document.querySelectorAll('#jobList .job')].map(b => b.querySelectorAll('.dot').length).join(',')`)) === '9,9,9,9,9');
  check('Jobs: 맨 위 띠 · 「시작 전 점검」 없음', !(await ev(`!!document.getElementById('terraBand') || !!document.getElementById('pfBox')`)) && !DEV.test(await ev(`document.getElementById('v-jobs') ? document.getElementById('v-jobs').innerText : document.body.innerText`)));
  await shot('b5_jobs.png');

  // 1) Face — 화5-2
  await open('2099-10-01_face');
  check('보이는 차례: Send · Intake · Script · Face · Edit …', (await ev(`[...document.querySelectorAll('#stepList .nm')].map(e => e.firstChild.textContent.trim()).slice(0, 5).join('|')`)) === 'Send|Intake|Script|Face|Edit');
  check('Face 번호 ④', (await ev(`[...document.querySelectorAll('#stepList .step')][3].querySelector('.num').textContent`)) === '4');
  const t1 = await ev(txt);
  check('나란히: 시술 후 · AI 얼굴 그림 둘', (await ev(`[...document.querySelectorAll('#stepList .thumbs div')].map(d => d.style.backgroundImage).filter(Boolean).length`)) === 2);
  check('얼굴 그림을 주소로 받음 (image/png)', (await ev(`Promise.all([...document.querySelectorAll('#stepList .thumbs div')].map(d => fetch(d.style.backgroundImage.slice(5, -2)).then(r => r.status + ' ' + r.headers.get('content-type')))).then(a => a.join(','))`)) === '200 image/png,200 image/png');
  check('「이 사진으로 갈게요 →」 · 「다시 만들기 (2번 남음)」 · 「가진 사진 올리기」', ['이 사진으로 갈게요 →', '다시 만들기 (2번 남음)', '가진 사진 올리기'].every(s => t1.includes(s)), t1.slice(0, 300));
  check('머리 다름 노랑 띠', (await ev(`[...document.querySelectorAll('#stepList .why.w')].some(e => e.textContent.includes('머리가 조금 달라 보여요'))`)));
  check('잠긴 줄: 합성 표시 늘 🔒', t1.includes('얼굴 : AI 합성 표시는 영상에 항상 들어가요 🔒'));
  check('Face 칸에 개발 말 없음', !DEV.test(t1));
  await shot('b5_face_check.png');
  await ev(`document.querySelector('[data-face="approve"]').click()`); await sleep(1800);
  const s1 = await ev(`fetch('/api/job?id=2099-10-01_face').then(r => r.json()).then(j => [j.steps[8].state, j.steps[3].state, j.queue.map(q => q.kind).join('+')].join('|'))`);
  check('「이 사진으로 갈게요 →」 → Face 완료 · Edit 진행 · 차례표에 edit', s1 === 'done|now|edit', s1);

  // 2) 고르는 물음 — 화7 가
  await open('2099-10-02_ask');
  const t2 = await ev(txt);
  check('「골라 주세요」 · 까닭 · 고를 것 셋', t2.includes('골라 주세요') && t2.includes('고른 음악을 못 찾았어요') && (await ev(`[...document.querySelectorAll('[data-choose]')].map(b => b.textContent).join('|')`)) === '비슷한 곡으로|음악 없이|개발자에게 넘기기');
  check('물음일 때 ⚠ 칸 · Helpdesk가 겹쳐 나오지 않음', !(await ev(`!!document.querySelector('[data-hdstep="5"]')`)));
  await shot('b5_ask.png');
  await ev(`document.querySelector('[data-choose="음악 없이"]').click()`); await sleep(1800);
  const s2 = await ev(`fetch('/api/job?id=2099-10-02_ask').then(r => r.json()).then(j => [j.six.parts[1].state, j.six.now && j.six.now.kind, j.queue.map(q => q.kind).join('+')].join('|'))`);
  check('「음악 없이」 → Music 완료 · 물음 없어짐 · 차례표에 six', /^done\|(usage|wait)\|six$/.test(s2), s2);
  check('답한 뒤 고르는 단추 없음', !(await ev(`!!document.querySelector('[data-choose]')`)));

  // 3) 개발자 — 화7 나
  await open('2099-10-03_dev');
  const t3 = await ev(txt);
  check('「개발자가 볼게요」 · 하실 일 없어요 · 다른 작업은 그대로', t3.includes('개발자가 볼게요') && t3.includes('두 번 해 봤는데 안 됐어요. 이 작업은 개발자가 볼게요 — 하실 일 없어요.') && t3.includes('다른 작업은 그대로 진행돼요.'));
  check('Do It Myself · Mark Done · Copy Prompt 없음', !/Do It Myself|Mark Done|Copy Prompt/.test(await ev(`document.body.innerHTML`)));
  await shot('b5_dev.png');

  // 4) 사용량 — 화7 다
  await open('2099-10-04_usage');
  const t4 = await ev(txt);
  check('사용량: 아침 7시 뒤 저절로 · 하실 일 없어요', t4.includes('오늘 쓸 수 있는 양을 다 썼어요. 아침 7시 뒤 저절로 이어 가요 — 하실 일 없어요.'), t4.slice(0, 300));
  await shot('b5_usage.png');

  // 5) '지금' 줄
  await open('2099-10-05_wait');
  check("'지금' 줄", (await ev(txt)).includes('지금: Voice 차례예요 — 맥의 도우미가 곧 해요'));
  check('⑥ 칸에 개발 말 없음', !DEV.test(await ev(txt)));

  // 6) Helpdesk — 다른 앱 열기 없음
  await ev(`hd = { issue: "etc", job: null, step: null }; openSheet('<div class="stack sec" id="hdSheet"></div>'); renderHd("hdSheet")`); await sleep(300);
  check('Helpdesk: 「글 복사하기」 하나 · 앱 열기 단추 없음', (await ev(`[...document.querySelectorAll('#hdSheet [data-hd]')].map(b => b.dataset.hd + ':' + b.textContent).join('|')`)) === 'copy:글 복사하기' && !/Claude|ChatGPT/.test(await ev(`document.getElementById('hdSheet').innerText`)));
  await shot('b5_helpdesk.png');
} catch (e) { check('스크립트 오류', false, String(e)); }
fs.writeFileSync(path.join(outDir, 'screen_report_b5.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ total: report.length, ok: report.filter(r => r.ok).length, bad: report.filter(r => !r.ok) }));
ws.close(); proc.kill(); setTimeout(() => { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} process.exit(report.every(r => r.ok) ? 0 : 1); }, 800);
