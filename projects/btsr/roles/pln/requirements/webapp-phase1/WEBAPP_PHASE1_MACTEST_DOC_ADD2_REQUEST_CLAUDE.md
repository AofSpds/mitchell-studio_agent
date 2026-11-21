# BTSR-PLN-002 덧붙임 — 맥 테스트 글 덧붙임 2(점검은 추적 파일만 · 수정은 보관하고 이어 감 · 짧은 한 줄) — ARCH께 요청

| 칸 | 내용 |
|---|---|
| 요청하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo be41b33c) → ARCH (Paseo 7621f3de) |
| 쓴 때 | 2026-11-21 19:32 KST |
| 근거 | RSCH 요청서 003 46번(에이전트 저장소 main `24b816f`) · 맥 1회차 1-2 멈춤(한알 19:24:42 · 19:26:28 사진 — `PLN_OWNER_UTTERANCES_CLAUDE.md`) · 한알 19:20:47 「아니 맥에서 제가 타자 많이 하기 힘들어여 ㅋㅋ」 · 결정 45(개인 앱) |
| 급함 | 급하지 않음 — 지금 1회차는 PLN이 드린 stash 한 줄로 이어 감. 2 · 3회차와 다음 맥 테스트를 위해 |

## 1. 고칠 것 (제품 `app/webapp/MAC_RUN_PHASE1.md` 한 파일만 · 글뿐)

1. '새 판 받기'와 '시작 판으로 되돌리기' 두 묶음의 점검을 **추적 파일만**: `git status --porcelain --untracked-files=no -- . ':(exclude)app/webapp/worker_model.py'`. 1-2의 됨 기준 · 안 되면 칸도 같은 뜻으로.
2. **추적 파일의 수정이 있으면 멈추지 말고** 이름 붙여 stash로 보관(`worker_model.py` 빼고 · push 없음) → 한알께 한 줄로 알리고 이어 감. 회차 끝(또는 3-10)에 '맥에서 `git stash apply`로 되살릴 수 있음' 한 줄. staged 파일이 있거나 판이 이상하면(46번 2의 나머지) 그때만 멈춤.
3. 한 줄 표를 짧은 줄로: 1회차 「fetch만 하고 origin/main의 MAC_RUN_PHASE1.md 1회차대로 해 줘」 · 2회차 「MAC_RUN 2회차대로 해 줘」 · 3회차 「MAC_RUN 3회차대로 해 줘」.

## 2. 가지 · 합치기

- 바탕 = 제품 main `07cd3fc`. 새 가지 하나 · 한 파일 · 커밋 하나면 충분. 맡길 길은 ARCH가(결정 46 — 새 에이전트 여럿 열지 않음).
- 반환: ARCH → PLN(가지 머리). PLN이 조건(main `07cd3fc` · 머리 · 앞으로 감기)을 적어 RSCH에 → RSCH가 그 한 파일뿐인지 보고 합침.
