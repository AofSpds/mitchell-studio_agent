# webapp-phase1 묶음 4-a-2 — ARCH → PLN 반환 (BTSR-PLN-002)

| 칸 | 내용 |
|---|---|
| 건 | BTSR-PLN-002 묶음 4-a-2 (요구 2.9판 R2.7 · R3.5 · R5.5 · R5.6 · R5.7 · R32.4 거둠, 결정 27 · 29 · 30 · 32 · 35) — PMO 건 [BTSR-ARCH-010](WEBAPP_PHASE1_BTSR-ARCH-010_REQUEST_CLAUDE.md) |
| 반환 시각 | 2026-11-21 16:34 KST, ARCH(Paseo d9520b95) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` 7d8376d `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B4A2_RETURN_CLAUDE.md` (PMO Paseo 5fbbea06) |
| 제품 가지 | `feat/webapp-b4a2-stuck-restart-20261121` **243cff0** (바탕 ed11f5a = 지금 main — 조상 확인함) · 코드 6a7d3c6 / 시험 243cff0 |

## 1. 결과

**받음.** 기준 1–10 · 3-1 맞음. 제품 main push · 맥 일 · 진짜 원격 push 없음.

## 2. 증거 (ARCH가 다시 본 것)

- 시험: 가지를 `git archive 243cff0 | tar -x`로 새 임시 폴더에 저장소 전부 풀고 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests` → **Ran 116 tests · OK** (이 PC 윈도 11). 제품 작업 사본은 건드리지 않음.
- grep 대조: `jobs.stop(job, step, reason, to="dev", …)`(jobs.py:2172, 기준 1 · 2) · `devpush.py` — 따로 둔 index(`GIT_INDEX_FILE`, :68) · `commit-tree … -p <원격 main>`(:77) · `push <커밋>:refs/heads/main`(:79) · 파일 이름 `suggestions/dev/<YYYY-MM-DD_HHMM>_<작업 id>.md`(:198-203, 제목 없음)(기준 3) · 제품 `CLAUDE.md:64` 예외 한 줄 · `def resume` 0 · 「가진 사진 올리기」는 runner.py:745 걷었다는 설명 글에만(기준 4).
- 기준 3-1 가짜 원격 꼴(PMO 반환서): 빈 bare 원격(main) · 맥 사본 clone이 기능 가지 + 로컬 커밋 + 안 올린 변경 + index 변경 · 다른 clone이 main을 앞서 push → 새 커밋 부모 = 원격 main · 바뀐 경로 = 글 하나 · 사본 HEAD · 가지 · status · index 그대로 · push 직전에 또 앞서면 다시 받아 얹음 — test_stuck에 있음(116에 듦).
- 화면 시험 18/18(헤드리스 390px — 빈 Jobs · 화면 7 · 8 · 9 · 15 · 보내는 중 · 새 편 베낌)은 PMO 반환서의 증거로 받음.

## 3. PMO가 정한 것 — ARCH 판단

| 정한 것 | 판단 |
|---|---|
| push는 `WEBAPP_DEV_PUSH=1`일 때만(기본 꺼짐 — 맥 0 결과 뒤 켬), 못 하면 pending + 틱에 다시 | 받음 — 맥 사본 쓰기 권한은 1차 끝 맥 준비 목록(설계 3번 [맥에서 확인]). **맥 시험 때 켜는 줄을 `MAC_RUN_PHASE1.md`에** — 1차 끝에 봄 |
| 제품 CLAUDE.md · AGENTS.md에 '가지 · 검토 줄'이 없어 예외 한 줄을 CLAUDE.md '## 폴더' 맨 위(+ `suggestions/README`)에 | 받음 |
| 건의는 원문 inbox 그대로 · 거른 사본만 push | 받음(R1.4 · 결정 10 그대로) |
| 화면 16 글자 수는 늘 보임 | 받음(시안 3판 d89fb2f) |

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. `FACE_REMAKES = 3` 그대로 → 묶음 8-2(결정 38 — 2).
2. push 켜기 · 맥 사본 권한 — 1차 끝 맥 시험.
3. **제품 main 합치기**: PLN이 정하시고 RSCH가 앞으로 감기 push(결정 13). 바탕 ed11f5a = 지금 main이라 앞으로 감기 됨.

## 6. 배운 것

- 'main에 글 하나만'을 지키려면 맥 사본의 HEAD와 상관없이 원격 main 위에 커밋을 짓는 길(따로 둔 index + commit-tree)이 맞다 — PLN 대조가 짚은 것을 PMO가 가짜 원격으로 그대로 시험함.

## 7. 다음

- PLN: 이 반환 받음 · 제품 main 합치기 정함.
- ARCH: PMO에 묶음 6(BTSR-ARCH-011, 바탕 243cff0) → 4-b(012) → 8-2(013).
