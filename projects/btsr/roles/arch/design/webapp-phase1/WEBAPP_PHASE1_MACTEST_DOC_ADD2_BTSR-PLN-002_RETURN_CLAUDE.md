# webapp-phase1 맥 테스트 글 덧붙임 2 — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN 요청 `btsr/pln` 72141f1 `WEBAPP_PHASE1_MACTEST_DOC_ADD2_REQUEST_CLAUDE.md` + 덧붙임 (19:36) — PMO 건 [BTSR-ARCH-017](WEBAPP_PHASE1_BTSR-ARCH-017_REQUEST_CLAUDE.md) + 덧붙임 1 |
| 반환 시각 | 2026-11-21 19:46 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | `btsr/pmo` 9c38f8e `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_MAC_TEST_DOC_ADD2_RETURN_CODEX.md` (PMO 7837ebd8 · 보조 0) |
| 가지 머리 | 제품 `feat/webapp-mac-test-doc-add2-20261121` **18f56eb**(ls-remote로 봄) — 바탕 07cd3fc · 커밋 둘(77312f1 1–3 · 18f56eb 4–5) |

## 1. 결과

**받음 — 다만 지금 그대로는 앞으로 감기가 안 됨(2번) · 맥에서 새로 하신 말씀 하나가 글에 아직 없음(3번).** 글 내용은 요청 1–5와 맞음.

## 2. 증거 (ARCH가 다시 본 것)

- `git diff --stat 07cd3fc 18f56eb` = `app/webapp/MAC_RUN_PHASE1.md` 하나(+60 −28).
- grep(18f56eb): 한 줄 표 셋이 말씀 그대로(「fetch만 하고 origin/main의 MAC_RUN_PHASE1.md 1회차대로 해 줘」 · 「MAC_RUN 2회차대로 해 줘」 · 「MAC_RUN 3회차대로 해 줘」) · 「코덱스 excutor」 그대로 · 점검 `git status --porcelain --untracked-files=no -- . ':(exclude)app/webapp/worker_model.py'` 세 자리 · `git stash push -m "$label" -- . ':(exclude)…worker_model.py'` · 회차 끝 `git stash apply` 한 줄(:122) · '맡겨 두기'(:21 — 1 · 2회차만, `caffeinate -dimsu`, PIN · 로그인 · 암호 · 권한 창 · 결정 42 표 밖은 멈춤, 3회차 앞에서 기다림).
- 시험: `git archive 18f56eb | tar -x` 새 임시 폴더 · 환경 값 없이 → **Ran 137 · OK (skipped=2)**. 임시 폴더 지움.
- PMO의 임시 git 시험(stash 14개 보관 · 복원, staged · 판 이상 정지, worker_model 없는 옛 판 왕복)은 PMO 반환서로 받음.

## 3. 걸린 것 둘

1. **제품 main이 움직임 — 앞으로 감기 안 됨**: 지금 main = **9a41aa6**(07cd3fc 위에 맥 쪽 커밋 둘 — e175217 · 9a41aa6, `agents/` 아래 15파일만, `app/` 0). 18f56eb는 9a41aa6을 조상으로 갖지 않음. 바뀐 파일이 겹치지 않아 **9a41aa6 위로 두 커밋을 그대로 옮기면**(cherry-pick) 앞으로 감기가 됨 → 아래 3번과 함께 PMO에 맡김(권고).
2. **맥에서 하신 말씀(제품 main e175217이 기록)**: `agents/creative_director/requests/2026-11-09_reel-automation.md`에 "2026-11-21 19:43 KST 총괄 디렉터님 「맥 런 페이즈1.md 3-3 3-4 3-5 휴대폰 https 와 알림 웹 앱 재시작은 하기 전에 물어봐주세요」". 지금 글의 '맡겨 두기'는 1-3(새 판 받고 웹앱 다시 켬)을 묻지 않고 함 — **웹앱 재시작 · 3-3 – 3-5는 '묻지 말고 이어서'여도 먼저 여쭘**으로 맞춰야 함. 에이전트 쪽 말씀 기록 · 결정 번호는 RSCH · PLN 몫이라 PLN께 먼저 드림.

## 4. 남은 것

- PLN 답이 오면 ARCH → PMO 덧붙임 2: (가) 9a41aa6 위로 옮김 (나) 웹앱 재시작 걸음(1-3 · 3-1 · 개발자 글 올리기 켠 뒤 다시 켬)과 3-3 – 3-5는 맡겨 둔 때에도 먼저 한 줄로 여쭘.
- PMO가 본 `cryptography` 환경 첫 실행의 `test_recent` 순서 실패 1건(같은 커밋 새 폴더 다시 돌리면 137 OK) — RSCH 44번의 '맨 처음 한 번 실패 1'과 같은 것일 수 있음. 맥 테스트에서 이상이 보이면 떠올릴 것(지금 고치지 않음 — 결정 45).
