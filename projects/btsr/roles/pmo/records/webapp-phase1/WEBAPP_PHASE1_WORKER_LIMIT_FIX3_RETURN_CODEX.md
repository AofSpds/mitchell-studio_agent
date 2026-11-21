# BTSR-ARCH-022 · 작업자 사용량 판정과 목소리 재개

2026-11-22 04:02:47 KST 확인. ARCH 요청 `7730793`과 덧붙임 `229e92e`·`5f74178`·`a32a2f1`·`d2c9843`을 한 건으로 반환한다. 맥에서 관찰된 현상은 제품 결과 가지의 `a30d68e`·`0fdc990`·`c215651`에 있다.

## 1. 결과

목소리·음악·내보내기·얼굴의 결과 파일을 먼저 확인한다. 완료 결과가 검증되면 CLI가 한도를 보고했어도 완료로 처리한다. 사용량 대기는 ① 종료 코드가 0이 아니고 카드 줄을 뺀 출력에 한도 안내가 있거나 ② 결과 줄이 `멈춤 · 사용량` 하나일 때다. 다른 까닭이 함께 적히면 그 까닭이 Jobs에 보인다.

시작 전 점검이 막히면 Jobs에 점검 글을 표시하고 30초 뒤 다시 본다. 작업자가 끝난 뒤 CapCut이 열려 있으면 서버가 정상 종료를 한 번 요청한다. 30초 뒤에도 열려 있으면 Jobs에 「CapCut이 꺼지지 않았어요 — 맥에서 CapCut을 꺼 주세요」가 뜬다. 앱이 닫히면 보관한 결과로 이어 간다. 재개할 때 멈춘 목소리·음악이 이미 제대로 저장됐으면 다음 칸으로 간다. 시험에서 1.5배속 목소리 여섯 조각이 여섯 자막에 들어간 편은 목소리 작업자 호출 0회, 음악 호출 1회였다.

## 2. 증거

가짜 작업자는 받은 카드를 표준 출력과 표준 오류 양쪽에 그대로 찍는다. 아래 시험은 `app/webapp/tests/test_worker_face.py`의 `WorkerLimitFix`에 있다.

| 기준 | 대조한 결과 | 시험 이름 |
|---|---|---|
| 가 · 성공 | 네 칸 모두 rc 0에서 완료했다. rc 1과 실제 한도 안내가 함께 와도 확인된 결과가 우선했다. | `test_echo_completed_cards_and_verified_results_before_cli_limit` |
| 가 · 일반 멈춤과 혼합 멈춤 | 네 칸 모두 CapCut 지연과 프로젝트 목록 오류를 Jobs에 표시했다. 까닭 앞이나 뒤에 ‘사용량’이 있어도 재시도 카드에 실제 까닭이 남았다. | `test_echo_stops_keep_the_reason_in_all_four_cards`, `test_previous_version_mixed_stop_is_recovered_once` |
| 가 · 진짜 한도 | 네 칸 모두 rc 1 + 카드 밖 한도 안내, 또는 사용량 단독 결과 줄에서 기다렸다. 멈춤 수는 0이었다. rc 1에서 카드만 되찍은 경우에는 사용량 대기가 생기지 않았다. | `test_real_limits_on_all_four_cards`, `test_nonzero_echo_alone_and_short_voice_success` |
| 가-마 · C8 | 배터리 상태로 두 차례 점검했다. 목소리·얼굴 모두 Jobs에 「충전기를 확인해 주세요」, 멈춤 0·호출 0이었다. 충전 연결 뒤 다음 점검에서 작업자가 한 번 실행됐다. | `test_battery_gate_in_jobs_waits_thirty_seconds_then_runs` |
| 다 · 라 | ⑥ 카드 셋의 첫 걸음에 CapCut 켜기·최근 목록 전체 이름 대조·편집 화면 확인이 있다. 3분 시작점, 첫 연결 시간 초과 뒤 10초 후 한 번 더, 3번·20번 계산에서 그 재시도 제외를 네 카드에서 확인했다. 두 번째 시간 초과의 지정 문구는 재시도와 개발자 이관 뒤 Jobs에 보였다. | `test_echo_completed_cards_and_verified_results_before_cli_limit`, `test_permission_stop_in_jobs_on_retry_and_developer_handoff` |
| 나 · 맥 한 줄 | 별도 프로세스 둘이 동시에 명령을 실행해도 대기 한 건만 풀렸다. 상태는 `queued`, `retry_ts`·`retry_at` 두 값은 제거됐고 나머지 차례표 필드·다른 일·단계 파일은 그대로였다. 다음 `step("mac_gui")`가 그 일을 집었다. | `test_resume_command_wakes_only_the_waiting_job` |
| 사 · 꺼짐 | ⑥ 카드 셋에서 작업자는 Cmd+Q 뒤 결과 줄을 쓴다. 카드 안의 `pgrep`은 0건이다. 「목소리 · 됨」 뒤 서버가 CapCut 종료를 확인하고 음악으로 갔다. | `test_echo_completed_cards_and_verified_results_before_cli_limit`, `test_nonzero_echo_alone_and_short_voice_success`, `test_server_waits_for_capcut_to_close_without_relaunch` |
| 아 · 자 · 저장본 | 저장본이 맞는 목소리·음악은 각각 음악·내보내기로 넘어갔다. 네 번째 자막만 빠진 경우에는 그 자막만 지정한 카드를 냈다. 저장본을 읽지 못하면 작업자를 다시 부르지 않고 개발자에게 넘겼다. 맥 한 줄로 시험 저장본의 `tone_type`도 읽었다. | `test_resume_saved_six_voices_runs_only_music_and_reads_picks`, `test_saved_music_advances_to_export_without_repeating_music`, `test_stopped_voice_repairs_only_missing_caption`, `test_unreadable_saved_voice_or_music_goes_to_developer` |
| 차 · 정상 종료 한 번 | 네 카드 모두 정상 종료 요청에 앱이 닫히자 다음 단계로 진행했다. 앱이 계속 열린 목소리·얼굴은 가짜 시계로 2초씩 15회 기다렸다. 이후 돌기에서도 수동 종료 안내가 유지되고 멈춤 0·종료 요청 1회였다. 앱을 닫자 작업자를 다시 부르지 않고 이어 갔다. `osascript`가 없거나 실패해도 같은 대기 경로로 갔다. 강제 종료 명령 검색 0건. | `test_normal_quit_finishes_each_card_without_requeue`, `test_server_waits_for_capcut_to_close_without_relaunch`, `test_quit_uses_only_normal_apple_event_and_handles_command_failure` |
| 카 · 실행 로그 | 네 카드에 실행마다 다른 `runs/*.worker.md` 경로와 기록 지침을 넣었다. 로그가 없어도 정상 완료됐다. 목소리·얼굴의 개발자 글에는 마지막 20줄만 들어갔고, 같은 소재 이름은 대소문자가 달라도 같은 「소재 N」으로 표시됐다. 메일·인증 값·목록에서 사라진 소재 경로는 가렸다. 사용량 대기 뒤 재시도에서도 앞 실행의 로그가 보존됐고, 나중에 음악 카드가 끝나도 목소리 막힘에는 목소리 로그만 붙었다. | `test_echo_completed_cards_and_verified_results_before_cli_limit`, `test_developer_receives_only_last_twenty_anonymized_worker_lines`, `test_usage_retry_keeps_each_attempts_own_worker_log`, `test_developer_reads_the_stopped_parts_log_after_other_card` |

제품 원격 가지와 로컬 머리는 `09655cd68f542829915541293a726b8242d8a83c`로 일치했다. 이 커밋을 새 폴더에 풀어 Python 3.13.14에서 `python -m unittest discover -s app/webapp/tests -v`로 전체 회귀를 실행했다.

- Playwright와 cryptography가 있는 환경에서 187개가 모두 통과했다(500.663초, 건너뜀 0).
- 기본 환경 첫 실행은 184개 통과, 1개 실패, 2개 건너뜀이었다(454.700초). 기존 `test_runner.Claude.test_login`이 기대한 `stop` 대신 `now`를 읽었다. 같은 커밋과 기본 환경에서 이 시험을 단독으로 다시 실행해 통과했다(3.994초). 건너뛴 두 건은 cryptography가 필요한 Web Push 시험이다.
- 같은 커밋을 새 폴더에 풀어 기본 환경의 전체 시험을 다시 실행했다. 185개 통과, 같은 두 건 건너뜀, 실패 0이었다(385.648초). 로그인 시험의 첫 실패 원인은 확인하지 못했다.

시험 서버와 가짜 작업자로 Jobs도 열었다. 390px Chromium과 iPhone 14 크기 WebKit에서 C8의 「충전기를 확인해 주세요」, CapCut 수동 종료 요청, 두 번째 연결 시간 초과의 허락 창 문구가 각각 실제 현황 줄(`#nowBand .l1`)에 표시됐다.

## 3. 바뀐 것

제품 가지는 `feat/webapp-worker-limit-fix3-20261122`, 바탕은 `5bbe272`이다. 본문·덧붙임 1 구현 `6e29ab8`과 시험 `808000f`, 덧붙임 2 구현 `44320c0`과 시험 `de49290` 뒤 `0a8a61c`에서 재개 명령에 프로세스 간 잠금을 적용하고 동시 호출을 시험했다. 덧붙임 3은 구현 `e0fdc8f`·시험 `1db3756`, 덧붙임 4는 구현 `923fba7`·시험 `2ca9fc7`이다. 최종 머리 `09655cd`에서 뒤에 다른 카드가 끝나더라도 멈춘 칸에 해당하는 로그를 인계하도록 하고 이를 시험했다.

**기준 2 + devpush.py(ARCH 확인)** (`btsr/arch 9aa1efe`). 바탕과 비교한 파일은 `app/webapp/` 아래 `worker.py`, `jobs.py`, `runner.py`, `devpush.py`, `tests/fake_codex.py`, `tests/test_worker_face.py` 여섯 개다. 실행 로그는 Git에서 제외된 작업 데이터 폴더에 둔다. `devpush.note_text`에서만 기존 까닭·이벤트 뒤에 멈춘 칸 로그의 끝 20줄을 붙인다. 개발자에게 전달하는 글은 기존 개인정보 거르기를 거치고, 받은 소재 이름은 ‘소재 N’으로 표시된다.

## 4. 남은 것

실제 맥에서 승인 창의 주체, 반복 여부, 실제 프로젝트의 저장된 목소리 이름은 새 판을 받은 뒤 확인할 항목이다. 두 번째 시간 초과 안내는 카드에 정한 문구다. 이 시험에서 확인한 범위는 안내 표시와 이어지는 작업 흐름이다.

## 5. 배운 것

맥 시험에서는 작업자의 종료 확인이 실패해도 편집 내용이 저장돼 있었다. 서버가 저장본의 자막별 목소리 수·속도와 음악 상태를 직접 읽으면 완료된 작업은 건너뛰고 빠진 부분만 카드에 지정할 수 있다.

## 6. 다음

ARCH 대조와 RSCH의 합침 뒤 **새 판 서버를 실행한 상태에서**, 맥 제품 사본 맨 위에서 아래 한 줄을 실행한다. 서비스가 별도 `WEBAPP_DATA_DIR`·`CAPCUT_DRAFTS_DIR`를 사용하면 명령도 같은 데이터·프로젝트 경로에서 실행한다. 첫 출력은 저장본의 선택값이다. `voice`는 저장된 `tone_type`이고, 읽을 값이 없으면 `None`이다. 둘째 출력은 현재 편의 사용량 대기를 풀었는지 알려 준다.

```bash
python3 -c "import sys; sys.path.insert(0,'app/webapp'); import jobs as J, runner; job=J.busy(); print(J.project_picks(J.project_name(job)) if job else None); print(runner.resume_wait_usage())"
```

재개 함수는 서버와 공유하는 작업별 파일 잠금 안에서 현재 편과 대기 항목을 다시 대조하고 차례표 한 파일을 원자적으로 바꾼다. 단계 글과 다음 카드 선택은 서버의 다음 돌기가 맡는다.

첫 정상 종료 요청에서 macOS 제어 허락 창이 뜰 수 있다. 창이 뜨면 맨 위 앱 이름과 단추 글을 적고 맥 앞에서 한 번 허용한다. 저장 여부를 묻는 창은 맥 앞에서 내용을 확인한다.
