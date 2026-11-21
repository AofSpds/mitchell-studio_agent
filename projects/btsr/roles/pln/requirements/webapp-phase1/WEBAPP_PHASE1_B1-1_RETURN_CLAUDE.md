# BTSR-RSCH-003 묶음 1-1 (건의 별명 · 「건의하기」) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) → RSCH (Paseo 14d04ad1) |
| 쓴 때 | 2026-11-21 13:35 KST |
| 아래 건 | BTSR-PLN-002 묶음 1-1 → ARCH 반환 `btsr/arch` `2eafcf7` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_B1-1_BTSR-PLN-002_RETURN_CLAUDE.md` (PMO BTSR-ARCH-006) — **PLN이 요구 1.7판 R1.4 · R1.5와 대조해 받음** |

## 1. 결과

R1.4 · R1.5 됨. 제품 가지 **`feat/webapp-b1-1-anon-20261121` `100ffa5`** (main `658ec1d`을 품음). 제품 main에는 아직 합치지 않음.

- R1.4 깃헙 사본에서만 이름 → '손님 A · B …'(같은 이름 = 같은 별명), 전화 · 메일 · 긴 숫자 → `(… 지움)`. 바꾼 뒤 다시 검사해 남으면 올리지 않음. 별명 짝은 저장하지 않고, 원문은 맥에만(결정 10).
- R1.5 단추 · 시트 제목 「건의하기」만 — 화면에 'Feedback' 없음(결정 12).
- 더 고친 것: 윈도에서도 시험이 돎(`PYTHONUTF8` 없이) · 건의 id 겹침 · 날짜 · 시각이 '긴 숫자'로 지워지던 것.

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b1-1-anon-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- ARCH: 따로 풀어 시험 41 OK(`PYTHONUTF8` 없이).
- PLN이 직접 본 것: 제품 원격 가지 머리 `100ffa5`, main `658ec1d`이 그 조상 — 13:34 KST, fetch로 읽기만. 시험 · 코드는 보지 않음.

## 3. 바뀐 것

제품 가지 8파일 +143 −31.

## 4. 남은 것 · PLN이 정한 것

1. **'님 · 손님'이 붙지 않은 이름은 저절로 걸러지지 않음** — 사람이 보고 확인(`--reviewed`)한 뒤에만 올라감(R1.2). 원문은 맥에만 있으므로 결정 10(「필터링하거나 … 맥 로컬에만 … 별명」)을 지킴. 사람이 놓치면 그 이름이 깃헙에 갈 수 있다는 것은 남는 위험 — 맥 시험 때 건의 몇 개로 봄.
2. **main 합치기 — PLN이 정함: RSCH가 이 반환을 확인하면 합침.** 실행 조건: 제품 main `658ec1d` 그대로 · 가지 머리 `100ffa5`(앞으로 감기). 다르면 합치지 말고 알려 주세요. push는 RSCH(결정 13).

## 5. 배운 것

없음(앞 묶음과 같은 길).

## 6. 다음

반환함. RSCH 확인 → RSCH가 앞으로 감기 push. ARCH는 묶음 3을 PMO에 BTSR-ARCH-007로(바탕 `100ffa5`).

## 덧붙임 — 합쳐짐 (2026-11-21 13:36 KST)

- RSCH 확인 · 합침: 에이전트 저장소 main `bb1198a` RSCH 요청서 003 10번 — 제품 main 앞으로 감기 `658ec1d..100ffa5`(결정 13). PLN이 13:36에 제품 원격 main 머리 = `100ffa5`를 fetch로 봄. 맥에는 넣지 않음(결정 08).
