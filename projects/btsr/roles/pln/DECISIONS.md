# DECISIONS — 한알 결정 모아보기 (MITCHELL_STUDIO BTSR PLN)

```text
무엇   = 결정 파일 경로 목록. 결정 원문은 항목 폴더의 <주제>_DECISIONS_<출처>.md에만 적는다 (규칙 31)
더하기 = 항목에 결정이 생기면 그 항목 폴더에 결정 파일을 만들고 아래 표에 한 줄
```

## 결정 파일

| 묶음 | 결정 파일 |
|---|---|
| worker-model | [requirements/worker-model/WORKER_MODEL_DECISIONS_CLAUDE.md](requirements/worker-model/WORKER_MODEL_DECISIONS_CLAUDE.md) — 01 작업자 모델 6.2 Sol High, 02 변수 + enum, 03 Terra 자리만·운영 전 그냥 고침, 04 PLN → ARCH → PMO, 05 제품 main 합치기 = RSCH 확인 → PLN 정함 |
| webapp-phase1 | [requirements/webapp-phase1/WEBAPP_PHASE1_DECISIONS_CLAUDE.md](requirements/webapp-phase1/WEBAPP_PHASE1_DECISIONS_CLAUDE.md) — 01 캡컷 길, 02 테스트하며 구현 안 된 기능 모두, 03 PLN 기획 · ARCH 설계 · PMO 구현, 04 묶음 7 뒤로, 05 https 켬, 06 AI 얼굴 확인 받음 · 단추 「이 사진으로 갈게요 →」, 07 막히면 운영자 먼저 → 개발자, 08 맥 시험 뒤로, 09 묶음 1 합치기는 RSCH가 직접, 10 건의의 손님 정보는 걸러 내기 · 맥에만 · 별명, 11 AI 얼굴 사진이 없으면 웹앱이 만든 뒤 확인, 12 단추 「건의하기」, 13 앞으로 합치기 push는 RSCH |

## 기획(PLN)이 따르는 다른 곳의 결정 (경로만)

원문은 main의 [owner/utterances/2026-11-19.md](../../../../owner/utterances/2026-11-19.md)에 있다. 모두 RSCH 창에서 하신 말씀이다. 넓이(이 역할만 / 모든 역할)는 정해 주신 말씀이 없어 미정 — 이 도메인에 게시판·DPM이 아직 없어 카드 요청 길도 없음.

| 시각 (KST) · uuid | 무엇 | 가리키는 곳 | 넓이 |
|---|---|---|---|
| 21:49:43 · 40bb41cb | PLN·ARCH·PMO를 Opus로 엶 | owner/utterances/2026-11-19.md 262줄 · 옛 지침 [archive/PLN_DIRECTIVES_CLAUDE.md](archive/PLN_DIRECTIVES_CLAUDE.md) | 미정 |
| 21:52:02 · 099449aa | AAA 규칙(v0.14)을 따름 | 같은 파일 269줄 · 옛 지침 [archive/PLN_DIRECTIVES_CLAUDE.md](archive/PLN_DIRECTIVES_CLAUDE.md) | 미정 |
| 22:02:43 · c4dfdcfa | AAA를 보고 다시 만듦 | 같은 파일 290줄 | 미정 |
| 22:18:23 · 3a1d2dc6 | AAA와 똑같이 (작업 공간 worktree, 역할 폴더 AAA 꼴) | 같은 파일 297줄 | 미정 |
