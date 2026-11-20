# OpenChatCut 첫 읽기 — 원 저장소에서 (2026-11-20 21:20 KST)

- 쓴 세션: MITCHELL_STUDIO/BTSR/RSCH (Paseo 7993ff28 · Opus 5.5)
- 근거 말씀(`owner/utterances/2026-11-20.md`): 21:04:18 uuid f0db5d07 「기획안 보강 자료가 들어왔습니다. 검토해주세요.」 · 21:17:24 uuid f454faa1 「네 웹챗에서 연구를 해왔습니다. 자료 확인하시고, openChatCut 도 적극적으로 반영했으면 하네요.」
- **(21:30 덧붙임) 자료는 21:11:54에 이 저장소로 이미 들어와 있었습니다** — `studies/2026-11-20-openchatcut-voice-supplement.md`(커밋 3a03e46). 21:04에 `git fetch`를 한 번만 하고 다시 보지 않아 놓쳤습니다. 검토는 [자료 검토](2026-11-20-openchatcut-supplement-review.md)에 있습니다. 아래는 그 전에 쓴 그대로입니다.
- **한알의 웹챗 자료는 아직 받지 못했습니다.** 찾아본 곳: 이 저장소(`git fetch` — 새 커밋 없음) · 제품 저장소 가지(`gh api` — 11-20 새 커밋은 PMO 시험 코드뿐) · 이 PC의 내려받기 · 바탕 화면 · 문서 · `dev` 폴더(지난 4시간) · GitHub 저장소 · gist. Claude Docs는 이름으로 찾는 길이 없고 링크가 있어야 열립니다.
- 그래서 이 글은 **자료를 받기 전에 원 출처만 읽은 것**입니다. 설치 · 실행은 하지 않았습니다. 읽은 것: GitHub API(저장소 정보 · 판 · 폴더) · README · `cli/commands/render.ts` · `cli/commands/export.ts`의 머리 · `MACOS-RENDER-TUNING.md`의 머리.
- 표시: **[제안]** 내 안 · **[추측]** 짐작 · **[해석]** 이용 조건의 조항과 흔한 해석(법률 판단 아님).

## 1. 무엇인가

- [0xsline/OpenChatCut](https://github.com/0xsline/OpenChatCut) — 저장소 설명 "Open-source, local-first conversational AI video editor with a professional multi-track timeline, Agent Skills, MCP integration, and Remotion rendering." 상용 ChatCut과 관계없는 독립 오픈소스라고 README가 밝힘.
- **이용 조건: AGPL-3.0 이상.**
- 활동(21:1x에 GitHub API로 봄): 2026-07-15 시작 · 별 3,235 · 포크 492 · 열린 이슈 54 · 마지막 푸시 2026-11-12 · 최신 판 v0.2.17(2026-10-15). README: "The editor, project format, and agent tools will continue to evolve."
- 꼴: Electron 43 데스크톱 앱(맥 · 윈도 · 리눅스 설치판) 또는 소스에서 Vite로 띄움. 앞단 React 19 · Vite 8, 미리보기 Remotion Player · WebGL, 뽑기 Remotion + FFmpeg(맥은 VideoToolbox H.264). 프로젝트 · 대화 · 판은 맥의 `~/.openchatcut` 아래에 남고, IndexedDB는 캐시.
- 할 수 있는 것(README 표): 여러 트랙 · 자르기 · 나누기 · 리플 편집 · 키프레임 · 되돌리기, 자막(자동 · 이름 붙은 모양 · 번역 · SRT), 소리(여러 트랙 · 배경 음악 · 목소리 녹음 · 소리 크기 맞춤 · 음악 자동 낮춤 · 목소리 분리), 말 받아쓰기로 자르기, 생성(그림 · 영상 · 목소리 · 음악 — 바깥 서비스 키가 있어야), 내보내기(MP4 · 소리 · 자막 · FCPXML · 프로젝트 통째).

## 2. 우리 계획과 닿는 곳

| 우리 쪽 | OpenChatCut에 있는 것 |
|---|---|
| 묶음 5 — ⑥(목소리 · 음악 · 내보내기)을 사람 없이 | **`occ render --out x.mp4`** — 저장된 프로젝트를 앱과 같은 Remotion 길로 뽑음. 코드 주석: "no HTTP, no browser dialog, no render queue. Nothing here modifies the project." 고를 것 `--codec h264` · `--fps` · `--resolution`(480p · 720p · 1080p · 4k) · `--bitrate` · `--from/--to` |
| 에이전트가 편집 | Claude Code · Codex가 MCP(맥 안 `http://localhost:5199/api/external-mcp/mcp`)로 프로젝트를 읽고 고침. 고친 것은 초안(edit session)에 쌓였다가 승인(`manual`, 기본) 또는 자동(`auto`)으로 한 번에 들어가고, 되돌리기 한 번으로 묶임. 편집 세션에서는 생성 · 내보내기 · 지우기가 빠짐(되돌릴 수 없어서). CLI(`occ`)로도 프로젝트 · 타임라인 · 조각 · 소재를 다룸 |
| 묶음 6 — 편집 상태 | 트랙 · 조각 · 자막이 든 프로젝트 파일, 판 저장 |
| 오2 — 캡컷 | **`occ export jianying`** — 캡컷/JianYing 초안으로 내보냄(바깥 도구 capcut-cli를 씀) → 캡컷을 '사람이 열어 볼 사본'으로 남기는 길이 될 수 있음 |
| 2차 — SNS 올리기 | 틱톡 · 인스타 · 유튜브 등에 올리기(Upload-Post 서비스 — 미리 보기와 명시적 확인 뒤) |
| 맥에서 걸리는 시간 | 만든 쪽의 M4 Max 잼: 4K 60fps 120프레임에 8~14초(일꾼 수에 따라). 우리 맥 · 우리 릴스로는 모름 |

## 3. 걸리는 것 (첫 읽기)

- **AGPL [해석]:** 고친 판을 남이 네트워크로 쓰게 하면, 그 사람에게 소스를 받을 길을 주어야 함(13조). 고치지 않은 판을 맥에서 따로 띄워 우리 프로그램이 명령 · MCP로 부르기만 하면 의무가 거의 없음. 웹앱과 한 덩어리로 묶으면 웹앱까지 AGPL 범위가 될 수 있음. 운영하는 쪽과 가게가 같은 조직이면 '남'이 아닐 수 있음(초안 오5와 같은 물음).
- **휴대폰:** README에 휴대폰 · 터치 이야기가 없음. MCP 다리는 "designed for a single user on one machine, not as a multi-tenant service". → 휴대폰 직접 편집(묶음 7)을 대신하지는 못할 것으로 봄 **[추측]**.
- **어림:** v0.2 — 프로젝트 꼴이 바뀔 수 있음. Remotion은 회사 크기에 따라 유료 조건이 있음(초안 묶음 T에 '직원 3명 이하 사업체는 무료라고 읽음' — 다시 확인 필요).
- **모름:** 세로 1080×1920 · 30fps를 그대로 뽑는지(`--resolution 1080p`가 세로를 어떻게 다루는지) · 소리가 AAC인지 · 한글 자막 글꼴 · 흰 글씨 검은 테두리 · 맥에서 걸리는 시간 · 설치판이 서명돼 있는지.

## 4. 첫 생각 [제안 — 자료를 본 뒤 굳힘]

- **맥 쪽(에이전트가 고치고 뽑기)은 OpenChatCut, 휴대폰 쪽(사람이 손으로 고치기)은 OpenCut**으로 나누는 안. 둘 사이는 장면표(참인 편집 상태 — 묶음 6)가 이음.
- 다음 맥북 시험에 OpenChatCut 시험을 더함: 설치(또는 소스) → Claude Code가 MCP로 가짜 장면표를 타임라인에 넣음 → `occ render`로 뽑아 ffprobe(H.264 · 1080×1920 · 30fps · AAC) → 캡컷 초안 내보내기.

## 출처 (2026-11-20 21:1x KST에 읽음)

- [OpenChatCut 저장소](https://github.com/0xsline/OpenChatCut) — README · LICENSE(AGPL-3.0) · `cli/commands/render.ts` · `cli/commands/export.ts` · `MACOS-RENDER-TUNING.md`
- [OpenChatCut 릴리스](https://github.com/0xsline/OpenChatCut/releases)
