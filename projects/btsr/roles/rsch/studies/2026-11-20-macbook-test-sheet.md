# 맥북 시험 순서서 — 오늘(11-20) 저녁 · OpenCut 옛 판을 고치지 않고

- 쓴 이: MITCHELL_STUDIO/BTSR/RSCH (Paseo 7993ff28) · 쓴 때: 2026-11-20 13:31~ KST · **고침 14:29 KST — PMO의 시험 코드(BTSR-RSCH-001, 제품 가지 `test/opencut-classic-20261120` c2d21a6)를 T9로 넣고 차례를 바꿈.** T9가 T2의 화면 없는 뽑기와 T3-반을 대신하고, T2는 덤으로 내려감. T1은 T9의 서버를 씀.
- **고침 16:44 KST — 한알 16:35:54 「오늘 맥북 테스트를 위한 준비를 해야 합니다」:** RSCH가 PMO 시험 코드(c2d21a6)를 맥 쪽에서 다시 읽고 막힐 곳 넷을 고침(7번의 9) · **0-1 시작 전에 갖출 것** · 코드와 이 글을 받는 길 **(다)**(맥 Safari 개인 정보 보호 창에서 한알님 GitHub)를 더함.
- 근거 말씀(`owner/utterances/2026-11-20.md`): 09:40:13 「실테스트는 맥북에서 오늘 저녁에 진행합니다」 · 10:10:04 「네 테스트를 위해서 어디까지 구현을 할까요」 · 11:02:25 「아 그건 괜찮아요. 그 외에 맥북 원래 사용자가 인증이 필요한 항목이 있을까요」(Bun 설치 허락) · 13:25:19 「네 일단 저녁에 다시 정리부탁드리구요. / 테스트 코드는 구현을 해야겠지요?」
- 바탕: S4의 `sub/s4_opencut_tech/오픈컷_기술보강_CLAUDE.md` 9번. 명령은 거기서 옮겼고, RSCH가 바꾼 곳은 **[고침]**으로 표시했습니다(목록은 맨 끝 7번).
- **아무도 돌려 본 적 없는 명령입니다.** 꼴이 틀리면 `--help`를 보고 고쳐 쓰고, 고친 꼴을 기록 칸에 적어 주세요.
- 이 맥북 = 웹앱(8765)과 캡컷이 도는 운영자의 맥북으로 읽었습니다 **[내 읽기]**. 다른 맥북이면 1-3을 보세요.
- 손 표시: **[터미널]** 터미널 명령만(에이전트에게 맡길 수 있음) · **[화면]** 브라우저 화면을 보고 누름(사람 — 에이전트가 하려면 화면 조작 허락이 따로 듦, AAA 규칙 43) · **[아이폰]** 아이폰을 손에 듦(사람).

---

## 0. 한눈에

| 차례 | 시험 | 무엇을 가르나 | 필요한 것 | 손 | 시간 [추측] |
|---|---|---|---|---|---|
| 1 | **T0** 맥 Chrome 능력 | 맥이 OpenCut 엔진으로 H.264 · AAC를 뽑을 수 있나. 안 되면 '맥이 뽑기'의 첫째 후보가 무너짐 | Chrome | 터미널 + 화면 | 15분 |
| 2 | **T-i** 아이폰 능력 | iOS 판과 기능 → 옛 판을 고치지 않고 되나(iOS 26) / 고쳐야 하나 | **운영자 아이폰 설정 화면 캡처 두 장(1-5의 ① — 지금 받을 수 있음)** · (덤) 케이블 | 운영자 | 1분 (덤 15분) |
| 3 | **T9** 시험 코드로 한 바퀴 (PMO의 MAC_RUN) | 맥이 우리가 고친 판으로 **화면 없이 한 편을 뽑나**(시험 2의 실물) · 들여오기 · 사람이 고치고 나눈 것을 되받나 · 걸린 시간 | **맥에 코드 받기 — (다) GitHub ZIP [권고] (1-3)** · Bun(허락됨) | 터미널 + 화면 | 60분 |
| 4 | **T1** https로 아이폰에서 열기 | https 길, 아이폰에서 엔진이 도나 — T9의 서버로 | **HTTPS 켜기(아직 안 정해짐)** · 운영자 계정 | 터미널 + 아이폰 | 45분 |
| 5 | **T8** 캡컷 1025의 글자 값 | 자막 · 고정 글자의 모양 값 — T9의 글자 모양(지금은 시안)을 맞출 바탕 | 운영자 동의 | 터미널 | 15분 |
| 6 | (덤) **T2** 옛 판 그대로 화면에서 뽑기 | 고치지 않은 판의 화면 뽑기 · 60fps 소재 · 화면의 한글 글꼴 | Bun | 터미널 + 화면 | 60~90분 |
| — | (덤) **T3-반** 저장 꼴 | T9의 3번(사람이 고치고 나눈 뒤 되받기)이 대신함. 저장 꼴은 PMO가 이 PC에서 들여오기 → 저장 → 꺼내기로 '바뀐 곳 0'까지 봄 | — | — | — |

- 다 못 하면 위 차례대로 합니다. 1~5를 합쳐 2시간 30분 안팎 **[추측]**.
- **PMO가 이 PC(윈도 · Chrome 157)에서 이미 본 것(반환서 `btsr/pmo` 가지 `projects/btsr/roles/pmo/records/opencut-test/`):** 화면 없는 Chrome으로 장면표 → 프로젝트 → 들여오기 → 12초 한 편 뽑기(2.6초, H.264 High · 1080×1920 · 30/1 · AAC) → 되받기(바뀐 곳 0). 뽑은 파일에서 자막 테두리 · 한글 글꼴 · 'AI 합성' 표시 · 끝 문구가 보임. **맥에서 같은지가 오늘 밤의 핵심입니다.**
- **오늘 못 하는 것:** 시험 3의 실물(진짜 목소리 파일 — 지금 목소리는 캡컷 '텍스트 읽기' 안에만 있음)과 시험 4(캡컷 결과와 나란히 — 글자 모양 값을 T8로 맞춘 뒤).

### 0-1. 시작 전에 갖출 것 (16:44 더함)

| 무엇 | 왜 | 없으면 |
|---|---|---|
| 맥북 · 충전기 · 인터넷(와이파이) | Bun · 고친 판 소스 · 꾸러미 · 글꼴(· 없으면 Chrome)을 받음 — 1GB 안팎 [추측] | 시작 못 함 |
| 맥 로그인 암호 — 한알님 | 잠금 풀기 · 혹시 뜨는 키체인 창 | — |
| **한알님 GitHub 로그인**(2단계 인증을 받을 휴대폰) | 이 글을 맥에서 열어 복사 · 붙여 넣기 + 시험 코드 ZIP 받기 — 받는 길 (다), 1-3 | (가) · (나)로 |
| (T-i) **운영자 아이폰 설정 화면 캡처 두 장**(1-5의 ①) — 한알님은 아이폰이 없으심(16:58:13) | iOS 판 · 기종 · 잠금 모드가 아이폰 쪽 가능 여부를 거의 다 가름(S4) | T-i 뺌 |
| (덤) 운영자 아이폰에 맞는 케이블(USB-C ↔ USB-C, 또는 USB-C ↔ 라이트닝) | 맥 Safari로 아이폰 Safari 콘솔을 봄 — T-i 덤 · T1에서 안 되는 게 있을 때 까닭 보기 | 빼도 됨 |
| (T1) 운영자: Tailscale 관리 화면에서 HTTPS 켜기 + **운영자 Tailscale에 든 아이폰**(운영자 아이폰) | https로 아이폰에서 열기 | **T1 뺌** |
| (T8) 이 맥이 캡컷 1025가 있는 맥 + 운영자 동의 | 글자 모양 값 읽기 | T8 뺌 |

- **이 글을 맥에서 보는 법:** 맥 Safari에서 **개인 정보 보호 창**(⇧⌘N)을 열고 GitHub에 한알님 계정으로 로그인 → `https://github.com/AofSpds/mitchell-studio_agent/blob/main/projects/btsr/roles/rsch/studies/2026-11-20-macbook-test-sheet.md` → 코드 칸 오른쪽 위 복사 단추로 터미널에 붙여 넣음. 시험 코드 ZIP도 이 창에서 받음(T9 ①). **다 끝나면 이 창을 닫음** — 로그인이 운영자 맥 · 키체인에 남지 않음.
- 처음 몇 줄(2번의 `mkdir` · `caffeinate`)부터 이 창에서 복사해 씁니다.

---

## 1. 시작 전에

### 1-1. 운영자(맥북 주인)께서 해 주실 것

1. ~~맥 잠금 풀기~~ → **한알님이 하심** — 한알님이 이 맥북을 빌려 오심(16:27:42 「제가 맥북을 빌려온 상황이고 잠금이나 이런건 할수 있어요.」). 2번의 잠자기 막기를 켜 두면 처음 한 번이면 됩니다.
2. **(T1을 할 때만) Tailscale 관리 콘솔에서 HTTPS 켜기** — login.tailscale.com에 운영자 계정으로 들어가 DNS 쪽에서 MagicDNS 켜기 · HTTPS Certificates 'Enable HTTPS'. 맥과 아이폰의 Tailscale이 운영자 계정으로 로그인돼 있습니다(제품 `agents/pmo/logs/2026-11-09_tailscale-access.md`:35). **켜면 맥의 Tailscale 이름(기록상 `mitchell` — 같은 글 :29)과 tailnet 이름이 공개 인증서 장부(CT)에 영구히 남습니다.** 이름을 바꿀 거면 켜기 전에. 관리 화면은 웹이라 운영자가 맥 곁에 없어도 자기 휴대폰에서 켤 수 있음 **[추측]**. 다만 T1에는 운영자 Tailscale에 든 아이폰도 있어야 함(3번 · 1-3-1).
3. **(운영자 아이폰으로 할 때) 아이폰 잠금 풀기 · 케이블로 이을 때 '이 컴퓨터를 신뢰' + 아이폰 암호.** 다른 아이폰으로 T1을 하려면 그 아이폰을 운영자 Tailscale에 더해야 해서 결국 운영자 계정이 듭니다(T-i만이면 아무 아이폰이나 됨). **(17:02 고침) 한알님은 아이폰이 없으심(16:58:13 「저는 없어요.」) → T-i · T1 모두 운영자 아이폰. T-i는 설정 화면 캡처로 줄이고 케이블은 덤으로 내림. 운영자께는 1-5의 쉬운 글로 여쭘(한알님이 여쭈심 — 「운영자 아이폰은 얘기할께요」).**

### 1-2. 운영자께 여쭐 것 (인증은 아님)

- **T8:** 캡컷 1025 프로젝트 파일을 읽는 것(읽기만, 캡컷은 끈 채).
- ~~**T8의 덤(안 해도 됨):** 승인된 릴스 한 편에서 프레임 한 장으로 자막 크기를 재는 것 — 손님 영상이라서.~~ → **오늘은 하지 않음(17:02 — 운영자께 여쭐 것을 줄여 쉽게)**. 1025 파일의 숫자만으로 감.

### 1-3. 정할 것

- **HTTPS를 켤지** — 안 켜면 T1만 빠집니다.
- **누가 돌리나** — 한알님(16:27:42 맥북을 빌려 오심)으로 읽음 **[내 읽기]**. [터미널] 칸은 에이전트에게 맡길 수도 있고, [화면] · [아이폰] 칸은 사람. **16:52:52 — 이 맥북은 웹앱을 Claude Code와 ChatGPT(Codex)로 만들던 맥 → [터미널] 칸을 맥의 Claude Code에 맡길지 여쭘(답 기다림).** 이 PC의 Paseo에는 맥이 연결돼 있지 않아(16:53 확인) RSCH와 맥 Claude Code는 직접 주고받지 못함 — 결과는 한알님을 거쳐 옴.
- **맥에 시험 코드를 받는 길(T9)** — 제품 저장소 · 이 글의 저장소가 둘 다 비공개라 셋 가운데 하나 **[16:44 고침 — (다)를 권고로]**:
  - (다) **맥 Safari 개인 정보 보호 창에서 한알님 GitHub로 ZIP 받기 [권고]** — 이 글을 여는 그 창에서 받음(0-1). 커밋 c2d21a6에 못 박은 주소라 그 뒤 가지가 바뀌어도 같은 코드. 휴대폰 · AirDrop이 필요 없고, 창을 닫으면 로그인이 남지 않음. 이 맥이 웹앱 맥이든 아니든 됨.
  - (가) **이 맥의 제품 저장소 사본에서 받아 꺼내기** — 웹앱이 도는 맥이고 사본에 GitHub 로그인이 저장돼 있을 때. `git fetch`는 받기만 하고 지금 가지 · 작업 중인 파일은 바꾸지 않음. 로그인 · 키체인 암호를 새로 물으면 멈추고 (다)로.
  - ~~(나) **한알님 휴대폰에서 ZIP 받아 AirDrop** — 맥에서 GitHub 로그인이 안 될 때. 한알님 휴대폰이 아이폰이어야 함.~~ → **못 씀 — 한알님은 아이폰이 없으심(16:58:13).** (다) · (가)가 다 안 되면 USB 메모리 등으로(그때 정함).
- (이 맥북이 웹앱이 도는 맥이 아니면) Tailscale이 없을 수 있음 → T1은 빼고, T8은 캡컷 1025가 있는 맥에서.

### 1-3-1. 맥북 · 애플 계정이 엮이는 곳 — 한눈에 (15:24 더함, 한알 15:22:25 「맥북이나 애플계정연계가 필요한 부분을 미리 얘기해주세요」)

- **애플 계정(Apple ID) 암호가 드는 곳은 없게 짰습니다.** 제품 기록상 운영자는 애플 계정 암호를 기억하지 못하십니다(앱스토어 대신 Homebrew로 Tailscale을 깐 까닭 — `agents/pmo/logs/2026-11-09_tailscale-access.md`:28). 앱스토어 · iCloud는 쓰지 않습니다.

| 언제 | 무엇 | 누구의 무엇 | 미리 할 것 · 안 되면 |
|---|---|---|---|
| 시작 | 맥 잠금 풀기 | **한알님(빌려 온 맥북 — 16:27:42)** | 시작 때 한 번. 잠자기 막기(2번)를 켜 두면 다시 안 물음 |
| T-i | 운영자 아이폰 설정 화면 캡처 두 장(1-5의 ①) | 운영자 — 캡처해 보내 주시기만 | 지금 메시지로 받을 수 있음. 애플 계정은 안 씀 |
| (덤) T-i · T1 | 아이폰을 케이블로 맥북에 이음(웹 속성) | 그 아이폰 주인 — 아이폰 잠금 풀기 + '이 컴퓨터를 신뢰' + 아이폰 암호. 맥에서 '액세서리 연결 허용?'이 뜨면 허용 | **17:02 덤으로 내림** — 운영자가 곁에 있어야 함. 애플 계정은 안 씀 |
| T-i · T1 | 가짜 소재를 맥북 → 아이폰으로 AirDrop(3-5) | 같은 애플 계정이면 바로 받음. 다른 계정이면 받는 아이폰의 AirDrop을 '모든 사람(10분)'으로 바꾸고 '받기' | 암호 없음 |
| T1 | Tailscale 관리 화면(login.tailscale.com)에서 HTTPS 켜기 | 운영자 — Tailscale 계정 로그인. **무엇으로 가입했는지(애플 · 구글 등)는 기록에 없음** | 애플로 가입했다면 맥 브라우저 대신 **운영자 아이폰에서 로그인**(Face ID로 됨 — 애플 계정 암호를 몰라도 됨 [추측]). 안 되면 T1만 뺌 |
| T1 | 아이폰이 운영자 Tailscale에 '연결됨' | 운영자 아이폰은 이미 들어가 있음(기록 :35-36) | 다른 아이폰이면 운영자 계정으로 그 아이폰을 더해야 함 → T1은 운영자 아이폰으로 [권고]. ~~운영자 아이폰이 곁에 없으면 T-i는 한알님 아이폰으로~~ → **한알님은 아이폰이 없으심(16:58:13) — 운영자 아이폰이 없으면 T1은 뺌** |
| T9 (다) [권고] | 맥 Safari 개인 정보 보호 창에서 GitHub 로그인 → 이 글 · 시험 코드 ZIP | 한알님 GitHub(2단계 인증은 한알님 휴대폰) | 창을 닫으면 남지 않음. 터미널이 '다운로드' 폴더를 처음 읽을 때 '허용' 한 번(암호 없음) |
| T9 (가) | 이 맥의 제품 저장소 사본에서 코드 받기(`git fetch`) | 그 맥에 이미 저장된 GitHub 로그인 | 로그인 · 키체인 암호를 새로 물으면 멈추고 (다)로 |
| ~~T9 (나)~~ | ~~한알님 휴대폰 → 맥북 AirDrop(ZIP)~~ | — | **못 씀 — 한알님은 아이폰이 없으심(16:58:13)** |
| 결과 넘기기(5번) | 기록 칸 · 파일 | 글은 화면 사진이나 붙여 넣기. 영상 · 그림 파일은 오늘은 `~/oc-test/out`에 둠 | AirDrop으로 한알님 휴대폰에 옮기는 것은 필요할 때만 |

- **암호 없이 되게 해 둔 것:** Bun(홈 폴더) · Tailscale 켜기(사용자 공간 방식 — 맥 암호 · VPN 허락 없음) · 가짜 소재(ffmpeg 이미 있음) · 시험 코드 실행(실행마다 임시 Chrome 프로필) · 1025 읽기 · 방화벽 창(127.0.0.1) · Chrome 키체인 창(`--use-mock-keychain`) · Chrome이 없을 때(홈 폴더 설치 또는 Chrome for Testing — 앱스토어 · 관리자 암호 없음).
- **드물게 뜰 수 있는 것:** git이 없다는 창(Xcode 도구 설치 — 관리자 암호) — 기록상 이 맥은 Xcode의 파이썬을 쓰므로 git도 있을 것 **[추측]**. 뜨면 설치하지 말고 적어 둠(3-4 · T9는 git이 있어야 함).

### 1-4. 지킬 것 (시험 내내)

- 제품 저장소 · `data/` · 캡컷 프로젝트는 **읽기만**. 시험은 모두 `~/oc-test/` 안에서 합니다.
- **손님 소재는 쓰지 않습니다** — 가짜 소재(3-5)만. 아이폰으로 찍어야 하면 사람이 없는 것(벽 · 책상).
- 웹앱(8765)과 그 자동 시작은 건드리지 않습니다. 맥에 늘 켜 두는 프로그램(LaunchAgent)을 만들지 않습니다.
- **운영자의 Chrome 프로필은 쓰지 않습니다** — 시험용 프로필(`~/oc-test/chrome-*`)만. **[고침]**
- 진짜 키 · 비밀 값을 넣지 않습니다(`.env.local`은 꼴만 맞는 값).
- 끝나면 6번대로 되돌립니다.

### 1-5. 운영자께 드릴 쉬운 글 (17:02 더함 — 한알 16:58:13 「저는 없어요. 운영자 아이폰은 얘기할께요 개발자가 아니니 쉽게 설명 할수 있게 해줘요」)

한알님이 그대로 읽어 드리거나 메시지로 보내셔도 되게 썼습니다(전문 낱말 없이 · 글 안의 '저'는 한알님). ①은 지금 받아 두면 저녁에 T-i가 끝나 있습니다.

> **오늘 저녁 시험 — 운영자님께 부탁드릴 세 가지**
>
> 웹앱에 '휴대폰에서 영상을 직접 고치는 화면'을 넣을 수 있을지 오늘 저녁 맥북으로 시험해 봅니다. 운영자님 아이폰에서 그 화면이 잘 돌아갈지 보려고 세 가지를 부탁드립니다.
>
> **① 지금 — 아이폰 화면 캡처 두 장 (1분)**
> - 설정 › 일반 › 정보 (기종과 iOS 버전이 보이는 화면)
> - 설정 › 개인정보 보호 및 보안 — 맨 아래까지 내려 '잠금 모드'가 보이게
>
> **② 저녁에 — 아이폰을 40분쯤 (어려우시면 빼도 됩니다)**
> - 맥북이 띄운 시험용 편집 화면을 아이폰 Safari로 열고, 시험용 가짜 영상(색 막대 화면)을 넣어 몇 군데 눌러 봅니다. 직접 눌러 보셔도 되고, 저에게 잠시 맡겨 주셔도 됩니다.
> - 아이폰 잠금은 운영자님이 직접 풀어 주세요. 암호를 알려 주실 필요는 없습니다.
> - Tailscale 앱을 켜 두시면 됩니다(이미 깔려 있어요).
> - 한 번만: Tailscale 웹 관리 화면에서 'HTTPS 켜기' 버튼을 눌러 주세요. 아이폰은 주소가 https로 시작하는 '보안 주소'에서만 영상 편집 기능을 열어 주기 때문입니다. 운영자님 계정이라 운영자님만 누르실 수 있어요(제가 옆에서 도와드릴게요).
> - 켜면 맥북의 Tailscale 이름(mitchell)이 인터넷의 공개 목록에 남습니다. 이름만 남고 맥북 안의 내용은 아무도 볼 수 없습니다. 다만 이 목록은 지울 수 없습니다.
> - 가짜 영상 몇 개를 맥북에서 AirDrop으로 보냅니다. 끝나면 지웁니다.
>
> **③ 맥북의 캡컷 프로젝트 하나(1025)에서 자막 글자 크기 · 테두리 굵기 · 색 같은 숫자만 읽어 와도 될까요?**
> - 캡컷은 켜지 않고, 영상 · 사진은 열지 않습니다.
>
> **손대지 않는 것:** 사진 보관함 · 메시지 · 카톡 · 계정 · 결제는 보지도 만지지도 않습니다. 아이폰에 앱을 새로 깔지 않습니다. 손님 사진 · 영상은 쓰지 않습니다.

- 답에 따라: ①을 받으면 T-i 끝(기록 칸에 옮김) · ②가 안 되면 T1 뺌 · ③이 안 되면 T8 뺌.
- 글 안의 'mitchell'은 맥의 Tailscale 기기 이름(제품 기록 `agents/pmo/logs/2026-11-09_tailscale-access.md`:29)입니다. 실제 공개 목록에는 `mitchell.<tailnet 이름>.ts.net` 꼴로 남습니다.

---

## 2. 암호 창 피하기 **[고침 — S4 순서에 더함]**

| 창 | 언제 뜨나 | 피하는 법 |
|---|---|---|
| 방화벽 '들어오는 연결을 허용할까요?' | 편집기 서버가 모든 주소에서 들을 때(Next의 기본) | 서버를 `-H 127.0.0.1`로 — 이 맥 안에서만. 지금 웹앱 시험과 같은 방법(제품 `agents/pmo/knowhow.md` 방화벽 줄). Tailscale serve도 127.0.0.1로 넘겨 주므로 그대로 됨 |
| 키체인 암호 **[추측]** | Chrome을 시험용 프로필로 띄울 때 | Chrome에 `--use-mock-keychain` |
| 관리자 암호 | Chrome이 없어 `/Applications`에 깔 때 | 홈 폴더 `~/Applications`에 깔거나 Chrome for Testing을 `~/oc-test`에(3-2) |
| 폴더 접근 허락(암호 없음, '허용'만) | 터미널이 '다운로드' 폴더를 읽을 때 | 시험용 Chrome의 내려받기 폴더를 `~/oc-test/out`으로(T0-1) |
| 잠자기 · 화면 잠김 | 오래 걸리는 설치 · 빌드 · 뽑기 | 아래 명령으로 잠자기를 막고, 끝나면 끔(6번) |

```zsh
mkdir -p ~/oc-test/out
caffeinate -dims & echo $! > ~/oc-test/caffeinate.pid      # 잠자기 막기 (끝나면 6번에서 끔)
```

---

## 3. 준비 — [터미널]

**3-1. 어느 맥인가** — 이 맥북이 웹앱(8765)이 도는 그 맥인지 적습니다. 그 맥이고 웹앱이 켜져 있으면 아래 줄이 제품 저장소 뿌리(T9 (가) · T1의 `<제품 저장소 뿌리>`)를 찍습니다 **[16:44 더함 · 추측]**. 아무것도 안 나오면 한알님이 아시는 자리로.

```zsh
P=$(lsof -tiTCP:8765 -sTCP:LISTEN | head -1); [ -n "$P" ] && git -C "$(lsof -a -p "$P" -d cwd -Fn | sed -n 's/^n//p')" rev-parse --show-toplevel
```

- **(16:55 더함 — 한알 16:52:52 「어 맥북에서 클로드코드랑 챗지피티로 웹앱 만들다가 온거는 아시나요」) 맥에서 GitHub에 안 올린 작업이 있는지 — 읽기만, 수만 적음(파일 이름은 적지 않음):**

```zsh
cd <제품 저장소 뿌리>
git status -sb | head -1                      # 가지 · 앞섬/뒤처짐
git status --porcelain | wc -l                # 커밋 안 한 파일 수
git log --oneline origin/main..HEAD | wc -l   # 안 올린 커밋 수(맥이 마지막으로 받은 때 기준)
git stash list | wc -l                        # 치워 둔 작업 수
```

**3-2. 판 확인**

```zsh
sw_vers; uname -m                                    # macOS 판 · arm64인지
ls -d "/Applications/Google Chrome.app" "$HOME/Applications/Google Chrome.app" 2>/dev/null
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --version
node -v; bun -v; git --version                      # bun이 없으면 3-3
/opt/homebrew/bin/ffmpeg -version | head -1; /opt/homebrew/bin/ffprobe -version | head -1
/usr/bin/python3 --version
df -h ~                                             # 빈 자리 5GB 이상 [추측]
for p in 3000 3417 3418 8443 9222; do lsof -nP -iTCP:$p -sTCP:LISTEN; done   # 아무것도 안 나와야 함(다섯 자리 모두 빔) [16:44 고침 — 3417 · 3418 더함]
```

- **Chrome이 없으면**(한알께 여쭙고 둘 가운데 하나 — 둘 다 관리자 암호 없음): (가) Google Chrome을 내려받아 `~/Applications`(없으면 만듦)에 끌어 넣음 (나) 3-3 뒤에 `bunx @puppeteer/browsers install chrome@stable --path ~/oc-test/browsers` — Chrome for Testing(H.264 · AAC 있음, S4 Q2ⓒ). 이때는 아래 `CH`를 그 앱 안의 실행 파일로 바꿈.
- 아래 명령은 모두 이 한 줄을 먼저 친 창에서 씁니다(Chrome이 `~/Applications`에 있으면 그 경로로):

```zsh
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

**3-3. Bun 1.2.18** — 한알 허락(11:02:25). 옛 판이 이 판으로 못 박혀 있음(옛 판 `package.json`:3 `"packageManager": "bun@1.2.18"` — RSCH가 다시 봄). 홈 폴더에만 깔리고 관리자 암호가 필요 없습니다.

```zsh
curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.18"
export PATH="$HOME/.bun/bin:$PATH"; bun -v           # 1.2.18
```

- **[16:44 고침]** 앞 꼴의 `exec zsh`는 셸을 새로 띄워 3-2의 `CH`를 지웠음 → 이 창에서는 PATH만 더함. 새 터미널 창은 설치기가 `~/.zshrc`에 넣은 줄로 `bun`을 찾음(그 창에서는 `CH` 줄을 다시 침).

**3-4. 옛 판 받기** (시험 폴더 — 제품 저장소 밖) — **(덤) T2를 할 때만 [16:44 고침]**. T9는 ②에서 따로 받음.

```zsh
mkdir -p ~/oc-test && cd ~/oc-test
git clone --depth 1 https://github.com/opencut-app/opencut-classic.git
cd opencut-classic && git rev-parse HEAD            # cf5e79e919144200294fb9fed22a222592a0aeea 이어야 함(보관된 저장소)
```

**3-5. 가짜 소재** (손님 소재 없이)

```zsh
mkdir -p ~/oc-test/media && cd ~/oc-test/media
FF=/opt/homebrew/bin/ffmpeg
# ① 세로 1080×1920 · 30fps · 10초 · H.264 + AAC (기본 소재)
$FF -f lavfi -i testsrc2=size=1080x1920:rate=30 -f lavfi -i sine=frequency=440:sample_rate=48000 -t 10 \
    -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest v1080_30.mp4
# ② 60fps 소재 (프로젝트 fps가 60으로 올라가는지 보기)
$FF -f lavfi -i testsrc2=size=1080x1920:rate=60 -t 5 -c:v libx264 -pix_fmt yuv420p v1080_60.mp4
# ③ 4K HEVC 10초 (아이폰 원본 흉내 — 8비트라 HDR은 아님)
$FF -f lavfi -i testsrc2=size=2160x3840:rate=30 -t 10 -c:v hevc_videotoolbox -tag:v hvc1 -b:v 20M v4k_hevc.mp4
# ④ 사진 · 목소리 · 음악
$FF -f lavfi -i color=c=steelblue:s=1080x1440 -frames:v 1 img.png
$FF -f lavfi -i sine=frequency=660:sample_rate=44100 -t 8 voice.wav
$FF -f lavfi -i sine=frequency=660:sample_rate=44100 -t 8 -c:a aac -b:a 128k voice.m4a
$FF -f lavfi -i sine=frequency=220:sample_rate=44100 -t 30 -c:a aac -b:a 128k music.m4a
ls -la
```

- `hevc_videotoolbox`가 없다고 나오면 ③은 건너뜀(적어 둠).
- 아이폰용: ①③④를 아이폰으로 AirDrop → '파일' 앱에 저장.
- **ffmpeg가 없으면**(`/opt/homebrew/bin/ffmpeg`가 없음 — 웹앱 맥이 아닐 때) **[16:44 더함]**: 3-5는 건너뛰고, T9 ②로 고친 판 서버를 띄운 뒤 터미널 2에서 가짜 영상을 고친 판으로 만듦(PMO 코드의 `/mitchell/fixture` — 10초 · 1080×1920 · 30fps · H.264 + AAC):

```zsh
mkdir -p ~/oc-test/media; OT=~/oc-test/ms-test/app/opencut-test
node "$OT/render.mjs" --page fixture --app http://127.0.0.1:3417 --out ~/oc-test/media/v1080_30.mp4   # 끝에 ok · spec이 찍힘
```

  - 이때 빠지는 것(적어 둠): ② 60fps · ③ 4K HEVC · ㉧ ffprobe(대신 `render.mjs`가 MP4 상자를 직접 읽어 규격을 봄). 아이폰용 소리는 T9 ③ 뒤의 `~/oc-test/job1/src/voice1.wav` · `music.wav`.

**3-6. Tailscale** (T1을 할 때만)

```zsh
cd <제품 저장소 뿌리>                               # 읽기만 — 스크립트만 씀
zsh app/webapp/tailscale/ts.sh status              # 꺼져 있으면(소켓 없음) 아래 줄을 다른 터미널 창에서
zsh app/webapp/tailscale/start_tailscaled.sh       # 사용자 공간 모드 — 맥 암호 · VPN 허락 없이 켜짐(그 창은 열어 둠)
zsh app/webapp/tailscale/ts.sh status              # 이 맥의 Tailscale 이름 · tailnet 이름을 봄
zsh app/webapp/tailscale/ts.sh funnel status       # funnel이 꺼져 있어야 함(인터넷 공개 아님)
```

- 그다음 1-1의 2(관리 콘솔에서 HTTPS 켜기 — 운영자).
- 아이폰: Tailscale 앱이 같은 tailnet에 '연결됨'.

**3-7. 아이폰 준비** — [아이폰] (T-i · T1) — **운영자 아이폰(17:02 고침 — 한알님은 아이폰이 없으심)**

- 설정 › 일반 › 정보에서 **iOS 버전 · 모델 이름** 적기 — 1-5의 ① 캡처로 받으면 됨.
- 설정 › 개인정보 보호 및 보안에서 **잠금 모드** 켜짐/꺼짐 적기(켜져 있으면 WebCodecs 영상이 꺼짐) — 1-5의 ① 캡처로 받으면 됨.
- (덤 — 케이블을 쓸 때만) 설정 › Safari(iOS 18부터는 설정 › 앱 › Safari) › 고급 › **웹 속성(Web Inspector) 켜기.** 케이블로 맥에 잇고(1-1의 3), 맥 Safari 설정 › 고급 › '웹 개발자용 기능 보기' 켜기. 켰으면 끝나고 끔(6번).

---

## 4. 시험마다

### T0 — 맥 Chrome 능력 재기 (설치 없음)

**T0-1. 화면 있는 Chrome(시험용 프로필)** — [터미널]로 띄우고 [화면]으로 봄 **[고침: 운영자 프로필 대신 시험용 프로필]**

```zsh
"$CH" --user-data-dir="$HOME/oc-test/chrome-test" --use-mock-keychain --no-first-run --no-default-browser-check https://example.com &
```

- 먼저 그 창에서 `chrome://settings/downloads` → 위치를 `~/oc-test/out`으로 바꿈(T2의 뽑은 파일이 여기로 옴).
- example.com 쪽에서 개발자 도구(⌥⌘J) 콘솔에 한 줄씩:

```js
await VideoEncoder.isConfigSupported({codec:'avc1.640028', width:1080, height:1920, framerate:30, bitrate:6e6})
await VideoEncoder.isConfigSupported({codec:'avc1.640028', width:1080, height:1920, framerate:30, bitrate:6e6, hardwareAcceleration:'prefer-hardware'})
await VideoEncoder.isConfigSupported({codec:'avc1.640028', width:1080, height:1920, framerate:30, bitrate:6e6, hardwareAcceleration:'prefer-software'})
await AudioEncoder.isConfigSupported({codec:'mp4a.40.2', sampleRate:44100, numberOfChannels:2, bitrate:192000})
(()=>{const g=document.createElement('canvas').getContext('webgl2'); const e=g&&g.getExtension('WEBGL_debug_renderer_info'); return g? g.getParameter(e.UNMASKED_RENDERER_WEBGL):'webgl2 없음'})()
!!(navigator.gpu && await navigator.gpu.requestAdapter())
```

- `chrome://gpu`를 열어 'Video Encode' · 'WebGL' · 'WebGPU' 줄을 적음.

**T0-2. 화면 없는 Chrome(새 headless)** — [터미널] **[고침: 시험용 프로필 · mock keychain]**

```zsh
"$CH" --headless=new --enable-gpu --use-mock-keychain --user-data-dir="$HOME/oc-test/chrome-headless" \
      --print-to-pdf="$HOME/oc-test/out/gpu-headless.pdf" chrome://gpu          # GPU 상태를 PDF로 (안 되면 건너뜀)
"$CH" --headless=new --enable-gpu --use-mock-keychain --user-data-dir="$HOME/oc-test/chrome-headless" \
      --autoplay-policy=no-user-gesture-required --remote-debugging-port=9222 https://example.com
```

- 그 창은 둔 채, T0-1의 시험용 Chrome에서 `chrome://inspect` → 'Configure…'에 `localhost:9222` → 뜬 쪽의 'inspect' → 콘솔에서 **T0-1의 여섯 줄을 똑같이** 돌림. [화면]
- WebGL 줄에 'SwiftShader'가 나오거나 webgl2가 없으면: 같은 명령에 `--use-angle=metal`을 더해 다시. WebGPU가 거짓이면 `--enable-unsafe-webgpu`를 더해 다시.
- 끝나면 headless 창을 Ctrl+C.

| 기록 칸 | 화면 있는 Chrome | 새 headless(`--enable-gpu`) | (+`--use-angle=metal`) |
|---|---|---|---|
| Chrome 판 | | | |
| H.264 no-preference / prefer-hardware / prefer-software | | | |
| AAC 192k | | | |
| WebGL2 renderer 문자열 | | | |
| WebGPU 어댑터 | | | |
| chrome://gpu 'Video Encode' | | | |

- **갈리는 것:** H.264가 셋 다 거짓 → 이 맥의 Chrome으로는 못 뽑음 → 뽑는 도구를 ffmpeg · Remotion으로. AAC만 거짓 → AAC 인코더를 따로 넣거나 소리만 ffmpeg로 붙이는 길(ARCH). WebGL이 SwiftShader에서 못 벗어남 → 화면 있는 Chrome으로 뽑는 길을 T2에서 같이 잼.

### T-i — 아이폰 능력 재기 (설치 없음) — [아이폰] + [화면]

**쉬운 판(기본, 17:02 고침):** 운영자께 설정 화면 캡처 두 장을 받음(1-5의 ①) → 아래 기록 칸 첫 줄(모델 · iOS 판 · 잠금 모드)만 채움. 아이폰 Safari가 할 수 있는 일은 iOS 판으로 거의 정해지므로(S4 Q3 — iOS 26이면 고치지 않은 옛 판이 돎, 그 아래는 고칠 곳이 있음) 이것으로 T-i의 갈림은 대부분 됩니다. 한알님은 아이폰이 없으심(16:58:13).

**(덤) 케이블이 있고 운영자 아이폰이 곁에 있을 때만 — 아래 1 · 2:**

1. 아이폰 Safari로 `https://example.com`을 엶(https여야 WebCodecs가 보임).
2. 맥 Safari › 개발자용 › [아이폰] › example.com → 콘솔에 한 줄씩:

```js
navigator.userAgent
[typeof VideoDecoder, typeof AudioDecoder, typeof VideoEncoder, typeof AudioEncoder, typeof OffscreenCanvas]
await VideoDecoder.isConfigSupported({codec:'avc1.640028'})
await VideoDecoder.isConfigSupported({codec:'hvc1.1.6.L153.B0'})
typeof FileSystemFileHandle!=='undefined' && 'createWritable' in FileSystemFileHandle.prototype
!!document.createElement('canvas').getContext('webgl2')
!!(navigator.gpu && await navigator.gpu.requestAdapter())
```

| 기록 칸 | 값 |
|---|---|
| 아이폰 모델 · iOS 판 · 잠금 모드 · 누구의 아이폰(운영자 / 다른 사람) | |
| VideoDecoder · AudioDecoder · VideoEncoder · AudioEncoder · OffscreenCanvas | |
| H.264(avc1.640028) 풀기 / HEVC(hvc1) 풀기 | |
| createWritable | |
| WebGL2 / WebGPU | |
| (시험한 아이폰이 운영자 것이 아니면) 운영자 아이폰의 iOS 판 | |

- **갈리는 것:** iOS 26 이상이면 옛 판을 고치지 않고도 T1이 끝까지 갈 수 있음. 26 아래면 T1에서 '소재가 지워짐 · 소리 없음'이 나올 것 — 그게 정상이고, 고칠 곳은 '맥이 H.264 + WAV 사본을 주고 소재를 서버에서 받게'(S4 Q3). 잠금 모드면 영상 미리보기가 안 됨 → 끌지 운영자와 정함.

### T9 — 시험 코드로 한 바퀴 (PMO의 MAC_RUN — 코드 c2d21a6) **[14:29 더함]**

원본은 제품 가지의 `app/opencut-test/MAC_RUN.md`(PMO). 아래는 그것을 옮기고 받는 길(①)과 손 표시를 더한 것입니다. 모두 `~/oc-test/` 안에서, 가짜 소재만 씁니다. 3-3(Bun) · 3-5(가짜 소재)를 먼저 해 둡니다.

**① 코드 받기** — [터미널] (1-3에서 정한 길). **어느 길이든 끝에 `OT=~/oc-test/ms-test/app/opencut-test`로 같은 자리가 됩니다 [16:44 고침].**

(다) [권고] 0-1의 개인 정보 보호 창(GitHub 로그인됨)에서 아래 주소를 엶 → ZIP이 '다운로드'에 받아짐(Safari가 저절로 풀어 폴더가 될 수도 있음 — 둘 다 아래 명령이 받음). **커밋 c2d21a6에 못 박은 주소**:

`https://github.com/AofSpds/mitchell-studio/archive/c2d21a655cec64c415b86a2649a15d7a11e7cd73.zip`

```zsh
mkdir -p ~/oc-test/ms-test && cd ~/oc-test
Z=$(ls -d ~/Downloads/mitchell-studio-c2d21a65* | head -1); echo "$Z"      # 처음이면 '다운로드 폴더 접근' 창 → 허용(암호 없음)
case "$Z" in *.zip) unzip -q "$Z" -d ~/oc-test/ms-zip && Z=$(ls -d ~/oc-test/ms-zip/mitchell-studio-c2d21a65* | head -1);; esac   # ZIP이면 풀고, 이미 폴더면 그대로
[ -d "$Z/app" ] && cp -R "$Z/app" ~/oc-test/ms-test/ && OT=~/oc-test/ms-test/app/opencut-test && ls "$OT"   # MAC_RUN.md · render.mjs · fork/ … 가 보이면 됨(아무것도 없으면 Z가 빈 것 — 받은 이름을 ls ~/Downloads로 봄)
```

(가) 이 맥의 제품 저장소 사본에서(웹앱 맥 · 로그인이 저장돼 있을 때):

```zsh
cd <제품 저장소 뿌리>                                 # 3-1의 줄이 찍은 자리
git status -sb | head -1                              # 지금 가지 — 적어 둠(바뀌지 않아야 함)
git fetch origin test/opencut-classic-20261120        # 받기만. 로그인 · 키체인 암호를 새로 물으면 Ctrl+C → (다)
git rev-parse --short FETCH_HEAD                      # c2d21a6 이어야 함(다르면 그 값을 적음)
mkdir -p ~/oc-test/ms-test && git archive FETCH_HEAD app/opencut-test | tar -x -C ~/oc-test/ms-test
git status -sb | head -1                              # 앞과 같은지
OT=~/oc-test/ms-test/app/opencut-test; ls "$OT"       # MAC_RUN.md · render.mjs · fork/ … 가 보이면 됨
```

(나) 맥에서 GitHub 로그인이 안 될 때: 한알님 아이폰 브라우저(GitHub 로그인됨)에서 (다)의 주소로 ZIP을 받아 맥북으로 AirDrop(받는 맥의 AirDrop을 '모든 사람(10분)'으로) → '다운로드'에 들어오므로 (다)의 명령 줄을 그대로 씀.

**② 고친 판 띄우기** — [터미널] (터미널 1 — 이 창은 열어 둠)

```zsh
OT=~/oc-test/ms-test/app/opencut-test                 # [16:44 고침] 이 창에서도 씀(아래 git apply)
cd ~/oc-test && git clone https://github.com/opencut-app/opencut-classic opencut-mitchell
cd opencut-mitchell && git checkout -b mitchell-test cf5e79e
git apply "$OT/fork/opencut-classic-cf5e79e-mitchell.patch" && echo "얹기 됨"
sh scripts/mitchell-fetch-font.sh                     # 한글 글꼴(Noto Sans KR, OFL)을 받음 — sha256이 194018e6…e252 인지
bun install > ~/oc-test/out/mitchell-install.log 2>&1; echo "끝 코드 $?"
cp apps/web/.env.example apps/web/.env.local
cd apps/web && bun run dev --port 3417 --hostname 127.0.0.1
```

- 볼 것: `Ready`가 뜨는지. 이 맥 안(127.0.0.1)에서만 들어 방화벽 창이 안 뜸. T2의 3000과 겹치지 않게 3417.
- **[16:44 고침]** 앞 꼴에는 'OT는 이 창에서 쓰지 않는다'고 적었으나 `git apply`가 씀 — 그래서 맨 위에 `OT` 줄을 둠. 셸 변수는 창마다 따로라 터미널 2에서도 ③의 첫 줄로 다시 칩니다.

**③ 변환 · 뽑기 · 되받기** — [터미널] (터미널 2)

```zsh
OT=~/oc-test/ms-test/app/opencut-test; A=http://127.0.0.1:3417; J=~/oc-test/job1
node -v
node --test "$OT/tests/convert_diff.test.mjs"                                   # ㉠ C1·C2 자체 시험: pass 6
node "$OT/make_fixtures.mjs" $J --video ~/oc-test/media/v1080_30.mp4
node "$OT/convert.mjs" $J --root $J                                            # ㉡ checks: [] 인지
node "$OT/render.mjs" $J/opencut --app $A --out ~/oc-test/out/c4_headless.mp4  # ㉢ 화면 없이 뽑기
node "$OT/render.mjs" $J/opencut --app $A --out ~/oc-test/out/c4_headed.mp4 --headed   # ㉣ 창을 띄운 채(비교용)
node "$OT/render.mjs" $J/opencut --page import --app $A --out ~/oc-test/out/roundtrip.json   # ㉤ 들여오기 + 편집기 길로 열기
node "$OT/diff.mjs" $J/opencut ~/oc-test/out/roundtrip.json                    # ㉥ 바뀐 곳 0 인지
node "$OT/render.mjs" --page frames --app $A --video ~/oc-test/out/c4_headless.mp4 --out ~/oc-test/out/c4_frames.png   # ㉦ 장면 다섯 장
/opt/homebrew/bin/ffprobe -v error -show_entries stream=codec_type,codec_name,profile,level,width,height,r_frame_rate,sample_rate,channels,bit_rate \
  -of default=nw=1 ~/oc-test/out/c4_headless.mp4                               # ㉧ 맥에서는 ffprobe로 한 번 더
```

- `render.mjs`는 실행마다 임시 Chrome 프로필을 만들고(맥에서는 `--use-mock-keychain`) 끝나면 지움 — 운영자 Chrome · 키체인을 안 건드림(RSCH가 코드에서 봄). Chrome이 `/Applications`에 없으면 `--chrome <실행 파일 경로>`를 더함.
- ㉢ · ㉣은 끝에 JSON을 찍음: `ok: true` · `problems: []`이면 규격이 맞은 것. **`MITCHELL_AAC_UNSUPPORTED`가 나오면 AAC가 안 되는 것 — Opus로 바꾸지 않고 멈춘 것**(정상 동작, 적어 둠).
- ㉧의 레벨은 `41`이 나올 것(이 PC에서도 4.1 — 제품 규격 검사는 레벨을 보지 않음).

**④ 사람이 보는 들여오기 · 고치기** — [터미널] + [화면] (T0-1의 시험용 Chrome)

```zsh
node "$OT/render.mjs" $J/opencut --serve --port 3418 --app $A   # 찍힌 import_url을 시험용 Chrome(~/oc-test/chrome-test)으로 엶
```

- **[16:44 고침] `--port 3418`을 꼭 붙임** — 안 붙이면 묶음 서버가 **8765(웹앱 자리)**를 잡음(`render.mjs`의 `--serve` 기본값). 웹앱이 켜진 맥이면 '이미 쓰는 중' 오류가 나거나, 맥에서는 127.0.0.1로 오는 웹앱 길(Tailscale serve 포함)을 가로챌 수 있음 **[추측]**. 다 보면 Ctrl+C.

1. 쪽에 '되짚기 됨'과 '편집기 길로 열어 봄'이 뜨는지 → '편집기에서 열기'.
2. 편집기에서 자막 하나의 글을 고치고, 영상 조각 하나를 가운데서 나눔(분할) → 몇 초 기다림(자동 저장).
3. 주소창에 `http://127.0.0.1:3417/mitchell/import` → 그 프로젝트의 '꺼내기' → 받은 파일을 `~/oc-test/out/edited.json`으로.
4. [터미널] `node "$OT/diff.mjs" $J/opencut ~/oc-test/out/edited.json` → 고친 자막과 '나뉨'이 나오는지.

| 기록 칸 | 값 |
|---|---|
| 받은 길((가)/(나)) · 받기 앞뒤 `git status` 첫 줄이 같았나 | |
| node -v · bun -v · 얹기 · 글꼴 sha256 · 설치 끝 코드 | |
| ㉠ pass 수 · ㉡ checks | |
| ㉢ 화면 없이: ok · wall_ms · page.exportMs · page.gpuAvailable · page.codecs · spec · problems | |
| ㉣ 창을 띄운 채: 같은 칸 | |
| ㉤ ok · opened(elements · mediaLoaded · thumbnailMade) · ㉥ 바뀐 곳 수 | |
| ㉦ 장면에서 자막 테두리 · 한글 글꼴 · 사진 채우기가 보이나 · ㉧ ffprobe 결과 | |
| ④ 목록에 떴나 · 열렸나 · 소재가 다 붙었나 · 4의 결과(고친 자막 · '나뉨' · 나뉜 조각의 id) | |

- **갈리는 것:** ㉢이 규격대로 나오면 '맥이 화면 없이 뽑기'가 섬 → PMO가 C4를 '화면 없이'로 마무리. ㉢만 안 되고 ㉣이 되면 '창을 띄운 채'(맥이 깨어 있어야 함). 둘 다 안 되면 T0 결과와 맞대어 ffmpeg · Remotion 길(ARCH).
- T9이 끝나도 터미널 1의 서버(3417)는 T1에서 씀 — T1을 안 하면 Ctrl+C.

### (덤) T2 — 옛 판을 띄워 맥에서 한 편 뽑기 (Bun 필요) — T9 뒤에 시간이 남을 때

**① 꾸러미 설치 · 환경 값** — [터미널]

```zsh
cd ~/oc-test/opencut-classic
bun install > ~/oc-test/out/install.log 2>&1; echo "끝 코드 $?"; tail -20 ~/oc-test/out/install.log
cp apps/web/.env.example apps/web/.env.local       # '꼴만 맞는 값'이면 됨. 진짜 키는 넣지 않음
```

- 뜰 때 env 오류가 나면: `apps/web/Dockerfile`:24-34의 자리 표시 값(빌드용 가짜 값)과 같은 꼴로 `.env.local`을 채움.

**② 빌드가 통과하는지** — [터미널] **[고침: `| tee` 뒤의 `$?`는 tee의 값이라 파일로 받음]**

```zsh
cd ~/oc-test/opencut-classic/apps/web
bun run build > ~/oc-test/out/build.log 2>&1; echo "끝 코드 $?"
grep -n "error\|Error" ~/oc-test/out/build.log | head -20
```

- 실패하면 오류 첫 줄을 적음 — `migrations/runner.ts` 쪽이면 S4가 읽은 대로(Q1 표 9번). **고치지 말고** ③에서 개발 모드로.

**③ 띄우기 — 이 맥 안에서만** — [터미널] **[고침: `-H 127.0.0.1`]**

```zsh
cd ~/oc-test/opencut-classic/apps/web
bun run start -H 127.0.0.1      # 빌드가 됐을 때
bun run dev -H 127.0.0.1        # 빌드가 안 됐을 때
# 위 꼴이 안 먹으면: bunx next start -H 127.0.0.1  /  bunx next dev --turbopack -H 127.0.0.1
lsof -nP -iTCP:3000 -sTCP:LISTEN                    # 다른 창에서 — 127.0.0.1:3000 이어야 함(*:3000이면 방화벽 창이 뜰 수 있음)
```

**④ 한 편 만들기** — [화면] T0-1의 시험용 Chrome에서 **`http://127.0.0.1:3000/projects`** **[고침: 주소를 하나로 — 저장소가 주소마다 따로라서]**

- 새 프로젝트 → 소재 넣기(`~/oc-test/media`의 v1080_30.mp4 · img.png · voice.wav · music.m4a) → 영상을 타임라인에 → 사진을 그 뒤에 → 소리 둘을 소리 트랙에 → 글자 하나("테스트 자막 한글") → 설정에서 화면 1080×1920 · 30fps인지 봄.
- **덤(짧게):** 새 프로젝트를 하나 더 만들어 v1080_60.mp4를 처음 넣고 → 설정의 fps가 60으로 바뀌는지 적음.

**⑤ 뽑기(화면 있는)** — [화면] Export → MP4 · High · 소리 포함 → 걸린 시간(초시계) → 파일이 `~/oc-test/out`에 생김(T0-1에서 바꾼 내려받기 폴더). 그다음 [터미널]:

```zsh
/opt/homebrew/bin/ffprobe -v error -show_entries stream=codec_type,codec_name,profile,level,width,height,r_frame_rate,sample_rate,channels,bit_rate \
  -of default=nw=1 ~/oc-test/out/<받은 파일>.mp4
```

- 보면 되는 것: `h264` · `High` · level `40` · `1080`×`1920` · `30/1` · 소리 `aac`(**`opus`면 '말없이 Opus'** — S4 Q2ⓑ, RSCH가 `scene-exporter.ts`:109-121에서 다시 봄) · `44100` · `2`.

**⑥ 화면 없는 Chrome으로 같은 프로젝트 뽑기(시간 · GPU)** **[고침]** — 화면 없는 Chrome에서는 파일 고르기 창이 안 떠 소재를 넣을 수 없을 것 **[추측]** → 소재가 이미 들어간 시험용 프로필을 그대로 씀.

```zsh
pkill -f "oc-test/chrome-test"                       # 화면 있는 시험용 Chrome만 끔(운영자 Chrome은 그대로)
"$CH" --headless=new --enable-gpu --use-mock-keychain --user-data-dir="$HOME/oc-test/chrome-test" \
      --window-size=1440,900 --autoplay-policy=no-user-gesture-required --remote-debugging-port=9222 \
      http://127.0.0.1:3000/projects
# 다른 터미널 창에서 — 들여다볼 Chrome을 또 다른 시험용 프로필로:
"$CH" --user-data-dir="$HOME/oc-test/chrome-inspect" --use-mock-keychain --no-first-run chrome://inspect &
```

- `--window-size`를 준 까닭: 너비 1024 아래면 "Desktop only" 화면이 먼저 뜸(옛 판 `mobile-gate.tsx`).
- [화면] `chrome://inspect` → 'Configure…'에 `localhost:9222` → 'inspect' 창(쪽 화면이 보이고 눌러짐)에서 ④의 프로젝트를 열고 Export만 → '끝났다' 알림과 걸린 시간을 적음 → 파일이 `~/oc-test/out`에 생겼으면 ⑤의 ffprobe. 안 생기면 '화면 없는 Chrome의 내려받기가 막힘'으로 적음.
- 이것은 '화면 조작 없는 뽑기'의 실물이 아닙니다 — 그것은 시험 코드(렌더 전용 쪽)가 있어야 됩니다. 오늘은 **화면 없는 Chrome에서 엔진 · 인코더 · GPU가 도는지와 시간**만 봅니다.
- 끝나면 headless 창 Ctrl+C. ⑤로 돌아가려면 T0-1의 명령으로 화면 있는 시험용 Chrome을 다시 띄움.

| 기록 칸 | 값 |
|---|---|
| bun install 끝 코드 · 시간 · 경고 | |
| `bun run build` 끝 코드 · 첫 오류 줄 | |
| 띄운 꼴(start / dev, 실제 쓴 명령) · 뜰 때 오류 · 방화벽 창이 떴나 | |
| 처음 넣은 60fps 소재 뒤 프로젝트 fps | |
| 화면 있는 뽑기: 걸린 시간 · ffprobe 결과(영상 코덱 · 프로파일 · 레벨 · 크기 · fps · 비트레이트 / 소리 코덱 · 표본율 · 채널) | |
| 화면 없는 뽑기: 성공/실패 · 걸린 시간 · 오류 글 · 파일이 생겼나 | |
| 한글 글자 모양(맥 화면에서 무슨 글꼴로 보였나 — 글꼴 고르기에서 'Noto Sans KR'로 바꿨을 때 달라지는지) | |
| 암호 · 허락 창이 뜬 것(무엇이 · 언제) | |

- **안 될 때 다음 걸음:** 설치 실패 → 오류를 적고 T1 · T3-반은 건너뜀(T0 · T-i · T8은 그대로). 뽑기에서 실패 알림 → 개발자 도구 콘솔의 빨간 줄을 그대로 적음. 소리가 opus → T0의 AAC 줄과 맞대어 적음.
- **갈리는 것:** 화면 있는 뽑기가 규격대로 나오면 엔진 길은 삶(남는 것은 들머리 · 시간). 화면 없는 쪽만 안 되면 '창을 띄운 Chrome으로 뽑기'가 다음 후보(맥이 깨어 있어야 함). 둘 다 안 되면 ffmpeg · Remotion.

### T1 — https로 띄워 아이폰에서 열어 보기 (HTTPS를 켜기로 했을 때만)

**① serve 걸기** — [터미널] **T9의 고친 판 서버(127.0.0.1:3417)를 켠 채로** **[14:29 고침]** (T9을 못 했으면 T2의 서버 3000으로 — 아래 주소의 3417을 3000으로), 웹앱 8765와 겹치지 않게 **8443**:

```zsh
cd <제품 저장소 뿌리>
zsh app/webapp/tailscale/ts.sh serve --help | head -40         # 꼴 확인(판마다 다를 수 있음)
zsh app/webapp/tailscale/ts.sh serve --bg --https=8443 http://127.0.0.1:3417
zsh app/webapp/tailscale/ts.sh serve status                    # https://<Tailscale 이름>.<tailnet>.ts.net:8443 이 보여야 함
```

**② 아이폰에서 열기** — [아이폰] Tailscale이 연결된 아이폰 Safari로 `https://<Tailscale 이름>.<tailnet>.ts.net:8443/projects`

- 인증서 경고 없이 열리는가(Let's Encrypt).
- 화면이 비거나 개발 자원이 막힌다는 경고가 나오면(T9 · T2 둘 다 개발 모드로 띄움): 띄운 사본(`~/oc-test/opencut-mitchell` 또는 `~/oc-test/opencut-classic`)의 `apps/web/next.config.ts`에 `allowedDevOrigins: ["<Tailscale 이름>.<tailnet>.ts.net"]` 한 줄을 넣고 서버를 다시 띄움 **[추측]**. 시험 사본만 고치는 것이고, 고쳤다고 적음.
- "Desktop only" 화면 → 'Take a look anyway' → 새 프로젝트 → 소재 넣기('파일' 앱의 v1080_30.mp4 · v4k_hevc.mp4 · voice.m4a · voice.wav).
- **(17:02 더함) 소재를 고를 때 아이폰이 '사진 보관함 · 사진 찍기 · 파일 선택'을 물으면 반드시 '파일 선택'** — 운영자 아이폰의 사진 보관함에는 손님 사진 · 영상이 있음(1-5의 '손대지 않는 것'). 가짜 소재는 AirDrop으로 받아 '파일' 앱에 둔 것만.

**③ 볼 것** — 화면으로 보이는 것만으로 됨. 케이블이 있으면(덤) 맥 Safari의 웹 속성 콘솔을 열어 두고 까닭까지 봄: 소재가 목록에 남는가, 사라지는가(`Failed to save media item` 줄 — 저장이 실패하면 옛 판이 그 소재를 지움, RSCH가 `add-media-asset.ts`:52-70에서 다시 봄) · 미리보기에 영상이 보이는가 · ▶ 했을 때 소리가 나는가(m4a와 wav 각각) · 4K HEVC를 넣었을 때 알림 · 미리보기가 멈추는가.

**④ 손가락으로** — 자막 글 고치기 · 조각 하나 지우기 · 음량 · 속도 · 조각 끌기(안 될 것) · 끝 손잡이 끌기(안 될 것) — 되는 것/안 되는 것만 적음.

**⑤ 끝나면 serve 끄기** — [터미널]

```zsh
zsh app/webapp/tailscale/ts.sh serve --https=8443 off     # 안 되면 --help의 끄는 꼴로. 'serve reset'은 다른 설정까지 지우므로 쓰지 않음
zsh app/webapp/tailscale/ts.sh serve status               # 비었는지
```

| 기록 칸 | 값 |
|---|---|
| serve 명령의 실제 꼴 · https 주소가 열렸나 · 인증서 경고 | |
| start / dev · allowedDevOrigins를 넣었나 | |
| 소재가 남았나 / 사라졌나(mp4 · 4K HEVC · m4a · wav 각각) · 콘솔 줄 | |
| 미리보기 영상 · 소리(m4a / wav) · 멈춤 | |
| 손가락으로 된 것 · 안 된 것 | |
| 아이폰이 뜨거워졌나 · 탭이 다시 읽혔나(죽음) | |

- **갈리는 것:** iOS 26 아래에서 '소재 사라짐 · m4a 소리 없음 · wav 소리 남'이면 S4가 읽은 고칠 곳이 맞은 것 → '맥이 H.264 + WAV 사본을 주고 소재를 서버에서 받게'가 본 구현의 일로 들어감. 영상조차 안 보이면 휴대폰 화면 꼴 (가)는 접고 (나) + '맥이 뽑은 작은 미리보기 MP4를 보여 주기'를 봄.

### (덤) T3-반 — 저장 꼴 확인 (코드 없음) — [화면] + [터미널] **[고침: 콘솔 `copy()` + `pbpaste`]** — T9의 ④가 대신하므로 T2를 했고 시간이 남을 때만

1. 화면 있는 시험용 Chrome에서 T2의 프로젝트를 연 채 개발자 도구 콘솔에:

```js
const openDb = n => new Promise((res, rej) => { const r = indexedDB.open(n); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
const getAll = (db, s) => new Promise((res, rej) => { const q = db.transaction(s).objectStore(s).getAll(); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); });
const projects = await getAll(await openDb('video-editor-projects'), 'projects');
projects.map(p => [p.id, p.metadata?.name, p.version])
```

2. T2의 프로젝트를 고른 뒤(아래 `0`을 그 차례 번호로) 복사해 파일로:

```js
copy(JSON.stringify(projects[0], null, 2))
```

```zsh
pbpaste > ~/oc-test/out/project.json
```

3. 타임라인에서 영상 조각 하나를 나눈(S) 뒤 1~2를 다시 → `project_split.json`.
4. 소재 메타: 콘솔에 `copy(JSON.stringify(await getAll(await openDb('video-editor-media-' + projects[0].id), 'media-metadata'), null, 2))` → `pbpaste > ~/oc-test/out/media.json`.
5. 보면 되는 것(S4 Q5와 맞댐): `version` 31인가 · 시각이 모두 정수이고 1초 = 120,000인가(10초 영상의 `duration`이 1,200,000 안팎) · `trimStart + duration × 속도 + trimEnd = sourceDuration` · 글자 조각 `params`의 열쇠 이름 · `transform.positionX/Y` 값 · **나눈 뒤 조각 id가 새로 생겼나** · 소재 메타에 `fps` · `hasAudio`가 없는가.

| 기록 칸 | 값 |
|---|---|
| version · 10초 영상 duration · 불변식이 맞나 | |
| 나눈 뒤 id(앞 조각 · 뒤 조각) | |
| 소재 메타의 칸 목록 | |

- 손님 소재가 없으므로 이 JSON 셋은 RSCH에 넘겨도 됩니다(제품 저장소에는 넣지 않음).

### T8 — 자막 · 고정 글자 모양 값 읽기 (읽기만 · 캡컷 1025) — [터미널] (운영자 동의 뒤)

1. 캡컷을 끈 채(파일만 읽음):

```zsh
F="$HOME/Movies/CapCut/User Data/Projects/com.lveditor.draft/1025/draft_info.json"   # 없으면 같은 폴더의 .cloud_cache_*/1025/draft_content.json
/usr/bin/python3 -c 'import json,sys;d=json.load(open(sys.argv[1]));[print(json.loads(t["content"])["text"][:16], "|", t.get("font_size"), t.get("border_width"), t.get("border_color"), t.get("text_color"), t.get("font_path","")[-40:]) for t in d["materials"]["texts"]]' "$F"
/usr/bin/python3 -c 'import json,sys;d=json.load(open(sys.argv[1]));print(d["canvas_config"]);[print(s["material_id"][:8], s["clip"]) for tr in d["tracks"] if tr["type"]=="text" for s in tr["segments"]]' "$F"
```

- 키 이름이 달라 멈추면 오류 줄을 그대로 적음(파일은 고치지 않음).

2. (덤 — 운영자 동의가 있을 때만, 손님 영상이라서) 승인된 릴스 한 편(`data/output/…_v<N>.mp4`, **읽기만**)에서 손님 얼굴이 없는 장면의 프레임 한 장을 뽑아 자막 글자 높이 · 테두리 두께 · 세로 자리를 px로 잼. 뽑은 그림은 `~/oc-test/out/`에만 두고 저장소에 넣지 않음.

| 기록 칸 | 값 |
|---|---|
| 1025 화면 크기(canvas_config) | |
| 글자 넷의 font_size · border_width · border_color · 색 · 글꼴 파일 · clip(transform · scale) | |
| (덤) 완성 영상에서 잰 자막 글자 높이 · 테두리 px · 세로 자리 | |

---

## 5. 결과 돌려주기

- 기록 칸을 채운 이 글(또는 화면 사진)을 RSCH 창에 붙여 주세요. 길면 `~/oc-test/out/`에 두고 알려 주세요 — 넘길 길을 그때 정합니다.
- 넘겨도 되는 것: 기록 칸 · `build.log` · `install.log`의 오류 줄 · ffprobe 결과 · JSON 셋(가짜 소재뿐) · **T9의 결과 — ㉢ · ㉣이 찍은 JSON · ㉦ 그림 · `edited.json` · `c4_headless.mp4`(가짜 소재뿐)**. T9 결과는 RSCH가 PMO에 넘겨 C4 꼴과 글자 모양 값을 마무리하게 함. **넘기지 않는 것:** 손님 영상에서 뽑은 그림 · 캡컷 프로젝트 파일 통째 · `.env.local`.
- RSCH가 받아서: 기획안 초안 묶음 T · 갈림길 ㄱ · 오1 · 오2에 반영하고, 시험 코드(변환 · 들여오기 · 화면 없이 뽑는 쪽)의 꼴을 정함.

---

## 6. 끝낼 때 되돌리기 — [터미널]

```zsh
cd <제품 저장소 뿌리> && zsh app/webapp/tailscale/ts.sh serve status      # T1을 했으면 비었는지(안 비었으면 T1-⑤)
# 편집기 서버(T9의 3417 · T2의 3000): 띄운 창에서 Ctrl+C
pkill -f "oc-test/chrome-"                                                # 시험용 Chrome들만 끔(운영자 Chrome은 그대로)
kill "$(cat ~/oc-test/caffeinate.pid)"                                    # 잠자기 막기 끔
for p in 3000 3417 3418 8443 9222; do lsof -nP -iTCP:$p -sTCP:LISTEN; done   # 다섯 다 비었는지
```

- T9를 (가)로 받았으면 운영자 사본에 받은 가지 표시(`origin/test/opencut-classic-20261120`)가 남음 — 작업 중인 파일 · 가지와 상관없어 그대로 둠(지우는 명령은 쓰지 않음).
- **남길지 정할 것:** `~/oc-test/`(옛 판 · 고친 판 `opencut-mitchell` · 시험 코드 `ms-test` · 가짜 소재 · `job1` · 결과 — 결과를 넘긴 뒤 지워도 됨) · Bun(`~/.bun` 폴더와 `~/.zshrc`의 bun 줄 — 시험 코드 때 다시 쓰므로 남기는 편 [제안]) · 관리 콘솔의 HTTPS 설정(운영자와).
- 웹앱(8765)이 그대로 도는지: 휴대폰에서 평소 주소로 한 번 열어 봄.
- **(17:02 더함) 운영자 아이폰 되돌리기(T1을 했으면):** '파일' 앱에서 받은 가짜 소재를 지움 · Safari의 시험 탭을 닫음 · 설정 › Safari(iOS 18부터는 설정 › 앱 › Safari) › 고급 › 웹 사이트 데이터에서 `ts.net` 줄을 지움(편집기가 아이폰 안에 넣어 둔 시험 프로젝트) · 웹 속성을 켰으면 끔. AirDrop '모든 사람(10분)'은 저절로 돌아감.
- **0-1의 개인 정보 보호 창을 닫음**(GitHub 로그인이 남지 않게). (다)로 받은 ZIP · 폴더는 '다운로드'에 남으니 결과를 넘긴 뒤 지워도 됨.

---

## 7. S4 9번과 다른 곳 (RSCH가 바꾼 것)

1. **편집기 서버를 `-H 127.0.0.1`로, 주소를 `http://127.0.0.1:3000` 하나로** — 방화벽 창을 피함(Next의 기본은 모든 주소에서 들음). 브라우저 저장소가 주소(출처)마다 따로라 `localhost`와 섞지 않음.
2. **Chrome은 모두 시험용 프로필(`~/oc-test/chrome-*`)에 `--use-mock-keychain`** — 운영자의 Chrome 프로필 · 키체인을 건드리지 않음. S4의 chrome://gpu PDF 명령에는 프로필이 없었음.
3. **내려받기 폴더를 `~/oc-test/out`으로** — 운영자의 '다운로드' 폴더를 쓰지 않고, 그 폴더 접근 허락 창도 피함.
4. **끝 코드:** `명령 | tee 파일; echo $?`는 tee의 값을 보여 줌 → 파일로 받고 `$?`.
5. **화면 없는 뽑기:** 화면 없는 Chrome에서는 파일 고르기 창이 안 떠 소재를 못 넣을 것 [추측] → 화면 있는 시험용 Chrome을 끈 뒤 **같은 프로필로** 화면 없는 Chrome을 띄워, 소재가 이미 들어간 프로젝트를 열고 Export만. 휴대폰 문턱을 피하려고 `--window-size=1440,900`.
6. **T3-반:** Application 탭에서 값을 복사하는 대신 콘솔 `copy()` + `pbpaste`.
7. 더함: 운영자 인증 · 여쭐 것(1번) · 암호 창 피하기(2번) · 잠자기 막기 · 손 표시 · 결과 돌려주기(5번) · 되돌리기(6번).
8. **14:29 — PMO의 시험 코드를 T9로 넣고 차례를 바꿈:** T9(MAC_RUN)가 T2의 화면 없는 뽑기(⑥)와 T3-반을 대신함 → T2 · T3-반은 덤. T1은 T9의 서버(3417)를 씀. 맥에 코드를 받는 길 (가) · (나)를 1-3에 더함. MAC_RUN에 없던 것: 받는 길 · 받기 앞뒤 `git status` · ㉧ ffprobe · 손 표시.
9. **16:44 — 준비(한알 16:35:54). RSCH가 PMO 코드 c2d21a6을 `gh api`로 다시 읽고(MAC_RUN · render.mjs · make_fixtures · 패치의 파일 14개 목록 · 글꼴 스크립트) 고친 것:**
   - T9 ④ `--serve`에 `--port 3418` — `render.mjs`의 `--serve` 기본 포트가 8765(웹앱 자리). MAC_RUN에도 없음 → PMO에 나중에 기본값을 바꾸라고 알릴 것(오늘은 코드를 c2d21a6 그대로 둠).
   - T9 ② 맨 위에 `OT` 줄 — `git apply`가 `$OT`를 쓰는데 앞 꼴은 '이 창에서 쓰지 않는다'고 잘못 적었음.
   - 3-3 `exec zsh` → `export PATH=…` — `exec zsh`가 3-2의 `CH`를 지웠음.
   - 3-5에 ffmpeg가 없을 때의 길 — 고친 판의 `/mitchell/fixture`(PMO 코드, 10초 · 1080×1920 · 30fps · H.264 + AAC)로 가짜 영상을 만듦.
   - 받는 길 (다)를 권고로: 맥 Safari 개인 정보 보호 창에서 한알님 GitHub로 이 글을 열고 ZIP을 받음(커밋에 못 박은 주소). 어느 길이든 `OT`가 같은 자리. (가)에 `git rev-parse --short FETCH_HEAD`(c2d21a6인지).
   - 0-1 시작 전에 갖출 것 · 3-1 제품 저장소 뿌리 찾는 줄 · 포트 확인에 3417 · 3418 · 3-4는 T2를 할 때만 · 6에 개인 정보 보호 창 닫기.
   - 다시 보고 문제없던 것: 글꼴 스크립트는 맥의 `shasum`을 먼저 씀 · `render.mjs`는 Node 내장만 씀(Chrome과는 HTTP로 주고받음 — 새 Node가 아니어도 됨, `node --test`만 Node 18 이상) · 저장소의 파일은 줄 끝이 LF(이 PC에서 받은 사본에 CR이 보였던 것은 받는 과정 탓 — 저장소 본을 base64로 세어 CRLF 0을 확인).
