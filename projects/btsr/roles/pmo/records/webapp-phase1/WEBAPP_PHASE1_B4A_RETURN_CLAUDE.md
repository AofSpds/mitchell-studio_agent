# BTSR-ARCH-009 반환 — 웹앱 묶음 4-a (한 번에 한 편 · 하는 일 한 줄 + 바 · 화면 스스로 바뀜)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 5fbbea06) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (Paseo d9520b95) |
| 쓴 때 | 2026-11-21 15:50 KST |
| 요청 · 설계 | `btsr/arch` 3da95c5 `WEBAPP_PHASE1_BTSR-ARCH-009_REQUEST_CLAUDE.md`(+ cacb410 기준 3-1 · 7701eb4 덧붙임 2) · `WEBAPP_PHASE1_B4A_DESIGN_CLAUDE.md` 2판 · 화면 시안 3판(main `projects/btsr/roles/rsch/sub/s8_uiux_rework/`) |
| 결과 | 제품 가지 `feat/webapp-b4a-one-job-bar-20261121` **ed11f5a** (push · 바탕 main 3072e7e) — ebc3e66 코드 → 627d872 시험 → c49596e 코드(덧붙임 2) → ed11f5a 시험. **제품 main push 안 함 · 맥 일 안 함** |

## 1. 결과 — 받아들임 기준 대조 (설계 2판 9번)

| # | 기준 | 한 것 | 시험 |
|---|---|---|---|
| 1 | 단계 이름표 사본 0 · 숫자 칸 0 · 영어 이름 | app.html의 `STEPS` · `CIRCLED` · `ORDER` 사본 지움. 서버 `steps_meta`(보이는 차례 · 키 · 영어 이름표) · `now.bar{key,label,n,of}`로만 그림. 숫자 칸(`steps[5]` · `d.ok === "6"` · `i === 2` …) 0 — 키(`stepOf(j,"voice")` · `data-step="done"`)로 | `Screen.test_app_html`(grep) |
| 2 | Jobs 목록 · 「← Jobs」 · 점 · 연습 상자 · `JOBS` 0 · 한 편만 | 목록 화면 · 작업 화면 둘 → 한 편 화면 하나(`#jobOne`: 제목 · 「옵션 바꾸기」 · 현황 한 줄 · 바 · 물음 + 단추). 연습은 Manual 「개발자용」에만 | 같은 시험 · 화면 '한 편만' |
| 3 | busy → `/api/batch` · `/api/batch/done` 409 · 승인 · 개발자 · 치움 → 받음 · 넘어간 편 `hidden_at` · 한 편 안 「더 보내기」 받음 | `jobs.busy()` = 지금 한 편(`current_job` — 가장 새 편 가운데 hidden · 치움 · 승인 아닌 것)이 개발자에게 넘어가지 않았으면. 409 글 "지금 한 편을 만드는 중이에요". 새 편을 받으면 `hide_ended` · `jobs.py shelve` | `Busy.test_busy_states` · `Http` 셋 |
| 3-1 | 확인 기다림 가운데 「더 보내기」는 그 자리에서 | Jobs 안의 숨은 파일 고르기(`#jobPicker`) → `/api/job/answer` → `/api/batch {job}` → 올리기 → `/api/batch/done` → 그 한 편 화면. 「가진 사진 올리기」도 같은 길 | `Http.test_3_1_…` · 화면 3줄 |
| 4 | Send 흐림 ↔ 켜짐이 스스로 | `/api/now` + 바뀜 신호 → `pickBtn` disabled · Request · Options 흐림 · 현황 한 줄 | 화면 '스스로 흐려짐' (새 편이 생긴 뒤 <5초) |
| 5 | `now_line` 때마다 · 둘째 줄 안내 0 | `jobs.now_line(job)` → `{text, ask, buttons, tone, bar}`(아래 2번 표) | `Busy.test_now_line_table` · 화면 |
| 6 | 바 n / 9 · 막힘 빨강 · 라벨 | 너비 n/9(22 · 33 · 44 · 56 · 78 · 89%) · `tone: stop` 빨강 · `usage` 흐림 · 바 아래 `라벨 n / 9` | 같은 시험 · 화면 |
| 7 | 승인 → Post · Send 켜짐 | 「승인」 → `show("post")` · busy 풀림 · Jobs는 빔 | `Http.test_7_…` · 화면 |
| 8 | `events` · `started_at` · `jobs.py log` · 화면 0 | `save_status`가 단계 상태가 바뀐 곳마다 `log_event`(start · check · done · stop), 답은 `note_event`(answer), 사용량은 wait. `jobs.py log`(기다린 초 · started_at). `/api/job`에 events 없음 | `Busy.test_events_and_waits` |
| 9 | `/api/changes` 5초 · 401 · 503 | SSE — 2초마다 `change_sig`(지금 한 편 · busy · status.json 시각 · 차례표), 15초 ping, 동시 8. 화면은 신호에 다시 읽고 끊기면 30초 읽기 | `Http.test_9_changes`(바뀜 → 5초 안 · 401 · 9번째 503) |
| 10 | ? 표 하나 · 글 그대로 · `FACE_REMAKES` | 화면 5의 ? → 풍선 하나. 글 `reel_api.face_help` | `test_face_help_counts_remakes` · 화면 — **아래 4-1 여쭘** |
| 11 | R1.7 뺄 글 0 · 막는 검사 | 「하실 일 없어요」 · 「손님 이름 · 전화번호는 쓰지 마세요」(Send · 요청 · 고칠 점 · 건의하기 · 물음) · "다른 작업은 그대로 진행돼요" · DEV_WORDS 꼬리 · Options 풀이 → 0. `test_words.test_no_guide_lines` | 그 시험 |
| 12 | `MAC_RUN_PHASE1.md` 물음 1 → 결정 15 | 물음 1 → "승인 받음 — 결정 15, 범위 PLN `WEBAPP_PHASE1_CU_ASK_CLAUDE.md`, 더 넓으면 그것만 다시 여쭘", '하지 않으실 것' 7 · 맥 0-나 · 2 · 3 머리도 | `test_mac_run_question_1` |
| 13 | 회귀 · 커밋 둘 · 그림 390px | 92/92(환경 값 없이) · 코드 ebc3e66 · c49596e / 시험 627d872 · ed11f5a · 그림 아래 | — |

## 2. 현황 한 줄 표 (구현한 그대로)

| 때 | text | 바 | ask · 단추 |
|---|---|---|---|
| 살펴보는 중 | 보내신 것을 살펴보는 중이에요 | Intake 2 / 9 | — |
| 빠진 자료 · 소재 · 사실 물음 | 확인해 주세요(노랑) | Intake 2 / 9 | 물음 한 줄(빠진 자료 "시술 전 사진이 없어요") · 단추 둘이면 「더 보내기」 「이대로 만들기」, 셋 넘으면 칩(소재 · 사실 물음 — 3판에 그림 없음, 같은 틀) |
| 원고 쓰는 중 / 원고 확인 | 원고를 쓰는 중이에요 / 확인해 주세요 | Script 3 / 9 | 원고 줄 · 「이 원고로 갈게요 →」 「고칠 점 적기」(글자 수는 넘을 때만) |
| AI 얼굴 만드는 중 / 확인 | AI 얼굴을 만드는 중이에요 / 확인해 주세요 | Face 4 / 9 | 머리 색과 모양이 같은가요? ? · 사진 둘(만든 쪽에 "얼굴 : AI 합성") · 「이 사진으로 갈게요 →」 「다시 만들기」(다 쓰면 「개발자에게 넘기기」) · 머리 다름 띠 · 작은 「가진 사진 올리기」(여쭘 중 — 그대로 둠) |
| 편집 | 장면을 이어 붙이는 중이에요 | Edit 5 / 9 | — |
| ⑥ | 목소리를 넣는 / 음악을 넣는 / 목소리 간격을 맞추는 / 영상을 뽑는 중이에요 | Voice · Music · Fit · Export 7 / 9 | — |
| 다 됨 | 다 됐어요 — 확인해 주세요 | Done 8 / 9 | 영상 · 「승인」 「사진 앱에 저장」 「고칠 점 적기」(v1·v2 칩 · 규격 줄은 묶음 6) |
| 막힘 · 개발자 · 고르는 물음(⑥ · 얼굴) · 사용량 | **17번 뒤 — ARCH-008 글 그대로** + 빨간 바(사용량은 흐린 바) | 그 자리 | ⑥ · 얼굴 고르는 물음은 「골라 주세요」 + 칩 그대로 · ②③④ 멈춤은 Helpdesk 단추 하나 |

## 3. 증거 — 코드 c49596e · 시험 ed11f5a (이 PC 윈도 11 · Python 3.13.14 · 기본 cp949 · Chrome). 원본 [evidence/](evidence/)

- 시험 명령 · 환경 그대로: 제품 사본 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` → **92개 OK** [60](evidence/60_b4a_unittest_no_utf8_env.txt) (ed11f5a에서. 627d872에서도 90개를 두 번 돌려 둘 다 OK — 시각 · SSE 시험이 흔들리지 않음)
  - 새 `tests/test_one_job.py` 13: Busy 6(busy 때들 · now_line 표 · 덧붙임 3-3 · 5-1 · ? 글 · events/waits/`jobs.py log`) · Screen 2(app.html grep · MAC_RUN) · Http 5(409 + 한 편 안 더 보내기 · 3-1 · 개발자 뒤 새로 보내기 → hidden_at · 승인 → 풀림 · `/api/changes`). `test_words`에 안내 글 막는 검사 1
  - 바꾼 시험: 아래 5번 표
- 화면(헤드리스 Chrome · 390px, 코드 ebc3e66 — 덧붙임 2는 화면 코드를 바꾸지 않음) [61](evidence/61_b4a_screen_report.json) — **27/27**: 빈 Jobs 한 줄 · Send 켜짐 · Send 안내 글 0 · **새 편이 생기면 Send가 스스로 흐려짐(<5초)** · 화면 2 · **화면 3이 다시 읽지 않아도 스스로** · 화면 4(배지 1 · 칸 · 단추) · **3-1 그 자리 더 보내기(같은 묶음 · Jobs 그대로 · Send 흐린 채)** · 원고 확인 · 화면 5(사진 둘 · 합성 표시 · ? 글) · 화면 6(둘째 줄 0 · 배지 없음 · 개발 말/숫자 칸 0) · 막힘 빨간 바 · 화면 10 → 승인 → Post · Send 켜짐. 그림 [빈 Jobs](evidence/62_b4a_empty.png) · [2](evidence/62_b4a_s02_intake.png) · [4](evidence/62_b4a_s04_missing.png) · [5](evidence/62_b4a_s05_face.png) · [6](evidence/62_b4a_s06_making.png) · [7](evidence/62_b4a_s07_send_busy.png) · [8 막힘](evidence/62_b4a_s08_stop.png) · [10](evidence/62_b4a_s10_done.png). 도구 [screen_b4a_test.mjs](evidence/screen_b4a_test.mjs) · [screen_b4a_state.py](evidence/screen_b4a_state.py)(한 편을 때마다 바꿈) — 시험 폴더 · `127.0.0.1` 빈 포트 · 시험용 PIN/SECRET · `WEBAPP_RUNNER=0` · `WEBAPP_TICK_SECONDS=0`. 끝난 뒤 시험 서버 끔(포트 빈 것 확인)
- 바뀐 것: 3072e7e 대비 16파일 +838 −341 [63](evidence/63_b4a_diffstat.txt)

## 4. 바뀐 것 · 정한 것

1. 고침 `jobs.py` · `reel_api.py` · `server.py` · `runner.py` · `preflight.py` · `static/app.html` · `MAC_RUN_PHASE1.md` · `README.md` · `manual-webapp.md`. 시험 새 `test_one_job.py`, 고침 `_env.py`(`idle()`) · `test_runner.py` · `test_worker_face.py` · `test_suggest.py` · `test_words.py` · `words_allow.json`(줄 둘 — 화면에서 없어진 `SRC_WORD` · `pk.src` — 지움, 8 → 6).
2. '개발자에게 넘어감'(busy 아님) = ⑥ `dev` · 얼굴 `dev` · ②③④ 단계 멈춤(일꾼이 두 번 해 보고 멈춘 것 — 묶음 2의 '개발자가 볼게요'). 고르는 물음(⑥ · 얼굴 ask)은 확인 기다림이라 busy.
3. 바의 지금 단계 = 보이는 차례에서 확인 · 멈춤 단계 → 하는 중 → 기다림 순(옛 `summary`와 같음).
4. 안쪽 기록은 `save_status` 한 곳에서 이전 저장과 견줘 씀 — 단계 상태를 바꾸는 길(서버 · 일꾼 · 명령줄)이 여럿이어도 빠지지 않게. 답은 `note_event`.
5. `/api/changes` 연결은 끊겨도 서버가 다음에 쓸 때(바뀜 또는 15초 ping) 자리를 놓음 — 최대 15초 늦게 풀림.
6. `current_job`은 `created`(초) 순 · 같은 초면 번호 순.
7. 빈 Jobs 화면에 「⚙ 기본 옵션」을 남김 — 3판에 없지만 기본값을 저장하는 길이 이것뿐(지우면 기능이 사라짐). 아래 4-1.

### 4-1. 여쭘 (ARCH)

- **? 표의 '몇 번 더'**: `FACE_REMAKES = 3`(ARCH-008 [안] '운영자 다시 만들기 3번')에서 계산하면 처음 화면은 "**3번** 더" — 3판 글의 "2번 더"와 다름. 3판 글을 맞추려면 `FACE_REMAKES`를 2로(처음 + 다시 2 = 셋) 바꿔야 함. 지금은 계산 값 그대로 둠.
- 「⚙ 기본 옵션」을 빈 Jobs에 남길지(위 7).
- 「가진 사진 올리기」 — [여쭘 중] 그대로(작은 줄 단추로 둠).

## 4-2. 덧붙임 2 (`btsr/arch` 7701eb4 요청서 6번)

| # | 덧붙임 | 이 건에서 |
|---|---|---|
| 3-2 | busy 409는 `new_batch` · `batch/done`만, 같은 편 더 보내기 · 얼굴 사진 올리기는 열어 둠 | **덮음** — `server.new_batch`(job 없을 때만) · `/api/batch/done`(묶음 주인이 지금 편이 아닐 때만). `/api/batch {job}` · `/api/job/face upload`에는 검사 없음 |
| 3-3 | runner `next_item`은 hidden_at · 치운 편 항목을 집지 않음 | **이번에 더함**(c49596e) — `runner.gone(job)`, 사용량 쉼 계산에서도 뺌, 차례표 파일은 지우지 않음. 시험 `test_3_3_…` |
| 3-4 | Fit 물음 · 막힘 ① · 사용량 기다림 = busy, 일반 막힘(`_stop`) · dev = busy 아님 | **덮음** — ⑥ · 얼굴 `ask`와 사용량은 busy, `_stop`(②③④ 멈춤) · ⑥ · 얼굴 `dev`는 busy 아님(`handed_to_dev`) |
| 6-1 | 바 n = ORDER 자리 /9, Preview 건너뛰면 5 → 7 · 지금 단계는 summary 규칙을 ORDER 차례로 | **덮음** — `bar` · `cur_index`(확인 · 멈춤 → 하는 중 → 기다림, ORDER 차례, Face = 4) |
| 5-1 | ⑥ 한 줄은 parts 상태로 · auto_fit은 실행 전에 상태 저장 | **이번에 더함**(c49596e) — `now_line`이 끝나지 않은 첫 칸(parts)으로 · `auto_fit`이 `voice_fit.fit` 전에 Fit `now`를 저장. 시험 `test_5_1_…`(맞추는 동안 status.json · 한 줄을 읽어 봄) |

## 5. 걷은 여러 편 코드 목록

| 파일 | 지운 것 | 바꾼 것 | 남긴 것과 까닭 |
|---|---|---|---|
| `static/app.html` | Jobs 목록 화면(`#jobList` · `#todoAlert` · `#pracBox`) · `loadJobs` · `jobPill` · `stepPill` · `dotCls` · `JOBS` · `data-job` · 작업 화면 `#v-job`(「← Jobs」 · `#stepList` · 단계 카드 9장 · `outHtml` · `nowHtml` · `faceHtml` · `jobSig` · `refreshJob` 20초) · `STEPS` · `CIRCLED` · `ORDER` 사본 · 숫자 칸 · 보낸 뒤 토스트 · 안내 글 · 쓰지 않는 CSS 32줄 | `show`(탭 넷) · `setBadge`(1 / 없음) · `startJob`(곧바로 Jobs) · `answerQ` · 누르기(`data-act` 하나) · Helpdesk 단계는 키로 · 건의하기 문맥은 `now.bar.key` | `pracHtml`(Manual 「개발자용」 연습 줄) · `saveVideo` · Post 그대로 |
| `jobs.py` | `terra_band`(Jobs 맨 위 '기다리는 작업 n건' 띠) · `tick_all`의 '작업이 여럿이면 가장 오래된 편을 CapCut 맨 위로' | `write_collection` — 모든 ⑥ 작업(오래된 먼저) → 지금 한 편 · `DEV_WORDS` 꼬리 | `summary` · `jobs.py list`(개발자 — 빠진 편 표시 더함) · `FIRST_READY`(연습 프로젝트 맨 위 조건이 씀) · `mark_done` · `diy_steps` · `restore`(개발자 명령) |
| `reel_api.py` | `/api/jobs`의 `terra` | `six_now` · `face_view`의 "다른 작업은 그대로 진행돼요" 지움 · `/api/job` id 없으면 지금 한 편 | `/api/jobs`(Manual 「개발자용」 할 일 원문 · 연습 — 화면은 안 씀) · `six()`(개발자 · 시험이 봄) |
| `runner.py` | — | `next_item` — 빠진 · 치운 편 건너뜀(덧붙임 3-3) · `WHY` · `usage_words` 꼬리 · `six_dev` · `face_dev`의 R5.3 글 · 맨 위 올리기 주석 | 길(lane) 차례표 — 한 편 안에서도 일이 여럿(intake · script · edit · six · face)이고 사용량 쉼은 계정 단위라 그대로 |
| `preflight.py` | — | `target` — '⑥ 카드가 있는 가장 오래된 작업' → 지금 한 편 | — |
| `README.md` · `manual-webapp.md` | '작업이 여럿이면 …' · "점 8개" · 「하실 일 없어요」 · 손님 이름 줄 | Status · Daily · Workflow 글 | — |
| 시험 | `test_runner.Edit`의 '다른 작업 먼저' 부분 · `test_worker_face.Stops.test_2_one_dev_other_done` | → `Edit`(CapCut 기다림만) · `Stops.test_2_two_stops_dev`(두 번 → 개발자 · busy 아님), 409는 `test_one_job.Http` · `BatchDone` · `test_suggest.Regression`은 `_env.idle()`을 앞에 | `Usage.test_4_usage_line_waits_and_resumes`의 작업 둘 — 일꾼 수준의 '길 전체 쉼' 시험이라 그대로 |

## 6. 남은 것

1. 4-1 여쭘 셋.
2. 17번 뒤(4-a-2): 화면 8 · 9 · 「처음부터 시작」 · 맥 연결 · 사용량 · 빈 Jobs "지금 만드는 것이 없어요" + 「Send」 — 지금은 ARCH-008 그대로 + 바만.
3. 화면 10의 v1 · v2 칩 · 규격 줄 · 길이 · 「승인」 잠금 · 고칠 점 ? 표는 묶음 6.
4. 진짜 아이폰 Safari의 EventSource · 파일 고르기는 맥 시험(1차 끝)에서 — 여기는 헤드리스 Chrome.
5. 제품 main · 맥 — 하지 않음.

## 7. 배운 것

- 상태를 바꾸는 길이 여럿이면(서버 · 일꾼 · 명령줄 · 화면) 기록은 저장 한 곳에서 이전 값과 견줘 쓰는 것이 빠짐이 없음.
- '한 편만' 규칙은 시험 폴더를 같이 쓰는 시험들 사이에 새어 들어옴 — 시험마다 빈 화면(`_env.idle`)에서 시작해야 순서에 흔들리지 않음.
- 이 PC: Bash heredoc 안 `\\n`이 다시 깨짐(test_words) — 고침은 늘 파일로 쓴 스크립트(`tools/pt.py`)로.

## 8. 다음

- 반환함. 다음 일은 스스로 시작하지 않음(AAA 규칙 18).
