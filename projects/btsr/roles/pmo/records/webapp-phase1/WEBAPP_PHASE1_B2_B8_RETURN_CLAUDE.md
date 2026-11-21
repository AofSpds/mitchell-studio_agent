---
item: BTSR-ARCH-004_webapp-b2-b8-runner-templates
stage: 반환 (맥 시험 9는 손이 필요 — 맥 순서 한 장을 함께 드림)
written_role: MITCHELL_STUDIO/BTSR/PMO (PRIMARY — Paseo f3cf6938, Claude Opus 5.5 high)
recorded_at: 2026-11-21 13:17 KST (PowerShell 확인)
requester: MITCHELL_STUDIO/BTSR/ARCH (Paseo 9d298a54)
request: 가지 btsr/arch 96d66a1 projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-004_REQUEST_CLAUDE.md · 설계 WEBAPP_PHASE1_B2_B8_DESIGN_CLAUDE.md 1.1판
---

# BTSR-ARCH-004_webapp-b2-b8-runner-templates — 반환

## 1. 결과

**설계 1.1판 2 · 4번대로 짰고, 이 PC에서 가짜 `claude`로 시험 38/38 · 화면 5/5. 진짜 `claude` 한 번(시험 9)과 맥의 플래그 확인은 맥 손이 필요 — 순서 한 장을 드림.**
제품 저장소 가지 **`feat/webapp-b2-b8-runner-20261121`** 머리 **`658ec1d`** (바탕 `6cfbc5f` = 지금 main, push함 · main 합치기 안 함).

| 기준 | 결과 |
|---|---|
| 1 보내기 끝 → 작업 (R2.1) | `POST /api/batch/done {batch}` → `jobs.job_from_batch`: 작업 번호 = batch 이름(겹치면 `-2`, 손님 코드 · 시술 이름 없음), `new_job` + 템플릿 판, 차례표에 `intake_script`. 같은 batch는 `incoming/<batch>/job.txt`로 같은 작업. 빈 묶음 · 이상한 이름 400, PIN 401, 머리말 403. 화면은 다 보내면 바로 그 작업 화면(실패하면 「다시 시작하기」) |
| 2 차례표 · 일꾼 (R2.3) | 새 `app/webapp/runner.py` — `data/working/_queue/<순번>_<작업>_<종류>.json`, 끝나면 `_queue/done/`(지우지 않음). 길 `claude`(intake_script · edit) · `mac_gui`(자리만), 길마다 일꾼 스레드 하나(`server.py`가 ticker 옆에 띄움, `WEBAPP_RUNNER=0`이면 끔). 실패한 일만 멈추고 다음 일로. 다시 켜질 때 running 일: tries 1 → 다시, 2 → failed("하던 중 맥이 다시 켜졌어요"). 같은 작업 · 같은 종류가 안 끝났으면 두 번 넣지 않음 |
| 3 맥 Claude 부르기 | `claude -p --output-format json --permission-mode acceptEdits --allowedTools <목록> [--max-turns 40]` + 일 글은 표준 입력, cwd = 저장소 맨 위, timeout 15분(`WEBAPP_CLAUDE_TIMEOUT`). 실행 파일 `WEBAPP_CLAUDE_BIN` → PATH + `/opt/homebrew/bin` · `/usr/local/bin` · `~/.local/bin` · `~/.claude/local`. **`claude --help`를 한 번 읽어 그 판에 있는 플래그만 씀** — 없어서 뺀 것은 일 파일 `dropped_flags`에 남김. **이 PC의 Claude Code 2.1.292 도움말에는 `--max-turns`가 없음**(나머지 넷은 있음 — [evidence/23](evidence/23_claude_help_this_pc.txt)) → 맥 판은 맥 순서 1)에서 확인. 출력은 `data/working/<작업>/runs/<순번>_<종류>_t<번째>.log`(명령 줄 · rc · 걸린 시간 포함), 끝난 뒤 파일로 확인, 실패면 한 번만 다시(한도 글이면 다시 하지 않음) |
| 4 물음 (2-4) | Claude가 `questions.json` + `intake check` → 작업 화면 접수 칸에 물음과 글 칸 → `POST /api/job/answer` → `answers_<시각>.json` → 차례표에 이어 하기(일 글에 답 파일 경로) |
| 5 runs · 이유 · 잠금 | `status.json` `runs`에 쌓음(덮어쓰지 않음). 멈춤 이유는 설계 2-5 표의 글 그대로. 잠금: `jobs.status_lock(job)` — 작업마다 RLock + `.status.lock` 파일 잠금(맥 `fcntl.flock`, 윈도 `msvcrt`), `save_status`를 부르는 함수 10개(`set_step` · `set_picked` · `sync` · `mark_done` · `tick` · `toggle_posted` · `write_handoff` · `restore` · `set_phase` · 새 `set_title`)와 `reel_api`의 승인 · 답에 씌움 |
| 6 ④ 편집 (R2.5) | 원고 「좋아요」 → 차례표에 `edit`(일 글 `prompts/edit.md`: scenes.json → `capcut_build.mjs --dry-run` → 만들기). CapCut이 켜져 있으면 그 일만 건너뛰고(차례는 맨 앞에 남음) 같은 길의 다른 작업이 먼저, ④ 칸에 "CapCut이 꺼지면 이어서 할게요", 30초마다 다시 봄. 끝난 뒤 확인: ④ done · scenes.json · `CAPCUT_DRAFTS_DIR`에 프로젝트 폴더. ④ done → 지금처럼 ⑥ 카드 |
| 6' 남는 손 인계 (R2.4) | ③ ⑥ 시작(Codex 앱에서 "작업 카드대로 해 줘" — 묶음 5) · ④ 「고칠 점」 뒤 "작업 확인"(묶음 6). **② 업로드 확인은 없앰** |
| 7 템플릿 (R8.1–R8.3) | 저장소 맨 위 `templates/README.md`(판 규칙) · `templates/reel-main/TEMPLATE.json`(current r1) · `r1.md` = `agents/rsch/templates/reel-workflow.md`(2df4263) 내용 그대로 + 머리 주석(상대 링크 3개만 새 자리에 맞춤). 옛 파일은 지우지 않고 맨 위 한 줄. 작업마다 `template: {id, rev, path, sha256}`, 일 글은 그 판 경로. `exports`(규격만 `spec_ok` + `spec_bad`, 겹침 · 작업 밖은 `checks`) · `approvals`(`v` · `spec_ok_at_approval`) 쌓기, `output_info` · `approved_at`은 옛 화면용 그대로 |
| 8 말 | `words_allow.json` ② 줄 3개 지움(24 → 21), AI 얼굴 줄 `3` → **`3-2`**. 바꾼 말에 저장되는 값 없음(새 글은 note · reason · 새 칸뿐). `runner.py`도 말 시험에 넣음 — 새 개발 말 0 |
| 9 회귀 | 묶음 1 시험 · 작업자 모델 시험 · ⑥ tick(결과 줄 '멈춤' → 그 칸만 멈춤 · 모델 Sol 통과) 모두 통과 |
| 10 맥에서 진짜 claude | **아직** — 맥 손 필요. 아래 '맥 순서' |
| 11 맥 길 | 아래 |

### 맥에 들어가는 길 (한 줄 — 합치기 전, 가지로. **맥 시험 9가 끝난 뒤**에)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b2-b8-runner-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

- 웹앱을 다시 켜면 일꾼이 같이 켜짐. 웹앱 로그 첫 줄에 "일꾼 켜짐: 길 claude, mac_gui · 실행 파일 <경로 또는 못 찾음>" — **'못 찾음'이면 launchd 환경에서 claude를 못 찾은 것**(그때는 `config/runtime.env`가 아니라 launchd plist의 환경에 `WEBAPP_CLAUDE_BIN=<맥의 claude 경로>`를 넣어야 함 — 맥 순서 1)의 `which claude` 값).

### 맥 순서 (시험 9) — ARCH → PLN → 한알께

제품 가지의 **`app/webapp/MAC_RUN_B2.md`** 한 장. 맥에서 이미 쓰시는 Claude 창에 "app/webapp/MAC_RUN_B2.md대로 해 줘" 한마디.
- **하지 않으실 것(맨 위):** 새 터미널 X · 웹앱 다시 켜기 X · `~/mitchell_studio` 가지 바꾸기 X(시험은 `git worktree`로 따로 만든 `~/oc-test/b2`에서만) · 손님 사진 X · CapCut 켜기 X · 로그인/설정/결제 X · main에 올리기 X.
- **물음 1(번호로):** ④ 편집까지 진짜로? **1 = 접수 · 원고까지만(권고)** · 2 = 편집까지(맥 CapCut 목록에 시험 프로젝트 하나가 생기고 지우지 않음). — 요청 기준 10은 '편집까지'라 적혀 있으나, 편집은 실제 CapCut 목록에 쓰므로 한알 결정이 필요하다고 봄.
- 결과는 맥 Claude가 `app/webapp/MAC_RUN_B2_RESULT.md` 하나를 이 가지에 올림('네' 한 번). 그 뒤 PMO가 명령 · 걸린 시간 · 로그 자리를 이 반환서에 덧붙임.

## 2. 증거 — 코드 `a1ccbf0`을 시험 `a1ccbf0`으로 (이 PC 윈도 · Python 3.13 · Chrome 157, 13:1x KST). 원본 [evidence/](evidence/)

- [20_b2_unittest.txt](evidence/20_b2_unittest.txt) — **38개 OK** (새 `test_runner.py` 18 + 묶음 1 · 작업자 모델 20). 가짜 `claude` = `tests/fake_claude.py`(꼴 그대로 받아 정한 대로 — 진짜 Claude 안 부름).
  - 시험 1: 성공(접수 done · 원고 check · 제목 · runs · 로그 파일 · 차례 done/로 · 명령 줄 `-p … --allowedTools … --max-turns`) · rc 1 / 결과 파일 없음 / timeout / 로그인 안 됨 / 실행 파일 없음 → 한 번 다시 → 멈춤 + 그 이유 글 · 한도 → 다시 안 함 · rc 1 뒤 성공 → done · `--help`에 `--max-turns`가 없으면 빼고 남김 · 물음 → 답 → 이어 하기
  - 시험 2 · 3: 둘 가운데 하나가 실패해도 다른 하나는 끝까지 · 같은 일 두 번 안 넣음 · 다시 켜질 때 tries 1 → 다시, 2 → failed + 이유
  - 시험 4: `/api/batch/done` (진짜 서버를 시험 폴더로) — 빈 묶음 400 · 작업 생김 · 두 번이면 같은 작업 · 차례표에 intake_script 하나 · 템플릿 r1 · 401 · 403 · 이상한 이름 400
  - 시험 5: **두 프로세스가 100번씩 같은 작업을 고침 → counter 200(하나도 안 잃음) · JSON 멀쩡** (이 PC는 `msvcrt` 잠금 — 맥 `fcntl`은 맥에서 같은 시험으로)
  - 시험 6-1: CapCut 켜짐 → edit 건너뜀 · 다른 작업 접수가 먼저 · ④ 칸 기다림 글 → 꺼지면 edit → ④ done → `handoff_chatgpt.md` 생김
  - 시험 6: 작업에 template r1(sha256 맞음) · current를 r2로 옮긴 뒤 새 작업만 r2, 진행 중 작업과 일 글은 r1 · 옛 판 파일 그대로
  - 시험 7: v1(fps 25) · v2 → exports 둘(`spec_ok` 거짓 · 참, `spec_bad`) · v1 · v2 승인 → approvals 둘(`spec_ok_at_approval` 거짓 · 참) · `approved_at` = 마지막
  - 시험 8: 묶음 1 시험 · 작업자 모델 시험 · ⑥ tick
- [21_b2_screen_report.json](evidence/21_b2_screen_report.json) — 휴대폰 폭 화면 5/5: 보내기 끝 → 작업 화면이 열림 · ② 안내 없음 · 접수 물음과 글 칸 · 빈 답은 안 보냄 · 답을 보내면 물음이 사라지고 "답을 받았어요 — 이어서 할게요"(차례표에 이어 하기 들어감 확인). 그림 [22](evidence/22_b2_question.png). 시험 스크립트 [screen_b2_test.mjs](evidence/screen_b2_test.mjs)(저장소 밖 시험 도구)
- [24_b2_diffstat.txt](evidence/24_b2_diffstat.txt) — main 대비 19파일 +1230 −33.

## 3. 바뀐 것 (제품 저장소, main `6cfbc5f` 대비)

- 새: `app/webapp/runner.py` · `app/webapp/prompts/intake_script.md` · `edit.md` · `templates/README.md` · `templates/reel-main/TEMPLATE.json` · `r1.md` · `app/webapp/MAC_RUN_B2.md` · `tests/test_runner.py` · `tests/fake_claude.py`
- 고침: `jobs.py`(잠금 · 템플릿 기록 · exports · `set_title` · `job_from_batch` · CLI `title`) · `reel_api.py`(`/api/batch/done` · `/api/job/answer` · 승인 뒤 edit · approvals · 작업 화면에 questions · queue) · `server.py`(일꾼 띄우기) · `static/app.html` · `manual-webapp.md` · `agents/rsch/templates/reel-workflow.md`(맨 위 한 줄만) · 시험 파일 셋
- 맥 쪽은 아직 아무것도 안 바뀜.

## 4. 남은 것

1. **맥 시험 9**(진짜 claude 한 번) · 맥의 `claude --help` 플래그 확인 · 맥 `fcntl` 잠금 시험 — `MAC_RUN_B2.md`. 물음 1(편집까지?)은 한알 결정.
2. **launchd에서 claude 찾기** — launchd로 뜬 웹앱의 PATH에는 흔히 `~/.local/bin` 등이 없음. 코드가 흔한 자리를 더해 찾지만, 못 찾으면 `WEBAPP_CLAUDE_BIN`을 plist에 넣어야 함(맥 결과 보고 정함).
3. **`--max-turns`** — 이 PC 2.1.292에는 도움말에 없음 → 빼고 부름(timeout 15분이 대신 막음). 맥 판에 있으면 씀.
4. **일 글의 `--allowedTools` 범위** — edit에 `Bash(node app/scripts/capcut_build.mjs:*)` · `Bash(ffprobe:*)`를 더함(설계 목록 밖 — 편집 순서에 꼭 필요). 맞는지 봐 주세요.
5. **제품 main 합치기** — 안 함. 맥 시험 9 뒤가 맞다고 봄.
6. 접수 일 글(`prompts/intake_script.md`)은 README "업로드 확인" 순서에서 `jobs.py new`를 빼고 '묻지 말고 questions.json'을 넣은 것 — 원고 품질은 맥 시험 9에서 처음 봄.

## 5. 배운 것

- 윈도 시험에서 '편집 끝' 길은 맥 전용 `pgrep`을 부름 → 가짜 claude가 부르는 `jobs.py`만 CapCut 확인을 '꺼짐'으로 바꿔 부르게 함(맥에서는 그대로).
- 공유 시험 폴더에서는 '모음 카드 전체에 6.2가 없음' 같은 넓은 단언이 다른 시험 작업 때문에 깨짐 → 보려는 부분(머리)만 봄.
- 제품 main push가 자동 심사에서 막힌 적이 있음(ARCH-005) — 기능 가지 push는 됨. main 합치기는 그때마다 막힐 수 있다고 보고 보고서에 '막히면 멈춤'을 적어 둠.

## 6. 다음

- 반환함(맥 시험 9는 손 필요). 다음 일은 스스로 시작하지 않음(AAA 규칙 18). 맥 결과 파일이 올라오면 읽고 이 반환서에 덧붙임.
