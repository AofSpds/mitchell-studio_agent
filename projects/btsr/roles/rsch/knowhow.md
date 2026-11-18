# rsch 노하우

일하며 스스로 배운 것을 적습니다(지침 아님 — 지침은 directives.md). 항목마다 시각과 근거를 붙입니다.

## 양식

```
- YYYY-MM-DD HH:MM KST — <배운 것> — 근거: <기록·파일·말씀>
```

## 환경·도구

- 2026-11-18 21:56 KST — 제품 저장소 AofSpds/mitchell-studio는 이 PC의 `C:\Users\ms1pk\dev\mitchell-studio`에 내려받아져 있음(NORN 대리가 내려받음, 폴더 생성 21:54:46 KST, main 0636fa0). 읽기만 함 — 고치거나 push하지 않음. 맥에서 계속 갱신되므로 읽기 전에 `git -C C:\Users\ms1pk\dev\mitchell-studio pull --ff-only`로 최신으로 맞춤. 손님 이름·연락처는 어디에도 옮겨 적지 않음(AGENTS.md 5). — 근거: NORN 대리(9fe2c323) 알림 f84fca47, 경로·원격·커밋은 직접 확인함

## 배운 것

- 2026-11-18 21:54 KST — 이 PC의 Git Bash에서 `TZ=Asia/Seoul date`는 한국 시각이 아니라 UTC(GMT 표시)를 냄. 한국 시각은 PowerShell `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'Korea Standard Time')`로 확인함. — 근거: logs/2026-11-18-session-open.md (같은 때 Bash 12:54 GMT, PowerShell 21:54 KST)
- 2026-11-18 22:06 KST — 제품 저장소 읽는 요령: `agents/*/dashboard.html`(9개, 각 431줄)과 `agents/creative_director/folder-tree.md`는 생성물이라 읽지 않음. 지금 상태는 `agents/creative_director/status.json` · `manual.md` · `agents/pmo/builds.md` 셋에 모여 있고, 도구의 실제 동작은 `app/webapp/README.md`에 순서대로 있음. 코드는 머리말(기획서 경로가 적혀 있음)과 함수 목록부터. — 근거: logs/2026-11-18-product-repo-read.md
- 2026-11-18 22:06 KST — 제품 저장소에는 계정 이름·메일·가족 관계·기기 주소가 적힌 줄이 있음. 옮겨 적지 않고 자리만 가리킴: studies/2026-11-18-product-repo-now.md 8번. — 근거: 같은 기록
- 2026-11-18 22:14 KST — 한알이 이 창에서 직접 하신 말씀의 시각·uuid는 이 세션 transcript(`~/.claude-max/projects/C--Users-ms1pk-dev-mitchell-studio-agent/<Claude 세션 ID>.jsonl`)의 type=user 줄(`uuid`·`timestamp`, UTC라 +9시간)에서 확인함. paseo-system으로 감싼 글은 다른 에이전트의 전달 글이라 구분함. — 근거: owner/utterances/2026-11-18.md 22:12:53 줄
- 2026-11-18 22:15 KST — 파일을 고치는 스크립트가 오류로 멈춰도 뒤따르는 커밋은 그대로 나감(22:14에 CURRENT·knowhow가 안 고쳐진 채 기록만 올라가 바로 다음 커밋으로 채움). 고친 뒤 `git diff --stat`으로 바뀐 파일을 보고 커밋함. — 근거: 커밋 1dba8dd와 그다음 커밋
