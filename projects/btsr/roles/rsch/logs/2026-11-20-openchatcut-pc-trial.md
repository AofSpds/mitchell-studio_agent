# OpenChatCut 이 PC 시험 — 창 없이 넣기 · 놓기 · 뽑기 (2026-11-20 21:42 KST)

- 쓴 세션: MITCHELL_STUDIO/BTSR/RSCH (Paseo 7993ff28 · Opus 5.5)
- 근거 말씀(`owner/utterances/2026-11-20.md`): 21:31:49 uuid 23761a09 「네 여기도 설치해서 확인해바도 됩니다.」 — 이 PC에 설치해 RSCH가 확인해도 된다는 허락으로 읽음 [내 읽기].
- 한 곳: **저장소 밖** `C:\Users\ms1pk\dev\btsr-rsch-occ\`(2.6GB — 꾸러미 2.3GB). 제품 저장소 · 이 저장소 · 홈의 `~/.openchatcut`는 건드리지 않음(홈 폴더가 생기지 않은 것을 확인). 가짜 소재만 · 키 없이(`.env.local` 없음) · 편집기 서버를 띄우지 않음(CLI만) · 끝난 뒤 남은 프로세스 없음(확인).
- 판: OpenChatCut `f96502a18e65a09c19324b10feb671bb505056bd`(2026-11-12) · Node 24.22.3 휴대판(nodejs.org 공식 zip, SHA256 맞음 — 이 PC의 Node 24.22.0은 조건 24.22.1 이상에 모자람) · `npm install` 53초, 847꾸러미(Electron 실행 파일 · ONNX GPU 쪽은 받지 않음).
- 저장 폴더: CLI `--data-dir` / `OPENCHATCUT_DATA_DIR`로 `btsr-rsch-occ\data`에만 씀(`occ where`로 확인).
- 표시: **[실측]** 이 PC에서 돌려서 본 것 · **[소스 확인]** 코드에서 본 것 · **[미검증]**.

## 1. 결과

| # | 시험 | 명령 | 결과 |
|---|---|---|---|
| 1 | 창 없이 쓰는 도구 | `occ tools ls --json` | 39개 — **`import_asset` · `import_assets` · `import_folder`가 들어 있음** [실측]. 정책 파일 주석 "Reviewed for headless execution"(`src/agent/external-tool-policy.ts`) [소스 확인] |
| 2 | 프로젝트 만들기 | `occ project new rsch-poc --size 1080x1920 --fps 30` | 됨 [실측] |
| 3 | **창 없이 소재 넣기** | `occ tools call import_folder --args '{"path":"…/media-src"}' --apply` | **됨** — 가짜 영상 둘 · 사진 · 소리 둘이 들어가 길이(프레임) · 크기를 읽음. 오프라인 편집 세션(`approvalMode: auto`, `bindingMode: offline`)으로 한 번에 적용 [실측] |
| 4 | 창 없이 타임라인에 놓기 | `occ tools call import_timeline --args @…(EDL)` | **됨** — EDL 한 장으로 5조각 · 3트랙이 프레임 단위로 놓임(영상 0~90 · 사진 90~150 · 영상 150~240 · 목소리 0~90 · 음악 0~240, 30fps) [실측] |
| 5 | 창 없이 뽑기 | `occ render --timeline … --out rsch-poc.mp4 --codec h264 --fps 30 --resolution 1080p` | **됨** — 8초 · 240프레임 · 6.0MB. **걸린 시간 47초**(첫 실행이라 Remotion이 화면 없는 브라우저 Chrome Headless Shell 157(120MB)을 꾸러미 폴더 안에 내려받은 시간이 들어 있음) [실측] |
| 6 | 뽑은 파일 | ffprobe(Remotion에 딸린 것) | H.264 **Main** · 레벨 4.0 · **1080×1920 · 30/1** · `yuvj420p` · AAC LC · **48000Hz** · 2채널 · 8.000초 [실측]. 세 장면을 그림으로 뽑아 눈으로 봄 — 차례 · 세로 화면 맞음 |
| 7 | 자막(우리 원고 글) | 코드 · 틀 목록 | **창 없이 넣는 길은 아직 못 찾음.** 자막 기능은 받아쓰기(transcript)에서 나오고 모양에 테두리(`strokeColor` · `strokeWidth`)를 줄 수 있음 [소스 확인]. 글자 틀 235개(`list_templates`) 가운데 text-effects 8개는 꾸밈 제목들 [실측]. 후보: 자막 글을 투명 그림으로 만들어 위 트랙에 놓기(EDL은 영상 트랙 하나라 FCPXML로) **[미검증]** |

## 2. 뜻

- **자료와 기획안의 '명령줄로 소재 넣기: 안 됨'은 틀렸습니다.** `occ media`가 목록만인 것은 맞지만, 도구 호출(`occ tools call import_folder` · `import_asset`)로는 창 없이 넣어집니다. 그래서 '올리면 영상까지 사람 없이'의 빈칸은 **소재 넣기가 아니라 자막(우리 원고 글을 우리 모양으로)** 입니다.
- 뽑기는 브라우저의 영상 인코더가 아니라 Remotion의 ffmpeg로 하므로, OpenCut 길에서 걱정한 'AAC가 말없이 Opus로 바뀜'은 이 길에는 없어 보입니다 **[추측 — 코드 구조로 본 것]**.
- 우리 시험 코드 · 지금 릴스와 다른 점: H.264 High → **Main**, AAC 44.1kHz → **48kHz**, 색 범위 `yuvj420p`(풀 레인지 표시). 제품의 규격 검사(1080×1920 · 30fps)에는 걸리지 않으나, 인스타그램 · 아이폰 재생에서 색이 다르게 보이는지는 봐야 함 **[미검증]**.
- 맥은 같은 명령이 VideoToolbox(하드웨어 H.264)를 쓸 수 있어 더 빠를 수 있음(만든 쪽의 M4 Max 잼) — 우리 맥은 다음 맥북 시험에서.

## 3. 다음에 볼 것 (시험 5에 넣을 것)

1. 자막: 투명 그림 + FCPXML 위 트랙 · 받아쓰기 자막에 우리 원고를 쓰는 길 · 한글 글꼴.
2. 장면표 → EDL/FCPXML 변환(우리 변환기의 둘째 출구) · AI 합성 표시 · 반복 장면.
3. MCP로 Claude Code가 같은 일(편집 세션 `manual`/`auto`).
4. 맥에서 `occ render` 시간 · 하드웨어 인코딩 · 색.
5. `occ export jianying`(캡컷 초안 — 바깥 도구 capcut-cli가 있어야 함).

## 4. 남긴 것 · 지우는 법

- `C:\Users\ms1pk\dev\btsr-rsch-occ\` 하나에 모두 있음: `node\`(Node 휴대판) · `OpenChatCut\`(소스 + 꾸러미 + Chrome Headless Shell) · `data\`(시험 프로젝트) · `media-src\`(가짜 소재) · `work\`(EDL) · `out\`(기록 · 뽑은 파일). **다음 시험에 다시 쓰려고 남겨 둠.** 지우려면 이 폴더 하나를 지우면 됨(이 PC의 다른 곳에는 남긴 것 없음 — npm 캐시는 사용자 캐시 폴더에 남음).

## 5. 이어서 — 자막 길 · 장면표 → 순서표 (2026-11-21 00:2x~00:32 KST)

- 근거 말씀(`owner/utterances/2026-11-21.md`): 00:21:28 uuid 25a35779 「네」 — RSCH가 '이어서 자막 길을 시험해 볼까요? 하면 장면표에서 순서표를 만드는 것까지 이 PC에서 확인하겠습니다.'라고 여쭌 답.
- 자료: PMO의 가짜 장면표 만들기(`make_fixtures.mjs` — 제품 가지 c2d21a6의 것을 시험 폴더에 옮겨 돌림, 10초 가짜 영상)로 만든 `work/job1`(12초 · 영상 0~8초(원본 1초부터) · AI 얼굴 사진 8~12초 · 자막 둘 · 목소리 1.5배(0.3~9.6초만) · 음악 −12dB). 글꼴은 Noto Sans KR(google/fonts, OFL — sha256 194018e6…e252, PMO 기록과 같음).
- 시험 변환기 `work/scenes2occ.mjs`(RSCH 확인용 한 벌 — 제품 코드 아님, 시험 폴더에만): 장면표 → ① 자막 PNG(ffmpeg drawtext — Noto Sans KR · 흰 글씨 · 검은 테두리 5px · 66px · 가운데 정렬 · 세로 69% 자리 [캡컷 0.38을 짐작해 옮김] · 두 줄 나눔) · 목소리 맞춤 파일(자르기 + 1.5배) · 사진 채우기(cover) → ② `import_assets`로 넣기 → ③ 순서표 = `occ edit --ops`(트랙 만들기 + `edit_item` adds — 원본 구간 · 프레임 자리) → ④ 고치기 `edit_item` updates(영상 원래 소리 0 · 음악 0.251 = −12dB · 'AI 합성' 자리) + 그 트랙 잠금 → ⑤ `occ render`.

| # | 본 것 | 결과 |
|---|---|---|
| 8 | 장면표 → 순서표 → 놓기 | **됨** [실측] — 조각 7개(영상 · 사진 · 자막 그림 둘 · 'AI 합성' 글자 · 목소리 · 음악)가 프레임대로. 자막 1은 짝 목소리 자리(0.2초~)에서 다음 자막과 안 겹치게 5.5초까지, 자막 2는 5.5~12초 |
| 9 | 자막(우리 모양) | **됨** — 투명 PNG를 위 트랙에. 뽑은 그림에서 Noto Sans KR 흰 글씨 · 검은 테두리 · 두 줄 가운데를 눈으로 봄 [실측]. 그림이라 OpenChatCut 안에서 글을 바로 고치지는 못함(글이 바뀌면 맥이 그림을 다시 만듦) |
| 10 | OpenChatCut 글자 조각('AI 합성') | 한글이 그려짐(글꼴은 고를 수 없음 — 받는 칸이 글 · 크기 · 색 · 굵기 · 정렬뿐, 테두리 없음) [실측 · 소스 확인]. **세로 프로젝트에서도 글자 상자가 가로 1920×1080으로 만들어져**, 왼쪽 정렬 + 자리 이동이면 화면 밖으로 나감(첫 뽑기에서 안 보였음) → 가운데 정렬로 고쳐 위쪽 가운데에 나옴. 작은 흰 글씨라 밝은 바탕에서 잘 안 보일 수 있음 |
| 11 | 트랙 잠금(기1 후보) | 잠근 트랙의 글자를 **고치기 · 지우기 모두 적용 0건**(도구는 ok, 세션 `cancelled`) [실측]. 다만 같은 묶음에서 '잠금 풀기 → 고치기 → 다시 잠금'은 됨 → 잠금은 실수 막이이지 지킴이가 아님. 맥이 저장 때마다 표시를 검사하는 기획안의 안이 그대로 필요 |
| 12 | 소리 | 띠 필터로 잼(평균 dB): 원래 영상 소리(880Hz) −58~−68 = 꺼짐 · 목소리(220Hz) 1~5초 −17.6 / 그 밖 −47 = 0.2~6.4초에만 · 음악(330Hz) 내내 −31 안팎 = −12dB 맞음 [실측] |
| 13 | 뽑기 | 12초 · 360프레임 **29초**(이 PC 윈도 · 하드웨어 인코딩 없음) · H.264 Main · 1080×1920 · 30/1 · AAC 48kHz 2채널 · 12.011초 [실측] |
| 14 | 원자성 | 규칙 어긴 순서표(원본 구간과 길이를 같이 줌)는 통째로 거절, 버전 기록상 적용 없음 [실측]. **그런데 빈 트랙 4개(영상 2 · 소리 2)가 더 생겨 있음 — 어디서 생겼는지 못 가림 [미검증]** |

- **뜻:** OpenChatCut으로 '장면표 → 창 없이 넣기 · 놓기 · 자막(우리 모양) · 소리 맞춤 · 잠금 → 뽑기'가 이 PC에서 한 바퀴 돌았습니다. 남은 것은 ① 자막을 그림이 아니라 고칠 수 있는 글자로 두는 길(글자 조각에 테두리 · 글꼴이 없음 — 포크하거나 그림으로 감) ② 'AI 합성' 표시를 읽히게(테두리 그림으로 또는 바탕 띠) ③ 빈 트랙이 생기는 까닭 ④ 맥 · 아이폰 · MCP(Claude Code)로 같은 일.
- 시험 프로젝트: `rsch-poc`(EDL 시험) · `rsch-job1`(장면표 시험). 뽑은 파일 `out/rsch-poc.mp4` · `out/rsch-job1.mp4` · `out/rsch-job1b.mp4`(라벨 고친 판) — 모두 가짜 소재.

## 6. 맥 지시문 판 2를 위해 먼저 돌려 봄 (2026-11-21 01:05~01:24 KST)

- 근거 말씀(`owner/utterances/2026-11-21.md`): 01:02:23 uuid 84992ffe 「맥시험에 당연히 오픈챗컷이 들어가야 하고 그게 메인이었으면 해요.」 → 맥 지시문을 OpenChatCut 메인(A)으로 다시 쓰기 전에, A의 명령을 이 PC에서 같은 차례로 돌려 봄.

| # | 본 것 | 결과 |
|---|---|---|
| 15 | 맥 · 윈도 둘 다 도는 변환기 `work/occ_job.mjs`(scenes2occ의 다음 판 — 경로는 환경 변수, 자막은 줄마다 drawtext, 'AI 합성'도 테두리 그림 + 잠금) | 새 프로젝트 `rsch-job2`에 조각 7개 · ops 둘 다 applied · 라벨 트랙 잠금 · 9초. 뽑기 12초 → **27초**. 2초 · 10초 장면 그림에서 자막 두 줄 가운데 · 테두리 · 'AI 합성'(왼쪽 위)이 읽힘 [실측] |
| 16 | 맥에서 받을 것 | Node 24.22.3 darwin arm64 · x64 sha256(공식 SHASUMS256) · ffmpeg-static b6.1.1 darwin: **arm64는 FFmpeg 6.0(`text_align` 없음 → 줄마다 그림으로 피함)** · x64는 6.1.1 · 둘 다 freetype 있음 · sha256 적음 · OpenChatCut 원격 HEAD = f96502a 그대로 · 잠금 파일에 git 꾸러미 0 · darwin compositor · esbuild 들어 있음 [실측] |
| 17 | 편집기 서버 | `vite`를 바로 부르면(`dev:shared` 꼴) 열쇠 저장 자리가 소스 폴더의 `.env.local`이 되어 **5초마다 다시 시작**(15번) → MCP 세션이 사라짐. **`scripts/dev-profile.mjs`(= `npm run dev`의 몸통)로 띄우면 다시 시작 0** · `localhost`([::1]:5199)에서만 들음 · 홈(`USERPROFILE`/`HOME`)을 시험 폴더로 돌리면 프로필 폴더도 그 안에만 생김 · 진짜 홈의 `~/.openchatcut` 안 생김 [실측]. 윈도에서만 'Pre-transform error … /src/main.tsx'가 찍히나 `/src/main.tsx`는 200으로 나옴 |
| 18 | 편집기 '연결' 단추 | `server/external-agent/client-connect.ts`가 `~/.claude.json` · `~/.cursor/mcp.json` · Codex 설정 · **`~/.zshrc`**에 MCP 주소 · 토큰을 씀 [소스 확인] → 맥에서는 서버의 HOME을 `~/oc-test/home`으로 · 단추를 누르지 않게 |
| 19 | MCP(curl) | 토큰 없이 403 · 붙기 200(세션 id) · 도구 44개 · `target_project` → `offline`(편집기 안 띄움) · `begin_edit_session(auto)` → `edit_item`(음악 0.1) → `review_edit_session` → **applied**, 문서에서 0.1 확인 [실측] |
| 20 | **다른 Claude Code가 MCP로** | `claude -p --mcp-config mcp.json --strict-mcp-config --allowedTools mcp__occ --no-session-persistence`(Sonnet 5.5, 글은 stdin) → `offline · list_projects, target_project, begin_edit_session, read_timeline, edit_item, review_edit_session · applied` · **25초** · 문서에서 음악 0.2 확인 [실측] |

- 남은 프로세스 없음 · 5199 비움(확인). 시험 폴더에 `home/`(가짜 홈) · `work/occ_job.mjs` · `work/job2` · `work/mcp-run`(토큰은 이 PC 시험용 임시 값) · `out/` 기록이 더해짐.
- 못 본 것: 편집기 화면(이 PC에서 화면을 보지 않음 — 화면 조작 허락 없음) · 편집기를 띄운 채(browser 묶임) MCP · 맥에서의 시간 — 모두 맥 지시문 A7 · A8 · A6에서.
