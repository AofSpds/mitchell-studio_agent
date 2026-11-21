# ARCH 로드맵 — MITCHELL_STUDIO / BTSR 설계

```text
무엇   = 설계 단계(BTSR-A1 …, AAA 규칙 11)와 ARCH가 받은 실행 지시
연결   = 단계마다 어느 프로젝트 단계(BTSR-P?)를 위한 것인지, 맡긴 일(요청 건)을 적음
```

## 설계 단계

등록된 단계 없음 — 단계 이름은 PLN 프로젝트 단계가 정해지면 붙임.

## 받은 실행 지시

| 건 | 무엇 | 지금 |
|---|---|---|
| BTSR-PLN-001_worker-model-sol | 작업자 모델 설정 한 곳 (요구 R01–R07) | PMO 반환(btsr/pmo e13f82f) 받음 → PLN에 반환함 |
| BTSR-PLN-003_worker-model-merge | 제품 가지 3495f7e를 제품 main에 (PLN이 정함 — 한알 03:47:04) | PMO 합침(제품 main e5785b3) → ARCH 대조해 받음 → PLN에 반환함 |
| BTSR-PLN-002_webapp-phase1-capcut | 웹앱 1차 캡컷 길 (요구 1판). 차례 1 → 2 + 8 → 3 → 5 + 3-2 → 4-a → (4-b) → 6, 7은 한알 답 뒤 | 묶음 1: PMO 반환(ffdae27) 받음 → PLN에 반환함 → 합치기 PLN-004 → PMO에 ARCH-005 (맥에는 넣지 않음) — **멈춤: 제품 main push가 도구 자동 심사에서 거절**, 한알 답 대기. 묶음 2 + 8: 설계 1.1판 → PMO에 BTSR-ARCH-004. ④ 편집도 넣음(PLN 답, 요구 1.3판 R2.5). 다음 설계: 묶음 3 |
