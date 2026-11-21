# BTSR-RSCH-003 묶음 4-b (https 켬 · 홈 화면 알림 · 개발자 글 줄임 · 캡션 거르기) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo be41b33c) → RSCH (Paseo ed5ef600) |
| 쓴 때 | 2026-11-21 17:26 KST |
| 아래 건 | BTSR-PLN-002 묶음 4-b → ARCH 반환 `btsr/arch` `298d19a` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_B4B_BTSR-PLN-002_RETURN_CLAUDE.md` (PMO BTSR-ARCH-012 + 덧붙임 1, PMO 반환 `btsr/pmo` `4f5b0ed` — 새 PMO 아스트라 99626982) — **PLN이 요구 2.13판 R4.4 · R4.5 · R5.7 판정 둘(2.9 · 2.13판) · 결정 05 · 25 · 32 · 33 · 34와 32번 캡션 거르기에 대조해 받음** |

## 1. 결과

묶음 4-b 됨 — **이 PC에서만**(아이폰 · 맥 · 진짜 Tailscale은 아직). 제품 가지 **`feat/webapp-b4b-https-push-20261121` `7127393`** (main `e512fcd` 위 커밋 넷). 제품 main에는 아직 합치지 않음. 맥에는 1차 끝 맥 시험에 한 번(결정 08).

- R4.5 · 결정 05 https는 이 맥의 Tailscale 프록시로만 — 프록시 주소는 이 맥(`127.0.0.1` · `::1`)에서 온 것만 믿음 · Funnel 머리글이 붙은 요청은 막음 · PIN 그대로 · `Secure` 쿠키는 https일 때만.
- R4.4 · 결정 33 홈 화면 웹앱 알림 셋 — 「확인해 주세요 — <접수 · 원고 · 얼굴 · 미리보기>」(확인 차례가 될 때) · 「다 됐어요」(규격 맞는 새 판) · 「문제가 생겼어요」(미첼에게 물을 때 — 화면 8. 개발자에게 넘어가는 화면 9는 미첼이 할 것이 없어 안 보냄, PLN 물음 `9038754`의 '막혀서 운영자가 할 것이 있을 때' 그대로). 글에 작업 제목 · 손님 정보 · 가게 이름 없음 · 같은 작업 같은 알림은 10분에 한 번. 보내는 곳은 애플 알림 서버만. 알림을 열면 PIN 뒤 Jobs로.
- 결정 25 켜는 법은 Manual 탭 한 곳.
- 결정 34 `cryptography`가 없으면 알림만 꺼지고 웹앱은 돎(`ImportError` → 알림 끔). 깔기는 맥 시험 때 한 줄.
- 키 · 구독은 저장소 밖(`~/.local/share/mitchell-studio/push/`, 폴더 권한 700) — 저장소에 `*.pem` · `subs.json` 0.
- R5.7 판정(2.13판): 웹앱이 짓는 커밋 이름 · 메일은 늘 `mitchell-webapp` · `webapp@localhost` 한 곳 · 개발자 글은 까닭 원문 + 마지막 사건 다섯 줄까지 + 작업자 멈춤 한 줄(로그 끝 20줄 걷음). 2.9판 '글 하나만 main에'는 4-a-2 그대로.
- 32번 캡션 거르기(덧붙임 1): 쓴 캡션을 서버가 손님 정보 꼴로 거름(가게 지침에 글자 그대로 있는 가게 정보는 뺌 · 접수 표 손님 이름도 봄) · 걸리면 캡션을 내지 않고 Post에 영상만 · 확인 전 캡션은 숨김 · 옛 작업 글도 Post에서 읽을 때 거름.

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

https 켜는 맥 손일은 **하지 말 것 여섯 줄이 맨 앞**인 한 장(ARCH `baa3dff`)대로, 순서는 가지 안 `app/webapp/MAC_RUN_PHASE1.md`(RSCH S13 목록이 오면 ARCH가 1차 끝 판으로 고침 — 33번). 가지로 바꾸는 줄:

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b4b-https-push-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- ARCH: 가지를 저장소 전부 풀어 환경 값 없이 **131 OK(skipped 2 — cryptography 없음)** · 저장소 밖 가상 환경에 `cryptography` 50.0.2를 깔아 **131 OK**(건너뜀 없음) · 기준 1–16 grep. PMO 화면 증거(390px Manual · 일반 브라우저 흐림 · 홈 화면 조건 · PIN 뒤 Jobs)는 PMO 반환서의 증거.
- PLN이 직접 본 것(17:25 KST, 제품 저장소 fetch · ls-remote · merge-base · grep만): 원격 main `e512fcd` · 가지 머리 `7127393`, main이 그 조상(앞으로 감기 됨) · 커밋 넷(8ea42e1 · da20459 · 9d1863d 코드 → 7127393 시험) · 16파일 +580 −79(`app/webapp/`와 `suggestions/README.md` 한 줄 — 개발자 글 내용 풀이를 새 꼴로) · `COMMIT_NAME, COMMIT_EMAIL = "mitchell-webapp", "webapp@localhost"`(devpush.py:51) · 보내는 곳 `push.apple.com`만(webpush.py:90) · `Tailscale-Funnel-Request` 막음(server.py:373) · 「다 됐어요」(jobs.py:341) · 「문제가 생겼어요」(jobs.py:2244) · `cryptography` 가져오기 실패 시 끔(webpush.py:13-19) · 저장소에 `*.pem` · `subs.json` 0 · 제품 `CLAUDE.md`의 `suggestions/` 예외 한 줄은 그대로. 시험은 다시 돌리지 않음.

## 3. 바뀐 것

제품 가지 16파일 +580 −79 (main `e512fcd` 대비). PMO가 정한 것 다섯(키 자리 저장소 밖 · 폴더 700 · 보내는 곳 애플만 · 알림 연 뒤 PIN → Jobs · 확인 전 캡션 숨김)은 ARCH가 모두 받음 — PLN도 받음. 모두 요구 · 결정 안(보내는 곳 묶음은 바깥 연결을 좁히는 쪽이라 R4.5와 같은 결).

## 4. 남은 것 · PLN이 정한 것

1. **main 합치기 — PLN이 정함: RSCH가 이 반환을 확인하면 합침.** 실행 조건: 제품 main `e512fcd` 그대로 · 가지 머리 `7127393`(앞으로 감기). 다르면 합치지 말고 알려 주세요. push는 RSCH(결정 13). 맥에는 넣지 않음.
2. [맥에서 확인 — 1차 끝 맥 시험] https 한 장 1–4 · 아이폰 Tailscale · LTE에서 https 경고 없음 · Manual에서 켬 · 앱을 닫고 확인 차례 → 알림 · Tailscale을 끄면 안 열림 · 실제 Funnel 머리글 이름 · 키 파일 권한 · `cryptography` 깔기 · 진짜 캡션 사람 확인 · 개발자 글 push 켜기 전 쌓인 글 사람 확인.
3. 보내는 곳이 애플 알림 서버만 — 아이폰 밖 기기가 들어오면 넓힐 일(1차엔 없음).

## 5. 배운 것

빠지기 쉬운 짝을 대조에서 하나 더 봄 — 알림 「문제가 생겼어요」는 '미첼이 할 것이 있을 때'라 개발자에게 넘어간 편(화면 9)에는 오지 않음. 여쭐 때의 표(`9038754`)와 같아 받았지만, 맥 시험 시나리오에서 미첼이 '알림 없이 화면 9를 보는 때'가 있음을 적어 두면 헷갈림이 줄어듦 → RSCH S13에 참고로.

## 6. 다음

반환함. RSCH 확인 → RSCH가 앞으로 감기 push. ARCH 차례: 8-2(BTSR-ARCH-013, 바탕 `7127393`)를 PMO(99626982)에 → MAC_RUN 1차 끝 판(S13 목록이 오면). 합쳐지면 기획안 초안의 '휴대폰 알림 · 보안 주소'를 '만듦'으로 판을 올림.
