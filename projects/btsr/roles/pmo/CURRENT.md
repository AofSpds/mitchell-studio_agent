---
role: "mitchell_studio/btsr/pmo"
session: "MITCHELL_STUDIO/BTSR/PMO"
rules: "none — 이 저장소에는 규칙 판이 아직 주입되지 않음. AAA 규칙 판 v0.14(C:\\Users\\ms1pk\\dev\\AAA\\AGENTS.md)를 AAA main 폴더에서 읽기만 함"
state: "ACTIVE"
updated: "2026-11-21T17:46:49+09:00"
base_commit: "fa2b7aa"
now: "PRIMARY 7837ebd8 승계 완료 · ARCH가 013을 수용해 PLN에 반환 (22b2c61)"
next: "MAC_RUN 개정은 ARCH의 정식 요청을 받으면 진행"
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
| 상위 | ARCH (`MITCHELL_STUDIO/BTSR/ARCH`, Paseo `7621f3de-7d3e-4f12-87e1-98fe95e32fd4` — 옛 d9520b95 · 9d298a54 CLOSED). PLN Paseo `be41b33c-5441-48f7-9202-9bb7c21b13a3`. RSCH는 Paseo `ed5ef600-f1ab-4f47-8728-a19091c32e6a`(옛 a97bebab). 역할 트리 PLN > RSCH · ARCH > PMO, 요청은 바로 아래로만 (규칙 5·15) |
| 짝 검증자 | PMOV (비상설, 여는 이 ARCH, 규칙 7). 아직 열리지 않음 |
| PRIMARY | MITCHELL_STUDIO/BTSR/PMO · Paseo 에이전트 `7837ebd8-33f1-4729-bafe-e9a3e72f45d6` · 작업 공간 `wks_2dc964d20c5cca11` · Codex 세션 `01a1fd46-60cf-7d52-80da-caa5e42882b2` · `gpt-6.2-astra` · ultra · full-access · 가지 `btsr/pmo` |
| 개설 | RSCH의 SUB `MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES`(Paseo 5641fdf4)가 엶 — 요청서 main 폴더 `projects/btsr/roles/rsch/sub/s1_open_roles/OPEN_PMO_요청.md` 판 2. 앞 세션(Paseo a73bc1c9, 옛 꼴)은 요청서에 따라 CLOSED — 이어받음 |
| 규칙 판 | 주입 전 (`none`). AAA v0.14를 AAA main 폴더에서 읽음. 이 저장소 AGENTS.md도 따름 |
| 게시판 | 없음 — 아직 정해지지 않음. 그래서 요청서는 보낸 역할 칸에, 받음은 이 파일 '받은 요청'에 적음 (요청서의 안내) |
| 작업 칸 | `records/` (규칙 20) — 첫 정본을 쓸 때 만듦 |
| 앞머리 | 맨 위 YAML은 CURRENT 공통 칸(규칙 28). `subs`·`parent`·`verifier`는 AAA 본보기를 따름 |

## 받은 요청

| 건 | 보낸 역할 | 원본 | 받음 | 상태 |
|---|---|---|---|---|
| BTSR-RSCH-001_opencut-test-code — OpenCut 옛 판(cf5e79e) 시험 3·4용 시험 코드 C1 변환 · C2 되받기 · C3 들여오기 · C4 화면 조작 없이 뽑기 · C5 포크 고침 (웹앱에는 넣지 않음) | RSCH (Paseo 7993ff28) | main `projects/btsr/roles/rsch/requests/BTSR-RSCH-001_opencut-test-code/요청.md` (main 8723a4f) | 2026-11-20 13:56 KST | **반환함** 14:22 KST · RSCH 수용(건은 열어 둠) — [반환서](records/opencut-test/OPENCUT_TEST_RETURN_CLAUDE.md) |
| 작업자 모델 Terra → GPT-6.2 Sol · 생각 High, 한 곳 설정(enum)으로 — 제품 저장소 웹앱 · 문서 (급함, 오늘 맥 웹앱 시험 전) | RSCH (Paseo 7993ff28) | 세션 메시지(2026-11-21 03:20 KST, message-id f558a86c) — 요청서 파일 없음 | 2026-11-21 (KST, 커밋 140ed71 시각) | **RSCH가 거둠**(03:2x KST, message-id a968fc10 — PLN · ARCH를 건너뛴 요청, 한알 「누가 바로 pmo에 보내나요」). 멈춤. 제품 저장소에 바꾼 것 · 커밋 · push 없음. 이 PC 사본에 로컬 가지 `fix/worker-model-sol-20261121`(main 9e7eb0e 그대로, 고친 파일 0)만 남음 — 지우지 않고 둠 |
| BTSR-ARCH-001_worker-model-sol — 작업자 모델 GPT-6.2 Sol · 생각 High, 설정 한 곳 `app/webapp/worker_model.py` (급함) | ARCH (Paseo 9d298a54) | 가지 `btsr/arch` aee2291 `projects/btsr/roles/arch/design/worker-model/WORKER_MODEL_BTSR-ARCH-001_REQUEST_CLAUDE.md` · 설계 `WORKER_MODEL_DESIGN_CLAUDE.md` 1판 | 2026-11-21 (9cff201) | **반환함** 03:39 KST — [반환서](records/worker-model/WORKER_MODEL_RETURN_CLAUDE.md) · 제품 가지 `fix/worker-model-sol-20261121` 3495f7e (main 합치기 안 함) |
| BTSR-ARCH-002_webapp-b1-suggest-words — 웹앱 「Feedback」 건의함 + 쉬운 말 (묶음 1) | ARCH (Paseo 9d298a54) | 가지 `btsr/arch` 6cf028a `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-002_REQUEST_CLAUDE.md` · 설계 `WEBAPP_PHASE1_B1_DESIGN_CLAUDE.md` 1판 | 2026-11-21 (ea8da0d) | **반환함** 12:58 KST — 제품 가지 `feat/webapp-b1-suggest-20261121` 6cfbc5f (main 합치기 안 함), [반환서](records/webapp-phase1/WEBAPP_PHASE1_B1_RETURN_CLAUDE.md) · ARCH 수용 |
| BTSR-ARCH-004_webapp-b2-b8-runner-templates — 서버가 작업을 만들고 맥 Claude를 명령줄로 불러 접수·원고·④ 편집까지(템플릿 판) | ARCH (Paseo 9d298a54) | 가지 `btsr/arch` 96d66a1 `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-004_REQUEST_CLAUDE.md` · 설계 `WEBAPP_PHASE1_B2_B8_DESIGN_CLAUDE.md` 1.1판 | 2026-11-21 (975a4c1) | **반환함** 13:17 KST — 제품 가지 `feat/webapp-b2-b8-runner-20261121` 658ec1d, [반환서](records/webapp-phase1/WEBAPP_PHASE1_B2_B8_RETURN_CLAUDE.md) · ARCH 수용(기준 1–9·11). 맥 시험 9는 PLN 답 전까지 하지 않음 |
| BTSR-ARCH-006_webapp-b1-1-anon-button — 건의 글 손님 정보를 별명으로 · 단추 글 「건의하기」만 · 가짜 claude UTF-8 | ARCH (Paseo 9d298a54) | 가지 `btsr/arch` e198ffc `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-006_REQUEST_CLAUDE.md` · 설계 `WEBAPP_PHASE1_B1-1_ANON_DESIGN_CLAUDE.md` 1.1판 | 2026-11-21 (552365c) | **반환함** 13:31 KST — 제품 가지 `feat/webapp-b1-1-anon-20261121` 100ffa5, [반환서](records/webapp-phase1/WEBAPP_PHASE1_B1-1_RETURN_CLAUDE.md). 시험 41/41(PYTHONUTF8 없이) · 화면 20/20 · ARCH 수용 |
| BTSR-ARCH-007_webapp-b3-intake-confirm — intake.json · 서버가 하나씩 고르는 답으로 묻기 · 원고 늘 확인 · 승인 hash | ARCH (Paseo 9d298a54) | 가지 `btsr/arch` 2eafcf7 `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-007_REQUEST_CLAUDE.md` · 설계 `WEBAPP_PHASE1_B3_DESIGN_CLAUDE.md` 1판 | 2026-11-21 (194fea1) | **반환함** 13:42 KST — 제품 가지 `feat/webapp-b3-intake-20261121` 32b55dc, [반환서](records/webapp-phase1/WEBAPP_PHASE1_B3_RETURN_CLAUDE.md). 시험 52/52(PYTHONUTF8 없이) · 화면 9/9 · ARCH 수용. 「을(를)」 → 받침 따라 고르기는 다음 요청(묶음 5 + 3-2)에 |
| BTSR-ARCH-013_webapp-b82-template-r2 | ARCH (7621f3de) | btsr/arch 298d19a · 설계와 r2 한 장 1.1판 | 2026-11-21 17:25:32 KST | 반환함 17:39 KST · 제품 94d4522 · 기본 133 통과/2 건너뜀, 암호화 135/135 · [반환서](records/webapp-phase1/WEBAPP_PHASE1_B82_RETURN_CODEX.md) · ARCH 수용 및 PLN 반환 17:45 KST (btsr/arch 22b2c61) |
| BTSR-ARCH-012_webapp-b4b-https-push | ARCH (7621f3de) | btsr/arch 9b579c3 · 설계 2.1판 + 8번 | 2026-11-21 17:05:18 KST | 반환함 17:17 KST · 덧붙임 aed1d11 · 제품 7127393 · 기본 129 통과/2 건너뜀, 암호화 131/131 · [반환서](records/webapp-phase1/WEBAPP_PHASE1_B4B_RETURN_CODEX.md) · ARCH 수용, PLN 반환(013 요청) |
| BTSR-ARCH-011_webapp-b6-fix-versions — 고칠 점 → 다음 판 · 판마다 새 이름 캡컷 프로젝트 · 완성 = 승인 + 규격 · 판 고르기 · ? 둘 · 승인 뒤 caption 일 | ARCH (Paseo d9520b95) | 가지 `btsr/arch` d5f3369 `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-011_REQUEST_CLAUDE.md` · 설계 `WEBAPP_PHASE1_B6_DESIGN_CLAUDE.md` 2.2판 | 2026-11-21 (커밋 시각, 세션 메시지 cbbb6f7d) | **반환함** 17:00 KST — 제품 가지 `feat/webapp-b6-fix-versions-20261121` e512fcd(코드 bdbd66e · 시험 e512fcd, 바탕 243cff0), [반환서](records/webapp-phase1/WEBAPP_PHASE1_B6_RETURN_CLAUDE.md). 시험 125/125(PYTHONUTF8 없이) · 화면 15/15 · 새 ARCH 수용(012 요청 9b579c3) |
| BTSR-ARCH-010_webapp-b4a2-stuck-restart — 막힘 길 하나 · dev는 suggestions/ push · 처음부터 시작 · 보내는 중 · 흐린 사진 · 접수 · 틈새 · resume · 가진 사진 올리기 걷음 | ARCH (Paseo d9520b95) | 가지 `btsr/arch` a6d7f34 `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-010_REQUEST_CLAUDE.md` · 설계 `WEBAPP_PHASE1_B4A2_DESIGN_CLAUDE.md` 1.1판 | 2026-11-21 (커밋 시각, 세션 메시지 064065fd) | **반환함** 16:30 KST — 제품 가지 `feat/webapp-b4a2-stuck-restart-20261121` 243cff0(코드 6a7d3c6 · 시험 243cff0, 바탕 ed11f5a), [반환서](records/webapp-phase1/WEBAPP_PHASE1_B4A2_RETURN_CLAUDE.md). 시험 116/116(PYTHONUTF8 없이) · 화면 18/18. **ARCH 수용**(message-id cbbb6f7d) |
| BTSR-ARCH-009_webapp-b4a-one-job-bar — 한 번에 한 편 · 하는 일 한 줄 + 바 · 화면 스스로 바뀜 · 여러 편 걷기 | ARCH (Paseo d9520b95) | 가지 `btsr/arch` 3da95c5 `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-009_REQUEST_CLAUDE.md` · 설계 `WEBAPP_PHASE1_B4A_DESIGN_CLAUDE.md` 2판(3e6eee5) · 화면 시안 3판 main `projects/btsr/roles/rsch/sub/s8_uiux_rework/` | 2026-11-21 (커밋 시각, 세션 메시지 0eddd3f3) | **반환함** 16:00 KST — 제품 가지 `feat/webapp-b4a-one-job-bar-20261121` ed11f5a(코드 ebc3e66 · c49596e, 시험 627d872 · ed11f5a, 바탕 main 3072e7e), [반환서](records/webapp-phase1/WEBAPP_PHASE1_B4A_RETURN_CLAUDE.md). 시험 92/92(PYTHONUTF8 없이) · 화면 27/27. 덧붙임 3-1(cacb410) · 2(7701eb4) 반영. **ARCH 수용**(message-id 064065fd — 여쭘 ① 그대로 ② 남김 ③ 가진 사진 올리기는 ARCH-010에서 걷음) |
| BTSR-ARCH-008_webapp-b5-b32-worker-face — 작업자 한 대화 한 카드 · 막힘 흐름 · 사용량 저절로 · Face 단계 · 조사 을/를 | ARCH (Paseo 9d298a54) | 가지 `btsr/arch` b5d64f2 `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-008_REQUEST_CLAUDE.md` · 설계 `WEBAPP_PHASE1_B5_B32_DESIGN_CLAUDE.md` 1판 | 2026-11-21 (커밋 시각) | **반환함** 14:30 KST — 제품 가지 `feat/webapp-b5-b32-worker-face-20261121` 3072e7e(코드 449f378 · 시험 3072e7e, 앞 부분 e4323cf는 옛 PRIMARY), [반환서](records/webapp-phase1/WEBAPP_PHASE1_B5_B32_RETURN_CLAUDE.md). 시험 78/78(PYTHONUTF8 없이) · 화면 21/21. 13:58 승계로 멈췄다가 13:59 새 PRIMARY 5fbbea06가 이어 함 |
| BTSR-ARCH-005_webapp-b1-merge — 묶음 1 가지 6cfbc5f를 제품 main에 (앞으로 감기, 맥에는 넣지 않음) | ARCH (Paseo 9d298a54) | 가지 `btsr/arch` db1f7e8 `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-005_MERGE_REQUEST_CLAUDE.md` | 2026-11-21 (80ab702) | **닫힘** (ARCH 58c9c95) — 한알 13:13:30 「직접 하세요.」로 RSCH가 main을 6cfbc5f로 push. PMO의 push는 자동 심사에서 막혔고 우회 안 함. 이 PC 로컬 main = origin/main 6cfbc5f 확인 |
| BTSR-ARCH-003_worker-model-merge — 제품 가지 `fix/worker-model-sol-20261121` 3495f7e를 제품 main에 합침 (PLN이 정함, 한알 03:47:04) | ARCH (Paseo 9d298a54) | 가지 `btsr/arch` bc710d7 `projects/btsr/roles/arch/design/worker-model/WORKER_MODEL_BTSR-ARCH-003_MERGE_REQUEST_CLAUDE.md` | 2026-11-21 (34a5007) | **반환함** 12:54 KST — 제품 main `e5785b3` (첫 부모 3bd6cdd), [반환서](records/worker-model/WORKER_MODEL_MERGE_RETURN_CLAUDE.md) |

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

## 넘김 (승계 — 2026-11-21 13:58 KST, 옛 PRIMARY Paseo f3cf6938가 씀)

근거: 한알 2026-11-21 13:55:17 「네 일단 그전에 Pln arch pmo 모두 저장하고 승계하도록 하세요」 · 13:24:06 「…다하면 네이버로 여세요.」 · 13:35:34 「…이 세션도 네이버로 승계할께요.」 — RSCH(14d04ad1)가 전함, 원문은 에이전트 저장소 main `owner/utterances/2026-11-21.md`(b9c976b).

### 1. 지금
- 열린 요청은 **BTSR-ARCH-008** 하나(묶음 5 + 3-2). ARCH-001 · 002 · 003 · 004 · 006 · 007은 ARCH가 수용, 005는 닫힘. BTSR-RSCH-001(OpenCut 시험 코드)은 반환 · 수용, 건은 열려 있고 맥 결과 대기.
- 제품 main = `32b55dc`(묶음 3까지). 제품 main push는 PMO가 하지 않음(1.6판 — RSCH 몫, ARCH-005 때 자동 심사에서도 막힘).
- 맥 일은 하지 않음 — 1차 끝 맥 시험에서(PLN 결정 08). 컴퓨터 유즈는 한알 승인 전(설계 BTSR-ARCH-008 5번).

### 2. 이 PC (git 밖)
- 작업 폴더 `C:\Users\ms1pk\dev\btsr-pmo-work\`: `mitchell-studio/`(제품 저장소 사본 — 지금 가지 `feat/webapp-b5-b32-worker-face-20261121`) · `opencut-classic/`(OpenCut 포크 사본, 커밋 0457760) · `tools/bun-1.2.18/` · 시험 출력 폴더들. 개발 서버 · 시험 서버는 모두 꺼 둠.
- 시험 명령(윈도도 환경 값 없이): 제품 사본 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` → e4323cf에서 52/52.
- 화면 시험: 시험용 웹앱(`WEBAPP_DATA_DIR` 등 시험 폴더 · `WEBAPP_HOST=127.0.0.1` · 빈 포트 · 시험용 PIN/SECRET · `WEBAPP_RUNNER=0`)을 띄우고 화면 없는 Chrome + DevTools 프로토콜 스크립트로 — 본보기 `records/webapp-phase1/evidence/screen_b3_test.mjs`.

### 3. BTSR-ARCH-008 — 한 것 · 남은 것 (설계 `btsr/arch` b5d64f2 `WEBAPP_PHASE1_B5_B32_DESIGN_CLAUDE.md` 1판)
- **한 것(제품 가지 `feat/webapp-b5-b32-worker-face-20261121` e4323cf, 바탕 main 32b55dc):**
  1. Face 단계 — `jobs.STEPS` 맨 끝(번호 8)에 `face`, 보이는 차례 `jobs.ORDER = [0,1,2,8,3,4,5,6,7]`, 옛 8단계 작업은 `fill_face`로 Face `done`("해당 없음"), `next_step` · `summary`가 ORDER로 돎(옛 번호 0–7은 그대로라 다른 코드 안 깨짐).
  2. 조사 `jobs.josa(word, "을를"|"이가"…)` — `intake.py` 물음 · `preflight.py` C8에 씀.
  3. `worker_model.py`에 `MODEL_CLI` · `EFFORT_CLI` · `PERMISSION_CLI` **빈 값**(지어내지 않음, 맥 0에서 채움) + `cli_values()`(하나라도 비면 None).
  4. `preflight.py` 수동 칸 C3 · C4 · C7을 점검에서 뺌(MANUAL_ITEMS · set_manual은 남김) + `gate(job)`.
  5. 새 `worker.py`: codex 실행 파일 찾기 · `codex exec --help`에 있는 플래그만 · 값 비면 `not_ready` · timeout · 한도/로그인 가름 · `retry_at`(출력의 시각 또는 다음 아침 7시 KST) · Codex 기록에서 모델 읽기 · 로그.
  6. `prompts/face.md`(AI 얼굴 카드).
- **남은 것(차례 [제안]):**
  1. `runner.py`: 길 `mac_gui`에 `six` · `face`(`LANES`), 길 쉼 `PAUSE[lane]` + 일 상태 `wait_usage`(`retry_ts` 지나면 저절로) — 길 `claude`의 한도도 `failed` 대신 `wait_usage`(지금 `test_runner.Claude.test_limit_no_retry`는 옛 동작을 봄 → 고칠 것), `not_before`(Fit 기다림 등).
  2. `six` 일: 시작 전 `J.tick` → `card_part` 없으면 조금 뒤 다시 · `preflight.gate` → `J.handoff_text` 카드(+다시 할 때 "앞에서 멈춘 까닭: …, 다른 길로" · 운영자가 고른 답 한 줄) → `worker.run("six", …)` → `J.tick`으로 결과 줄 · 프로젝트 파일 확인(시험은 `RESULT_SETTLE` · `EXPORT_WAIT` 0) → 칸 done이면 다음 `six`. 멈추면 2-5 흐름: 첫 번째 → 새 대화로 다시 · 두 번째 → 고르는 물음(음악 못 찾음 「비슷한 곡으로 · 음악 없이 · 개발자에게 넘기기」 · 목소리 「비슷한 목소리로 · 개발자에게 넘기기」 · Fit code 2 원고 김 「원고 줄이기(→ `save_feedback(script)`로 ③ 다시) · 개발자에게 넘기기」 — PMO가 더 지은 것은 반환서에 표로) · 그래도/고를 것 아니면 ⑥ `stop` + `dev: true`, 만들던 것 그대로 · 저절로 다시 안 함. 편집 끝나면 `six`를 차례표에.
  3. `face` 일: `intake.json` after 첫 장을 `for_chatgpt/after.<확장자>`로 복사 → `face.md` 카드 → `worker.run("face", …)` → `for_chatgpt/face_<N>.png`가 이번 실행 뒤 · 9:16(±2%) · 그림 파일인지 + 결과 줄(설계는 같은 정규식에 `얼굴:` 더함 — 따로 파일로 할지 정해 반환서에) → `face_candidates`에 쌓고 Face `check`.
  4. `reel_api`: 원고 「좋아요」 → `ai_face.have`면 Face done(올린 사진) → edit / 아니면 Face now → `face` 일 · `POST /api/job/face {id, action: approve|remake|upload}`(다시 만들기 3번 넘으면 개발자) · 「가진 사진 올리기」는 묶음 3의 「더 보내기」 길 · ⑥ 물음 답 주소 · `jobs.py resume <작업> <칸>`(개발자 명령).
  5. 편집: 일 글에 승인한 얼굴 파일(장면 1 · AI 구간마다 합성 표시), 확인에 `ai: true` 장면 합성 표시.
  6. 화면: Face 칸(화5-2 — 나란히 · 「이 사진으로 갈게요 →」 · 「다시 만들기」(남은 횟수) · 「가진 사진 올리기」 · 머리 다름 노랑 띠 · 잠긴 합성 표시 줄) · ⑥ '지금' 줄 · 고르는 물음(화7 가) · 개발자(화7 나) · 사용량(화7 다) · 띠 · Copy Prompt · 「시작 전 점검」 · Do It Myself · Mark Done · Helpdesk 다른 앱 열기 없앰 → `words_allow.json`의 묶음 5 줄 12개를 0으로. app.html `STEPS`에 9번째(Face) · 그리기는 ORDER · 번호(①…)는 보이는 자리로.
  7. 시험: `tests/fake_codex.py`(정한 대로 결과 줄 · 프로젝트 파일 · 내보낸 파일 · 얼굴 그림) + 설계 7번 1–11 · 화면 시험.
  8. `MAC_RUN_PHASE1.md` 한 장(맨 위 '하지 않으실 것' · 맥 0 → 1 → 2 → 3, `MAC_RUN_B2.md`를 합침) — **돌리지 않음**.
  9. 반환서 6항목 + 맥 길 한 줄(적어 두기만), `records/webapp-phase1/`.
- 지킬 것: 제품 main push 안 함 · 맥 일 안 함 · codex 명령줄 값 지어내지 않음 · 시험 명령과 환경 값을 반환서에 그대로 · 저장되는 값을 바꾸면 옛 값도 읽히게.

### 4. 받는 세션이 할 것 (한알 13:55:17 · RSCH 전함)
1. 이 파일과 `records/`의 반환서들을 읽고 받음을 이 칸 아래에 적음(새 Paseo 에이전트 ID · 작업 공간 · Claude 세션 ID — 짐작하지 말고 확인).
2. 옛 세션(Paseo `f3cf6938-049e-45f7-bb68-a64e06bff385`)의 제목을 `MITCHELL_STUDIO/BTSR/PMO CLOSED`로.
3. ARCH(9d298a54)와 RSCH(14d04ad1)에 '승계 끝 · 새 Paseo ID'만 알림.
4. 그 뒤 BTSR-ARCH-008을 3번 차례로 이어 함.

### 5. 배운 것 (이 세션에서 — 반환서들의 '배운 것' 모음)
- 이 PC: Bash heredoc 안의 역슬래시가 반으로 줄어 파이썬 글이 깨질 때가 있음(`C:\Users` → `\U` 오류 포함) → 긴 고침 스크립트는 편집 도구로 파일을 쓰고 `python <파일>`로.
- 이 PC 제품 사본은 CRLF로 꺼내짐 → 고칠 때 줄끝을 지키는 도구로.
- 윈도 시험은 `PYTHONUTF8` · `PYTHONIOENCODING` 없이도 한 번 돌림(cp949).
- 화면 글을 바꿀 때 그 글이 저장되는 값인지 먼저 봄(옵션 `AUTO` · 목소리 출처 `src`).
- 제품 main push는 자동 심사에서 막힐 수 있음 — 막히면 우회하지 않고 멈추고 알림.

### 받음 (새 PRIMARY가 씀 — 2026-11-21 13:59 KST)
- 받음: 2026-11-21 13:59:26 KST(이 PC 시계로 확인). 여는 글은 옛 PRIMARY f3cf6938가 보냄(message-id 9abef7b6-5d5b-4cb4-85dc-f96c299b625a).
- 새 Paseo 에이전트 `5fbbea06-93d9-48b2-8930-e101d4603429`(list_agents: 제목 MITCHELL_STUDIO/BTSR/PMO · 제공자 claude · 만든 때 2026-11-21T04:59:12Z · 부모 f3cf6938).
- Paseo 작업 공간 `wks_2dc964d20c5cca11`(list_workspaces: 제목 MITCHELL_STUDIO/BTSR/PMO · 폴더 worktreestsr-pmo — 옛 세션과 같은 작업 공간).
- Claude 세션 `2e566876-0221-4fb1-90e1-2ac53bf8a621`(transcript `~/.claude/projects/C--Users-ms1pk-dev-mitchell-studio-agent-worktrees-btsr-pmo/` 의 .jsonl 중 첫 user 줄이 이 여는 글인 것 — 열어서 확인).
- 모델: Claude Opus 5.5 `claude-opus-5-5` · 생각 high(list_agents) · 모드 auto.
- ARCH도 승계함: 새 ARCH Paseo `d9520b95-4853-46b9-b04b-96199dddc95d`(옛 9d298a54 CLOSED, 받음 `btsr/arch` c8d0b55) — 옛 PMO f3cf6938(message-id 84c4b478) · 새 ARCH(message-id 8f8ed47f)가 알림. BTSR-ARCH-008 반환과 승계 끝 알림은 이 ID로.
- ARCH가 전함: 한알 13:57:21 컴퓨터 유즈 범위 승인(RSCH가 PLN에 전하는 중) — 맥에서 돌리는 것은 여전히 1차 끝 맥 시험에 한 번. PMO는 맥 일 하지 않음 그대로.
- RSCH도 승계함: 새 RSCH Paseo `a97bebab-51e4-4b70-b968-2177d6fe4f2e`(claude-naver · Fable 5.2, 옛 14d04ad1은 곧 CLOSED) — RSCH가 알림(message-id fbabca45). 승계 끝 알림은 그 전에 옛 14d04ad1로 보냈음(14:0x KST).
- 옛 PRIMARY f3cf6938 제목을 `MITCHELL_STUDIO/BTSR/PMO CLOSED`로 바꿈 · ARCH(d9520b95) · RSCH(14d04ad1)에 '승계 끝 · 새 Paseo ID' 알림.
- BTSR-ARCH-008 이어 해서 반환함(14:30 KST) — 위 '받은 요청' 줄.

### 배운 것 (새 PRIMARY)
- 이 PC: 긴 고침은 `btsr-pmo-work/tools/pt.py`(줄끝을 지키며 정확히 한 번씩 바꿈, 못 찾으면 멈춤)에 고침 파일을 써서 돌림 — 편집 도구는 먼저 읽어야 하고 큰 파일은 읽기가 무거움.
- 이 PC: Git Bash `kill $!`은 `nohup`만 죽이고 그 아래 python은 남음 → 포트 주인을 찾아 끔.

## 넘김 (2) — 다음 PMO에게 (고친 판 2026-11-21 17:02 KST, PRIMARY Paseo 5fbbea06가 씀)

근거: 한알 16:05:36 「…pmo는 아스트라로 바꿀께요 아스트라 iva 세션도 신설해서 최종 작업물을 나오면 검증/리뷰하는걸로 진행하겠습니다.」 · 16:21:44 「모두 진행하시고 완결되면 일단 기획안 초안을 제가 확인합니다」 · 16:45:26 「새세션으로 승계되면 보고 하시고 확인되면 바로 진행하시면 됩니다 …」 · 16:54:50 「미리 허락합니다.」 · 16:55:05 「권고안 승인합니다.」 — ARCH · RSCH가 전함(에이전트 main `projects/btsr/roles/rsch/requests/BTSR-RSCH-003_webapp-phase1-capcut/요청.md` 23 · 25 · 30 · 31번, 1b2daf8 · 45a1ada · 60a2ee9 · a1f2e84). **승계는 세션이 스스로 함** — 이 세션(5fbbea06)이 011을 반환한 뒤 새 PMO를 `create_agent`로 엶: 제공자 `codex` · 모델 `gpt-6.2-astra` · 생각 수준 high · **모드 `full-access`**(31번 — IVA 아스트라 세션이 auto-review에서 `git add`의 `.git/index.lock` 권한에 막혔음) · 같은 작업 공간 `wks_2dc964d20c5cca11` · 부모 라벨 비움.

### 0. 새 PMO(아스트라)가 먼저 할 것
1. **커밋 · push가 되는지부터 확인** — 이 작업 폴더(`C:\Users\ms1pk\dev\mitchell-studio_agent\worktrees\btsr-pmo`, 가지 `btsr/pmo`)와 제품 사본(`C:\Users\ms1pk\dev\btsr-pmo-work\mitchell-studio`) 둘 다에서 add · commit · push. 에이전트 쪽은 '받음' 커밋이 그 시험이 됨. 제품 쪽은 지금 가지(`feat/webapp-b6-fix-versions-20261121`)에서 `git status` · `git fetch` 뒤, 012 요청을 받으면 새 가지 첫 커밋으로 확인(빈 시험 커밋을 기능 가지에 올리지 않음). **안 되면 돌아가지 말고 멈추고 RSCH(`ed5ef600-f1ab-4f47-8728-a19091c32e6a`)에 알림** — 권한을 넓히는 것은 한알께 여쭌 답대로.
2. 읽기: 이 파일 맨 위 → 이 칸 → `C:\Users\ms1pk\dev\AAA\AGENTS.md`(규칙 판 v0.14, 읽기만) → `records/webapp-phase1/`의 마지막 반환서 둘(B4A2 · B6).
3. 받음을 이 칸 아래에 적음(새 Paseo ID · 작업 공간 · 세션 ID · 모델 — 짐작하지 말고 확인) · 표의 PRIMARY 칸 고침 · 커밋 · push(자기 역할 폴더만, 파일 이름으로 add).
4. 옛 PRIMARY(Paseo `5fbbea06-93d9-48b2-8930-e101d4603429`) 제목을 `MITCHELL_STUDIO/BTSR/PMO CLOSED`로, ARCH(`7621f3de-7d3e-4f12-87e1-98fe95e32fd4`) · RSCH(`ed5ef600-f1ab-4f47-8728-a19091c32e6a`)에 '승계 끝 · 새 Paseo ID'만 알림(PLN은 `be41b33c-5441-48f7-9202-9bb7c21b13a3`).
5. 그 뒤 ARCH가 보내는 **012(4-b) → 013(8-2)**을 이어 감 — ARCH가 반환을 대조할 때마다 다음 요청서를 보냄. 다 끝나면 한알이 기획안 초안을 먼저 보심.

### 역할 규칙 (그대로)
- 제품 main push 안 함(합치기는 RSCH 몫) · 맥 일 안 함(1차 끝 맥 시험에 한 번 — 결정 08) · **쓰는 곳은 이 역할 폴더(`projects/btsr/roles/pmo/`)와 제품 사본의 기능 가지뿐** · Git 위험 명령 안 씀(강제 push · reset --hard · 원격 가지 지우기 · rebase로 남의 커밋 바꾸기 등).
- codex 명령줄 값(`worker_model.MODEL_CLI` 등)은 지어내지 않음(비워 둠) · 진짜 원격에 개발자 글 push 안 함(`WEBAPP_DEV_PUSH` 기본 꺼짐, 시험은 가짜 원격).
- 코드 커밋과 시험 커밋 따로 · 시험 명령과 환경 값을 반환서에 그대로(AAA 규칙 24) · 반환서 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음).
- 손님 정보 · 키 · 비밀 값은 어디에도 적지 않음 · 시각은 한국 시각을 확인해서.

### 1. 지금
- 열린 요청: 없음(011 반환 · 새 ARCH 7621f3de 대조 기다림).
- 제품: main = `ed11f5a`(4-a까지). 그 위 가지 사슬(합치기는 RSCH): `feat/webapp-b4a2-stuck-restart-20261121` 243cff0(4-a-2, ARCH 수용) → `feat/webapp-b6-fix-versions-20261121` e512fcd(묶음 6). 다음 요청의 바탕은 요청서가 말한 가지 — main이 앞서 있으면 main.

### 2. 열린 것
- BTSR-ARCH-011: ARCH 대조 기다림.
- BTSR-RSCH-001(OpenCut 시험 코드): 반환 · 수용, 건은 열림 — 맥 결과 대기.
- `app/webapp/MAC_RUN_PHASE1.md`: 써 두기만(1차 끝 맥 시험). 맥 0 결과로 `worker_model.py` 명령줄 값 · 권한 플래그 · `WEBAPP_DEV_PUSH=1` 설정 줄을 PMO가 넣음.
- [맥에서 확인] 남은 것: 새 이름 캡컷 프로젝트(묶음 6) · 화면 15 작은 그림(`sips`) · 흐린 사진 판정 · 캡션 품질.

### 3. 이 PC (git 밖) — 일하는 법
- 제품 사본 `C:\Users\ms1pk\dev\btsr-pmo-work\mitchell-studio`. 새 요청은 `git checkout -b <새 가지> origin/<바탕>`.
- 고치기 도구 `btsr-pmo-work/tools/pt.py` — 고칠 쌍(옛 글 → 새 글)을 파이썬 파일에 써서 tools 폴더에서 `PYTHONIOENCODING=utf-8 python -I -c "import sys; sys.path.insert(0, '.'); exec(open('<파일>', encoding='utf-8').read())"`. 정확히 한 번 나와야 바꾸고 줄끝(CRLF/LF)을 지킴. **Bash heredoc 안의 역슬래시는 깨짐**(이 세션에서 세 번) — 파이썬 글은 늘 파일로 쓴 뒤 돌림.
- 시험: 제품 사본 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` (지금 125). 새 시험 class는 `setUp`에서 `_env.idle()`(한 번에 한 편 — 남은 편을 치움). `_env`는 `WEBAPP_DEV_PUSH=0`. 시험 폴더를 남겨 보려면 `MITCHELL_TEST_TMP`와 `WEBAPP_DATA_DIR` 등을 미리 만든 폴더로 줌(B6 판 기록을 그렇게 뽑음).
- 화면 시험: 시험 서버(`WEBAPP_ENV_FILE` 시험용 PIN · SECRET · `WEBAPP_HOST=127.0.0.1` · 빈 포트 · `WEBAPP_RUNNER=0` · `WEBAPP_TICK_SECONDS=0` · `WEBAPP_DEV_PUSH=0` · 시험 데이터 폴더) + 헤드리스 Chrome DevTools 스크립트 — 본보기 `records/webapp-phase1/evidence/screen_b6_test.mjs` · `screen_b6_state.py`(상태 스크립트로 한 편을 때마다 바꿈). node `C:\Users\ms1pk\DevEnvBackup-tools\node-v24.22.0\node-v24.22.0-win-x64\node`, Chrome `C:\Program Files\Google\Chrome\Application\chrome.exe`. 그림은 반환 전에 직접 열어 봄.
- 시험 서버 끄기: Git Bash `kill $!`은 `nohup`만 죽이고 python은 남음 → PowerShell로 명령줄에 `app/webapp/server.py`가 든 프로세스를 끄고 포트가 빈 것을 확인.
- 시각: PowerShell `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'Korea Standard Time')`(Git Bash `TZ=Asia/Seoul date`는 틀림).
- 에이전트 저장소 push가 가끔 `remote rejected (failed)` — 곧바로 한 번 더 하면 됨.

### 4. 배운 것 (모음)
- 사람 손을 없앨 때는 사람이 맞춰 주던 것(CapCut 목록 맨 위 등)을 일꾼이 직접 맞춰야 함.
- '모름'과 '틀림'을 한 칸에 두면 자동 문이 처음부터 닫힘(점검 `known`).
- 상태를 바꾸는 길이 여럿이면 기록은 저장 한 곳에서 이전 값과 견줘 씀(`save_status` → `log_event`).
- 이미 계산해 둔 물음 목록은 답 뒤에 낡을 수 있음 — 답이 표를 바꾸면 다시 셈.
- '고를 것' 판정은 단추 유무가 아니라 미첼의 답을 기다리느냐로.
- 원격 main에 글 하나만 올리기: 따로 둔 index + `commit-tree -p FETCH_HEAD`(가짜 원격으로 시험).
- running인 같은 일이 있으면 enqueue는 그것을 돌려줌 — 다음 일을 넣는 쪽의 '끝' 판정이 틀리면 이어지지 않음(B6 다시 뽑기).
- 가짜 작업자도 카드가 정한 이름만 쓰게 — 아니면 시험이 거짓으로 깨지거나 통과함.
- 이 PC: 제품 사본은 CRLF로 꺼내짐(`core.autocrlf=true`) — 섞여도 커밋은 LF. 윈도 시험은 PYTHONUTF8 없이도 한 번.

### 받음 (새 PRIMARY · 2026-11-21 17:01:38 KST)

- Paseo 상태 조회와 세션 환경에서 새 에이전트 `99626982-1190-4151-8cf5-b052ce8644c4`, 작업 공간 `wks_2dc964d20c5cca11`, Codex 세션 `01a1fd1f-0a3d-7752-9625-b5a4b1bdcf1c` 확인. 모델 `gpt-6.2-astra` · high · full-access.
- 옛 PMO `5fbbea06-93d9-48b2-8930-e101d4603429`에게서 받음. RSCH 받음 기록 `5584987`에 따라 넘김 (2)의 연락처를 새 RSCH로 고침.
- 에이전트 가지는 이 받음으로 커밋·push를 확인한다. 제품 사본은 011 기능 가지에서 status·fetch 성공. 제품 커밋·push 확인은 012 요청을 받은 뒤 첫 기능 변경 때 진행한다.

## 넘김 (3) — 2026-11-21, PMO 99626982

한알 말씀 원문 (Paseo 수신 17:41:20 KST)
> 저장하고 승계하세요

- 떠나는 PRIMARY는 Paseo `99626982-1190-4151-8cf5-b052ce8644c4`, Codex `01a1fd1f-0a3d-7752-9625-b5a4b1bdcf1c`이다. 같은 작업 공간 `wks_2dc964d20c5cca11`과 작업 폴더·가지 `worktrees/btsr-pmo` · `btsr/pmo`를 이어 쓴다. Paseo 런타임에서 승계 직전 확인한 설정은 `codex / gpt-6.2-astra / ultra / full-access`다.
- 012는 ARCH 수용 후 제품 main `7127393`에 반영됐다. 013은 제품 기능 가지 `feat/webapp-b82-template-r2-20261121`의 `94d4522`, [반환서](records/webapp-phase1/WEBAPP_PHASE1_B82_RETURN_CODEX.md)와 증거는 에이전트 `cf2f50d`. 전체 회귀는 기본 133 통과·2 건너뜀, 암호화 환경 135/135. ARCH에 반환 알림을 보냈다. 17:41 KST 확인한 ARCH 기록은 `btsr/arch 9874857`; 013 수용과 후속 구현 요청은 이 시점에 미접수다.
- 제품 사본 `C:\Users\ms1pk\dev\btsr-pmo-work\mitchell-studio`는 013 기능 가지와 원격 끝이 같다. 추적 파일 변경 없음. 기존 미추적 Python 캐시 세 폴더는 그대로 두었다. 기능 가지 push 권한은 012·013 실제 커밋으로 확인했다.
- 남은 일은 ARCH의 013 대조와 다음 요청 접수, RSCH의 맥 시험 결과 대기다. S13 시나리오 3판은 에이전트 main `ffe451d`. MAC_RUN 개정은 ARCH가 요청할 때 맡는다. 제품 main 합치기는 RSCH 몫이고 PMO의 맥 실기 범위는 열려 있지 않다.
- 받는 PRIMARY는 이 파일·두 반환서와 AAA 규칙 판 v0.14를 읽고 실제 세션 정보를 확인한다. 이 아래에 받음을 남기고 PRIMARY 표·앞머리를 갱신해 이 파일만 커밋·push한다. 옛 세션 제목에 CLOSED를 붙이고 ARCH·RSCH에 새 연락처를 알린다. 저장 뒤 받은 새 요청은 새 PRIMARY가 맡는다.

### 받음 (새 PRIMARY · 2026-11-21 17:44:51 KST)

- 옛 PMO `99626982-1190-4151-8cf5-b052ce8644c4`의 넘김 `80d81ee`와 Paseo 메시지 `f56fd3de-e01f-46d9-8daf-c6766637545a`를 받았다. 저장소 규칙, AAA 규칙 판 v0.14, 012·013 반환서를 읽었다.
- Paseo 상태와 세션 환경에서 새 에이전트 `7837ebd8-33f1-4729-bafe-e9a3e72f45d6`, 작업 공간 `wks_2dc964d20c5cca11`, Codex 세션 `01a1fd46-60cf-7d52-80da-caa5e42882b2`를 대조했다. 실행 설정은 `gpt-6.2-astra / ultra / full-access`, 작업 가지는 `btsr/pmo`다.
- 받음 시점에 ARCH는 013 제품 `94d4522`의 대조 결과가 일치해 PLN 반환서를 작성 중이었다. 확인한 ARCH 원격 끝은 `9874857`이다. MAC_RUN 개정은 ARCH의 정식 요청을 기다린다.
- 받음 커밋 `049fe8e`의 원격 반영 뒤 옛 PMO 제목을 `MITCHELL_STUDIO/BTSR/PMO CLOSED`로 바꾸고 새 PMO 제목을 확인했다. ARCH와 RSCH가 새 연락처를 수신했다. RSCH에는 한알 말씀 원문과 수신시각을 함께 보냈고 옛 PMO에도 전환 결과를 전했다. ARCH는 `btsr/arch`의 `93300f0`에 새 연락처를 기록했다.
