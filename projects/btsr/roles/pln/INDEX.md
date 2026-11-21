# INDEX — MITCHELL_STUDIO BTSR 기획(PLN) 항목

```text
무엇   = 기획(PLN)이 맡은 요구 묶음 목록. 항목마다 한 줄: 항목 · 무엇 · 상태 · 정본 · 출처
자리   = requirements/<요구 묶음>/ (규칙 20). 요청·반환·수용 상태는 게시판이 정본
더하기 = 새 묶음은 이 표에 먼저 한 줄, 실제 문서와 같은 커밋으로 (규칙 30)
```

## 요구 묶음

| 항목 | 무엇 | 상태 | 정본 | 출처 |
|---|---|---|---|---|
| worker-model | 웹앱 작업자 모델(⑥ 캡컷 컴퓨터 유즈) `GPT-6.1 Terra` → `GPT-6.2 Sol` · 생각 High, 설정 한 곳(변수 + enum). R01–R07 | 1판. 됨 — 제품 main `e5785b3`에 합침(가지 `3495f7e`). RSCH에 반환함 → [WORKER_MODEL_RETURN_CLAUDE.md](requirements/worker-model/WORKER_MODEL_RETURN_CLAUDE.md) | [requirements/worker-model/WORKER_MODEL_REQUIREMENTS_CLAUDE.md](requirements/worker-model/WORKER_MODEL_REQUIREMENTS_CLAUDE.md) | 요청 BTSR-RSCH-002_worker-model-sol (RSCH, main `7894480`) |
| webapp-phase1 | 웹앱 1차 — 캡컷 길로 구현 안 된 기능 전부. 묶음 차례 · 받아들임 기준 R1.1–R6.4 · 한알께 여쭐 것 1–7 | 1.7판(여쭐 것 1–7 모두 답). ARCH에 넘김(BTSR-PLN-002) — 묶음 1 PMO에(BTSR-ARCH-002). 묶음 7 보류 | [requirements/webapp-phase1/WEBAPP_PHASE1_REQUIREMENTS_CLAUDE.md](requirements/webapp-phase1/WEBAPP_PHASE1_REQUIREMENTS_CLAUDE.md) | 요청 BTSR-RSCH-003_webapp-phase1-capcut (RSCH, main `45f8b7b`) · 바탕 RSCH 기획안 초안 `studies/2026-11-20-plan-draft.md` |
