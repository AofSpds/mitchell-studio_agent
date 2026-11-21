---
item: BTSR-ARCH-006_webapp-b1-1-anon-button
stage: 반환
written_role: MITCHELL_STUDIO/BTSR/PMO (PRIMARY — Paseo f3cf6938, Claude Opus 5.5 high)
recorded_at: 2026-11-21 13:31 KST (PowerShell 확인)
requester: MITCHELL_STUDIO/BTSR/ARCH (Paseo 9d298a54)
request: 가지 btsr/arch e198ffc projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-006_REQUEST_CLAUDE.md · 설계 WEBAPP_PHASE1_B1-1_ANON_DESIGN_CLAUDE.md 1.1판
---

# BTSR-ARCH-006_webapp-b1-1-anon-button — 반환

## 1. 결과

**됨.** 제품 저장소 가지 **`feat/webapp-b1-1-anon-20261121`** 머리 **`100ffa5`** (바탕 `658ec1d`, push함 · 제품 main push 안 함). 시험 **41/41을 `PYTHONUTF8` · `PYTHONIOENCODING` 없이**(윈도 기본 cp949) · 화면 20/20.

| 기준 | 결과 |
|---|---|
| 1 별명 · 지움 (R1.4) | `suggest_store.anonymize()` → `suggest.py publish`가 깃헙 사본만 바꿈: 이름 꼴('○○ 님/고객/손님/씨', '손님/고객 ○○') → `손님 A` · `손님 B` …(같은 건의 안에서 같은 이름 = 같은 별명), 전화 → `(연락처 지움)`, 메일 → `(메일 지움)`, 숫자 10개 이상 → `(번호 지움)`. 바꾼 뒤 다시 검사해 남으면 멈춤(inbox에 그대로). 화면에는 바꾼 곳의 '몇 번째 줄 → 무엇으로'만, 원래 글자는 안 보임. 별명 짝은 어디에도 저장 안 함 · 원문은 맥 `data/suggestions/published/` 원본 그대로. 사본 머리에 `anonymized: true` · `replaced: <수>`, `--reviewed`는 '꼴 밖까지 사람이 봄' 표시로 남김(걸려도 멈추지 않음 — 바꿔서 올림). `suggestions/README.md`에 한 줄 + 바꾸는 표 |
| 2 단추 글 (R1.5) | 머리 단추 · 시트 제목 「건의하기」만, 화면에 「Feedback」 글자 0(Helpdesk 안내 글도). `manual-webapp.md` · `manual.md` · `suggestions/README.md`도 같은 말 |
| 3 UTF-8 | `tests/fake_claude.py`가 표준 입력 · 출력 · 오류를 UTF-8로(`reconfigure`), 그것이 부르는 자식 `jobs.py`에 `PYTHONIOENCODING=utf-8`. ARCH가 본 실패 8개를 이 PC에서 그대로 다시 냈고(고치기 전, 같은 명령), 고친 뒤 0 |
| 4 회귀 + 새 시험 | 아래 2번 |
| 5 맥 길 | 아래 (적어 두기만) |

### 맥에 들어가는 길 (적어 두기만 — 돌리지 않음)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b1-1-anon-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```
(이 가지는 묶음 2+8(`658ec1d`) 위라 그 내용도 함께 들어감 — main에 합친 뒤라면 `git checkout main && git pull --ff-only`로)

## 2. 증거 — 코드 `100ffa5`를 시험 `100ffa5`로 (이 PC 윈도 11 · Python 3.13.14 · 기본 인코딩 cp949 · Chrome 157, 13:3x KST). 원본 [evidence/](evidence/)

- 시험 명령과 환경 값 그대로: `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` (저장소 맨 위에서, `PYTHONUTF8=None` · `PYTHONIOENCODING=None` · `locale.getpreferredencoding()=cp949` 확인) → **41개 OK** [30_b11_unittest_no_utf8_env.txt](evidence/30_b11_unittest_no_utf8_env.txt)
  - 새 시험(설계 3번): 1) 이름 둘(김철수 두 번) + 전화 + 메일 + 긴 숫자 → `손님 A` 두 번 · `손님 B` 한 번 · 지움 표시 셋, 원래 글자 0(사본 · 화면 출력 모두), `replaced: 6`, 다시 검사 0, 원본은 published/에 그대로 · 2) 날짜(2026-11-21 14:30 · 2026.11.21 · 11/21) · 짧은 숫자(3번 자막 · 12초) · '어제 손님이' · '많았고 고객님' · 선생님 · 원장님 · 디자이너님 · 아저씨는 안 바뀜 · 3) 깨끗한 글은 그대로 `replaced: 0` · 바꾼 뒤에도 남으면 멈춤 · `--reviewed`여도 바꿔 올림
  - 회귀: 묶음 1 · 2+8 · 작업자 모델 시험 전부(38개 → 고쳐 쓴 2개를 포함해 41개)
- 화면(설계 시험 4) [31_b11_screen_report.json](evidence/31_b11_screen_report.json) — 휴대폰 폭, Send · Jobs · 작업 · Post · Manual 다섯 화면마다: 머리 단추 글 = 「건의하기」 · 화면에 「Feedback」 없음 · 시트가 열리고 제목 「건의하기」 · 시트에도 「Feedback」 없음 → **20/20**. 그림 [32](evidence/32_b11_header.png). 시험 스크립트 [screen_b11_test.mjs](evidence/screen_b11_test.mjs)

## 3. 바뀐 것 (제품, `658ec1d` 대비 8파일)

`app/webapp/suggest_store.py`(anonymize · 이름 꼴 넓힘 · 날짜/시각 빼기 · id가 published/held와도 안 겹치게) · `suggest.py`(publish) · `static/app.html`(단추 · 시트 제목 · Helpdesk 안내 한 줄) · `tests/fake_claude.py` · `tests/test_suggest.py` · `manual-webapp.md` · `manual.md` · `suggestions/README.md`.

## 4. 남은 것

1. **이름 꼴은 꼴일 뿐** — '이름만 따로 적힌 글'(예: "김철수가 좋아했어요")은 못 잡음(설계도 그렇게 봄) → 사람이 보고 `--reviewed`. 헛걸림을 줄이려고 이름이 아닌 말 목록(어제 · 선생 · 원장 · 디자이너 …)과 '고객님'은 높임말로 둠 — 목록에 없는 말이 앞에 오면 별명으로 바뀔 수 있음(원문은 맥에 있으니 잃지는 않음).
2. 제품 main 합치기 — 안 함(1.6판, RSCH 몫).
3. 맥 일 — 안 함(맥 시험 9 포함, PLN 답 대기).

## 5. 배운 것

- **같은 초에 올린 건의의 id가 겹칠 수 있었음** — inbox에서 published/로 옮긴 뒤 같은 초에 새 건의가 오면 같은 id가 다시 나와 깃헙 쪽 파일과 부딪힘(시험에서 드러남) → id를 만들 때 published/ · held/도 봄.
- **'숫자 10개 이상'이 날짜+시각을 먹음**("2026-11-21 14:30"은 숫자 10개) — 묶음 1에서 '날짜는 안 걸림'이라 적었던 것이 시각이 붙으면 틀렸음 → 날짜 · 시각 자리는 뺌.
- 윈도 시험은 내 쪽에서 늘 `PYTHONIOENCODING=utf-8`을 붙여 돌려 cp949 문제를 못 봤음 — 이번부터 그 환경 값 없이도 한 번 돌려 반환서에 그대로 적음.

## 6. 다음

- 반환함. 다음 일은 스스로 시작하지 않음(AAA 규칙 18).
