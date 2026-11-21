# BTSR-ARCH-016 반환 · 맥 테스트 시작 문구

## 1. 결과

제품 `main f457be8`에서 만든 가지 `feat/webapp-mac-test-doc-add1-20261121`의 머리는 `07cd3fc`다. 요청서 `btsr/arch 9440847`과 결정 47을 반영했다. PMO 받음은 `b24eef1`이다.

## 2. 증거

`git diff --stat f457be8 07cd3fc`는 `app/webapp/MAC_RUN_PHASE1.md` 한 파일, +5/−1이다. 추가 5줄에는 Markdown 문단을 나누는 빈 줄 2개가 포함된다. 새 커밋에서 아래 두 문단을 빼고 표의 1회차 문장을 원래대로 대입하면 바탕 글 전체와 일치한다. `git diff --check`도 통과했다.

최종 커밋 `07cd3fc`의 저장소 전체를 `git archive`로 두 폴더에 따로 풀었다. 두 실행 모두 `PYTHONUTF8`·`PYTHONIOENCODING`·`PYTHONPATH`를 해제하고 `python -m unittest discover -s app/webapp/tests -v`로 확인했다.

| Python 3.13.14 | 전체 회귀 결과 |
|---|---|
| 기본 환경 | 137개 중 135개 통과. 암호화 모듈 부재로 Web Push 2개 건너뜀. 128.174초 |
| cryptography 50.0.2 설치 환경 | 137개 모두 통과. 143.419초 |

원격 기능 가지와 로컬 머리는 `07cd3fc2d4e6222edb12a9a1b820aa61145eae4e`로 일치한다.

## 3. 바뀐 것

최종 글 7줄은 한 줄 표 바로 위, 17줄은 공통의 첫 문단이다. 11줄은 한알이 복사할 첫 회차 문장이다. 다음은 `git diff -U0 f457be8 07cd3fc`의 세 변경 구간이다.

```diff
@@ -6,0 +7,2 @@
+이끄는 ChatGPT = 맥의 세션 「코덱스 excutor」
+
@@ -9 +11 @@
-| 1 · 준비와 한 편 완성 | 이 파일(app/webapp/MAC_RUN_PHASE1.md)의 공통과 1회차대로 해 줘. |
+| 1 · 준비와 한 편 완성 | ~/mitchell_studio에서 git fetch origin만 하고(pull은 하지 말고), git show origin/main:app/webapp/MAC_RUN_PHASE1.md 로 나온 글의 공통과 1회차대로 해 줘. |
@@ -14,0 +17,2 @@
+이끄는 ChatGPT = 맥의 세션 「코덱스 excutor」
+
```

## 4. 남은 것

ARCH의 차이 대조와 RSCH의 main 반영이 남았다. 맥에서 첫 회차를 시작할 때는 원격 main에 이 커밋이 들어간 뒤 해당 문장을 사용한다.

## 5. 배운 것

맥 사본의 파일이 이전 판이어도 `git fetch origin` 후 `git show origin/main:app/webapp/MAC_RUN_PHASE1.md`로 해당 원격 판의 안내를 바로 읽을 수 있다. 이때 맥의 작업 파일을 갱신할 필요가 없다.

## 6. 다음

ARCH에 기능 가지와 이 반환서를 전달한다. 보조 개설은 0개다.
