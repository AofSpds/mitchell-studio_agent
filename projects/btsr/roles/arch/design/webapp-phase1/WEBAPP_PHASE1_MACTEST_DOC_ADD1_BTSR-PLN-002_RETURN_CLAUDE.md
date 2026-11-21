# webapp-phase1 맥 테스트 글 덧붙임 둘 — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN 요청 `btsr/pln` 514a77c `WEBAPP_PHASE1_MACTEST_DOC_ADD1_REQUEST_CLAUDE.md` (결정 47) — PMO 건 [BTSR-ARCH-016](WEBAPP_PHASE1_BTSR-ARCH-016_REQUEST_CLAUDE.md) |
| 반환 시각 | 2026-11-21 19:13 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | `btsr/pmo` bebc290 `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_MAC_TEST_DOC_ADD1_RETURN_CODEX.md` (PMO 7837ebd8 · 보조 0) |
| **합칠 머리** | 제품 `feat/webapp-mac-test-doc-add1-20261121` **07cd3fc**(ls-remote로 봄) — 바탕 = 지금 main **f457be8**, 커밋 하나 → 앞으로 감기 됨 |

## 1. 결과

**받음.** 고칠 것 둘 맞음. 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- `git diff --stat f457be8 07cd3fc` = `app/webapp/MAC_RUN_PHASE1.md` 하나(+5 −1, 빈 줄 둘 포함). 바뀐 줄 그대로:
  - `+이끄는 ChatGPT = 맥의 세션 「코덱스 excutor」` (한 줄 표 위) · 같은 줄 하나 더(공통 첫 줄)
  - 1회차 한 줄 `- … 이 파일(app/webapp/MAC_RUN_PHASE1.md)의 공통과 1회차대로 해 줘.` → `+ … ~/mitchell_studio에서 git fetch origin만 하고(pull은 하지 말고), git show origin/main:app/webapp/MAC_RUN_PHASE1.md 로 나온 글의 공통과 1회차대로 해 줘.`
- 시험: `git archive 07cd3fc | tar -x` 새 임시 폴더 · 환경 값 없이 → **Ran 137 · OK (skipped=2)**(`cryptography` 없음 — 코드는 f457be8과 같음). 임시 폴더 지움.

## 3. 남은 것

- 제품 main 합치기: RSCH가 차이가 그 한 파일뿐인지 보고 앞으로 감기(PLN 조건 — main f457be8 · 머리 07cd3fc).

## 4. 한알 한 줄 (합친 뒤)

| 회차 | 그대로 넣으실 말 |
|---|---|
| 1 | ~/mitchell_studio에서 git fetch origin만 하고(pull은 하지 말고), git show origin/main:app/webapp/MAC_RUN_PHASE1.md 로 나온 글의 공통과 1회차대로 해 줘. |
| 2 | 이 파일(app/webapp/MAC_RUN_PHASE1.md)의 공통과 2회차대로 해 줘. |
| 3 | 이 파일(app/webapp/MAC_RUN_PHASE1.md)의 공통과 3회차대로 해 줘. |
