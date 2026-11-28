# S38 — 우리 앱 안에 들일 공개 영상 편집기 후보

- 조사: S38_EDITOR_CANDIDATES · 기준 시각 **2026-11-28 18:16:32 KST**(PowerShell에서 한국 시각 확인).
- 물음: 정해 둔 차례로 만든 편집표를 사람이 고칠 수 있는 프로젝트로 열고, 그 결과를 우리 앱에서 저장·내보낼 수 있는가.
- 범위: 공개 원문·소스 읽기만. 저장소 복제, 꾸러미 설치, 실행, 가입·로그인, 실제 사진·영상 시험, 커밋은 하지 않았다. 아래의 ‘가능’은 문서·코드상 경로이며 작동 시험 결과가 아니다.
- 바탕: 원점 한 장 13–44·108–126줄, S34 70–77줄, OpenCut 반환 전체·기술보강 Q5/Q7, S19–S22에서 후보 이름으로 찾은 줄. 옛 캡컷·맥·아이폰 결정을 전제로 삼지 않았다.
- **읽은 이의 판단:** 먼저 비교 시험할 셋은 **OpenCut classic / MakeMyClip / HyperFrames**. 아직 채택 권고는 아니다. 자동 초안→사람 수정→저장→다시 열기의 왕복과 배포 조건을 통과해야 한다.

## 1. 후보 여섯과 현재 상태

최근성은 공식 배포 페이지의 최신 표식 또는 마지막 커밋으로 확인했다. 시각은 **그 표식에 연결된 커밋의 KST 시각**이며 배포가 공개된 시각과 같다고 주장하지 않는다. 소스 줄은 조회 당시 main/master 기준이다. 배포 태그의 모든 파일과 대조한 것은 아니다.

| 후보·저장소 | 최근 공개판 / 연결 커밋 시각(KST) | 어디서 도는가·사람이 고치는 화면 | 짧은 원문·근거 |
|---|---|---|---|
| A [OpenCut classic][A] | 마지막 `cf5e79e` · 2026-05-18 01:07:21. 보관된 저장소 | 컴퓨터 브라우저 편집기. 웹앱을 우리 서비스에 붙이는 형태. 휴대폰 실제 사용성·classic 네이티브 앱은 확인 못 함 | 새 [OpenCut README][A-new]: “the one to reach for today”. 새 저장소는 전면 재작성 중이며 Rust·여러 기기·Editor API는 계획 설명이다. 현재 classic의 기능으로 세지 않음 |
| B [MakeMyClip editor][B] | [v0.5.2][B-release] / `0fce8bbc` · 2026-11-16 13:35:23 | 컴퓨터의 로컬 브라우저 UI + Node 24/Hono + FFmpeg. Windows/macOS/Linux. 휴대폰·공개 다중 사용자 서비스는 확인 못 함 | [README][B-readme]: “one composition document”. UI·CLI·MCP가 같은 문서를 편집 |
| C [HyperFrames][C] | [v0.9.104][C-release] / `3e77cf29` · 2026-11-28 03:12:24. 조회한 main의 studio는 0.9.105 | **공개 브라우저 Studio 편집 화면이 있음**. React UI + Studio 서버, 로컬/서버 렌더. 휴대폰 조작은 미검증. 별도 배포 앱의 조건은 이 Apache 저장소와 동일하다고 단정하지 않음 | [Studio 문서][C-studio]: “building blocks, not a drop-in embedded editor”. 조립·상태 연결은 필요 |
| D [OpenChatCut][D] | [v0.2.17][D-release] / `72ddb330` · 2026-10-15 14:28:58. main은 이후에도 변경됨 | Electron 데스크톱 앱 또는 브라우저 UI + 로컬 Node 24 백엔드. 편집기는 localhost/127.0.0.1 또는 HTTPS 필요. 원격 HTTP 주소만 붙이면 안 됨 | [README][D-readme]: “single user on one machine”. 기존 로컬 연결부를 다중 사용자 서비스로 간주하면 안 됨 |
| E [Remotion][E] | [v4.0.547][E-release] / `4955ebc1` · 2026-11-25 01:49:11 | Studio·Player는 컴퓨터 브라우저, Node 서버 렌더 또는 제한 있는 브라우저 렌더. 완성된 범용 타임라인 편집기를 무료로 그대로 가져오는 구조는 아님 | [Editor Starter][E-starter]: “after purchase”. 완성형 시작 코드의 구매와 공개 핵심 라이브러리를 구분해야 함 |
| F [kinocut][F] | [v2.2.0][F-release] / `f446c8ce` · 2026-11-25 14:43:36 | Python 3.11+ CLI·MCP·로컬/서버 FFmpeg. HTML 검토·승인 경로는 있지만 사람이 드래그로 고치는 NLE 타임라인은 확인 못 함 | [README][F-readme]: “Your agent edits the video. You approve the cut.”. 자동화 부품 후보이며 내재화할 편집 화면 후보로는 약함 |

## 2. 우리 앱 안에 넣어 배포할 때의 조건

아래는 읽은 라이선스의 의무를 정리한 것이다. **루트 라이선스 하나로 묶인 영상·음성·글꼴 부품까지 허용되는 것은 아니다.** 실제로 남길 부품과 바이너리를 고정한 전체 의존성 검사는 아직 하지 않았다.

| 후보 | 상업 이용·고친 것 공개·고지·이름/로고 | 함께 확인할 부품과 배포 쟁점 |
|---|---|---|
| A | [MIT][A-license]: 상업 이용·수정 가능, 수정 코드 공개 의무 없음, 저작권·허락문 유지. [브랜드 지침][A-brand]은 이름·로고를 코드 라이선스에서 제외하며 공식 제품으로 오인시키면 안 됨 | [package.json][A-package] 39·50·73줄: botid, Mediabunny, soundtouchjs 포함. Mediabunny는 MPL-2.0: 배포하는 해당 코드의 소스 제공 경로·고지, 수정한 MPL 파일의 소스 공개 등 필요. 브라우저 JS도 배포에 해당([MPL FAQ][MPL]). soundtouchjs 0.3 계열 LGPL-2.1 조건은 기존 Q7의 발견이며 이번 정확한 판 원문 재확인은 실패. 피치 유지 경로의 import가 있으므로 기능 버튼만 숨겨 해결됐다고 볼 수 없음. botid와 간접 부품 검토도 남음 |
| B | [MIT][B-license]: 상업 이용·수정 가능, 수정 코드 공개 의무 없음, 저작권·허락문 유지. 별도 이름·로고 사용 허락은 확인 못 함 | [README][B-readme] 329–336줄은 ffmpeg-static의 Windows/Linux/Intel Mac 빌드를 GPLv3, Apple Silicon 빌드를 nonfree 포함·재배포 불가로 설명한다. **MIT 앱과 함께 그 바이너리를 우리 배포물에 넣을 수 있는지는 별개**. 외부 FFmpeg 경로 지정 가능하나 실제 빌드 옵션·대응 소스·고지를 확인해야 함([FFmpeg 법적 안내][FFmpeg]) |
| C | [Apache-2.0][C-license]: 상업 이용·수정 가능, 수정 코드 일반 공개 의무 없음. 라이선스·관련 고지 유지, 수정 파일 표시, NOTICE가 있으면 관련 내용 전달. 상표 사용권은 별도로 주지 않음 | [studio/package.json][C-package] 126–127줄: GSAP ^3.13.0·Mediabunny ^1.66.0. [GSAP 표준 조건][GSAP]은 Webflow의 시각 애니메이션 제작 도구와 경쟁하는 일부 무코드 도구 사용을 제한한다. **우리 영상 편집기에 적용되는지는 미해결**이며, 제한 대상이라면 사전 서면 허락이 필요. MPL·FFmpeg·글꼴 조건도 별도. Apache만 보고 무조건 내재화 가능하다고 결론 내리지 않음 |
| D | [AGPL-3.0][D-license]: 상업 이용은 가능. 배포 시 해당 라이선스가 요구하는 대응 소스·고지·수정 표시를 제공하며, 수정판을 네트워크로 이용하게 하면 §13의 소스 제공 기회도 적용. 독립된 모든 서비스가 자동으로 AGPL이 된다는 뜻은 아니며 결합 경계 확인 필요. 이름·로고 별도 허락은 확인 못 함 | Remotion은 별도 상업 라이선스 조건이 있음. FFmpeg도 실제 빌드를 확인해야 함. `LICENSES.md`의 글꼴에는 OFL과 ‘상업 이용 무료’라는 별도 조건이 섞여 있어 무료라는 표현만으로 재배포 허용을 추정할 수 없음. 닫힌 소스로 배포하려면 우선 후보보다 조건 검토가 큼([저장소][D]) |
| E | [Remotion 자체 라이선스][E-license]: MIT/Apache가 아니다. 개인·3명 이하 영리 조직·비영리·비상업 평가 등에 무료 조건이 있고 그 밖의 상업 사용은 회사용 조건을 확인해야 한다. 자기 파생 Remotion을 판매·대여·라이선스하는 제한 문구도 있음. 일반적인 수정 소스 공개 의무와 별개로 사용·재판매 범위 확인 필요. [가격·용도 안내][E-pricing]와 실제 운영 조직 기준으로 판단 | Editor Starter 구매 조건은 따로 검토. 기존 Remotion 코드를 재판매하는 것과 그것을 이용한 앱 제공의 경계를 확인해야 함. 서버 FFmpeg 또는 브라우저 Mediabunny 등 선택한 렌더 경로의 조건도 추가. 이름·로고 권리는 제품 사용권만으로 추정하지 않음 |
| F | [저장소의 Apache-2.0][F]: 상업 이용·수정 가능, 수정 코드 일반 공개 의무 없음. 라이선스·관련 고지·수정 표시·해당 NOTICE 전달, 상표 사용권은 별개 | 외부 FFmpeg와 선택적으로 연결하는 HyperFrames 등은 각 조건 적용. 자동화 부품으로만 써도 실제 묶어 배포할 의존성·바이너리 확인은 필요. 편집 화면이 생기는 것은 아님 |

## 3. 편집표를 넣을 길 — 파일과 줄 근거

| 후보 | 프로젝트 자료 꼴·외부 초안 입력 경로 | 사람이 고친 결과까지 돌려받는 데 남는 일 |
|---|---|---|
| A | [project/types.ts][A-types] 15–35·44–51줄: 캔버스·fps·scenes·현재 scene·version. [storage/service.ts][A-storage] 134–222줄: 프로젝트 직렬화·저장·읽기, 289–317줄: 미디어 파일·메타 저장. IndexedDB 프로젝트와 OPFS 원본을 함께 준비하는 변환기가 필요. [migrations/index.ts][A-version] 36줄은 version 31 | 원본 ID와 파일을 모두 맞춰야 한다. ‘JSON 한 개 공개 가져오기 API’는 이번에도 확인 못 함. 기존 Q5의 120,000 tick/초, 앞·뒤에서 덜어낸 길이인 trimStart/trimEnd를 사용하므로 끝 시각을 trimEnd에 넣으면 안 됨. 저장·재열기·버전 이동을 함께 시험해야 함 |
| B | [composition.ts][B-schema] 137–157줄: 미디어 ID·sourceInSec/sourceOutSec·문자 클립, 203–223줄: version·rev·width·height·fps·tracks. [document-store.ts][B-store] 35–39·147·165–173줄: `composition.json` 검사·읽기·쓰기. 초 단위이며 UI/명령/API가 같은 문서를 사용 | 변환기는 검사된 문서와 명령/저장 계층을 통해 넣어야 함. 같은 파일을 바깥에서 덮어쓰면 undo 기록·rev와 어긋날 수 있다. 436–459줄의 변경 여부 검사·문서 교체 경로 참고. 267–272줄은 여러 프로세스 사이의 작은 경쟁 가능성도 설명하므로 동시 편집 안전성을 확정하지 않음 |
| C | [format.md][C-format] 7–36·72–100줄: `index.html`·장면 HTML·안정된 ID·초 단위 data-start/data-duration·data-media-start·CSS·GSAP. 편집표→HTML/자산 폴더 생성으로 입력 가능. [Studio 문서][C-studio]는 UI→서버→소스 파일 쓰기·외부 변경 새로고침을 설명 | 타임라인 JSON 전용 형식이 아니다. `data-track-index`는 UI 줄이고 실제 겹침 순서는 CSS z-index(76–90줄). [HTML schema][C-html]는 data-playback-start만 쓸 때 화면과 소리의 trim 경로가 달라질 수 있음을 설명한다. 영상·음성 원본 시작은 data-media-start로 맞추고 왕복 확인 필요 |
| D | [projectTypes.ts][D-types] 8–17줄: version·assets·timelines·activeTimelineId. [projectTransfer.ts][D-transfer] 38–39줄: `openchatcut-project@1/@2`, 190–209줄: 검증·이전판 변환·정리, 482–493줄: 패키지 가져오기. v2는 프로젝트+미디어 조각 스트림, v1 JSON도 받아들임 | 기존 가져오기 경계가 있어 새 변환기를 연결할 지점이 명확하다. 문서의 media 참조와 패키지 내 파일을 일치시키고 버전·가져오기 뒤 저장을 확인해야 함. 제품 바깥의 임의 JSON을 그대로 받아 주는 API라고 해석하면 안 됨 |
| E | [공식 parameterized rendering 문서][E-props]: React 컴포넌트 + defaultProps/inputProps + 선택적 schema. 외부 편집표를 JS/JSON props로 넣고 width·height·duration·fps를 계산 가능 | 범용 편집표·사람용 타임라인·저장 형식은 우리 구현 또는 별도 Editor Starter가 맡는다. 문서의 원본 `packages/docs/docs/parameterized-rendering.mdx` 줄 확인은 **접근 거부로 미완료**. 문서 본문의 설명까지만 근거로 삼음 |
| F | [docs/WORKFLOWS.md][F-workflow] 29–53줄: schema_version 1의 sources·순서 있는 steps·outputs·variants JSON. plan→validate→render/recover 경로로 외부 편집표 변환 가능 | 처리 명령표이며 사람이 고치는 NLE 프로젝트와는 다르다. 31–33줄은 앞선 단계만 참조하는 순차 처리임을 명시. 자동 렌더 앞단에는 맞지만 이것 하나로 ‘우리 앱 안에서 사람이 타임라인을 고침’을 충족하지 못함 |

## 4. 내보내기·한글·글꼴·세로·덜어 내기

‘한글 확인 못 함’은 한글을 못 쓴다는 뜻이 아니라 **실제 줄바꿈·글자 누락·미리보기/완성본 일치를 시험하지 않았다**는 뜻이다. 글꼴 파일의 서비스·앱 재배포 허락도 따로 확인해야 한다.

| 후보 | 내보내기 위치·필요한 것 | 한글 자막·자기 글꼴·1080×1920 | 덜어 내기 평가 — 읽은 이의 판단 |
|---|---|---|---|
| A | 브라우저 Canvas→Mediabunny. [scene-exporter.ts][A-export] 95–130줄에 MP4 AVC/AAC 또는 WebM VP9/Opus, AAC 미지원 시 Opus 전환. 해당 브라우저의 인코더·메모리·GPU 여건 확인 필요 | 문자 레이어는 있으나 한글 실물 미검증. [google-fonts.ts][A-font] 27–78줄은 atlas·Google CSS 로딩; 임의 글꼴 업로드 완성 경로는 확인 못 함. 캔버스 width/height로 1080×1920 표현 가능 | 완성된 타임라인을 재사용하기 좋지만 보관된 저장소를 직접 유지해야 함. 웹앱·저장·WASM 연결이 있어 가벼운 독립 SDK라고 보기 어려움 |
| B | 로컬 Node가 FFmpeg 실행. 브라우저만으로 MP4를 만드는 경로가 아님. 서버로 옮길 경우 파일·작업별 격리와 실행 경로를 새로 설계해야 함([README][B-readme]) | [font.ts][B-font] 18–24·81–112줄: 한글 포함 글자 검사, `MAKEMYCLIP_FALLBACK_FONT`로 ttf/otf/ttc 지정. 다만 [TextStyle][B-schema] 114–126줄에는 클립별 fontFamily가 없음. 1080×1920 설정 가능. README는 Linux 배포 FFmpeg의 텍스트 필터 부족도 경고 | 하나의 문서를 쓰는 구조라 초안 연결이 단순한 편. 글꼴 선택 UI·필요한 편집 기능의 범위·pre-1.0 형식 변경 부담은 시험 필요 |
| C | 미리보기는 브라우저, 공식 렌더 경로는 Node 22+·headless Chrome/Puppeteer·FFmpeg의 로컬/서버, Docker·AWS Lambda도 안내. 브라우저에서 서버 없이 완성본 출력 가능으로 세지 않음([README][C-readme]) | HTML/CSS 문자·자막과 width/height 지원. [format.md][C-format] 103–107줄: 기본 번들은 Latin 일부만 포함, 다른 문자·굵기는 가져올 수 있음. 한글 woff2 등을 assets에 두고 @font-face로 연결해야 네트워크·기기 차이를 줄일 수 있음. 1080×1920 설정 가능 | [EditorShell.tsx][C-shell] 33–81줄의 panels·콜백, 공개 Timeline 등으로 화면을 골라 붙일 여지는 큼. 상태·컨텍스트·Studio 서버까지 연결해야 하며 GSAP 조건 확인이 먼저 |
| D | Remotion Player 미리보기, Node의 Remotion·FFmpeg 렌더. MP4·오디오·자막·프로젝트 내보내기 경로. UI만 정적 호스팅해서 모든 기능이 되는 구성은 아님([README][D-readme]) | [aspectTypes.ts][D-aspect] 11–16줄에 9:16 1080×1920. 자막 편집 경로가 있으나 한글·자기 글꼴 업로드 완성 흐름은 확인 못 함. 기본 글꼴 목록만으로 한글 출력 보장 불가 | 편집기·가져오기 기능은 유망하나 agent·생성 도구·백엔드와 라이선스가 얽힘. 덜어 낸 뒤에도 AGPL·Remotion 조건이 남는지 확인 필요 |
| E | Node/브라우저 기반 서버 렌더 외에 [client-side rendering][E-client]도 존재. 브라우저 경로는 WebCodecs·지원되는 HTML/효과 범위·메모리 제약과 렌더 계측 전송을 확인해야 함 | [Fonts 문서][E-font]의 자체 font 파일 로딩 가능. 한글 글자·자막 레이아웃은 우리 코드·글꼴에 달림. Composition 크기로 1080×1920 표현 가능 | 렌더·Player만 가져오기는 명료하나 사람이 쓸 편집기 제작 부담이 큼. 별도 구매 시작 코드의 효과는 열어 시험하지 않아 비교 불가 |
| F | 로컬/서버 FFmpeg 처리, 옵션에 따라 추가 도구. 브라우저는 검토 결과 화면 수준([README][F-readme]) | workflow 예시 46–49줄에 1080×1920·문자 넣기. [WORKFLOWS.md][F-workflow] 147–148줄은 이 판 workflow에서 add_text.font를 조정할 수 없다고 명시. 한글 자막·글꼴 지정의 전체 경로 미검증 | 자동 초안 생성용 부품만 떼는 후보. 타임라인 화면은 별도로 만들거나 다른 후보를 들여야 하므로 ‘편집 앱 하나’의 우선 후보에서 제외 |

## 5. 권하는 시험 순서 — 읽은 이의 판단

1. **A OpenCut classic:** 사람이 고치는 기존 타임라인이 있고 이전 Q5의 변환 규격을 다시 쓸 수 있어 기준 비교에 좋다. 다만 보관 상태인 만큼 유지 책임과 미디어 저장 변환의 비용부터 잰다. 새 OpenCut의 예정 API를 기다리는 선택과는 구분한다.
2. **B MakeMyClip:** 자동화와 UI가 같은 문서를 쓴다는 점이 이번 방향과 잘 맞는다. 문서 rev·undo까지 포함한 왕복이 가장 간단한지 확인한다. FFmpeg 배포·한글 글꼴·필수 편집 기능이 통과 조건이다.
3. **C HyperFrames:** 공개 Studio 구성요소와 소스 되쓰기 경로가 생겨 화면 내재화 후보로 비교할 가치가 있다. 예전 커뮤니티 요약의 ‘렌더 엔진만’ 분류는 현행 자료로 고쳐야 한다. GSAP 조건과 HTML 왕복의 소리·화면 일치를 먼저 확인한다.

D는 AGPL·Remotion·글꼴 조건을 수용할 때 다시 올릴 예비 후보, E는 편집기를 직접 만들거나 구매할 때의 부품 대안, F는 초안 실행기 대안이다. 공개 저장소의 존재와 우리 앱에 바로 넣을 수 있다는 결론은 다르다.

## 6. 돌려 봐야 아는 것과 필요한 허락

| 후보 | 다음 시험의 핵심 | 설치·내려받기 허락 |
|---|---|---|
| A | 가짜 원본과 편집표→프로젝트/OPFS→한글 수정·분할·undo→재열기→MP4. tick·trim·음소거·AAC 대체 결과, 원본 누락 시 오류 확인 | **필요**: 고정 판 복제·의존성·WASM 준비·브라우저 실행. 이번에는 안 함 |
| B | 같은 초안을 UI와 명령에서 고친 뒤 rev 충돌·undo·재열기. Windows/Linux 등 선택 환경의 한글 폭·줄바꿈, ffmpeg 경로 지정, 1080×1920 내보내기 | **필요**: 저장소/꾸러미·허용된 FFmpeg 빌드·글꼴 준비·실행. 다운로드 전에 바이너리 재배포 조건 확정 |
| C | 초안 HTML→Studio 수정→파일 되쓰기→다시 렌더. 영상·소리 trim, CSS 겹침 순서, 자막·한글 글꼴, 타임라인·속성 패널만 남겼을 때 작동 | **필요**: 고정 판·Node 의존성·브라우저/FFmpeg·글꼴 준비. GSAP 적용 범위는 그 전에 확인; 제한 대상이면 권리자 서면 허락 별도 |
| D | v1/v2 가져오기와 미디어 참조·수정·재저장. 선택한 로컬/HTTPS 환경에서 한글·렌더·파일 접근이 맞는지, agent를 제거해도 편집 경로가 유지되는지 | **필요**: 고정 판·의존성·렌더 도구·글꼴. 실제 서비스 배포 전 AGPL와 Remotion 사용 범위 검토 |
| E | 동일 편집표 props·문자 레이어를 Player와 완성본에서 비교. 브라우저 렌더의 지원 효과·소리·메모리, 선택한 Starter의 편집·저장 흐름 | **필요**: 공개 코어 설치·실행. Starter는 별도 구매/접근 허락이 있어야 시험 가능하며 아직 구매하지 않음 |
| F | 순차 job-spec의 재개·부분 실패·문자 출력 및 앞단 계획표와 결과의 일치. ‘검토’ 화면이 사람의 세부 수정 요구를 충족하는지도 확인 | **필요**: Python 꾸러미·FFmpeg·필요시 글꼴/전사 모델. 이것만 시험해도 NLE 편집기 검증은 되지 않음 |

공통 시험안은 **실제 손님 자료 없이** 합성 이미지·짧은 가짜 영상·한글 두 줄로 15초 세로 영상을 만들고, 순서 변경·한 컷 trim·문자 수정·음소거·undo·닫았다 열기·출력을 비교하는 것이다. 휴대폰 시험은 선택 기기와 실제 기기 사용 허락 뒤 추가한다. 위 시험안은 제안이며 아직 실행하지 않았다.

S34 70–77줄에서 넘길 핵심은 schemaVersion·jobId·내용 revision·media ID·원본 길이·scene ID·원본 시작·사용 길이·타임라인 시작·자막이다. **읽은 이의 판단:** 이를 우리 편집표의 기준으로 두고 후보별 변환기를 만든다. 후보 내부 rev와 우리 작업 revision은 구분한다. 사람 수정 뒤에는 새 revision·전체 편집표 hash로 승인 연결을 다시 만들고, 원본/후보 프로젝트/변환기 버전을 함께 보관해야 이전 승인으로 다른 결과를 내보내는 일을 막을 수 있다. 완성 MP4만 넘기면 장면·자막을 따로 고치는 목적을 잃는다.

## 7. RSCH가 한알께 여쭐 것

- 먼저 고칠 기기는 **컴퓨터 브라우저 / 휴대폰 브라우저 / 둘 다** 중 무엇인가. 이 답 전에는 모바일 적합성으로 후보를 확정할 수 없다.
- 우리 조직 안에서만 쓰는가, 다른 가게에 서비스하거나 설치 앱을 배포하는가. 공개할 수 있는 수정 코드의 범위와 유료 편집기/렌더 라이선스 수용 여부도 후보를 바꾼다.
- 사람이 반드시 고칠 것은 컷 순서·길이·자막·음량 정도인가, 글꼴 업로드·키프레임·여러 영상층까지인가. 먼저 필요한 기능이 정해져야 덜어 내기 비용을 비교할 수 있다.

## 8. 못 한 것·막힌 것

- **접근 거부 1건:** Remotion 문서의 ‘Improve this page’ 링크 `https://github.com/remotion-dev/remotion/edit/main/packages/docs/docs/parameterized-rendering.mdx` → “Fetch denied by robots.txt (OAI-SearchBot)”. 이 조회를 멈췄고 다른 명령·주소로 해당 소스 조회를 우회하지 않았다. 따라서 E의 원본 파일 줄 확인만 미완료다.
- 권한 거부가 아닌 조회 실패: `https://hyperframes.heygen.com/guides/compositions`, `https://mediabunny.dev/guide/license`는 “Internal Error”; `https://raw.githubusercontent.com/soundtouchjs/soundtouchjs/0.3.0/LICENSE`는 “Cache miss”. 뒤의 정확한 판 LGPL 원문은 재확인 못 함. 별도로 이미 읽은 공식 자료와 기존 Q7의 근거를 구분해 썼다.
- `api.github.com/repos/{heygen-com/hyperframes,0xsline/OpenChatCut,MakeMyClip/editor}/releases/latest` 조회도 실패했으나 일반 공개 배포 페이지는 읽었다. 일부 추정 소스 경로는 404였고, 표에는 실제로 읽은 경로만 근거로 달았다. `rg`가 없어 허용된 PowerShell 기본 명령을 사용했다.
- 실행 성능·모바일 조작·실제 한글 출력·모든 전이 의존성의 라이선스·상표 허락·배포 태그와 main의 전체 차이는 검증하지 않았다. 어느 후보도 제품 채택·설치·법적 조건 완료로 판정하지 않는다.

## 근거 주소

[A]: https://github.com/OpenCut-app/opencut-classic
[A-new]: https://github.com/OpenCut-app/OpenCut/blob/main/README.md
[A-license]: https://github.com/OpenCut-app/opencut-classic/blob/main/LICENSE
[A-brand]: https://opencut.app/brand
[A-package]: https://github.com/OpenCut-app/opencut-classic/blob/main/apps/web/package.json#L39
[A-types]: https://github.com/OpenCut-app/opencut-classic/blob/main/apps/web/src/project/types.ts#L15
[A-storage]: https://github.com/OpenCut-app/opencut-classic/blob/main/apps/web/src/services/storage/service.ts#L134
[A-version]: https://github.com/OpenCut-app/opencut-classic/blob/main/apps/web/src/services/storage/migrations/index.ts#L36
[A-export]: https://github.com/OpenCut-app/opencut-classic/blob/main/apps/web/src/services/renderer/scene-exporter.ts#L95
[A-font]: https://github.com/OpenCut-app/opencut-classic/blob/main/apps/web/src/fonts/google-fonts.ts#L27
[B]: https://github.com/MakeMyClip/editor
[B-release]: https://github.com/MakeMyClip/editor/releases/tag/v0.5.2
[B-readme]: https://github.com/MakeMyClip/editor/blob/main/README.md
[B-license]: https://github.com/MakeMyClip/editor/blob/main/LICENSE
[B-schema]: https://github.com/MakeMyClip/editor/blob/main/src/timeline/composition.ts#L114
[B-store]: https://github.com/MakeMyClip/editor/blob/main/src/timeline/document-store.ts#L35
[B-font]: https://github.com/MakeMyClip/editor/blob/main/src/ffmpeg/font.ts#L18
[C]: https://github.com/heygen-com/hyperframes
[C-release]: https://github.com/heygen-com/hyperframes/releases/tag/v0.9.104
[C-readme]: https://github.com/heygen-com/hyperframes/blob/main/README.md
[C-license]: https://github.com/heygen-com/hyperframes/blob/main/LICENSE
[C-package]: https://github.com/heygen-com/hyperframes/blob/main/packages/studio/package.json#L118
[C-studio]: https://hyperframes.heygen.com/packages/studio
[C-format]: https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes/references/format.md#L7
[C-html]: https://hyperframes.heygen.com/reference/html-schema
[C-shell]: https://github.com/heygen-com/hyperframes/blob/main/packages/studio/src/components/EditorShell.tsx#L33
[D]: https://github.com/0xsline/OpenChatCut
[D-release]: https://github.com/0xsline/OpenChatCut/releases/tag/v0.2.17
[D-readme]: https://github.com/0xsline/OpenChatCut/blob/main/README.md
[D-license]: https://github.com/0xsline/OpenChatCut/blob/main/LICENSE
[D-types]: https://github.com/0xsline/OpenChatCut/blob/main/src/editor/projectTypes.ts#L8
[D-transfer]: https://github.com/0xsline/OpenChatCut/blob/main/src/persist/projectTransfer.ts#L38
[D-aspect]: https://github.com/0xsline/OpenChatCut/blob/main/src/editor/aspectTypes.ts#L11
[E]: https://github.com/remotion-dev/remotion
[E-release]: https://github.com/remotion-dev/remotion/releases/tag/v4.0.547
[E-license]: https://github.com/remotion-dev/remotion/blob/main/LICENSE.md
[E-pricing]: https://www.remotion.dev/pricing
[E-starter]: https://www.remotion.dev/docs/editor-starter
[E-props]: https://www.remotion.dev/docs/parameterized-rendering
[E-font]: https://www.remotion.dev/docs/fonts
[E-client]: https://www.remotion.dev/docs/client-side-rendering
[F]: https://github.com/KyaniteLabs/kinocut
[F-release]: https://github.com/KyaniteLabs/kinocut/releases/tag/v2.2.0
[F-readme]: https://github.com/KyaniteLabs/kinocut/blob/master/README.md
[F-workflow]: https://github.com/KyaniteLabs/kinocut/blob/master/docs/WORKFLOWS.md#L29
[MPL]: https://www.mozilla.org/en-US/MPL/2.0/FAQ/
[GSAP]: https://gsap.com/community/standard-license/
[FFmpeg]: https://ffmpeg.org/legal.html
