# BTSR-PLN-002 덧붙임 — 보내기 고침 2(휴대폰 에뮬레이션 S14 먼저 보고에서) — ARCH께 요청

| 칸 | 내용 |
|---|---|
| 요청하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo be41b33c) → ARCH (Paseo 7621f3de) |
| 쓴 때 | 2026-11-22 01:52 KST |
| 근거 | RSCH 요청서 003 57번(에이전트 저장소 main `71bfaa7`) · S14 `projects/btsr/roles/rsch/sub/s14_phone_emulation/확인.md`(main `2553b9b` · 제품 main `8b0d084`를 아이폰 14 크기 WebKit으로) · 한알 11-22 00:01:42 · 결정 45 |
| 급함 | **오늘(11-22) 한알의 휴대폰 테스트 전에** — 될 것 · 안 될 것 · 걸릴 때를 먼저 한 줄로 PLN에 |

## 1. 고칠 것 (PLN이 정함 — 넷 모두, 1 · 2가 먼저)

| 번호 | 미첼이 겪는 것 | 됨의 기준 (새 화면 · 새 단추 없이) |
|---|---|---|
| **1 꼭** | 로그인이 풀린 채 보내면 PIN 대신 영문 오류 화면(501) | 로그인 없는 POST · PUT에도 본문을 끝까지 읽거나 연결을 닫음 → 다음 요청이 깨지지 않고 00:44 고침의 「로그인이 풀렸어요 — …」 → PIN으로 감. RSCH 재현(57번 1 · 날것 소켓 POST)을 시험으로 |
| **2 꼭** | 보내는 중 새로 고침(아이폰이 다른 앱에 다녀오면 스스로 하기도 함)하면 고른 것 · 요청 글이 사라지고 받은 사진 안내 없음 | 보내는 중 화면을 떠날 때도 로그인 풀림 때의 이어 가기(묶음 · 요청 글)를 남김 → 돌아오면 「보내던 것이 있어요 — 사진 · 영상을 다시 골라 주세요」 꼴 한 줄 · 받은 것은 건너뜀 |
| 3 | 세 번째에서 끊겼는데 막대가 끝까지 차 보임 | 끊기면 막대가 받은 만큼에서 멈춤 |
| 4 | 와이파이가 끊긴 채 보내면 '맥북이 켜져 있고 …'만 뜸 | 한 줄에 '와이파이(또는 Tailscale) 연결'도 봄 — 예: 「맥에 연결할 수 없어요. 휴대폰 와이파이 · Tailscale과 맥북을 확인해 주세요.」 |

- 화면 글 [안]은 RSCH가 한알께 보여 드림(다른 말씀 없으면 안대로). 진짜 아이폰에서만 볼 것(57번 끝)은 오늘 휴대폰 테스트에서.

## 2. 가지 · 맡길 길 · 합치기

- 바탕 = 제품 main(보낼 때 다시 봄 — 지금 `8b0d084`). 새 가지 · `server.py`(1) · `app.html`(2–4) + 시험. 맡길 길은 ARCH가(결정 46).
- RSCH가 차이를 읽고 시험을 다시 돌린 뒤 합침(IVA 다시 안 함) · Playwright 깐 곳에서. 합친 뒤 한알이 맥에 새 판 받기 한 줄.
- 반환: ARCH → PLN(가지 머리 · 됨의 기준 대조). PLN이 조건을 적어 RSCH에.

## ARCH 먼저 한 줄 (01:56 KST)

- 될 것: 넷 모두 — 1은 `server.py` 한 곳(`send_json`이 PUT만 연결을 닫음 → 읽지 않은 본문이 있는 POST도 200이 아니면 닫음, server.py:349–351) + 재현 시험 · 2 · 3 · 4는 `app.html`. 안 될 것: 없음(http에서 화면 꺼짐은 그대로 — https로).
- 걸릴 때: ARCH 02:00쯤 PMO에 → PMO 40분 → ARCH 15분(Playwright 깐 곳) → RSCH 20분 = **03:15 KST쯤 합침** → 한알 맥 새 판 받기 한 줄 → 오늘 아침 휴대폰 테스트 전에 됨. 오늘 한 장 1번 줄(1-3 다시)을 그대로 쓰면 이 고침까지 받음.
- PLN이 RSCH에 넘김(한알께 그대로).

## 덧붙임 — S14 끝 보고에서 더함 (2026-11-22 02:05 KST)

- 근거: RSCH 요청서 003 58번(에이전트 저장소 main `f62b895`) · S14 `확인.md`(예시 34개 — 됨 23 · 안 됨 4 · 불편 5 · 못 봄 2) · 결정 45. 이 때 PMO는 고침 2를 하는 중(01:50부터).
- **PLN이 정함 — 아래를 고침 2에 더함.** PMO에 지금 더할지, 같은 가지 위에 곧바로 이어 할지는 ARCH가 정함(결정 46). 늦어지면 합칠 때를 한 줄로 PLN에. 기준은 한알의 휴대폰 테스트 전에 합쳐지는 것.

| 번호 | 미첼이 겪는 것 | 됨의 기준 (새 화면 · 새 단추 없이) |
|---|---|---|
| **5 꼭** (E17) | 만드는 중 물음에서 「더 보내기」 · 「사진 다시 올리기」로 보낸 파일이 멎으면 아무 표시가 없음 | Send와 같은 길(00:44 고침): 30초 동안 나아가지 않으면 끊고, 한 번은 스스로 다시 보냄 → 그래도 안 되면 「보내다 끊겼어요」 + 다시 고르기 · 받은 것은 건너뜀 |
| **6 꼭** (E34) | 이름이 같은 서로 다른 사진 두 장을 다시 고르면 한 장이 한 번 더 들어감 | 받은 것인지 볼 때 번호가 붙어 저장된 것까지 봄(이름 · 크기 · 앞 1MB) → 두 장이 한 번씩만 들어감 |
| 7 (E31) | Manual의 Face 줄이 실제와 다름 | 글만 고침: 「다시 만들기」는 **2번까지**(결정 38) · 가진 AI 얼굴 사진은 **처음 보낼 때 함께**(R32.4 · 결정 35) |
| 8 | 작은 단추(물음표 22×22 · 「건의하기」 29 · 판 고르기 37) · 큰 글자에서 「알림 켜기」가 낱말 가운데서 줄이 갈림 | 넣을 수 있으면: 누르는 크기를 다른 큰 단추만큼(44 이상) · 낱말 가운데서 줄이 갈리지 않게. 늦어지면 빼고 다음에 |

- 차례: 1 · 2 → 5 · 6 → 3 · 4 · 7 → 8.
- **이번에는 고치지 않음** (오늘 겪으시면 그때 고침 — 결정 45 · 과검증 아님): E5(같은 사진을 두 번 고르면 두 장이 들어감) · E33(안내 글이 잠깐 겹침) · E4(문서 · 소리 파일을 섞어도 알리지 않음 — 아이폰 고르기 창은 사진 · 영상만 보여 줌).
- 진짜 아이폰에서만 볼 것 셋은 오늘 한 장에 넣음(PLN).
- ARCH 한 줄 (btsr/arch `b7bdd8c` · BTSR-ARCH-021 덧붙임 1): PMO에 지금 더함 · 같은 가지 `feat/webapp-upload-stall2-20261122`에 이어서. 될 것 5(「더 보내기」 · 「사진 다시 올리기」를 Send와 같은 올리기로) · 6(`upload_check`가 `_2` · `_3` 붙은 것까지 견줌) · 7(`manual-webapp.md` Face 줄 글만) · 8(넣을 수 있으면). 안 될 것 없음. **합칠 때 03:15 → 03:40 KST쯤** — 휴대폰 테스트 전에 됨. PLN이 RSCH에 넘김.

## 반환 — PLN 대조 (2026-11-22 02:41 KST)

- ARCH 반환 `btsr/arch` `1620640` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_UPLOAD_STALL2_BTSR-PLN-002_RETURN_CLAUDE.md` (BTSR-ARCH-021 + 덧붙임 1). **받음.**
- 결과: 제품 가지 `feat/webapp-upload-stall2-20261122` **`5bbe272`** — main `8b0d084` 위 커밋 넷(926c1a8 · 9722fbc · 0285ab4 · 5bbe272) · 네 파일뿐(`app/webapp/server.py` +17 −9 · `app/webapp/static/app.html` +146 쪽 · `agents/creative_director/manual-webapp.md` 두 줄 · `app/webapp/tests/test_upload_stall.py` 새 시험 11개). 새 화면 · 새 단추 0. ARCH: Playwright + cryptography 자리 169 OK 건너뜀 0(390px Chromium · WebKit) · 기본 파이썬 169 OK skipped 32.
- 됨의 기준 대조(PMO 맥락 약 90%에서 만든 것으로 보고 하나씩 — ARCH 반환 · PLN이 diff로 본 것):
  1. `send_json`이 200이 아니면 POST · PUT(401 · 403은 어떤 요청이든) 연결을 닫음 — 시험 `test_rejected_post_closes_connection_then_pin_page_loads`(같은 연결로 다음 GET → PIN 화면) ✔
  2. 보내는 중 화면을 떠나도 묶음 · 요청 글을 sessionStorage에 남김 → 「보내던 것이 있어요 — 사진 · 영상을 다시 골라 주세요」 · 받은 것 건너뜀 — `test_reload_resumes_one_batch_and_skips_received` ✔ (홈 화면 앱을 아예 닫았다 열면 남는지는 진짜 아이폰에서 — 오늘 한 장 '휴대폰에서만 볼 수 있는 것' 첫째)
  3. 끊긴 파일은 0으로 · 막대 = 다 받은 파일 수 — `test_failed_second_file_shows_one_third`(33%) ✔ (다시 고르면 그 파일을 처음부터 보내므로 맞는 표시 — ARCH 받음)
  4. 「맥에 연결할 수 없어요. 휴대폰 와이파이 · Tailscale과 맥북을 확인해 주세요.」 — `test_offline_send_mentions_wifi_tailscale_and_mac` ✔
  5. 「더 보내기」 · 「사진 다시 올리기」도 Send와 같은 올리기(끊음 · 한 번 스스로 · 다시 고르기 · 받은 것 건너뜀 · PIN 뒤 같은 물음으로) — `test_job_more_stall_reselect_skips_numbered_photos` · `test_job_blurry_stall_retries_and_finishes` · `test_job_pin_returns_to_same_question_and_skips_received` ✔
  6. `upload_check`가 `_2` · `_3` 붙은 것까지 견줌(`numbered_paths`) — `test_received_check_finds_third_numbered_name` ✔
  7. Manual Face 줄: 가진 사진은 처음 보낼 때 · 「다시 만들기」 2번까지(Daily 1도 「이 원고로 갈게요 →」로 맞춤) — `test_manual_face_matches_remake_limit_and_initial_send` ✔
  8. 물음표 · 건의하기 · 판 고르기 누름 자리 44 이상 · 단추 글 `word-break:keep-all` — `test_large_text_touch_targets_and_whole_button_words` ✔
- PLN이 직접 본 것(02:41 KST, 제품 저장소 fetch · ls-remote · merge-base · diff · grep만): 원격 main `8b0d084` · 가지 머리 `5bbe272` · main이 그 조상(앞으로 감기) · 네 파일 · 위 값과 글 · 시험 이름 11개. 시험은 다시 돌리지 않음.
- **합치기 — PLN이 정함: RSCH가 차이를 읽고 Playwright 깐 곳에서 시험을 다시 돌리면 합침(IVA 다시 안 함).** 조건: 제품 main `8b0d084` 그대로 · 가지 머리 `5bbe272`(앞으로 감기) · push 직전 main 다시 봄 — 움직였으면 합치지 말고 PLN에. ⚠ Playwright 없이 돌리면 건너뜀 32 — 건너뜀 0을 봄. 합친 뒤 한알이 맥에 새 판 받기 한 줄(오늘 한 장 1번 줄 그대로 — 1-3 다시). `manual-webapp.md`가 `agents/` 폴더라 맥 사본의 stash `before-mactest`(agents/ 14개)를 되살리지 않음.
- PMO 승계 · 서브 세션: ARCH · PMO 생각 같음 — 같은 코드는 PRIMARY 하나 · 크거나 따로 검증할 일만 의뢰서 + 한알 확인(결정 46). PLN도 같음.

## 덧붙임 — 합쳐짐 (2026-11-22 02:44 KST)

- RSCH 확인 · 합침: 에이전트 저장소 main `32142e7` RSCH 요청서 003 61번 — 제품 main 앞으로 감기 `8b0d084..5bbe272`(02:43:13 · 강제 아님 · push 직전 main 그대로 · 바뀐 줄 644줄을 다 읽음 · Playwright + cryptography 자리 169 OK 건너뜀 0을 두 번 · 고친 판에서 57번 1 재현 → 401 + `Connection: close` → 새 연결은 PIN 화면 · 501 없음). PLN이 02:44에 제품 원격 main 머리 = `5bbe272`를 ls-remote로 봄.
- RSCH가 읽으며 본 것 넷 — **PLN이 정함: 고치지 않음, 오늘 겪으시면 그때(결정 45).** ① 이어 가기는 `sessionStorage` — 홈 화면 앱을 아예 닫았다 열면 사라질 수 있음 → 오늘 한 장 '휴대폰에서만 볼 수 있는 것' 첫째에 '앱을 아예 닫았다 열기'를 더함 ② 큰 파일을 보내는 중 로그인이 풀리면 「보내다 끊겼어요」가 먼저(55번 5 그대로) ③ 물음표는 누르는 자리만 44 · 보이는 동그라미 그대로 ④ 같은 사진을 두 번 골라 보내면 두 장(E5 — 안 고친 것).
