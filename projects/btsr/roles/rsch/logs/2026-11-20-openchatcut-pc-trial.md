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
