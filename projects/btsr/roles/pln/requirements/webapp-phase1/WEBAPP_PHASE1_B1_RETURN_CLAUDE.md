# BTSR-RSCH-003 묶음 1 (건의함 + 쉬운 말) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) → RSCH (Paseo 14d04ad1) |
| 쓴 때 | 2026-11-21 13:03 KST |
| 아래 건 | BTSR-PLN-002 묶음 1 → ARCH 반환 `btsr/arch` `96d66a1` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_B1_BTSR-PLN-002_RETURN_CLAUDE.md` (PMO 반환 `btsr/pmo` `ffdae27`) — **PLN이 요구 1.3판 R1.1–R1.3과 대조해 받음** |

## 1. 결과

R1.1 · R1.2 됨, R1.3은 1.1판 판정 꼴대로 됨. 제품 가지 **`feat/webapp-b1-suggest-20261121` `6cfbc5f`** (main `e5785b3`을 품음). **제품 main에는 아직 합치지 않음.**

- R1.1 어느 화면에서나 건의 단추 → 맥 `data/suggestions/inbox/`(git 밖)에 쌓임. 「고칠 점」과 자리 · 주소 · 화면이 따로(시험으로 봄).
- R1.2 손님 정보 거르기: 전화 · 메일 · 긴 숫자 · '○○ 님/고객/손님'이 걸리면 사람이 확인하기 전에는 깃헙(`suggestions/<YYYY-MM>/`)에 올리지 않음. 물음 6의 권고 1 꼴(맥에 쌓고 개발자가 보고 올림) — 답이 2면 작은 고침.
- R1.3 손 인계 밖 개발 말 0. 남은 말 24줄은 목록에 묶음별로(2 · 3줄, 3-2 · 1줄, 5 · 12줄, 6 · 1줄, 개발자용 3줄, 남김 4줄). 시험이 목록 밖 0을 셈 — 묶음마다 줄어드는 수로 봄. 전체는 묶음 6 때.

### 맥에 들어가는 길 (가지로 — 합치기 전)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b1-suggest-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- PMO: 시험 19/19 · 휴대폰 폭 화면 17/17(화면 없는 Chrome). ARCH: 따로 풀어 19 OK, 남은 말 '개발자용 · 남김' 7줄을 읽음.
- PLN이 직접 본 것: 제품 원격 가지 머리 `6cfbc5f`, main `e5785b3`이 그 조상(`merge-base --is-ancestor`) — 13:02 KST, fetch로 읽기만. **시험은 다시 돌리지 않고 코드도 읽지 않음** — 판정은 ARCH 반환과의 문서 대조.

## 3. 바뀐 것

제품 가지 1커밋(새 파일 7 · 고침 6). 옵션 기본값 글 "ChatGPT가 알맞게 고름" → "알아서 골라요"(옛 작업에 저장된 옛 값도 읽힘).

## 4. 남은 것

1. **제품 main 합치기** — 결정 05대로 **RSCH 확인을 받으면 PLN이 정해** ARCH에 요청함. 확인해 주세요.
2. 맥에서 눈으로: 아이폰 사파리에서 머리의 건의 단추 · 시트 · 🎤 입력.
3. 단추 글이 「Feedback 건의하기」 — 영어 'Feedback'이 운영자에게 쉬운 말인지(요25) PLN은 판정하지 않았음. 맥 시험에서 운영자가 어려워하면 다음 묶음에서 고침.
4. 물음 6(건의의 손님 정보)은 아직 여쭙지 않음.

## 5. 배운 것

화면 글이 저장되는 값이기도 한지 먼저 볼 것(ARCH 배운 것) — 다음 묶음(쉬운 말을 바꾸는 곳)에 같이 적힘.

## 6. 다음

반환함. RSCH 확인을 기다림 — 받으면 PLN이 합치기를 정해 ARCH에 요청. 그 밖은 스스로 시작하지 않음(AAA 규칙 18). ARCH는 묶음 2 + 8을 PMO에 BTSR-ARCH-004로 맡김.

## 덧붙임 — 합치기 멈춤 (2026-11-21 13:10 KST, BTSR-PLN-004)

- **무엇:** PLN이 정한 묶음 1 합치기(요청 [BTSR-PLN-004](WEBAPP_PHASE1_BTSR-PLN-004_MERGE_REQUEST_CLAUDE.md))가 멈춤. PMO가 제품 main에 push하려다 **Claude Code 도구 자동 심사에 막힘** — 한알 승인이 모자란 것이 아님. 우회하지 않음(AAA 규칙 39).
- **막힌 효과:** 제품 원격 main은 `e5785b3` 그대로(PLN이 13:10에 fetch로 봄). PMO 사본에서는 앞으로 감기 + 시험 19/19까지 됨(`btsr/pmo` `613b4a3`). 묶음 2 + 8(BTSR-ARCH-004)은 묶음 1 가지 위에서 이어 가므로 멈추지 않음. ARCH 기록 `btsr/arch` `95737a5` CURRENT.
- **같은 길이 앞서는 됨:** 작업자 모델 합치기(BTSR-PLN-003 → main `e5785b3`)는 같은 PMO가 push했음 — 자동 심사가 이번에만 막은 까닭은 PLN이 확인하지 못함.

### 한알께 여쭐 것 (하나) — 풀리는 조건

제품 main에 합치는 push를 어떻게 할까요?

1. **(권고 — ARCH 안)** PMO 세션이 제품 main에 push하는 것을 허락해 주심(Claude Code 권한 설정 — 한알께서 직접). 앞으로의 합치기도 같은 길.
2. 다른 길 — 예: PMO가 GitHub에 PR을 올리고 한알께서 GitHub 화면에서 합치기를 누르심.

## 덧붙임 — 합쳐짐 (2026-11-21 13:14 KST)

- 한알 13:13:30 「직접 하세요.」([결정 09](WEBAPP_PHASE1_DECISIONS_CLAUDE.md)) → RSCH가 제품 main을 앞으로 감기로 push: **main = `6cfbc5f`** (`e5785b3..6cfbc5f`, 강제 아님 — RSCH 요청서 8번, main `05b0689`). PLN이 13:14에 제품 원격 main 머리 `6cfbc5f`를 fetch로 봄.
- 위 '여쭐 것 하나'는 이 답으로 닫힘. BTSR-PLN-004는 PMO가 push하지 않아도 됨(같은 커밋).
- 맥에는 넣지 않음(결정 08). 맥 길(1차 끝에 한 번): `cd ~/mitchell_studio && git fetch origin && git checkout main && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload`
