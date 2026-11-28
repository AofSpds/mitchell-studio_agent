# S39_BM_X — 자동 초안과 사람이 고치는 화면의 공개 세팅

- 조사: 2026-11-28 18:17–18:24 KST에 공개 자료 읽기. 시각은 PowerShell 한국 시각 변환으로 확인했다.
- 새 세팅 카드 **4개**. `S15_X.md`·`S19_X.md`에 네 사례 이름이 없는 것을 확인했다. 모두 2026-06 이후 자료이며, 예전 사례를 새 카드로 세지 않았다.
- 출발점: X 글에 연결된 제작자 블로그 1개, 제작자의 Hacker News 글과 저장소 2개, 저장소에 함께 실린 YouTube 시연 1개. X 직접 본문은 403으로 못 읽었다. 블루스카이는 기존 도구 언급만 확인했고, 스레드에서는 충분한 세팅 사례를 찾지 못했다.
- 공개 설명·파일을 읽었으며 영상 재생, 설치, 코드 실행, 로그인은 하지 않았다. 아래의 기능은 제작자가 공개한 세팅이지 이 창의 동작 시험 결과가 아니다. 자료의 날짜와 이 창의 열람 날짜를 구분했다.
- 공통 빈칸: 네 사례 모두 **한국어 자막 품질 실측과 게시글까지 함께 반환한 실사용 기록은 확인하지 못했다.** 이 부분을 구현 완료나 검증 완료로 세면 안 된다.

## 1. 세팅 카드

### X-01. FrameJam — 원본 촬영물 → 편집표 → 세로 초안 → 프레임에 수정 의견

- **주소·날짜·쓴 사람 종류:** [제작 블로그](https://www.thepromptwarrior.com/p/i-changed-my-mind-about-ai-music), 원문 날짜 2026-10-09; 만든 사람·자기 사용·관련 교육 판매. 블로그가 FrameJam과 자기 X 출시 글을 함께 연결한다. [공개 작업법](https://github.com/moritzkremb/framejam/blob/5f6ea92498bdf79ce3adbce7ea38738f1dd017d7/playbooks/talking-head-short/SKILL.md)은 2026-10-25 16:27 KST 갱신. 아래의 세부는 이 작업법과 [설명 페이지](https://www.framejam.ai/playbooks/talking-head-short)에서 확인했다.
- **만드는 것·입력:** 직접 카메라 앞에서 말한 영상, 선택적으로 화면 녹화·사진·클립을 넣어 1080×1920 세로 영상과 자막을 만든다. 공개 예는 48초. 기본 구성은 위 40% 설명 장면·아래 60% 촬영물이다. 게시글 출력은 없음.
- **차례(원문 단계):** `Look at everything` → `Transcribe the raw recording` → `Remove dead air` → `Find earlier takes` → `Cut` → `Plan the scenes` → `Build` → `Check, render, review`.
- **중간 자료 꼴:** `source/` 원본, `transcripts/` 원본·편집 후 받아쓰기, `working/edit-01/` 등 판별 작업 폴더, `removals-01.json`, `final.edl.json`, `EDIT_PLAN.md`, `captions.json/.srt`, `VERIFY.md`, 판별 MP4. 편집표는 **편집 후 시간·대사·위쪽 화면 내용·실물 자료 출처**를 한 줄씩 적는다. EDL은 원본 구간과 편집 후 시간을 함께 보존한다. [파일을 쓰는 작업법](https://github.com/moritzkremb/framejam/blob/5f6ea92498bdf79ce3adbce7ea38738f1dd017d7/playbooks/talking-head-short/SKILL.md)
- **도구·공개 설정:** 코딩 에이전트 + FrameJam MCP, FFmpeg/FFprobe, Python·NumPy, 로컬 whisper.cpp. 새 프로젝트의 기본 굽기 도구는 HyperFrames이고 기존 Remotion 등도 유지한다. [자르기 스크립트](https://github.com/moritzkremb/framejam/blob/5f6ea92498bdf79ce3adbce7ea38738f1dd017d7/playbooks/talking-head-short/scripts/prepare_edit.py)·[자막 스크립트](https://github.com/moritzkremb/framejam/blob/5f6ea92498bdf79ce3adbce7ea38738f1dd017d7/playbooks/talking-head-short/scripts/make_captions.py) 경로가 공개돼 있다. 스크립트 본문 실행·시험은 안 했다.
- **사람이 고치는 곳·돌리는 곳:** PC의 대화 옆 브라우저 검토 화면. 완성 MP4에서 프레임을 누르거나 시간 범위를 끌어 의견을 적고 `Finish review`를 누른다. 에이전트가 시각·표시한 위치의 화면·의견을 받아 다음 판을 같은 탭에 띄운다. 반복 횟수는 승인할 때까지이며 실제 사례의 횟수는 없음. **검토 의견 화면이지 사람이 직접 클립을 끄는 편집 화면으로 확인한 것은 아니다.** [검토 흐름](https://www.framejam.ai/)
- **시간·값:** 제작 소요 시간 없음. 로컬 작업법은 무료로 실행한다고 설명하며 로컬 받아쓰기를 기본으로 둔다. 유료 받아쓰기 선택지는 별도다. 에이전트 사용료·전체 편당 비용 없음.
- **실패·고친 법:** 전체 받아쓰기는 짧은 말 다시 시작을 놓쳐 문장 시작·제거한 쉼 주변 3–6초를 다시 받아쓴다. 자르는 곳을 바꾸면 모든 자막·삽입 장면 시간을 새 EDL로 다시 대응시킨다. 이전 출력은 덮어쓰지 않는다. 이는 작업법에 적힌 대응이며 실패율 수치는 없다.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 사진·영상 목록을 먼저 살피고 **편집표와 원본↔완성 시간 대응표**를 남기는 순서를 본뜬다. 고친 장면만 찾을 수 있는 프레임 의견·판별 기록도 유용하다. 첫 판에는 합성 목소리·음악·효과음을 뺀다. 영어의 2–4단어 자막 기본값을 한글에 그대로 적용하지 않는다.
- **짧은 원문:** “don't nudge times by hand.” — 위 공개 작업법.

### X-02. OpenFilm — 파일로 만든 장면을 같은 편집 화면에서 사람이 고치기

- **주소·날짜·쓴 사람 종류:** [제작자의 Show HN](https://news.ycombinator.com/item?id=50152136), 정확한 게시 시각은 API를 못 열어 미확인. 만든 사람. [소개 영상 제작 기록](https://github.com/openfilm/examples/blob/82ce37596d6959acdd6c317d5b05440f813998d3/openfilm-intro/make/README.md)은 2026-10-10 20:18 KST 갱신. [현재 프로젝트 설명](https://github.com/openfilm/openfilm/blob/4c8f50a822d8c495b5d2cfeac00244aa94da6372/README.md)은 2026-11-18 15:12 KST 갱신. 서로 다른 시점의 설명이다.
- **만드는 것·입력:** 소개 영상 1분 42초. 앱 녹화·정지 그림·직접 코드로 만든 3D 장면·중국어 음성과 자막을 사용했다. 편집기는 자기 사진·영상 폴더를 연결할 수 있다고 설명한다. 이 소개 작품은 세로 촬영물 혼합이나 한글 자막 검증 예가 아니다. 게시글 출력 없음.
- **차례:** 제작 폴더의 `script.md`·`beats.md` → Blender 장면과 앱 녹화 → 장면별 HTML → `film.html`로 조립 → Studio에서 열어 수정 → MP4로 굽기. 원문은 폴더별 제작법을 나누어 설명하며, 이 화살표는 그 의존관계를 정리한 것이다. [작품 구성](https://github.com/openfilm/examples/blob/main/openfilm-intro/README.md)·[제작 기록](https://github.com/openfilm/examples/blob/82ce37596d6959acdd6c317d5b05440f813998d3/openfilm-intro/make/README.md)
- **중간 자료 꼴:** `film.html`이 영상·장면 HTML·소리 트랙을 연결한다. `assets/video/`, `assets/image/`, 단어 시간이 든 `.vtt`, `lib/s6-plan.json`, 장면별 HTML이 따로 있다. 현재 형식은 클립의 `overrides`에 사람이 바꾼 글자·위치·색 등을 보존해 에이전트가 장면 코드를 다시 써도 적용한다고 명시한다. [편집 형식](https://github.com/openfilm/openfilm/blob/4c8f50a822d8c495b5d2cfeac00244aa94da6372/README.md)
- **도구·공개 설정:** 코딩 에이전트 + OpenFilm Studio/CLI + 브라우저 렌더 + FFmpeg. 이 작품에는 Blender 5.2.2 LTS, Python, 앱 녹화 스크립트, ElevenLabs도 쓰였다. [초기 대본·편집 박자표·장면 제작 스크립트의 경로](https://github.com/openfilm/examples/blob/82ce37596d6959acdd6c317d5b05440f813998d3/openfilm-intro/make/README.md)가 공개돼 있다. 제품의 [SPEC.md](https://github.com/openfilm/openfilm/blob/main/packages/openfilm/SPEC.md) 경로도 설명에 실려 있으나 이 창은 전문을 읽지 않았다.
- **사람이 고치는 곳·돌리는 곳:** 현재 설명의 `Edit` 화면에서 장면 순서·자르기·자막·글자·크기·색을 직접 고친다. `Screening`은 프레임이나 구간을 가리켜 요청하는 화면이다. UI와 에이전트가 같은 파일을 고친다. 이 작품의 앱 녹화는 macOS, 3D 렌더는 Apple Silicon Metal이었다. 사람 수정 횟수 없음.
- **시간·값:** 완성 영상 길이 1:42 외 제작 시간·총비용 없음. 현재 소스는 MIT로 안내하지만 모델·음성 호출비가 0이라는 뜻은 아니다.
- **실패·한계와 고친 법:** 녹화 속도가 느려도 매 프레임을 찍어 부드럽게 만드는 녹화 스크립트, 멈춘 3D 프레임을 재시도하는 감시 장치가 공개돼 있다. 데모 프로젝트의 일부 미디어는 빠져 있어 완전 재현은 미확인이다.
- **시연의 성격:** 제작 기록은 소개 영상 속 채팅이 **대본대로 작동하는 에이전트이며 실제 모델은 호출하지 않았다**고 명시한다. 파일 쓰기·앱 조작은 실제이나, 이 장면으로 자율 편집 성공률·한 번 요청의 성공을 주장할 수 없다.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 장면 파일과 사람 수정값을 분리하고 같은 편집 화면에서 이어 고치는 구조가 유용하다. “앱 안 편집 화면 하나” 후보로 검토하되, 소개 영상의 대본 시연을 실제 자동 제작 성능으로 세지 않는다. 처음에는 3D·음성·음악 생성 없이 자기 사진·영상과 자막으로 범위를 줄인다.
- **짧은 원문:** “No model is called.” — 위 소개 영상 제작 기록.

### X-03. cut-as-code — 남김·버림 결정표 → 검토 → 공통 타임라인 → 출력 검사

- **주소·날짜·쓴 사람 종류:** [제작 저장소](https://github.com/WhiteTowerAI/cut-as-code)와 거기에 실린 [2분 시연](https://www.youtube.com/watch?v=3yFPOC8kFxU). YouTube 검색 미리보기의 게시일은 2026-07-24이며 시간대는 미표기; 영상 페이지는 도구 조회 제한으로 못 열었다. 만든 사람. [작업법](https://github.com/WhiteTowerAI/cut-as-code/blob/f48e3072f8d8228deafb8ce1d4814bd8dd43ba30/skills/video-cut/SKILL.md)은 2026-07-23 17:06 KST 갱신.
- **만드는 것·입력:** 공개 예는 2시간 발표를 짧은 영상 네 편으로, 또 다른 예는 인터뷰에 자막·글자 카드를 넣는 작업이다. 원본 영상 한 개와 선택적 B-roll 자료가 출발점이다. 세로 9:16 변환을 지원한다고 설명한다. 한글 실측·게시글 출력 없음. [공개 예와 파일 구조](https://github.com/WhiteTowerAI/cut-as-code/blob/main/README.md)
- **차례(원문 여섯 단계):** `Download` → `Transcribe (word-level)` → `Diagnose` → `Decide the cut` → `Expand → auto-speed → render` → `Self-check`. 현재 공통 흐름은 먼저 `video-understand`에서 원본 정보를 만들고 `video-cut` 등이 같은 자료를 재사용한다. 내려받기는 사례의 단계 설명일 뿐 이 조사에서 하지 않았다.
- **중간 자료 꼴:** `work/cut/edit-plan.json`의 `id`, `action`, `start_s`, `end_s`, `reason`, `evidence_refs`가 남길/버릴 구간과 근거를 담는다. 검토물은 `cut-summary.md`, `timeline-map.png`, `boundary-review.mp4`. `work/timeline.json`에는 `source_range`, `program_range`, `speed`, `decision_ref`가 있다. [결정표 설명](https://github.com/WhiteTowerAI/cut-as-code/blob/f48e3072f8d8228deafb8ce1d4814bd8dd43ba30/skills/video-cut/SKILL.md)·[타임라인 명세](https://github.com/WhiteTowerAI/cut-as-code/blob/main/skills/video-understand/reference/timeline-schema.md)
- **도구·공개 설정:** Claude Code 등 코딩 에이전트, faster-whisper, Python, FFmpeg/FFprobe, 로컬 Editor Plugin. [각 단계 SKILL과 저장 구조](https://github.com/WhiteTowerAI/cut-as-code/blob/main/README.md)가 공개돼 있다. `work/project.json`의 단계별 `revision`·`based_on`으로 옛 결정에 기대어 굽는 일을 검사한다.
- **사람이 고치는 곳·돌리는 곳:** PC의 로컬 브라우저 타임라인과 검토 페이지에서 남김·버림, 자막 모양, 글자 카드 후보를 보고 승인한다. README는 사람 검토를 설명하지만 실제 작업에서 승인한 횟수는 없음. SKILL의 “Human (you, the model)” 표현 자체는 실제 사람 승인의 증거로 세지 않았다.
- **시간·값:** 제작 소요·편당 비용 없음. MIT·로컬 실행이라고 설명한다. YouTube의 ‘2분’은 안내 영상 길이이며 제작 시간이 아니다.
- **실패·고친 법:** Whisper가 군말을 빼므로 대본의 단어 검색만으로 삭제 위치를 잡지 않고 쉼을 함께 본다. 한 번 푼 긴 영상에 여러 자르기를 걸면 메모리가 커져 구간별 탐색 입력으로 바꾼다고 적었다. 굽고 다시 받아써 경계·검은 화면·침묵을 확인한다. [실패 대응이 있는 작업법](https://github.com/WhiteTowerAI/cut-as-code/blob/f48e3072f8d8228deafb8ce1d4814bd8dd43ba30/skills/video-cut/SKILL.md)
- **우리 길에 가져올 것 — 읽은 이의 판단:** 선택 이유와 원본/완성 시간을 분리해 적는 결정표, 자른 경계만 모은 짧은 검토 영상, 자료의 판 번호 검사를 본뜬다. **V1은 원본 하나·시간순·장면 재배열 불가**이므로 사진·영상 여러 개를 자유롭게 섞는 최종 편집표로 그대로 쓰지는 못한다. 말 빠르기 기본값도 한글 검증값으로 보지 않는다.
- **짧은 원문:** “Durable editing decisions and approval records must never live only in `work/cache/`.” — README.

### X-04. FableCut — 초안 JSON을 만들면 사람이 보는 타임라인이 곧바로 바뀜

- **주소·날짜·쓴 사람 종류:** [제작자의 Show HN](https://news.ycombinator.com/item?id=48845422), 정확한 게시 시각 미확인. 만든 사람·직접 시연. 연결된 [v1.3.0 시연 배포](https://github.com/ronak-create/FableCut/releases/tag/v1.3.0)는 2026-07-10 07:34 KST. 아래의 추가 기능은 [현재 공개 매뉴얼](https://github.com/ronak-create/FableCut/blob/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd/CLAUDE.md), 2026-11-28 02:15 KST 갱신 내용이며 7월 시연에서 전부 썼다는 뜻은 아니다.
- **만드는 것·입력:** 여러 원본 자료로 24.5초 릴을 만든 시연. 제작자는 결과를 손대지 않고 배포했다고 밝혔다. 현재 설명은 사진·영상·글자·자막 트랙과 1080×1920 세로 출력 프리셋을 제공한다. 게시글 출력 없음.
- **차례(시연에서 확인):** 자료 제공 → “edit a reel from these assets” 요청 → Claude Code가 약 6분 편집 구상 → 전체 타임라인 JSON 작성 → 이미 열린 편집 화면에 반영 → 릴 출력. **현재** 제어 수단은 전체 파일 쓰기 외 작은 수정 명령, 원본 프레임/장면 모음 검사, 내보내기로 넓어져 있다. [시연 설명](https://news.ycombinator.com/item?id=48845422)·[현재 README](https://github.com/ronak-create/FableCut/blob/main/README.md)
- **중간 자료 꼴:** `project.json`에 `width`, `height`, `fps`, `revision`, `media`, `tracks`, `clips`. 클립은 `mediaId`, `track`, `start`, `in`, `duration`으로 원본 참조와 배치를 정한다. `analysis/`에는 참고 영상 분석, `exports/`에는 출력물이 남는다. [스키마와 작업법](https://github.com/ronak-create/FableCut/blob/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd/CLAUDE.md)
- **도구·공개 설정:** Claude Code 등 MCP/REST 클라이언트, Node 로컬 서버, 브라우저 편집기, FFmpeg. `CLAUDE.md`에 스키마·레시피·MCP 연결 예·출력 조건이 공개돼 있다. 세로 출력 프리셋과 자막 기능은 현재 설명에서 확인했으며 한글 정확도를 잰 글은 아니다.
- **사람이 고치는 곳·돌리는 곳:** PC 브라우저의 타임라인에서 끌기·자르기·순서 변경, 미리보기에서 글자 위치·크기를 고친다. 에이전트 수정도 같은 화면에 실시간 반영된다. 기존 자료로 만든 시연 결과는 무수정이었다는 제작자 주장; 실제 사용자의 평균 수정 횟수 없음. 브라우저 화면만으로 끝나는 구조는 아니며 프로젝트 저장·일부 출력은 로컬 서버가 맡는다.
- **시간·값:** 제작자는 구상에 약 6분, 결과물 24.5초라고 적었다. 전체 출력까지 걸린 시간·편당 비용 없음. 이 수치는 원본 한 묶음의 자기 시연이다.
- **실패·고친 법:** 현재 설명은 사람이 먼저 편집하면 에이전트가 예전 `revision`으로 덮어쓸 때 충돌을 반환한다고 명시한다. 반대로 저장 전 사람 수정 위로 에이전트 변경이 오면 UI가 알린다. 원본을 숫자만 보고 고르는 한계를 줄이려고 프레임·장면 모음과 합성 결과 프레임을 읽는 도구도 공개했다. [충돌과 시각 확인 설명](https://github.com/ronak-create/FableCut/blob/main/README.md)
- **우리 길에 가져올 것 — 읽은 이의 판단:** **자동 초안과 사람이 손보는 앱이 같은 편집표를 읽고 쓰는 구조**가 가장 직접적이다. 판 번호 검사와 작은 수정 명령까지 함께 본뜬다. 다만 우리 앱 내장, 휴대폰 사용, 실제 사진·영상 혼합과 한글 자막은 아직 이 조사로 확인하지 못했다.
- **짧은 원문:** “the project file is the interface” — README.

## 2. 이미 있음 목록

줄 번호는 `projects/btsr/roles/rsch/sub/s15_community_research/` 아래 해당 파일 기준이다. 이름만 적으며, 지난 글의 주장·값을 이번 검증으로 다시 인정한 목록은 아니다.

| 사례·도구 이름 | 지난 파일·줄 |
|---|---|
| Telegram–CapCut Reels | S15_X.md:21, 32, 57 |
| DJI 영상 브이로그·mlx-whisper | S15_X.md:22 |
| Resolve Cut | S15_X.md:23 |
| RxFilm / film-workflow | S15_X.md:24, 38 |
| agentic-video-editing 비교·Remotion·MoviePy·FFmpeg·Video Use·HyperFrames | S15_X.md:30, 65 |
| Palmier | S15_X.md:31 |
| DaVinci Resolve 화면 조작 MCP | S15_X.md:33 |
| n8n 사진→Gemini·Kling·Late | S15_X.md:34 |
| OpenEdit·WhisperX | S15_X.md:13, 38, 53 |
| Photoroom·Faceblind·deface·InsightFace·Gen-4.5 | S15_X.md:44–47 |
| Open SMM | S15_X.md:58 |
| OpenMontage·OpenReels·short-video-maker·MoneyPrinterTurbo | S19_X.md:53–56 |
| HyperFrames·Remotion Agent Skills | S19_X.md:57, 71–77 |
| Remotion 제품 시연 제작기·Framecall | S19_X.md:75, 78 |
| ffmpeg-skill·video-agent·Diffusion Studio·Shotstack | S19_X.md:80–83 |
| VectCutAPI·capcut-mate·capcut-cli·pyJianYingDraft | S19_X.md:86–87 |
| Mosaic·Cardboard·ChatCut·auto-editor·Kino AI | S19_X.md:89, 97–99 |
| DaVinci Resolve MCP·Premiere 공동체 MCP | S19_X.md:91 |
| Nano Banana Pro·GPT Image 2·Qwen-Image-Edit·FLUX.1 Kontext·DeepPrivacy2 | S19_X.md:127–129, 138 |
| Veo·Kling·Seedance·Wan·MiniMax | S19_X.md:39, 132 |
| 직접 짠 광고 영상 파이프라인·vidpipe·60일 n8n 운영기 | S19_X.md:146–150 |
| Telegram 봇·claude-telegram-remote | S19_X.md:160, 163 |
| ElevenLabs·Kokoro·Lyria·Suno·Udio | S19_X.md:54–55, 109, 116–118 |
| Claude Code·Seedance 10분 영화·6주 YouTube 에이전트·cartoon-studio | S19_X.md:203, 222, 241 |

## 3. 본뜰 것 다섯 — 읽은 이의 판단

1. **받기·살피기 — X-01:** 원본 사진·영상마다 실제 길이·방향·대표 화면을 확인하고 자료 번호를 붙인다. 파일명만 보고 장면을 고르지 않는다. 말 없는 영상에는 받아쓰기를 필수 단계로 두지 않는다.
2. **장면 짜기 — X-01·X-03:** 편집표에 원본 자료·원본 시작/끝·완성 시작/끝·선택 이유·화면 문구를 적는다. 원본/완성 시간 대응을 보존해 자른 뒤 자막을 다시 맞춘다. 여러 사진·영상을 담아야 하므로 X-03의 원본 하나 제한은 넘겨야 한다.
3. **앱 안에서 손보기 — X-04·X-02:** 자동 초안과 사람의 타임라인이 같은 자료를 쓰게 한다. 수정할 때 판 번호를 확인하고, 사람의 글자·배치 변경은 보존한다. X-01의 프레임 의견은 보조 검토 기능으로 붙인다.
4. **한글 자막·검사 — X-01·X-03:** 자막 자료를 따로 두고, 자르기 경계를 바꾸면 타이밍을 다시 계산한다. 경계 전후 화면과 최종 세로 MP4를 함께 확인한다. 한글 글꼴·줄바꿈·잘림 검사는 별도로 필요하며 네 카드에서 통과한 것으로 세지 않는다.
5. **내보내기·올릴 글 — X-04의 판별 출력과 X-01의 승인본 보존:** 승인한 편집표 판 번호와 MP4를 묶고, 같은 판의 올릴 글을 별도 파일로 돌려주는 계약을 추가한다. **게시글 묶음은 이번 사례의 확인된 기능이 아니라 우리 요구에 맞춘 제안**이다. 제작 시간·값·수정 횟수도 그 판에 기록하면 홍보 시연과 실사용을 구별할 수 있다.

## 4. 못 연 곳 · 막힌 곳 · 남은 빈칸

| 구분 | 주소 | 실제 반환 문구·확인 범위 |
|---|---|---|
| 막힘·접근 거부 | https://x.com/moritzkremb/status/2107103155800658028?s=20 | `Failed to fetch https://x.com/moritzkremb/status/2107103155800658028?s=20: (403) Forbidden` — 연결된 출시 글을 못 읽었고 X 추가 접근을 중단했다. 거울 사이트를 열지 않았다. |
| 막힘·접근 거부 | https://tangled.org/cee.wtf/daily-bsky-hype-vid/commit/dc8b00a0ed52818d91e9066a67e484b38c9ec38e | `Failed to fetch https://tangled.org/cee.wtf/daily-bsky-hype-vid/commit/dc8b00a0ed52818d91e9066a67e484b38c9ec38e: (403) Forbidden` — 해당 사이트 추가 접근 중단. 검색 미리보기만으로 세팅 카드를 만들지 않았다. |
| 못 엶·도구 조회 제한 | https://www.youtube.com/watch?v=3yFPOC8kFxU | `Failed to fetch https://www.youtube.com/watch?v=3yFPOC8kFxU: Online fetch throttled` — 검색 미리보기의 날짜·제목과 연결 저장소만 사용. 영상 내용은 봤다고 쓰지 않았다. |
| 못 엶·도구 지원 범위 | https://hacker-news.firebaseio.com/v0/item/50152136.json | `URL https://hacker-news.firebaseio.com/v0/item/50152136.json is not accessible via this tool.` — HN 게시 시각을 추정하지 않았다. |
| 못 엶·도구 지원 범위 | https://hacker-news.firebaseio.com/v0/item/48845422.json | `URL https://hacker-news.firebaseio.com/v0/item/48845422.json is not accessible via this tool.` — 시연 배포일을 별도로 확인했다. |
| 일부만 열림 | https://bsky.app/profile/joshuashew.bsky.social/post/3musoqtgiicnw | 글 한 개와 `Enable JavaScript to use Bluesky.`가 보였다. 공개 검색에는 글타래 일부가 나오지만 연결 인용 글의 세팅까지 확인하지 못했다. `video-use`·Remotion 언급만으로 새 카드로 세지 않았다. |
| 찾지 못함·접근 거부 아님 | https://www.threads.com/ | `site:threads.com`의 영상 편집·Claude·Remotion 검색에서 중간 파일과 사람 수정 위치까지 드러난 새 사례를 찾지 못했다. 실제 로그인 화면을 확인한 것은 아니다. |

- 검색에 자동으로 나온 X 거울·GitHub 복제 사이트는 열거나 근거로 쓰지 않았다. X 본문을 못 본 자리를 다른 사이트로 우회해서 메우지 않았다.
- 사람 이름·아이디는 본문에 쓰지 않았다. 출처 주소 자체의 경로는 원문 확인에 필요한 그대로 남겼다. 손님 자료·키·개인 설정은 읽거나 기록하지 않았다.
- 이 파일 하나만 작성했다. 제품 파일·다른 역할 파일은 고치지 않았고 커밋·push를 하지 않았다.
