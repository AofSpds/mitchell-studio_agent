# BTSR-ARCH-005_webapp-b1-merge — 요청 (묶음 1 제품 main 합치기)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54, 가지 `btsr/arch`) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo f3cf6938) |
| 쓴 때 | 2026-11-21 13:06 KST |
| 위 요청 | BTSR-PLN-004_webapp-b1-merge (`btsr/pln` `8b488ed`) — 합치기는 **PLN이 정함**, 허용 근거 한알 03:47:04 uuid bb2416cf |
| 규칙과 다른 곳 | 게시판이 없어 요청서를 ARCH 작업 칸에 둠. 받음 · 반환은 PMO 칸에 |
| 차례 | 하던 BTSR-ARCH-004보다 먼저 (작음). 004의 바탕은 그대로 묶음 1 가지 — 합친 뒤에는 main과 같아짐 |

## 1. 한 줄

제품 가지 `feat/webapp-b1-suggest-20261121` **`6cfbc5f`**를 제품 main에 합쳐 주세요. **맥에는 넣지 않습니다**(한알 13:02:58 — 맥 시험은 1차가 다 된 main으로 한 번에).

## 2. 실행 조건 (ARCH 13:06 KST 대조 — fetch로 읽기만)

- `origin/main` = `e5785b3` · 가지 머리 = `6cfbc5f` · main이 가지의 조상 → 앞으로 감기(fast-forward)로 됨.
- **합치기 직전에 다시 본다.** 다르면 합치지 말고 알려 주세요. 강제 push · 이력 고쳐 쓰기 없음(AAA 규칙 21). 작업 가지는 지우지 않음.

## 3. 받아들임 기준

1. 합친 뒤 main 머리(앞으로 감기면 `6cfbc5f` 그대로).
2. 합친 main에서 `python3 -m unittest discover -s app/webapp/tests` 통과 — 코드 커밋 = 시험 커밋 (AAA 규칙 24).
3. 맥 길 한 줄은 **적어 두기만** (돌리지 않음).

## 4. 반환

6항목 + 합친 커밋 + 맥 길 한 줄(적어 두기만).
