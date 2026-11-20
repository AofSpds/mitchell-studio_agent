# BTSR-PLN-001_worker-model-sol — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 쓴 때 | 2026-11-21 03:43 KST |
| 요청 | 가지 `btsr/pln` `48967ee` `projects/btsr/roles/pln/requirements/worker-model/WORKER_MODEL_BTSR-PLN-001_REQUEST_CLAUDE.md` — 요구 1판 R01–R07 |
| 아래 건 | ARCH → PMO [BTSR-ARCH-001](WORKER_MODEL_BTSR-ARCH-001_REQUEST_CLAUDE.md) · PMO 반환 원본: 가지 `btsr/pmo` `e13f82f` `projects/btsr/roles/pmo/records/worker-model/WORKER_MODEL_RETURN_CLAUDE.md` (증거 같은 폴더 `evidence/`) — **ARCH가 받아들임 기준 1–7과 대조해 받음** |

## 1. 결과

R01–R07 모두 됨 — 제품 저장소 가지 **`fix/worker-model-sol-20261121` `3495f7e`** (origin/main `9e7eb0e` 위 1커밋, push됨, **제품 main 합치기 안 함**).

| 요구 | 결과 | 확인한 이 |
|---|---|---|
| R01 설정 한 곳 | `app/webapp/worker_model.py` — enum `Model`(GPT-6.1 Terra · GPT-6.2 Sol) · `Effort`(High) · 지금 값 `GPT-6.2 Sol` · `High`. 바꿀 때는 이 파일의 두 줄 | ARCH가 파일을 읽음 |
| R02 이름 검사 | ⑥ · 연습 결과 줄 모두 `matches()` — 대소문자 · 띄어쓰기 무시해 같은지. `GPT-6.2 Sol` · `gpt-6.2  sol` 통과, `GPT-6.1 Terra` 불통과 | 시험 1·2 (PMO 돌림 + ARCH 다시 돌림) |
| R03 보이는 글 | 모음 카드 · 할 일 카드 · 연습 카드 · 점검 C3 · `/api/jobs`의 `worker` · 화면이 설정에서 `GPT-6.2 Sol · 생각 High`를 읽음. 모델 이름 글자는 `app/` 안에서 `worker_model.py` 밖에 README 안내 한 줄과 시험 기댓값뿐 | ARCH가 `git grep`으로 다시 봄 · 시험 3 |
| R04 terra 이름 동작 자리 | 모두 **둠**: `agents/_terra/` · CapCut 연습 프로젝트 `zz_practice_terra` · `practice_terra` 겹침 검사 · `terra_band()` · 응답 키 `terra` · 화면 id `terraBand` · 연습 상태 키 `tools["terra"]` · 기획서 파일 이름. 까닭: 맥 CapCut 폴더와 되살림 본에 이름이 들어 있어 바꾸면 맥에서 다시 떠야 함(오늘 시험을 막음), 나머지는 안쪽 이름이거나 쌓인 자료 · 가리키는 곳이 이 이름으로 읽음 — [설계 4번](WORKER_MODEL_DESIGN_CLAUDE.md) | PMO 반환 1번 표 |
| R05 글 | 고침: `AGENTS.md` · `CLAUDE.md` · `.claude/agents/tester.md` · 운영자 지침 `directives.md`(30줄은 지우지 않고 "대체됨" + 근거 새 줄) · `manual.md` · `manual-webapp.md` · `app/webapp/README.md` · capcut reference 2개 · 기획서 8개(맨 위 한 줄). 옛 기록(logs · research · requests · archive · knowhow · 경험 기록 · 생성물 · `agents/pmo/builds.md`)은 고치지 않음 | PMO 반환 3번 |
| R06 시험 | 새 시험 `app/webapp/tests/test_worker_model.py` 6/6 — 코드 `3495f7e`를 시험 `3495f7e`(같은 커밋)로. 시험용 웹앱(127.0.0.1)에서 `/api/jobs`가 새 값. 제품 저장소에 그 전부터 있던 자동 시험은 없음(origin/main `9e7eb0e` `app/` 아래 0개) | PMO: 윈도 Python 3.13.14 · ARCH: 같은 커밋을 따로 풀어 다시 돌려 6/6 OK |
| R07 맥 길 | 아래 한 줄 | — |

### 맥에 들어가는 길 (한 줄 — 제품 main 합치기 전, 가지로)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout fix/worker-model-sol-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

- 맥 작업 사본 자리 `~/mitchell_studio`는 PMO가 제품 `CLAUDE.md`에서 읽은 것 — 다르면 그 자리로.
- 합친 뒤라면: `cd ~/mitchell_studio && git checkout main && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload`

## 2. 증거

- 제품 커밋 `3495f7e` (부모 `9e7eb0e`), 26파일 +269 −71.
- PMO 증거: `btsr/pmo` `e13f82f` `projects/btsr/roles/pmo/records/worker-model/evidence/` (01 unittest · 02 R03 검색 · 03 diffstat · 04 시험 웹앱 기록).
- ARCH 다시 확인(2026-11-21 03:43 KST 전): `git grep -i -E "terra|테라|GPT-6" origin/fix/worker-model-sol-20261121 -- app`에서 R04 표의 이름을 뺀 결과 = README 3줄 · 시험 파일 · `worker_model.py`뿐. `git archive`로 따로 풀어 `python -m unittest discover -s app/webapp/tests` → `Ran 6 tests … OK`.

## 3. 바뀐 것

- 제품 저장소: 위 가지 1커밋(코드 9 · 글 17).
- 에이전트 저장소 `btsr/arch`: 설계 [WORKER_MODEL_DESIGN_CLAUDE.md](WORKER_MODEL_DESIGN_CLAUDE.md) 1판 · 요청 · 받음 · 이 반환서.

## 4. 남은 것

1. **제품 main 합치기** — 누가 정하는지 말씀 없음. ARCH · PMO 모두 하지 않음. 그 전까지 맥은 위 가지 길로.
2. **결과 줄에 생각 세기를 붙여 쓰면 ⚠** — `모델: GPT-6.2 Sol High`는 불통과(R02 "같은지"대로). 경고만 하고 일은 멈추지 않음. 맥 시험에서 작업자가 어떻게 쓰는지 보고, 받아 줄지는 PLN이 정함.
3. **맥 화면 눈 확인** — Jobs 띠 · 경고 글은 ⑥ 대기 작업이 있어야 보이고, 점검표(`/api/preflight`)는 맥 명령을 불러 윈도에서 못 돌림. 맥에서 "GPT-6.2 Sol · 생각 High"와 점검 C3 글을 볼 것.
4. 맥은 python3 3.9.6 — PMO가 3.10 이상 문법을 쓰지 않게 썼으나 3.9로 돌려 보지는 않음.

## 5. 배운 것

- 제품 저장소에는 자동 시험이 없었다 — "기존 시험 통과"는 요구에 쓰기 전에 무엇이 있는지 먼저 보고 적는 것이 좋다(이번에는 PMO의 시험용 웹앱 방식으로 대신).
- 제품 사본은 fetch · show · grep · archive만으로 읽고 시험할 수 있다 — 이 PC의 제품 작업 사본(main `0636fa0`에 멈춰 있음)을 건드리지 않음.

## 6. 다음

반환함. 다음 일을 스스로 시작하지 않음(AAA 규칙 18) — 이 건의 다음(합치기 · 맥 확인)은 PLN의 몫. ARCH는 이미 받은 BTSR-PLN-002 차례대로 이어 감.
