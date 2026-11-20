# 우리 파이프라인이 OpenCut과 어떻게 맞물리는가 (연구 보조 보고)
- (RSCH가 붙임) 서브 에이전트가 쓴 글 그대로. RSCH가 받아 커밋한 때: 2026-11-20 09:14 KST. 근거 말씀: owner/utterances/2026-11-20.md 07:30:43 uuid 65e69ca8. 줄인 글은 studies/2026-11-20-opencut-in-webapp.md.

- 한 일의 범위: **읽기만 함.** 설치·실행 없음. 제품 저장소는 고치지 않았고 그 안에서 git 상태를 바꾸지 않았음. `data/`는 열지 않음.
- 읽은 것
  - 제품 저장소 main `0636fa0`(2026-11-12): `app/scripts/capcut_build.mjs`, `app/scripts/voice_fit.py`, `app/webapp/server.py`, `jobs.py`(머리말·작업·완성 검사·⑥ 확인·카드 부분), `reel_api.py`, `README.md`, `start.sh`, `launchd/`, `tailscale/`, `static/app.html`(찾기만), `app/vendor/capcut-mcp/src/core.js`, `agents/capcut/knowhow.md`, `agents/capcut/logs/2026-11-08_cloud-reels-analysis.md`, `agents/capcut/logs/2026-11-09_scenes-to-capcut.md`, `agents/pln/specs/2026-11-09_reel-automation.md`, `agents/pmo/knowhow.md`, `agents/pmo/logs/2026-11-09_reel-automation-v01.md`, `agents/pmo/logs/2026-11-09_tailscale-access.md`(일부)
  - OpenCut 옛 판 `apps/opencut-classic`(커밋 `cf5e79e`)에서 **타입·기본값 정의만**: `apps/web/src/timeline/types.ts`, `project/types.ts`, `services/storage/types.ts`, `media/types.ts`, `subtitles/types.ts`, `params/registry.ts`, `timeline/defaults.ts`, `export/index.ts`·`defaults.ts`, `fps/defaults.ts`, `text/typography.ts`·`background.ts`, `wasm/media-time.ts`(한 줄 찾기). 그리기·내보내기·저장 코드는 열지 않음(다른 보조 몫)
  - 다른 가지(`research/webapp-interview-20261119`)의 `docs/requirements-interview/2026-11-19/opencut-capcut-research.md`(338줄 전부) · `phase1-requirements.md`(100줄 전부) — `gh api`로 읽음
  - 어제 연구 `studies/2026-11-19-opencut.md` · `studies/2026-11-19-no-computer-use.md`
- 표시: 사실에는 `파일:줄`. **[추측]** 내 짐작. **[기억]** 일반 지식이라 이번에 따로 확인하지 않은 것. **[전해 들음]** 어제 연구 글이나 ChatGPT 글에만 있고 내가 코드에서 다시 보지 않은 것. 줄 번호 앞에 `GPT글`은 위 ChatGPT 조사 글, `1차요구`는 `phase1-requirements.md`.
- 덧붙임: `gh api`로 받은 글 둘을 읽으려고 시스템 임시 폴더에 잠깐 내려받았다가 읽은 뒤 지웠음. 남은 파일 없음.

## 결론 먼저

1. **지금 '참인 편집 상태'는 장면표가 아니라 CapCut 프로젝트입니다.** 장면표에는 장면·자막 글·시간·끝 문구만 있고, 목소리·음악은 CapCut 프로젝트 안에만 있습니다. 목소리 간격 맞추기가 자막 시간과 영상 길이를 바꿔도 장면표에는 되돌려 적지 않습니다(`voice_fit.py`:317-342, `jobs.py`에서 `scenes.json`은 :428 읽기뿐). OpenCut을 어떻게 붙이든 **먼저 장면표를 넓혀 참으로 만드는 일**이 필요합니다.
2. **서버에는 다른 앱을 끼울 자리가 없습니다.** 표준 파이썬 한 파일이 정해진 주소만 답하고(`server.py`:383-419), 정적 폴더·프록시·OPTIONS·CORS가 없으며, 영상은 `data/output` 바로 아래 것만 줍니다(:292-302). 편집기가 써야 할 원본 소재·목소리·음악을 주는 길이 없습니다. 주소도 http입니다(:674, :680).
3. **장면표의 꼴은 OpenCut 프로젝트 꼴로 거의 옮겨집니다**(장면 → 본 트랙의 조각, 자막 → 글자 조각, 음악·목소리 → 소리 조각). **갈 곳이 없는 것은 다섯:** 자막 테두리, 반복(`repeat_of`), 장면에 붙은 표시(`label`·`ai`), 자막과 목소리의 짝, 판 번호. 이 다섯은 OpenCut에 넣었다 빼면 사라지므로 맥 쪽에 남겨 두고 다시 입혀야 합니다.
4. **셋 가운데 우리 쪽이 가장 덜 바뀌고 쓰임 (가)(나)(다)를 모두 채우는 것은 (ㄷ)** — 장면표를 참으로 두고 편집 화면은 그것을 열어 고치기만 하는 길입니다. 다만 (ㄷ)에서는 편집 화면이 OpenCut 통째일 까닭이 약해집니다(고칠 것이 자막 글·장면 길이/순서/빼기·소리 셋뿐) **[추측]**.
5. 완성 영상을 누가 뽑든 `data/output/<작업>_v<N>.mp4`만 놓이면 ⑦ 확인·규격 검사·판 번호는 지금 코드 그대로 돕니다(`jobs.py`:566-631). 뽑는 쪽을 바꿔 끼우기 쉬운 이음매입니다.

---

## 1. 지금 영상이 만들어지는 길

### 1-1. 단계와 누가 하는지

| # | 단계 | 누가 | 근거 |
|---|---|---|---|
| ① Send | 운영자(휴대폰 웹앱) → `data/incoming/<날짜_시간>/` | `server.py`:508-523, :567-616 |
| ② Intake · ③ Script | Claude가 `intake.md`·`script.md` 작성 | `app/webapp/README.md`:11-14 |
| ④ Edit | Claude가 `scenes.json` 작성 → `node app/scripts/capcut_build.mjs data/working/<작업>` → CapCut 프로젝트 | `README.md`:15, `capcut_build.mjs`:1-10 |
| ⑤ Preview | 2단계(아직 없음) | `jobs.py`:86, :232 |
| ⑥ Voice → Music → Fit → Export | Voice·Music·Export는 Terra가 CapCut 화면에서, Fit은 웹앱이 `voice_fit.py`로 | `jobs.py`:23, `README.md`:18-25 |
| ⑦ Done | `data/output`에 파일이 생기면 웹앱이 찾아 '확인 필요' | `jobs.py`:566-631 |
| ⑧ Post | uploader가 캡션 준비, 운영자가 올림 | `README.md`:47-48 |

### 1-2. 장면표 `scenes.json`의 꼴 (필드 전부)

- **만드는 쪽:** Claude(`README.md`:15, `reel-automation.md`:118). `capcut_build.mjs`가 프로젝트 이름을 `project` 칸에 되적음(:269-270).
- **읽는 쪽:** ① `capcut_build.mjs`(전부) ② `jobs.py`:426-429(`project`·`capcut_project`만 — CapCut 프로젝트 이름) ③ `reel_api.py`:142 → `static/app.html`:562-563(Jobs ④ 화면에 `scenes[].start·end·role·ai·label`과 `project`를 표로 보임).
- 형식은 pmo가 제안하고 capcut이 받아들인 것(`agents/capcut/logs/2026-11-09_scenes-to-capcut.md`:26, `agents/pmo/logs/2026-11-09_reel-automation-v01.md`:33). 실제 파일은 `data/`에 있어 보지 않았고, 아래는 **코드가 읽는 칸**입니다.

| 자리 | 칸 | 뜻 | `capcut_build.mjs` 줄 |
|---|---|---|---|
| 맨 위 | `project` (`capcut_project`, `job`) | CapCut 프로젝트 이름. 없으면 `<작업>_v1` | :51 |
| | `canvas{width,height,fps}` 또는 `size[w,h]` + `fps` | 화면. 없으면 720×1280 · 30fps | :53 |
| | `length` | 목표 길이(초). 넘는 장면은 자르거나 뺌 | :179-181 |
| | `base_draft` | 빈 틀로 복제할 CapCut 프로젝트(기본 `0928`) | :46, :49 |
| | `text_template` | 글자 본보기 CapCut 프로젝트(기본 `1025`) | :70, :74 |
| | `scenes[]` | 장면들 | :144 |
| | `captions[]` | 자막들 | :189 |
| | `ending{on, lines[2]}` | 끝 문구 켬/끔과 두 줄 | :202-203 |
| 장면 | `file` | 소재 경로(저장소 뿌리 기준). HEIC는 `<작업>/media/`에 JPG 사본 | :124-134, :148 |
| | `kind` | `image`/`video`. 없으면 확장자로 | :142, :148 |
| | `n` | 장면 번호(오류 글에만 씀) | :150, :162 |
| | `start`, `end` | 타임라인 위 자리(초) — pmo 형식 | :158-160 |
| | `src_start`, `src_end` | 원본에서 쓰는 구간(초). `start/end`가 없으면 `src_end − src_start`가 길이 | :161, :176 |
| | `dur` | 사진 길이(초, 기본 2) | :161 |
| | `repeat_of[]` | 앞 장면들의 번호 — 그 장면들을 순서대로 다시 붙여 이 구간을 채움 | :163-175 |
| | `label` | 그 장면 내내 보일 표시 글(예: "○○ 전 머리") | :151 |
| | `ai` | 참이면 표시 글이 `얼굴 : AI 합성`으로 저절로 | :143, :151 |
| | `fit` | `fill`(기본, 화면 꽉 채움) 또는 그대로 | :152-153 |
| | `zoom` | 덧곱하는 배율 | :153 |
| | `pos[x,y]` | 자리 옮김 | :154, :232 |
| | `role` | 장면의 구실 이름. 반복으로 펼친 것은 `repeat`. 웹앱 화면 글에도 쓰임 | :171, :208, `app.html`:563 |
| 자막 | `n`, `text` | 번호, 글 | :189, :209 |
| | `start`, `end` | 자리(초). 하나라도 비면 글자 수 비례로 전체 길이(끝 0.2초 여유)에 나눔 | :190-193 |

- **장면표에 없는 것:** 목소리(누구·속도), 음악(곡·음량), 자막 모양(글꼴·크기·색·테두리·자리), 판 번호. 목소리·속도·음악·끝 문구·길이는 `options.json`에 '고른 글자'로 있고(`jobs.py`:100-114), 자막 모양은 코드와 본보기 프로젝트에 박혀 있음(아래 1-4).
- 장면끼리 겹치면 멈춤(:183-186). 원본보다 긴 구간을 쓰면 멈춤(:150).

### 1-3. `capcut_build.mjs`가 하는 일

1. `scenes.json`(+ 있으면 `options.json`) 읽기 — :39-43.
2. 글자 본보기(1025)를 CapCut 목록 또는 클라우드 미리받기에서 찾아, 그 안의 글자 조각 넷("예약은…", "미첼헤어폼", "…전 머리", "AI 합성")을 **조각 + 재료 + 딸린 재료 통째로** 떠 옴 — :68-104.
3. 장면 시간 계산: `repeat_of` 펼치기, 화면 꽉 채우기 배율(`max(소재비/화면비, 화면비/소재비)`), `ffprobe`로 소재 크기·길이 — :135-181.
4. 자막 시간 계산, 표시 글 묶기(이어지는 같은 표시는 한 조각으로) — :189-201.
5. `--dry-run`이면 계획만 내고 끝 — :205-213.
6. 같은 이름 프로젝트가 있으면 멈춤(기존 것은 고치지 않음), 진짜 폴더인데 CapCut이 켜져 있으면 멈춤 — :216-221.
7. 바탕 프로젝트(0928)를 빈 채로 복제 → 화면 크기·fps 넣기 → 영상 칸에 장면 넣기(`addVideo`/`addImage`) → 글자 칸 넷('자막'·'표시'·'끝 문구 예약'·'끝 문구 가게') 만들기 → 점검 → 저장 — :223-268. 소재 파일은 CapCut 프로젝트 폴더 안 `materials/<종류>/`로 **복사**됨(`core.js`:144-160).
8. `scenes.json`의 `project` 칸에 이름 적고 `jobs.py set <작업> edit done --note <이름>` — :269-272. 그러면 ⑥ 카드가 저절로 생김(`jobs.py`:266-277).
9. 결과는 `<작업>/edit_result.json`(연습이면 `edit_result.sandbox.json`) — :29-36.
10. **하지 않는 것:** 목소리·음악·내보내기 — :10.

### 1-4. 자막의 모양 — CapCut 프로젝트에 들어가는 값

| 항목 | 값 | 근거 |
|---|---|---|
| 바탕 | 1025의 "예약은…" 글자 조각을 복제한 뒤 아래를 덮어씀 | `capcut_build.mjs`:107-108 |
| 글꼴 | 코드에서 정하지 않음 — 본보기 재료에 든 것이 그대로 따라옴. 기록상 `DSDSRefinedLetterM` | `capcut_build.mjs`:107-118(글꼴 칸 없음), `agents/capcut/knowhow.md`:68, `reel-automation.md`:144 |
| 크기 | 재료 `font_size = 10`, `styles[0].size = 10` (CapCut 단위) | :109, :112 |
| 색 | `styles[0].fill` = 흰색 `[1,1,1]` | :113 |
| 테두리 | 재료 `border_color '#000000'`, `border_width 0.08`, `styles[0].strokes = [{width 0.08, 검정}]` | :109, :112 |
| 자리 | 조각 `clip.transform = {x:0, y:0.38}`(화면 가운데 조금 위), `clip.scale = 1.1` | :116 |
| 정렬 | 가운데(주석) — 본보기 값 그대로 | :106 |
| 겹 순서 | `render_index` 14000부터 | :237, :249 |
| 글자 넣기 | 재료 `content`(JSON 글자열)의 `text`를 바꾸고 `styles[].range`를 글 길이로 | :242 |

- 값의 단위(크기 10, 테두리 0.08, y 0.38)는 CapCut 안의 단위입니다. 화면 높이의 몇 %인지, 몇 픽셀인지는 코드에 없습니다 — **확인 못 함.** OpenCut이나 다른 그리기 도구로 같게 만들려면 완성 영상의 한 장면을 재서 맞춰야 합니다 **[추측]**.
- 글꼴 파일은 CapCut 캐시 폴더에 있음(`agents/capcut/knowhow.md`:23). CapCut 밖에서 써도 되는지는 확인 못 함(어제 연구와 같음).

### 1-5. 고정 글자

| 글자 | 어떻게 들어가나 | 근거 |
|---|---|---|
| `얼굴 : AI 합성` | 장면에 `ai: true`면 그 장면 길이만큼. 이어지는 장면은 한 조각으로 묶음. 반복으로 펼친 장면에도 따라감. 모양은 1025의 'AI 합성' 조각 그대로 | `capcut_build.mjs`:143, :151, :171, :196-201, :254-255 |
| `○○ 전 머리` | 장면의 `label`. 모양은 1025의 '전 머리' 조각 그대로 | :101, :200 |
| `예약은 네이버에서 검색하세요` | 끝 문구 첫 줄. **영상 처음부터 끝까지**(0 ~ 전체 길이). 기본 문구면 본보기의 줄바꿈 그대로 | :256-258 |
| `미첼헤어폼` | 끝 문구 둘째 줄. 처음부터 끝까지. 기록상 노란색·검은 테두리 | :259, `cloud-reels-analysis.md`:21 |

- AI 표시는 옵션이 아니라 '항상'(`reel-automation.md`:101, :145). 끝 문구는 옵션(켬/끔, `jobs.py`:108).

### 1-6. 목소리와 음악이 들어가는 꼴

- **둘 다 장면표에도 `capcut_build.mjs`에도 없습니다.** ⑥에서 Terra가 CapCut 화면으로 넣습니다: 자막 전체 선택 → '텍스트 읽기' → 목소리 고르기 → 속도 옵션값(`jobs.py`:1368-1387), 음악 한 곡을 영상 끝까지·목소리보다 작게(:1388-1397).
- CapCut 프로젝트 안의 꼴: 목소리는 `materials.audios` 가운데 `type = text_to_audio`(이름은 `tone_type`), 음악은 `type = music`(이름은 `name`) — `jobs.py`:432-458, `agents/pmo/knowhow.md`:27. 목소리 파일은 프로젝트 폴더의 `textReading/*.wav` — `pmo/knowhow.md`:31, `voice_fit.py`:145-150.
- **자막과 목소리의 짝:** 목소리 재료 `text_id` = 자막 글자 재료 id, 자막 재료 `text_to_audio_ids` = 목소리 조각 id — `agents/capcut/knowhow.md`:41, `voice_fit.py`:153-175. 목소리는 오디오 줄 여러 개에 나뉨(같은 줄).
- 서버가 파일로 확인하는 것: 자막마다 목소리 하나·속도 옵션값(`jobs.py`:776-794), 음악 조각 1개·끝 = 영상 끝(:797-808).

### 1-7. `voice_fit.py` (Fit 칸)

- 하는 일(머리말 :2-13): ① 목소리 파일마다 앞뒤 조용한 부분을 `ffmpeg silencedetect`(-40dB, 0.12초 이상)로 찾아 말 앞뒤 0.045초만 남기고 자름(:74-117) ② 첫 목소리 자리부터 차례로 붙임. 문장 사이 = (영상 길이 − 0.1초 − 목소리 합) ÷ (문장 수 − 1), 0~0.15초(:226-234) ③ 자막을 목소리 시작에 맞춤(마지막 자막은 목소리 끝 + 0.15초)(:257-262) ④ 안 들어가면 영상을 0.1초 단위로 최대 +1초 늘림 — 영상 끝에 닿은 조각(마지막 영상·음악·끝 문구)만(:230-244, :263-283) ⑤ 겹침 0 확인 뒤 저장(:357-386).
- 고치는 곳: CapCut 프로젝트의 `draft_info.json`·`.bak`·`template-2.tmp`·`template.json`(루트와 `Timelines/*/`)과 `draft_meta_info.json`(:43, :317-342). **`scenes.json`은 고치지 않음.**
- 속도는 0.1 단위로 되돌림(CapCut이 1.505처럼 바꿔 둔 것 → 1.5) — :223.
- 끝 코드: 0 성공 · 2 원고가 너무 김 · 3 CapCut 켜져 있음 · 4 그 밖(:19).
- **맞물림에서 뜻하는 것:** 이 로직의 입력은 'CapCut 프로젝트 파일'입니다. 다른 편집 상태(장면표나 OpenCut 프로젝트)에 쓰려면 계산 부분(`plan`, :210-286)은 그대로 쓸 수 있어도 읽고 쓰는 부분(`voices_and_captions`·`apply`·`save`)은 새로 써야 합니다 **[추측]**.

### 1-8. 내보낸 파일의 규격 검사

- 기준: `EXPORT = {"w": 1080, "h": 1920, "fps": 30}` — `jobs.py`:69. 운영자 결정(`reel-automation.md`:21).
- `check_output`(`jobs.py`:405-423): 확장자 `.mp4`인지, 크기가 1080×1920인지(회전 정보 반영, :378-380), fps가 30 ± 0.5인지, 소리 줄이 있는지(`has_audio`, :392-402).
- `.mov`면 다시 압축하지 않고 포장만 MP4로(`to_mp4`, :336-363), `.mov`는 남김.
- 덧붙는 검사: CapCut 프로젝트 파일 기준 목소리 겹침·끝 넘침(`voice_fit.check_project`, `jobs.py`:593-598), ⑥ 동안 작업 밖 파일이 바뀌었는지(:607-611).
- 기준과 달라도 ⑦은 '확인 필요'로 가고 이유를 붙임. 「승인」은 누를 수 있음(`README.md`:42).
- 코덱(H.264인지)·비트레이트·소리 코덱은 검사하지 않음(:366-389에 그런 항목 없음).
- 막 생긴 파일은 15초 지나야 봄(`OUTPUT_SETTLE`, :68, :580-581).

### 1-9. 판(v1 · v2…) 파일 이름 규칙

- 완성 영상: `data/output/<작업 번호>_v<N>.mp4`(또는 `.mov`) + 같은 이름 `.txt`(한국어 제목 한 줄) — `jobs.py`:18, :308, :312-328, `agents/capcut/knowhow.md`:24.
- 작업 번호 꼴: `날짜_시술-손님코드` — `JOB_RE`, `jobs.py`:80.
- 다음 판 번호 = 지금 있는 가장 큰 번호 + 1 — `jobs.py`:1400.
- 판 번호가 빠진 이름(`<작업>.mp4` · `<작업>(1).mp4` · `<작업>_v2(1).mp4`, `.mov` 포함)은 ⑥이 내보내기 차례 이후일 때 다음 판으로 이름을 바꿈. 덮어쓰지 않음 — :476-563.
- 새 판만 ⑦을 깨움: 「고칠 점」을 받으면 지금 것을 '이미 본 것'(`seen_output`)으로 적어 둠 — `reel_api.py`:223-229, `jobs.py`:575-577.
- **CapCut 프로젝트 이름은 따로 돎:** 같은 이름이 있으면 만들지 않으므로(`capcut_build.mjs`:216) 다시 만들 때는 새 이름으로(`agents/pmo/logs/2026-11-10_full-rehearsal.md`:31). 영상의 판 번호와 프로젝트 이름을 잇는 규칙은 코드에 없음.
- **장면표에는 판이 없음.** `scenes.json` 하나를 고쳐 씀. v1을 만든 장면표를 v2 뒤에 다시 볼 길이 없음(카드 백업은 CapCut 프로젝트의 백업).

### 1-10. 작업 폴더의 구조 (코드에서 읽음)

```
data/
  incoming/<날짜_시간>/            소재 원본 + request.txt(·request_2.txt…) + options.json   server.py:508-548
  working/<작업 번호>/
    status.json                    단계별 상태                         jobs.py:5
    options.json                   이 작업의 옵션                      jobs.py:6
    intake.md · script.md          접수 카드 · 원고                    jobs.py:7-8
    scenes.json                    장면표 + CapCut 프로젝트 이름        jobs.py:9
    edit_result.json               capcut_build 결과                  capcut_build.mjs:29
    media/                         HEIC → JPG 사본                    capcut_build.mjs:123-131
    handoff_chatgpt.md             ⑥ 지금 카드                        jobs.py:10
    chatgpt_result.txt             Terra 결과 줄(옛 것은 _<시각>.txt)   jobs.py:11, :1081
    voice_fit_done · voice_fit_stop                                  jobs.py:12
    capcut_backup_<시각>_<칸>/<프로젝트>/   카드마다 프로젝트 백업      jobs.py:1137-1152
    capcut_backup_<시각>_before_fit/        Fit 앞 백업               voice_fit.py:345-354
    outside_before.json            ⑥ 앞의 바깥 파일 목록               jobs.py:14
    feedback/<단계>_<날짜_시간>.txt 고칠 점                            reel_api.py:200-216
    posted.json                    올림 시각                          jobs.py:17
  working/_chatgpt_cards.md        모음 카드                          jobs.py:15
  working/_webapp/thumbs/          작은 그림                          server.py:73, :253-258
  working/_practice/               연습                               README.md:34
  output/<작업>_v<N>.mp4 + .txt    완성                               jobs.py:18
  output/_feedback/                결과 보기의 고칠 점                 server.py:72
  upload/<플랫폼>/<작업>.txt …     캡션                               jobs.py:25
```

- **CapCut 프로젝트 자체는 작업 폴더 밖**(맥의 CapCut 프로젝트 폴더)에 있습니다 — `jobs.py`:66-67. 작업 폴더에는 백업만.
- 목소리 파일도 작업 폴더가 아니라 CapCut 프로젝트 폴더 안(`textReading/`)에 있습니다(1-6).

---

## 2. 서버 쪽에서 OpenCut 편집기를 붙일 때 닿는 곳

### 2-1. 서버가 주는 것

- 표준 파이썬 3.9만 쓰는 `ThreadingHTTPServer` 한 파일 — `server.py`:4, :28, :619-629. 기본 포트 8765, 모든 주소에서 듣고 접속 허용 목록으로 거름 — :60-61, :88-101.
- **정적 파일:** `/`에서 로그인 여부에 따라 `static/app.html` 또는 `pin.html` **한 장만** 읽어 줌 — :395-398. 정적 폴더를 통째로 주는 길 없음. 아이콘·매니페스트는 코드가 만들어 줌 — :388-394.
- **주소 목록(GET):** `/api/status`, `/api/results`, `/thumb/…`, `/media/…`(:403-419), 그리고 `reel_api.handle_get`의 `/api/jobs`·`/api/job`·`/api/post`·`/api/options`·`/api/manual`·`/api/preflight`·`/jobthumb/…`(`reel_api.py`:274-305). 그 밖은 404(`server.py`:419).
- **영상 `/media/<이름>`:** `data/output` **바로 아래**의 `.mp4`·`.m4v`·`.mov`만 — `result_file`, :292-302. 범위 요청(Range)을 받아 206으로 1MB씩 — `send_media`, :421-466. `?download`면 내려받기 머리말 — :449-451.
- **원본 소재는 주지 않음.** 그 작업이 받은 소재의 360픽셀 작은 그림만 — `reel_api.py`:176-197. 편집기가 원본 영상·사진·목소리·음악을 읽을 주소가 없음.
- **받는 것:** POST는 JSON만, 64KB까지 — `read_json`, :357-361, :477-480. 파일은 `PUT /api/upload`로 `data/incoming/<받은 폴더>/`에만 — :567-616.
- 모든 답에 `Cache-Control: no-store`(영상·작은 그림만 예외) — :335.

### 2-2. 로그인과 헤더 검사

- **PIN 쿠키:** `mu=<만료>.<서명>`, 서명은 `만료:PIN`을 비밀 값으로 HMAC-SHA256 — :150-164. `Path=/; HttpOnly; SameSite=Strict`, 30일 — :502. `Secure` 표시는 없음(같은 줄).
- 모든 요청은 먼저 접속 주소 검사(`allowed_ip`: 이 맥·사설망·Tailscale 대역만) — :88-101, :363-370. PIN 5번 틀리면 10분 잠금 — :64-65, :167-189.
- **`X-Upload-App: 1` 헤더:** POST와 PUT에서만 검사 — `api_post_ok`, :372-377, :471, :569. 웹앱 쪽은 모든 요청에 붙임 — `app.html`:286, :422. 다른 사이트가 몰래 보내는 요청을 막는 장치(:373).
- `OPTIONS`를 받는 코드가 없고 CORS 머리말도 없음 — `server.py`에 `do_HEAD`·`do_GET`·`do_POST`·`do_PUT`뿐(:380, :383, :469, :567).

### 2-3. 같은 출처로 다른 앱을 끼울 자리가 있나

- **없습니다.** 프록시도, 하위 경로를 다른 프로그램에 넘기는 곳도 없습니다(2-1의 주소 목록이 전부).
- 끼우는 방법과 걸리는 것 **[추측 — 해 보지 않음]**:
  1. **다른 포트에 편집기를 따로 띄움:** 포트가 다르면 출처가 다릅니다 **[기억]**. 편집기 쪽에서 웹앱 API를 부르면 `X-Upload-App` 헤더 때문에 미리 묻기(OPTIONS)가 나가는데 서버가 답하지 못합니다(2-2). 편집기 포트는 PIN 검사·접속 주소 검사 밖에 놓입니다. 쿠키는 포트를 가리지 않고 같은 이름의 호스트로 가지만 **[기억]**, 편집기가 그것을 확인하려면 PIN·비밀 값을 나눠 가져야 합니다(:150-164).
  2. **`server.py`가 하위 경로(예: `/editor/…`)를 편집기로 넘김:** 표준 기능만으로 직접 짜야 하고, 개발용 서버가 쓰는 웹소켓은 넘기기 어렵습니다 **[기억]**. 빌드한 정적 묶음을 `server.py`가 직접 주는 편이 단순합니다 — 이 경우 정적 폴더 주기(파일 종류별 `Content-Type`, `.wasm` 포함)와 캐시 규칙을 새로 넣어야 합니다.
  3. **앞에 프록시 프로그램을 하나 더 둠:** 서버가 보는 접속 주소가 모두 이 맥(127.0.0.1)이 되어 접속 주소 검사와 PIN 잠금(주소별)이 뜻을 잃습니다(:96-97, :167-189). 지금도 Tailscale로 들어온 접속은 127.0.0.1로 넘어옵니다(`tailscale/start_tailscaled.sh`:4, `agents/pmo/logs/2026-11-09_tailscale-access.md`:29).
- **http 문제:** 서버는 http로만 답합니다(:674, :680). 이 주소들은 '안전한 주소'가 아니라서 아이폰에서 클립보드·공유 창·화면 꺼짐 막기가 안 됩니다 — `agents/pmo/knowhow.md`:24. OpenCut 옛 판이 쓰는 브라우저 안 저장(OPFS)과 영상 뽑기(WebCodecs)도 안전한 주소에서만 됩니다 **[기억]**. Tailscale `serve`로 https를 쓰는 안은 '검토'로 남아 있습니다 — `pmo/knowhow.md`:24, `2026-11-09_tailscale-access.md`:39. **https 없이는 OpenCut 편집기를 휴대폰에서 못 엽니다 [추측 — 위 두 사실에서 이끈 것].**

### 2-4. 맥에서 서버가 켜지는 법

- `start.sh`: `PATH`에 `/opt/homebrew/bin`을 넣고 `/usr/bin/python3 -u server.py`를 띄운 뒤 `caffeinate -i -s -w <PID>`로 잠들지 않게 — `start.sh`:9-12. 뚜껑을 닫으면 잠듦 — :4.
- 자동 시작: LaunchAgent `com.mitchellstudio.upload` — `RunAtLoad`, `KeepAlive`, 30초 간격, 기록은 `~/Library/Logs/mitchell-upload.log` — `launchd/com.mitchellstudio.upload.plist.template`:6-13. 등록은 `install_autostart.sh`(운영자 허락 뒤에만) — :2, :8-11.
- Tailscale: Homebrew판을 '사용자 공간' 방식으로 — `tailscale/start_tailscaled.sh`:9-10. 들어온 연결은 이 맥의 127.0.0.1:<포트>로 — :4. 자동 시작 틀은 있으나 등록은 운영자 허락 대기로 적혀 있음 — `2026-11-09_tailscale-access.md`:39.
- 코드를 고치면 `launchctl kickstart -k …`로 다시 켬 — `README.md`:3. 설정은 `config/runtime.env`(git 밖) — `server.py`:50.
- **편집기를 상주 프로그램으로 하나 더 띄우려면** LaunchAgent가 하나 더 필요하고, 이것은 운영자가 그 항목을 집어 허락해야 하는 일로 기록돼 있습니다 — `pmo/knowhow.md`:22.

### 2-5. 맥에 이미 있는 것

| 있는 것 | 근거 |
|---|---|
| python3 3.9.6(맥 기본) | `pmo/knowhow.md`:7 |
| ffmpeg·ffprobe(`/opt/homebrew/bin`). 글자 그리기(drawtext·subtitles)는 없음 | `pmo/knowhow.md`:11, `capcut/knowhow.md`:29 |
| Node — `node`로 `capcut_build.mjs`와 CapCut 연결 도구를 돌림. **판 번호는 확인 못 함** | `README.md`:15, `.mcp.json`:5 |
| `sips`(사진 바꾸기) | `capcut_build.mjs`:130, `reel_api.py`:190 |
| Homebrew, Tailscale(Homebrew판) | `pmo/knowhow.md`:20 |
| CapCut 9.7.1 앱스토어판 | `capcut/knowhow.md`:7 |

- **확인 못 함:** Bun이 있는지(ChatGPT 글은 OpenCut 옛 판을 Bun 1.2.18로 설치했다고 적음 — `GPT글`:264), 크롬이 있는지, Postgres·Redis가 있는지(어제 연구: 옛 판은 환경 값이 모두 있어야 켜짐 **[전해 들음]**).

---

## 3. ChatGPT가 쓴 조사 글 — 주장 목록

### 3-1. 그 글의 성격

- 조사일 2026-11-19, 인터뷰 준비용 기술 조사. 스스로 "채택 결정이 아님"이라고 적음 — `GPT글`:5, :9, :338.
- 고정점: 옛 판 `cf5e79e…`, 새 main `e668010…`, 제품 저장소 `0636fa0…` — `GPT글`:332. **어제 연구와 같은 커밋.**
- 한 일: 옛 판 의존성 설치(Bun 1.2.18) 성공, 개발 서버는 'ready'까지 떴으나 HTTP 연결이 안 돼 화면은 못 봄, 기존 테스트 **182 통과 · 9 실패 · 3 오류**, 소리 수집·내보내기 함수는 타입만 떼어 통제된 입력으로 좁게 실행, 공개 서비스는 편집 화면 진입 실패 — `GPT글`:262-270. **실제 MP4는 만들지 못함**(`GPT글`:49, :268). 어제 연구는 읽기만 했으므로, 두 글 모두 완성 영상을 본 적이 없습니다.

### 3-2. OpenCut에 대한 주장

| # | 주장 | 그 글이 댄 출처 | 줄 |
|---|---|---|---|
| O1 | 옛 판은 미첼 전용 편집기를 만들 수 있는 실제 코드 기반이지만 CapCut을 그대로 대신하는 완제품은 아님 | 옛 판 코드 전반 | :13 |
| O2 | 새 main의 API·MCP·화면 없는 모드는 아직 계획. dev·deploy 가지에도 완성된 편집기가 숨어 있다는 근거 없음 | 새 main README, editor route, desktop README | :21, :34-41 |
| O3 | 옛 판은 2026-05-17 보관 처리, 유지보수 중단. MIT라 고쳐 배포할 수 있으나 의존성·글꼴·모델·음악의 권리는 따로 | 옛 판 README·LICENSE | :35, :43 |
| O4 | 일반 글자의 테두리(stroke)는 이어져 있지 않음. **테두리 도우미 함수는 이미 있으나 글자 마스크 쪽에서만 씀.** 미리보기 CSS만 바꾸면 완성 영상에는 안 들어감 | `text-node.ts`, `params/registry.ts`, `text/primitives.ts` | :94, :136 |
| O5 | 글꼴: 시스템 글꼴과 한글 계열 목록이 있음. 특정 TTF를 가져와 보관하는 길은 따로 만들어야 | `font-picker.tsx`, `fonts/google-fonts.ts` | :94, :323 |
| O6 | 목소리 만들기(TTS) 경로는 없음. 있는 소리 파일을 넣을 수는 있음 | (찾지 못함) | :93, :324 |
| O7 | 자동 자막은 있음(Whisper + SRT/ASS 들이기). 한국어 고르기는 없지만 '자동'이 있음. ASS 들이기는 테두리·그림자·회전을 버림 | `transcription/worker.ts`, `languages.ts`, `subtitles/ass.ts` | :95, :107 |
| O8 | 효과는 블러 1종. 변형·마스크·키프레임은 있음 | `effects/definitions/index.ts` | :96 |
| O9 | 자동 사람/머리 따라가기·자동 재구도는 없음. 합성기는 마스크 배열의 첫 것 하나만 씀 | `compositor/frame-descriptor.ts`, `masks/…` | :97, :170 |
| O10 | 작은 화면에서는 데스크톱을 쓰라는 문턱이 있음. **"기존 타임라인을 그대로 휴대폰에 넣는 계획은 부적합. 모바일 접수·보기·수정 화면은 별도 커스텀 대상"** | (옛 판 화면) | :99 |
| O11 | CapCut 프로젝트를 들이고 내는 변환기는 없음 | (찾지 못함) | :100, :208 |
| O12 | 시간은 초당 120,000 틱. CapCut 쪽은 마이크로초 → 변환과 프레임 맞춤이 필요 | `rust/crates/time/src/media_time.rs` | :146 |
| O13 | **내보내기는 '지금 열린 scene 하나'의 트랙만 뽑음.** 미첼의 '장면' 배열을 OpenCut `scenes[]`에 그대로 옮기면 이어 붙인 영상이 안 됨 | `renderer-manager.ts`(exportProject) | :146 |
| O14 | 빈 타임라인에 첫 영상·사진을 넣으면 화면 크기가 소재에 맞춰 바뀌고, fps도 바뀔 수 있음 | `commands/timeline/element/insert-element.ts` | :148, :182 |
| O15 | 자막은 일반 글자 트랙으로 들어가고 원래 말소리와의 이음을 지키지 않음 → 자막을 고쳐도 목소리가 바뀌지 않음 | `subtitles/insert.ts`, `transcription/caption.ts` | :158 |
| O16 | 채널 안내선은 TikTok만 실제 구현. Reels·Shorts는 비어 있음 | `guides/definitions/platforms.tsx` | :180 |
| O17 | 내보내기는 브라우저 캔버스·Web Audio·WASM 합성기·브라우저 인코더에 기댐. 화면 없는 브라우저를 써도 GPU·코덱·글꼴·메모리·내려받기·동시 작업을 검증해야 | `scene-exporter.ts`, `wasm-compositor.ts`, `rust/crates/gpu/src/context.rs` | :198 |
| O18 | 저장: 프로젝트는 IndexedDB, 원본은 OPFS. 프로젝트 JSON만 서버에 올려도 원본은 같이 안 감. 사이트 데이터를 지우면 사라짐. 저장 오류가 부른 쪽에 충분히 전해지지 않음 | `storage/service.ts`, `save-manager.ts`, `project-manager.ts` | :124, :200, :250 |
| O19 | 요청한 소리가 빠져도 내보내기가 끝날 수 있음(디코드 실패 → 소리 줄 없이 마무리) | `media/audio.ts`, `scene-exporter.ts`(좁은 실행) | :247 |
| O20 | 없는 그림 소재는 건너뜀 → 파일이 나왔다고 모든 컷이 있는 것이 아님 | `scene-builder.ts` | :249 |
| O21 | MP4에서 AAC가 안 되면 Opus로 바뀜 | `scene-exporter.ts`(좁은 실행) | :251 |
| O22 | 1.01초를 30fps로 뽑으면 30프레임·1.00초(끝의 덜 찬 프레임을 버림) | (좁은 실행) | :258 |
| O23 | 명령 묶음(BatchCommand)은 중간에 실패해도 저절로 되돌리지 않음. 편집기 핵심·합성기는 전역 상태 | `commands/batch-command.ts`, `core/index.ts` | :253-254 |
| O24 | 소리 검색: 노래 요청은 미지원, 효과음은 Freesound. '상업용만' 걸러내기에 비상업 조건이 섞여 있음 | `app/api/sounds/search/route.ts` | :236 |
| O25 | 장면표 → OpenCut: 미디어 등록·타임라인 명령으로 변환기를 만들 수 있음(난도 '중간'). 원래 장면 번호와 결과 조각 id를 이어 두면 특정 장면만 다시 만들 수 있음 | `timeline-manager.ts`, `insert-element.ts` | :140-150 |
| O26 | 무인 작업(검사·저장·재개)은 난도 '높음' — "없는 API를 한 겹 감싸는 것보다 작업 운영과 품질 계약을 만드는 부분이 큼" | 위와 같음 | :194-202 |

### 3-3. CapCut에 대한 주장

| # | 주장 | 그 글이 댄 출처 | 줄 |
|---|---|---|---|
| C1 | **CapCut에도 공식 MCP 연동과 자연어 편집이 있음.** ChatGPT/Codex와 이어 컷 순서·길이·글자 시간·음악·자막을 편집 가능한 프로젝트에 반영 | capcut.com `/tools/capcut-x-codex`, 공식 배포 SKILL.md | :15, :55 |
| C2 | 공개 묶음 0.3.1의 도구: 편집 세션(`start_stdraft_session` 등), 편집 내용 읽기·쓰기(`get/push_stdraft_snapshot`), 자동 자막, 소재 찾기, AI 초안 편집. 주소 `…/api/external_mcp`. 계정 인증·호출은 시험하지 않음 | 공개 묶음 `plugins_v31.zip`(읽기만) | :57-65, :334 |
| C3 | **그 묶음에서 '고친 프로젝트를 사람 없이 MP4로 뽑는' 명시적 도구는 확인하지 못함.** 프로젝트 저장 성공을 영상 뽑기 성공으로 치지 말라고 적혀 있음 | 같은 묶음 | :67 |
| C4 | 클라우드 프로젝트(STDraft)는 맥의 `draft_content.json`과 같은 것이 아님. 왕복 호환·특정 목소리·계정/지역 노출은 미확인. 묶음은 `UNLICENSED` | 같은 묶음 | :71 |
| C5 | EditPilot: 대화로 길이 줄이기·순서 고치기·채널별 판 만들기. 한국 계정·한국어 지시는 시험하지 않음 | capcut.com `/resource/how-to-use-editpilot-in-capcut-pc` | :75-77 |
| C6 | BytePlus(별도 기업용): 웹 편집기 SDK(`@byteplus/amk-editor`), AI 도우미 포함 SDK, 서버에서 타임라인을 뽑는 API. 따로 계약·비용·클라우드 | docs.byteplus.com | :81-83 |
| C7 | BytePlus Seed Speech TTS 2.0 언어 목록에 한국어가 있음. CapCut의 특정 목소리와 같다는 근거는 아님 | docs.byteplus.com `texttospeechv2` | :85 |
| C8 | CapCut에는 대상 따라가기·자동 재구도(Pro)·소음 제거·모바일 앱이 있음 | capcut.com 도움말들 | :97-103 |
| C9 | 음악: 일반 Sounds는 개인·비상업. Commercial Sounds도 기본 허용은 CapCut·TikTok·TikTok for Business. 그 밖은 따로 권리 필요. 플랫폼 자료를 밖에서 편집하는 것에도 제한 | 자료 라이선스 한국어판(2026-01-22) | :232-234 |
| C10 | 네 갈래 비교: CapCut 유지 + 공식 연동 검토 / 옛 판을 미첼 전용으로 고침 / BytePlus 평가 / 새 OpenCut 지켜봄. "어느 길이든 최종 파일을 검사하고 작업 상태를 보존하는 운영 규칙은 따로 필요" | (정리) | :280-287 |

### 3-4. 우리 코드에 대한 주장 (맞는지 내가 본 것)

| 그 글의 말 | 내가 본 것 |
|---|---|
| "미첼의 기존 `voice_fit.py`에는 이미 발화 길이를 측정하고 자막과 끝 구간을 다시 맞추는 구현이 있다" — :160 | 맞음. `voice_fit.py`:210-286 |
| "현재 출력 검사는 소리 트랙 유무를 검사하고 검토 상태를 기록" — :214 | 맞음. `jobs.py`:392-423 |
| "프로젝트 백업·복원이 이미 구현" — :214, :223 | 맞음. `jobs.py`:1137-1163 (백업 대상은 CapCut 프로젝트) |
| "기존 CapCut 자료에는 마이크로초 표현" — :146 | 맞음. `capcut_build.mjs`:18, `voice_fit.py`:34 |

### 3-5. 어제 연구 글과 어긋나는 곳

| # | 어제 연구(`2026-11-19-opencut.md` · `no-computer-use.md`) | ChatGPT 글 | 판단 |
|---|---|---|---|
| 1 | 글꼴은 구글 폰트를 인터넷에서 받아 옴 **[전해 들음]** | 시스템 글꼴과 한글 계열 목록도 있음(:323) | **어긋남.** TTF 올리기가 없다는 데는 같음. 누가 맞는지는 `font-picker.tsx`를 봐야 — 확인 못 함(내 몫 밖) |
| 2 | 자동 자막에 한국어가 없음(9개 언어) | 한국어 고르기는 없지만 '자동'이 있으므로 "자동 자막 없음은 틀림"(:95) | 사실은 같고 읽는 법이 다름. 우리 일에는 영향 작음(원고가 먼저 있음) |
| 3 | 테두리 항목이 0건 | 일반 글자에는 안 이어져 있으나 **도우미 함수는 이미 있음**(:136) | 어긋나지 않고 더해짐 — 고칠 일이 '새로 만들기'보다 '잇기'에 가까울 수 있음. 내가 본 것: `params/registry.ts`:176-327에 테두리 키 없음 |
| 4 | 화면 없는 크롬을 스크립트로 몰면 가능 **[추측]** | 길 자체는 검토할 수 있으나 코덱·GPU·글꼴·저장·실패 전파·작업 격리까지 봐야 하고 "현재 완성 기능으로 계산하지 않음"(:325) | **무게가 다름.** 어제 것이 가볍게 봄 |
| 5 | CapCut에는 화면 없이 내보내는 공식 길이 없음. 화면 조작이 필요 | 공식 MCP·클라우드 프로젝트·EditPilot이 있음(:15). 다만 사람 없는 MP4 뽑기 도구는 확인 못 함(:67) | **절반 어긋남.** '내보내기'는 같은 결론. '편집을 바깥에서 공식으로 시킬 길이 없다'는 전제는 바뀜 — 어제 글에는 공식 MCP 이야기가 없음 |
| 6 | 선택지는 CapCut 유지 / 옛 판 고쳐 씀 / 새 판 기다림 | BytePlus(웹 편집기 SDK + 서버 뽑기 API)라는 넷째 길이 있음(:81) | 어제 글에 없는 선택지 |
| 7 | 프로젝트 꼴(장면 → 트랙 → 조각)이 우리 장면표의 본보기 | OpenCut의 '장면(scene)'은 타임라인 한 벌이라 우리 '장면'과 다른 것. 그대로 옮기면 안 됨(:146) | **이름이 같아 생기는 함정.** 내가 타입에서 확인: `TScene`은 `tracks`를 통째로 가짐(`timeline/types.ts`:19-27), 프로젝트는 `currentSceneId` 하나를 가리킴(`project/types.ts`:47) |
| 8 | 소리는 AAC 192k | AAC가 안 되면 Opus로 바뀜(:251) | 더해짐 — 뽑은 파일의 소리 코덱을 따로 검사해야. 지금 우리 검사에는 코덱 항목이 없음(`jobs.py`:366-389) |
| 9 | 고쳐도 남는 열쇠는 목소리 | 저장·결과 검증·시간 단위·장면 옮기기·오류 전파·중단 복구·유지보수도 남음(:328) | 범위가 다름 |
| 10 | (다루지 않음) | 첫 소재를 넣으면 화면 크기·fps가 소재를 따라 바뀜(:148) | 새 사실. 4K 60fps 아이폰 영상(`cloud-reels-analysis.md`:13)을 첫 조각으로 넣으면 1080×1920·30fps가 깨질 수 있음 **[추측]** |
| 11 | 읽기만 함 | 설치하고 테스트를 돌림(182/9/3) | 방법의 차이. 둘 다 MP4는 못 만듦 |

### 3-6. `phase1-requirements.md`에서 OpenCut·편집에 닿는 줄

| 줄 | 내용 |
|---|---|
| :12 | "OpenCut은 직접 편집 능력의 **참고 수준이며 채택 확정이 아니다**"(A03, A12). AI는 API·코드 등 알맞은 수단, 불확실한 컴퓨터 유즈는 될 수 있으면 줄임 |
| :19 | 완성 뒤 휴대폰에서 보고 수정 요청 또는 승인. AI가 못하는 부분은 운영자가 **모바일 직접 편집**으로 보완(A05·A06·A07·A12) |
| :20 | 최종 영상과 함께 **뒤에 직접 고칠 수 있는 프로젝트/편집 상태를 보존.** CapCut 고유 형식 유지 여부·OpenCut 채택은 정하지 않음 |
| :22 | **CapCut 기존 목소리와 같을 필요 없음**(A10·A11). 품질은 샘플로 검증 |
| :29 | 운영자의 편집 내용·변경 이력을 보존(다음 제작·프로그램 개선에 씀). 취향의 자동 반영은 미룸 |
| :39 | 기대 흐름 6: "AI 수정 또는 **OpenCut 정도의 모바일 직접 편집**으로 보완. 최종 결과 및 수정 가능한 상태·편집 이력을 저장" |
| :64 | 제작 **진행 중** 개입은 낮은 우선순위(완성 **뒤** 편집과 다름) |
| :70 | 특정 CapCut/OpenCut/BytePlus 채택, TTS 제공사, 백엔드 방식은 **미선정** |
| :80-82 | 이어받을 기준: MP4·1080×1920·30fps, 길이 12·14·15초와 원고 상한, AI 합성 표시·머리 보존 |
| :93 | 남은 실증 2: "OpenCut 정도의 모바일 편집이 실제 iPhone에서 가능한지, 수정 사항·편집 상태·이력이 다시 열리는지" |

- **눈여겨볼 어긋남 둘:**
  - `1차요구`:12는 OpenCut을 '참고 수준·채택 미정'으로 적었고, 이번에 받은 일감의 전제는 "OpenCut을 웹앱에 포함한다"입니다. 어느 쪽이 나중 말씀인지는 한알 말씀 원문으로 확인해야 합니다 — 나는 원문을 읽지 않았음.
  - `1차요구`:22는 "CapCut 목소리와 같을 필요 없음"이고, 어제 연구 글은 "목소리 중요합니다"·"품질이 동일해야 합니다"를 조건으로 적었습니다(`2026-11-19-opencut.md`:91). 목소리가 CapCut 것이 아니어도 된다면 ⑥의 Voice 칸(화면 조작)을 뺄 수 있어 아래 5번의 셈이 달라집니다.

---

## 4. 장면표 ↔ OpenCut 옛 판의 프로젝트 꼴

### 4-1. OpenCut 쪽의 꼴 (타입 파일에서)

- 프로젝트 `TProject` = `metadata{id, name, thumbnail?, duration, createdAt, updatedAt}` + `scenes: TScene[]` + `currentSceneId` + `settings{fps, canvasSize{width,height}, canvasSizeMode?, background}` + `version` — `project/types.ts`:15-51.
- **scene 하나가 타임라인 한 벌:** `TScene{id, name, isMain, tracks, bookmarks…}`, `tracks = {overlay: (영상|글자|그래픽|효과 트랙)[], main: 영상 트랙, audio: 소리 트랙[]}` — `timeline/types.ts`:19-27, :76-80.
- 조각의 공통 칸: `id, name, duration, startTime, trimStart, trimEnd, sourceDuration?, animations?, params` — `timeline/types.ts`:105-115. 시간은 `MediaTime`(정수 틱) — `wasm/media-time.ts`:25-27. 1초 = 120,000틱 **[전해 들음 — 어제 연구·`GPT글`:146]**. 그렇다면 30fps의 한 프레임은 4,000틱으로 딱 떨어짐.
- 영상 조각 `VideoElement{mediaId, isSourceAudioEnabled?, hidden?, retime?{rate, maintainPitch?}, effects?, masks?}`, 사진 `ImageElement{mediaId, …}`, 글자 `TextElement{hidden?, effects?}`(글·모양은 `params`에), 소리 `AudioElement` = 올린 파일(`mediaId`) 또는 라이브러리(`sourceUrl`) + `retime?` — `timeline/types.ts`:82-139.
- 글자의 `params` 키: `content, fontFamily, fontSize, color, textAlign, fontWeight, fontStyle, textDecoration, letterSpacing, lineHeight, background.*(7개)` + 공통 `transform.positionX/Y, transform.scaleX/Y, transform.rotate, opacity, blendMode` — `params/registry.ts`:96-155, :176-327. 기본값 `timeline/defaults.ts`:31-64(글꼴 Arial, 크기 15, 흰색, 가운데).
- 소리의 `params` 키: `volume`(dB), `muted` — `params/registry.ts`:157-174.
- 소재 `MediaAssetData{id, name, type, size, lastModified, width?, height?, duration?, fps?, hasAudio?…}` + 브라우저의 `File` 객체 — `services/storage/types.ts`:17-30, `media/types.ts`:5-9. **파일 경로 칸이 없음.**
- JSON으로 저장되는 꼴 `SerializedProject`(날짜가 글자열) — `services/storage/types.ts`:32-49. 소재 파일은 여기에 들어가지 않음(따로).
- 내보내기 옵션 `ExportOptions{format: mp4|webm, quality: 4단계, fps?, includeAudio?}` — `export/index.ts`:4-21. 해상도·코덱·비트레이트 칸이 없음.

### 4-2. 맞대기 표

| 우리 쪽 | OpenCut의 갈 곳 | 메모 |
|---|---|---|
| `project`(CapCut 프로젝트 이름) | `metadata.name` (`project/types.ts`:22) | 뜻이 다름 — OpenCut에서는 그냥 이름 |
| 작업 번호 | `metadata.id` (:21) **[추측]** | id를 우리가 정해도 되는지는 타입만으로 확인 못 함 |
| `canvas`/`size` | `settings.canvasSize{width,height}` (:15-18, :31), `canvasSizeMode: "custom"` (:32) | 첫 소재를 넣을 때 바뀔 수 있다는 주장(`GPT글`:148)에 주의 |
| `fps` | `settings.fps = {numerator: 30, denominator: 1}` (:30, `fps/defaults.ts`:3) | 분수 꼴 |
| `length`(목표 길이) | 없음. `metadata.duration`(:24)은 결과 값 | 목표 길이는 맥 쪽에 남김 |
| `base_draft`, `text_template` | 없음 | CapCut 전용 |
| `scenes[]` | **`scenes[0].tracks.main.elements[]`** (`timeline/types.ts`:36-41, :78) | OpenCut의 `scenes[]`에 넣으면 안 됨(3-5의 7) |
| 장면 `file` | `mediaId` → `MediaAssetData` + `File` (`timeline/types.ts`:119, :129) | 경로가 아니라 브라우저 안 파일. 맥의 파일을 브라우저로 실어 와야 함 |
| 장면 `kind` | 조각 `type: "video"` / `"image"` (:118, :128) | 그대로 |
| 장면 `start` | `startTime` (:109) | 초 × 틱 |
| 장면 `end − start` (또는 `dur`) | `duration` (:108) | |
| 장면 `src_start` | `trimStart` (:110) | |
| 장면 `src_end` | `trimEnd` + `sourceDuration` (:111-112) **[추측]** | `trimEnd`가 '끝에서 잘라낸 길이'인지 타입만으로는 확정 못 함 |
| 장면 `fit`·`zoom` | `params["transform.scaleX/Y"]` (`registry.ts`:113-128) | 배율 1의 기준이 같은지 확인 못 함. CapCut은 '화면 안에 맞춤 = 1'(`capcut/knowhow.md`:31) |
| 장면 `pos[x,y]` | `params["transform.positionX/Y"]` (`registry.ts`:97-112) | 단위가 다를 것 **[추측]** — CapCut은 화면 비율 값(자막 y 0.38), OpenCut은 최소 −100,000·한 칸 1 |
| 장면 `role` | 조각 `name` (:107) **[추측]** | 표시용 글자로만 |
| 영상에 든 원래 소리 | `isSourceAudioEnabled` (:120), `params.volume/muted` | 장면표에는 이 칸이 없음. 지금 CapCut에서 원래 소리를 끄는지 켜는지는 바탕 프로젝트 조각을 따르므로 코드로는 확인 못 함 |
| `captions[].text` | `overlay[]`의 글자 트랙 → `TextElement.params.content` (`registry.ts`:177-183) | |
| `captions[].start/end` | `startTime` / `duration` | |
| 자막 글꼴 | `params.fontFamily` (`registry.ts`:184-190) | 글꼴 이름만. 파일을 가리킬 칸 없음 |
| 자막 크기 10(CapCut 단위) | `params.fontSize` (기본 15, `registry.ts`:191-198; 환산 기준 `text/typography.ts`:9) | 단위 환산을 재서 맞춰야 함 |
| 자막 색(흰색) | `params.color` (`registry.ts`:199-204) | |
| 자막 정렬(가운데) | `params.textAlign` (:205-216) | |
| 자막 자리(y 0.38)·배율 1.1 | `transform.positionY`, `transform.scaleX/Y` | 단위 환산 필요 |
| 표시 글(`label`·`ai`에서 나온 것) | 다른 글자 트랙의 `TextElement` | 장면과의 이음은 사라짐(아래) |
| 끝 문구 두 줄 | 글자 트랙 둘, `startTime 0`, `duration = 전체` | 켬/끔은 트랙 `hidden`(:46)으로 **[추측]** |
| 목소리(지금은 CapCut 안) | 소리 트랙의 `UploadAudioElement{mediaId}` (:93-96) | 파일이 먼저 있어야 함 |
| 목소리 속도 1.5배 | `retime{rate: 1.5, maintainPitch}` (:82-85, :90) | |
| 목소리 앞뒤 자르기(Fit) | `trimStart` / `trimEnd` | `voice_fit`의 원본 구간과 같은 뜻 |
| 음악 | 다른 소리 트랙의 조각. 올린 파일 또는 `LibraryAudioElement{sourceUrl}` (:98-101) | |
| 음악 "목소리보다 작게" | `params.volume`(dB, `registry.ts`:157-166) | 지금은 값이 아니라 Terra에게 준 말(`jobs.py`:1396) |
| 내보내기 MP4·1080×1920·30fps | `ExportOptions.format = "mp4"`, `fps`; 크기는 `settings.canvasSize`가 곧 출력 크기일 것 **[추측]** | 해상도 칸이 따로 없음 |

### 4-3. 갈 곳이 없는 것

| 우리 쪽 | 왜 갈 곳이 없나 | 어떻게 다뤄야 하나 **[추측]** |
|---|---|---|
| **자막 테두리**(검정 0.08) | 글자 `params`에 stroke·outline·shadow 키가 없음 — `params/registry.ts`:176-327, `subtitles/types.ts`:17-42 | OpenCut을 고쳐 키를 더하고 그리는 곳에 잇거나, 편집 화면에서는 테두리 없이 보이고 맥이 뽑을 때 입힘 |
| **반복 `repeat_of`** | 조각끼리 '이것은 저것의 반복'이라고 잇는 칸이 없음. 펼쳐서 같은 `mediaId`의 조각을 여럿 놓을 수는 있음 | 펼친 채로 편집 → 돌아올 때 `repeat_of`는 잃음. 앞 장면을 고쳐도 반복 쪽은 안 따라감. 맥 쪽에서 '반복 묶음'을 기억했다가 다시 입히거나, 반복을 그냥 보통 장면으로 바꿈 |
| **장면에 붙은 표시 `label`·`ai`** | 영상 조각에 '이 조각은 AI 얼굴'이라는 표시 칸이 없음. 글자는 따로 놓인 조각일 뿐 | 장면 길이·순서를 바꾸면 표시 글자가 따라가지 않음 → AI 얼굴인데 표시가 없는 구간이 생길 수 있음. 표시 글자는 편집 화면에 넣지 않고 맥이 장면표의 `ai`로 다시 만드는 편이 안전 |
| **AI 합성 표시 '항상'** | 지우지 못하게 잠그는 칸이 없음(트랙에 `hidden`은 있어도 잠금은 없음 — `timeline/types.ts`:31-65) | 돌아온 편집 상태를 맥이 검사(모든 `ai` 구간에 표시가 있는가) |
| **자막 ↔ 목소리의 짝** | 조각끼리 잇는 칸이 없음(`ElementRef`는 가리키는 타입일 뿐 — :7-10) | 조각 `id`에 규칙을 둬서(예: 자막 3번과 목소리 3번) 맥이 짝을 되찾음. 자막 글을 고치면 그 목소리는 '다시 만들어야 함'으로 표시 |
| **판 번호 v1·v2** | `TProject.version`(`project/types.ts`:49)은 저장 형식의 판으로 보임 **[추측]** | 판마다 프로젝트를 따로 두거나 맥이 `scenes_v<N>.json`으로 둠 |
| **고정 글자의 본보기 모양**(1025에서 복제) | CapCut 재료를 통째로 떠 오는 방식이라 값이 코드에 안 드러남 | 한 번 재서 값(글꼴·크기·색·자리)으로 적어 둬야 어느 도구로든 다시 그릴 수 있음 |
| **옵션**(목소리 이름·음악 고르기·올릴 곳·원고 확인) | 편집기와 무관 | `options.json`에 그대로 |
| **원고 글자 수 상한**(12초 75 · 14초 85 · 15초 90 — `jobs.py`:73) | 편집기에 그런 제한 없음 | 자막을 고쳐 저장할 때 맥이 검사 |
| **소재의 맥 경로**(`file`) | 브라우저 안 `File`만 | `mediaId` ↔ 맥 경로 대응표를 맥이 가짐 |

---

## 5. 포함하는 길 셋 — 우리 쪽에서 바뀌어야 하는 곳

### 5-0. 어느 길이든 먼저 풀어야 하는 것

1. **https.** 지금은 http(2-3). 편집기를 휴대폰에서 열려면 Tailscale `serve` 같은 길이 필요 **[추측]**. 가게 와이파이의 `.local` 주소로는 https가 안 될 수 있음 **[추측 — 확인 못 함]**.
2. **소재를 주는 주소.** 편집기(또는 미리보기)가 원본 영상·사진·목소리·음악을 읽어야 함. 지금은 `data/output` 영상과 작은 그림뿐(2-1). 새 주소 + 범위 요청 필요. 아이폰 4K 60fps 원본(`cloud-reels-analysis.md`:13)은 휴대폰 편집에 무거우므로 맥이 가벼운 사본을 만들어 주는 편이 나음 **[추측]**.
3. **목소리 파일.** 지금 목소리는 CapCut이 만들어 CapCut 프로젝트 안에 둠(1-6). 편집 상태를 CapCut 밖에 두려면 목소리를 파일로 꺼내 작업 폴더에 두거나, 밖에서 만들어야 함. `1차요구`:22대로 CapCut 목소리가 아니어도 된다면 뒤쪽이 열림.
4. **장면표를 넓힘.** 목소리 조각(파일·자리·자른 구간·속도), 음악(파일·음량), 자막 모양 값, Fit 뒤의 실제 시간, 판. 지금 Fit의 결과는 CapCut 프로젝트에만 있음(1-7).
5. **휴대폰 문턱.** 옛 판은 너비 1024 아래를 막음 **[전해 들음 — 어제 연구 ✔, `GPT글`:99]**. 문턱을 걷어도 타임라인이 손가락으로 쓸 만한지는 따로 볼 일.

### 5-1. 세 길 견주기

| | (ㄱ) 옛 판을 맥에서 따로 띄우고 웹앱에서 넘어감 | (ㄴ) 편집기 부분만 떼어 웹앱에 넣음 | (ㄷ) 장면표가 참, 편집 화면은 열어 고치기만 |
|---|---|---|---|
| **참인 편집 상태** | OpenCut 프로젝트(휴대폰 브라우저 안 — IndexedDB·OPFS **[전해 들음]**) | 정하기 나름 — 브라우저 안 또는 맥 | 맥의 장면표(넓힌 것) |
| **장면표 → OpenCut** | OpenCut 안에 '들이기'를 새로 짜야 함(프로젝트를 파일로 넣는 길이 없음 **[전해 들음]**). 변환은 OpenCut 쪽 코드에서 | 웹앱 화면의 JS가 맥에서 장면표·소재를 받아 편집기 상태로 | 맥(또는 화면 JS)이 장면표에서 편집 화면용 꼴을 만들어 줌. 갈 곳 없는 다섯은 **보내지 않음** |
| **OpenCut → 장면표** | '내기'도 새로 짜야 함. 다른 출처라 웹앱 API로 바로 못 보냄(2-3) | 같은 출처라 새 POST 주소로 저장. 64KB 제한(`server.py`:357)을 넘을 수 있어 늘려야 | 고친 것만 돌아옴(자막 글, 장면 길이·순서·빼기, 소리 크기). 맥이 검사(겹침·AI 표시·글자 수) 뒤 새 판 장면표로 |
| **영상 뽑기** | 휴대폰 브라우저(OpenCut의 본래 길). 뽑은 MP4를 맥으로 다시 올려야 함 — 지금 올리기는 `data/incoming`으로만 감(`server.py`:567-616) → `data/output`에 넣는 새 길 필요 | 휴대폰 브라우저, 또는 맥의 화면 없는 브라우저가 같은 묶음을 돌림 **[추측]** | **맥.** 편집 화면은 미리보기만 |
| **④ CapCut 프로젝트 만들기** | 그대로 둘 수 있으나 OpenCut에서 고친 것이 CapCut 프로젝트에 안 들어감 → 편집 상태가 둘 | 뽑기를 편집기 엔진이 하면 ④는 필요 없어짐. CapCut을 남기면 (ㄱ)과 같은 문제 | 둘 가운데 고름: (a) ④ 유지 — 새 판 장면표로 `capcut_build.mjs`를 새 이름으로 다시(:216), ⑥도 다시 (b) 맥이 직접 뽑음 — ④는 '사람이 CapCut에서 열어 볼 사본'으로만 남기거나 없앰 |
| **⑥ Voice·Music·Fit·Export** | 첫 판은 그대로(CapCut). 고친 판은 OpenCut이 뽑으므로 ⑥을 안 거침. 단 목소리 파일을 CapCut에서 꺼내 OpenCut에 넣어야 함 | CapCut을 버리면 ⑥ 전체가 사라지고 목소리는 밖에서. Fit의 계산은 새 상태에 맞게 다시 씀 | (a)면 ⑥ 그대로 — 자막 글이 바뀌면 Voice부터 다시(`README.md`:29), 화면 조작 남음 (b)면 ⑥이 '목소리 파일 만들기 + Fit 계산 + 맥이 뽑기'로 바뀜, 화면 조작 0 |
| **로그인·보안** | 편집기 포트가 PIN·접속 주소 검사 밖(2-3). 편집기에 같은 검사를 넣거나 앞에 문을 둬야 | 지금 것 그대로 | 지금 것 그대로 |
| **맥에 더 필요한 것** | 편집기 서버(Next.js)를 늘 켜 둠 — LaunchAgent 하나 더(운영자 허락, `pmo/knowhow.md`:22). Bun/Node 판, Postgres·Redis 환경 값 **[전해 들음]** | 빌드한 묶음을 `server.py`가 줌 — 정적 폴더 주기를 새로. 빌드는 개발 PC에서 **[추측]** | 뽑는 도구(화면 없는 브라우저, 또는 글자 그리기가 되는 ffmpeg 등 — 어제 연구의 후보들) |
| **쓰임 (가) 휴대폰에서 고침** | 문턱·https를 풀면 됨. 손가락으로 쓸 만한지는 모름 | 화면을 휴대폰에 맞게 다시 짤 수 있음 | 됨 — 고칠 것 셋에 맞춘 화면 |
| **쓰임 (나) 맥에 편집 상태 남김** | **안 됨**(브라우저 안에만) — 내기를 짜야 됨 | 저장 주소를 만들면 됨 | 됨(처음부터 맥에 있음) |
| **쓰임 (다) 화면 조작 없이 뽑기** | 고친 판은 됨(휴대폰이 뽑음). 휴대폰을 켜 둬야 하고 자동으로는 못 뽑음. 첫 판은 여전히 CapCut | 휴대폰이 뽑으면 (ㄱ)과 같음. 맥의 화면 없는 브라우저면 됨 **[추측]** | (b)면 됨 |
| **멈춘 코드를 들고 가는 부담** | 옛 판 통째(1,128개 파일) + 우리가 고친 곳(들이기·내기·문턱·테두리) | 떼어 낸 부분 + 고친 곳. 떼어 내는 일 자체가 큼 **[추측]** | 가장 작음 — OpenCut에서 빌리는 것이 화면 부품과 방식뿐일 수 있음 |
| **지금 코드에서 바뀌는 곳** | `server.py`(넘어가는 링크, `data/output`으로 받는 주소, 소재 주소), OpenCut 쪽 여러 곳 | `server.py`(정적 묶음·소재 주소·저장 주소), `app.html`(편집 탭), 편집기 묶음 | `jobs.py`(장면표 판·저장 검사·'직접 고침' 상태), `server.py`/`reel_api.py`(소재·저장 주소), `app.html`(편집 화면), `capcut_build.mjs`(이름 규칙) 또는 새 뽑기 스크립트, `voice_fit.py`(읽고 쓰는 부분) |

### 5-2. 세 길에 공통으로 쓸 수 있는 이음매 (지금 코드에 이미 있음)

- **`data/output/<작업>_v<N>.mp4`가 놓이면 끝.** 누가 뽑았든 `sync`가 찾아 ⑥을 끝으로, ⑦을 '확인 필요'로 바꾸고 규격을 검사함 — `jobs.py`:566-631. CapCut 프로젝트를 못 읽으면 그 부분(겹침·고른 목소리)은 조용히 건너뜀(`voice_fit.py`:201-206, `jobs.py`:441-442).
- **「고칠 점」의 되돌림이 이미 있음.** ⑦에서 고칠 점을 받으면 ④를 '진행 중', ⑥을 '대기'로 돌리고 지금 영상을 '이미 본 것'으로 적음 — `reel_api.py`:218-230. '직접 고침'도 같은 자리에 걸면 새 판(v2)이 생길 때만 ⑦이 다시 깨어남.
- **범위 요청으로 영상 주기**가 이미 있음(`server.py`:421-466) — 소재 주소를 더할 때 그대로 씀.

### 5-3. 내가 보기에 **[추측]**

- (ㄱ)은 '포함'이라는 말에 가장 가깝게 들리지만, 띄우기만 해서는 쓰임 (나)가 안 되고 로그인 밖에 놓이며 편집 상태가 CapCut과 둘로 갈립니다. 결국 OpenCut 안쪽을 여러 군데 고쳐야 해서 '따로 띄운다'의 가벼움이 남지 않습니다.
- (ㄴ)은 화면을 가장 잘 맞출 수 있지만 떼어 내는 일의 크기를 타입 파일만 보고는 가늠할 수 없습니다 — 다른 보조(OpenCut 코드 분석)의 답이 필요합니다.
- (ㄷ)은 우리 쪽 일(장면표 넓히기, 맥이 뽑기)이 중심이고 OpenCut은 덜 중요해집니다. 한알의 "OpenCut을 웹앱에 포함한다"가 **'OpenCut이라는 프로그램'**을 뜻하는지 **'OpenCut 정도의 직접 편집'**(`1차요구`:39의 말)을 뜻하는지에 따라 (ㄷ)이 답이 되기도, 안 되기도 합니다. 여쭤야 할 첫 물음입니다.

---

## 6. 기획에 넣을 말로 정리

### 6-1. 정해야 하는 것 (물음 꼴)

1. **'OpenCut을 포함한다'는 OpenCut 프로그램 그 자체를 넣는다는 뜻인가요, OpenCut만큼 휴대폰에서 직접 고칠 수 있게 한다는 뜻인가요?** — 앞이면 (ㄱ)·(ㄴ), 뒤면 (ㄷ)도 됩니다. (`1차요구`:12는 '참고 수준', :39는 'OpenCut 정도의 모바일 직접 편집'.)
2. **고칠 수 있는 편집 상태의 '참'을 어디에 둘까요 — 맥의 장면표, 휴대폰 브라우저 안의 OpenCut 프로젝트, CapCut 프로젝트?** — 지금은 CapCut 프로젝트가 참입니다(목소리·음악·맞춘 시간이 거기에만 있음). 하나로 정하지 않으면 고친 것이 서로 안 맞게 됩니다.
3. **휴대폰에서 고칠 수 있는 범위를 어디까지 열까요 — 자막 글 · 장면 길이/순서/빼기 · 소리 크기 셋인가요, 타임라인 전체인가요?** 그리고 **'얼굴 : AI 합성' 표시와 끝 문구는 못 지우게 잠글까요?** — 범위가 셋이면 작은 전용 화면으로 되고, 전체면 OpenCut급 편집기가 필요합니다.
4. **고친 영상은 누가 뽑을까요 — 맥(화면 없이), 휴대폰 브라우저, 지금처럼 CapCut?** — 휴대폰이면 뽑는 동안 화면을 켜 둬야 하고 결과를 맥으로 다시 올려야 합니다. CapCut이면 화면 조작이 남습니다.
5. **CapCut 프로젝트를 계속 남길까요?** — 남기면 맥 CapCut에서 손볼 수 있지만 편집 상태가 둘이 됩니다. (`1차요구`:20은 '수정 가능한 상태를 보존'까지만 정했고 형식은 미정.)
6. **자막 글을 고치면 목소리는 어떻게 할까요 — 다시 만들어야 하는데, CapCut에서(화면 조작) 다시인가요, 밖의 음성으로 바꿀까요?** — `1차요구`:22는 'CapCut 목소리와 같을 필요 없음', 어제 연구는 '품질이 동일해야'를 적었습니다. 어느 말씀이 지금 기준인지에 따라 ⑥이 남거나 사라집니다.
7. (허락) **https 주소로 바꾸는 것과, 맥에 늘 켜 두는 프로그램을 하나 더 두는 것을 허락하시나요?** — 휴대폰 편집기는 https 없이는 안 열릴 것으로 보이고 **[추측]**, (ㄱ)은 상주 프로그램이 하나 더 필요합니다.

### 6-2. 작게 해 볼 시험 — '장면표 한 바퀴'

- **무엇을 만드나:**
  1. 가짜 소재(색 막대 시험 영상 1개 · 색만 다른 사진 2장 · 짧은 시험 소리 2개)와, 1101과 같은 꼴(장면 5 + 반복 1, 자막 8, AI 표시 2곳, 끝 문구)의 **넓힌 장면표** 한 개. 손님 소재는 쓰지 않음.
  2. **변환기 두 개**(짧은 스크립트): 넓힌 장면표 → OpenCut 저장 꼴(`SerializedProject`), 그리고 그 반대.
  3. OpenCut 옛 판을 개발 PC에서 https로 띄워 **아이폰 Safari**로 엶(문턱은 시험용으로만 끔).
- **무엇을 보나 (다섯):**
  1. **열리나** — 문턱·https·브라우저 안 저장이 아이폰에서 실제로 되는가. 변환한 프로젝트가 그대로 보이는가(화면 크기 1080×1920·30fps가 지켜지는가 — `GPT글`:148의 주장 확인).
  2. **손가락으로 되나** — 자막 한 줄 고치기, 장면 하나 빼기, 장면 하나 0.5초 줄이기, 음악 소리 줄이기. 각각 몇 번 만에 되는지.
  3. **왕복에서 무엇을 잃나** — 고친 프로젝트를 다시 장면표로 바꿔 처음 것과 견줌. 바뀐 것이 위 넷뿐인지, `repeat_of`·`label`·`ai`·자막-목소리 짝이 살아 있는지(맥 쪽에 남겨 둔 것을 다시 입혔을 때).
  4. **뽑히나** — 아이폰에서 내보낸 MP4가 `check_output` 기준(1080×1920·30fps·소리 있음)과 소리 코덱(AAC인지 — `GPT글`:251)을 지키는지, 걸린 시간.
  5. **자막이 어떻게 보이나** — 테두리 없는 흰 글씨가 실제 화면에서 얼마나 다른지(한글 글꼴 포함), 한 장면을 캡처해 지금 릴스와 나란히.
- **이 시험으로 갈리는 것:** 1·2가 안 되면 (ㄱ)·(ㄴ)은 접고 (ㄷ)의 작은 전용 화면으로. 3에서 잃는 것이 많으면 어느 길이든 '장면표가 참'이어야 함. 4가 되면 '휴대폰이 뽑기'가 후보로 남고, 안 되면 '맥이 뽑기'로.
- **크기 [추측]:** 변환기 둘은 타입이 글로 정의돼 있어(4-1) 작게 끝남. 품이 드는 곳은 옛 판을 https로 띄우는 준비(환경 값, 빌드)임 — ChatGPT 글은 설치는 됐으나 화면은 못 봤다고 적음(`GPT글`:264-265).
- **더 작게 하려면:** 3번(왕복에서 잃는 것)만 먼저 — 편집기를 띄우지 않고 변환기 둘과 '손으로 고친 JSON'만으로 볼 수 있음. 이 PC에서 바로 됨.

---

## 7. 확인하지 못한 것

- **실제 `scenes.json`**(`data/`에 있어 열지 않음). 1-2의 칸은 코드가 읽는 것 기준이고, 실제 파일에 다른 칸이 더 있는지는 모름.
- **자막 모양의 실제 크기**(CapCut 단위 10 · 0.08 · 0.38이 픽셀로 얼마인지), 고정 글자 넷의 본보기 값(색·크기·자리) — 1025 프로젝트 파일을 봐야 함.
- **영상에 든 원래 소리**를 지금 CapCut 프로젝트에서 끄는지 켜는지.
- **맥의 Node 판, Bun·크롬·Postgres·Redis 유무, https(Tailscale serve) 상태, Tailscale 자동 시작이 등록됐는지** — 저장소 기록은 2026-11-12까지.
- **OpenCut 쪽:** `trimEnd`의 정확한 뜻, 배율 1·자리 값의 단위, `metadata.id`를 우리가 정해도 되는지, `TProject.version`의 뜻, 내보내기 크기가 `canvasSize`를 따르는지, 틱 수(120,000) — 타입 파일만 봐서 확정 못 함. 글꼴이 구글 폰트뿐인지 시스템 글꼴도 되는지(3-5의 1).
- **안전한 주소(https)가 아니면 OPFS·WebCodecs가 안 된다**는 것은 내 일반 지식이고 이번에 따로 확인하지 않았음. 아이폰 Safari에서 옛 판의 내보내기가 도는지도 모름.
- **한알 말씀 원문**(오늘 것 포함)은 읽지 않았음 — 3-6의 어긋남 둘은 원문으로 가려야 함.
- ChatGPT 글이 댄 바깥 출처(CapCut 공식 연동, BytePlus 등)는 내가 열어 보지 않았음 — 그 글의 주장으로만 옮겼음.
- `jobs.py` 1,821줄 가운데 ⑥ 카드·연습·Preflight의 대부분은 훑기만 했음.
