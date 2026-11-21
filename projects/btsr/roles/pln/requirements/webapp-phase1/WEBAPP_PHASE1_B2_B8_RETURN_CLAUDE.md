# BTSR-RSCH-003 묶음 2 + 8 (올리면 바로 시작 · 템플릿 자리) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) → RSCH (Paseo 14d04ad1) |
| 쓴 때 | 2026-11-21 13:24 KST |
| 아래 건 | BTSR-PLN-002 묶음 2 + 8 → ARCH 반환 `btsr/arch` `e198ffc` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_B2_B8_BTSR-PLN-002_RETURN_CLAUDE.md` (PMO BTSR-ARCH-004) — **PLN이 요구 1.7판 R2.1–R2.5 · R8.1–R8.3과 대조해 받음** |

## 1. 결과

R2.1–R2.5 · R8.1–R8.3 됨 — **이 PC에서 가짜 `claude`로**. 제품 가지 **`feat/webapp-b2-b8-runner-20261121` `658ec1d`** (main `6cfbc5f`을 품음). 제품 main에는 아직 합치지 않음.

- R2.1 보내기 끝 → 서버가 작업을 만들고 화면이 그 작업으로. '업로드 확인' 인계 없앰.
- R2.2 부를 때마다 기록 · 로그, 실패마다 쉬운 말 이유.
- R2.3 차례표 + 길마다 일꾼 하나, 실패한 일만 멈춤.
- R2.4 남는 손 인계: ⑥ 시작(묶음 5) · 「고칠 점」 뒤(묶음 6).
- R2.5 「좋아요」 → ④ 편집, 캡컷이 켜져 있으면 기다림을 화면에.
- R8.1–R8.3 템플릿 `templates/reel-main/r1.md` + 판 규칙 · 작업마다 템플릿 판 기록 · 규격 판정과 승인을 따로.
- 남은 말 24 → 21줄.

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b2-b8-runner-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- PMO · ARCH: 시험 38 OK(ARCH가 따로 다시 돌림). 윈도에서는 `PYTHONUTF8=1`이 듦 — ARCH-006에서 고침.
- PLN이 직접 본 것: 제품 원격 가지 머리 `658ec1d`, main `6cfbc5f`이 그 조상 — 13:23 KST, fetch로 읽기만. **시험은 다시 돌리지 않고 코드도 읽지 않음.**

## 3. 바뀐 것

제품 가지 19파일 +1230 −33.

## 4. 남은 것 · PLN이 정한 것

1. **맥에서 진짜 `claude` 한 번은 1차 끝 맥 시험에 넣음 — PLN이 정함.** 까닭: 한알 13:02:58 「일단 이쪽 웹앱 1차를 완성하는게 어떨까요」(결정 08)로 이미 정해진 일이라 다시 여쭙지 않음(AAA 규칙 39). PMO의 한 장 `app/webapp/MAC_RUN_B2.md`(맨 위 '하지 않으실 것' · 한알께 물음 1 '④ 편집까지 진짜로?')는 그때 씀.
2. **main 합치기 — PLN이 정함: RSCH가 이 반환을 확인하면 합침.** 실행 조건: 제품 main이 `6cfbc5f` 그대로이고 가지 머리가 `658ec1d`일 것(앞으로 감기). 다르면 합치지 말고 알려 주세요. push는 RSCH(결정 13).
   - 알고 정한 것: 진짜 `claude`는 아직 한 번도 부르지 않았음(가짜로만 봄). 맥에는 1차 끝까지 넣지 않으므로 main에 들어가도 운영자 웹앱은 바뀌지 않음 — 진짜 길은 맥 시험이 판정함.
3. 맥 Claude Code 판의 플래그(`--max-turns` 등)도 맥 시험에서.

## 5. 배운 것

이미 정해 주신 결정(맥 시험은 1차 끝)이 덮는 물음은 PLN이 그 결정을 가리켜 닫는다 — 한알께 다시 묻지 않는다.

## 6. 다음

반환함. RSCH 확인 → RSCH가 앞으로 감기 push(위 조건). 그 밖은 스스로 시작하지 않음(AAA 규칙 18). ARCH는 ARCH-006(R1.4 · R1.5, 바탕 `658ec1d`) · 묶음 3 설계로 이어 감.
