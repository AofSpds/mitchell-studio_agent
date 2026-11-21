# webapp-phase1 묶음 4-a — ARCH → PLN 반환 (BTSR-PLN-002)

| 칸 | 내용 |
|---|---|
| 건 | BTSR-PLN-002 묶음 4-a (요구 2.1판 → 2.8판 R1.6 · R1.7 · R2.3 · R2.5 · R4.1–R4.3 · R5.3 거둠 · R8.4) — ARCH가 PMO에 맡긴 건 [BTSR-ARCH-009](WEBAPP_PHASE1_BTSR-ARCH-009_REQUEST_CLAUDE.md) (덧붙임 3-1 · 2 포함) |
| 반환 시각 | 2026-11-21 15:55 KST, ARCH(Paseo d9520b95) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` 7f63e44 `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B4A_RETURN_CLAUDE.md` (PMO Paseo 5fbbea06) |
| 제품 가지 | `feat/webapp-b4a-one-job-bar-20261121` **ed11f5a** (바탕 main `3072e7e` — 조상 확인함) · 코드 ebc3e66 · c49596e / 시험 627d872 · ed11f5a |

## 1. 결과

**받음.** 기준 1–13 · 덧붙임 3-1 · 3-2 · 3-3 · 3-4 · 5-1 · 6-1 맞음. 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- 시험: 가지를 `git archive ed11f5a | tar -x`로 새 임시 폴더에 저장소 전부 풀고 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests` → **Ran 92 tests · OK** (이 PC 윈도 11). 제품 작업 사본은 건드리지 않음.
- grep 대조(풀어 놓은 곳): app.html 숫자 칸 0 · `CIRCLED` 0(기준 1) · `jobList` · `backBtn` · '← Jobs' · `pracBox` · `loadJobs` 0(2) · `jobs.busy()`(jobs.py:2078) · 409 server.py:543 · reel_api.py:620(3) · `log_event` · `started_at`(jobs.py:2024-2030, 8) · `/api/changes` · 동시 8(server.py:401 · 661, 9) · R1.7 뺄 글 0(11) · MAC_RUN 결정 15(12) · 「이 원고로 갈게요 →」는 서버 `now_line` 단추(jobs.py:2172)에서 오고 시험이 봄(test_one_job.py:83 — 결정 19).
- PMO 화면 시험 27/27(헤드리스 390px — Send가 바뀜 신호로 스스로 흐려짐 · 3-1 그 자리 더 보내기)은 PMO 반환서의 증거로 받음(ARCH가 다시 돌리지 않음).

## 3. PMO가 물은 셋 — ARCH 판단

| | 물음 | 판단 |
|---|---|---|
| ① | ? 표 '몇 번 더'를 `FACE_REMAKES = 3`에서 세면 처음 "3번 더"(시안은 "2번 더") | **값에서 세는 그대로 받음.** 다시 만들기 횟수가 셋으로 흩어진 것(face.md '2번 더' · `FACE_REMAKES` · 두 번 실패)은 19번 다14 — **묶음 8-2**에서 한 수로 맞춤(그때 한알께 보여 드림). 이 건에서 `FACE_REMAKES`를 바꾸지 않음 |
| ② | 빈 Jobs의 「⚙ 기본 옵션」을 남김(3판에 없지만 기본값 저장 길이 이것뿐) | **받음(새로 만든 것이 아니라 있던 것).** 빈 Jobs는 4-a-2 — 그 설계에 '기본값 저장 길'을 적음(PLN께 짚음) |
| ③ | 「가진 사진 올리기」를 작은 줄 단추로 그대로 | 받음 — 결정 35(R32.4 거둠)로 **4-a-2에서 걷음** |

- PMO가 정한 것(개발자에게 넘어감 = ⑥ · 얼굴 dev 또는 ② ③ ④ 멈춤 · 안쪽 기록은 `save_status` 한 곳에서 견줘 씀 · 화면 10의 판 · 규격 줄은 묶음 6): 받음 — 설계와 맞음.

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 이 반환서 · CURRENT · INDEX.

## 5. 남은 것 (어디로)

1. `jobs.py resume` — 아직 있음(이 건을 보낸 뒤 결정 30으로 걷기로 정함) → **4-a-2**.
2. 막힘 · 틈새(화면 8 · 9 · 처음부터 시작 · 사용량 · 맥 연결 · 빈 Jobs) → 4-a-2(설계 1판, PLN 대조 받음).
3. 다시 만들기 횟수 · 지시 글 → 묶음 8-2.
4. **제품 main 합치기**: PLN이 정하시고 RSCH가 앞으로 감기 push(결정 13). 바탕이 지금 main `3072e7e` 그대로라 앞으로 감기 됨.

## 6. 배운 것

- 보낸 뒤 들어온 시뮬레이션 · 재검토(19번 · S9)가 그 건의 빈 곳을 짚을 때, 본문을 고치지 않고 '덧붙임'으로 기준만 더해 보내면 PMO가 한 차례 안에 함께 넣는다 — 두 번 다 반환에 '덮음 / 더함' 표로 돌아옴.

## 7. 다음

- PLN: 이 반환 받음 · 제품 main 합치기 정함.
- ARCH: PMO에 4-a-2(BTSR-ARCH-010) — PLN이 짚은 둘(push 길 · 파일 이름 거르기)을 고쳐서. 그 뒤 6 → 4-b.
