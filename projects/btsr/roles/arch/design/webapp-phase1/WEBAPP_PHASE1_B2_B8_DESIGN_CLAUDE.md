# 웹앱 1차 묶음 2 + 8 — 서버가 일을 시작시킴 · 템플릿 자리: 설계 1판

| 칸 | 내용 |
|---|---|
| 판 | 1판 — 2026-11-21 12:50 KST, ARCH가 씀 |
| 받은 요청 | BTSR-PLN-002 (요구 webapp-phase1 1.1판, 가지 `btsr/pln` `065e0f4`) — 묶음 2 R2.1–R2.4 · 묶음 8 R8.1–R8.3 · 요청 3번 1 · 3 |
| 바탕 | RSCH 기획안 초안(main `45f8b7b`) 묶음 2(:188-198) · 묶음 8(:200-205) · 3 · 3-2 · 5 · 6의 서버 쪽 메모, 템1–템5, 다-요24 · 다-템2 · 다-템4 |
| 본 코드 | 제품 `origin/fix/worker-model-sol-20261121` `3495f7e` (읽기만). 묶음 1(BTSR-ARCH-002) 가지 위에 얹음 |
| 맡김 | PMO가 BTSR-ARCH-002를 반환한 뒤 BTSR-ARCH-004로 |

## 0. 지금 (코드에서 본 것)

- 서버는 작업을 만들지 않는다. `/api/batch` · `PUT /api/upload` · `/api/request`는 `data/incoming/<batch>/`에 파일만 둔다. `new_job`을 부르는 곳은 명령줄(`jobs.py new`) 하나 — 운영자가 Claude 앱에 "업로드 확인"이라고 말하면 총괄 Claude 세션이 `app/webapp/README.md`:8-19 순서로 손으로 한다(손 인계 ②).
- 서버의 배경 일은 `ticker` 스레드 하나(⑥ 결과 줄 · Fit · 완성본 찾기). 맥의 Claude · Codex를 부르는 코드는 서버에 없다. `app/agent_bridge.py`는 사람이 대화에서 쓰는 한 번 부르기 도구(timeout · 출력 잡기 · 권한 모드 없음).
- `status.json`은 서버 스레드와 따로 뜬 `jobs.py set` 프로세스가 프로세스 사이 잠금 없이 고친다(`_SYNC_LOCK`은 서버 안에서만).
- 템플릿은 `agents/rsch/templates/reel-workflow.md` 한 파일(11-09 확정, 판 번호 없음 — git 이력만). `status.json`에 템플릿 id · 판이 없다. 규격 판정(`output_info.ok`)에 목소리 겹침 · 작업 밖 변경이 섞여 있고, `approved_at`은 하나라 v2 승인 때 덮인다.

## 1. 한 줄

서버 안에 **일 차례표(디스크에 남는 큐) + 길(lane)마다 일꾼 하나**를 두고, 보내기가 끝나면 서버가 작업을 만들어 **맥의 Claude를 명령줄로(사람 없이) 불러** 접수 · 원고를 한다. 부른 것마다 기록이 남고, 실패는 그 작업만 멈춘다. 템플릿은 저장소 맨 위 `templates/<id>/r<N>.md`로 판을 쌓고, 작업은 만들 때의 판을 끝까지 쓴다.

## 2. 묶음 2 — 서버가 일을 시작시키는 구조

### 2-1 보내기 끝 → 작업 만들기 (R2.1)

- 새 주소 `POST /api/batch/done {batch}` — 화면이 파일 올리기와 요청 글 저장을 모두 끝낸 뒤 부른다. 서버는 `data/incoming/<batch>/`에 파일이 있는지 보고:
  1. 작업 id = batch 이름 그대로(`YYYY-MM-DD_HHMM`, 소문자 · `JOB_RE`에 맞음, 겹치면 `-2`). **손님 코드 · 시술 이름을 id에 넣지 않는다**(기2 — 제목은 접수가 끝난 뒤 `title`에만, 손님 이름 없이).
  2. `new_job` (지금 함수 그대로) + 템플릿 판 기록(4-2).
  3. 차례표에 `intake_script` 일 하나를 넣는다.
  4. 응답 `{ok, job}` → 화면은 바로 그 작업 화면으로(화2 → 화4).
- 같은 batch로 두 번 부르면 같은 작업을 돌려줄 뿐 새로 만들지 않는다.
- 화면의 "Claude 앱에 '업로드 확인'…" 안내(app.html:225 · :535)는 이 묶음에서 지우고 `words_allow.json`에서 그 줄을 뺀다(묶음 1 3-3).

### 2-2 차례표와 일꾼 — `app/webapp/runner.py` (R2.3)

- 차례표 = `data/working/_queue/<순번>_<작업>_<종류>.json` 파일 하나가 일 하나: `{seq, job, kind, lane, state, tries, enqueued_at, started_at, ended_at, rc, outcome, log}`. `state` ∈ `queued · running · done · failed`. 지우지 않고 끝난 것은 `_queue/done/`로 옮긴다.
- **길(lane)마다 일꾼 스레드 하나**, 길 안에서는 들어온 차례(순번)대로:

| 길 | 이 묶음의 일 | 뒤 묶음이 넣을 일 |
|---|---|---|
| `claude` | `intake_script` (접수 + 원고) | `fix`(묶음 6 고치기) · 묶음 3의 이어 하기 |
| `mac_gui` | — (자리만) | ⑥ 작업자 깨우기(묶음 5) · AI 얼굴(묶음 3-2) — 맥 화면을 쓰는 일은 한 번에 하나 |

- 한 일이 실패하면 그 일만 `failed` + 그 작업의 단계 `stop`, 일꾼은 다음 일로 간다 → 한 편이 멈춰도 다른 편이 간다(다-요24). 길이 둘이라 화면 쓰는 일이 오래 걸려도 Claude 일은 막히지 않는다.
- 서버가 다시 켜지면 `running`으로 남은 일은 `tries`가 1이면 한 번 다시 `queued`, 2 이상이면 `failed`("하던 중 맥이 다시 켜졌어요").
- 일꾼은 `server.py`에서 `ticker` 옆에 띄운다. `WEBAPP_RUNNER=0`이면 끔(시험 · 윈도용).

### 2-3 맥의 Claude를 부르는 길 (요청 3번 1)

- 명령: `claude -p --output-format json --permission-mode acceptEdits --allowedTools "<목록>" --max-turns <N>` + 표준 입력으로 일 글. cwd = 저장소 맨 위, `timeout` = 기본 15분(`WEBAPP_CLAUDE_TIMEOUT`).
  - `<목록>` = Read · Write · Edit · Glob · Grep · `Bash(python3 app/webapp/jobs.py:*)` — 저장소 밖을 쓰거나 다른 명령을 돌리지 않게.
  - **PMO가 맥에서 `claude --help`로 이 플래그들이 그 판에 있는지 먼저 확인**하고, 다르면 같은 뜻의 것으로 바꿔 반환서에 적는다(ARCH는 맥의 CLI 판을 보지 못함).
- 실행 파일: `WEBAPP_CLAUDE_BIN` → 없으면 `shutil.which("claude")`(PATH에 `/opt/homebrew/bin:/usr/local/bin:~/.local/bin`을 붙인 뒤). launchd로 뜬 서버에서도 찾게.
- 일 글 = `app/webapp/prompts/intake_script.md`(저장소에 둠) + 작업 id · batch 경로 · 템플릿 판 경로를 채운 것. 내용은 지금 README:8-19의 "업로드 확인" 순서에서 `jobs.py new`를 뺀 것(서버가 이미 함) — intake.md · script.md를 쓰고 `jobs.py set`으로 단계를 바꾼다. **채팅으로 묻지 않는다** — 물을 것이 있으면 2-4.
- 출력: stdout · stderr를 `data/working/<작업>/runs/<순번>_<종류>.log`에, 끝에 `rc` · 걸린 시간 · json 결과의 요약을 일 파일에.
- 끝난 뒤 서버가 확인: rc 0 이고 ② 접수가 `done` 이고 ③ 원고가 `check`(또는 2-4의 `check` 물음)인지. 아니면 실패로 본다 — "Claude가 끝났다"만으로 믿지 않는다.
- 실패면 **한 번만** 다시(같은 일 글, `tries` 2). 그래도 안 되면 단계 `stop` + 쉬운 말 이유(2-5). 그 뒤 저절로 다시 하지 않는다(미5 권고 — 개발자가 본 뒤).

### 2-4 접수에서 물을 것이 있을 때 (묶음 3이 넓힐 자리)

- Claude가 필수 3칸(오늘 한 시술 · 보여줄 변화 · 모델 연령)을 채우지 못하면 `data/working/<작업>/questions.json`(`[{id, ask}]`)을 쓰고 `jobs.py set <작업> intake check --reason "물어볼 것이 있어요"` 하고 끝낸다.
- 화면: 접수 단계에 물음과 글 칸 → `POST /api/job/answer {id, answers}` → `answers_<시각>.json` 저장 → 차례표에 `intake_script`(이어 하기 — 일 글에 답 파일 경로).
- 묶음 3이 이것을 '확실하지 않은 것만 · 고르는 답'으로 바꾼다. 이 묶음은 글 칸 하나까지.

### 2-5 실패 기록과 화면 (R2.2)

- `status.json` 최상위에 `runs: [{seq, kind, started_at, ended_at, outcome, log}]`를 쌓는다(덮어쓰지 않음). 단계의 `reason`은 쉬운 말 한 줄:

| 무엇 | 화면 글 [안] |
|---|---|
| 실행 파일 없음 · 로그인 안 됨 | 맥의 도우미가 준비되어 있지 않아요. 개발자가 볼게요 — 하실 일 없어요. |
| timeout | 시간이 너무 오래 걸려 멈췄어요. 개발자가 볼게요 — 하실 일 없어요. |
| 끝났는데 결과 파일이 없음 | 다 하지 못했어요. 개발자가 볼게요 — 하실 일 없어요. |
| 사용량 한도 (출력에 한도 글) | 지금 쓸 수 있는 양을 다 썼어요. 풀리면 이어 할게요. — 묶음 5의 저절로 잇기 전까지는 개발자가 다시 넣음 |

- 개발자는 `runs`의 `log`로 같은 작업의 일을 따라간다(다-요22의 바탕).

### 2-6 status.json 잠금

- `jobs.py`의 읽고-고치고-쓰기(`save_status`를 부르는 모든 길)를 `data/working/<작업>/.status.lock`에 `fcntl.flock`로 감싼다 → 서버 스레드와 Claude가 띄운 `jobs.py set`이 겹쳐도 하나씩. 윈도(시험)에서는 `fcntl`이 없으면 프로세스 안 잠금만.

### 2-7 남는 손 인계 (R2.4)

- ③ 원고 「좋아요」 뒤 ④ 편집(scenes.json + `capcut_build.mjs`)은 지금도 사람이 Claude에게 말해야 시작된다. **이 묶음은 접수 · 원고까지**(요구 R2.1) — ④를 차례표의 `edit` 일로 넣을지는 PLN께 여쭘(7번). 넣으면 길 `claude`, CapCut이 꺼져 있을 때만(capcut 지침 C4) 시작하고 켜져 있으면 "기다리는 중".
- ⑥(손 인계 ③)은 묶음 5, 「고칠 점」 뒤(④)는 묶음 6.

### 2-8 컴퓨터 유즈 (요청 3번 2)

- 이 묶음에는 없다 — Claude는 명령줄로 파일만 쓴다. 맥 화면을 쓰는 일(⑥ · AI 얼굴)은 길 `mac_gui` 자리만 두고 묶음 5 · 3-2 설계에서 목적 · 대상 · 조작 범위를 적는다.

## 3. 뒤 묶음이 쓸 자리 (막지 않게)

- 묶음 5 · 3-2: 길 `mac_gui`에 `six` · `face` 일 — 부르는 명령은 `codex exec …`(작업자 모델은 `worker_model.py`). 결과 줄 + `ticker` 방식은 그대로 쓸 수 있다.
- 묶음 6: 길 `claude`에 `fix` 일 — 「고칠 점」 저장이 일을 넣는다. 새 판은 `data/output/<작업>_v<N>.mp4` 그대로.
- 묶음 4-a: '지금' 한 줄과 진행 기록은 차례표 상태(`queued` = 기다리는 중, `running` = 하는 중) + `runs`에서 읽는다.
- 초안의 '서버의 길 셋'(OpenCut 정적 묶음 · 원본 내주기 · 편집 상태 받기)은 캡컷 길(결정 01)에서 이 판에 넣지 않는다 — 묶음 7이 들면 그때.

## 4. 묶음 8 — 템플릿 자리와 판 규칙 (요청 3번 3)

### 4-1 자리

```
templates/                       저장소 맨 위 (git에 있음 — config/는 git 밖이라 쓰지 않음)
├─ README.md                     이 폴더의 규칙 (아래 4-3)
└─ <템플릿 id>/                   예 [안]: reel-main (1차 대표), test-<이름> (시험용)
   ├─ TEMPLATE.json              {id, name, kind: "main"|"test", current: "r1", revisions: [{rev, date, note, source}]}
   ├─ r1.md                      판 하나 = 파일 하나. 고치면 r2.md를 새로 — 옛 판을 고치거나 지우지 않음
   └─ r2.md …
```

- `reel-main/r1.md` = `agents/rsch/templates/reel-workflow.md`(11-09 확정본, 템3) 내용 그대로 + 맨 위 머리(id · rev · 출처 커밋). 옛 파일은 지우지 않고 맨 위에 "정본은 `templates/reel-main/`으로 옮겨짐" 한 줄.
- 시험용 템플릿은 id가 `test-`로 시작 — 1차 템플릿 수에 들지 않음(다-템2).

### 4-2 작업마다 남김 (R8.2)

- 서버가 작업을 만들 때(2-1) `status.json`에 `template: {id, rev, sha256}` — 그때의 `current`. 진행 중인 작업은 템플릿이 새 판이 되어도 시작한 판을 끝까지 쓴다(판 규칙 [안]). 일 글(2-3)은 이 판의 경로를 준다.
- 옵션(`config/reel_defaults.json`)은 템플릿과 따로 — 그대로 둔다.

### 4-3 판 규칙 (`templates/README.md`에 적음)

- 고치면 새 판 번호, 옛 판은 그대로 · `TEMPLATE.json`의 `current`만 옮김 · `revisions`에 날짜 · 무엇을 · 근거(한알 말씀 또는 요청)를 한 줄.
- 판을 올리는 이: PLN 요청 → PMO (본문은 PLN 몫 — 초안 :205).

### 4-4 규격 판정과 승인을 따로 (R8.3)

- `status.json`에 쌓는 목록 둘(덮어쓰지 않음):
  - `exports: [{v, file, checked_at, spec: {w, h, fps, fmt, audio}, spec_ok}]` — `spec_ok`는 **규격만**(MP4 · 1080×1920 · 30fps · 소리). 목소리 겹침 · 작업 밖 변경은 `checks: {voice_overlap, outside}`로 따로.
  - `approvals: [{v, at, spec_ok_at_approval}]` — 「승인」을 누른 판과 그때의 규격 판정.
- `output_info` · `approved_at`은 옛 화면 · 옛 작업을 위해 지금처럼도 쓴다(마지막 값).
- 규격 밖 판을 승인했을 때 완성으로 셀지는 물음 7 — 이 묶음은 둘을 따로 남기기까지.

## 5. 지킬 것

- 기2: 작업 id · 일 글 · 로그 · `runs`에 손님 이름 · 연락처 없음. 로그는 `data/`(git 밖). 기7: 새 허락 · 설정 · 결제를 요청하지 않음 — 맥에 이미 로그인된 Claude를 씀, 권한은 `--allowedTools`로 좁힘.
- 앞1 · AAA 규칙 24: 아래 시험 모두, 코드 커밋 + 시험 커밋.

## 6. 시험

1. 가짜 `claude`(`WEBAPP_CLAUDE_BIN` = 시험 스크립트)로: 성공(파일 쓰고 `set`) · rc 1 · 결과 파일 없음 · timeout · 한도 글 — 각각 한 번 다시 · 쉬운 말 이유 · `runs` 기록.
2. 작업 둘: 첫째가 실패해도 둘째가 끝까지 감. 같은 길 차례 지킴.
3. 서버를 `running` 중에 끄고 켬 → 한 번 다시, 두 번째는 failed.
4. `POST /api/batch/done`: 작업 생김 · 두 번 불러도 하나 · 빈 batch 400 · PIN · `X-Upload-App` 검사.
5. 잠금: 두 프로세스가 같은 작업을 100번씩 `set` → status.json 깨지지 않음(맥에서).
6. 템플릿: 작업에 `template` 기록 · `current`를 r2로 옮겨도 진행 중 작업은 r1 · 옛 판 파일 그대로.
7. `exports` · `approvals`: v1 승인 뒤 v2 승인 → 둘 다 남음 · 규격 밖 판은 `spec_ok` 거짓.
8. 회귀: 묶음 1 시험 · 작업자 모델 시험 · 기존 ⑥ tick.
9. **맥에서 진짜 `claude` 한 번**: 시험 batch 하나(손님 사진 아님 — 시험용 그림)로 접수 · 원고까지. 명령 · 걸린 시간 · 로그 자리를 반환서에.

## 7. PLN께 여쭐 것 (하나)

- **④ 편집(원고 「좋아요」 뒤 scenes.json + CapCut 프로젝트 만들기)도 이 묶음에서 서버가 시작시킬까요?** 1 (권고) 넣음 — 차례표에 `edit` 일 하나(같은 Claude 길, CapCut이 꺼져 있을 때만). 이것이 없으면 「좋아요」 뒤에 다시 사람이 Claude에게 말해야 해서 R2.1의 뜻("다른 앱에 말을 걸지 않아도")이 접수 · 원고에서 끊김. 2 안 넣음 — 요구대로 접수 · 원고까지, ④는 R2.4의 남은 인계로 적음.
