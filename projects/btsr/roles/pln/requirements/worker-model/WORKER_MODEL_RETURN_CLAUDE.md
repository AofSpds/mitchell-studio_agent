# BTSR-RSCH-002_worker-model-sol — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/RSCH` (PRIMARY — Paseo 14d04ad1) |
| 쓴 때 | 2026-11-21 03:43 KST |
| 아래 건 | PLN → ARCH BTSR-PLN-001 → ARCH → PMO BTSR-ARCH-001. ARCH 반환 원본: 가지 `btsr/arch` `6cf028a` `projects/btsr/roles/arch/design/worker-model/WORKER_MODEL_BTSR-PLN-001_RETURN_CLAUDE.md` — **PLN이 요구 1판 R01–R07과 대조해 받음** |

## 1. 결과

R01–R07 됨 — 제품 저장소 가지 **`fix/worker-model-sol-20261121` `3495f7e`** (제품 main `9e7eb0e` 위 1커밋). **제품 main에는 아직 합치지 않음.**

- R01 설정 한 곳 `app/webapp/worker_model.py` — 지금 값 `GPT-6.2 Sol` · 생각 `High`. 바꿀 때는 그 파일 두 줄.
- R02 이름 검사 = 설정값과 같은지(대소문자 · 띄어쓰기 무시). Sol 통과, Terra 불통과.
- R03 화면 · 점검 C3 · 카드 글이 설정에서 읽음.
- R04 terra 이름 동작 자리는 모두 둠(맥 CapCut 연습 프로젝트 등을 다시 뜨지 않게).
- R05 지침 · 안내서 · 기획서를 고침. 옛 기록은 고치지 않음.
- R06 새 시험 6/6. **제품 저장소에는 그 전부터 있던 자동 시험이 없었음** — '기존 시험 통과'는 해당 없음.

### 맥에 들어가는 길 (한 줄 — 가지로)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout fix/worker-model-sol-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

맥 작업 사본 자리 `~/mitchell_studio`는 PMO가 제품 `CLAUDE.md`에서 읽은 것 — 다르면 그 자리로.

## 2. 증거

- ARCH: 같은 커밋을 따로 풀어 시험 6/6 다시 돌림 · `git grep`으로 모델 이름 글자가 설정 밖에 없음을 다시 봄. PMO 증거는 가지 `btsr/pmo` `e13f82f` `records/worker-model/evidence/`.
- PLN이 직접 본 것: 제품 원격에서 가지 머리 = `3495f7e`, main = `9e7eb0e`(합치지 않음) — `git ls-remote`, 03:43 KST. **PLN은 시험을 다시 돌리지 않았고 코드도 읽지 않음** — 판정은 ARCH 반환과의 문서 대조.

## 3. 바뀐 것

- 제품 저장소: 위 가지 1커밋(코드 9 · 글 17 파일).
- 에이전트 저장소: PLN `requirements/worker-model/`(요구 · 결정 · 요청 · 이 반환), ARCH `design/worker-model/`, PMO `records/worker-model/`.

## 4. 남은 것

1. **맥에서 볼 것(웹앱 시험에 넣어 주세요):** 화면에 "GPT-6.2 Sol · 생각 High"와 점검 C3 글이 보이는지 · 맥 python 3.9.6에서 웹앱이 뜨는지(3.9로는 아무도 돌려 보지 않음).
2. **결과 줄을 `GPT-6.2 Sol High`처럼 생각 세기를 붙여 쓰면 ⚠(일은 멈추지 않음).** 맥 시험에서 작업자가 어떻게 쓰는지 보고 PLN이 받아 줄지 정함.
3. **제품 main 합치기를 누가 정하는지 — 한알께 여쭐 것(아래).** 그 전까지 맥은 가지 길로.

### 한알께 여쭐 것 (하나)

제품 저장소 main에 합치는 것을 누가 정할까요? (작업자 모델 가지가 첫 건)

1. **(권고)** 한알께서 건마다 정하심 — 맥 웹앱 시험에서 문제가 없으면 "합치세요" 한마디로, PMO가 합침. 도메인에 DPM이 아직 없어 AAA 규칙 6의 자리가 비어 있음.
2. PLN이 대조해 받은 건은 PLN이 정해 PMO가 합침 — 한알께는 알림만.

## 5. 배운 것

- 요구에 '기존 시험 통과'를 쓰기 전에 있는 시험부터 확인할 것(ARCH 배운 것과 같음) — webapp-phase1 요구도 묶음마다 '새 시험'으로 적음.

## 6. 다음

반환함. PLN은 다음 일을 스스로 시작하지 않음(AAA 규칙 18). 웹앱 1차(BTSR-PLN-002)는 ARCH가 묶음 1부터 이어 감 — PMO에 BTSR-ARCH-002로 맡겨짐.

## 덧붙임 — 제품 main 합침 (2026-11-21 12:56 KST, BTSR-PLN-003)

- **결과:** 제품 main = **`e5785b3`** (첫 부모 `3bd6cdd` · 둘째 `3495f7e`) — 「합침: 작업자 모델을 설정 한 곳으로 (GPT-6.2 Sol · 생각 High)」. PMO가 합침(BTSR-ARCH-003), ARCH 반환 `btsr/arch` `ceffefa`(부모 · 나무 · 시험 6/6 다시 봄).
- **PLN이 직접 본 것:** 제품 원격 main 머리 `e5785b3` · 두 부모 · `app/webapp/worker_model.py` blob이 가지 `3495f7e`와 같음(`8b3fb6e`) — fetch로 읽기만. 시험은 다시 돌리지 않음.
- 근거: 한알 03:47:04 「rsch가 확인하고 pln이 일단 합니다.」 → RSCH 확인(main `3c3708e`) → PLN이 정함(요청 [BTSR-PLN-003](WORKER_MODEL_BTSR-PLN-003_MERGE_REQUEST_CLAUDE.md)).

### 맥에 들어가는 길 (합친 뒤 — main으로)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout main && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

- 남은 것: 맥에서 볼 것 둘(화면 "GPT-6.2 Sol · 생각 High" · 점검 C3 글, python 3.9.6에서 뜨는지)은 그대로 — RSCH 웹앱 테스트 지시문에.
