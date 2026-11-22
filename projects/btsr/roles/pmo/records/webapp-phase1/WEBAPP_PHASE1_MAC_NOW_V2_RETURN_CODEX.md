# BTSR-ARCH-025 · 지금 맥에서 할 일 판 2

ARCH 요청 `btsr/arch 0bd82e0`과 덧붙임 1 `bd3deee`를 함께 반환한다. 최종 원격 확인은 2026-11-22 15:07:07 KST에 마쳤다.

## 1. 결과

맥 안내문 판 2에서는 현재 가지부터 확인한다. `main` 밖에서는 가지 이름을 적고 읽기 단계로 간다. 현재 편이 있으면 그 편에서, 없으면 가장 최근 편에서 목소리 이름을 읽는다. 작업 중에는 명령으로 현황을 한 줄 읽고 3번 ‘결과 올리기’로 간다. 기록은 결과 가지에만 올린다.

## 2. 증거

본문의 세 곳을 바탕에 적용한 뒤, 덧붙임의 ③·①은 요청서 원문과 바이트로 대조했다. ②는 목소리 이름과 출처만 출력하고 예외에는 ‘없음’을 표시하도록 다듬었다. 문서에서 아래 두 명령을 꺼내 제품 `jobs.py`와 임시 자료를 연결해 Git Bash에서 실행했다. 각 경우에 실행 전후 자료 파일의 내용이 일치했다.

**목소리 이름**

```bash
python3 -c "import sys; sys.path.insert(0,'app/webapp'); import jobs as J; b=J.busy(); js=[b] if b else J.list_jobs(); p=J.project_picks(J.project_name(js[0])) if js else None; v=(p or {}).get('voice'); print(('지금 편' if b else '최근 편')+' '+v if v else '없음')" 2>/dev/null || printf '%s\n' '없음'
```

**현재 현황**

```bash
python3 -c "import sys; sys.path.insert(0,'app/webapp'); import jobs as J; j=J.busy(); print((J.now_line(j) or {}).get('text') if j else '지금 만드는 편 없음')"
```

| 가짜 자료 | 목소리 출력 | 현황 출력 |
|---|---|---|
| 진행 중인 편과 날짜가 더 늦은 종료 편 | 지금 편 Terra-A | 보내신 것을 살펴보는 중이에요 |
| 종료 편 둘 | 최근 편 Terra-B | 지금 만드는 편 없음 |
| 편 없음 | 없음 | 지금 만드는 편 없음 |
| 최근 편의 저장 프로젝트 없음 | 없음 | 지금 만드는 편 없음 |
| 최근 편의 상태를 읽는 중 예외 | 없음 | 지금 만드는 편 없음 |

## 3. 바뀐 것

판 표기는 `판: 2026-11-22 · 2`이다. 바탕과 push 직전 원격 main은 `0cb507a88a18943470d5b5bacc4f4098f98f1ef7`이다. `feat/webapp-mac-now-v2-20261122`에서 본문 `9b8b9f3`에 덧붙임을 이었다. 최종 로컬·원격 머리는 `9c3b1c14960d72ad2c30728ea4436b8712a174fb`로 일치했다. 바탕 대비 `app/webapp/MAC_NOW.md` 한 파일에서 6줄 추가·5줄 삭제였고 `git diff --check`를 통과했다. 제품 코드와 시험 파일 변경은 0개다.

## 4. 남은 것

ARCH의 원문 대조와 RSCH의 제품 main 합침이 남았다.

## 5. 배운 것

진행 중인 편의 현황도 남기려면, 현황을 읽은 뒤 결과를 어디에 쓸지 같은 안내문에서 지정해야 한다.

## 6. 다음

제품 main에 합쳐진 뒤 맥 세션이 안내문을 다시 읽으면 판 2를 따른다.
