# BTSR-PLN-002 묶음 2 + 8 (서버가 일을 시작시킴 · 템플릿 판) — 반환

| 칸 | 내용 |
|---|---|
| 반환하는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 9d298a54) |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo 071c15f3) |
| 쓴 때 | 2026-11-21 13:22 KST |
| 요청 | BTSR-PLN-002 (요구 webapp-phase1 1.3판 이후, `btsr/pln` `48bff6b`) — 묶음 2 R2.1–R2.5 · 묶음 8 R8.1–R8.3 |
| 아래 건 | 설계 [1.1판](WEBAPP_PHASE1_B2_B8_DESIGN_CLAUDE.md) → PMO [BTSR-ARCH-004](WEBAPP_PHASE1_BTSR-ARCH-004_REQUEST_CLAUDE.md) · PMO 반환 원본 `btsr/pmo` `26adad6` `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_B2_B8_RETURN_CLAUDE.md` — ARCH가 기준 1–11과 대조해 받음(**10 맥에서 진짜 `claude`는 아직** — 아래 4-1) |

## 1. 결과

R2.1–R2.5 · R8.1–R8.3 이 PC에서 가짜 `claude`로 됨. 제품 가지 **`feat/webapp-b2-b8-runner-20261121` `658ec1d`** (바탕 main `6cfbc5f`, push됨, **main 합치기 안 함**). 19파일 +1230 −33.

| 요구 | 결과 |
|---|---|
| R2.1 | 보내기 끝(`POST /api/batch/done`) → 서버가 작업을 만들고 화면이 그 작업으로. 같은 batch 두 번이면 같은 작업. 화면의 '업로드 확인' 인계 글 없앰 |
| R2.2 | 부른 것마다 `runs` 기록 + `data/working/<작업>/runs/` 로그. 실패 종류마다 쉬운 말 이유(맥의 도우미 준비 안 됨 · 시간 초과 · 다 하지 못함 · 사용량) |
| R2.3 | 디스크 차례표 + 길(`claude` · `mac_gui`)마다 일꾼 하나. 실패한 일만 멈추고 다음 작업은 감 · 다시 켜지면 하던 일 한 번 다시 |
| R2.4 | 남는 손 인계: ⑥ 시작(③ — 묶음 5) · 「고칠 점」 뒤(④ — 묶음 6) |
| R2.5 | 원고 「좋아요」 → ④ 편집 일. CapCut이 켜져 있으면 기다림 글을 화면에, 다른 작업은 먼저 |
| R8.1 | `templates/reel-main/r1.md`(11-09 확정본) · `TEMPLATE.json` · `templates/README.md` 판 규칙 |
| R8.2 | 작업마다 `template: {id, rev, sha256}` — 템플릿이 새 판이 되어도 시작한 판 |
| R8.3 | `exports`(규격만의 판정) · `approvals`(승인한 판 + 그때 판정)를 따로 쌓음 — 덮어쓰지 않음 |
| 그 밖 | 접수에서 물을 것 → 화면 글 칸 → `/api/job/answer`로 이어 함 · status.json 프로세스 사이 잠금 · 남은 말 24 → 21줄(② 줄 지움, AI 얼굴 줄 꼬리표 3-2로) |

### 맥에 들어가는 길 (적어 두기만 — 맥 시험 때)

```zsh
cd ~/mitchell_studio && git fetch origin && git checkout feat/webapp-b2-b8-runner-20261121 && git pull --ff-only && launchctl kickstart -k gui/$(id -u)/com.mitchellstudio.upload
```

## 2. 증거

- PMO: 시험 38/38(새 `test_runner.py` 18 + 묶음 1 · 작업자 모델 20 — 가짜 `claude`로 성공 · rc 1 · 결과 없음 · 시간 초과 · 사용량 · 로그인, 두 프로세스 100번씩 잠금 → 200, CapCut 기다림 · 다른 작업 먼저, 템플릿 판 고정, exports/approvals), 휴대폰 폭 화면 5/5. 코드 커밋 = 시험 커밋 = `658ec1d`.
- ARCH 다시 확인(13:22 KST, fetch로 읽기만): 가지가 main `6cfbc5f`을 품음 · 저장소 전부를 따로 풀어 돌림 → 처음 **8개 실패**, `PYTHONUTF8=1`로 다시 → **38 OK**. 실패 8개는 모두 가짜 `claude`를 부르는 시험 — 이 PC 윈도의 기본 글자판(cp949) 때문에 가짜 `claude`의 한글 출력이 깨진 것(아래 4-3). 맥은 UTF-8이 기본이라 이 실패와 무관.
- 설계 밖으로 더한 것 둘을 봄: ① 이 PC의 Claude Code 2.1.292에 `--max-turns`가 없어 `claude --help`에 없으면 빼고 부르고 `runs`에 적음 — 받음. ② ④ 편집 일의 `--allowedTools`에 `capcut_build.mjs` · `ffprobe`를 더함 — 편집 순서에 꼭 드는 두 명령이라 받음.

## 3. 바뀐 것

제품 가지 1개(위). 에이전트 저장소 `btsr/arch`: 설계 1 · 1.1판 · ARCH-004 요청 · 이 반환서.

## 4. 남은 것

1. **맥에서 진짜 `claude` 한 번(기준 10)이 아직.** PMO가 한 장 `app/webapp/MAC_RUN_B2.md`(맨 위 '하지 않으실 것': 새 터미널 · 웹앱 다시 켜기 · `~/mitchell_studio` 가지 바꾸기 · 손님 사진 · CapCut · 로그인/설정/결제 누르기 — 시험은 따로 된 폴더 `~/oc-test/b2`에서만)과 한알께 물음 1(④ 편집까지 진짜로? 1 = 접수 · 원고까지만, 권고 · 2 = 편집까지 — 맥 CapCut 목록에 시험 프로젝트가 남음)을 써 둠. **그런데 한알 13:02:58 「일단 이쪽 웹앱 1차를 완성하는게 어떨까요」(맥 시험은 1차가 다 된 main으로 한 번에)** — ARCH 권고: 이 시험도 1차 끝 맥 시험에 넣고 지금은 하지 않음. 정해 주세요(PLN → RSCH).
2. **main 합치기** — PLN이 정하면 RSCH가 앞으로 감기(1.6판). 진짜 `claude`를 맥에서 아직 안 불렀다는 것을 알고 정해 주세요(가짜로만 봄).
3. 윈도에서 시험을 돌리려면 `PYTHONUTF8=1`이 듦 — 가짜 `claude`가 출력을 UTF-8로 쓰게 고치면 없어짐. 다음 PMO 건(ARCH-006)에 넣음.
4. 맥 Claude Code 판의 플래그(`--max-turns` 등)는 맥에서 봐야 함 — 위 1과 함께.

## 5. 배운 것

- 시험을 따로 풀어 돌릴 때는 환경(글자판 · 경로)까지 같아야 같은 결과가 난다. 반환서의 시험 명령에 환경 값(`PYTHONUTF8=1` 등)을 함께 적게 한다.
- 요청서를 쓸 때(13:01)와 받을 때 사이에 한알 말씀(13:02:58 맥 시험은 끝에 한 번)이 바뀌었다 — 반환 전에 요청서의 기준이 지금 말씀과 맞는지 다시 본다(AAA 규칙 37).

## 6. 다음

반환함(AAA 규칙 18). 이 묶음의 다음(맥 시험 · 합치기)은 PLN 몫. ARCH는 차례대로 ARCH-006(묶음 1-1 별명 · 단추 글)을 PMO에, 그리고 묶음 3 설계.
