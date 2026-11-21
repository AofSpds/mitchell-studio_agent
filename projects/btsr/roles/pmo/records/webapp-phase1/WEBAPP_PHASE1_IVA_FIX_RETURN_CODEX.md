# BTSR-ARCH-015 반환 · 미첼의 Send, Post, 얼굴 승인과 규격 재내보내기

## 1. 결과

제품 `feat/webapp-iva-fix-20261121`의 코드 머리는 `0bce387`, 맥 테스트 글을 포함한 최종 머리는 `f457be8`이다. 바탕은 `94d4522`다. 원 요청 `a0f79c3`와 IVA 판정 `7915afd`, 덧붙임 1 `b2581be`와 덧붙임 2 `b6034e5`를 적용했다. PMO 접수 기록은 `91ffa3b`다.

## 2. 증거

| 항목 | 미첼이 보는 결과와 확인한 시험 |
|---|---|
| 가1 · 열린 Post | `screen_open_post_caption_ready_and_failure`에서 두 승인 카드를 같은 Post에 열어 둔 채 가짜 작업자를 끝냈다. 성공 카드의 ‘캡션 복사’가 켜지고, 실패 카드에는 ‘캡션 없이 영상만 쓸 수 있어요’ 한 줄과 활성 ‘영상 저장’이 남았다. `test_10_11_post_no_fix_and_caption_job`, `test_caption_failure_is_not_a_stop`, `test_16_caption_filter_before_post`에서 일하는 중·통과·실패·거르기 결과를 확인했다. [캡션 준비 완료](evidence/115_iva_post_ready.png) · [캡션 실패](evidence/115_iva_post.png) |
| 가2 · 규격 재내보내기 | `test_spec_redo_reaches_worker_despite_real_c2`에서 720×1280 첫 판을 실제 C2가 잡았다. 재내보내기 작업자 호출이 1회 늘고, 1080×1920 둘째 판을 승인해 저장 대상으로 받았다. `test_4_spec_bad_opinion_redo_then_dev_record`는 두 번 연속 규격이 틀린 경우를 확인한다. |
| 나4 · 얼굴 다시 만들기 | `test_remake_exhaustion_keeps_approval_and_no_dev`, `test_face_http`에서 두 번 소진 후 재요청은 HTTP 409, 기존 후보는 승인 가능했다. `screen_face_after_two_remakes`에서 단추 아래 횟수는 사라지고 ‘이 사진으로 갈게요 →’만 남았다. ?를 열면 ‘다시 만들기를 다 썼어요.’가 보였다. [얼굴 승인](evidence/115_iva_face.png) |
| 나5 · HEIF | `test_heif_face_selected_without_screen_17`에서 얼굴이 보이는 시술 후 `.HEIF`를 접수했다. 화면 17 물음이 생기지 않았고 그 파일의 내용이 얼굴 작업자의 바탕 사진으로 복사됐다. |
| 나3 · 처음 Send | `screen_send_select_request_then_send`에서 390×844 화면에 Send, 파일 고르기, Request, Options가 함께 보였다. 사진만 고르면 전송 요청 0회, Request를 쓴 뒤 Send를 누르면 1회였다. 실제 임시 묶음에 사진과 요청이 저장됐다. S8 화면 1과 Send → Request → Options의 자리와 단추 높이를 대조했다. [전송 직전](evidence/115_iva_send.png) |
| 나6 이미 함 | 덧붙임 1을 받기 전에 흐린 사진을 소재 번호로 적고, 개발자 글·건의 사본에서 받은 소재의 파일명을 종류로 바꾸는 코드를 적용했다. 지시대로 유지했다. `test_material_name_only_in_local_original`에서 가짜 표시 파일명이 두 사본에서 빠지고 로컬 원문에는 남았다. 철회된 맥 글 두 줄은 넣지 않았다. |

화면 시험은 Windows Chrome과 제품 HTTP 서버에서 가짜 자료로 실행했다. [실행 준비](evidence/screen_iva.py) · [화면 시험](evidence/screen_iva.mjs)

전체 회귀 결과는 아래와 같다.

| 최종 제품 전체를 푼 환경 | 결과 |
|---|---|
| Windows Python 3.13.14, 기본 | 137개 중 135개 통과, `cryptography`가 없어 Web Push 암호화 2개 건너뜀. 106.573초 |
| 같은 Python, cryptography 50.0.2 | 137개 모두 통과, 113.403초 |

각각 `git archive f457be8`로 저장소 전체를 별도 임시 폴더에 풀고 `PYTHONUTF8`, `PYTHONIOENCODING`, `PYTHONPATH`를 비운 뒤 `python -m unittest discover -s app/webapp/tests -v`로 시험했다. 390px 화면 시험 3개도 통과했다. `git diff --check 94d4522 f457be8` 통과. 제품 원격 기능 가지와 로컬 모두 `f457be8cc1ba345ae394c297b91ac5664b281edb`를 가리킨다.

## 3. 바뀐 것

- 코드 `0bce387`은 Post 카드에 `making`·`ready`·`none`을 주고, 열린 Post가 변경 신호와 주기 갱신을 받게 했다. 규격 재내보내기의 export에서만 C2를 제외한다. 얼굴 승인·다시 만들기와 ?가 같은 남은 횟수를 쓰고, 접수·얼굴·소재 목록이 같은 사진 확장자 표를 쓴다. Send는 파일을 고른 뒤 요청을 작성하고 전송할 수 있다.
- 제품 시험은 `27acd2a`와 `a44893c`다. 최초 전체 회귀에서 실패한 세 검사는 JS 주석과 HTML의 `image/*` 구분, 폐기한 얼굴 선택지 키의 정확한 검사, 가짜 원격 경합 시험의 입력 전달을 바로잡았다.
- 맥 테스트 글은 014의 `28e779e`에서 가져와 `6580ecf`·`f457be8`에 올렸다. 세 회차 ‘볼 것’의 IVA 원문, 15·13·10걸음, 결정 42 승인 표를 대조했다. 기존 CapCut 프로젝트·영상·작업자 설정을 변경 전에 확인한다. 기존 원격 주소·결과 가지 흔적은 0건, 셸 블록 17개의 구문을 확인했다.
- 결정 44에 따라 공통에 세 번째 경로인 웹앱 Claude 명령줄의 소재 읽기와 처리 위치를 적었다. 1-8 직전 재확인은 걷었다. 결정 45에 따라 이 개인 앱에 추가 확인 절차를 두지 않았다.
- 014의 S1은 맥 글 대조, 015의 S2·S3·S4 세 보조는 각각 열린 Post·화면 시험안, 규격·얼굴·HEIF, 소재 이름·맥 글 대조를 맡았다. 실행기는 Codex, PRIMARY 설정은 GPT-6.2 Astra / Ultra이며 보조는 상속 설정으로 열었다. 제품 반영·실행·판정은 PRIMARY가 했다. 결정 46을 받은 뒤 보조를 추가하지 않았다.

## 4. 남은 것

실제 맥 CapCut 내보내기와 AI 얼굴 품질, 아이폰 알림·사진 앱 저장은 세 회차 실기로 확인한다. PMO는 윈도에서 가짜 작업자와 로컬 시험 원격을 썼다. 실기의 개인 소재와 사진·영상 게시, 실제 개발자 글 전송은 이번 작업에 사용하지 않았다.

## 5. 배운 것

Post를 다시 열면 갱신 결함이 가려진다. 승인한 같은 카드를 열어 둔 상태에서 캡션 작업자를 끝내야 미첼이 기다린 뒤 볼 결과를 확인할 수 있다. 규격 재내보내기도 첫 판을 실제 점검에 넣어야 작업자가 다시 호출되는지를 확인할 수 있다.

## 6. 다음

ARCH가 기능 가지 `f457be8`를 PLN에 반환하고 RSCH가 합칠 차이를 확인한다. 맥 테스트 글의 제품 기준은 구현 커밋 `0bce387`이다.
