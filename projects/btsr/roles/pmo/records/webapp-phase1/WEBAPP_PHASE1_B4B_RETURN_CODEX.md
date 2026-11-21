# BTSR-ARCH-012 반환 — HTTPS 접속과 홈 화면 알림

## 1. 결과

제품 기능 가지 `feat/webapp-b4b-https-push-20261121`의 끝은 `7127393`이다. 바탕은 묶음 6 `e512fcd`, 요청 원본은 에이전트 `btsr/arch`의 `9b579c3`과 덧붙임 1 `aed1d11`이다. 코드 `8ea42e1` · `da20459` · `9d1863d`, 시험 `7127393`을 따로 올렸다. 이 가지에 실제 add · commit · push가 성공했다.

## 2. 증거

| 알림 | 부르는 곳 (제품 7127393) | 시험 |
|---|---|---|
| 확인해 주세요 — 단계 | app/webapp/jobs.py:336 · 저장 전후 단계가 확인 대기로 바뀔 때 | test_check_completed_and_ask_only, test_local_delivery_dedup_and_expired |
| 다 됐어요 | app/webapp/jobs.py:341 · 규격을 통과한 새 출력 판이 기록될 때 | test_check_completed_and_ask_only |
| 문제가 생겼어요 | app/webapp/jobs.py:2244 · jobs.stop에서 미첼에게 답을 요청할 때 | test_check_completed_and_ask_only |

- Windows, Python 3.13.14. 각 환경에서 `git archive --format=zip -o <임시>/source.zip 7127393`으로 전체 저장소를 따로 풀고 그 최상위에서 `python -m unittest discover -s app/webapp/tests -v`를 실행했다. 부모 환경의 `PYTHONUTF8`, `PYTHONIOENCODING`, `PYTHONPATH`는 해제했다. 시험 공통 설정(`_env.py`)이 임시 데이터와 설정을 만들고 `WEBAPP_DEV_PUSH=0`, `WEBAPP_RUNNER=0`, `WEBAPP_TICK_SECONDS=0`을 사용한다. Git push 시험만 임시 bare 원격을 쓴다.
- 기본 환경은 131개 중 129개 통과·암호화 시험 2개 건너뜀(109.392초). 외부 가상환경 `webapp-test-b4b-venv`의 `cryptography 50.0.2`에서는 131개 전부 통과(126.100초). [기본 환경 결과](evidence/90_b4b_default.txt) · [암호화 환경 결과](evidence/90_b4b_crypto.txt)
- 암호화 시험은 공개 표준의 예제와 헤더·암호문을 바이트 단위로 대조하고, JWT를 공개 키로 검증했다. 전송 시험은 수신처를 로컬 HTTP 서버로 바꿔 10분 안 중복 억제와 410 회수를 확인했다. [RFC 8291 부록 A](https://www.rfc-editor.org/rfc/rfc8291.html#appendix-A) · [RFC 8292](https://www.rfc-editor.org/rfc/rfc8292.html)
- 화면은 외부 가상환경 Python으로 `python screen_b4b.py <제품 사본> <Chrome>`을 실행했다. 390×844, 임시 HTTPS 서버, 실제 서비스 워커 등록 및 공개 키 조회, 일반 브라우저에서 단추 셋 비활성, 홈 화면 조건에서 켜기 활성, PIN 입력 후 Jobs 복귀를 확인했다. 시험용 휴대폰 구독과 로컬 전송 대역으로 켜기 → 시험 알림 → 끄기 API도 확인했다. [일반 브라우저](evidence/92_b4b_manual_browser.png) · [홈 화면 조건](evidence/92_b4b_manual_standalone.png) · [서버 시험 도구](evidence/screen_b4b.py) · [화면 시험 도구](evidence/screen_b4b.mjs)
- 제품 사본에서 `git status --short --branch`는 원격 기능 가지와 같았고 미추적 항목은 기존 `app/scripts/__pycache__/`, `app/webapp/__pycache__/`, `app/webapp/tests/__pycache__/`였다. `git ls-files '*vapid_private.pem' '*subs.json'` 출력 없음. 제품 사본의 무시 파일을 포함해 이름으로 찾은 개인 키 파일도 0개. 암호화 환경 시험은 저장소 밖 임시 데이터에 키가 실제로 생겼는지 확인했다.

## 3. 바뀐 것

- 로컬 프록시에서 온 요청에만 전달 주소의 마지막 값과 HTTPS 표시를 적용한다. 주소 허용과 PIN 실패 횟수가 같은 손님 주소를 쓴다. Funnel 표시 요청은 403이다. 로컬 Serve 설정이 현재 포트로 연결되면 시작 글에 HTTPS 주소를 표시한다.
- Manual에서만 알림을 켜고 끄거나 시험한다. 서버가 구독을 저장하고 알림을 암호화해 애플 푸시 서비스로 전송한다. 키와 구독은 외부 데이터의 `push/`에 두며, 데이터가 제품 트리 안이면 사용자 홈의 `.local/share/mitchell-studio/push/`를 쓴다. 알림 라이브러리를 설치하지 않은 서버에서도 기존 작업을 계속할 수 있다.
- 개발자 글은 까닭, 최근 사건 최대 다섯 줄, 마지막 작업자 멈춤 한 줄을 거른 뒤 담는다. 작성자와 커미터에는 같은 일반 계정을 쓴다. 가짜 원격의 최종 Git 커밋에서 네 칸을 검사했다.
- 캡션은 모든 플랫폼의 글과 메모를 검사한다. 업로더 지침의 가게 정보만 허용하고, 접수 표에서 확인한 손님 이름은 따로 검사한다. 다시 시도해도 걸리면 Post에 승인 영상만 표시하고, 사건 기록에는 갈래만 남긴다. 새 작업은 확인 전 캡션이 숨겨진다. 옛 작업의 글도 Post에서 읽을 때 검사한다. 기준 16은 가짜 작성자로 이름 꼴, 전화번호, 접수 이름, 지침에 있는 연락처를 각각 검증했다.
- 맥 시험서에 쌓인 개발자 글을 읽고 push를 켜는 순서와 실제 캡션의 사람 확인을 적었다.

## 4. 남은 것

맥과 아이폰 실기에서는 Serve의 실제 헤더와 TLS 연결, 앱을 닫은 뒤 애플 알림 도착·열기, 외부망 접근 제한, 실제 캡션과 개발자 글을 1차 끝 맥 시험에서 확인한다. 서버의 서버측 수신처 검사는 이번 대상인 애플 푸시 도메인에 맞췄다.

## 5. 배운 것

캡션 파일은 작업자가 저장하면 Post가 곧바로 읽을 수 있다. 검증 완료 상태와 화면에서 읽는 글을 함께 검사해야 재시도 중에도 원문이 노출되지 않는다.

## 6. 다음

ARCH가 기준 1–9 · 11–16과 덧붙임을 대조한다. PMO는 013 요청을 받으면 묶음 8-2를 이어 간다.
