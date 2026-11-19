# SUB 개설 패킷 — MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES

| 칸 | 값 |
|---|---|
| 연 이 | PRIMARY `MITCHELL_STUDIO/BTSR/RSCH` — Paseo 3233ba1f-9fe2-49b5-ac73-e9e42645d7ee · Fable 5.2 |
| SUB | `MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES` — Paseo 5641fdf4-f018-4a9f-804a-a5b6172a6910 |
| 실행기 | Paseo · claude-google · Opus 5.5 (claude-opus-5-5) · auto · high |
| 자기 칸 | `projects/btsr/roles/rsch/sub/s1_open_roles/` (이 칸에만 씀) |
| 규칙 | 이 저장소 AGENTS.md(8개) + AAA 규칙 판 v0.14 (`C:\Users\ms1pk\dev\AAA\AGENTS.md`, 읽기만) |
| 패킷을 쓴 때 | 2026-11-19 22:17 KST — **세션을 연 뒤에 씀**(21:50에 여는 글만으로 열었음, AAA 규칙 40에 어긋남. 이 패킷으로 바로잡음) |

## 근거 (한알 말씀, 원문 그대로 — owner/utterances/2026-11-19.md)

- 21:49:43 uuid 40bb41cb: "서브로 오퍼스 세션을 만들고 그 세션으로 하여금 pln arch pmo른 오퍼스로 만들도록 지시하세요"
- 21:52:02 uuid 099449aa: "Aaa의 규칙을 참조하세요"
- 22:01:47 uuid 2933adbf: "없어요" (세 세션이 한알의 Paseo 화면에 보이지 않음)
- 22:02:43 uuid c4dfdcfa: "아니 중지ㅋㅋ aaa보시고 만드시라구요."

## 무엇이 잘못됐나

21:50~21:55에 연 PLN·ARCH·PMO 세션 셋은 RSCH 작업 공간 안의 하위 세션으로 열렸다. AAA·RHS·MPP에서는 **역할마다 Paseo 작업 공간이 하나씩** 있고(제목 = 세션 이름, 예: `RHS/COMM/PLN` · `RHS/COMM/ARCH`), 한 프로젝트의 작업 공간들이 같은 Paseo 프로젝트로 묶인다. 한알은 그 목록에서 세션을 보신다. 그래서 "없어요".

앞서 연 세 세션(769642ae · c9827256 · a73bc1c9)은 PRIMARY가 제목 뒤에 ` CLOSED`를 붙였다. 지우거나 보관하지 않는다. 그 세션들이 만든 역할 폴더(`projects/btsr/roles/pln` · `arch` · `pmo`)는 그대로 두고 새 세션이 이어받는다.

## 먼저 읽을 것

1. `C:\Users\ms1pk\dev\AAA\AGENTS.md` — 규칙 9·10·13·17·25·40.
2. 개설 요청서의 본보기(읽기만): `C:\Users\ms1pk\memstore\rhs\fast\board\RHS-DPM-065_COMM-PLN-개설-첫일-공통요구모으기-20261101\요청.md` — 절 머리말이 **근거 / 너 / 첫 일 / 경계 / 반환**. 이 꼴을 따른다. 안 열리면 우회하지 말고 반환서에 적고, 아래 '요청서에 담을 것'만으로 쓴다.
3. Paseo 작업 공간의 본보기: `list_workspaces` — `RHS/COMM/PLN` · `ARCH` · `RSCH` · `PMO`가 한 projectId 아래에 있는 모습. 이 저장소의 작업 공간은 `MITCHELL_STUDIO/BTSR/RSCH`(wks_b17bef735d169958, projectId prj_fe5231392482ce60, local, 경로 `C:\Users\ms1pk\dev\mitchell-studio_agent`).

## 할 일 (PLN → ARCH → PMO, 한 번에 하나)

1. **개설 요청서 셋을 이 칸에 쓴다**: `OPEN_PLN_요청.md` · `OPEN_ARCH_요청.md` · `OPEN_PMO_요청.md`. 원본은 파일이고 세션에 보내는 글은 "왔다"는 알림만이다(규칙 17). 쓴 뒤 이 칸만 경로를 지정해 커밋하고 push한다(`git add`와 `git commit -- projects/btsr/roles/rsch/sub/s1_open_roles/`).
2. 역할마다:
   - `create_workspace` — isolation `local` · path `C:\Users\ms1pk\dev\mitchell-studio_agent` · projectId `prj_fe5231392482ce60` · title `MITCHELL_STUDIO/BTSR/<역할>`. background는 주지 않는다.
   - `create_agent` — workspaceId = 방금 만든 작업 공간 · title `MITCHELL_STUDIO/BTSR/<역할>`(접미사 없음) · provider `claude-google/claude-opus-5-5` · settings modeId `auto`, thinkingOptionId `high` · background 주지 않음. 여는 글은 짧게: 세션 이름, 요청서 경로, "요청서를 읽고 그대로 하라"는 것뿐.
   - 연 세션이 그 작업 공간의 맨 위 세션이 되게 한다: `list_agents`로 labels를 보고, `paseo.parent-agent-id`가 채워져 있으면 `update_agent`로 `paseo.parent-agent-id`와 `paseo.parent-server-id`를 빈 값으로 둔다.
   - 그 세션의 받음 커밋 보고를 받은 뒤 다음 역할로 간다(같은 폴더에서 커밋하므로).
3. 작업 공간을 같은 경로로 하나 더 만드는 것이 막히면(도구 오류·권한 거절) 다른 길로 돌아가지 말고 멈춰서 그대로 보고한다. worktree로 바꾸지 않는다 — 이 저장소는 main에 바로 커밋한다(AGENTS.md 8).

## 요청서에 담을 것 (절: 근거 / 너 / 첫 일 / 경계 / 반환)

- **근거**: 위 한알 말씀 넷(시각 · uuid · 원문). 이 글은 한알 말씀이 아니라 RSCH의 SUB가 쓴 요청서라는 것.
- **너**: 세션 이름 `MITCHELL_STUDIO/BTSR/<역할>`, 이 역할의 PRIMARY. 역할 트리(AAA 규칙 5): PLN > RSCH · ARCH > PMO. 모델 Opus 5.5 · high. 역할 자리 `projects/btsr/roles/<역할 소문자>/`(앞 세션이 이 저장소의 꼴로 만들어 둠 — 이어받는다). 작업 칸 이름(규칙 20): PLN `requirements/` · ARCH `design/` · PMO `records/`, 첫 정본을 쓸 때 만든다.
- **첫 일**: ① 첫 응답 첫 줄은 `[MITCHELL_STUDIO/BTSR/<역할> · 규칙 판 v0.14 받음]`(규칙 판 머리말 '첫 줄'). ② 읽기: 이 저장소 AGENTS.md → README.md → `C:\Users\ms1pk\dev\AAA\AGENTS.md`(읽기만) → 자기 역할 폴더의 CURRENT.md · directives.md · logs/ → `projects/btsr/roles/rsch/knowhow.md`(이 PC의 환경, 토큰 아끼는 법) → owner/utterances/2026-11-19.md 끝 60줄쯤. ③ CURRENT.md의 '세션 열림' 줄에 자기 것(Paseo 에이전트 ID · Paseo 작업 공간 ID · Claude 세션 ID · 모델 · 한국 시각)을 더하고, 앞 세션 줄에는 "CLOSED — 이어받음"이라고 적는다(지우지 않는다). ④ `logs/2026-11-19-session-open.md` 끝에 '받음' 한 줄. ⑤ 자기 폴더 파일만 이름으로 add → 커밋 → push.
- **경계**: 역할이 무엇을 할지는 한알이 아직 정하지 않으셨다 — 스스로 정하지 않는다(규칙 1·2). 조사·설계·코드·문서는 한알 말씀 뒤. rsch의 studies/와 제품 저장소(`C:\Users\ms1pk\dev\mitchell-studio`)는 시키시기 전에 읽지 않는다. 다른 역할 폴더 · AGENTS.md · README.md · AAA 저장소는 고치지 않는다. 이 저장소의 폴더 꼴(directives · knowhow · logs)은 그대로 둔다(AGENTS.md 7). ID는 짐작하지 않는다(Claude 세션 ID는 transcript 폴더에서 자기 여는 글이 첫 user 줄인 `.jsonl`의 이름, 못 찾으면 "확인 못 함"). 한알이 그 창에 말씀하시면 먼저 원문을 owner/utterances/<날짜>.md에 적는다. 손님·개인 정보와 키·비밀 값은 적지 않는다. 지우지 않는다. Git 위험 명령과 `git add .`·`-A`는 쓰지 않는다. 권한이 막히면 우회하지 않고 보고한다.
- **반환**: "받음 끝"을 짧게(커밋 번호 포함) 연 쪽에 보고하고 한알 말씀을 기다린다. 다음 일을 스스로 시작하지 않는다(규칙 18).

## 낼 것

이 칸의 `반환.md` — 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음). 결과에는 아래 표를 넣는다. 쓴 뒤 이 칸만 커밋·push하고, PRIMARY에게는 "반환서를 냈다"는 것과 표만 알린다.

| 역할 | Paseo 작업 공간 ID | Paseo 에이전트 ID | Claude 세션 ID | 모델 | 받음 커밋 |

## 지킬 것

- 이 칸 밖에는 쓰지 않는다. CURRENT.md · 다른 역할 폴더 · owner/는 PRIMARY와 각 역할의 몫이다.
- 위에 없는 일을 세 세션에게 시키지 않는다. 앞서 연 세션(CLOSED 셋)에는 연락하지 않는다.
- 틀을 스스로 만들지 않는다. 막히면 멈추고 그대로 보고한다.
- 첫 보고 첫 줄: `[MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES · 규칙 판 v0.14 받음]`.
