# BTSR-ARCH-023 · Terra 요령 두 줄

요청서 `btsr/arch 48c4ce3` · 제품 가지 `feat/webapp-terra-experience-20261122` · 원격 확인 2026-11-22 04:29:56 KST.

## 1. 결과

Terra가 카드 전에 읽는 ‘요령’을 웹앱 카드와 맞췄다. 작업자는 CapCut에 Cmd+Q를 보낸 뒤 바로 결과 줄을 쓴다. 꺼졌는지는 웹앱이 확인한다. 도구 횟수에는 화면 보기를 포함하고 작업 로그 쓰기는 제외한다.

## 2. 증거

- 요청서 표에서 두 문장을 읽어 제품 파일의 16·20줄과 대조했다. 두 줄이 각각 원문과 일치했다.
- `git diff --numstat 09655cd c364bf0` 결과는 `2  2  agents/_terra/experience.md` 한 줄이다. ‘새 기록’은 바탕 커밋과 바이트가 일치했다.
- `git grep -n pgrep c364bf0 -- agents/_terra/experience.md` 결과는 16줄의 작업자 환경 오류 설명 한 곳이다. 제품의 `jobs.py` 1581·1601·1645줄에서 로그 쓰기 제외, 서버의 종료 확인, Cmd+Q 직후 결과 줄 지시를 대조했다.
- 기본 환경에서 제품 커밋을 새 폴더에 풀어 `python -m unittest discover -s app/webapp/tests -v`를 한 번 실행했다. 187개 중 184개 통과, 오류 1개, cryptography가 필요한 Web Push 시험 2개 건너뜀(462.629초).
- 오류는 `test_one_job.Http.test_dev_then_new_send_hides_old`의 준비 단계에서 났다. `_env.idle()`이 이전 시험 편의 `status.json`을 교체할 때 Windows가 접근을 거부했다(`WinError 5`). 같은 커밋·같은 기본 환경에서 해당 시험만 새 시험 데이터로 실행해 통과했다(1.109초).

## 3. 바뀐 것

제품 바탕은 `09655cd68f542829915541293a726b8242d8a83c`, 작업 커밋은 `c364bf0b82d6c94c48b7d68e6e6780684dc0bf9f`이다. 바뀐 파일은 `agents/_terra/experience.md` 하나다. Push 직전 가져온 원격 main `5bbe272`는 바탕의 조상이어서 rebase가 같은 머리를 유지했다. 기능 가지를 push한 뒤 원격과 로컬의 전체 SHA가 일치했다.

## 4. 남은 것

실제 맥에서 작업자가 이 요령으로 내보내기를 마치는지는 다음 맥 실행에서 확인한다.

## 5. 배운 것

작업자는 카드보다 경험 기록을 먼저 읽는다. 종료 확인의 담당이 바뀌면 두 문서에서 같은 순서를 안내해야 한다.

## 6. 다음

ARCH가 두 줄과 회귀 결과를 대조하고, RSCH가 제품 가지를 main에 합친다.
