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
- (2026-11-19 09:10 KST) 한알께 드리는 보고는 **결론 한 줄 → 할 일 몇 가지(순서대로) → 정해 주실 것**만 적는다. 조사한 것을 다 늘어놓지 않는다(알게 된 사실 목록·확인 못 한 것·커밋 번호는 글 파일에 두고, 물으시면 답함). 긴 보고에 "너무 말이 정리가 안되네요"(09:10:22 uuid 9578717a), 앞서도 "다시 쉽게 정리해주세요"라고 하셨음.
- (2026-11-19 14:44 KST) 세션이 바뀌면 transcript 파일도 바뀐다 — 같은 폴더에서 가장 최근에 고쳐진 `.jsonl`이 지금 세션의 것(파일 이름 = Claude 세션 ID). 긴 파일이라 통째로 읽지 말고 type=user 줄에서 찾는 말만 걸러 본다. 윈도 파이썬으로 한글을 찍을 때는 `sys.stdout.reconfigure(encoding='utf-8')`를 먼저 부른다(안 그러면 cp949 오류).
- (2026-11-19 14:44 KST) 한알이 "~에 주세요", "여세요"라고 하시면 글만 써 두라는 뜻이 아니라 **실제로 열고 넣으라**는 뜻이다. 이 PC의 Paseo 브라우저에는 ChatGPT가 로그인되어 있다(Pro 플랜). 파일 붙이기는 `browser_upload`로 되는데, 이 작업 폴더 안의 파일만 받고, 숨은 파일 입력칸은 잠깐 보이게 해야 ref가 잡힌다. 상태(한도 등)를 말하기 전에는 그 창(사용량)을 열어 숫자를 확인한다.
- (2026-11-19 21:18 KST) 토큰이 크게 드는 까닭은 프로젝트의 크기가 아니라 **한 세션을 오래 끌어 대화가 쌓인 것**이다. 모델을 한 번 부를 때마다 그때까지의 대화 전체를 다시 읽는다. 옛 세션(11-18 21:54 ~ 11-19 14:4x): 부름 266번 · 읽은 토큰 9,450만(쓴 토큰 41만) · 시작 3.4만 → 가장 클 때 76만. 20만을 넘긴 뒤의 부름 180번이 전체의 89%, 60만을 넘긴 뒤의 63번이 45%. "진행하세요" 한 말씀(51번 부름)이 3,480만. 60만일 때는 짧은 답 하나(적기·시계·커밋 3번 부름)에도 180만이 듦. 줄이는 법: ① 일 한 덩이가 끝나면 CURRENT.md에 적고 새 세션으로 넘김(대화가 20만쯤 되기 전에) ② 말씀 적기·시계·add·커밋·push를 명령 하나로 묶음 ③ 큰 읽기(남의 저장소·웹·긴 파일)는 하위 에이전트에게 맡기고 결론만 받음 ④ 파일은 필요한 줄만 읽음. — 근거: 두 세션 transcript의 usage 값을 더함(하위 에이전트 10개의 몫은 따로라 넣지 않음), owner/utterances/2026-11-19.md 21:17:28 줄
- (2026-11-19 21:54 KST) AAA 규칙 판은 이 PC의 dev/AAA 폴더 맨 위 AGENTS.md(v0.14, 92줄)에 있다(읽기만). 세션·역할·SUB를 다루기 전에 먼저 본다 — 이름(10: SUB는 PRIMARY 이름 뒤에 /S번호_일, 끝난 세션은 뒤에 CLOSED), 역할 트리(5: PLN > RSCH · ARCH > PMO), 여는 이(13), 작업 칸(20), SUB 개설 패킷(40). 도메인별 역할 등록부의 본보기는 같은 폴더의 domains/rhs/ROLES.md. 하위 세션 이름을 스스로 지어 붙였다가 한알이 "Aaa의 규칙을 참조하세요"(21:52:02 uuid 099449aa)라고 하심. — 근거: logs/2026-11-19-sub-sessions.md
- (2026-11-20 04:24 KST) 화면 시안(HTML)을 썼으면 **그림으로 찍어 눈으로 본 뒤** 낸다 — 글로만 보면 겹침과 잘림을 못 찾는다(탭 안의 빨간 점이 막대로 뭉개진 것, 아래 단추가 잘린 것을 그림에서야 찾음). Paseo 브라우저 탭이 안 열릴 때는 이 PC의 Edge를 창 없이 띄운다: `msedge --headless=new --disable-gpu --hide-scrollbars --user-data-dir=<임시 폴더> --window-size=1230,880 --screenshot=<png> file:///<html>`. 긴 쪽은 한 번에 안 찍히므로 몇 장씩만 보이게 한 임시 복사본을 저장소 밖(TEMP의 rsch_scratch 폴더)에 만들어 나눠 찍는다. 이 PC의 파이썬에는 PIL이 없다.
- (2026-11-20 04:24 KST) 제품 저장소의 긴 파일(화면 HTML · 기획서 여럿)은 읽기만 하는 보조(Explore)에게 **무엇을 알고 싶은지 번호로 적어** 맡기면 줄 번호와 함께 돌아온다 — 다만 그 보고로 쓴 곳은 글에 "내가 직접 읽지 않음"이라고 적는다.
- (2026-11-20 04:24 KST) Bash에서 백틱이 든 글을 heredoc으로 붙일 때는 구분자를 따옴표로 감싼다(`<<'EOF'`) — 안 그러면 백틱을 명령으로 읽어 "bad substitution"으로 실패하고, 그 뒤 줄은 그대로 실행된다(붙이기는 실패했는데 커밋은 된 일이 있었음). 시각은 자리표를 써 두고 sed로 바꾼다.
- (2026-11-20 13:57 KST) 다른 세션에 알림을 보낸 시각 · 한알께 답한 시각을 **짐작으로 적지 않는다**(CURRENT에 13:57 · 13:58로 적었으나 실제는 13:55:38 · 13:57 — 커밋 3ba490e의 글에도 틀린 시각이 남음, 이력은 고치지 않음). 확인하는 법: 보낸 시각은 transcript(.jsonl)에서 send_agent_prompt 결과의 messageId로 줄을 찾아 timestamp + 9시간, 커밋 시각은 `git log --date=format:'%H:%M:%S'`. 적기 전에 시계를 한 번 더 본다. — 근거: 이 칸 CURRENT ★★★★★ 13:50:27 줄의 바로잡음
- (2026-11-20 18:21 KST) **이 PC의 Git Bash에서 `TZ=Asia/Seoul date`는 한국 시각이 아니라 UTC를 낸다**(18:20에 '09:20'이 CURRENT에 들어감). 한국 시각은 PowerShell `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'Korea Standard Time')`로 보고, 커밋 시각은 `TZ=Asia/Seoul git log -1 --date=format-local:%H:%M:%S --format=%cd`로 본다(git은 맞게 냄). 시각을 글에 넣는 명령은 넣은 값을 한 번 grep으로 확인한다.
- (2026-11-20 19:07 KST) **이 PC의 Bash 도구에서 `grep -c $'\r'`는 CR이 없어도 줄 수를 낸다**(CR 세기가 엉터리로 나와 'PMO 파일이 CRLF'로 잘못 볼 뻔함). 줄 끝은 `python -I -c "...open(p,'rb').read().count(b'\r')"`나 `git ls-files --eol`로 센다. 맥과 같은 조건의 패치 확인은 `git clone -c core.autocrlf=false` 사본에서 `git apply --check`(이 PC 시스템 설정은 autocrlf=true).
- (2026-11-20 21:30 KST) **한알이 '자료가 들어왔다'고 하시면, 말씀이 올 때마다 이 저장소를 먼저 `git fetch`로 다시 본다**(그 사이에 들어올 수 있음). 21:04에 한 번 보고 없다고 여겨 제품 저장소 · PC 폴더 · Claude Docs만 뒤졌는데, 자료는 21:11:54에 이 저장소 `studies/`로 들어와 있었다(push가 막혀서야 앎 — 커밋 4659695의 '자료 못 찾음(링크 여쭘)'은 틀림). push가 막히면 `pull --rebase` 전에 `git log HEAD..origin/main --stat`으로 무엇이 들어왔는지 먼저 본다.
- (2026-11-20 21:42 KST) **파이썬 소스(heredoc)에 Windows 경로를 `\`로 넣지 않는다 — 두 번째 실패**(16:28에 이어 21:4x에 `\U`로 SyntaxError). Bash 도구에 보내는 글에서 `\`는 `\` 하나가 되므로, 파이썬 문자열 안의 경로는 늘 `C:/Users/...`(앞으로 빗금)로 쓴다. 고치는 스크립트는 `ast.parse`로 문법을 먼저 본다.
- (2026-11-20 21:42 KST) **'못 함'이라는 주장(남의 자료 · 내 첫 읽기)은 돌려 볼 수 있으면 돌려서 확정한다.** OpenChatCut의 `occ media`가 목록만이라 자료도 나도 '명령줄로 소재 넣기 안 됨'이라고 적었으나, 정책 파일 · 도구 목록(`occ tools ls`)을 보니 `import_folder`가 창 없이 도는 도구였고 실제로 넣어졌다. 명령 하나의 도움말보다 도구 목록 · 정책 파일이 더 정확하다.
