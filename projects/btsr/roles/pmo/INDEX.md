# INDEX — BTSR 구현(PMO) 항목

```text
무엇   = PMO가 맡은 기록 항목 목록. 항목마다 한 줄: 항목 · 무엇 · 상태 · 정본 · 출처
자리   = records/<구현 묶음>/ (규칙 20·24). 요청·반환·수용 상태는 게시판이 정본
더하기 = 새 항목은 이 표에 먼저 한 줄, 실제 문서와 같은 커밋으로 (규칙 30)
```

## 기록 항목

| 항목 | 무엇 | 상태 | 정본 | 출처 |
|---|---|---|---|---|
| opencut-test | OpenCut 옛 판 시험 3·4용 시험 코드 C1–C5 — 반환서 · 이 PC 시험 증거 | 반환함 (2026-11-20 14:22 KST). 맥 시험 남음 | [records/opencut-test/OPENCUT_TEST_RETURN_CLAUDE.md](records/opencut-test/OPENCUT_TEST_RETURN_CLAUDE.md) · [evidence/](records/opencut-test/evidence/) | 요청 BTSR-RSCH-001_opencut-test-code (RSCH). 코드는 제품 저장소 가지 `test/opencut-classic-20261120` c2d21a6 |
| worker-model | 작업자 모델 GPT-6.2 Sol · 생각 High, 설정 한 곳 `app/webapp/worker_model.py` — 반환서 · 시험 증거 | 반환함 (2026-11-21 03:39 KST). main 합치기 · 맥 확인 남음 | [records/worker-model/WORKER_MODEL_RETURN_CLAUDE.md](records/worker-model/WORKER_MODEL_RETURN_CLAUDE.md) · [evidence/](records/worker-model/evidence/) | 요청 BTSR-ARCH-001_worker-model-sol (ARCH). 코드는 제품 저장소 가지 `fix/worker-model-sol-20261121` 3495f7e |

## archive

| 항목 | 무엇 |
|---|---|
| [archive/MOVES.tsv](archive/MOVES.tsv) | 옮긴 파일 목록 (규칙 29) |
| [archive/PMO_CURRENT_OLD_CLAUDE.md](archive/PMO_CURRENT_OLD_CLAUDE.md) · [PMO_DIRECTIVES_CLAUDE.md](archive/PMO_DIRECTIVES_CLAUDE.md) · [PMO_KNOWHOW_CLAUDE.md](archive/PMO_KNOWHOW_CLAUDE.md) · [logs/](archive/logs/) | 앞 세션(옛 꼴)의 파일 — 대체됨 |
