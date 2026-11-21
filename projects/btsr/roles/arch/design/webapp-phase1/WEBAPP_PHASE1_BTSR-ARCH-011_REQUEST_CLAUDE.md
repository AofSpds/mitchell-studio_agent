# BTSR-ARCH-011_webapp-b6-fix-versions — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo d9520b95, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 16:34 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 5fbbea06) |
| 위 요청 | BTSR-PLN-002 — 요구 webapp-phase1 **2.12판**(`btsr/pln` 6bc476e) 묶음 6 R6.1–R6.7, 결정 14 · 18 · 20 · 21 · 24 · 26 · 31. 19번 가2 · 가3 · 가4. PLN 대조 받음(2.2판) |
| 설계 | [WEBAPP_PHASE1_B6_DESIGN_CLAUDE.md](WEBAPP_PHASE1_B6_DESIGN_CLAUDE.md) **2.2판** |
| 화면 참고 | 시안 3판 화면 10 · 11 · 12 · 13 — 에이전트 main `projects/btsr/roles/rsch/sub/s8_uiux_rework/`. 3판에 없는 것은 만들지 않음 |
| 바탕 | 제품 가지 `feat/webapp-b4a2-stuck-restart-20261121` **243cff0**(4-a-2 — 반환 받음, main에 앞으로 감기 예정)에서 새 가지. main이 그새 243cff0이면 main에서 |
| **맥 일** | **하지 않음** |
| 규칙과 다른 곳 | 게시판이 없어 요청서를 ARCH 작업 칸에. 받음 · 반환은 PMO 칸에 · 제품 main push 안 함(RSCH 몫) |

## 1. 한 줄

⑦에 고칠 점 → 서버가 ④ 편집을 '다음 판'으로 차례표에, 다음 판은 **새 이름 캡컷 프로젝트를 다시 만들어** ⑥을 거쳐 `v<N+1>`. 완성 = 승인 + 규격. 규격 다른 판은 승인이 의견 · 다시 뽑기. 저장 · 올리기는 승인한 규격 맞는 판. 판 고르기 · ? 둘 · 바. 승인 뒤 Post 고칠 점 없음 · caption 일 — 설계 2.2판 2–9-1번대로.

## 2. 받아들임 기준 (ARCH가 대조함)

설계 2.2판 9번 1–9 · 9-1번 10–11 그대로. 이 요청에서 하나 더함:

- **12 (4-a-2와 잇기)**: 설계의 '개발자에게'(5번 다시 뽑기 두 번 다르면 · 3번 달라진 장면 없음 · 8번 넷째 고칠 점)는 모두 4-a-2의 **`jobs.stop(to = "dev")`** 한 길로(까닭 원문 · `suggestions/dev/` 글 · busy 아님). '미첼에게 물음'은 `to = "ask"`. 새 갈래를 만들지 않음.
- **13**: 고쳐 만드는 중 · 규격 맞추는 중은 busy(만드는 중) · 승인 뒤 caption 일은 busy 아님 — 4-a `busy()`에서.
- **14**: 회귀 전부(저장소 전부 · 환경 값 없이) · 코드 커밋 + 시험 커밋 · 시험 명령 · 환경 값 그대로(AAA 규칙 24) · 화면 그림 3판 화면 10 · 11 · 12 · 13 꼴 390px.

## 3. 범위 밖

- 휴대폰 직접 편집(묶음 7) · 미리 보기 단계 빼기 · 프로젝트 복제 · 다시 만들기 횟수 · 템플릿(8-2) · 알림 · https(4-b) · 맥에서 돌리기 · 제품 main push.

## 4. 반환

6항목 + '판 기록' 꼴 한 벌(가짜 claude · codex로 v1 → 고칠 점 → v2 · 규격 다른 v3까지 돈 `status.json`의 `fixes` · `exports` · `approvals` 줄). 반환은 ARCH(Paseo d9520b95)로.
