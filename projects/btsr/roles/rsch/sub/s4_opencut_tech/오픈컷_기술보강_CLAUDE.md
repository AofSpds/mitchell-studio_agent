# 오픈컷 기술 보강 — 웹앱에 넣기 전에 읽기와 웹 조사로 메운 빈 곳

- 쓴 세션: MITCHELL_STUDIO/BTSR/RSCH/S4_OPENCUT_TECH (Opus 5.5) · 쓴 때: 2026-11-20 10:00~ KST
- 근거 말씀(owner/utterances/2026-11-20.md): 09:31:27 uuid 6a656594 「네 일단 기술적인 분석이 충분히 됐을까요. 아니라면 서브세션에 일을 맡깁니다」 · 09:40:13 uuid d8264b43 「실테스트는 맥북에서 오늘 저녁에 진행합니다」(덧붙임 1)
- 일의 원본: 이 칸의 `OPEN_PACKET.md`(커밋 b7ed38f, 덧붙임 1은 40c5a26)
- **한 방법:** 읽기와 웹 조사만 했습니다. **설치 · 빌드 · 실행 · 시험은 하나도 하지 않았습니다.** 읽기 보조 여섯(Agent 도구)에게 물음을 나눠 맡겼고, 그 보고에 기댄 곳은 **(보조가 읽음)**으로 적었습니다. 내가 소스에서 직접 다시 본 것은 ✔로 적었습니다.
  - 보조 ① 정적 묶음 · 포크 목록(Q1 · Q6) ② 뽑기 · 미리보기 코드(Q2ⓐⓑ · Q3) ③ 저장 꼴 · 장면표 맞대기(Q5) ④ 화면 없는 Chrome(Q2ⓒⓓ, 웹) ⑤ 아이폰 · Tailscale · 푸시(Q3 · Q4, 웹) ⑥ 포크 코드 · 이용 조건(Q2ⓔ · Q6 · Q7)
- 경로: OpenCut은 `apps/opencut-classic/apps/web/src/` 기준(커밋 cf5e79e919144200294fb9fed22a222592a0aeea ✔ — `.git/refs/heads/main`), Rust는 opencut-classic 뿌리 기준, mediabunny는 `mb@1.41.0:파일:줄`(옛 판이 잠근 판 — `bun.lock`:1569), 제품 코드는 `app/…`.
- 표시: **[추측]** 짐작 · **[전해 들음]** 요약으로만 봄 · '못 찾음' 찾지 못함(없다는 뜻 아님) · ✔ 내가 소스에서 다시 봄.

---

## 0. 결론 먼저

**PRIMARY의 안(포크 → 정적 묶음 → 맥이 화면 없이 뽑음 → 아이폰은 미리보기와 고치기만)은 읽어서는 무너지지 않았습니다. 다만 기둥 넷에 조건이 붙었고, 셋은 안에 적어 넣어야 합니다.**

1. **아이폰 '미리보기만'도 고치지 않으면 iOS 26이 필요합니다.** 미리보기 소리를 mediabunny가 WebCodecs `AudioDecoder`로 풀고(AAC · MP3), 소재를 OPFS `createWritable`로만 저장하기 때문입니다 — 둘 다 iOS 26부터. **맥이 소재를 'H.264 8비트 MP4 영상 + WAV 소리' 사본으로 주고, 소재 저장을 OPFS 대신 서버에서 받아 메모리에 두게 고치면** 판 번호를 합친 하한이 iOS 16.4로 내려갑니다 **[추측 — 판 번호를 합친 것, 실기 확인 필요]**. → Q3
2. **맥이 뽑을 때 'AAC가 안 되면 말없이 Opus'가 됩니다.** 그리고 60fps 소재를 넣으면 프로젝트가 60fps로 올라가는데 H.264 레벨은 30fps 기준(`avc1.640028`)으로 고정됩니다. 뽑기 옵션에 30fps를 꼭 넘기고, Opus로 바뀌면 오류로 멈추게 고쳐야 합니다(작음). → Q2
3. **정적 묶음은 조건부로 됩니다.** 편집기 길을 `?id=` 쿼리로 바꾸고, 편집기 밖 쪽과 api를 덜어 내고, `basePath`를 넣고, 파이썬 서버가 `.wasm`을 `application/wasm`으로 내줘야 합니다(Turbopack이 `instantiateStreaming`만 씀). COOP/COEP 머리말은 필요 없습니다. → Q1
4. **https는 Tailscale `serve`로 됩니다 — 대신 맥 이름이 공개 장부(CT)에 영구히 실리고, 주소가 바뀌어 홈 화면 추가 · PIN 로그인을 다시 해야 합니다.** 푸시는 맥이 바깥 인터넷(`*.push.apple.com`)에 나갈 수 있어야 합니다. → Q4
5. **옛 판에는 '프로젝트 들여오기'가 없습니다.** 맥이 만든 JSON을 받으려면 들여오기 길을 우리가 더해야 하고, 저장 판 31 꼴 그대로 · 모든 시각을 정수 틱(30fps면 4,000의 배수)으로 써야 합니다(옛 자료 옮기기 코드가 어긋나 있어 낮은 판으로 넣으면 안 옮겨짐 ✔). → Q5
6. **브라우저 없이 그리는 포크(nvxtien)는 우리 쓰임에 못 씁니다.** 그리는 코드를 새로 짰고 영상 · 글자 셋만 그립니다(소리 · 사진 · 자리 · 테두리 없음) — '휴대폰에서 본 대로'가 깨집니다. → Q2ⓔ
7. **자막 · 고정 글자의 모양 값은 저장소에 캡컷 단위로 일부만 있고, 고정 글자 넷은 값이 없습니다.** 글꼴 DSDSRefinedLetterM은 OpenCut 글꼴 목록에 없고, 글꼴 파일을 넣는 길도 옛 판에 없습니다. → Q8 · Q6

**오늘 저녁 맥북 시험은 9번에 순서대로 적었습니다.** 갈림이 큰 것부터: ① T0 맥 Chrome에서 H.264 · AAC · GPU가 되는가(설치 없이 15분 — 뽑기 길 전체가 걸림) → ② T-i 아이폰의 iOS 판과 기능(설치 없이 15분) → ③ T2 옛 판을 띄워 맥에서 한 편 뽑기(+빌드 통과) → ④ T1 https(serve)로 아이폰에서 열어 보기 → ⑤ T3-반 저장 꼴을 실물로 확인 → ⑥ T8 1025의 글자 값 읽기. 장면표 한 바퀴 전체(시험 3)와 나란히 보기(시험 4)는 변환 스크립트 · 들여오기 길 · 목소리 파일이 있어야 해서 오늘은 못 합니다.

---

## Q1 정적 묶음 — **조건부로 됨**

**근거(보조 ①이 읽음, 내가 일부 다시 봄):**

| # | 막는 것 | 근거 | 가장 작은 고침 | 크기 |
|---|---|---|---|---|
| 1 | 동적 경로 `editor/[project_id]` — `generateStaticParams` 없음, 쪽이 `"use client"`라 같은 파일에서 내보낼 수도 없음 | `app/editor/[project_id]/page.tsx`:3, 39-40 · Next 문서 Static Exports "Unsupported Features": "Dynamic Routes without `generateStaticParams()`" | 쪽을 `app/editor/page.tsx`로 옮기고 `?id=`로 읽음(`useSearchParams`면 Suspense로 감쌈 — 문서 "Missing Suspense boundary with useSearchParams"). 이동하는 곳 5군데: `app/projects/page.tsx`:515, 667, 692, 961 · `components/providers/editor-provider.tsx`:62 | 작음~중간 |
| 2 | 요청을 읽는 api 라우트 셋 | `app/api/auth/[...all]` · `app/api/feedback` · `app/api/sounds/search` · 문서 "Route Handlers that rely on Request" | 세 폴더를 지움 | 작음 |
| 3 | 요청을 안 읽는 라우트 · 메타데이터 라우트 | `app/api/health` · `app/rss.xml` · `app/robots.ts` · `app/sitemap.ts`(:6 빌드 때 Marble 블로그를 부름) | 지움 | 작음 |
| 4 | 바깥 자료를 부르는 서버 쪽 | `blog` · `blog/[slug]` · `contributors`(:32-39 `revalidate: 600` — ISR은 정적에서 안 됨) · `changelog/[version]` | 지움 | 작음 |
| 5 | 맨 바깥 틀이 환경 값을 검사 | `app/layout.tsx`:9 → `env/web.ts`:30 `webEnvSchema.parse(process.env)` ✔(지난 연구) | import를 지우고 `env/web.ts`도 지움(다른 importer는 auth · db · sounds뿐) | 작음 |
| 6 | `next.config.ts`의 rewrites · headers — botid가 조건 없이 더함 | `next.config.ts`:2, 54 `withBotId` · botid 1.5.11 `dist/next/config/index.mjs`(unpkg, 2026-11-20) · 문서 "These configs do not apply when exporting" | `withBotId` · `BotIdClient`(`app/layout.tsx`:8, 31) 지움 | 작음 |
| 7 | `next/image` 기본 로더 | 문서 "Image Optimization with the default loader" | `images: { unoptimized: true }` | 작음 |
| 8 | 하위 경로 `/edit/` | basePath 문서: link · router는 "automatically applied", next/image는 "add the basePath in front of src" | `basePath: "/edit"` · `trailingSlash: true`. basePath를 안 따라가는 하드코딩 5곳 고침: `fonts/google-fonts.ts`:5-6, 31, 51(`/fonts/…`) · `stickers/providers/flags.ts`:13 · `services/renderer/effect-preview.ts`:8, 91 · `site/brand.ts`:13 → `editor-header.tsx`:115-121 · `app/metadata.ts`:40-82 | 작음~중간 |
| 9 | 타입 검사 실패 의심 | ✔ `services/storage/migrations/runner.ts`:41-45가 `new IndexedDBAdapter("video-editor-projects","projects",1)`로 값 셋을 나란히 넘기는데 생성자는 객체 하나(`indexeddb-adapter.ts`:8-16). `v1-to-v2.ts`:124-164 세 곳 · `runner.ts`:98 `set` 도 같음. 문서: "Next.js fails your production build when TypeScript errors are present" | 객체 인자로 고침(5곳) 또는 옮기기 호출을 통째로 뺌(새 포크에는 옛 자료 없음) | 작음 |
| 10 | content-collections 경로 어긋남 | `content-collections.ts`:6이 없는 폴더 `src/lib/changelog/entries`를 가리킴 | changelog를 덜어 내고 `withContentCollections`(`next.config.ts`:3, 54) 지움 | 작음 |
| 11 | `.wasm` 읽기 | `opencut-wasm`은 `wasm-pack --target bundler` 꼴(뿌리 `package.json`:10). Next 16은 `next build`의 기본 번들러가 Turbopack(문서 2026-11-06). Turbopack v16.1.3 브라우저 런타임이 `.wasm`을 `WebAssembly.instantiateStreaming`으로만 읽음(`turbopack/…/runtime-backend-dom.ts`@v16.1.3:77-82, 223-224 — gh api) | **파이썬 서버가 `.wasm`을 `Content-Type: application/wasm`으로 내줘야 함.** 맥의 python3 3.9(`agents/pmo/knowhow.md`:7)의 `mimetypes` 표에 `.wasm`은 있고 `.avif`(글꼴 미리보기 그림)는 없음(cpython 3.9 `Lib/mimetypes.py`) → `.avif`는 손으로 더함 | 작음 |

- **필요 없는 것:** SharedArrayBuffer · `crossOriginIsolated` · `Atomics` · ffmpeg.wasm 0건, Rust 쪽 rayon · atomics 없음, wgpu `features = ["wgpu/webgl"]`(`rust/crates/gpu/Cargo.toml`:17) → **COOP/COEP 머리말 필요 없음**(mediabunny · opencut-wasm 속은 node_modules가 없어 못 봄). 워커는 자동 자막의 하나뿐(`services/transcription/service.ts`:114)이라 덜어 내면 사라짐. middleware 0건, Server Actions · `cookies(` · `headers(` 0건.
- **`next/font/google`(Inter):** 빌드 때 받아 묶음 안에 넣음 — 문서 "No requests are sent to Google by the browser". 빌드할 때만 인터넷이 필요(`next/font/local`로 바꾸면 그것도 없음, 작음).
- **남길 쪽:** `editor`와 `projects` 둘. 나머지 쪽(랜딩 · 블로그 · 브랜드 · 약관 등)은 지움.

**우리 안에 주는 뜻:** 안의 1번('정적 묶음으로 빌드해 우리 서버가 같은 주소 아래에서 내줌')은 유지됩니다. 서버 쪽에 더할 것은 **정적 폴더 주기 + 파일 종류별 머리말(`.wasm` · `.avif` 포함) + `/edit/editor/` 같은 폴더 주소를 `index.html`로 + 쿼리를 지키는 슬래시 붙이기**입니다.

**정적이 끝내 안 될 때의 다른 길(보조 ①):** (A) `output: "standalone"` 그대로 `node server.js`를 127.0.0.1에만 띄우고 파이썬이 `/edit/`를 넘김 — PIN은 파이썬에 남지만 **맥에 늘 켜 둘 Node 프로그램(LaunchAgent, 운영자 허락 — `agents/pmo/knowhow.md`:22)** 과 넘기기 코드가 듦 (B) Vite로 편집기만 묶음 — `next/*`를 쓰는 파일 10개 안팎 + wasm 플러그인 + Tailwind 4 설정, 중간~큼.

**돌려 봐야만 아는 것:** `output: "export"` + basePath로 `next build`가 통과하는지 · `.wasm`이 어디에 떨어지고 basePath를 따르는지 · 아이콘 · 매니페스트 주소가 basePath를 붙이는지 · 프리렌더 중 `window` 접근으로 깨지는 쪽이 있는지.

---

## Q2 맥에서 화면 없이 뽑기 — **조건부로 됨(코드 쪽) · ⓒ는 아래**

### ⓐ 들머리와 넣는 길 — 됨(작음)

- **편집기 화면(React 트리 · 미리보기 캔버스)이 없어도 뽑힙니다.** `document`가 있는 쪽 하나에서 ① `initializeGpuRenderer()`(`services/renderer/gpu-renderer.ts`:11-24 — 보통 함수, 지금은 `editor-provider.tsx`:41-43에서 부름) ② 프로젝트 · 장면 · 소재 넣기 ③ `EditorCore.getInstance().project.export({ options })`(`core/managers/project-manager.ts`:212-234 ✔지난 연구)면 됩니다. 뽑기는 `buildScene()`으로 장면을 직접 만들어 미리보기 트리를 쓰지 않습니다(`renderer-manager.ts`:179-185). **(보조 ②가 읽음)**
- **꼭 지킬 것:** GPU를 먼저 초기화하지 않으면 합성기가 "GPU context not initialized"(`rust/wasm/src/compositor.rs`:28-29 · `rust/wasm/src/gpu.rs`:65-77). Canvas2D로 대신 그리는 길은 없음. 합성기가 `document.createElement("canvas")`를 쓰므로 Worker · Node에서는 못 돎(`compositor.rs`:37-43).
- **넣는 길 둘:** (가) 저장소를 거침 — `storageService.saveProject`(`service.ts`:134-168, 날짜는 Date 객체로) · `saveMediaAsset`(287-334, 꼭 필요한 것 `id · name · type · file`) → `loadProject({id})` (나) **메모리만** — `project.setActiveProject({project})`(`project-manager.ts`:640-643) → `scenes.initializeScenes({scenes, currentSceneId})`(`scenes-manager.ts`:198) → `media.setAssets({assets})`(`media-manager.ts`:153-156) → `loadFonts` → `export`. (나)는 IndexedDB · OPFS · 옛 자료 옮기기를 전혀 안 거치고, 자동 저장도 막혀 뽑기 전용으로 알맞음. 그리는 데 소재에 꼭 있어야 하는 것은 `file`과 `url`뿐(`scene-builder.ts`:64).
- **주소 파라미터를 받는 곳은 편집기에 없음**(소리 검색 API뿐). **싱글턴**(EditorCore · 합성기 · 영상 캐시)이라 한 쪽에서 한 번에 한 편만 — 일마다 쪽을 새로 여는 편이 안전.
- **고칠 곳:** 렌더 전용 쪽 하나(예: `app/render/page.tsx`, `"use client"`) — 위 ①②③ 후 `buffer`를 `fetch`로 맥 서버에 POST(작음). `window.__editor` 하나만 내놓는 길도 됨(작음).

### ⓑ 쓰는 것 · 코덱 · 규격 — 조건부

| 무엇 | 사실 | 근거 |
|---|---|---|
| 그릇 · 영상 | `new Output({ format: Mp4OutputFormat, target: BufferTarget })`, `new CanvasSource(합성기 캔버스, { codec: "avc", bitrate: qualityMap[quality] })` | `scene-exporter.ts`:94-107 |
| **영상 비트레이트** | `3,000,000 × (픽셀 ÷ 1920·1080)^0.95 × 코덱계수(avc 1) × 품질계수(low 0.6 · medium 1 · high 2 · very_high 4)` → 1080×1920에서 **low 1.8 · medium 3.0 · high 6.0(화면 기본값) · very_high 12.0 Mbps** | `mb@1.41.0:encode.ts`:349-369 · `export/defaults.ts`:5 (보조 ②) |
| **코덱 문자열** | High 프로파일 고정, 레벨은 매크로블록 수와 비트레이트로만 고르고 **fps는 안 봄** → 1080×1920이면 **`avc1.640028`(Level 4.0)**. 30fps는 L4 한도 안. **60fps면 L4.2가 필요한데도 640028이 나감** | `mb@1.41.0:codec.ts`:121-141, 217-232 |
| 키프레임 | 기본 5초마다(15초면 0 · 5 · 10초) | `mb@1.41.0:media-source.ts`:319-330 |
| 하드웨어 가속 · latencyMode · bitrateMode | **안 정함** → WebCodecs 기본값(no-preference · quality · variable) | `mb@1.41.0:encode.ts`:214-218 |
| **소리 코덱** | ✔ MP4면 `aac`. `AudioEncoder.isConfigSupported({codec:"mp4a.40.2", …, bitrate:192000})`가 거절하면 **말없이 `opus`로 바꿔 MP4에 넣음.** `AudioEncoder`가 아예 없으면 aac로 가다 mediabunny가 던짐 | `scene-exporter.ts`:109-128 · `mb@1.41.0:media-source.ts`:1726-1728 |
| 소리 비트레이트 | AAC: low 96k · medium 128k · high/very_high 192k | `mb@1.41.0:encode.ts`:420-444 |
| 소리 규격 | 44,100Hz · 2채널 고정. **들리는 조각이 하나도 없으면 소리 트랙 자체가 없음** → 지금 규격 검사(`jobs.py`:405-423, 소리 줄 있는지)에 걸림 | `media/audio.ts`:30, 629, 646, 648 |
| 크기 | `settings.canvasSize` 그대로. 기본은 **1920×1080(가로)**이라 1080×1920을 넣어야 함 | `renderer-manager.ts`:167 · `canvas/sizes.ts`:10 |
| fps | `options.fps ?? 프로젝트 fps`. **60fps 영상을 들이면 프로젝트 fps가 60으로 올라감** → 뽑기 옵션에 `fps: {numerator:30, denominator:1}`을 꼭 넘김 | `renderer-manager.ts`:166 · `project-manager.ts`:504-519 · `fps/utils.ts`:86-104 |
| 실패 | mediabunny는 다른 코덱으로 조용히 바꾸지 않고 던짐(`VideoEncoder` 없음 · 홀수 크기 · `isConfigSupported` 거절) → `{success:false, error}` | `mb@1.41.0:media-source.ts`:458-492 · `renderer-manager.ts`:233-238 |

- **프레임마다 영상을 푸는 꼴:** 미리보기와 같은 `videoCache.getFrameAt` → mediabunny `CanvasSink`(원본 해상도로 풂 — 가로세로를 안 줌, `services/video-cache/service.ts`:281-284 ✔). 순서대로 뽑으면 프레임마다 탐색하지는 않음(80-93). **느려질 곳 [추측]:** 4K 원본을 4K로 풀고 올림 · 프레임마다 새 OffscreenCanvas에 복사(`compositor/wasm-compositor.ts`:211-226) · **WebGPU가 없으면 WebGL 쪽이 프레임마다 `getImageData`로 CPU에 읽어 올림**(`rust/crates/gpu/src/context.rs`:514-576) · 60fps 원본이면 버릴 프레임도 다 풂. → **맥도 4K 원본보다 1080×1920 30fps 사본을 넣는 편이 빠를 것 [추측].**
- **npm의 `opencut-wasm@0.2.10`에는 WebGPU가 들어 있음**(글루에 `requestAdapter` 등 — 보조 ②가 unpkg 묶음을 읽음). 소스도 WebGPU 먼저, 안 되면 WebGL2(`context.rs`:200-258). 지난 연구가 적은 커밋 1301d02 "WebGL only"는 제품 저장소 git을 쓰지 않아 다시 보지 못함.
- **mediabunny를 올리면:** 1.41.0 → 1.66.2 사이에 Chromium 쪽 고침이 여럿(첫 패킷 키 표시 #365 · 키프레임 판별 #396 · 소리 시각 · 색 공간 · 인코더 실패를 삼키던 것 v1.66.0 등). **다만 v1.52.0부터 품질 단계가 고정 화질(quantizer) 방식으로 바뀌고 `bitrate`가 deprecated** — 위 Mbps 셈이 달라짐. (보조 ② — 릴리스 노트)
- **고칠 곳(작음):** `scene-exporter.ts`:102-128 — 비트레이트를 숫자로 못 박기, **Opus로 바뀌면 오류로 멈추기**, 필요하면 `hardwareAcceleration` · `keyFrameInterval` 넣기.

### ⓒ · ⓓ 맥 Chrome 화면 없는 모드 · 걸리는 시간 — 아래 'Q2ⓒⓓ' 칸에 따로 적음

### ⓔ 브라우저 없는 Node 렌더 포크 — **우리 쓰임에는 못 씀** (보조 ⑥이 gh api로 코드를 읽음)

- `nvxtien/opencut-classic`: 옛 판 cf5e79e 위에 커밋 5개, 한 사람이 2026-11-04 약 1시간 10분에 올림. `apps/web`은 한 줄도 안 고치고 `packages/*`만 새로 더함. 셋 다 `"private": true`.
- **입력:** 옛 판 타입을 옮긴 자체 Zod 스키마(`project.ts`:13 "Mirrors … TProjectMetadata"). `version`은 "written (always 1) but never read"(`project.ts`:53-58) — 판 31을 읽어 본 시험은 없음.
- **그리는 것:** `scene.ts`:33-37 "MVP scope only: the main track's video element … and text-type overlay tracks. Audio, image/sticker/graphic/effect elements, retime, and animated params are out of scope". 영상은 ffmpeg로 풀어 **화면 전체에 늘려 붙임**(transform · 비율 맞춤 없음, `compositor.ts`:110-111). 글자는 `content · fontSize · color`만 읽어 `600 ${fontSize}px "Arial"`로 한가운데(`compositor.ts`:22-50) — 옛 판의 `fontSize × 화면 높이 ÷ 90` 환산이 없어 **같은 프로젝트에서 글자 크기가 달라짐**. 테두리 · 배경 · 글꼴 · 줄바꿈 · 자리 없음.
- **출력:** `libx264` · `yuv420p`, 소리 트랙 없음(`encode.ts`:26-43).
- **MCP 도구 12개:** `create_project` · `list_projects` · `add_media` · `add_clip` · `split_clip` · `trim_clip` · `add_text` · `remove_element` · `get_project_state` · `delete_project` · `export_video` · `get_render_status`. 미디어 · 작업 목록은 메모리에만.
- `Irbsjel/OpenCut`이 이 세 패키지를 바이트까지 같게 담고 있음.
- **뜻:** 미리보기와 그리는 코드를 나눠 쓰지 않으므로 '휴대폰에서 본 대로 맥이 뽑음'이 깨짐. 쓸 만한 것은 설계 글의 한 줄 — 'wgpu가 M1 Metal에서 화면 없이 돈다'(`docs/mcp-headless.md`:111-119, 그 사람의 주장) — 정도. **뽑기는 옛 판 엔진을 브라우저에서 돌리는 길(ⓐ)이 맞음.**

---

## Q3 아이폰은 미리보기와 고치기만 — **조건부 (고치지 않으면 iOS 26 · 고치면 16.4 [추측])**

**미리보기 · 고치기 · 저장 길이 쓰는 기능(보조 ②가 코드에서, 판 번호는 보조 ⑤와 지난 보조가 BCD · WebKit 원문에서):**

| 기능 | 어디서 | 미리보기에 | iOS Safari | 근거(판) |
|---|---|---|---|---|
| WebCodecs `VideoDecoder`(mediabunny `CanvasSink`) | `services/video-cache/service.ts`:265-284 ✔ | **꼭 필요 — `<video>`로 물러서는 길 없음** | **16.4** (H.264). HEVC는 **17.4**부터, 그래도 'isSupported는 참인데 풀기 실패' 버그가 REOPENED | WebKit `WebCodecsVideoDecoder.cpp`(avc1 무조건 허용, hev1/hvc1은 `webCodecsHEVCEnabled`) · Safari 17.4 노트 "Added WebCodecs HEVC support" · WebKit 버그 262950 |
| 10 · 12비트 픽셀 | 아이폰 HDR 원본(10비트 HEVC) | 원본을 그대로 쓰면 걸림 | **기본 꺼짐** (`WebCodecsHighBitDepthEnabled: false`) | WebKit `UnifiedWebPreferences.yaml` |
| 잠금 모드 | — | **잠금 모드면 WebCodecs 영상이 꺼짐** | `WebCodecsVideoEnabled`에 `disableInLockdownMode: true` | 같은 파일 |
| WebCodecs `AudioDecoder`(mediabunny `AudioBufferSink`) | 미리보기 소리 `core/managers/audio-manager.ts`:597-612 ✔ · `media/audio.ts`:460-484 | **AAC · MP3 소리는 꼭 필요.** WAV(pcm)는 mediabunny가 스스로 풂. `decodeAudioData`로 물러서는 길 없음 → **없으면 조용히 소리 없음** | **26** | `mb@1.41.0:media-sink.ts`:2069-2086 · `input-track.ts`:437-447 · BCD |
| 합성 wgpu — WebGPU 먼저, 없으면 **WebGL2(일반 캔버스)** | `rust/crates/gpu/src/context.rs`:200-258 | 꼭 필요 | WebGL2 **15**, WebGPU 26 | BCD |
| OffscreenCanvas **2D** | `services/renderer/canvas-utils.ts`:11-15 · `compositor.rs`:224 | 꼭 필요(없으면 던짐). OffscreenCanvas+WebGL은 필요 없음 | **16.4** | BCD |
| `requestAnimationFrame` · `AudioContext` · `OfflineAudioContext` · `ctx.roundRect` | 재생 · 소리 · 글자 배경 | 꼭 필요 | 오래전부터 / roundRect는 16 무렵 **[추측 — 이번에 BCD 확인 안 함]** | — |
| IndexedDB | 프로젝트 JSON · 소재 메타 | 지금 구조에서 필요 | 오래전부터 | — |
| OPFS `getDirectory` + **`createWritable`** | 소재 파일 저장 `services/storage/opfs-adapter.ts`:37-42 | **지금 코드로는 소재를 넣는 데 필수 — 저장이 실패하면 그 소재와 그 소재를 쓰는 조각을 지움** ✔(`commands/media/add-media-asset.ts`:52-70). 지원 검사는 `getDirectory`만 봄(`opfs-adapter.ts`:76-78) | `createWritable` **26** | BCD |
| https(보안 맥락) | WebCodecs · OPFS · Storage API | 꼭 필요 | — | 명세 `[SecureContext]`(지난 보조) |

- **'고치지 않으면 iOS 26'은 미리보기만 할 때도 맞습니다** — 소재를 넣는 순간 `createWritable`, AAC 소리를 듣는 순간 `AudioDecoder`가 걸립니다. 영상은 16.4부터 보이더라도 소리가 안 나고 소재가 지워집니다.
- **소재를 OPFS에 넣지 않고 맥 서버에서 바로 읽게 바꾸면 풀리는 것(보조 ② — 고칠 곳):**
  1. 소재 불러오기(`media-manager.ts`:87-103 · `service.ts`:336-404)를 '서버 목록 → `fetch` → `File`로 메모리에' 로 바꿈 — **`createWritable` 전제가 사라짐**. 영상 캐시는 `BlobSource` 그대로 씀(작음~중간). 큰 파일은 메모리 부담 [추측].
  2. 더 나아가 mediabunny **`UrlSource`(1.41.0에 있음 — `mb@1.41.0:source.ts`:362, Range 요청 · 캐시 64MiB)** 로 흘려 읽기 — 고칠 곳 5~6파일(중간). 같은 출처(우리 서버)여야 캔버스가 오염되지 않음 — 서버는 이미 Range를 받음(`server.py`:421-466).
  3. 새 소재 올리기(`add-media-asset.ts`:52-95)를 서버 업로드로(작음~중간).
  4. 프로젝트 JSON은 IndexedDB에 두거나 서버로(중간) — IndexedDB는 오래전부터 되므로 판 하한에는 안 걸림.
- **맥이 주는 사본의 꼴 [제안 — 위 표에서 이끈 것]:** 영상 **H.264 8비트 · MP4 · 1080×1920 이하(또는 720×1280) · 30fps**, 소리 **WAV(pcm)** 따로. 그러면 HEVC(17.4+버그) · 10비트(꺼짐) · AAC 디코더(26) · 아이폰 `.mov` 소리를 `decodeAudioData`가 못 여는 버그(WebKit 228971, NEW)를 모두 피합니다. 그 위에서 판 번호를 합친 하한은 **16.4** **[추측 — 실기 확인 필요]**.
- **4K 원본과 메모리:** 탭 · 홈 화면 웹앱의 메모리 한도를 숫자로 적은 1차 자료는 못 찾음. WebKit은 2023-06에 캔버스 총 메모리 한도를 없애고 "This might mean more pages crash (jetsam) than break"라고 적음(커밋 6bd11f3792, 265628@main) → **넘으면 오류가 아니라 탭이 죽음.** 캔버스 넓이 한도는 iOS 8192×8192(1080×1920은 한참 아래). 미리보기는 늘 프로젝트 크기(1080×1920)로 그리고 영상은 원본 해상도로 풂(`preview/components/index.tsx`:27-36 · `service.ts`:281-284) — 4K NV12 한 장 약 12.4MB vs 720×1280 약 1.4MB(셈). **맥의 가벼운 사본이 맞음.** 덤으로 `CanvasSink`에 `width/height`를 주면 줄여 풂(작음).
- **못 푸는 영상 하나로 미리보기가 멈출 수 있음 [추측 — 코드 읽기]:** `service.ts`:276-277이 던지고 ✔, 위쪽에 catch가 없어 렌더 중 표시가 true로 남음(`preview/components/index.tsx`:207-211).
- **휴대폰 문턱:** 너비 1024 아래면 "Desktop only" 화면이 먼저 뜸 — 넘어갈 수 있음(`mobile-gate.tsx`:21-23, ✔지난 연구).
- **엔진이 끝내 안 돌 때의 대안(사실 수준):** 맥이 고친 판을 작은 MP4(예: 540×960)로 뽑아 `<video>`로 보여 줌 — `<video>`의 H.264 재생은 https · WebCodecs · OPFS가 필요 없음(MDN 보안 맥락 목록에 없음 — 지난 보조). 대신 고칠 때마다 맥이 다시 뽑아야 하고(걸리는 시간은 Q2ⓓ), 고치는 화면은 (나) 작은 고침 화면이어야 함(타임라인 미리보기가 없음).

**돌려 봐야만 아는 것:** 운영자 아이폰의 iOS 판 · 잠금 모드 여부 · 아이폰에서 WebGPU와 WebGL2 가운데 무엇이 잡히고 1080×1920 미리보기가 몇 fps인지 · AAC 소리가 정말 조용히 빠지는지 · 실제 아이폰 원본(HEVC HDR)에서 `VideoDecoder.isConfigSupported`와 실제 풀기.

---

## Q4 https와 푸시 — **됨(조건 있음)** (보조 ⑤가 원문으로)

| 물음 | 답 | 근거 |
|---|---|---|
| `serve`의 `*.ts.net` 인증서를 아이폰이 믿나 | **믿음** — Let's Encrypt | tailscale.com/kb/1153/enabling-https (2025-12-10): "Tailscale will automatically request a certificate for this machine on this domain, using Let's Encrypt." |
| 켜는 조건 | 관리 콘솔 DNS 쪽에서 **MagicDNS + HTTPS Certificates 켜기** | 같은 글 · kb/1312/serve (2026-01-20): "Tailscale Serve requires you to enable HTTPS certificates in your tailnet." |
| **조심** | **맥 이름과 tailnet 이름이 공개 장부(CT)에 영구히 실림** — "Do not enable the HTTPS feature if any of your machine names contain sensitive information." | kb/1153 |
| 갱신 | `serve`는 연결 때 인증서를 캐시에서 꺼내고 만료가 가까우면 새로 받음(소스) | `tailscale/tailscale` `ipn/ipnlocal/cert.go` 설명 |
| 아이폰이 tailnet에 있어야 하나 | **예** — serve는 tailnet 안에서만 | kb/1312: "available only within the tailnet" |
| `funnel`과 차이 | funnel은 인터넷 공개(443 · 8443 · 10000만) → **serve만 쓰면 '인터넷에 공개하지 않음'을 지킴** | kb/1223/funnel |
| 우리 서버가 보는 접속 주소 | **127.0.0.1**(serve가 `http://127.0.0.1:<포트>`로 넘김) + `X-Forwarded-For` · `Tailscale-User-Login` 머리말 | `ipn/ipnlocal/serve.go` · kb/1312 |
| 사용자 공간 모드(맥이 쓰는 꼴)에서도 serve가 되나 | 됨 — netstack이 가로챔(소스 주석) | `serve.go` 주석. kb에는 이 말 못 찾음 |
| `*.ts.net`에서 홈 화면 웹앱이 Web Push를 받나 | **iOS 16.4 이상 · 홈 화면 웹앱 · 매니페스트 `display: standalone` · 서비스 워커 · 사용자 몸짓 안에서 허락 요청**이면 됨. ts.net에 대한 도메인 제약은 못 찾음 | WebKit "Web Push for Web Apps on iOS and iPadOS"(2023-02-16) · Apple "Sending web push notifications…" |
| iOS 26에서 바뀐 것 | 홈 화면에 추가하면 매니페스트 없이도 웹앱으로 열림. 푸시 조건이 바뀌었다는 말은 못 찾음 → 매니페스트 + 서비스 워커를 두는 편이 안전 | WebKit Safari 26.0 글(2025-09-15) |
| 맥이 보낼 때 바깥 인터넷 | **필요** — "allow access for `https://*.push.apple.com`", VAPID 키, JWT subject는 URL 또는 `mailto:` | Apple 문서 |
| 아이폰 Tailscale이 꺼져 있어도 오나 | **올 것 [추측]** — 푸시는 APNs로 오고 tailnet과 무관. VPN을 직접 다룬 원문은 못 찾음. **알림을 눌러 여는 화면은 tailnet이 켜져 있어야 열림** | WebKit 2023-02 글 "uses the same Apple Push Notification service" |
| 다른 길 (a) 사설 인증서 | 기기마다 프로파일 설치 + '인증서 신뢰 설정'에서 전체 신뢰 켜기. 서비스 워커 · 푸시가 되는지 1차 자료 못 찾음 | Apple 지원 102390 |
| 다른 길 (b) 자기 도메인 + Let's Encrypt DNS-01 | 공개되지 않은 서버에도 됨, 대신 DNS API 키를 맥에 둬야 함 · IP는 못 함. 공유기의 DNS rebinding 보호에 걸릴 수 있음 [추측] | letsencrypt.org/docs/challenge-types |
| 가게 와이파이 `.local` | 공인 인증서 못 받음 — CA/B 포럼이 2015-11-11부터 내부 이름 인증서 발급 금지 | cabforum.org internal-names |
| 맥 자신(localhost)은 https 필요 없음 | **됨** — W3C Secure Contexts: `127.0.0.0/8` · `::1` · localhost는 "Potentially Trustworthy". Chromium 시험 `is_potentially_trustworthy_unittest.h`가 `http://localhost` · `http://127.0.0.1`을 참으로 봄(`localhost.localdomain`은 거짓) | w3c.github.io/webappsec-secure-contexts · MDN Secure contexts |

**우리 안에 주는 뜻:**
- **PIN은 그대로 걸림** ✔ — PIN은 쿠키로만 봄(`server.py`:350-355), 127.0.0.1이라고 면제하는 길 없음. 접속 허용 검사는 127.0.0.1을 통과시킴(`server.py`:96 ✔) — 지금 사용자 공간 Tailscale도 이미 127.0.0.1로 들어옴(`app/webapp/tailscale/start_tailscaled.sh`:4 ✔). **달라지는 것:** PIN 5번 틀림 잠금이 주소별(`server.py`:165-189 ✔)이라 serve로 오는 접속이 모두 한 주소로 묶임 — 지금도 Tailscale 접속은 그렇다. 진짜 접속자는 `X-Forwarded-For`로 볼 수 있음.
- **http는 같이 열려 있음:** 서버는 모든 주소(`::`)에서 들음(`server.py`:60 ✔) — https를 더해도 가게 와이파이 http는 남음. 닫을지는 ARCH.
- **주소가 바뀌면(http → https ts.net) 출처가 달라져** 쿠키 · 브라우저 저장소가 새로 시작하고 홈 화면에도 다시 추가해야 함 [추측 — 출처 규칙상].
- **맥 이름을 정하기 전에 https를 켜지 말 것** — 가게 · 사람 이름이 들어 있으면 CT에 영구히 남음.
- 맥 Tailscale은 Homebrew 사용자 공간 모드이고 자동 시작 등록은 허락 대기였음(`agents/pmo/logs/2026-11-09_tailscale-access.md`:39) — **맥을 다시 켜면 Tailscale이 꺼져 있을 수 있음**(시험 전 확인).

---

## Q5 장면표 ↔ OpenCut 프로젝트 변환 규격 — **조건부로 됨** (보조 ③이 읽음, 핵심은 ✔)

**조건 셋:** ① 옛 판에 **프로젝트 들여오기가 없음**(importProject 등 0건 — 지난 연구 ✔) → IndexedDB와 OPFS에 써 넣는 들여오기 길을 우리가 더함(아이폰 · 맥 뽑기 브라우저 각각. Q2ⓐ의 '메모리만' 길이면 맥은 저장소가 필요 없음) ② **저장 판 31 꼴 그대로, 모든 시각을 정수 틱으로** ③ 캡컷 자원(목소리 · 음악 · 1025 글자 모양)은 파일과 값으로 바꿔야 함.

### 저장 꼴 (의사 꼴)

```ts
// IndexedDB "video-editor-projects" / 저장 칸 "projects" / keyPath "id"   (service.ts:60-72, indexeddb-adapter.ts:32,62)
ProjectRecord = {
  id: string                          // 필수, = metadata.id. 꼴 검사 없음 — UUID 권함 (DB·OPFS 폴더·주소 이름에 들어감)
  metadata: { id, name, thumbnail?: dataURL, duration?: 틱, createdAt: ISO, updatedAt: ISO }
                                      // 객체가 아니면 목록·열기에서 건너뜀 (service.ts:180-191, 249-260)
  scenes: [{ id, name, isMain: true /*하나*/, bookmarks: [], createdAt, updatedAt,
             tracks: { main: VideoTrack, overlay: (Text|Video|Graphic|Effect)Track[] /*[0]이 맨 위*/, audio: AudioTrack[] } }]
  currentSceneId: string              // isMain 장면 id. 뽑기·길이 셈이 '지금 장면' 기준 (renderer-manager.ts:153)
  settings: { fps: {numerator:30, denominator:1}, canvasSize: {width:1080, height:1920},
              canvasSizeMode: "preset", lastCustomCanvasSize: null, originalCanvasSize: null,
              background: {type:"color", color:"#000000"} }
  version: 31                         // migrations/index.ts:36. 읽는 쪽은 옮기기 실행기뿐
  timelineViewState?: { zoomLevel, scrollLeft, playheadTime }
}
VideoTrack = { id, name, type:"video", elements:(VideoElement|ImageElement)[], muted, hidden }
TextTrack  = { id, name, type:"text",  elements: TextElement[], hidden }
AudioTrack = { id, name, type:"audio", elements: AudioElement[], muted }          // timeline/types.ts:36-80
ElementBase = { id, name, startTime, duration, trimStart, trimEnd /*모두 정수 틱*/, sourceDuration?, animations?, params }
VideoElement = Base & { type:"video", mediaId, isSourceAudioEnabled? /*없으면 켬*/, hidden?, retime?:{rate, maintainPitch?} }
ImageElement = Base & { type:"image", mediaId, hidden? }
TextElement  = Base & { type:"text", hidden? }                                     // 글·모양은 모두 params
AudioElement = Base & { type:"audio", retime? } & ({sourceType:"upload", mediaId} | {sourceType:"library", sourceUrl})
// 소재 메타: IndexedDB "video-editor-media-<projectId>" / "media-metadata"
MediaAssetData = { id, name, type:"image"|"video"|"audio", size, lastModified, width?, height?, duration?(초), thumbnailUrl? }
// 소재 파일: OPFS "media-files-<projectId>/<소재 id>" (확장자 없음)
```

### 단위와 뜻

| 항목 | 뜻 · 단위 | 근거 |
|---|---|---|
| 틱 | **1초 = 120,000틱** ✔, 정수가 아니면 던짐 | `rust/crates/time/src/media_time.rs`:9 ✔ · `wasm/media-time.ts`:25-44 |
| 30fps 한 프레임 | **4,000틱** — 읽을 때 프레임에 맞추지 않음 → 변환기가 4,000의 배수로 | `frame_rate.rs`:82-107 · `compute-resize.ts`:81-90 ✔ |
| `trimStart` | **원본 앞에서 잘라 낸 원본 시간(틱).** 원본 시각 = `trimStart + 조각 안 시각 × rate` | ✔ `services/renderer/resolve.ts`:199-204 |
| `trimEnd` | **원본 끝에서 잘라 낸 원본 시간(틱)** — 끝 시각이 아님. 그리기 · 섞기에는 안 쓰고 장부용 | `compute-resize.ts`:149-157 |
| 불변식 | `trimStart + duration × rate + trimEnd = sourceDuration` | ✔ `compute-resize.ts`:83-84(주석) |
| `retime.rate` | 0.01~5, 영상 · 소리만. 타임라인 길이 = 원본 구간 ÷ rate | `retime/rate.ts`:1-11 |
| `transform.positionX/Y` | **캔버스 픽셀, 화면 가운데 0, +y는 아래** | `frame-descriptor.ts`:348-349 |
| `transform.scaleX/Y` = 1 | 영상 · 사진은 **화면 안에 맞춤(contain)**. 꽉 채우기(cover) = `max(소재비/화면비, 화면비/소재비)` — 캡컷 fillScale과 같은 셈 | `frame-descriptor.ts`:338-343 · `app/scripts/capcut_build.mjs`:140-141 |
| `fontSize` | 픽셀 = `fontSize × 캔버스 높이 ÷ 90` → 1920 높이에서 1 = 21.33px | `text/primitives.ts`:81-82 · `text/typography.ts`:9 |
| 글자 기준점 · 줄바꿈 | 위아래는 덩어리 가운데, 좌우는 `textAlign`. **줄바꿈은 `content`의 `\n`으로만** | `text/layout.ts`:73, 85-96 · `primitives.ts`:116 |
| `lineHeight` · `letterSpacing` | 배수 · 캔버스 px 그대로 | `primitives.ts`:85-87 |
| `color` | 문자열을 그대로 fillStyle로 → `#rrggbb` | `resolve.ts`:347-353 |
| `volume` | dB −60~+20, 0 = 그대로. 캡컷 배수 v → `20·log10(v)` | `timeline/audio-constants.ts`:1-2 |
| 영상 원래 소리 | `isSourceAudioEnabled` 없으면 켬, 빌더도 true → **기본으로 들림** | `audio-separation/index.ts`:14-20 · `element-utils.ts`:241 |
| 겹 순서 | 바탕 → main → overlay 끝 … overlay[0](맨 위) | `scene-builder.ts`:237-270 |

### 소재가 이어지는 길과 받아들이게 하는 조건

- `조각.mediaId` = `소재 메타.id` = OPFS 파일 이름. 열 때 메타와 파일이 **둘 다 있어야** 소재로 올라오고(`service.ts`:351), **짝 없는 조각은 오류 없이 조용히 빠짐**(그림 `scene-builder.ts`:63-66 · 소리 `audio.ts`:228-229). 종류는 메타의 `type`으로만 가름.
- `saveMediaAsset`은 **`fps` · `hasAudio`를 저장하지 않음**(`service.ts`:297-308).
- 주소의 id로 못 찾으면 **새 'Untitled Project'를 만들어 그쪽으로 옮겨 감**(`editor-provider.tsx`:52-62) — 꼴이 틀리면 조용히 빈 프로젝트가 뜰 수 있음.
- **옛 자료 옮기기가 어긋나 있음 ✔**(Q1 표 9번) → 낮은 판으로 넣어 옮겨지기를 기대하지 말고 31 꼴로. 판 30→31이 하는 일은 마스크 `"custom"`→`"freeform"` 뿐(`v30-to-v31.ts`:89-99).
- main 트랙 '맨 앞 조각 0초' · 같은 트랙 겹침 금지는 **고칠 때만** 강제(열 때 검사 안 함) → 변환기가 지킴. 끝 문구 두 줄(둘 다 0~끝)은 **트랙을 따로**. 명령이 하나라도 돌면 빈 overlay · audio 트랙은 지워짐(`core/index.ts`:49-67).
- **첫 소재가 크기 · fps를 바꾸는 것은 '타임라인이 빈 상태에서 명령으로 넣을 때'만**(`insert-element.ts`:55-111) — 이미 만든 프로젝트를 열 때는 안 일어남. 다만 휴대폰에서 60fps 소재를 새로 들이면 프로젝트가 60fps로 올라감(`media-manager.ts`:34-36) → 되받을 때 `settings`를 검사.
- 소리는 `upload + mediaId`로(`library`는 매번 주소를 fetch — `audio.ts`:233-241).

### 맞대는 표 — 우리 칸 → OpenCut (줄은 `app/scripts/capcut_build.mjs`)

| 우리 칸 | OpenCut 갈 곳 | 셈 | 잃는 것 |
|---|---|---|---|
| `project` (:51) | `metadata.name` | 그대로 | 캡컷 '같은 이름이면 멈춤'(:216) |
| `canvas`/`size`/`fps` (:53) | `settings.canvasSize` · `fps` | {1080,1920} · {30,1} | **값이 없을 때 캡컷 쪽 기본은 720×1280** — 그대로 따르면 안 됨 |
| `length` (:179-181) | 없음(조각 길이에 반영) | 변환기가 미리 자름 | 목표 길이 값(알려진 것) |
| 장면 `file` · `kind` (:142-148) | 소재 메타 + 파일, `type` | HEIC는 JPG 사본(:123-134) | — |
| 장면 `start`/`end` (:158-160) | `startTime`/`duration` | ×120,000, 4,000 배수로 | — |
| `src_start` (:176) | `trimStart` | ×120,000 | — |
| `src_end`/`dur` (:161) | `duration`, `trimEnd = sourceDuration − trimStart − duration×rate` | 셈 | — |
| `repeat_of` (:163-175) | 펼친 조각 여럿 | 펼침 | 반복이라는 뜻(알려진 것) |
| `n` · `role` | 조각 `name` + 맥의 대응표 | — | role의 뜻(새로) |
| `fit` · `zoom` (:152-153) | `transform.scaleX/Y` | fill이면 위 cover 셈 × zoom | 없음 |
| `pos[x,y]` (:154) | `transform.positionX/Y` | **[추측]** X = x·W/2, Y = −y·H/2 (캡컷은 위가 +, 화면 반쪽 단위) | 단위 확인 필요 |
| `label`/`ai` (:151, :196-201) | 표시 트랙의 글자 조각 | 변환기가 이어 붙임 | 장면과의 이음(알려진 것) |
| `captions[]` (:189-193) | 자막 트랙의 글자 조각 | 시간 없으면 글자 수 비례(끝 0.2초 여유) | **자동 줄바꿈(새로 — `\n`을 넣어야 함)** |
| 자막 모양 (:106-118) | `fontFamily · fontSize · color · transform` | Q8 | 테두리(알려진 것) · 캡컷 글꼴 · 효과 |
| `ending` (:202-203, :257) | 글자 조각 2개, 트랙 따로, 0~끝 | 문구와 `\n`을 직접 적음 | **'본보기 문구 · 줄바꿈 그대로'(새로)** |
| `render_index` 14000~ (:237, :249) | overlay 순서 | 끝 문구 · 표시 · 자막 순서 | — |
| (영상 원래 소리 — 칸 없음) | `params.muted` · `volume` | 끄려면 `muted: true` | **기본이 '켬'으로 바뀜(새로)** — 지금 캡컷에서 켰는지는 못 봄 |
| 목소리(캡컷 '텍스트 읽기' — `jobs.py`:443-450) | 소리 트랙 upload 조각 | 파일 + trim + rate | **캡컷 목소리 자체(새로)** |
| Fit 결과(`voice_fit.py`:210-286) | `trimStart = a`, `trimEnd = 파일 − b`, `rate = speed`, `duration = (b − a)/speed`, `startTime` 프레임에 맞춤 | 그대로 옮겨짐 | 끝에 닿은 조각 +1초 늘리기는 다시 짜야 함 |
| `options.voice`/`music` (`jobs.py`:101-107) | 없음 | 맥이 파일을 마련 | **캡컷 목소리 · 음악 목록(새로)** |
| `options.speed` (:104) | `retime.rate` | 그대로 | 0.1 단위 강제(`voice_fit.py`:223) — 휴대폰에서 0.01 단위로 깨질 수 있음 |

**알던 '잃는 다섯' 밖에 더 잃는 것(보조 ③):** 캡컷 목소리 · 음악 목록 · 자동 줄바꿈 · 1025의 글자 모양 전체 · 영상 원래 소리 기본값 · **회전 정보**(`capcut_build.mjs`:136이 회전을 버림, OpenCut은 풀린 프레임 크기로 맞춤 → 세로 영상의 fill 배율이 어긋날 수 있음) · 검사 규칙(원본보다 긴 구간 · 겹침 · 목소리/음악 검사 — `jobs.py`:776-808) · Fit의 '+1초 늘리기' · 속도 0.1 단위 · '조용히 빠짐'(mediaId · 글꼴) · 캡컷 µs → 틱 반올림(1프레임 안쪽) · 소재 메타의 fps · hasAudio.

### 의사 꼴 둘 (보조 ③ — 코드 아님)

**(a) 넓힌 장면표에 더할 칸**

```ts
ReelPlan {
  schema: "reel-plan/1"; rev: int                 // 고칠 때마다 +1 — 되받을 때 충돌 가름
  job; project; canvas: {width:1080, height:1920, fps:30}; length_target_sec; total_sec
  scenes:   [{ n, role, media: MediaKey, kind, start, end, src_start, label?, ai?, fit?, zoom?,
               pos_px?: [x, y] /*가운데 기준 px, +y 아래*/, repeat_of?, source_audio: "mute"|"keep" }]
  captions: [{ n, text /*\n 포함*/, start, end, voice_n? }]
  labels:   [{ text, style: "ai"|"before", start, end, from_scenes: [n] }]
  ending:   { on, lines: [string, string] /*줄바꿈까지*/ }
  style:    { caption|label_ai|label_before|ending_booking|ending_shop:
              { fontFamily, font_px, color, align, x_px, y_px, lineHeight, letterSpacing_px, bold?, bg?, stroke?:{color, width} } }
  voice:    { engine, name, speed, segments: [{ n, caption_n, media, file_sec, keep: [a, b], start, rate }] }
  music:    { name, media, file_sec, start, end, src_start, gain_db, license? }
  opencut:  { project_id, scene_id, track_ids: {...}, elements: { [elementId]: {kind, ref: n} }, exported_rev, imported_rev? }
  media:    { [MediaKey]: { media_id, file /*맥 경로*/, sha1, type, width?, height?, sec?, rotation? } }
}
```

**(b) 변환기가 내놓을 최소 `SerializedProject`** — 12초, 영상 1 · 사진 1 · 자막 2 · 목소리 1 · 음악 1. 전체는 보조 ③의 보고를 옮긴 것으로, 셈이 맞는지는 내가 다시 셈: 영상 `120000 + 960000 + 120000 = 1200000`(10초 원본) · 목소리 `36000 + 744000×1.5 + 48000 = 1200000` · 음악 `0 + 1440000 + 2160000 = 3600000` · 모든 시각이 4,000의 배수 ✔.

```jsonc
{ "id":"P1", "version":31, "currentSceneId":"SC1",
  "metadata":{"id":"P1","name":"sample_v1","duration":1440000,"createdAt":"2026-11-20T00:40:00.000Z","updatedAt":"2026-11-20T00:40:00.000Z"},
  "settings":{"fps":{"numerator":30,"denominator":1},"canvasSize":{"width":1080,"height":1920},"canvasSizeMode":"preset",
              "lastCustomCanvasSize":null,"originalCanvasSize":null,"background":{"type":"color","color":"#000000"}},
  "scenes":[{"id":"SC1","name":"Main scene","isMain":true,"bookmarks":[],"createdAt":"…","updatedAt":"…",
    "tracks":{
      "overlay":[{"id":"T-CAP","name":"자막","type":"text","hidden":false,"elements":[
        {"id":"E-C1","type":"text","name":"C1","startTime":0,"duration":660000,"trimStart":0,"trimEnd":0,
         "params":{"content":"첫 자막","fontFamily":"Noto Sans KR","fontSize":3,"color":"#ffffff","textAlign":"center",
                   "fontWeight":"bold","fontStyle":"normal","textDecoration":"none","letterSpacing":0,"lineHeight":1.2,
                   "background.enabled":false,"transform.positionX":0,"transform.positionY":-365,
                   "transform.scaleX":1,"transform.scaleY":1,"transform.rotate":0,"opacity":1,"blendMode":"normal"}},
        {"id":"E-C2","type":"text","name":"C2","startTime":660000,"duration":780000,"trimStart":0,"trimEnd":0,
         "params":{ /* E-C1과 같고 */ "content":"둘째 자막\n두 줄"}}]}],
      "main":{"id":"T-MAIN","name":"Main Track","type":"video","muted":false,"hidden":false,"elements":[
        {"id":"E-S1","type":"video","name":"S1·after","mediaId":"M-VID","startTime":0,"duration":960000,
         "trimStart":120000,"trimEnd":120000,"sourceDuration":1200000,"isSourceAudioEnabled":true,"hidden":false,
         "params":{"transform.positionX":0,"transform.positionY":0,"transform.scaleX":1,"transform.scaleY":1,
                   "transform.rotate":0,"opacity":1,"blendMode":"normal","volume":0,"muted":true}},
        {"id":"E-S2","type":"image","name":"S2·ai_face","mediaId":"M-IMG","startTime":960000,"duration":480000,
         "trimStart":0,"trimEnd":0,"hidden":false,
         "params":{"transform.scaleX":1.3333,"transform.scaleY":1.3333, /* 나머지 transform 기본 */ "opacity":1,"blendMode":"normal"}}]},
      "audio":[
        {"id":"T-VOICE","name":"목소리","type":"audio","muted":false,"elements":[
          {"id":"E-V1","type":"audio","sourceType":"upload","mediaId":"M-VOICE","name":"V1","startTime":24000,"duration":744000,
           "trimStart":36000,"trimEnd":48000,"sourceDuration":1200000,"retime":{"rate":1.5,"maintainPitch":true},
           "params":{"volume":0,"muted":false}}]},
        {"id":"T-MUSIC","name":"음악","type":"audio","muted":false,"elements":[
          {"id":"E-M1","type":"audio","sourceType":"upload","mediaId":"M-MUSIC","name":"music","startTime":0,"duration":1440000,
           "trimStart":0,"trimEnd":2160000,"sourceDuration":3600000,"params":{"volume":-12,"muted":false}}]}]}}]}
// 소재 메타(DB "video-editor-media-P1"): M-VID video 1080×1920 10.0초 · M-IMG image 1080×1440 · M-VOICE audio 10.0초 · M-MUSIC audio 30.0초
// 파일: OPFS "media-files-P1/" 아래 M-VID · M-IMG · M-VOICE · M-MUSIC (Q2ⓐ '메모리만' 길이면 File 객체로 바로)
```

- 자막 `positionY −365`(= −0.38 × 960) · `fontSize 3`(= 64px)은 **[추측] 시안 값** — 캡컷 단위와의 대응은 나란히 재 봐야 앎(Q8).
- `maintainPitch: true`는 `soundtouchjs`(LGPL-2.1)를 탐 — Q7.

**돌려 봐야만 아는 것:** 들여온 기록이 목록에 뜨고 열리는지 · 썸네일 자동 생성 · 휴대폰에서 조각을 나누면 id가 새로 생기는지(되받기 대응표가 여기에 달림) · 속성 칸에서 `fontSize`를 소수로 넣을 수 있는지 · 캡컷 `pos`/크기 → px 대응.

---

## Q6 포크에서 덜어 낼 것 · 고칠 것 (보조 ① · ⑥)

### 덜어 낼 것

| 무엇 | 파일 | 편집기 쪽에서 import가 끊기는 곳 | 크기 |
|---|---|---|---|
| 로그인(better-auth) · DB(drizzle) · Redis(upstash) | `auth/` · `db/` · `drizzle.config.ts` · `app/api/auth/` | 없음 | 작음 |
| 블로그(Marble) | `blog/` · `app/blog/` · `app/rss.xml/` · `app/sitemap.ts` | 없음 | 작음 |
| changelog | `changelog/` · `app/changelog/` · `content-collections.ts` · `next.config.ts`:3 | `app/editor/[project_id]/page.tsx`:25, 53 · `app/projects/page.tsx`:69 · `app/layout.tsx`:5 | 작음 |
| 편집기 밖 쪽 | `app/page.tsx`(랜딩) · `brand` · `contributors` · `privacy` · `terms` · `roadmap` · `sponsors` · `components/landing/` · `header.tsx` · `footer.tsx` 등 | `mobile-gate.tsx`:63(`/roadmap` 링크) · `site/brand.ts` · `site/social.ts`를 `editor-header.tsx`:20-21 · `onboarding.tsx`:6이 씀 | 중간(파일 많음, 단순) |
| 소리 찾기(Freesound) | `sounds/` · `app/api/sounds/` | `components/editor/panels/assets/index.tsx`:9, 19 · `assets-panel-store.tsx`:20 · `services/storage/service.ts`:19, 56, 74-78, 469-557 | 중간 |
| 자동 자막(huggingface) | `services/transcription/` 등 | `subtitles/components/assets-view.tsx`:13-23, 135, 315(생성 단추) · `core/index.ts`:15, 47. **자막 탭의 .srt · .ass 들이기는 남김** | 중간 |
| 분석(databuddy) · react-scan | `app/layout.tsx`:32-40, 50-61 | 없음 | 작음 |
| 봇 가림(botid) | `next.config.ts`:2, 54 · `app/layout.tsx`:8, 16-21, 31 | 없음 | 작음 |
| 바깥 글꼴 부르기 | `fonts/google-fonts.ts`:4, 64-68 | `project-manager.ts`:27, 159 · `font-picker.tsx`:67 · `editor-provider.tsx`:12, 48 | 중간(아래 한글 글꼴) |
| 피드백 | `feedback/` · `app/api/feedback/` | `editor-header.tsx`:18, 38 | 작음 |
| 가이드 플랫폼 아이콘(바깥 그림) | `guides/definitions/platforms.tsx`:14(`cdn.brandfetch.io`) | — | 작음 |
| Cloudflare 배포 | `open-next.config.ts` · `wrangler.jsonc` · `package.json`:10-11, 25 | 없음 | 작음 |
| (덤) `soundtouchjs` | `retime/audio-stretch.ts` 한 곳 — `maintainPitch` 켜고 속도 ≠ 1일 때만(`retime/rate.ts`:17-24) | 체크박스 `speed/components/speed-tab.tsx`:148 | 작음 — 빼면 '속도 바꿀 때 높낮이 유지' 하나만 잃음(Q7) |

- 스티커는 바깥 아이콘 API를 **부르지 않음**(`stickers/providers/logos.ts` 빈 결과 · `flags.ts` 로컬) — 덜어 낼 것 없음, flags 경로에 basePath만.

### 고칠 것

| 무엇 | 근거 | 고침 | 크기 |
|---|---|---|---|
| 휴대폰 문턱 | `mobile-gate.tsx`:21 · :63 | 끄거나 문구를 한국어로, 링크 지움 | 작음 |
| 환경 값 검사 | `env/web.ts`:3-30 · `app/layout.tsx`:9, 55 | 파일과 참조를 지움 | 작음 |
| 저장 어댑터를 서버로 | `services/storage/service.ts`:68-78, 93-102 · 틀 `services/storage/types.ts`:9-15 | 같은 틀의 HTTP 어댑터로 바꿔 끼움. 소재는 Q3의 '서버 → 메모리' 길 | 중간 |
| **자막 테두리** | `text/primitives.ts`:215-241 `strokeMeasuredTextLayout`은 있으나 글자 그리기 `services/renderer/nodes/text-node.ts`:51-58은 fill만 | `params/registry.ts`에 `stroke.*` 칸 + `text-node.ts`에서 fill 앞에 stroke. **본보기:** `Irbsjel/OpenCut` 커밋 `51a5cc8`(2026-11-10, 옛 판 코드를 통째로 다시 넣은 300파일 커밋 안)이 `text-node.ts`에 테두리 약 30줄 — `scaledStroke = strokeWidth × (scaledFontSize / 48) × 2`, 배경 상자가 꺼져 있을 때만 `strokeMeasuredTextLayout`을 부른 뒤 `drawMeasuredTextLayout`. 그 포크는 registry에 칸을 안 더하고 자막 스타일 쪽에서만 넣음(보조 ⑥) | **작음** — 미리보기와 뽑기가 같은 노드라 한 곳 |
| 화면 크기 · fps 못 박기 | `insert-element.ts`:80-111 · `media-manager.ts`:34-36 | 릴스용 고정 설정을 두고 두 자리를 막음 + 뽑기 옵션 fps 30 | 작음 |
| 옛 자료 옮기기 호출 | ✔ Q1 표 9번 | 객체 인자로(5곳) 또는 뺌 | 작음 |
| 화면 없는 뽑기 들머리 | `core/index.ts`:71-76 | 렌더 전용 쪽 또는 `window.__editor` (Q2ⓐ) | 작음~중간 |
| 뽑기 코덱 지키기 | `scene-exporter.ts`:102-128 | Opus로 바뀌면 오류 · 비트레이트 숫자 (Q2ⓑ) | 작음 |
| 소재를 서버에서 받기 | Q3 고칠 곳 1~3 | OPFS 대신 서버 → 메모리 | 작음~중간 |
| 들여오기 | 없음(Q5) | 맥 JSON + 소재를 받는 길 | 중간 |
| 고친 뒤 줄바꿈 | `subtitles/build-subtitle-text-element.ts`:45(안쪽 함수) | 꺼내서 글을 고칠 때 다시 부름(지난 연구) | 작음 |
| 화면 글 한국어 | 옮김 틀(i18n) **없음** — `next-intl` · `i18next` · `useTranslations` · `react-intl` · `lingui` 0건 | 문자열을 직접 바꿈 | 중간 |

### 한글 글꼴

- **시스템 글꼴 아홉**(`fonts/system-fonts.ts`:1-11): Arial · Helvetica · Times New Roman · Courier New · Verdana · Georgia · monospace · sans-serif · serif — **한글 글꼴 없음.** 기본 글꼴 Arial(`timeline/defaults.ts`:41) → 기기마다 다른 한글 대체 글꼴(지난 연구).
- **구글 글꼴 목록**은 `public/fonts/font-atlas.json`(약 1,920개). **한국어 글꼴이 있음:** Noto Sans KR · Noto Serif KR · Nanum Gothic · Nanum Myeongjo · Nanum Pen Script · Nanum Brush Script · Black Han Sans · Do Hyeon · Jua · Gothic A1 · IBM Plex Sans KR · Gowun Dodum · Gowun Batang 등. **DSDSRefinedLetterM(지금 릴스 글꼴)은 목록에 없음** ✔(`public/fonts/font-atlas.json`에서 `DSDS|Refined` 0건).
- 요청 주소: `google-fonts.ts`:64 `…?family=<이름>:wght@400;700&display=swap` — `subset=` · `text=`가 없어 CSS에서 한글이 빠지지는 않음. 다만 :75 `document.fonts.load("… 16px family")`에 글자 인자가 없어 **한글 조각 파일이 그리기 전에 안 받아질 수 있음 [추측]** — 첫 프레임 글꼴이 다를 위험.
- **인터넷이 필요:** 구글 글꼴은 아이폰 미리보기 · 맥 뽑기 모두 그때그때 받음. 못 받으면 `sans-serif`로 그림(조용히).
- **글꼴 파일 묶어 넣기:** `FontFace` · `@font-face` 0건(보조 ① 다시 grep). 넣을 자리: `loadFullFont`(`google-fonts.ts`:55-79)에서 `new FontFace(이름, "url(<basePath>/fonts/x.woff2)")` + `document.fonts.add` → 로컬 글꼴 목록을 `SYSTEM_FONTS`처럼 두고 `loadFonts`(:81-88)에서 가름 → `font-picker.tsx`:50, 67에 보임. **작음.** 글꼴 파일의 사용 조건은 따로(Q8).

---

## Q7 이용 조건 (조항과 흔한 해석만 — 법률 판단 아님) (보조 ⑥이 원문으로)

| 무엇 | 조항 · 원문 | 우리가 할 일 |
|---|---|---|
| **MIT(옛 판)** | `LICENSE`: "Copyright 2025-2026 OpenCut … shall be included in all copies or substantial portions of the Software." 묶어 줄인 JS에 대한 공식 해석은 못 찾음 | 흔한 관행: `THIRD_PARTY_NOTICES` 파일 · 웹앱의 `/licenses` 쪽 · 번들 머리 주석(`*.js.LICENSE.txt`) 가운데 하나에 저작권 줄 + 허가문 전문 |
| **'OpenCut' 이름 · 로고** | `app/brand/page.tsx`:176-199 = opencut.app/brand (2026-11-20): "That license does not cover the name or logo. You can say you use OpenCut, that your project integrates with OpenCut, or that it was built on top of OpenCut. You cannot name your product OpenCut, imply we made or endorse your product, or use the marks commercially without asking first." 금지: "Using OpenCut in the name of your product, service, or domain." · "Modifying the marks." 등록 상표라는 말은 없음, USPTO · EUIPO 등록은 못 찾음(공식 DB 직접 조회 못 함) | 화면에 이름 · 로고를 쓰지 않음(기획안과 같음). 고지에 "OpenCut(MIT) 위에 만듦"은 됨 |
| **`mediabunny` 1.41.0 (MPL-2.0)** | 1.10 Modifications = **파일 단위**. 3.2 "If You distribute Covered Software in Executable Form … You must inform recipients … how they can obtain a copy of such Source Code Form". 3.3 더 큰 저작물은 우리 조건으로. MPL FAQ: 브라우저로 보내는 JS는 "does count as 'distributed'", 줄인 JS는 Source Code가 아님, "The MPL only creates obligations for you if you want to distribute the software outside your organization." | 그대로 쓰면: 받는 이에게 MPL 소스 위치를 알림(주석의 링크로도 됨). **고쳐 쓰면:** 고친 mediabunny 파일을 MPL로 내놓음. 우리 파일은 자유 |
| **`soundtouchjs` 0.3.0 (LGPL-2.1)** | `bun.lock`:1919. npm license "LGPL-2.1". 쓰는 곳은 `retime/audio-stretch.ts` 한 곳(높낮이 유지 속도). LGPL-2.1 §6: 결합 저작물을 배포하면 사용자가 고쳐 쓸 수 있게 하고 a)~e) 가운데 하나(다시 링크할 소스 · 공유 라이브러리 꼴 등). 웹 번들에 대한 권위 있는 해석은 못 찾음. **덧붙임:** 그 저장소는 2026-05에 MPL-2.0으로 옮김("we have now moved off of the LGPL to the MPL-2.0"), 새 꾸러미 `@soundtouchjs/core@2.1.1`(2026-08-03, MPL-2.0, API 다름) | 셋 가운데 고름(ARCH): ① 뺌(높낮이 유지 하나 잃음, 작음 — 우리 1.5배 목소리는 맥이 미리 늘려 WAV로 줄 수도 있음 [추측]) ② MPL-2.0 새 꾸러미로 바꿈(API가 달라 중간) ③ 따로 청크로 두고 고지 |
| **가게 기기에만 내줄 때** | MPL FAQ: 조직 안이면 "Nothing." · GNU FAQ: "Is making and using multiple copies within one organization or company 'distribution'? No … However, when the organization transfers copies to other organizations or individuals, that is distribution." · MIT는 '배포'를 정의하지 않음 | **핵심 물음은 '웹앱을 운영하는 쪽(한알)과 쓰는 가게가 같은 조직인가'** — 판단하지 않음. 같은 조직이 아니면 위 의무가 걸린다고 보고 고지 화면 · 소스 위치를 두는 편이 단순 [추측] |
| 다른 직접 의존(61개) | GPL · AGPL · 비상업 조건 없음. Apache-2.0 4 · ISC · BSD-3 · Unlicense · MPL · LGPL. **`botid@1.5.11`은 npm license 칸이 비어 있고 꾸러미에 LICENSE 파일도 없음**(README만 "MIT - See LICENSE") | botid는 덜어 냄(Q6) |

- 확인 못 함: 간접 의존 전체 · `react-icons` 묶음별 조건 · Next 빌드가 라이선스 주석을 남기는지.

---

## Q8 자막 모양 값 — **일부만 있음(캡컷 단위), 나머지는 '맥에서 볼 것'**

✔ 내가 제품 저장소에서 직접 봄(`data/`는 열지 않음).

| 무엇 | 저장소에 있는 값 | 근거 |
|---|---|---|
| 자막 바탕 | 1025의 "예약은…" 글자 조각을 복제한 뒤 덮어씀 | `app/scripts/capcut_build.mjs`:107-108 |
| 자막 크기 | 재료 `font_size = 10`, `styles[0].size = 10` (캡컷 단위) | :109, :111 |
| 자막 테두리 | `border_color '#000000'`, `border_width 0.08`, `strokes = [{width 0.08, 검정}]` | :109, :112 |
| 자막 색 | 흰색 `[1,1,1]` | :113 |
| 자막 자리 · 배율 | `clip.transform = {x:0, y:0.38}`, `clip.scale = 1.1` | :116 |
| 자막 글꼴 | 코드에 없음 — 본보기에서 따라옴. 기록상 **DSDSRefinedLetterM**, 파일은 맥 `~/Movies/CapCut/User Data/Cache/effect/` 안 | `agents/capcut/knowhow.md`:23, 68 · `agents/pln/specs/2026-11-09_reel-automation.md`:144 |
| **고정 글자 넷**("○○ 전 머리" · "얼굴 : AI 합성" · "예약은 네이버에서 검색하세요" · "미첼헤어폼") | **값 없음** — 1025의 조각 · 재료를 통째로 복제(:98-103). 기록에 있는 것은 '노란 "미첼헤어폼", 글꼴 DSDSRefinedLetterM, 검은 테두리'뿐 | `agents/capcut/logs/2026-11-08_cloud-reels-analysis.md`:21 |
| 캡컷 화면 크기 | 캡컷 프로젝트는 **720×1280**(1025 · 1101 · 1103), 내보내기 규격은 1080×1920 | 같은 글 :12 · `agents/capcut/knowhow.md`:68 · `app/webapp/jobs.py`:69 |

- **뜻:** 캡컷 값 10 · 0.08 · 0.38 · 1.1이 720×1280 화면에서 몇 px인지는 코드에 없고(캡컷 단위의 정의를 못 찾음), 고정 글자 넷의 크기 · 색 · 자리는 값이 아예 없습니다. → **맥에서 볼 것:** ① 1025 프로젝트의 `draft_info.json`(또는 클라우드 캐시 `draft_content.json`)에서 글자 재료 넷의 `font_size` · `styles` · `border_*` · `clip.transform` · `clip.scale` · 글꼴 경로를 읽어 적음(읽기만) ② 승인된 릴스 한 편에서 프레임 한 장을 뽑아 자막 글자 높이 · 테두리 두께 · 세로 자리를 px로 잼(손님 얼굴이 없는 프레임으로 — 개인 정보).
- **글꼴 DSDSRefinedLetterM의 사용 조건은 못 찾음** — 캡컷 안의 글꼴 파일을 캡컷 밖(OpenCut · 웹앱)에서 쓸 수 있는지는 그 글꼴의 조건에 달림(지난 연구도 '확인 못 함'). 안 되면 구글의 한국어 글꼴(OFL) 가운데 하나로 바꾸고 나란히 봐야 함.

---

## Q2ⓒⓓ 맥 Chrome 화면 없는 모드의 H.264 · AAC 인코딩 · 걸리는 시간 — **조건부(쓸 브라우저를 골라야 함) · 시간은 모름**

(보조 ④가 Chromium 소스 — GitHub 미러 `chromium/chromium` main 12554853(2026-11-20) — 와 공식 문서로)

| 물음 | 답 | 근거 |
|---|---|---|
| `--headless`는 무엇 | **이제 '새 headless'(보통 Chrome과 같은 바이너리).** 옛 모드는 따로 된 `chrome-headless-shell` | developer.chrome.com "Removing --headless=old from Chrome"(2024-10-23): "Running Chrome with `--headless` or `--headless=new` runs the new Headless mode" |
| H.264 인코딩 | **됨 — Chrome 브랜드 · Chrome for Testing(CfT) 빌드에서.** `no-preference`면 하드웨어(맥은 VideoToolbox)를 먼저, 못 만들면 **OpenH264 소프트웨어로 대체**. OpenH264는 `proprietary_codecs`일 때만 들어감 | `third_party/blink/renderer/modules/webcodecs/video_encoder.cc`(`CreateOpenH264VideoEncoder`) · `media/media_options.gni`("Used for software based encoding of H264 content", `!proprietary_codecs`면 false) · `build/config/features.gni`(`proprietary_codecs = is_chrome_branded … || is_chrome_for_testing_branded`) |
| AAC 인코딩 | **됨 — 맥 · 윈도 Chrome에서(리눅스는 안 됨).** 맥은 GPU 프로세스 쪽 미디어 서비스의 `AudioToolboxAudioEncoder`. `isConfigSupported`는 채널 {1, 2, 6} · 표본율 {44100, 48000}만 받음 | `media/mojo/clients/mojo_audio_encoder.cc`("We only spin up platform AudioEncoders for AAC for now.") · `media/base/media_switches.cc`(`kPlatformAudioEncoder` — WIN · MAC · ANDROID) · `media/mojo/services/gpu_mojo_media_client_mac.cc` · MDN Codec selection(2026-08-12): "not supported … in any browser on desktop Linux" |
| 오픈소스 Chromium | **안 됨**(H.264 · AAC 모두) | Dale Curtis, chromium media-dev(2023-08-17): "Yes, to enable H.264 or AAC for encoding or decoding those flags must be set." |
| CfT | **독점 코덱 있음** | Chromium 커밋 a242368(2023-09-14) "Enable proprietary codecs for Google Chrome for Testing" |
| Puppeteer | 기본 `launch()` = CfT를 `--headless=new`로. `headless: 'shell'`이면 chrome-headless-shell | puppeteer-core v25.18.1 `ChromeLauncher.ts` · pptr.dev/guides/headless-modes |
| Playwright | v1.57부터 CfT 빌드. **headless 기본은 chrome-headless-shell**, 그리고 기본 인자에 `--enable-unsafe-swiftshader` | playwright.dev 릴리스 노트("headless mode uses `chrome-headless-shell`") · `chromiumSwitches.ts` |
| GPU(합성 WebGL/WebGPU) | **새 headless는 맥에서 보통 드라이버(ANGLE/Metal)를 고름 — SwiftShader 강제는 리눅스에서만.** chrome-headless-shell은 모든 곳에서 소프트웨어가 기본이고, **2026-10-27 커밋으로 M158부터는 `--enable-unsafe-swiftshader`가 없으면 WebGL · WebGPU가 꺼짐** | `chrome/browser/headless/headless_mode_init.cc`(`#if BUILDFLAG(IS_LINUX)` 안에서만) · `headless/lib/headless_content_main_delegate.cc`("Use software rendering by default") · 커밋 b60b30bf32 "Disable SwiftShader by default in headless." |
| `--enable-gpu` | "Headless uses swiftshader by default … This flag just turns forcing of swiftshader off" | `headless_mode_switches.h` |
| 하드웨어 인코더와 GPU | GPU가 꺼지면 VideoToolbox 인코더를 못 만들고 OpenH264로 갈 것 **[추측 — 코드 흐름]** | — |
| 걸리는 시간(ⓓ) | **1080×1920 · 30fps를 화면 없이 WebCodecs로 뽑은 공개 수치는 못 찾음.** 간접 자료는 [전해 들음]뿐(M1 `h264_videotoolbox`가 실시간의 6.74배 · 소프트웨어 2.61배 — ffmpeg 메일링 리스트, 2018 MacBook Pro에서 1080p 약 200fps — 블로그). Remotion: "in headless mode, Chromium disables the GPU, leading to a significant slowdown" | remotion.dev/docs/gpu |

- **우리에게 주는 뜻:**
  - **쓸 브라우저: Puppeteer 기본(CfT, 새 headless) 또는 맥에 깔린 Google Chrome(`channel: 'chrome'`).** **chrome-headless-shell은 피함**(Playwright 기본 · Puppeteer `'shell'`) — 합성이 CPU로 돌거나(≤M157) WebGL이 아예 꺼짐(M158~). 오픈소스 Chromium은 안 됨.
  - 플래그: `--enable-gpu`(필요하면 `--use-angle=metal`, WebGPU면 `--enable-unsafe-webgpu`) · `--autoplay-policy=no-user-gesture-required`.
  - AAC의 `isConfigSupported`는 숫자만 보는 검사라 참이어도 실제 인코딩은 따로 봐야 함 **[추측]**. 안 되면 옛 판은 **말없이 Opus**(Q2ⓑ) — 막을 길은 `@mediabunny/aac-encoder`(FFmpeg AAC를 WASM으로, mediabunny.dev) 또는 오류로 멈추기.
  - 병목은 인코딩보다 합성(WebGL · `getImageData`)과 4K 풀기일 공산이 큼 **[추측]** — 맥에서 재야 함.
  - Puppeteer · Playwright는 headless에서 `--mute-audio`를 붙임 — AudioEncoder · OfflineAudioContext와는 무관할 것 **[추측]**. 백그라운드 멈춤을 막는 인자(`--disable-background-timer-throttling` 등)는 둘 다 기본으로 넣음(소스).
  - 참고: OpenCut 본가 PR #757(2026-04-02, 열림) "add runtime audio encoder capability negotiation for mp4 exports" — 192kbps · 44.1kHz 고정 AAC 설정이 거부되는 환경을 다룸.

---

## 9. 돌려 봐야만 아는 것 — 오늘(11-20) 저녁 맥북 시험 순서

(덧붙임 1에 따라 씀. 이 PC에서는 아무것도 돌리지 않았습니다. 아래 명령은 **맥에서 쓸 것을 적기만** 한 것이고, 나도 돌려 보지 않아 **명령 줄의 꼴이 틀릴 수 있습니다** — 막히면 `--help`를 보고 고쳐 쓰고, 고친 꼴을 기록 칸에 적어 주세요. 에이전트 세션이 돌려도, 한알께서 직접 돌리셔도 따라 할 수 있게 썼습니다.)

### 9-0. 지킬 것 (시험 내내)

- **제품 저장소(`~/…/mitchell-studio`)와 `data/`는 건드리지 않습니다.** 옛 판은 따로 된 시험 폴더 `~/oc-test/`에 받습니다. 웹앱 · CapCut 프로젝트 · 1025는 읽기만.
- **손님 소재는 쓰지 않습니다.** 가짜 소재(아래 P4)만. 아이폰에서 찍어야 하면 벽 · 책상처럼 사람이 없는 것.
- 설치(Bun · 꾸러미)와 Tailscale 관리 콘솔 설정(HTTPS 켜기 — 맥 이름이 공개 장부에 실림)은 **한알께서 허락하신 범위에서만**. 맥에 늘 켜 두는 프로그램(LaunchAgent)은 만들지 않습니다.
- 시험이 끝나면 되돌림: `serve` 끄기(T1 끝), 띄운 개발 서버 끄기(Ctrl+C).

### 9-1. 한 저녁에 다 못 하면 — 이 차례로 (갈림이 큰 것부터)

| 차례 | 시험 | 왜 먼저 | 걸리는 시간 [추측] |
|---|---|---|---|
| 1 | **T0 맥 Chrome 능력 재기**(화면 있는 · 없는 Chrome에서 H.264 · AAC · GPU) | 안 되면 '맥이 OpenCut 엔진으로 뽑기'(갈림길 ㄱ의 B 첫째 후보) 전체가 무너짐. 설치도 필요 없음 | 15분 |
| 2 | **T-i 아이폰 능력 재기**(iOS 판 · 잠금 모드 · WebCodecs · AudioDecoder · createWritable) | 오1(휴대폰 화면 꼴)과 'iOS 몇 이상'을 가름. 설치 없음(케이블 + 맥 Safari) | 15분 |
| 3 | **T2 옛 판을 띄워 맥에서 한 편 뽑기**(화면 있는 Chrome → 화면 없는 Chrome) + 빌드가 통과하는지 | 실제 파일의 코덱 · 규격 · 시간. Bun 설치 필요 | 60~90분 |
| 4 | **T1 https로 띄워 아이폰에서 열어 보기** | https 길(serve)과 아이폰에서 엔진이 도는지. T2의 서버를 그대로 씀 | 45분 |
| 5 | **T3-반 저장 꼴 확인**(T2에서 만든 프로젝트의 JSON을 꺼내 Q5와 맞댐) | 변환기를 짜기 전에 규격을 실물로 확인. 코드 없음 | 20분 |
| 6 | **T8 자막 모양 값 읽기**(1025를 읽기만) | Q8 — 나란히 보기(T4)의 바탕 값 | 15분 |
| — | T3 전체 · T4 | **오늘은 못 함** — 변환 스크립트 둘과 들여오기 길(Q5), 목소리 파일이 있어야 함 | — |

### 9-2. 준비물 (P)

**P1 어느 맥인가** — 이 맥북이 웹앱(8765)이 도는 그 맥인지 적습니다. 아니면 T1의 https는 이 맥북에 Tailscale을 따로 띄워야 합니다.

**P2 판 확인 (터미널)**

```zsh
sw_vers; uname -m                                   # macOS 판 · arm64인지
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --version   # 없으면 Chrome 설치 필요(한알 허락)
node -v; bun -v; git --version                      # bun이 없으면 P3
/opt/homebrew/bin/ffmpeg -version | head -1; /opt/homebrew/bin/ffprobe -version | head -1
/usr/bin/python3 --version                          # 3.9.x로 기록돼 있음(.wasm MIME 표 확인용)
df -h ~                                             # 빈 자리 5GB 이상 [추측]
```

**P3 Bun 1.2.18 (T2 · T1에만 — 옛 판이 이 판으로 못 박혀 있음, `package.json`:3)**

```zsh
curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.18"   # 공식 설치 꼴(판 지정) — 설치 전 허락
exec zsh; bun -v                                             # 1.2.18
```

**P4 옛 판 받기 (시험 폴더 — 제품 저장소 밖)**

```zsh
mkdir -p ~/oc-test && cd ~/oc-test
git clone --depth 1 https://github.com/opencut-app/opencut-classic.git
cd opencut-classic && git rev-parse HEAD     # cf5e79e919144200294fb9fed22a222592a0aeea 이어야 함(보관된 저장소라 바뀌지 않음)
```

**P5 가짜 소재 (손님 소재 없이 — ffmpeg에 글자 그리기가 없어도 되는 꼴, `agents/pmo/knowhow.md`:28)**

```zsh
mkdir -p ~/oc-test/media && cd ~/oc-test/media
FF=/opt/homebrew/bin/ffmpeg
# ① 세로 1080×1920 · 30fps · 10초 · H.264 + AAC (기본 소재)
$FF -f lavfi -i testsrc2=size=1080x1920:rate=30 -f lavfi -i sine=frequency=440:sample_rate=48000 -t 10 \
    -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest v1080_30.mp4
# ② 60fps 소재 (fps가 60으로 올라가는지 · 레벨 문제 보기)
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

**P6 Tailscale (T1에만)**

```zsh
cd <제품 저장소 뿌리>                              # 읽기만 — 스크립트만 씀
zsh app/webapp/tailscale/ts.sh status             # 'stopped' · 소켓 없음이면 아래 줄을 다른 터미널 창에서
zsh app/webapp/tailscale/start_tailscaled.sh      # 사용자 공간 모드로 켜짐(그 창은 열어 둠)
zsh app/webapp/tailscale/ts.sh status             # 이 맥의 이름 · tailnet 이름을 봄
zsh app/webapp/tailscale/ts.sh funnel status      # funnel이 꺼져 있어야 함(인터넷 공개 아님)
```

- **https를 켜기 전에 꼭:** 이 맥의 이름에 가게 · 사람 이름이 들어 있으면 관리 콘솔에서 이름을 바꿈 — **켜는 순간 맥 이름과 tailnet 이름이 공개 장부(CT)에 영구히 실림**(kb/1153).
- 관리 콘솔(login.tailscale.com) → DNS → MagicDNS 켜기 · HTTPS Certificates 'Enable HTTPS'(한알 계정 — 한알께서 하심).
- 아이폰: Tailscale 앱이 같은 tailnet에 '연결됨'.

**P7 아이폰 준비 (T-i · T1)**

- 설정 › 일반 › 정보 › **iOS 버전 · 모델 이름** 적기.
- 설정 › 개인정보 보호 및 보안 › **잠금 모드** 켜짐/꺼짐 적기(켜져 있으면 WebCodecs 영상이 꺼짐).
- 설정 › Safari › 고급 › **웹 속성(Web Inspector) 켜기.** 케이블로 맥에 잇고, 맥 Safari 설정 › 고급 › '웹 개발자용 기능 보기' 켜기.

### 9-3. 시험마다

#### T0 — 맥 Chrome 능력 재기 (설치 없음 · 이 PC 시험 아님)

1. **화면 있는 Chrome:** 아무 https 쪽(예: `https://example.com`)을 열고 개발자 도구(⌥⌘J) 콘솔에 한 줄씩:

```js
await VideoEncoder.isConfigSupported({codec:'avc1.640028', width:1080, height:1920, framerate:30, bitrate:6e6})
await VideoEncoder.isConfigSupported({codec:'avc1.640028', width:1080, height:1920, framerate:30, bitrate:6e6, hardwareAcceleration:'prefer-hardware'})
await VideoEncoder.isConfigSupported({codec:'avc1.640028', width:1080, height:1920, framerate:30, bitrate:6e6, hardwareAcceleration:'prefer-software'})
await AudioEncoder.isConfigSupported({codec:'mp4a.40.2', sampleRate:44100, numberOfChannels:2, bitrate:192000})
(()=>{const g=document.createElement('canvas').getContext('webgl2'); const e=g&&g.getExtension('WEBGL_debug_renderer_info'); return g? g.getParameter(e.UNMASKED_RENDERER_WEBGL):'webgl2 없음'})()
!!(navigator.gpu && await navigator.gpu.requestAdapter())
```

   - `chrome://gpu`를 열어 'Video Encode' · 'WebGL' · 'WebGPU' 줄을 적음.
2. **화면 없는 Chrome(새 headless):** 터미널에서

```zsh
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --enable-gpu --print-to-pdf=$HOME/oc-test/gpu-headless.pdf chrome://gpu      # GPU 상태를 PDF로
"$CH" --headless=new --enable-gpu --autoplay-policy=no-user-gesture-required \
      --remote-debugging-port=9222 --user-data-dir=$HOME/oc-test/chrome-headless https://example.com
```

   - 그 창은 둔 채, 화면 있는 Chrome에서 `chrome://inspect` → 'Configure…'에 `localhost:9222` → 뜬 쪽의 'inspect' → 콘솔에서 **1번의 여섯 줄을 똑같이** 돌림.
   - WebGL 줄에 'SwiftShader'가 나오거나 webgl2가 없으면: 같은 명령에 `--use-angle=metal`을 더해 다시. WebGPU가 거짓이면 `--enable-unsafe-webgpu`를 더해 다시.
3. 끝나면 headless 창을 Ctrl+C.

| 기록 칸 | 화면 있는 Chrome | 새 headless(`--enable-gpu`) | (+`--use-angle=metal`) |
|---|---|---|---|
| Chrome 판 | | | |
| H.264 no-preference / prefer-hardware / prefer-software | | | |
| AAC 192k | | | |
| WebGL2 renderer 문자열 | | | |
| WebGPU 어댑터 | | | |
| chrome://gpu 'Video Encode' | | | |

- **갈리는 것:** H.264가 셋 다 거짓 → 이 맥의 Chrome으로는 못 뽑음 → 뽑는 도구를 ffmpeg · Remotion으로(초안 시험 2의 뒷길). AAC만 거짓 → `@mediabunny/aac-encoder`를 넣거나 소리만 ffmpeg로 붙이는 길(ARCH). WebGL이 SwiftShader에서 못 벗어남 → 화면 있는 Chrome(창을 띄운 채)으로 뽑는 길을 T2에서 같이 잼.

#### T-i — 아이폰 능력 재기 (설치 없음)

1. 아이폰 Safari로 `https://example.com`을 엶(https여야 WebCodecs가 보임).
2. 맥 Safari › 개발자용 › [아이폰 이름] › example.com → 콘솔에 한 줄씩:

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
| 아이폰 모델 · iOS 판 · 잠금 모드 | |
| VideoDecoder · AudioDecoder · VideoEncoder · AudioEncoder · OffscreenCanvas | |
| H.264(avc1.640028) 풀기 / HEVC(hvc1) 풀기 | |
| createWritable | |
| WebGL2 / WebGPU | |
| (운영자 아이폰이 다른 기기면) 운영자 아이폰의 iOS 판 | |

- **갈리는 것:** iOS 26 이상이면 옛 판을 고치지 않고도 T1이 끝까지 갈 수 있음. 26 아래면 T1에서 '소재가 지워짐 · 소리 없음'이 나올 것 — 그것이 정상이고, 고칠 곳은 Q3('서버 → 메모리' 소재 · WAV 소리 사본). 잠금 모드면 영상 미리보기가 안 됨 → 끌지 정해야 함(운영자 기기).

#### T2 — 옛 판을 띄워 맥에서 한 편 뽑기 (Bun 필요)

1. **꾸러미 설치 · 환경 값**

```zsh
cd ~/oc-test/opencut-classic
bun install                                         # 시간 · 경고를 적음
cp apps/web/.env.example apps/web/.env.local        # '꼴만 맞는 값'이면 됨(env/web.ts:3-26)
```

   - 뜰 때 env 오류가 나면: `apps/web/Dockerfile`:24-34의 자리 표시 값(빌드용 가짜 값)과 같은 꼴로 `.env.local`을 채움. **진짜 키는 넣지 않음.**
2. **빌드가 통과하는지(Q1 표 9번 확인용)**

```zsh
cd apps/web && bun run build 2>&1 | tee ~/oc-test/build.log ; echo "끝 코드 $?"
grep -n "error\|Error" ~/oc-test/build.log | head -20
```

   - 실패하면 오류 첫 줄을 적음 — `migrations/runner.ts` 쪽이면 Q1 표 9번이 맞은 것. **고치지 말고** 3번(개발 모드)으로 넘어감.
3. **띄우기:** 빌드가 됐으면 `bun run start`, 안 됐으면 `bun run dev` → 맥 Chrome으로 `http://localhost:3000/projects`.
4. **한 편 만들기(화면 있는 Chrome):** 새 프로젝트 → 소재 넣기(①v1080_30.mp4 · ④img.png · voice.wav · music.m4a) → 영상을 타임라인에 → 사진을 그 뒤에 → 소리 둘을 소리 트랙에 → 글자 하나("테스트 자막 한글") → 설정에서 화면 1080×1920 · 30fps인지 봄.
   - **덤 시험(짧게):** 새 프로젝트를 하나 더 만들어 ②v1080_60.mp4를 처음 넣고 → 설정의 fps가 60으로 바뀌는지 적음(Q2ⓑ · Q5).
5. **뽑기(화면 있는):** Export → MP4 · High · 소리 포함 → 걸린 시간(초시계) → 받은 파일을 `~/oc-test/out/headed.mp4`로.

```zsh
mkdir -p ~/oc-test/out
/opt/homebrew/bin/ffprobe -v error -show_entries stream=codec_type,codec_name,profile,level,width,height,r_frame_rate,sample_rate,channels,bit_rate \
  -of default=nw=1 ~/oc-test/out/headed.mp4
```

   - 보면 되는 것: `h264` · `High` · level `40` · `1080`×`1920` · `30/1` · 소리 `aac`(**`opus`면 Q2ⓑ의 '말없이 Opus'**) · `44100` · `2`.
6. **화면 없는 Chrome으로 같은 일(시간 · GPU):** T0의 2번 명령에서 주소만 `http://localhost:3000/projects`로 바꿔 띄우고, `chrome://inspect`의 'inspect' 창(쪽 화면이 보이고 눌러짐)에서 4~5번을 똑같이 함. 내려받기가 어디로 가는지 모르니, **'끝났다'는 알림과 걸린 시간**을 적고, 파일이 `~/Downloads`에 생겼으면 5번의 ffprobe를 돌림.
   - 이것은 '화면 조작 없는 뽑기'의 실물이 아님 — 그것은 포크에 렌더 전용 쪽을 더해야 됨(Q2ⓐ, 코드). 오늘은 **화면 없는 Chrome에서 엔진 · 인코더 · GPU가 도는지와 시간**만 봄.

| 기록 칸 | 값 |
|---|---|
| bun install 시간 · 경고 | |
| `bun run build` 끝 코드 · 첫 오류 줄 | |
| 띄운 꼴(start / dev) · 뜰 때 오류 | |
| 처음 넣은 60fps 소재 뒤 프로젝트 fps | |
| 화면 있는 뽑기: 걸린 시간 · ffprobe 결과(영상 코덱 · 프로파일 · 레벨 · 크기 · fps · 비트레이트 / 소리 코덱 · 표본율 · 채널) | |
| 화면 없는 뽑기: 성공/실패 · 걸린 시간 · 오류 글 · 파일이 생긴 곳 | |
| 한글 글자 모양(맥 화면에서 무슨 글꼴로 보였나 — 글꼴 고르기에서 'Noto Sans KR'로 바꿨을 때 달라지는지) | |

- **안 될 때 다음 걸음:** 설치 실패 → 오류를 적고 T1은 건너뜀(T0 · T-i · T8은 그대로). 뽑기에서 `{success:false}` 알림 → 개발자 도구 콘솔의 빨간 줄을 그대로 적음. 소리가 opus → T0의 AAC 줄과 맞대어 적음.
- **갈리는 것:** 화면 있는 뽑기가 규격대로 나오면 엔진 길은 삶(남는 것은 들머리 · 시간). 화면 없는 쪽만 안 되면 '창을 띄운 Chrome으로 뽑기'가 다음 후보(맥이 깨어 있어야 함). 둘 다 안 되면 ffmpeg · Remotion.

#### T1 — https로 띄워 아이폰에서 열어 보기 (T2의 서버를 그대로 씀)

1. T2의 서버(3000)를 켠 채로 serve를 겁니다(웹앱 8765와 겹치지 않게 **8443**):

```zsh
cd <제품 저장소 뿌리>
zsh app/webapp/tailscale/ts.sh serve --help | head -40          # 꼴 확인(판마다 다를 수 있음)
zsh app/webapp/tailscale/ts.sh serve --bg --https=8443 http://127.0.0.1:3000
zsh app/webapp/tailscale/ts.sh serve status                     # https://<맥이름>.<tailnet>.ts.net:8443 이 보여야 함
```

2. 아이폰(Tailscale 연결됨) Safari로 `https://<맥이름>.<tailnet>.ts.net:8443/projects`.
   - 인증서 경고 없이 열리는가(Let's Encrypt).
   - `bun run dev`로 띄웠는데 화면이 비거나 개발 자원이 막힌다는 경고가 나오면: 시험 사본의 `apps/web/next.config.ts`에 `allowedDevOrigins: ["<맥이름>.<tailnet>.ts.net"]` 한 줄을 넣고 다시 띄움 **[추측 — Next의 개발 서버 다른 출처 막기]**. 시험 사본만 고치는 것이고, 고쳤다고 적음.
3. "Desktop only" 화면 → 'Take a look anyway' → 새 프로젝트 → 소재 넣기(파일 앱의 ①v1080_30.mp4 · ③v4k_hevc.mp4 · voice.m4a · voice.wav).
4. 맥 Safari의 웹 속성 콘솔을 열어 둔 채 봄: 소재가 목록에 남는가, 사라지는가(`Failed to save media item` 줄) · 미리보기에 영상이 보이는가 · ▶ 했을 때 소리가 나는가(m4a와 wav 각각) · 4K HEVC를 넣었을 때 알림 · 미리보기가 멈추는가.
5. 손가락으로: 자막 글 고치기 · 조각 하나 지우기 · 음량 · 속도 · 조각 끌기(안 될 것) · 끝 손잡이 끌기(안 될 것) — 되는 것/안 되는 것만 적음.
6. **끝나면 serve 끄기:**

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

- **갈리는 것:** iOS 26 아래에서 '소재 사라짐 · m4a 소리 없음 · wav 소리 남'이면 Q3의 고칠 곳이 맞은 것 → '맥이 H.264 + WAV 사본을 주고 소재를 서버 → 메모리로' 가 묶음 7의 일로 들어감. 영상조차 안 보이면(WebGL2 · VideoDecoder 문제) 화면 꼴 (가)는 접고 (나) + '맥이 뽑은 작은 미리보기 MP4를 `<video>`로'(Q3 대안)를 봄.

#### T3-반 — 저장 꼴 확인 (코드 없음 · T2의 화면 있는 Chrome에서)

1. T2에서 만든 프로젝트를 연 채, 개발자 도구 › Application › IndexedDB › `video-editor-projects` › `projects` › 그 기록 → 값을 오른쪽 눌러 복사 → `~/oc-test/out/project.json`으로 저장.
2. 타임라인에서 영상 조각 하나를 나눈(S) 뒤 다시 복사 → `project_split.json`.
3. 보면 되는 것(Q5와 맞댐): `version` 31인가 · 시각이 모두 정수이고 120,000틱/초인가(10초 영상의 `duration`이 1,200,000 안팎) · `trimStart`/`trimEnd`/`sourceDuration`의 불변식 · 글자 조각 `params`의 열쇠 이름 · `positionX/Y` 값 · **나눈 뒤 조각 id가 새로 생겼나**(되받기 대응표가 여기에 달림) · 소재 메타(`video-editor-media-<id>`)에 `fps` · `hasAudio`가 없는가.

| 기록 칸 | 값 |
|---|---|
| version · 10초 영상 duration · 불변식이 맞나 | |
| 나눈 뒤 id(앞 조각 · 뒤 조각) | |
| 소재 메타의 칸 목록 | |

- 손님 소재가 없으므로 이 JSON 둘은 PRIMARY에게 넘겨도 됨(제품 저장소에 넣지 않음).

#### T8 — 자막 · 고정 글자 모양 값 읽기 (읽기만 · 맥 CapCut 1025)

1. CapCut을 끈 채(파일만 읽음):

```zsh
F="$HOME/Movies/CapCut/User Data/Projects/com.lveditor.draft/1025/draft_info.json"   # 없으면 같은 폴더의 .cloud_cache_*/1025/draft_content.json
/usr/bin/python3 -c 'import json,sys;d=json.load(open(sys.argv[1]));[print(json.loads(t["content"])["text"][:16], "|", t.get("font_size"), t.get("border_width"), t.get("border_color"), t.get("text_color"), t.get("font_path","")[-40:]) for t in d["materials"]["texts"]]' "$F"
/usr/bin/python3 -c 'import json,sys;d=json.load(open(sys.argv[1]));print(d["canvas_config"]);[print(s["material_id"][:8], s["clip"]) for tr in d["tracks"] if tr["type"]=="text" for s in tr["segments"]]' "$F"
```

2. (한알께서 하실 때만 — 손님 소재가 든 폴더라서) 승인된 릴스 한 편(`data/output/…_v<N>.mp4`, **읽기만**)에서 손님 얼굴이 없는 장면의 프레임 한 장을 뽑아 자막 글자 높이 · 테두리 두께 · 세로 자리를 px로 잼(이미지 보기 앱의 자) — 뽑은 그림은 `~/oc-test/out/`에만 두고 저장소에 넣지 않음.

| 기록 칸 | 값 |
|---|---|
| 1025 화면 크기(canvas_config) | |
| 글자 넷의 font_size · border_width · border_color · 색 · 글꼴 파일 · clip(transform · scale) | |
| 완성 영상에서 잰 자막 글자 높이 · 테두리 px · 세로 자리 | |

### 9-4. 이 PC(윈도)에서 맥 없이 먼저 할 수 있는 것 — 오늘은 하지 않음(표시만)

- T0의 콘솔 여섯 줄(윈도 Chrome에도 OpenH264 · MediaFoundation AAC가 있음 — 보조 ④). 다만 VideoToolbox · AudioToolbox · Metal은 맥에서만 앎.
- T2의 빌드 · 띄우기 · 화면 있는 뽑기 · T3-반(Bun은 윈도도 됨 **[추측]**). 윈도는 AAC 비트레이트를 {96, 128, 160, 192}k만 받아 결과가 맥과 다를 수 있음.
- 변환 스크립트 둘(장면표 ↔ OpenCut JSON)을 Q5의 규격으로 짜서 JSON끼리 왕복해 보기(편집기 없이) — 코드를 써야 하므로 PMO · ARCH의 일.

---

## 10. 기획안 초안과 어긋나는 곳

초안 `studies/2026-11-20-plan-draft.md`(커밋 40c5a26 기준 줄). **초안은 고치지 않았습니다** — 고칠 문장 안만 적습니다.

| # | 초안의 자리 | 지금 문장(요지) | 내 결과 | 고칠 문장 안 |
|---|---|---|---|---|
| 1 | 묶음 T 시험 표(:100-105) · 차례(:107) | 시험 넷, 차례 "3 → 2 → 1 → 4. 3은 … 맥 없이도 됩니다" | 시험 3 전체는 **변환 스크립트 둘 + 들여오기 길(옛 판에 없음 — Q5)**이 있어야 해 오늘 저녁엔 못 함. 갈림이 가장 큰 것은 '맥 Chrome이 H.264 · AAC를 내는가'와 '아이폰 판' — 설치 없이 15분씩 | "시험 0(맥 Chrome 능력) · 시험 0-i(아이폰 능력)를 더하고, 차례는 0 → 0-i → 2 → 1 → 3(저장 꼴 확인만 먼저) → 4. 시험 3 전체는 변환 스크립트와 들여오기 길이 생긴 뒤" (9번) |
| 2 | 시험 2(:103) '보면 되는 것' | "1080×1920 · 30fps · H.264 · AAC가 나오는가 · 걸리는 시간 · 테두리 자막" | ① 쓰는 브라우저가 결과를 가름(CfT · Google Chrome은 됨, **오픈소스 Chromium · chrome-headless-shell은 피함**) ② **AAC가 안 되면 말없이 Opus** ③ 60fps 소재면 fps가 올라감 ④ 테두리는 옛 판 그대로면 안 나옴(고쳐야 나옴) | "…가 나오는가(소리가 Opus로 바뀌지 않았는가 — ffprobe) · 어느 Chrome(CfT/Google Chrome, 새 headless + `--enable-gpu`)에서 · GPU가 잡혔나 · 걸리는 시간. 테두리 자막은 포크에서 고친 뒤" |
| 3 | 묶음 T 후보 ①(:115) | "내보내기가 … 결과를 돌려주므로 들머리 하나만 뚫으면 됨" | 들머리에 더해 **GPU 초기화를 먼저 부르고 · 뽑기 옵션에 30fps · Opus로 바뀌면 멈추게** 해야 함(모두 작음). 화면 없는 Chrome의 GPU가 꺼지면 합성이 느리거나 안 됨 | "…들머리 하나(렌더 전용 쪽 — GPU 초기화 · 30fps 못 박기 · AAC가 아니면 멈춤 포함)만 뚫으면 됨. 쓸 브라우저는 Chrome for Testing 또는 Google Chrome(새 headless)" |
| 4 | 묶음 2의 길 ①(:143) | "파일 종류별 머리말(`.wasm` 포함)과 캐시 규칙이 새로 필요" | 맞음 + **`.wasm`은 `application/wasm`이어야만 읽힘**(Turbopack이 `instantiateStreaming`만 씀), 맥 python 3.9 표에 `.avif` 없음, 편집기 주소가 `/edit/editor/?id=` 꼴이 됨. COOP/COEP는 필요 없음 | "…`.wasm`은 반드시 `application/wasm`(없으면 편집기가 안 뜸) · `.avif` 추가 · 폴더 주소를 `index.html`로. COOP/COEP 머리말은 필요 없음(Q1)" |
| 5 | 묶음 4 https(:180) | "후보: Tailscale의 `serve` … 아이폰이 그 인증서를 믿어야 합니다(오3)" | Let's Encrypt라 **아이폰은 따로 깔 것 없이 믿음.** 대신 **맥 이름 · tailnet 이름이 공개 장부(CT)에 영구히 실림** · 주소가 바뀌어 홈 화면 추가 · PIN 로그인을 다시 · 푸시는 맥이 `*.push.apple.com`으로 나갈 수 있어야 함 · 가게 와이파이 `.local`에는 공인 인증서 불가(CA/B 포럼) | "후보 serve — 인증서는 Let's Encrypt라 아이폰에 설치할 것 없음. 켜기 전에 맥 이름에서 가게 · 사람 이름을 뺌(공개 장부). 주소가 바뀌므로 홈 화면에 다시 추가. 가게 와이파이 주소로는 https 불가 — 아이폰은 늘 tailnet으로" · 오3의 '인증서를 믿어야' → '맥 이름을 공개 장부에 올려도 되는가'로 바꿔 여쭘 |
| 6 | 묶음 7 붙는 꼴(:216) | "정적으로 뽑히는지는 확인 못 함" | **조건부로 됨** — 막는 것 11가지와 고침을 찾음(Q1) | "정적 묶음은 조건부로 됨(편집기 주소를 `?id=` 쿼리로 · 편집기 밖 쪽과 api 덜어 냄 · basePath · `.wasm` MIME) — 빌드 통과는 시험 2에서 확인" |
| 7 | 묶음 7 아이폰 위험(:228) | "옛 판을 고치지 않으면 iOS 26 이상이 필요해 보이고 … → 영상 뽑기는 맥이 하고, 휴대폰은 미리보기와 고치기만" | **뽑지 않아도 26이 걸림** — 미리보기 소리(AAC → `AudioDecoder` 26)와 소재 저장(`createWritable` 26, 실패하면 소재를 지움). 맥이 H.264 8비트 + WAV 사본을 주고 소재를 서버 → 메모리로 받게 고치면 하한 16.4 **[추측]**. 잠금 모드면 영상 미리보기 꺼짐 | "…휴대폰이 뽑지 않아도 고치지 않은 옛 판은 iOS 26이 필요함(미리보기 소리 · 소재 저장). 그래서 맥이 가벼운 사본(H.264 8비트 영상 + WAV 소리)을 주고 소재를 OPFS 대신 서버에서 받게 고침(작음~중간) — 그러면 iOS 16.4 이상 [추측, 시험 0-i · 1로 확인]" |
| 8 | 묶음 7 이용 조건(:229) | "`soundtouchjs`(LGPL-2.1 — 속도 바꾸기) · `mediabunny`(MPL-2.0 — 영상 뽑기)는 고친 부분의 공개 의무가 닿는지 ARCH가 확인" | soundtouchjs는 **'속도 바꿀 때 높낮이 유지' 한 곳에만** 쓰여 빼기 작음, 저장소는 MPL-2.0 새 꾸러미로 옮김. mediabunny는 고치지 않아도 '소스 위치 알림' 의무(MPL FAQ: 브라우저로 보내는 JS는 배포). 조직 안이면 의무 없음(MPL FAQ · GNU FAQ) — **'운영하는 쪽과 가게가 같은 조직인가'가 핵심 물음** | "…soundtouchjs는 높낮이 유지 한 곳 — 빼거나 MPL 새 꾸러미로. mediabunny는 고지에 소스 위치를 적음. 의무가 걸리는지는 '운영자(한알)와 가게가 같은 조직인가'에 달림(ARCH가 한알께 여쭐 것)" |
| 9 | 화11 미리보기(:393) | "맥이 같은 엔진으로 뽑으므로 여기서 본 대로 나옵니다 [제안 — 시험 2로 확인]" | 같은 엔진이어도 **글꼴이 다를 수 있음** — 구글 글꼴을 그때그때 인터넷으로 받고, 못 받으면 조용히 sans-serif. 한글 조각 파일이 첫 프레임 전에 안 받아질 수 있음 [추측]. 지금 릴스 글꼴(DSDSRefinedLetterM)은 목록에 없음 | "…본 대로 나옵니다 — 글꼴 파일을 웹앱에 묶어 넣어 휴대폰과 맥이 같은 파일을 쓸 때 [제안]" |
| 10 | 묶음 6 'OpenCut에 자리가 없는 것' 표(:196 이하) | 다섯 줄 + 규격 | **더 잃는 것:** 캡컷 목소리 · 음악 목록(파일로 마련) · 자동 줄바꿈 없음(`\n`로) · 1025의 글자 모양 값 전체 · **영상 원래 소리가 기본 '켬'** · 회전 정보 · 검사 규칙 · Fit '+1초' · 속도 0.1 단위 · '조용히 빠짐'(소재 · 글꼴) | 표에 줄 더함: "영상 원래 소리 — OpenCut 기본은 켬 → 변환기가 `muted` 넣음" · "줄바꿈 — 자동 없음 → 맥이 `\n`을 넣고, 휴대폰에서 고친 뒤 다시 감쌈" · "빠진 소재 · 글꼴 — 오류 없이 빠짐 → 되받을 때 맥이 검사" |
| 11 | 묶음 T 후보 비교 · 5번 등 'OpenCut 엔진' 문장 전반 | 엔진 = 옛 판 | Node로 그리는 포크(nvxtien)는 **엔진이 다름**(영상 · 글자 셋만) — 후보로 올리면 안 됨 | (초안에 이 포크를 후보로 적은 곳은 없음 — 줄일 것 없음. 연구 글 5번의 "브라우저 없는 Node 렌더 … 포크"에 '우리 쓰임엔 못 씀'을 덧붙이면 됨) |
| 12 | 8번 확인하지 못한 것(:601) | "정적 묶음으로 뽑히는지 · … 화면 없는 브라우저에서 뽑히는지(코덱 · 속도 …)" | 읽기로 좁혀진 것을 반영 | "정적 묶음 — 조건부(Q1) · 화면 없는 뽑기 — 코덱은 Chrome 판에 달림(Q2ⓒ), 속도는 모름" |

- **다시 볼 범위(규칙 37):** 이 글은 옛 판 cf5e79e · mediabunny 1.41.0 · Chromium main(2026-11-20) · Tailscale 문서(2026-01 · 2025-12) 기준입니다. 포크에서 mediabunny를 올리면(1.52부터 품질 셈이 바뀜) Q2ⓑ의 비트레이트 표를 다시 봐야 합니다. Chrome M158부터 headless-shell의 GPU가 바뀐 것처럼, Chrome 판이 바뀌면 T0을 다시 돌려야 합니다.

---

## 11. 읽은 범위 · 못 한 것

**읽은 범위**
- 직접(✔): 이 저장소의 지난 연구 넷(줄인 글 · 보조 셋의 글)과 기획안 초안의 해당 칸 · AAA 규칙 판 v0.14 · 옛 판 소스의 몇 줄(`media_time.rs`:9 · `resolve.ts`:196-206 · `compute-resize.ts`:81-90 · `runner.ts`:38-46 · `indexeddb-adapter.ts`:8-16 · `audio-manager.ts`:595-612 · `add-media-asset.ts`:52-70 · `video-cache/service.ts`:274-285 · `.git/refs/heads/main` · `package.json` · `.env.example`(값은 가리고 열쇠만) · `Dockerfile`:7-34) · 제품 코드의 몇 줄(`capcut_build.mjs`:60-119 · `server.py`:86-101, 165-189, 348-356, 60-61 · `tailscale/ts.sh` · `start_tailscaled.sh`) · 제품 기록(`agents/capcut/knowhow.md` · `agents/capcut/logs/2026-11-08_cloud-reels-analysis.md` · `agents/pmo/knowhow.md`:20-32 · `agents/pmo/logs/2026-11-09_tailscale-access.md`의 grep 줄 · `.gitignore`).
- 보조가 읽음: 옛 판 소스(편집기 · 저장 · 뽑기 · 미리보기 · 글자 · 소리 — 각 보조의 파일 목록), mediabunny v1.41.0 소스와 릴리스 노트, opencut-wasm 0.2.10 npm 묶음, Next 16 문서 · Turbopack v16.1.3 소스, Chromium main 소스, Puppeteer · Playwright 소스와 문서, WebKit 소스 · 블로그 · 버그, MDN BCD, Apple 문서, Tailscale 문서와 소스, Let's Encrypt · CA/B 포럼, nvxtien · Irbsjel 포크(gh api), MIT · MPL-2.0 · LGPL-2.1 원문과 FAQ, npm 레지스트리, 제품 코드 `app/scripts/capcut_build.mjs` · `voice_fit.py` · `app/webapp/jobs.py` · `reel_api.py` · `static/app.html` · `app/vendor/capcut-mcp/src/core.js`.
- **보조의 글을 내가 모두 다시 본 것은 아닙니다.** 다시 본 것은 위 ✔ 줄과, 보조 ③의 최소 예의 셈뿐입니다.

**못 한 것 · 확인 못 함**
- **돌려 본 것이 없음**(9번 전부).
- 실제 장면표(`data/`) · 1025 프로젝트 파일 · 승인된 릴스의 픽셀 값(T8).
- DSDSRefinedLetterM의 사용 조건 · OpenCut 상표 등록(공식 DB 직접 조회 못 함) · 간접 의존 전체의 라이선스.
- iOS 탭 메모리 한도의 숫자 · 사설 인증서에서 서비스 워커 · 푸시가 되는지 · 아이폰 Tailscale이 꺼졌을 때 푸시가 오는지를 직접 적은 원문.
- 화면 없는 WebCodecs 뽑기의 공개 시간 수치 · Revideo · Motion Canvas 사례.
- 커밋 1301d02("WebGL only")의 뜻(제품 저장소 안 git을 쓰지 않음).
- `ctx.roundRect`의 iOS 판 번호(BCD를 이번에 안 봄).

**규칙에 닿는 것(숨기지 않음 — 규칙 11 · 27)**
- 보조 ③이 제품 코드 파일 다섯의 줄 수를 세려고 Bash `wc -l`을 한 번 씀, 보조 ①이 옛 판 폴더 목록을 보려고 Bash `ls`를 한 번 씀 — 둘 다 읽기만(쓰기 · 실행 없음). 패킷의 '읽기는 파일 읽기 · 찾기 도구로'와 꼴이 어긋남.
- 보조 ②가 mediabunny 소스 · 릴리스 노트, wgpu Cargo.toml, opencut-wasm npm 묶음을 이 PC의 임시 폴더(`/tmp`)에 받아 읽음(실행 없음). 패킷의 '웹은 WebSearch · WebFetch · gh api로만'에서 벗어났을 수 있음 — 받은 꼴(명령)은 보조가 적지 않아 모름.
- 나는 opencut-classic 폴더의 파일을 `sed` · `cat`(Bash)으로 읽었음(읽기만). 같은 꼴의 어긋남.
