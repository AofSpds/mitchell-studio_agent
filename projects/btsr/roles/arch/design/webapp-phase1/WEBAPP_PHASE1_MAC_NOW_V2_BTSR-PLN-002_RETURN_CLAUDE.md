# webapp-phase1 맥 할 일 한 장 판 2 (MAC_NOW) — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN MAC_NOW 요청서 '반환 — PLN 대조' 끝 줄(판 2) + '판 1 합쳐짐 · 판 2에 셋 더함' — PMO 건 [BTSR-ARCH-025](WEBAPP_PHASE1_BTSR-ARCH-025_REQUEST_CLAUDE.md) + 덧붙임 1 |
| 반환 시각 | 2026-11-22 15:09 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` 7b39d58 `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_MAC_NOW_V2_RETURN_CODEX.md` (PMO 512aef6d — 본문 시점 9b8b9f3 · 5e993c3은 덧붙임 1과 엇갈려 같은 가지 · 같은 반환서로 갱신) |
| **합칠 머리** | 제품 `feat/webapp-mac-now-v2-20261122` **9c3b1c1**(원격 ls-remote로 봄) — 바탕 = 지금 제품 main **0cb507a**(024 합쳐짐 · 조상 → 앞으로 감기 됨) |

## 1. 결과

**받음.** `app/webapp/MAC_NOW.md` 한 파일 · 글뿐 · 본문 셋 + 덧붙임 1 셋. 코드 · 시험 0. 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- `git diff --stat 0cb507a 9c3b1c1` = `app/webapp/MAC_NOW.md` 하나(+6 −5).
- 바뀐 곳(diff로 하나씩): 판 `2026-11-22 · 2` · 0번 첫 줄 `git branch --show-current` — main 아니면 가지 이름만 · 1의 목소리 이름 — 지금 편 없으면 최근 편(`J.list_jobs()` 맨 앞) · 못 읽으면 '없음'(명령 끝 `2>/dev/null || printf '%s\n' '없음'`) · '끝난 옛 편은 읽지 않음' 걷음 · 2의 첫 줄 — 현황은 `J.now_line(J.busy())`의 글을 명령으로 · 브라우저 · 웹앱 화면을 앞으로 꺼내지 않음 · 3으로 · 3에 '결과 가지에만 쓴다 — 웹앱 · 맥 사본 · 지금 편은 건드리지 않음'.
- 두 명령: ARCH가 글로 읽음(조건식 꼴 `(… +' '+v) if v else '없음'` 맞음). PMO가 Git Bash와 실제 `jobs.py`에 가짜 자료로 문서에서 뽑은 두 줄을 돌림 — 지금 편 · 최근 편 · 편 없음 · 프로젝트 없음 · 상태 예외(→ '없음') · 자료 파일 그대로(PMO 반환서 2항).
- 시험: 글뿐이라 안 돌림 — 코드는 0cb507a(= c364bf0 코드)와 같음.

## 3. PMO가 정한 것 — ARCH 판단

| 정한 것 | 판단 |
|---|---|
| 목소리 이름 명령이 실패하면 셸에서 '없음'을 찍음(`|| printf`) | 받음 — 맥 세션이 오류 글을 옮겨 적지 않게 |

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 025 요청서 + 덧붙임 1 · 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. **제품 main 합치기**: RSCH가 한 파일 · 글뿐인지 보고 앞으로 감기 — 합칠 머리 **9c3b1c1**, 지금 main 0cb507a.
2. 현황 명령(`now_line`)은 실패 때 '없음' 받침이 없음 — 읽기만이라 막지 않음, 맥에서 오류가 나면 다음 판에.

## 6. 배운 것

- 덧붙임이 반환과 엇갈리면 '같은 가지 · 같은 반환서 갱신'으로 받으면 머리가 하나로 남음.

## 7. 다음

- PLN: 이 반환 받음 · 합침 조건(main 0cb507a · 머리 9c3b1c1 · 한 파일 · 글뿐)을 RSCH에.
