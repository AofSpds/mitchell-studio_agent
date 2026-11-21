# BTSR-ARCH-021 · 휴대폰 올리기 고침 2 반환 (1–8)

반환 시각 2026-11-22 02:23:48 KST

## 1. 결과

Send와 Jobs에서 업로드가 끊겨 같은 사진을 다시 골라도, 맥이 받은 파일은 건너뛰고 원래 묶음에서 이어 보낸다. 390px Chromium과 iPhone 14 크기의 WebKit에서 새로 고침과 PIN 복귀를 확인했다.

제품 가지 `feat/webapp-upload-stall2-20261122`의 원격 머리는 `5bbe272`다. push 직전 확인한 제품 main은 `8b0d084`다.

| 범위 | 구현 | 시험 |
|---|---|---|
| 본문 1–4 | `926c1a8` | `9722fbc` |
| 덧붙임 5–8 | `0285ab4` | `5bbe272` |

## 2. 증거

아래 시험은 모두 `app/webapp/tests/test_upload_stall.py`에 있다. 서버 시험은 `SendConnection`, 화면 시험은 `SendRefresh`(Chromium)와 `WebKitSendRefresh`(WebKit)에서 실행했다.

| 됨 | 시험 이름 | 관찰한 결과 |
|---|---|---|
| 1. 로그인 만료 → PIN | `test_rejected_post_closes_connection_then_pin_page_loads`, `test_expired_send_opens_pin` | 실제 서버가 거절한 POST 응답(401·403)에 연결 종료를 표시했다. 같은 HTTP 클라이언트로 이어서 PIN 화면을 열어 200을 받았다. 두 브라우저에서도 Send에 로그인 만료 안내가 뜨고 PIN 뒤 요청 글이 돌아왔다. |
| 2. 새로 고친 뒤 이어 보내기 | `test_reload_resumes_one_batch_and_skips_received` | 첫 장을 받고 둘째를 보내는 동안 새로 고치자 재선택 안내와 요청 글이 나타났다. 같은 세 장을 고르자 첫 장을 건너뛰었고 묶음 하나, 작업 하나로 끝났다. |
| 3. 받은 만큼의 막대 | `test_failed_second_file_shows_one_third` | 세 장 중 둘째 전송이 재시도 후에도 실패하자 막대가 33%에 섰다. 보내기를 멈춘 뒤 임시 기록이 지워졌다. |
| 4. 연결 실패 안내 | `test_offline_send_mentions_wifi_tailscale_and_mac` | 연결을 끊고 Send를 누르자 “맥에 연결할 수 없어요. 휴대폰 와이파이 · Tailscale과 맥북을 확인해 주세요.”가 나타났다. |
| 5. Jobs 추가 전송 | `test_job_more_stall_reselect_skips_numbered_photos`, `test_job_blurry_stall_retries_and_finishes`, `test_job_pin_returns_to_same_question_and_skips_received` | 「더 보내기」와 「사진 다시 올리기」에서 멎으면 받은 파일인지 확인한 뒤 한 번 다시 보냈다. 두 번 실패하면 같은 자리에서 다시 고르라는 띠가 남았다. PIN 뒤에도 원래 물음에 돌아왔고, 받은 파일과 이미 보낸 답은 한 번씩만 전송됐다. |
| 6. 같은 이름의 사진 | `test_received_check_finds_third_numbered_name`, `test_job_more_stall_reselect_skips_numbered_photos` | 이름·크기가 같고 내용이 다른 두 장을 다시 골라도 폴더에 그 이름의 사진은 두 장만 남았다. 서버는 세 번째 이름 `_3`의 내용도 찾아냈고, 크기만 같은 다른 파일은 구별했다. |
| 7. Manual의 Face 안내 | `test_manual_face_matches_remake_limit_and_initial_send` | Manual 화면이 가진 AI 얼굴 사진을 처음 보낼 때 함께 보내도록 안내하고 「다시 만들기」 횟수가 코드의 `FACE_REMAKES` 값 2와 일치했다. 「가진 사진 올리기」 문구도 걷었다. |
| 8. 390px에서 큰 글자 | `test_large_text_touch_targets_and_whole_button_words` | 두 브라우저에서 물음표·건의하기·판 고르기의 실제 누름 영역이 가로·세로 모두 44px 이상이었다. 큰 글자의 「알림 켜기」에서 ‘알림’과 ‘켜기’ 각각은 한 줄에 놓였다. |

같은 최종 커밋을 환경별로 새 폴더에 풀고 Python 3.13.14에서 `python -m unittest discover -s app/webapp/tests -v`로 전체 회귀를 실행했다. 두 환경 모두 `PYTHONUTF8`, `PYTHONIOENCODING`, `PYTHONPATH`를 해제했다.

| 환경 | 결과 |
|---|---|
| Playwright · 기본 | 169개 중 167개 통과, cryptography가 필요한 Web Push 2개 건너뜀 (407.514초) |
| Playwright · cryptography | 169개 전부 통과, 건너뜀 0 (358.900초) |

연결을 의도적으로 끊는 화면 시험에서 시험용 프록시가 응답 헤더를 쓰는 동안 `ConnectionResetError`를 기록했다. 두 엔진에서 재선택·PIN 복귀·중복 방지 판정은 모두 통과했다.

## 3. 바뀐 것

| 파일 | 변경 |
|---|---|
| `app/webapp/server.py` | 거절된 요청의 연결을 닫는다. 파일을 저장할 때와 이미 받은 파일을 찾을 때 같은 순서로 원래 이름과 번호 붙은 이름을 살핀다. |
| `app/webapp/static/app.html` | Send와 Jobs가 같은 파일 전송 함수를 쓴다. 30초간 진전이 없으면 끊고, 받은 파일인지 최대 15초 확인한 뒤 한 번 다시 보낸다. Send는 첫 파일 전송 전에 묶음과 요청 글을 탭에 저장하고 완료·멈춤 때 지운다. 끊긴 막대와 연결 안내를 고치고 기존 단추의 누름 영역과 줄 바꿈을 조정했다. |
| `agents/creative_director/manual-webapp.md` | Face의 재생성 횟수, 가진 사진을 보내는 시점, 원고 승인 단추 이름을 실제 화면에 맞췄다. |
| `app/webapp/tests/test_upload_stall.py` | 서버 시험 2개, 휴대폰 화면 시험 9종을 두 엔진에서 실행해 총 20개를 추가했다. |

제품 diff는 위 네 파일이다. 기존 정적 화면 본문과 자바스크립트가 만드는 단추 정의 32개를 바탕 커밋과 대조해 일치를 확인했다. `git diff --check`도 통과했다.

## 4. 남은 것

실제 아이폰에서 다른 앱을 다녀온 뒤의 자동 새로 고침과 가게 와이파이·Tailscale 연결은 오늘 휴대폰 테스트에서 확인한다.

## 5. 배운 것

업로드 재시도 때는 파일 이름이 같아도 내용이 다를 수 있다. 서버가 저장한 순서대로 이름과 번호 붙은 이름을 살펴야 두 장 모두 보존하면서 이미 받은 사진을 건너뛸 수 있다.

## 6. 다음

ARCH가 위 여덟 기준과 제품 머리를 검토하고, 수용 뒤 RSCH가 제품 main 반영과 실제 휴대폰 확인을 잇는다.
