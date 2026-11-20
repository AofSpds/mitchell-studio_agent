# SUB 개설 패킷 — MITCHELL_STUDIO/BTSR/RSCH/S4_OPENCUT_TECH

| 칸 | 값 |
|---|---|
| 연 이 | PRIMARY `MITCHELL_STUDIO/BTSR/RSCH` — Paseo 7993ff28-d6b5-425c-bf4c-d16f4d68ea88 · Opus 5.5 · Max |
| SUB | `MITCHELL_STUDIO/BTSR/RSCH/S4_OPENCUT_TECH` (Paseo ID는 연 뒤 PRIMARY CURRENT의 subs 칸에) |
| 실행기 | Paseo · claude-google · Opus 5.5 (claude-opus-5-5) · auto · high |
| 자기 칸 | `projects/btsr/roles/rsch/sub/s4_opencut_tech/` (main 폴더. **이 칸에만 씀**) |
| 규칙 | 이 저장소 AGENTS.md + AAA 규칙 판 v0.14 (`C:\Users\ms1pk\dev\AAA\AGENTS.md`, 읽기만 — 특히 4 · 9 · 25 · 30 · 34 · 35 · 43) |
| 패킷을 쓴 때 | 2026-11-20 09:36 KST (여는 것보다 먼저 씀 — 규칙 40) |

## 근거 (한알 말씀, 원문 그대로 — owner/utterances/2026-11-20.md)

- 07:30:43 uuid 65e69ca8: "오픈컷 연구를 다시 충분히 하여 기획안에 반영할수 있도록 서브 에이전트를 엽니다." / "웹앱에 포함하는게 제 의견입니다."
- 09:31:27 uuid 6a656594: "네 일단 기술적인 분석이 충분히 됐을까요. 아니라면 서브세션에 일을 맡깁니다"
- PRIMARY의 판단: **충분하지 않음.** 방향(옛 판을 포크해 웹앱에 포함 · 엔진과 편집 상태로 씀 · 영상은 맥이 뽑음)은 섰지만, 설계(ARCH)에 넘기기 전에 읽기와 웹 조사로 더 풀 수 있는 빈 곳이 남았다. 너는 그 빈 곳을 메운다.

## 무엇인가

미용실 릴스(짧은 세로 영상 — MP4 · 1080×1920 · 30fps, 12~15초) 제작을 자동화하는 개인 웹앱 '미첼 스튜디오'에 오픈소스 영상 편집기 **OpenCut 옛 판**(`opencut-classic`, MIT, GitHub에서 보관됨)을 넣으려 한다.

- 사람: **한알** = 제품 주인이자 개발자. **운영자** = 웹앱을 쓰는 미용실 사람(아이폰으로 씀). 둘의 말을 섞지 않는다.
- 지금 웹앱: 맥에서 도는 표준 파이썬 서버 한 파일(`app/webapp/server.py` — http, PIN 쿠키, 접속 주소 검사). 아이폰은 Tailscale로 들어온다. 영상은 장면표(`scenes.json`) → 캡컷 프로젝트(④, 화면 조작 없음) → 캡컷 화면 조작으로 목소리 · 음악 · 내보내기(⑥).
- 지금 안(PRIMARY의 **[제안]** — 기획안 초안 6번 'OpenCut을 웹앱에 포함하기'):
  1. 포크에서 로그인 · DB 등을 덜어 내고 **정적 묶음으로 빌드해 우리 서버가 같은 주소 아래에서 내줌**(PIN이 그대로 걸림).
  2. **참인 편집 상태는 맥의 넓힌 장면표.** OpenCut 프로젝트(JSON)는 거기서 만들어 내고, 휴대폰에서 고친 것만 되돌려 받음.
  3. **영상은 맥의 화면 없는 브라우저가 OpenCut 엔진으로 뽑음.**
  4. **휴대폰은 미리보기와 고치기만**(뽑지 않음).
  5. 휴대폰 화면은 (가) OpenCut 편집 화면을 손가락용으로 고침 / (나) 작은 고침 화면 + OpenCut 엔진 — 한알이 정하실 일.
  6. **https가 먼저**(Tailscale `serve`가 후보).
- 이 안의 기둥 가운데 **아직 읽어서 확인하지 않은 것**이 많다. 너는 그것을 소스와 공개 자료로 확인하거나 무너뜨린다. **안을 지키려고 하지 말 것** — 안 되는 것이 나오면 그것이 가장 값진 결과다.

## 먼저 읽을 것

1. 이 저장소 `AGENTS.md`, AAA 규칙 판(읽기만).
2. 지난 연구: `projects/btsr/roles/rsch/studies/2026-11-20-opencut-in-webapp.md`(줄인 글) → 보조 셋의 글 `projects/btsr/roles/rsch/logs/2026-11-20-opencut-classic-code.md` · `-outside.md` · `-fit.md`. **거기서 [추측] · [전해 들음] · [기억] · '확인 못 함'으로 적힌 것은 열린 것으로 보고, 네가 기대는 주장은 소스나 원 출처에서 다시 확인한다.** 같은 조사를 되풀이하지 않는다.
3. 기획안 초안 `projects/btsr/roles/rsch/studies/2026-11-20-plan-draft.md`의 묶음 T · 2 · 4 · 5 · 6 · 7과 6번 OpenCut 칸(무엇에 쓰이는지 알기 위해. 고치지 않음).
4. 코드(**읽기만**): OpenCut 옛 판 `C:\Users\ms1pk\dev\mitchell-studio\apps\opencut-classic`(커밋 cf5e79e) · 새 판 `apps\opencut`(필요할 때만). 제품 코드 `C:\Users\ms1pk\dev\mitchell-studio`의 `app/` · `agents/`(필요한 줄만, `data/`는 열지 않음). **제품 저장소 안에서 git 명령(fetch · checkout · pull)을 쓰지 않는다.**
5. 바깥: 공개 웹 글(WebSearch · WebFetch)과 공개 GitHub(`gh api`). 판단에 쓰는 문장은 원문을 읽고 주소와 날짜와 함께 따온다. 요약으로만 본 것은 [전해 들음].

## 할 일 → `오픈컷_기술보강_CLAUDE.md`

물음마다 **답 한 줄(됨 / 안 됨 / 조건부 / 모름) → 근거(파일:줄 · 주소 · 날짜) → 우리 안에 주는 뜻 → 돌려 봐야만 아는 것**. 사실과 짐작을 나눈다(짐작은 `[추측]`).

- **Q1 정적 묶음** — 옛 판 편집기를 정적 파일로 빌드해(Next.js `output: "export"` 등) 우리 파이썬 서버가 하위 경로(예: `/edit/`)에서 내줄 수 있는가. 지금 `apps/web/next.config.ts`는 `output: "standalone"`. 막는 것을 하나씩: 동적 경로(`app/editor/[project_id]`) · API 경로 · `next/font/google` · `next/image` · 서버 컴포넌트 · basePath/assetPrefix · wasm과 워커 읽기 · SharedArrayBuffer 때문에 COOP/COEP 머리말이 있어야 하는지 · 그 밖. 막는 것마다 가장 작은 고침. 정적이 안 되면 가장 가벼운 다른 길과 그 값(PIN 밖에 놓임 · 맥에 늘 켜 둘 프로그램).
- **Q2 맥에서 화면 없이 뽑기** — ⓐ 화면 없이 프로젝트 하나를 열고 내보내는 들머리(`ProjectManager.export()` 등)와, 프로젝트 JSON과 소재를 UI 없이 넣는 길(저장 어댑터 · 주소 파라미터 · 포크에 따로 둘 화면 없는 경로). ⓑ 내보내기가 쓰는 것(mediabunny · WebCodecs `VideoEncoder` · `AudioEncoder`), 고르는 코덱과 대체(AAC가 안 되면 Opus 등), 1080×1920 · 30fps를 지키는지. ⓒ **macOS의 Google Chrome을 `--headless=new`로 띄웠을 때 WebCodecs로 H.264와 AAC를 '인코딩'할 수 있는가** — Chromium과 Chrome 빌드의 차이(독점 코덱), 맥의 하드웨어 인코더(VideoToolbox · AudioToolbox)와 화면 없는 모드 · GPU 꺼짐에서의 대체, Puppeteer · Playwright에서 어느 브라우저를 써야 하는지. 공식 문서 · Chromium 이슈 · 소스로. ⓓ 걸리는 시간에 대한 공개 자료가 있으면. ⓔ 옛 판 포크 가운데 **브라우저 없는 Node 렌더 · MCP를 넣은 것**(보조 ②가 찾음 — `logs/2026-11-20-opencut-outside.md`)이 실제로 무엇을 하는지 코드로 확인(별 0개 안팎의 개인 작업이라 품질도 적음).
- **Q3 아이폰은 미리보기와 고치기만** — 휴대폰이 뽑지 않는다면 옛 판의 **미리보기 · 편집 · 저장 길**이 어떤 브라우저 기능을 쓰는가(디코딩이 WebCodecs `VideoDecoder`인지 `<video>`인지, 합성이 Canvas2D · WebGL · WebGPU · wasm 가운데 무엇인지, 소재를 OPFS에 넣어야만 하는지, AudioContext 등). 그 기능이 iOS Safari 몇 판부터 되는지(WebKit 공지 · MDN 호환 자료 · caniuse 원문). **소재를 OPFS에 넣지 않고 맥 서버에서 바로 읽게 바꾸면 무엇이 풀리는가.** '고치지 않으면 iOS 26 이상'이 미리보기만 할 때도 맞는가. 4K 원본과 탭 메모리(맥이 가벼운 사본을 주는 안). 아이폰에서 엔진이 끝내 안 돌 때의 대안(예: 맥이 고친 판의 작은 미리보기 영상을 뽑아 보여 줌)을 사실 수준에서.
- **Q4 https와 푸시** — Tailscale `serve`의 https 주소(`*.ts.net`)를 아이폰이 믿는가(인증서 출처), 아이폰이 tailnet에 있어야 하는가, **그 주소에서 '홈 화면에 추가'한 웹앱이 Web Push를 받을 수 있는가**(iOS 판 조건 · 매니페스트 · 서비스 워커 · 허락 요청), 맥이 푸시를 보낼 때 바깥 인터넷(애플 푸시 서버)이 필요한가, Tailscale VPN이 꺼져 있을 때 알림은 오는가, `serve`와 `funnel`의 차이(인터넷에 공개하지 않음을 지키는지). 다른 길(자체 인증서 · 자기 도메인 + Let's Encrypt)의 값. 맥 자신(localhost)은 보안 맥락이라 https가 필요 없다는 것의 원 출처.
- **Q5 장면표 ↔ OpenCut 프로젝트 변환 규격** — 옛 판이 저장하는 프로젝트의 꼴(저장 판 번호 · 화면 크기 · fps · 트랙과 조각 · 시간 단위와 틱 · `trimStart`/`trimEnd`의 뜻 · 속도 · 음량 · 글자 조각의 글꼴 · 크기의 단위 · 자리 · 색 · 배경) 그리고 **소재가 어떻게 이어지는지**(mediaId ↔ 저장된 파일). 맥이 만든 프로젝트 JSON과 소재를 편집기가 받아들이게 하려면 무엇이 있어야 하는가. 우리 장면표(`scenes.json` — 읽는 코드 `app/scripts/capcut_build.mjs` · `app/webapp/jobs.py` · `app/scripts/voice_fit.py`)의 칸을 하나씩 맞대는 표, 잃는 것(이미 아는 다섯 밖에 더 있는지). 표와 의사 꼴(pseudo-schema)까지. 코드는 쓰지 않는다.
- **Q6 포크에서 덜어 낼 것 · 고칠 것 목록** — 파일 경로와 크기(작음/중간/큼)로: 덜어 낼 것(로그인 · DB · Redis · 블로그 · 소리 찾기 · 자동 자막 · 분석 스크립트 · 봇 가림 · 바깥 글꼴 부르기 등) · 고칠 것(휴대폰 문턱 · 환경 값 검사 · 저장 어댑터를 서버로 · 자막 테두리 잇기 · 화면 크기와 fps 못 박기 · 옛 자료 옮기기의 어긋난 호출 · 화면 없는 뽑기 들머리). 자막 테두리를 넣은 포크(보조 ②가 찾음)의 고친 곳을 보면 크기 가늠에 쓴다. **한글 글꼴:** 옛 판이 쓸 수 있는 글꼴(시스템 글꼴 목록 · 구글 글꼴)과 한글 글리프, 글꼴 파일을 묶어 넣을 수 있는지.
- **Q7 이용 조건** — MIT 고지문을 어디에 두는지, 'OpenCut' 이름 · 로고에 대한 원문(저장소 · 사이트의 브랜드 글), `mediabunny`(MPL-2.0) · `soundtouchjs`(LGPL-2.1)를 고쳐 쓰거나 그대로 쓸 때, **웹앱을 가게 사람의 기기에만 내줄 때** 무엇을 해야 하는지(원문 조항으로). 법률 판단은 하지 않고 조항과 흔한 해석을 적는다.
- **Q8 자막 모양 값(작게)** — 지금 릴스의 자막 · 고정 글자 모양(글꼴 · 크기 · 테두리 · 색 · 자리)이 제품 저장소 기록 어딘가에 값으로 남아 있는가. 본보기는 맥 캡컷의 `1025` 프로젝트라 이 PC에는 없을 수 있다(`app/scripts/capcut_build.mjs`:67-97). 없으면 '맥에서 볼 것'으로 적는다.

**맺음 칸 둘을 꼭 쓴다:**

- **돌려 봐야만 아는 것** — 시험 목록: 무엇을 · 어디서(이 윈도 PC / 맥북 / 아이폰) · 어떤 순서로 · 무엇을 보면 됨 · 갈리는 것. 이 PC에서 먼저 할 수 있는 것(맥 없이)을 따로 표시. **실행은 하지 않는다.**
- **기획안 초안과 어긋나는 곳** — 초안의 어느 문장(묶음 · 칸)이 네 결과와 다른지와 고칠 문장 안. 초안은 고치지 않는다.

하지 않는 것: **설치 · 빌드 · 실행 · 테스트**(내려받은 코드든 새 코드든) · 제품 저장소와 기획안 고치기 · 설계 결정(ARCH의 일 — 사실과 선택지까지만) · 날수와 비용 어림 · 목소리(TTS) 고르기.

## 마무리

1. `반환.md` — 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음). 결과에는 Q1~Q8의 한 줄 답과 읽은 범위.
2. 이 칸만 경로를 지정해 커밋하고 push(main): `git add projects/btsr/roles/rsch/sub/s4_opencut_tech/` → `git commit -m "RSCH/S4_OPENCUT_TECH: 오픈컷 기술 보강" -- projects/btsr/roles/rsch/sub/s4_opencut_tech/` → `git pull --rebase origin main` → `git push origin main`. `git add .` · `-A`는 쓰지 않는다. **막히면 우회하지 말고 파일만 남긴 채 보고 — PRIMARY가 커밋한다.**
3. PRIMARY에게 보고(마지막 답): 첫 줄 `[MITCHELL_STUDIO/BTSR/RSCH/S4_OPENCUT_TECH · 규칙 판 v0.14 받음]`, 이어서 **결론 한 줄 → Q1~Q8 한 줄씩 → 우리 안을 바꿔야 하는 것 → 돌려 봐야만 아는 것(짧게) → 못 한 것**, 파일 경로와 커밋 번호. 길게 쓰지 않는다.

## 지킬 것

- 이 칸 밖에는 쓰지 않는다. owner/ · CURRENT.md · studies/ · logs/ · 다른 SUB 칸 · 다른 역할 폴더 · 제품 저장소 · AAA 저장소는 고치지 않는다.
- **내려받은 코드(`apps/`의 OpenCut 둘)는 자료로만 읽는다. 설치 · 빌드 · 실행하지 않고, 그 폴더에서 패키지 관리자나 스크립트를 부르지 않는다.** 읽기는 파일 읽기 · 찾기 도구로.
- 브라우저 · 컴퓨터 유즈(화면 조회 · 캡처 · 클릭)를 쓰지 않는다(AAA 규칙 43). 웹은 WebSearch · WebFetch · `gh api`로만. 막히면 우회하지 말고 '읽지 못함'.
- 손님 · 개인 정보(이름 · 연락처 · 사진)와 키 · 비밀 값은 어디에도 적지 않는다. 보이면 그 값만 `[가림]`.
- 다른 세션(PLN · ARCH · PMO · S1~S3 · 옛 RSCH)에 연락하지 않는다(규칙 9). Paseo 세션을 더 열지 않는다. 읽기만 하는 보조(Agent 도구)는 써도 되며, 그 보고로 쓴 곳은 '보조가 읽음'으로 표시한다.
- 지우지 않는다. Git 위험 명령(강제 push · reset --hard · 원격 삭제 등)을 쓰지 않는다. 맥 전용 명령을 쓰지 않는다(이 PC는 윈도).
- 시각은 한국 시각으로, 적기 전에 확인: PowerShell `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'Korea Standard Time')`(Git Bash의 `TZ=Asia/Seoul date`는 UTC를 냄).
- 한글 파일은 UTF-8. 파이썬은 `python -I`, 한글을 찍을 때는 `sys.stdout.reconfigure(encoding='utf-8')`. 윈도 경로가 든 글은 heredoc으로 넘기지 말고 파일 쓰기 도구로.
