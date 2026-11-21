# webapp-phase1 묶음 4-b — ARCH → PLN 반환 (BTSR-PLN-002)

| 칸 | 내용 |
|---|---|
| 건 | BTSR-PLN-002 묶음 4-b (요구 2.13판 R4.4 · R4.5 · R5.7 판정 둘, 결정 05 · 08 · 20 · 21 · 25 · 32 · 33 · 34 · S9 K6) — PMO 건 [BTSR-ARCH-012](WEBAPP_PHASE1_BTSR-ARCH-012_REQUEST_CLAUDE.md) + 덧붙임 1(캡션 거르기 — PLN 17:10 · RSCH 32번) · 설계 [2.1판 + 8번](WEBAPP_PHASE1_B4B_DESIGN_CLAUDE.md) |
| 반환 시각 | 2026-11-21 17:23 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` 4f5b0ed `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B4B_RETURN_CODEX.md` (PMO Paseo 99626982 · 아스트라) |
| 제품 가지 | `feat/webapp-b4b-https-push-20261121` **7127393** · 코드 8ea42e1 · da20459 · 9d1863d / 시험 7127393 · 바탕 e512fcd — **지금 제품 main = e512fcd**(ls-remote로 봄, 조상 확인함 → 앞으로 감기 됨) |

## 1. 결과

**받음.** 설계 5번 1–9 · 8번 1–3 · 요청 11–15 · 덧붙임 1 기준 16 맞음. 5번 10(아이폰 실제)은 맥 시험. 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- 시험: `git archive 7127393 | tar -x`로 새 임시 폴더에 저장소 전부 풀고 맨 위에서 `env -u PYTHONIOENCODING -u PYTHONUTF8 python -m unittest discover -s app/webapp/tests`
  - 이 PC 기본 파이썬(`cryptography` 없음): **Ran 131 · OK (skipped=2)** — 건너뛴 둘은 암호화 시험(기준 4 · 5 몫).
  - 저장소 밖 임시 가상 환경에 `cryptography` 50.0.2를 깔고 같은 명령: **Ran 131 · OK**. 임시 폴더 · 가상 환경은 지움.
- grep 대조(7127393):
  - 기준 1 · 2 프록시: `local_proxy()`는 `127.0.0.1` · `::1`만(server.py:323-324), 그때만 `X-Forwarded-For` 마지막 값(:328-329) → 허용 · PIN이 같은 주소. `Tailscale-Funnel-Request` → 막음(:373).
  - 기준 3 `Secure`: 이 맥 프록시이고 `X-Forwarded-Proto: https`일 때만(server.py:570-571).
  - 기준 7 키: `push/`가 저장소 안이면 `~/.local/share/mitchell-studio/push/`로(webpush.py:21-25) · 폴더 권한 700(:45). 저장소에 `*.pem` · `subs.json` · `requirements` 파일 0(`git ls-tree`).
  - 보내는 곳은 `https` + `push.apple.com`만(webpush.py:90) · 같은 작업 같은 일 10분(:164 · :177).
  - 기준 11 알림 셋: 「확인해 주세요 — <접수 · 원고 · 얼굴 · 미리보기>」 = 단계가 `check`로 바뀔 때(jobs.py:333-336) · 「다 됐어요」 = 새 판이 `spec_ok`(:339-341) · 「문제가 생겼어요」 = `jobs.stop`의 `to == "ask"`만(:2243-2244). 글에 작업 제목 · 손님 정보 없음.
  - 기준 12 devpush 이름: `COMMIT_NAME, COMMIT_EMAIL = "mitchell-webapp", "webapp@localhost"` 한 곳(devpush.py:51) → 작성자 · 커미터 넷 모두(:59-60).
  - 기준 13 개발자 글: `events` 마지막 5줄(devpush.py:142) · 작업자 멈춤 한 줄 · 로그 끝 줄 걷음(`_tail` 0).
  - 기준 16 캡션: `agents/uploader/directives.md`의 `pii_hits`를 (갈래, 글) 그대로 빼고 걸린 갈래만 모음 · 접수 표 손님 이름이 있으면 '이름 꼴'(runner.py:256-283) · 걸리면 글을 내지 않음.
- 화면(390px Manual · 일반 브라우저 흐림 · 홈 화면 조건 켬 · PIN 뒤 Jobs 복귀)은 PMO 반환서의 증거로 받음.

## 3. PMO가 정한 것 — ARCH 판단

| 정한 것 | 판단 |
|---|---|
| 데이터 폴더가 저장소 안이면 키 · 구독을 `~/.local/share/mitchell-studio/push/`에 | 받음 — 기준 7('저장소 안에 키가 생기지 않음')을 길로 막음 |
| 키 파일 권한 600 대신 폴더 700 | 받음 — 맥 한 사용자 계정이라 같은 효과. [맥에서 확인] 파일 권한 |
| 보내는 곳을 애플 알림 서버(`*.push.apple.com`)로 묶음 | 받음 — 바깥 연결이 한 곳으로 좁아짐. 가게 휴대폰이 아이폰이라 1차엔 맞음. 안드로이드 · 다른 브라우저가 들어오면 그때 넓힘(남은 것 2) |
| 알림을 연 잠긴 화면에서 PIN 뒤 Jobs로 돌아감(da20459) | 받음 — 설계 4-1 '누르면 Jobs' |
| 캡션: 확인 전 캡션 숨김 · 옛 작업 글도 Post에서 읽을 때 검사 | 받음 — 다시 쓰는 동안 걸린 글이 보이지 않게(PMO 배운 것) |

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. [맥에서 확인] https 한 장 1–4 → 아이폰 Tailscale · LTE: https 경고 없음 · Manual에서 켬 · 앱 닫고 `check` → 알림 · 와이파이에서 Tailscale 끄면 https 안 열림 · 실제 `Tailscale-Funnel-Request` 머리글 이름 · 키 파일 권한 · 진짜 캡션 사람 확인 · 개발자 글 사람 확인. 모두 1차 끝 맥 시험(`MAC_RUN_PHASE1.md` — RSCH S13 목록이 오면 ARCH가 1차 끝 판으로 고침, PLN 알림 · RSCH 요청서 003 33번).
2. 보내는 곳이 애플 알림 서버만 — 아이폰 밖 기기가 생기면 넓힐 일.
3. **제품 main 합치기**: PLN이 정하시고 RSCH(ed5ef600)가 앞으로 감기 push(결정 13). 바탕 e512fcd = 지금 main.

## 6. 배운 것

- `cryptography` 없는 곳에서 건너뛰는 시험은 대조 쪽에서 따로 만든 가상 환경으로 다시 돌려야 '전부'라 할 수 있음 — 건너뛴 수를 반환서에 적게 한 기준 14가 그 자리를 남김.

## 7. 다음

- PLN: 이 반환 받음 · 제품 main 합치기 정함.
- ARCH: 8-2(BTSR-ARCH-013)를 PMO(99626982)에 — 바탕 7127393.
