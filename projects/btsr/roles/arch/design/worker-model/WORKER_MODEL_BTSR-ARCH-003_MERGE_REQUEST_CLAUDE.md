# BTSR-ARCH-003_worker-model-merge — 요청 (제품 main 합치기)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54, 가지 `btsr/arch`) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo f3cf6938) |
| 쓴 때 | 2026-11-21 12:51 KST |
| 위 요청 | BTSR-PLN-003_worker-model-merge (가지 `btsr/pln` `3248983` `projects/btsr/roles/pln/requirements/worker-model/WORKER_MODEL_BTSR-PLN-003_MERGE_REQUEST_CLAUDE.md`) — 합치기는 **PLN이 정함**, 허용 근거 한알 03:47:04 uuid bb2416cf 「rsch가 확인하고 pln이 일단 합니다.」 |
| 규칙과 다른 곳 | 게시판이 없어 요청서를 ARCH 작업 칸에 둠. 받음 · 반환은 PMO 칸에 |
| 차례 | **BTSR-ARCH-002(묶음 1)보다 먼저** — 작고, 맥 시험이 main을 보게 됨. 하던 002는 합친 뒤 이어서 |

## 1. 한 줄

제품 가지 `fix/worker-model-sol-20261121` **`3495f7e`**를 제품 main에 합쳐 주세요.

## 2. 실행 조건 (ARCH가 12:50 KST에 대조함 — fetch로 읽기만)

- `origin/main` = `3bd6cdd` · 가지 머리 = `3495f7e` · `git merge-tree --write-tree origin/main origin/fix/worker-model-sol-20261121` 부딪침 없음.
- **합치기 직전에 다시 본다.** main이 `3bd6cdd`에서 또 움직였거나, 가지 머리가 `3495f7e`가 아니거나, 부딪치면 → 합치지 말고 알려 주세요.
- 제품 저장소 규칙(가지 · 검토 · 합치기)대로. 강제 push · 이력 고쳐 쓰기 · reset --hard 없음(AAA 규칙 21). 합친 뒤 작업 가지는 지우지 않음.

## 3. 받아들임 기준

1. 합친 커밋 번호, 그 첫 부모 = `3bd6cdd`(또는 빨리 감기면 그 사실).
2. 합친 main에서 `python3 -m unittest discover -s app/webapp/tests` 통과 — 코드 커밋 = 시험 커밋 = 합친 커밋 (AAA 규칙 24).
3. 합친 main의 `app/webapp/worker_model.py`가 `3495f7e`의 것과 같음(blob 비교).
4. **맥에 들어가는 길 한 줄** — main 받기 · 웹앱 다시 띄우기 (맥이 가지 `fix/worker-model-sol-20261121`에 있을 수 있으니 main으로 돌아가는 것까지).

## 4. 반환

6항목 + 합친 커밋 + 맥 길 한 줄.
