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
