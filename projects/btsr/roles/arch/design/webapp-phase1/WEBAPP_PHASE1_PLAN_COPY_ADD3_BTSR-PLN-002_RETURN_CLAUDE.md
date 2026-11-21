# webapp-phase1 기획안 사본 · 맥 글 덧붙임 3 — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN 요청 `btsr/pln` 92aacb5(기획안을 제품에) · c6623fe(맥 글 덧붙임 3 · 1-6) — PMO 건 [BTSR-ARCH-018](WEBAPP_PHASE1_BTSR-ARCH-018_REQUEST_CLAUDE.md) · [BTSR-ARCH-019](WEBAPP_PHASE1_BTSR-ARCH-019_REQUEST_CLAUDE.md) |
| 반환 시각 | 2026-11-21 21:27 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | `btsr/pmo` cf3b904 `records/webapp-phase1/WEBAPP_PHASE1_PLAN_COPY_RETURN_CODEX.md` · `WEBAPP_PHASE1_MAC_TEST_DOC_ADD3_RETURN_CODEX.md` (PMO 7837ebd8) |
| **합칠 머리** | 제품 `feat/webapp-plan-phase1-20261121` **896abae**(ls-remote로 봄) — 지금 main **e095396** 위 커밋 둘: fe1e241(018) · 896abae(019) → 앞으로 감기 됨 |

## 1. 결과

**받음 — 둘 다.** 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- `git diff --stat e095396 896abae` = `MAC_RUN_PHASE1.md`(+24 −13, 019) · `PLAN_PHASE1.md`(+138, 018) · `README.md`(+1, 018) — 세 파일뿐.
- **018**: 에이전트 저장소 92aacb5의 기획안 1.9판 ↔ 제품 `PLAN_PHASE1.md` diff = 맨 위 '사본 — …' 한 줄 더함 · '이 글의 바탕'의 '같은 폴더의' → '에이전트 저장소 mitchell-studio_agent의 `projects/btsr/roles/pln/requirements/webapp-phase1/`' 한 줄 — 그 밖 0. `README.md`:7 '웹앱 1차 기획안(쉬운 말 한 장) — [`PLAN_PHASE1.md`](PLAN_PHASE1.md)'.
- **019**: `MAC_RUN_PHASE1.md`에 1-6 '보이는 앱' 기준(`whose visible is true`) · 3-3 'HTTPS Certificates' · 🖥 걸음 앞 '맥을 만지지 말아 주세요' 한 줄 · 한 번 더 · 맡겨 둔 때 작업자 없는 걸음만.
- 시험: `git archive 896abae | tar -x` 새 임시 폴더 · 환경 값 없이 **Ran 137 · OK (skipped=2)**. 임시 폴더 지움.

## 3. 1-6 판단 (PLN께 앞서 드린 것 그대로)

- 고칠 코드 없음. 1-6 '됨' 기준이 OS 활성 앱(이끄는 쪽)과 화면 맨 위 창(작업자)을 견준 것이 어긋남 → 019 5로 바로잡음.
- PMO가 짚은 대로, 결과 글(b9ceefc)이 확정하는 것은 '활성 앱과 답이 달랐다'까지 — 그때 Claude 창이 실제로 보였는지는 확인할 수 없음(RSCH 읽기와 맞는 설명일 뿐).

## 4. 남은 것

- 합치기: RSCH가 세 파일뿐인지 보고, push 직전 main을 다시 본 뒤 앞으로 감기 → 한알께 `app/webapp/PLAN_PHASE1.md` 주소.
