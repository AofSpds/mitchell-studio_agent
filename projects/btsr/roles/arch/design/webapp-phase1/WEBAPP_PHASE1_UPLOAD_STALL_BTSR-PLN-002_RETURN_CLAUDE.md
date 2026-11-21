# webapp-phase1 올리기 멎음 고침 — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN 요청 `btsr/pln` 1d86231 `WEBAPP_PHASE1_UPLOAD_STALL_FIX_REQUEST_CLAUDE.md` (한알 11-22 00:01:42 · RSCH 54번) — PMO 건 [BTSR-ARCH-020](WEBAPP_PHASE1_BTSR-ARCH-020_REQUEST_CLAUDE.md) |
| 반환 시각 | 2026-11-22 00:31 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | `btsr/pmo` fb3b94d `records/webapp-phase1/WEBAPP_PHASE1_UPLOAD_STALL_RETURN_CODEX.md` (PMO 7837ebd8) |
| **합칠 머리** | 제품 `feat/webapp-upload-stall-20261122` **8b0d084**(ls-remote로 봄) — 지금 main **896abae** 위 커밋 둘: ce56711 코드(`app.html`) · 8b0d084 시험(`tests/test_upload_stall.py`) → 앞으로 감기 됨 |

## 1. 결과

**받음.** 1 · 2(꼭) · 3 · 4 '됨' 맞음. 서버 · 화면 구조 그대로(새 화면 · 탭 · 단추 0). 제품 main push · 맥 일 없음. 실제 아이폰 확인은 합친 뒤(오늘 휴대폰 테스트).

## 2. 증거 (ARCH가 다시 본 것)

- `git diff --stat 896abae 8b0d084` = `app/webapp/static/app.html`(+186 −54 꼴) · `app/webapp/tests/test_upload_stall.py`(새로) — 두 파일뿐.
- 시험: `git archive 8b0d084 | tar -x` 새 임시 폴더 · 환경 값 없이
  - 이 PC 기본 파이썬: Ran 149 · OK (**skipped=14**) — 새 390px 시험 12개는 Playwright가 없어 건너뜀 + Web Push 2.
  - 저장소 밖 임시 가상 환경에 **Playwright · `cryptography` 50.0.2**를 깔고 같은 명령: **Ran 149 · OK (건너뜀 0)** — 390px 시험 12개 포함. 임시 폴더 · 가상 환경 지움.
- grep(8b0d084 `app.html`): `UPLOAD_STALL_MS = 30000, HAVE_TIMEOUT_MS = 15000` 한 곳(:277) · 올리기 지켜보는 타이머 → `x.abort()`(:504) · `have()`에 `AbortController`(:486) · 「사진 · 영상을 다시 골라 주세요」(:278) · 401 한 줄 「로그인이 풀렸어요 — PIN을 넣은 뒤 사진 · 영상을 다시 골라 주세요」(:279) — 한 줄을 보인 뒤 2.5초 뒤 PIN으로(:300), 묶음 id · 요청 글을 `sessionStorage`에(:295) → 돌아와 읽음(:952) · 끝나거나 멈추면 지움(:533).
- '됨'마다 시험 이름(PMO): 1 `test_stalled_body_aborts_and_retries_only_that_file` · `test_progressing_upload_can_last_longer_than_stall_limit` · `test_slow_have_expires_and_file_is_sent` · `test_lost_response_skips_file_already_received` / 2 `test_reselect_three_skips_two_and_creates_one_job` / 3 `test_pin_during_upload_resumes_same_batch_and_request` 외 넷 / 4 `test_busy_send_explains_and_does_not_create_a_batch`.

## 3. 남은 것

- 합치기: RSCH가 두 파일뿐인지 보고 시험을 다시 돌린 뒤 앞으로 감기 → 한알이 맥에 새 판 받기 한 줄. **RSCH가 시험할 때 Playwright가 없으면 새 시험 12개가 '건너뜀'으로만 나옴** — 건너뛴 수를 보시거나 Playwright를 깐 곳에서.
- 화면 글 [안] 셋(「사진 · 영상을 다시 골라 주세요」 · 401 한 줄 · 바쁠 때 Send 한 줄)은 RSCH가 한알께.
- http에서 화면 꺼짐은 그대로 — 휴대폰은 https 주소로(3-3 · 3-4).

## 4. 배운 것

- 화면만 고친 건은 브라우저 시험이 '건너뜀'으로 통과해 보일 수 있음 — 대조 때 건너뛴 수를 늘 보고, 그 시험이 도는 곳에서 다시 돌림.
