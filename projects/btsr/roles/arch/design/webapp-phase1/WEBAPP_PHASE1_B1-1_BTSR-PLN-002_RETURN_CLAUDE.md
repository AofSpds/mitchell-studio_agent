# BTSR-PLN-002 묶음 1-1 (건의 글 별명 · 단추 글) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 쓴 때 | 2026-11-21 13:33 KST |
| 요청 | BTSR-PLN-002 — 요구 webapp-phase1 1.6판 R1.4 · R1.5 (`btsr/pln` `c735395`) |
| 아래 건 | 설계 [1.1판](WEBAPP_PHASE1_B1-1_ANON_DESIGN_CLAUDE.md) → PMO [BTSR-ARCH-006](WEBAPP_PHASE1_BTSR-ARCH-006_REQUEST_CLAUDE.md) · PMO 반환 원본 `btsr/pmo` `136edc7` `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B1-1_RETURN_CLAUDE.md` — ARCH가 기준 1–5와 대조해 받음 |

## 1. 결과

R1.4 · R1.5 됨. 제품 가지 **`feat/webapp-b1-1-anon-20261121` `100ffa5`** (바탕 main `658ec1d` — 앞서기만 함, push됨, main 합치기 안 함). 8파일 +143 −31.

| 요구 | 결과 |
|---|---|
| R1.4 | `suggest.py publish`가 깃헙 사본에서만 이름 꼴 → 손님 A · B …(같은 이름 = 같은 별명), 전화 · 메일 · 긴 숫자 → `(… 지움)`, 바꾼 뒤 다시 검사해 남으면 올리지 않음. 별명 짝은 어디에도 저장 안 함 · 원문은 맥 `data/suggestions/published/`에만 · 사본 머리 `anonymized` · `replaced`. 화면에는 바뀐 줄과 바뀐 말만(원래 글자 안 보임) |
| R1.5 | 머리 단추 · 시트 제목 「건의하기」만, 화면에 「Feedback」 글자 없음(코드 주석 · 함수 이름에만 남음) · 매뉴얼 같은 말 |
| 더 고친 것 | 가짜 `claude` 입출력 UTF-8 → 윈도 기본 글자판(cp949)에서도 시험 통과. 시험이 드러낸 결함 둘: 같은 초에 올린 건의 id가 `published/`와 겹칠 수 있었음 → 고침 · "2026-11-21 14:30"이 '긴 숫자'로 지워졌음 → 날짜 · 시각은 뺌 |

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b1-1-anon-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- PMO: `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` (저장소 맨 위, cp949) → 41/41 — 고치기 전 같은 명령으로 ARCH가 본 8개 실패를 다시 낸 뒤 고침. 화면 다섯 곳 20/20. 코드 커밋 = 시험 커밋 = `100ffa5`.
- ARCH 다시 확인(13:32 KST, fetch로 읽기만): 가지가 main `658ec1d`을 품음 · 저장소 전부를 따로 풀어 **`PYTHONUTF8` · `PYTHONIOENCODING` 없이** → 41 OK · `app.html`의 "Feedback" 3곳은 주석 1 · 함수 이름 2(화면 아님).

## 3. 바뀐 것

제품 가지 1개(위). 에이전트 저장소: 설계 1 · 1.1판 · ARCH-006 요청 · 이 반환서.

## 4. 남은 것

1. **main 합치기** — RSCH가 확인 뒤 앞으로 감기(1.6판).
2. 꼴로 못 잡는 이름(예: "김○○가 좋아했어요"처럼 님 · 손님이 안 붙은 이름)은 사람이 보고 `--reviewed`로 올림 — 원문은 맥에만 있으니 깃헙에 새지는 않지만, 올리는 이가 읽어야 함.

## 5. 배운 것

- 시험을 '고치기 전 실패를 같은 명령으로 다시 낸 뒤 고침'으로 남기니, 고침이 그 실패를 없앤 것임을 증거로 볼 수 있다.

## 6. 다음

반환함(AAA 규칙 18). ARCH는 묶음 3을 PMO에 BTSR-ARCH-007로(바탕 이 가지 `100ffa5`).
