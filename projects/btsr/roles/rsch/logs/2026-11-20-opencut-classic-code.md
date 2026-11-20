# OpenCut 옛 판 코드 읽기 — 웹앱에 포함하려면 무엇이 걸리나
- (RSCH가 붙임) 서브 에이전트가 쓴 글 그대로. RSCH가 받아 커밋한 때: 2026-11-20 09:14 KST. 근거 말씀: owner/utterances/2026-11-20.md 07:30:43 uuid 65e69ca8. 줄인 글은 studies/2026-11-20-opencut-in-webapp.md.

- 읽은 것: `apps/opencut-classic` (커밋 `cf5e79e`, 기록이 한 커밋뿐임 — `git rev-list --count HEAD` = 1). 새 판 `apps/opencut`은 머리 커밋이 어제와 같음(`e668010`)이라 다시 읽지 않음.
- 한 일의 범위: **읽기만 함. 설치·실행·빌드·테스트 없음.** `node_modules`가 없어서 바깥 꾸러미(mediabunny · opencut-wasm 배포본 · Next)의 속은 보지 못함.
- 표시: 사실에는 `파일:줄`(경로는 `apps/opencut-classic/apps/web/src/` 기준, 그 밖은 저장소 뿌리 기준으로 적음) · 짐작은 **[추측]** · 못 본 것은 '확인 못 함'.
- 크기 어림의 뜻 **[추측]**: 작음 = 하루 안팎 / 중간 = 며칠 / 큼 = 한 주를 넘김. 돌려 보지 않고 낸 어림임.

## 결론 먼저

1. **맥에서 따로 띄워 쓰는 것은 가볍다.** 로그인·Postgres·Redis는 편집기에 필요 없고, 환경 값은 '꼴만 맞는 자리 표시 값'이면 된다.
2. **휴대폰(440px)에서 쓰게 하는 것은 무겁다.** 막는 안내(`mobile-gate.tsx`)는 한 줄짜리이고, 진짜 걸림은 (a) 타임라인의 끌기·길이 조절이 전부 mouse 이벤트라 손가락으로 안 되는 것 (b) 세 칸 가로 배치가 고정 비율인 것 (c) 저장·내보내기·미리보기가 HTTPS와 최신 브라우저 기능에 기대는 것이다.
3. **'편집 상태를 맥에 남기기'는 길이 있다.** 프로젝트가 글(JSON)로 저장되고(판 번호 31), 저장 층이 한 파일에 모여 있어 서버로 돌리기 쉽다. 맥 쪽 스크립트가 브라우저 없이 프로젝트 JSON을 직접 써 넣을 수도 있다.
4. **'화면 조작 없이 뽑기'는 들머리 하나만 뚫으면 된다.** `ProjectManager.export()`가 내려받기 없이 바이트 덩어리를 돌려준다. 다만 화면 없는 크롬에서 실제로 도는지는 돌려 봐야 안다.
5. **자막 테두리는 작게 고칠 수 있다.** 테두리 그리는 함수가 이미 있다(글자 마스크용). 글자 조각에는 연결돼 있지 않을 뿐이다.
6. **내 권고 [추측]:** 이 가게의 고침(자막 글, 장면 길이·순서·빼기, 소리 크기·속도)은 꼴이 좁다. 휴대폰에는 OpenCut의 타임라인 화면을 통째로 옮기기보다 **작은 고침 화면(목록·슬라이더)을 따로 두고, OpenCut은 '프로젝트 꼴 + 미리보기·뽑기 엔진'으로 쓰는 길**이 일이 작고 위험이 낮다. '포함한다'는 말씀을 어디까지로 볼지는 정해 주셔야 한다(끝의 '정해 주실 것').

---

## 1. 웹앱에 포함하는 길 셋

### 먼저, 세 길에 모두 걸리는 사실

**띄우는 데 필요한 것**

| 것 | 사실 | 근거 |
|---|---|---|
| Bun | `bun@1.2.18`로 못 박혀 있음. CI도 같은 판 | `package.json`:3 · `.github/workflows/bun-ci.yml`(setup-bun 1.2.18) |
| Node | 기여 안내에 "v18 or later". `engines` 항목은 없음. Next 16.1.3이 실제로 요구하는 Node 판은 확인 못 함 | `.github/CONTRIBUTING.md`:19 · `apps/web/package.json`:53 |
| Rust | **필요 없음** — 합성기는 npm 꾸러미 `opencut-wasm ^0.2.10`으로 받음. `rust/`를 고칠 때만 필요 | `apps/web/package.json`:55 · `README.md`:78-80 |
| 띄우는 꼴 | `next dev --turbopack` / `next build` + `next start`. 빌드 꼴은 `standalone`, 도커는 `bun apps/web/server.js` | `apps/web/package.json`:7-9 · `apps/web/next.config.ts`:11 · `apps/web/Dockerfile`:62 |
| 빌드 때 인터넷 | 화면 글꼴 Inter를 `next/font/google`로 받음(빌드 때 받는 것으로 앎 **[추측]**) · 블로그 글을 바깥 CMS에서 받음 | `app/layout.tsx`:10-12 · `blog/query.ts`:17-18, 70 |

**환경 값 — 정말 필수인가**

- 값은 **있어야 한다.** `env/web.ts`가 `process.env`를 통째로 검사하고(:30), 맨 바깥 틀 `app/layout.tsx`가 그것을 들여온다(:9, :55). 그래서 값이 빠지면 편집기를 포함한 모든 쪽이 뜨지 않는다 **[추측: 돌려 보지 않음]**.
- 그러나 **꼴만 맞으면 된다.** 검사는 '문자열인가 · 주소 꼴인가 · postgres://로 시작하는가'뿐이다 — `env/web.ts`:3-26. 실제로 CI와 도커 빌드가 가짜 값으로 통과시킨다 — `bun-ci.yml`의 `env:` 묶음(placeholder 값들) · `apps/web/Dockerfile`:24-34("Build-time env stubs to pass zod validation").
- 필수 항목: `NODE_ENV` · `NEXT_PUBLIC_MARBLE_API_URL` · `DATABASE_URL` · `BETTER_AUTH_SECRET` · `UPSTASH_REDIS_REST_URL` · `UPSTASH_REDIS_REST_TOKEN` · `MARBLE_WORKSPACE_KEY` · `FREESOUND_CLIENT_ID` · `FREESOUND_API_KEY`. `NEXT_PUBLIC_SITE_URL`만 기본값이 있음 — `env/web.ts`:5-25.
- **끄는 법:** `app/layout.tsx`에서 `webEnv`를 쓰는 곳은 분석 스크립트의 `data-disabled` 하나뿐이다(:55). 그 한 줄과 import(:9)를 빼면 편집기 쪽은 환경 값 없이 뜬다 **[추측]** — 크기 작음.

**Postgres · Redis — 정말 필수인가: 편집기에는 아니다**

- DB를 쓰는 곳은 둘뿐: 로그인(`auth/server.ts`:4, 13-16)과 피드백(`feedback/queries.ts`:1). Redis를 쓰는 곳도 둘뿐: 로그인(`auth/server.ts`:7-10)과 요청 수 제한(`auth/rate-limit.ts`:5-8 → 피드백·소리 검색 라우트).
- 이 파일들을 들여오는 것은 API 라우트뿐이고(`app/api/auth/[...all]/route.ts`:1 · `app/api/feedback/route.ts`:3-4 · `app/api/sounds/search/route.ts`:1, 4), 편집기 쪽(`app/editor/[project_id]/page.tsx`)은 들여오지 않는다.
- README도 그렇게 적는다: "Docker is optional … If you only want to work on frontend features, you can skip it." — `README.md`:39.
- `db/index.ts`:17이 파일을 읽는 순간 `postgres(url)`을 부르지만, 그 파일은 위 라우트가 불릴 때만 읽힌다. 주소만 넘기고 실제 연결은 첫 질의 때 한다고 알고 있으나 확인 못 함 **[추측]**.

**로그인 없이 편집기만 쓸 수 있나: 그렇다**

- 로그인 훅 `useSession` · `signIn` · `signUp`은 내보내기만 하고 **어디서도 쓰지 않는다** — `auth/client.ts`:4가 소스 전체에서 유일한 자리(grep).
- 길을 막는 미들웨어 파일이 없다(`middleware` · `proxy.ts` · `instrumentation` 이름의 파일 0건 — `git ls-files`).
- 없는 프로젝트 번호로 들어오면 새 프로젝트를 만들어 그 주소로 바꿔 준다 — `components/providers/editor-provider.tsx`:52-62.

**편집기가 기대는 서버 주소**

| 주소 | 누가 부르나 | 없으면 |
|---|---|---|
| `/api/sounds/search` | 소재 칸의 '소리' 탭 — `sounds/use-sound-search.ts`:50-51, 98-99 · `sounds/components/assets-view.tsx`:126-127 | 소리 찾기만 안 됨(Freesound 키·Redis 필요 — `app/api/sounds/search/route.ts`:152, 205) |
| `/api/feedback` | 머리의 피드백 단추 — `feedback/components/feedback-popover.tsx`:64 | 피드백만 안 됨(DB·Redis 필요) |
| `/api/auth/*` | 편집기에서는 부르는 곳 없음 | 영향 없음 |
| `/api/health` | 도커 상태 확인 — `docker-compose.yml`의 healthcheck | — |
| `/fonts/font-atlas.json` · `/fonts/font-chunk-N.avif` | 글꼴 고르는 창의 미리보기 그림 — `fonts/google-fonts.ts`:5-6, 31 | 정적 파일이라 같이 딸려 옴(`apps/web/public/fonts/`) |

→ **편집의 뼈대(소재 넣기·자르기·자막·미리보기·저장·내보내기)는 서버 주소를 하나도 부르지 않는다.** 서버는 사실상 정적 파일만 내주면 된다.

**편집기가 스스로 바깥(인터넷)을 부르는 곳** — 가게에서 쓸 때 꺼야 할 것

- 분석 스크립트(databuddy)를 모든 쪽에 넣음. 개발 모드에서만 꺼짐 — `app/layout.tsx`:50-61.
- 봇 가림(BotId) — `app/layout.tsx`:8, 31 · `apps/web/next.config.ts`:2, 54. 내부망에서 무엇을 하는지는 확인 못 함.
- 개발 모드에서 unpkg의 react-scan 스크립트 — `app/layout.tsx`:32-39.
- 글꼴: 시스템 글꼴 아홉 가지가 아니면 구글 폰트 CSS를 받음 — `fonts/google-fonts.ts`:4, 64 · `fonts/system-fonts.ts`:1-11. 프로젝트를 열 때마다 부름 — `core/managers/project-manager.ts`:159-167.
- 자동 자막을 쓰면 모델을 바깥에서 받음(`@huggingface/transformers`) — `services/transcription/service.ts`:114. 쓰지 않으면 부르지 않음.

**빌드가 지금 통과하는지 의심되는 곳 하나 [추측]**

- 저장 어댑터의 생성자는 **객체 하나**를 받는데(`services/storage/indexeddb-adapter.ts`:8-16), 옛 자료 옮기는 코드는 **값 셋을 나란히** 넘긴다(`services/storage/migrations/runner.ts`:41-45 · `migrations/v1-to-v2.ts`:124-128, 133-137, 160-164). `set`도 객체 하나를 받는데(:50-56) 값 둘을 넘긴다(`runner.ts`:98).
- `tsconfig.json`이 `strict: true`이고 `next.config.ts`에 타입 오류를 무시하는 설정이 없어서, `next build`의 타입 검사에서 걸릴 수 있다. **돌려 보지 않아 확인 못 함.** 걸린다면 포크에서 네 군데를 고치면 된다(작음).
- 타입 검사를 건너뛰는 개발 모드에서는, 이 코드가 이름이 `"undefined"`인 DB를 열어 빈 목록을 받게 되므로 옛 자료 옮기기가 조용히 아무 일도 하지 않을 것 **[추측]**. 우리는 옛 자료가 없어 영향 없음.

**주소가 HTTPS여야 한다 [추측 — 브라우저 규칙에 대한 내 지식, 실기기 확인 필요]**

- 코드가 쓰는 OPFS(`navigator.storage.getDirectory` — `services/storage/opfs-adapter.ts`:11), WebCodecs(`AudioEncoder` — `services/renderer/scene-exporter.ts`:113-114), WebGPU는 '보안 맥락'(HTTPS 또는 localhost)에서만 열린다.
- 맥 자신(localhost)은 괜찮지만 **아이폰이 `http://맥의-내부망-주소`로 들어오면 소재 저장과 내보내기가 안 된다.** 맥이 HTTPS로 내줘야 하고, 아이폰이 그 인증서를 믿어야 한다.
- 코드에서 보이는 흔적: OPFS가 없으면 "Storage not fully supported" 알림만 띄우고 계속 감 — `components/storage-provider.tsx`:48-54. 번호 만들기는 보안 맥락이 아닐 때의 대비가 있음 — `utils/id.ts`:2-27.

### (ㄱ) 맥에서 따로 띄우고 주소로 넘어감(또는 iframe)

- **되는 것:** 위 사실대로, 가짜 환경 값만 주면 DB·Redis 없이 뜬다 **[추측]**. 우리 웹앱에서 `…/editor/<프로젝트 번호>`로 보내면 된다(`app/editor/[project_id]/page.tsx`:39-40).
- **iframe:** 편집기가 스스로 끼워 넣기를 막는 머리글을 내지 않는다 — `apps/web/next.config.ts`에 `headers()` 없음 · `apps/web/public/_headers`는 캐시 한 줄뿐. 그래서 끼울 수는 있다 **[추측]**.
- **걸리는 것:**
  1. 주소(포트)가 다르면 **브라우저 저장소가 따로**다. 프로젝트와 소재가 편집기 주소의 IndexedDB·OPFS에만 있어, 우리 웹앱(파이썬 서버)은 그것을 볼 수 없다 → 3번의 '맥으로 되돌려 받는 길'을 만들어야 쓸모가 생긴다.
  2. 화면이 영어이고 프로젝트 목록·랜딩·블로그 같은 쪽이 같이 딸려 온다(`app/` 아래 blog · changelog · contributors · sponsors · roadmap 등).
  3. 맥에 프로세스가 하나 더 돈다(Bun/Node 서버 + 파이썬 서버).
  4. 휴대폰에서는 2번의 걸림이 그대로다.
- **크기:** 띄우기만은 작음. 쓸모 있게 하려면 3번·2번 일이 붙음.

### (ㄴ) 편집기 부분만 떼어 우리 것에 넣음

- **떼어 낼 수 있는 경계는 뚜렷하다.** 편집 논리는 화면 틀과 떨어진 묶음에 있다: `core/`(관리자 12개 — `core/index.ts`:17-81), `commands/`, `timeline/`, `services/renderer/`, `services/storage/`, `media/`, `text/`, `params/`, `wasm/`. 편집기 화면 가운데 Next에 직접 기대는 파일은 열 개뿐이다(`from "next/…"` grep): `app/editor/[project_id]/page.tsx` · `app/layout.tsx` · `app/projects/page.tsx` · `components/editor/editor-header.tsx` · `components/editor/mobile-gate.tsx` · `components/editor/panels/assets/views/assets.tsx` · `components/providers/editor-provider.tsx` · `guides/definitions/platforms.tsx` · `stickers/components/assets-view.tsx` · `timeline/components/timeline-element.tsx`.
- **그러나 '정적 HTML 한 장'에는 그대로 못 넣는다.** 편집기는 React 19 + Tailwind 4 + Radix 부품(`components/ui/` 48개) + WASM 꾸러미(번들러용으로 빌드됨 — `package.json`의 `build:wasm`이 `--target bundler`)라서 **묶는 도구(번들러)가 반드시 있어야 한다.** 우리 웹앱에는 그것이 없다.
- **현실적인 꼴 [추측]:** 편집기를 따로 묶어 **정적 파일 묶음**으로 만들고, 그것을 우리 파이썬 서버가 **같은 주소 아래**에서 내준다. 그러면 저장소·API가 같은 주소라 (ㄱ)의 1번 걸림이 사라지고, 맥에 Node 서버를 따로 띄울 필요도 없다. 다만 지금 설정은 `standalone`이고 편집기 길이 `[project_id]` 꼴이라 정적으로 뽑으려면 길과 틀을 고쳐야 한다 — 정적 뽑기가 실제로 되는지는 확인 못 함.
- **코어에 섞인 화면 의존:** `core/managers/project-manager.ts`:12 · `core/managers/media-manager.ts`:2가 알림 부품(sonner)을 직접 부른다. 떼어 낼 때 같이 따라온다(작음).
- **크기:** 중간~큼. 얻는 것은 '한 주소·한 서버'.

### (ㄷ) 옛 판을 포크해 우리 쪽에 맞게 고침

- 보관된 코드라 **무엇이든 고치려면 어차피 포크**다(자막 테두리·휴대폰·저장). (ㄱ)과 (ㄴ)도 고치는 순간 (ㄷ)이 된다.
- **덜어 낼 것(편집기에 불필요):** `auth/` · `db/` · `feedback/` · `blog/` · `changelog/` · `site/` · `components/landing/` · `app/`의 랜딩·블로그·약관 쪽 · `app/api/` · 분석·봇 가림 스크립트 · `sounds/`(바깥 소리 찾기) · `transcription/`(자동 자막, 한국어 없음) · `stickers/`. 소스 654개(공개 파일·테스트 제외) 가운데 이런 묶음이 적어도 111개(`git ls-files` 셈).
- **드는 부담:** 위에서 아무도 고쳐 주지 않는다. README가 스스로 "Preview panel … and export functionality — we're refactoring these with a new binary rendering approach"라고 적은 부분(`README.md`:144)을 우리가 들고 가게 된다. `AGENTS.md`도 "An ongoing migration is moving all business logic into `rust/`"라고 적는다 — 옮기다 멈춘 상태의 코드다.
- **크기:** 포크 자체는 작음. 그 뒤의 일이 2~6번에 적은 크기만큼.

### 세 길 견줌

| | (ㄱ) 따로 띄움 | (ㄴ) 떼어 넣음 | (ㄷ) 포크해 고침 |
|---|---|---|---|
| 맥에 더 필요한 것 | Bun + Node 서버 프로세스 | 빌드할 때만 Bun **[추측]** | (ㄱ) 또는 (ㄴ)과 같음 |
| Postgres · Redis | 필요 없음(가짜 값) | 필요 없음 | 덜어 냄 |
| 로그인 | 없음 | 없음 | 없음 |
| 우리 웹앱과 저장소 | 따로(주소가 다름) | 같음 | 고르기 나름 |
| 휴대폰 | 그대로는 못 씀 | 그대로는 못 씀 | 고쳐야 씀 |
| 자막 테두리 | 못 넣음 | 못 넣음 | 넣을 수 있음 |
| 첫 일의 크기 | 작음 | 중간~큼 | 작음(+고칠 것) |

---

## 2. 휴대폰에서 막히는 것의 전부

### 2-1. 막는 안내는 껍데기다

- 너비 1024 아래면 "Desktop only (for now)" 안내 — `components/editor/mobile-gate.tsx`:21. "Take a look anyway"를 누르면 그 뒤로는 그냥 들어간다(:29-32, :61). 안내 글 스스로 "Things will break and the layout will be a mess"라고 적는다(:55-57).
- 편집기 화면에는 **화면 너비에 따라 바뀌는 배치가 하나도 없다.** `timeline/` · `preview/` · `components/editor/` · `editor/` · `panels/`에서 `sm:` · `md:` · `lg:` 붙은 꼴은 첫 실행 안내창 둘뿐 — `components/editor/onboarding.tsx`:84, 95. 휴대폰 판별 훅(`hooks/use-mobile.ts`)은 만들어만 두고 어디서도 쓰지 않는다(grep).

### 2-2. 패널 배치 — 고정 비율

- 위쪽이 **가로 세 칸**(소재 25 · 미리보기 50 · 속성 25), 아래가 타임라인, 위아래 50:50 — `panels/layout.ts`:1-9 · `app/editor/[project_id]/page.tsx`:129-207.
- 최소 크기도 비율이다: 소재 15~40% · 미리보기 30% 이상 · 속성 15~40% · 위쪽 30~85% · 타임라인 15~70% — `page.tsx`:145-146, 163-164, 174, 188-189, 201-202. 세로로 쌓는 길이 없다.
- **440px에서의 셈:** 좌우 여백 24px(`px-3` — `page.tsx`:151)을 빼면 소재 칸과 속성 칸이 각각 100px 남짓, 미리보기가 200px 남짓. 속성 칸은 그 안에 32px 탭 줄이 또 있어(`components/editor/panels/properties/index.tsx`:67, 83) 값을 고칠 자리가 70px쯤 남는다. **쓸 수 없는 너비다.**
- 타임라인: 트랙 이름 줄이 **112px 고정**(`timeline/components/layout.ts`:16 · `timeline/components/index.tsx`:640) → 조각이 놓일 자리는 300px 안팎.
- 높이: 편집기 전체가 `h-screen`(`page.tsx`:45), 머리 3.4rem(`components/editor/editor-header.tsx`:32). 글자 트랙 높이 **25px**, 영상 65px, 소리 50px(`timeline/components/layout.ts`:3-9) — 손가락으로 누르기에 낮다.

### 2-3. 타임라인 조작 — 전부 mouse 이벤트

- 타임라인 쪽에는 pointer·touch 이벤트가 사실상 없다. 파일별 `mouse…` 쓰임 수(grep): `timeline/components/timeline-element.tsx` 25 · `timeline/components/index.tsx` 18 · `timeline/controllers/playhead-controller.ts` 12 · `seek-controller.ts` 11 · `element-interaction-controller.ts` 10 · `keyframe-drag-controller.ts` 9 · `timeline/components/timeline-track.tsx` 9 · `timeline/bookmarks/components/bookmarks.tsx` 9 · `resize-controller.ts` 8 · `selection/hooks/use-box-select.ts` 8 · `timeline/components/timeline-ruler.tsx` 5. `touch` 이벤트는 편집기에 0건. 타임라인에서 pointer를 쓰는 곳은 음량 선(`timeline/components/audio-volume-line.tsx`)과 곡선 편집기뿐.
- **조각 끌기(순서·자리 바꾸기):** `onMouseDown`으로 시작해(`timeline-element.tsx`:583) `document`의 `mousemove`·`mouseup`으로 따라감 — `timeline/controllers/element-interaction-controller.ts`:433-434, 529.
- **길이 조절(양 끝 손잡이):** 같은 꼴 — `timeline-element.tsx`:650 → `timeline/controllers/resize-controller.ts`:246-247, 325.
- 아이폰의 손가락 끌기는 `mousemove`를 내지 않으므로(두드릴 때만 mouse 이벤트가 한 번씩 흉내로 나옴) **끌기와 길이 조절은 되지 않는다 [추측 — 브라우저 동작에 대한 내 지식, 실기기 확인 필요].** 두드려 고르기(`onClick` — `timeline-element.tsx`:582)는 될 것 **[추측]**.
- **확대:** 휠 + Ctrl/⌘뿐 — `timeline/controllers/zoom-controller.ts`:108-125 · `timeline/components/index.tsx`:241-291. 두 손가락 벌리기(pinch)는 0건(grep `pinch|gesture|touches`). 다만 **도구 줄에 확대 슬라이더와 단추가 있어** 손가락으로 된다 — `timeline/components/timeline-toolbar.tsx`:62-81.
- **소재를 타임라인에 넣기:** 끌어다 놓기는 HTML5 끌기(`draggable` — `components/editor/panels/assets/draggable-item.tsx`:115-116, 154-155). 누르면 넣는 '+' 단추가 따로 있으나 **마우스를 올려야 보인다**(`opacity-0 group-hover:opacity-100` — :122-123).
- **오른쪽 누름 메뉴:** 조각의 나누기·복사·지우기·소리 끄기 등이 여기 있음 — `timeline-element.tsx`:377-509. 손가락 길게 누르기로 열리는지는 확인 못 함.

### 2-4. 미리보기는 사정이 낫다

- 미리보기의 끌기·크기 손잡이는 **pointer 이벤트**다 — `preview/components/handle-primitives.tsx`(147곳) · `preview/controllers/preview-interaction-controller.ts`(17) · `transform-handle-controller.ts`(16). 손가락으로 될 것 **[추측]**.
- 캔버스 크기: 합성기는 늘 **프로젝트의 본 크기(1080×1920이면 그대로)**로 그리고, 화면에는 CSS로 줄여 보인다 — `preview/components/index.tsx`:160-164(`CanvasRenderer`에 본 크기) · :173-177(출력 캔버스를 `width/height: 100%`로 붙임). 미리보기 칸의 최소 크기는 따로 없다(비율 30%뿐). → 휴대폰에서도 매 프레임 1080×1920을 그린다. 견디는지는 확인 못 함.
- 미리보기 확대: 휠 + Ctrl/⌘(`preview/components/index.tsx`:226-289)과 도구 줄의 % 고르기(`preview/components/toolbar.tsx`:102-117).
- 미리보기 영상 풀기도 브라우저의 영상 디코더에 기댄다(mediabunny `CanvasSink` — `services/video-cache/service.ts`:5, 281-284). 아이폰 사파리가 받아 주는지는 확인 못 함.
- 편집기 스스로의 경고: 렌더러가 덜 갖춰지면 "For the best experience, open OpenCut in Chrome." — `app/editor/[project_id]/page.tsx`:60-67.

### 2-5. 키보드에만 있는 기능

단축키 목록 — `actions/definitions.ts`:155-176. 화면 단추가 있는지는 `invokeAction(` · `action=` grep으로 봄.

| 기능 | 단축키 | 화면 단추 |
|---|---|---|
| **되돌리기 · 다시 하기** | Ctrl+Z · Ctrl+Shift+Z/Y | **없음**(tsx에서 `"undo"`·`"redo"` 0건) |
| 한 프레임 앞뒤 · 1초/5초 뛰기 · 처음/끝으로 | ←→ · J L · Shift+←→ · Home End | 없음 |
| 모두 고르기 | Ctrl+A | 없음 |
| 붙여 넣기 | Ctrl+V | 타임라인 빈 곳의 오른쪽 누름 메뉴 — `timeline/components/index.tsx`:843 |
| 복사 · 소리 끄기 · 숨기기 | Ctrl+C 등 | 조각의 오른쪽 누름 메뉴 — `timeline-element.tsx`:1187, 1216, 1246 |
| 나누기 · 왼쪽/오른쪽 잘라 내기 · 복제 · 지우기 · 책갈피 | S · Q · W · Ctrl+D · Backspace | **있음** — `timeline/components/timeline-toolbar.tsx`:148-209 |
| 재생/멈춤 | Space | **있음** — `preview/components/toolbar.tsx`:141 |
| 자석 붙기 · 밀어 붙이기(ripple) 켜기 | N | **있음** — `timeline-toolbar.tsx`:288-295 |

→ 휴대폰에서 가장 아픈 빈자리는 **되돌리기 단추가 없는 것**이다.

### 2-6. 이 가게의 고침에 비추면

| 고침 | 지금 화면에서 손가락으로 | 근거 |
|---|---|---|
| 자막 글 고치기 | **될 것** — 조각을 두드려 고르고, 속성 칸 '글자' 탭의 글 상자에서 고침 **[추측]**. 다만 속성 칸이 100px라 2-2의 배치를 먼저 풀어야 함 | `components/editor/panels/properties/components/property-param-field.tsx`:139-141 · `…/properties/registry.tsx`:229-233 |
| 소리 크기 | 될 것 — 속성 칸 '소리' 탭의 숫자 칸 | `registry.tsx`:118-133 · `params/registry.ts`:157-174 |
| 속도 | 될 것 — 속성 칸 '속도' 탭(0.01~5배, 높낮이 유지 고르기) | `speed/components/speed-tab.tsx`:68-145 · `retime/rate.ts`:1-3 |
| 장면 빼기 | 될 것 — 고르고 지우기 단추. 밀어 붙이기를 켜면 뒤가 당겨짐 | `timeline-toolbar.tsx`:197, 295 · `core/managers/commands.ts`:22-27 |
| 장면 길이 | **안 됨** — 양 끝 끌기가 mouse. 돌아가는 길은 '재생 머리를 옮기고 잘라 내기(Q/W 단추)'뿐. 속성 칸에 길이·시작을 숫자로 넣는 칸은 없음 | `resize-controller.ts`:246-247 · `registry.tsx`의 탭 목록(:78-218에 길이 탭 없음) |
| 장면 순서 | **안 됨** — 끌기가 mouse. 다른 길 없음 | `element-interaction-controller.ts`:433-434 |

### 2-7. 440px에서 쓰게 하려면 — 고칠 파일과 크기 [추측]

| # | 할 일 | 고칠 파일 | 크기 |
|---|---|---|---|
| 1 | 막는 안내 걷기 | `components/editor/mobile-gate.tsx` | 작음 |
| 2 | 배치를 세로로 다시 짜기(위 미리보기 · 가운데 타임라인 · 속성/소재는 아래에서 올라오는 판) | `app/editor/[project_id]/page.tsx` · `panels/layout.ts` · `editor/panel-store.ts` · `components/editor/panels/properties/index.tsx` · `components/editor/panels/assets/index.tsx` · `tabbar.tsx` · `components/editor/editor-header.tsx` | 중간 |
| 3 | 타임라인 끌기·길이 조절·재생 머리·찾아가기를 pointer 이벤트로 바꾸기. 손가락 쓸기(스크롤)와 끌기를 가르는 규칙(길게 눌러 잡기 등)도 새로 정해야 함 | `timeline/controllers/` 의 `element-interaction-controller.ts` · `resize-controller.ts` · `playhead-controller.ts` · `seek-controller.ts` · `keyframe-drag-controller.ts` + `timeline/components/` 의 `timeline-element.tsx` · `index.tsx` · `timeline-track.tsx` · `timeline-ruler.tsx` · `timeline-playhead.tsx` + `selection/hooks/use-box-select.ts` · `selection/selectable-surface.tsx` — 열두 파일 안팎, mouse 쓰임 130곳 안팎 | **큼** |
| 4 | 누를 자리 키우기(트랙 높이 25px, 끝 손잡이, 이름 줄 112px 줄이기) | `timeline/components/layout.ts` · `timeline-element.tsx` · `index.tsx` | 중간 |
| 5 | 되돌리기·다시 하기 단추, 마우스 올려야 보이는 '+' 단추 드러내기 | `timeline/components/timeline-toolbar.tsx` · `components/editor/panels/assets/draggable-item.tsx` | 작음 |
| 6 | 두 손가락으로 타임라인 확대(슬라이더가 있어 꼭은 아님) | `timeline/controllers/zoom-controller.ts` · `timeline/components/index.tsx` | 작음~중간 |
| 7 | 아이폰 사파리에서 저장·미리보기·소리가 도는지 확인하고 안 되는 것 메우기(2-8) | 미리 알 수 없음 | **모름** |

- 3번을 피하는 길 **[추측]**: 장면의 길이·순서를 타임라인 끌기 대신 **목록과 숫자 칸**으로 고치는 작은 화면을 따로 짠다. 편집 명령은 화면과 떨어져 있어(6번) 새 화면에서 그대로 부를 수 있다. 이것이 '결론 6'의 뜻이다.

### 2-8. 아이폰 사파리에서 확인 못 한 것 — 모두 돌려 봐야 앎

- 소재 저장은 OPFS의 `createWritable()`로 쓴다 — `services/storage/opfs-adapter.ts`:38-42. 사파리가 이 함수를 받은 것은 최근 판부터라고 알고 있다 **[추측]** — 받는 판이 아니면 소재를 하나도 넣을 수 없다.
- 그리기는 WebGPU를 먼저 찾고 없으면 WebGL로 간다 — `rust/crates/gpu/src/context.rs`:200-210(WebGPU 찾기) · :230-259(GL로 물러서기). 그리기 장치를 못 얻으면 '덜 갖춰짐' 표시만 하고 계속 가지만(`components/providers/editor-provider.tsx`:41-42 · `services/renderer/gpu-renderer.ts`:11-24), 합성기 자체가 그리기 장치를 요구하므로(`rust/wasm/src/compositor.rs`:28-70) 미리보기가 나오는지는 확인 못 함.
- 4K HEVC 아이폰 영상을 풀 수 있는지: 코드는 "풀 수 없음"을 알리는 길을 갖고 있다 — `media/mediabunny.ts`:43 · `media/processing.ts`:146-149.
- 1080×1920을 매 프레임 그릴 때의 기억·열.
- 홈 화면 웹앱에서 브라우저 저장소가 오래 남는지(지워질 수 있음) — 맥을 원본으로 삼으면 영향이 줄어든다(3번).

---

## 3. 저장

### 3-1. 어디에 어떻게

| 무엇 | 어디 | 근거 |
|---|---|---|
| 프로젝트(장면·트랙·조각·설정) | IndexedDB, DB 이름 `video-editor-projects`, 저장 칸 `projects`, 열쇠 = 프로젝트 번호. 값은 **글로 된 객체**(날짜만 ISO 문자열) | `services/storage/service.ts`:60-72, 134-168 · `services/storage/types.ts`:32-49 |
| 소재의 딸린 정보(이름·종류·크기·너비·높이·길이·작은 그림) | IndexedDB, 프로젝트마다 DB 하나 `video-editor-media-<번호>`, 칸 `media-metadata` | `service.ts`:93-103, 297-308 · `types.ts`:17-30 |
| 소재 파일 자체 | OPFS, 폴더 `media-files-<번호>`, 파일 이름 = 소재 번호 | `service.ts`:100 · `services/storage/opfs-adapter.ts`:10-43 |
| 화면 설정(패널 크기·단축키·휴대폰 안내 확인) | localStorage | `editor/panel-store.ts`:43 · `components/editor/mobile-gate.tsx`:10, 22 |
| 서버 | **아무것도 저장하지 않음** | `storageService`를 부르는 곳이 모두 브라우저 쪽(grep) |

- 저장하는 때: 장면·타임라인이 바뀌면 0.8초 뒤 저절로 — `core/managers/save-manager.ts`:15-17, 27-38, 74-82 → `core/managers/project-manager.ts`:189-210.
- 저장할 때 소리 조각의 풀린 소리 덩어리(`buffer`)는 떼고 적는다 — `service.ts`:121-132.
- 프로젝트를 파일로 내보내거나 들이는 기능: **없음**(`importProject` · `exportProject` · `.json` 파일 다루기 grep 0건. `exportProject`라는 이름은 영상 뽑기 — `core/managers/renderer-manager.ts`:141).

### 3-2. 갈아 끼울 수 있는 추상화가 있나 — 반쯤 있다

- **틀은 있다:** `StorageAdapter<T>`(get · set · remove · list · clear) — `services/storage/types.ts`:9-15. IndexedDB 어댑터와 OPFS 어댑터가 이 틀을 따른다 — `indexeddb-adapter.ts`:3 · `opfs-adapter.ts`:3.
- **바꿔 끼우는 자리는 없다:** `StorageService`가 생성자 안에서 두 어댑터를 직접 만들고(`service.ts`:68-78, 94-100), 파일 끝에서 하나뿐인 인스턴스를 내보낸다(`service.ts`:574). 설정으로 다른 저장소를 넘길 길이 없다.
- **그래도 고칠 곳이 한 파일에 모여 있다:** 프로젝트·소재를 읽고 쓰는 모든 코드가 `storageService` 하나를 거친다 — 부르는 곳: `core/managers/project-manager.ts`(12곳) · `media-manager.ts` · `scenes-manager.ts`:178 · `commands/media/add-media-asset.ts` · `remove-media-asset.ts` · `media/processing.ts`:106 · `components/storage-provider.tsx` · `sounds/sounds-store.ts`(grep). 옛 자료 옮기기만 IndexedDB를 직접 만진다 — `services/storage/migrations/runner.ts`:41 · `v1-to-v2.ts`:124-164.

### 3-3. 맥 → 휴대폰 → 맥으로 되돌려 받는 길: 어디를 고치나

**길 A — 저장 층을 서버로 돌림 [추측]** (크기 중간)

1. `StorageAdapter<T>`를 따르는 'HTTP 어댑터' 둘을 새로 씀: 프로젝트용(JSON을 GET/PUT), 소재용(파일을 GET해 `File`로 돌려줌). IndexedDB 어댑터에만 있는 `getAll`(`indexeddb-adapter.ts`:92-102)도 맞춰야 함 — `service.ts`:245가 씀.
2. `services/storage/service.ts`:68-78, 94-100에서 어댑터 만드는 줄을 바꿈.
3. 파이썬 서버에 주소 넷 안팎을 더함: 프로젝트 읽기·쓰기, 소재 목록·파일.
4. 걸리는 것: 소재를 열 때마다 통째로 받게 되므로(`service.ts`:336-382가 파일을 받아 `URL.createObjectURL`로 엶) 휴대폰에서 영상 원본을 매번 내려받는다. 휴대폰용 가벼운 사본을 두거나 브라우저 쪽에 한 번 받아 둔 것을 다시 쓰는 꾀가 필요함.

**길 B — 브라우저 저장은 그대로 두고 앞뒤에 '받기·보내기'를 붙임 [추측]** (크기 작음~중간)

1. 받기: 편집기가 프로젝트를 읽기 직전(`components/providers/editor-provider.tsx`:43의 `loadProject` 앞)에 맥에서 프로젝트 JSON과 소재를 받아 `storageService.saveProject`(`service.ts`:134) · `saveMediaAsset`(`service.ts`:287)으로 브라우저에 써 넣음.
2. 보내기: 저절로 저장되는 자리(`core/managers/project-manager.ts`:189-210의 `saveCurrentProject`, 또는 `save-manager.ts`:84-105)에서 같은 JSON을 맥으로 보냄. 고친 것은 프로젝트 JSON뿐이라 소재는 되돌려 보낼 필요가 없음.
3. 걸리는 것: 원본이 둘(맥·휴대폰)이 되어 어느 쪽이 새것인지 가르는 규칙이 필요함(`metadata.updatedAt`이 있음 — `project/types.ts`:26).

**맥에서 프로젝트를 '만들어 넣기'** — 브라우저 없이 된다 **[추측]**

- 저장 꼴이 그냥 JSON이라, 맥의 파이썬 스크립트가 `SerializedProject` 꼴의 JSON을 직접 써서 위 길의 서버 쪽에 두면 된다. 맞춰야 하는 것: `version: 31`(`services/storage/migrations/index.ts`:36), 시각은 정수 틱(1초 = 120,000 — `rust/crates/time/src/media_time.rs`:10), 조각마다 `params` 열쇠 이름(`params/registry.ts`:96-327).
- 코드가 보관되어 꼴이 더 바뀌지 않는다는 점은 여기서는 이점이다.
- 꼴이 틀리면 편집기가 어떻게 되는지(조용히 깨지는지, 알리는지)는 확인 못 함. 읽을 때 하는 검사는 '`metadata`가 객체인가'뿐 — `service.ts`:180-191.

### 3-4. 타입 정의 요약

**프로젝트** — `project/types.ts`

| 타입 | 필드 | 줄 |
|---|---|---|
| `TProject` | `metadata` · `scenes: TScene[]` · `currentSceneId` · `settings` · `version: number` · `timelineViewState?` | :44-51 |
| `TProjectMetadata` | `id` · `name` · `thumbnail?` · `duration`(틱) · `createdAt` · `updatedAt` | :20-27 |
| `TProjectSettings` | `fps: {numerator, denominator}` · `canvasSize: {width, height}` · `canvasSizeMode?: "preset"\|"custom"` · `lastCustomCanvasSize?` · `originalCanvasSize?` · `background` | :29-36 |
| `TBackground` | `{type:"color", color}` 또는 `{type:"blur", blurIntensity}` | :5-13 |
| `TTimelineViewState` | `zoomLevel` · `scrollLeft` · `playheadTime` | :38-42 |

- 새 프로젝트의 기본값: 30fps · **1920×1080(가로)** · 배경 단색 — `core/managers/project-manager.ts`:94-104 · `canvas/sizes.ts`:10 · `fps/defaults.ts`:3. 1080×1920은 고를 수 있는 기본 크기 넷 가운데 하나 — `canvas/sizes.ts`:3-8.

**장면 · 트랙** — `timeline/types.ts`

| 타입 | 필드 | 줄 |
|---|---|---|
| `TScene` | `id` · `name` · `isMain` · `tracks: SceneTracks` · `bookmarks: Bookmark[]` · `createdAt` · `updatedAt` | :19-27 |
| `SceneTracks` | `overlay: OverlayTrack[]`(위에 겹치는 트랙들) · `main: VideoTrack`(기본 트랙 하나) · `audio: AudioTrack[]` | :76-80 |
| `VideoTrack` | `id` · `name` · `type:"video"` · `elements: (VideoElement\|ImageElement)[]` · `muted` · `hidden` | :36-41 |
| `TextTrack` | `id` · `name` · `type:"text"` · `elements: TextElement[]` · `hidden` | :43-47 |
| `AudioTrack` | `id` · `name` · `type:"audio"` · `elements: AudioElement[]` · `muted` | :49-53 |
| `GraphicTrack` · `EffectTrack` | 스티커/도형 · 효과용 | :55-65 |
| `Bookmark` | `time` · `note?` · `color?` · `duration?` | :12-17 |

- 여기서 '장면(scene)'은 **타임라인 한 벌**이다(프로젝트 안의 따로 된 편집본). 우리가 말하는 '장면(컷)'은 OpenCut에서는 기본 트랙 위의 **조각 하나**에 해당한다. 말이 겹치니 설계에서 갈라 불러야 한다.
- 그리는 순서: `overlay`를 뒤집어 아래에서 위로, 기본 트랙이 맨 아래 — `services/renderer/scene-builder.ts`:237-241.

**조각** — `timeline/types.ts`

| 타입 | 필드 | 줄 |
|---|---|---|
| 모든 조각의 바탕 | `id` · `name` · `duration` · `startTime` · `trimStart` · `trimEnd` · `sourceDuration?` · `animations?` · `params: Record<string, number\|string\|boolean>` (시각은 모두 틱) | :105-115 |
| `VideoElement` | 바탕 + `type:"video"` · `mediaId` · `isSourceAudioEnabled?` · `hidden?` · `retime?` · `effects?` · `masks?` | :117-125 |
| `ImageElement` | 바탕 + `type:"image"` · `mediaId` · `hidden?` · `effects?` · `masks?` | :127-133 |
| `TextElement` | 바탕 + `type:"text"` · `hidden?` · `effects?` — **글·글꼴·색은 모두 `params` 안** | :135-139 |
| `AudioElement` | 바탕 + `type:"audio"` · `retime?` · (`sourceType:"upload"` + `mediaId`) 또는 (`sourceType:"library"` + `sourceUrl`) | :87-103 |
| `RetimeConfig` | `rate` · `maintainPitch?` | :82-85 |

**`params`에 들어가는 열쇠** — `params/registry.ts`

| 대상 | 열쇠 | 줄 |
|---|---|---|
| 보이는 조각 모두 | `transform.positionX/Y` · `transform.scaleX/Y` · `transform.rotate` · `opacity` · `blendMode` | :96-155 |
| 소리(영상 포함) | `volume`(dB, -60~+20) · `muted` | :157-174 · `timeline/audio-constants.ts`:1-2 |
| 글자 | `content` · `fontFamily` · `fontSize` · `color` · `textAlign` · `fontWeight`(normal/bold) · `fontStyle` · `textDecoration` · `letterSpacing` · `lineHeight` · `background.enabled/color/cornerRadius/paddingX/paddingY/offsetX/offsetY` | :176-327 |

- 글자 조각의 기본값 한 벌: `timeline/defaults.ts`:31-64.

**소재** — `services/storage/types.ts`:17-30 · `media/types.ts`:5-9

- `MediaAssetData`: `id` · `name` · `type`(image/video/audio) · `size` · `lastModified` · `width?` · `height?` · `duration?` · `fps?` · `hasAudio?` · `ephemeral?` · `thumbnailUrl?`. 메모리에서는 여기에 `file: File` · `url?`이 붙는다.

---

## 4. 자막 테두리

### 4-1. 글자를 그리는 자리

흐름: `resolveTextNode`(`services/renderer/resolve.ts`:315-377 — 색·크기·자리 값을 그 순간 값으로 풂) → `collectTextNode`(`services/renderer/compositor/frame-descriptor.ts`:279-321 — 화면 크기의 2D 캔버스 한 장에 그리게 예약) → `renderTextToContext`(`services/renderer/nodes/text-node.ts`:28-61 — 자리·크기·돌림 적용) → **`drawMeasuredTextLayout`**(`text/primitives.ts`:141-213 — 배경 상자를 그리고 줄마다 `ctx.fillText`, :202).

- 지금 글자에 줄 수 있는 것은 색과 배경 상자뿐이다. 글자 설정 목록에 테두리·그림자가 없다 — `params/registry.ts`:176-327. 캔버스의 그림자 기능(`shadowBlur` 등)은 소스 전체에서 0건(grep).

### 4-2. 반쯤 되어 있는 것 — 어제 글에 없던 발견

- **테두리 그리는 함수가 이미 있다:** `strokeMeasuredTextLayout` — `text/primitives.ts`:215-241. 줄마다 `ctx.strokeText`를 부르고(:239) 모서리를 둥글게 잡는다(:233-234).
- 다만 이 함수를 쓰는 곳은 **'글자 모양 마스크'** 하나뿐이다 — `masks/builtin/definitions/text.ts`:414. 글자 조각을 그리는 길에는 연결돼 있지 않다.
- 도형에는 테두리 설정이 따로 있다 — `graphics/stroke.ts`:40-102(안쪽·바깥쪽·가운데 맞춤). 설정 묶음 이름에도 `"stroke"`가 이미 있다 — `params/index.ts`:7.

### 4-3. 테두리·그림자를 더하려면 [추측]

| # | 고칠 곳 | 할 일 |
|---|---|---|
| 1 | `params/registry.ts`:176-327 | 글자 설정에 `stroke.enabled` · `stroke.color` · `stroke.width` · `shadow.color/blur/offsetX/offsetY`를 더함 |
| 2 | `timeline/defaults.ts`:38-63 | 기본값을 더함(자막의 기본을 '흰 글씨 + 검은 테두리'로) |
| 3 | `text/measure-element.ts`:132-225 | `params`에서 새 값을 읽어 재는 결과에 실음. 고르는 테두리 상자(`visualRect`)에 테두리 두께를 보탬 |
| 4 | `text/primitives.ts`:200-212 · `services/renderer/nodes/text-node.ts`:51-58 | `fillText` 앞에 `strokeText`를 먼저 부름(있는 함수를 다시 씀). 그림자는 `ctx.shadow*`를 켬 |
| 5 | 속성 칸 | 따로 손댈 것이 거의 없을 것 — 설정 목록에서 칸이 저절로 만들어지는 꼴(`components/editor/panels/properties/components/element-params-tab.tsx` · `property-param-field.tsx`). 직접 확인은 못 함 |
| 6 | `subtitles/build-subtitle-text-element.ts`:316-346 · `subtitles/ass.ts`:255, 442 | 자막 파일(ASS)의 테두리 값을 버리지 않고 옮김 — 우리는 자막 파일을 쓰지 않으면 건너뜀 |

- 다시 그리기는 저절로 된다: 글자 그림의 캐시 열쇠가 `params` 전체를 글로 만든 것이라(`frame-descriptor.ts`:302-305) 새 값이 바뀌면 다시 그린다.
- 미리보기 위에서 글을 직접 고치는 덧판(`preview/components/text-edit-overlay.tsx`)은 따로 그리므로 고치는 동안에는 테두리가 안 보일 수 있다 **[추측]**.
- **크기: 작음.** 테두리만이면 하루 안쪽, 그림자·속성 칸 다듬기까지 하루 남짓.
- 품질 물음: 캔버스 `strokeText`는 글자 줄기의 **안팎 양쪽**으로 번진다. 지금 릴스처럼 '바깥쪽만 두꺼운 테두리'로 보이게 하려면 테두리를 먼저 굵게 그리고 그 위에 글자를 덮어 그리면 된다(4번의 순서가 그것). 캡컷 결과와 같아 보이는지는 나란히 봐야 안다.

### 4-4. 글꼴을 파일로 넣어 쓰는 길

- 지금: 글꼴 이름을 캔버스에 `"이름", sans-serif`로 넘긴다 — `text/primitives.ts`:60-72. 시스템 글꼴 아홉 가지(`fonts/system-fonts.ts`:1-11)가 아니면 구글 폰트에서 CSS를 받아 온다 — `fonts/google-fonts.ts`:55-79, 81-88.
- 글꼴 파일을 올려 쓰는 기능은 없다: `FontFace` · `@font-face` · `.woff` · `.ttf` 모두 0건(grep). 타입에 `category: "custom"`이라는 자리만 있고(`fonts/types.ts`:4) 쓰는 곳이 없다.
- **넣는 길 [추측]** (크기 작음):
  1. 글꼴 파일을 정적 파일로 두고 `@font-face`(또는 `new FontFace(…)` + `document.fonts.add`)로 한 이름에 묶음.
  2. 그 이름을 `fonts/system-fonts.ts`의 목록에 더함 → 구글로 가지 않음(`google-fonts.ts`:86이 이 목록으로 가름).
  3. 그리기 전에 글꼴이 다 실렸는지 기다림 — 지금도 `document.fonts.load`로 기다리는 꼴이 있음(`google-fonts.ts`:73-77). 프로젝트를 열 때의 `loadFonts`(`core/managers/project-manager.ts`:159-167)에 같은 기다림을 넣음.
  4. 글꼴 고르는 창(`components/ui/font-picker.tsx`)에 이름을 보이게 함.
- **꼭 해야 하는 까닭:** 기본 글꼴이 `Arial`이다(`timeline/defaults.ts`:41). Arial에는 한글이 없어 뒤의 `sans-serif`로 넘어가고, 그러면 **기기마다 다른 한글 글꼴**이 쓰인다 — 아이폰의 미리보기와 맥에서 뽑은 영상의 글자 모양·너비가 달라진다 **[추측]**. 글꼴 파일을 하나 정해 양쪽에 같이 싣는 것이 답이다.

### 4-5. 한국어 글자 줄바꿈

- **글자 조각 자체는 저절로 줄을 바꾸지 않는다.** 글을 `\n`으로만 나눈다 — `text/primitives.ts`:116. 너비 상자라는 것이 없다(`maxWidth`는 잰 결과일 뿐 — `text/layout.ts`:58-76).
- 줄바꿈은 **자막을 넣는 순간 한 번** 한다: 띄어쓰기로 낱말을 나눠, 화면 너비의 80%를 넘으면 `\n`을 글 속에 박아 넣는다 — `subtitles/build-subtitle-text-element.ts`:19(0.8) · :45-85(`split(/\s+/)`, :65).
- 한국어에 비추면:
  - 띄어쓰기(어절) 단위로 끊기므로 낱말 한가운데서 끊기지 않는다 — 한국어 자막에는 오히려 맞는 꼴.
  - 띄어쓰기 없는 긴 덩어리는 끊지 못해 화면 밖으로 나갈 수 있다(:66-78에 글자 단위로 끊는 길 없음).
  - **휴대폰에서 글을 고친 뒤에는 다시 줄을 바꿔 주지 않는다.** 길어지면 한 줄로 길게 나간다 → 고친 뒤 다시 감싸 주는 일을 우리가 붙여야 한다(크기 작음: 같은 함수를 고칠 때 다시 부르면 됨. 다만 그 함수는 파일 밖으로 내놓지 않은 안쪽 함수라 꺼내야 함 — :45).
  - 줄바꿈 자리는 **잴 때 쓴 글꼴의 너비**로 정해진다(:35-43). 글꼴이 기기마다 다르면 줄바꿈 자리도 달라진다 — 4-4와 같은 까닭으로 글꼴을 묶어야 한다.
- 자막의 기본 꼴: 글꼴 Arial · 크기 5(화면 높이의 5/90) · 흰색 · 굵게 · 아래에서 5% 띄움 — `build-subtitle-text-element.ts`:19-21, 143-153. 글자 크기 셈: `fontSize × (화면 높이 ÷ 90)` — `text/primitives.ts`:81-82 · `text/typography.ts`:9.

---

## 5. 영상 뽑기

### 5-1. 흐름 — 어느 함수부터 어느 함수까지

1. 단추: `ExportButton`의 `handleExport` — `components/editor/export-button.tsx`:114-124. 넘기는 것은 형식·품질·fps·소리 넣기.
2. `ProjectManager.export({ options })` — `core/managers/project-manager.ts`:212-234. 진행 상태를 적고 다음을 부름. **결과(`ExportResult`: `success` · `buffer` · `error` · `cancelled`)를 그대로 돌려준다.**
3. `RendererManager.exportProject(…)` — `core/managers/renderer-manager.ts`:141-240.
   - 지금 열린 장면의 트랙·소재·프로젝트를 읽음(:153-155), 길이 0이면 그만둠(:161-164).
   - 소리: `createTimelineAudioBuffer`(:172-176 → `media/audio.ts`:625-686) — 조각을 모두 모아 2채널 44,100Hz 한 덩어리로 섞고(`audio.ts`:30, 648-655), 높낮이를 지키며 속도 바꾼 조각은 따로 늘려서(:660-672), 끝에 리미터(`media/audio-mastering.ts`:38-45, 55-64).
   - 그림: `buildScene`(:179-185 → `services/renderer/scene-builder.ts`:226-273) — 트랙을 그릴 마디 나무로 바꿈.
   - `new SceneExporter({ width, height, fps, format, quality, … })`(:187-195).
4. `SceneExporter.export({ rootNode })` — `services/renderer/scene-exporter.ts`:82-170.
   - 프레임 수 = 길이 ÷ 프레임당 틱(:89-92).
   - 그릇: MP4 또는 WebM, **기억 속에 통째로**(`BufferTarget`) — :94-100.
   - 영상 줄: 합성기의 출력 캔버스를 소스로, 코덱 `avc`(MP4) 또는 `vp9`(WebM) — :102-107.
   - 소리 줄: MP4면 `aac`, 브라우저가 AAC를 못 만들면 `opus`로 바꿈 — :109-128.
   - 프레임마다: `CanvasRenderer.render({ node, time })`(:146) → 캔버스를 한 장 더함(:147) → 진행률 알림(:149).
   - 마무리(:158-159)하고 바이트 덩어리를 돌려줌(:162-169).
5. 프레임 하나를 그리는 속: `services/renderer/canvas-renderer.ts`:53-74 — 값 풀기(`resolveRenderTree`) → 그릴 목록 만들기(`buildFrameDescriptor`) → 합성기에 그림 올리기(`wasmCompositor.syncTextures`) → 합성(`wasmCompositor.render` → Rust `render_frame` — `rust/wasm/src/compositor.rs`:154-219).
6. 내려받기: 단추 쪽이 받은 덩어리로 `<a download>`를 만들어 누름 — `export-button.tsx`:131-136 → `export/index.ts`:52-70.

→ **내려받기 링크는 6번(단추 쪽)에만 있다.** 2번까지만 부르면 링크 없이 바이트 덩어리를 손에 쥔다. 어제 글이 "마지막에 내려받기 링크를 만듦"이라 적은 것은 단추를 눌렀을 때의 이야기다.

### 5-2. 1080×1920 · 30fps · H.264 MP4 · AAC로 정할 수 있나

| 바라는 것 | 되는가 | 근거 |
|---|---|---|
| 1080×1920 | ○ — 프로젝트 설정의 `canvasSize`를 그대로 씀. 내보낼 때 따로 고르는 칸은 없음 | `renderer-manager.ts`:167, 188-189 · `canvas/sizes.ts`:5 |
| 30fps | ○ — 넘긴 `fps`, 없으면 프로젝트 설정. 기본이 30 | `renderer-manager.ts`:166 · `fps/defaults.ts`:3 |
| H.264 | ○ — MP4면 `avc`로 못 박힘 | `scene-exporter.ts`:103 |
| MP4 | ○ — 기본 형식 | `export/defaults.ts`:3-7 |
| AAC | △ — 브라우저가 지원한다고 답할 때만 AAC, 아니면 **MP4 안에 Opus**가 들어감 | `scene-exporter.ts`:111-121 |
| 비트레이트 | △ — 숫자로 못 정함. 품질 네 단계(low · medium · high · very_high)뿐이고 실제 값은 mediabunny가 정함(값은 확인 못 함). 소리 비트레이트도 같은 단계를 씀 | `scene-exporter.ts`:33-38, 104, 123-126 · `export/index.ts`:4-9 |
| 소리 표본율 · 채널 | 44,100Hz · 2채널로 못 박힘 | `media/audio.ts`:30, 648 |
| 프로파일 · 키프레임 간격 등 | ✗ — 정하는 자리가 없음. 인스타그램이 바라는 값과 맞는지는 뽑아 봐야 앎 | `scene-exporter.ts`:102-105에 두 값뿐 |

- **조심할 것:** 타임라인에 **처음 넣는 영상·사진이 프로젝트 크기와 fps를 그 소재의 것으로 바꾼다** — `commands/timeline/element/insert-element.ts`:80-111. 소재가 4K이거나 60fps이면 프로젝트가 따라간다. 소재를 넣기만 해도 fps를 끌어올리는 길이 하나 더 있다 — `core/managers/media-manager.ts`:34-36. 코드로 만들 때는 조각을 다 넣은 **뒤에** 크기와 fps를 다시 정하거나, 프로젝트 JSON을 직접 써야 한다.

### 5-3. 코드가 요구하는 브라우저 기능

| 기능 | 어디서 | 없으면 |
|---|---|---|
| WebCodecs `AudioEncoder` | 코드가 직접 물어봄 — `scene-exporter.ts`:113-114 | AAC 대신 Opus |
| WebCodecs 영상 인코더 | mediabunny `CanvasSource` 속 — `scene-exporter.ts`:102. mediabunny 속은 확인 못 함(꾸러미가 깔려 있지 않음) | 못 뽑음 **[추측]** |
| WebCodecs 영상·소리 디코더 | mediabunny `CanvasSink` · `VideoSampleSink` · `AudioBufferSink` — `services/video-cache/service.ts`:5, 281 · `media/mediabunny.ts`:5, 49 · `media/audio.ts`:274 | 영상이 안 보임 · 영상 속 소리를 못 꺼냄 **[추측]** |
| `OffscreenCanvas` | 조건 없이 만듦 — `services/renderer/canvas-utils.ts`:11. 합성기에 올리는 그림도 이것이어야 함 — `services/renderer/compositor/wasm-compositor.ts`:194-197, 215-219 · `rust/wasm/src/compositor.rs`:224, 236 | 오류를 던짐 |
| WebGPU 또는 WebGL | Rust의 wgpu — `rust/crates/gpu/src/context.rs`:200-210, 230-259 · `rust/crates/gpu/Cargo.toml`(`wgpu/webgl`) | 합성 못 함 |
| WASM | `opencut-wasm` — 합성기와 시간 셈까지 여기서 가져옴(`wasm/media-time.ts`:1-11, 27) | 편집기가 아예 안 뜸 **[추측]** |
| `document`(DOM) | 합성기가 `<canvas>`를 만듦 — `rust/wasm/src/compositor.rs`:37-44 · `context.rs`:245-251. 자막 재기도 — `subtitles/build-subtitle-text-element.ts`:28-33 | **워커나 Node에서는 못 돎. 쪽(page)이 있어야 함** |
| OPFS(`getDirectory` · `createWritable`) | 소재 저장 — `services/storage/opfs-adapter.ts`:11, 39 | 소재를 못 넣음 |
| IndexedDB | 프로젝트 저장 — `services/storage/indexeddb-adapter.ts`:24 | 저장 못 함 |
| `AudioContext` · `OfflineAudioContext` | 소리 풀기·섞기·리미터 — `media/audio.ts`:44-54, 71, 312 · `media/audio-mastering.ts`:64 | 소리 없이 뽑힘 |
| 캔버스 `roundRect` · `letterSpacing` · `document.fonts` | 글자 — `text/primitives.ts`:188 · `text/layout.ts`:32-35(없으면 건너뜀) · `fonts/google-fonts.ts`:75 | 자잘함 |

### 5-4. 화면 없는 크롬에서 스크립트로 부를 들머리가 있나

- **지금은 없다.** 편집기 본체 `EditorCore`는 모듈 안의 하나뿐인 인스턴스이고(`core/index.ts`:18, 71-76), `window`에 내놓지 않는다. `window`에 붙는 것은 성능 재는 깃발 `__renderPerf`와 WASM 오류 글 `__wasmPanic`뿐 — `diagnostics/render-perf.ts`:5, 41 · `components/providers/editor-provider.tsx`:68-71.
- 주소 뒤에 붙여 시키는 길(쿼리 값), 쪽끼리 주고받는 길(`postMessage`), 명령줄 스크립트 모두 0건(grep). 워커는 자동 자막용 하나뿐 — `services/transcription/service.ts`:114.
- **뚫는 길 [추측]** (크기: 들머리만은 작음, 틀 전체는 중간):
  1. 편집기에 한 줄 — 예: `window.__editor = EditorCore.getInstance()` — 또는 '뽑기 전용 쪽'을 하나 더함.
  2. 화면 없는 크롬을 띄워 `…/editor/<번호>`를 열고, 프로젝트가 다 읽히기를 기다림(`editor.project.getIsLoading()` — `project-manager.ts`:628).
  3. 쪽 안에서 `await editor.project.export({ options: { format: "mp4", quality: "high", includeAudio: true } })`를 부름 → `buffer`를 쪽 안에서 맥 서버로 보냄(`fetch` POST).
  4. 그 전에 그 크롬의 저장소에 프로젝트와 소재가 들어 있어야 함 → 3번의 길 A·B가 먼저.
- 이것은 'AI가 화면을 보고 누르는 것'(컴퓨터 유즈)이 아니라 **정해진 함수를 부르는 것**이다. 같은 입력이면 같은 길을 탄다.
- **확인 못 한 것 — 모두 돌려 봐야 앎:**
  - 화면 없는 크롬에서 그리기 장치(WebGPU/WebGL)가 잡히는지, 잡히면 얼마나 빠른지.
  - H.264·AAC 인코더가 있는지 — 오픈소스 Chromium에는 없고 Google Chrome에는 있다고 알고 있음 **[추측]**. 자동화 도구가 딸려 주는 Chromium이 아니라 맥에 깔린 Chrome을 써야 할 수 있음.
  - 14초·420프레임을 뽑는 데 걸리는 시간. 프레임마다 영상을 풀고 그리고 올리는 꼴이라(5-1의 5) 실시간보다 느릴 수 있음.
  - 뽑은 MP4를 인스타그램이 그대로 받는지.

---

## 6. 코드로 편집 넣기

### 6-1. 들머리

- `const editor = EditorCore.getInstance()` — `core/index.ts`:71-76. 그 아래 `editor.project` · `editor.media` · `editor.timeline` · `editor.scenes` · `editor.playback` · `editor.command` · `editor.renderer` · `editor.selection`.
- 모든 고침은 명령 객체를 `editor.command.execute({ command })`에 넘기는 꼴이고, 되돌리기 기록에 쌓인다 — `core/managers/commands.ts`:21-37, 51-91. 여러 명령을 하나로 묶을 수 있다 — `commands/batch-command.ts`:3-4.
- 인자는 모두 **이름 붙은 객체 하나**(`{ … }`)로 넘긴다.

### 6-2. 명령 목록과 부르는 꼴

| 하려는 것 | 부르는 꼴 | 근거 |
|---|---|---|
| 새 프로젝트 | `await editor.project.createNewProject({ name })` → 프로젝트 번호 | `core/managers/project-manager.ts`:82-126 |
| 프로젝트 열기 | `await editor.project.loadProject({ id })` | :128-187 |
| 크기 · fps · 배경 정하기 | `await editor.project.updateSettings({ settings: { canvasSize: { width: 1080, height: 1920 }, fps: { numerator: 30, denominator: 1 } }, pushHistory: false })` | :486-502 · 쓰임새는 `commands/timeline/element/insert-element.ts`:94-109 |
| 소재 넣기 | `await editor.media.addMediaAsset({ projectId, asset: { name, type, file, url, width, height, duration, … } })` → `MediaAsset`(번호 포함) | `core/managers/media-manager.ts`:17-51 |
| 소재에서 조각 만들기 | `buildElementFromMedia({ … })`(영상·사진·소리를 종류에 맞게) | `timeline/element-utils.ts`:302-331, 221-300 |
| 조각 넣기 | `editor.timeline.insertElement({ element, placement })` — `placement`는 `{ mode: "explicit", trackId }` 또는 `{ mode: "auto", trackType?, insertIndex? }` | `core/managers/timeline-manager.ts`:86-89 · `insert-element.ts`:23-30 |
| 트랙 더하기 | `editor.timeline.addTrack({ type, index? })` → 트랙 번호 | `timeline-manager.ts`:75-79 |
| 자르기(앞뒤 덜어 내기) | `editor.timeline.updateElementTrim({ elementId, trimStart, trimEnd, startTime?, duration? })` | :91-132 |
| 나누기 | `editor.timeline.splitElements({ elements: [{ trackId, elementId }], splitTime, retainSide?: "both"\|"left"\|"right" })` | :187-203 |
| 순서 · 자리 바꾸기 | `editor.timeline.moveElements({ moves: [{ sourceTrackId, targetTrackId, elementId, newStartTime }] })` | :159-175 · `timeline/group-move/types.ts`:26-31 |
| 지우기 | `editor.timeline.deleteElements({ elements: [{ trackId, elementId }] })` | :252-259 |
| 속도 | `editor.timeline.updateElementRetime({ trackId, elementId, retime: { rate, maintainPitch } })` — 0.01~5배 | :134-157 · `retime/rate.ts`:1-3 |
| 음량 · 글 · 글꼴 · 자리 등 | `editor.timeline.updateElements({ updates: [{ trackId, elementId, patch: { params: { volume: -6 } } }] })` | :275-298 |
| 글자 넣기 | `buildTextElement({ … })` + `insertElement` | `timeline/element-utils.ts`:101-122 |
| 자막 여러 줄 한꺼번에 | `insertCaptionChunksAsTextTrack({ editor, captions })` — `captions`는 `{ text, startTime, duration(초), style? }[]`. 글자 트랙을 새로 하나 만들어 넣고 한 번에 되돌릴 수 있게 묶음 | `subtitles/insert.ts`:10-40 · `subtitles/types.ts`:44-46 · `transcription/types.ts`:43-47 |
| 트랙 소리 끄기 · 숨기기 | `editor.timeline.toggleTrackMute({ trackId })` · `toggleTrackVisibility({ trackId })` | `timeline-manager.ts`:177-185 |
| 복제 | `editor.timeline.duplicateElements({ … })` | :799-807 |
| 되돌리기 | `editor.command.undo()` · `redo()` | `commands.ts`:51-91 |
| 뽑기 | `await editor.project.export({ options })` | `project-manager.ts`:212-234 |
| 단추·단축키와 같은 동작 | `invokeAction("split")` 등 — 지금 고른 조각과 재생 머리에 대고 함 | `actions/registry.ts`:58-66 · `actions/definitions.ts`:24-151 |

- 기본 트랙의 규칙: 기본 트랙의 맨 앞 조각은 0초에 붙는다 — `timeline/placement/main-track.ts`:27-55.
- 조각이 하나도 없는 겹침·소리 트랙은 명령 뒤에 저절로 지워진다 — `core/index.ts`:49-67.

### 6-3. AI(서버 쪽 스크립트)가 장면표를 받아 프로젝트를 만들 수 있나

- **길 1 — 명령을 부름:** 된다. 다만 **쪽 안에서만** 된다. 명령들이 `EditorCore.getInstance()`를 직접 잡고(`insert-element.ts`:48), 본체가 WASM·IndexedDB·`document`를 쓴다. Node에서 그대로 들여와 돌리는 것은 안 될 것 **[추측]**. 그러니 '화면 없는 크롬 안에서 스크립트를 돌리는' 꼴(5-4)이 된다.
- **길 2 — 프로젝트 JSON을 직접 씀:** 브라우저 없이 된다 **[추측]** (3-3). 장면표 → `SerializedProject`로 바꾸는 파이썬 함수 하나면 된다. 기본 영상 한 조각 + 앞부분 반복(같은 소재를 `trimEnd`를 달리해 한 번 더) + 사진 조각들 + 소리 조각 둘 + 글자 조각들이라 꼴이 단순하다. 줄바꿈과 자막 자리(아래에서 5%)는 브라우저가 재서 정하던 것이라(`build-subtitle-text-element.ts`:255-314) 파이썬 쪽에서 스스로 정해 넣어야 한다 — 글자 너비를 재려면 같은 글꼴 파일을 파이썬에서도 읽어야 한다.
- **권고 [추측]:** 만드는 것은 길 2(맥의 파이썬), 고치는 것은 편집기 또는 작은 고침 화면, 뽑는 것은 길 1의 한 줄(`export`). 장면표(`scenes.json`)와 OpenCut 프로젝트 JSON 가운데 **어느 것을 원본으로 삼을지**를 먼저 정해야 한다 — 둘 다 원본이면 어긋난다.

---

## 7. 이 가게 릴스 꼴을 옛 판으로 나타낼 때

| 릴스의 꼴 | | 근거 · 덧붙임 |
|---|---|---|
| 세로 1080×1920 · 30fps | ○ | 기본 크기 넷 가운데 하나(`canvas/sizes.ts`:5), 기본 fps 30. 첫 소재가 크기·fps를 바꾸는 것만 조심(5-2) |
| 기본 영상 1개 | ○ | 기본 트랙의 `VideoElement` — `timeline/types.ts`:117-125 |
| 앞부분 반복 | ○ | 같은 `mediaId`를 가리키는 조각을 하나 더 두고 `trimStart`·`trimEnd`로 앞부분만 남김. '반복'이라는 기능이 따로 있는 것은 아님 |
| 사진 몇 장 | ○ | `ImageElement`. 기본은 화면 안에 다 들어오게 맞춤(여백이 생김 — `services/renderer/resolve.ts`:162-165). 꽉 채우려면 `transform.scaleX/Y`를 키워야 함 → △에 가까움 |
| 음악 1곡 | ○ | 소리 트랙의 `AudioElement`(`sourceType:"upload"`), 음량 dB |
| 목소리(밖에서 만든 소리 파일) | ○ | 소리 조각 하나 더. 목소리를 만드는 기능은 없음(grep `tts` 0건) — 밖에서 만든 것을 넣는 꼴이라 맞음 |
| 음악을 목소리 밑으로 낮추기 · 끝에서 줄이기 | △ | 조각마다 음량은 됨. 시간에 따라 바꾸는 것은 음량 키프레임으로 가능(`volume`은 키프레임을 막아 두지 않음 — `params/registry.ts`:158-166 · `timeline/components/audio-volume-line.tsx`). '페이드' 단추는 따로 없음. 실제로 어떻게 들리는지는 확인 못 함 |
| 자막 7~10줄, 한국어 | ○ | 글자 조각 7~10개 또는 `insertCaptionChunksAsTextTrack` 한 번. 줄바꿈은 4-5의 제약 |
| **흰 글씨에 검은 테두리** | **✗** | 글자 설정에 테두리 없음(`params/registry.ts`:176-327). 4-3대로 고치면 ○ (작음) |
| 글꼴(지금 쓰는 것과 같게) | △ | 구글 폰트에 있는 글꼴이면 인터넷으로 받아 씀. 파일로 넣는 길은 4-4대로 만들어야 함 |
| 고정 글자 2~3개("얼굴 : AI 합성" 포함) | ○ | 처음부터 끝까지 걸친 글자 조각. 자리는 `transform.positionX/Y`. 테두리는 위와 같음 |
| 효과 · 전환 없음 | ○ | 쓰지 않으면 됨 |
| 속도 바꾸기 | ○ | `retime.rate` 0.01~5배, 높낮이 유지 고름 — `retime/rate.ts`:1-3 |
| 소리 크기 | ○ | -60~+20 dB — `timeline/audio-constants.ts`:1-2 |
| 뽑은 것이 H.264 MP4 + AAC | △ | 5-2. AAC는 브라우저에 달림 |
| 화면 조작 없이 뽑기 | ✗ → 고치면 △ | 들머리가 없음(5-4). 뚫는 일은 작으나 실제로 도는지는 확인 못 함 |
| 아이폰에서 고치기 | ✗ | 2번 전체 |
| 편집 상태를 맥에 남기기 | ✗ → 고치면 ○ | 지금은 브라우저 안에만(3-1). 3-3대로 고치면 됨 |

---

## 8. 어제 글의 [전해 들음] 주장 확인

| # | 어제 글의 주장 | | 코드에서 본 것 |
|---|---|---|---|
| 1 | 편집기는 위쪽에 소재 25% · 미리보기 50% · 속성 25%, 아래쪽에 타임라인 | ✔ | `panels/layout.ts`:3-7 · `app/editor/[project_id]/page.tsx`:129-207 |
| 2 | 프로젝트는 브라우저 안(IndexedDB), 소재도 브라우저 안(OPFS). 서버에 저장하지 않음. 파일로 내보내고 들이는 기능 없음 | ✔ | 줄은 `services/storage/service.ts`:60-79, 93-103(어제 적은 62-72는 그 일부). 내보내기·들이기는 grep 0건 |
| 3 | 글자·사진·영상 한 장을 캔버스에 그린 뒤 Rust(WASM) 합성기로 넘김 | ✔ | `services/renderer/canvas-renderer.ts`:53-74 · `services/renderer/compositor/wasm-compositor.ts`:72-97 |
| 4 | 모든 소리 조각을 하나로 섞음. 조각마다 음량(dB), 속도(높낮이 유지 가능), 끝에 리미터 | ✔ | `media/audio.ts`:625-686 · `params/registry.ts`:157-166 · `media/audio-mastering.ts`:38-45 |
| 5 | Postgres·Redis는 로그인·피드백·소리 검색용. 편집기는 로그인 없이 돎. 다만 환경 값이 모두 있어야 켜짐 | ✔ (덧붙임 있음) | 검사하는 줄은 `env/web.ts`:30(어제 적은 :28은 타입 줄). **값의 꼴만 맞으면 되고 실제 DB·Redis는 없어도 됨** — 1번 |
| 6 | 내보내기는 열린 브라우저 쪽에서만 돎 — 합성기가 `document`를 요구(`compositor.rs`:37-42), 마지막에 내려받기 링크(`export/index.ts`:52-70) | ✔ (덧붙임 있음) | 두 자리 모두 맞음. 다만 링크는 단추 쪽에서만 만들고, `ProjectManager.export()`는 바이트 덩어리를 돌려줌 — 5-1 |
| 7 | 글꼴은 구글 폰트를 인터넷에서 받음. 글꼴 파일을 올려 쓰는 기능 없음 | ✔ | `fonts/google-fonts.ts`:4, 64 · `FontFace` 등 grep 0건 |
| 8 | 프로젝트를 파일로 넣을 길이 없음 | ✔ (덧붙임 있음) | 기능은 없음. 다만 저장 꼴이 JSON이라 저장 층으로 넣는 길은 만들 수 있음 — 3-3 |
| 9 | 편집기의 모든 조작이 명령으로 되어 있어 코드로 부를 수 있음 | ✔ | `core/managers/timeline-manager.ts`:75-298 · `subtitles/insert.ts`:10-40 |
| 10 | 프로젝트의 꼴이 글로 정의됨(장면 → 트랙 → 조각, 조각마다 시작·길이·자름·속도·음량) | ✔ (바로잡음 하나) | `timeline/types.ts`:19-125. **음량은 조각의 필드가 아니라 `params.volume`** — `params/registry.ts`:158-166 |
| 11 | 머리의 피드백 단추: 글 한 칸을 보내면 서버에 쌓임 | ✔ | `app/api/feedback/route.ts`:13-31 · `feedback/components/feedback-popover.tsx`:64. DB와 Redis가 있어야 돎 |

**어제 ✔로 적었던 것 가운데 바로잡을 것**

| 어제 글 | | 바로잡음 |
|---|---|---|
| "소리는 AAC 192k" | ✗ | 192,000은 **'AAC를 만들 수 있는가'를 물어볼 때** 쓰는 값일 뿐이다(`scene-exporter.ts`:113-119). 실제 소리 비트레이트는 품질 단계에서 온다(:123-126). 값은 확인 못 함 |
| "자막에 테두리를 못 넣음 — 그리는 코드를 고쳐야 함" | ✔ (덧붙임) | 글자 조각에 못 넣는 것은 맞음. 다만 테두리 그리는 함수는 이미 있어(`text/primitives.ts`:215-241) 고칠 일이 작음 |
| "명령줄도, 서버 주소도, 스크립트도 없음" | ✔ (덧붙임) | 맞음. 다만 들머리 한 줄이면 스크립트로 부를 수 있는 꼴임 — 5-4 |

---

## 9. 포함하려면 꼭 해야 하는 일

### 9-1. 목록

| # | 일 | 크기 | 왜 꼭인가 |
|---|---|---|---|
| 1 | 포크를 뜨고 덜어 내기(로그인·DB·블로그·분석·봇 가림·소리 찾기·자동 자막), 환경 값 검사 걷기 | 작음~중간 | 가게 안에서만 도는 것에 바깥 연결과 가짜 값이 붙어 있으면 안 됨 |
| 2 | 빌드가 통과하는지 확인하고 막히는 곳 고치기(1번의 '의심되는 곳') | 작음(막히지 않으면 0) | 첫 관문 |
| 3 | 맥이 HTTPS로 내주게 하기(아이폰이 믿는 인증서) | 작음~중간 | 아이폰에서 저장·뽑기 기능이 열리는 조건 **[추측]** |
| 4 | 저장을 맥으로 돌리기(3-3의 길 A 또는 B) + 파이썬 서버에 주소 더하기 | 중간 | '편집 상태를 맥에 남긴다'의 본체. 이것이 없으면 맥과 휴대폰이 서로의 프로젝트를 못 봄 |
| 5 | 장면표 → 프로젝트 JSON 만드는 파이썬 함수(크기·fps를 1080×1920·30으로 못 박음) | 중간 | 맥이 릴스를 '만들어 넣는' 길 |
| 6 | 자막 테두리(+그림자) | 작음 | 지금 릴스의 기본 모양 |
| 7 | 글꼴 파일을 묶어 싣기 + 구글로 나가지 않게 하기 | 작음 | 휴대폰 미리보기와 맥에서 뽑은 것의 글자가 같아야 함 |
| 8 | 글을 고친 뒤 다시 줄바꿈 | 작음 | 휴대폰에서 자막을 길게 고치면 화면 밖으로 나감 |
| 9 | 뽑기 들머리 뚫기 + 화면 없는 크롬을 모는 스크립트 | 중간 | '화면 조작 없이 뽑기' |
| 10 | 휴대폰 화면: (가) OpenCut 화면을 고침 — 배치 다시 짜기(중간) + 타임라인을 손가락용으로(큼) + 되돌리기 단추 등(작음), 또는 (나) 작은 고침 화면을 따로 짬(중간) | **큼** 또는 중간 | 지금 화면은 440px에서 못 씀 |
| 11 | 아이폰 실기기 확인(소재 저장·미리보기·소리·기억) | 모름 | 2-8의 것들이 하나라도 막히면 10번의 (가)가 통째로 흔들림 |
| 12 | 화면 글을 한국어로 | 중간 | 편집기 글이 영어로 코드에 박혀 있음(예: `components/editor/mobile-gate.tsx`:52-57 · `components/editor/export-button.tsx`:83). 옮김 틀(i18n)이 있는지는 따로 찾아보지 않음 — 확인 못 함 |

- 먼저 할 순서 **[추측]**: 2 → 11(실기기에서 '그대로' 띄워 보기 — 값싸게 가장 큰 위험을 먼저 봄) → 9의 뽑기 한 번(맥에서) → 6 · 7 → 4 · 5 → 10.

### 9-2. 가장 위험한 것 셋

1. **아이폰에서 엔진이 도는지 아무도 모른다.** 저장(OPFS 쓰기), 미리보기(영상 디코더 + WebGPU/WebGL + 매 프레임 1080×1920), 소리가 모두 최신 브라우저 기능과 HTTPS에 기댄다. 만든 쪽도 "Desktop only", "open OpenCut in Chrome"이라고 적어 두었다(`mobile-gate.tsx`:52-57 · `page.tsx`:67). 여기서 막히면 휴대폰 쪽 일(10번의 가)을 해도 쓸 수 없다. **값싸게 먼저 확인할 수 있는 위험이기도 하다** — 맥에서 그대로 띄워 아이폰으로 열어 보면 된다.
2. **타임라인을 손가락용으로 바꾸는 일의 크기.** 열두 파일에 걸친 mouse 이벤트 130곳을 바꾸는 데서 끝나지 않고, 300px 너비에서 25px 높이의 조각을 끌고 끝을 잡는 조작 자체를 새로 정해야 한다. 고친 뒤에도 쓰기 편할지는 만들어 봐야 안다.
3. **멈춘 코드를 통째로 들고 가는 부담과, 화면 없는 뽑기가 실제로 되는지.** 소스 650개 남짓의 보관된 코드를 포크해 우리가 고쳐 나가야 하고, 만든 쪽이 "다시 짜는 중"이라던 미리보기·내보내기 부분이 바로 우리가 기대는 부분이다(`README.md`:144). 화면 없는 크롬에서 H.264·AAC가 나오는지, 얼마나 걸리는지, 인스타그램이 받는지는 돌려 보기 전에는 모른다.

### 9-3. 정해 주실 것

1. **'포함한다'의 범위:** (가) OpenCut의 편집 화면을 휴대폰에서 그대로 쓰는 것까지인가, (나) OpenCut의 프로젝트 꼴과 엔진을 쓰되 휴대폰에는 작은 고침 화면을 두는 것도 되는가. 일의 크기가 여기서 갈린다(9-1의 10번).
2. **원본을 무엇으로 삼나:** 우리 장면표인가, OpenCut 프로젝트 JSON인가(6-3).
3. **아이폰에 인증서를 넣어도 되는가**(HTTPS — 9-1의 3번).

---

## 10. 확인 못 한 것

- **돌려 본 것이 하나도 없음.** 빌드가 통과하는지, 가짜 환경 값으로 뜨는지, 편집기가 DB 없이 실제로 도는지.
- 아이폰 사파리에서의 모든 것(2-8) · HTTPS가 아닐 때 실제로 무엇이 막히는지.
- 화면 없는 크롬에서 뽑기가 도는지, 코덱·속도·결과물의 화질, 인스타그램이 받는지(5-4).
- mediabunny의 속: 품질 단계가 뜻하는 비트레이트, 어떤 WebCodecs 기능을 요구하는지(꾸러미가 깔려 있지 않음).
- 배포된 `opencut-wasm 0.2.10`이 이 저장소의 `rust/` 소스와 같은지.
- Next 16.1.3이 요구하는 Node 판 · 정적 뽑기(`output: "export"`)가 되는지 · iframe 안에서의 동작.
- `postgres(url)`이 부르는 순간 연결하는지(편집기 쪽에서는 불리지 않아 영향은 없을 것 **[추측]**).
- 속성 칸이 새 설정을 저절로 보여 주는지(4-3의 5번) · 오른쪽 누름 메뉴가 길게 누르기로 열리는지 · 화면 글 옮김 틀이 있는지.
- 꼴이 틀린 프로젝트 JSON을 넣었을 때 편집기가 어떻게 되는지.
- 캡컷으로 만든 것과 나란히 놓았을 때 같아 보이는지(테두리·글꼴·줄바꿈).
