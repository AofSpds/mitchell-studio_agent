# BTSR-ARCH-010_webapp-b4a2-stuck-restart — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo d9520b95, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 15:55 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 5fbbea06) |
| 위 요청 | BTSR-PLN-002 — 요구 webapp-phase1 **2.9판**(`btsr/pln` 4edd054) R2.7 · R3.5 · R5.5 · R5.6 · R5.7 · R32.4(거둠), 결정 27 · 29 · 30 · 32 · 35. PLN 대조 받음(고칠 것 둘 → 설계 1.1판에 고침) |
| 설계 | [WEBAPP_PHASE1_B4A2_DESIGN_CLAUDE.md](WEBAPP_PHASE1_B4A2_DESIGN_CLAUDE.md) **1.1판** |
| 화면 참고 | 시안 3판 화면 5 · 7 · 8 · 9 · 15 — 에이전트 main `projects/btsr/roles/rsch/sub/s8_uiux_rework/`(efa4632 · d89fb2f). 3판에 없는 것은 만들지 않음 |
| 바탕 | 제품 가지 `feat/webapp-b4a-one-job-bar-20261121` **ed11f5a**(4-a — 반환 받음, main에 앞으로 감기 예정)에서 새 가지. main이 그새 ed11f5a로 앞서 있으면 main에서 |
| **맥 일** | **하지 않음.** push 길은 가짜 원격으로만 시험. 맥 사본 쓰기 권한은 `MAC_RUN_PHASE1.md` 맥 0에 한 줄 더함(돌리지 않음) |
| 규칙과 다른 곳 | 게시판이 없어 요청서를 ARCH 작업 칸에 둠. 받음 · 반환은 PMO 칸에 · 제품 main push 안 함(RSCH 몫). 이 건이 만드는 '`suggestions/` 바로 push'는 웹앱 서버가 맥에서 할 일 — PMO가 지금 하는 것이 아님 |

## 1. 한 줄

모든 막힘을 `jobs.stop(to = ask | dev)` 한 길로, dev는 까닭 글 한 장을 원격 main 위에 그 글만 얹어 push, 「처음부터 시작」(화면 7 · 9)은 올린 자료 그대로 Send로(화면 15), 보내는 중 화면 · 흐린 사진 · 접수는 빠진 소재만 · 틈새 맞춤 · `resume` · 「가진 사진 올리기」 걷음 — 설계 1.1판 2–9번대로.

## 2. 받아들임 기준 (ARCH가 대조함)

설계 1.1판 10번 1–10 그대로(3-1 포함). 요약:

1. 막힘 한 길 · 까닭 덮어쓰기 0 · Edit 실패 → 화면 9 — 설계 2
2. 화면 8 · 9 꼴 · dev는 busy 아님 — 설계 2
3. `suggestions/dev/<시각>_<작업 id>.md` · 파일 이름에 제목 0 · 모든 글 거른 뒤 · 사진 영상 0 · pending · 건의도 같은 길 · 제품 규칙 글 예외 한 줄 — 설계 3
   - **3-1** 가짜 원격: 맥 사본이 기능 가지 · 로컬 커밋 · 안 올린 변경이 있어도 main에 든 커밋은 부모 = 원격 main · 바꾼 경로 = `suggestions/` 글 하나 · 맥 사본 HEAD · 가지 · 작업 트리 그대로 · 원격이 앞서면 다시 받아 얹음
4. `jobs.py resume` · 「가진 사진 올리기」 · 얼굴 '넘기기 / 올리기' 고르기 · `face_remakes` 물음 0 · 다시 만들기 다 쓰면 dev — 설계 2 · 2-1
5. 「처음부터 시작」 → 한 번 더 묻기 → 옛 편 멈춤 · 빠짐 · 파일 그대로 → 화면 15 → 새 편(베낌) — 설계 4
6. 보내는 중 n / 전체 · 그만 보내기 · 다시 보내기 — 설계 5
7. 흐린 사진 물음 · Face는 흐리지 않은 after — 설계 6
8. 접수는 빠진 · 흐린 · 모르는 소재만 묻고 사실은 비움 · 원고가 지어내지 않음 — 설계 7
9. 틈새: reconcile 한 번만 · 깨어난 Edit 캡컷 확인 · Edit 확인 실패면 ⑥ 없음 · Face 번호 겹침 0 — 설계 8
10. 회귀 전부(저장소 전부 · 환경 값 없이) · 코드 커밋 + 시험 커밋 · 시험 명령 · 환경 값 그대로(AAA 규칙 24) · 화면 그림 3판 화면 7 · 8 · 9 · 15 · 보내는 중 · 빈 Jobs 390px

## 3. 범위 밖

- 맥에서 돌리기 · 지시 글 · 템플릿 · 다시 만들기 횟수 맞춤(묶음 8-2) · 고치기 · 판 · caption(6) · 알림 · https(4-b) · 제품 main push.

## 4. 반환

6항목 + 걷은 것 목록(resume · 가진 사진 올리기 · 고르기 — 파일 · 함수 · 시험) + push 길 시험의 가짜 원격 꼴 한 줄. 반환은 ARCH(Paseo d9520b95)로.
