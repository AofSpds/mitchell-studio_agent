# 작업자 모델 설정 — 설계 1판 (worker-model)

| 칸 | 내용 |
|---|---|
| 판 | 1판 — 2026-11-21 03:31 KST, ARCH가 씀 |
| 받은 요청 | BTSR-PLN-001_worker-model-sol (PLN → ARCH). 원본: 에이전트 저장소 가지 `btsr/pln` `48967ee` `projects/btsr/roles/pln/requirements/worker-model/WORKER_MODEL_BTSR-PLN-001_REQUEST_CLAUDE.md` |
| 요구 정본 | 같은 폴더 `WORKER_MODEL_REQUIREMENTS_CLAUDE.md` 1판 R01–R07 (`48967ee`). 결정 `WORKER_MODEL_DECISIONS_CLAUDE.md` 01–04 |
| 본 코드 | 제품 저장소 `AofSpds/mitchell-studio` **origin/main `9e7eb0e`** (2026-11-21 03:16 KST). `git fetch` 뒤 `git show`·`git grep`으로만 읽음 — 이 PC의 제품 작업 사본은 건드리지 않음 |
| 맡김 | PMO에 BTSR-ARCH-001 ([요청서](WORKER_MODEL_BTSR-ARCH-001_REQUEST_CLAUDE.md)) |

## 1. 한 줄

작업자 모델을 **새 파일 하나 `app/webapp/worker_model.py`**(enum + 지금 값)에 두고, 서버·화면·점검·카드·이름 검사가 모두 그 파일을 읽게 한다. 이름에 terra가 든 동작 자리(경로·프로젝트·id)는 **그대로 둔다**.

## 2. 설정 한 곳 — `app/webapp/worker_model.py` (R01)

```python
"""작업자 모델 — ⑥ 캡컷 컴퓨터 유즈를 하는 맥 ChatGPT/Codex의 모델.
모델을 바꿀 때는 이 파일의 MODEL·EFFORT 두 줄만 고친다 (한알 결정 2026-11-19 23:47:02 「변수 처리하고 enum 같은걸로」)."""
from enum import Enum

class Model(Enum):          # 고를 수 있는 모델 (새 모델은 여기에 한 줄 더함)
    GPT_6_1_TERRA = "GPT-6.1 Terra"
    GPT_6_2_SOL = "GPT-6.2 Sol"

class Effort(Enum):         # 생각 세기 (지금 아는 값만)
    HIGH = "High"

MODEL = Model.GPT_6_2_SOL   # ← 지금 값
EFFORT = Effort.HIGH        # ← 지금 값

def name() -> str:  return MODEL.value                       # "GPT-6.2 Sol"
def label() -> str: return f"{MODEL.value} · 생각 {EFFORT.value}"  # "GPT-6.2 Sol · 생각 High"
def _norm(s: str) -> str: return "".join((s or "").split()).casefold()
def matches(written: str) -> bool:                           # R02
    return bool(_norm(written)) and _norm(written) == _norm(MODEL.value)
def public() -> dict: return {"model": MODEL.value, "effort": EFFORT.value, "label": label()}
```

- 표준 라이브러리만 씀(맥에 더 깔 것 없음). 다른 곳(환경 변수 등)에서 덮어쓰지 않음 — "한 곳"을 지키려고.
- `Effort`에는 지금 아는 `High`만 둔다. 다른 값은 지어내지 않음.
- `jobs.py`의 `CHATGPT_MODEL` 상수는 없앤다(쓰던 곳은 `worker_model`을 부름).

## 3. 고칠 자리 (R02·R03) — origin/main `9e7eb0e` 줄 번호

| 자리 | 지금 | 바꿈 |
|---|---|---|
| `jobs.py`:70 | `CHATGPT_MODEL = "GPT-6.1 Terra"` | 지움 → `import worker_model as WM` |
| `jobs.py`:837 | `"terra" in model.lower() or "테라" in model` | `WM.matches(model)` |
| `practice.py`:441 | 같은 글자 검사 | `WM.matches(kv["모델"])` |
| `jobs.py`:1521 모음 카드 머리 | `ChatGPT 모델: {CHATGPT_MODEL}` | `ChatGPT 모델: {WM.label()}` |
| `practice.py`:304 연습 카드 머리 | `# Terra 연습 카드 … {J.CHATGPT_MODEL}` | `# ChatGPT 연습 카드 … {WM.label()}` |
| `preflight.py`:18 점검 C3 | `"Codex 새 스레드에서 GPT-6.1 Terra를 골랐어요"` | `f"Codex 새 스레드에서 {WM.label()}를 골랐어요"` |
| `reel_api.py`:282 | `{"ok", "items", "terra", "practice"}` | 같은 응답에 `"worker": WM.public()` 더함 |
| `static/app.html`:486 | `const TERRA = "GPT-6.1 Terra";` | `let WORKER = "작업자 모델";` → 응답을 받을 때 `WORKER = jr.worker.label` (받기 전 기본 글만 보임) |
| `app.html`:513 · 572 · 585 · 614 | `${TERRA}` | `${WORKER}` (572의 경고는 "다음엔 ${WORKER}로 골라 주세요") |

- 이름 검사가 불통과일 때 하는 일(⚠ 경고 표시)은 그대로다 — 무엇을 불통과로 보는지만 바뀜 (R02 "지금 불통과 때와 같은 처리").
- 결과 줄 꼴(`모델: ___`)은 그대로. 받은 글은 대소문자·띄어쓰기만 무시하고 견줌 → `GPT-6.2 Sol High`처럼 생각 세기를 붙여 쓰면 불통과(⚠)다. 요구 R02대로 두고 반환서 '남은 것'에 적는다.
- 사람에게 보이는 글에서 작업자를 부르는 "Terra"는 "ChatGPT"로 바꾼다: `practice.py`:393·396("Terra 값"·"Terra 적음")·457("Terra 멈춤")·507, `jobs.py`:1522("Terra는 읽기만"), `preflight.py`:110("Terra가 카드에서 켜요"), argparse 설명(`practice.py`:597 · `preflight.py`:236). 주석·docstring의 "Terra"(작업자를 뜻함)도 "ChatGPT"로 — 운영 전이라 그냥 고침(결정 03).

## 4. 이름에 terra가 든 동작 자리 — 모두 둠 (R04)

| 자리 | 둠/옮김 | 까닭 |
|---|---|---|
| `agents/_terra/experience.md` (`jobs.py`:1050 `EXPERIENCE`, `AGENTS.md`:20, tester) | 둠 | 작업자가 카드 전에 읽는 '요령'과 지난 기록이 이어지는 자리. 옮기면 가리키는 곳 넷을 함께 고쳐야 하고 얻는 것 없음 |
| CapCut 연습 프로젝트 `zz_practice_terra` (`jobs.py`:1051 `PRACTICE_PROJECT`, `data/working/_practice/capcut_seed/`) | 둠 | 맥 CapCut 폴더와 되살림 본(`root_entry.json`·`manifest.sha256`)에 이 이름이 들어 있음. 바꾸려면 맥에서 되살림 본을 새로 떠야 함 — 오늘 시험을 막음 |
| `preflight.py`:165 `"practice_terra"` 겹침 검사 | 둠 | 위 프로젝트 이름에 딸림 |
| `jobs.terra_band()` · 응답 키 `terra` · 화면 id `terraBand` | 둠 | 안쪽 이름(모델을 고르지 않음). 서버·화면을 함께 바꿔야 하고 오늘 시험에 얻는 것 없음 |
| 연습 상태의 `tools["terra"]` 키 (`practice.py`:474) | 둠 | 이미 쌓인 상태 파일이 이 키로 읽힘. 보이는 글만 "ChatGPT"로 |
| 기획서 파일 이름 `agents/pln/specs/2026-11-10_terra-*.md` | 둠 | 코드 주석·README·tester가 이 이름으로 가리킴 |

R03 확인 방법: `git grep -n -i -E "terra|테라|GPT-6" -- app` 결과가 **`worker_model.py`의 enum 두 줄 + 위 표의 이름**(그리고 기획서 파일 이름을 가리키는 줄)만 남는다. PMO는 그 결과를 반환서 증거에 붙인다.

## 5. 글 맞추기 (R05)

| 고침 | 무엇을 |
|---|---|
| 지침·안내 | `AGENTS.md`(제목 "Codex(Terra) 약속" 등) · `CLAUDE.md`:22 · `.claude/agents/tester.md` · `agents/creative_director/manual.md` · `manual-webapp.md` · `app/webapp/README.md` · `agents/capcut/reference/*.md` — 작업자 모델 글은 "**GPT-6.2 Sol · 생각 High** (설정 `app/webapp/worker_model.py`)", 작업자를 부르는 "Terra"는 "ChatGPT" |
| 운영자 기준 `agents/creative_director/directives.md`:30–31 | 줄을 지우지 않는다. 30 줄 끝에 "→ 대체됨 2026-11-21: 작업자 모델은 GPT-6.2 Sol · 생각 High, 설정 한 곳(`app/webapp/worker_model.py`)" 그리고 근거(한알 11-19 23:24:23 · 23:47:02 · 23:56:41) 새 줄. 31의 "Terra"는 "ChatGPT(작업자)" |
| 기획서 `agents/pln/specs/` 중 Terra가 나오는 것 | 본문은 두고, 맨 위에 한 줄: "2026-11-21: 작업자 모델은 이제 `app/webapp/worker_model.py` 설정을 따름(지금 GPT-6.2 Sol · 생각 High). 본문의 Terra는 작업자를 뜻함." |
| **고치지 않음** | `logs/` · `research/` · `requests/`(운영자 원문) · `archive/` · `knowhow.md` · `agents/_terra/experience.md`(작업자의 경험 기록) · 생성물(`status.json` · `folder-tree.md` · `dashboard.html`) — 그때의 기록이라 |

## 6. 시험 (R06)

- 제품 저장소 origin/main `9e7eb0e`의 `app/` 아래에 자동 시험 파일은 없다(`git ls-tree`로 본 범위). 그래서 "기존 시험"은 PMO가 해 오던 방식(pmo knowhow: 시험용 폴더 · `WEBAPP_HOST=127.0.0.1`)으로 돌린다.
- 더할 시험: `app/webapp/tests/test_worker_model.py` (표준 `unittest`, 돌리기: `python3 -m unittest discover -s app/webapp/tests`)
  1. `matches`: `GPT-6.2 Sol` ✔ · `gpt-6.2  sol` ✔ · ` GPT-6.2 SOL ` ✔ · `GPT-6.1 Terra` ✘ · `테라` ✘ · 빈 글 ✘
  2. 결과 줄 처리: ⑥ 결과 줄(`목소리 끝 · 목소리: x · 모델: GPT-6.2 Sol`)과 연습 결과 줄을 넣으면 `model.ok`가 참, `모델: GPT-6.1 Terra`면 거짓
  3. R01 한 곳: `worker_model.MODEL`을 `Model.GPT_6_1_TERRA`로 잠시 바꾸면 모음 카드 머리 · 연습 카드 머리 · 점검 C3 글 · API `worker`가 모두 Terra로 바뀜 (C3처럼 불러올 때 정해지는 값은 함수로 바꾸거나 시험에서 다시 불러옴 — PMO가 고름)
- 돌린 결과에는 코드 커밋과 시험 커밋을 함께 적는다(AAA 규칙 24).
- 화면: 시험용 웹앱에서 Jobs 화면의 모델 글이 "GPT-6.2 Sol · 생각 High"인지, 점검 C3 글이 같은지 본다.

## 7. 가지 · 맥 (R06·R07)

- 제품 저장소 작업 가지: PMO 작업 사본에 있는 빈 로컬 가지 `fix/worker-model-sol-20261121`을 쓴다(origin/main `9e7eb0e` 위로 맞춘 뒤). 새로 내도 된다 — PMO가 고르고 반환서에 적음.
- 제품 main 합치기는 ARCH가 정하지 않는다. 합치기 전이면 맥이 그 가지를 받는 길, 합친 뒤면 `git pull` 길 — PMO는 실제로 된 쪽의 **한 줄**(pull · 웹앱 다시 켜기 명령까지)을 반환서에 적는다.

## 8. 범위 밖

- Claude가 맡은 단계(접수·원고·편집)의 모델 (요구 범위 밖 1).
- 웹앱의 다른 고침 (요구 범위 밖 2).
