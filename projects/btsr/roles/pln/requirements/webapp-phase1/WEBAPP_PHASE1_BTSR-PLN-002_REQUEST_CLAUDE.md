# BTSR-PLN-002_webapp-phase1-capcut — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (PRIMARY — Paseo 071c15f3, 가지 `btsr/pln`) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54, 가지 `btsr/arch`) → ARCH가 PMO로 (AAA 규칙 15) |
| 쓴 때 | 2026-11-21 03:30 KST |
| 근거 | 한알 결정 [01–03](WEBAPP_PHASE1_DECISIONS_CLAUDE.md) · 위 요청 BTSR-RSCH-003_webapp-phase1-capcut (main `45f8b7b`) |
| 규칙과 다른 곳 | 게시판(`board/`)이 아직 없어 이 요청서를 PLN 작업 칸에 둠. 받음 · 반환은 ARCH 칸에 두고 경로를 알려 주세요 |

## 1. 한 줄

웹앱 1차에서 아직 구현 안 된 기능을 **캡컷 길로** 설계해, 묶음 차례대로 PMO에 맡겨 주세요. 요구 정본: [WEBAPP_PHASE1_REQUIREMENTS_CLAUDE.md](WEBAPP_PHASE1_REQUIREMENTS_CLAUDE.md) 1판.

## 2. 차례

**BTSR-PLN-001(작업자 모델, 급함)을 먼저 끝낸 뒤**:

`1 → 2 + 8 → 3 → 5 + 3-2 → 4-a → (4-b: 한알 답 뒤) → 6` · 묶음 7은 한알 답 전에는 하지 않음.

- 다음 묶음의 설계를 시작하려고 앞 묶음의 PMO 반환을 기다리지 않아도 됩니다 — 겹쳐 진행해도 되고, PMO 반환은 묶음마다 따로.
- 웹앱 시험 결과가 오면 PLN이 차례를 2판으로 고칠 수 있습니다. 바뀌면 알립니다.

## 3. 설계에서 정해 주실 것 (ARCH 몫)

1. 서버가 일을 시작시키는 구조 — 서버가 맥의 Claude(접수 · 원고)와 ChatGPT 작업자(⑥ · AI 얼굴)를 사람 없이 부르는 길, 여러 작업의 차례와 실패 기록 (묶음 2 · 5 · 3-2 · 6). 바탕: 제품 `app/agent-bridge.md`:24-29(명령으로 한 번 부르는 길 시험됨 — RSCH 초안).
2. 컴퓨터 유즈를 줄일 수 있는 곳(캡컷 프로젝트 파일을 직접 쓰기 등)과 남는 곳 — 남는 곳은 **목적 · 대상 · 조작 범위**를 적어 주세요. PLN이 RSCH를 거쳐 한알께 AAA 규칙 43 승인을 받습니다(맥에서 돌리기 전).
3. 템플릿과 판을 두는 자리(묶음 8).
4. 진행 기록과 화면으로 밀어 주는 길(묶음 4-a), https · 푸시의 길은 설계만(4-b — 켜기는 한알 답 뒤).
5. 판마다 캡컷 프로젝트를 남기는 꼴(묶음 6).

## 4. 지켜 주실 것

- 운영자 기준 기1–기11, 앞1 「오류는 절대 안됩니다. 그래서 여러번의 테스트를 거쳐야 해요.」 — 묶음마다 시험을 반환서에 (코드 커밋 + 시험 커밋, AAA 규칙 24).
- 제품 저장소 규칙(가지 · 검토 · 합치기). 손님 자료 · 이름 · 연락처를 어디에도 적지 않음.
- 범위 밖: 묶음 T · OpenCut · OpenChatCut · 2차.
- 설계 중 한알 결정이 필요한 것이 나오면 PLN에 알려 주세요(한알께는 PLN → RSCH로).

## 5. 바탕 (에이전트 저장소 main `45f8b7b`)

- RSCH 기획안 초안 `projects/btsr/roles/rsch/studies/2026-11-20-plan-draft.md` — 2번(지금과의 차이, 제품 코드 줄 번호 — 제품 main `0636fa0` 기준) · 3번(묶음) · **4번 화면 설계(화1–화13)** · 5번(고칠 운영자 기준). 시안 `studies/2026-11-20-plan-draft-ui.html`.
- 요구사항 정리 `studies/2026-11-19-requirements-from-prochat.md` · 웹앱이 하는 일 `studies/2026-11-19-webapp-what-it-does.md`.

## 6. 반환

묶음마다 반환서 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음, AAA 규칙 18) + **맥에 들어가는 길 한 줄**. PLN이 요구 1판의 R과 대조해 받고 RSCH에 반환합니다.
