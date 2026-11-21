# webapp-phase1 묶음 8-2 — ARCH → PLN 반환 (BTSR-PLN-002)

| 칸 | 내용 |
|---|---|
| 건 | BTSR-PLN-002 묶음 8-2 (요구 2.12판 R82.1–R82.3 · R3.7 · R32.5, 결정 36 · 37 · 38 · 19번 다11–14 · 720×1280) — PMO 건 [BTSR-ARCH-013](WEBAPP_PHASE1_BTSR-ARCH-013_REQUEST_CLAUDE.md) · 설계 [1.1판](WEBAPP_PHASE1_B82_DESIGN_CLAUDE.md) · [r2 한 장 1.1판](WEBAPP_PHASE1_B82_TEMPLATE_R2_SHEET_CLAUDE.md) |
| 반환 시각 | 2026-11-21 17:45 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` cf2f50d `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B82_RETURN_CODEX.md` (PMO Paseo 99626982) |
| 제품 가지 | `feat/webapp-b82-template-r2-20261121` **94d4522** · 코드 1edf42c · 3b2ce52 / 시험 f00bf6b · 94d4522 · 바탕 7127393 — **지금 제품 main = 7127393**(ls-remote로 봄, 조상 확인함 → 앞으로 감기 됨) |

## 1. 결과

**받음.** 설계 5번 1–10 · 요청 11–16 맞음. 제품 main push · 맥 일 없음. **웹앱 1차 묶음(1 · 1-1 · 2 · 8 · 3 · 5 · 3-2 · 4-a · 4-a-2 · 6 · 4-b · 8-2) 구현 차례는 이것으로 끝.** 남은 ARCH 일은 `MAC_RUN_PHASE1.md` 1차 끝 판(RSCH S13 목록 뒤, 결정 39 · 40).

## 2. 증거 (ARCH가 다시 본 것)

- 시험: `git archive 94d4522 | tar -x`로 새 임시 폴더에 저장소 전부 풀고 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests`
  - 이 PC 기본 파이썬(`cryptography` 없음): **Ran 135 · OK (skipped=2)**.
  - 저장소 밖 임시 가상 환경 `cryptography` 50.0.2: **Ran 135 · OK**. 임시 폴더 · 가상 환경은 지움.
- 템플릿: `r1.md`는 7127393 → 94d4522 사이 바뀜 0(`git diff --quiet`). `r1.md` ↔ `r2.md` = 덩이 4 · 줄 9(뺀 4 · 더한 5) — 한 장의 다섯 곳(2번 · 3번은 같은 문단 덩이 하나)과 같음, 그 밖 0. `TEMPLATE.json` `current: "r2"` · `revisions[]` r2 줄(출처 '묶음 8-2 · 한알 확인 16:25:57 KST (결정 38)').
- 규격 한 곳: `app/webapp/export_spec.json` `{"w": 1080, "h": 1920, "fps": 30}`을 파이썬 내보내기 검사와 `capcut_build.mjs:53`이 함께 읽음(설계 2번 '규격 한 곳'을 파일 하나로 — 받음).
- `FACE_REMAKES = 2` 한 곳(runner.py:649) · 지시 글 · 화면에 박힌 '…번 더' · '최대 …' 0(grep).
- 화면 17 · 5(390px) · 가짜 빌드 dry-run 캔버스 1080×1920 · 기준별 시험 이름은 PMO 반환서의 증거로 받음.

## 3. PMO가 정한 것 — ARCH 판단

| 정한 것 | 판단 |
|---|---|
| 규격을 `export_spec.json` 한 파일에 두고 파이썬 · Node가 함께 읽음 | 받음 — 두 언어가 같은 값을 보는 가장 짧은 길 |
| 답을 저장한 뒤 지금 접수 표로 다음 물음을 다시 셈(흐린 사진을 빼면 화면 17이 그때 나옴) | 받음 — 기준 14 그대로 |
| 편집 확인이 '쓰지 않는 소재(과정 영상 · other)'를 쓴 장면표를 거절 | 받음 — 기준 4를 서버에서도 지킴 |

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. [맥에서 확인] r2 첫 프로젝트 캔버스 1080×1920 · CapCut 음악의 '상업적 이용' 표시(없으면 PLN께 — 결정 38) · 실제 사진의 얼굴 가름 · 진짜 원고 품질 — `MAC_RUN_PHASE1.md`에 두 줄 들어감(PMO), 나머지는 1차 끝 판에서.
2. **`MAC_RUN_PHASE1.md` 1차 끝 판** — RSCH S13 3판 회차 표 · 고칠 곳 목록이 PLN으로 오면 ARCH가: 결정 39(회차로 · 받은 소재 지킬 것) · 결정 40(맥 ChatGPT가 이끔 · 화면 다툼 · 결정 15 범위 넘는 걸음 '승인 뒤') · RSCH 35번 볼 것 둘(캡션이 끝내 걸릴 때 · Manual 맨 위 한 줄).
3. **제품 main 합치기**: PLN이 정하시고 RSCH(ed5ef600)가 앞으로 감기 push(결정 13). 바탕 7127393 = 지금 main.

## 6. 배운 것

- 템플릿 판 대조는 '한 장 몇 줄 = diff 몇 덩이'로 세면 빠름 — 같은 문단의 두 줄은 덩이 하나로 붙으므로 줄 수(뺀 · 더한)까지 함께 봄.

## 7. 다음

- PLN: 이 반환 받음 · 제품 main 합치기 정함.
- ARCH: S13 목록을 기다려 `MAC_RUN_PHASE1.md` 1차 끝 판 — 맡길 길(ARCH가 PMO에 요청 BTSR-ARCH-014로 · 또는 다른 길)은 목록이 올 때 PLN 알림대로.
