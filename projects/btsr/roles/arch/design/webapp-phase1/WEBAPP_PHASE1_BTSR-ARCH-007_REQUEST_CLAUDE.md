# BTSR-ARCH-007_webapp-b3-intake-confirm — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 13:33 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo f3cf6938) |
| 위 요청 | BTSR-PLN-002 — 요구 webapp-phase1 1.7판 R3.1–R3.6 (`btsr/pln` `5b85d56`) |
| 설계 | [WEBAPP_PHASE1_B3_DESIGN_CLAUDE.md](WEBAPP_PHASE1_B3_DESIGN_CLAUDE.md) 1판 (`b9818d0`) |
| 바탕 | 제품 가지 `feat/webapp-b1-1-anon-20261121` `100ffa5` 위에 새 가지 (같은 `app.html` · 시험 도구를 고치므로 차례로 쌓음) |
| ARCH-006 받음 | 기준 1–5 대조해 받음 — ARCH가 `PYTHONUTF8` 없이 41 OK 다시 봄 |
| 맥 일 | **하지 않음** — 맥 시험 9 등 맥 일은 1차 끝 맥 시험에(PLN 답, 결정 08). 맥 길은 적어 두기만 |
| 규칙과 다른 곳 | 게시판이 없어 요청서를 ARCH 작업 칸에 둠. 받음 · 반환은 PMO 칸에 · 제품 main push 안 함(RSCH 몫) |

## 1. 한 줄

접수를 `intake` · `script` 두 일로 나누고, AI가 채운 `intake.json`에서 서버가 확실하지 않은 것만 **하나씩 고르는 답으로** 묻고, 원고는 늘 확인받고 승인한 원고 hash로 자막 · 목소리와 견주게 — 설계 2–8번대로.

## 2. 받아들임 기준 (ARCH가 대조함)

1. `intake` / `script` 일 · 프롬프트 둘(옛 `intake_script.md`는 `prompts/archive/`로) · `verify`가 이번 실행 뒤 쓴 파일인지 봄 — 설계 2, 시험 9
2. `intake.json` 꼴(설계 3) — 요청 글 · 기록에 있는 사실은 묻지 않음 · 모르면 `null` · AI 얼굴 없으면 `plan: "make"`로 묻지 않음 — 시험 2 · 4 (R3.2 · R3.6)
3. 서버가 물을 것을 계산 · 한 번에 하나 · 고르는 답 · 답이 `intake.json`에 그대로 · 「더 보내기」(같은 batch에 더함) / 「이대로 만들기」 · 고르기 전 원고 없음 — 설계 4, 시험 1 · 3 · 5 (R3.1 · R3.3 · R3.5)
4. 원고 늘 확인(`script_check` 없앰 · 옛 값 무시) · 원고 「고칠 점」 → 다시 씀 · 「좋아요」 → `script_approvals` · 편집 뒤 자막 = 승인 원고 · ⑥에서 원고 바뀌면 다시 확인 — 설계 5, 시험 6 · 7 · 8 (R3.4 · 나-4)
5. AI 얼굴 없을 때 편집은 결과 컷으로(3-2 전까지) — 설계 6
6. 남은 말 목록: ③ 「고칠 점」 글은 지움(다른 단계는 묶음 6까지) · 새 글은 4-6 말 · 목록 밖 개발 말 0
7. 회귀 전부 · 시험 명령과 환경 값 그대로 · 코드 커밋 + 시험 커밋 (AAA 규칙 24) · 앞1
8. 맥 길 한 줄(적어 두기만)

## 3. 범위 밖

Face 단계 · AI 얼굴 만들기(3-2) · ⑥(5) · 다른 단계 고치기(6) · 알림(4) · 맥 일 · 제품 main push.

## 4. 반환

6항목 + 맥 길 한 줄.
