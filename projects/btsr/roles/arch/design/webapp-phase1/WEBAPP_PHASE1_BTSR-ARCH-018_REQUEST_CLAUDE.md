# BTSR-ARCH-018_webapp-plan-to-product — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 7621f3de, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 21:15 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 7837ebd8) |
| 위 요청 | PLN 요청 `btsr/pln` 92aacb5 `projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_PLAN_TO_PRODUCT_REQUEST_CLAUDE.md` — 한알 19:07:25 「기획안  깃헙 미첼 스튜디오에서도 볼수 있나요」 · 21:12:48 「올립니다」 · RSCH 요청서 003 50번 |
| 급함 | 급하지 않음 — 맥 테스트를 막지 않게(맥 사본이 쓰는 파일 · `MAC_RUN_PHASE1.md`는 건드리지 않음) |
| 바탕 | 제품 main — **보낼 때(push 직전) `origin/main`을 다시 보고 그 위로**(맥 세션이 main에 바로 올림. 이 요청을 쓸 때 main = e095396). 새 가지 `feat/webapp-plan-phase1-20261121` |
| 바꾸는 것 | **글 두 파일만**: `app/webapp/PLAN_PHASE1.md`(새로) · `app/webapp/README.md`(한 줄) — 코드 · 시험 · 템플릿 · `MAC_RUN_PHASE1.md` 0 |
| 맥 일 · main push | 없음 · 보조 새로 열지 않음(결정 46) |

## 1. 할 것

1. `app/webapp/PLAN_PHASE1.md` = 에이전트 저장소 **`92aacb5`**의 `projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_PLAN_DRAFT_CLAUDE.md`(기획안 초안 **1.9판**) **그대로**(`git show 92aacb5:<경로>`) + 바꿀 것 둘:
   - 맨 위(제목 줄 바로 아래)에 한 줄 그대로:
     > 사본 — 원본은 에이전트 저장소 mitchell-studio_agent의 기획(PLN) 글(WEBAPP_PHASE1_PLAN_DRAFT_CLAUDE.md, 1.9판). 판이 바뀌면 이 파일도 같은 판으로 다시 옮깁니다. 고칠 말씀은 기획에 주세요.
   - 맨 끝 '## 이 글의 바탕'의 '같은 폴더의 요구 글 · 결정 글'(이 저장소에 없음) → '에이전트 저장소 mitchell-studio_agent의 `projects/btsr/roles/pln/requirements/webapp-phase1/` 요구 글 · 결정 글'.
2. `app/webapp/README.md`에 한 줄: '웹앱 1차 기획안(쉬운 말 한 장) — `PLAN_PHASE1.md`'(맨 위 안내 둘레, 자리는 PMO가).

## 2. 받아들임 기준

- `git diff --stat <바탕 main> <머리>` = 두 파일뿐. 바탕 main이 머리의 조상(앞으로 감기 됨).
- `PLAN_PHASE1.md` ↔ 원본 1.9판 diff = 맨 위 한 줄 더함 · '이 글의 바탕'의 그 자리 하나뿐.
- 손님 정보 · 키 0(원본도 '미첼'만).
- 회귀(저장소 전부 · 환경 값 없이) OK — `test_words`가 `app/webapp/` 글을 읽으면 걸리는 말이 없는지 함께.

## 3. 반환

가지 머리 · 바탕 main · 두 diff(원본 ↔ 사본, main ↔ 머리) · 시험 결과. 반환은 ARCH(Paseo 7621f3de)로.
