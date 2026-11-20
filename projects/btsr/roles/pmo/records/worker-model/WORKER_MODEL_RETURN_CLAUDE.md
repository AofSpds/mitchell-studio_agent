---
item: BTSR-ARCH-001_worker-model-sol
stage: 반환
written_role: MITCHELL_STUDIO/BTSR/PMO (PRIMARY — Paseo f3cf6938, Claude Opus 5.5 high)
recorded_at: 2026-11-21 03:39 KST (PowerShell 확인)
requester: MITCHELL_STUDIO/BTSR/ARCH (Paseo 9d298a54)
request: 가지 btsr/arch aee2291 projects/btsr/roles/arch/design/worker-model/WORKER_MODEL_BTSR-ARCH-001_REQUEST_CLAUDE.md · 설계 WORKER_MODEL_DESIGN_CLAUDE.md 1판
---

# BTSR-ARCH-001_worker-model-sol — 반환

## 1. 결과

**설계 1판대로 됨.** 제품 저장소 가지 `fix/worker-model-sol-20261121` **`3495f7e`**(origin/main `9e7eb0e` 위 1커밋, push함 · main 합치기 안 함).

| 기준 | 결과 |
|---|---|
| 1 설정 한 곳 (R01·R03) | `app/webapp/worker_model.py` — `Model`(GPT_6_1_TERRA · GPT_6_2_SOL) · `Effort`(HIGH) · `MODEL = GPT_6_2_SOL` · `EFFORT = HIGH`, `name()·label()·matches()·public()`. `jobs.py`의 `CHATGPT_MODEL` 없앰. R03 검색: 모델 이름 글자는 `worker_model.py`에만 — 밖에는 `app/webapp/README.md`:3 안내 한 줄(설계 5번 글)과 시험 파일의 기댓값뿐 ([evidence/02](evidence/02_r03_grep_app.txt)) |
| 2 이름 검사 (R02) | `jobs.py` ⑥ 결과 줄 · `practice.py` 연습 결과 줄 모두 `WM.matches()`. 시험 1·2 통과 |
| 3 보이는 글 (R01·R03) | 모음 카드 · 작업마다 할 일 카드 · 연습 카드 · 점검 C3 · `/api/jobs`의 `worker` · 화면(`WORKER = jr.worker.label`)이 `GPT-6.2 Sol · 생각 High`. 시험 3 통과(MODEL 한 줄을 Terra로 바꾸면 다섯 곳이 모두 Terra로 — 그리고 되돌림) |
| 4 terra 이름 동작 자리 (R04) | 설계 4번 표대로 **모두 둠**: `agents/_terra/` · `zz_practice_terra` · `practice_terra` 겹침 검사 · `terra_band()`·응답 키 `terra`·`terraBand` · `tools["terra"]` · 기획서 파일 이름. 다르게 한 곳 없음 |
| 5 글 (R05) | 아래 3번 목록. 지침 30줄은 지우지 않고 끝에 "→ 대체됨 2026-11-21" + 근거 새 줄, 31줄 "Terra" → "ChatGPT(작업자)"(원문 따옴표는 그대로). 기획서 8개는 본문 두고 맨 위 한 줄 |
| 6 시험 (R06) | 새 시험 6/6 통과 · 시험용 웹앱 확인(아래 2번) |
| 7 맥 길 (R07) | 아래 '맥에 들어가는 길' |

### 맥에 들어가는 길 (한 줄 — 합치기 전, 가지로)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout fix/worker-model-sol-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

- 맥 작업 사본 자리는 제품 저장소 `CLAUDE.md`의 상황판 경로(`…/mitchell_studio`)로 읽음 [내 읽기 — 다르면 그 자리로]. 웹앱 다시 켜기는 제품 `app/webapp/README.md`:5 · pmo knowhow의 명령 그대로.
- main에 합친 뒤라면: `cd ~/mitchell_studio && git checkout main && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload`
- 맥 python3 3.9.6에서 도는 꼴로 씀(3.10 이상 문법 안 씀) — 이 PC는 3.13으로만 돌려 봄.

## 2. 증거 — 코드 `3495f7e`를 시험 `3495f7e`(같은 커밋, 시험 파일 포함)로 돌림

이 PC(윈도 · Python 3.13.14), 2026-11-21 03:3x KST. 원본: [evidence/](evidence/)

- `01_unittest.txt` — `python -m unittest discover -s app/webapp/tests -v` → 6개 OK
  - 시험 1: `GPT-6.2 Sol` · `gpt-6.2  sol` · ` GPT-6.2 SOL ` · `GPT-6.2Sol` 통과 / `GPT-6.1 Terra` · `테라` · 빈 글 · None · `GPT-6.2 Sol High` · `Sol` 불통과
  - 시험 2: ⑥ 결과 줄 `멈춤 · 이유: 시험 · 모델: GPT-6.2 Sol` → `model.ok` 참, `GPT-6.1 Terra` → 거짓 / 연습 결과 줄 `모델: gpt-6.2 sol` → 참, `GPT-6.1 Terra` → 거짓
  - 시험 3: 모음 카드 · 할 일 카드 · 연습 카드 · 점검 C3 · API label이 Sol일 때 Sol만, MODEL을 Terra로 바꾸면 Terra만
- 시험용 웹앱(기존 방식 — 빈 시험 폴더 `WEBAPP_DATA_DIR` · `WEBAPP_CONFIG_DIR` · `CAPCUT_DRAFTS_DIR`, `WEBAPP_HOST=127.0.0.1` · 포트 8799 · `WEBAPP_TICK_SECONDS=0`, 시험용 PIN·SECRET만 넣은 env 파일): 로그인 ok → `/api/jobs`에 `"worker": {"model": "GPT-6.2 Sol", "effort": "High", "label": "GPT-6.2 Sol · 생각 High"}` · 받은 화면 HTML에 `let WORKER`와 `if (jr.worker && jr.worker.label) WORKER = jr.worker.label;`, `TERRA`·`GPT-6.1` 0건. 서버 기록 [evidence/04](evidence/04_webapp_server.log). 확인 뒤 서버 끔.
- `03_diffstat.txt` — 26파일 +269 −71. 모든 `.py`가 문법 검사 통과.

## 3. 바뀐 것 (제품 저장소 26파일)

- 코드: `app/webapp/worker_model.py`(새) · `jobs.py` · `practice.py` · `preflight.py` · `reel_api.py` · `server.py`(주석) · `static/app.html` · `app/scripts/voice_fit.py`(주석) · `app/webapp/tests/test_worker_model.py`(새)
- 글: `AGENTS.md` · `CLAUDE.md` · `.claude/agents/tester.md` · `agents/creative_director/directives.md` · `manual.md` · `manual-webapp.md` · `app/webapp/README.md` · `agents/capcut/reference/practice-project.md` · `voice-gap-logic.md` · `agents/pln/specs/` 8개(맨 위 한 줄만)
- 고치지 않음(설계 5번): logs · research · requests · archive · knowhow · `agents/_terra/experience.md` · 생성물(`dashboard.html` · `status.json` · `folder-tree.md`). **`agents/pmo/builds.md`**(GPT-6.1 Terra 2곳)도 그때의 구현 기록이라 두었음 — 설계 표에 없던 파일이라 적어 둠.

## 4. 남은 것

1. **제품 main 합치기** — 안 함. 누가 정할지 말씀 없음(ARCH도 정하지 않음). 그 전까지 맥은 위 가지 길로.
2. **결과 줄에 생각 세기를 붙여 쓰면 불통과** — `모델: GPT-6.2 Sol High`는 ⚠ (설계 3번 · 요구 R02대로). 맥 시험에서 작업자가 어떻게 쓰는지 보고 정함.
3. **화면 눈 확인** — 띠 · 경고 글(`${WORKER}`)은 ⑥ 대기 작업이 있어야 보임. 이 PC에서는 API와 화면 코드만 봄. 맥 Jobs 화면에서 "GPT-6.2 Sol · 생각 High"인지 · 점검 C3 글.
4. **점검표(`/api/preflight`)를 이 PC에서 못 돌림** — 맥 명령을 불러 윈도에서 `WinError 2`(이번 고침과 무관, 원래 맥 전용). C3 글은 시험 3으로 봄.
5. 상황판 HTML(`build.py`)은 다시 만들지 않음 — 생성물이라 손대지 않는 범위(설계 5번). 제품 쪽 세션이 다음 갱신 때 반영.

## 5. 배운 것

- 제품 웹앱 API는 POST에 `X-Upload-App: 1` 머리말이 있어야 받음(없으면 `forbidden`). 시험용 env의 `WEBAPP_SECRET`은 32자 이상이어야 켜짐.
- 이 PC 제품 사본은 CRLF로 꺼내짐 — 고칠 때 줄끝을 그대로 두는 도구로 고침(파일 전체가 바뀐 것처럼 보이지 않게).
- 거둔 요청(RSCH 03:20 — 정해진 길을 건너뜀) 때 만든 빈 로컬 가지를 지우지 않고 둔 덕에, 정식 요청(ARCH)에서 그대로 이어 씀.

## 6. 다음

- 반환함. 다음 일은 스스로 시작하지 않음(AAA 규칙 18). 합치기 · 맥 확인 결과는 ARCH/PLN을 거쳐 받으면 이어 함.
