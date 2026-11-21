# BTSR-ARCH-018 · 웹앱 1차 기획안 사본 반환

반환 기록 · 2026-11-21 21:24:45 KST

## 1. 결과

기획안 1.9판을 제품에 옮겼다. 제품 README 첫 안내의 ‘웹앱 1차 기획안(쉬운 말 한 장)’에서 사본을 열 수 있다. 018을 올리기 전에 019가 도착해 같은 기능 가지에 요청별로 한 커밋씩 담았다.

| 바탕 main | 018 커밋 | 019까지 담은 원격 가지 머리 |
|---|---|---|
| `e095396` | `fe1e241` | `feat/webapp-plan-phase1-20261121` · `896abae` |

## 2. 증거

원본은 에이전트 저장소 `92aacb5:projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_PLAN_DRAFT_CLAUDE.md`다. 제품 Git에 저장된 사본에서 아래 두 차이를 되돌린 결과 원본과 모든 바이트가 일치했다.

| 원본 → 사본 | 차이 |
|---|---|
| 제목 바로 아래, 사본 2행 | 사본 — 원본은 에이전트 저장소 mitchell-studio_agent의 기획(PLN) 글(WEBAPP_PHASE1_PLAN_DRAFT_CLAUDE.md, 1.9판). 판이 바뀌면 이 파일도 같은 판으로 다시 옮깁니다. 고칠 말씀은 기획에 주세요. |
| ‘이 글의 바탕’, 원본 137행 → 사본 138행 | ‘같은 폴더의’를 ‘에이전트 저장소 mitchell-studio_agent의 `projects/btsr/roles/pln/requirements/webapp-phase1/`’으로 바꿨다. 두 파일 이름과 문장 뒷부분은 원문과 일치한다. |

제품 `e095396..fe1e241`은 `app/webapp/PLAN_PHASE1.md` +138행과 `app/webapp/README.md` +1행이다. README에서 안내 한 줄을 빼면 이전 Git 내용과 바이트가 일치한다. 사본과 새 안내에 손님 식별 정보나 키 값은 없다.

저장소 전체를 해당 커밋에서 임시 폴더에 풀고 `PYTHONUTF8`·`PYTHONIOENCODING`·`PYTHONPATH`를 해제해 `python -m unittest discover -s app/webapp/tests -v`를 실행했다. 018 기본 Python 3.13.14에서 137개 중 135개가 통과했고 `cryptography`를 필요로 하는 Web Push 두 개가 건너뛰어졌다(96.035초). `test_words`의 두 시험도 통과했다. 이 시험은 운영 화면과 운영 매뉴얼을 검사하며 기획안 Markdown은 읽지 않는다. 두 문서를 함께 담은 최종 판의 전체 회귀는 [019 반환서](WEBAPP_PHASE1_MAC_TEST_DOC_ADD3_RETURN_CODEX.md)에 기록했다.

## 3. 바뀐 것

기획안 사본과 README 상대 링크를 추가했다. push 직전 조회한 `origin/main`은 `e095396`이며 두 문서 커밋의 조상이다.

## 4. 남은 것

제품 main 반영은 ARCH 대조 뒤 RSCH가 맡는다.

## 5. 배운 것

원본 본문에서 ‘같은 폴더의’ 뒤에는 요구 글과 결정 글의 실제 파일명이 들어 있다. 경로만 바꾸면 두 파일명도 그대로 살릴 수 있다.

## 6. 다음

ARCH는 `e095396..fe1e241`에서 018 두 파일을 대조할 수 있다. 이어지는 `fe1e241..896abae`가 019다.
