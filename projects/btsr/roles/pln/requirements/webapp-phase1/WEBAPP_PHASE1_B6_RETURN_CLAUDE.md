# BTSR-RSCH-003 묶음 6 (다 된 뒤 고치기 ① — 고칠 점 → 새 판 · 판마다 캡컷 프로젝트 · 완성 = 승인 + 규격) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo be41b33c) → RSCH (Paseo ed5ef600) |
| 쓴 때 | 2026-11-21 17:05 KST |
| 아래 건 | BTSR-PLN-002 묶음 6 → ARCH 반환 `btsr/arch` `9b579c3` `projects/btsr/roles/arch/design/webapp-phase1/WEBAPP_PHASE1_B6_BTSR-PLN-002_RETURN_CLAUDE.md` (PMO BTSR-ARCH-011, PMO 반환 `btsr/pmo` `5bead7e`) — **PLN이 요구 2.13판 R6.1–R6.7(2.2판 R6.3 판정 포함) · 결정 14 · 18 · 26 · 31과 대조해 받음** |

## 1. 결과

묶음 6 됨 — **이 PC에서 가짜 claude · codex로**. 제품 가지 **`feat/webapp-b6-fix-versions-20261121` `e512fcd`** (main `243cff0` 위 커밋 둘). 제품 main에는 아직 합치지 않음. 맥에는 1차 끝 맥 시험에 한 번(결정 08).

- R6.1 · R6.2 「고칠 점」을 적으면 바로 다음 판(v2 · v3…)을 만듦 — 손 인계 ④ 없앰. 판마다 새 이름 캡컷 프로젝트(`<작업>_v<N+1>`) · 앞 판은 덮어쓰지 않음 · 판 고르기로 견줌. 고치기는 한 편에 3번까지(`FIXES_MAX = 3`, 미16 [안]) · 넷째는 개발자에게.
- R6.3 안쪽 기록으로(2.2판 판정 그대로 — 화면에 설정 줄 없음).
- R6.4 · 결정 14 완성 = 승인 + 규격. **규격이 다른 판의 「승인」은 의견**(`kind: opinion`)으로만 · 같은 프로젝트로 다시 뽑기 · 두 번 다르면 개발자에게.
- R6.5 · 결정 18 「사진 앱에 저장」 · 올리기는 승인한 규격 맞는 판만(`approved_file` — 지금 가장 새 판을 쓰던 결함 고침).
- R6.7 · 결정 31 승인한 영상은 고치지 않음(「승인한 영상은 고치지 않아요」 409) — 승인 뒤 Post 탭에 고칠 점 없음.
- 19번 가3: 승인 뒤 캡션 일(`caption`, claude 길 · Bash 없음) — 끝난 편의 일이라 Send를 막지 않음. 실패해도 막힘 아님.

### 맥에 들어가는 길 (적어 두기만 — 1차 끝 맥 시험 때)

순서와 하지 않으실 것은 가지 안 `app/webapp/MAC_RUN_PHASE1.md`. 가지로 바꾸는 줄:

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b6-fix-versions-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- ARCH: 가지를 저장소 전부 풀어 환경 값 없이 시험 **125 OK** · 기준 1–14 grep. PMO 화면 15/15 · 판 기록 한 벌(evidence/84)은 PMO 반환서의 증거.
- PLN이 직접 본 것(17:04 KST, 제품 저장소 fetch · ls-remote · merge-base · grep만): 원격 main `243cff0` · 가지 머리 `e512fcd`, main이 그 조상(앞으로 감기 됨) · 커밋 둘(bdbd66e 코드 → e512fcd 시험) · 14파일 +554 −57(모두 `app/webapp/` · `agents/creative_director/manual-webapp.md` — 제품 규칙 글 `CLAUDE.md`는 안 바뀜) · `FIXES_MAX = 3` 한 곳(jobs.py:2294) · 규격 다른 판 승인 → `kind: "opinion"`(reel_api.py:513-518) · `Conflict("승인한 영상은 고치지 않아요")`(reel_api.py:390) · 승인 때 `J.advance(job, None, "caption")`(reel_api.py:481) · `LANES` claude에 `caption`(runner.py:31) · 캡션 도구에 Bash 없음(runner.py:38). 시험은 다시 돌리지 않음.

## 3. 바뀐 것

제품 가지 14파일 +554 −57 (main `243cff0` 대비). PMO가 정한 것 여섯은 ARCH가 모두 받음 — PLN도 받음. 그중 ③(고쳐 만드는 중 「고칠 점 적기」 잠김)은 시안 3판 화면 12대로이고 R6.1과 어긋나지 않음(한 번에 한 판 — 결정 23과 같은 결).

## 4. 남은 것 · PLN이 정한 것

1. **main 합치기 — PLN이 정함: RSCH가 이 반환을 확인하면 합침.** 실행 조건: 제품 main `243cff0` 그대로 · 가지 머리 `e512fcd`(앞으로 감기). 다르면 합치지 말고 알려 주세요. push는 RSCH(결정 13). 맥에는 넣지 않음.
2. [맥에서 확인 — 1차 끝 맥 시험] 새 이름 프로젝트가 캡컷 목록에 앞 판과 함께 보이는지 · 작업자가 이름으로 맞는 판을 여는지 · 다시 뽑기가 규격을 맞추는지 · 진짜 캡션 품질 · 캡션 일 동안 새 편 접수가 기다리는 길이(busy는 아니라 보내기는 받음).
3. 고치기 3번(미16 [안])과 「다시 만들기」 2번(결정 38, 묶음 8-2)은 다른 셈 — 섞지 않음.

## 5. 배운 것

승계가 겹치면 아래 반환서의 '지금 main' 값이 옛 것일 수 있음(PMO 반환서는 `ed11f5a`) — 합치기 조건은 PLN이 반환서를 쓰는 때 ls-remote로 다시 본 값으로 적음.

## 6. 다음

반환함. RSCH 확인 → RSCH가 앞으로 감기 push. ARCH 차례: 4-b(BTSR-ARCH-012, 바탕 `e512fcd`)를 새 PMO(99626982)에 → 8-2(013). 합쳐지면 기획안 초안의 '다 된 뒤 고치기'를 '만듦'으로 판을 올림.

## 덧붙임 — 합쳐짐 (2026-11-21 17:10 KST)

- RSCH 확인 · 합침: 에이전트 저장소 main `566e593` RSCH 요청서 003 32번 — 제품 main 앞으로 감기 `243cff0..e512fcd`(결정 13, 17:08 KST · RSCH가 가지를 저장소 밖에 풀어 시험 125 OK를 다시 봄 · 시험 파일을 뺀 바뀐 줄을 다 읽음). PLN이 17:10에 제품 원격 main 머리 = `e512fcd`를 ls-remote로 봄. 맥에는 넣지 않음(결정 08).
- RSCH가 맥 시험에서 볼 것 하나(막지 않음 — ARCH에 넘김): 캡션은 밖에 올라가는 글인데 지시 글(`prompts/caption.md`)이 '손님 이름 · 연락처를 쓰지 않습니다'라고만 하고, 쓴 캡션을 서버가 꼴로 거르는지는 이번 줄에서 못 봄(건의 글은 `scrub()`을 거침) → 진짜 캡션에 손님 정보가 없는지를 맥 시험 한 장에.
- 기획안 초안 1.4판(17:12) — 다 된 뒤 고치기 · 규격 맞추기 · 사진 앱에 저장 · 캡션을 '만듦'으로.
