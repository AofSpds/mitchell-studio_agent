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

## 덧붙임 1 — 둘 더 (19:35 KST, ARCH 7621f3de · 본문은 그대로 · 같은 커밋에 1–5 한 번에)

- **까닭**: RSCH 요청서 003 47번(main 3d5725c) · PLN 요청서 끝 '덧붙임 (19:36)' — 맥에서 1-3 직전에 멈춤 · 한알 19:31:55 「모두 예약작업 가능할까요 일단 잠깐 두고 가야 해서요. …」 · 결정 45.
4. **`worker_model.py`가 없는 맥 판**: 1-3 '새 판 받기' 묶음(`cp "$wm"` · `git checkout -- "$wm"` · `git diff -- "$wm"`)이 맥 지금 판에 `app/webapp/worker_model.py`가 없을 때를 다루게 — **없으면 묻지 않고** 사본 · 되돌리기 · 대조를 건너뛰고 새 판을 받음 → 1-5에서 세 값을 넣음(외부 사본은 1-5 끝에 처음 만듦). '되돌리기' 묶음도 같은 뜻.
5. **맡겨 두는 길(PLN이 정함)** — 공통에 한 줄: 한알이 **'묻지 말고 이어서'**라고 하시면 회차 끝 '결과를 올릴까요?'는 1(올림)로 보고 다음 회차로 · 맥 화면이 꺼지지 않게(예: `caffeinate -dimsu`를 그 회차 동안 — 끝나면 끔) · **PIN · 로그인 · 암호 · 권한 창 · 결정 42 표 밖은 그대로 멈추고 한 줄 남김** · **3회차는 휴대폰 걸음이라 맡겨 두지 않음**.
- 받아들임 기준에 더함: 1-3 묶음에 `worker_model.py` 없을 때 갈래 · 공통에 맡겨 두는 길 한 줄(멈추는 것 넷 · 3회차 뺌).

## 덧붙임 2 — main 위로 옮김 · 웹앱 재시작은 먼저 여쭘 (19:48 KST, ARCH 7621f3de · 본문은 그대로)

- **까닭**: PLN 확인(`btsr/pln` 39f0b01 '반환 대조 · 덧붙임 (19:49)') · **결정 48** — 맥 기록(제품 main e175217)의 한알 19:43 「맥 런 페이즈1.md 3-3 3-4 3-5 휴대폰 https 와 알림 웹 앱 재시작은 하기 전에 물어봐주세요」.
- **(가)** 18f56eb의 두 커밋(77312f1 · 18f56eb)을 **제품 main 9a41aa6 위로 옮김**(cherry-pick — 맥 쪽 e175217 · 9a41aa6은 `agents/` 15파일 · `app/` 0이라 겹침 없음). 같은 가지 이름에 새 머리로 — 강제 push가 필요하면 하지 말고 새 가지 `feat/webapp-mac-test-doc-add2b-20261121`.
- **(나)** '맡겨 두기'여도 **웹앱 다시 켜기 걸음(1-3 · 3-1 · 개발자 글 올리기를 켠 뒤 다시 켬)과 3-3 – 3-5는 먼저 한 줄로 여쭘**(번호로 답 — 1 진행 · 2 멈춤). 공통 '맡겨 두기' 줄의 '멈추는 것'에 이 둘을 더하고, 해당 걸음에도 한 줄.
- `app/webapp/MAC_RUN_PHASE1.md` 한 파일 · 같은 커밋 또는 이어진 커밋. `test_recent` 첫 실행 실패는 고치지 않음(결정 45).
- 기준: `git merge-base --is-ancestor 9a41aa6 <새 머리>` · `git diff --stat 9a41aa6 <새 머리>` = MAC_RUN 한 파일 · 회귀 OK. 반환에 새 머리.
