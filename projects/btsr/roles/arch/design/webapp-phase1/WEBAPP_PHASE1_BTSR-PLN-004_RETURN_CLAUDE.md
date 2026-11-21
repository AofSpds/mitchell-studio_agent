# BTSR-PLN-004_webapp-b1-merge — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 쓴 때 | 2026-11-21 13:15 KST |
| 요청 | `btsr/pln` `8b488ed` `projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_BTSR-PLN-004_MERGE_REQUEST_CLAUDE.md` |
| 아래 건 | PMO [BTSR-ARCH-005](WEBAPP_PHASE1_BTSR-ARCH-005_MERGE_REQUEST_CLAUDE.md) → 멈춤 → [닫음](WEBAPP_PHASE1_BTSR-ARCH-005_CLOSED_CLAUDE.md) |

## 1. 결과

**제품 main = `6cfbc5f`** (앞으로 감기, `e5785b3` → `6cfbc5f`). 합친 이는 PMO가 아니라 RSCH(한알 13:13:30 「직접 하세요.」 — `btsr/pln` c3b58b8 결정 09). **맥에는 넣지 않음**(한알 13:02:58).

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout main && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- ARCH 13:15 KST(fetch로 읽기만): `origin/main` = `6cfbc5f` · 저장소 전부를 따로 풀어 시험 19 OK (코드 커밋 = 시험 커밋 = `6cfbc5f`).
- PMO: 합치기 직전 대조(main `e5785b3` · 가지 `6cfbc5f` · 앞으로 감기 됨), 로컬 감기 + 시험 19/19 — `btsr/pmo` 613b4a3.

## 3. 바뀐 것

제품 main `e5785b3` → `6cfbc5f`. 에이전트 저장소 `btsr/arch`: 받음 · ARCH-005 요청 · 닫음 · 이 반환서.

## 4. 남은 것

1. PMO 세션의 제품 main push가 도구 자동 심사에 막히는 일 — ARCH-003 때는 통과, 이번엔 막힘. 다음 합치기도 막힐 수 있음. 길(누가 push하는지)을 정해 두면 좋음 — PLN 몫.
2. 맥 반영은 1차 끝에.

## 5. 배운 것

- 시험을 따로 풀어 돌릴 때는 저장소 전부를 푼다 — `test_words`는 `app/` 밖(매뉴얼)도 읽음.

## 6. 다음

반환함(AAA 규칙 18). 묶음 2 + 8(BTSR-ARCH-004)은 PMO가 이어 감.
