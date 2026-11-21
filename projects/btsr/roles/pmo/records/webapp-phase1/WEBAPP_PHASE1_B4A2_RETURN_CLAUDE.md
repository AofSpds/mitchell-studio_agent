# BTSR-ARCH-010 반환 — 웹앱 묶음 4-a-2 (막힘 길 하나 · 개발자에게 닿기 · 처음부터 시작 · 보내는 중 · 흐린 사진 · 접수 · 틈새)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 5fbbea06) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (Paseo d9520b95) |
| 쓴 때 | 2026-11-21 16:27 KST |
| 요청 · 설계 | `btsr/arch` a6d7f34 `WEBAPP_PHASE1_BTSR-ARCH-010_REQUEST_CLAUDE.md` · `WEBAPP_PHASE1_B4A2_DESIGN_CLAUDE.md` 1.1판 · 화면 시안 3판 화면 5 · 7 · 8 · 9 · 15(+16) |
| 결과 | 제품 가지 `feat/webapp-b4a2-stuck-restart-20261121` **243cff0** (push · 바탕 ed11f5a — main은 아직 3072e7e) — 6a7d3c6 코드 → 243cff0 시험. **제품 main push 안 함 · 맥 일 안 함 · 진짜 원격에 push 안 함(가짜 원격으로만)** |

## 1. 결과 — 받아들임 기준 대조 (설계 1.1판 10번)

| # | 기준 | 한 것 | 시험 |
|---|---|---|---|
| 1 | 막힘 한 길 · 까닭 덮어쓰기 0 · Edit 실패 → 한 번 더 → 화면 9 | `jobs.stop(job, step, reason, to=ask\|dev, ask, words, part)` 하나 — runner `_stop`(②③④) · `six_dev` · `six_ask` · `face_dev` · 접수 흐린 사진 「모르겠어요」 · 화면 8의 「모르겠어요」 · 얼굴 다시 만들기 다 씀이 모두 이것만. 까닭은 원문: Claude가 그 단계에 적은 까닭이 있으면 그대로, 없으면 `WHY` + (결과 · rc · 기록 자리). ⑥ `rollup`도 원문을 둠. 화면 한 줄은 `stuck.words`(STUCK_WORDS) 따로 | `Stop.test_1_…`(fake claude `edit_stop` — 원문 그대로 · 한 번 더 → 화면 9) · `test_stop_api` · `test_runner` 실패 시험 7 |
| 2 | 화면 8 · 9 꼴 · 「모르겠어요」 → dev · dev는 busy 아님 | 화면 8: "잠깐 멈췄어요" · 빨간 바 · 물음 한 줄 · 고르는 단추(위에서 아래로) · 「모르겠어요 — 개발자에게 알리기」 줄 단추. 화면 9: "개발자에게 알렸어요" + 무엇이 막혔는지 한 줄(l2) · 「처음부터 시작」 · 「여기까지 만든 것 보기」(원고 · 얼굴 · 영상 — 보기만). 배지는 화면 8에만 | 화면 18/18 · `Stops.test_3c` · `test_2` |
| 3 | `suggestions/dev/<시각>_<작업 id>.md` · 이름에 제목 0 · 모두 거른 뒤 · 사진 영상 0 · pending · 건의도 · 규칙 글 예외 | 새 `devpush.py`: 글 = 작업 id · 제목(거름) · 단계 · 까닭 원문 · 화면 한 줄 · 마지막 기록 12줄 · 일 로그 끝 20줄 · 남은 것 이름 → R1.4 `anonymize` 뒤 남은 꼴은 "(지움)". 건의는 `suggest_store.save` 뒤 `devpush.suggestion`(거른 사본이 깨끗할 때만 `suggestions/<YYYY-MM>/<id>.md` — 꼴이 남으면 inbox에 남겨 사람이). 규칙 글: 제품 `CLAUDE.md` '## 폴더'에 예외 한 줄 + `suggestions/README.md` '서버가 올리는 길' | `Notes` 2 |
| 3-1 | 가짜 원격: 기능 가지 · 로컬 커밋 · 안 올린 변경이 있어도 부모 = 원격 main · 바꾼 경로 = 글 하나 · 사본 그대로 · 앞서면 다시 받아 얹음 | `GIT_INDEX_FILE=<데이터>/_webapp/push.index`에 `git fetch <원격> main` → `read-tree FETCH_HEAD` → `hash-object -w` → `update-index --cacheinfo` → `write-tree` → `commit-tree -p FETCH_HEAD` → `push <원격> <커밋>:refs/heads/main`, 거절되면 처음부터 3번. 못 하면 `push_pending/` + `.err`, 서버 틱마다(1분 간격) 다시. 켜기 `WEBAPP_DEV_PUSH=1`(맥 서버 설정 — 기본 꺼짐, 꺼지면 pending에만) | `FakeRemote` 3 — **가짜 원격 꼴: 빈 bare `origin.git`(main) · 맥 사본 clone이 `feat/x` 가지 + 로컬 커밋 1(app.txt) + 안 올린 변경(README) + index에 new.txt, 다른 clone이 main을 앞서 나가게 push** → 새 커밋 부모 = 원격 main · `diff-tree` = 글 하나 · `app.txt` 없음 · 사본 HEAD · 가지 · status · index 그대로 · push 직전에 원격이 또 앞서면 다시 받아 그 위에 · pending → flush |
| 4 | `jobs.py resume` · 그 시험 0 · 가진 사진 올리기 · 얼굴 고르기 · `face_remakes` 물음 0 · 다 쓰면 dev | `jobs.resume` · 명령 · 매뉴얼 줄 · `test_3c`의 resume 지움. 얼굴: `upload` · `dev` 동작 · `face_upload_done` · `/api/batch/done`의 올리기 갈래 · ASKS `face_*` · 화면 단추 지움. 두 번 못 만듦 · 흐리지 않은 시술 후 없음 · 다시 만들기 다 씀 → 고르기 없이 `stop(face, dev)` | `Face` 시험 3 · `Docs` · `test_3c` |
| 5 | 처음부터 시작 → 한 번 더 묻기 → 옛 편 멈춤 · 빠짐 · 차례 cancelled · 파일 그대로 → 화면 15 → 새 편(베낌) | 화면 7(만드는 중 Send 아래 줄 단추) · 화면 9 → 시트 "지금 만드는 것을 멈추고 처음부터 할까요?" 「아니요」 「처음부터」 → `POST /api/job/restart` → `jobs.restart`(stopped_at · hidden_at · 남은 차례 `cancelled` · 하던 일은 끝난 뒤 `gone`으로 결과 버림) → 초안 → 화면 15(올린 것 × · + · 요청 글 · 옵션 그대로) → Send = `/api/batch {from_job, keep}`가 남긴 것을 새 묶음으로 **베낌** + 더한 것 올림 → 새 편 | `Restart` 2 · 화면 |
| 6 | 보내는 중 n / 전체 · 그만 보내기 · 끊김 → 다시 보내기는 남은 것만 | Send 보내는 중 = "보내는 중 n / 전체" + 바 + 「그만 보내기」(받은 것은 그 묶음에 남기고 작업은 만들지 않음 — Send 그대로). 끊기면 "보내다 끊겼어요" + 「다시 보내기」 — 다시 보낼 때는 파일마다 `PUT /api/upload/check`(이름 · 크기 · 앞 1MB)로 이미 받은 것은 건너뜀 | `Upload.test_6_check` · 화면('보내는 중 2 / 2') |
| 7 | 흐린 사진 물음 셋 · Face는 흐리지 않은 after | `intake.json` 소재 `quality: ok\|blurry`(+why) — 프롬프트에 한 줄. 물음 `kind: blurry` "시술 후 사진 한 장이 흐려요" 「사진 다시 올리기」(그 자리 더 보내기 — 그 사진은 안 씀) · 「이 사진 빼고 만들기」 · 「모르겠어요 — 개발자에게 알리기」. 화면 8 꼴(빨간 바 · 그 사진 작은 그림). 빼서 쓸 시술 전 · 후가 없어지면 빠진 자료 물음이 새로 생김. `face_prepare`는 blurry 아닌 첫 after | `Blurry` 3 |
| 8 | 접수는 빠진 · 흐린 · 모르는 소재만 · 사실 비움 · 원고가 지어내지 않음 | `IK.compute`에서 사실 물음 지움(ARCH-007 4번 대체). 프롬프트 intake.md '비워 두면 웹앱이 묻습니다' 고침 · `choices` 지움 · script.md "값이 비어 있는(`null`) 사실은 쓰지 않음" | `test_intake.test_2_facts_never_asked` · `Blurry.test_8` |
| 9 | reconcile 한 번만 · 깨어난 Edit 캡컷 확인 · Edit 확인 실패면 ⑥ 없음 · Face 번호 겹침 0 | `jobs.advance`(잠금 안에서 상태 + 차례) — 접수 → 원고 · 답 → 원고 · 고칠 점 → 원고 · 얼굴 승인 → 편집 · 다시 만들기 → 얼굴 · 새 편 → 접수가 이것을 부름. `runner.reconcile`(켜질 때 — 지금 한 편이 `now`인데 그 일이 차례표에 없을 때만). 깨어난 `wait_usage`도 캡컷 확인. `set_step(edit, done)`은 ⑥ 카드만 만들고 차례는 runner가 편집 확인(자막 · AI 표시)을 통과한 뒤. 얼굴 n = 폴더 · 후보의 가장 큰 번호 + 1, 같은 n은 두 번 적지 않음 | `Gaps` 3 · `Stop.test_9` · `test_1`(실패면 ⑥ 없음) |
| 10 | 회귀 · 커밋 둘 · 그림 | 116/116(환경 값 없이, 두 번) · 6a7d3c6 / 243cff0 · 그림 아래 | — |

## 2. 증거 — 코드 6a7d3c6 · 시험 243cff0 (이 PC 윈도 11 · Python 3.13.14 · 기본 cp949 · Chrome). 원본 [evidence/](evidence/)

- 시험 명령 · 환경 그대로: 제품 사본 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` → **116개 OK** [70](evidence/70_b4a2_unittest_no_utf8_env.txt) (두 번 돌려 둘 다 OK). `_env.py`가 `WEBAPP_DEV_PUSH=0` — 시험은 진짜 원격에 push하지 않음, push 길은 `FakeRemote`의 시험 폴더 안 bare 저장소로만
  - 새 `tests/test_stuck.py` 25: Stop 3 · Notes 2 · FakeRemote 3 · Restart 2 · Upload 1 · Blurry 3 · Gaps 3 · Docs 1 (+ 기존 파일 바꿈은 5번 표)
- 화면(헤드리스 Chrome · 390px) [71](evidence/71_b4a2_screen_report.json) — **18/18**: 빈 Jobs("지금 만드는 것이 없어요" + 「Send」 · 「⚙ 기본 옵션」 그대로) · 화면 7(흐린 Send + 「처음부터 시작」) · 화면 8(물음 · 단추 · 「모르겠어요」 줄 단추 · busy) · 「모르겠어요」 → 화면 9(한 줄 + 단추 둘 · busy 아님 · 배지 없음) · 여기까지 만든 것 · 한 번 더 묻기 · 화면 15(올린 것 둘 + + · 요청 글 · Send 켜짐 · 옛 편 빠짐 · 파일 그대로) · × · + · 느린 망에서 "보내는 중 2 / 2" · 새 편(남긴 것 베낌 + 더한 것 올림 · 옛 묶음 그대로) · 초안 비워짐. 그림 [빈 Jobs](evidence/72_b4a2_empty.png) · [7](evidence/72_b4a2_s07_send_restart.png) · [8](evidence/72_b4a2_s08_ask.png) · [9](evidence/72_b4a2_s09_dev.png) · [15](evidence/72_b4a2_s15_draft.png) · [보내는 중](evidence/72_b4a2_sending.png). 도구 [screen_b4a2_test.mjs](evidence/screen_b4a2_test.mjs) · [screen_b4a2_state.py](evidence/screen_b4a2_state.py) — 시험 폴더 · `127.0.0.1` 빈 포트 · 시험용 PIN/SECRET · `WEBAPP_RUNNER=0` · `WEBAPP_TICK_SECONDS=0` · `WEBAPP_DEV_PUSH=0`. 끝난 뒤 서버 끔(포트 빈 것 확인)
  - 첫 판에서 화면 9에 탭 배지 1이 뜸(단추가 있어 '고를 것'으로 셈) → `need()`에서 화면 9를 뺌 → 18/18
- 바뀐 것: ed11f5a 대비 21파일 +1156 −447 [73](evidence/73_b4a2_diffstat.txt)

## 3. 바뀐 것 · 정한 것

1. 새 `app/webapp/devpush.py` · `tests/test_stuck.py`. 고침 `jobs.py` · `runner.py` · `reel_api.py` · `server.py` · `intake.py` · `suggest_store.py` · `static/app.html` · `prompts/intake.md` · `prompts/script.md` · 제품 `CLAUDE.md` · `suggestions/README.md` · `manual-webapp.md` · `MAC_RUN_PHASE1.md`(맥 0에 '개발자에게 닿기 준비 — 읽기만' 한 줄: remote · 가지 · `ls-remote` · 자격 자리, push · dry-run 안 함) · 시험 6파일.
2. **push는 기본 꺼짐**: `WEBAPP_DEV_PUSH=1`일 때만(맥 서버 설정 파일에 적어도 server.py가 읽어 넘김). 이 PC · 시험에서 진짜 제품 원격에 올라가지 않게 — 켜는 줄은 맥 0 결과를 본 뒤.
3. 규칙 글 예외 줄을 넣을 '가지 · 검토 줄'이 제품 `CLAUDE.md` · `AGENTS.md`에 없음(그 규칙은 에이전트 쪽) → `CLAUDE.md` '## 폴더' 맨 위에 넣음. `AGENTS.md`(Codex 작업자 약속)에는 넣지 않음 — 작업자가 push할 일이 아님.
4. 건의: 원문은 inbox에 그대로 두고 거른 사본만 보냄(+ `data/suggestions/queued/<id>` 표시). `suggest.py publish`는 남김(꼴이 남은 것을 사람이 볼 때).
5. 흐린 사진 「사진 다시 올리기」는 4-a의 '그 자리 더 보내기' 길 — 옛 사진은 `kind: other`(파일 그대로).
6. 화면 16(원고 확인)의 글자 수를 늘 보임(3판 d89fb2f) — 넘으면 빨강.
7. 맥에 닿지 않음: 읽기가 실패하면 한 줄 "맥에 닿지 않아요"(단추 없음), 바뀜 신호가 끊기면 30초 읽기로 저절로 돌아옴.

## 4. 걷은 것 목록

| 걷은 것 | 파일 · 함수 | 시험 |
|---|---|---|
| `jobs.py resume` | `jobs.resume` · 명령 `resume` · 매뉴얼 '다시 잇기' 줄 | `test_worker_face.Stops.test_3c` → resume 없음 · 명령이 실패함을 봄 |
| 「가진 사진 올리기」 | `reel_api.face_action`의 `upload` · `dev` · `face_upload_done` · `/api/batch/done`의 올리기 갈래 · `face_view`의 `uploaded` · `ask` · 화면 단추 · 누르기 | `test_7_not_9_16…` · `test_7_no_after…` → dev, `Docs` |
| 얼굴 '넘기기 / 올리기' 고르기 · `face_remakes` 물음 | `runner.ASKS`의 `face_fail` · `face_no_after` · `face_remakes` · `face_ask` · `reel_api.choose`의 얼굴 갈래 | 같음 · `Docs` |
| 고르는 물음의 「개발자에게 넘기기」 고를 것 | `runner.ASKS` choices → 화면 8 공통 줄 단추 `jobs.DEV_BTN` | `test_3b` |
| 접수 사실 물음 | `IK.compute`의 사실 부분 (`apply`의 사실 갈래는 옛 답 다시 넣기용으로 남김) | `test_intake.test_2_*` → `test_2_facts_never_asked` |
| `_stop`의 까닭 덮어쓰기 | `runner._stop` | `test_runner` 실패 시험 · `Stop.test_1` |
| 편집 끝 → ⑥ 바로 차례 | `set_step(edit, done)` → `write_handoff(enqueue=False)` | `Stop.test_9` · `test_worker_face.six_job`(확인 뒤 advance) |

## 5. 남은 것

1. **진짜 push는 맥 0 뒤** — 맥 사본의 원격 · 자격을 본 뒤 `WEBAPP_DEV_PUSH=1`(+ 필요하면 `WEBAPP_PUSH_REPO`) 설정 줄. 그 전에는 개발자 글이 맥 `push_pending/`에 쌓임(`jobs.py pending`).
2. 흐린 사진 판정 · 진짜 접수 품질은 맥 시험에서(가짜 claude로 흐름만).
3. 화면 15의 그림은 맥의 `sips`로 만드는 작은 그림 — 이 PC 화면 시험에서는 빈 칸으로 보임.
4. 다시 만들기 횟수 맞춤(묶음 8-2) · 고치기 · 판(6) · 알림(4-b) — 범위 밖.
5. 제품 main · 맥 — 하지 않음.

## 6. 배운 것

- '모름'이 아니라 '이미 계산해 둔 물음 목록'이 답 뒤에 낡을 수 있음 — 답이 표를 바꾸면(흐린 사진 빼기) 물음을 다시 셈.
- 탭 배지 같은 '고를 것' 판정은 단추가 있느냐가 아니라 그 화면이 미첼의 답을 기다리느냐로.
- git으로 원격 main에 글 하나만 올릴 때는 작업 사본을 건드리지 않는 따로 둔 index + `commit-tree -p FETCH_HEAD`가 가장 좁음 — 가짜 원격으로 사본의 HEAD · 가지 · status · index가 그대로인지까지 시험.

## 7. 다음

- 반환함. 다음 차례(ARCH가 보냄): 011(묶음 6) → 012(4-b) → 013(8-2). 넘김 칸은 CURRENT에 갖춤(한알 16:05:36 · 16:21:44).
