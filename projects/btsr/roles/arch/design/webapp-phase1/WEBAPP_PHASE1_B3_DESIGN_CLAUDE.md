# 웹앱 1차 묶음 3 — 접수에서 확인만: 설계 1판

| 칸 | 내용 |
|---|---|
| 판 | 1판 — 2026-11-21 13:31 KST, ARCH가 씀 |
| 받은 요청 | BTSR-PLN-002 — 요구 webapp-phase1 1.7판 R3.1–R3.6 (`btsr/pln` `5b85d56`), 결정 11(R3.6) |
| 바탕 | 초안(main `45f8b7b`) 묶음 3(:207-213) · 화5(:392-397) · 화6(:411-415) · 나-4 · 나-10 · 라5(보완 :75) · 템플릿 `templates/reel-main/r1.md` §1 · §2(:28-36) · §3 |
| 본 코드 | 제품 main `658ec1d` (묶음 2 + 8이 든 것, 읽기만) |
| 맡김 | PMO가 BTSR-ARCH-006을 반환한 뒤 BTSR-ARCH-007로 (같은 `app.html`을 고치므로 006 가지 위에 쌓음) |

## 0. 지금 (658ec1d에서 본 것)

- 접수 · 원고는 일 하나(`intake_script`)다. Claude가 정하지 못한 칸이 있으면 `questions.json` `[{id, ask}]`을 쓰고 멈추고, 화면은 물음 최대 5개를 **글 칸**으로 한꺼번에 받는다 → 답이 오면 같은 일을 처음부터 다시 부른다.
- 소재 가르기(전 · 후 · AI 얼굴) · '빠졌어요' · '더 보내기 / 이대로'가 프롬프트 · 상태 · 화면 어디에도 없다. 보내기 화면은 파일 수만 센다.
- 옵션 `script_check`(원고 확인 켬/끔, jobs.py:112)를 Claude가 프롬프트에서 보고 고른다.
- 원고 「고칠 점」은 저장만 되고 다시 쓰이지 않는다(차례표에 안 넣음, 화면 글은 아직 "Claude 앱에 '작업 확인'").
- 원고를 승인할 때 무엇을 승인했는지(hash) 남지 않는다 → R3.4를 잇는 고리가 없다.
- `verify`는 `questions.json`이 이번에 새로 쓴 것인지 보지 않는다.

## 1. 한 줄

접수를 **AI가 표(`intake.json`)로 채우는 일**과 **서버가 그 표에서 확실하지 않은 것만 하나씩 묻는 일**로 나눈다. 답은 서버가 표에 그대로 넣고(AI가 다시 해석하지 않음), 다 채워지면 원고 일을 부른다. 원고는 늘 확인받고, 승인한 원고의 hash를 남겨 영상의 말 · 자막과 견준다.

## 2. 일을 둘로 — `intake` · `script` (차례표 길 `claude`)

| 일 | 하는 것 | 끝난 뒤 서버가 확인 |
|---|---|---|
| `intake` | 소재를 가르고 사실을 채워 `intake.json` + `intake.md`(사람이 읽는 표)를 씀. **묻지 않음** | `intake.json`이 이번 실행 뒤에 쓰였고 꼴이 맞음(3번) |
| `script` | `intake.json`(답이 들어간 것)대로 `script.md`를 씀 → `jobs.py set script check` | `script.md`가 이번 실행 뒤에 쓰였고 ③ `check` |

- 프롬프트 `prompts/intake.md` · `prompts/script.md`로 나눈다(`intake_script.md`는 지우지 않고 `prompts/archive/`로).
- 서버 흐름: `intake` 끝 → 3-2의 물을 것 계산 → 없으면 바로 `script` 일 / 있으면 ② `check` + 첫 물음.
- `verify`는 파일 수정 시각이 그 실행의 시작보다 뒤인지까지 본다(지난 회차 파일로 통과하지 않게).

## 3. `intake.json` — AI가 채우는 표

```json
{
  "materials": [ {"file": "IMG_0012.jpg", "kind": "after", "sure": true},
                 {"file": "IMG_0013.jpg", "kind": "before", "sure": false, "why": "조명이 달라 헷갈려요"} ],
  "facts": {
    "treatment":  {"value": "디지털펌", "from": "request", "sure": true},
    "change":     {"value": "뒷볼륨",   "from": "request", "sure": true},
    "model_age":  {"value": null,       "from": null,      "sure": false, "choices": ["20대", "30대", "40대", "50대"]}
  },
  "ai_face": {"have": false, "plan": "make"},
  "missing": ["before"],
  "missing_ok": []
}
```

- `materials[].kind` ∈ `before` · `after` · `ai_face` · `other` (화면 이름은 app.html의 `ROLE` 이름을 씀). `sure`는 AI가 확신이 낮으면 거짓 + 한 줄 까닭(R3.5).
- `facts`는 템플릿 §1의 필수 셋(오늘 한 시술 · 보여줄 변화 · 모델 연령). `from` ∈ `request`(요청 글) · `record`(지난 작업 기록) · `answer`(운영자 답) · `null`. **요청 글 · 기록에 있으면 `sure: true`로 두고 묻지 않는다**(R3.2). 없으면 `value: null` · `sure: false` — 지어내지 않는다(기5). 고를 수 있으면 `choices`.
- `ai_face`: AI 얼굴 사진이 소재에 없으면 `{"have": false, "plan": "make"}` — **묻지 않는다**(R3.6). 있으면 `{"have": true, "file": …}`.
- `missing`: 웹앱이 만들 수 없는 자료만(`before` · `after`) — 템플릿 §2 장면표에 쓰는 것 기준. AI 얼굴은 여기에 넣지 않는다(R3.6).
- `intake.md`는 지금처럼 `| 항목 | 내용 |` 표(사람이 읽음) — 서버는 `intake.json`만 믿는다.

## 4. 물을 것 — 서버가 계산, 한 번에 하나 (R3.1 · R3.3 · R3.5)

- 차례: ① `sure: false`인 소재마다 → ② `sure: false`인 사실마다 → ③ `missing`이 있으면 한 번. `questions.json` = `[{id, kind, ask, choices, file?, field?}]`을 **서버가** 쓴다.

| kind | 물음 (쉬운 말) | 답 |
|---|---|---|
| `material` | 이 사진은 어느 쪽인가요? (그림을 크게) | 시술 전 · 시술 후 · AI 얼굴 · 쓰지 않음 |
| `fact` | 모델 연령을 골라 주세요 / 오늘 한 시술이 맞나요? | `choices` 중 하나 · 「다른 답 적기」(글 칸 — 고를 것이 없을 때만) |
| `missing` | 시술 전 사진이 없어요. | 「더 보내기」 · 「이대로 만들기」 (작은 글 "이대로 만들면 '시술 전' 장면 없이 만들어요.") |

- 화면(화5): ② 접수 칸 맨 위에 **지금 물음 카드 하나** + "물음 1/3". 그 위에 소재 격자(그림마다 꼬리표 — 확실한 것은 흐리게, 지금 묻는 것은 테두리. 확실한 것도 눌러 고칠 수 있음)와 사실 세 줄(읽기만). 답하면 다음 물음.
- `POST /api/job/answer {id, qid, choice | text}` — 하나씩. 서버가 **그 자리에서 `intake.json`을 고친다**: 소재 → `kind` 바꾸고 `sure: true` · 사실 → `value` · `from: "answer"` · `sure: true` · 빠짐 「이대로」 → `missing_ok`에 더함. 답 기록은 `answers/<시각>_<qid>.json`(덮어쓰지 않음).
- 「더 보내기」 → 보내기 화면이 **그 작업의 batch**에 더 올리게 열림(`/api/batch?job=<id>` — 같은 `data/incoming/<batch>/`에 더함, 덮어쓰지 않음) → 다 보내면 `/api/batch/done` → 작업이 있으면 `intake`를 다시 부른다(소재를 처음부터 다시 가름, 이미 받은 사실 답은 `answers/`에서 그대로 넣음).
- 다 채워지면(물을 것 0) → ② `done` → `script` 일. **고르기 전에는 원고 일을 부르지 않는다**(R3.3) — '지금' 줄 "고르실 때까지 기다리고 있어요".
- 실제로 쓰인 분류 = `intake.json`의 `materials[].kind` — 답이 그대로 들어가 있으므로 시험으로 견줄 수 있다(R3.1).

## 5. 원고 (화6 · R3.4 · 나-4)

- **원고 확인은 늘 켬**: 옵션 `script_check`를 없앤다(OPTIONS에서 뺌 · 옛 작업 옵션 파일의 값은 읽지 않고 버림 — 저장 값이라 옛 값이 남아도 오류 없이 무시). 프롬프트는 늘 `script check`.
- `script` 프롬프트: `intake.json`의 사실만 쓴다(없는 시술 사실 금지 — R3.2 · 기5). `missing_ok`에 `before`가 있으면 **시술 전 장면 · '전' 표시를 만들지 않는다**(R3.3) — `edit` 프롬프트에도 같은 줄.
- 「고칠 점 적기」(원고) → `feedback/script_<시각>.txt` 저장 + **차례표에 `script` 일**(고칠 점 경로를 넣어) → 다시 쓰고 ③ `check` — 화면 글 "받았어요 — 바로 고칠게요. 다 되면 알려 드려요."(③에서만. 다른 단계의 「고칠 점」은 묶음 6까지 지금 글 그대로 — `words_allow.json`에서 그 줄은 ③ 몫만 지움).
- 「좋아요」 → `script_approvals: [{hash, at}]`를 쌓음(`script_hash`, 덮어쓰지 않음) → `edit` 일(지금처럼). 화면 글 "좋아요 — 이어서 만들게요".
- **승인한 원고와 같은지 (R3.4):**
  - `edit` 끝난 뒤 확인에 더함: `scenes.json`의 자막 글 = 승인한 원고 줄(썸네일 줄 뺌, 공백만 맞춰 견줌). 다르면 실패(한 번 다시 → stop).
  - ⑥에서 원고가 바뀌어 `voice_script`(지금 hash) ≠ 마지막 승인 hash가 되면 → ③을 다시 `check`로("원고가 바뀌었어요 — 다시 확인해 주세요"). 글이 그대로이고 시간만 맞춘 것은 hash가 같아 다시 묻지 않는다 [안 — 라5 그대로].

## 6. AI 얼굴이 없을 때 — 묶음 3-2 전까지 (R3.6)

- 접수는 `ai_face.plan: "make"`로 두고 묻지 않는다. 접수 표에 "AI 얼굴: 만들 예정"(나-10).
- 묶음 3-2(Face 단계)가 들어오기 전에는 `edit`이 템플릿 §2 장면 1의 "결과 컷"을 쓴다(템플릿이 허락하는 다른 하나 — "결과 컷 또는 승인된 모델 컷"). AI 구간이 없으니 합성 표시도 없다. 3-2가 들어오면 Face 단계가 원고 뒤 · 편집 앞에 끼고 이 줄을 지운다.

## 7. 지킬 것

- 기2: 물음 · 답 · `intake.json`에 손님 이름 · 연락처 없음(글 칸에 안내 한 줄). 기5: 모르면 `null`로 두고 묻는다.
- 남은 말 목록: 새 화면 글은 4-6 · 1.6판 R1.5 말대로, 목록 밖 개발 말 0.
- 앞1 · AAA 규칙 24: 아래 시험 모두 + 회귀, 코드 커밋 + 시험 커밋 · 시험 명령과 환경 값을 반환서에.

## 8. 시험 (가짜 `claude` — 묶음 2의 `fake_claude.py`를 넓혀 `intake.json` · `script.md` · `scenes.json`을 정한 대로 씀)

1. 분명한 소재 둘 + 헷갈리는 소재 하나 → 물음은 그 하나만 · 답 → `intake.json` 그 파일 `kind` = 답 · 원고 일 감 (R3.1)
2. 요청 글에 시술 · 변화가 있고 연령만 없음 → 연령 물음 하나만 · 답이 `from: "answer"` (R3.2)
3. 시술 전 소재 없음 → 「이대로」 전에는 원고 일 없음 · 「이대로」 → 원고 · 편집 프롬프트에 '전 장면 없음' · `missing_ok` (R3.3) / 「더 보내기」 → 같은 batch에 더해짐(덮어쓰지 않음) · 접수 다시 · 이미 한 사실 답은 다시 묻지 않음
4. AI 얼굴 사진 없음 → 물음 0 · `ai_face.plan: "make"` (R3.6)
5. 물음 셋 → 화면에 한 번에 하나 · "물음 1/3" · 고르는 단추 (R3.5) — 화면 시험
6. 원고 「고칠 점」 → `script` 일 → ③ 다시 `check` · 화면 글 (화6)
7. 「좋아요」 → `script_approvals` 쌓임 · `edit` 뒤 자막 ≠ 승인 원고면 실패 · ⑥에서 원고 바뀌면 ③ 다시 `check` · 글 같고 시간만 다르면 그대로 (R3.4)
8. `script_check` 옵션이 화면 · OPTIONS에 없음 · 옛 옵션 파일에 `script_check: 끔`이 있어도 원고 확인 (나-4)
9. `verify`: 지난 회차 `intake.json`만 있으면 실패
10. 회귀: 저장소 전부 · 지금 시험 전부(윈도는 ARCH-006 뒤 `PYTHONUTF8` 없이)

## 9. 범위 밖

- AI 얼굴 만들기 · Face 단계(묶음 3-2) · ⑥(5) · 다른 단계의 고치기(6) · 알림(4).
- 맥 일 — 1차 끝 맥 시험에(결정 08). 맥 길은 적어 두기만.
