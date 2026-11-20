# 2026-11-20 OpenCut 바깥 사정 — 새 판·옛 판·아이폰 Safari·이용 조건
- (RSCH가 붙임) 서브 에이전트가 쓴 글 그대로. RSCH가 받아 커밋한 때: 2026-11-20 09:14 KST. 근거 말씀: owner/utterances/2026-11-20.md 07:30:43 uuid 65e69ca8. 줄인 글은 studies/2026-11-20-opencut-in-webapp.md.

- 한 일의 범위: **읽기와 웹 조사만.** 설치·빌드·실행 없음. 원격은 `gh api`(공개 저장소)와 웹 글로, 로컬은 `apps/opencut`(e668010) · `apps/opencut-classic`(cf5e79e)을 읽기만 함.
- 표시: 출처가 붙은 것은 사실. **[추측]** 은 내 짐작. '확인 못 함'은 찾았으나 못 본 것.
- 조사한 날: 2026-11-20. 자료마다 그 자료의 날짜를 적음.
- 어제 글(`studies/2026-11-19-opencut.md`)과 겹치는 것은 적지 않음. **어제 글과 달라지는 점은 맨 아래 9번에 모음.**

## 결론 먼저

1. **새 판은 2026-09-24 뒤로 멈춰 있습니다.** 그 뒤 푸시 0건, 계획 15항목은 하나도 체크되지 않았고, 일정은 "없다"고 적혀 있고, 바깥 기여는 받지 않습니다. 화면 없는 모드 · MCP · Editor API는 **코드가 한 줄도 없습니다.** 기다리는 길은 지금 근거가 없습니다.
2. **옛 판은 보관(읽기 전용)이지만, 포크에서는 살아 있습니다.** 휴대폰 터치 편집을 실제 제품에 올렸다는 글(코드는 비공개), 자막 테두리를 넣은 포크, 화면 없는 렌더 + MCP를 붙인 포크가 있습니다. 다만 공개된 포크는 거의 별 0~38개짜리 개인 작업입니다.
3. **아이폰에서 옛 판 방식(브라우저 안에서 저장하고 영상을 뽑음)을 쓰려면 https가 먼저입니다.** WebCodecs · OPFS · `navigator.storage`는 보안 맥락에서만 뜹니다. 지금의 http 내부망에서는 편집기의 저장과 내보내기가 아예 동작하지 않습니다.
4. **옛 판을 고치지 않고 아이폰에서 돌리려면 iOS 26 이상이 필요합니다**(소재 저장에 쓰는 `createWritable`과 소리 인코더가 Safari 26부터). 그리고 Safari의 H.264 인코더가 멈추는 버그가 2026-09~10에 보고되어, 옛 판이 묶어 둔 라이브러리 판(2026-04)에는 그 우회가 없습니다.
5. **이용 조건은 걸림이 적습니다.** 두 저장소 모두 MIT(고지문만 지키면 됨). 다만 **이름과 로고는 MIT 밖**이고, 옛 판의 의존 가운데 `mediabunny`(MPL-2.0)와 `soundtouchjs`(LGPL-2.1)는 고쳐 쓸 때 조건이 있습니다.

---

## 1. 새 판 `opencut-app/opencut`의 지금

### 1-1. 2026-09-24 뒤의 변화 — 없음

| 볼 것 | 지금 | 출처 |
|---|---|---|
| 마지막 푸시(모든 가지) | `pushed_at` = 2026-09-24T09:24:44Z. 그 뒤 푸시 없음 | `gh api repos/opencut-app/opencut` (2026-11-20 조회) |
| main 마지막 커밋 | `e668010` 2026-09-24 "ci(media): add the workflow that builds FFmpeg for every platform" — 로컬에 받아 둔 것과 같음 | `gh api repos/opencut-app/opencut/commits` |
| 그 앞 커밋 | `400f097` 2026-08-01(Cursor Agent, 데스크톱 GPUI 기본 부품) → 2026-07-24 묶음(데스크톱 네 칸 틀, 편집기 길 stub) | 같음 |
| 릴리스 | 2026-09-24 `ffmpeg-8.1.3-1`("FFmpeg 8.1.3 (build 1)") 하나가 새로 생김 — 편집기 릴리스가 아니라 FFmpeg 빌드 묶음. 편집기 릴리스는 v0.3.0(2026-04-15)이 끝 | `gh api repos/opencut-app/opencut/releases` |
| README | 마지막 고침 2026-07-23("docs: add Windows proto install instructions"). Status 여섯 항목과 문장은 어제 읽은 것과 같음 | `gh api .../commits?path=README.md` |
| changelog | `0.1.0.md` · `0.2.0.md` · `0.3.0.md` 셋 그대로(옛 판의 내역) | `gh api .../contents/changelog` |
| 별 · 포크 | 별 98,944 · 포크 9,911 · 열린 이슈 390 | `gh api repos/opencut-app/opencut` |

- main에 합쳐지지 않은 가지 하나가 조금 더 나가 있음: `velvet-orbit` — 2026-08-04 "Add media foundation crates: time, decode, and render." (`crates/time`, `crates/decode`, `crates/render` — 파일 스무 개 남짓). 그 뒤로는 움직임 없음. — `gh api .../commits?sha=velvet-orbit`, `.../git/trees/velvet-orbit`
- 주 개발자의 공개 GitHub 활동은 2026-10-29 ~ 11-18 사이 다른 저장소에만 있고, 이 저장소에는 없음. — `gh api users/mazeincoding/events/public` (2026-11-20 조회). 닫힌 곳(디스코드)에서의 작업 여부는 확인 못 함.

### 1-2. 계획이 어디까지 왔나 — 추적 이슈 #811

- 추적 이슈 "Tracking: OpenCut rewrite"(작성 2026-05-26, 고정됨). **본문은 한 번도 고쳐지지 않았고**(`lastEditedAt: null`), Progress 15항목이 **모두 미체크**: Document the architecture / Engine Core / Editor API design / Plugin API design / Plugin host / Project storage / Web UI / Built-in plugins / **Headless mode** / **MCP server** / Scripting / Desktop UI (GPUI) / Android / **iOS** / Public beta. — https://github.com/OpenCut-app/OpenCut/issues/811
- 일정에 대한 공식 문장(같은 이슈의 FAQ): "**Is there a timeline on when it's coming out?** There isn't, but you will be able to watch us build it in the open."
- 바뀜에 대한 공식 문장: "When the rewrite launches, it'll replace opencut.app. The old editor moves to old.opencut.app and you'll be able to carry your projects over there and continue editing in the old version." (`old.opencut.app`은 2026-11-20 현재 DNS에 없음 — 직접 요청해 봄)
- 휴대폰: 구조 그림에 `Web · Desktop · Android · iOS → Rust core`. "Sneak peeks and early builds of the desktop/mobile app go to the Discord first." — 같은 이슈. 휴대폰용 코드는 저장소에 없음(`apps/`에 `web` · `desktop` · `api`뿐 — 로컬 `apps/opencut/apps`).
- **항목별 지금:**

| 항목 | 지금 | 근거 |
|---|---|---|
| 편집기(웹) | 길만 있고 "Coming soon." | 로컬 `apps/opencut/apps/web/src/routes/editor.tsx` (어제 확인) · 그 뒤 커밋 없음 |
| 편집기(데스크톱) | 창과 네 칸 틀 | 커밋 `ccb67d9`(2026-07-24), `400f097`(2026-08-01) |
| 휴대폰 지원 | 계획만. 코드 없음 | #811 |
| 화면 없는 모드 | 계획만. 코드 없음 | #811 미체크 · 저장소에 해당 폴더 없음 |
| MCP | 계획만. 코드 없음 | 같음 |
| Editor API | 계획만(설계 문서도 아직) | #811 "Document the architecture" 미체크 |
| 미디어 엔진 | FFmpeg 빌드 준비(main) + 시간·디코드·렌더 crate 초안(합쳐지지 않은 가지) | `e668010`, `velvet-orbit` |

### 1-3. 일정 · 때에 대한 바깥의 말

- 개발자 쪽의 새 공지는 **찾지 못함.** 저장소 토론(Discussions) 16건 가운데 유지 관리자가 쓴 것은 없음(2026-06 ~ 11, 모두 사용자 글). — `gh api graphql … discussions`
- **2026-09-01 뒤 이 저장소의 이슈 댓글 45건 가운데 유지 관리자(OWNER · MEMBER · COLLABORATOR)가 쓴 것은 0건.** — `gh api repos/opencut-app/opencut/issues/comments?since=2026-09-01` (2026-11-20 조회)
- 사용자들이 묻고 있으나 답이 없음:
  - #890 "rewrite status ?"(2026-08-21) — 답글 0
  - 토론 #861 "Rewrite Status & Alpha/Beta Timeline"(2026-07-18) — 답글 0
  - #916 "are you guys even working on this?"(2026-10-20) — 유지 관리자 답 없음
  - #920 "Confirm whether development has ceased"(2026-11-02) — 2026-11-19까지 사용자 답글 4건, 유지 관리자 답 없음. "they last updated 2 months ago"(2026-11-03), "I'd appreciate it if a public notice about development is being suspended or stopped"(2026-11-18)
  - #811의 2026-08-18 답글 "what is the overall progress with this, its been a while since last update", 2026-08-27 "is there a branch with latest work?" — 답 없음
- `new.opencut.app`: 2026-11-20에 직접 받아 보니 제목 "OpenCut rewrite — beta.opencut.app"만 있는 빈 껍데기(본문 없음). `beta.opencut.app`은 DNS에 없음. 사용자 신고 #902 "[BUG] new.opencut.app website is not visible"(2026-09-01)과 같은 상태.
- 블로그 · 공지 글: 검색에서 나온 것은 2026-07 무렵의 2차 글(소개 · 요약)뿐이고 2026-09 뒤의 공식 소식은 찾지 못함. X(@opencutapp)와 디스코드는 확인 못 함.

### 1-4. 바깥 기여

- README: "We're not set up to take outside contributions yet while the architecture is being designed." — `gh api repos/opencut-app/opencut/readme` (2026-11-20, 어제 본 문장 그대로)
- #811 FAQ: "We're still writing the architecture docs. Once those are out, you'll be able to contribute with a clear direction."
- 실제로도 2026-05-18 뒤로 새 PR이 없음(마지막 PR #806, 2026-05-18, 닫힘·합쳐지지 않음). 2026-05-16~17에 열린 바깥 PR 여럿(#794 · #797 "WebCodecs 없는 브라우저용 대체" 등)이 그대로 열려 있음. — `gh api .../pulls?state=all`
- 사용자가 고친 것을 "외부 PR이 막혀 있으니 가져다 쓰라"고 이슈에 남기는 식(#902의 2026-09-08 답글).
- 이슈로 넣은 '설계 의견'(#897 · #898, 아래 2-3)에도 답이 없음.

---

## 2. 옛 판 `opencut-app/opencut-classic`의 지금

### 2-1. 상태

| 볼 것 | 지금 | 출처 |
|---|---|---|
| 보관 | `archived: true` (읽기 전용) | `gh api repos/opencut-app/opencut-classic` |
| 마지막 커밋 | `cf5e79e` 2026-05-17 "docs: readme" — 로컬과 같음 | `gh api .../commits` |
| 이슈 | 열린 이슈 0. 보관된 저장소라 새 이슈 · PR을 넣을 수 없음(GitHub의 보관 규칙). 옛 판에 대한 버그 신고는 지금도 **새 판 저장소 이슈**로 들어옴(#927 2026-11-19 "VideoFrame constructor: Failed to allocate a BGRA surface", #925 · #924 2026-11-15 자막 관련, #914 2026-10-18 "Video stuck at 5% exportting") — 유지 관리자의 답은 없음 | `gh api .../issues` |
| 릴리스 | 없음 | `gh api .../releases` |
| 별 · 포크 | 별 301 · 포크 443 | 같음 |

### 2-2. `opencut.app`은 어느 판인가, 휴대폰으로 열면

- README(새 판): "opencut.app still runs the classic version." — 2026-11-20에도 같은 문장.
- `opencut.app` 첫 화면(2026-11-20에 받아 봄): "The open source Video editor", "Works on any platform.", 단추 "Try early beta". 휴대폰이 안 된다는 말은 첫 화면에 없음. 바닥글 Changelog의 최신은 0.3.0(2026-04-15). — https://opencut.app , https://opencut.app/changelog
- 휴대폰으로 편집기를 열면(코드로 본 것): 너비 1024 아래에서 **막는 것이 아니라 경고 화면**이 뜸 — "Desktop only (for now) / OpenCut isn't optimized for mobile or iPad yet. Things will break and the layout will be a mess. Come back on a desktop for the real experience." 단추 "Take a look anyway"를 누르면 그대로 들어가고, 한 번 누르면 기억함(localStorage). — `apps/opencut-classic/apps/web/src/components/editor/mobile-gate.tsx`:21-31, :52-61
  - **어제 글의 "막는 안내"는 정확히는 '넘어갈 수 있는 경고'입니다.**
- 실제 아이폰에서 열어 본 글: 찾지 못함(검색에 나온 것은 이름이 비슷한 다른 앱들). 안드로이드는 사용자끼리 "크롬에서 앱으로 설치하라"고 답한 글이 있음(#880, 2026-07-31). 직접 열어 보지는 않았음.
- 터치: 옛 판 소스에서 터치/포인터 이벤트를 쓰는 파일 14개, 마우스 이벤트를 쓰는 파일 14개 — 타임라인 끌기는 마우스 중심. (`grep` 결과, 로컬) 아래 FrameOS 글도 "five mouse-era drag controllers"라고 적음.

### 2-3. 휴대폰 지원 · 자막 테두리 · 화면 없는 렌더를 더한 포크

별 수와 마지막 푸시는 2026-11-20 `gh api` 조회 값.

| 포크 | 별 | 마지막 푸시 | 무엇을 더했나 | 볼 점 |
|---|---|---|---|---|
| **FrameOS**(제품, 코드 비공개 — 공개 저장소 못 찾음) | — | 글 2026-08-30 | **옛 판 편집기를 통째로 들여 휴대폰 터치 편집을 실제 서비스에 올렸다**는 글. 자막 묶음 · 가라오케도 얹음 | 새 판 이슈 #897 · #898에 '설계 의견'으로 남긴 글. 아래에 요지 |
| `Blueturboguy07/kneecap` | 38 | 2026-11-16 | "a free, open-source CapCut for iPhone". 옛 판에서 **편집 엔진만 떼어 냄**(`packages/editor-core` — React · Next 없는 TS, 관리자 12개, 저장 마이그레이션 31개, 'EDL v1' 계약) | **웹이 아니라 네이티브 껍데기(Capacitor 8, iOS 17+)로 감.** 내보내기는 네이티브 쪽으로 계획. 휴대폰 편집 화면은 "아직 없음"(README). 릴리스 없음. MIT |
| `zvv1999/moirai-cut` | 7 | 2026-11-17 | 사람과 에이전트가 같은 타임라인을 고치는 편집기. MCP, 프로젝트 파일이 '유일한 사실', 剪映/CapCut 초안 · Premiere/Final Cut 내보내기. v0.8.0(2026-10-26) | 데스크톱 브라우저 + 로컬 FFmpeg 전제. 휴대폰 얘기 없음. MIT |
| `nvxtien/opencut-classic` | 0 | 2026-11-04 | **화면 없는 렌더 + MCP 서버**: `packages/project-schema` · `packages/headless-render`(@napi-rs/canvas로 그림 + ffmpeg로 묶음, "No browser, no GPU compositor", 효과 · 마스크 없는 MVP) · `packages/mcp-server` | 우리 일(맥이 직접 릴스를 만듦)에 가장 가까운 꼴. 한 사람이 2026-11-04 하루 이틀에 올린 것. 품질 확인 못 함. MIT |
| `Irbsjel/OpenCut`("Community Unified Edition", 새 판 저장소의 포크) | 0 | 2026-11-16 | 여러 포크와 열린 PR을 한데 모음. **자막 테두리(stroke)** 있음 — `apps/web/src/services/renderer/nodes/text-node.ts`에 `strokeWidth` · `strokeColor`, `subtitles/style-store.ts`에 `strokeWidth`. 위 headless-render · mcp-server도 들어 있음 | 2026-11-10에 만들어진 한 사람 작업. `mobile-gate.tsx`는 그대로 있음(휴대폰 대응 아님). 토론 #922(2026-11-10). MIT |
| `adamhasani/opencut-classic` | 0 | 2026-11-04 | 프로젝트를 `.zip`으로 내보내고 들임(2026-10-30), CapCut 템플릿 구조 흉내 | 어제 글의 막힘 6("프로젝트를 파일로 넣을 길이 없음")을 푼 예. MIT |
| `Ekaanth/OpenCut-AI`(새 판 저장소의 포크, 2026-03 생성) | 280 | 2026-09-23 | AI 받아쓰기 · 글로 편집 · 목소리 복제 · 전환 20종 | 포크 가운데 별이 가장 많음. 휴대폰 얘기 없음. MIT |
| `nexora-sudo/OpenCut` | 2 | 2026-10-30 | 포르투갈어 · 중국어 간체, 버그 고침, 전환(0.4.0) | "developed with AI assistance". MIT |

- **자막 테두리를 넣어 달라는 요청**은 본가에도 있으나 답이 없음: 토론 #910 "text border"(2026-10-14, 답글 0).
- **FrameOS 글의 요지**(#897 "Rewrite input: field notes from shipping mobile touch editing on the classic editor", 2026-08-30) — 우리 화면 설계에 바로 쓸 수 있는 것:
  - 휴대폰에서는 **타임라인 가로 스크롤 = 재생 위치**(가운데가 지금 시각). "This one change made the timeline feel native on touch."
  - 스크롤과 끌기 가르기: 조각 몸통은 **약 260ms 누르고 있어야 끌기**로 바뀜. 자르기 손잡이와 재생 막대는 **바로** 끌림.
  - 휴대폰에서는 **고정 배율**(100px/초)로 엶. '조각에 맞춤'은 쓰지 않음.
  - 배치: 미리보기 위 · 타임라인 아래, 소재/속성은 아래에서 올라오는 판, **캡컷식 아래쪽 도구 띠**(떠 있는 단추를 먼저 냈다가 바꿈).
  - 마우스용 끌기 코드 다섯 개를 다시 쓰지 않고 **'터치 다리'**(표시한 면에서만 한 손가락 터치를 마우스 이벤트로 되돌림)를 얹음.
  - 조심: 높이는 `dvh`류로, 가로 스크롤 겹치지 않게, 화면 가장자리의 OS 몸짓(뒤로 가기)과 부딪힘.
- #898(같은 날)의 요지: 자막은 '묶음 id + 역할(chunk/highlight)'로 두었고, 자르기 · 끌기 · 바꿔 넣기 · 다시 꾸미기에서 다섯 번 걸렸다. "Caption sizes must come from the render/export spec, not preview-space values"(미리보기와 내보내기의 글자 크기가 달라 안 보인 사고), "Font loading must be non-fatal"(글꼴 받기 실패가 프로젝트 열기를 죽임).
- 이 글들은 글쓴이의 주장이고, 그 제품을 직접 열어 확인하지는 않았음.

---

## 3. 아이폰 Safari와 홈 화면 웹앱에서 되는 것

판 번호는 MDN browser-compat-data(BCD, `mdn/browser-compat-data`의 `api/*.json` — iOS Safari는 모두 "mirror" = 같은 번호의 iOS)와 caniuse 원자료(`Fyrd/caniuse` `features-json/webcodecs.json`, 2026-11-11 고침)에서 봄.

### 3-1. 기능별

| 기능 | iOS Safari | 출처 | 옛 판이 쓰는 곳 |
|---|---|---|---|
| WebCodecs `VideoEncoder` · `VideoDecoder` | **16.4**부터 | BCD `api/VideoEncoder.json` · `api/VideoDecoder.json` / WebKit "Safari 16.4 adds support for the video portion of Web Codecs API."(2023-03-27) https://webkit.org/blog/13966/webkit-features-in-safari-16-4/ | 내보내기 `scene-exporter.ts`:103 (mediabunny를 거쳐) |
| WebCodecs `AudioEncoder` · `AudioDecoder` | **26**부터 | BCD `api/AudioEncoder.json` · `api/AudioDecoder.json` / WebKit "expands support for WebCodecs API by adding AudioEncoder and AudioDecoder"(2025-09-15) https://webkit.org/blog/17333/webkit-features-in-safari-26-0/ / caniuse: iOS 16.4~18.7 "a #1 Video-only support", 26.0부터 "y" | 내보내기의 소리 `scene-exporter.ts`:110-124 |
| H.264 인코딩 | 코덱별 지원표는 1차 자료에 없음(BCD는 인터페이스만). 실제 쓰임과 버그 보고로 보면 **되지만 2026-09~10에 멈춤 버그** — 아래 3-2 | mediabunny 이슈 #541 · #587, WebKit 버그 324827 | 같음 |
| HEVC 디코딩 | `<video>`의 HEVC는 iOS 11부터(caniuse `hevc.json`). **WebCodecs `VideoDecoder`로 HEVC가 되는지를 적은 WebKit 문장은 찾지 못함 — 확인 못 함.** 정황: 옛 판은 못 읽는 HEVC에 "try importing it in Safari"라고 안내(`media/processing.ts`:19-21), 읽을 수 있는지는 `videoTrack.canDecode()`로 그때그때 물음(`media/mediabunny.ts`:43). 기기에 따라 갈린 예: 같은 4K 파일이 iPhone 13은 실패 · 13 Pro Max는 성공(mediabunny #445, 2026-07-26, iOS 26.5.2) | 왼쪽 | 소재 들이기 |
| OPFS `navigator.storage.getDirectory()` | **15.2**부터 | BCD `api/StorageManager.json` | 소재 저장 `opfs-adapter.ts`:11 |
| OPFS `FileSystemFileHandle.createWritable()` | **26**부터 (그 전에는 워커 전용 `createSyncAccessHandle`만, 15.2부터) | BCD `api/FileSystemFileHandle.json` · `api/FileSystemWritableFileStream.json` / WebKit Safari 26.0 글 "support for the File System WritableStream API" | **소재 저장 `opfs-adapter.ts`:39가 이것만 씀(대체 길 없음)** |
| `navigator.storage.persist()` · `persisted()` | 15.2부터 | BCD `api/StorageManager.json` | `use-storage-persistence.ts`:15-36 |
| `navigator.storage.estimate()` | **17**부터 | 같음 | `quota.ts`:59 |
| IndexedDB | 오래전부터. 용량 · 지워짐은 3-3 | — | 프로젝트 저장 |
| OffscreenCanvas(2D) | **16.4**부터, 워커에서도 | BCD `api/OffscreenCanvas.json` / WebKit 16.4 글 | `canvas-renderer.ts`:20 |
| OffscreenCanvas의 WebGL · WebGL2 | **17**부터 | BCD(`webgl_context` · `webgl2_context` = 17) / WebKit "Safari 17.0 … adds support for WebGL in Offscreen Canvas"(2023-09-18) https://webkit.org/blog/14445/webkit-features-in-safari-17-0/ | Rust 합성기(wgpu의 WebGL 쪽 — `rust/crates/gpu/Cargo.toml`:17 `wasm = ["wgpu/webgl"]`, 커밋 `1301d02` "wasm WebGL only until WebGPU is fixed") |
| WebGPU | **26**부터 | BCD `api/GPU.json` / WebKit 26.0 글 "now shipping in Safari 26.0 for macOS, iOS, iPadOS, and visionOS" | 지금은 안 씀 |
| WASM | 지원. 128-bit SIMD는 16.4부터 | WebKit 16.4 글 "In WebAssembly, we've added support for 128-bit SIMD." | `opencut-wasm` |
| 캔버스 넓이 한도 | iOS 계열은 **8192×8192**(가로×세로 곱) — 1080×1920은 한참 아래 | WebKit 소스 `Source/WebCore/html/CanvasBase.cpp`의 `maxCanvasArea()` (main, 2026-11-20 조회) | — |
| 화면 꺼짐 막기(Wake Lock) | Safari 16.4부터, **홈 화면 웹앱에서는 18.4부터** | WebKit 16.4 글 / "now also works in Home Screen Web Apps on iOS and iPadOS 18.4"(2025-03-31) https://webkit.org/blog/16574/webkit-features-in-safari-18-4/ | 안 씀(내보내는 동안 필요할 수 있음 **[추측]**) |

- 묶어 보면 **옛 판을 고치지 않고 아이폰에서 '소재 저장 → 편집 → 소리 있는 MP4 내보내기'까지 가려면 iOS 26 이상** [추측 — 위 표의 판 번호를 합친 것. 실제 기기에서 돌려 보지 않음]. iOS 17~18에서는 소재 저장(`createWritable` 없음)과 소리 인코딩(`AudioEncoder` 없음)에서 걸림.
  - `AudioEncoder`가 없을 때 옛 판 코드는 그대로 AAC로 진행함(`scene-exporter.ts`:113의 검사가 `typeof AudioEncoder !== "undefined"`일 때만 돎). mediabunny에는 AAC 인코더를 대신 넣는 확장 `@mediabunny/aac-encoder`가 따로 있으나 옛 판의 `package.json`에는 없음.
- 홈 화면 웹앱: iOS 26부터 "every website added to the Home Screen opens as a web app"(설치 조건 0) — WebKit 26.0 글. 그 전에는 매니페스트 `display`나 메타 태그가 있어야 했음.

### 3-2. 아이폰에서 영상 뽑기 — 2026년에 보고된 문제

| 날짜 | 무엇 | 상태 | 출처 |
|---|---|---|---|
| 2026-09-29 | Safari 27.0(macOS 27.0)에서 **H.264 인코딩이 끝없이 멈춤** — `VideoEncoder`가 프레임을 받고 출력을 안 냄. `latencyMode: 'realtime'`이면 됨 | WebKit이 2026-09-23에 고침(버그 324827 "WebCodecs video encoder may buffer too many frames", RESOLVED FIXED). **어느 Safari/iOS 판에 들어갔는지는 버그 글에 없음 — 확인 못 함** | https://github.com/Vanilagy/mediabunny/issues/541 · https://bugs.webkit.org/show_bug.cgi?id=324827 |
| 2026-10-26 | **iOS 26.2 WebKit에서도 같은 멈춤**(H.264 High/Main에서, Baseline은 됨). 보고자는 시뮬레이터에서 봤고 "실제 아이폰은 시험 못 함(하드웨어 인코더는 괜찮을 수 있음)"이라고 적음 | mediabunny가 우회를 넣음(커밋 `912733d` 2026-10-28 "Add workaround for WebKit AVC encoder stall"). 개발자 말: "Apple takes forever to deploy browser updates (and ties them to OS updates…), so I worked around it" | https://github.com/Vanilagy/mediabunny/issues/587 |
| 2025-11-10 | Safari 26의 AAC 인코더가 잘못된 설정 값을 냄 → 소리가 안 남 | WebKit 버그 302253 신고, mediabunny가 우회를 넣음 | https://github.com/Vanilagy/mediabunny/issues/206 · #171(열려 있음) |
| 2026-08-07 | Safari에서 OPFS로 흘려 쓰는 내보내기가 **조용히 깨진 파일**을 만듦 | mediabunny v1.53.1(2026-08-12)에서 고침 | https://github.com/Vanilagy/mediabunny/issues/459 |
| 2026-07-26 | iPhone 13에서 4K MP4 디코딩 실패(13 Pro Max는 됨) | "device/WebKit issue" — 라이브러리로 못 고침 | https://github.com/Vanilagy/mediabunny/issues/445 |

- **옛 판에 미치는 것:** 옛 판이 묶어 둔 mediabunny는 **1.41.0(2026-04-24)** — `apps/opencut-classic/bun.lock`:1569. 위 우회들(2026-08 · 2026-10)보다 앞선 판. 지금 최신은 v1.66.2(2026-11-19). `package.json`은 `^1.29.1`이라 새로 설치하면 올라갈 수 있으나, 잠금 파일대로면 1.41.0.
- 옛 판의 내보내기는 결과를 **통째로 메모리에 둠**(`BufferTarget` — `scene-exporter.ts`:99). 14초 릴스 크기면 작지만, 탭 메모리가 빠듯할 때 불리한 방식 **[추측]**.

### 3-3. 저장 용량과 지워지는 조건

- **한도(Safari 17 / iOS 17부터):** 출처 하나(origin)가 디스크의 **약 60%까지**(브라우저 앱), 다른 앱의 웹뷰는 15%. 전체 합은 80% / 20%. **홈 화면 웹앱은 브라우저와 같은 한도.** 대상은 localStorage · Cache API · IndexedDB · Service Worker · File System(OPFS). 넘으면 `QuotaExceededError`. "quota is an upper limit, not a guarantee." — WebKit "Updates to Storage Policy"(2023-08-10) https://webkit.org/blog/14403/updates-to-storage-policy/ · MDN "Storage quotas and eviction criteria"(2026-01-05 고침)
- **지워지는 경우(사용자나 사이트가 지우지 않아도):**
  1. 전체 합이 한도를 넘거나 기기 저장 공간이 모자랄 때 — 가장 오래 안 쓴 출처부터 **출처 통째로**. 지금 열려 있는 출처와 '지속 모드' 출처는 빠짐. — 위 WebKit 글, MDN
  2. **Safari 사용 7일 동안 그 사이트에 사용자 조작이 없을 때** 스크립트로 쓴 저장소 전부(IndexedDB · LocalStorage · Service Worker 등). — WebKit "Full Third-Party Cookie Blocking and More"(2020-03-24) https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/ · MDN
     - **홈 화면 웹앱은 따로 셈:** "Web applications added to the home screen are not part of Safari and thus have their own counter of days of use." "We do not expect the first-party in such a web application to have its website data deleted." — 같은 WebKit 글
- **지속 모드:** `navigator.storage.persist()`로 청함. WebKit은 물어보지 않고 스스로 정하는데, 기준의 예로 **"홈 화면 웹앱으로 열렸는지"** 를 듦. — WebKit Storage Policy 글
- **Safari와 홈 화면 웹앱의 저장소는 따로**라는 것: 맥의 Dock 웹앱에 대해서는 "Safari will copy the website's cookies to the web app … does not copy over any other kind of local storage"(WebKit 17.0 글)라고 적혀 있음. 아이폰 홈 화면 웹앱에 대한 같은 문장은 이번에 본 글에서는 찾지 못함 — 확인 못 함(위의 "not part of Safari"가 가장 가까움).
- 사생활 보호 탭에서는 다른 한도가 적용되고 탭을 닫으면 지워짐 — MDN.
- **우리 일에 닿는 뜻 [추측]:** 프로젝트와 소재를 아이폰 브라우저 안에만 두면(옛 판의 방식) 기기를 바꾸거나 저장소가 지워질 때 사라짐. 원본은 맥에 두고 아이폰은 '보는 창'으로 쓰는 편이 이 조건들과 잘 맞음.

### 3-4. 메모리 한도로 탭이 죽는 문제

- **Apple · WebKit이 숫자로 적어 둔 탭 메모리 한도는 찾지 못함 — 확인 못 함.** 1차 자료에서 확인되는 것은 캔버스 넓이 한도(위 표)와, Safari 17.0 글의 고친 목록에 있는 "Canvas context allocation failures due to exceeding the maximum canvas memory limit"뿐.
- 정황(2차): 같은 일을 하는 라이브러리의 이슈에 Safari 메모리 누수(mediabunny #169, 2025-10), 기기별 디코딩 실패(#445)가 있음. 새 판 이슈 #881(2026-07-30)은 "브라우저는 탭 메모리 한도가 있고 메모리 부족으로 죽으면 세션이 사라진다"를 웹 우선의 약점으로 듦(사용자 글).
- 실제 한도는 아이폰 기종과 iOS 판에 따라 다르므로 **실기에서 재 봐야** 함.

### 3-5. 보안 맥락(https)이 필요한 기능

`http://<내부망 주소>`는 보안 맥락이 아닙니다(`localhost`만 예외). 아래는 https가 아니면 **아예 없는 것처럼** 됩니다.

| 기능 | 근거 |
|---|---|
| **WebCodecs 전부**(`VideoEncoder` · `VideoDecoder` · `AudioEncoder` · `AudioDecoder` · `ImageDecoder`) | W3C WebCodecs 명세의 IDL `[Exposed=(Window,DedicatedWorker), SecureContext]`(`w3c/webcodecs` `index.src.html`:304 · 660 · 1024 · 1400) / MDN 목록의 "WebCodecs API" |
| **Storage API**(`navigator.storage` — `persist` · `estimate` · `getDirectory`) | WHATWG Storage 명세 `[SecureContext]`(`storage.bs`:604 · 618) / MDN 목록의 "Storage API" |
| **File System API · OPFS** | WHATWG File System 명세의 모든 인터페이스에 `SecureContext`(`fs/index.bs`:329 …) / MDN OPFS 글 "available only in secure contexts (HTTPS)" |
| Service Worker(오프라인 · 캐시) · Web Push · 알림 · 배지 | MDN 목록("Service Workers", "Push API", "Notifications API", "Badging API") |
| Web Share · 비동기 Clipboard · Web Locks · Screen Wake Lock · WebGPU | MDN 목록 |
| 카메라 · 마이크(`getUserMedia`) | MDN 목록 |
| Web Crypto(`crypto.subtle`) | MDN "Web Crypto API" |

- https가 **없어도 되는 것**: IndexedDB, OffscreenCanvas, WebAssembly, `<video>` 재생, `<input type="file">`로 사진 · 영상 고르기 — MDN 목록에 없음(목록: "Features restricted to secure contexts", 2026-03-08 고침, https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts/features_restricted_to_secure_contexts).
- **뜻:** 옛 판의 편집기를 지금의 http 내부망에 그대로 넣으면 소재 저장(`navigator.storage.getDirectory`)과 내보내기(`VideoEncoder`)가 동작하지 않음. **브라우저 안에서 영상을 다루는 어떤 길이든 https 전환이 앞에 와야 함.** 서버(맥)가 영상을 뽑고 휴대폰은 화면만 고치는 길은 https 없이도 되지만, 홈 화면 웹앱의 다른 기능(알림 · 화면 꺼짐 막기 · 공유) 때문에 https는 어차피 필요함 **[추측]**.

---

## 4. mediabunny

- **무엇:** "Pure TypeScript media toolkit for reading, writing, and converting video and audio files, directly in the browser." MP4 · MOV · WebM · MKV · HLS · WAVE · MP3 · Ogg · ADTS · FLAC · MPEG-TS를 읽고 씀. 인코딩 · 디코딩은 브라우저의 WebCodecs에 맡김("hardware-accelerated using the WebCodecs API"). 의존 0. Node · Bun · Deno에서는 `@mediabunny/server`로. — https://github.com/Vanilagy/mediabunny (README, 2026-11-20 조회)
- **상태:** 별 7,521 · 마지막 푸시 2026-11-19 · 최신 v1.66.2(2026-11-19) — 한 달에 여러 번 릴리스. 후원사에 Figma · Remotion 등. 매우 활발.
- **코덱:** 영상 `avc` · `hevc` · `vp8` · `vp9` · `av1`(+ 확장으로 ProRes), 소리 `aac` · `opus` · `mp3` 등. "The availability of the codecs provided by the WebCodecs API depends on the browser and thus cannot be guaranteed by this library." 인코딩 가능 여부를 묻는 함수와, 브라우저에 없을 때 끼워 넣는 확장(`@mediabunny/aac-encoder` — FFmpeg의 AAC 인코더를 WASM으로, `@mediabunny/mp3-encoder` 등)이 있음. — `docs/guide/supported-formats-and-codecs.md`, `packages/aac-encoder/README.md`
- **iOS Safari:** 따로 '지원 표'는 없고 "Works in all browsers"라고만 적음. 실제로는 3-2의 표처럼 Safari 고유의 문제가 계속 보고되고, 개발자가 빠르게 우회를 넣는 흐름. 개발자 말: "AudioEncoder is supported starting from Safari 26, which ships with iOS 26."(#206, 2025-11-04), "I have tested Mediabunny extensively on WebKit"(#541, 2026-09-29), "I don't have an iPhone"(#206, 2025-11-04). **최신 판을 따라가는 것이 사실상 조건.**
- **이용 조건: MPL-2.0**(파일 단위의 약한 카피레프트). README의 풀이: 상업 · 비공개 제품에 써도 되고 배포도 자유. 지킬 것은 둘 — **mediabunny의 소스 파일을 고쳐서 배포하면 그 고친 것을 MPL-2.0으로 공개**해야 하고, **소스 파일의 라이선스 · 저작권 머리말을 지우지 않음.** npm에서 받아 그대로 쓰는 한 추가 의무는 사실상 고지뿐 — https://github.com/Vanilagy/mediabunny#license , `LICENSE`

---

## 5. 이용 조건

### 5-1. 두 저장소

| | 라이선스 | 저작권 표시 | 근거 |
|---|---|---|---|
| 새 판 | MIT | "Copyright 2026 OpenCut" | `apps/opencut/LICENSE` |
| 옛 판 | MIT | "Copyright 2025-2026 OpenCut" | `apps/opencut-classic/LICENSE` |

- **지켜야 하는 것(MIT):** "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software." — 가져다 쓴 코드(통째든 '상당한 부분'이든)가 들어가는 곳에 **저작권 줄 + 허가문 전문**을 같이 둠. 그 밖의 제한 없음(고쳐 쓰기 · 팔기 · 비공개 가능). 보증 없음.
  - 본보기: `kneecap` 포크는 원문 `LICENSE`를 그대로 두고 `NOTICE`(출처 밝힘)와 `docs/THIRD_PARTY_NOTICES.md`(의존 라이선스 목록)를 따로 둠 — 그 README. `moirai-cut`도 `NOTICE.md`를 둠.
- 약관 쪽 문장: "OpenCut is free for personal and commercial use.", "Self-host OpenCut on your own servers", "You own everything you create." — https://opencut.app/terms ("Last updated: March 15, 2026")

### 5-2. 이름 · 로고

- **MIT가 이름과 로고까지 주지는 않음.** 브랜드 쪽 문장(옛 판 소스와 사이트에 같은 글):
  - "OpenCut is open source — the code is free to use under its license. That license does not cover the name or logo."
  - 해도 되는 말: "You can say you use OpenCut, that your project integrates with OpenCut, or that it was built on top of OpenCut."
  - 안 되는 것: "Using OpenCut in the name of your product, service, or domain." / "Implying that OpenCut made, sponsors, or endorses your work." / "Using the logo or name on merchandise or commercial marketing." / "Modifying the marks."
  - 물을 곳: brand@opencut.app
  - 출처: `apps/opencut-classic/apps/web/src/app/brand/page.tsx`:176-199 · https://opencut.app/brand
- 상표 등록 여부는 확인 못 함(브랜드 글에 상표 문장은 없음).
- **뜻:** 웹앱 안에서 그 기능을 'OpenCut'이라는 이름으로 부르거나 로고를 붙이지 않음. 고지 화면에 "OpenCut(MIT)을 바탕으로 만듦" 정도는 허용 범위. 포크들도 모두 **다른 이름**을 쓰고 "not affiliated with or endorsed by"를 적음(kneecap · moirai-cut README).
- 곁다리: 가짜 사이트 신고가 있음 — #899 "opencut.net Fake websites appear"(2026-08-31). 내려받거나 안내할 때 주소를 헷갈리지 않아야 함.

### 5-3. 옛 판의 의존 라이브러리 — 조심할 것

`apps/opencut-classic/apps/web/package.json`의 직접 의존(:21-80) 가운데 눈여겨볼 것. 라이선스 값은 npm 등록 정보(2026-11-20 조회, 최신 판 기준)로 봄.

| 라이브러리 | 쓰임 | 라이선스 | 조심할 것 |
|---|---|---|---|
| `mediabunny` (:50) | 영상 읽기 · 뽑기 | **MPL-2.0** | 4번. 고쳐서 배포하면 그 파일 공개. 그대로 쓰면 고지만 |
| `soundtouchjs` (:73) | 속도 바꾸기(높낮이 유지) | **LGPL-2.1** | **가장 조심할 것.** 웹앱은 이 코드를 사용자 브라우저로 '배포'하는 셈이라 LGPL 의무(라이브러리 소스 제공 · 바꿔 끼울 수 있게 함 · 고지)가 걸릴 수 있음 **[추측 — 법률 판단 아님]**. 우리 릴스에 속도 바꾸기가 필요 없으면 빼는 것이 간단 |
| `@huggingface/transformers` (:24) | 자동 자막(브라우저 안 음성 인식) | Apache-2.0 | 라이브러리는 문제없음. **내려받는 모델은 모델마다 조건이 따로.** 우리는 자동 자막을 쓰지 않으므로 뺄 수 있음 |
| `botid` (:39) | 봇 막기(Vercel) | npm 등록 정보에 **라이선스 값 없음** — 확인 못 함 | Vercel 서비스에 묶인 것. 내부망에는 필요 없음 → 빼기 |
| `sharp` (:97, 개발용) | 그림 처리 | Apache-2.0 | 함께 오는 libvips 바이너리는 LGPL 계열(일반 지식 — 이번에 원문 확인 안 함). 개발용이라 배포물에 안 들어감 |
| `wavesurfer.js` (:78) | 소리 파형 | BSD-3-Clause | 고지문 |
| `@hello-pangea/dnd` (:21) | 끌어 놓기 | Apache-2.0 | 고지문(+ NOTICE 있으면 같이) |
| `@hugeicons/core-free-icons` · `@hugeicons/react` · `react-icons` · `lucide-react` | 아이콘 | MIT · MIT · MIT · ISC | `react-icons`는 여러 아이콘 묶음을 싣고 있어 묶음마다 조건이 다름(일반 지식) |
| `opencut-wasm` (:55) | Rust 합성기 | MIT | `rust/wasm/Cargo.toml` `license = "MIT"` |
| 나머지(`next` · `react` · `zustand` · `zod` · `better-auth` · `drizzle-orm` · `@upstash/*` · `motion` · `culori` · `cmdk` · `feed` · `embla-carousel-react` · `@opennextjs/cloudflare` · `onnxruntime-web` 등) | 틀 · 화면 · 서버 | MIT 계열(확인한 것은 모두 MIT) | 고지문만 |

- 라이브러리 말고 **바깥 서비스에 기대는 것**(코드가 아니라 내용물의 조건):
  - 글꼴: 구글 폰트를 인터넷에서 받아 옴 — `apps/web/src/fonts/google-fonts.ts`:4. 글꼴마다 라이선스(주로 OFL)가 따로이고, **내부망에서 인터넷이 막히면 글꼴이 안 뜸.** (FrameOS 글도 글꼴 받기 실패로 프로젝트가 안 열린 사고를 적음 — #898)
  - 소리 찾기: Freesound API 키가 환경 값으로 필수 — `apps/web/src/env/web.ts`:24-25. Freesound의 소리는 **소리마다 CC 조건이 다름**(일부는 비상업). 우리는 쓰지 않으면 됨. 포크 `adamhasani`는 이 값을 선택으로 바꿈(커밋 `cf150ea` 2026-10-30 "make Marble and Freesound env vars optional for self-hosting").
  - 블로그(Marble CMS) · 로그인(better-auth + Postgres) · 속도 제한(Upstash Redis): 편집기 자체에는 필요 없으나 켜려면 환경 값이 다 있어야 함(어제 글).
- 전체 의존 나무(잠금 파일의 수백 개)의 라이선스를 하나하나 보지는 않았음 — 직접 의존만 봄.

---

## 6. "오픈컷에서는 되는데 캡컷에서는 안 되는 것"과 그 반대

이 일(자동으로 만든 릴스를 휴대폰에서 고침)에 닿는 것만. 캡컷 쪽은 공식 약관에서 확인되는 것만 적고, 약관에 없는 것은 '확인 못 함'으로 둠.

### 6-1. 오픈컷(옛 판)에서는 되는데 캡컷에서는 안 되는 것

| # | 무엇 | 오픈컷 | 캡컷 | 캡컷 쪽 근거 |
|---|---|---|---|---|
| 1 | **우리 웹앱 안에 넣기** | MIT — 통째로 들여 고쳐 써도 됨 | 금지: "incorporate the Services or any portion thereof into any other program or product, except as expressly permitted" | CapCut Terms of Service §6 (7) — "Last updated: April 15, 2026" https://www.capcut.com/clause/terms-of-service |
| 2 | **코드로 조작하기**(자동화) | 편집 조작이 명령으로 되어 있어 코드로 부를 수 있음(어제 글). 포크에 MCP · 화면 없는 렌더까지 있음 | 금지: "use automated scripts or other technologies to collect information from or otherwise interact with the Services" | 같은 약관 §6 (9) |
| 3 | **프로젝트의 꼴을 읽고 쓰기** | 타입으로 공개(`timeline/types.ts`), 저장 마이그레이션까지 소스에 있음 | 금지: "reverse engineer, disassemble, decompile, or create any derivative works based on, the Services". 초안 파일 형식의 **공식 문서는 찾지 못함** — 도는 것은 비공식 역설계 도구들이고, 그 가운데 하나는 "newer versions … draft_content.json … often not a plain-text JSON"이라고 적음(2차, 비공식) | 약관 §6 (2). 형식 문서 없음은 '찾지 못함'이지 '없음을 확인'은 아님 |
| 4 | **화면 없는 내보내기** | 본가에는 없으나(어제 글) 포크 `nvxtien`이 Node로 만듦 | **공식 길을 찾지 못함 — 확인 못 함.** 공개 개발자 API를 검색했으나 나온 것은 비공식 도구뿐. 약관의 'API'는 "third-party sites and apps를 통한 접근"을 정의하는 문맥에만 나옴 | 약관(플랫폼 정의) |
| 5 | **상업용 음원 걱정이 없음** | 음원을 주지 않음 → 우리가 고른 음원의 조건만 따르면 됨 | **기본 Sounds는 개인 · 비상업 전용**: "so long as the video content is only for personal entertainment and non-commercial purposes". 약관 본문에도 "NO RIGHTS ARE LICENSED WITH RESPECT TO SOUND RECORDINGS AND THE MUSICAL WORKS EMBODIED THEREIN". **Commercial Sounds는 올릴 곳이 "CapCut, TikTok and TikTok for Business"로 한정**: "Any uses of Commercial Sounds outside of the Permitted Platforms require you to obtain separate permission." → **가게 홍보 릴스를 인스타그램에 올릴 때 캡컷 음원은 조건에 맞지 않음** | CapCut Materials License Agreement — "Last updated: January 22, 2026" https://www.capcut.com/clause/material-license-agreement |
| 6 | **꾸밈 소재의 상업 이용** | 소재를 주지 않음(글꼴은 구글 폰트) | 플랫폼 소재는 기본이 개인 · 비상업. 일부 'Dual Use' 표시가 있는 것만 제한적 상업 이용. 섞으면 비상업으로 떨어짐: "you can only use such content for the personal and non-commercial use". 유료 소재는 내보낼 때마다 조건 | 같은 Materials License Agreement |
| 7 | **내용물이 남의 서버로 가지 않음** | 프로젝트 · 소재가 기기 안(IndexedDB · OPFS) — 손님 얼굴이 나오는 영상에 유리 | 사용자 내용물에 대해 "non-exclusive, royalty-free, transferable, sub-licensable, perpetual and worldwide license"를 캡컷에 줌. 이름 · 모습 사용 허락도 포함 | 약관 §10 |
| 8 | **기능이 갑자기 바뀌지 않음** | 보관된 코드라 바뀌지 않음(대신 고쳐 주는 이도 없음) | "we reserve the right to change our Service Plans including, by adjusting the features or services available", "WE MAY CHANGE, SUSPEND, WITHDRAW OR RESTRICT THE AVAILABILITY OF ALL OR ANY PART OF THE PLATFORM" | 약관 §7 · §12 |

- 약관의 한국 관련 대목에 대해: 요약 도구가 "South Korea section — for your personal use"라는 대목이 있다고 보고했으나 원문 줄을 내가 직접 대조하지 못함 — **확인 못 함**(원문 재확인 필요).
- 목소리(글 → 말)의 상업 이용: Materials License Agreement에 **언급이 없음** — 확인 못 함.

### 6-2. 캡컷에서는 되는데 오픈컷(옛 판)에서는 안 되는 것

| # | 무엇 | 캡컷 | 오픈컷 옛 판 | 근거 |
|---|---|---|---|---|
| 1 | **휴대폰에서 편집** | 아이폰 앱이 있음 | "Desktop only (for now) … isn't optimized for mobile or iPad yet" | `mobile-gate.tsx`:52-56 |
| 2 | **자막 테두리** | 있음(지금 릴스의 기본 꼴 — 어제 글) | 없음. 포크(`Irbsjel`)에만 | 어제 글 · 2-3 |
| 3 | **목소리 만들기** | 있음(어제 글) | 없음 | 어제 글 |
| 4 | **한국어 자동 자막** | 확인 못 함(공식 문서 안 봄) | 9개 언어에 한국어 없음 | 어제 글 |
| 5 | **효과 · 전환 · 템플릿 · 음원 묶음** | 있음(다만 6-1의 5 · 6처럼 상업 이용 조건이 붙음) | 전환 · 필터는 "coming"(#811) — 옛 판에는 없음. 사용자 요청 #907 "there are no effects loding up"(2026-10-12) | #811 |
| 6 | **고쳐 주는 주인이 있음** | 회사가 계속 고침 | 보관. 버그 신고에 답 없음(#914 "Video stuck at 5% exportting" 2026-10-18, #927 2026-11-19) | 2-1 |
| 7 | **아이폰에서 안정적으로 영상 뽑기** | 네이티브 인코더 | 브라우저의 WebCodecs에 기대며 Safari 쪽 버그가 이어짐(3-2) | 3-2 |

- 4번을 뺀 캡컷 쪽 '있음'은 제품을 써 본 일반 사실이며 이번에 공식 문서로 다시 확인하지는 않았음.

---

## 7. 견줄 다른 오픈소스 웹 영상 편집기 (셋)

별 수 · 날짜는 2026-11-20 `gh api` 조회.

| 이름 | 라이선스 | 별 | 마지막 활동 | 휴대폰에서 되는가 |
|---|---|---|---|---|
| **OpenReel Video** (`Augani/openreel-video`) | MIT | 5,699 | 2026-11-19("Sync 1.0 release prep…") — 매우 활발 | README의 브라우저 표에 "Safari 16.4+ Full support". 그러나 **"Mobile optimization"은 'Planned'** 목록에 있음. WebGPU · WebCodecs 중심(없으면 Canvas2D로 물러남). → 휴대폰 화면은 아직 아님 |
| **FreeCut** (`walterlow/freecut`) | MIT | 2,339 | 2026-10-29 | "Chrome or Edge 113+ is recommended. FreeCut depends on WebGPU, WebCodecs, OPFS, and the File System Access API, so a modern Chromium browser is required" → **아이폰 Safari는 대상 밖.** 화면 없는 API(`renderFrame` · `dumpLayout`)가 있으나 크롬 전제 |
| **Omniclip** (`omni-media/omniclip`) | MIT | 1,475 | main의 마지막 커밋 2025-08-07("1.1.3"), 다른 가지에 2026-11-15 푸시. README "Omniclip 2.0 is in development!" | 휴대폰 언급 없음. "may not work properly on older browsers or devices" |

- **셋 다 휴대폰 브라우저에서 쓸 수 있다고 내세우지 않습니다.** 휴대폰 너비에 맞춘 오픈소스 웹 편집기는 이번 조사에서 찾지 못했고, 가장 가까운 것은 옛 판을 휴대폰용으로 고쳤다는 FrameOS(비공개)와 네이티브로 간 kneecap입니다.
- 참고로 엔진만 따로인 것: `diffusionstudio/core`(MPL-2.0, 별 1,251, 마지막 푸시 2025-11-18 — "browser based video compositing engine powered by WebCodecs"). 편집기 화면은 아님.

---

## 8. "OpenCut을 웹앱에 포함한다"에 대해 바깥 사정이 말해 주는 것

### 8-1. 옛 판을 쓸 때의 위험 셋

1. **아이폰에서 '영상 뽑기'가 가장 약한 고리.** 옛 판은 브라우저 안에서 저장하고 인코딩함. 그러려면 https(3-5), iOS 26 이상(3-1), 그리고 2026-09~10에 드러난 Safari H.264 인코더 멈춤(3-2)을 피하는 새 mediabunny가 필요함. 옛 판이 묶어 둔 판(1.41.0, 2026-04)에는 그 우회가 없고, 실제 아이폰에서 되는지는 아무도 확인해 주지 않음(보고자도 시뮬레이터까지만). 탭 메모리 한도는 공식 수치가 없음.
2. **고쳐 주는 이가 없는 코드를 우리가 들고 감.** 보관 상태라 버그 신고에 유지 관리자의 답이 없고(#914 · #924 · #925 · #927 — 달린 답글은 모두 다른 사용자의 것), 휴대폰 화면 · 자막 테두리 · 프로젝트 파일 넣기는 모두 우리가(또는 별 0짜리 포크에서 가져와) 붙여야 함. FrameOS 글은 "된다"는 증거이지만 "여러 번의 릴리스에 걸쳐" 했다고 적었고 코드는 공개되지 않음. 의존(Next 16 · React 19 · wgpu · mediabunny)의 보안 · 호환 갱신도 우리 몫 — kneecap README의 말로 "owns its entire dependency and security surface going forward".
3. **지금 웹앱과 꼴이 다름 + 저장이 휴대폰 안에 갇힘.** 옛 판은 Next.js(React) 앱이고 환경 값(Postgres · Redis · Freesound · Marble)이 다 있어야 켜지며, 글꼴은 인터넷에서 받고, 프로젝트는 아이폰 브라우저 저장소에 둠. 우리 것은 '파이썬 서버 + 정적 HTML'이고 원본은 맥에 있음. 그대로 넣으면 (가) 두 번째 앱을 하나 더 돌리는 셈이고 (나) 맥이 만든 릴스를 아이폰 편집기에 '넣는 길'(프로젝트 파일 들이기)이 본가에는 없으며 (다) 저장소가 지워지면(3-3) 편집이 사라짐. 덧붙여 `soundtouchjs`(LGPL-2.1) 같은 걸리는 의존과 이름 · 로고 금지(5-2)를 정리해야 함.

### 8-2. 새 판을 기다릴 때의 위험 셋

1. **언제 나올지 알 근거가 없음 — 그리고 지금은 멈춰 있음.** 공식 문장이 "There isn't [a timeline]". 2026-09-24 뒤 푸시 0, 계획 15항목 미체크, 진행을 묻는 이슈 · 토론 다섯 건에 두 달 넘게 답이 없음(1-3). 기다리는 동안 캡컷 + 컴퓨터 유즈를 계속 들고 가야 함.
2. **나와도 우리가 바라는 꼴이 아닐 수 있음.** 구조 그림에서 iOS는 **Rust 코어 위의 앱**이고(#811), 데스크톱은 GPUI(브라우저가 아님), 미디어는 FFmpeg 쪽으로 가고 있음(`e668010`). '아이폰 홈 화면 웹앱 안의 한 화면'으로 끼워 넣을 수 있는 웹 편집기가 나온다는 약속은 없음. Progress 순서로도 iOS는 14번째, 화면 없는 모드 9번째, MCP 10번째. 옛 판의 프로젝트는 "carry over" 한다고만 적혀 있어 옛 판에서 한 작업이 이어질지도 그 말뿐.
3. **끼어들 수 없음.** 바깥 기여를 받지 않고(README · #811), 설계 문서가 아직 없으며, 이슈로 낸 설계 의견에도 답이 없음(#897 · #898). 방향이 우리 필요와 어긋나도 바로잡을 길이 없고, 결국 포크하면 8-1의 2와 같은 부담이 됨. 별 9만 9천에 견줘 2026-05-18 뒤 main의 커밋 작성자는 한 사람과 코딩 에이전트("Cursor Agent")뿐 — `gh api repos/opencut-app/opencut/commits`.

### 8-3. 그래서 읽히는 것 **[추측]**

- 바깥 사정만 놓고 보면 "포함한다"의 뜻을 **'OpenCut이라는 제품을 통째로 넣는다'가 아니라 'OpenCut 옛 판의 조각(프로젝트 꼴 · 명령 · 그리는 순서)과 포크들이 보여 준 방식을 가져다 우리 웹앱의 편집 화면을 만든다'** 로 잡는 편이 위험이 작습니다. MIT가 이를 허락하고(고지문만), 포크들이 실제로 그렇게 하고 있습니다(kneecap의 `editor-core` 떼어 내기, nvxtien의 화면 없는 렌더, FrameOS의 터치 문법).
- **영상 뽑기는 맥에 두는 편**이 아이폰 Safari의 약한 고리(3-2 · 3-4)를 피합니다: 아이폰은 고칠 내용(자막 글 · 장면의 길이 · 순서 · 빼기 · 소리)만 보내고, 맥이 다시 뽑아 미리보기를 돌려줌. 이 꼴은 브라우저 안 인코딩이 필요 없어 https · iOS 판 · 메모리 조건에 덜 묶입니다. 반대로 '아이폰 안에서 바로 뽑기'까지 OpenCut 방식으로 하려면 8-1의 1을 실기에서 먼저 확인해야 합니다.
- 휴대폰 타임라인의 손놀림은 FrameOS 글의 네 가지(스크롤 = 재생 위치, 260ms 누르면 끌기, 고정 배율, 아래 도구 띠)가 지금 구할 수 있는 가장 구체적인 본보기입니다.
- 이것은 판단 재료이고, 어느 뜻으로 '포함'할지는 한알께서 정하실 일입니다.

---

## 9. 어제 글(2026-11-19)과 달라지는 점

| 어제 글 | 오늘 확인 |
|---|---|
| "너비 1024 아래면 막는 안내가 뜸" | 막는 것이 아니라 **넘어갈 수 있는 경고**("Take a look anyway", 한 번 누르면 기억) — `mobile-gate.tsx`:21-31, :61 |
| "화면 없는 크롬을 띄워 우리 스크립트를 넣는 틀을 직접 짜야 함" | 포크에 **브라우저 없이 Node로 뽑는 것**이 이미 있음(`nvxtien` — @napi-rs/canvas + ffmpeg, 효과 없는 범위). 품질은 확인 못 함 |
| "자막에 테두리를 못 넣음 … 그리는 코드를 고쳐야 함" | 본가는 그대로. 포크 `Irbsjel/OpenCut`의 `text-node.ts`에 `strokeWidth` · `strokeColor`가 있음 — 본보기로 볼 수 있음. (옛 판 본가에도 도형용 테두리 `graphics/stroke.ts`는 있으나 글자용은 아님) |
| "프로젝트를 파일로 넣을 길이 없음" | 본가는 그대로. 포크 `adamhasani`(zip 들이기 · 내보내기), `kneecap`('EDL v1' 계약), `nvxtien`(`project-schema`)이 저마다 만듦 |
| "새 판을 지켜봅니다 … 나올 때는 알 수 없습니다" | 알 수 없는 정도가 아니라 **2026-09-24 뒤로 멈춤**, 묻는 글에 답 없음 |

## 10. 확인하지 못한 것

- 실제 아이폰(홈 화면 웹앱)에서 옛 판이 열리고 · 저장하고 · 내보내는지 — 돌려 보지 않음. iOS 26 이상이 필요하다는 것은 판 번호를 합친 짐작.
- WebCodecs `VideoDecoder`의 HEVC 디코딩과 `VideoEncoder`의 H.264 인코딩을 iOS에서 보장한다는 WebKit의 문장(코덱별 표).
- WebKit 버그 324827의 고침이 어느 iOS/Safari 판에 들어갔는지. 실제 아이폰(하드웨어 인코더)에서도 그 멈춤이 나는지.
- 아이폰 Safari의 탭 메모리 한도(공식 수치).
- 아이폰 홈 화면 웹앱의 저장소가 Safari와 따로라는 것을 적은 1차 문장(맥 Dock 웹앱에 대한 문장만 봄).
- 새 판의 디스코드 · X에서의 소식(닫힌 곳이거나 받아 오지 못함).
- FrameOS가 실제로 어떻게 생겼는지(글쓴이 주장만 봄), 포크들의 품질(코드가 있는지만 봄).
- 캡컷: 공식 개발자 API가 '없다'는 것(찾지 못했을 뿐), 약관의 한국 관련 대목의 원문, 목소리(TTS)의 상업 이용 조건, 미국용 약관(따로 있음).
- `botid`의 라이선스, 옛 판의 간접 의존 전체의 라이선스, `sharp`에 딸린 바이너리의 조건(원문 미확인).
- OpenCut 이름의 상표 등록 여부.
