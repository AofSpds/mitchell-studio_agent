# webapp-phase1 묶음 5 + 3-2 — ARCH → PLN 반환 (BTSR-PLN-002)

| 칸 | 내용 |
|---|---|
| 건 | BTSR-PLN-002 묶음 5 + 3-2 (요구 1.8판 R5.x · R32.1–R32.4 · R3.6) — ARCH가 PMO에 맡긴 건 [BTSR-ARCH-008](WEBAPP_PHASE1_BTSR-ARCH-008_REQUEST_CLAUDE.md) |
| 반환 시각 | 2026-11-21 14:33 KST, ARCH(Paseo d9520b95) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` a679716 `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B5_B32_RETURN_CLAUDE.md` (PMO Paseo 5fbbea06) |
| 제품 가지 | `feat/webapp-b5-b32-worker-face-20261121` **3072e7e** (바탕 main `32b55dc` — 조상 확인함) · e4323cf(앞 PMO 세션) → 449f378 코드 → 3072e7e 시험 |

## 1. 결과

**받음.** 받아들임 기준 1–9 모두 맞음(아래 증거). 제품 main push · 맥 일 없음. 결정 15(컴퓨터 유즈 사전 승인)로 설계 5번 '걸리는 것'은 풀림 — 맥에서 돌리는 것은 1차 끝 맥 시험에 한 번(결정 08).

## 2. 증거 (ARCH가 다시 본 것)

- 시험: 가지를 `git archive 3072e7e | tar -x`로 새 임시 폴더에 **저장소 전부** 풀고, 그 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests` → **Ran 78 tests · OK** (이 PC 윈도 11). 제품 작업 사본은 건드리지 않음(fetch · archive · grep만).
- 기준 대조(풀어 놓은 곳에서 grep):
  1. `worker.py` 있음 · `worker_model.py` `MODEL_CLI` · `EFFORT_CLI` 값 빈 글자 · `PERMISSION_CLI = []` — 지어내지 않음 ✔
  2. 결과는 파일로 — 얼굴은 `face_result.txt` 따로(runner.py:475) ✔
  3. 운영자 화면(app.html)에 'Do It Myself' · 'Mark Done' 0 · `jobs.py resume`(:1831, 부분 `face` 포함) ✔
  4. `wait_usage` · `retry_at` — runner.py · worker.py ✔ (시험 4)
  5. Face 단계: 서버 9단계 + `ORDER`, **작업 화면도 `ORDER`대로 9개를 그림**(app.html `loadJob` — `ORDER.filter(i => j.steps[i]).map`), 목록 점도 `ORDER`. 「이 사진으로 갈게요 →」 · 「다시 만들기」 · 「가진 사진 올리기」 있음 · `for_chatgpt/` runner · reel_api ✔ — PLN이 물으신 'Face를 작업 화면에 그리는지'는 **그림**.
  6. `josa()`(jobs.py:106) ✔ · 남은 말 목록 묶음 5 · 3-2 줄 0(PMO 시험)
  7. `app/webapp/MAC_RUN_PHASE1.md` — 맨 위 '하지 않으실 것' 5줄 → 맥 0 → 1 → 2 → 3. `MAC_RUN_B2.md`는 맥 1로 합쳐 없어짐 ✔ (돌리지 않음)
  8. 코드 커밋 449f378 · 시험 커밋 3072e7e 따로, 시험 명령 · 환경 값 반환서에 ✔
  9. 맥 길 한 줄 — PMO 반환서 7번 ✔

## 3. PMO가 봐 달라고 한 다섯 — ARCH 판단

| | 무엇 | 판단 |
|---|---|---|
| ① | 얼굴 결과 줄을 `face_result.txt`로 따로 | 받음 — ⑥ 결과 줄 세기와 섞이지 않음 |
| ② | 시작 문 앞에 그 작업 프로젝트를 CapCut 목록 맨 위로 | 받음 — main에 이미 있던 `bring_to_top`(CapCut이 꺼져 있을 때만 · 목록 파일 먼저 백업 · 그 칸만)을 다시 씀. 화면 조작이 아니라 파일 고침. 여러 작업일 때 점검이 엇갈리던 것을 막음 |
| ③ | 모르는 점검 칸(C2)은 문을 막지 않음 | 받음 — '모름'과 '틀림'을 나눔(`known`). 맥 시험에서 C2가 실제로 무엇을 내는지 봄 |
| ④ | Mark Done · 점검 체크 주소는 화면에서만 없애고 남김 | 받음 — 기준 3 '코드는 개발자 명령으로 남김' 그대로. 지우지 않음 |
| ⑤ | `MAC_RUN_B2.md`를 `MAC_RUN_PHASE1.md` 맥 1로 합치고 지움 | 받음 — 기준 7이 '합침'. git 이력에 남음 |

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 이 반환서 · CURRENT · INDEX.

## 5. 남은 것 (어디로)

1. `MAC_RUN_PHASE1.md`가 컴퓨터 유즈 승인을 '물음 1'로 둠(PMO가 결정 15를 받기 전에 씀) → **묶음 4-a 건(ARCH-009)에서 '승인 받음 — 결정 15, 범위는 WEBAPP_PHASE1_CU_ASK_CLAUDE.md'로 고침**. 맥 시험 전에 고쳐지므로 이 가지는 그대로 받음.
2. 화면이 단계를 숫자 칸으로 가리키는 곳 16군데(`i === n` 등) — 묶음 4-a 설계 2번에서 키로 바꿈.
3. 명령줄 값 · 권한 플래그 · 승인 한 장 '권한' 칸 — 맥 0에서(1차 끝 맥 시험). 맥에서 본 권한이 승인 범위보다 넓으면 그것만 다시 여쭘(결정 15).
4. 시험 9(Fit 뒤 +1초 · 규격) — 이번에 고친 곳이 아님. 1차 끝 맥 시험 · 묶음 6(R6.4)에서.
5. 고르는 물음 까닭 가름은 작업자 '멈춤' 글자로 — 진짜 작업자 글은 맥 2에서 보고 다듬음.
6. **제품 main 합치기**: PLN이 정하시고 RSCH가 앞으로 감기 push(결정 13). 가지 바탕이 지금 main `32b55dc` 그대로라 앞으로 감기 됨.

## 6. 배운 것

- 사람이 맞춰 주던 것(CapCut 목록 맨 위)을 일꾼이 하게 바꿀 때는 그 '맞춰 주던 것'을 코드에 옮겨야 한다 — PMO가 찾음.
- 승계 사이에 정해진 결정(15)은 일하던 쪽 문서에 늦게 닿는다 — 반환 대조 때 그 사이의 결정을 다시 본다(AAA 규칙 37).

## 7. 다음

- PLN: 이 반환 받음 · 제품 main 합치기 정함.
- ARCH: 묶음 4-a 낱말 답이 오면 PMO에 ARCH-009(남은 것 1 · 2 포함, 바탕은 그때의 main). 묶음 6 설계는 이 가지(작업자 길)를 바탕으로 이제 씀.
