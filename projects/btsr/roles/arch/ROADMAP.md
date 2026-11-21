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
| BTSR-PLN-002_webapp-phase1-capcut | 웹앱 1차 캡컷 길 (요구 1판). 차례 1 → 2 + 8 → 3 → 5 + 3-2 → 4-a → (4-b) → 6, 7은 한알 답 뒤 | 묶음 1: PMO 반환(ffdae27) 받음 → PLN에 반환함 → 합치기 PLN-004 → PMO에 ARCH-005 (맥에는 넣지 않음) → 멈춤(도구 자동 심사) → 한알 「직접 하세요.」 RSCH가 push, 제품 main `6cfbc5f` → ARCH-005 닫음 · PLN에 반환함. 묶음 2 + 8: 설계 1.1판 → PMO에 BTSR-ARCH-004. 묶음 2 + 8: PMO 반환(26adad6) 받음 → PLN에 반환함(맥 시험 9는 1차 끝으로 미루기를 권고). 묶음 1-1(R1.4 · R1.5): PMO 반환(136edc7) 받음 → PLN에 반환함. 묶음 2 + 8 제품 main `658ec1d`(RSCH push). 묶음 3: PMO 반환(19fb285) 받음 → PLN에 반환함. 다음: 묶음 5 + 3-2 · 묶음 6에 1.7판 R6.4. ④ 편집도 넣음(PLN 답, 요구 1.3판 R2.5). 다음 설계: 묶음 3 |
