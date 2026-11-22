# BTSR-PLN-002 덧붙임 — 맥에서 지금 할 일 한 장(`app/webapp/MAC_NOW.md`) — ARCH께 요청

| 칸 | 내용 |
|---|---|
| 요청하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo be41b33c) → ARCH (Paseo 7621f3de) |
| 쓴 때 | 2026-11-22 14:55 KST |
| 근거 | RSCH 요청서 003 73번(에이전트 저장소 main `6341136`) · 한알 14:48:27 「이거 경로만 주면 안되나요. 이걸 타자로 치기가 ;;」 → [결정 51](WEBAPP_PHASE1_DECISIONS_CLAUDE.md) · 결정 48 · 49 · 72번 ④ |
| 급함 | **급함** — 한알이 지금 새 한 편을 돌리심. 한 편이 끝나기 전에 main에. 글만(코드 · 시험 0) |

## 1. 무엇을 (PLN이 정함 — 글 그대로 써도 되고, 뜻이 같으면 ARCH가 다듬어도 됨)

제품 저장소 `app/webapp/MAC_NOW.md` 새 파일(글뿐). 맥의 「코덱스 excutor」가 한알의 「fetch 하고 MAC_NOW 대로 해 줘」를 받으면 읽는 한 장.

```
# 지금 맥에서 할 일 (MAC_NOW)

맥 세션이 이 글을 읽는 법: `git fetch` 뒤 `git show origin/main:app/webapp/MAC_NOW.md`. 맥 사본은 아래에 적혀 있을 때만 바꾼다. 한 편이 만들어지는 중이면 웹앱을 다시 켜지 않는다.

판: 2026-11-22 · 1

## 1. 읽기만 (언제든 — 아무것도 바꾸지 않음)
- `codex --version`
- `grep -n computer_use ~/.codex/config.toml` (없으면 '없음')
- ChatGPT 설정 Computer Use의 '항상 허용한 앱' 목록
- 지금 맥의 CapCut 작업 프로젝트에 들어간 목소리 이름 — `python3 -c "import sys; sys.path.insert(0,'app/webapp'); import jobs as J; job=J.busy(); print(J.project_picks(J.project_name(job)) if job else '지금 만드는 편 없음')"` (제품 사본 맨 위에서)

## 2. 지금 만드는 한 편
- 아직 만드는 중이면: 웹앱 화면의 지금 현황 한 줄을 적고 끝낸다(기다리거나 누르지 않음).
- 허락 창이 떠 있으면: 누르지 말고 창 맨 위 앱 이름과 단추 글을 그대로 적는다(허용은 한알이 한 번).
- 끝났으면(Post까지 왔거나 멈춤 · 개발자로 감): 3으로.

## 3. 결과 올리기
- MAC_RUN_PHASE1.md 공통의 '결과 올리기'대로 결과 가지에 올린다 — 묻지 않고 1(진행)로.
- 적을 것: 1의 넷 · 2의 현황(또는 한 편이 어디까지 갔는지 · 걸린 시간 · 멈춘 까닭) · 작업자 로그(`runs/…worker.md`)는 읽고 **요약만**(걸음 · 걸린 시간 · 뜬 창 · 오류) — 로그 파일 자체와 손님 파일 이름은 올리지 않는다.
- 끝에 한알께 한 줄: 올렸는지 · 다음에 한알이 할 것(없으면 '없음').
```

- `app/webapp/README.md`에 한 줄: '맥에서 지금 할 일 — `MAC_NOW.md`(한알은 「fetch 하고 MAC_NOW 대로 해 줘」)'.
- 1의 목소리 이름 줄: `J.busy()`가 dev로 간 옛 편을 못 잡으면(그 편이 이미 끝남) 옛 편의 프로젝트 이름으로 읽는 길로 ARCH가 바꿈 — 안 되면 그 줄은 빼고 '옛 편 목소리 이름은 나중에'.

## 2. 가지 · 맡길 길 · 합치기

- 바탕 = 제품 main(보낼 때 다시 봄 — 지금 `c364bf0`). 새 가지 · 두 파일(`MAC_NOW.md` 새로 · `README.md` 한 줄) · 코드 · 시험 0. 맡길 길은 ARCH(PMO 512aef6d — 고침 3-1과 같은 길).
- RSCH가 두 파일뿐인지 보고 합침(시험 다시 안 돌려도 됨). 합친 뒤 RSCH가 한알께 칠 말 하나.
- 앞으로: 맥에서 할 일이 바뀌면 PLN이 이 글의 새 판을 요청 → 같은 길. 판 줄을 올림.
- 칠 말의 글자(영어/한글)는 한알 답(RSCH가 여쭘)대로 — 한글이면 맥 세션이 그 말을 알아듣는 길을 ARCH가 안으로(한알 확인 뒤). 이 요청은 기다리지 않고 먼저 감.
- 반환: ARCH → PLN(가지 머리). PLN이 조건을 적어 RSCH에.
