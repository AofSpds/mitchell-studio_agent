# BTSR-ARCH-012_webapp-b4b-https-push — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 7621f3de, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 16:56 KST 초안 · 보낸 때 17:04 KST (ARCH-011 대조 뒤) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 99626982, 아스트라 — 옛 5fbbea06에서 승계) |
| 위 요청 | BTSR-PLN-002 — 요구 webapp-phase1 **2.13판**(`btsr/pln` 82344a2) 묶음 4-b R4.4 · R4.5 · R5.7 판정 둘, 결정 05 · 08 · 20 · 21 · 25 · 32 · 33 · 34. S9 K6(http) |
| 설계 | [WEBAPP_PHASE1_B4B_DESIGN_CLAUDE.md](WEBAPP_PHASE1_B4B_DESIGN_CLAUDE.md) **2.1판 + 8번** · 맥 손일은 [https 한 장](WEBAPP_PHASE1_B4B_HTTPS_SHEET_CLAUDE.md) (PMO는 손대지 않음 — 1차 끝 맥 시험) |
| 화면 참고 | 시안 3판 — 에이전트 main `projects/btsr/roles/rsch/sub/s8_uiux_rework/`. 켜는 곳은 Manual 탭 한 곳(결정 25). 3판에 없는 카드 · 띠 · 안내 화면은 만들지 않음 |
| 바탕 | 제품 가지 `feat/webapp-b6-fix-versions-20261121` **e512fcd**(묶음 6 — ARCH 받음, main에 앞으로 감기 예정)에서 새 가지. main이 그새 e512fcd면 main에서. (6 · 4-b 모두 `server.py`를 고쳐 6 위에 얹음) |
| **맥 일** | **하지 않음** — `tailscale serve` · 인증서 · `cryptography` 깔기 · 아이폰 시험은 1차 끝 맥 시험(결정 08) |
| 규칙과 다른 곳 | 게시판이 없어 요청서를 ARCH 작업 칸에. 받음 · 반환은 PMO 칸에 · 제품 main push 안 함(RSCH 몫) |

## 1. 한 줄

https는 맥의 `tailscale serve`가 맡고 서버는 프록시 뒤 손님 주소(`X-Forwarded-For`, 이 맥에서 온 것만 믿음)로 허용 · PIN 잠금 · `Secure` 쿠키를 고친다. 알림은 표준 Web Push(VAPID + RFC 8291, `cryptography` 하나)로 세 일에서 — 설계 2.1판 2–7번대로. 더해 devpush 작은 고침 둘 · MAC_RUN 한 줄 — 설계 8번대로.

## 2. 받아들임 기준 (ARCH가 대조함)

설계 2.1판 5번 1–9 · 8번 1–3의 기준 그대로(5번 10은 맥 시험 — 이 건에서 하지 않음). 이 요청에서 하나씩 더하거나 맞춤:

- **11 (알릴 때를 지금 코드에 잇기)**: 설계 4-2의 셋을 바탕 커밋의 실제 길에 잇는다 — 새 사건 종류를 만들지 않음.
  - 「확인해 주세요 — <단계>」 = 미첼 확인을 기다리는 단계에 들어감(4-a `busy()`의 '미첼 확인 기다림').
  - 「다 됐어요」 = ⑥ 뽑기가 끝나고 **`spec_ok`인 판**(묶음 6 — 규격 다른 판은 다시 뽑기로 가므로 알리지 않음).
  - 「문제가 생겼어요」 = 4-a-2 **`jobs.stop(to = "ask")`**. `to = "dev"`는 미첼이 할 것이 없어 알리지 않음.
  - 반환서에 세 줄 표: 알림 · 부르는 곳(파일:줄) · 시험 이름.
- **12 (devpush 이름 — 설계 8-1 맞춤)**: 일반 값은 코드 안 상수 한 곳. 시험은 가짜 사본의 git 설정에 표시 글자 이름 · 메일을 넣고, main에 든 커밋의 `%an %ae %cn %ce`가 모두 일반 값.
- **13 (개발자 글 — 설계 8-2 맞춤)**: 4-a-2의 '로그 끝 20줄'을 걷는다(코드 · 시험 · 설계 따른 글 모두). 글 = 까닭 원문 · `events` 마지막 ≤ 5줄 · 작업자 멈춤 줄 하나, 모두 R1.4 거르기 뒤.
- **14 (`cryptography`)**: 저장소에 넣지 않고 `requirements` 류 파일도 만들지 않음 — 없으면 알림만 꺼지는 길(설계 4-2 끝). 이 PC 시험에서 없으면 5번 4 · 5를 건너뛰고 **건너뛴 수**를 반환서에. 따로 만든 가상 환경(저장소 밖)에 깔아 돌렸다면 그 판 번호와 결과도.
- **15**: 회귀 전부(저장소 전부 · 환경 값 없이) · 코드 커밋 + 시험 커밋 · 시험 명령 · 환경 값 그대로(AAA 규칙 24) · Manual 탭 알림 단추 셋 그림(390px, 켤 수 없는 곳의 흐린 꼴 하나 포함).

## 3. 범위 밖

- 맥에서 돌리기 · `tailscale` 명령 · Funnel · 공유기 · 알림 종류 늘리기 · 이메일 · 문자 · 사진 앱 바로 보내기 화면(묶음 6 · R6.5 쪽) · 템플릿(8-2) · 제품 main push.

## 4. 반환

6항목 + 2번 11의 표 · 키 파일이 저장소 밖에만 있음을 보인 `git status` · 반환은 ARCH(Paseo 7621f3de)로.
