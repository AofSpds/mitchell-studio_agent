# webapp-phase1 보내기 고침 2 (S14) — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN 요청 `btsr/pln` `WEBAPP_PHASE1_UPLOAD_STALL_FIX2_REQUEST_CLAUDE.md` 1–4 + 끝 '덧붙임 — S14 끝 보고에서 더함' 5–8(7816847 · RSCH 요청서 003 57 · 58번 · 결정 45) — PMO 건 [BTSR-ARCH-021](WEBAPP_PHASE1_BTSR-ARCH-021_REQUEST_CLAUDE.md) + 덧붙임 1 |
| 반환 시각 | 2026-11-22 02:38 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` 7cd7e37 `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_UPLOAD_STALL2_RETURN_CODEX.md` (옛 PMO 7837ebd8 — 반환 뒤 승계, 새 PMO 512aef6d) |
| **합칠 머리** | 제품 `feat/webapp-upload-stall2-20261122` **5bbe272**(원격 ls-remote로 봄) — 1–4 코드 926c1a8 · 시험 9722fbc → 5–8 코드 0285ab4 · 시험 5bbe272. 바탕 = 지금 제품 main **8b0d084**(8b0d084가 5bbe272의 조상 → 앞으로 감기 됨) |

## 1. 결과

**받음 — 1–8 모두 됨(8도 넣음).** PMO가 맥락이 찬 채 만든 것으로 보고(RSCH 59번), 1–8을 diff로 하나씩 대조함 — 빠짐 · 반쯤 됨 없음. 새 화면 · 새 단추 0. 안 함(E5 · E33 · E4)은 그대로 안 함. 제품 main push · 맥 일 없음. 진짜 아이폰에서만 볼 것은 오늘 휴대폰 테스트에.

## 2. 증거 (ARCH가 다시 본 것)

- 바뀐 곳: `git diff --stat 8b0d084 5bbe272` = `server.py`(+17 −9) · `static/app.html`(+101 −45) · `agents/creative_director/manual-webapp.md`(+2 −2) · `tests/test_upload_stall.py`(+214 −5) 네 파일뿐.
- 시험: `git archive 5bbe272 | tar -x` 새 임시 폴더 · 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 PYTHONDONTWRITEBYTECODE=1 python -m unittest discover -s app/webapp/tests`
  - 이 PC 기본 파이썬: **Ran 169 · OK (skipped=32)**(Playwright · `cryptography` 없음).
  - 저장소 밖 임시 가상 환경(Playwright + `cryptography`, Chromium · WebKit): **Ran 169 · OK · 건너뜀 0**(`-v`에서 skipped 0줄). 임시 폴더 · 가상 환경 지움.
- 하나씩 대조(diff · 시험):

| # | 고친 곳 (5bbe272) | 재는 시험 | 판단 |
|---|---|---|---|
| 1 | `server.py` `send_json`: 200이 아니면 POST · PUT(또는 401 · 403이면 어떤 요청이든) `Connection: close` + 연결 닫음 | `test_rejected_post_closes_connection_then_pin_page_loads` — 날것 연결로 POST 401 · 403 뒤 **같은 연결**로 `GET /` → 200 · PIN 화면 | 됨 |
| 2 | `app.html` `runQueue` 시작에 `rememberSend("sendInProgress")`(묶음 · 요청 글) · `restoreSend`가 「보내던 것이 있어요 — 사진 · 영상을 다시 골라 주세요」 + 요청 글 · 다시 고르면 받은 것 건너뜀. 끝 · 멈춤에서 `clearResume`이 두 기록 모두 지움 | `test_reload_resumes_one_batch_and_skips_received`(새로 고침 → 같은 묶음 하나 · A PUT 1번 · batch/done 1번) · `test_failed_second_file_shows_one_third`(멈추면 기록 null) | 됨 |
| 3 | `transferFile` 실패 때 그 파일 `loaded = 0` · 상태 `fail` → 막대 = 다 받은 파일 수 | `test_failed_second_file_shows_one_third` — 셋 중 둘째 두 번 끊김 → `33%` | 됨(받은 파일 수만큼에서 멈춤) |
| 4 | `NO_MAC` = 「맥에 연결할 수 없어요. 휴대폰 와이파이 · Tailscale과 맥북을 확인해 주세요.」 | `test_offline_send_mentions_wifi_tailscale_and_mac` | 됨 |
| **5** | `jobPicker.onchange`가 Send와 같은 `transferFile`(30초 끊음 · 한 번 스스로 · 다시 볼 때 `have`)을 씀 · 두 번째도 안 되면 띠에 「보내다 끊겼어요 — 사진 · 영상을 다시 골라 주세요」 · 묶음을 기억해 다시 고르면 받은 것 건너뜀 · PIN 풀림은 `jobFilesAfterPin`으로 같은 물음에. 서버 `answer`가 「더 보내기」 · 「사진 다시 올리기」 둘 다 `more` → `batch`를 돌려주고 물음을 닫지 않음(reel_api.py:286–291 · intake.py:134–147 — ARCH가 봄) → 다시 고를 단추가 남음 | `test_job_more_stall_reselect_skips_numbered_photos` · `test_job_blurry_stall_retries_and_finishes` · `test_job_pin_returns_to_same_question_and_skips_received`(answer 1번 · 편 하나) | 됨 |
| **6** | `server.py` `numbered_paths`(이름 · `_2` · `_3` …)를 `unique_path`와 `upload_check`가 함께 씀 — 있는 동안 차례로 앞 1MB까지 견줌 | `test_received_check_finds_third_numbered_name`(셋째 `_3`까지 have · 새 것은 아님 · 폴더에 셋뿐) · 5의 첫 시험(같은 이름 · 크기 다른 두 장 → `one.jpg` · `one_2.jpg`뿐, 둘째 내용 같음) | 됨 |
| 7 | Manual :10 「다시 만들기」를 **2번까지** · 「가진 AI 얼굴 사진은 처음 보낼 때 함께」 · 화면에 없는 「가진 사진 올리기」 걷음 · :18 「좋아요」 → 「이 원고로 갈게요 →」(지금 단추 이름) | `test_manual_face_matches_remake_limit_and_initial_send`(`runner.FACE_REMAKES` 값과 견줌) | 됨 |
| 8 | 물음표 `.q` · 「건의하기」 · 판 고르기 `min 44×44`(물음표 겉모양은 그대로 22px 원) · `button { word-break: keep-all }` | `test_large_text_touch_targets_and_whole_button_words`(글자 키움 · 셋 모두 ≥44 · 「알림 켜기」 낱말마다 한 줄) | 됨 |

- 2 · 3 · 4 · 5 · 7 · 8의 화면 시험은 `SendRefresh` · `WebKitSendRefresh`로 390px **Chromium · WebKit 둘 다**에서 돎.

## 3. PMO가 정한 것 — ARCH 판단

| 정한 것 | 판단 |
|---|---|
| 401 · 403이면 GET에도 연결을 닫음(본문 없는 요청까지) | 받음 — 로그인 풀림 뒤 PIN 화면을 새 연결로 받는 쪽이 안전, 개인 앱이라 비용 없음 |
| 이어 가기 기록을 둘로 나눔(`sendInProgress` 새로 고침 · `sendAfterPin` 로그인) — 로그인 쪽이 먼저 | 받음 — 글이 상황마다 맞음(「보내던 것이…」 / 「로그인이 풀렸어요…」) |
| 막대는 끊긴 파일을 0으로(받은 파일 수만큼) | 받음 — 다시 고를 때 그 파일을 처음부터 보내므로 맞는 표시 |
| Manual :18 단추 이름도 함께 고침 | 받음 — 7의 '화면과 대조' 안 |

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 021 덧붙임 1(b7bdd8c) · 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. **제품 main 합치기**: RSCH가 차이를 읽고 Playwright 깐 곳에서 시험을 다시 돌린 뒤 앞으로 감기(IVA 다시 안 함). 합칠 머리 **5bbe272**, 지금 main 8b0d084. 합친 뒤 한알이 맥에 새 판 받기 한 줄.
2. 진짜 아이폰에서만 볼 것(57번 끝 · PLN이 오늘 한 장에) — 다른 앱에 다녀온 뒤 스스로 새로 고침 · 큰 글자 설정 · 실제 와이파이 끊김.
3. 다음 맥 글 덧붙임 때 3-2 · 개발자 글 전송 켜기를 '나중에 따로'로(전부터 남은 것).
4. **PMO 승계 끝**(한알 02:13:24 · RSCH 60번): 새 PMO Paseo `512aef6d-4b2e-4bea-9ffc-f934fbc9756c` · 넘김 `btsr/pmo` 33a37be → 받음 417fbe3 · codex · gpt-6.2-astra · ultra · full-access · 같은 작업 공간 · 옛 7837ebd8 CLOSED · 부모 라벨 비움(ARCH가 update_agent · get_agent_status로 확인).
   - **서브 세션 생각** — ARCH: 같은 코드를 고치는 일은 PMO 하나로 · 묶음이 크면(파일 여럿 · 40분 넘음) 그때만 의뢰서 + 한알 확인(결정 46). PMO: 같은 코드를 다루면 PRIMARY가 맡고, 독립 검증을 나눌 때만 의뢰서에 범위 · 개수 · 실행기 · 생각 수준을 적어 한알 확인 뒤 연다. → 둘이 같음. 맥락이 차는 것은 서브보다 **반환마다 승계 여부를 보는 것**으로(이번처럼).

## 6. 배운 것

- 일하는 중에 기준을 더할 때 같은 파일이면 같은 가지에 이어 붙이는 것이 빠름 — 이번에 덧붙임 1이 +25분으로 들어감(02:08 덧붙임 → 02:24 반환 커밋).
- 맥락이 찬 세션의 반환은 '됨' 글이 아니라 **고친 곳과 시험을 짝지어** 하나씩 봄 — 서버가 무엇을 돌려주는지(이번엔 `answer`의 `batch`)처럼 diff 밖에 기대는 곳을 따로 열어 봄.

## 7. 다음

- PLN: 이 반환 받음 · 합침 조건(main 8b0d084 · 머리 5bbe272 · Playwright 깐 곳 건너뜀 0)을 RSCH에.
- ARCH: 휴대폰 테스트 결과 · PLN 알림대로. 다음 요청 번호 022 · PMO는 512aef6d로.
