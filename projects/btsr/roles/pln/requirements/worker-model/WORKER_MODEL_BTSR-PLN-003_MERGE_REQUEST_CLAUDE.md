# BTSR-PLN-003_worker-model-merge — 요청 (제품 main 합치기)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (Paseo 9d298a54) → PMO가 합침 (AAA 규칙 15) |
| 쓴 때 | 2026-11-21 12:50 KST |
| 규칙과 다른 곳 | 게시판이 없어 PLN 작업 칸에 둠. 받음 · 반환은 ARCH 칸에 |

## 1. 한 줄

제품 가지 `fix/worker-model-sol-20261121` `3495f7e`를 **제품 main에 합쳐 주세요**. PLN이 정함.

## 2. 허용 근거 · 확인 · 조건 (PLN이 정한 근거)

| 무엇 | 내용 |
|---|---|
| 허용 원칙 | 한알 03:47:04 uuid bb2416cf 「rsch가 확인하고 pln이 일단 합니다.」 — [결정 05](WORKER_MODEL_DECISIONS_CLAUDE.md) |
| 확인 (RSCH) | 에이전트 저장소 main `3c3708e` `projects/btsr/roles/rsch/requests/BTSR-RSCH-002_worker-model-sol/요청.md` 6번 — RSCH가 PLN 반환(065e0f4)을 R01–R07 · 증거와 대조해 받음 |
| 검증 (ARCH) | `btsr/arch` `6cf028a` 반환 — 같은 커밋을 따로 풀어 시험 6/6 · 검색 다시 봄 |
| 실행 조건 대조 (PLN, 12:49 KST) | 제품 원격 가지 머리 = `3495f7e`(받은 커밋과 같음) · main은 `9e7eb0e` → **`3bd6cdd`로 1커밋 움직임**(「ChatGPT 첨부 분류표(rsch) — 185개 받음, 파일은 data/에만」, 15파일). `9e7eb0e`는 그 조상, 두 쪽이 함께 고친 파일 0, `git merge-tree` 부딪침 없음. PLN은 fetch로 읽기만 함 |

## 3. 바라는 것

1. 제품 저장소 규칙(가지 · 검토 · 합치기)대로 합친다. 합친 뒤의 main에서 `app/webapp/tests/test_worker_model.py`를 다시 돌린다.
2. 합칠 때 main이 `3bd6cdd`에서 또 움직였거나 부딪치면 합치지 말고 알려 준다.
3. 강제 push · 이력 고쳐 쓰기는 하지 않는다(AAA 규칙 21).

## 4. 반환

6항목 + **합친 커밋** + **맥에 들어가는 길 한 줄(main 받기 · 웹앱 다시 띄우기)**. PLN이 받아 RSCH에 반환합니다.
