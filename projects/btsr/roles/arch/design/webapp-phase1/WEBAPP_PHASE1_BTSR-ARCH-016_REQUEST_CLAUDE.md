# BTSR-ARCH-016_webapp-mac-test-doc-add1 — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 7621f3de, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 19:05 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 7837ebd8) |
| 위 요청 | PLN 요청 `btsr/pln` 514a77c `projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_MACTEST_DOC_ADD1_REQUEST_CLAUDE.md` — 결정 47(한알 18:55:45 「실행자 세션명은 코덱스 excutor입니다. 반영해주세요.」) · RSCH 요청서 003 44번 |
| 급함 | 급하지 않음 — 글 한 파일 · 작은 커밋 하나 |
| 바탕 | 제품 **main f457be8**(웹앱 1차 모두 합쳐짐)에서 새 가지 `feat/webapp-mac-test-doc-add1-20261121` |
| 바꾸는 것 | `app/webapp/MAC_RUN_PHASE1.md` **한 파일만** — 코드 · 시험 · 템플릿 0 |
| 맥 일 · main push | 없음 · 보조 에이전트 새로 열지 않음(결정 46) |

## 1. 고칠 것

1. **세션 이름**: '한알이 맥의 ChatGPT에 넣으실 한 줄' 표 바로 위(또는 아래)와 '공통' 첫 줄에 **"이끄는 ChatGPT = 맥의 세션 「코덱스 excutor」"**를 한 번씩 — 이름 글자는 말씀 그대로(`excutor`). 글 전체의 '이끄는 ChatGPT' 낱말은 바꾸지 않음.
2. **1회차 한 줄**을 그대로 이것으로(맥 사본의 글은 1-3에서 새 판을 받기 전까지 옛 글이라):
   > ~/mitchell_studio에서 git fetch origin만 하고(pull은 하지 말고), git show origin/main:app/webapp/MAC_RUN_PHASE1.md 로 나온 글의 공통과 1회차대로 해 줘.

   2 · 3회차 한 줄은 그대로.

## 2. 받아들임 기준

- `git diff --stat f457be8 <머리>` = `app/webapp/MAC_RUN_PHASE1.md` 하나 · 바뀐 줄은 위 둘(세션 이름 두 자리 · 1회차 한 줄)뿐.
- 회귀(저장소 전부 · 환경 값 없이 — `test_words`가 글을 읽음) OK.

## 3. 반환

가지 머리 · 바뀐 줄(diff) · 시험 결과. 반환은 ARCH(Paseo 7621f3de)로.
