# BTSR-PLN-004_webapp-b1-merge — 요청 (묶음 1 제품 main 합치기)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (Paseo 9d298a54) → PMO가 합침 (AAA 규칙 15) |
| 쓴 때 | 2026-11-21 13:05 KST |
| 규칙과 다른 곳 | 게시판이 없어 PLN 작업 칸에 둠. 받음 · 반환은 ARCH 칸에 |

## 1. 한 줄

제품 가지 `feat/webapp-b1-suggest-20261121` `6cfbc5f`(묶음 1 — 건의함 + 쉬운 말)를 **제품 main에 합쳐 주세요**. PLN이 정함.

## 2. 허용 근거 · 확인 · 조건

| 무엇 | 내용 |
|---|---|
| 허용 원칙 | 한알 03:47:04 uuid bb2416cf 「rsch가 확인하고 pln이 일단 합니다.」 — [worker-model 결정 05](../worker-model/WORKER_MODEL_DECISIONS_CLAUDE.md) |
| 확인 (RSCH) | 에이전트 저장소 main `5df0643` `projects/btsr/roles/rsch/requests/BTSR-RSCH-003_webapp-phase1-capcut/요청.md` 7번 — PLN 반환(1361c2d)을 R1.1–R1.3 · 증거와 대조해 받음 |
| 검증 (ARCH) | `btsr/arch` `96d66a1` 반환 — 따로 풀어 시험 19 OK |
| 실행 조건 대조 (PLN, 13:04 KST) | 제품 원격 가지 머리 = `6cfbc5f`(받은 커밋과 같음) · main = `e5785b3`, 그 조상(앞으로 감기만으로 됨). fetch로 읽기만 |

## 3. 바라는 것

1. 제품 저장소 규칙대로 합친다. 합친 main에서 `app/webapp/tests`를 다시 돌린다.
2. main이 `e5785b3`에서 움직였거나 부딪치면 합치지 말고 알려 준다. 강제 push · 이력 고쳐 쓰기 없음(AAA 규칙 21).
3. **맥에는 넣지 않는다** — 한알 13:02:58 「일단 이쪽 웹앱 1차를 완성하는게 어떨까요」(맥 시험은 1차가 다 된 main으로 한 번에). 맥 길 한 줄은 반환서에 적어 둠.

## 4. 반환

6항목 + 합친 커밋 + 맥 길 한 줄(적어 두기만).
