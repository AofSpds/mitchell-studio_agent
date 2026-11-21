# BTSR-RSCH-003 묶음 4-a-2 (막힘 · 틈새 · 「처음부터 시작」 · 개발자에게 알리기) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo a6fd0155) → RSCH (Paseo a97bebab) |
| 쓴 때 | 2026-11-21 16:36 KST |
| 아래 건 | BTSR-PLN-002 묶음 4-a-2 → ARCH 반환 `btsr/arch` `d5f3369` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_B4A2_BTSR-PLN-002_RETURN_CLAUDE.md` (PMO BTSR-ARCH-010, PMO 반환 `btsr/pmo` `7d8376d`) — **PLN이 요구 2.12판 R2.3 · R2.7 · R3.5 · R5.5 · R5.6 · R5.7(2.9판 판정 포함) · R32.4(거둠)와 대조해 받음** |

## 1. 결과

묶음 4-a-2 됨 — **이 PC에서 가짜 claude · 작업자 · 가짜 원격 저장소로**. 제품 가지 **`feat/webapp-b4a2-stuck-restart-20261121` `243cff0`** (main `ed11f5a`를 품음). 제품 main에는 아직 합치지 않음. 맥에는 1차 끝 맥 시험에 한 번(결정 08).

- R5.6 · 결정 27 · 30 막힘이 한 길로 — 미첼에게 물음(화면 8) / 개발자에게(화면 9). 막힌 까닭을 덮어쓰지 않음 · Edit 실패도 화면 9로. 개발자 이어 만들기(`resume`) 걷음.
- 결정 29 「처음부터 시작」(화면 7 · 9) → 한 번 더 묻고 → Send 화면(화면 15)에 올린 사진 · 영상 · 요청 글 그대로 · ×로 빼고 +로 더함. 보내면 새 편(옛 편 파일은 지우지 않음).
- R5.7 · 결정 28 · 32 개발자에게 알리는 글은 **원격 main의 `suggestions/`에 그 글 하나만** — 맥 사본의 가지 · 머리와 상관없이 원격 main 위에 지음(PLN 2.9판 판정 그대로, 가짜 원격으로 시험함). 파일 이름은 작업 id(제목 없음) · 손님 이름은 거른 뒤 · 사진 · 영상 없음. 제품 규칙 글(제품 저장소 `CLAUDE.md` 폴더 칸 맨 위)에 예외 한 줄. 건의도 같은 길(거른 사본만). **push는 맥 시험 때 켬**(기본 꺼짐 — `WEBAPP_DEV_PUSH=1`, 켜는 줄은 `MAC_RUN_PHASE1.md`).
- R2.7 보내는 중 n / 전체 · 「그만 보내기」 · 끊기면 「다시 보내기」 · R3.5 접수는 빠진 · 흐린 소재만 묻고 없는 사실은 비움 · 흐린 사진 물음 · R32.4 「가진 사진 올리기」 걷음(다시 만들기를 다 쓰면 개발자에게) · 틈새(상태와 차례를 함께 · 켜질 때 맞춤 · Edit 확인이 ⑥ 예약보다 먼저 · Face 번호).

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

순서와 하지 않으실 것은 가지 안 `app/webapp/MAC_RUN_PHASE1.md`(맥 사본 쓰기 권한 · push 켜는 줄 포함). 가지로 바꾸는 줄:

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b4a2-stuck-restart-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- ARCH: 가지를 저장소 전부 풀어 환경 값 없이 시험 116 OK · 기준 1–10 · 3-1(가짜 원격 — 새 커밋 부모 = 원격 main · 바뀐 경로 = 글 하나 · 맥 사본 HEAD · 가지 · 작업 트리 그대로) grep · 시험. PMO 화면 시험 18/18(390px)은 PMO 반환서의 증거.
- PLN이 직접 본 것(16:35 KST, 제품 저장소 fetch · ls-remote · merge-base · grep만): 원격 main `ed11f5a` · 가지 머리 `243cff0`, main이 그 조상(앞으로 감기 됨) · 커밋 둘(6a7d3c6 코드 → 243cff0 시험) · 21파일 +1156 −447 · `def resume` 0 · `commit-tree`가 `devpush.py`에 · `WEBAPP_DEV_PUSH`가 `MAC_RUN_PHASE1.md`에 · 제품 `CLAUDE.md`에 `suggestions/` 한 줄 · 「가진 사진 올리기」는 runner.py 설명 글 한 곳에만. 시험은 다시 돌리지 않음.

## 3. 바뀐 것

제품 가지 21파일 +1156 −447 (main `ed11f5a` 대비). 제품 규칙 글 `CLAUDE.md`에 예외 한 줄이 듦 — 합치면 main의 규칙 글이 바뀜(결정 32).

## 4. 남은 것 · PLN이 정한 것

1. **main 합치기 — PLN이 정함: RSCH가 이 반환을 확인하면 합침.** 실행 조건: 제품 main `ed11f5a` 그대로 · 가지 머리 `243cff0`(앞으로 감기). 다르면 합치지 말고 알려 주세요. push는 RSCH(결정 13). 맥에는 넣지 않음.
2. 「다시 만들기」 3 → 2(결정 38)는 묶음 8-2.
3. 개발자 글 push 켜기 · 맥 사본 쓰기 권한 — 1차 끝 맥 시험.

## 5. 배운 것

'main에 글 하나만'은 맥 사본의 머리와 상관없이 원격 main 위에 커밋을 짓는 길(따로 둔 index)로 지켜짐 — 대조에서 짚은 것을 PMO가 가짜 원격으로 그대로 시험함.

## 6. 다음

반환함. RSCH 확인 → RSCH가 앞으로 감기 push. PMO 차례: 묶음 6(BTSR-ARCH-011, 바탕 `243cff0`) → 4-b(012) → 8-2(013). 합쳐지면 기획안 초안의 '막혔을 때'를 '만듦'으로 판을 올림.
