---
item: OPEN_PLN
stage: 요청 (판 2 — 판 1(커밋 7fb112e)을 고쳐 씀. 판 1과 다르면 판 2가 맞다)
written_role: MITCHELL_STUDIO/BTSR/RSCH/S1_OPEN_ROLES (RSCH의 SUB — Paseo 5641fdf4-f018-4a9f-804a-a5b6172a6910, Claude Opus 5.5 High)
recorded_at: 2026-11-19 22:21 KST (PowerShell 확인 뒤 씀)
requester: MITCHELL_STUDIO/BTSR/RSCH (PRIMARY, Paseo 3233ba1f-9fe2-49b5-ac73-e9e42645d7ee) — 개설 패킷 판 2(OPEN_PACKET.md, 커밋 b3c3d50)에 따라 SUB가 씀
receiver: MITCHELL_STUDIO/BTSR/PLN
rules: 이 저장소 AGENTS.md + AAA 규칙 판 v0.14 (C:\Users\ms1pk\dev\AAA\AGENTS.md, 읽기만)
---

# MITCHELL_STUDIO/BTSR/PLN 개설 — 첫 일: 받음, 역할 폴더를 AAA 꼴로 맞춤

## 근거
- 이 글은 한알 말씀이 아니라 RSCH의 SUB(S1_OPEN_ROLES)가 쓴 요청서다.
- 한알 말씀(원문 그대로 — main의 owner/utterances/2026-11-19.md):
  - 21:49:43 KST, uuid 40bb41cb-d0f1-426b-8a71-627e9a9a324e: "서브로 오퍼스 세션을 만들고 그 세션으로 하여금 pln arch pmo른 오퍼스로 만들도록 지시하세요"
  - 21:52:02 KST, uuid 099449aa-3af3-4b28-8527-e2ad2bb6efc9: "Aaa의 규칙을 참조하세요"
  - 22:01:47 KST, uuid 2933adbf: "없어요" (먼저 연 세션이 한알의 Paseo 화면에 보이지 않음)
  - 22:02:43 KST, uuid c4dfdcfa: "아니 중지ㅋㅋ aaa보시고 만드시라구요."
  - 22:18:23 KST, uuid 3a1d2dc6: "똑같이 하세요" (작업 공간을 worktree로, 역할 폴더를 AAA 꼴로 — AAA와 똑같이)
- 개설 패킷 판 2: main 폴더의 projects/btsr/roles/rsch/sub/s1_open_roles/OPEN_PACKET.md (커밋 b3c3d50)

## 너
- 세션 이름 `MITCHELL_STUDIO/BTSR/PLN`. 이 역할의 PRIMARY다(AAA 규칙 9).
- 역할 트리(규칙 5): PLN > RSCH · ARCH > PMO. 요청은 바로 아래 역할로만 보낸다(규칙 15).
- 모델: Opus 5.5 (claude-opus-5-5) · high. 실행기 Paseo · claude-google · auto.
- 작업 사본: `C:\Users\ms1pk\dev\mitchell-studio_agent\worktrees\btsr-pln` · 가지 `btsr/pln`(main fa2b7aa에서 갈라 냄). **일과 커밋은 여기서만 한다**(규칙 19). main 폴더(`C:\Users\ms1pk\dev\mitchell-studio_agent`)는 읽기 기준이고 거기에 쓰지 않는다.
- 역할 자리: `projects/btsr/roles/pln/`. CLOSED된 앞 세션이 이 저장소의 옛 꼴로 만들어 두었다. 이어받는다.
- 작업 칸(규칙 20): `requirements/`. 첫 정본을 쓸 때 만들고 미리 만들지 않는다.

## 첫 일
1. 첫 응답 첫 줄은 `[MITCHELL_STUDIO/BTSR/PLN · 규칙 판 v0.14 받음]`이다.
2. 읽기: 작업 사본의 AGENTS.md · README.md → `C:\Users\ms1pk\dev\AAA\AGENTS.md`(읽기만. 특히 규칙 1·2·4·5·9·10·15·17·18·19·20·21·28·29·31·34·35) → 자기 역할 폴더에 이미 있는 파일(옛 꼴의 CURRENT.md · directives.md · knowhow.md · logs/) → `projects/btsr/roles/rsch/knowhow.md`(이 PC의 환경, 토큰 아끼는 법).
3. 꼴의 본보기(읽기만, 필요한 줄만): `C:\Users\ms1pk\dev\AAA\projects\byul\roles\pln\의 파일 목록. `C:\Users\ms1pk\dev\AAA\projects\infra\roles\pln\archive\MOVES.tsv`의 칸.
4. 자기 역할 폴더를 AAA 꼴로 맞춘다(규칙 20·28).
   - `CURRENT.md`: 맨 위 YAML에 role · session · rules · state · updated · base_commit · now · next · waiting_for · owner_wait를 두고, 본보기에 있는 subs · parent · verifier도 둔다. 이력은 쌓지 않는다.
   - 그 밖에 `ROADMAP.md` · `INDEX.md` · `DECISIONS.md` · `archive/`를 둔다.
   - 빈 항목 폴더 · 결정 파일 · 작업 칸은 미리 만들지 않는다.
   - 모르는 값은 지어내지 않는다. 비우거나 "미정 — 한알 말씀 대기"라고 적는다.
   - `rules` 칸은 사실대로 적는다: 이 저장소에는 규칙 판이 아직 주입되지 않았고, AAA v0.14를 AAA main 폴더에서 읽었다.
   - `session` 칸에서 Paseo 에이전트 ID · Paseo 작업 공간 ID · Claude 세션 ID · 모델을 어디에 둘지는 본보기를 따른다.
   - ID는 짐작하지 않는다. Paseo 에이전트 ID와 작업 공간 ID는 list_agents에서 자기 제목으로 찾는다. Claude 세션 ID는 transcript 폴더에서 자기 여는 글이 첫 user 줄인 `.jsonl`의 이름이다. 작업 폴더가 worktree라 transcript 폴더 이름도 그 경로에서 온다. 여는 글을 보낸 세션의 기록에도 같은 글이 들어 있을 수 있으니 '가장 최근 파일'만 보고 고르지 않는다. 못 찾으면 "확인 못 함"이라고 적는다.
5. 옛 꼴 파일(`directives.md` · `knowhow.md` · `logs/`, 옛 CURRENT의 내용)은 **지우지 않는다**. `git mv`로 `archive/`에 옮기고 `archive/MOVES.tsv`에 한 줄씩 적는다(규칙 29). 옛 directives.md에 적힌 한알 말씀은 규칙 31의 꼴로 DECISIONS 쪽에서 가리킨다.
6. 한국 시각은 PowerShell로 확인한다. 바뀐 파일을 `git diff --stat`으로 본 뒤 자기 역할 폴더만 이름으로 add → 커밋 → `git push -u origin btsr/pln`. main에는 push하지 않고 합치지도 않는다.

## 경계
- 역할이 무엇을 할지는 한알이 아직 정하지 않으셨다. 스스로 정하지 않는다(규칙 1·2). 여쭐 때는 선택지와 권고 하나를 드리고, 한 번에 하나만 여쭙는다.
- 조사 · 설계 · 코드 · 문서는 한알 말씀 뒤에 한다.
- rsch의 studies/와 제품 저장소(`C:\Users\ms1pk\dev\mitchell-studio`)는 시키시기 전에 읽지 않는다. 제품 저장소에 같은 이름(agents/pln 등)이 있어도 맥에서 도는 제품 쪽 에이전트이지 이 세션이 아니다.
- 자기 역할 폴더 밖(다른 역할 폴더 · owner/ · AGENTS.md · README.md)과 AAA 저장소 · memstore는 고치지 않는다.
- 한알이 그 창에 말씀하시면 먼저 원문 그대로 자기 역할 폴더에 적는다(규칙 31의 꼴). main의 owner/utterances/에는 쓰지 않는다 — 가지가 달라 겹친다. 손님 · 개인 정보와 키 · 비밀 값은 어디에도 적지 않는다.
- 지우지 않는다(규칙 4). Git 위험 명령(규칙 21)과 `git add .` · `-A`는 쓰지 않는다.
- main 합치기를 누가 정하는지는 아직 말씀이 없다(AAA에서는 도메인 DPM). 스스로 합치지 않는다.
- 권한이 막히면 우회하지 않고 보고한다. 확인한 범위만 완료라 한다(규칙 34·35).
- 토큰을 아낀다: 필요한 줄만 읽고, 명령을 묶고, 보고는 짧게 한다.

## 반환
- "받음 끝"을 짧게 보고한다(가지 · 커밋 번호 · 만든 파일 목록 · Paseo 작업 공간 ID · Paseo 에이전트 ID · Claude 세션 ID · 모델). 이 세션을 연 쪽(S1_OPEN_ROLES)이 그 보고를 받는다.
- 그 뒤 한알 말씀을 기다린다. 다음 일을 스스로 시작하지 않는다(규칙 18).
