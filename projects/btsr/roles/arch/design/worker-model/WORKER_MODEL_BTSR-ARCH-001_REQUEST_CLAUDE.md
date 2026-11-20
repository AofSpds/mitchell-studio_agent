# BTSR-ARCH-001_worker-model-sol — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54, 가지 `btsr/arch`) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo f3cf6938, 작업 폴더 `worktrees/btsr-pmo`) |
| 쓴 때 | 2026-11-21 03:31 KST |
| 위 요청 | BTSR-PLN-001_worker-model-sol (PLN → ARCH, 가지 `btsr/pln` `48967ee` `projects/btsr/roles/pln/requirements/worker-model/WORKER_MODEL_BTSR-PLN-001_REQUEST_CLAUDE.md`) — 근거 한알 결정 01–04는 같은 폴더 |
| 설계 | [WORKER_MODEL_DESIGN_CLAUDE.md](WORKER_MODEL_DESIGN_CLAUDE.md) 1판 (이 요청서와 같은 커밋) |
| 규칙과 다른 곳(숨기지 않음) | 게시판(`board/`)이 아직 없어 이 요청서를 ARCH 작업 칸에 둠. 받음 · 반환은 PMO 칸에 쓰고 경로만 알려 주세요 |
| 급함 | 한알의 맥 웹앱 시험이 이것을 기다림 |

## 1. 한 줄

제품 저장소에서 작업자 모델을 `GPT-6.1 Terra` 고정 → **`GPT-6.2 Sol` · 생각 `High`**, 설정 한 곳 `app/webapp/worker_model.py`(enum + 지금 값)로 — 설계 2–7번대로 구현해 주세요.

## 2. 받아들임 기준 (ARCH가 대조함)

1. 설계 2번의 `worker_model.py`가 있고, 모델 이름 글자는 그 파일에만 있음 — 설계 4번 R03 검색 결과를 증거로 (R01·R03)
2. 이름 검사 두 곳이 `worker_model.matches()`를 씀, 설계 6번 시험 1·2 통과 (R02)
3. 모음 카드 · 연습 카드 · 점검 C3 · 화면이 `GPT-6.2 Sol · 생각 High`를 보임, 설계 6번 시험 3 통과 (R01·R03)
4. terra 이름 동작 자리는 설계 4번 표대로 둠 — 다르게 했으면 자리마다 까닭 (R04)
5. 글은 설계 5번대로 — 바꾼 파일 목록 (R05)
6. 기존 방식 시험 + 새 시험 결과, 코드 커밋 · 시험 커밋 함께 (R06)
7. **맥에 들어가는 길 한 줄** (R07)

## 3. 범위 밖

Claude 단계의 모델 · 웹앱의 다른 고침 · 제품 main 합치기 결정(ARCH가 정하지 않음 — 가지까지 올리고 반환서에 상태를 적어 주세요).

## 4. 반환

반환서 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음, AAA 규칙 18) + R07 맥 길 한 줄. ARCH가 받아 PLN에 반환합니다.
