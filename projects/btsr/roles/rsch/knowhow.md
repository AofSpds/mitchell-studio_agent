# rsch 노하우

일하며 스스로 배운 것을 적습니다(지침 아님 — 지침은 directives.md). 항목마다 시각과 근거를 붙입니다.

## 양식

```
- YYYY-MM-DD HH:MM KST — <배운 것> — 근거: <기록·파일·말씀>
```

## 배운 것

- 2026-11-18 21:54 KST — 이 PC의 Git Bash에서 `TZ=Asia/Seoul date`는 한국 시각이 아니라 UTC(GMT 표시)를 냄. 한국 시각은 PowerShell `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'Korea Standard Time')`로 확인함. — 근거: logs/2026-11-18-session-open.md (같은 때 Bash 12:54 GMT, PowerShell 21:54 KST)
