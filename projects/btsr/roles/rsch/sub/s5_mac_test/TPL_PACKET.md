# TPL 패킷 — 템플릿 1번(시술 사례 세로 릴스 · 1101 모양)을 받은 사진·영상으로 한 편 (판 1)

> **⓪ 이 글을 받은 창이 Creative Director 창(제품 저장소)이면 직접 하지 않는다.** 아래 한 줄로 이 글을 `~/oc-test/TPL_PACKET.md`에 두고, 한알님께 이렇게만 말씀드린다: **"ChatGPT(Codex)에서 작업 폴더 `oc-test`를 고르시고 「TPL_PACKET.md 대로 해」라고 하세요."** (한알 11-21 02:44 「챗gpt가 진행하는걸로」)
>
> ```zsh
> git -C ~/mitchell_branches/opencut-test fetch -q origin test/opencut-classic-20261120 && git -C ~/mitchell_branches/opencut-test show FETCH_HEAD:app/opencut-test/TPL_PACKET.md > ~/oc-test/TPL_PACKET.md && echo "둠"
> ```

| 칸 | 값 |
|---|---|
| 쓴 이 · 때 | `MITCHELL_STUDIO/BTSR/RSCH`(한알님의 윈도 PC) · 2026-11-21 03:07 KST |
| 할 이 | 맥의 **ChatGPT(Codex)** — 작업 폴더 `~/oc-test` |
| 하는 것 | 분류된 ChatGPT 첨부에서 한 편을 골라 → AI 얼굴 · 시술 후 · 시술 전 + 그 대화의 자막 글 → **14초 MP4 한 편**(OpenChatCut으로 놓고 뽑음) → 한알님께 보여 드림 |
| 근거 | 템플릿 확정본 `agents/rsch/templates/reel-workflow.md`(11-09) 5번 1101 예시 · 40건 정리 `agents/rsch/research/2026-11-09_video-workflow-requirements.md` · 한알 11-21 02:40 「처음에 손님 영상을 다른 얼굴로 합성을 하거든요 챗gpt에 맡겨서」 · 02:40 「사진이요」 |
| 이 PC에서 먼저 | 가짜 소재로 같은 변환기를 돌림: 조각 18~27개 · 'AI 합성' 트랙 잠김 · 14.0초 · H.264 1080×1920 30fps · AAC 48k · 뽑기 24~31초 · 목소리 길(가짜 소리로) · 목소리 없을 때 그냥 넘어감 — 모두 됨. 맥의 `say` 한국어 목소리는 이 PC에서 못 돌려 봄 |

**만드는 꼴 (템플릿 1101 — 기본 9.8초 + 앞 4.2초 반복 = 14초)**

| 초 | 장면 | 표시 |
|---|---|---|
| 0~1.0 | AI 얼굴 사진 | 'AI 합성'(왼쪽 위 · 잠김) |
| 1.0~7.8 | 시술 후(영상이면 영상, 짧으면 처음부터 이어 붙임) | |
| 7.8~8.8 | 시술 전 | '시술 전'(위) |
| 8.8~9.8 | AI 얼굴 사진 | 'AI 합성' |
| 9.8~14.0 | 앞 0~4.2초 반복(AI 얼굴 → 시술 후) | 'AI 합성'(9.8~10.8) |
| 0~13.77 | 자막 6~8블록(흰 글씨 · 검은 테두리 · 세로 69% 자리) · 목소리(맥 한국어 음성, 블록마다 · 길면 1.5배까지 빠르게) · 영상 원래 소리 끔 | |

---

## 1. 지킬 것

1. **쓰는 곳은 `~/oc-test/` 안만.** 제품 저장소(아래 `$R`)는 **읽기만** — 고른 편의 파일은 `~/oc-test/real/`로 **복사**해서 쓴다. `data/` · 원본 · git에 쓰지 않는다.
2. 설치 · `sudo` · `brew` · 맥 설정 바꾸기 없음. 한국어 목소리가 없으면 목소리 없이 간다(받지 않음). 화면을 찍거나 대신 누르지 않는다.
3. **손님 사진 · 영상 · 뽑은 MP4는 어디에도 올리지 않는다.** 올리는 것은 결과 글 `TPL_RESULTS.md` 하나뿐 — 파일 이름 대신 '사진 1'처럼, 손님 이름 · 연락처 · 사진 속 사람 설명 · `/Users/…` 경로 · 대화 링크 없음.
4. **한알님은 맥에서 긴 글을 치기 어렵다.** 묻는 것은 한 줄 + 번호(1 · 2 …). 단계를 마칠 때마다 한 줄로 알린다("T2 끝 · 다음 T3").
5. 시각은 `TZ=Asia/Seoul date '+%F %T KST'`로 찍는다.
6. 같은 일이 두 번 실패하면 오류 끝 20줄을 결과 글에 적고 번호로 여쭌다. 샌드박스 때문에 막히면(뽑기의 Chrome · push) 같은 명령을 승인 받아 다시 — 한알님은 '승인'만 누르시면 된다.
7. 다른 프로젝트 이름을 쓴다 — 같은 이름으로 두 번 돌리면 조각이 겹쳐 들어간다(다시 할 때 `tpl-<번호>-2`).

## 2. 차례

### T0. 준비 확인 (앞 맥 시험 A0~A6에서 깔린 Node 24 · ffmpeg · 글꼴 · OpenChatCut)

```zsh
source ~/oc-test/env.sh && node -v && "$FF" -version | head -1 && ls "$OCC_DIR/cli/main.ts" "$FONT" >/dev/null && echo "준비 됨"
lsof -nP -iTCP:5199 -sTCP:LISTEN | tail -n +2; R=$(git -C ~/mitchell_branches/opencut-test worktree list --porcelain | awk '/^worktree /{print $2; exit}'); printf '%s' "$R" > ~/oc-test/repo.path; echo "제품 저장소: $(printf %s "$R" | sed "s#$HOME#~#")"
say -v '?' | grep -i 'ko[_-]KR' | head -2 || echo "한국어 목소리 없음(목소리 없이 감)"
```

- `준비 됨`이 안 나오면 멈추고 여쭌다(앞 지시문의 A0~A3이 필요). 5199를 누가 쓰고 있어도 이 일은 상관없다(편집기 화면을 띄우지 않음).

### T1. 변환기 만들기 — 아래 칸을 글자 하나 바꾸지 말고

```zsh
cat > ~/oc-test/tpl_reel.mjs <<'EOF'
#!/usr/bin/env node
// tpl_reel.mjs — 템플릿 1번(시술 사례 세로 릴스 · 1101 모양)을 OpenChatCut 프로젝트로 채우고 뽑는 RSCH 시험 변환기(제품 코드 아님).
// 소재 넷(+선택 둘) → 14초: AI 얼굴 → 시술 후 → 시술 전(표시) → AI 얼굴 → 앞 4.2초 반복 · 자막 블록(흰 글씨 · 검은 테두리) · 'AI 합성' 잠금 · 목소리 · 음악.
// 쓰는 법: OCC_DIR FF FONT OPENCHATCUT_DATA_DIR 환경 변수 + node tpl_reel.mjs --ai <사진> --after <영상|사진> --before <영상|사진> --script <글 파일> --out <폴더> --project <이름>
//          [--music <소리>] [--voice say|none] [--render yes|no]
// 글 파일: 한 줄 = 자막 한 블록(빈 줄 무시, 8블록 안팎). 손님 이름 · 연락처를 넣지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const need = (k) => { const v = process.env[k]; if (!v) { console.error(`환경 변수 ${k}가 없음`); process.exit(2); } return v; };
const OCC = need('OCC_DIR'); const FF = need('FF'); const FONT = need('FONT'); need('OPENCHATCUT_DATA_DIR');
const arg = {}; const av = process.argv.slice(2);
for (let i = 0; i < av.length; i += 2) arg[av[i].replace(/^--/, '')] = av[i + 1];
for (const k of ['ai', 'after', 'before', 'script', 'out', 'project']) if (!arg[k]) { console.error(`--${k} 가 없음`); process.exit(2); }
const VOICE = arg.voice || 'none'; const RENDER = (arg.render || 'yes') === 'yes';
const say = (...a) => console.error('[tpl]', ...a);
const t0 = Date.now();

// ── 템플릿 1101 모양(초) — reel-workflow.md 5번: 기본 9.8초 + 앞 0~4.2초 반복 = 14초 ──
const W = 1080, H = 1920, FPS = 30, LEN = 14.0;
const T = { ai1: [0, 1.0], after: [1.0, 7.8], before: [7.8, 8.8], ai2: [8.8, 9.8], base: 9.8, repeat: 4.2 };
const fr = (s) => Math.round(s * FPS);
const OUT = path.resolve(arg.out).replace(/\\/g, '/'); const GEN = OUT + '/gen';
fs.mkdirSync(GEN, { recursive: true });

function run(bin, args, opt = {}) { const r = spawnSync(bin, args, { encoding: 'utf8', maxBuffer: 64 << 20, ...opt }); if (r.status !== 0) throw new Error(`${path.basename(bin)} ${args.slice(0, 3).join(' ')}: ${(r.stderr || '') + (r.error || '')}`.slice(0, 1500)); return r.stdout; }
const ff = (args) => run(FF, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { cwd: GEN });
function occ(args) { return JSON.parse(run(process.execPath, ['--import', 'tsx', OCC + '/cli/main.ts', ...args, '--json'], { cwd: OCC, env: process.env })); }
function dur(file) { // ffmpeg -i 의 Duration 줄로 길이(초)
  const r = spawnSync(FF, ['-hide_banner', '-i', file], { encoding: 'utf8' });
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(r.stderr || ''); return m ? (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]) : 0;
}
const isVideo = (f) => /\.(mp4|mov|m4v|webm)$/i.test(f);
function stillToPng(src, out) { // 사진 → 1080×1920 꽉 채움(가운데 기준 자름). HEIC는 맥 sips로 먼저 바꿈
  let s = path.resolve(src);
  if (/\.(heic|heif)$/i.test(s)) { const j = GEN + '/' + path.basename(out, '.png') + '_src.jpg'; run('sips', ['-s', 'format', 'jpeg', s, '--out', j]); s = j; }
  ff(['-i', s, '-vf', `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},format=rgb24`, '-frames:v', '1', out]);
}
function videoToMp4(src, out) { // 영상 → H.264 1080×1920 30fps 소리 없음(아이폰 HEVC · 돌림 정보도 여기서 풂)
  ff(['-i', path.resolve(src), '-vf', `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${FPS},format=yuv420p`, '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', out]);
  return dur(GEN + '/' + out);
}

// 1. 소재 고르기 — 이름은 겹치지 않게 tpl_ 머리
const S = {};
stillToPng(arg.ai, 'tpl_ai.png'); S.ai = 'tpl_ai.png';
if (isVideo(arg.after)) { S.afterDur = videoToMp4(arg.after, 'tpl_after.mp4'); S.after = 'tpl_after.mp4'; } else { stillToPng(arg.after, 'tpl_after.png'); S.after = 'tpl_after.png'; }
if (isVideo(arg.before)) { S.beforeDur = videoToMp4(arg.before, 'tpl_before.mp4'); S.before = 'tpl_before.mp4'; } else { stillToPng(arg.before, 'tpl_before.png'); S.before = 'tpl_before.png'; }

// 2. 장면 — 기본 9.8초 + 반복(앞 4.2초를 같은 소재 · 같은 원본 자리로 다시 놓음)
const scenes = [];
function put(role, file, a, b, srcStart, ai) { if (b - a > 0.01) scenes.push({ role, file, start: +a.toFixed(3), end: +b.toFixed(3), src: +srcStart.toFixed(3), ai: !!ai }); }
function putClip(role, file, clipDur, a, b, srcStart, ai) { // 영상이 짧으면 처음부터 다시 이어 붙임
  if (!clipDur) return put(role, file, a, b, 0, ai);
  let t = a, s = srcStart % clipDur;
  while (b - t > 0.01) { const n = Math.min(b - t, clipDur - s); put(role, file, t, t + n, s, ai); t += n; s = 0; }
}
put('ai_face', S.ai, ...T.ai1, 0, true);
putClip('after', S.after, S.afterDur, ...T.after, 0);
putClip('before', S.before, S.beforeDur, ...T.before, 0);
put('ai_face', S.ai, ...T.ai2, 0, true);
for (const sc of scenes.filter((x) => x.end <= T.repeat + 1e-6 || x.start < T.repeat).slice()) { // 반복: 0~4.2초 구간을 9.8초 뒤로
  const a = Math.max(sc.start, 0), b = Math.min(sc.end, T.repeat); if (b - a <= 0.01) continue;
  put(sc.role + '_rep', sc.file, T.base + a, T.base + b, sc.src + (a - sc.start), sc.ai);
}
// 표시 구간: AI 장면마다(붙어 있으면 하나로) · 시술 전
const spans = (pred) => scenes.filter(pred).map((x) => [x.start, x.end]).sort((p, q) => p[0] - q[0])
  .reduce((acc, s) => { const l = acc[acc.length - 1]; if (l && s[0] - l[1] < 0.02) l[1] = Math.max(l[1], s[1]); else acc.push([...s]); return acc; }, []);
const aiSpans = spans((x) => x.ai); const beforeSpans = spans((x) => x.role === 'before');

// 3. 자막 블록 · 목소리
const lines = fs.readFileSync(arg.script, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
if (!lines.length) throw new Error('글 파일이 비었음');
const CAP_END = 13.77; // 1101: 자막 0~13.767
let caps = lines.map((text, i) => ({ n: i + 1, text }));
let voiced = false;
if (VOICE === 'say') { // 맥 기본 한국어 목소리(설치 · 키 없음). 없으면 목소리 없이
  const v = spawnSync('say', ['-v', '?'], { encoding: 'utf8' });
  const ko = (v.stdout || '').split('\n').find((l) => /ko[_-]KR/.test(l));
  if (ko) {
    const name = ko.split(/\s{2,}|\s+ko[_-]KR/)[0].trim();
    try {
      for (const c of caps) { const aiff = `${GEN}/tpl_v${c.n}.aiff`; run('say', ['-v', name, '-r', '260', '-o', aiff, c.text]); ff(['-i', aiff, '-ar', '48000', '-ac', '2', '-metadata', `title=tpl_v${c.n}`, `tpl_v${c.n}.wav`]); c.vdur = dur(`${GEN}/tpl_v${c.n}.wav`); }
      voiced = caps.every((c) => c.vdur > 0.2); say('목소리', name, voiced ? '됨' : '길이 0 — 목소리 없이');
    } catch (e) { voiced = false; say('목소리 만들기 실패 — 목소리 없이:', String(e.message).slice(0, 200)); }
  } else say('한국어 목소리 없음 — 목소리 없이');
}
{ // 시각: 목소리가 있으면 그 길이대로(넘치면 1.5배까지 빠르게), 없으면 글자 수에 비례
  const gap = 0.12;
  const w = caps.map((c) => (voiced ? c.vdur : Math.max(4, [...c.text].length)));
  let total = w.reduce((a, b) => a + b, 0) + gap * (caps.length - 1);
  let speed = 1;
  if (voiced && total > CAP_END) { speed = Math.min(1.5, total / CAP_END); }
  const scale = voiced ? 1 / speed : CAP_END / total;
  let t = 0;
  caps.forEach((c, i) => { const d = voiced ? w[i] / speed : w[i] * scale; c.start = +t.toFixed(3); c.end = +Math.min(CAP_END, t + (voiced ? Math.max(d, 0.6) : d)).toFixed(3); c.speed = speed; t = c.end + (voiced ? gap : gap * scale); });
  if (voiced && speed > 1) for (const c of caps) { ff(['-i', `tpl_v${c.n}.wav`, '-af', `atempo=${speed.toFixed(3)}`, '-metadata', `title=tpl_v${c.n}f`, `tpl_v${c.n}f.wav`]); c.vfile = `tpl_v${c.n}f.wav`; c.vdur = dur(`${GEN}/${c.vfile}`); }
  else for (const c of caps) c.vfile = `tpl_v${c.n}.wav`;
  caps = caps.filter((c) => c.end - c.start > 0.2);
}

// 4. 글자 그림(투명 PNG) — 줄마다 drawtext(text_align 없는 ffmpeg 6.0에서도 됨)
fs.copyFileSync(FONT, GEN + '/font.ttf');
const STYLE = 'fontfile=font.ttf:expansion=none:fontcolor=white:bordercolor=black';
function wrap(t, max = 13) { // 한 줄(13자 안팎) · 두 줄은 길이를 고르게 · 그보다 길면 13자씩
  const L = (s) => [...s].length; const w = t.split(/\s+/);
  if (L(t) <= max) return [t];
  if (L(t) <= max * 2 + 2 && w.length > 1) {
    let best = null;
    for (let i = 1; i < w.length; i++) { const a = w.slice(0, i).join(' '), b = w.slice(i).join(' '); const d = Math.abs(L(a) - L(b)); if (!best || d < best.d) best = { a, b, d }; }
    return [best.a, best.b];
  }
  const out = []; let cur = '';
  for (const x of w) { const nx = cur ? cur + ' ' + x : x; if (L(nx) > max && cur) { out.push(cur); cur = x; } else cur = nx; }
  if (cur) out.push(cur);
  return out;
}
function textPng(out, ls, { size, border, cy, x }) {
  const LH = Math.round(size * 1.45); const top = Math.round(cy - (ls.length * LH) / 2);
  const f = ls.map((ln, i) => { const tf = `${out}.l${i}.txt`; fs.writeFileSync(`${GEN}/${tf}`, ln); return `drawtext=${STYLE}:textfile=${tf}:fontsize=${size}:borderw=${border}:x=${x ?? '(w-text_w)/2'}:y=${top + i * LH}`; }).join(',');
  ff(['-f', 'lavfi', '-i', `color=c=black@0:s=${W}x${H},format=rgba`, '-vf', f, '-frames:v', '1', out]);
}
const capY = Math.round(H * 0.69);
for (const c of caps) { c.lines = wrap(c.text); textPng(`tpl_cap${c.n}.png`, c.lines, { size: 66, border: 5, cy: capY }); }
textPng('tpl_ai_label.png', ['AI 합성'], { size: 44, border: 4, cy: Math.round(H * 0.075), x: '60' });
textPng('tpl_before_label.png', ['시술 전'], { size: 56, border: 5, cy: Math.round(H * 0.16) });
let music = null;
if (arg.music) { music = 'tpl_music.wav'; ff(['-i', path.resolve(arg.music), '-t', String(LEN), '-ar', '48000', '-ac', '2', '-af', `afade=t=out:st=${LEN - 0.6}:d=0.6`, music]); }
const tMake = Date.now();

// 5. 넣기 — 프로젝트(없으면 만듦) · 소재 (내용이 똑같은 파일은 OpenChatCut이 하나로 합치므로 소리 파일마다 title을 달아 둠)
try { occ(['project', 'new', arg.project, '--size', `${W}x${H}`, '--fps', String(FPS)]); } catch (e) { say('프로젝트 있음 또는 만들기 실패 — 그대로 씀:', String(e.message).slice(0, 120)); }
const files = [...new Set([S.ai, S.after, S.before, ...caps.map((c) => `tpl_cap${c.n}.png`), 'tpl_ai_label.png', 'tpl_before_label.png', ...(voiced ? caps.map((c) => c.vfile) : []), ...(music ? [music] : [])])];
const imp = occ(['tools', 'call', 'import_assets', '--project', arg.project, '--args', JSON.stringify({ paths: files.map((f) => GEN + '/' + f) }), '--apply']);
say('넣기', imp.terminal?.status, (imp.ops?.[0]?.result?.imported || []).length, '개');
const pool = occ(['media', 'ls', '--project', arg.project]); const assets = Array.isArray(pool) ? pool : pool.assets || pool.media || [];
const idOf = (name) => { const a = assets.filter((x) => x.name === name).pop(); if (!a) throw new Error('pool에 없음: ' + name); return a.id; };

// 6. 놓기 — V1 장면 · V2 자막 · V3 시술 전 표시 · V4 'AI 합성'(잠금) · A1 목소리 · A2 음악
const adds = [];
for (const sc of scenes) {
  if (/\.mp4$/.test(sc.file)) adds.push({ type: 'video', assetId: idOf(sc.file), track: 'V1', fromFrame: fr(sc.start), sourceStartFrame: fr(sc.src), sourceDurationInFrames: fr(sc.end) - fr(sc.start) });
  else adds.push({ type: 'image', assetId: idOf(sc.file), track: 'V1', fromFrame: fr(sc.start), durationInFrames: fr(sc.end) - fr(sc.start) });
}
for (const c of caps) adds.push({ type: 'image', assetId: idOf(`tpl_cap${c.n}.png`), track: 'V2', fromFrame: fr(c.start), durationInFrames: fr(c.end) - fr(c.start) });
for (const [a, b] of beforeSpans) adds.push({ type: 'image', assetId: idOf('tpl_before_label.png'), track: 'V3', fromFrame: fr(a), durationInFrames: fr(b) - fr(a) });
for (const [a, b] of aiSpans) adds.push({ type: 'image', assetId: idOf('tpl_ai_label.png'), track: 'V4', fromFrame: fr(a), durationInFrames: fr(b) - fr(a) });
if (voiced) for (const c of caps) adds.push({ type: 'audio', assetId: idOf(c.vfile), track: 'A1', fromFrame: fr(c.start), durationInFrames: Math.max(1, Math.min(fr(c.vdur), fr(LEN) - fr(c.start))) });
if (music) adds.push({ type: 'audio', assetId: idOf(music), track: 'A2', fromFrame: 0, sourceStartFrame: 0, sourceDurationInFrames: Math.min(fr(LEN), fr(dur(GEN + '/' + music))) });
const ops = [
  { tool: 'edit_track', args: { action: 'create', json: JSON.stringify({ trackType: 'video', count: 3 }) } },
  { tool: 'edit_track', args: { action: 'create', json: JSON.stringify({ trackType: 'audio', count: 2 }) } },
  { tool: 'edit_item', args: { adds } },
];
fs.writeFileSync(`${GEN}/ops1.json`, JSON.stringify(ops, null, 2));
const e1 = occ(['edit', '--project', arg.project, '--ops', `@${GEN}/ops1.json`, '--apply']);
say('놓기', e1.terminal?.status ?? e1.applied, JSON.stringify(e1.ops?.map((o) => o.result?.ok ?? o.result?.error ?? o.error)).slice(0, 300));

// 7. 고치기 — 영상 원래 소리 끔 · 음악 크기(목소리 있으면 −18dB, 없으면 −10dB) · 'AI 합성' 트랙 잠금
const list0 = occ(['timeline', 'items', '--project', arg.project]); const items = Array.isArray(list0) ? list0 : list0.items || [];
const byName = (n) => items.filter((x) => x.name === n);
const updates = [];
for (const f of [S.after, S.before]) if (/\.mp4$/.test(f)) for (const it of byName(f)) updates.push({ type: 'video', itemId: it.id, volume: 0 });
if (music) for (const it of byName(music)) updates.push({ type: 'audio', itemId: it.id, volume: Number((10 ** ((voiced ? -18 : -10) / 20)).toFixed(3)) });
const ops2 = updates.length ? [{ tool: 'edit_item', args: { updates } }] : [];
const lab = byName('tpl_ai_label.png'); const labTrack = lab[0]?.track || lab[0]?.trackId;
if (labTrack) ops2.push({ tool: 'edit_track', args: { action: 'update', trackId: labTrack, json: JSON.stringify({ locked: true }) } });
fs.writeFileSync(`${GEN}/ops2.json`, JSON.stringify(ops2, null, 2));
const e2 = occ(['edit', '--project', arg.project, '--ops', `@${GEN}/ops2.json`, '--apply']);
say('고치기', e2.terminal?.status ?? e2.applied, JSON.stringify(e2.ops?.map((o) => o.result?.ok ?? o.result?.error ?? o.error)).slice(0, 300));

// 8. 뽑기 · 확인 그림 셋(0.5초 AI 얼굴+자막 · 8.3초 시술 전 · 12초 반복)
const want = scenes.length + caps.length + aiSpans.length + beforeSpans.length + (voiced ? caps.length : 0) + (music ? 1 : 0);
const after = occ(['timeline', 'items', '--project', arg.project]); const found = (Array.isArray(after) ? after : after.items || []).length;
let renderMs = null, mp4 = null;
if (RENDER) {
  mp4 = OUT + '/' + arg.project + '.mp4'; const r0 = Date.now();
  run(process.execPath, ['--import', 'tsx', OCC + '/cli/main.ts', 'render', '--project', arg.project, '--out', mp4, '--codec', 'h264', '--fps', String(FPS), '--resolution', '1080p'], { cwd: OCC, env: process.env });
  renderMs = Date.now() - r0;
  for (const s of [0.5, 8.3, 12]) ff(['-ss', String(s), '-i', mp4, '-frames:v', '1', '-vf', 'scale=360:-1', `chk_${String(s).replace('.', '_')}.png`]);
  ff(['-i', 'chk_0_5.png', '-i', 'chk_8_3.png', '-i', 'chk_12.png', '-filter_complex', 'hstack=inputs=3', OUT + '/check_frames.png']);
}
console.log(JSON.stringify({
  ok: found === want, project: arg.project, items_expected: want, items_found: found, label_track_locked: Boolean(labTrack), voiced,
  ms: { make: tMake - t0, render: renderMs, total: Date.now() - t0 }, mp4: mp4 && path.basename(mp4), check: RENDER ? 'check_frames.png (0.5초 · 8.3초 · 12초)' : null,
  scenes: scenes.map((s) => `${s.start}-${s.end} ${s.role}${s.ai ? ' [AI]' : ''}`), ai_label: aiSpans, before_label: beforeSpans,
  captions: caps.map((c) => ({ n: c.n, start: c.start, end: c.end, lines: c.lines })),
}, null, 2));
EOF
shasum -a 256 ~/oc-test/tpl_reel.mjs      # 746b696760d32c9b1c60a25f5cacbd508136d2f674175228c99e42f0e92d48ad 이어야 함
```

- 다르면 칸을 다시 그대로 만든다(두 번 다르면 여쭘).

### T2. 편 고르기 · 복사

```zsh
R=$(cat ~/oc-test/repo.path); ls "$R/agents/rsch/research/" | grep -i 'catalog'; ls "$R/data/chatgpt-archive/" 2>/dev/null
```

- 분류표 `$R/agents/rsch/research/2026-11-21_chatgpt-attachments-catalog.md`를 읽고, **한 편(같은 대화)에 `ai_face` · `after` 또는 `back` · `before`가 다 있는 편**을 고른다. 디지털펌 · 대화 011이 있으면 그것부터. after/back은 **영상이 있으면 영상**을 고른다.
- 분류표가 아직 없으면(첨부 받기가 도는 중) `$R/data/chatgpt-archive/` 아래 폴더를 직접 보고 고른다. 그래도 고를 편이 없으면: "아직 받는 중입니다. 1 기다리기 · 2 지금 있는 것으로".
- 한알님께: **"대화 ___ · ___(시술) 편으로 할까요? 1 네 · 2 다른 편"**
- 복사(원본은 그대로, 확장자는 그대로 두고 이름만 ai · after · before):

```zsh
N=<대화번호>; C=~/oc-test/real/$N; mkdir -p "$C"
cp "<ai_face 파일>" "$C/ai.<확장자>"; cp "<after 또는 back 파일>" "$C/after.<확장자>"; cp "<before 파일>" "$C/before.<확장자>"; ls -la "$C" | sed "s#$HOME#~#"
```

### T3. 자막 글 `script.txt`

- 그 편의 대화 글 `$R/data/chatgpt-archive/chats/<대화번호>-*.md`에서 ChatGPT가 쓴 **분절 자막**(없으면 릴스 원고)을 찾아, **한 줄 = 자막 한 블록**으로 `$C/script.txt`에 6~8줄 쓴다. 한 줄은 26자 안팎(길면 두 블록으로 나눔). 해시태그 · 이모지 · 손님 이름 · 가게 연락처는 뺀다.
- 대화에 없으면 그 편의 시술 사실로 **도입 → 시술 · 관리 → 보이는 결과** 순 8줄을 짓는다(템플릿 3번).
- 화면에 줄들을 보여 드리고: **"자막 글입니다. 1 이대로 · 2 다시"**

### T4. 한 편 만들고 뽑기

```zsh
source ~/oc-test/env.sh; N=<대화번호>; C=~/oc-test/real/$N; S=$(date +%s)
node "$OCT/tpl_reel.mjs" --ai "$C"/ai.* --after "$C"/after.* --before "$C"/before.* --script "$C/script.txt" --voice say --out "$C/out" --project "tpl-$N" > "$C/out.json" 2> "$C/out.err"; echo "끝 코드 $? · $(( $(date +%s) - S ))초"; tail -6 "$C/out.err"; head -c 1200 "$C/out.json"
```

- `"ok": true` · `"label_track_locked": true` 여야 한다. `"voiced": false`면 목소리 없이 된 것 — 결과 글에 까닭(`out.err`의 목소리 줄)을 적는다.
- 사진이 HEIC면 맥의 `sips`로 바꿔 쓴다(변환기 안에서 저절로).

### T5. 스스로 보고 · 보여 드리기

```zsh
N=<대화번호>; C=~/oc-test/real/$N; open "$C/out/check_frames.png"; open "$C/out/tpl-$N.mp4"
```

- 먼저 네가 `check_frames.png`(왼쪽부터 0.5초 · 8.3초 · 12초)를 열어 본다: 0.5초 = AI 얼굴 + 왼쪽 위 'AI 합성' + 첫 자막 · 8.3초 = 시술 전 + 위 '시술 전' · 12초 = 시술 후(반복) + 뒤쪽 자막 · **머리 모양이 잘리지 않았나**(사진은 화면을 꽉 채우려고 가장자리를 자름).
- 한알님께: **"0.5초 · 8.3초 · 12초 그림과 영상입니다. 1 좋음 · 2 고칠 것 있음"** — 2면 **"1 자막 글 · 2 장면 길이 · 3 목소리 · 4 표시 · 5 사진 잘림 · 6 다른 소재"**로 여쭙고, script.txt나 소재를 바꿔 `--project "tpl-$N-2"`로 T4를 다시.

### T6. 결과 글 · 올리기 · 끝

- `~/oc-test/out/TPL_RESULTS.md`에 적는다: 시작 · 끝 시각(KST) · 돌린 이(Codex) · 고른 편(대화 번호와 시술 종류만) · 소재 종류(AI 얼굴 사진 / 시술 후 영상·사진 / 시술 전 영상·사진) · `out.json`의 ok · items · label_track_locked · voiced · ms · 자막 블록 수 · 한알님 판정(1/2와 고칠 것) · 막힌 것 · 다시 한 횟수.
- 한알님께 **"결과 글을 시험 가지에 올릴까요? 1 네 · 2 아니오"** — 1이면:

```zsh
source ~/oc-test/env.sh; RS="$OCT/out/TPL_RESULTS.md"; BR=test/opencut-classic-20261120; MR="$OCT/ms-results"
BAD=$( { grep -nE '/Users/|\.ts\.net|github\.com|chatgpt\.com' "$RS"; grep -nE '(^|[^0-9.])(100|10|172|192)\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' "$RS"; } | cut -d: -f1 | sort -un | tr '\n' ' ')
if [ -n "$BAD" ]; then echo "가릴 것 있음(줄 $BAD) — 고친 뒤 다시. 올리지 않음"; else
  SRC=~/mitchell_branches/opencut-test
  [ -d "$MR/.git" ] || git clone -q --depth 1 --single-branch --branch "$BR" "$(git -C "$SRC" remote get-url origin)" "$MR"
  git -C "$MR" pull -q --ff-only origin "$BR" && cp "$RS" "$MR/app/opencut-test/TPL_RESULTS.md" && git -C "$MR" add app/opencut-test/TPL_RESULTS.md \
  && git -C "$MR" -c user.name=S5_MAC_TEST -c user.email=s5-mac-test@example.invalid commit -q -m "S5_MAC_TEST: TPL_RESULTS.md ($(TZ=Asia/Seoul date '+%F %T KST'))" \
  && git -C "$MR" push -q origin "HEAD:$BR" && git -C "$MR" log -1 --format='올림 %h' || echo "올리지 못함 — 한알님께 번호로 여쭘"
fi
```

- 끝으로 한알님께: **"MP4는 맥의 `~/oc-test/real/<번호>/out/`에 있습니다. 1 Finder로 열기 · 2 그대로"** — 1이면 `open -R "$C/out/tpl-$N.mp4"`. 그리고 "RSCH 창에 「끝」 한 마디만 해 주세요".
- `~/oc-test/real/`(손님 소재 복사본)은 지우지 않는다 — 한알님이 정하신다.
