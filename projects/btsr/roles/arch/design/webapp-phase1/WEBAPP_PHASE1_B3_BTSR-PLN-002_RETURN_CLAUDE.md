# BTSR-PLN-002 묶음 3 (접수에서 확인만) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 쓴 때 | 2026-11-21 13:44 KST |
| 요청 | BTSR-PLN-002 — 요구 webapp-phase1 1.7판 R3.1–R3.6 (`btsr/pln` `5b85d56`) |
| 아래 건 | 설계 [1판](WEBAPP_PHASE1_B3_DESIGN_CLAUDE.md) → PMO [BTSR-ARCH-007](WEBAPP_PHASE1_BTSR-ARCH-007_REQUEST_CLAUDE.md) · PMO 반환 원본 `btsr/pmo` `19fb285` `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B3_RETURN_CLAUDE.md` — ARCH가 기준 1–8과 대조해 받음 |

## 1. 결과

R3.1–R3.6 이 PC에서 가짜 `claude`로 됨. 제품 가지 **`feat/webapp-b3-intake-20261121` `32b55dc`** (바탕 묶음 1-1 가지 `100ffa5` — 그것을 품음, push됨, main 합치기 안 함, 맥 일 안 함). main `658ec1d` 대비 13파일 +646 −120.

| 요구 | 결과 |
|---|---|
| R3.1 | 헷갈리는 소재만 물음 · 답이 `intake.json`의 그 파일 분류에 그대로 들어감(AI가 다시 해석하지 않음) |
| R3.2 | 요청 글 · 기록에 있는 사실은 묻지 않음 · 모르면 비워 둠(지어내지 않음) |
| R3.3 | 시술 전 소재가 없으면 「더 보내기」(같은 batch에 더함, 덮어쓰지 않음 → 접수 다시, 이미 한 답은 그대로) / 「이대로 만들기」(전 장면 · '전' 표시 없이). 고르기 전에는 원고를 쓰지 않음 |
| R3.4 | 원고 늘 확인(옵션 `script_check` 없앰, 옛 '끔' 값은 무시) · 원고 「고칠 점」 → 다시 씀 · 「좋아요」 → 승인 원고 hash 기록 · 편집 뒤 자막 = 승인 원고(다르면 편집 실패) · ⑥에서 원고 글이 바뀌면 ③ 다시 확인(공백만 다르면 그대로) |
| R3.5 | 서버가 물을 것을 계산 — 소재 → 사실 → 빠진 것 차례, **한 번에 하나** "물음 1/3", 고르는 답(고를 것이 없을 때만 글 칸) |
| R3.6 | AI 얼굴 사진이 없으면 묻지 않음(`plan: "make"`). 묶음 3-2 전까지 편집은 결과 컷으로, 합성 표시 없음 |

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b3-intake-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- PMO: `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v`(저장소 맨 위, cp949) → 52/52 — 설계 시험 1–4 · 6–9, 「더 보내기」는 진짜 서버로. 화면 9/9(물음 1/3 → 2/3 → 3/3 · 한 번에 하나 · 다른 답 적기 · 끝나면 카드 없어짐). 코드 커밋 = 시험 커밋 = `32b55dc`.
- ARCH 다시 확인(13:43 KST, fetch로 읽기만): 가지가 `100ffa5`을 품음 · 저장소 전부를 따로 풀어 `PYTHONUTF8` · `PYTHONIOENCODING` 없이 → 52 OK · `jobs.py` · `prompts/`에 `script_check` 없음.

## 3. 바뀐 것

제품 가지 1개(위) — 새 `app/webapp/intake.py`(꼴 검사 · 물음 계산 · 답 넣기), 일 `intake`(표만 · Bash 없음) / `script`, 옛 `prompts/intake_script.md`는 `prompts/archive/`로(git mv). 에이전트 저장소: 설계 1판 · ARCH-007 요청 · 이 반환서.

## 4. 남은 것

1. **지금 제품 main(`658ec1d`)에 숨은 결함** — 같은 분 안의 두 번째 묶음(`…_HHMM_2`)이 작업 번호 꼴에 안 맞아 `/api/batch/done`이 400. 고침은 이 가지에만 있음(`…_HHMM-2`). 묶음 1-1 · 3을 main에 넣으면 함께 들어감 — 합치기 차례를 정하실 때 봐 주세요.
2. 물음 글의 조사가 「을(를)」 그대로 — 쉬운 말(요25)에 맞게 받침을 보고 '을' / '를'을 고르게 다음 PMO 건(묶음 5 + 3-2)에 넣음(ARCH가 정함).
3. 접수 · 원고의 진짜 품질(진짜 Claude가 표를 어떻게 채우는지)은 1차 끝 맥 시험에서야 보임(결정 08).
4. main 합치기 — RSCH가 확인 뒤 앞으로 감기.

## 5. 배운 것

- 답을 AI가 아니라 서버가 표에 넣게 하니, '실제로 쓰인 분류 = 답'(R3.1)을 시험이 바로 견줄 수 있었다.
- 묶음 2의 결함이 묶음 3 시험에서 드러났다 — 묶음을 쌓아 갈수록 앞 묶음 길을 다시 지나는 시험이 쓸모 있다.

## 6. 다음

반환함(AAA 규칙 18). ARCH는 차례대로 묶음 5 + 3-2 설계.
