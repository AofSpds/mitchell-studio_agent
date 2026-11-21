# BTSR-PLN-002 묶음 1 (건의함 + 쉬운 말) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 쓴 때 | 2026-11-21 13:01 KST |
| 요청 | BTSR-PLN-002 (요구 webapp-phase1 1.3판, `btsr/pln` `48bff6b`) — 묶음 1 R1.1–R1.3 |
| 아래 건 | 설계 [WEBAPP_PHASE1_B1_DESIGN_CLAUDE.md](WEBAPP_PHASE1_B1_DESIGN_CLAUDE.md) 1판 → PMO [BTSR-ARCH-002](WEBAPP_PHASE1_BTSR-ARCH-002_REQUEST_CLAUDE.md) · PMO 반환 원본 `btsr/pmo` `ffdae27` `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B1_RETURN_CLAUDE.md` (증거 같은 폴더 `evidence/`, PMO가 더 지은 말 표) — ARCH가 기준 1–7과 대조해 받음 |

## 1. 결과

R1.1 · R1.2 됨, R1.3은 1.1판의 판정 꼴('손 인계 밖 개발 말 0 + 남은 말 목록')대로 됨. 제품 가지 **`feat/webapp-b1-suggest-20261121` `6cfbc5f`** (main `e5785b3`을 품음 — 앞서기만 함, push됨, **main 합치기 안 함**).

| 요구 | 결과 |
|---|---|
| R1.1 | 어느 화면에서나 「Feedback 건의하기」(머리 고정) → 알약 셋 · 글 1000자 · 손님 정보 안내 → `POST /api/suggest` → 맥 `data/suggestions/inbox/`(git 밖, 덮어쓰지 않음). 작업 제목은 붙지 않음. 「고칠 점」(`/api/job/fix` → `data/working/<작업>/feedback/`)과 자리 · 주소 · 화면이 따로 — 회귀 시험으로 섞이지 않음을 봄 |
| R1.2 | 검토 도구 `app/webapp/suggest.py` — 전화번호 · 메일 · 긴 숫자 · '○○ 님/고객/손님'이 걸리면 사람이 `--reviewed`를 주기 전에는 올리지 않음. 올리면 저장소 `suggestions/<YYYY-MM>/`(작업 id · 휴대폰 시각 뺌). git은 사람이 · 도구는 명령 한 줄만 보임. 물음 6 답 전이라 권고 1(맥에 쌓고 개발자가 보고 올림)의 꼴 |
| R1.3 | 손 인계 밖 개발 말 0 — `test_words.py`가 셈. 남은 말 목록 `words_allow.json` 24줄: 묶음 2 · 3줄, 묶음 3(→ 3-2, 아래 4-2) · 1줄, 묶음 5 · 12줄, 묶음 6 · 1줄, 개발자용(Manual 접힘 안에만) · 3줄, 남김 · 4줄(머리 '모델' = 사람 뜻 · 화면에 안 보이는 옛 값 바꾸기 표 2 · 웹앱이 안 열릴 때의 길) |

### 맥에 들어가는 길 (한 줄 — 합치기 전, 가지로)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b1-suggest-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- PMO: 시험 19/19(작업자 모델 6 · 건의함 11 — 진짜 서버를 시험 폴더 · 127.0.0.1로 띄워 401/403/400 · 같은 초 `_2` · 검토 도구 · 회귀 · 쉬운 말 2), 휴대폰 폭 화면 17/17(화면 없는 Chrome). 코드 커밋 = 시험 커밋 = `6cfbc5f`.
- ARCH 다시 확인(2026-11-21 13:01 KST, fetch로 읽기만): 가지가 main `e5785b3`을 품음(`merge-base --is-ancestor`) · main 대비 13파일 +1017 −107 · `git archive`로 따로 풀어 `python -m unittest discover -s app/webapp/tests` → **19 OK** · `words_allow.json`의 '개발자용' · '남김' 7줄을 하나씩 읽음 — 운영자 화면에 보이는 개발 말은 없음.

## 3. 바뀐 것

- 제품 가지: 새 파일 7(`suggest_store.py` · `suggest.py` · `suggestions/README.md` · 시험 4) · 고침 6(`app.html` · `reel_api.py` · `jobs.py` · 시험 1 · 매뉴얼 2).
- 옵션 기본값 글 "ChatGPT가 알맞게 고름" → "알아서 골라요" — 옛 작업 옵션 파일에 저장된 옛 값도 기본값으로 읽히게 함(PMO가 찾음).

## 4. 남은 것

1. **제품 main 합치기** — 누가 정하는지: PLN-003 때처럼 PLN이면 요청을 주세요.
2. 남은 말 목록에서 AI 얼굴 받기(Daily 1번 "ChatGPT 앱")를 PMO가 '묶음 3'으로 적음 — 손 인계 ①은 **묶음 3-2**. 묶음 3-2를 맡길 때 그 줄의 꼬리표를 고치게 함(판정에는 영향 없음).
3. 점검표 자세히(`preflight.py` C1~C15 글)는 ③ 무리 통째로 묶음 5에서 — 이번에는 「시작 전 점검」 요약 줄만.
4. 아이폰 사파리에서 머리 고정 · 시트 · 🎤 입력은 맥 시험 때 눈으로.
5. R1.3 전체는 묶음 6 반환 때 다시(1.1판).

## 5. 배운 것

- 화면 글이 **저장되는 값**이기도 한지 먼저 봐야 한다 — 설계 3-1에 적지 않았던 것을 PMO가 찾음. 다음 묶음 설계(말을 바꾸는 곳)에 "저장 값이면 옛 값도 읽히게"를 적는다.
- 남은 말을 시험이 세게 하니(목록 밖 0 · 목록 줄이 안 쓰이면 실패) R1.3을 묶음마다 줄어드는 수로 볼 수 있다.

## 6. 다음

반환함. 이 묶음의 다음 일(합치기 · 맥 확인)은 스스로 시작하지 않음(AAA 규칙 18). ARCH는 BTSR-PLN-002 차례대로 묶음 2 + 8을 PMO에 BTSR-ARCH-004로 맡김.
