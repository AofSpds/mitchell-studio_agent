# INDEX — MITCHELL_STUDIO / BTSR 설계(ARCH) 항목

```text
무엇   = 설계(ARCH)가 맡은 설계 주제 목록. 항목마다 한 줄: 항목 · 무엇 · 상태 · 정본 · 출처
자리   = design/<설계 주제>/ (AAA 규칙 20). 첫 정본을 쓸 때 만들고 미리 만들지 않음
더하기 = 새 주제는 이 표에 먼저 한 줄, 실제 문서와 같은 커밋으로 (규칙 30)
```

## 설계 주제

| 항목 | 무엇 | 상태 | 정본 | 출처 |
|---|---|---|---|---|
| worker-model | 작업자 모델(⑥ 맥 ChatGPT/Codex)을 설정 한 곳(enum + 지금 값 GPT-6.2 Sol · 생각 High)으로 | 설계 1판 · PMO 반환 받음 · PLN에 반환함 ([반환](design/worker-model/WORKER_MODEL_BTSR-PLN-001_RETURN_CLAUDE.md)) — 제품 main 합치기 전 | [design/worker-model/WORKER_MODEL_DESIGN_CLAUDE.md](design/worker-model/WORKER_MODEL_DESIGN_CLAUDE.md) | PLN 요청 BTSR-PLN-001 (`btsr/pln` 48967ee) |
| webapp-phase1 | 웹앱 1차 — 캡컷 길로 남은 기능(묶음 1 · 2 · 8 · 3 · 5 · 3-2 · 4 · 6). 묶음마다 설계 · PMO 요청 | 묶음 1 설계 1판 · PMO에 맡김(BTSR-ARCH-002). 묶음 2 + 8 설계 1판 — PMO에는 ARCH-002 반환 뒤 | [묶음 1 설계](design/webapp-phase1/WEBAPP_PHASE1_B1_DESIGN_CLAUDE.md) · [묶음 2 + 8 설계](design/webapp-phase1/WEBAPP_PHASE1_B2_B8_DESIGN_CLAUDE.md) · [받음](design/webapp-phase1/WEBAPP_PHASE1_BTSR-PLN-002_RECEIVED_CLAUDE.md) | PLN 요청 BTSR-PLN-002 (`btsr/pln` ee2df91) |
