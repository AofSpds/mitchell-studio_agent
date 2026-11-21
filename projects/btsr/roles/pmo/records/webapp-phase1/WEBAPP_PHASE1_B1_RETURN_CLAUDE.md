---
item: BTSR-ARCH-002_webapp-b1-suggest-words
stage: 반환
written_role: MITCHELL_STUDIO/BTSR/PMO (PRIMARY — Paseo f3cf6938, Claude Opus 5.5 high)
recorded_at: 2026-11-21 12:58 KST (PowerShell 확인)
requester: MITCHELL_STUDIO/BTSR/ARCH (Paseo 9d298a54)
request: 가지 btsr/arch 6cf028a projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_BTSR-ARCH-002_REQUEST_CLAUDE.md · 설계 WEBAPP_PHASE1_B1_DESIGN_CLAUDE.md 1판
---

# BTSR-ARCH-002_webapp-b1-suggest-words — 반환

## 1. 결과

**설계 2–6번대로 됨.** 제품 저장소 가지 **`feat/webapp-b1-suggest-20261121`** 머리 **`6cfbc5f`** (push함 · main 합치기 안 함). 바탕은 요청대로 `3495f7e`에서 시작했고, 그 사이 ARCH-003으로 main이 `e5785b3`이 되어 그 main을 이 가지에 합침(`329f0f1`, 이력 고쳐 쓰기 없음) — 지금 main보다 앞서기만 하고 뒤처짐 없음. 시험 19/19 · 화면 17/17.

| 기준 | 결과 |
|---|---|
| 1 건의함 (R1.1) | 머리를 어디서나 보이게(`position: sticky`) + 오른쪽 「Feedback 건의하기」. 시트: 알약 셋(고르기 전엔 보내기 꺼짐) · 글 1000자 · 손님 정보 안내 · 작업 화면이면 「고칠 점 적기」 안내 줄 · 보낸 뒤 toast "받았어요. 개발자가 읽어요." · 「내가 보낸 건의」 최근 10건. 보던 화면 · 작업 id · 지금 단계 · 휴대폰 시각이 붙고 **작업 제목은 안 붙음**. 서버 `POST/GET /api/suggest`(`reel_api` → 새 `suggest_store.py`) → `data/suggestions/inbox/<YYYY-MM-DD_HHMMSS>_<kind>[_n].md`(`O_EXCL`, 덮어쓰지 않음). `/api/feedback` · `/api/job/fix`는 손대지 않음 |
| 2 검토 도구 (R1.2) | `app/webapp/suggest.py list · show · publish [--reviewed] · hold --why` (표준 라이브러리만). 손님 정보 꼴(전화번호 · 숫자 10개 이상 · 메일 · '○○ 님/고객/손님')이 걸리면 `--reviewed` 없이 멈춤. 올리면 저장소 `suggestions/<YYYY-MM>/<id>.md`(`job` · `client_at` 뺌) + 원본은 `published/`로. git은 하지 않고 할 명령 한 줄만 보임. 저장소 맨 위 `suggestions/README.md` |
| 3 말 (R1.3 일부) | 4-6 표대로 + PMO가 더 지은 말은 아래 표. ②③④ 무리는 쉬운 말로만 바꾸고 남김. 연습 줄과 할 일 원문 보기는 Jobs · 작업 화면에서 빼서 Manual 맨 아래 「개발자용」(접힘) |
| 4 남은 말 목록 | `app/webapp/tests/test_words.py` + `words_allow.json` 24줄(묶음 2: 3 · 3: 1 · 5: 12 · 6: 1 · dev: 3 · keep: 4). 목록 밖 새 개발 말이 들어오면 실패, 목록 줄이 더는 화면에 없어도 실패(줄어드는 것이 셈이 됨) |
| 5 Manual | `manual-webapp.md` 다시 씀: Daily 세 줄(찍어요 → 보내요 → Jobs에서 봐요), Workflow · Status를 화면 말로, Help에 「Feedback」, `## 개발자용` 절. `manual.md` 웹앱 흐름 맞춤(+ ARCH-001 때 생긴 "ChatGPT ChatGPT" 한 곳 바로잡음) |
| 6 시험 | 아래 2번. 코드 커밋 = 시험 커밋 = `6cfbc5f` |
| 7 맥 길 | 아래 |

### 맥에 들어가는 길 (한 줄 — 합치기 전, 가지로)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b1-suggest-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

- main에 합친 뒤라면: `cd ~/mitchell_studio && git checkout main && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload`
- 휴대폰은 웹앱을 다시 열면 새 화면(맨 위 「Feedback」)이 보임. 맥 python3 3.9에서 도는 꼴로 씀(이 PC는 3.13으로 돌림).

### PMO가 더 지은 말 (4-6 표에 없던 것)

| 자리 | 전 | 후 |
|---|---|---|
| 단계 '누가' Done · Post | 완성, 확인 필요 / Claude 캡션 준비 · 총괄 디렉터님 게시 | 다 됐어요 — 확인해 주세요 / 캡션을 준비해요 — 올려 주세요 |
| 작업 딱지 | ○ 확인 대기 · ○ 대기 | ○ 확인해 주세요 · ○ 기다리는 중 |
| ⑥ 칸 꼬리 | ChatGPT | 맥에서 (Fit은 자동 그대로) |
| ⑥ 결과 · 할 일 | ChatGPT 결과: … / 할 일 카드: … | 받은 결과: … / 할 일: … |
| 고른 목소리 출처 | (CapCut 프로젝트) · (ChatGPT 결과) | (CapCut에 저장된 것) · (결과 줄) — 저장된 값은 그대로, 화면에서만 바꿈 |
| 장면표 | CapCut 프로젝트: x | CapCut 이름: x |
| 접수 | 접수 카드를 만드는 중이에요 | 보내신 것을 정리하는 중이에요 |
| 지금 차례 | 지금 카드: Voice · 준비됨 | 지금 차례: Voice · 준비됐어요 |
| 이름 직접 적기 | (목록에 없으면 ChatGPT가 멈추고 알려요) | (목록에 없으면 멈추고 알려 드려요) |
| 점검 | Preflight | 시작 전 점검 (Claude에게 하는 말 "Preflight 봐 줘"는 ③이라 남김) |
| 멈춤(서버) | ChatGPT 멈춤 — … | 멈췄어요 — … (화면 판별 정규식은 옛 글과 새 글 둘 다 받음) |
| 기다림(서버) | 결과 줄을 받았어요 — CapCut이 꺼지면 프로젝트 파일로 확인해요 | 끝났다는 소식을 받았어요 — CapCut이 꺼지면 저장된 것을 확인해요 |
| 원고 길 때(서버) | (ChatGPT는 내보내지 않고 멈춰요) | (영상은 아직 뽑지 않고 기다려요) |
| 완성 못 찾음(서버) | Export 확인: data/output에서 … (결과 줄의 파일: …) | Export 확인: 완성 영상을 못 찾았어요 (적힌 파일: …) |
| 그 밖(서버) | 할 카드가 없어요 · 카드 금지 목록에 … — Helpdesk · 같은 카드가 두 번 … · 프로젝트 파일로/을 … · 프로젝트 이름이 이상해요 · 카드 앞 백업이 없어요 · Claude(uploader)가 캡션을 준비해요 | 지금 할 차례가 없어요 · 작업 이름이 다른 이름과 겹쳐서 멈췄어요 (…) — Helpdesk를 눌러 주세요 · 같은 일이 두 번 … · CapCut에 저장된 것으로/을 … · CapCut 이름이 이상해요 · 앞으로 되돌릴 백업이 없어요 · 캡션을 준비해요 |
| 옵션 기본값 | ChatGPT가 알맞게 고름 | 알아서 골라요 — **옛 값은 `LEGACY`에 넣어 지금 기본값으로 읽힘**(옛 작업의 옵션 파일이 '그런 이름의 목소리'로 잘못 읽히지 않게) |
| ③ 띠 · 안내 | ChatGPT 대기 n건 · 맥 Codex 새 스레드에서 … · 사용량이 다시 생기면 … | 목소리·음악 넣기 기다리는 작업 n건 · 맥의 Codex 앱 새 창에서 …라고 보내 주세요 · 쓸 수 있는 양이 다시 생기면 … (앱 이름 · 하실 말은 남김 — 묶음 5) |
| ②④ 인계 | …라고만 말해 주세요 / 고칠 점을 저장했어요. Claude 앱에 … | 받았어요. Claude 앱에 "업로드 확인"이라고만 보내 주세요 — 그러면 Jobs에 작업이 생겨요 / 받았어요. Claude 앱에 "작업 확인"이라고 보내 주세요 — 그러면 고쳐요 |

## 2. 증거 — 코드 `6cfbc5f`를 시험 `6cfbc5f`로 (이 PC 윈도 · Python 3.13 · Chrome 157, 2026-11-21 12:5x KST). 원본 [evidence/](evidence/)

- `01_unittest.txt` — `python -m unittest discover -s app/webapp/tests -v` → **19개 OK**: 작업자 모델 6 · 건의함 11 · 쉬운 말 2. 진짜 웹앱 서버를 시험용 빈 폴더 · 127.0.0.1 빈 포트 · 시험용 PIN/SECRET으로 띄워 주소로 부름(`tests/_env.py`).
  - 시험 1: 갈래 셋 저장 · 갈래 밖 / 빈 글 / 1001자 / 없는 화면 400(저장 안 함) · 같은 초에 둘 → `_2` 둘 다 남음 · PIN 없이 401 · `X-Upload-App` 없이 403 · 없는 작업 id는 빼고 저장, 있는 작업 id는 단계와 함께 저장
  - 시험 2: 최근 10건 이하 · 첫 줄 60자 · 칸 넷(id · kind · received_at · first_line) · 같은 초면 나중에 쓴 것이 먼저
  - 시험 3: 전화번호 · 메일 · 긴 숫자 · '○○ 님'은 `--reviewed` 없이 멈추고 inbox에 그대로 · 날짜·시각은 안 걸림 · 깨끗한 글은 `suggestions/<YYYY-MM>/`로, 원본은 `published/`로 · 올린 파일에 `job`·`client_at` 없음 · `--reviewed`면 `reviewed: true` · `hold`는 `held/`에 남기고 까닭 파일
  - 시험 4: `test_words` — 남은 말 목록 밖 0 · 목록 줄 모두 쓰임 · 줄마다 묶음과 까닭 ([06_words_remaining.txt](evidence/06_words_remaining.txt) = 지금 남은 말 전부)
  - 시험 6(회귀): 묶음 만들기 → 올리기(PUT) → 작업 생김 → `/api/job/fix` → `data/working/<작업>/feedback/`에 1건 · `data/suggestions/`는 그대로 · 작업 화면 응답에 고칠 점이 보임
- `02_screen_report.json` — 시험 5(휴대폰 폭 390×844, 화면 없는 Chrome으로 시험용 웹앱): Send · Jobs · Post · Manual 네 화면에서 맨 아래로 스크롤해도 「Feedback」이 화면 안 · 시트가 열림 / 작업 화면: 단계 '누가' 8줄에 Claude·ChatGPT·카드 없음 · 고칠 점 안내 줄 · 갈래 전 보내기 꺼짐 → 고르면 켜짐 · 보낸 뒤 toast · 「내가 보낸 건의」에 보임 / Manual 「개발자용」 접힘 · Jobs 연습 줄 숨김 — **17/17**. 그림 [03](evidence/03_job_feedback_sent.png) · [04](evidence/04_feedback_send_view.png). 쓴 시험 스크립트 [screen_feedback_test.mjs](evidence/screen_feedback_test.mjs)(저장소 밖 시험 도구, 이 커밋이 시험 커밋)
- `05_diffstat.txt` — main 대비 13파일 +1017 −107.

## 3. 바뀐 것 (제품 저장소, main `e5785b3` 대비)

- 새 파일: `app/webapp/suggest_store.py` · `app/webapp/suggest.py` · `suggestions/README.md` · `app/webapp/tests/_env.py` · `test_suggest.py` · `test_words.py` · `words_allow.json`
- 고침: `app/webapp/static/app.html` · `reel_api.py` · `jobs.py` · `tests/test_worker_model.py`(공통 시험 폴더를 쓰게) · `agents/creative_director/manual-webapp.md` · `manual.md`
- 맥 `data/suggestions/`는 처음 건의가 올 때 생김(git 밖). 웹앱 다른 길은 그대로.

## 4. 남은 것

1. **제품 main 합치기** — 안 함(ARCH도 정하지 않음).
2. **R1.3 판정(PLN 확인 바람 — 설계 7번):** 묶음 1에서는 '②③④ 밖 개발 말 0 + 남은 말 목록 24줄'. 그 가운데 묶음 3(AI 얼굴 받기 — Daily 1번의 "ChatGPT 앱")은 설계 3-2 표에 없던 것이라 PMO가 묶음 3으로 적음 — 맞는지 봐 주세요.
3. **점검표 자세히(`preflight.py`의 C1~C15 글)**는 서버 글이지만 이번 말 시험 범위(설계 3-1이 든 `jobs.py` · `reel_api.py`)에 넣지 않음 — ③ 무리 통째로 묶음 5에서. 「시작 전 점검」 요약 줄만 바꿈.
4. **맥 화면 눈 확인** — 이 PC 화면 없는 Chrome으로 봄. 아이폰 사파리에서 머리 고정 · 시트 · 🎤 입력은 맥 시험 때.
5. 상황판 HTML(`build.py`)은 다시 만들지 않음 — 생성물(ARCH-001과 같음).

## 5. 배운 것

- 화면 글을 바꿀 때 **그 글이 저장되는 값인지** 먼저 본다 — 옵션 기본값 `AUTO`는 작업 옵션 파일에 그대로 저장되는 값이라, 이름만 바꾸면 옛 작업이 '그런 이름의 목소리'로 읽힘. 옛 값을 `LEGACY`로 넘겨 막음. 목소리 출처(`src`)처럼 저장된 값은 화면에서만 바꿔 보임.
- 시험 모듈이 여럿이면 `jobs.py`가 처음 불릴 때의 경로를 모두가 씀 — 공통 `_env.py`를 먼저 부르게 함.
- 클래스 속성에 넣은 함수는 메서드로 묶임(`self`가 첫 인자로 들어감) → `staticmethod`.
- 같은 초에 들어온 건의를 이름순으로 세우면 갈래 이름(`good` < `wish`) 순이 됨 → 받은 초, 그다음 파일 쓴 시각으로 세움.

## 6. 다음

- 반환함. 다음 일은 스스로 시작하지 않음(AAA 규칙 18).
