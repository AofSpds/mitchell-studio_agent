# webapp-phase1 IVA 고침 묶음 — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN 요청 `btsr/pln` edf7209 `WEBAPP_PHASE1_IVA_FIX_REQUEST_CLAUDE.md` (IVA 부적합 `btsr/iva` 7915afd · 결정 41 · 44 · 45 · 46 · 한알 18:07:10 · 18:27:53) — PMO 건 [BTSR-ARCH-015](WEBAPP_PHASE1_BTSR-ARCH-015_REQUEST_CLAUDE.md) + 덧붙임 1 · 2 |
| 반환 시각 | 2026-11-21 18:49 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` a6e3beb `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_IVA_FIX_RETURN_CODEX.md` (PMO Paseo 7837ebd8) |
| **합칠 머리** | 제품 `feat/webapp-iva-fix-20261121` **f457be8** (원격 ls-remote로 봄) — 바탕 94d4522 · **코드 머리 0bce387** · 시험 27acd2a · a44893c · **글 머리 f457be8**(맥 글 6580ecf · f457be8). 지금 제품 main = 7127393 → 앞으로 감기 됨(94d4522가 f457be8의 조상, 7127393은 94d4522의 조상) |

## 1. 결과

**받음.** 가 1 · 가 2 · 나 3 · 나 4(+ 38번 A1) · 나 5의 '됨' 맞음. 나 6은 덧붙임 1이 닿기 전에 PMO가 이미 함 — 요청대로 되돌리지 않음, 거둔 글 두 줄은 넣지 않음. 맥 테스트 글 = 고친 코드 위 · IVA 성공 기준 셋 · 결정 44 셋째 길 · 1-8 확인 줄 걷음 · 결정 45. 제품 main push · 맥 일 · 실제 개발자 글 전송 없음.

## 2. 증거 (ARCH가 다시 본 것)

- 시험: `git archive f457be8 | tar -x` 새 임시 폴더 · 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests`
  - 이 PC 기본 파이썬: **Ran 137 · OK (skipped=2)**(`cryptography` 없음).
  - 저장소 밖 임시 가상 환경 `cryptography` 50.0.2: **Ran 137 · OK**. 임시 폴더 · 가상 환경 지움.
- 바뀐 곳: `git diff --stat 94d4522 f457be8` = `MAC_RUN_PHASE1.md` · `devpush.py` · `intake.py` · `jobs.py` · `reel_api.py` · `runner.py` · `static/app.html` · `suggest_store.py`(나 6 — 이미 함) · 시험 5파일. 새 화면 · 새 단추 0.
- grep(f457be8):
  - **가 1**: 서버가 Post 카드에 `caption_state`(reel_api.py:369) · 화면 「캡션 복사」 켜짐 = `caption_state === "ready"`이고 글 있음(app.html:651) · `none`이면 "캡션 없이 영상만 쓸 수 있어요"(:648) · '준비하는 중'은 `making`일 때만(:650).
  - **가 2**: 작업자 띄우기 전 점검에서 `spec_redo`가 열린 편의 `export`이면 C2만 뺌(runner.py — "첫 판의 규격을 고치는 내보내기"). 다른 칸 그대로.
  - **나 4**: `face_remakes_left()` 한 곳(runner.py) · 0이면 「다시 만들기」 단추를 넣지 않음(jobs.py) · ? 글 "다시 만들기는 {left}번 더 할 수 있어요." / 0이면 "다시 만들기를 다 썼어요."(reel_api.py:172) · 0에서 remake → `Conflict` 409(:185). 'N번 남음' 글 0.
  - **나 5**: 확장자 목록 한 곳 `PHOTO_EXTENSIONS`(heif 포함) · `MEDIA_EXTENSIONS`를 jobs.py 두 자리가 함께 읽음.
  - **나 3**: 고르기(`onchange`)가 바로 올리지 않음 — 「Send」가 고른 것 · Request를 함께 보냄(app.html `startingSend`).
  - **맥 테스트 글**: 머리 '제품 기준 `0bce387`' · 결정 44 · 45 · '맥 밖에 보일 수 있는 범위는 세 곳'(:32) · 1-8 직전 확인 줄 0 · IVA 성공 기준 셋(:157 · :316 · :343) · 옛 가지 · `oc-test/p1` 0(다 12).
- '됨'마다 시험 이름 · 헤드리스 화면 증거는 PMO 반환서로 받음.

## 3. PMO가 정한 것 — ARCH 판단

| 정한 것 | 판단 |
|---|---|
| 나 6을 덧붙임 1 전에 이미 고침(소재 이름 · 건의 사본) | 받음 — 한알 18:27:53 '안 막아도 됨'은 '더 하지 않음'이고, 이미 한 것은 되돌리지 않기로(PLN 알림 그대로) |
| 결정 46 — 보조 넷(014 S1 · 015 S2–S4, Codex GPT-6.2 Astra)은 그대로 마침 · 새로 안 엶 | 받음(한알 「알겠습니다」) |

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. **제품 main 합치기**: RSCH가 차이만 확인하고 앞으로 감기(IVA 다시 안 함 — 결정 41 · 005 덧붙임 1). 합칠 머리 **f457be8**, 지금 main 7127393.
2. 맥 테스트 세 회차 — 한알 한 줄 셋은 그대로(「이 파일(app/webapp/MAC_RUN_PHASE1.md)의 공통과 N회차대로 해 줘.」).

## 6. 배운 것

- 덧붙임으로 '빼라'가 갈 때 이미 한 일은 되돌리지 않는 것을 같은 글에 적어 두면, 받는 쪽이 빼느라 때를 쓰지 않음.

## 7. 다음

- PLN: 이 반환 받음 · 합침 조건(main 7127393 · 머리 f457be8)을 RSCH에.
- ARCH: 맥 테스트 결과 · PLN 알림대로.
