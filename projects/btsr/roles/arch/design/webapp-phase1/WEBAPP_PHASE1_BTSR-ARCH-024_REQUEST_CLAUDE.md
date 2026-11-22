# BTSR-ARCH-024_webapp-mac-now — 요청 (급함 · 글만)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 7621f3de, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-22 14:58 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 512aef6d) |
| 위 요청 | PLN `btsr/pln` a006e78 `projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_MAC_NOW_REQUEST_CLAUDE.md` 본문 + 덧붙임 1 · 결정 51(한알 14:48:27 · 14:50:41) · 결정 48 · 49 · 50 |
| 급함 | 한알이 지금 새 한 편을 돌리심 — 그 편이 끝나기 전에 main에 |
| 바탕 | 제품 main(보낼 때 다시 봄 — 지금 **c364bf0**) → 새 가지 `feat/webapp-mac-now-20261122` |
| 파일 | **셋 · 글뿐** — `app/webapp/MAC_NOW.md`(새로) · `app/webapp/README.md`(한 줄) · `AGENTS.md`(한 칸). 코드 · 시험 0 |
| 맥 일 | 없음 · 제품 main push 안 함(RSCH가 셋뿐 · 글뿐인지 보고 합침) |

## 1. `app/webapp/MAC_NOW.md` — 이 글 그대로 (판 줄만 날짜 · 번호)

````
# 맥에서 지금 할 일 (MAC_NOW)

한알이 맥 세션에 「맥 할 일대로 해 줘」라고 하면 이 한 장을 한다(결정 51).
읽는 법: 제품 사본 맨 위에서 `git fetch` 뒤 `git show origin/main:app/webapp/MAC_NOW.md`. 이 세션에서 한 번 읽었으면, 같은 말을 다시 들을 때마다 이렇게 새로 읽는다.
판: 2026-11-22 · 1

## 0. 맥 사본 맞추기 (웹앱은 다시 켜지 않음 — 결정 48)
- `git diff --name-only HEAD origin/main`에 나온 파일이 **글뿐**(`.md`)이면 `git merge --ff-only origin/main`. 웹앱은 다시 켜지 않는다.
- 글 밖의 파일(코드 · 설정)이 하나라도 있으면 사본은 그대로 둔다. 결과에 '맥 사본이 main보다 뒤 — 한 편이 끝난 뒤 1-3'이라고 적는다.
- 앞으로 감기가 안 되면(사본에 다른 커밋 · 고친 파일) 아무것도 바꾸지 않고 그 까닭을 적는다.

## 1. 읽기만 (언제든 — 아무것도 바꾸지 않음)
- `codex --version`
- `grep -n computer_use ~/.codex/config.toml` (없으면 '없음')
- ChatGPT 설정 Computer Use의 '항상 허용한 앱' 목록
- 지금 만드는 편의 CapCut 프로젝트에 들어간 목소리 이름 — 제품 사본 맨 위에서
  `python3 -c "import sys; sys.path.insert(0,'app/webapp'); import jobs as J; job=J.busy(); print(J.project_picks(J.project_name(job)) if job else '지금 만드는 편 없음')"`
  (끝난 옛 편은 읽지 않음)

## 2. 지금 만드는 한 편
- 아직 만드는 중이면: 웹앱 화면의 지금 현황 한 줄을 적고 끝낸다. 기다리거나 누르지 않는다.
- 허락 창이 떠 있으면: 누르지 않는다. 창 맨 위 앱 이름과 단추 글을 그대로 적는다(허용은 한알이 한 번).
- 끝났으면(Post까지 왔거나, 멈춤 · 개발자로 감): 3으로.

## 3. 결과 올리기
- `MAC_RUN_PHASE1.md` 공통의 '결과 올리기'대로 결과 가지에 올린다 — 묻지 않고 1(올림)로.
- 적을 것: 0의 결과 · 1의 넷 · 2의 현황(또는 한 편이 어디까지 갔는지 · 걸린 시간 · 멈춘 까닭).
- 작업자 로그(그 편 `runs/`의 `…worker.md`)는 읽고 **요약만** — 걸음 · 걸린 시간 · 뜬 창의 글 · 오류 글. 로그 파일 자체와 손님 파일 이름은 올리지 않는다(사진 1 꼴로).
- 끝에 한알께 한 줄: 올렸는지 · 다음에 한알이 할 것(없으면 '없음').
````

## 2. `app/webapp/README.md` — 맨 위 목록(「웹앱 1차 기획안」 줄 아래)에 한 줄

```
- 맥에서 지금 할 일 — [`MAC_NOW.md`](MAC_NOW.md) (한알은 맥 세션에 「맥 할 일대로 해 줘」)
```

## 3. 제품 `AGENTS.md` — 「연습 카드 해 줘」 칸 뒤 · 「경험 기록」 칸 앞에 한 칸

```
## "맥 할 일대로 해 줘"
제품 사본 맨 위에서 `git fetch` 뒤 `git show origin/main:app/webapp/MAC_NOW.md`를 읽고 그 글대로 한다. 그 글에 없는 일은 하지 않는다.
```

- 맨 위 「아래 세 말」 줄은 고치지 않음(작업 카드 규칙의 말 — 이 칸은 카드가 아님).

## 4. 받아들임 기준

1. `git diff --stat <바탕> <머리>` = 위 세 파일뿐 · README +1 · AGENTS.md +3(빈 줄 포함) · MAC_NOW.md 새로.
2. 세 글이 위와 같음(바이트 대조) · 판 줄 `판: 2026-11-22 · 1`.
3. 시험 다시 안 돌려도 됨(글뿐) — 돌리면 기본 한 번.

## 5. 반환

6항목 + 가지 머리. 반환은 ARCH(Paseo 7621f3de)로. 어림 **15분**.
