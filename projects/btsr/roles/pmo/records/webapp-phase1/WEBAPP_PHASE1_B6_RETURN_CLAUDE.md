# BTSR-ARCH-011 반환 — 웹앱 묶음 6 (고칠 점 → 다음 판 · 판마다 새 캡컷 프로젝트 · 완성 = 승인 + 규격 · caption 일)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 5fbbea06) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (새 PRIMARY — Paseo 7621f3de, 옛 d9520b95가 요청을 보냄) |
| 쓴 때 | 2026-11-21 17:00 KST |
| 요청 · 설계 | `btsr/arch` d5f3369 `WEBAPP_PHASE1_BTSR-ARCH-011_REQUEST_CLAUDE.md` · `WEBAPP_PHASE1_B6_DESIGN_CLAUDE.md` 2.2판 · 화면 시안 3판 화면 10–13 |
| 결과 | 제품 가지 `feat/webapp-b6-fix-versions-20261121` **e512fcd** (push · 바탕 243cff0 — main은 ed11f5a) — bdbd66e 코드 → e512fcd 시험. **제품 main push 안 함 · 맥 일 안 함** |

## 1. 결과 — 받아들임 기준 대조 (설계 2.2판 9 · 9-1 + 요청 12–14)

| # | 기준 | 한 것 | 시험 |
|---|---|---|---|
| 1 | 고칠 점 → `edit`(v = N+1) · 손 인계 글 0 · 바뀐 장면 · 달라진 것 없으면 막힘 | `reel_api.next_version`: 앞 판 `scenes.json` → `scenes_v<N>.json` · `fixes[]` 줄(`n · from_v · to_v · feedback · state making`) · ⑥은 처음부터(parts 비움 — `card_kind` full) · `J.advance(edit, extra={v, from_v, feedback})`. 편집 글에 `{fix_block}`(고칠 점 파일 · 앞 판 장면표 · 새 이름). 확인: 새 이름 `<작업>_v<N+1>` · 앞 판과 다른 곳(장면 · 자막 · 그 밖의 칸) 하나 이상 → `fixes[].changed` · `scenes_v<N+1>.json`. 달라진 것이 없으면 한 번 더 → **`jobs.stop(to=dev)`**(요청 12). 손 인계 글(「Claude 앱에 작업 확인」 · README '작업 확인') 지움 | `test_1_to_3_…` · `test_1_no_change_…` · `Http.test_10` |
| 2 | 둘째 판 프로젝트 `<작업>_v2` · 첫 판 `tree_hash` 그대로 | 위 · 작업자 카드는 그 판 프로젝트 이름을 박음(가짜 codex가 카드의 이름으로만 씀) | `test_1_to_3` (tree_hash 앞뒤 같음) |
| 3 | ⑥ → `<작업>_v2.mp4` · `exports[1]`에 project · options · picked | `sync`가 `exports[]`에 `project` · `options`(그때 `options.json`) · `picked`(실제 쓴 목소리 · 음악) · `spec.dur`. 고친 판의 음악 카드는 "앞 판과 같은 곡 **…**"(고칠 점에 음악 · 곡 · 노래가 있으면 빼고) | `test_1_to_3` |
| 4 | 규격 다른 판: 승인 = 의견 · 완성 아님 · 다시 뽑기(횟수 안 셈) · 두 번 다르면 개발자 · 저장 잠김 | `_approve(done)`: 마지막 판이 규격 다르면 `approvals[].kind = opinion`(⑦ 그대로 check · Post로 안 감 · busy 그대로) · 화면 "의견으로 받아 두었어요". `sync`가 규격 다른 판이면 `spec_redo`(같은 프로젝트로 `start_run(export)` — 미첼 고칠 점 횟수에 안 셈), 다시 뽑은 판도 다르면 `jobs.stop(done, dev)`. 저장 단추는 규격 맞는 판에서만 | `test_4_spec_bad_opinion_redo_then_dev_record` · `test_4_spec_bad_then_good_approve` · 화면 13 |
| 5 | 승인한 규격 맞는 판이 저장 · ⑧ 대상 | `J.approved_file`(approve이고 규격 맞는 가장 새 판) — Post 카드 영상 · 저장(Jobs 다 됨 화면 · Post). `outputs[0]`을 쓰던 결함 고침 | `test_5_…` · 화면(Post 영상 = 승인한 v4) |
| 6 | 넷째 고칠 점 → 개발자 · 그 작업만 | `FIXES_MAX = 3` 한 곳 → 넷째는 남기고 `jobs.stop(done, dev, words="세 번 고쳤어요 — 개발자에게 넘길게요")` · busy 아님 | `test_6_…` |
| 7 | 판 고르기 · ? 둘 · 바 · 설정 줄 · 바뀐 곳 0 · `jobs.py versions` | 화면 10(칩 v1 · v2, "v2 · 14.4초", 규격 줄, 앞 판은 저장만) · 11(제목 옆 ? "보내면 새 영상(v3)으로 만들어요. 지금 영상(v2)은 그대로 남아요." — 판 번호는 실제 값) · 12("v3을 만드는 중이에요", 바 4칸 중 지금 자리 · 단계 이름 없음, 점선 칩 "v3 만드는 중", 고칠 점 한 줄 + 시각, 「고칠 점 적기」 잠김) · 13("규격을 맞추는 중이에요 ?" — "규격을 맞춘 영상이 나와야 승인할 수 있어요.", 바 2칸, "⚠ 릴스 규격과 달라요 / 지금 세로 720×1280", 저장 잠김, 「의견 · 고칠 점 적기」). `jobs.py versions`: 판마다 프로젝트 · 규격 · 목소리 ✔ · 음악 ✔ · 속도 · 끝맺음 (확인 안 됨) · 고치기 줄 | 화면 15/15 · `test_4_…`(versions 출력) |
| 8 | R1.3 · R1.7 전체: 남은 말 목록 비거나 줄마다 까닭 | 묶음 6 줄(「Claude 앱에 작업 확인」) 지움 → 남은 5줄은 모두 `keep` · `dev`(까닭 적힘: 머리 모델 뜻 · 연습 줄 · 작업자 카드 글 · 웹앱 밖 길) | `test_words` 3 |
| 9 | 회귀 전부 · 커밋 둘 | 125/125(환경 값 없이, 두 번) · bdbd66e / e512fcd | — |
| 10 | 승인 뒤 Post 「고칠 점 적기」 0 · `save_feedback(post)` 409 | Post 카드 단추 · 누르기 지움, 서버 `Conflict` → 409 "승인한 영상은 고치지 않아요" | `Http.test_10` · `test_10_11` · 화면 |
| 11 | 승인 → `caption` 일 · Post에 캡션 · busy 아님 | 승인(approve) → `J.advance(None, "caption")`(길 claude, 새 `prompts/caption.md` — 업로더 지침을 읽고 올릴 곳마다 `data/upload/<곳>/<작업>.txt`). 확인 = 올릴 곳마다 이번 실행 뒤 글. 실패해도 막힘 흐름에 넣지 않음(Post에 영상만) | `test_10_11_…` · `test_caption_failure_is_not_a_stop` |
| 12 | '개발자에게'는 모두 `jobs.stop(to=dev)` · 물음은 to=ask | 달라진 것 없음 · 규격 두 번 다름 · 넷째 고칠 점 — 셋 다 `jobs.stop(…, "dev")`(까닭 원문 · `suggestions/dev/` 글 · busy 아님). 새 갈래 없음 | 위 셋 |
| 13 | 고쳐 만드는 중 · 규격 맞추는 중 = busy · caption = busy 아님 | `busy()` 그대로 — 고치는 중 · 다시 뽑는 중은 지금 한 편이 승인 전이라 busy, caption은 승인 뒤라 아님 | `test_1_to_3` · `test_4` · `test_10_11` |

## 2. 판 기록 꼴 한 벌 — v1 → 고칠 점 → v2 → 고칠 점 → v3(규격 다름) → 다시 뽑기 v4(또 다름) → 개발자 [84](evidence/84_b6_version_record.json)

가짜 claude(고친 판 장면표) · 가짜 codex(카드의 판 이름으로 뽑기)로 돈 `status.json`의 세 줄 묶음(요약):

```
fixes:     {n:1, from_v:1, to_v:2, state:done, changed:["장면 1"]} · {n:2, from_v:2, to_v:3, state:done, changed:["장면 2"]}
exports:   {v:1, project:<작업>_v1, spec_ok:true,  options:{…}, picked:{voice:"시험 목소리", music:"시험 곡"}}
           {v:2, project:<작업>_v2, spec_ok:true,  …} · {v:3, project:<작업>_v3, spec_ok:false, spec:{w:720,h:1280,…}}
           {v:4, project:<작업>_v3, spec_ok:false, …}   ← 다시 뽑기는 같은 프로젝트(편집 그대로)
approvals: {v:3, kind:"opinion", spec_ok_at_approval:false}
spec_redo: {open:false, tries:1, from_v:3} → stuck {step:"done", to:"dev", reason:"규격이 두 번 달랐어요 (v3 · v4): …"}
```

## 3. 증거 — 코드 bdbd66e · 시험 e512fcd (이 PC 윈도 11 · Python 3.13.14 · 기본 cp949 · Chrome). 원본 [evidence/](evidence/)

- 시험 명령 · 환경 그대로: 제품 사본 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests -v` → **125개 OK** [80](evidence/80_b6_unittest_no_utf8_env.txt) (두 번)
  - 새 `tests/test_versions.py` 9 (+ Http 1). 바꾼 시험: `test_runner.ExportsApprovals`(규격 밖 승인 = 의견 · 다시 뽑기) · `test_one_job.test_7`(규격 맞는 판을 깔고 승인)
  - 가짜 claude `edit_fix` · `edit_same` · `caption_ok` 모드 · 가짜 codex는 카드가 정한 판 이름 · 프로젝트에만 씀
- 화면(헤드리스 Chrome · 390px) [81](evidence/81_b6_screen_report.json) — **15/15**: 화면 10(판 칩 · 길이 · 규격 줄 · 세 단추 · 설정 줄/바뀐 곳 0 · 앞 판 고르면 저장만) · 11(? 글 · 취소/보내기) · 보내기 → 12(한 줄 · 바 25% · 단계 이름 없음 · 칩 · 고칠 점 줄 · 잠긴 단추 · 차례표 edit v3 · busy) · 13(? · ⚠ 줄 · 저장 잠김 · 의견 단추 · 승인 → 의견 · busy 그대로) · 규격 맞는 판 승인 → Post · busy 아님 · 차례표 caption · Post에 고칠 점 없음 · 영상 = 승인한 v4. 그림 [10](evidence/82_b6_s10_versions.png) · [11](evidence/82_b6_s11_fix_sheet.png) · [12](evidence/82_b6_s12_making.png) · [13](evidence/82_b6_s13_spec.png) · [Post](evidence/82_b6_post.png). 도구 [screen_b6_test.mjs](evidence/screen_b6_test.mjs) · [screen_b6_state.py](evidence/screen_b6_state.py) — 시험 폴더 · `127.0.0.1` 빈 포트 · 시험용 PIN/SECRET · `WEBAPP_RUNNER=0` · `WEBAPP_TICK_SECONDS=0` · `WEBAPP_DEV_PUSH=0`, 끝난 뒤 서버 끔(포트 빈 것 확인)
- 바뀐 것: 243cff0 대비 14파일 +554 −57 [83](evidence/83_b6_diffstat.txt)

## 4. 바뀐 것 · 정한 것

1. 새 `prompts/caption.md` · `tests/test_versions.py`. 고침 `jobs.py` · `reel_api.py` · `runner.py` · `static/app.html` · `prompts/edit.md` · `README.md` · `manual-webapp.md` · 시험 6파일.
2. **장면표 파일 꼴**: `capcut_build`는 `scenes.json`만 읽음(손대지 않음) → 고친 판도 Claude가 `scenes.json`을 새 이름으로 쓰고, 서버가 판마다 사본을 남김(앞 판은 고칠 점을 받을 때 `scenes_v<N>.json`, 새 판은 확인 뒤 `scenes_v<N+1>.json`). 설계의 'Claude가 `scenes_v<N+1>.json`을 씀'과 꼴만 다르고 기록은 같음.
3. 고친 판에서는 자막 ≠ 승인 원고를 허락(고칠 점이 자막 글일 수 있음) — 첫 판은 그대로 견줌.
4. 고쳐 만드는 중에 적는 고칠 점: 3판 화면 12대로 「고칠 점 적기」 **잠김**(서버도 "지금은 고친 판을 만드는 중이에요"). 설계 6번의 [안] '다음 고치기로 남김'은 하지 않음 — 3판 그림을 따름.
5. 규격 맞추는 중에 「의견 · 고칠 점 적기」로 적은 글은 다음 판을 만들지 않고 의견으로 남김(`opinions[]` · 화면에 "의견으로 받아 두었어요" 줄) — 다시 뽑기가 끝난 판에서 고칠 점을 받음.
6. 다시 뽑기는 같은 프로젝트에서 새 판 번호(`v<N+1>` 파일)로 나옴 — `exports[].project`가 같아 '다시 뽑은 판'임을 읽을 수 있음. `ffprobe`가 없어 규격을 못 읽은 판은 다시 뽑지 않음(판정 불가 — 지금 ⚠ 그대로).
7. `sync`는 화면 읽기마다 불리므로 다시 뽑기 준비(`write_handoff`)가 실패해도 넘어지지 않게 함(시험에서 드러남).
8. 조사: "v3을 만드는 중이에요"(삼 — 받침), 3판의 "v2를"과 같은 규칙(`josa`).

## 5. 남은 것

1. [맥에서 확인] 새 이름 프로젝트가 캡컷 목록에 앞 판과 함께 보이는지 · 작업자가 이름으로 맞는 판을 여는지(맥 2) · 다시 뽑기가 규격을 맞추는지.
2. 진짜 캡션 품질(업로더 지침) · AI 표시 메모는 맥 시험에서.
3. 휴대폰 직접 편집(7) · 횟수 맞춤 · 템플릿(8-2) · 알림 · https(4-b) — 범위 밖.
4. 제품 main · 맥 — 하지 않음.

## 6. 배운 것

- 같은 일 종류를 다시 넣을 때 '하고 있는 그 일'이 차례표에서 아직 running이면 enqueue가 그것을 돌려줌 — 다음 일을 넣는 쪽(six_state)이 '끝'으로 잘못 읽으면 이어지지 않음(다시 뽑기에서 드러남).
- 가짜 작업자는 진짜처럼 카드가 정한 이름만 써야 함 — 늘 `_v1`에 쓰던 가짜가 '앞 판 프로젝트 그대로' 시험을 거짓으로 깨뜨림.

## 7. 다음

- 반환함. 이 반환 뒤 PMO는 승계(한알 16:45:26 · 16:54:50 · 16:55:05 — RSCH 요청서 003 30 · 31번): 넘김 (2)를 고치고 새 PMO(아스트라)를 엶. 012(4-b) · 013(8-2)은 새 PMO가.
