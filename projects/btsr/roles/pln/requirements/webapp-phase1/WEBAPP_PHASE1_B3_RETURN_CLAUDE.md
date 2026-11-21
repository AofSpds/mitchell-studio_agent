# BTSR-RSCH-003 묶음 3 (접수에서 확인만) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) → RSCH (Paseo 14d04ad1) |
| 쓴 때 | 2026-11-21 13:45 KST |
| 아래 건 | BTSR-PLN-002 묶음 3 → ARCH 반환 `btsr/arch` `004d5cc` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_B3_BTSR-PLN-002_RETURN_CLAUDE.md` (PMO BTSR-ARCH-007) — **PLN이 요구 1.7판 R3.1–R3.6과 대조해 받음** |

## 1. 결과

R3.1–R3.6 됨 — **이 PC에서 가짜 `claude`로**. 제품 가지 **`feat/webapp-b3-intake-20261121` `32b55dc`** (main `100ffa5`을 품음). 제품 main에는 아직 합치지 않음.

- R3.1 헷갈리는 소재만 묻고, 답이 그 파일 분류에 그대로 들어감.
- R3.2 있는 사실은 묻지 않고, 모르면 비워 둠(지어내지 않음).
- R3.3 시술 전 소재가 없으면 「더 보내기」 / 「이대로 만들기」, 고르기 전에는 원고를 쓰지 않음.
- R3.4 원고는 늘 확인('원고 확인 끔' 옵션 없앰) · 편집 뒤 자막 = 승인 원고(다르면 편집 실패) · 원고 글이 바뀌면 다시 확인.
- R3.5 물음은 한 번에 하나("물음 1/3"), 고르는 답.
- R3.6 AI 얼굴 사진이 없으면 묻지 않음. **묶음 3-2 전까지는 AI 얼굴을 만들지 않고 결과 컷으로 편집**(합성 표시 없음 — 합성이 없으니 기1에 어긋나지 않음).
- 덤: **지금 제품 main에 숨은 결함** — 같은 분 안의 두 번째 묶음이 `/api/batch/done`에서 400. 고침이 이 가지에 있어 합치면 함께 들어감.

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b3-intake-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- ARCH: 따로 풀어 시험 52 OK.
- PLN이 직접 본 것: 제품 원격 main `100ffa5`(묶음 1-1까지 합쳐짐) · 가지 머리 `32b55dc`, main이 그 조상 — 13:44 KST, fetch로 읽기만. 시험 · 코드는 보지 않음.

## 3. 바뀐 것

제품 가지 13파일 +646 −120(main `658ec1d` 대비, ARCH 셈).

## 4. 남은 것 · PLN이 정한 것

1. **main 합치기 — PLN이 정함: RSCH가 이 반환을 확인하면 합침.** 실행 조건: 제품 main `100ffa5` 그대로 · 가지 머리 `32b55dc`(앞으로 감기). 다르면 합치지 말고 알려 주세요. push는 RSCH(결정 13). 합치면 위 결함 고침도 main에 들어감.
2. 물음 글의 조사 「을(를)」 — 다음 PMO 건(묶음 5 + 3-2)에서 받침을 보고 고름(쉬운 말, 요25).
3. 진짜 Claude가 접수 · 원고를 어떻게 채우는지는 1차 끝 맥 시험에서(결정 08).

## 5. 배운 것

ARCH가 반환에 적은 main 기준(`658ec1d`)이 그사이 움직였음(`100ffa5`) — 합치기 조건은 PLN이 받을 때 원격을 다시 보고 적는다.

## 6. 다음

반환함. RSCH 확인 → RSCH가 앞으로 감기 push. ARCH는 묶음 5 + 3-2 설계로 이어 감.
