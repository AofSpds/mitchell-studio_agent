# S44_P4_INPUT — 자기 촬영본을 실제로 받는 공개 코드

- 역할: MITCHELL_STUDIO/BTSR/RSCH 보조 S44_P4_INPUT.
- 조사일: 2026-11-28. 시각 확인: 18:28:41 KST(Windows 한국 표준시 변환). 공개 웹·GitHub 읽기만 했으며 실행 검증은 0회다.
- 출발 근거: S33_MISSION.md 106–123줄; S35_WEB_TOOLS.md 40–48줄; S19_X.md 34·53–55줄; S20_REDDIT.md 19·42줄; S21_CN.md 53·90–91·156–157줄.
- 네 저장소만 비교했다. MoneyPrinterTurbo·Pixelle-Video는 재조사하지 않았다. 편집 앱 후보 OpenCut·OpenChatCut·kinocut·MakeMyClip·Remotion·HyperFrames·브리즈컷은 S38 몫이다.
- 아래 ‘구현 확인’은 특정 파일을 읽었다는 뜻이다. 품질·반복 성공·실제 기기 사용을 확인했다는 뜻이 아니다. 문서와 코드는 되도록 같은 커밋에 고정했다.

## 1. 가장 큰 발견 셋

1. **OpenReels는 촬영본 접수기의 근거가 아니다.** 작업 입력과 편집표에 사용자 미디어 경로가 없고, 화면 소재는 생성 또는 자료 검색으로 채운다. short-video-maker도 현행 입력은 대본·검색어뿐이다. [R입력]·[R표]·[R제작]·[S입력]·[S제작]
2. **OpenMontage에는 자기 사진·영상의 분류·분석→소재 목록→편집표→합성 경로가 있다.** 다만 이를 연결하는 주체는 코딩 에이전트이며, 자기 촬영본 편집과 참고 사진으로 새 장면 만들기를 구별해야 한다. [M분석]·[M편집]·[M합성]·[M흐름]
3. **video-use는 자기 영상 편집에 더 좁게 맞지만 사진 혼합·한국어 완주는 미확인이다.** 실제 파일 경로를 자르는 코드는 있으나 한글 경로·글꼴 오류 보고가 있고, 받아쓰기 캐시는 파일 내용 변경을 검사하지 않는다. [V입력]·[V렌더]·[V받아쓰기]·[V193]·[V118]

## 2. 조사한 판·커밋·허가

- 날짜는 main 조회에서 반환된 커밋 시각을 KST로 바꾼 값이다. 배포일·실제 마지막 기능 변경일로 바꾸어 읽지 않는다.

| 저장소 주소 | 확인한 판 표시 | 커밋 / 시각(KST) | 저장소 허가 |
|---|---|---|---|
| [tsensei/OpenReels][R저장소] | VERSION 0.18.0 / package.json 0.4.0 / README 배지 0.13.1·본문 v0.17.0으로 서로 다름. 하나의 배포판 번호로 확정하지 않음. [R판]·[R패키지]·[R설명] | [edc1c973634a3e179a527d00857b85de7b52a1dd][R커밋] / 2026-04-10 20:17:16 | [MIT][R허가] |
| [OpenMontageInc/OpenMontage][M저장소] | setup.py 0.1.0; hybrid.yaml 2.0은 파이프라인 규격 번호. [M판]·[M흐름] | [2e003e65fa99a0f329478a2c1cdcf26bc481933a][M커밋] / 2026-11-16 15:55:20 | [AGPL-3.0][M허가] |
| [gyoridavid/short-video-maker][S저장소] | package.json 1.3.4. [S판] | [9bb9a212ced86caa7e09099c382da1a44d638760][S커밋] / 2025-06-21 20:17:09 | [MIT][S허가] |
| [browser-use/video-use][V저장소] | pyproject.toml 0.1.0. [V판] | [43cfc566833548093455c9d4a46bd69913b7e552][V커밋] / 2026-10-09 07:16:59 | [MIT][V허가] |

- MIT 세 저장소는 저작권·허가 고지 유지 조건을 명시한다. OpenMontage는 AGPL이며 수정판을 네트워크로 제공할 때의 소스 제공 조항이 있다. 이는 해당 허가문 관찰이며 부품·모델·음악·서비스의 별도 조건까지 판정한 것이 아니다. [R허가]·[S허가]·[V허가]·[M허가]
- OpenMontage의 예전 주소 calesthio/OpenMontage는 위 주소로 이동한다. 동명 프로젝트나 다른 포크를 같은 구현으로 세지 않았다.

## 3. OpenReels — 주제에서 생성·검색 소재로 만드는 쪽

- **README 주장:** 주제에서 세로 MP4까지 제작. 자기 사진·영상 접수를 약속하는 문구는 확인하지 못했다. [R설명] 10줄.
- **사진 / 영상 / 혼합:** 사용자 파일 접수는 셋 다 읽은 경로에 없다. src/server.ts 173–205줄은 topic·direction·score·provider 설정을 받는다. src/schema/director-score.ts 15·31–47줄은 ai_image·ai_video·stock_image·stock_video·text_card와 시각 설명·대본을 받으며 파일·미디어 URL 칸이 없다. [R입력]·[R표]
- **실제 소재 경로:** src/pipeline/orchestrator.ts 219–301줄에서 종류별 생성·검색으로 갈라진다. ai_video도 267–278줄에서 먼저 새 그림을 생성해 동영상 공급자에 넘긴다. 자기 사진을 첫 장으로 받는 경로와 다르다. [R제작]
- **접수·한국어·자막:** REST JSON, CLI 주제, 방향 Markdown, 저장된 score JSON. 한국어 문자열을 제한하는 검사는 보이지 않지만 한국어 이해·음성·자막 품질 근거는 없다. 낱말 시각은 TTS에서 받아 합성한다(599–618·789–800줄). 기본 글꼴 여섯은 latin 묶음만 지정한다. [R입력]·[R명령]·[R제작]·[R글꼴]
- **얼굴:** 읽은 접수·소재 제작 경로에서 얼굴 가리기나 익명화 단계는 확인 못 했다. 생성 영상이라는 이유로 얼굴 처리가 된 것으로 세지 않는다. [R제작]
- **출력·수정:** MP4, score.json, log.json, 웹 작업 meta.json. 게시용 설명·해시태그 출력은 읽은 경로에서 못 찾았다. score는 장면 대본·시각 요청의 상태이며 원본 파일·자르기 시작/끝을 담는 촬영본 편집표가 아니다. [R표]·[R제작] 928–946·1033–1038줄·[R입력]
- **재개:** 짧은 원문 “Replaying from saved score”. 재생성은 research·director를 건너뛰지만 TTS와 장면 소재를 다시 만든다(373–380·431–472·599–675줄). 완성된 미디어를 재사용하는 중단 복구나 장면 하나만 수정하는 기능으로 해석하면 안 된다. [R제작]
- **외부 의존·원본:** LLM·TTS·그림/영상/음악 공급자, 자료 화면 공급자와 Redis/BullMQ·Remotion에 기대는 구조. 로컬 TTS 선택도 있다. 실행별 출력 폴더는 만들지만 사용자 촬영본 자체가 입력되지 않으므로 ‘촬영 원본 보존 확인’은 해당 없음. [R입력] 140–170줄·[R제작] 928–946줄
- **이슈 대조:** 공개 이슈에서 upload 검색 결과는 0건이었다. 이것을 관련 이슈 전체가 없다는 근거로 쓰지 않는다. 입력 부재 판단은 위 코드에 둔다.

## 4. OpenMontage — 촬영본 편집과 새 장면 생성을 함께 갖춘 쪽

- **README 주장:** Hybrid는 “Source footage + AI-generated support visuals”; Talking Head는 촬영본 중심이다. 참고 영상의 스타일만 분석해 다른 주제로 새로 만드는 흐름도 따로 설명한다. [M설명] 123–138·356–376줄
- **사진 / 영상 / 혼합:** lib/source_media_review.py 24–37·234–285줄은 파일 경로 목록을 받아 영상·음성·사진을 나눠 실제 분석 도구로 보낸다. jpg/png/webp 등과 mp4/mov 등이 명시된다. HEIC는 읽은 분류표에 없다. 사진·영상이 같은 목록에 있는 경우도 분류하는 코드다. [M분석]
- **편집으로 이어지는 코드:** 편집표 source는 파일 경로나 소재 ID, in_seconds/out_seconds는 쓸 구간이다. video_compose.py 1671–1685줄에서 ID를 실제 경로로 바꾼다. 920–958줄은 로컬 미디어를 렌더용 폴더로 복사한다. 1431–1469줄에 사진·영상 혼합을 Remotion으로 보내는 경로가 있다. FFmpeg 단순 합성은 사진을 만나면 거절한다(553–560줄). 혼합 결과 완주는 실행 미확인이다. [M편집]·[M합성]
- **접수 방식:** 로컬 파일 경로가 실제 근거다. 공개 URL은 video_downloader.py의 별도 내려받기 도구가 있으나 주로 참고 영상 분석용이며, 브라우저 파일 업로드 API를 확인한 것은 아니다. 이 조사에서는 내려받기 도구를 실행하지 않았다. [M분석]·[M주소]
- **원본 편집 / 참고 생성 구별:** Hybrid 문서는 source-derived·provided·recorded·generated를 구분해 기록하도록 한다. 사진을 그대로 합성하는 경로와 사진으로 새 동작을 생성하는 경로를 동일 기능으로 묶지 않는다. 자동 초안의 원본 장면 보존은 생성 삽입 허용 여부에 달린다(읽은 이의 판단). [M소재] 37–64줄·[M합성]
- **한국어 요청·자막:** 자연어 요청은 바깥 코딩 에이전트가 읽는다. transcriber.py는 언어 코드·자동 감지를 받아 faster-whisper와 선택적 WhisperX 정렬을 사용한다(54–64·157–164·246–260줄). subtitle_gen.py는 SRT/VTT/JSON을 UTF-8로 쓴다(41–56·101–117줄). 한국어 음성·정렬·글꼴의 실제 결과는 확인 못 함. [M전사]·[M자막]
- **얼굴:** face_tracker.py는 얼굴 위치·랜드마크 등의 JSON을 만드는 도구다. 짧은 원문 “Outputs per-frame face data as JSON”. 위치 추적을 얼굴 가림·교체·익명화로 세지 않는다. 읽은 경로에서 익명화 완주는 못 찾았다. [M얼굴] 1–5·138–180줄
- **출력:** 완성 영상, asset_manifest·edit_decisions·장면 계획·checkpoint 등의 자료. export_bundle.py는 영상과 선택 자막을 복사하고 제목·설명·태그·해시태그를 metadata.json과 글 파일로 묶는다(187–236줄). 글 내용은 이 도구가 생성하는 것이 아니라 에이전트가 준비해 넣는다(67–68줄). SNS 업로드는 하지 않는다. [M합성]·[M내보내기]·[M상태]
- **부분 수정·재개:** 편집표와 단계별 checkpoint가 있으며 완료 단계·다음 단계 조회가 구현돼 있다(625–660줄). 이것은 자동 복구 전체의 증명이 아니다. 실제 호출 순서·재생성 선택은 에이전트에 달리고, video_compose는 FROM_START를 선언한다(245줄). 내장 편집 앱과의 상태 왕복은 별도 구현·검증 대상이다. [M상태]·[M합성]
- **외부 의존·원본:** 에이전트, FFmpeg, 선택한 렌더 엔진·받아쓰기 모델·생성 공급자. 기존 로컬 소재 합성에 반드시 새 영상 생성 API가 필요한 것은 아니다. 렌더용 copy2는 원본 파일을 읽어 복사하지만, 모든 도구에 원본 경로 쓰기 금지가 걸렸다는 근거는 없다. [M합성] 920–958줄·[M흐름]
- **이슈:** #937은 Windows 11에서 음악이 없는 결과를 보고(2026-11-11 KST), 시험 커밋 fecb9a1e…(11-08)까지 적는다. 조사 커밋보다 이전 기록이므로 현행 버그로 확정하지 않는다. 편집표 검사 통과와 실제 결과 검사는 다르다는 후속 시험 근거다. [M937]

## 5. short-video-maker — 자기 소재 접수는 아직 요청 사항

- **README / 코드 / 이슈가 일치:** 자기 사진·영상 전달과 자기 배경 영상 사용에 FAQ가 각각 “No”라고 답한다(455–475줄). src/types/shorts.ts 33–40줄은 text와 searchTerms만 받는다. ShortCreator.ts 110–145줄은 글을 읽고 자막을 만든 뒤 Pexels를 검색한다. [S설명]·[S입력]·[S제작]
- **사진 / 영상 / 혼합·접수:** 셋 모두 사용자 파일·URL 입력으로는 확인되지 않는다. REST/MCP에 장면 JSON을 전달한다. 내부 Scene의 video URL은 Pexels 다운로드 뒤 서버가 만든 값이다(177–183줄); 사용자 입력 API라고 읽으면 안 된다. [S입력]·[S제작]·[S접수]
- **한국어·자막·얼굴:** 이 판 README는 영어 음성만 된다고 명시한다. 원문 “Kokoro-js only supports English.” 자막은 생성된 음성을 whisper.cpp로 받아 만든다. 한국어 요청을 대본으로 바꾸는 LLM·얼굴 익명화는 읽은 제작 경로에 없다. [S설명] 87–90·451–457줄·[S제작]
- **출력·외부 의존:** MP4와 상태/조회 API. 게시글·다시 여는 편집 상태 내보내기는 읽은 경로에서 못 찾았다. Pexels API와 인터넷, 로컬 Kokoro·Whisper·Remotion·FFmpeg가 필요하다. 공급자 교체만으로 사용자 사진 입력까지 생기지는 않는다. [S설명]·[S제작]·[S접수]
- **원본·부분 수정·재개:** 촬영 원본은 받지 않는다. 생성 중 임시 음성·영상은 렌더 후 지운다(214–216줄). 큐는 메모리 배열이며(27–85줄) 읽은 코드에는 작업을 디스크에서 이어 읽는 경로가 없다. 이전 작업의 일부 장면만 고치는 근거도 없음. [S제작]
- **공개 이슈:** #27(2025-05-01 KST) 사용자 미디어 URL, #61(2025-07-21 KST) 자기 영상·사진 추가 요청이 모두 열려 있다. #27의 customMedia 예시는 제안이며 병합된 API가 아니다. #61은 조사 커밋 이후 요청이다. [S27]·[S61]
- **바탕 글 판정:** S19:55·S20:42의 자기 소재 제약은 유지. 2026년 현재 모든 Kokoro 자체의 언어 능력으로 일반화하지 않고, 위 저장소 판·코드의 제약으로 한정한다.

## 6. video-use — 실제 촬영 영상을 자르는 작은 도구 묶음

- **README 주장:** “Drop raw footage in a folder”. 코드도 transcribe_batch.py 26–34줄에서 폴더의 mp4/mov/mkv/avi/m4v를 찾는다. 재귀 탐색은 아니며 사진 확장자는 목록에 없다. [V설명]·[V입력]
- **사진 / 영상 / 혼합:** 자기 영상 여러 개는 직접 입력 경로 확인. 자기 사진과 영상의 혼합 접수는 확인 못 했다. 별도 애니메이션·이미지에서 만든 오버레이 설명을 자기 사진 혼합 자동 처리의 증거로 올려 잡지 않는다. [V입력]·[V규약] 203–216줄
- **접수·실제 자르기:** 로컬 폴더→받아쓰기→에이전트가 EDL 작성→render.py. sources 사전의 파일 경로와 ranges의 source/start/end를 읽어 각 구간을 새 파일로 자른다(338–376줄). URL은 README의 선택적 yt-dlp 안내일 뿐 네이티브 URL 접수 API는 확인하지 못했다. [V렌더]·[V설명] 64줄
- **한국어 요청·자막:** 요청은 코딩 에이전트 몫. transcribe.py 87–103줄은 언어 코드를 Scribe에 전달하며 자동 감지도 허용한다. SRT 작성·자막 합성 코드는 있지만 기본 글꼴은 Helvetica(52–56줄)다. 한국어 자막 완주로 판정하지 않는다. [V받아쓰기]·[V렌더]
- **직접 오류 보고:** #193(2026-09-28 KST)은 Windows 한글 경로에서 UTF-8 미지정·자막 경로 문제를 보고한다. #118(2026-08-05 KST)은 비라틴 글꼴 네모 표시와 자막 필터 부재를 보고한다. 둘 다 열린 상태; 보고에 고정 커밋은 없다. 조사 코드에도 write_text/read_text 인코딩 미지정과 Helvetica 지정은 남아 있지만 이 환경에서 재현하지 않았다. [V193]·[V118]·[V렌더] 389·493·520·755줄
- **얼굴:** 읽은 일괄 입력·받아쓰기·렌더 경로에 얼굴 검출·가림은 없다. 일반 FFmpeg 필터를 받을 수 있다는 사실만으로 익명화가 구현됐다고 쓰지 않는다. [V렌더]
- **출력·외부 의존:** edit/final.mp4, EDL JSON, 전사 JSON, master.srt, project.md 등. EDL과 project.md는 에이전트가 쓰는 계약도 포함하므로 전부 자동 생성기를 확인한 것은 아니다. 게시글 생성기는 확인 못 했다. ElevenLabs Scribe로 영상에서 뽑은 음성을 업로드한다; 편집·렌더는 FFmpeg, 판단은 코딩 에이전트다. [V규약] 39–53·282–305줄·[V받아쓰기] 74–105·160–180줄
- **원본·재개:** 규약은 원본을 그대로 두고 edit/에 출력한다고 한다. render.py도 구간별 새 경로를 만든다. 그러나 임의 출력 경로까지 원본과 충돌하지 않게 막는지 보장 못 함. 전사 재사용은 결과 JSON 존재만 검사한다(137–148줄); 같은 이름의 원본 교체를 해시로 감지하는 코드는 없다. 렌더 구간은 순회할 때 다시 추출한다(358–376줄). [V규약]·[V렌더]·[V받아쓰기]
- **읽은 이의 판단:** 말소리 중심 촬영 영상의 EDL·자막·출력 분리를 참고하기 좋다. 사진까지 섞는 접수기, 내장 편집 앱, 단계별 정확한 복구를 이미 갖춘 완제품으로 보기는 어렵다.

## 7. 설계에 넘길 범위 — 아래 평가는 읽은 이의 판단

| 구분 | 넘길 내용 / 근거 |
|---|---|
| 그대로 쓸 근거가 있는 범위 | 실행 보증이 아닌 재사용 후보: OpenMontage의 파일 분류·소재 ID→경로·편집표·패키지 출력; video-use의 로컬 영상→구간 EDL→렌더; OpenReels의 주제→score→생성/검색 흐름; short-video-maker의 영어 자료 화면 조립. 위 3–6절 코드 범위에 한정. |
| 더 만들어야 할 범위 | 촬영 사진·영상 접수와 포맷 검증, 원본 불변 저장, 얼굴 처리, 한국어 글꼴·전사·음성, 선택한 편집 앱으로 편집표 변환·되돌려 저장, 게시글 작성, 실패 단계·바뀐 장면만 재실행. 네 코드를 합친다고 자동으로 생기지는 않음. |
| 확인 못 함 | 한국어 요청+혼합 촬영본→얼굴 처리→자동 초안→앱 안 부분 수정의 완주; 모든 원본 보호; 독립 반복 사용; 손대지 않은 장면의 동일성; 최신 배포판별 품질. 비용·폰 사용·편집 앱 비교는 범위 밖. |
| 나중에 돌려서 가릴 것 | 사진 2+영상 2(한글 파일명·무음·회전·서로 다른 fps), 원본 해시 전후, 한글 자막 누락, 장면 한 개 변경, 원본 같은 이름 교체, 중단 뒤 전사/소재 재사용을 시험. 먼저 권한이 있는 시험 소재와 설치·실행 허락이 필요하며 이번에는 하지 않음. |

- **내일 미P4 프로챗이 필요한가: 아니오 — 지금 초안 그대로는 보내지 않음(읽은 이의 판단).** 접수 방식·편집표·출력의 큰 물음은 공개 코드로 가려졌다. 남은 핵심은 읽기를 한 번 더 하는 것보다 실행 비교에 가깝다.
- **남길 물음:** “선택한 구현에서 사진·영상 혼합 초안의 장면 하나를 고친 뒤, 다른 원본·전사·자막·소재를 정확히 재사용하는가?” 새 공개 사용 기록을 찾게 된다면 고정 커밋·입력·수정 전후·실패 복구가 드러난 사례만 좁혀 묻는다. 전체 사용 경험은 미P1, 편집 앱 도입 경험은 미P2와 합쳐 중복을 피한다.

## 8. 못 한 것·수행 경계

- 권한 거부·허락 창은 없었다. rg가 없어 PowerShell 검색으로 바꿨다. 웹 화면·프로챗·로그인·가입·저장소 clone·설치·외부 코드 실행·커밋·push는 하지 않았다.
- 초기 로컬 범위 추출식 실수로 S33·S35의 지정 칸 바깥 내용도 반환됐다. 이후 제목 경계를 고쳤으며 본 보고의 바탕 근거는 위 지정 칸·이름 검색 줄로 한정했다.
- 공개 코드의 선택 경로와 일부 이슈만 읽었고 모든 분기·포크·이슈·의존 부품을 조사하지 않았다. 코드 읽기와 이슈 신고는 실행 성공·실패의 재현을 대신하지 않는다.

## 근거 링크 — 줄 번호는 고정 커밋 파일의 실제 줄

[R저장소]: https://github.com/tsensei/OpenReels
[R커밋]: https://github.com/tsensei/OpenReels/commit/edc1c973634a3e179a527d00857b85de7b52a1dd
[R판]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/VERSION
[R패키지]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/package.json#L3
[R허가]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/LICENSE
[R설명]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/README.md
[R입력]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/src/server.ts#L173
[R표]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/src/schema/director-score.ts#L15
[R제작]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/src/pipeline/orchestrator.ts
[R명령]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/src/cli/args.ts#L173
[R글꼴]: https://github.com/tsensei/OpenReels/blob/edc1c973634a3e179a527d00857b85de7b52a1dd/src/remotion/lib/fonts.ts#L8
[M저장소]: https://github.com/OpenMontageInc/OpenMontage
[M커밋]: https://github.com/OpenMontageInc/OpenMontage/commit/2e003e65fa99a0f329478a2c1cdcf26bc481933a
[M판]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/setup.py#L5
[M허가]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/LICENSE
[M설명]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/README.md
[M분석]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/lib/source_media_review.py#L234
[M편집]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/schemas/artifacts/edit_decisions.schema.json#L14
[M합성]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/tools/video/video_compose.py
[M흐름]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/pipeline_defs/hybrid.yaml
[M주소]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/tools/analysis/video_downloader.py#L69
[M소재]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/skills/pipelines/hybrid/asset-director.md#L37
[M전사]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/tools/analysis/transcriber.py
[M자막]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/tools/subtitle/subtitle_gen.py
[M얼굴]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/tools/analysis/face_tracker.py
[M내보내기]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/tools/publishers/export_bundle.py
[M상태]: https://github.com/OpenMontageInc/OpenMontage/blob/2e003e65fa99a0f329478a2c1cdcf26bc481933a/lib/checkpoint.py#L625
[M937]: https://github.com/OpenMontageInc/OpenMontage/issues/937
[S저장소]: https://github.com/gyoridavid/short-video-maker
[S커밋]: https://github.com/gyoridavid/short-video-maker/commit/9bb9a212ced86caa7e09099c382da1a44d638760
[S판]: https://github.com/gyoridavid/short-video-maker/blob/9bb9a212ced86caa7e09099c382da1a44d638760/package.json#L3
[S허가]: https://github.com/gyoridavid/short-video-maker/blob/9bb9a212ced86caa7e09099c382da1a44d638760/LICENSE
[S설명]: https://github.com/gyoridavid/short-video-maker/blob/9bb9a212ced86caa7e09099c382da1a44d638760/README.md#L449
[S입력]: https://github.com/gyoridavid/short-video-maker/blob/9bb9a212ced86caa7e09099c382da1a44d638760/src/types/shorts.ts#L33
[S제작]: https://github.com/gyoridavid/short-video-maker/blob/9bb9a212ced86caa7e09099c382da1a44d638760/src/short-creator/ShortCreator.ts
[S접수]: https://github.com/gyoridavid/short-video-maker/blob/9bb9a212ced86caa7e09099c382da1a44d638760/src/server/routers/rest.ts
[S27]: https://github.com/gyoridavid/short-video-maker/issues/27
[S61]: https://github.com/gyoridavid/short-video-maker/issues/61
[V저장소]: https://github.com/browser-use/video-use
[V커밋]: https://github.com/browser-use/video-use/commit/43cfc566833548093455c9d4a46bd69913b7e552
[V판]: https://github.com/browser-use/video-use/blob/43cfc566833548093455c9d4a46bd69913b7e552/pyproject.toml#L3
[V허가]: https://github.com/browser-use/video-use/blob/43cfc566833548093455c9d4a46bd69913b7e552/LICENSE
[V설명]: https://github.com/browser-use/video-use/blob/43cfc566833548093455c9d4a46bd69913b7e552/README.md
[V입력]: https://github.com/browser-use/video-use/blob/43cfc566833548093455c9d4a46bd69913b7e552/helpers/transcribe_batch.py#L26
[V렌더]: https://github.com/browser-use/video-use/blob/43cfc566833548093455c9d4a46bd69913b7e552/helpers/render.py
[V받아쓰기]: https://github.com/browser-use/video-use/blob/43cfc566833548093455c9d4a46bd69913b7e552/helpers/transcribe.py
[V규약]: https://github.com/browser-use/video-use/blob/43cfc566833548093455c9d4a46bd69913b7e552/SKILL.md
[V193]: https://github.com/browser-use/video-use/issues/193
[V118]: https://github.com/browser-use/video-use/issues/118
