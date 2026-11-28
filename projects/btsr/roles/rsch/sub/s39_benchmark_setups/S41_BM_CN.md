# S41_BM_CN — 중국어 커뮤니티의 자동 영상 제작 세팅

- 조사 기준 시각: **2026-11-28 18:22:12 KST**. PowerShell로 한국 시각 확인. 의뢰: `OPEN_PACKET.md`의 S41_BM_CN.
- 새 세팅 **8개**. 지난 두 파일에 있는 사례의 재수록은 0개. 먼저 기존 이름을 추렸고, 검색어는 중국어로 썼다.
- 공개 본문·중국어 저장소 설명만 읽었다. 아래 ‘동작’은 글쓴이의 보고이며 이 조사에서 설치·실행해 확인한 결과가 아니다. 날짜 없는 저장소를 검색 수집일만으로 최신 사례라 부르지 않았다.
- **읽은 이의 판단:** 가장 가까운 조합은 C5의 소재 선택 기록 → C2의 앱 안 수정 화면 → C6의 영상·자막·게시글 묶음이다. 촬영 사진·영상 혼합, 한글 자막, 앱 안 편집을 모두 끝까지 시험한 중국어 사례는 이번 자료에서 확인하지 못했다.

## 1. 세팅 카드

### C1. cut-video — 자르기 전후의 말이 같은지 대조하는 세팅

- **주소·날짜·종류:** [V2EX 제작 글](https://www.v2ex.com/t/1259707), 열람 화면에 `2 days ago`만 표시(정확한 게시일 미확인); [중국어 README](https://github.com/Qsnh/cut-video). 만든 사람.
- **넣는 것·만드는 것:** 직접 찍은 단일 영상·설명 녹화 → 잘라 낸 MP4와 SRT. 세로 화면 지원. 여러 사진·영상을 섞는 다중 트랙 도구는 아니며 게시글 생성은 없음.
- **차례:** `Inspect the input and plan the edit` → 받아쓰기에서 말버릇 후보 찾기 → 주변 문장·파형 대조 → 계획 검사 → 렌더 → 다시 받아쓰기 → `Deliver and verify`.
- **중간 자료:** 일정 프레임률의 계획에 `fps`, `keep`, `drop`; 원본 시각 SRT와 최종 시각 SRT를 구별한다. [공개 계획·검사 지침](https://github.com/Qsnh/cut-video/blob/main/SKILL.md).
- **도구·공개 설정:** Claude Code/Codex용 Skill, 로컬 받아쓰기·렌더·검사 스크립트. 위 `SKILL.md` 공개. 목소리 변경은 선택 기능이며 이 카드의 본뜰 범위에서 제외.
- **사람 수정·돌리는 곳:** PC의 에이전트 대화에서 잘라 낼 구간·자막 글꼴·속도를 고치고 짧은 미리보기 스타일을 선택. 전용 타임라인 화면·확인 횟수는 명시 없음.
- **시간·값:** 처리시간·편당 값 없음. 예제는 18.4초 → 13.8초; 본문 글자 수 52개 유지라는 제작자 검사 결과. 길이 감소를 처리속도로 읽지 않는다.
- **실패·수정:** 받아쓰기 시각만 믿으면 음절을 자르거나 말버릇이 남음 → 파형에서 경계를 잡고 결과를 다시 받아써 대조. 말버릇 자동 판별은 중·영문만 지원.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 한글 자막도 원본 문장·최종 자막·잘린 구간을 나란히 검토할 수 있게 한다. 중문 규칙을 한국어 성능 근거로 쓰지 않는다.
- **짧은 원문:** “剪完会核对有没有误删。”

### C2. JJYB_AI 智剪 — 자동 초안 뒤 같은 작업대에서 사람이 수정

- **주소·날짜·종류:** [중국어 저장소](https://github.com/jianjieyiban/JJYB_AI_VideoAutoCut), 유지보수 2026-11-18(v3.4.8); [사용 설명](https://github.com/jianjieyiban/JJYB_AI_VideoAutoCut/blob/videoautocut/docs/%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.md) 2026-10-18. 만든 사람.
- **넣는 것·만드는 것:** 로컬 영상 하나·여러 개 → 합성 MP4 또는 편집 초안. 소재함에는 사진도 있으며 편집기로 끌어올 수 있다. 사진·영상 혼합 자동 제작 실측과 한글 자막 실측은 없음.
- **차례:** 혼합 편집은 `选择混剪模式` → `项目配置` → `上传素材` → `检测` → `评分选片` → `合成` → 미리보기 → 편집기에서 미세 수정 → 내보내기.
- **중간 자료:** 장면별 문안과 화면 구간, `timeline`·`audio_paths`, SQLite 프로젝트 기록, 영상·자막 등 분리 트랙. README의 ‘草稿包说明’과 ‘运行数据位置’에 공개; 하나의 완전한 타임라인 예제 JSON은 이번에 확보하지 못함.
- **도구·공개 설정:** Flask/PyWebView, FFmpeg, TransNetV2(실패 시 OpenCV), 선택형 시각 모델·받아쓰기. [문안 프롬프트 파일](https://github.com/jianjieyiban/JJYB_AI_VideoAutoCut/blob/videoautocut/backend/prompts/narration_prompts.py)은 README에 경로 공개(파일 본문 미열람).
- **사람 수정·돌리는 곳:** Windows PC의 `/editor`. 가운데 미리보기, 아래 시간선에서 순서·길이·편집점, 오른쪽에서 위치·크기·내보내기 규격 수정. 설명문 생성 경로는 문단을 사람이 먼저 고칠 수 있음. 반복 횟수 없음.
- **시간·값:** 편당 시간·값 없음. **코드 공개지만 상업 이용은 사전 서면 허락이 필요하다고 명시**하므로 그대로 내장할 후보로 취급하지 않는다.
- **실패·수정:** 11-18 수정에서 초안이 실제 완성본에 남은 구간만 참조하도록 고침. 제작자도 외부 편집기에서 열기·재생·저장·다시 열기 검증은 별도라고 적음.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 자동화가 만든 편집표를 같은 화면의 시간선으로 펼치고, 사람이 바꾼 순서·길이를 최종 내보내기에 그대로 반영하는 구성.
- **짧은 원문:** “完成后可直接预览、下载成片，或进入编辑器微调。”

### C3. Hypit — 다시 쓸 수 있는 영상 구성 원본

- **주소·날짜·종류:** [V2EX 제작 경위](https://www.v2ex.com/t/1244037), 2026-09-22; [중국어 README](https://github.com/hypit-ai/hypit/blob/main/README.zh-CN.md)는 게시일 없음. 만든 사람·판매 서비스 연결 있음.
- **넣는 것·만드는 것:** 참고 영상·서술·템플릿 → 자막·보조 영상·효과를 가진 구성 원본과 완성 영상. 공개 예제는 생성 소재 중심이며 자기 촬영 사진·영상 혼합 검증과 게시글 출력은 확인 못함.
- **차례:** 참고 구조 또는 요청 → workflow 작성 → 소재 생성·재사용 → 낱말 시각 정렬 → 구성요소 배치 → 렌더 → 일부 요소만 바꾸어 재생성.
- **중간 자료:** **SVML 원본**. 효과를 고정 초수 대신 발화 낱말에 연결한다. 중국어 README의 ‘Generation source’·‘Run and production notes’가 예제별 공개 파일 입구다(그 하위 파일은 미열람).
- **도구·공개 설정:** 코딩 에이전트, 예제의 Seedance 2 Mini·GPT Image 2, WhisperX, Chromium 렌더. 저장소의 `skills/hypit` 공개 경로 확인; 이 조사에서 설치하거나 적용하지 않음.
- **사람 수정·돌리는 곳:** 설명에는 왼쪽 SVML·오른쪽 실시간 결과 화면. 바꾸려는 문구·화면 요소를 고쳐 반복한다. PC의 로컬 렌더 가능; 필수 사람 확인 단계·횟수는 없음.
- **시간·값:** 중국어 README의 생성 예제 20초 1.15달러·18초 1.07달러·26초 1.09달러(제작자 수치, 처리시간 없음). 실제 촬영분 편집 가격으로 일반화하지 않음.
- **실패·수정:** 음성을 다시 만들면 초수로 붙인 효과가 밀린다는 제작 경험 → 낱말을 기준점으로 삼음. 초기 템플릿이 적다고 명시.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 컷·자막·효과를 각각 고칠 수 있는 원본을 남긴다. 무음 사진 구간은 고정 길이, 발화가 있는 구간은 실제 시각에 연결하는 분리가 유용하다.
- **짧은 원문:** “你就需要一份可编辑的源码。”

### C4. AriaFlow — 시리즈 설정과 단계별 산출물을 남기는 서비스

- **주소·날짜·종류:** [V2EX 공개 제작 글](https://v2ex.com/t/1229530), 2026-07-24·값 설명 댓글 07-25. 만든 사람 겸 파는 쪽; 본인이 홍보·제품 검증 글이라고 명시.
- **넣는 것·만드는 것:** 주제 또는 기사 주소 → 설명 영상·팟캐스트 영상. 자기 촬영분 입력은 이 글에 없음. Shorts/TikTok용 비율 설정 지원.
- **차례:** `视频脚本` → `分镜和图片提示词` → `AI画面` → `多语言配音` → `字幕` → `最终视频`; 수동 시작 또는 예약 실행.
- **중간 자료:** 대본·그림·소리·영상 각각 내려받기 가능. 장면표의 칸 이름·JSON·파일 구조는 공개하지 않음.
- **도구·공개 설정:** 서비스의 작업 흐름 설정에 언어·음색·화풍·영상 비율·게시 시각·채널을 둠. 모델·굽기 도구·자막 엔진 및 실행 설정 파일은 없음.
- **사람 수정·돌리는 곳:** 웹에서 작업 흐름을 설정하고 분리 산출물을 받아 외부에서 계속 편집할 수 있다는 설명. 서비스 안 수정 화면·의무 확인 횟수는 없음. 서버형 서비스이며 PC·휴대폰별 실측 없음.
- **시간·값:** 제작자 댓글상 1분 영상 약 6~10위안, 그림 빈도에 따라 달라짐. 처리시간 없음.
- **실패·수정:** 세 번째 그림 실패·소리 완료 뒤 렌더 시간 초과·재시작 때 전체 재생성 문제가 개발 과제로 명시됨. 해결 완료나 복구율을 확인한 글은 아님.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 시리즈의 규격과 편집표를 재사용하고 각 단계의 파일을 보존한다. 예약 게시와 생성 모델은 우리 첫 판에서 본뜰 부분이 아니다.
- **짧은 원문:** “生成的脚本、图片、音频和视频也都可以单独下载。”

### C5. dsh-autocut — 사람이 고른 소재 목록을 편집표에 연결

- **주소·날짜·종류:** [중국어 README](https://github.com/lolistlisa/dsh-autocut), 게시일 없음; [변경 기록](https://github.com/lolistlisa/dsh-autocut/blob/main/CHANGELOG.md)도 날짜 없이 0.3.0/0.2.3 표기. 만든 사람.
- **넣는 것·만드는 것:** 문안·말하기 녹음·로컬/온라인 소재 → 여러 트랙의 시간선·미리보기·편집 초안 또는 OTIO. 사진·영상 혼합 및 세로·한글 완성본 실측은 없음.
- **차례:** `init → analyze → research → review` → 브라우저 선택 → `prepare_selections → transcribe/estimate_timing → index → match → timeline → preview → export_jianying`. 음악 단계는 별도 선택 기능.
- **중간 자료:** `.autocut/` 아래 `script_graph.json`, `asset_catalog.json`, `asset_matches.json`, `review.html`, `selections.json`, `timeline.json`, `timeline.otio`, SRT. [공개 산출물 명세](https://github.com/lolistlisa/dsh-autocut#快速开始11-阶段).
- **도구·공개 설정:** DeepSeek Harness, DeepSeek, ffprobe/FFmpeg, faster-whisper, 剪映 또는 OTIO 수용 편집기. [도구 구현](https://github.com/lolistlisa/dsh-autocut/blob/main/index.js)·`cordis.patch.yml` 경로 공개; 설정값 본문은 미열람.
- **사람 수정·돌리는 곳:** Windows PC 우선. `review.html`에서 소재를 체크해 `selections.json`으로 저장한 뒤 편집 초안을 정밀 수정. 사람 잠금 우선, 소재 교체는 이후 단계만 다시 수행. 고치는 횟수 없음.
- **시간·값:** 없음. 제작자는 剪映 11.6.0.14552에서 초안을 열었다고 보고; 다른 판은 미검증.
- **실패·수정:** 새 剪映 초안 형식에 맞춘 별도 구현 의존을 명시. 실제 최종 MP4 내보내기·여러 판 호환의 독립 검증은 없음.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 원본 소재 목록·자동 추천·사람 확정을 따로 저장한다. 첫 판은 직접 찍은 소재만 보여 주고, 선택과 잠금을 앱 안 편집표에 남기는 흐름을 본뜬다.
- **짧은 원문:** “局部重剪：换镜头/换配乐/改音效只重跑下游，人工锁定优先。”

### C6. ai-cut — 시간선과 게시글을 서로 다른 자료로 출력

- **주소·날짜·종류:** [중국어 README](https://github.com/ghostxiafan/ai-cut)·[구현 및 자체 검증 기록](https://github.com/ghostxiafan/ai-cut/blob/master/PROJECT.md), 게시일 없음. 만든 사람.
- **넣는 것·만드는 것:** 로컬 단일 말하기 영상 또는 기존 SRT → MP4·ASS·시간선 JSON·플랫폼별 문안 JSON. 여러 사진·영상 혼합은 미지원. 세로 규격은 가능하나 움직이는 피사체 추적은 없음.
- **차례:** `上传视频 → 自动转写 → 挑高光片段 → 出字幕 → 出成片 → 生成各平台发布文案`; 세부 제어는 `transcribe → select → autoplan → 手改 timeline.json → render`.
- **중간 자료:** `canvas.w/h/fps`, `tracks.video[].src/in/out`, `tracks.text[].text/start/end/style`. 게시글은 플랫폼마다 `title/body/hashtags`; 화면 문구와 별개다. 위 `PROJECT.md`에 예제 공개.
- **도구·공개 설정:** faster-whisper·OpenCC·FFmpeg/ASS·Streamlit, 문안용 DeepSeek. `PROJECT.md`에 모델·단계별 명령과 구성 공개; 완성 작업 흐름 JSON 배포 여부는 확인 못함.
- **사람 수정·돌리는 곳:** PC의 웹 화면에서 목표 길이·화면 비율·게시처를 고르고 결과를 미리 봄. 정밀 수정은 `timeline.json`을 손으로 바꿔 재렌더. 전용 시각 시간선·확인 횟수 없음.
- **시간·값:** 자체 기록은 웹 전 과정 50.9초(문안 후보 3개×4플랫폼), CPU 받아쓰기 약 원본 길이의 1~2배. 서로 다른 시험 조건일 수 있음. 편당 값 없음.
- **실패·수정:** 무음 영상에서 화면이 계속 대기 → 오류 상태 표시 및 균등 구간 선택. 글에서 단순 규칙 점수가 기본이고 LLM 재정렬은 선택이라고 밝힘.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 한글 자막·화면 제목과 올릴 글을 서로 다른 칸으로 두고, 같은 작업 번호 아래 함께 반환한다. 파일 편집 자리는 우리 앱 안 화면으로 옮겨야 한다.
- **짧은 원문:** “视频内文案” / “发布文案”.

### C7. web-video-produce — 촬영분 규격을 맞춘 뒤 편집표대로 합성

- **주소·날짜·종류:** [중국어 README](https://github.com/JinSuperOfficial/web-video-produce), 게시일 없음. 만든 사람. 촬영분 편집 경로에는 `Experimental` 표시.
- **넣는 것·만드는 것:** 기존 촬영 소재와 EDL 편집표 → `output/edit.mp4`; 생성 그래픽 조각도 소재로 섞을 수 있음. 별도 생성 경로는 대본 → 음성 → 코드 → MP4. 게시글 기능 없음.
- **차례:** `conform`(규격 통일) → `assemble`(자르기·잇기) → `finish`(자막·압축 등). `plan`으로 계획을 본 뒤 `build`. 전체 제작 원칙은 정지 화면 → 3초 샘플 → 전체 렌더 → 규격·화면 검사.
- **중간 자료:** JSON EDL, `examples/edit-plan.example.json`을 README에서 지목. 예제 폴더 열기가 거부돼 **실제 칸 이름은 미확인**. 파일 형식·차례만 근거로 삼음.
- **도구·공개 설정:** DeepSeek Harness Skill, FFmpeg·ffprobe, 생성 장면은 Remotion. `SKILL.md`, `scripts/vedit.py`, 예제 파일 경로 공개; 이번에는 README만 근거로 읽음.
- **사람 수정·돌리는 곳:** PC에서 EDL·장면 코드를 고치고 샘플 확인. 전용 시각 편집기·사람 확인 의무·횟수는 없음. macOS/Linux 및 Windows Git Bash/WSL 경로 설명.
- **시간·값:** 촬영분 편집 처리시간·값 없음. 공개 11초 샘플의 길이는 처리시간이 아니다.
- **실패·수정:** 해상도·프레임률·소리 트랙이 다른 자료의 직접 연결을 피하고 먼저 통일. 전환 실패 시 단순 연결로 낮추며, 마지막에는 오류와 중간 자료를 남긴다고 설명.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 휴대폰 사진·영상 접수 직후 방향·규격·길이를 검사하고, 세로 자르기/여백 선택을 편집표에 남긴다. 샘플 검사를 통과한 설정으로 전체를 굽는다.
- **짧은 원문:** “先样片后全片。”

### C8. NarratoAI — NAS에서 소재·대본을 받는 사용자의 시험

- **주소·날짜·종류:** [少数派 직접 사용 글](https://sspai.com/post/108382), 2026-04-08 — **여섯 달 넘음**. 써 본 사람. [현재 공개 저장소](https://github.com/linyqh/NarratoAI)는 07-16 변경 기록도 있으나 이를 4월 시험 결과에 섞지 않음.
- **넣는 것·만드는 것:** 영상·대본 또는 영상에서 뽑은 장면 → 설명문·자막·음성이 맞춰진 영상. 직접 촬영 소재인지·세로인지 명시 없음. 짧은 드라마 경로는 사용자가 시험하지 않았다고 밝힘.
- **차례:** NAS의 웹 화면 열기 → 대본과 영상 각각 업로드 → 문안을 자막으로 전환·음성 매칭 → 결과 확인. 다른 경로는 `抽帧` → 장면별 설명 → 최종 대본.
- **중간 자료:** 업로드할 대본·영상, 별도 자막 파일. 대본의 실제 칸 이름·편집표 JSON은 글에 없음. 설정은 `config.toml`, 배치는 `docker-compose.yml`로 설명.
- **도구·공개 설정:** NAS/Docker, 웹 화면, 선택형 LLM 시각·텍스트·TTS. [공개 저장소](https://github.com/linyqh/NarratoAI)의 설정 예제 파일 존재를 확인했으나 키가 들어갈 설정 본문은 열지 않음. 글에서 굽기·자막 엔진 이름은 특정하지 않음.
- **사람 수정·돌리는 곳:** NAS가 처리하고 브라우저에서 소재·대본·모델을 설정. 단계별 미리보기 화면을 제시하지만 타임라인 수동 수정·확인 횟수는 없음.
- **시간·값:** 최초 환경 빌드 약 10분이라는 사용자의 어림값. 영상 한 편 처리시간·값은 없음.
- **실패·수정:** 실행 실패는 `storage` 권한, 화면 오류는 설정 파일 UTF-8 문제를 점검했다고 설명. 이 조사에서는 권한 변경·설정 수정·실행을 하지 않음.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 접수 화면과 처리기를 분리하되, 대본·소재가 실제로 들어갔는지와 실패 단계를 화면에 남긴다. 이 글을 완전 자동 제작·게시 성공의 근거로 쓰지 않는다.
- **짧은 원문:** “这里我便不做继续的测试了。”

## 2. 이미 있음 목록

출처 파일: `projects/btsr/roles/rsch/sub/s15_community_research/S17_CN.md`, 같은 폴더의 `S21_CN.md`. 이름·사례와 원래 줄 번호만 적었다.

- 상품 사진 한 장·장면표·ecommerce-video-skills·FFmpeg·edge-tts — S17_CN.md:21,30,38,84.
- 여섯 편 홍보물·에이전트의 剪映 화면 조작 — S17_CN.md:31,38,85.
- Pixelle-Video — S17_CN.md:22; S21_CN.md:52.
- AgentCut — S17_CN.md:23,50,68.
- AutoClip — S17_CN.md:24,60,61.
- 灵机剪影·BeatDesign — S17_CN.md:15,52,75.
- 飞书–ComfyUI–Topaz — S17_CN.md:59,87.
- pyJianYingDraft·VectCutAPI·capcut-mate·扣子/剪映小助手 — S17_CN.md:32; S21_CN.md:70,73,74,78.
- momovoicesub·DaVinci Resolve·Premiere — S17_CN.md:33,97.
- Wan 3.0·Seedance 2.5·PixVerse 4.5 — S17_CN.md:34,46.
- CSDN 39초 자막·중복 결과 시험 — S17_CN.md:39,74,100.
- 브라우저 배경 제거·얼굴 가리기·ai-auto-censor — S17_CN.md:44,45,103,104.
- 片语 — S17_CN.md:58,106.
- 小云雀·LibTV·万镜一刻·纳逗Pro — S21_CN.md:28,161.
- OpenMontage·MoneyPrinterTurbo·YumCut·ViMax·aiVideo·Huobao Drama — S21_CN.md:53,54,55,56,57,58.
- OpenClaw+QQ+Seedance+수동 剪映 사례 — S21_CN.md:62.
- Claude Code+Remotion·remotion-best-practices·MoviePy·ImageMagick — S21_CN.md:84,85,86,88.
- video-use·ElevenLabs Scribe — S21_CN.md:90,91,92.
- CosyVoice 3·IndexTTS·Fish Speech·GPT-SoVITS·edge-tts·pyvideotrans — S21_CN.md:103,104,105,106,107.
- WhisperX·Whisper·FunASR·Suno·Mureka — S21_CN.md:112,113,119.
- 打码鸭·武松打码·OpenCV·face_recognition·YOLO·FaceFusion·Roop — S21_CN.md:127,128,129,136.
- Qwen-Image-Edit·Nano Banana 2·Wan 2.2·ComfyUI — S21_CN.md:140,141,146,147.
- DirectorAI·n8n+飞书·Blotato·OpenClaw+飞书·feishu-media·feishu-video-editor·xiaohongshu-mcp — S21_CN.md:158,162,181,182,187,190,192,195.

## 3. 본뜰 것 다섯 — 읽은 이의 판단

1. **받기·고르기:** C5의 `asset_catalog → asset_matches → selections`를 본떠 원본, 추천, 사람이 고른 결과를 구분한다. 선택을 고쳐도 원본이나 확정한 다른 장면을 덮어쓰지 않는다.
2. **편집표 만들기:** C6의 `canvas`, 영상의 `src/in/out`, 자막의 `text/start/end`를 출발점으로 삼는다. 직접 찍은 사진은 표시 길이·세로 화면 배치를 별도로 더해야 한다(이번 사례가 제공한 완성 규격은 아님).
3. **앱 안에서 고치기:** C2처럼 자동 초안을 가운데 미리보기와 아래 시간선으로 펼친다. 문구·순서·구간·크기를 고치고, C5처럼 사람이 잠근 부분을 다음 자동 작업이 유지하게 한다. C2 코드의 상업 이용 허락과 화면 구성의 벤치마킹을 구별한다.
4. **굽기·자막 검사:** C7의 규격 통일 → 정지 화면 → 3초 샘플 → 전체 출력 순서를 쓰고, C1처럼 편집 전후 문장을 대조한다. 한글 글꼴·줄바꿈·가격 숫자는 실제 출력에서 확인해야 하며 중국어 성공 보고로 대신할 수 없다.
5. **사람 확인·전달:** C6처럼 MP4·자막·게시글을 한 묶음으로 주되 자막과 `title/body/hashtags`를 별도 수정칸으로 둔다. 최종 영상과 올릴 글을 함께 확인하는 자리를 우리 앱에 마련한다. 자동 SNS 게시를 완료 조건에 넣지 않는다.

## 4. 못 연 곳 · 막힌 곳

- **권한 거부 — 知乎:** https://zhuanlan.zhihu.com/p/2084261809754747956 — 도구 문구 `Failed to fetch ...: (403) Forbidden`. 해당 사이트 추가 열람·우회 없음. 검색 미리보기만으로 카드에 넣지 않음.
- **권한 거부 — GitHub의 특정 폴더:** https://github.com/JinSuperOfficial/web-video-produce/tree/main/examples — `Failed to fetch restricted URL`. 이후 다른 경로·명령으로 그 폴더나 파일을 열지 않았고 GitHub 추가 조회도 중단. C7의 실제 EDL 칸은 미확인으로 남김.
- **본문 읽기 실패 — B站:** https://www.bilibili.com/read/cv52556665/ — `This page has no readable lines.` 로그인 벽·권한 거부라고 단정할 화면 근거는 없음. 해당 사이트 추가 조회 없음.
- **연결 실패 — 飞书 문서:** https://p9mf6rjv3c.feishu.cn/wiki/SP8swLLZki5WRWkhuFvc2CyInDg?from=from_copylink — `(500) Redirected to https://my.feishu.cn/wiki/SP8swLLZki5WRWkhuFvc2CyInDg?from=from_copylink which is not accessible via this tool. (non-retryable error)`. 다른 주소로 재시도하지 않음.
- **검색 미발견 — 小红书:** `site:xiaohongshu.com/explore 自动剪辑 工作流`에서 쓸 만한 공개 노트 주소를 확보하지 못함. 열지 않은 페이지를 로그인 차단으로 세지 않음.
- 掘金의 공개 [扣子 제작 글](https://juejin.cn/post/7637407916648136750)은 이번에는 본문이 읽혔다. 다만 기존 扣子 계열 사례이고 새 카드보다 관련성이 낮아 제외. CSDN 검색에서도 추가 카드로 삼을 만큼 구체적인 1차 세팅을 확보하지 못함.
- 읽기 범위는 의뢰서·지정된 이전 파일 둘·공개 웹, 쓰기는 이 파일 하나. 로그인·설치·다운로드 실행·커밋·push 없음.
