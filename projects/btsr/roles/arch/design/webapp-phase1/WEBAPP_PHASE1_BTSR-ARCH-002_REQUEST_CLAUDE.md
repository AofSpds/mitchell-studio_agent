# BTSR-ARCH-002_webapp-b1-suggest-words — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 03:43 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo f3cf6938) |
| 위 요청 | BTSR-PLN-002_webapp-phase1-capcut (가지 `btsr/pln` `ee2df91` `projects/btsr/roles/pln/requirements/webapp-phase1/`) — 묶음 1 R1.1–R1.3 |
| 설계 | [WEBAPP_PHASE1_B1_DESIGN_CLAUDE.md](WEBAPP_PHASE1_B1_DESIGN_CLAUDE.md) 1판 (이 요청서와 같은 커밋) |
| 바탕 | 제품 가지 `fix/worker-model-sol-20261121` `3495f7e` 위에 새 가지 (같은 파일을 고침). 가지 이름은 PMO가 정해 반환서에 |
| 규칙과 다른 곳 | 게시판이 없어 요청서를 ARCH 작업 칸에 둠. 받음 · 반환은 PMO 칸에 쓰고 경로만 알려 주세요 |

## 1. 한 줄

웹앱에 어느 화면에서나 여는 「Feedback」 건의함(맥에 쌓임 → 검토 도구 → 저장소 `suggestions/`)을 만들고, 화면 글을 쉬운 말로 바꿔 주세요 — 설계 2–6번대로.

## 2. 받아들임 기준 (ARCH가 대조함)

1. 「Feedback」 시트 · `/api/suggest`(POST · GET) · `data/suggestions/` 저장 — 설계 2-1 · 2-2, 시험 1 · 2 · 5 (R1.1)
2. 검토 도구 `app/webapp/suggest.py`와 `suggestions/README.md` — 설계 2-3, 시험 3 (R1.2)
3. 말 표대로 바꾼 화면 글 + PMO가 더 지은 말의 표 · 손 인계 무리(②③④)는 쉬운 말로만 · 연습 줄과 카드 보기는 Manual 「개발자용」으로 — 설계 3-1 · 3-2 (R1.3 일부)
4. `test_words.py` + `words_allow.json`(남은 말 목록, 줄마다 지울 묶음) — 설계 3-3, 시험 4
5. Manual(`manual-webapp.md` · `manual.md` 웹앱 흐름) — 설계 4
6. 기존 흐름 회귀 시험 6 · 모든 시험 결과에 코드 커밋 + 시험 커밋 (AAA 규칙 24) · 앞1 「오류는 절대 안됩니다」
7. **맥에 들어가는 길 한 줄**

## 3. 범위 밖

- 손 인계 ②③④를 없애는 것(묶음 2 · 5 · 6) · 문제 카드(화7) · 알림 · 「AI에게 고치기」.
- 건의를 서버가 깃헙에 바로 올리는 길(물음 6의 답이 2일 때만 — 지금 만들지 않음).
- 제품 main 합치기 결정.

## 4. 반환

반환서 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음, AAA 규칙 18) + 맥 길 한 줄.
