# BTSR-ARCH-017_webapp-mac-test-doc-add2 — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 7621f3de, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 19:30 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 7837ebd8) |
| 위 요청 | PLN 요청 `btsr/pln` 72141f1 `projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_MACTEST_DOC_ADD2_REQUEST_CLAUDE.md` — RSCH 요청서 003 46번 · 맥 1회차 1-2 멈춤(추적 파일 수정 14개 — agents/ 아래) · 한알 19:20:47 「아니 맥에서 제가 타자 많이 하기 힘들어여 ㅋㅋ」 · 결정 45 |
| 급함 | 급하지 않음 — 지금 1회차는 PLN이 드린 stash 한 줄로 이어 감. 2 · 3회차 · 다음 맥 테스트용 |
| 바탕 | 제품 **main 07cd3fc**에서 새 가지 `feat/webapp-mac-test-doc-add2-20261121` |
| 바꾸는 것 | `app/webapp/MAC_RUN_PHASE1.md` **한 파일만** · 커밋 하나 — 코드 · 시험 · 템플릿 0 |
| 맥 일 · main push | 없음 · 보조 새로 열지 않음(결정 46) |

## 1. 고칠 것

1. **점검은 추적 파일만**: '새 판 받기'와 '시작 판으로 되돌리기' 두 묶음의 변경 점검을 `git status --porcelain --untracked-files=no -- . ':(exclude)app/webapp/worker_model.py'`로. 1-2의 '됨' · '안 되면' 칸도 같은 뜻으로(추적 안 하는 파일 · `worker_model.py`는 세지 않음).
2. **추적 파일 수정은 멈추지 않고 보관**: 수정이 있으면 이름 붙여 stash(`worker_model.py` 빼고 · push 없음) — 예: `git stash push -m "mactest-<회차>-<시각>" -- . ':(exclude)app/webapp/worker_model.py'` → 한알께 한 줄("맥 사본의 바뀐 파일 N개를 보관했어요 — 이어 갈게요") → 이어 감. 회차 끝(3회차는 3-10)에 한 줄: "맥에서 `git stash apply`로 되살릴 수 있어요"(stash 이름 함께). **staged 파일이 있거나 판이 이상할 때만 멈춤**.
3. **한 줄 표를 짧게**(말씀 그대로):
   - 1회차: 「fetch만 하고 origin/main의 MAC_RUN_PHASE1.md 1회차대로 해 줘」
   - 2회차: 「MAC_RUN 2회차대로 해 줘」
   - 3회차: 「MAC_RUN 3회차대로 해 줘」

   '이끄는 ChatGPT = 맥의 세션 「코덱스 excutor」' 두 자리는 그대로. 짧은 줄이 무엇을 뜻하는지(1회차 = `git fetch origin`만 · `git show origin/main:app/webapp/MAC_RUN_PHASE1.md`의 공통 + 1회차, 2 · 3회차 = 맥 사본의 이 글 공통 + 그 회차)는 공통 첫머리에 한 줄로 — 이끄는 쪽이 짧은 줄만 보고 알 수 있게.

## 2. 받아들임 기준

- `git diff --stat 07cd3fc <머리>` = `app/webapp/MAC_RUN_PHASE1.md` 하나 · 커밋 하나.
- 글의 git 점검 줄에 `--untracked-files=no`와 `worker_model.py` 빼기가 같은 꼴로 · '안 되면'에서 추적 파일 수정만으로 멈추는 줄 0 · stash 줄과 회차 끝 되살리기 한 줄 있음.
- 회귀(저장소 전부 · 환경 값 없이) OK.

## 3. 반환

가지 머리 · diff · 시험 결과. 반환은 ARCH(Paseo 7621f3de)로.
