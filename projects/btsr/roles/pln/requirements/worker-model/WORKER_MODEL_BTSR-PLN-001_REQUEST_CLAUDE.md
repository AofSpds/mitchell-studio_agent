# BTSR-PLN-001_worker-model-sol — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (PRIMARY — Paseo 071c15f3, 가지 `btsr/pln`) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54, 작업 폴더 `worktrees/btsr-arch`, 가지 `btsr/arch`) → ARCH가 PMO로 (AAA 규칙 15) |
| 쓴 때 | 2026-11-21 03:27 KST |
| 근거 | 한알 결정 [01–04](WORKER_MODEL_DECISIONS_CLAUDE.md) — 04: 11-21 03:23:56 uuid 6a376d3a 「1,1 2,1 / 진행하시구요.」(Terra 건을 PLN → ARCH → PMO로 = 네) |
| 위 요청 | BTSR-RSCH-002_worker-model-sol (RSCH → PLN, 에이전트 저장소 main `7894480` `projects/btsr/roles/rsch/requests/BTSR-RSCH-002_worker-model-sol/요청.md`) — 제품 코드에서 박힌 자리 표(2번)는 그 요청서에 있음 |
| 규칙과 다른 곳(숨기지 않음) | 게시판(`board/`)이 아직 없어 이 요청서를 PLN 작업 칸에 둠. 받음은 ARCH 칸에 쓰고 경로만 알려 주세요. 반환도 ARCH 칸에 두고 알려 주세요 |

## 1. 한 줄

웹앱의 **작업자 모델**(⑥ 캡컷 컴퓨터 유즈를 하는 맥 ChatGPT/Codex)을 `GPT-6.1 Terra` 고정에서 **`GPT-6.2 Sol` · 생각 `High`**로 바꾸고, **한 곳의 설정(변수 + enum 같은 목록)**에서 바꿀 수 있게 설계해 PMO에 맡겨 주세요. 오늘 한알의 맥 웹앱 시험이 이것을 기다립니다 — **급함**.

## 2. 받아들임 기준

요구 정본: [WORKER_MODEL_REQUIREMENTS_CLAUDE.md](WORKER_MODEL_REQUIREMENTS_CLAUDE.md) 1판 R01–R07. 줄이면:

1. R01 설정 한 곳(모델 목록 + 지금 값 `GPT-6.2 Sol` · `High`).
2. R02 이름 검사 = 지금 설정값과 같은지(대소문자·띄어쓰기 무시). Sol 통과, Terra 불통과.
3. R03 화면·점검·카드의 모델 글이 설정에서 나옴.
4. R04 terra 이름의 동작 자리는 옛 자료와 끊기지 않게 — ARCH가 정하고 반환서에 적음.
5. R05 지침·안내서·기획서의 모델 글을 맞춤(운영 전 — 그냥 고침).
6. R06 기존 시험 통과 + R02 시험. 제품 저장소 규칙(가지·검토·합치기)대로.
7. R07 반환서에 맥에 들어가는 길 한 줄.

## 3. 범위 밖

- Claude가 맡은 단계(접수·원고·편집)의 모델 — 한알 답 없음.
- 웹앱의 다른 고침 — 웹앱 시험 뒤 따로.

## 4. 알아 둘 것

- PMO 작업 사본에 RSCH가 바로 보냈다 거둔 일의 빈 로컬 가지 `fix/worker-model-sol-20261121`이 있음(제품 저장소 변경 0 — PMO 기록 `140ed71` · `c014ff5`). 쓸지 새로 낼지는 ARCH·PMO가 정함.
- PLN은 제품 저장소를 읽지 않았음. 박힌 자리는 RSCH가 제품 main `9e7eb0e`에서 본 것.

## 5. 반환

반환서 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음, AAA 규칙 18)에 R07의 맥 길 한 줄을 더해 PLN에 알려 주세요. PLN이 R01–R07과 대조해 받은 뒤 RSCH에 반환합니다.
