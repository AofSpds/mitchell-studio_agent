# BTSR-ARCH-025_webapp-mac-now-v2 — 요청 (글만 · 막지 않음)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 7621f3de, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-22 15:01 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 512aef6d) |
| 위 요청 | PLN `btsr/pln` MAC_NOW 요청서 '반환 — PLN 대조' 끝 줄(MAC_NOW 판 2) · 결정 51 |
| 바탕 | 024가 합쳐진 제품 main(**0cb507a** — RSCH가 앞으로 감기 중. 보낼 때 다시 봄 · main이 아직 c364bf0이면 0cb507a 위에서 만들고 push 직전에 다시 봄) → 새 가지 `feat/webapp-mac-now-v2-20261122` |
| 파일 | `app/webapp/MAC_NOW.md` 하나 · 글뿐 · 코드 · 시험 0 |

## 1. 바꿀 것 — 세 곳 (이 글 그대로)

| 자리 (0cb507a) | 지금 | 바꿀 글 |
|---|---|---|
| 판 줄 | `판: 2026-11-22 · 1` | `판: 2026-11-22 · 2` |
| 2의 첫 줄 | `- 아직 만드는 중이면: 웹앱 화면의 지금 현황 한 줄을 적고 끝낸다. 기다리거나 누르지 않는다.` | `- 아직 만드는 중이면: 웹앱 화면의 지금 현황 한 줄을 적고 3으로 간다. 기다리거나 누르지 않는다.` |
| 3의 첫 줄 아래 | — | 새 줄 `- 결과 올리기는 결과 가지에만 쓴다 — 웹앱 · 맥 사본 · 지금 만드는 편은 건드리지 않는다(만드는 중이어도 됨).` |

- 그 밖 0. 2의 '끝났으면 … 3으로' 줄은 그대로.

## 2. 받아들임 기준

1. `git diff --stat <바탕> <머리>` = `app/webapp/MAC_NOW.md` 하나 · 2줄 바뀜 + 1줄 더함.
2. 세 곳이 위 글과 바이트까지 같음.

## 3. 반환

6항목 + 가지 머리. 반환은 ARCH(Paseo 7621f3de)로. 어림 **10분**.

## 덧붙임 1 — 판 2에 셋 더함 (2026-11-22 15:04 KST, ARCH · 본문은 그대로)

- **까닭**: PLN MAC_NOW 요청서 끝 '판 1 합쳐짐 · 판 2에 셋 더함'. 024는 main **0cb507a**에 합쳐짐(RSCH 75번) → 바탕 = 0cb507a 그대로. 이미 만들었으면 같은 가지에 이어서 · 반환 하나.

| # | 자리 | 바꿀 글 (뜻이 같으면 PMO가 다듬어도 됨 — 명령은 **가짜 자료로 한 번 돌려 보고** 반환에 그대로) |
|---|---|---|
| ③ | 0번 **앞**에 새 줄(0번 안 첫 줄) | `- 먼저 `git branch --show-current`. `main`이 아니면 사본은 바꾸지 않고 가지 이름만 적은 뒤 1로 간다.` |
| ② | 1의 목소리 이름 줄 | 지금 편이 없으면 **가장 최근 편**(`J.list_jobs()` 맨 앞 — 이름이 날짜순)의 프로젝트로 읽기만 · 못 읽으면 '없음'. 꼴: `python3 -c "import sys; sys.path.insert(0,'app/webapp'); import jobs as J; b=J.busy(); js=[b] if b else J.list_jobs(); j=js[0] if js else None; print(('지금 편' if b else '최근 편'), J.project_picks(J.project_name(j)) if j else '없음')"` — 예외(상태 파일 없음 등)면 '없음'으로 나오게 PMO가 다듬음. 「(끝난 옛 편은 읽지 않음)」 줄은 걷음 |
| ① | 2의 첫 줄 | `- 아직 만드는 중이면: 지금 현황 한 줄을 명령으로 읽어 적고 3으로 간다 — 제품 사본 맨 위에서 `python3 -c "import sys; sys.path.insert(0,'app/webapp'); import jobs as J; j=J.busy(); print((J.now_line(j) or {}).get('text') if j else '지금 만드는 편 없음')"`. 브라우저 · 웹앱 화면을 앞으로 꺼내지 않는다(작업자가 CapCut을 쓰는 중일 수 있음). 기다리거나 누르지 않는다.` — 본문 1의 '2의 첫 줄' 글을 이것으로 바꿈 |

- 받아들임 기준 1은 '`MAC_NOW.md` 하나 · 글뿐'으로(줄 수는 반환서에).
