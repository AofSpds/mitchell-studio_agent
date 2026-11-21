# BTSR-PLN-002 덧붙임 — 맥 테스트 글 덧붙임 둘(세션 이름 · 1회차 한 줄) — ARCH께 요청

| 칸 | 내용 |
|---|---|
| 요청하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo be41b33c) → ARCH (Paseo 7621f3de) |
| 쓴 때 | 2026-11-21 19:06 KST |
| 근거 | 한알 18:55:45 「실행자 세션명은 코덱스 excutor입니다. 반영해주세요.」(결정 47) · RSCH 요청서 003 44번(에이전트 저장소 main `7fe9591`) |
| 급함 | 급하지 않음 — 글뿐 · 작은 커밋 하나 |

## 1. 고칠 것 (제품 `app/webapp/MAC_RUN_PHASE1.md` 한 파일만)

1. **세션 이름:** '한알이 넣으실 한 줄' 표와 공통 첫 줄에 '이끄는 ChatGPT = 맥의 세션 「코덱스 excutor」'를 한 번(이름 글자는 말씀 그대로). 글 전체의 낱말을 다 바꾸지 않음.
2. **1회차 한 줄:** 맥 사본(`~/mitchell_studio`)의 이 글은 1-3에서 새 판을 받기 전까지 옛 글 → 1회차 한 줄을 「~/mitchell_studio에서 git fetch origin만 하고(pull은 하지 말고), git show origin/main:app/webapp/MAC_RUN_PHASE1.md 로 나온 글의 공통과 1회차대로 해 줘.」로(RSCH가 한알께 드린 줄 그대로). 2 · 3회차 한 줄은 그대로.

## 2. 가지 · 맡길 길 · 합치기

- 바탕 = 제품 main `f457be8`. 새 가지 하나 · 글 한 파일뿐(코드 · 시험 · 템플릿 안 바뀜).
- 맡길 길은 ARCH가 정함(PMO에 요청 또는 다른 길 — 결정 46: 여러 에이전트를 새로 열지 않음).
- 반환: ARCH → PLN(가지 머리 · 바뀐 줄). PLN이 조건(main `f457be8` · 머리 · 앞으로 감기)을 적어 RSCH에 → RSCH가 차이가 그 한 파일뿐인지 보고 앞으로 감기.

## 3. 참고 (고칠 것 아님)

- RSCH 44번: 합치기 전 시험 맨 처음 한 번에 실패 1(출력 없음 · 뒤 다섯 번은 OK). 맥 테스트에서 이상이 보이면 떠올릴 것 — 맥 테스트 글에 줄을 더하지는 않음(결정 45).

## 반환 — PLN 대조 (2026-11-21 19:14 KST)

- ARCH 반환 `btsr/arch` `abf7c76` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_MACTEST_DOC_ADD1_BTSR-PLN-002_RETURN_CLAUDE.md` (BTSR-ARCH-016) — **받음.**
- 결과: 제품 가지 `feat/webapp-mac-test-doc-add1-20261121` **`07cd3fc`** — main `f457be8` 위 커밋 하나 · `app/webapp/MAC_RUN_PHASE1.md` 한 파일 +5 −1. ARCH 137 OK(skip 2).
- PLN이 직접 본 것(19:13 KST, 제품 저장소 fetch · ls-remote · merge-base · diff만): 원격 main `f457be8` · 가지 머리 `07cd3fc` · main이 그 조상(앞으로 감기) · 더한 줄 '이끄는 ChatGPT = 맥의 세션 「코덱스 excutor」' 두 자리 · 1회차 한 줄이 1번 그대로(「~/mitchell_studio에서 git fetch origin만 하고(pull은 하지 말고), git show origin/main:app/webapp/MAC_RUN_PHASE1.md 로 나온 글의 공통과 1회차대로 해 줘.」) · 2 · 3회차 줄 그대로.
- **합치기 — PLN이 정함: RSCH가 차이가 그 한 파일뿐인지 보면 합침.** 조건: 제품 main `f457be8` 그대로 · 가지 머리 `07cd3fc`(앞으로 감기). 다르면 합치지 말고 알려 주세요. push는 RSCH(결정 13).
- 다음: 합치면 한알 1회차 한 줄이 위 줄로 됨. ARCH 차례 끝 — 맥 테스트 결과가 오면 이어 감.

## 덧붙임 — 합쳐짐 (2026-11-21 19:16 KST)

- RSCH 확인 · 합침: 에이전트 저장소 main `44d9804` RSCH 요청서 003 45번 — 제품 main 앞으로 감기 `f457be8..07cd3fc`(19:14 KST · 한 파일 +5 −1을 다 읽음). PLN이 19:16에 제품 원격 main 머리 = `07cd3fc`를 ls-remote로 봄.
