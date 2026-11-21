---
item: BTSR-ARCH-007_webapp-b3-intake-confirm
stage: 반환
written_role: MITCHELL_STUDIO/BTSR/PMO (PRIMARY — Paseo f3cf6938, Claude Opus 5.5 high)
recorded_at: 2026-11-21 13:42 KST (PowerShell 확인)
requester: MITCHELL_STUDIO/BTSR/ARCH (Paseo 9d298a54)
request: 가지 btsr/arch 2eafcf7 projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-007_REQUEST_CLAUDE.md · 설계 WEBAPP_PHASE1_B3_DESIGN_CLAUDE.md 1판
---

# BTSR-ARCH-007_webapp-b3-intake-confirm — 반환

## 1. 결과

**설계 1판 2–6번대로 됨.** 제품 저장소 가지 **`feat/webapp-b3-intake-20261121`** 머리 **`32b55dc`** (바탕 `100ffa5`, push함 · 제품 main push 안 함 · 맥 일 안 함). 시험 **52/52(`PYTHONUTF8` · `PYTHONIOENCODING` 없이)** · 화면 9/9.

| 기준 | 결과 |
|---|---|
| 1 일 둘 · verify | 차례표 일 `intake`(표만 — 도구에 Bash 없음, 상태는 서버가 바꿈) · `script`. 프롬프트 `prompts/intake.md` · `script.md`, 옛 `intake_script.md`는 `git mv`로 `prompts/archive/`. `verify`가 **파일 수정 시각 ≥ 그 실행 시작**까지 봄(지난 회차 파일로 통과 안 함 — 시험 9) |
| 2 `intake.json` (R3.2 · R3.6) | 새 `app/webapp/intake.py`의 `check()`가 설계 3번 꼴을 봄(소재 `kind` 넷 · 사실 필수 셋 · 값 없는데 sure 금지 · AI 얼굴 없으면 `plan: make` · `missing`은 before/after만). 접수 프롬프트: 요청 글 · 기록에 있으면 `sure: true`로 묻지 않음 · 모르면 `null` · AI 얼굴 없으면 묻지 않음. 제목은 서버가 표의 시술 · 변화로 정함(손님 이름 없이) |
| 3 물음 (R3.1 · R3.3 · R3.5) | 서버가 계산: ① 확실하지 않은 소재 → ② 확실하지 않은 사실 → ③ 빠진 자료 한 번. `questions.json`은 서버가 씀, 화면은 **지금 하나 + "물음 i/n"** + 고르는 단추(사실은 「다른 답 적기」 글 칸). `POST /api/job/answer {id, qid, choice | text}` → 답을 `intake.json`에 그대로(소재 kind · 사실 value/`from: "answer"` · 「이대로」는 `missing_ok`) + `answers/<시각>_<qid>.json`. 물음이 남아 있으면 원고 일 없음, 다 끝나면 ② done → `script` 일. **「더 보내기」** → `POST /api/batch {job}`이 그 작업의 batch를 돌려줘 같은 폴더에 더 올림(같은 이름은 업로드가 따로 이름 — 덮어쓰지 않음) → `/api/batch/done` → 접수를 다시, 이미 받은 사실 · 소재 답은 `answers/`에서 다시 넣어 다시 묻지 않음 |
| 4 원고 (R3.4 · 나-4) | `script_check` 옵션 없앰(OPTIONS에서 뺌 — 옛 옵션 파일 값은 `clean_options`가 버림, 오류 없음). 원고 「고칠 점」 → `feedback/` 저장 + `script` 일(고칠 점 경로를 일 글에) → ③ 다시 check. 「좋아요」 → `script_approvals: [{hash, at}]` 쌓음 → edit. edit 확인에 **`scenes.json` 자막 = 승인 원고 줄(썸네일 줄 빼고, 띄어쓰기만 맞춰 견줌)** + 지금 원고 hash = 마지막 승인 hash. ⑥ 목소리 확인 때 원고 hash가 승인과 다르면 ③을 다시 check("원고가 바뀌었어요 — 다시 확인해 주세요"), 띄어쓰기만 다르면 그대로(`recheck_script`) |
| 5 AI 얼굴 없을 때 | edit 일 글에 "장면 1은 템플릿이 허락하는 '결과 컷'으로, 'AI 합성' 표시 구간도 만들지 않습니다"(3-2 전까지) · 시술 전 없이 만들기로 했으면 script · edit 일 글에 '전 장면 · 전 표시 없음' |
| 6 남은 말 | ③ 「고칠 점」 뒤 글은 "받았어요 — 바로 고칠게요. 다 되면 알려 드려요."(③만 — 다른 단계는 묶음 6까지 지금 글), 원고 「좋아요」 "좋아요 — 이어서 만들게요". 새 화면 글 모두 말 시험 통과 — 목록 밖 개발 말 0 |
| 7 회귀 | 아래 2번 |
| 8 맥 길 | 아래 (적어 두기만) |

### 맥에 들어가는 길 (적어 두기만 — 돌리지 않음)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b3-intake-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거 — 코드 `32b55dc`를 시험 `32b55dc`로 (이 PC 윈도 11 · Python 3.13.14 · 기본 cp949 · Chrome 157). 원본 [evidence/](evidence/)

- 시험 명령 · 환경 그대로: 저장소 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` → **52개 OK** [40_b3_unittest_no_utf8_env.txt](evidence/40_b3_unittest_no_utf8_env.txt)
  - 새 `test_intake.py` 11: 설계 시험 1(헷갈리는 소재만 · 답이 표에 · 원고 감) · 2(연령만 · `from: answer` · 고를 수 없는 답 거절 · 다른 답 적기) · 3(빠짐 → 「이대로」 전 원고 없음 · `missing_ok` · script/edit 일 글 · **「더 보내기」를 진짜 서버로: 같은 batch · 같은 이름도 둘 다 남음 · 접수 다시 · 이미 한 사실 답 그대로**) · 4(AI 얼굴 없음 → 물음 0 · `plan: make`) · 6(원고 고칠 점 → 다시 씀) · 7(승인 hash · 자막 ≠ 승인이면 실패 · 띄어쓰기만 다르면 그대로 · 글 바뀌면 ③ check) · 8(`script_check` 없음 · 옛 값 무시) · 9(지난 회차 intake.json만 있으면 실패) · 꼴 검사
  - 회귀: 묶음 1 · 1-1 · 2+8 · 작업자 모델 시험(runner 시험은 일 둘로 맞춰 고침 — 접수 → 원고가 이어서 돎)
- 화면(설계 시험 5) [41_b3_screen_report.json](evidence/41_b3_screen_report.json) — 소재 하나 · 연령 · 시술 전 없음, 세 물음: "물음 1/3" 고르는 단추 넷(한 번에 하나) · 소재 꼬리표 격자 → 답하면 "물음 2/3" → 「다른 답 적기」 글 칸 → "물음 3/3" 「더 보내기 · 이대로 만들기」 → 다 답하면 카드 없어짐 · 사실 표에 답 · 접수 칸에 개발 말 없음 → **9/9**, 마지막 답 뒤 차례표에 `script` 일. 그림 [42](evidence/42_b3_q1.png)
- 바뀐 것: 100ffa5 대비 13파일 +646 −120.

## 3. 바뀐 것

새 `app/webapp/intake.py` · `prompts/intake.md` · `prompts/script.md` · `tests/test_intake.py`. 고침 `runner.py` · `jobs.py`(script_check 뺌 · `recheck_script` · 같은 분 묶음 번호) · `reel_api.py` · `server.py`(`/api/batch {job}`) · `static/app.html` · `prompts/edit.md` · `tests/fake_claude.py` · `tests/test_runner.py`. 옮김 `prompts/intake_script.md` → `prompts/archive/`.

## 4. 남은 것

1. **묶음 2의 숨은 결함을 이번에 고침** — 같은 분에 두 번째로 보낸 묶음(`…_HHMM_2`)은 작업 번호 꼴(`_` 하나)에 맞지 않아 `/api/batch/done`이 400이었음 → `…_HHMM-2`로. 묶음 2 가지(658ec1d)와 묶음 1-1 가지에는 이 고침이 없음 — 이 가지가 그 위라 합치면 들어감.
2. 접수 표 · 원고의 **진짜 품질**은 맥 시험(1차 끝, 결정 08)에서 처음 봄 — 지금은 가짜 claude로 흐름만.
3. 물음의 쉬운 말(「○○을(를) 골라 주세요」)은 받침 따라 조사를 고르지 않고 '을(를)'로 둠 — 다듬을지 봐 주세요.
4. 제품 main · 맥 — 하지 않음.

## 5. 배운 것

- 묶음 이름이 작업 번호가 되는 길(묶음 2)은 '같은 분 두 번째' 이름을 시험하지 않아 놓쳤음 — 실제 서버로 묶음을 여러 번 만드는 시험에서 드러남. 이름 → 번호 바꾸기는 꼴이 다른 입력(`_2`)까지 시험에 넣음.
- 끝난 단계는 화면에서 접혀 보이지 않으므로, 화면 시험은 접힌 칸을 펼친 뒤 봐야 함.

## 6. 다음

- 반환함. 다음 일은 스스로 시작하지 않음(AAA 규칙 18).
