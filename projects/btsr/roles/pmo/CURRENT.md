---
role: "mitchell_studio/btsr/pmo"
session: "MITCHELL_STUDIO/BTSR/PMO"
rules: "none — 이 저장소에는 규칙 판이 아직 주입되지 않음. AAA 규칙 판 v0.14(C:\\Users\\ms1pk\\dev\\AAA\\AGENTS.md)를 AAA main 폴더에서 읽기만 함"
state: "ACTIVE"
updated: "2026-11-20T05:22:08Z"
base_commit: "fa2b7aa"
now: "BTSR-RSCH-001 반환함 — C1–C5 짬, 이 PC에서 한 바퀴 됨(제품 저장소 test/opencut-classic-20261120 c2d21a6). 맥 시험은 RSCH 순서서로"
next: "맥 결과(T0·T2·MAC_RUN)를 받으면 C4 꼴 마무리 · 글자 모양 값 맞추기 — 스스로 시작하지 않음(규칙 18)"
waiting_for: ["rsch:macbook-test-T0-T2-and-MAC_RUN-result"]
owner_wait: "0"
subs: []
parent: "mitchell_studio/btsr/arch"
verifier: "mitchell_studio/btsr/pmov"
---

# PMO — BTSR 구현 (상설)

| 칸 | 내용 |
|---|---|
| 역할 | 구현(규칙 5·20). 지금 맡은 일: 아래 '받은 요청' |
| 프로젝트 | BTSR(부트스트랩) — MITCHELL_STUDIO 도메인 |
| 상위 | ARCH (`MITCHELL_STUDIO/BTSR/ARCH`). 역할 트리 PLN > RSCH · ARCH > PMO, 요청은 바로 아래로만 (규칙 5·15) |
| 짝 검증자 | PMOV (비상설, 여는 이 ARCH, 규칙 7). 아직 열리지 않음 |
| PRIMARY | `MITCHELL_STUDIO/BTSR/PMO` — Paseo(claude-google · auto) · Opus 5.5 (claude-opus-5-5) · high. Paseo 에이전트 `f3cf6938-049e-45f7-bb68-a64e06bff385` · Paseo 작업 공간 `wks_2dc964d20c5cca11` · Claude 세션 `ac64c01a-d76a-418c-b6d9-1ff2b1f205e4`. 작업 폴더 `dev\mitchell-studio_agent\worktrees\btsr-pmo`, 브랜치 `btsr/pmo` (main fa2b7aa에서) |
| 개설 | RSCH의 SUB `MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES`(Paseo 5641fdf4)가 엶 — 요청서 main 폴더 `projects/btsr/roles/rsch/sub/s1_open_roles/OPEN_PMO_요청.md` 판 2. 앞 세션(Paseo a73bc1c9, 옛 꼴)은 요청서에 따라 CLOSED — 이어받음 |
| 규칙 판 | 주입 전 (`none`). AAA v0.14를 AAA main 폴더에서 읽음. 이 저장소 AGENTS.md도 따름 |
| 게시판 | 없음 — 아직 정해지지 않음. 그래서 요청서는 보낸 역할 칸에, 받음은 이 파일 '받은 요청'에 적음 (요청서의 안내) |
| 작업 칸 | `records/` (규칙 20) — 첫 정본을 쓸 때 만듦 |
| 앞머리 | 맨 위 YAML은 CURRENT 공통 칸(규칙 28). `subs`·`parent`·`verifier`는 AAA 본보기를 따름 |

## 받은 요청

| 건 | 보낸 역할 | 원본 | 받음 | 상태 |
|---|---|---|---|---|
| BTSR-RSCH-001_opencut-test-code — OpenCut 옛 판(cf5e79e) 시험 3·4용 시험 코드 C1 변환 · C2 되받기 · C3 들여오기 · C4 화면 조작 없이 뽑기 · C5 포크 고침 (웹앱에는 넣지 않음) | RSCH (Paseo 7993ff28) | main `projects/btsr/roles/rsch/requests/BTSR-RSCH-001_opencut-test-code/요청.md` (main 8723a4f) | 2026-11-20 13:56 KST | **반환함** 14:22 KST · RSCH 수용(건은 열어 둠) — [반환서](records/opencut-test/OPENCUT_TEST_RETURN_CLAUDE.md) |

- 근거: 한알 말씀 2026-11-20 13:50:27 KST uuid 3092e5a9-024e-4187-8f17-50ff69f1a54e 「Pmo가 합니다. / 네 설치하세요 / Https 반드시 켜야 하나요」 — main `owner/utterances/2026-11-20.md` (RSCH 창에서 하신 말씀). [DECISIONS.md](DECISIONS.md)에서 가리킴.
- 규칙과 다른 곳(숨기지 않음): AAA 규칙 15(잠정 — PMO의 위는 ARCH)와 달리 RSCH가 바로 보냄. 한알 「Pmo가 합니다」를 RSCH가 'ARCH를 거치지 않음'으로 읽음 [RSCH의 읽기] — PMO는 그대로 받음.
- 허락 범위(요청서 4번): 이 PC에 Bun 1.2.18 설치 · 옛 판을 새 사본으로 받아 빌드·실행. 진짜 키·비밀 값은 넣지 않음. 시험 자료는 가짜만. 코드는 제품 저장소(그 저장소 규칙대로, main 바로 합치기 안 함). 맥에는 직접 접속하지 않음.

## 지금

- 개설 받음 (2026-11-19 22:29 KST 확인). 옛 꼴 파일(directives.md · knowhow.md · logs/ · 옛 CURRENT.md)을 지우지 않고 [archive/](archive/)로 옮김 — [archive/MOVES.tsv](archive/MOVES.tsv).
- BTSR-RSCH-001 반환함. 이 PC 작업 폴더 `C:\Users\ms1pk\dev\btsr-pmo-work\`(git 밖): 옛 판 포크 사본 · 제품 저장소 새 사본 · Bun 1.2.18 · 시험 원출력 — RSCH 말대로 남겨 둠(맥 결과 뒤 이어 씀). 개발 서버 127.0.0.1:3417은 RSCH 말대로 끔(2026-11-20, 포트 빈 것 확인).
- RSCH가 이번 반환분을 수용함 — 건은 닫지 않음(C4 꼴 마무리 · 글자 모양 값은 맥 결과 뒤).
- 제품 저장소 원래 사본(`C:\Users\ms1pk\dev\mitchell-studio`)은 읽기만(pull --ff-only 한 번). 제품 저장소의 `agents/pmo`는 맥에서 도는 제품 쪽 에이전트이고 이 세션이 아님.
- 막힌 것: 휴대용 ffmpeg 받기가 자동 심사에서 막힘 — 우회하지 않음. ffprobe 대신 MP4 상자를 읽어 확인함.
- main 합치기를 누가 정하는지 말씀 없음 — 스스로 합치지 않음.
