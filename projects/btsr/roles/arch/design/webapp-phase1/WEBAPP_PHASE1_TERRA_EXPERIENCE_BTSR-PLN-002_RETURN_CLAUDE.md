# webapp-phase1 고침 3-1 (Terra 요령 두 줄) — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN `btsr/pln` 71caaac 고침 3 요청서 '덧붙임 5' ② — PMO 건 [BTSR-ARCH-023](WEBAPP_PHASE1_BTSR-ARCH-023_REQUEST_CLAUDE.md) |
| 반환 시각 | 2026-11-22 04:31 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` f7c8d8f `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_TERRA_EXPERIENCE_RETURN_CODEX.md` (PMO 512aef6d) |
| **합칠 머리** | 제품 `feat/webapp-terra-experience-20261122` **c364bf0**(원격 ls-remote로 봄) — 부모 = **지금 제품 main 09655cd**(022는 RSCH가 합침 · 앞으로 감기 됨) |

## 1. 결과

**받음.** `agents/_terra/experience.md` '요령' 16 · 20줄이 요청서의 글과 같음 · 그 밖 0. 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- `git diff --stat 09655cd c364bf0` = `agents/_terra/experience.md` 하나 · 2줄 바뀜(+2 −2) — 뺀 두 줄이 옛 `pgrep` 규칙 둘, 더한 두 줄이 요청서 글 그대로.
- `git grep -n pgrep c364bf0 -- agents/_terra/experience.md app/webapp/jobs.py` = experience.md 16줄의 '작업자 안에서 안 됨' 설명 하나뿐 · 카드(`jobs.py`)에 0 → 카드와 요령이 서로 어긋남 0.
- 시험: 코드가 09655cd와 바이트까지 같음(바뀐 것은 글 한 파일) → ARCH의 09655cd 대조(고침 3 반환 — Playwright + `cryptography` 187 OK 건너뜀 0 · 기본 187 OK)가 그대로 닿음 · 다시 돌리지 않음. PMO 기본 한 번: 184 통과 · 오류 1(`test_one_job.Http.test_dev_then_new_send_hides_old` 준비 단계의 `status.json` 바꾸기 WinError 5 — 윈도 파일 잠금, 단독 다시 돌리면 통과) · 건너뜀 2 — 글만 바뀐 머리라 이 오류는 이 고침과 상관없음.

## 3. PMO가 정한 것 — ARCH 판단

없음(글 그대로).

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 023 요청서 · 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. **제품 main 합치기**: RSCH가 차이만 보고 앞으로 감기 — 합칠 머리 **c364bf0**, 지금 main 09655cd.
2. 그 뒤 **맥 한 줄** — [고침 3 반환서](WEBAPP_PHASE1_WORKER_LIMIT_FIX3_BTSR-PLN-002_RETURN_CLAUDE.md) 4번 그대로(새 판 받기가 고침 3 · 3-1을 함께 받음).

## 6. 배운 것

- 카드 규칙을 바꿀 때 작업자가 함께 읽는 글(경험 기록의 '요령')도 같이 찾아봄 — 카드만 고치면 요령이 옛 걸음을 다시 시킴.

## 7. 다음

- PLN: 이 반환 받음 · 합침 조건(main 09655cd · 머리 c364bf0)을 RSCH에 → 한알 맥 한 줄.
