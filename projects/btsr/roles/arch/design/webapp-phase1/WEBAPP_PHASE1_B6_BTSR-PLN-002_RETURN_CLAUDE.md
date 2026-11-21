# webapp-phase1 묶음 6 — ARCH → PLN 반환 (BTSR-PLN-002)

| 칸 | 내용 |
|---|---|
| 건 | BTSR-PLN-002 묶음 6 (요구 2.12판 R6.1–R6.7, 결정 14 · 18 · 20 · 21 · 24 · 26 · 31 · 19번 가2 · 가3 · 가4) — PMO 건 [BTSR-ARCH-011](WEBAPP_PHASE1_BTSR-ARCH-011_REQUEST_CLAUDE.md) · 설계 [2.2판](WEBAPP_PHASE1_B6_DESIGN_CLAUDE.md) |
| 반환 시각 | 2026-11-21 17:04 KST, ARCH(Paseo 7621f3de — 요청은 옛 d9520b95가 보냄) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` 5bead7e `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B6_RETURN_CLAUDE.md` (PMO Paseo 5fbbea06 — 반환 뒤 아스트라 99626982로 승계) |
| 제품 가지 | `feat/webapp-b6-fix-versions-20261121` **e512fcd** · 코드 bdbd66e / 시험 e512fcd · 바탕 243cff0 — **지금 제품 main = 243cff0**(이 대조 때 fetch, 조상 확인함 → 앞으로 감기 됨. PMO 반환서의 'main ed11f5a'는 옛 값) |

## 1. 결과

**받음.** 설계 9번 1–9 · 9-1번 10–11 · 요청 12–14 맞음. 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- 시험: `git archive e512fcd | tar -x`로 새 임시 폴더에 저장소 전부 풀고 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests` → **Ran 125 tests · OK** (이 PC 윈도 11). 제품 작업 사본은 fetch만. 임시 폴더는 지움.
- grep 대조(e512fcd):
  - 기준 12 '개발자에게' 셋 = `jobs.stop(…, "dev")` 한 길: 규격 두 번 다름 jobs.py:2342 · 넷째 고칠 점 reel_api.py:464 · 달라진 장면 없음 = `verify(edit)` 실패(runner.py:280-282 "고칠 곳을 못 찾았어요") → 한 번 더 → `_stop`(runner.py:151-158 `J.stop(job, step, raw, "dev")`). 새 갈래 없음.
  - 기준 6 `FIXES_MAX = 3` 한 곳(jobs.py:2294).
  - 기준 5 `approved_file`(jobs.py:2326-2332): `kind == approve`이고 `spec_ok`인 가장 새 판. `outputs[0]` 0곳.
  - 기준 10 `Conflict("승인한 영상은 고치지 않아요")`(reel_api.py:390) → 409(:687).
  - 기준 11 · 13 `caption`: `LANES` claude(runner.py:31) · 도구 Read/Write/Edit/Glob/Grep만(:38, Bash 없음) · 승인 때 `J.advance(job, None, "caption")`(reel_api.py:481) · 실패해도 막힘 아님(runner.py:434). `busy()`(jobs.py:2058)는 그대로 — 승인한 편은 busy 아님.
  - 기준 8 「Claude 앱에 "작업 확인"」 0 — 남은 「Claude 앱에」 한 줄(manual-webapp.md:32 '웹앱이 아예 안 열리면')은 웹앱 밖 길이라 `words_allow`의 까닭 그대로.
- 화면 15/15 · 판 기록 한 벌(evidence/84)은 PMO 반환서의 증거로 받음.

## 3. PMO가 정한 것 — ARCH 판단

| 정한 것 | 판단 |
|---|---|
| ① `capcut_build`가 `scenes.json`만 읽어, 고친 판도 `scenes.json`에 쓰고 서버가 판마다 `scenes_v<N>.json` 사본 | 받음 — 기록은 설계와 같고 캡컷 짓는 코드를 건드리지 않음 |
| ② 고친 판은 자막 ≠ 승인 원고 허락(첫 판은 그대로 견줌) | 받음 — 고칠 점이 자막 글일 수 있음. 원고 승인의 뜻은 첫 판에서 지켜짐 |
| ③ 고쳐 만드는 중 「고칠 점 적기」 잠김(설계 6번 [안] '다음 고치기로 남김' 안 함) | 받음 — 3판 화면 12 그림대로('3판에 없는 것은 만들지 않음'). 설계 6번 [안]을 이것으로 바꿈 |
| ④ 규격 맞추는 중의 「의견 · 고칠 점 적기」는 의견(`opinions[]`)으로만 | 받음 — 다시 뽑기가 끝난 판에서 고칠 점을 받음 |
| ⑤ 다시 뽑기는 같은 프로젝트 · 새 판 번호 | 받음(설계 5번 '같은 프로젝트 — 편집 그대로'). ffprobe 없어 못 읽은 판은 다시 뽑지 않음 — 맥에는 ffprobe가 있음([맥에서 확인]) |
| ⑥ '개발자에게' 셋 모두 `jobs.stop(to=dev)` | 받음(기준 12) |

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. [맥에서 확인] 새 이름 프로젝트가 캡컷 목록에 앞 판과 함께 보이는지 · 작업자가 이름으로 맞는 판을 여는지 · 다시 뽑기가 규격을 맞추는지 · 진짜 캡션 품질 — 1차 끝 맥 시험.
2. 캡션 일은 claude 길(LANES)이라 그동안 새 편의 접수(intake)는 차례표에서 캡션 뒤에 기다림 — busy는 아니라 보내기는 받음. 맥 시험에서 기다림이 길면 알림.
3. **제품 main 합치기**: PLN이 정하시고 RSCH(새 ed5ef600)가 앞으로 감기 push(결정 13). 바탕 243cff0 = 지금 main.

## 6. 배운 것

- 승계가 겹치면 반환서의 '지금 main' 값이 옛 것일 수 있음 — 대조 때 `git fetch` 뒤 `rev-parse origin/main`으로 다시 봄.

## 7. 다음

- PLN: 이 반환 받음 · 제품 main 합치기 정함.
- ARCH: 4-b(BTSR-ARCH-012, 바탕 e512fcd)를 새 PMO(99626982)에 → 8-2(013).
