---
role: "mitchell_studio/btsr/pmo"
session: "MITCHELL_STUDIO/BTSR/PMO"
rules: "none — 이 저장소에는 규칙 판이 아직 주입되지 않음. AAA 규칙 판 v0.14(C:\\Users\\ms1pk\\dev\\AAA\\AGENTS.md)를 AAA main 폴더에서 읽기만 함"
state: "ACTIVE"
updated: "2026-11-19T13:29:39Z"
base_commit: "fa2b7aa"
now: "개설 받음 — 역할 폴더를 AAA 꼴로 맞춤(옛 꼴 파일은 archive/로). 하던 일 없음"
next: "한알 말씀 대기 — 역할이 무엇을 할지 스스로 정하지 않음(규칙 1·2·18)"
waiting_for: ["owner:pmo-role-scope"]
owner_wait: "1 — 이 역할이 무엇을 할지 (미정 — 한알 말씀 대기)"
subs: []
parent: "mitchell_studio/btsr/arch"
verifier: "mitchell_studio/btsr/pmov"
---

# PMO — BTSR 구현 (상설)

| 칸 | 내용 |
|---|---|
| 역할 | 구현(규칙 5·20). 무엇을 할지는 미정 — 한알 말씀 대기 |
| 프로젝트 | BTSR(부트스트랩) — MITCHELL_STUDIO 도메인 |
| 상위 | ARCH (`MITCHELL_STUDIO/BTSR/ARCH`). 역할 트리 PLN > RSCH · ARCH > PMO, 요청은 바로 아래로만 (규칙 5·15) |
| 짝 검증자 | PMOV (비상설, 여는 이 ARCH, 규칙 7). 아직 열리지 않음 |
| PRIMARY | `MITCHELL_STUDIO/BTSR/PMO` — Paseo(claude-google · auto) · Opus 5.5 (claude-opus-5-5) · high. Paseo 에이전트 `f3cf6938-049e-45f7-bb68-a64e06bff385` · Paseo 작업 공간 `wks_2dc964d20c5cca11` · Claude 세션 `ac64c01a-d76a-418c-b6d9-1ff2b1f205e4`. 작업 폴더 `dev\mitchell-studio_agent\worktrees\btsr-pmo`, 브랜치 `btsr/pmo` (main fa2b7aa에서) |
| 개설 | RSCH의 SUB `MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES`(Paseo 5641fdf4)가 엶 — 요청서 main 폴더 `projects/btsr/roles/rsch/sub/s1_open_roles/OPEN_PMO_요청.md` 판 2. 앞 세션(Paseo a73bc1c9, 옛 꼴)은 요청서에 따라 CLOSED — 이어받음 |
| 규칙 판 | 주입 전 (`none`). AAA v0.14를 AAA main 폴더에서 읽음. 이 저장소 AGENTS.md도 따름 |
| 게시판 | 없음 — 아직 정해지지 않음 |
| 작업 칸 | `records/` (규칙 20) — 첫 정본을 쓸 때 만듦 |
| 앞머리 | 맨 위 YAML은 CURRENT 공통 칸(규칙 28). `subs`·`parent`·`verifier`는 AAA 본보기를 따름 |

## 지금

- 개설 받음 (2026-11-19 22:29 KST 확인). 옛 꼴 파일(directives.md · knowhow.md · logs/ · 옛 CURRENT.md)을 지우지 않고 [archive/](archive/)로 옮김 — [archive/MOVES.tsv](archive/MOVES.tsv).
- 하던 일 없음. 조사 · 설계 · 코드 · 문서는 한알 말씀 뒤에만.
- 제품 저장소(`C:\Users\ms1pk\dev\mitchell-studio`)와 RSCH `studies/`는 시키시기 전에 읽지 않음. 제품 저장소의 `agents/pmo`는 맥에서 도는 제품 쪽 에이전트이고 이 세션이 아님.
- main 합치기를 누가 정하는지 말씀 없음 — 스스로 합치지 않음.
