# S40_BM_REDDIT — 남의 자동화 세팅에서 본뜰 것

자료 확인 시각: 2026-11-28 18:24:07 KST · 파일 검사 시각: 18:28:12 KST. 의뢰서와 S16_REDDIT·S20_REDDIT만 읽어 중복을 가렸다. 새 세팅 카드 10개, 기존 사례 재수록 0개. 공개 글·공개 파일만 읽었고 설치·영상 처리·로그인·게시·커밋은 하지 않았다.
날짜는 Reddit 검색 결과의 게시일을 썼다. 본문 열람 결과의 상대 시각은 수집본마다 달라 날짜 계산에 쓰지 않았다. HN 두 글은 정확한 게시일을 직접 확인하지 못해 화면의 상대 시각을 그대로 남겼다. 아래 구성·시간·값은 각 작성자의 보고이며 이 조사에서 실행 검증한 수치가 아니다.

## 1. 세팅 카드

### C01. 사진·영상 목록을 한 번 만든 뒤 여러 편에 재사용
- **주소·날짜·종류:** [Reddit 원글][c01], 2026-11-20·추가 설명 11-21. 써 본 사람. 본문을 열었고 추가 댓글은 검색 결과의 공개 본문으로 확인.
- **넣는 것 → 만드는 것:** 두 휴대폰에서 직접 찍은 사진 약 2,000장·영상 약 1,000개 → 30초 여행 릴·사진 모자이크·실수 장면 모음. 세로 규격·자막·게시 글은 미공개.
- **차례:** AirDrop → 한 폴더에 모으기 → 각 파일 설명·필요한 받아쓰기 → database/catalog → 원하는 종류의 montage 요청 → 잘못된 전환·자르기 지적 → 수정.
- **중간 자료:** 파일·장면별 설명과 받아쓰기를 담은 DB/catalog. 작성자도 “DB file I guess”라 했으며 DB 종류·칸 이름·파일은 공개하지 않았다. 별도 소개 사이트가 제안한 JSON/SQLite는 이 사람의 실제 설정으로 옮기지 않았다.
- **도구·설정 공개:** Claude Code·Opus 5.5 middle, 별도 skill/plugin은 쓰지 않았다고 답함. 굽는 도구 이름·전체 프롬프트·설정 파일 없음.
- **사람·실행 장소:** PC에서 대화로 전환·자르기를 고침. 편집 화면·횟수 없음. 영상 굽기는 자기 컴퓨터라고 답했으나 모든 분석이 로컬이라는 증거는 없음.
- **시간·값·실패:** 목록 만들기 약 2시간. 일반 Claude 구독으로 사용량 문제는 없었다는 자기 보고, 실제 비용 없음. 전환·자르기 오류는 말로 다시 고침. 완성 영상·편집 파일은 공개되지 않아 결과 품질은 미확인.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 원본 설명을 한 번 저장하고 새 초안마다 재사용. 원본 번호와 선택 구간을 사람이 볼 수 있게 덧붙일 것. “무제한 영상”은 성능 보장이 아닌 작성자의 표현.
- **짧은 인용:** “create a database/catalog with a clear description of each one”

### C02. AskEditor — AI가 배치한 글자를 같은 화면에서 손으로 수정
- **주소·날짜·종류:** [Reddit 시연 글][c02], 2026-11-14. 만든 사람·파는 쪽. [별도 공개 스킬 README][askpack]도 대조.
- **넣는 것 → 만드는 것:** 편집 중인 영상과 “5초에 구독 버튼” 요청 → 타임라인의 글자 그래픽. 이 시연만으로 직접 촬영 사진·영상 혼합이나 한글 자막 완성을 입증하지는 않음.
- **차례:** Claude에 요청 → MCP로 0:05에 그래픽 배치 → 사람이 graphic layers를 열어 `Subscribe`를 `Subscribe!`로 수정 → 마지막에 내보내기.
- **중간 자료:** 수정 가능한 타임라인·그래픽의 글자 레이어. 앱 내부 저장 형식·JSON 칸 이름은 글에 없음.
- **도구·설정 공개:** AskEditor·Claude Code·MCP. 글에 [연결 안내](https://askeditor.com/claude)와 [공개 편집 스킬][askpack] 주소가 있음. 공개 스킬은 앱 본체와 다른 산출물: README가 영어·한 화면 한 사람·완성 MP4·수정 때 재렌더라는 한계를 명시.
- **사람·실행 장소:** Claude 데스크톱 Code 탭 안 편집 화면에서 글자 한 번 수정. 브라우저 편집기 주소도 소개. 앱 서버/로컬 처리 분담은 미확인.
- **시간·값·실패:** 처리 시간 없음. 글 당시 무료 편집·1080p 내보내기, AI 생성은 크레디트라고 설명. 반복 요청 없이 오타를 고치는 시연이며, 실패율 측정은 없음.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 글자·사진·영상 조각을 편집 가능한 요소로 남겨, 우리 앱의 편집 화면에서 직접 고친다. 공개 스킬만 가져와도 같은 화면이 생긴다고 보지 말 것. 임베드 허용·기술 연결은 별도 확인 필요.
- **짧은 인용:** “everything it makes stays editable by hand.”

### C03. 일상 편집자의 `edit.json`·저화질 초안·시각을 찍은 피드백
- **주소·날짜·종류:** [Reddit 질문과 댓글][c03], 2026-11-08. 본문은 써 본 사람의 지연 호소, 아래 세팅은 “우리의 반복 요청을 줄였다”고 밝힌 다른 사용자의 댓글. 둘을 같은 사람의 전후 기록으로 보지 않음.
- **넣는 것 → 만드는 것:** 원본 영상·Whisper 단어 시각·편집 요구 → 자르기·자막·확대가 들어간 영상. 원본 직접 촬영 여부·화면 비율·게시 글 없음.
- **차례:** Whisper 한 번 → JSON 저장 → `edit.json` 수정 → 540p 초안 → 중요 장면 정지 화면을 에이전트가 확인 → 시각을 지정해 수정 → 최종 화질.
- **중간 자료:** `edit.json`에 cut·caption·zoom·timing, 별도 단어 시각 JSON. 정확한 스키마·예제 파일 주소 없음.
- **도구·설정 공개:** Claude·Whisper·FFmpeg. FFmpeg 옵션·글꼴·색·자막 스타일·안전 여백·내보내기 값을 CLAUDE.md/skill에 고정하라는 설명은 있으나 실제 파일은 공개되지 않음.
- **사람·실행 장소:** “0:12~0:15 자막이 낮다”처럼 대화로 고침. 같은 댓글은 반복 요청이 보통 3번에서 1번으로 줄었다고 주장. 실행 기기 없음. 다른 댓글의 Mac·Remotion 시간 수치는 섞지 않음.
- **시간·값·실패:** 본문은 한 편에 수시간, 이 세팅 댓글의 총시간·값은 없음. 자막 겹침·늦은 컷·화면 밖 글자를 장면별 검토와 부분 수정으로 줄였다는 설명.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 매번 렌더 코드를 새로 쓰지 않고 고정 렌더러에 편집표를 넣는다. 확정한 받아쓰기·스타일은 재사용하고, 화면에서 고친 값도 같은 편집표로 돌려쓴다.
- **짧은 인용:** “One `edit.json` with every cut, caption, zoom and timing”

### C04. 같은 촬영본에 스타일 지침을 더해 본 두 편 비교
- **주소·날짜·종류:** [Reddit 비교 실험][c04], 2026-11-07, 댓글 11-08. 써 본 사람.
- **넣는 것 → 만드는 것:** 같은 꾸미지 않은 원본·받아쓰기·음악 후보·요청 → 각각 60초 short. 한쪽에만 기존 film instructions·locked look·style notes·좋고 나쁜 예제를 추가.
- **차례:** 같은 모델의 새 실행 두 번 → 각각 독립 편집 → 사람이 두 초안을 비교 → 한쪽 음성 동기 한 번 수정. 첫 편을 보고 두 번째 실행을 지도한 실험은 아님.
- **중간 자료:** 지침·스타일 메모·과거 예제 묶음. 편집표·파일명·JSON 칸·원본 설정 주소 없음.
- **도구·설정 공개:** Claude, 세부 모델·렌더러·편집기·실행 기기 없음. 두 결과를 게시했지만 지침 파일은 공개하지 않음.
- **사람·실행 장소:** 두 초안을 보고 둘 다 조금 길고 음성 시각이 어긋난다고 판단. 동기 수정 후의 새 선호 평가는 하지 않았다고 명시. 고친 화면은 없음.
- **시간·값·실패:** 없음. 작성자는 원래 두 편 가운데 선호가 없었음. 댓글의 “장면 시작을 첫 단어 시각에 맞추기·freezedetect”는 다른 사용자의 해법이며 이 실험에 적용해 성공했다는 기록은 없음.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 정해 둔 스타일과 좋은/나쁜 예제를 저장하되 지침을 늘리면 자동으로 좋아진다고 가정하지 않는다. 사람이 고친 판과 자동 초안을 구분해 비교한다.
- **짧은 인용:** “I watched the original pair and had no preference.”

### C05. n8n — 올릴 글 초안을 받은 뒤 승인·거절 분기
- **주소·날짜·종류:** [Reddit 제작 글][c05], 2026-11-07. 만든 사람. [공개 Gist의 README와 workflow.json][discord]을 직접 확인.
- **넣는 것 → 만드는 것:** `topic`·`audience`·`tone` → 80단어 이하 Discord 공지. 영상 제작 사례가 아니라 게시 글·승인 단계의 참고 사례.
- **차례:** `Manual Trigger` → `Request Fields` → `Draft Announcement` → `Send for Approval` → `Approved?` → `Post to Announcements` 또는 `Status Declined`.
- **중간 자료:** n8n `workflow.json`, 초안 `text`, 승인 `approved` 불리언. 공개 JSON에 승인 대기 20분과 두 갈래가 있음.
- **도구·설정 공개:** n8n·`models/gemini-3-flash-preview`·Discord. 흐름·프롬프트 공개. 실제 자격증명 없이 자리표시자를 둔 예제이며 이 조사에서는 가져오거나 실행하지 않음.
- **사람·실행 장소:** Discord `#approvals`에서 Approve/Decline 한 번. 초안 직접 수정 칸은 없음. n8n Cloud/자가 호스팅 안내는 있으나 제작자가 쓴 배포 장소는 미확인.
- **시간·값·실패:** 실행 시간·금액 없음. 문자열 `"true"` 비교로 승인도 버림 쪽으로 간 문제를 불리언 비교로 고침. 두 계정 동시 승인의 중복 게시 방지는 작성자가 아직 시험하지 않았다고 답함.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 올릴 글을 사람이 고친 뒤 승인 상태를 별도로 기록. 거절·시간 초과는 공개하지 않음. 이 예제에는 수정·중복 방지가 완성돼 있다고 가정하지 않는다.
- **짧은 인용:** “I haven’t run it yet, so duplicate-send handling is still unverified.”

### C06. Remotion 사용자 — 장면 틀은 한 번, 매 영상은 작은 자료 파일
- **주소·날짜·종류:** [Reddit 질문에 달린 사용 댓글][c06], 2026-10-29. 자기 앱의 짧은 소개 영상을 만드는 써 본 사람. 여러 댓글 가운데 Remotion·장면 틀·정지 화면 모음을 함께 설명한 한 댓글만 채택.
- **넣는 것 → 만드는 것:** 매 영상의 장면·시각 자료 → 앱 소개 영상. 직접 촬영 사진·영상 사용 여부·세로 규격 없음. 음악·화면 글자는 쓰고 TTS는 쓰지 않는다고 함.
- **차례:** Claude로 scene templates 한 번 작성 → 새 영상마다 scenes/timing 작은 파일 → PC에서 렌더 → 일부 프레임을 한 이미지에 모음 → Claude가 확인.
- **중간 자료:** 장면과 시각을 담은 작은 파일·여러 장면을 모은 이미지. 이 댓글에는 파일 확장자·칸 이름이 없음. 이웃 댓글의 JSON 예시를 이 사용자의 파일로 단정하지 않음.
- **도구·설정 공개:** Claude Code·Remotion·프레임 추출 스크립트. 실제 템플릿·스크립트 주소 없음.
- **사람·실행 장소:** 자기 PC. 사람이 어느 화면에서 몇 번 수정했는지는 없음. 정지 화면을 Claude에 보여 주는 검사만 공개.
- **시간·값·실패:** 시간·금액 없음. 로컬 렌더는 모델 토큰을 쓰지 않는다는 설명이며 기기 비용까지 0이라는 뜻은 아님. 실패 기록 없음.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 고정된 세로 영상 틀과 매 작업의 내용 파일을 나눈다. 정지 화면 모음은 글자 배치 검사에 쓰고, 움직임·자막 시각은 재생하며 별도로 확인한다.
- **짧은 인용:** “Claude wrote the scene templates once”

### C07. proofcut — 편집표뿐 아니라 완성 파일을 다시 받아써 검사
- **주소·날짜·종류:** [Reddit 제작 글][c07], 2026-09-22. 만든 사람·직접 시험. [README][proof]와 [TRIAL.md의 09-03 실사 시험][trial]을 대조.
- **넣는 것 → 만드는 것:** 실제 녹음 96초·자료 영상 4개 → 자막을 입힌 45.23초 영상. 해당 시험은 1920×816이며 세로·한글 실험이 아님. 현재 README는 사진과 세로 파생 프로젝트도 설명.
- **차례:** `import` → `transcribe` → 단어/구간으로 `cut` → 장면 모음 보고 `cue` → captions·render → `verify`로 다시 받아쓰기 → 예상 단어·프레임과 대조.
- **중간 자료:** OpenTimelineIO 타임라인·JSON manifest·받아쓰기·장면 모음·검사 보고. 단어 번호는 앞을 잘라도 유지. 원본 장면과 출력 구간을 계속 가리킬 수 있는 꼴.
- **도구·설정 공개:** Claude Code·MCP·Whisper·FFmpeg/MLT. README에 연결·작업법, TRIAL에 도구 호출·검사 기준 공개. 명령은 실행하지 않음.
- **사람·실행 장소:** 시험은 무인 실행 뒤 제작자가 결과를 평가. 현재 workspace는 받아쓰기 삭제·타임라인 자르기·crop 검토를 사람이 하고 옆 패널 에이전트도 같은 작업을 부른다고 설명. Linux 개발·실사용, 다른 OS는 검증 범위가 다름.
- **시간·값·실패:** 09-03 시험 914초·Opus 5 $6.94, 9/9 검사를 통과했다고 기록. Whisper가 재촬영 말을 긴 한 단어로 숨겨 다시 듣고 시간으로 잘랐으며, 이후 `hear` 도구를 추가. 품질 전체나 한국어 정확도 수치가 아님.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 완성 파일의 길이·프레임·자막 표시를 확인하고, 원음이 있는 영상은 잘라낸 말이 남았는지도 비교. 소리 없는 사진 영상에 받아쓰기 검사를 억지로 적용하지 않는다.
- **짧은 인용:** “the render checked rather than merely produced.”

### C08. fastCutVid — 자동 초안을 사람이 잘라 JSON으로 되돌려주기
- **주소·날짜·종류:** [Show HN 글과 제작자 답변][c08]. 화면 `78 days ago`·답변 `77 days ago`, 정확일 미확인. 만든 사람·자기 영상 작업에 사용. [현재 README][fast]·[타임라인 스키마][fastschema]·[agent guide][fastguide] 확인.
- **넣는 것 → 만드는 것:** 원본 영상들과 받아쓰기 기반 초기 자르기 → 사람이 손본 컷 목록 또는 단순 MP4. 자막·제목·효과는 이 도구 범위 밖.
- **차례:** 에이전트가 침묵 등 초기 컷 → 프로젝트를 앱에 열기 → 사람이 컷 미세 조정 → `Export cuts` → 에이전트가 같은 JSON을 이어 받아 후속 처리.
- **중간 자료:** `.fastcut` 안 `fastcut.timeline/v1` JSON. `assets`의 `id/path/duration/width/height/fps/has_audio`, `clips`의 `id/asset_id/source_in/source_out/audio_gain/muted`, `render`의 크기·fps·코덱. `clips` 배열 순서가 재생 순서.
- **도구·설정 공개:** Rust/egui·FFmpeg·FFprobe, 에이전트 종류 고정 아님. 위 공개 schema·guide 및 README가 가리키는 `fast-cut-timelines` skill이 있음. 스키마·가이드만 읽음.
- **사람·실행 장소:** PC의 타임라인·inspector에서 자르기·순서·시작/끝점 수정, 횟수 없음. HN 당시 Apple Silicon만 시험. 현재 문서는 Windows/Linux도 제공하되 v0.1.4 미리보기는 무음이라고 구분.
- **시간·값·실패:** 편집 시간·값 없음. 받아쓰기만으로는 컷 시각이 나빠 사람이 개입하는 것이 출발점. guide의 검증은 구조·원본 범위를 검사하지만 파일 존재나 창작 품질까지 보장하지 않는다고 명시.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 자동 초안과 편집 화면이 동일한 원본 번호·구간을 주고받게 한다. 이 앱 자체를 내장하면 자막·사진·효과까지 해결된다고 보지 말 것.
- **짧은 인용:** “when the project is loaded it already is "half" baked.”

### C09. Marketing Studio — 승인한 장면 계획에서 영상·올릴 글 꾸러미까지
- **주소·날짜·종류:** [같은 HN 글의 공개 저장소 소개 댓글][c08], 화면 `77 days ago`, 정확일 미확인. 만든 사람. 세팅은 [현재 README][marketing]·[production-quality.md][production]에서 확인했으며 모두 당시 HN판 기능이었다는 뜻은 아님.
- **넣는 것 → 만드는 것:** 제품 저장소·브랜드 자료·앱 화면 녹화 → 소개 영상·세로 클립·SRT/VTT·채널별 올릴 글 꾸러미. 직접 찍은 사진·영상 중심 운영 사례는 아님.
- **차례:** product brief → `direction.json`·style frame 승인 → `shot-plan.json`·animatic 승인 → render → 장면별 시작/중간/끝 이미지 → Mission Control 검토 → post kit.
- **중간 자료:** `brief.json`, `direction.json`, `shot-plan.json`, 브랜드 JSON, 실행 manifest, 채널별 영상·caption·alt text·`manifest.json`. 실행 기록으로 끊긴 지점부터 잇는다고 설명.
- **도구·설정 공개:** Claude Code skills·Remotion·Playwright·FFmpeg, 선택 경로에 Blender·ElevenLabs 등. 저장소의 `skills/`와 `docs/PLAYBOOK.md`를 공개. 이 조사에서는 README와 품질 계약만 읽음.
- **사람·실행 장소:** 로컬 Mission Control 갤러리에서 단계별 Approve/Revise와 메모. 전체 재생 확인을 별도 기록. 손으로 타임라인을 편집하는 화면이라는 근거는 없음.
- **시간·값·실패:** 실행 시간·값 없음. 현재 README는 4장면·782프레임·12샘플의 기계 검사에 실패가 없지만 사람 확인 9항목은 미완료라고 밝힘. 품질 계약에는 이전 정지 화면 심사 9/20과 완성품 질을 과장하지 말라는 기록이 있음.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 편집표·최종 영상·게시 글을 작업 하나로 묶고 승인한 파일과 실제 전달 파일이 같은지 확인. 목소리·음악을 포함하는 원본 흐름 전체는 첫 판에 가져오지 말고 장면 계획·검토·post kit 부분을 본뜬다.
- **짧은 인용:** “Publishing is dry-run by default.”

### C10. Palmier Pro — 사람과 에이전트가 같은 프로젝트를 편집
- **주소·날짜·종류:** [Show HN 제작 글][c10], 화면 `4 months ago`, 정확일 미확인. 만든 사람·파는 쪽. [현재 README][palmier]로 변경 사항 대조.
- **넣는 것 → 만드는 것:** 파일/공개 URL의 영상 → 반복 양식의 초안·긴 영상의 short·자막. 직접 촬영본을 같은 형식으로 다시 편집하는 이용을 제작자가 소개.
- **차례:** import·organize → 로컬 장면 검색/받아쓰기/침묵 찾기 → 트랙·클립·키프레임 편집 → 같은 프로젝트를 화면에서 수정 → export. 정해 둔 단계 전체를 수행한 독립 운영 기록은 없음.
- **중간 자료:** 편집기의 프로젝트·트랙·클립·키프레임. 읽은 글에는 저장 파일 형식·칸 이름 없음. 외부 MCP와 앱 채팅이 같은 도구/API를 쓴다고 설명.
- **도구·설정 공개:** Claude 등 외부 에이전트·로컬 MCP, SpeechAnalyzer·SigLIP2·Silero VAD. README에 MCP 연결법 공개. **v0.7.6까지와 `last-gpl-source`만 소스 공개, 뒤 판은 소스 비공개**라고 현재 README가 명시.
- **사람·실행 장소:** macOS 26·Apple Silicon의 편집기/앱 채팅에서 반복 수정, 횟수 없음. HN은 창의적 편집보다 받아쓰기 등 패턴이 있는 초안에 적합하다고 설명.
- **시간·값·실패:** 시간·금액 없음. HN 당시 자체 에이전트를 연결하는 편집기는 무료, 생성·앱 채팅은 크레디트라고 설명. 생성 사이트와 편집기를 계속 오가야 했던 문제를 같은 화면으로 줄임.
- **우리 길에 가져올 것 — 읽은 이의 판단:** 앱의 수동 편집과 에이전트가 같은 작업 API를 호출하는 구조. 현재판 전체를 공개 소스 내장 후보로 오인하지 않는다. 우리 앱 안 삽입 방법과 한글 자막 품질은 미확인.
- **짧은 인용:** “Both use the same tools and APIs exposed by the video editor.”

## 2. 이미 있음 목록 — 이름·이전 파일 줄 번호만

이전 파일: `../s15_community_research/S16_REDDIT.md`(S16), `../s15_community_research/S20_REDDIT.md`(S20).

| 사례·도구 | 파일·줄 |
|---|---|
| roughcut · Invokard · Vex | S16:23 · 24 · 15 |
| 텔레그램 상품사진 UGC · 두 낱말 비교 영상 봇 · n8n Form/로컬 LLM 게시 | S16:25 · 26 · 8,95 |
| OpenFilm · Kdenlive 얼굴 가림 · VoidCutter | S16:34 · 34 · 35 |
| Synkinema · Supertonic 3 · ElevenLabs | S16:41 |
| 휴대폰 상품사진 보정 · PrivacyCam · Resolve 추적 · 상품 생성 비교 | S16:47 · 48 · 48 · 36 |
| 다섯 에이전트 단편 제작 · Veo/음성 재시도 · Remotion 서버 문제 · Wan 2.2 | S16:55 · 56 · 61,122 · 71,123 |
| ffmpeg-ai · 무료 Shorts 채널 중단 · n8n Zvid · Borumi 편집 기록 | S20:36 · 37 · 38 · 39 |
| SMA · MoneyPrinterTurbo · short-video-maker · n8n Cloud/Apify 조립 | S20:40 · 41 · 42 · 43 |
| OpenChatCut · kinocut · MakeMyClip · OpenFilm · CutAgent | S20:52 · 53 · 54 · 55 · 56 |
| outtake · cutler · Orkas-VideoStudio · FableCut | S20:57 · 57 · 57 · 61 |
| Remotion 공식 skills/팟캐스트 · Aantraa · Hunyuan Video · 7 GPU 생성기 | S20:59 · 65,185 · 191 · 192 |
| 단계별 승인 영상 흐름 · 비동기 작업 번호 저장 · Make 검토 분리 | S20:92 · 93 · 94 |
| Photoroom · deface · dashcamcleaner · DeepPrivacy2 · MeloTTS-Korean | S20:209 · 211 · 214 · 215 · 220 |

## 3. 본뜰 것 다섯 — 읽은 이의 판단

1. **받기·고르기 — C01+C08:** 직접 찍은 사진·영상을 원본 번호로 묶고 설명·받아쓰기·미리보기를 저장한다. 새 영상은 목록을 다시 쓰며, 고른 파일과 구간을 편집표에 남긴다. 자동 설명은 원본과 맞대어 사람이 바로잡을 수 있어야 한다.
2. **편집표 — C03+C06+C08:** 고정 세로 틀에 원본·시작/끝·순서·문구·배치만 넣는다. C08의 `asset_id/source_in/source_out`은 확인된 칸이며, 사진 표시 길이·한글 자막·게시 글 연결 칸은 우리가 더 설계할 부분이다. 에이전트와 화면이 서로 다른 편집표를 갖지 않는다.
3. **앱 안 수정 — C02+C07+C10:** 초안을 같은 타임라인으로 열어 사람이 자르기·순서·구도·한글 오타를 고친다. 수정이 편집표에 반영되고 다음 자동 수정도 그 판에서 이어져야 한다. 이 사례들은 구조의 참고이며 우리 앱 내장 가능성을 확인한 결과는 아니다.
4. **굽기·확인 — C03+C04+C07:** 먼저 작은 초안, 장면별 정지 화면, 마지막 실제 MP4 검사. 받아쓰기가 있는 원음만 단어·시각 비교를 쓰고 무음 사진 영상은 길이·장면·글자 검사를 쓴다. 한글 글꼴 누락·줄바꿈·잘림·자막 시각은 실제 세로 미리보기에서 사람이 확인할 항목이다. 이번 자료에는 한글 품질 실측이 없다.
5. **올릴 글·전달 — C05+C09:** 승인한 영상과 사실에 맞는 글을 한 꾸러미로 준다. 추가로 확인한 [AskEditor post-copy 문서][postcopy]는 `<video>.post.md`에 근거·채널별 글 칸을 두고 별도 검사하며 직접 게시하지 않는 흐름이다. [review-notes 문서][reviewnotes]의 시각·문구 기반 수정 기록도 본뜰 만하나 영어 전용·수정마다 재렌더라는 한계를 함께 읽어야 한다. 첫 판은 앱에서 영상·한글 자막·글을 함께 확인하고 내보내는 데 맞춘다.

## 4. 못 연 곳 · 막힌 곳 · 확인 한계

- **권한 거부·로그인 벽으로 막힌 곳:** 이번 조사에서 확인한 것은 없음. 본문을 읽을 수 있는 공개 페이지의 로그인 버튼·가입 문구는 누르지 않았다. 아래는 권한 거부로 단정할 수 없는 열람 도구 오류이며 우회하지 않았다.
- [Shorts 제작자의 원글](https://www.reddit.com/r/youtubers/comments/1y6tu3k/how_i_clip_long_videos_into_shorts_using_claude/): `Failed to fetch https://www.reddit.com/r/youtubers/comments/1y6tu3k/how_i_clip_long_videos_into_shorts_using_claude/: Cache miss`. 공개 검색 본문만 확인, 카드에서 제외.
- [Umber 원글 짧은 주소](https://www.reddit.com/comments/1xm0vcb): `Failed to fetch https://www.reddit.com/comments/1xm0vcb: Cache miss`. [긴 주소](https://www.reddit.com/r/ClaudeAI/comments/1xm0vcb/i_built_a_mac_app_that_shells_out_to_claude_code_to/)도 `Cache miss`. 자동 생성된 요약 글만 열린 상태여서 Claude 세팅 카드로 쓰지 않음.
- [Umber의 Gemini 글](https://www.reddit.com/r/GeminiAI/comments/1xmq9pl/i_use_my_gemini_plan_to_plan_a_reel_cut_from/): `Failed to fetch https://www.reddit.com/r/GeminiAI/comments/1xmq9pl/i_use_my_gemini_plan_to_plan_a_reel_cut_from/: Cache miss`. 공개 검색 일부만 확인, 카드 제외.
- [HN 날짜 조회 1](https://hacker-news.firebaseio.com/v0/item/49580689.json): `URL https://hacker-news.firebaseio.com/v0/item/49580689.json is not accessible via this tool.`
- [HN 날짜 조회 2](https://hacker-news.firebaseio.com/v0/item/49022911.json): `URL https://hacker-news.firebaseio.com/v0/item/49022911.json is not accessible via this tool.` 두 글 본문은 열렸으나 API로 정확한 날짜 확인은 못 함.
- GitHub Discussions·r/LocalLLaMA·r/aivideo 등을 함께 검색했으나 이번 카드에 더할 만큼 구체적인 새 운영 세팅을 확인하지 못했다. 카드의 Reddit 댓글·HN 제작기·공개 파일로 범위를 한정했으며 전체 커뮤니티의 대표성·사용률 순위는 알 수 없다.
- 한국어 자막·직접 촬영 사진과 영상 혼합·게시 글·앱 안 편집을 **모두 한 번에 입증한 완결 사례는 없음**. C01은 사진/영상 목록, C08은 편집표 왕복, C02는 손수 수정, C05/C09는 글·검토 단계의 근거로 각각 읽는다.

[c01]: https://www.reddit.com/r/ClaudeCode/comments/1y15bf6/i_used_claude_code_to_analyze_2000_pictures_and/
[c02]: https://www.reddit.com/r/ClaudeAI/comments/1xwfnj5/i_built_a_video_editor_for_claude_with_claude/
[c03]: https://www.reddit.com/r/ClaudeCode/comments/1xqugx1/im_video_editing_daily_with_claude_whisper_ffmpeg/
[c04]: https://www.reddit.com/r/ClaudeAI/comments/1xqj4pi/video_editing_with_claude_same_footage_two/
[c05]: https://www.reddit.com/r/n8n/comments/1xq51x1/n8n_discord_bot_gemini_draft_approvedecline/
[c06]: https://www.reddit.com/r/ClaudeAI/comments/1xihme5/how_do_you_actually_create_videos_with_claude/
[c07]: https://www.reddit.com/r/ClaudeAI/comments/1wneizd/i_built_a_video_editor_for_claude_code_with/
[c08]: https://news.ycombinator.com/item?id=49580689
[c10]: https://news.ycombinator.com/item?id=49022911
[askpack]: https://github.com/AskEditor/ai-video-editing-skills/blob/main/README.md
[discord]: https://gist.github.com/zhaozuowen987469/ca63bf7c3d75edb900e1a411f23d2ccc
[proof]: https://github.com/tydude001/proofcut/blob/main/README.md
[trial]: https://github.com/tydude001/proofcut/blob/main/docs/TRIAL.md
[fast]: https://github.com/modecir/fast-cutvid/blob/main/README.md
[fastschema]: https://github.com/modecir/fast-cutvid/blob/main/docs/timeline.schema.json
[fastguide]: https://github.com/modecir/fast-cutvid/blob/main/docs/AGENT_GUIDE.md
[marketing]: https://github.com/ucsandman/marketing-studio/blob/main/README.md
[production]: https://github.com/ucsandman/marketing-studio/blob/main/docs/production-quality.md
[palmier]: https://github.com/palmier-io/palmier-pro/blob/main/README.md
[postcopy]: https://github.com/AskEditor/ai-video-editing-skills/blob/main/effects/post-copy/README.md
[reviewnotes]: https://github.com/AskEditor/ai-video-editing-skills/blob/main/effects/review-notes/README.md
