# BTSR-RSCH-003 맥 테스트 글(맥의 ChatGPT가 따라 하는 세 회차) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo be41b33c) → RSCH (Paseo ed5ef600) |
| 쓴 때 | 2026-11-21 18:17 KST |
| 아래 건 | PLN 요청 [WEBAPP_PHASE1_MACTEST_DOC_REQUEST_CLAUDE.md](WEBAPP_PHASE1_MACTEST_DOC_REQUEST_CLAUDE.md) → ARCH 반환 `btsr/arch` `2fc10f5` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_MACTEST_DOC_BTSR-PLN-002_RETURN_CLAUDE.md` (PMO BTSR-ARCH-014 + 덧붙임 1 · 2) — **PLN이 요구 2.17판 2번 · 결정 39 · 40 · 41 · 42 · RSCH 38번 넷 · 39번과 대조해 받음. 여쭐 것 하나 남음(4번 1).** |

## 1. 결과

맥 테스트 글 됨 — 제품 가지 **`feat/webapp-mac-test-doc-20261121` `28e779e`** (8-2 머리 `94d4522` 위 커밋 둘 · `app/webapp/MAC_RUN_PHASE1.md` 한 파일만 · 글뿐). 제품 main에는 아직 합치지 않음 — 결정 41대로 IVA 판정 뒤 8-2와 함께.

- 한알이 맥의 ChatGPT에 넣으실 한 줄 셋: 「이 파일(app/webapp/MAC_RUN_PHASE1.md)의 공통과 N회차대로 해 줘.」(N = 1 · 2 · 3) — 회차마다 하나. 맥에서 넣으실 것은 모두 10번(휴대폰 결과를 번호로 알리는 것 포함).
- 결정 42 표를 글 맨 위에 그대로(이끄는 ChatGPT — 웹앱 탭 · 파일 고르기 창). 작업자 범위는 결정 15(CU_ASK) 원본을 가리킴.
- 38번 넷: 2-11 차례는 코드대로(화면 17 → 4) · 작업자 명령줄 값은 저장소 밖 `~/oc-test/worker_model.local.py`가 원본(받기 전 사본 · 받은 뒤 되씌움 · 바뀌었으면 멈춤) · 명령 줄 실제 대조 · 확인 못 한 것 둘은 1회차 첫 걸음에서.
- 결과는 맥 웹앱 사본을 건드리지 않고 따로 둔 자리에서 제품 가지 `mactest/webapp-phase1-results`에 결과 글 하나(커밋 이름 일반 값) — 결과에는 대화 번호 · 시술 종류만.

## 2. 증거

- ARCH: 반환서 대조 · 시험 OK(skip 2 — 글만 바뀌어 코드 시험은 8-2와 같음).
- PLN이 직접 본 것(18:15 KST, 제품 저장소 fetch · ls-remote · merge-base · grep만): 가지 머리 `28e779e` · 8-2 머리 `94d4522`가 그 조상 · 커밋 둘(73b09f9 · 28e779e) · 바뀐 것 `app/webapp/MAC_RUN_PHASE1.md` 한 파일 +387 −66 · 한 줄 셋(9–11줄) · 결정 42 표(44–45줄) · 작업자 승인 원본 줄(19줄). 32줄 '맥 밖에 보일 수 있는 범위는 두 곳'이 4번 1의 물음 자리.

## 3. 바뀐 것

제품 가지 하나 — 글 한 파일. 코드 · 시험 · 템플릿 안 바뀜.

## 4. 남은 것 · PLN이 정한 것

1. **한알께 여쭐 것 하나(막는 일: 1회차 1-8부터)** — [WEBAPP_PHASE1_CLAUDE_MATERIAL_ASK_CLAUDE.md](WEBAPP_PHASE1_CLAUDE_MATERIAL_ASK_CLAUDE.md): 웹앱의 Claude가 받은 소재(사진)를 읽어 가르는 길(사진이 Claude 서버로 감)이 '맥 밖으로 가는 길'에서 빠져 있었음 — 1 허락(권고) · 2 허락 안 함. 답 전까지 1회차는 1-7(맥 준비)까지. 답이 오면 결정 44 → ARCH가 '공통' 두 줄 덧붙임.
2. **합치기 — PLN이 정함: IVA 판정 뒤, 8-2와 함께(결정 41).** 다만 8-2는 IVA '꼭 고칠 것' + 화면 5 「N번 남음」 고침으로 코드 머리가 `94d4522`에서 한 번 움직일 예정(ARCH가 한 요청으로 묶음) → **이 글 가지도 그 새 머리 위로 다시 얹은 뒤, PLN이 두 머리로 합침 조건을 다시 적음.** 지금 조건으로는 합치지 않음. (18:22 덧) IVA 판정 부적합(RSCH 40번) → 고침 묶음 요청 [WEBAPP_PHASE1_IVA_FIX_REQUEST_CLAUDE.md](WEBAPP_PHASE1_IVA_FIX_REQUEST_CLAUDE.md) — 이 글도 고친 머리 위로 · IVA 회차별 성공 기준 · 다 11 · 12를 더함.
3. 맥 일 · 제품 main push 없음.

## 5. 배운 것

'소재가 맥 밖으로 안 나감'을 정할 때는 소재를 읽는 모든 프로그램(작업자 · 이끄는 쪽 · 웹앱 안의 Claude)을 하나씩 세어야 함 — 결정 39를 적을 때 PLN이 세지 않았음(PMO가 짚음).

## 6. 다음

반환함 + 여쭐 것 하나(RSCH가 한알께). IVA 판정 → ARCH가 꼭 고칠 것 + 「N번 남음」을 PMO에 한 요청 → 고친 반환 → PLN이 두 가지의 합침 조건을 다시 적음 → RSCH가 합침 → 한알께 맥에서 하실 일.
