# webapp-phase1 고침 3 (작업자 사용량 가림 · 맥 작업자 한 편) — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN 요청 `btsr/pln` `WEBAPP_PHASE1_WORKER_LIMIT_FIX3_REQUEST_CLAUDE.md` 본문(가–바) + 덧붙임 라(74ed866 · d1bd29b · e618371) · 2(657d56d) · 3(ddc378a) · 4(0db309b) — PMO 건 [BTSR-ARCH-022](WEBAPP_PHASE1_BTSR-ARCH-022_REQUEST_CLAUDE.md) + 덧붙임 1–4 |
| 반환 시각 | 2026-11-22 04:12 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` 7016664 `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_WORKER_LIMIT_FIX3_RETURN_CODEX.md` (PMO Paseo 512aef6d) |
| **합칠 머리** | 제품 `feat/webapp-worker-limit-fix3-20261122` **09655cd**(원격 ls-remote로 봄 · 커밋 10개) — 바탕 = 지금 제품 main **5bbe272**(조상 → 앞으로 감기 됨) |

## 1. 결과

**받음 — 가 · 마 · 다 · 나 · 사 · 아 · 차 · 카 됨, 자 · 라는 정한 대로 코드 0.** 고친 곳과 시험을 짝지어 하나씩 봄(2번). 새 화면 · 새 단추 0. 제품 main push · 맥 일 없음. **맥의 그 편은 합친 뒤 아래 한 줄로 풂**(4번) — 옛 판에서는 풀지 않음.

## 2. 증거 (ARCH가 다시 본 것)

- 바뀐 곳: `git diff --numstat 5bbe272 09655cd` = `worker.py`(+3 −1) · `runner.py`(+207 −60) · `jobs.py`(+90 −29) · `devpush.py`(+60 −2, ARCH가 03:43 더함) · 시험 `fake_codex.py` · `test_worker_face.py` — 여섯 파일뿐.
- 시험: `git archive 09655cd | tar -x` 새 임시 폴더 · 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 PYTHONDONTWRITEBYTECODE=1 python -m unittest discover -s app/webapp/tests`
  - 이 PC 기본 파이썬: **Ran 187 · OK (skipped=32)**(Playwright · `cryptography` 없음).
  - 저장소 밖 임시 가상 환경(Playwright + `cryptography`): **Ran 187 · OK · 건너뜀 0**. 임시 폴더 · 가상 환경 지움.
  - PMO가 본 '기본 첫 실행 `test_runner.Claude.test_login` 1건 실패(stop 대신 now)'는 ARCH의 두 실행에서 다 통과 — 처음 돌 때만 가끔 지는 시험(전에 본 test_recent · test_nofile과 같은 꼴, 결정 45로 안 고침)으로 봄.
- 하나씩 대조:

| # | 고친 곳 (09655cd) | 재는 시험 | 판단 |
|---|---|---|---|
| **가** | `worker.py` — 카드의 줄을 뺀 출력(`diagnostic`)에 한도 말이 있고 **rc ≠ 0**일 때만 `limit`(`"멈춤" in out` 갈래 걷음). `jobs.py` `read_results` — 결과 줄이 **꼭 `멈춤 · 사용량` 하나뿐**(`USAGE_LINE.fullmatch`)일 때만 `usage_hit` · 섞인 멈춤은 그 까닭으로 멈춤 · 옛 판이 이미 읽은 섞인 줄도 한 번 바로잡음. `runner.py` — 작업자 뒤 **결과 파일 먼저**(`_finish_six_result` · `_finish_face_result`), 칸이 됐으면 CLI가 한도를 알려도 됨 | `test_echo_completed_cards_and_verified_results_before_cli_limit` · `test_echo_stops_keep_the_reason_in_all_four_cards` · `test_real_limits_on_all_four_cards` · `test_nonzero_echo_alone_and_short_voice_success` · `test_previous_version_mixed_stop_is_recovered_once` (목소리 · 음악 · 내보내기 · 얼굴) | 됨 |
| **마** | 시작 전 점검이 막으면 `_wait_preflight` — 멈춤으로 안 셈 · 작업자 안 띄움 · 점검 글을 현황 줄(`gate_note`)에 · 30초 뒤 다시 · ⑥ · 얼굴 | `test_battery_gate_in_jobs_waits_thirty_seconds_then_runs` | 됨(C8 자체는 그대로) |
| **다** | 카드 글 `CARD_TIMING`: 첫 걸음 = CapCut 켬 → 최근 목록에서 전체 이름 대조 → 편집 화면 확인 · 3분은 편집 화면 뒤부터 · 첫 연결 시간 초과는 10초 뒤 한 번 더(셈에 안 넣음) · 두 번째도면 `멈춤 · 맥에 허락 창이 떠 있어요 — 맥 앞에서 한 번 허용해 주세요`(덧붙임 1) | `test_permission_stop_in_jobs_on_retry_and_developer_handoff` | 됨(진짜 3분은 맥에서) |
| **사** | 카드에서 `pgrep` 걷음 — 「Cmd+Q를 보낸 뒤 바로 결과 줄」 · 꺼짐은 서버(`capcut_running(fresh=True)`) | `test_server_waits_for_capcut_to_close_without_relaunch` · `test_normal_quit_finishes_each_card_without_requeue` | 됨 |
| **아** | 멈춘 목소리 · 음악은 다시 하기 전에 `J.recheck_stopped_audio` — 저장본이 맞으면 그 칸 됨 → 다음 칸(작업자 0번) · 빠진 곳만 있으면 그곳만 고치는 카드 · 못 읽으면 다시 안 하고 개발자 | `test_resume_saved_six_voices_runs_only_music_and_reads_picks` · `test_saved_music_advances_to_export_without_repeating_music` · `test_stopped_voice_repairs_only_missing_caption` · `test_unreadable_saved_voice_or_music_goes_to_developer` | 됨 |
| **차** | 작업자 뒤 CapCut이 켜져 있으면 `osascript … to quit` **한 번** → 30초 동안 2초마다 봄 → 아니면 「CapCut이 꺼지지 않았어요 — 맥에서 CapCut을 꺼 주세요」(멈춤 0 · 「꺼지면 이어서」가 덮지 않음) · 꺼지면 같은 결과로 이어 감 · 재시작해도 결과 보존(`pending_result`) · 강제 끄기 0 | `test_quit_uses_only_normal_apple_event_and_handles_command_failure` · `test_server_waits_for_capcut_to_close_without_relaunch` | 됨 |
| **카** | 카드 글 `WORKER_LOG_RULE`(네 카드 공통 + 얼굴) · 로그 `runs/<순번>_<종류>_t<번째>.worker.md`(`data/` 아래 — 깃헙 밖) · 개발자 글(`devpush.note_text`)에 그 칸 로그 끝 20줄 · 소재 이름 → '소재 N' · 소재 꼴 이름 · 비밀 값 줄은 지움 · 로그 없으면 아무것도 안 붙임(멈춤 아님) | `test_developer_receives_only_last_twenty_anonymized_worker_lines` · `test_usage_retry_keeps_each_attempts_own_worker_log` · `test_developer_reads_the_stopped_parts_log_after_other_card` | 됨 |
| **나** | `runner.resume_wait_usage()` — 지금 편의 mac_gui 사용량 기다림 **한 건만** `queued`로(서버와 같은 작업 파일 잠금) | `test_resume_command_wakes_only_the_waiting_job` | 됨(4번 한 줄) |
| 자 | 코드 0 — 4번 한 줄이 `J.project_picks`로 저장본의 `tone_type`을 찍음 | (위 아의 첫 시험이 picks를 읽음) | 정한 대로 |
| 라 | 코드 0(다의 까닭 줄만) — 고침 4는 4번 한 줄의 결과 뒤 PLN이 정함 | — | 정한 대로 |

## 3. PMO가 정한 것 — ARCH 판단

| 정한 것 | 판단 |
|---|---|
| CapCut이 켜져 있는 동안은 결과 줄을 읽지 않고 보류(`read_results`) | 받음 — 작업자가 Cmd+Q로 저장을 마치기 전 저장본 대조를 막음 |
| 작업자 결과를 `pending_result`로 남긴 뒤 종료를 기다림 · 재시작하면 종료 안내로 | 받음 — 끝난 작업자를 다시 띄우지 않음 |
| 개발자 글에서 소재 꼴 이름(확장자) · 비밀 값 꼴 줄은 줄째 지움 | 받음 — 개인 앱이어도 손님 파일 이름을 내보내지 않는 기존 규칙(AGENTS 5) 안 |
| 사용량 기다림 뒤 다시 할 때 앞 실행 로그를 덮지 않게 번호를 올림 | 받음 |

## 4. 맥 한 줄 — 합친 뒤 한알이 「코덱스 excutor」에 그대로 (새 판 받기 + 그 편 이어 가기 + 라 읽기)

> 오늘 한 장 1번 줄대로 제품 사본을 새 main으로 받고 웹앱을 다시 켠 뒤, 제품 사본 맨 위에서 `python3 -c "import sys; sys.path.insert(0,'app/webapp'); import jobs as J, runner; job=J.busy(); print(J.project_picks(J.project_name(job)) if job else None); print(runner.resume_wait_usage())"` 를 한 번 실행해 두 줄 출력을 그대로 적어 줘. 이어서 바꾸지 말고 읽기만: `codex --version` · `grep -n computer_use ~/.codex/config.toml`(없으면 '없음') · ChatGPT 설정 Computer Use의 '항상 허용한 앱' 목록. 그 편이 음악 · 내보내기로 이어 가는 동안 허락 창이 뜨면 누르지 말고 창 맨 위 앱 이름과 단추 글을 그대로 적은 뒤 나에게 알려 줘 — 허용은 내가 맥에서 한 번 누름.

- 둘째 줄이 「… 다음 돌기에 이어 갑니다.」면 됨 — 목소리 6/6 · 1.5배가 저장본에 있으면 목소리는 다시 안 넣고 음악부터(아).
- 첫 줄의 목소리 이름(`tone_type`)이 고른 「느긋한 언니」와 다르면 → 자를 꼭으로(고침 4와 함께).
- 허용을 누르는 것은 이끄는 ChatGPT가 아니라 한알(결정 42 — 권한 창에서 멈춤).

## 5. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 022 요청서 + 덧붙임 1–4 · 이 반환서 · CURRENT · INDEX.

## 6. 남은 것

1. **제품 main 합치기**: RSCH가 차이를 읽고 Playwright 깐 곳에서 다시 돌린 뒤 앞으로 감기(IVA 다시 안 함). 합칠 머리 **09655cd**, 지금 main 5bbe272. 그 뒤 4번 한 줄.
2. 진짜 맥에서만 볼 것: CapCut 첫 연결 · 3분 · 허락 창(라) · 정상 종료 요청에 macOS '제어 허락' 창이 처음 뜨는지 · 로그가 실제로 자세히 쓰이는지.
3. 고침 4(라 — 허락 창 주인 · 실행마다 뜨는지)는 4번 결과 뒤 PLN이 정함. 설정 파일 allow는 그때 한알께.
4. 다음 맥 글 덧붙임 때 3-2 · 개발자 글 전송 켜기 '나중에 따로'(전부터 남은 것).

## 7. 배운 것

- 작업자의 출력으로 '한도'를 가를 때는 **우리가 넣은 글(카드)을 먼저 빼고** 본다 — 카드가 규칙을 설명하려고 쓴 낱말이 그대로 판단 낱말이 됨.
- 작업자가 스스로 하는 '끝 확인'은 샌드박스 안에서 안 될 수 있음 — 확인은 서버가, 작업자는 할 일까지만.
- 이번처럼 덧붙임이 넷 이어 올 때 같은 가지 · 반환 하나로 이어 받으면, 한 걸음마다 +10–25분으로 들어감(03:15 요청 → 04:03 반환 커밋).
