# SUB 개설 패킷 — MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES (판 2)

| 칸 | 값 |
|---|---|
| 연 이 | PRIMARY `MITCHELL_STUDIO/BTSR/RSCH` — Paseo 3233ba1f-9fe2-49b5-ac73-e9e42645d7ee · Fable 5.2 |
| SUB | `MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES` — Paseo 5641fdf4-f018-4a9f-804a-a5b6172a6910 |
| 실행기 | Paseo · claude-google · Opus 5.5 (claude-opus-5-5) · auto · high |
| 자기 칸 | `projects/btsr/roles/rsch/sub/s1_open_roles/` (main 폴더. 이 칸에만 씀) |
| 규칙 | 이 저장소 AGENTS.md + AAA 규칙 판 v0.14 (`C:\Users\ms1pk\dev\AAA\AGENTS.md`, 읽기만) |
| 판 | 판 1: 2026-11-19 22:17 KST(커밋 118fbd9 — 세션을 연 뒤에 쓴 것, AAA 규칙 40에 어긋났음) · **판 2: 22:21 KST — 한알 "똑같이 하세요"로 고침. 판 1과 다르면 판 2가 맞다.** |

## 근거 (한알 말씀, 원문 그대로 — owner/utterances/2026-11-19.md)

- 21:49:43 uuid 40bb41cb: "서브로 오퍼스 세션을 만들고 그 세션으로 하여금 pln arch pmo른 오퍼스로 만들도록 지시하세요"
- 21:52:02 uuid 099449aa: "Aaa의 규칙을 참조하세요"
- 22:01:47 uuid 2933adbf: "없어요" (세 세션이 한알의 Paseo 화면에 보이지 않음)
- 22:02:43 uuid c4dfdcfa: "아니 중지ㅋㅋ aaa보시고 만드시라구요."
- 22:18:23 uuid 3a1d2dc6: "똑같이 하세요" (RSCH가 'AAA와 다르게 두겠다'고 한 둘 — 작업 공간을 worktree로 만들지 않는 것, 역할 폴더 꼴을 이 저장소 꼴로 두는 것 — 에 대한 답)

## 지금까지 (판 2를 쓸 때)

- 21:50~21:55에 RSCH 작업 공간 안의 하위 세션으로 연 셋(769642ae · c9827256 · a73bc1c9): 제목에 CLOSED를 붙임.
- 판 1로 연 PLN(작업 공간 wks_b17624602f48a73b · 세션 d41ebe15): main 폴더에 열린 것이라 이어 가지 않음. 작업 공간 제목 `…/PLN-CLOSED`, 세션 제목 `…/PLN CLOSED`. PRIMARY가 멈추게 함.
- 지우거나 보관한 것은 없다. 위 세션들에 S1은 연락하지 않는다.
- 판 1로 쓴 요청서 셋(커밋 7fb112e)은 **고쳐 쓴다**(같은 파일 이름, 지우지 않고 내용을 판 2로).

## AAA와 똑같이 한다는 것 (PRIMARY가 직접 본 것)

1. **가지와 worktree** (규칙 19): 역할마다 가지 `btsr/<역할>`, 작업 사본 `worktrees/btsr-<역할>`(AAA의 `agent_asa/pln` ↔ `worktrees/agent_asa-pln`과 같은 꼴). PRIMARY가 이미 만들어 둠(main fa2b7aa에서 갈라 냄):
   - `C:\Users\ms1pk\dev\mitchell-studio_agent\worktrees\btsr-pln` — 가지 `btsr/pln`
   - `C:\Users\ms1pk\dev\mitchell-studio_agent\worktrees\btsr-arch` — 가지 `btsr/arch`
   - `C:\Users\ms1pk\dev\mitchell-studio_agent\worktrees\btsr-pmo` — 가지 `btsr/pmo`
   - `worktrees/`는 `.git/info/exclude`에 적어 둠(AAA와 같음).
2. **Paseo 작업 공간**: 역할마다 하나, 제목 = 세션 이름, 경로 = 그 역할의 worktree, 한 Paseo 프로젝트로 묶음(`list_workspaces`의 `RHS/COMM/PLN` · `ARCH` · `RSCH` · `PMO` 참고).
3. **역할 폴더 꼴** (규칙 20·28·29): `projects/btsr/roles/<역할>/`에 CURRENT · ROADMAP · INDEX · DECISIONS · 작업 칸 · archive/. CURRENT.md는 README 겸 지금 상태이고 맨 위에 YAML, 이력은 쌓지 않음.
4. **개설**: 원본은 요청서 파일, 세션에 보내는 글은 알림만(규칙 17). 받은 세션은 받음을 남김.
5. **역할 메인은 Opus High.**

## 할 일 (PLN → ARCH → PMO, 한 번에 하나)

1. 요청서 셋(`OPEN_PLN_요청.md` · `OPEN_ARCH_요청.md` · `OPEN_PMO_요청.md`)을 아래 '요청서에 담을 것'대로 고쳐 쓰고, 이 칸만 경로를 지정해 커밋·push한다(main).
2. 역할마다:
   - `create_workspace` — isolation `local` · path = 그 역할의 worktree 폴더(위 1) · projectId `prj_fe5231392482ce60` · title `MITCHELL_STUDIO/BTSR/<역할>`. background는 주지 않는다. (이미 있는 폴더를 받아들이는 방식이다. 새 worktree를 Paseo가 다른 자리에 만들게 하지 않는다.)
   - 돌려받은 값(cwd · kind · isolation · parentWorkspaceId)을 반환서에 그대로 적는다.
   - `create_agent` — workspaceId = 방금 만든 작업 공간 · title `MITCHELL_STUDIO/BTSR/<역할>`(접미사 없음) · provider `claude-google/claude-opus-5-5` · settings modeId `auto`, thinkingOptionId `high` · background 주지 않음. 여는 글은 알림만: 세션 이름 · 요청서의 **절대 경로**(main 폴더 쪽: `C:\Users\ms1pk\dev\mitchell-studio_agent\projects\btsr\roles\rsch\sub\s1_open_roles\OPEN_<역할>_요청.md`) · "요청서를 읽고 그대로 하라".
   - 연 세션이 그 작업 공간의 맨 위 세션이 되게 한다: `paseo.parent-agent-id` · `paseo.parent-server-id` 라벨을 빈 값으로.
   - 세션의 작업 폴더가 정말 그 worktree인지 확인한다(`get_agent_status`의 cwd). 아니면 멈추고 보고한다.
   - 그 세션의 받음 보고를 받은 뒤 다음 역할로 간다.
3. 막히면(도구 오류 · 권한 거절 · 경로가 다름) 다른 길로 돌아가지 말고 멈춰서 그대로 보고한다.

## 요청서에 담을 것 (절: 근거 / 너 / 첫 일 / 경계 / 반환)

본보기(읽기만): `C:\Users\ms1pk\memstore\rhs\fast\board\RHS-DPM-065_COMM-PLN-개설-첫일-공통요구모으기-20261101\요청.md`.

- **근거**: 위 한알 말씀 다섯(시각 · uuid · 원문). 이 글은 한알 말씀이 아니라 RSCH의 SUB가 쓴 요청서라는 것.
- **너**: 세션 이름 `MITCHELL_STUDIO/BTSR/<역할>`, 이 역할의 PRIMARY. 역할 트리(규칙 5): PLN > RSCH · ARCH > PMO. 모델 Opus 5.5 · high. 작업 사본 `worktrees/btsr-<역할>`, 가지 `btsr/<역할>` — **일과 커밋은 여기서만**(규칙 19). main 폴더(`C:\Users\ms1pk\dev\mitchell-studio_agent`)는 읽기 기준이고 거기에 쓰지 않는다. 역할 자리 `projects/btsr/roles/<역할 소문자>/`. 작업 칸(규칙 20): PLN `requirements/` · ARCH `design/` · PMO `records/` — 첫 정본을 쓸 때 만든다.
- **첫 일**:
  1. 첫 응답 첫 줄은 `[MITCHELL_STUDIO/BTSR/<역할> · 규칙 판 v0.14 받음]`.
  2. 읽기: 작업 사본의 AGENTS.md · README.md → `C:\Users\ms1pk\dev\AAA\AGENTS.md`(읽기만. 특히 규칙 1·2·4·5·9·10·15·17·18·19·20·21·28·29·31·34·35) → 자기 역할 폴더에 이미 있는 파일(CLOSED된 앞 세션이 이 저장소의 옛 꼴로 만든 CURRENT.md · directives.md · knowhow.md · logs/) → `projects/btsr/roles/rsch/knowhow.md`(이 PC의 환경, 토큰 아끼는 법).
  3. 꼴의 본보기(읽기만, 필요한 줄만): `C:\Users\ms1pk\dev\AAA\projects\byul\roles\pln\`의 CURRENT.md 맨 위 YAML · ROADMAP.md · INDEX.md · DECISIONS.md 첫 10줄쯤, `C:\Users\ms1pk\dev\AAA\projects\infra\roles\<같은 역할>\`의 파일 목록, `...\infra\roles\pln\archive\MOVES.tsv`의 칸.
  4. 자기 역할 폴더를 AAA 꼴로 맞춘다(규칙 20): `CURRENT.md`(맨 위 YAML — role · session · rules · state · updated · base_commit · now · next · waiting_for · owner_wait, 그리고 본보기에 있는 subs · parent · verifier. 이력은 쌓지 않음) · `ROADMAP.md` · `INDEX.md` · `DECISIONS.md` · `archive/`. 빈 항목 폴더 · 결정 파일 · 작업 칸은 미리 만들지 않는다. 모르는 값은 지어내지 않고 비우거나 "미정 — 한알 말씀 대기"라고 적는다. `rules` 칸은 사실대로(이 저장소에는 규칙 판이 아직 주입되지 않았고, AAA v0.14를 AAA main 폴더에서 읽었다는 것). `session` 칸에 Paseo 에이전트 ID · 작업 공간 ID · Claude 세션 ID · 모델을 어디에 둘지는 본보기를 따른다(ID는 짐작하지 않음. Claude 세션 ID는 transcript 폴더에서 자기 여는 글이 첫 user 줄인 `.jsonl`의 이름 — 작업 폴더가 worktree라 transcript 폴더 이름도 그 경로에서 온다. 못 찾으면 "확인 못 함").
  5. 옛 꼴 파일(`directives.md` · `knowhow.md` · `logs/`, 옛 CURRENT의 내용)은 **지우지 않는다**. `git mv`로 `archive/`에 옮기고 `archive/MOVES.tsv`에 한 줄씩 적는다(규칙 29). 옛 directives.md에 적힌 한알 말씀은 규칙 31의 꼴로 DECISIONS 쪽에서 가리킨다.
  6. 한국 시각은 PowerShell로 확인한다. 바뀐 파일을 `git diff --stat`으로 본 뒤, 자기 역할 폴더만 이름으로 add → 커밋 → `git push -u origin btsr/<역할>`. main에는 push하지 않고 합치지도 않는다.
- **경계**: 역할이 무엇을 할지는 한알이 아직 정하지 않으셨다 — 스스로 정하지 않는다(규칙 1·2). 조사 · 설계 · 코드 · 문서는 한알 말씀 뒤. rsch의 studies/와 제품 저장소(`C:\Users\ms1pk\dev\mitchell-studio`)는 시키시기 전에 읽지 않는다. 자기 역할 폴더 밖(다른 역할 폴더 · owner/ · AGENTS.md · README.md)과 AAA 저장소 · memstore는 고치지 않는다. 한알이 그 창에 말씀하시면 먼저 원문 그대로 자기 역할 폴더에 적는다(규칙 31의 꼴. main의 owner/utterances/에는 쓰지 않는다 — 가지가 달라 겹친다). 손님 · 개인 정보와 키 · 비밀 값은 적지 않는다. 지우지 않는다(4). Git 위험 명령(21)과 `git add .` · `-A`는 쓰지 않는다. main 합치기를 누가 정하는지는 아직 말씀이 없다(AAA에서는 도메인 DPM) — 스스로 합치지 않는다. 권한이 막히면 우회하지 않고 보고한다. 토큰을 아낀다(필요한 줄만 읽고, 명령을 묶고, 보고는 짧게).
- **반환**: "받음 끝"을 짧게(가지 · 커밋 번호 · 만든 파일 목록) 연 쪽에 보고하고 한알 말씀을 기다린다. 다음 일을 스스로 시작하지 않는다(규칙 18).

## 낼 것

이 칸의 `반환.md` — 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음). 결과에 아래 표. 쓴 뒤 이 칸만 커밋·push하고, PRIMARY에게는 "반환서를 냈다"는 것과 표만 알린다.

| 역할 | Paseo 작업 공간 ID (cwd · kind) | Paseo 에이전트 ID | Claude 세션 ID | 모델 | 가지 · 받음 커밋 |

## 지킬 것

- 이 칸 밖에는 쓰지 않는다. CURRENT.md · 다른 역할 폴더 · owner/는 PRIMARY와 각 역할의 몫이다.
- 위에 없는 일을 세 세션에게 시키지 않는다. CLOSED 세션들에는 연락하지 않는다.
- 틀을 스스로 만들지 않는다. 막히면 멈추고 그대로 보고한다.
