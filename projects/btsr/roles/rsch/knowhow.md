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
- 2026-11-19 00:32 KST — 웹 조사 요령: 검색 요약만으로는 '누가 무엇을 한다'가 섞여 나옴(자매 앱 剪映 이야기가 CapCut 이야기처럼). 판단에 쓰는 문장은 원문 페이지를 읽혀 따옴표로 받고, 요약으로만 본 것은 글에 '전해 들음'으로 표시함. 기사에 나온 저장소 주소는 직접 열어 봄(jianying-headless는 두 달 만에 404). — 근거: studies/2026-11-19-capcut-reverse-engineering.md
- 2026-11-19 00:32 KST — 제품 저장소에서 '왜 그렇게 됐나'는 기획서 맨 위 '총괄 디렉터님 결정' 칸에 날짜·원문과 함께 있음(예: `agents/pln/specs/2026-11-09_reel-automation.md`:6-24). 개선을 말하기 전에 그 칸부터 봄 — 화면 조작을 쓰기로 한 것도, CapCut 일원화도 운영자 결정이었음. — 근거: studies/2026-11-19-no-computer-use.md 1번
- 2026-11-19 00:32 KST — 이 PC의 Bash에서 heredoc으로 넘긴 파이썬 글 안에 `C:\Users` 같은 윈도 경로가 있으면 `\U` 오류로 스크립트 전체가 안 돎(역슬래시를 두 번 써도 같았음, 두 번 겪음). 경로가 든 글은 스크립트로 끼워 넣지 말고 파일 쓰기 도구로 직접 씀. — 근거: logs/2026-11-18-owner-research-order.md, 커밋 1dba8dd
- 2026-11-18 22:15 KST — 파일을 고치는 스크립트가 오류로 멈춰도 뒤따르는 커밋은 그대로 나감(22:14에 CURRENT·knowhow가 안 고쳐진 채 기록만 올라가 바로 다음 커밋으로 채움). 고친 뒤 `git diff --stat`으로 바뀐 파일을 보고 커밋함. — 근거: 커밋 1dba8dd와 그다음 커밋
- 2026-11-19 00:37 KST — 글에 시각을 적을 때 "방금 본 시각 + 몇 분"으로 짐작하지 않음. 00:35에 한 일을 00:36·00:37로 적어 한알의 다음 말씀(00:36:17)보다 뒤처럼 보이게 됐음. 적기 바로 전에 시계를 보고, 못 봤으면 커밋 시각으로 맞춤(AGENTS.md 6). — 근거: logs/2026-11-19-research-and-recommendations.md 덧붙임
- 2026-11-19 00:52 KST — 개선이나 건의를 쓰기 전에 제품 저장소의 요구사항 본문부터 끝까지 읽음: rsch `research/`·`templates/`, pln `specs/` 본문, 총괄 `requests/`(운영자 말씀이 시각 순으로 있음). 머리말·결정 칸만 보고 건의를 썼다가, 이미 요구사항에 있던 길(맥이 직접 만들기 — "목소리가 CapCut과 다름" 단서까지)을 새로 찾은 것처럼 쓰고 순서를 거꾸로 건의함. 한알이 "요구사항 읽으셨나요?"로 짚으심. — 근거: studies/2026-11-19-requirements-read.md
- 2026-11-19 08:59 KST — 제품 웹앱은 윈도에서도 그대로 켜짐(파이썬만 있으면 됨). 시험 폴더로 돌리는 값: `WEBAPP_ENV_FILE` · `WEBAPP_DATA_DIR` · `WEBAPP_CONFIG_DIR` · `CAPCUT_DRAFTS_DIR` · `WEBAPP_HOST=127.0.0.1` · `WEBAPP_PORT` · `WEBAPP_TICK_SECONDS=0`(주기 확인은 맥 전용 명령을 부를 수 있어 끔) · `PYTHONDONTWRITEBYTECODE=1`(저장소에 캐시 파일을 남기지 않게). 시험 작업은 `jobs.py new` → `intake.md`·`script.md`를 쓰고 `jobs.py set <작업> <단계> <상태>`. 끌 때는 그 포트를 듣는 프로세스를 찾아 끔. — 근거: logs/2026-11-19-webapp-improvement.md
- 2026-11-19 08:59 KST — 화면을 볼 때: Paseo 브라우저 창은 뒤에 떠서 그림(screenshot)이 "아직 그려지지 않음"으로 실패함. 글자·구조는 snapshot과 evaluate(innerText)로 받을 수 있음. 로그인이 필요 없는 정적 HTML은 Edge를 화면 없이 띄워 그림으로 찍을 수 있음(`msedge --headless=new --screenshot=<파일> --window-size=390,1500 file:///…`). — 근거: 같은 기록
- 2026-11-19 08:59 KST — 남의 저장소를 볼 때 README의 Status부터 봄. OpenCut은 말씀하신 저장소가 '다시 쓰는 중인 뼈대'였고, 실제 편집기는 README가 가리키는 다른 저장소(옛 판)에 있었음. 큰 저장소는 하위 에이전트에게 물음을 나눠 읽히고, 판단에 쓰는 주장만 코드에서 다시 확인해 ✔로 표시함. — 근거: studies/2026-11-19-opencut.md
