# 연구 ② 캡컷 리버스 엔지니어링 가능성

- 쓴 세션: MITCHELL_STUDIO/BTSR/RSCH · 쓴 시각: 2026-11-19 00:31 KST
- 근거 말씀: owner/utterances/2026-11-18.md — 22:12:53 uuid c5a2e2e4("캡컷의 rea 가능성"), 22:15:28 uuid 52dc4ac1(rea = 리버스 엔지니어링 맞음. "캡컷으로 반드시 컴퓨터 유즈를 써야 한다면, 너무 불안합니다.")
- 짝 문서: [연구 ① 화면 조작 없이](2026-11-19-no-computer-use.md) · [③ 보완책 건의](2026-11-19-recommendations.md)
- 표시: **[사실]** 저장소 파일·웹 페이지에서 본 것 / **[추측]** 내 짐작 / **[전해 들음]** 원문이 아니라 남의 정리 글로만 본 것.
- 한 일의 범위: 공개된 글·도구 설명·약관을 읽음. **CapCut 앱을 뜯어 보거나 돌려 보지 않았고, 어떤 비공식 서버 주소도 부르지 않았음.**
- 법률 판단이 아닙니다. 약관은 읽은 문장을 그대로 옮겼고, 해석이 필요한 곳은 추측으로 표시했습니다.

## 결론 먼저

리버스 엔지니어링을 세 층으로 나누면 답이 다릅니다.

| 층 | 무엇 | 가능성 | 권하나 |
|---|---|---|---|
| 1. 프로젝트 파일(초안) 형식 | 장면·자막·소리를 파일로 넣고 고치기 | **이미 되고 있음.** 이 저장소가 쓰는 방식이고 공개 도구도 여럿 | 지금처럼 쓰되 깨질 때를 대비 |
| 2. 그리기(내보내기) 엔진 | 화면 없이 앱의 엔진만 불러 mp4 만들기 | **기술로는 가능해 보임** — 자매 앱(剪映)에서 누군가 해냈다는 보도. CapCut 국제판용은 찾지 못함 | **권하지 않음** |
| 3. 목소리·음악 서비스 | 앱이 부르는 서버를 직접 불러 CapCut 목소리·추천곡 받기 | 공개된 예를 찾지 못함 | **권하지 않음** |

- 한 줄로: **화면 조작을 없애려고 CapCut 속을 더 깊이 뜯는 것보다, 내보내기·목소리·음악을 CapCut에 기대지 않게 만드는 편이 더 싸고 덜 깨집니다**(연구 ① 안 1).
- 까닭 셋: ① 약관이 리버스 엔지니어링과 자동 스크립트를 금지 문장으로 적어 둠 ② 2층·3층은 앱 버전 하나에 묶여 업데이트마다 깨짐 ③ 이 가게 릴스는 단순해서 CapCut 엔진이 꼭 필요하지 않음.

## 1층 — 프로젝트 파일 형식: 이미 되고 있음

- **[사실]** 이 저장소는 CapCut 프로젝트 파일을 밖에서 만들고 고칩니다: 연결 도구 `app/vendor/capcut-mcp/`(외부 제작, MIT), `app/scripts/capcut_build.mjs`, `app/scripts/voice_fit.py`. 맥 CapCut 9.7.1 앱스토어판에서 동작 — `agents/capcut/knowhow.md`:7, :50-51.
- **[사실]** 연결 도구 스스로 한계를 적어 둠: 형식은 "proprietary and undocumented"이고 버전마다 바뀌며, 업데이트로 깨질 수 있으니 백업을 지키라고 함 — `app/vendor/capcut-mcp/README.md`:78.
- **[사실]** 같은 일을 하는 공개 도구가 여럿 있음:

| 도구 | 하는 일 | 내보내기 | 알아 둘 것 |
|---|---|---|---|
| capcut-mcp (쓰는 중) | 초안 읽기·고치기 (영상·사진·소리·글자 넣기, 자르기, 옮기기) | 못 함 | 목소리 만들기도 못 함 — `agents/pln/knowhow.md`:19 |
| capcut-cli (renezander030, MIT) | 초안 파일을 직접 읽고 씀. macOS는 `draft_info.json`, Windows는 `draft_content.json` | "Open in CapCut to review and render". 실험 기능 `export --batch`는 macOS에서 AppleScript로 | 목소리 만들기 없음. 소리는 사용자가 준 파일을 넣음 |
| capcut-cli-david (MIT) | 초안 고치기, 세로 영상 초안 한 번에 만들기 | 문서에 없음 | CapCut 8.x(맥 8.2.0, 윈도 8.5·8.6)에서 시험. 9.x는 '읽기는 너그럽게, 시험 안 함' |
| pyJianYingDraft / pycapcut | 剪映·CapCut 초안 만들기 | 일괄 내보내기는 윈도에서 화면 자동 조작(uiautomation)으로, 剪映 6 이하만 **[전해 들음]** | 템플릿 기능은 剪映 5.9 이하만(암호화 때문) **[전해 들음]** |
| VectCutAPI / CapCutAPI (sun-guannan) | HTTP·MCP로 초안 만들기 (pyJianYingDraft 바탕) | 공개 코드는 초안까지. '클라우드에서 바로 렌더'는 광고하지만 그 부분은 공개 코드가 아니라는 제3자 글이 있음 **[전해 들음]** | 초안 폴더를 CapCut에 복사해 사람이 내보냄 |

- **이 층의 위험 — 암호화:**
  - **[사실]** 자매 앱 剪映은 6.0부터 초안 파일을 디스크에서 암호화함: "Starting with JianYing 6.0, `draft_content.json` is **encrypted on disk**"(capcut-cli-david COMPATIBILITY §5.2). 그 도구는 "We will **not** ship a decryption layer"라고 적음.
  - **[사실]** CapCut 국제판이 암호화됐다는 글은 이번 조사에서 찾지 못함. 저장소 기록으로는 9.7.1에서 평문으로 읽고 씀.
  - **[추측]** 같은 회사의 자매 앱이 먼저 암호화했으므로 CapCut 국제판도 어느 업데이트에서 따라갈 수 있음. 그날 1층 전체(④ 편집·Fit·서버의 확인·백업 비교)가 한꺼번에 멈춤.
  - **[사실]** 암호를 대신 풀어 주는 제3자 서비스(초안 파일을 올리면 풀어서 돌려줌)가 있음. **[추측]** 초안에는 손님 영상 경로와 자막이 들어 있어 밖으로 올리는 것은 맞지 않음.
- **지금 맥 CapCut이 자동 업데이트되는지는 저장소에서 알 수 없음.**

## 2층 — 내보내기 엔진: 가능해 보이나 권하지 않음

- **[사실]** CapCut 데스크톱에 화면 없는(명령줄) 내보내기는 공식으로 없음. 찾은 도구들은 모두 초안에서 멈추고 사람이 앱에서 내보내게 함 — capcut-cli README, capcut-cli-david 문서. 저장소도 같은 결론 — `agents/pln/specs/2026-11-09_reel-automation.md`:28.
- **[전해 들음] jianying-headless** (AlphaSignal 기사 2026-09-18, 유료 기사의 앞부분만 읽음):
  - 剪映 프로젝트 파일을 만들고 "invokes the desktop app's local rendering engine", "exports MP4 via Jianying's own engine in an isolated process".
  - 설치된 剪映의 라이브러리에 붙는 `bridge/`(파일·파이프 어댑터)를 씀. 기사는 "the proprietary bridge used during export"라고 부름.
  - "Pinned to Apple Silicon macOS 26.0+ and Jianying Pro 11.4.2" — 앱 버전 하나에 고정.
  - 라이선스: "Personal learning and non-commercial use; commercial use requires written authorization".
  - CapCut 국제판 지원 여부, 로그인 필요 여부, 창이 떠야 하는지: 기사에 없음.
- **[사실]** 기사가 가리킨 저장소 주소(`github.com/mcncarl/jianying-headless`)는 **2026-11-19 00:2x KST에 404**였음(주 페이지와 README 원문 둘 다). 지워졌는지·비공개가 됐는지·이름이 바뀌었는지는 알 수 없음.
- **이것이 뜻하는 것:**
  - **[추측]** 앱 안에 그리기 엔진이 따로 부를 수 있는 꼴로 들어 있고, 바깥 프로세스에서 불러 mp4를 얻는 것이 기술로는 가능함(자매 앱에서). CapCut 국제판은 같은 계열이라 비슷할 수 있으나 확인된 바 없음.
  - **[추측]** 우리가 직접 하려면 앱 바이너리를 분석해 내부 함수를 찾아야 함 = 약관이 금지 문장으로 적은 바로 그 일(아래 4번). 품이 크고, 앱이 업데이트될 때마다 다시 해야 함.
  - 남의 것을 가져다 쓰려 해도: 剪映(중국판) 전용, 비상업 조건, 버전 고정, 두 달 만에 주소가 사라짐.
- **판단:** 화면 조작이 불안해서 떠나려는 것인데, 이 길은 화면 조작보다 더 깨지기 쉽고 권리 문제가 더 큼.

## 3층 — 목소리·음악 서비스: 권하지 않음

- **[사실]** CapCut의 '텍스트 읽기'는 앱 안 기능이고, 개발자용으로 문서화된 주소를 찾지 못함. 비공식으로 그 서버를 부르는 공개 도구도 이번 검색에서는 찾지 못함(찾은 CapCutAPI류는 모두 초안 파일 도구).
- **[사실]** 저장소 기록: 지금 릴스의 목소리는 프로젝트 파일에 제공사가 `11labs`·`sami`로 적혀 있음 — `agents/capcut/logs/2026-11-08_cloud-reels-analysis.md`:17.
- **[추측]** 그러니 CapCut 목소리를 '몰래 부르는' 대신 음성 서비스를 정식으로 쓰는 길이 있음(연구 ① Voice). 같은 목소리가 정식 서비스에 그대로 있는지는 확인하지 않음.
- 서버를 직접 부르는 길은 약관의 자동 스크립트 금지 문장에 정면으로 닿고(아래), 로그인 정보·기기 정보가 필요할 것이며 **[추측]**, 계정이 막힐 위험이 있음 **[추측]**.

## 4. 약관에서 읽은 것

- **[사실]** CapCut Terms of Service — "Last updated: April 15, 2026", 상대방 "Bytedance Pte. Ltd." 본문 앞부분(약 40%)은 원문으로, 뒤는 요약으로만 읽힘.
  - 6조 "Your Access to and Use of Our Services" 금지 목록 2번: "reverse engineer, disassemble, decompile, or create any derivative works based on, the Services" — 같은 항에 "determine or attempt to determine any source code, algorithms, methods or techniques embodied by the Services".
  - 같은 조 9번: "use automated scripts or other technologies to collect information from or otherwise interact with the Services;"
  - 같은 조 6번: "circumvent or bypass any measures we may use to prevent or restrict access to the Services".
- **[사실]** CapCut Materials License Agreement — "Last Updated: January 22, 2026", 싱가포르 법.
  - 3조 "Selecting Sounds": 'Sounds'는 "personal entertainment and non-commercial purposes"용이고, "You shouldn't use a Sound for any commercial purpose" — 뒤이어 브랜드·사업을 알리는 데 쓰는 것을 예로 듦(필요한 권리를 따로 얻지 않았다면).
  - 3조 "Selecting Commercial Sounds": 사업자는 Commercial Sound를 넣은 영상을 CapCut·TikTok 안에서 보이거나 공유할 수 있고, "Any uses of Commercial Sounds outside of the Permitted Platforms require you to obtain separate permission".
  - 4조: 자료를 "reverse engineer, decompile, disassemble" 금지.
  - AI 목소리(텍스트 읽기) 결과물의 상업 이용에 대한 문장은 읽은 범위에서 찾지 못함.
- **확인 못 한 것:** 한국 이용자용 보충 조항(요약에 '한국 보충 조항이 있다'고만 나옴). 약관 뒷부분 원문.
- **지금 방식이 이미 닿는 곳 [추측 — 해석이 필요함]:**
  - 프로젝트 파일을 밖에서 고치는 것(1층)이 "Services"를 리버스 엔지니어링한 것인지: 내 컴퓨터의 내 작업 파일을 읽고 쓰는 일이라 앱 코드를 뜯는 것과는 다르지만, 문장이 넓어 단정할 수 없음.
  - Terra가 화면을 누르는 것이 "automated scripts or other technologies to … interact with the Services"인지: 글자로는 닿아 보임.
  - CapCut 추천곡을 넣은 영상을 가게 홍보로 인스타·유튜브·네이버·당근에 올리는 것: 'Sounds' 문장에 닿아 보임. 이것은 리버스 엔지니어링과 상관없이 따로 볼 일.

## 5. 층마다 대비

| 층 | 하면 좋은 것 | 크기 |
|---|---|---|
| 1 | 맥 CapCut 버전을 기록하고, 초안 파일이 평문 JSON인지·기대한 칸이 있는지를 시작 전 점검(Preflight)에 한 칸 더함. 업데이트는 운영자가 아는 때에만 | 작음 |
| 1 | 최종본이 CapCut에 기대지 않게(연구 ① 안 1) — 암호화가 와도 릴스는 나옴 | 큼(연구 ①) |
| 2·3 | 하지 않음 | — |

## 출처 (웹, 2026-11-19 00:2x KST에 읽음)

- [CapCut Terms of Service](https://www.capcut.com/clause/terms-of-service) (2026-04-15판)
- [CapCut Materials License Agreement](https://www.capcut.com/clause/material-license-agreement) (2026-01-22판)
- [capcut-cli 0.9.0 README](https://cdn.jsdelivr.net/npm/capcut-cli@0.9.0/README.md)
- [capcut-cli-david 2.5.0 COMPATIBILITY](https://cdn.jsdelivr.net/npm/capcut-cli-david@2.5.0/COMPATIBILITY.md) (Last verified 2026-05-11) · [README](https://cdn.jsdelivr.net/npm/capcut-cli-david@2.5.0/README.md)
- [AlphaSignal: Jianying Headless…](https://alphasignal.ai/news/jianying-headless-lets-coding-agents-build-editable-video-drafts-from-json) (2026-09-18, 앞부분만) · 같은 내용의 [hermes-ai.net 글](https://hermes-ai.net/news/jianying-headless-lets-coding-agents-build-editable-video-drafts-from-json/)(검색 요약으로만)
- [pyJianYingDraft (PyPI)](https://pypi.org/project/pyjianyingdraft/) · [VectCutAPI 문서](https://docsearch.algolia.com/mcp/docs/repo/sun-guannan/vectcutapi) · [Wireflow: CapCut API](https://www.wireflow.ai/blog/capcut-api)(업체 블로그) — 검색 요약으로만 봄
- 저장소 주소 `https://github.com/mcncarl/jianying-headless` — 404
