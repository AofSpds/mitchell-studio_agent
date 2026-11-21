# BTSR-ARCH-006_webapp-b1-1-anon-button — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 13:22 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo f3cf6938) |
| 위 요청 | BTSR-PLN-002 — 요구 webapp-phase1 1.6판 R1.4 · R1.5 (`btsr/pln` `c735395`) |
| 설계 | [WEBAPP_PHASE1_B1-1_ANON_DESIGN_CLAUDE.md](WEBAPP_PHASE1_B1-1_ANON_DESIGN_CLAUDE.md) 1.1판 |
| 바탕 | 제품 가지 `feat/webapp-b2-b8-runner-20261121` `658ec1d` 위에 새 가지(같은 `app.html`을 고치므로 차례로 쌓음) |
| ARCH-004 받음 | 기준 1–9 · 11 대조해 받음. 기준 10(맥에서 진짜 `claude`)은 한알 13:02:58(맥 시험은 1차 끝에 한 번)에 따라 ARCH가 PLN에 '끝으로 미룸'을 권고함 — 답 전까지 맥 일은 하지 않음 |
| 규칙과 다른 곳 | 게시판이 없어 요청서를 ARCH 작업 칸에 둠. 받음 · 반환은 PMO 칸에 · **제품 main push는 하지 않음**(1.6판 — 합치기 push는 RSCH) |

## 1. 한 줄

`suggest.py publish`가 깃헙 사본에서 손님 이름 · 연락처를 별명 · 지움 표시로 바꾸게(R1.4), 건의 단추 글을 「건의하기」만으로(R1.5) — 설계 2 · 2-1 · 3번대로. 그리고 가짜 `claude`가 출력을 UTF-8로 쓰게 고쳐 윈도에서 `PYTHONUTF8` 없이도 시험이 돌게.

## 2. 받아들임 기준 (ARCH가 대조함)

1. 설계 2번 표대로 바꿈 · 같은 이름 = 같은 별명 · 바꾼 뒤 다시 검사 · 별명 짝을 어디에도 저장하지 않음 · 원본은 맥 `published/`에 그대로 · `anonymized` · `replaced` (R1.4) — 시험 1–3
2. 머리 단추 · 시트 제목 「건의하기」, 「Feedback」 글자 없음 · 매뉴얼 같은 말 (R1.5) — 시험 4
3. `tests/fake_claude.py`(와 그것을 부르는 쪽)가 윈도에서도 UTF-8로 — **`PYTHONUTF8` 없이** 저장소 전부로 시험이 통과
4. 회귀 38개 + 새 시험 · 코드 커밋 + 시험 커밋 · 반환서에 시험 명령과 환경 값을 그대로
5. 맥 길 한 줄(적어 두기만)

## 3. 범위 밖

맥 일(맥 시험 9 포함) · 제품 main push · 다른 묶음.

## 4. 반환

6항목 + 맥 길 한 줄.
