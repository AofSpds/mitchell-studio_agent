# SUB 개설 패킷 — MITCHELL_STUDIO/BTSR/RSCH/S5_MAC_TEST (맥북 시험 지시문 · 판 2 — OpenChatCut 메인)

> **⓪ 네 작업 폴더가 `~/oc-test`가 아니면(예: 제품 저장소의 Creative Director 창) — 시험을 직접 하지 말고 아래만 하고 끝낸다** (한알 11-21 02:04 「아 타자 치기기 힘들어요.」 — 한알님이 치시는 글을 줄이려고):
> 1. 이 글 전체를 `~/oc-test/OPEN_PACKET.md`로 저장한다(받은 그대로).
> 2. 아래 칸을 통째로 돌린다 — 새 터미널 창이 열리고 `~/oc-test`에서 Claude Code(Sonnet)가 이 글을 받아 시작한다.
> 3. 한알님께: "새 창에서 '이 폴더를 믿을까요?'가 나오면 Enter만 누르세요. 그 뒤로는 새 창이 합니다. 이 창은 쉬어도 됩니다."
> - 이 창은 제품 저장소 · 웹앱 · `~/mitchell_branches`를 건드리지 않는다(기록이 필요하면 '맥 시험을 새 창으로 넘김' 한 줄).
>
> ```zsh
> mkdir -p ~/oc-test && { echo '#!/bin/zsh'; echo 'cd ~/oc-test && exec claude --model sonnet "$(cat ~/oc-test/OPEN_PACKET.md)"'; } > ~/oc-test/start.command && chmod +x ~/oc-test/start.command && open -a Terminal ~/oc-test/start.command
> ```

> **맥의 에이전트에게:** 이 글 전체가 네 일이다. 1~3번을 읽고 4번 A0부터 차례로 시작해라. **A(OpenChatCut)가 오늘의 핵심이고, B(OpenCut 옛 판)는 A가 끝난 뒤 한알님이 하자고 하실 때만** 한다. 화면 · 아이폰 단계는 한알님께 말로 부탁하고 기다려라.

| 칸 | 값 |
|---|---|
| 연 이 | PRIMARY `MITCHELL_STUDIO/BTSR/RSCH` — 한알님의 윈도 PC · Paseo 7993ff28 · Opus 5.5 · Max |
| SUB | `MITCHELL_STUDIO/BTSR/RSCH/S5_MAC_TEST` |
| 실행기 | **맥북의 Claude Code**(터미널에서 `claude`). 안 되거나 쓸 양이 떨어지면 **같은 글을 ChatGPT(Codex)에** 붙임(그때 A8은 건너뜀). **둘을 같이 돌리지 않음**(같은 폴더 · 포트를 씀) |
| 자기 칸 | 맥의 `~/oc-test/` — 어느 git 저장소에도 쓰지 않음 |
| 돌려줄 것 | `~/oc-test/out/RESULTS.md`(5번 꼴) → 한알님이 RSCH 창에 붙임 → RSCH가 이 칸 `반환.md`로 커밋 |
| 주고받는 길 | 이 SUB와 RSCH는 직접 주고받지 못함(이 PC의 Paseo에 맥이 없음 — 11-21 00:49에도 확인). **물음은 모두 한알님께.** |
| 쓴 때 | 판 1: 2026-11-20 19:00 KST(OpenCut만). **판 2: 2026-11-21 01:24 KST — OpenChatCut을 메인(A)으로, OpenCut은 덤(B)으로.** A의 명령은 RSCH가 이 PC(윈도)에서 같은 차례로 먼저 돌려 봄(경로 · 받는 파일만 맥용으로 다름 — 맥에서 돌려 본 적은 없음). 명령 칸은 `bash -n`으로 문법 확인 |

## 근거 (한알 말씀, 원문 그대로 — `owner/utterances/2026-11-20.md` · `2026-11-21.md`)

- 11-20 09:40:13 「실테스트는 맥북에서 오늘 저녁에 진행합니다」
- 11-20 11:02:25 「아 그건 괜찮아요. 그 외에 맥북 원래 사용자가 인증이 필요한 항목이 있을까요」 — 맥북에 Bun 설치 허락으로 읽음
- 11-20 13:50:27 「Pmo가 합니다. / 네 설치하세요 / Https 반드시 켜야 하나요」 — OpenCut 시험 코드는 PMO(제품 가지 `test/opencut-classic-20261120` 커밋 c2d21a6)
- 11-20 16:27:42 「제가 맥북을 빌려온 상황이고 잠금이나 이런건 할수 있어요. …」
- 11-20 18:50:27 「맥북에도 클로드 챗지피티 있어요. / 인지하고 작업하신거죠? / 지시문 다 써서 푸시하세요」
- 11-20 21:31:49 「네 여기도 설치해서 확인해바도 됩니다.」 — 다음 맥북 시험에 Node 24 · OpenChatCut을 까는 허락(오9) + 윈도 PC에서 RSCH가 먼저 확인
- **11-21 01:02:23 「맥시험에 당연히 오픈챗컷이 들어가야 하고 그게 메인이었으면 해요.」**

---

## 0. 한알님이 하실 것

**시작 (5분)**

긴 주소는 치지 않으셔도 됩니다 — 눌러서 찾아갑니다(11-21 01:50 「주소를 제가 치기 힘들어요.」).

1. 맥 Safari에서 **개인 정보 보호 창**(⇧⌘N) → 주소창에 **`github.com`**만 치고 → 로그인.
2. 왼쪽 저장소 목록에서 **mitchell-studio_agent**를 누름(안 보이면 목록 위 칸에 `agent`).
3. 저장소 화면에서 키보드 **t**(또는 'Go to file' 단추) → **`s5_mac`** 침 → **`…/s5_mac_test/OPEN_PACKET.md`**를 누름 → 이 글이 열림.
4. 아래 상자 오른쪽의 **복사 단추**(겹친 네모)를 누름 → **터미널**을 열고 붙여 넣고(⌘V) Enter → Claude Code가 뜸(처음이면 '이 폴더를 믿을까요?' → 예).

   ```
   mkdir -p ~/oc-test && cd ~/oc-test && claude
   ```

5. Safari로 돌아와 오른쪽 위 **'Raw'** → 전체 선택(⌘A) → 복사(⌘C) → 터미널의 Claude Code에 붙여 넣고(⌘V) Enter.

   - 주소를 바로 여실 수 있으면: `https://github.com/AofSpds/mitchell-studio_agent/blob/main/projects/btsr/roles/rsch/sub/s5_mac_test/OPEN_PACKET.md`
   - ChatGPT(Codex)로 할 때: Codex에서 작업 폴더를 `~/oc-test`로 고르고 똑같이 붙여 넣음.
   - **제품 저장소 폴더에서 띄우지 마세요** — 거기서는 예전 역할 설정이 먼저 읽힙니다.

**얼마나 걸리나 [추측]:** A(OpenChatCut) 40분 안팎 — 그중 한알님 손이 드는 것은 A7(편집기에서 몇 가지 고치기 10분)과 A8(보기 2분). B(OpenCut 옛 판)는 1~2시간 더 — 늦으면 다음에 하셔도 됩니다.

**하는 동안**

- 에이전트가 허락을 물으면 내용을 보고 '예'. 설치 · 지우기 · 암호를 묻는 것은 이 글 2번에 적힌 것인지 보고 정하세요.
- 에이전트가 "화면에서 ○○를 눌러 주세요"라고 하면 그대로 해 주세요. 에이전트는 화면을 대신 누르지 않습니다.
- **OpenChatCut 편집기에서 누르지 않을 것:** 'Claude / Codex / Cursor 연결(Connect)' 단추, AI 채팅 · 목소리 · 그림 · 영상 만들기, 키 넣는 설정 칸, 올리기 · 내려받기. (키가 없고, 맥의 설정 파일을 고치거나 소재가 바깥으로 나갈 수 있음.)
- '들어오는 네트워크 연결을 허용할까요?' 창이 뜨면 **'거부'**를 눌러도 됩니다(이 맥 안에서만 씀). 무엇이 떴는지는 에이전트에게 말해 주세요.
- B를 하시면: 아이폰 사용자께는 시험 중에 연락하시면 됩니다 — **에이전트가 B7을 마치면 "이제 연락하실 때"라고 알려 드립니다**(캡처 두 장 · HTTPS 켜기 · 벽 영상 · 통화를 한 번에).
- 에이전트의 쓸 양이 떨어지면: Codex를 `~/oc-test`에서 열고 이 글을 붙인 뒤 "RESULTS.md를 먼저 읽고 이어서 해"라고 하세요.

**끝**

- 에이전트가 `~/oc-test/out/RESULTS.md`를 다 쓰면 그 내용을 RSCH 창에 붙여 주세요(옮기는 길은 편하신 대로).
- 개인 정보 보호 창을 닫으세요.

---

## 1. 너(맥의 에이전트)는

- 미용실 릴스(세로 짧은 영상 — MP4 · 1080×1920 · 30fps)를 만드는 웹앱 '미첼 스튜디오'가 이 맥에서 돈다. 지금 영상은 캡컷으로 만든다. 그 자리를 오픈소스 편집기로 바꿀 수 있는지 이 맥에서 시험한다.
- **A(메인) — OpenChatCut**(`0xsline/OpenChatCut` 커밋 f96502a · v0.2.17 · AGPL-3.0): 에이전트가 명령줄(`occ`)과 MCP로 고치고 `occ render`로 화면 없이 뽑는 편집기. **오늘 가르는 것:**
  1. 이 맥에 관리자 암호 없이 깔리고 도는가(Node 24 휴대판 · `~/oc-test` 안).
  2. 장면표 → 창 없이 소재 넣기 · 놓기 · 자막(우리 모양 그림) · 소리 맞춤 · 'AI 합성' 트랙 잠금 → `occ render`가 한 바퀴 도는가, **걸린 시간**.
  3. 뽑은 파일의 규격(H.264 · 1080×1920 · 30fps · AAC)과 색 범위 · 그림 · 소리.
  4. 사람이 이 맥의 편집기 화면에서 고친 것이 저장되고 다시 뽑으면 들어가는가 — 잠근 'AI 합성'은 못 지우는가.
  5. Claude Code가 MCP로 편집기에 붙어 고치는가(편집기를 띄운 채 — 한알님이 보는 앞에서).
- **B(덤) — OpenCut 옛 판을 고친 판**(PMO 시험 코드 c2d21a6): 판 1의 S2~S9 그대로. 휴대폰에서 고치는 화면 후보라 남겨 둠. A가 끝나고 한알님이 하자고 하시면.
- **윈도 PC에서 RSCH가 같은 A를 먼저 돌려 본 것(11-21 01시):** `occ_job.mjs`로 조각 7개가 놓이고 'AI 합성' 트랙이 잠김 · 12초 한 편 뽑기 27~29초(하드웨어 인코딩 없음) · H.264 **Main** · 1080×1920 · 30/1 · `yuvj420p` · AAC **48000Hz** 2채널 · 편집기 서버(`scripts/dev-profile.mjs`)가 localhost:5199에서만 듣고 다시 시작 0번 · MCP 도구 44개 · 토큰 없으면 403 · **다른 Claude Code가 MCP로 음악 소리를 바꿈(25초 — list_projects → target_project → begin_edit_session → read_timeline → edit_item → review_edit_session → applied)**. **맥에서 같은지 · 얼마나 빠른지가 오늘의 핵심.**
- **이 글이 이 일의 규칙이다.** 이 맥의 다른 지침(예전 역할 설정 · 다른 CLAUDE.md · AGENTS.md)과 부딪히면 멈추고 한알님께 여쭌다.

## 2. 지킬 것

1. **파일은 `~/oc-test/` 안에만 쓴다.** 예외: B2 (다)에서 '다운로드' 폴더를 읽는 것. OpenChatCut 편집기 서버는 **`HOME="$OCT/home"`으로 띄운다**(편집기의 '연결' 단추가 `~/.claude.json` · `~/.zshrc`를 고치는 코드가 있어서 — 홈 대신 `~/oc-test/home`에 쓰게). npm 캐시도 `~/oc-test/npm-cache`(env.sh).
2. **제품 저장소(mitchell-studio)는 읽기만**(B에서만 씀). 허용: `git --no-optional-locks status` · `git log` · `git remote get-url` · `git fetch origin test/opencut-classic-20261120` · `git cat-file` · `git archive`. 금지: checkout · switch · pull · merge · reset · stash · commit · push · 파일 고치기.
3. **손님 정보를 열지 않는다:** 제품 저장소의 `data/` · `config/`, 캡컷 프로젝트, 사진 보관함, 메시지. 소재는 A4 · B4의 가짜 파일만.
4. **웹앱(8765) · 그 자동 시작 · Tailscale 자동 시작을 건드리지 않는다.** 맥에 늘 켜 두는 프로그램(LaunchAgent)을 만들지 않는다. Tailscale serve는 B8에서 8443만 켜고 끈다(`serve reset` 금지).
5. **설치(받기)는 이것만, 모두 `~/oc-test` 안:** (A) Node 24.22.3 휴대판 · ffmpeg 휴대판(ffmpeg-static b6.1.1) · 글꼴 Noto Sans KR — 셋 다 sha256 대조 · OpenChatCut f96502a와 그 꾸러미(`npm install`) · 첫 뽑기 때 OpenChatCut이 꾸러미 폴더 안에 저절로 받는 Chrome Headless Shell. (B) Bun 1.2.18(한알 허락 11-20 11:02:25) · 고친 판의 꾸러미(`bun install`). Chrome이 없을 때만 한알님께 여쭌 뒤 Chrome for Testing을 `~/oc-test/browsers`에. `brew` · `sudo` · 앱스토어 · `npm -g`를 쓰지 않고, `~/.zshrc` 등 셸 설정을 고치지 않는다.
6. **화면 조작(마우스 · 키보드를 대신 누르기 · 화면 찍기)을 하지 않는다** — AAA 규칙 43, 한알님 허락 없음. 화면 단계는 한알님께. (뽑은 그림 파일을 열어 읽고 `open`으로 한알님께 보여 드리는 것은 됨.)
7. **남의 코드는 고치지 않는다**(OpenChatCut 소스 · PMO 코드). 막히면 오류를 그대로 적고 한알님께. 허용되는 고침은 하나 — B8에서 시험 사본 `~/oc-test/opencut-mitchell/apps/web/next.config.ts`에 `allowedDevOrigins` 한 줄.
8. **진짜 키 · 비밀 값을 넣지 않는다.** OpenChatCut의 AI 기능(채팅 · 목소리 · 그림 · 받아쓰기)은 쓰지 않는다. MCP 토큰은 A7에서 이 맥 안에서 만든 임시 값 — `~/oc-test/mcp.token`에만 두고 **화면 · RESULTS.md에 찍지 않는다.**
9. **바깥에 올리지 않는다:** push · gist · 새 저장소 · 파일 공유 없음.
10. **RESULTS.md에 적지 않는 것:** 맥 사용자 이름이 든 경로(`/Users/…` 대신 `~`로 고쳐 적음 — 명령이 찍는 JSON의 경로도), Tailscale 주소 전체와 IP(`mitchell.<tailnet>.ts.net`처럼 가림), GitHub 계정 이름 · 저장소 원격 주소, 손님 정보, 키 · 토큰 · 비밀 값.
11. **시각은 한국 시각** — A0의 `kst`로 그 자리에서 찍는다. 짐작해서 적지 않는다.
12. 오래 걸리는 명령(받기 · `npm install` · `bun install` · 뽑기)은 시간 제한을 넉넉히(10분). 서버처럼 계속 도는 것은 `nohup … &`로 띄우고 PID를 `~/oc-test/*.pid`에 적는다.
13. 셸 변수는 명령마다 사라질 수 있으니 **명령마다 맨 앞에 `source ~/oc-test/env.sh`**. **코드 칸 하나는 통째로 한 번에 돌린다**(칸 안에서 만든 변수가 이어지게).
14. 끝난 단계마다 RESULTS.md를 바로 고친다(중간에 끊겨도 남게). **이어서 할 때는 RESULTS.md를 먼저 읽고 끝난 단계는 건너뛴다.**
15. **`git`이나 `/usr/bin/python3`를 부르기 전에 `xcode-select -p`로 개발 도구가 있는지 본다** — 없으면 '설치하시겠습니까' 창이 뜬다. A는 git · python을 쓰지 않는다(JSON은 `node`로 읽음).

## 3. 멈추고 한알님께 여쭐 때

- 암호 · 키체인 · 로그인 · 관리자 허락 · '개발 도구 설치' 창이 뜰 때 — 무엇이 떴는지 그대로 말씀드린다.
- 2번 밖의 일이 필요할 때(설치 · 고치기 · 지우기).
- 포트 5199 · 3000 · 3417 · 3418 · 8443 · 9222를 이미 누가 쓰고 있을 때 — 그 프로그램을 끄지 않는다.
- sha256이 맞지 않을 때 — 받은 파일을 쓰지 않는다.
- 같은 단계가 두 번 실패할 때 — 오류 끝 20줄을 RESULTS.md에 적고 다음으로 갈지 여쭌다.
- 빈 디스크가 8GB보다 적을 때(A 약 3GB · B 약 3GB).
- (B) 제품 저장소 자리를 못 찾거나 둘 이상일 때.

---

## 4. 차례

**A0~A9가 오늘의 핵심.** 다 못 하면 이 차례대로 한다(A6까지가 가장 중요). A가 끝나면 한알님께 "B(OpenCut 옛 판)를 이어서 할까요? 1~2시간 걸립니다"라고 여쭙고, 하자고 하시면 B1~B8, 아니면 Z(되돌리기)로.

### A0. 준비 파일 · 시각

```zsh
mkdir -p ~/oc-test/out && cat > ~/oc-test/env.sh <<'EOF'
# 시험 환경 — 명령마다 맨 앞에서: source ~/oc-test/env.sh
export OCT="$HOME/oc-test"
if [ "$(uname -m)" = arm64 ]; then export ARCH=arm64 BUNDIR="$OCT/bun/bun-darwin-aarch64"; else export ARCH=x64 BUNDIR="$OCT/bun/bun-darwin-x64"; fi
export NODEDIR="$OCT/node/node-v24.22.3-darwin-$ARCH"
export PATH="$NODEDIR/bin:$BUNDIR:/opt/homebrew/bin:$PATH"      # Node 24 휴대판이 먼저
export npm_config_cache="$OCT/npm-cache" npm_config_update_notifier=false npm_config_fund=false npm_config_audit=false
# A — OpenChatCut
export OCC_DIR="$OCT/OpenChatCut"
export OPENCHATCUT_DATA_DIR="$OCT/occ-data"                     # 프로젝트 · 소재 저장 자리(홈의 ~/.openchatcut 대신)
export FF="$OCT/bin/ffmpeg"
export FONT="$OCT/fonts/NotoSansKR-VF.ttf"
export OJ="$OCT/occ-job1"                                       # 가짜 작업 폴더(A)
occ() { (cd "$OCC_DIR" && node --import tsx cli/main.ts "$@"); }
# B — OpenCut 옛 판(덤)
export OT="$OCT/ms-test/app/opencut-test"                       # PMO 시험 코드
export A="http://127.0.0.1:3417"                                # 고친 판 서버
export J="$OCT/job1"                                            # 가짜 작업 폴더(B)
[ -f "$OCT/chrome.path" ] && export CH="$(cat "$OCT/chrome.path")"
[ -f "$OCT/repo.path" ] && export R="$(cat "$OCT/repo.path")"
kst() { TZ=Asia/Seoul date '+%Y-%m-%d %H:%M:%S KST'; }
EOF
source ~/oc-test/env.sh && kst
```

- 5번 꼴로 `~/oc-test/out/RESULTS.md`를 만들고 시작 시각 · 돌린 이(Claude Code / Codex)를 적는다.

### A1. 맥 확인 · 잠자기 막기

```zsh
source ~/oc-test/env.sh
sw_vers; uname -m; df -h ~ | tail -1
command -v node >/dev/null && echo "원래 node: $(node -v)" || echo "원래 node 없음"
xcode-select -p >/dev/null 2>&1 && git --version || echo "개발 도구 없음 — git 안 부름(A는 git이 필요 없음)"
command -v ffmpeg >/dev/null && echo "Homebrew ffmpeg 글자 그리기: $(ffmpeg -hide_banner -filters 2>/dev/null | grep -c drawtext)" || echo "Homebrew ffmpeg 없음(괜찮음 — A2에서 휴대판)"
lsof -tiTCP:8765 -sTCP:LISTEN >/dev/null && echo "웹앱 켜짐" || echo "웹앱 꺼짐"      # 적기만, 건드리지 않음
for p in 5199 3000 3417 3418 8443 9222; do lsof -nP -iTCP:$p -sTCP:LISTEN; done; echo "포트 확인 끝 — 위에 아무것도 없어야 함"
[ -e ~/.openchatcut ] && echo "주의: ~/.openchatcut 이미 있음(건드리지 않음)" || echo "~/.openchatcut 없음"
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$HOME/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"; do [ -x "$c" ] && { printf '%s' "$c" > "$OCT/chrome.path"; break; }; done
source ~/oc-test/env.sh; echo "CH=$CH"; [ -n "$CH" ] && "$CH" --version
```

```zsh
source ~/oc-test/env.sh; nohup caffeinate -dims > /dev/null 2>&1 & echo $! > ~/oc-test/caffeinate.pid
```

- Chrome이 없어도 A는 된다(A7 편집기는 Safari로). B에서 Chrome이 필요하면 그때 여쭘.

### A2. 받기 — Node 24 · ffmpeg · 글꼴 (sha256 대조, `~/oc-test` 안)

```zsh
source ~/oc-test/env.sh && mkdir -p "$OCT/node" "$OCT/bin" "$OCT/fonts" && cd "$OCT"
case $ARCH in arm64) WN=ff6e17d4874b76d272212b908cc020d6e815fba5a6c7eaaa06add725840307fd; WF=8923876afa8db5585022d7860ec7e589af192f441c56793971276d450ed3bbfa;; x64) WN=977614af0504c81045e7fd85596dbca0e5f951b96681516dadafedcca8c447f7; WF=929b375c1182d956c51f7ac25e0b2b0411fb01f6f407aa15c9758efeb4242106;; esac
curl -fsSL -o node.tgz "https://nodejs.org/dist/v24.22.3/node-v24.22.3-darwin-$ARCH.tar.gz"
[ "$(shasum -a 256 node.tgz | cut -d' ' -f1)" = "$WN" ] && echo "node sha256 맞음" && tar -xzf node.tgz -C "$OCT/node" && rm node.tgz
curl -fsSL -o ff.gz "https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-darwin-$ARCH.gz"
[ "$(shasum -a 256 ff.gz | cut -d' ' -f1)" = "$WF" ] && echo "ffmpeg sha256 맞음" && gunzip -c ff.gz > "$FF" && chmod +x "$FF" && rm ff.gz
curl -fsSL -o "$FONT" "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanskr/NotoSansKR%5Bwght%5D.ttf"
curl -fsSL -o "$OCT/fonts/OFL.txt" "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanskr/OFL.txt"
[ "$(shasum -a 256 "$FONT" | cut -d' ' -f1)" = 194018e6b2b293a7964f037b25c0249ce1418bc9ab3c971060a03aa57861e252 ] && echo "글꼴 sha256 맞음"
```

```zsh
source ~/oc-test/env.sh; command -v node; node -v; npm -v; "$FF" -hide_banner -version | head -1; echo "글자 그리기: $("$FF" -hide_banner -filters 2>/dev/null | grep -c drawtext)"
```

- `node`가 `~/oc-test/node/…/bin/node` · v24.22.3이어야 한다. 글자 그리기 1이어야 한다(arm64 휴대판은 FFmpeg 6.0 — 그래서 변환기는 줄마다 따로 그림).
- sha256 '맞음'이 안 찍히면 멈추고 여쭘(받은 파일을 쓰지 않음). 글꼴 저장소가 바뀌어 sha256만 다르면 그 값을 적고 여쭘.

### A3. OpenChatCut 받기 · 꾸러미

```zsh
source ~/oc-test/env.sh && cd "$OCT"
SHA=f96502a18e65a09c19324b10feb671bb505056bd
curl -fsSL -o occ.tgz "https://codeload.github.com/0xsline/OpenChatCut/tar.gz/$SHA" && tar -xzf occ.tgz && mv "OpenChatCut-$SHA" OpenChatCut && rm occ.tgz
cd "$OCC_DIR" && node -p "require('./package.json').version + ' · node 조건 ' + require('./package.json').engines.node"
S=$(date +%s); npm install > "$OCT/out/occ-npm-install.log" 2>&1; echo "npm install 끝 코드 $? · $(( $(date +%s) - S ))초"; grep -E "^added|install scripts" "$OCT/out/occ-npm-install.log"
```

```zsh
source ~/oc-test/env.sh; occ where --json; occ tools ls --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const d=JSON.parse(s);const L=Array.isArray(d)?d:(d.tools||[]);console.log('창 없이 쓰는 도구', L.length, '개')})"
```

- `0.2.17`이 찍혀야 한다. `npm install`은 윈도에서 53초 · 847꾸러미였다. 끝에 '…install scripts not yet covered by allowScripts' 경고가 나오는 것은 정상(새 npm이 설치 스크립트를 막음 — 윈도도 같았고 그대로 돌았음). **`npm install-scripts approve`는 하지 않는다.**
- `occ where`의 저장 자리가 `~/oc-test/occ-data`여야 한다(아니면 멈추고 여쭘). 도구 39개 안팎.

### A4. 가짜 작업 만들기 (손님 소재 없음)

```zsh
source ~/oc-test/env.sh && mkdir -p "$OJ/src" && cd "$OJ/src"
"$FF" -hide_banner -loglevel error -y -f lavfi -i testsrc2=size=1080x1920:rate=30 -f lavfi -i sine=frequency=880:sample_rate=48000 -t 10 -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest after.mp4
"$FF" -hide_banner -loglevel error -y -f lavfi -i testsrc=size=1080x1440:rate=1 -frames:v 1 ai_face.png
"$FF" -hide_banner -loglevel error -y -f lavfi -i sine=frequency=220:sample_rate=48000:duration=10 voice1.wav
"$FF" -hide_banner -loglevel error -y -f lavfi -i sine=frequency=330:sample_rate=48000:duration=30 -ac 2 music.wav
ls -la
cat > "$OJ/scenes.json" <<'EOF'
{
  "job": "fixture",
  "canvas": { "width": 1080, "height": 1920, "fps": 30 },
  "length": 12,
  "scenes": [
    { "n": 1, "role": "after", "file": "src/after.mp4", "kind": "video", "start": 0, "end": 8, "src_start": 1, "fit": "fill" },
    { "n": 2, "role": "ai_face", "file": "src/ai_face.png", "kind": "image", "start": 8, "end": 12, "ai": true, "fit": "fill" }
  ],
  "captions": [
    { "n": 1, "text": "첫 자막" },
    { "n": 2, "text": "둘째 자막 두 줄로 나뉘는 긴 문장입니다", "start": 5.5, "end": 12 }
  ]
}
EOF
cat > "$OJ/audio.json" <<'EOF'
{
  "voice": [ { "file": "src/voice1.wav", "start": 0.2, "keep": [0.3, 9.6], "rate": 1.5, "caption_n": 1 } ],
  "music": { "file": "src/music.wav", "start": 0, "src_start": 0, "gain_db": -12 }
}
EOF
node -e "JSON.parse(require('fs').readFileSync('$OJ/scenes.json','utf8'));JSON.parse(require('fs').readFileSync('$OJ/audio.json','utf8'));console.log('장면표 JSON 됨')"
```

- PMO 가짜 장면표(`make_fixtures.mjs`)와 같은 꼴 · 같은 값: 12초 · 영상 0~8초(원본 1초부터, 원래 소리 880Hz는 꺼야 함) · AI 얼굴 사진 8~12초 · 자막 둘 · 목소리(220Hz) 0.3~9.6초만 1.5배 · 음악(330Hz) −12dB.

### A5. 변환기 · 창 없이 한 편 채우기

RSCH의 확인용 시험 변환기(제품 코드 아님). **아래 칸을 글자 하나 바꾸지 말고** 그대로 파일로 만든다:

```zsh
cat > ~/oc-test/occ_job.mjs <<'EOF'
#!/usr/bin/env node
// occ_job.mjs — RSCH 확인용 시험 변환기 (제품 코드 아님). 맥 · 윈도 둘 다.
// 장면표(scenes.json + audio.json) → OpenChatCut 프로젝트를 창 없이 채움(소재 넣기 · 놓기 · 소리 · 'AI 합성' 잠금). 뽑기는 밖에서 occ render.
// 쓰는 법: OCC_DIR=<OpenChatCut 폴더> FF=<ffmpeg> FONT=<글꼴 ttf> OPENCHATCUT_DATA_DIR=<저장 폴더> node occ_job.mjs <job 폴더> <프로젝트 이름>
//   프로젝트는 미리: occ project new <이름> --size 1080x1920 --fps 30
// 자막 · 'AI 합성' = 우리 모양(흰 글씨 · 검은 테두리)의 투명 PNG. 줄마다 drawtext 하나(text_align 없는 ffmpeg 6.0에서도 됨).
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const need = (k) => { const v = process.env[k]; if (!v) { console.error(`환경 변수 ${k}가 없음`); process.exit(2); } return v; };
const OCC = need('OCC_DIR');
const FF = need('FF');
const FONT = need('FONT');
need('OPENCHATCUT_DATA_DIR');
const [jobArg, proj] = process.argv.slice(2);
if (!jobArg || !proj) { console.error('쓰는 법: node occ_job.mjs <job 폴더> <프로젝트 이름>'); process.exit(2); }

const t0 = Date.now();
const jobDir = path.resolve(jobArg).replace(/\\/g, '/');
const job = JSON.parse(fs.readFileSync(jobDir + '/scenes.json', 'utf8'));
const audio = JSON.parse(fs.readFileSync(jobDir + '/audio.json', 'utf8'));
const { width: W, height: H, fps } = job.canvas;
const fr = (s) => Math.round(s * fps);
const gen = jobDir + '/gen';
fs.mkdirSync(gen, { recursive: true });
const say = (...a) => console.error('[occ_job]', ...a);

function ff(args) {
  const r = spawnSync(FF, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { cwd: gen, encoding: 'utf8' });
  if (r.status !== 0) throw new Error('ffmpeg: ' + (r.stderr || r.error));
}
function occ(args) {
  const r = spawnSync(process.execPath, ['--import', 'tsx', OCC + '/cli/main.ts', ...args, '--json'],
    { cwd: OCC, env: process.env, encoding: 'utf8', maxBuffer: 64 << 20 });
  if (r.status !== 0) throw new Error(`occ ${args.slice(0, 2).join(' ')}: ${r.stderr || r.stdout}`);
  return JSON.parse(r.stdout);
}

// 1. 시각 풀기 — 시각 없는 자막은 짝 목소리(caption_n) 자리, 겹치면 앞 자막을 줄임
const v = audio.voice[0];
const voiceDur = (v.keep[1] - v.keep[0]) / v.rate;
const caps = job.captions.map((c) => ({ ...c }));
for (const c of caps) {
  if (c.start == null) {
    const vv = audio.voice.find((x) => x.caption_n === c.n);
    if (vv) { c.start = vv.start; c.end = vv.start + (vv.keep[1] - vv.keep[0]) / vv.rate; }
  }
}
caps.sort((a, b) => a.start - b.start);
for (let i = 0; i < caps.length - 1; i++) if (caps[i].end > caps[i + 1].start) caps[i].end = caps[i + 1].start;

// 2. 소재 만들기
function wrap(t, max = 12) {
  if ([...t].length <= max) return [t];
  const w = t.split(' ');
  let best = null;
  for (let i = 1; i < w.length; i++) {
    const a = w.slice(0, i).join(' '); const b = w.slice(i).join(' ');
    const d = Math.abs([...a].length - [...b].length);
    if (!best || d < best.d) best = { a, b, d };
  }
  return best ? [best.a, best.b] : [t];
}
fs.copyFileSync(FONT, gen + '/font.ttf');
const STYLE = 'fontfile=font.ttf:expansion=none:fontcolor=white:bordercolor=black';
function textPng(out, lines, { size, border, cy, x }) {
  const LH = Math.round(size * 1.45);
  const top = Math.round(cy - (lines.length * LH) / 2);
  const f = lines.map((ln, i) => {
    const tf = `${out}.l${i}.txt`;
    fs.writeFileSync(`${gen}/${tf}`, ln);
    return `drawtext=${STYLE}:textfile=${tf}:fontsize=${size}:borderw=${border}:x=${x ?? '(w-text_w)/2'}:y=${top + i * LH}`;
  }).join(',');
  ff(['-f', 'lavfi', '-i', `color=c=black@0:s=${W}x${H},format=rgba`, '-vf', f, '-frames:v', '1', out]);
}
const capY = Math.round(H * 0.69); // 캡컷 세로 0.38 → 가운데에서 아래로 0.38×(H/2) [추측]
for (const c of caps) textPng(`cap${c.n}.png`, wrap(c.text), { size: 66, border: 5, cy: capY });
const anyAi = job.scenes.some((s) => s.ai);
if (anyAi) textPng('ai_label.png', ['AI 합성'], { size: 44, border: 4, cy: Math.round(H * 0.075), x: '60' });
ff(['-i', `${jobDir}/${v.file}`, '-af', `atrim=start=${v.keep[0]}:end=${v.keep[1]},asetpts=PTS-STARTPTS,atempo=${v.rate}`,
  '-ar', '48000', 'voice_fit.wav']);
const fills = {};
for (const s of job.scenes) {
  if (s.kind !== 'image') continue;
  const out = `fill_${path.basename(s.file)}`;
  ff(['-i', `${jobDir}/${s.file}`, '-vf', `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`, '-frames:v', '1', out]);
  fills[s.n] = out;
}
const tMake = Date.now();

// 3. 창 없이 소재 넣기
const paths = [
  ...job.scenes.map((s) => (s.kind === 'image' ? `${gen}/${fills[s.n]}` : `${jobDir}/${s.file}`)),
  ...caps.map((c) => `${gen}/cap${c.n}.png`),
  ...(anyAi ? [`${gen}/ai_label.png`] : []),
  `${gen}/voice_fit.wav`,
  `${jobDir}/${audio.music.file}`,
];
const imp = occ(['tools', 'call', 'import_assets', '--project', proj, '--args', JSON.stringify({ paths }), '--apply']);
say('import', imp.terminal?.status, (imp.ops?.[0]?.result?.imported || []).length, 'assets');
const pool = occ(['media', 'ls', '--project', proj]);
const assets = Array.isArray(pool) ? pool : pool.assets || pool.media || [];
const idOf = (file) => {
  const name = path.basename(file);
  const a = assets.find((x) => x.name === name);
  if (!a) throw new Error('pool에 없음: ' + name);
  return a.id;
};

// 4. 순서표(ops) — 트랙 만들기 + 조각 놓기, 한 번에
const adds = [];
for (const s of job.scenes) {
  if (s.kind === 'video') adds.push({ type: 'video', assetId: idOf(s.file), track: 'V1', fromFrame: fr(s.start), sourceStartFrame: fr(s.src_start || 0), sourceDurationInFrames: fr(s.end) - fr(s.start) });
  else adds.push({ type: 'image', assetId: idOf(fills[s.n]), track: 'V1', fromFrame: fr(s.start), durationInFrames: fr(s.end) - fr(s.start) });
}
for (const c of caps) adds.push({ type: 'image', assetId: idOf(`cap${c.n}.png`), track: 'V2', fromFrame: fr(c.start), durationInFrames: fr(c.end) - fr(c.start) });
for (const s of job.scenes.filter((x) => x.ai)) adds.push({ type: 'image', assetId: idOf('ai_label.png'), track: 'V3', fromFrame: fr(s.start), durationInFrames: fr(s.end) - fr(s.start) });
adds.push({ type: 'audio', assetId: idOf('voice_fit.wav'), track: 'A1', fromFrame: fr(v.start), durationInFrames: fr(voiceDur) });
adds.push({ type: 'audio', assetId: idOf(audio.music.file), track: 'A2', fromFrame: fr(audio.music.start), sourceStartFrame: fr(audio.music.src_start || 0), sourceDurationInFrames: fr(job.length) });
const ops = [
  { tool: 'edit_track', args: { action: 'create', json: JSON.stringify({ trackType: 'video', count: 2 }) } },
  { tool: 'edit_track', args: { action: 'create', json: JSON.stringify({ trackType: 'audio', count: 2 }) } },
  { tool: 'edit_item', args: { adds } },
];
fs.writeFileSync(`${gen}/ops1.json`, JSON.stringify(ops, null, 2));
const e1 = occ(['edit', '--project', proj, '--ops', `@${gen}/ops1.json`, '--apply']);
say('ops1', e1.terminal?.status ?? e1.applied, JSON.stringify(e1.ops?.map((o) => o.result?.ok ?? o.result?.error ?? o.error)).slice(0, 300));

// 5. 고치기 — 영상 원래 소리 끔 · 음악 dB · 'AI 합성' 트랙 잠금
const items = occ(['timeline', 'items', '--project', proj]);
const list = Array.isArray(items) ? items : items.items || [];
const byName = (n) => list.filter((x) => x.name === n);
const updates = [];
for (const s of job.scenes.filter((x) => x.kind === 'video')) for (const it of byName(path.basename(s.file))) updates.push({ type: 'video', itemId: it.id, volume: 0 });
for (const it of byName(path.basename(audio.music.file))) updates.push({ type: 'audio', itemId: it.id, volume: Number((10 ** ((audio.music.gain_db ?? 0) / 20)).toFixed(3)) });
const ops2 = updates.length ? [{ tool: 'edit_item', args: { updates } }] : [];
const label = byName('ai_label.png');
const labelTrack = label[0]?.track || label[0]?.trackId;
if (labelTrack) ops2.push({ tool: 'edit_track', args: { action: 'update', trackId: labelTrack, json: JSON.stringify({ locked: true }) } });
fs.writeFileSync(`${gen}/ops2.json`, JSON.stringify(ops2, null, 2));
const e2 = occ(['edit', '--project', proj, '--ops', `@${gen}/ops2.json`, '--apply']);
say('ops2', e2.terminal?.status ?? e2.applied, JSON.stringify(e2.ops?.map((o) => o.result?.ok ?? o.result?.error ?? o.error)).slice(0, 300));

// 6. 결과 표
const after = occ(['timeline', 'items', '--project', proj]);
const rows = (Array.isArray(after) ? after : after.items || []).map((x) => ({ name: x.name, kind: x.kind, track: x.track || x.trackId, start: x.startFrame ?? x.start ?? x.from, frames: x.durationFrames ?? x.durationInFrames ?? x.frames }));
const want = job.scenes.length + caps.length + job.scenes.filter((x) => x.ai).length + 2;
console.log(JSON.stringify({
  ok: rows.length === want, project: proj, items_expected: want, items_found: rows.length,
  ms: { make_assets: tMake - t0, total: Date.now() - t0 },
  captions: caps.map((c) => ({ n: c.n, start: c.start, end: c.end, lines: wrap(c.text) })), voiceDur, label_track_locked: Boolean(labelTrack), items: rows,
}, null, 2));
EOF
shasum -a 256 ~/oc-test/occ_job.mjs      # 0eff497953721d1b6066c3d56ec672fb22a633711b76e327ec39586a55247a10 이어야 함
```

- sha256이 다르면 옮기다 바뀐 것 — 칸을 다시 그대로 만든다(두 번 다르면 여쭘).

```zsh
source ~/oc-test/env.sh; occ project new mac-job1 --size 1080x1920 --fps 30 --json
S=$(date +%s); node "$OCT/occ_job.mjs" "$OJ" mac-job1 > "$OCT/out/occ_job1.json" 2> "$OCT/out/occ_job1.err"; echo "끝 코드 $? · $(( $(date +%s) - S ))초"; cat "$OCT/out/occ_job1.err"; head -c 700 "$OCT/out/occ_job1.json"
```

- `"ok": true` · `items_found: 7` · `label_track_locked: true` 이어야 한다(윈도: 9초). `[occ_job] ops1 applied [true,true,true]` · `ops2 applied [true,true]`.

### A6. 뽑기 — 오늘의 핵심 (맥이 사람 없이 뽑는가 · 얼마나 걸리나)

```zsh
source ~/oc-test/env.sh; S=$(date +%s); occ render --project mac-job1 --out "$OCT/out/occ1.mp4" --codec h264 --fps 30 --resolution 1080p > "$OCT/out/occ-render1.log" 2>&1; echo "끝 코드 $? · $(( $(date +%s) - S ))초 (처음은 Chrome Headless Shell 받기 포함)"; tail -2 "$OCT/out/occ-render1.log"
```

```zsh
source ~/oc-test/env.sh; S=$(date +%s); occ render --project mac-job1 --out "$OCT/out/occ2.mp4" --codec h264 --fps 30 --resolution 1080p > "$OCT/out/occ-render2.log" 2>&1; echo "다시 뽑기 끝 코드 $? · $(( $(date +%s) - S ))초"; tail -1 "$OCT/out/occ-render2.log"
```

```zsh
source ~/oc-test/env.sh; FP=$(ls "$OCC_DIR"/node_modules/@remotion/compositor-darwin-*/ffprobe 2>/dev/null | head -1); [ -z "$FP" ] && FP=$(command -v ffprobe); echo "ffprobe: $(printf %s "$FP" | sed "s#$HOME#~#")"
"$FP" -v error -show_entries stream=codec_type,codec_name,profile,level,width,height,pix_fmt,color_range,r_frame_rate,sample_rate,channels,bit_rate:format=duration,size -of default=nw=1 "$OCT/out/occ1.mp4"
cd "$OCT/out" && "$FF" -hide_banner -loglevel error -y -ss 2 -i occ1.mp4 -frames:v 1 -vf scale=360:-1 f2.png && "$FF" -hide_banner -loglevel error -y -ss 10 -i occ1.mp4 -frames:v 1 -vf scale=360:-1 f10.png && "$FF" -hide_banner -loglevel error -y -i f2.png -i f10.png -filter_complex hstack occ1_frames.png && echo "그림 됨"
for b in "880 원래영상소리(꺼져야)" "220 목소리" "330 음악(-12dB)"; do f=${b%% *}; printf '%s: ' "$b"; "$FF" -hide_banner -nostats -i occ1.mp4 -af "bandpass=f=$f:width_type=q:w=8,volumedetect" -f null - 2>&1 | sed -n 's/.*mean_volume: //p'; done
```

- 그림 `occ1_frames.png`를 열어 읽고(왼쪽 = 2초 장면 · 오른쪽 = 10초 장면) 적는다: 왼쪽 그림 아래쪽(세로 69% 자리)에 '첫 자막' · 오른쪽 그림에 '둘째 자막 두 줄로 / 나뉘는 긴 문장입니다' 두 줄 가운데 · 흰 글씨 검은 테두리 · 오른쪽 그림의 왼쪽 위에 'AI 합성' · 오른쪽 그림의 사진이 화면을 꽉 채움. 한알님께도 `open "$OCT/out/occ1_frames.png"`로 보여 드린다.
- 소리: 880은 아주 작아야(윈도 −58~−68dB = 꺼짐) · 220(목소리)과 330(음악)은 그보다 훨씬 커야 한다(윈도: 목소리 구간 −17.6 · 음악 −31 안팎 — 이 명령은 12초 전체 평균이라 값은 다를 수 있음).
- **갈림:** 뽑기가 되면 '맥이 사람 없이 OpenChatCut으로 뽑기'가 선다. 안 되면 오류 끝 20줄을 적고 한알님께.

### A7. 사람이 맥 화면에서 고치기 (편집기 — 한알님 화면)

편집기 서버를 띄운다(OpenChatCut의 개발 서버 — 홈 대신 `~/oc-test/home`에 쓰게, MCP 토큰은 이 맥에서 만든 임시 값):

```zsh
source ~/oc-test/env.sh; mkdir -p "$OCT/home"; [ -s "$OCT/mcp.token" ] || (umask 077; openssl rand -hex 24 > "$OCT/mcp.token")
cd "$OCC_DIR"; HOME="$OCT/home" OPENCHATCUT_MCP_TOKEN="$(cat "$OCT/mcp.token")" nohup node scripts/dev-profile.mjs > "$OCT/out/occ-dev.log" 2>&1 & echo $! > ~/oc-test/occ-dev.pid
```

```zsh
source ~/oc-test/env.sh
for i in $(seq 1 60); do c=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:5199/); [ "$c" != "000" ] && break; sleep 2; done; echo "HTTP $c"
lsof -nP -iTCP:5199 -sTCP:LISTEN | tail -n +2 | awk '{print $9}'      # localhost(127.0.0.1 또는 [::1]):5199 이어야 함 — *:5199면 멈추고 여쭘
sleep 15; echo "다시 시작 횟수: $(grep -c 'restarting server' "$OCT/out/occ-dev.log")"      # 0이어야 함
[ -e ~/.openchatcut ] && echo "주의: 홈에 ~/.openchatcut 생김" || echo "홈에 ~/.openchatcut 없음(좋음)"
P=$(occ project list --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const L=JSON.parse(s);const p=(Array.isArray(L)?L:L.projects||[]).find(x=>x.name==='mac-job1');console.log(p?p.id:'')})"); printf '%s' "$P" > "$OCT/occ-project.id"; echo "http://localhost:5199/#/editor/$P"
```

- `scripts/dev-profile.mjs`는 `npm run dev`의 몸통이다(앞 단계 `sync:*`는 건너뜀 — 윈도에서 이렇게 띄워 됐음). **`vite`를 바로 부르지 않는다** — 윈도에서 바로 부르면 `.env.local`을 다시 써서 5초마다 다시 시작했음.

편집기를 연다(Chrome이 있으면 시험용 프로필 — 운영자 Chrome의 로그인 · 암호를 안 씀 / 없으면 Safari):

```zsh
source ~/oc-test/env.sh; U="http://localhost:5199/#/editor/$(cat "$OCT/occ-project.id")"
if [ -n "$CH" ]; then mkdir -p "$OCT/chrome-occ"; nohup "$CH" --user-data-dir="$OCT/chrome-occ" --use-mock-keychain --no-first-run --no-default-browser-check "$U" > /dev/null 2>&1 & else open -a Safari "$U"; fi
```

한알님께 부탁(그대로 읽어 드림):

1. 방금 뜬 창에 OpenChatCut 편집기가 뜨면(처음은 1~2분 걸릴 수 있음) **mac-job1** 프로젝트가 열려 있는지 봐 주세요. 첫 안내 · 설정 창은 닫거나 '건너뛰기' — **키 넣는 칸 · 'Claude/Codex 연결' 단추 · AI 기능은 누르지 마세요.**
2. ▶ 재생해 보시고, 자막 · 'AI 합성' · 사진이 보이는지 말씀해 주세요.
3. **둘째 자막 그림**(5.5초쯤 시작하는 조각)을 **0.5초쯤 오른쪽으로** 끌어 주세요.
4. **음악 조각**을 눌러 **소리를 더 줄여** 주세요(몇으로 하셨는지 말씀).
5. 맨 위 트랙의 **'AI 합성' 조각을 지우거나 옮겨 보세요** — 잠겨 있어 **안 되어야** 합니다. 어떻게 됐는지 말씀해 주세요.
6. 5초쯤 기다리신 뒤(저절로 저장) "다 했다"고 말해 주세요. **창은 닫지 마세요**(A8에서 씀).

```zsh
source ~/oc-test/env.sh; occ project show mac-job1 --doc --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const t=JSON.parse(s).doc.timelines[0];for(const it of t.items)console.log(it.name,'시작',it.startFrame,'길이',it.durationInFrames,'소리',it.volume??'-')})"
S=$(date +%s); occ render --project mac-job1 --out "$OCT/out/occ_human.mp4" --codec h264 --fps 30 --resolution 1080p > "$OCT/out/occ-render-human.log" 2>&1; echo "끝 코드 $? · $(( $(date +%s) - S ))초"
```

- 적을 것: 편집기가 열렸나(걸린 시간 · 브라우저) · 재생 · 2~5번 결과 · 위 표에서 cap2.png 시작이 165(5.5초)에서 늘었나 · music.wav 소리가 0.251에서 줄었나 · 'AI 합성'(ai_label.png)이 그대로인가 · 다시 뽑기가 됐나.

### A8. Claude Code가 MCP로 고치기 (편집기를 띄운 채 — 한알님이 보심)

Claude Code가 아닌 실행기(Codex)면 이 단계는 건너뛴다.

```zsh
source ~/oc-test/env.sh; T=$(cat "$OCT/mcp.token"); M=http://localhost:5199/api/external-mcp/mcp
curl -s -o /dev/null -w '토큰 없이: %{http_code}\n' -X POST -H 'Content-Type: application/json' "$M" -d '{}'          # 401 또는 403 이어야 함
curl -s -D - -o /dev/null -X POST -H "Authorization: Bearer $T" -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' "$M" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"oc-test","version":"0"}}}' | grep -iE '^HTTP' 
mkdir -p "$OCT/mcp-run" && (umask 077; printf '{"mcpServers":{"occ":{"type":"http","url":"%s","headers":{"Authorization":"Bearer %s"}}}}' "$M" "$T" > "$OCT/mcp-run/mcp.json") && echo "mcp.json 됨(토큰은 찍지 않음)"
cat > "$OCT/mcp-run/prompt.txt" <<'EOF'
너는 OpenChatCut MCP 서버 'occ'의 도구만 쓴다. 다음만 하고 끝내라.
1. list_projects로 이름이 'mac-job1'인 프로젝트의 id를 찾고, target_project로 잡는다.
2. begin_edit_session을 approvalMode "auto"로 시작한다.
3. 타임라인을 읽어(read_timeline) 이름이 music.wav인 소리 조각을 찾고, edit_item의 updates로 그 조각의 volume만 0.15로 바꾼다. 다른 것은 바꾸지 않는다.
4. review_edit_session을 부르고 status가 applied인지 본다.
5. 끝에 한 줄로만 답한다: bindingMode · 쓴 도구 이름들(차례대로) · 마지막 status.
EOF
echo "준비 됨"
```

- 한알님께: "이제 다른 Claude Code가 편집기에 붙어 음악 소리를 0.15로 바꿉니다. 편집기 화면에서 음악 조각이 바뀌는지 봐 주세요."

```zsh
source ~/oc-test/env.sh; cd "$OCT/mcp-run" && S=$(date +%s); claude -p --mcp-config "$OCT/mcp-run/mcp.json" --strict-mcp-config --allowedTools "mcp__occ" --no-session-persistence --model sonnet < prompt.txt > "$OCT/out/mcp-claude.txt" 2>&1; echo "끝 코드 $? · $(( $(date +%s) - S ))초"; tail -5 "$OCT/out/mcp-claude.txt"
occ project show mac-job1 --doc --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const t=JSON.parse(s).doc.timelines[0];for(const it of t.items)if(it.name==='music.wav')console.log('music.wav 소리',it.volume)})"
```

- 윈도에서는 `offline · list_projects, target_project, begin_edit_session, read_timeline, edit_item, review_edit_session · applied`(편집기를 안 띄운 채). **여기서는 편집기가 떠 있어 bindingMode가 다를 수 있다(browser 등) — 그대로 적는다.** 승인을 묻는 창이 편집기에 뜨면 한알님께 보시고 정하시게 한다.
- 적을 것: 답 한 줄 · 걸린 초 · 마지막 줄의 소리 값(0.15여야) · 한알님이 화면에서 본 것(바로 바뀌었나 · 다시 읽어야 했나 · 뜬 창).

### A9. 편집기 끄기

```zsh
source ~/oc-test/env.sh; kill "$(cat "$OCT/occ-dev.pid")" 2>/dev/null; sleep 1; lsof -tiTCP:5199 -sTCP:LISTEN | xargs kill 2>/dev/null; pkill -f "oc-test/chrome-occ"; true
lsof -nP -iTCP:5199 -sTCP:LISTEN; echo "5199 확인 끝 — 비어야 함"
[ -e ~/.openchatcut ] && echo "주의: 홈에 ~/.openchatcut 있음" || echo "홈에 ~/.openchatcut 없음(좋음)"
du -sh "$OCT" 2>/dev/null | sed "s#$HOME#~#"
```

- Safari로 열었으면 한알님께 그 탭을 닫아 주시게 한다.
- A 결과를 RESULTS.md에 마저 적고 한알님께 짧게 알린다 → **"B(OpenCut 옛 판)를 이어서 할까요? 1~2시간 걸립니다"** 여쭘. 아니면 Z로.

---

### B1. 제품 저장소 자리 · 안 올린 작업 수 (읽기만)

```zsh
source ~/oc-test/env.sh
xcode-select -p >/dev/null 2>&1 || echo "개발 도구 없음 — B는 git이 필요함, 멈추고 여쭘"
P=$(lsof -tiTCP:8765 -sTCP:LISTEN | head -1)
C1=$([ -n "$P" ] && git -C "$(lsof -a -p "$P" -d cwd -Fn | sed -n 's/^n//p')" rev-parse --show-toplevel 2>/dev/null)
{ echo "$C1"; mdfind -onlyin ~ -name mitchell-studio 2>/dev/null; } | while read -r d; do [ -n "$d" ] && [ -f "$d/app/webapp/server.py" ] && [ -e "$d/.git" ] && echo "$d"; done | sort -u
```

- 한 줄만 나오면 `printf '%s' "<그 자리>" > ~/oc-test/repo.path`. 없거나 둘 이상이면 한알님께 여쭘.

```zsh
source ~/oc-test/env.sh && cd "$R"
git --no-optional-locks status -sb | head -1
echo "커밋 안 한 파일: $(git --no-optional-locks status --porcelain | wc -l | tr -d ' ')"
echo "안 올린 커밋: $(git log --oneline origin/main..HEAD 2>/dev/null | wc -l | tr -d ' ')"
echo "치워 둔 작업: $(git stash list | wc -l | tr -d ' ')"
git remote get-url origin | grep -q 'mitchell-studio' && echo "origin: mitchell-studio 저장소"
```

- 수만 적는다(파일 이름 · 원격 주소는 적지 않음).

### B2. 시험 코드 받기 — 커밋 c2d21a6

**(가) 이 맥의 제품 저장소 사본에서 (먼저)**

```zsh
source ~/oc-test/env.sh && cd "$R"
B=$(git --no-optional-locks status -sb | head -1)
GIT_TERMINAL_PROMPT=0 git fetch origin test/opencut-classic-20261120
git cat-file -e 'c2d21a655cec64c415b86a2649a15d7a11e7cd73^{commit}' && echo "c2d21a6 있음"
mkdir -p "$OCT/ms-test" && git archive c2d21a655cec64c415b86a2649a15d7a11e7cd73 app/opencut-test | tar -x -C "$OCT/ms-test"
[ "$B" = "$(git --no-optional-locks status -sb | head -1)" ] && echo "제품 저장소 가지 그대로"
ls "$OT"        # MAC_RUN.md · render.mjs · convert.mjs · fork/ … 가 보이면 됨
```

- 로그인 · 키체인 창이 뜨거나 fetch가 실패하면 **멈추고 (다)로**(창은 '취소').

**(다) 한알님이 ZIP을 받아 주실 때** — 한알님께: "개인 정보 보호 창에서 이 주소를 열어 ZIP을 받아 주세요: `https://github.com/AofSpds/mitchell-studio/archive/c2d21a655cec64c415b86a2649a15d7a11e7cd73.zip`" → 받았다고 하시면:

```zsh
source ~/oc-test/env.sh
Z=$(ls -d ~/Downloads/mitchell-studio-c2d21a65* | head -1); echo "$Z"      # 처음이면 '다운로드 폴더 접근' 창 → 한알님이 허용
case "$Z" in *.zip) unzip -q "$Z" -d "$OCT/ms-zip" && Z=$(ls -d "$OCT"/ms-zip/mitchell-studio-c2d21a65* | head -1);; esac
mkdir -p "$OCT/ms-test/app" && [ -d "$Z/app/opencut-test" ] && cp -R "$Z/app/opencut-test" "$OCT/ms-test/app/" && ls "$OT"
```

### B3. Bun 1.2.18 — `~/oc-test/bun`에만

```zsh
source ~/oc-test/env.sh && mkdir -p "$OCT/bun" && cd "$OCT/bun"
if [ "$(uname -m)" = arm64 ]; then T=darwin-aarch64; else T=darwin-x64; fi
curl -fsSL -o bun.zip "https://github.com/oven-sh/bun/releases/download/bun-v1.2.18/bun-$T.zip" && unzip -oq bun.zip && rm bun.zip
source ~/oc-test/env.sh && command -v bun && bun -v        # ~/oc-test/bun/… 의 bun · 1.2.18 이어야 함
```

- 옛 판이 Bun 1.2.18로 못 박혀 있다(`package.json` `"packageManager": "bun@1.2.18"`). 홈의 다른 Bun은 건드리지 않는다.
- B에서는 Chrome이 있어야 한다(A1의 `CH`). 없으면 한알님께 여쭘: (가) 한알님이 Google Chrome을 내려받아 `~/Applications`에 끌어 넣기(관리자 암호 없음) (나) `bunx @puppeteer/browsers install chrome@stable --path ~/oc-test/browsers`(Chrome for Testing) → 그 실행 파일 경로를 `~/oc-test/chrome.path`에 적음. chrome-headless-shell · 오픈소스 Chromium은 B에서 쓰지 않는다(H.264 · AAC가 없을 수 있음).

### B4. 가짜 영상

```zsh
source ~/oc-test/env.sh && mkdir -p "$OCT/media" && cd "$OCT/media"
"$FF" -hide_banner -loglevel error -y -f lavfi -i testsrc2=size=1080x1920:rate=30 -f lavfi -i sine=frequency=440:sample_rate=48000 -t 10 \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest v1080_30.mp4 && ls -la v1080_30.mp4
```

### B5. 고친 판 띄우기 — 서버 127.0.0.1:3417

```zsh
source ~/oc-test/env.sh && cd "$OCT"
git clone -q https://github.com/opencut-app/opencut-classic opencut-mitchell
cd opencut-mitchell && git checkout -q -b mitchell-test cf5e79e && git log -1 --format=%h
git apply "$OT/fork/opencut-classic-cf5e79e-mitchell.patch" && echo "얹기 됨"
sh scripts/mitchell-fetch-font.sh      # 끝 줄 sha256이 194018e6b2b293a7964f037b25c0249ce1418bc9ab3c971060a03aa57861e252 인지
bun install > "$OCT/out/mitchell-install.log" 2>&1; echo "설치 끝 코드 $?"; tail -3 "$OCT/out/mitchell-install.log"
cp apps/web/.env.example apps/web/.env.local
```

```zsh
source ~/oc-test/env.sh; cd "$OCT/opencut-mitchell/apps/web"; nohup bun run dev --port 3417 --hostname 127.0.0.1 > "$OCT/out/dev3417.log" 2>&1 & echo $! > ~/oc-test/dev3417.pid
```

```zsh
source ~/oc-test/env.sh
for i in $(seq 1 90); do c=$(curl -s -o /dev/null -w '%{http_code}' "$A/"); [ "$c" != "000" ] && break; sleep 2; done; echo "HTTP $c"
lsof -nP -iTCP:3417 -sTCP:LISTEN | tail -n +2 | awk '{print $9}'      # 127.0.0.1:3417 이어야 함(*:3417이면 멈추고 여쭘)
tail -5 "$OCT/out/dev3417.log"
```

### B6. 변환 · 뽑기 · 되받기 (T9 ㉠~㉧, T0 칸도 여기서)

```zsh
source ~/oc-test/env.sh
node --test "$OT/tests/convert_diff.test.mjs" 2>&1 | tail -8                    # ㉠ pass 6
node "$OT/make_fixtures.mjs" "$J" --video "$OCT/media/v1080_30.mp4"
node "$OT/convert.mjs" "$J" --root "$J"                                          # ㉡ checks: [] 인지
```

아래 넷은 하나씩(뽑기마다 1~5분 — 처음 한 번은 편집기 쪽을 컴파일하느라 더 걸림):

```zsh
source ~/oc-test/env.sh; S=$(kst); node "$OT/render.mjs" "$J/opencut" --app "$A" --chrome "$CH" --out "$OCT/out/c4_headless.mp4"; echo "시작 $S · 끝 $(kst)"     # ㉢ 화면 없이
```

```zsh
source ~/oc-test/env.sh; S=$(kst); node "$OT/render.mjs" "$J/opencut" --app "$A" --chrome "$CH" --out "$OCT/out/c4_headed.mp4" --headed; echo "시작 $S · 끝 $(kst)"   # ㉣ 창을 띄운 채
```

- ㉣ 전에 한알님께: "Chrome 창이 잠깐 떴다가 닫힙니다. 건드리지 말아 주세요."

```zsh
source ~/oc-test/env.sh; node "$OT/render.mjs" "$J/opencut" --page import --app "$A" --chrome "$CH" --out "$OCT/out/roundtrip.json"   # ㉤ 들여오기 + 편집기 길로 열기
source ~/oc-test/env.sh; node "$OT/diff.mjs" "$J/opencut" "$OCT/out/roundtrip.json"                                                  # ㉥ 바뀐 곳 0 인지
```

```zsh
source ~/oc-test/env.sh; node "$OT/render.mjs" --page frames --app "$A" --chrome "$CH" --video "$OCT/out/c4_headless.mp4" --out "$OCT/out/c4_frames.png"   # ㉦ 장면 다섯 장
source ~/oc-test/env.sh; FP=$(ls "$OCC_DIR"/node_modules/@remotion/compositor-darwin-*/ffprobe 2>/dev/null | head -1); [ -z "$FP" ] && FP=$(command -v ffprobe); "$FP" -v error -show_entries stream=codec_type,codec_name,profile,level,width,height,r_frame_rate,sample_rate,channels,bit_rate -of default=nw=1 "$OCT/out/c4_headless.mp4"   # ㉧
```

- ㉢ · ㉣은 끝에 JSON을 찍는다. `ok: true` · `problems: []`이면 규격(h264 High · 1080×1920 · 30/1 · aac · 44100 · 2채널)이 맞은 것. **`MITCHELL_AAC_UNSUPPORTED`가 나오면 AAC가 안 되는 것 — Opus로 바꾸지 않고 멈춘 정상 동작**, 그대로 적는다.
- **T0 칸:** ㉢ · ㉣ JSON의 `page.codecs`(userAgent의 Chrome 판 · hasVideoEncoder · hasAudioEncoder · hasWebGPU · avc640028_1080x1920_30 · aac_44100_2ch)와 `page.gpuAvailable`을 5번 표에 옮긴다. 쪽이 뜨기 전에 막혀 `page.codecs`가 없으면 오류를 그대로 적고 한알님께 알린다.
- ㉦ 그림 파일을 열어 읽고(화면 조작 아님) 자막 테두리 · 한글 글꼴 · 사진이 화면을 채우는지 적는다. 한알님께도 `open "$OCT/out/c4_frames.png"`로 보여 드린다.
- ㉧의 레벨은 41(4.1)이 나올 것 — 제품 규격 검사는 레벨을 보지 않는다.
- **갈림:** ㉢이 규격대로면 'OpenCut으로 맥이 화면 없이 뽑기'도 선다. ㉢만 안 되고 ㉣이 되면 '창을 띄운 채'(맥이 깨어 있어야 함). 둘 다 안 되면 오류를 적고 B7로.

### B7. 사람이 보는 들여오기 · 고치기 (T9 ④ — 한알님 화면)

```zsh
source ~/oc-test/env.sh
mkdir -p "$OCT/chrome-test/Default"
[ -f "$OCT/chrome-test/Default/Preferences" ] || printf '{"download":{"default_directory":"%s","prompt_for_download":false}}' "$OCT/out" > "$OCT/chrome-test/Default/Preferences"
nohup node "$OT/render.mjs" "$J/opencut" --serve --port 3418 --app "$A" > "$OCT/out/serve3418.log" 2>&1 & echo $! > ~/oc-test/serve3418.pid
```

- **`--port 3418`을 꼭 붙인다** — 안 붙이면 묶음 서버가 8765(웹앱 자리)를 잡는다.

```zsh
source ~/oc-test/env.sh; sleep 2; U=$(sed -n 's/.*"import_url": "\(.*\)".*/\1/p' "$OCT/out/serve3418.log"); echo "$U"
nohup "$CH" --user-data-dir="$OCT/chrome-test" --use-mock-keychain --no-first-run --no-default-browser-check "$U" > /dev/null 2>&1 &
```

한알님께 부탁(그대로 읽어 드림):

1. 방금 뜬 Chrome 창에 '되짚기 됨'과 '편집기 길로 열어 봄'이 보이면 **'편집기에서 열기'**를 눌러 주세요.
2. 편집기에서 **자막 하나를 눌러 글을 조금 고치고**, **영상 조각 하나를 가운데서 나눠** 주세요(조각을 고르고 재생 막대를 가운데에 둔 뒤 분할).
3. 5초쯤 기다려 주세요(저절로 저장됨).
4. 주소창에 `http://127.0.0.1:3417/mitchell/import`를 치고 → 그 프로젝트의 **'꺼내기'**를 눌러 주세요.
5. 다 하셨으면 "다 했다"고 말해 주세요.

```zsh
source ~/oc-test/env.sh
F=$(ls -t "$OCT"/out/*.json 2>/dev/null | grep -v '/roundtrip.json$' | grep -v '/occ_job1.json$' | head -1); [ -z "$F" ] && F=$(ls -t ~/Downloads/*.json 2>/dev/null | head -1); echo "$F"
node "$OT/diff.mjs" "$J/opencut" "$F"          # 고친 자막과 '나뉨'(새 조각 id)이 나오는지
kill "$(cat ~/oc-test/serve3418.pid)" 2>/dev/null
```

- 적을 것: 목록에 떴나 · 열렸나 · 소재가 다 붙었나 · 되받기 결과(고친 자막 · 나뉨 · 나뉜 조각의 id).
- **B7이 끝나면 한알님께 알린다** — 한알님은 아이폰 사용자께 시험할 때 연락하신다(11-20 19:09:09 「작업할때 사용자에게 연락할께요」): "이제 아이폰 사용자께 연락하실 때입니다. ① 화면 캡처 두 장(설정 › 일반 › 정보 / 설정 › 개인정보 보호 및 보안 맨 아래) ② Tailscale 관리 화면에서 'HTTPS 켜기' ③ 벽 · 책상 10초 영상을 찍어 두시기를 부탁하시고, 켜졌다고 하시면 B8을 시작합니다. 아이폰 사용자가 어려우시면 B8은 건너뛰고 Z로 갑니다."

### B8. https로 아이폰에서 (T1) — 한알님이 "아이폰 사용자가 HTTPS를 켰다"고 하실 때만

```zsh
source ~/oc-test/env.sh; TS="$R/app/webapp/tailscale/ts.sh"
zsh "$TS" status > /dev/null && echo "Tailscale 켜짐" || echo "Tailscale 꺼짐 — 한알님께 여쭘(켜는 것은 자동 시작이 하는 일, 직접 켜지 않음)"
zsh "$TS" serve status          # 지금 설정을 화면에서만 봄 — 있는 것은 건드리지 않음
zsh "$TS" status --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).Self.DNSName.replace(/\.$/,'')))" > "$OCT/tshost"; cat "$OCT/tshost"
```

시험 사본에 `allowedDevOrigins` 한 줄을 넣고 서버를 다시 띄움(개발 모드 서버가 다른 주소에서 온 요청을 막지 않게):

```zsh
source ~/oc-test/env.sh; H=$(cat "$OCT/tshost"); cd "$OCT/opencut-mitchell/apps/web"
grep -q allowedDevOrigins next.config.ts || perl -0pi -e 's/reactStrictMode: true,/reactStrictMode: true,\n\tallowedDevOrigins: ["'"$H"'"],/' next.config.ts
grep -n allowedDevOrigins next.config.ts
kill "$(cat ~/oc-test/dev3417.pid)" 2>/dev/null; sleep 1; lsof -tiTCP:3417 -sTCP:LISTEN | xargs kill 2>/dev/null; sleep 2; echo "서버 내림"
```

→ B5의 서버 띄우기 두 칸(띄우기 · 기다리기)을 다시 돌린다.

```zsh
source ~/oc-test/env.sh; TS="$R/app/webapp/tailscale/ts.sh"
zsh "$TS" serve --help 2>&1 | head -25                  # 꼴 확인(판마다 다를 수 있음)
zsh "$TS" serve --bg --https=8443 http://127.0.0.1:3417
zsh "$TS" serve status
```

- 한알님께: "아이폰 사용자께 이 주소를 보내 주세요: `https://<tshost의 값>:8443/projects`" — 화면으로만 알려 드리고 RESULTS.md에는 가려 적는다.
- 한알님이 통화로 전해 주시는 것을 적는다: 열렸나 · 인증서 경고 · 'Desktop only' 뒤 'Take a look anyway'로 들어가졌나 · 새 프로젝트에 벽 영상(아이폰 사용자가 찍어 둔 10초)을 넣었을 때 목록에 남았나/사라졌나 · 미리보기 영상이 보이나 · ▶ 했을 때 소리가 나나 · 손가락으로 된 것(자막 글 고치기 · 조각 지우기 · 음량 · 속도)과 안 된 것(조각 끌기 · 끝 손잡이 끌기) · 아이폰이 뜨거워졌나 · 탭이 다시 읽혔나.
- 첫 접속은 인증서를 받느라 몇 초 늦거나 한 번 실패할 수 있다 — 한 번 다시 열어 보시게.
- 끝나면 끈다:

```zsh
source ~/oc-test/env.sh; TS="$R/app/webapp/tailscale/ts.sh"; zsh "$TS" serve --https=8443 off; zsh "$TS" serve status    # 8443이 없어졌는지(off 꼴이 안 맞으면 --help의 끄는 꼴로)
```

### Z. 되돌리기 — 한알님이 '끝'이라고 하신 뒤

```zsh
source ~/oc-test/env.sh
[ -n "$R" ] && zsh "$R/app/webapp/tailscale/ts.sh" serve status          # (B8을 했으면) 8443이 남아 있으면 B8의 끄기
for f in occ-dev dev3417 serve3418 caffeinate; do [ -f "$OCT/$f.pid" ] && kill "$(cat "$OCT/$f.pid")" 2>/dev/null; done
for p in 5199 3417 3418; do lsof -tiTCP:$p -sTCP:LISTEN | xargs kill 2>/dev/null; done
pkill -f "oc-test/chrome-" ; true
for p in 5199 3000 3417 3418 8443 9222; do lsof -nP -iTCP:$p -sTCP:LISTEN; done; echo "포트 확인 끝 — 다 비어야 함"
lsof -tiTCP:8765 -sTCP:LISTEN >/dev/null && echo "웹앱 켜짐" || echo "웹앱 꺼짐"   # A1과 같은지
[ -e ~/.openchatcut ] && echo "주의: 홈에 ~/.openchatcut 있음" || echo "홈에 ~/.openchatcut 없음"
du -sh "$OCT" 2>/dev/null | sed "s#$HOME#~#"
```

- `~/oc-test`는 지우지 않는다 — 결과를 넘긴 뒤 한알님이 정하신다(지우면 Node · OpenChatCut · Bun · 시험 사본 · 가짜 소재가 다 사라짐 — 폴더 하나만 지우면 됨).
- B2 (가)로 받았으면 제품 저장소에 받은 가지 표시(`origin/test/opencut-classic-20261120`)가 남는다 — 작업 파일 · 가지와 상관없어 그대로 둔다.
- 마지막으로 RESULTS.md에 끝 시각을 적고 한알님께 "RESULTS.md를 RSCH 창에 붙여 주세요"라고 말씀드린다.

---

## 5. RESULTS.md 꼴

```markdown
# 맥북 시험 결과 — 2026-11-__ · MITCHELL_STUDIO/BTSR/RSCH/S5_MAC_TEST (지시문 판 2 — OpenChatCut 메인)

- 돌린 이: (Claude Code / ChatGPT Codex) · 시작 (KST) · 끝 (KST)
- 끝까지 간 단계: A0 … A9 · B1 … B8 · Z (못 한 단계와 까닭)

## 1. 결과 (한 줄씩)
- A 설치(Node 24 · ffmpeg · 글꼴 · OpenChatCut):
- A 창 없이 한 편(장면표 → 넣기 · 놓기 · 자막 · 소리 · 잠금):
- A 뽑기(처음 · 다시 — 걸린 초 · 규격):
- A 사람이 맥 화면에서 고치기(A7):
- A Claude Code가 MCP로 고치기(A8):
- B OpenCut 옛 판(했으면 ㉢ · ㉣ · 한 바퀴 · 사람 고치기):
- 아이폰 https(B8): 했음 / 안 함 —

## 2. 기록 칸

### 맥 (A1 · Z)
| 칸 | 값 |
|---|---|
| macOS 판 · 칩 | |
| 빈 디스크(시작) · `~/oc-test` 크기(끝) | |
| 원래 node · 개발 도구(git) 있나 · Homebrew ffmpeg 글자 그리기 | |
| Chrome 판 · 자리(앱 이름만) — 없으면 '없음' | |
| 시작 때 웹앱(8765) 켜짐/꺼짐 · 끝날 때 | |
| 포트 5199 · 3000 · 3417 · 3418 · 8443 · 9222 (시작 · 끝) | |
| 홈의 `~/.openchatcut` (시작 · A9 · 끝) | |

### A — OpenChatCut
| 칸 | 값 |
|---|---|
| A2 node · npm 판 · ffmpeg 판 · sha256 셋(node · ffmpeg · 글꼴) 맞음 | |
| A3 판(0.2.17) · `npm install` 끝 코드 · 걸린 초 · 꾸러미 수 · install scripts 경고에 나온 꾸러미 | |
| A3 `occ where` 저장 자리(`~`로) · 도구 수 | |
| A5 occ_job.mjs sha256 맞음 · ok · items 7 · label_track_locked · 걸린 초 | |
| A6 뽑기 1: 끝 코드 · 걸린 초 · 크기 · 프레임 | |
| A6 뽑기 2(다시): 걸린 초 | |
| A6 규격(영상 코덱 · 프로파일 · 레벨 · 크기 · fps · pix_fmt · color_range · 비트레이트 / 소리 코덱 · 표본율 · 채널) | |
| A6 그림: 자막 둘 · 두 줄 가운데 · 테두리 · 'AI 합성' · 사진 채움 | |
| A6 소리 평균 dB: 880 · 220 · 330 | |
| A7 서버: 뜬 초 · 듣는 자리 · 다시 시작 횟수 | |
| A7 편집기: 브라우저 · 열린 시간 · 재생 · 보인 것 | |
| A7 한알님: 자막 끌기 · 음악 소리(값) · 'AI 합성' 지우기/옮기기(막혔나) · 저장 | |
| A7 확인: cap2 시작 · music 소리 · ai_label 그대로 · 다시 뽑기 | |
| A8 토큰 없이(401/403) · 붙기(HTTP) | |
| A8 답 한 줄(bindingMode · 도구 · status) · 걸린 초 · 끝 소리 값 | |
| A8 한알님이 화면에서 본 것 · 뜬 창 | |

### B — OpenCut 옛 판 (했을 때만)

#### 제품 저장소 (읽기만 · 수만)
| 칸 | 값 |
|---|---|
| 가지 첫 줄(`git status -sb`) | |
| 커밋 안 한 파일 수 · 안 올린 커밋 수 · 치워 둔 작업 수 | |
| 받기 앞뒤 가지 첫 줄이 같았나 · c2d21a6 있었나 · 받은 길 (가)/(다) | |

#### T0 — 맥 Chrome 능력 (㉢ · ㉣의 page.codecs)
| 칸 | 화면 없이(㉢) | 창을 띄운 채(㉣) |
|---|---|---|
| userAgent의 Chrome 판 | | |
| hasVideoEncoder · hasAudioEncoder · hasWebGPU | | |
| avc640028_1080x1920_30 (H.264) | | |
| aac_44100_2ch (AAC) | | |
| gpuAvailable | | |

#### T-i — 아이폰 (한알님이 전해 주신 것)
| 칸 | 값 |
|---|---|
| 기종 · iOS 판 · 잠금 모드 | |

#### T9 — 시험 코드로 한 바퀴
| 칸 | 값 |
|---|---|
| 얹기 · 글꼴 sha256 · 설치 끝 코드 · 설치 시간 | |
| 서버 3417이 127.0.0.1에서만 듣나 · 뜬 시간 | |
| ㉠ pass 수 · ㉡ checks | |
| ㉢ ok · wall_ms · page.exportMs · spec · problems · 시작/끝 시각 | |
| ㉣ 같은 칸 | |
| ㉤ ok · opened(elements · mediaLoaded · thumbnailMade) · ㉥ 바뀐 곳 수 | |
| ㉦ 그림: 자막 테두리 · 한글 글꼴 · 사진 채우기 | |
| ㉧ ffprobe(영상 코덱 · 프로파일 · 레벨 · 크기 · fps · 비트레이트 / 소리 코덱 · 표본율 · 채널) | |
| B7: 목록에 떴나 · 열렸나 · 소재가 다 붙었나 · 되받기(고친 자막 · 나뉨 · 새 id) | |

#### T1 — https (했을 때만)
| 칸 | 값 |
|---|---|
| serve 명령의 실제 꼴 · 주소가 열렸나(주소는 가림) · 인증서 경고 | |
| allowedDevOrigins를 넣었나 · 서버를 다시 띄웠나 | |
| 아이폰: 열렸나 · Desktop only 뒤 들어가졌나 | |
| 벽 영상: 남았나/사라졌나 · 미리보기 영상 · 소리 | |
| 손가락으로 된 것 · 안 된 것 | |
| 뜨거워짐 · 탭이 다시 읽힘 | |

### 뜬 창 (암호 · 허락 · 접근 · 네트워크 연결)
| 무엇이 · 언제 · 어떻게 했나 | |
|---|---|

## 3. 증거 — 돌린 명령과 출력(길면 끝 20줄) · 시각
## 4. 바뀐 것 — 맥에 남긴 것(`~/oc-test` 안 목록 · 크기 · 제품 저장소의 받은 가지 표시 · serve 설정을 되돌렸나 · 홈에 생긴 것)
## 5. 남은 것 · 막힌 것
## 6. 배운 것 · 다음 (RSCH · PMO에 넘길 것)
```
