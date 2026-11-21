# INDEX — MITCHELL_STUDIO / BTSR 설계(ARCH) 항목

```text
무엇   = 설계(ARCH)가 맡은 설계 주제 목록. 항목마다 한 줄: 항목 · 무엇 · 상태 · 정본 · 출처
자리   = design/<설계 주제>/ (AAA 규칙 20). 첫 정본을 쓸 때 만들고 미리 만들지 않음
더하기 = 새 주제는 이 표에 먼저 한 줄, 실제 문서와 같은 커밋으로 (규칙 30)
```

## 설계 주제

| 항목 | 무엇 | 상태 | 정본 | 출처 |
|---|---|---|---|---|
| worker-model | 작업자 모델(⑥ 맥 ChatGPT/Codex)을 설정 한 곳(enum + 지금 값 GPT-6.2 Sol · 생각 High)으로 | 설계 1판 · PMO 반환 받음 · PLN에 반환함 ([반환](design/worker-model/WORKER_MODEL_BTSR-PLN-001_RETURN_CLAUDE.md)) · 제품 main에 합쳐짐 `e5785b3` ([반환](design/worker-model/WORKER_MODEL_BTSR-PLN-003_RETURN_CLAUDE.md)) | [design/worker-model/WORKER_MODEL_DESIGN_CLAUDE.md](design/worker-model/WORKER_MODEL_DESIGN_CLAUDE.md) | PLN 요청 BTSR-PLN-001 (`btsr/pln` 48967ee) |
| webapp-phase1 | 웹앱 1차 — 캡컷 길로 남은 기능(묶음 1 · 2 · 8 · 3 · 5 · 3-2 · 4 · 6). 묶음마다 설계 · PMO 요청 | 묶음 1 반환함 · 제품 main `6cfbc5f`에 들어감(PLN-004) (가지 `feat/webapp-b1-suggest-20261121` — [반환](design/webapp-phase1/WEBAPP_PHASE1_B1_BTSR-PLN-002_RETURN_CLAUDE.md)). 묶음 2 + 8 반환함(가지 `feat/webapp-b2-b8-runner-20261121` 658ec1d — [반환](design/webapp-phase1/WEBAPP_PHASE1_B2_B8_BTSR-PLN-002_RETURN_CLAUDE.md), 맥 시험 9 아직). 묶음 1-1 반환함(가지 `feat/webapp-b1-1-anon-20261121` 100ffa5 — [반환](design/webapp-phase1/WEBAPP_PHASE1_B1-1_BTSR-PLN-002_RETURN_CLAUDE.md)). 묶음 3 반환함(가지 `feat/webapp-b3-intake-20261121` 32b55dc — [반환](design/webapp-phase1/WEBAPP_PHASE1_B3_BTSR-PLN-002_RETURN_CLAUDE.md)) · main `32b55dc`. 묶음 5 + 3-2 반환함(가지 `feat/webapp-b5-b32-worker-face-20261121` 3072e7e — [반환](design/webapp-phase1/WEBAPP_PHASE1_B5_B32_BTSR-PLN-002_RETURN_CLAUDE.md), 컴퓨터 유즈 승인 결정 15). 요구 1.8판 받음. 묶음 4-a 설계 1판(낱말 [안] 한알께 — PLN → RSCH). 묶음 4-b 설계 1판 + 한알께 드릴 https 한 장. 묶음 6 설계 1판 | [묶음 6 설계](design/webapp-phase1/WEBAPP_PHASE1_B6_DESIGN_CLAUDE.md) · [묶음 4-b 설계](design/webapp-phase1/WEBAPP_PHASE1_B4B_DESIGN_CLAUDE.md) · [https 한 장](design/webapp-phase1/WEBAPP_PHASE1_B4B_HTTPS_SHEET_CLAUDE.md) · [묶음 4-a 설계](design/webapp-phase1/WEBAPP_PHASE1_B4A_DESIGN_CLAUDE.md) · [묶음 5 + 3-2 설계](design/webapp-phase1/WEBAPP_PHASE1_B5_B32_DESIGN_CLAUDE.md) · [묶음 3 설계](design/webapp-phase1/WEBAPP_PHASE1_B3_DESIGN_CLAUDE.md) · [묶음 1 설계](design/webapp-phase1/WEBAPP_PHASE1_B1_DESIGN_CLAUDE.md) · [묶음 2 + 8 설계](design/webapp-phase1/WEBAPP_PHASE1_B2_B8_DESIGN_CLAUDE.md) · [받음](design/webapp-phase1/WEBAPP_PHASE1_BTSR-PLN-002_RECEIVED_CLAUDE.md) | PLN 요청 BTSR-PLN-002 (`btsr/pln` ee2df91) |
