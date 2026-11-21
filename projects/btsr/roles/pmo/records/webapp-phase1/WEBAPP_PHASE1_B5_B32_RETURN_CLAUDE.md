# BTSR-ARCH-008 반환 — 웹앱 묶음 5 + 3-2 (작업자 한 대화 한 카드 · 막힘 흐름 · 사용량 · Face)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 5fbbea06, 승계로 이어 받음. 앞 부분 e4323cf는 옛 PRIMARY f3cf6938) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (Paseo d9520b95) |
| 쓴 때 | 2026-11-21 14:30 KST |
| 요청 · 설계 | `btsr/arch` b5d64f2 `WEBAPP_PHASE1_BTSR-ARCH-008_REQUEST_CLAUDE.md` · `WEBAPP_PHASE1_B5_B32_DESIGN_CLAUDE.md` 1판 |
| 결과 | 제품 가지 `feat/webapp-b5-b32-worker-face-20261121` **3072e7e** (push · 바탕 main 32b55dc) — e4323cf(앞 세션) → 449f378(코드) → 3072e7e(시험). **제품 main push 안 함 · 맥 일 안 함 · 명령줄 값 지어내지 않음(비워 둠)** |

## 1. 받아들임 기준 대조

| # | 기준 | 한 것 | 시험 |
|---|---|---|---|
| 1 | `worker.py` 일 하나 = 새 대화 = 카드 한 장 · 다음 칸은 서버가 · 값은 enum에서(비면 안 띄움) · `--help`에 없는 플래그 빼고 기록 | `runner.run_six` / `run_face` → `worker.run` 한 번 · 끝나면 서버가 다음 `six`를 차례표에. 카드는 `jobs.worker_card`(규칙의 '이어 가기' 대신 '끝내기 — 이 대화는 끝냄'). `MODEL_CLI` · `EFFORT_CLI` · `PERMISSION_CLI` 빈 값 그대로 → `not_ready` → '맥의 도우미가 준비되어 있지 않아요' 개발자 | 1 · 6 (`argv`가 `exec -m … -c model_reasoning_effort=… <권한> -`, `-c` 없는 help → 빼고 로그 `# 뺀 플래그: -c`, 저장소 값이 빈 것까지 시험) |
| 2 | 확인은 파일로 · 모델은 결과 줄 + Codex 기록 · 수동 3칸 없앰 · 시작 문 | 확인은 그대로(`tick` → `verify_claims` · `auto_fit` · `sync`) — 대화가 끝난 것만으로 넘어가지 않음, 결과 줄이 없으면 '다 했다는 줄이 없어요'로 멈춤. `model_seen`(Codex `rollout-*.jsonl`의 `turn_context`) = `MODEL_CLI` 견줌. 시작 문 `preflight.gate` — 띄우기 전 그 작업 프로젝트를 CapCut 목록 맨 위로 둔 뒤 봄(아래 4-3) | 1 · 5 |
| 3 | 막힘 ①–④ · 고르는 물음 표 · 개발자는 그 작업만 · 만들던 것 그대로 · `jobs.py resume` · Do It Myself / Mark Done 화면에서 없앰 | 아래 2번 표. 한 번 멈춤은 ⑥을 ⚠로 만들지 않고 '다른 방법으로 다시 해 볼게요'(`auto` 작업만 — 옛 작업은 전처럼). `jobs.py resume <작업> <voice\|music\|fit\|export\|face>`. `mark_done` · `diy_steps` · `restore`는 코드에 남김(개발자 명령 `jobs.py done` · `restore`) | 2 · 3a–3d |
| 4 | 사용량 `wait_usage` · `retry_at` · 길 전체 쉼 · 저절로 · 길 `claude`도 | 차례표 일 상태 `wait_usage` + `retry_at/retry_ts`, `next_item`이 그 길을 retry_at까지 쉬고 지나면 그 일부터. 결과 줄 `멈춤 · 사용량`은 칸 `stops`에 세지 않음(`usage_hit`). 시각: 출력의 `Try again at 3:05 PM` · 명령줄 claude의 `limit reached\|<유닉스 시각>`(지난 시각이면 무시) · 없으면 다음 아침 7시 KST. 다시 할 횟수(`tries`)를 쓰지 않음. 길 `claude` 한도도 failed 대신 같은 꼴 | 4 (셋) |
| 5 | Face 9단계 · 옛 작업은 Face done · `for_chatgpt/` 복사 · `face` 일 · 화5-2 · 편집에 얼굴 · 합성 표시 확인 | 원고 「좋아요」 → `ai_face.have`(또는 접수 표 없는 옛 작업)면 Face done → edit, 아니면 Face now → `face` 일. 시술 후 첫 장 → `for_chatgpt/after.<확장자>`, `face_<N>.png`가 이번 실행 뒤 · PNG/JPEG 머리말로 9:16(±2%) → `face_candidates` · Face check. `POST /api/job/face {approve\|remake\|upload\|dev}` · `/jobface/<작업>/<after.*\|face_N.*>`만. 편집 글에 고른 얼굴 · `ai_marks`(얼굴을 골랐으면 `ai: true` 장면 하나 이상 · 표시 글을 적었으면 'AI 합성' 포함) | 7 (다섯) · 8 (셋) |
| 6 | 화면 정리 · 남은 말 목록 묶음 5 줄 0 · 을/를 | 띠 · Copy Prompt · 「시작 전 점검」 · 모델 고르기 안내 · Do It Myself · Mark Done · Helpdesk 앱 열기(→ 「글 복사하기」 하나) 없앰. `words_allow.json` 묶음 5 줄 12개 + 3-2 줄 1개 지움(21 → 8). 조사는 e4323cf의 `jobs.josa` | 10 (`test_words` · `Small`) · 화면 21/21 |
| 7 | `MAC_RUN_PHASE1.md` 한 장 | `app/webapp/MAC_RUN_PHASE1.md` — 맨 위 '하지 않으실 것' 9줄(승인 전 맥 0-나 · 2 · 3 안 함, 값 짐작 안 함, 권한 A보다 넓게 안 함) → 맥 0-가(`--help` · 문서, 화면 조작 없음) → 0-나(화면 보기만 한 번, 승인 뒤) → 1(옛 `MAC_RUN_B2.md` — `intake_script`를 `intake`로 고침) → 2 → 3. `MAC_RUN_B2.md`는 합치고 지움. **돌리지 않음** | — |
| 8 | 회귀 · 코드/시험 커밋 · 명령과 환경 값 | 449f378 코드 · 3072e7e 시험. 아래 3번 | 78/78 |
| 9 | 맥 길 한 줄 | 아래 7번 | — |

## 2. 고르는 물음 표 (PMO가 더 지은 것 표시)

| 까닭 (어떻게 가름) | 물음 | 고를 것 → 하는 일 | 설계 / PMO |
|---|---|---|---|
| 음악 칸, 작업자 '멈춤' 줄에 음악·곡 + 못 찾/없 | 고른 음악을 못 찾았어요 | 비슷한 곡으로 → 카드에 "운영자가 골랐어요: …비슷한 다른 곡 하나…" 한 줄 넣어 다시 · 음악 없이 → 서버가 음악 칸 done(`music_none`) → Fit · Export · 개발자에게 넘기기 | 설계 |
| 목소리 칸, '멈춤' 줄에 목소리 + 못 찾/없 | 고른 목소리를 못 찾았어요 | 비슷한 목소리로 → 한 줄 넣어 다시 · 개발자에게 넘기기 | 설계 |
| Fit code 2(`원고를 줄여`) — 서버 일이라 **첫 번째에 바로** 물음(다시 해도 같음) | 원고가 길어 목소리가 영상보다 길어요 | 원고 줄이기 → `save_feedback(script)` → ③ 다시 확인 → ④ → ⑥ 처음부터 · 개발자에게 넘기기 | 설계 (바로 묻는 것은 PMO) |
| 그 밖의 Fit 오류 | — | 바로 개발자 | PMO |
| 얼굴: 두 번 못 만듦(못 만듦 · 9:16 아님 · 그림 없음 · 시간 넘김 · 시작 문) | AI 얼굴을 두 번 못 만들었어요 | 가진 사진 올리기(R32.4) · 개발자에게 넘기기 | **PMO** |
| 얼굴: 시술 후 사진이 없음 | 시술 후 사진이 없어 AI 얼굴을 못 만들어요 | 가진 사진 올리기 · 개발자에게 넘기기 | **PMO** |
| 얼굴: 운영자 「다시 만들기」 3번 다 씀 | (단추가 「개발자에게 넘기기」로 바뀜) | 개발자 | 설계 [안] |
| 서버 확인 실패(목소리 빠짐 · 음악 끝 다름 · 완성 영상 없음) · 시작 문 실패 · 결과 줄 없음 · 시간 넘김 | — | 첫 번째 → 새 대화로 다시(까닭 한 줄), 두 번째 → 개발자 | 설계 |
| 답을 넣어 다시 했는데 또 멈춤 | — | 개발자 | 설계 |

- 고를 수 있는 까닭은 작업자가 쓴 '멈춤' 줄(`멈췄어요 — …`)에서만 가름 — 서버 확인 실패 글은 고르는 물음으로 보내지 않음.
- 개발자: ⑥ `stop` + `dev {part, why, words}` · 화면 "두 번 해 봤는데 안 됐어요. 이 작업은 개발자가 볼게요 — 하실 일 없어요." + "다른 작업은 그대로 진행돼요." · 차례표에서 빠지고 저절로 다시 안 함. 작업자를 못 띄운 것(`not_ready` · 로그인)은 '맥의 도우미가 준비되어 있지 않아요…'로.

## 3. 증거 — 코드 449f378 · 시험 3072e7e (이 PC 윈도 11 · Python 3.13.14 · 기본 cp949 · Chrome). 원본 [evidence/](evidence/)

- 시험 명령 · 환경 그대로: 제품 사본 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` → **78개 OK** [50](evidence/50_b5_unittest_no_utf8_env.txt) (앞 52 + 새 26)
  - 새 `tests/test_worker_face.py` 26: Six(1 · 6 ×2 · 저장소 값 빈 것) · Stops(2 · 3a · 3b · 3b2 · 3c · 3d) · Usage(4 ×3: 결과 줄 · 출력 시각 · 길 claude) · Gate(5 ×2: 디스크 부족 → 띄우지 않고 두 번 뒤 개발자 · CapCut 켜짐 → 기다림) · Face(7 ×5 · 8 ×3) · Small(조사 · 다음 아침 · 화면에서 없앤 것/더한 것 · 남은 말 목록 0) · Http(`/jobface` 정한 이름만 · 401 · face/choose 400 · approve 200)
  - 가짜 작업자 `tests/fake_codex.py`: 결과 줄 · `data/output/<작업>_v1.mp4` · 9:16/16:9 PNG · Codex 기록(`turn_context`) · 만들던 파일(`made.txt`) · **둘이 같이 돌면 exit 3**(길 하나 확인)
  - 맥에서만 되는 것(CapCut 프로젝트 파일 읽기 · `voice_fit.fit` · 영상 규격 읽기)은 시험에서 '맞음'으로 바꿔 끼움 — 서버의 흐름 · 파일 확인 순서는 그대로. 진짜 품질은 맥 2
  - 고친 회귀 둘: `test_runner.test_limit_no_retry` → `test_limit_waits`(설계대로 동작이 바뀜) · `test_intake.test_7`의 작업을 얼굴 사진 있는 작업으로(없으면 Face가 먼저 — 설계대로)
- 화면(설계 시험 10) [51](evidence/51_b5_screen_report.json) — **21/21**: Jobs 점 9개 · 띠/점검 없음 → Face(보이는 차례 Send·Intake·Script·Face·Edit, ④번, 그림 둘 200 image/png, 세 단추 · 「다시 만들기 (2번 남음)」, 머리 다름 노랑 띠, 잠긴 줄, 개발 말 없음, 「이 사진으로 갈게요 →」 → Face 완료 · Edit 진행 · 차례표 edit) → 고르는 물음(셋 · ⚠ 겹침 없음 · 「음악 없이」 → Music 완료 · 차례표 six) → 개발자 → 사용량("아침 7시 뒤 저절로…") → '지금' 줄 → Helpdesk 「글 복사하기」 하나. 그림 [52 Face](evidence/52_b5_face_check.png) · [53 물음](evidence/53_b5_ask.png) · [54 개발자](evidence/54_b5_dev.png) · [55 사용량](evidence/55_b5_usage.png). 도구 [screen_b5_setup.py](evidence/screen_b5_setup.py) · [screen_b5_test.mjs](evidence/screen_b5_test.mjs) — 시험 폴더 · `127.0.0.1` 빈 포트 · 시험용 PIN/SECRET · `WEBAPP_RUNNER=0` · `WEBAPP_TICK_SECONDS=0`. 끝난 뒤 시험 서버 끔(프로세스 0 확인)
  - 화면 시험 첫 판에서 Face 칸에 "머리 색과 모양이 같은지 봐 주세요."가 두 번(카드 + 단계 안내) 보여 하나를 뺌 → 다시 21/21
- 바뀐 것: 32b55dc 대비 18파일 +1734 −269 [56](evidence/56_b5_diffstat.txt)

## 4. 바뀐 것 · 정한 것

1. 새 `tests/fake_codex.py` · `tests/test_worker_face.py` · `MAC_RUN_PHASE1.md`. 고침 `runner.py` · `jobs.py` · `reel_api.py` · `preflight.py` · `worker.py` · `static/app.html` · `agents/creative_director/manual-webapp.md` · `tests/fake_claude.py`(edit_ai_ok · edit_ai_badlabel) · `tests/test_runner.py` · `tests/test_intake.py` · `tests/words_allow.json`. 지움 `MAC_RUN_B2.md`(맥 1로 합침).
2. **얼굴 결과 줄은 따로 파일** `data/working/<작업>/face_result.txt` — ⑥ `chatgpt_result.txt`의 줄 세기(`result_lines`)와 섞이지 않게. 정규식 `얼굴: 저장함|머리 다름|못 만듦` (설계 2-3의 '같은 정규식에 더함' 대신).
3. 시작 문 앞에 그 작업 프로젝트를 CapCut 목록 맨 위로 — 작업이 여럿이면 서버 `tick_all`이 모음 카드 맨 위(가장 오래된 작업)를 올려 두므로, 그대로 두면 다른 작업 차례에서 C5 · C9가 늘 실패함(코드를 보다 찾음 · 맥에서 확인 필요).
4. 시작 문은 '아직 모르는' 칸을 막지 않음 — 내보낸 영상이 하나도 없으면 C2(내보내기 기본값)는 모름이라 첫 작업이 영영 못 감. AI 얼굴은 C8 · C11만 봄(CapCut을 안 씀). CapCut이 켜져 있으면 실패가 아니라 기다림(④와 같은 꼴).
5. 저장되는 값: 옛 작업(⑥ `auto` 없음)은 전처럼 멈춤이 ⚠. 옛 8단계 작업은 Face done('해당 없음'). 접수 표가 없는 작업은 원고 「좋아요」 뒤 바로 ④.
6. `preflight` C6이 윈도에 없는 `os.getuid`로 넘어지던 것을 건너뜀(맥 동작 같음) — 시작 문 시험에서 드러남.

## 5. 남은 것

1. **명령줄 값 · 화면 조작 여부 · 권한 플래그는 비어 있음** — 맥 0에서. 설계 5번 승인 한 장의 '권한' 칸도 맥 0 전이라 비어 있음. ARCH가 전한 한알 13:57:21 컴퓨터 유즈 범위 승인은 PLN 전달 전이라 `MAC_RUN_PHASE1.md` 물음 1로 둠.
2. 저장 창에서 곧바로 `for_chatgpt/`에 저장하는 길(맥 3)은 시험 안 됨 — 안 되면 「가진 사진 올리기」로 일이 멈추지 않음.
3. 시험 9(Fit 뒤 +1초 · 규격)는 이번에 고친 곳이 아님(`voice_fit` · `sync` 그대로) — 새 시험을 더하지 않았고 회귀(ExportsApprovals 등)만.
4. 고르는 물음 까닭 가름은 작업자 '멈춤' 줄의 글자(못 찾/없 + 음악·곡/목소리)로 — 진짜 작업자 글은 맥 2에서 보고 다듬어야 함.
5. `/api/job/part`(Mark Done) · `/api/preflight/check` 주소는 남김(화면에서만 없앰) — 지울지 봐 주세요.
6. 제품 main · 맥 — 하지 않음.

## 6. 배운 것

- 서버가 '맨 위'를 한 작업 기준으로 맞추는 코드(모음 카드)와 일꾼이 작업마다 도는 코드가 만나면 점검이 엇갈림 — 사람 손을 없앨 때는 사람이 맞춰 주던 것(목록 맨 위)을 일꾼이 직접 맞춰야 함.
- '모름'과 '틀림'을 한 칸(ok False)에 두면 자동 문이 처음부터 닫힘 — 점검 칸에 `known`을 따로.
- 이 PC: Git Bash `kill $!`은 `nohup`만 죽이고 그 아래 python(WindowsApps 실행기)은 남음 — 시험 서버는 포트 주인(`Get-NetTCPConnection`)으로 찾아 끔.

## 7. 맥 길 한 줄 (적어 두기만)

맥 Claude 창에 "app/webapp/MAC_RUN_PHASE1.md대로 해 줘" — 가지 `feat/webapp-b5-b32-worker-face-20261121`(3072e7e)를 `~/oc-test/p1`에 따로 꺼내 맥 0-가(`codex --help` · `codex exec --help`, 화면 조작 없음)부터, 승인 전에는 맥 0-가 · 맥 1만.

## 8. 다음

- 반환함. 다음 일은 스스로 시작하지 않음(AAA 규칙 18).
