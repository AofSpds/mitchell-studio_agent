# SUB 개설 패킷 — MITCHELL_STUDIO/BTSR/RSCH/S5_MAC_TEST (맥북 시험 지시문)

> **맥의 에이전트에게:** 이 글 전체가 네 일이다. 1~3번을 읽고 4번 S0부터 차례로 시작해라. 화면 · 아이폰 단계는 한알님께 말로 부탁하고 기다려라.

| 칸 | 값 |
|---|---|
| 연 이 | PRIMARY `MITCHELL_STUDIO/BTSR/RSCH` — 한알님의 윈도 PC · Paseo 7993ff28 · Opus 5.5 · Max |
| SUB | `MITCHELL_STUDIO/BTSR/RSCH/S5_MAC_TEST` |
| 실행기 | **맥북의 Claude Code**(터미널에서 `claude`). 안 되거나 쓸 양이 떨어지면 **같은 글을 ChatGPT(Codex)에** 붙임. **둘을 같이 돌리지 않음**(같은 폴더 · 포트를 씀) |
| 자기 칸 | 맥의 `~/oc-test/` — 어느 git 저장소에도 쓰지 않음 |
| 돌려줄 것 | `~/oc-test/out/RESULTS.md`(5번 꼴) → 한알님이 RSCH 창에 붙임 → RSCH가 이 칸 `반환.md`로 커밋 |
| 주고받는 길 | 이 SUB와 RSCH는 직접 주고받지 못함(이 PC의 Paseo에 맥이 없음 — 11-20 16:53 확인). **물음은 모두 한알님께.** |
| 쓴 때 | 2026-11-20 19:00 KST (여는 것보다 먼저 씀 — AAA 규칙 40). 명령 칸 25개는 이 PC에서 `bash -n`으로 문법만 확인함 — **맥에서 돌려 본 적은 없음** |

## 근거 (한알 말씀, 원문 그대로 — `owner/utterances/2026-11-20.md`)

- 09:40:13 「실테스트는 맥북에서 오늘 저녁에 진행합니다」
- 11:02:25 「아 그건 괜찮아요. 그 외에 맥북 원래 사용자가 인증이 필요한 항목이 있을까요」 — 맥북에 Bun 설치 허락으로 읽음
- 13:50:27 「Pmo가 합니다. / 네 설치하세요 / Https 반드시 켜야 하나요」 — 시험 코드는 PMO(제품 가지 `test/opencut-classic-20261120` 커밋 c2d21a6)
- 16:27:42 「제가 맥북을 빌려온 상황이고 잠금이나 이런건 할수 있어요. …」
- 16:52:52 「어 맥북에서 클로드코드랑 챗지피티로 웹앱 만들다가 온거는 아시나요」
- 18:50:27 「맥북에도 클로드 챗지피티 있어요. / 인지하고 작업하신거죠? / 지시문 다 써서 푸시하세요」

---

## 0. 한알님이 하실 것

**시작 (5분)**

1. 맥 Safari에서 **개인 정보 보호 창**(⇧⌘N) → GitHub에 로그인 → 이 글을 엶:
   `https://github.com/AofSpds/mitchell-studio_agent/blob/main/projects/btsr/roles/rsch/sub/s5_mac_test/OPEN_PACKET.md`
2. 오른쪽 위 **'Raw'** → 전체 선택(⌘A) → 복사(⌘C).
3. 터미널을 열고 아래 한 줄을 침 → Claude Code가 뜨면 붙여 넣고(⌘V) Enter.

   ```
   mkdir -p ~/oc-test && cd ~/oc-test && claude
   ```

   - ChatGPT(Codex)로 할 때: Codex에서 작업 폴더를 `~/oc-test`로 고르고 똑같이 붙여 넣음.
   - **제품 저장소 폴더에서 띄우지 마세요** — 거기서는 예전 역할 설정이 먼저 읽힙니다.

**하는 동안**

- 에이전트가 허락을 물으면 내용을 보고 '예'. 설치 · 지우기 · 암호를 묻는 것은 이 글 2번에 적힌 것인지 보고 정하세요.
- 에이전트가 "화면에서 ○○를 눌러 주세요"라고 하면 그대로 해 주세요. 에이전트는 화면을 대신 누르지 않습니다.
- 아이폰 사용자께 받은 화면 캡처(기종 · iOS 버전 · 잠금 모드)를 에이전트에게 말해 주시면 적습니다.
- https 시험(S9): 아이폰 사용자가 'HTTPS 켜기'를 누르셨으면 에이전트에게 알려 주세요. 에이전트가 주소를 알려 드리면 아이폰 사용자께 보내고, 통화하며 보신 것을 에이전트에게 말해 주세요.
- 에이전트의 쓸 양이 떨어지면: Codex를 `~/oc-test`에서 열고 이 글을 붙인 뒤 "RESULTS.md를 먼저 읽고 이어서 해"라고 하세요.

**끝**

- 에이전트가 `~/oc-test/out/RESULTS.md`를 다 쓰면 그 내용을 RSCH 창에 붙여 주세요(옮기는 길은 편하신 대로).
- 개인 정보 보호 창을 닫으세요.

---

## 1. 너(맥의 에이전트)는

- 미용실 릴스(세로 짧은 영상 — MP4 · 1080×1920 · 30fps)를 만드는 웹앱 '미첼 스튜디오'가 이 맥에서 돈다. 지금 영상은 캡컷으로 만든다. 그 자리를 오픈소스 편집기 **OpenCut 옛 판(`opencut-app/opencut-classic` 커밋 cf5e79e, MIT)을 고친 판**으로 바꿀 수 있는지 오늘 밤 이 맥에서 시험한다. 시험 코드는 PMO가 짰다 — 제품 저장소 가지 `test/opencut-classic-20261120` 커밋 **c2d21a6**, 폴더 `app/opencut-test/`(변환 · 되받기 · 들여오기 · 화면 없이 뽑기 + 옛 판에 얹는 패치).
- **네 일:** 4번의 터미널 단계를 차례로 돌리고, 결과를 5번 꼴로 `~/oc-test/out/RESULTS.md`에 적는다. 화면을 보고 누르는 단계와 아이폰 단계는 한알님께 말로 부탁하고 기다린다.
- **오늘 가르는 것:**
  1. 이 맥의 Chrome이 OpenCut 엔진으로 H.264 · AAC를 뽑는가 — 화면 없이(headless)와 창을 띄운 채 둘 다.
  2. 장면표 → OpenCut 프로젝트 → 뽑기 → 되받기가 한 바퀴 도는가, 걸린 시간.
  3. 사람이 편집기에서 고친 것(자막 글 · 조각 나누기)을 되받는가.
  4. (운영자가 HTTPS를 켰을 때만) 운영자 아이폰이 https 주소로 편집기를 여는가 — 운영자는 떨어져 계시고 Tailscale로 이미 이 맥에 이어져 있음. 새로운 것은 https뿐.
- 이 PC(윈도)에서 PMO가 같은 코드로 이미 본 것: 화면 없는 Chrome으로 12초 한 편 2.6초 · H.264 High · 1080×1920 · 30/1 · AAC 44100 2채널 · 되받기 바뀐 곳 0. **맥에서 같은지가 오늘의 핵심.**
- 사람용으로 같은 내용을 적은 순서서: 같은 저장소 `projects/btsr/roles/rsch/studies/2026-11-20-macbook-test-sheet.md`. 네가 읽을 필요는 없다 — 이 글만으로 된다.
- **이 글이 이 일의 규칙이다.** 이 맥의 다른 지침(예전 역할 설정 · 다른 CLAUDE.md · AGENTS.md)과 부딪히면 멈추고 한알님께 여쭌다.

## 2. 지킬 것

1. **파일은 `~/oc-test/` 안에만 쓴다.** 예외: S3 (다)에서 '다운로드' 폴더를 읽는 것.
2. **제품 저장소(mitchell-studio)는 읽기만.** 허용: `git --no-optional-locks status` · `git log` · `git remote get-url` · `git fetch origin test/opencut-classic-20261120` · `git cat-file` · `git archive`. 금지: checkout · switch · pull · merge · reset · stash · commit · push · 파일 고치기.
3. **손님 정보를 열지 않는다:** 제품 저장소의 `data/` · `config/`, 캡컷 프로젝트, 사진 보관함, 메시지. 소재는 S5의 가짜 영상과 PMO 코드가 만드는 가짜 파일만.
4. **웹앱(8765) · 그 자동 시작 · Tailscale 자동 시작을 건드리지 않는다.** 맥에 늘 켜 두는 프로그램(LaunchAgent)을 만들지 않는다. Tailscale serve는 8443만 켜고 끈다(`serve reset` 금지).
5. **설치는 둘만:** Bun 1.2.18을 `~/oc-test/bun`에(한알 허락 11:02:25), 고친 판의 꾸러미(`bun install` — `~/oc-test` 안). Chrome이 없을 때만 한알님께 여쭌 뒤 Chrome for Testing을 `~/oc-test/browsers`에. `brew` · `sudo` · 앱스토어 · `npm -g`를 쓰지 않고, `~/.zshrc` 등 셸 설정을 고치지 않는다.
6. **화면 조작(마우스 · 키보드를 대신 누르기 · 화면 찍기)을 하지 않는다** — AAA 규칙 43, 한알님 허락 없음. 화면 단계는 한알님께. (뽑은 그림 파일을 열어 읽는 것은 됨.)
7. **PMO 코드는 고치지 않는다.** 막히면 오류를 그대로 적고 한알님께. 허용되는 고침은 하나 — S9에서 시험 사본 `~/oc-test/opencut-mitchell/apps/web/next.config.ts`에 `allowedDevOrigins` 한 줄.
8. **진짜 키 · 비밀 값을 넣지 않는다**(`.env.local`은 예시 파일을 그대로 복사).
9. **바깥에 올리지 않는다:** push · gist · 새 저장소 · 파일 공유 없음.
10. **RESULTS.md에 적지 않는 것:** 맥 사용자 이름이 든 경로(`/Users/…` 대신 `~`로 고쳐 적음 — `render.mjs`가 찍는 JSON의 경로도), Tailscale 주소 전체와 IP(`mitchell.<tailnet>.ts.net`처럼 가림), GitHub 계정 이름 · 저장소 원격 주소, 손님 정보, 키 · 비밀 값.
11. **시각은 한국 시각** — S0의 `kst`로 그 자리에서 찍는다. 짐작해서 적지 않는다.
12. 오래 걸리는 명령(clone · `bun install` · 뽑기)은 시간 제한을 넉넉히(10분). 서버처럼 계속 도는 것은 `nohup … &`로 띄우고 PID를 `~/oc-test/*.pid`에 적는다.
13. 셸 변수는 명령마다 사라질 수 있으니 **명령마다 맨 앞에 `source ~/oc-test/env.sh`**. **코드 칸 하나는 통째로 한 번에 돌린다**(칸 안에서 만든 변수가 이어지게).
14. 끝난 단계마다 RESULTS.md를 바로 고친다(중간에 끊겨도 남게). **이어서 할 때는 RESULTS.md를 먼저 읽고 끝난 단계는 건너뛴다.**

## 3. 멈추고 한알님께 여쭐 때

- 암호 · 키체인 · 로그인 · 관리자 허락 창이 뜰 때 — 무엇이 떴는지 그대로 말씀드린다.
- 2번 밖의 일이 필요할 때(설치 · 고치기 · 지우기).
- 포트 3000 · 3417 · 3418 · 8443 · 9222를 이미 누가 쓰고 있을 때 — 그 프로그램을 끄지 않는다.
- 같은 단계가 두 번 실패할 때 — 오류 끝 20줄을 RESULTS.md에 적고 다음으로 갈지 여쭌다.
- 제품 저장소 자리를 못 찾거나 둘 이상일 때.

---

## 4. 차례

다 못 하면 이 차례대로 한다. **S7까지가 오늘의 핵심**, S8 · S9는 그다음.

### S0. 준비 파일 · 시각

```zsh
mkdir -p ~/oc-test/out && cat > ~/oc-test/env.sh <<'EOF'
# 시험 환경 — 명령마다 맨 앞에서: source ~/oc-test/env.sh
export OCT="$HOME/oc-test"
if [ "$(uname -m)" = arm64 ]; then export BUNDIR="$OCT/bun/bun-darwin-aarch64"; else export BUNDIR="$OCT/bun/bun-darwin-x64"; fi
export PATH="$BUNDIR:/opt/homebrew/bin:$PATH"
export OT="$OCT/ms-test/app/opencut-test"     # PMO 시험 코드
export A="http://127.0.0.1:3417"              # 고친 판 서버
export J="$OCT/job1"                          # 가짜 작업 폴더
[ -f "$OCT/chrome.path" ] && export CH="$(cat "$OCT/chrome.path")"
[ -f "$OCT/repo.path" ] && export R="$(cat "$OCT/repo.path")"
kst() { TZ=Asia/Seoul date '+%Y-%m-%d %H:%M:%S KST'; }
EOF
source ~/oc-test/env.sh && kst
```

- 5번 꼴로 `~/oc-test/out/RESULTS.md`를 만들고 시작 시각 · 돌린 이(Claude Code / Codex)를 적는다.

### S1. 맥 확인 · 잠자기 막기

```zsh
source ~/oc-test/env.sh
sw_vers; uname -m; df -h ~ | tail -1
node -v; git --version; /usr/bin/python3 --version
ffmpeg -version | head -1; ffprobe -version | head -1
lsof -tiTCP:8765 -sTCP:LISTEN >/dev/null && echo "웹앱 켜짐" || echo "웹앱 꺼짐"      # 적기만, 건드리지 않음
for p in 3000 3417 3418 8443 9222; do lsof -nP -iTCP:$p -sTCP:LISTEN; done; echo "포트 확인 끝 — 위에 아무것도 없어야 함"
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$HOME/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"; do [ -x "$c" ] && { printf '%s' "$c" > "$OCT/chrome.path"; break; }; done
source ~/oc-test/env.sh; echo "CH=$CH"; [ -n "$CH" ] && "$CH" --version
```

```zsh
source ~/oc-test/env.sh; nohup caffeinate -dims > /dev/null 2>&1 & echo $! > ~/oc-test/caffeinate.pid
```

- **Chrome이 없으면** 한알님께 여쭘: (가) 한알님이 Google Chrome을 내려받아 `~/Applications`에 끌어 넣기(관리자 암호 없음) (나) S4 뒤에 `bunx @puppeteer/browsers install chrome@stable --path ~/oc-test/browsers`(Chrome for Testing) → 그 실행 파일 경로를 `~/oc-test/chrome.path`에 적음.
- chrome-headless-shell · 오픈소스 Chromium은 쓰지 않는다(H.264 · AAC가 없을 수 있음).

### S2. 제품 저장소 자리 · 안 올린 작업 수 (읽기만)

```zsh
source ~/oc-test/env.sh
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

### S3. 시험 코드 받기 — 커밋 c2d21a6

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

### S4. Bun 1.2.18 — `~/oc-test/bun`에만

```zsh
source ~/oc-test/env.sh && mkdir -p "$OCT/bun" && cd "$OCT/bun"
if [ "$(uname -m)" = arm64 ]; then T=darwin-aarch64; else T=darwin-x64; fi
curl -fsSL -o bun.zip "https://github.com/oven-sh/bun/releases/download/bun-v1.2.18/bun-$T.zip" && unzip -oq bun.zip && rm bun.zip
source ~/oc-test/env.sh && command -v bun && bun -v        # ~/oc-test/bun/… 의 bun · 1.2.18 이어야 함
```

- 옛 판이 Bun 1.2.18로 못 박혀 있다(`package.json` `"packageManager": "bun@1.2.18"`). 홈의 다른 Bun은 건드리지 않는다.

### S5. 가짜 영상

```zsh
source ~/oc-test/env.sh && mkdir -p "$OCT/media" && cd "$OCT/media"
ffmpeg -hide_banner -loglevel error -y -f lavfi -i testsrc2=size=1080x1920:rate=30 -f lavfi -i sine=frequency=440:sample_rate=48000 -t 10 \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest v1080_30.mp4 && ls -la v1080_30.mp4
```

- ffmpeg가 없으면 S6 서버를 띄운 뒤: `source ~/oc-test/env.sh; node "$OT/render.mjs" --page fixture --app "$A" --chrome "$CH" --out "$OCT/media/v1080_30.mp4"` (고친 판이 만드는 10초 가짜 영상).

### S6. 고친 판 띄우기 — 서버 127.0.0.1:3417

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

### S7. 변환 · 뽑기 · 되받기 — 오늘의 핵심 (T9 ㉠~㉧, T0 칸도 여기서)

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
source ~/oc-test/env.sh; ffprobe -v error -show_entries stream=codec_type,codec_name,profile,level,width,height,r_frame_rate,sample_rate,channels,bit_rate -of default=nw=1 "$OCT/out/c4_headless.mp4"   # ㉧
```

- ㉢ · ㉣은 끝에 JSON을 찍는다. `ok: true` · `problems: []`이면 규격(h264 High · 1080×1920 · 30/1 · aac · 44100 · 2채널)이 맞은 것. **`MITCHELL_AAC_UNSUPPORTED`가 나오면 AAC가 안 되는 것 — Opus로 바꾸지 않고 멈춘 정상 동작**, 그대로 적는다.
- **T0 칸:** ㉢ · ㉣ JSON의 `page.codecs`(userAgent의 Chrome 판 · hasVideoEncoder · hasAudioEncoder · hasWebGPU · avc640028_1080x1920_30 · aac_44100_2ch)와 `page.gpuAvailable`을 5번 표에 옮긴다. 쪽이 뜨기 전에 막혀 `page.codecs`가 없으면 오류를 그대로 적고 한알님께 알린다.
- ㉦ 그림 파일을 열어 읽고(화면 조작 아님) 자막 테두리 · 한글 글꼴 · 사진이 화면을 채우는지 적는다. 한알님께도 `open "$OCT/out/c4_frames.png"`로 보여 드린다.
- ㉧의 레벨은 41(4.1)이 나올 것 — 제품 규격 검사는 레벨을 보지 않는다.
- **갈림:** ㉢이 규격대로면 '맥이 화면 없이 뽑기'가 선다. ㉢만 안 되고 ㉣이 되면 '창을 띄운 채'(맥이 깨어 있어야 함). 둘 다 안 되면 오류를 적고 S8로.

### S8. 사람이 보는 들여오기 · 고치기 (T9 ④ — 한알님 화면)

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
F=$(ls -t "$OCT"/out/*.json 2>/dev/null | grep -v '/roundtrip.json$' | head -1); [ -z "$F" ] && F=$(ls -t ~/Downloads/*.json 2>/dev/null | head -1); echo "$F"
node "$OT/diff.mjs" "$J/opencut" "$F"          # 고친 자막과 '나뉨'(새 조각 id)이 나오는지
kill "$(cat ~/oc-test/serve3418.pid)" 2>/dev/null
```

- 적을 것: 목록에 떴나 · 열렸나 · 소재가 다 붙었나 · 되받기 결과(고친 자막 · 나뉨 · 나뉜 조각의 id).

### S9. https로 아이폰에서 (T1) — 한알님이 "아이폰 사용자가 HTTPS를 켰다"고 하실 때만

```zsh
source ~/oc-test/env.sh; TS="$R/app/webapp/tailscale/ts.sh"
zsh "$TS" status > /dev/null && echo "Tailscale 켜짐" || echo "Tailscale 꺼짐 — 한알님께 여쭘(켜는 것은 자동 시작이 하는 일, 직접 켜지 않음)"
zsh "$TS" serve status          # 지금 설정을 화면에서만 봄 — 있는 것은 건드리지 않음
zsh "$TS" status --json | /usr/bin/python3 -c 'import json,sys; print(json.load(sys.stdin)["Self"]["DNSName"].rstrip("."))' > "$OCT/tshost"; cat "$OCT/tshost"
```

시험 사본에 `allowedDevOrigins` 한 줄을 넣고 서버를 다시 띄움(개발 모드 서버가 다른 주소에서 온 요청을 막지 않게):

```zsh
source ~/oc-test/env.sh; H=$(cat "$OCT/tshost"); cd "$OCT/opencut-mitchell/apps/web"
grep -q allowedDevOrigins next.config.ts || perl -0pi -e 's/reactStrictMode: true,/reactStrictMode: true,\n\tallowedDevOrigins: ["'"$H"'"],/' next.config.ts
grep -n allowedDevOrigins next.config.ts
kill "$(cat ~/oc-test/dev3417.pid)" 2>/dev/null; sleep 1; lsof -tiTCP:3417 -sTCP:LISTEN | xargs kill 2>/dev/null; sleep 2; echo "서버 내림"
```

→ S6의 서버 띄우기 두 칸(띄우기 · 기다리기)을 다시 돌린다.

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

### S10. 되돌리기 — 한알님이 '끝'이라고 하신 뒤

```zsh
source ~/oc-test/env.sh
[ -n "$R" ] && zsh "$R/app/webapp/tailscale/ts.sh" serve status          # 8443이 남아 있으면 S9의 끄기
for f in dev3417 serve3418 caffeinate; do [ -f "$OCT/$f.pid" ] && kill "$(cat "$OCT/$f.pid")" 2>/dev/null; done
for p in 3417 3418; do lsof -tiTCP:$p -sTCP:LISTEN | xargs kill 2>/dev/null; done
pkill -f "oc-test/chrome-" ; true
for p in 3000 3417 3418 8443 9222; do lsof -nP -iTCP:$p -sTCP:LISTEN; done; echo "포트 확인 끝 — 다 비어야 함"
lsof -tiTCP:8765 -sTCP:LISTEN >/dev/null && echo "웹앱 켜짐" || echo "웹앱 꺼짐"   # S1과 같은지
```

- `~/oc-test`는 지우지 않는다 — 결과를 넘긴 뒤 한알님이 정하신다(지우면 Bun · 시험 사본 · 가짜 소재가 다 사라짐).
- (가)로 받았으면 제품 저장소에 받은 가지 표시(`origin/test/opencut-classic-20261120`)가 남는다 — 작업 파일 · 가지와 상관없어 그대로 둔다.
- 마지막으로 RESULTS.md에 끝 시각을 적고 한알님께 "RESULTS.md를 RSCH 창에 붙여 주세요"라고 말씀드린다.

---

## 5. RESULTS.md 꼴

```markdown
# 맥북 시험 결과 — 2026-11-20 · MITCHELL_STUDIO/BTSR/RSCH/S5_MAC_TEST

- 돌린 이: (Claude Code / ChatGPT Codex) · 시작 (KST) · 끝 (KST)
- 코드: 제품 가지 test/opencut-classic-20261120 @ c2d21a6 — 받은 길 (가) git fetch / (다) ZIP · 포크 = opencut-classic cf5e79e + PMO 패치
- 끝까지 간 단계: S0 … S10 (못 한 단계와 까닭)

## 1. 결과 (한 줄씩)
- 화면 없이 뽑기(㉢):
- 창을 띄운 채 뽑기(㉣):
- 한 바퀴(들여오기 ㉤ · 되받기 ㉥):
- 사람이 고친 것 되받기(S8):
- 아이폰 https(S9): 했음 / 안 함 —
- 걸린 시간:

## 2. 기록 칸

### 맥
| 칸 | 값 |
|---|---|
| macOS 판 · 칩 | |
| Chrome 판 · 자리(앱 이름만) | |
| node · bun · git · ffmpeg · python3 | |
| 빈 디스크 | |
| 시작 때 웹앱(8765) 켜짐/꺼짐 · 끝날 때 | |
| 포트 3000 · 3417 · 3418 · 8443 · 9222 (시작 · 끝) | |

### 제품 저장소 (읽기만 · 수만)
| 칸 | 값 |
|---|---|
| 가지 첫 줄(`git status -sb`) | |
| 커밋 안 한 파일 수 · 안 올린 커밋 수 · 치워 둔 작업 수 | |
| 받기 앞뒤 가지 첫 줄이 같았나 · c2d21a6 있었나 | |

### T0 — 맥 Chrome 능력 (㉢ · ㉣의 page.codecs)
| 칸 | 화면 없이(㉢) | 창을 띄운 채(㉣) |
|---|---|---|
| userAgent의 Chrome 판 | | |
| hasVideoEncoder · hasAudioEncoder · hasWebGPU | | |
| avc640028_1080x1920_30 (H.264) | | |
| aac_44100_2ch (AAC) | | |
| gpuAvailable | | |

### T-i — 아이폰 (한알님이 전해 주신 것)
| 칸 | 값 |
|---|---|
| 기종 · iOS 판 · 잠금 모드 | |

### T9 — 시험 코드로 한 바퀴
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
| S8: 목록에 떴나 · 열렸나 · 소재가 다 붙었나 · 되받기(고친 자막 · 나뉨 · 새 id) | |

### T1 — https (했을 때만)
| 칸 | 값 |
|---|---|
| serve 명령의 실제 꼴 · 주소가 열렸나(주소는 가림) · 인증서 경고 | |
| allowedDevOrigins를 넣었나 · 서버를 다시 띄웠나 | |
| 아이폰: 열렸나 · Desktop only 뒤 들어가졌나 | |
| 벽 영상: 남았나/사라졌나 · 미리보기 영상 · 소리 | |
| 손가락으로 된 것 · 안 된 것 | |
| 뜨거워짐 · 탭이 다시 읽힘 | |

### 뜬 창 (암호 · 허락 · 접근)
| 무엇이 · 언제 · 어떻게 했나 | |
|---|---|

## 3. 증거 — 돌린 명령과 출력(길면 끝 20줄) · 시각
## 4. 바뀐 것 — 맥에 남긴 것(`~/oc-test` 안 목록 · 제품 저장소의 받은 가지 표시 · serve 설정을 되돌렸나)
## 5. 남은 것 · 막힌 것
## 6. 배운 것 · 다음 (PMO에 넘길 것)
```
