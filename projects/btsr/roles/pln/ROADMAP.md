# ROADMAP — MITCHELL_STUDIO BTSR 기획(PLN)

```text
무엇   = 프로젝트 단계(BTSR-P1 …)와 기획(PLN)이 받은 실행 지시. "다음" 줄은 실행 지시가 아님
이름   = 프로젝트 단계 BTSR-P1 … (규칙 11). 단계마다 어느 도메인 마일스톤을 위한 것인지 적음
연결   = 단계마다 적용 요구(논리 조항 ID + 판), 출구조건, 맡긴 일. 요청 상태는 게시판이 정본
```

## 프로젝트 단계

등록된 단계 없음 — PLN이 할 일은 한알 말씀 대기.

## 실행 지시

| 번호 | 무엇 | 근거 | 맡긴 일 | 지금 |
|---|---|---|---|---|
| 1 | 작업자 모델을 GPT-6.2 Sol High로, 설정 한 곳에서 (요구 worker-model 1판 R01–R07) | 한알 결정 worker-model 04 (11-21 03:23:56) | ARCH ← [BTSR-PLN-001](requirements/worker-model/WORKER_MODEL_BTSR-PLN-001_REQUEST_CLAUDE.md) | 됨 — ARCH 반환 6cf028a 받음, RSCH에 반환. 제품 main `e5785b3`에 합침([BTSR-PLN-003](requirements/worker-model/WORKER_MODEL_BTSR-PLN-003_MERGE_REQUEST_CLAUDE.md), 결정 05). 남음: 맥 확인 |
| 2 | 웹앱 1차 캡컷 길 — 묶음 1 → 2 + 8 → 3 → 5 + 3-2 → 4-a → 4-b → 6 (요구 webapp-phase1 1.4판), 7 뒤로 | 한알 결정 webapp-phase1 01–14 | ARCH ← [BTSR-PLN-002](requirements/webapp-phase1/WEBAPP_PHASE1_BTSR-PLN-002_REQUEST_CLAUDE.md) | 묶음 1 됨 → 합치기 [BTSR-PLN-004](requirements/webapp-phase1/WEBAPP_PHASE1_BTSR-PLN-004_MERGE_REQUEST_CLAUDE.md) — 제품 main `6cfbc5f`에 합침(RSCH가 push, 결정 09) · 묶음 1-1(R1.4 · R1.5) 됨(가지 `100ffa5`, RSCH 확인 뒤 합침) · 묶음 3 → PMO BTSR-ARCH-007 · 묶음 2 + 8 제품 main `658ec1d`에 합침 · 한알 물음 1–7 모두 답 · 합치기 push는 RSCH(결정 13) · 맥 시험은 1차 끝에 한 번(결정 08) |
