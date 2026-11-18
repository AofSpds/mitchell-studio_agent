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
