# BTSR-ARCH-020 · 휴대폰 Send 올리기 복구 반환

반환 기록 · 2026-11-22 00:26:15 KST

## 1. 결과

제품 기능 가지 `feat/webapp-upload-stall-20261122`를 ARCH에 반환한다. push 직전 제품 main은 `896abae`, 구현은 `ce56711`, 시험을 포함한 원격 머리는 `8b0d084`다.

390px Chrome에서 사진 세 장 중 두 장을 받은 뒤 세 번째 전송을 끊었다. 자동 재시도와 ‘다시 보내기’가 실패하자 같은 단추가 파일 고르기로 바뀌었다. 세 장을 다시 고른 결과, 서버에서 이미 받은 두 장을 확인하고 세 번째 파일만 보냈다. 실제 시험 서버의 새 묶음은 하나, 새 작업은 하나였다.

## 2. 증거

| 요청의 ‘됨’ | 시험 이름 | 관찰한 결과 |
|---|---|---|
| 1. 보낸 양이 늘지 않을 때 자동 재시도 | `test_stalled_body_aborts_and_retries_only_that_file`, `test_progressing_upload_can_last_longer_than_stall_limit` | 전송 중 64KiB를 읽은 뒤 멎는 끝점에서 파일 확인 → 같은 파일 PUT 한 번으로 끝났다. 보낸 양이 계속 늘어나는 느린 전송은 타이머보다 오래 걸려도 한 번에 끝났다. |
| 1. 받은 파일 확인과 확인 시간 제한 | `test_lost_response_skips_file_already_received`, `test_slow_have_expires_and_file_is_sent` | 파일은 받고 응답만 잃으면 재전송을 건너뛰었다. 확인 응답이 늦으면 확인을 끊고 파일을 보냈다. |
| 2. 다시 보내기 실패 → 다시 고르기 | `test_reselect_three_skips_two_and_creates_one_job`, `test_manual_retry_leaves_auto_retry_for_the_next_file` | 고르기 창이 열릴 때 이전 선택이 비어 있었다. 같은 세 장에서 받은 둘은 건너뛰고 하나만 보내 작업 하나를 만들었다. 앞 파일을 수동으로 다시 보낸 뒤에 처음 보내는 다음 파일도 자동 재시도 한 번을 쓸 수 있었다. |
| 3. PIN 뒤 같은 묶음과 요청 글 | `test_pin_during_upload_resumes_same_batch_and_request`, `test_pin_during_have_resumes_without_another_put_before_pin`, `test_pin_during_request_save_preserves_text` | 파일 본문·받은 파일 확인·요청 글 저장에서 각각 401을 주었다. PIN 앞뒤에 안내가 보였고, 저장된 값은 묶음 ID와 글뿐이었다. PIN을 넣고 다시 고르자 같은 묶음의 `request.txt`에 원래 글이 남았다. |
| 3. 완료·중단 뒤 정리 | `test_stop_after_pin_clears_saved_batch`, `test_stop_during_have_does_not_restart_upload` | 완료·중단 뒤 임시 저장을 비웠다. 확인 도중 멈추면 파일을 다시 보내거나 작업을 만들지 않았다. |
| 4. 진행 중 Send를 누를 때 | `test_busy_send_explains_and_does_not_create_a_batch` | 작업이 있을 때 흐려진 Send를 실제 탭하자 화면의 현황 한 줄이 떴고 새 묶음이 생기지 않았다. |

시험은 Playwright의 390×844 터치 화면과 기존 시험 서버의 로그인·묶음·파일·작업 경로를 썼다. 로컬 시험용 중계에서만 지연·응답 유실·401을 주고 두 시간을 800ms·900ms로 줄였다. 제품 값은 전송 정체 30초, 받은 파일 확인 15초다.

`8b0d084`를 `git archive`로 환경마다 새 폴더에 풀었다. `PYTHONUTF8`, `PYTHONIOENCODING`, `PYTHONPATH`를 해제하고 Python 3.13.14에서 `python -m unittest discover -s app/webapp/tests -v`로 실행했다.

| 환경 | 전체 회귀 |
|---|---|
| Playwright · 기본 | 149개 중 147개 통과. Web Push 암호화 2개 건너뜀. 화면 시험 12개 통과. 192.201초. |
| Playwright · cryptography 50.0.2 | 149개 모두 통과. 화면 시험 12개와 Web Push 암호화 2개 포함. 118.971초. |

## 3. 바뀐 것

| 커밋 | 파일 | 차이 |
|---|---|---|
| `ce56711` | `app/webapp/static/app.html` | +132/−54행. 올리기·재시도·다시 고르기, PIN 앞뒤 복구, Send를 막는 까닭 안내 |
| `8b0d084` | `app/webapp/tests/test_upload_stall.py` | +289행. 390px 화면 시험 12개 |

화면 구조와 CSS가 들어 있는 스크립트 앞부분은 바탕과 바이트가 일치한다. 기존 서버의 받은 파일 대조와 같은 묶음에 대한 작업 중복 방지를 사용했다.

## 4. 남은 것

한알이 처음 겪은 멎음의 원인은 당시 휴대폰·맥 기록을 대조해야 알 수 있다. 실제 아이폰 사용감은 main 반영 뒤 휴대폰 테스트에서 확인한다.

## 5. 배운 것

파일 전송 응답을 잃어도 서버에는 이미 온전한 파일이 있을 수 있다. 자동·수동 재시도와 PIN 복귀 모두 기존 받은 파일 확인을 먼저 쓰면 이 경우 재전송을 줄일 수 있다.

## 6. 다음

ARCH가 가지 머리와 ‘됨’별 시험을 대조해 PLN으로, RSCH가 제품 main 반영을 맡는다. 맥에서 최근 500줄의 ‘올리기 끊김·덜 됨·401’ 횟수만 확인하는 명령은 ARCH에 별도로 보냈다.
