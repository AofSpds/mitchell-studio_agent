# S35_WEB_TOOLS — 공개 웹 도구·제작기 일곱 줄 재확인

- 역할: MITCHELL_STUDIO/BTSR/RSCH 보조 S35_WEB_TOOLS. 대상: S29_FIXES 5번 표의 1·2·3·4·9·10·11행.
- 열람 시각 묶음 A: **2026-11-28 17:41:59–17:47:06 KST**. 각 행의 주소를 이 구간에 열었다. 개별 클릭 시각 대신, 조회 전후 PowerShell로 확인한 구간을 쓴다.
- 시각 확인: `[TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow,'Korea Standard Time')`. 공개 문서·코드를 읽기만 했다. 설치·실행·가입·로그인·업로드·커밋·push 없음.
- 웹 도구가 돌려준 본문에는 수집 시점이 서로 다른 것이 있다. 특히 이슈 상태·상대 날짜는 현재 실시간 상태라고 단정하지 않는다. 문서의 지원 주장과 실제 기기 시험도 구분한다.
- 아래 S16–S22 줄 번호는 `sub/s15_community_research/`의 해당 바탕 글이다. S29는 `sub/s23_synthesis_review/S29_FIXES.md`다. 읽기가 허용되지 않은 한 장·종합본의 다른 부분은 열지 않았으므로, 그쪽 수정 위치는 **전달할 항목**이지 실제 반영 여부 확인이 아니다.

## 1. pyJianYingDraft — ‘6 이하’·‘6.8 이하’·비VIP 조건

- 가릴 물음: 같은 판에서 초안 만들기·틀 읽기·자동 내보내기의 조건이 다른가. 비VIP이면 무조건 막히는가.
- 연 주소·때: [저장소](https://github.com/GuanYixuan/pyJianYingDraft), [main README](https://raw.githubusercontent.com/GuanYixuan/pyJianYingDraft/main/README.md), [배포 목록](https://github.com/GuanYixuan/pyJianYingDraft/releases), [고정 커밋 README](https://raw.githubusercontent.com/GuanYixuan/pyJianYingDraft/1e22847/README.md) — 묶음 A.
- 판·날짜·커밋: 배포 목록의 Latest는 **v0.3.1**, 커밋 **1e22847**. 화면 날짜는 `14 Oct 14:04`로 연도·시간대가 없어 한국 시각으로 옮기지 않았다. 아래 핵심 조건은 이 고정 커밋에서도 함께 확인했다.
- 찾은 것: 기능표의 짧은 원문은 **“6.8（剪映6及以下）”**. 자동으로 초안을 열기·내보내기·출력 설정하기에 같은 표기가 붙는다. 본문은 5.9와 6.8 시험 통과, 7 이상은 조종 단추가 숨는다고 한다. 즉 ‘6’은 큰 판 번호로 쓰였으며 ‘6.0까지만’이라는 뜻으로 읽으면 안 된다. 모든 6.x 판의 성공을 시험한 표도 아니다.
- 찾은 것: 같은 README의 내보내기 경고는 **“不使用VIP功能或已开通VIP”**. VIP 기능을 쓰지 않거나 VIP 권한이 있어야 한다는 조건이다. 자동 내보내기는 Windows의 `uiautomation`을 쓰며 창·커서를 조종한다. 초안 생성의 10.8 지원, 틀 읽기의 추가 로더 필요와는 별개다.
- 판정: **바탕 글을 고침.** S21:71의 6.8 언급은 맞지만 ‘5.9·6.8에서 시험한 6.x 이하 자동 조종’으로 좁힌다. S21:72·219의 ‘비VIP이면/내보내기에는 VIP 필수’는 잘못 넓혔다. S21:239의 ‘VIP 기능을 쓴 초안’이라는 조건을 함께 써야 한다.
- 고칠 곳: S29:162의 물음은 위와 같이 해소. 한 장 1·2번 또는 종합본의 도구 조건표에는 **초안 생성 / 기존 틀 읽기 / 화면 자동 내보내기 / VIP 소재 권한**을 별도 조건으로 전달한다. [고정 README 근거](https://raw.githubusercontent.com/GuanYixuan/pyJianYingDraft/1e22847/README.md)

## 2. CapCut 국제판·중국판 — 암호화와 지원 판

- 가릴 물음: ‘새 CapCut은 암호화’가 국제판까지 포함하는가. 읽기 불가가 새 초안 쓰기 불가와 같은가.
- 연 주소·때: [S29 지정 암호화 문서](https://raw.githubusercontent.com/renezander030/capcut-cli/master/docs/jianying-encryption.md), [같은 저장소 지원표](https://raw.githubusercontent.com/renezander030/capcut-cli/master/docs/version-support.md), 위 pyJianYingDraft README·[pypi_readme](https://github.com/GuanYixuan/pyJianYingDraft/blob/main/pypi_readme.md) — 묶음 A.
- 판·날짜·커밋: capcut-cli 문서는 `master`, 암호화 문서에 2026-09 근거와 CLI 0.24.0 설명이 보인다. 지원표에는 9월·10월·11월 보고가 섞여 있다. 문서 수정일·커밋은 표시되지 않았다. pyJianYingDraft는 1행의 판을 함께 본다.
- 찾은 것: 원문 **“CapCut International is not encrypted — only JianYing.”**와 **“detect, do not decrypt”**. 이는 ByteDance 공식 보증이 아니라 제3자 도구 제작자가 적은 구분이다. 국제판 8.7의 여러 시간줄 파일 문제를 중국판 암호화와 합쳐 설명하면 안 된다.
- 찾은 것: 지원표의 중국판 9.0 Windows 행에는 앱이 만든 평문 초안 사례와, 도구가 만든 평문 주 파일을 앱이 받아들이고 다른 파일을 암호화한 사례가 함께 있다. 11.4·11.8 macOS도 새 평문 초안을 받았다는 사용자 보고다. 따라서 **‘중국판 6.0 이후 모든 초안·파일이 항상 암호문’도 너무 강하다.** 버전·운영체제·파일·기존 초안 읽기/새로 쓰기를 나눈다. [지원표](https://raw.githubusercontent.com/renezander030/capcut-cli/master/docs/version-support.md)
- 찾은 것: 국제판 지원표도 6.2.8의 저장소 시험자료, 8.7의 저장 형태 확인, 10.x의 쓰기 제한을 구분한다. 최신판 전체 호환이나 앱에서 편집·저장·재열기 성공을 보장하지 않는다. 현재 저장소의 `pypi_readme.md`에는 10.8 조건부 지원표가 있다. 실제 PyPI 게시판·옛 판은 이번에 열지 않아 S19:87의 옛 PyPI 내용이 언제 바뀌었는지는 모른다.
- 판정: **바탕 글을 고침.** S19:86의 ‘CapCut 10.8’은 중국판 JianYing과 구분해야 한다. S19:87의 6.0+ 암호화는 파일별 예외·읽기/쓰기 차이를 덧붙인다. S21:69–73의 중국판 도구라는 범위는 유지한다.
- 고칠 곳: S29:163 및 한 장 1·2번/종합본의 숨은 초안 형식 의존 설명. **읽은 이의 판단:** 판이 바뀌면 깨질 수 있다는 판단은 유지하되, ‘암호화 때문에 모든 초안 생성이 불가능’이라는 근거로 쓰지 않는다.

## 3. deface — 기본 소리 처리와 얼굴 가림의 틈

- 가릴 물음: 소리는 기본 보존인가. 2021년의 가림 틈 문제가 현재 해결됐다고 할 수 있는가.
- 연 주소·때: [README](https://github.com/ORB-HD/deface), [이슈 #8](https://github.com/ORB-HD/deface/issues/8), [현행 처리 코드](https://github.com/ORB-HD/deface/blob/master/deface/deface.py), [패키지 메타데이터](https://github.com/ORB-HD/deface/blob/master/pyproject.toml) — 묶음 A.
- 판·날짜·커밋: 코드·README는 `master`; 메타데이터의 판 번호는 동적으로 정해져 고정 번호·커밋·수정일은 확인 못 했다. 이슈는 2021-03-03 작성, 반환된 화면은 **Open**, 연결된 branch/PR 없음. 이슈 수집 표시는 ‘3개월 전’이다.
- 찾은 것: **“By default all audio tracks are discarded as well.”** 소리는 기본 삭제, `--keep-audio` 또는 `-k`로 원본 소리를 복사한다. S19:137이 맞고 S20:83의 ‘원래 소리 지킴’에는 옵션 조건이 빠졌다. [README](https://github.com/ORB-HD/deface)
- 찾은 것: 이슈의 **“Sometimes the face slips into 1 or 2 frames”**는 작은 가림 때문에 얼굴이 짧게 드러난다는 신고다. 현행 `video_detect` 코드도 각 프레임에서 검출한 뒤 바로 가리고 기록하는 구조다. 읽은 경로에서 앞뒤 프레임으로 빠진 검출을 메우는 처리는 확인하지 못했다. [이슈](https://github.com/ORB-HD/deface/issues/8) · [코드](https://github.com/ORB-HD/deface/blob/master/deface/deface.py)
- 판정: 소리는 **바탕 글을 고침**. 가림 틈의 존재와 프레임별 처리는 **바탕 글이 맞음**. 다만 ‘현재까지 고친 것이 전혀 없다’는 전체 이력 결론은 **여전히 가려지지 않음**. 이번 반환 본문에는 관리자 답글이 없어 S20:83의 관리자 발언은 재확인 못 했다.
- 고칠 곳: S29:164, S20:83·172, 한 장 1·2번/종합본의 가림 도구 설명. **읽은 이의 판단:** 사람 확인 없이 얼굴 가림 완료라고 판정할 근거는 늘지 않았다. 실제 누락률은 실행 시험 몫이다.

## 4. MoneyPrinterTurbo·Pixelle — 자기 소재와 자막 범위

- 가릴 물음: 예전 제작기의 입력 제약이 현행 도구에도 맞는가. Pixelle의 ‘README에 자막 설명 없음’은 기능 없음인가.
- 연 주소·때: [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo), [Pixelle-Video](https://github.com/ATH-MaaS/Pixelle-Video), [장면 합성 코드](https://raw.githubusercontent.com/ATH-MaaS/Pixelle-Video/main/pixelle_video/services/frame_processor.py), [HTML 글자 처리](https://raw.githubusercontent.com/ATH-MaaS/Pixelle-Video/main/pixelle_video/services/frame_html.py), [자기 소재 처리](https://raw.githubusercontent.com/ATH-MaaS/Pixelle-Video/main/pixelle_video/pipelines/asset_based.py), [영상 처리](https://raw.githubusercontent.com/ATH-MaaS/Pixelle-Video/main/pixelle_video/services/video.py) — 묶음 A.
- 판·날짜·커밋: MPT는 현행 저장소 README, 고정 배포판·수정일·커밋 미표시. Pixelle은 `main`; README 변경 기록 맨 위는 **2026-06-01**, 자기 소재 추가는 **2025-12-04**. 이 날짜를 전체 코드의 마지막 수정일이라고 해석하지 않는다. 파일별 커밋은 안 보였다.
- 찾은 것: MPT 원문 **“本地图片和视频”**, **“TTS 时间戳或本地 Whisper”**. 자기 사진·영상 입력과 TTS 시각/로컬 Whisper 자막이 명시된다. S21:54가 맞으며 S20:19·41의 예전 제작기 수치·입력 설명을 현행 전체 기능처럼 쓰면 안 된다. S20:42의 다른 도구 제약은 이 확인으로 바뀌지 않는다. [MPT README](https://github.com/harry0703/MoneyPrinterTurbo)
- 찾은 것: Pixelle README에 자막 기능 설명이 없다는 S21:52의 관찰은 맞다. 그러나 `frame_processor.py`에는 **“Compose frame with subtitle using HTML template”**, **`text=frame.narration`**가 있다. 장면의 내레이션 글을 HTML로 그린 그림으로 만들고, 영상에는 덧씌우며 사진에는 합성한다. 자기 소재 처리 경로도 같은 합성기를 부른다. [합성 코드](https://raw.githubusercontent.com/ATH-MaaS/Pixelle-Video/main/pixelle_video/services/frame_processor.py) · [소재 경로](https://raw.githubusercontent.com/ATH-MaaS/Pixelle-Video/main/pixelle_video/pipelines/asset_based.py)
- 판정: **바탕 글을 고침(범위 보강).** ‘Pixelle 자막 기능 미확인’은 **장면별 대본 글자 합성 코드는 확인**으로 좁힌다. **읽은 이의 판단:** 읽은 경로는 장면별 글자 합성이다. 촬영본 말소리 받아쓰기·낱말별 시간 맞춤·한국어 품질·모든 틀에서 글자가 보이는지는 증명하지 않는다.
- 고칠 곳: S29:165, S21:52 및 한 장 1·2번/종합본의 입력·자막 표. 자기 파일 입력은 이미 있던 근거의 재확인이고, 새 발견은 Pixelle의 자막 합성 범위다. 예전 제작기와 현행 코드의 정확한 변경 시점 비교는 못 했다.

## 9. 브리즈컷 — 공개 코드와 실제로 관찰한 기능

- 가릴 물음: 공개 코드가 있는가. 말소리 이해·합성 내레이션까지 나온 사례인가.
- 연 주소·때: [처음 써 보기](https://www.goldbear.org/posts/breezecut-first-reel-step-by-step/), [내부 처리 제작기](https://www.goldbear.org/posts/breezecut-build-log-browser-video-editor/) — 묶음 A.
- 판·날짜·커밋: 첫 글 **2026-11-16**, 두 번째 **2026-11-16 발행·11-17 수정**. 앱 판 번호·커밋 없음. 제작자가 컴퓨터의 휴대폰 폭 화면에서 로컬 개발판으로 측정한 기록이다.
- 찾은 것: 첫 글은 **“지금은 초대받은 구글 계정만 쓸 수 있습니다.”**라고 한다. 영상 6개·사진 2장, 64초 뒤 35초 초안, 저장 6.5초, 자막 위치·없는 해시태그 오류가 기록돼 있다. 공개 저장소 링크·라이선스는 두 글에서 확인 못 했다. 이것으로 코드 비공개를 확정하지는 않는다. [실행 기록](https://www.goldbear.org/posts/breezecut-first-reel-step-by-step/)
- 찾은 것: 두 번째 글은 **“AI는 화면만 봅니다. 영상 속 말소리는 듣지 못합니다.”**라고 명시한다. S18:56의 120장→118줄·두 모델·잘못된 파일 번호/시각 검사와 맞는다. 이 두 사례에서 합성 내레이션 결과는 여전히 확인 못 했다. [처리 제작기](https://www.goldbear.org/posts/breezecut-build-log-browser-video-editor/)
- 판정: S18:3·23·56은 **바탕 글이 맞음**. 말소리 이해는 이 시험판의 명시적 한계로 보강. 공개 코드·합성 내레이션 결과는 **여전히 가려지지 않음**. 초대 제한이 명시되어 앱 화면은 열지 않았다. 가격·작업 단계 수의 제품 조건은 확정하지 않는다.
- 고칠 곳: S29:170 및 한 장 1번/종합본의 사례 표에 ‘제작자 자신의 컴퓨터 시험·영상 속 말소리 미지원’을 명시. **읽은 이의 판단:** 실제 휴대폰 성공이나 공개 코드 재사용 근거로 올려 잡을 수 없다.

## 10. 한국 상품 쇼츠 — 두 주소와 0.5초 / 0.1–0.3초

- 가릴 물음: 서로 다른 사례인가. 편집표의 컷 길이가 틀린 것인가, 원본 안의 장면 전환인가.
- 연 주소·때: [짧은 주소](https://www.gpters.org/nocode/post/video-shorts-production-pipeline), [식별자가 붙은 주소](https://www.gpters.org/nocode/post/video-shorts-production-pipeline-dN9c0UiddBQqOnr) — 묶음 A.
- 판·날짜·커밋: 짧은 주소는 **2026.08.03**, 긴 주소는 상대 표시 ‘2달 전’. 수정일·판·커밋 없음. 반환 본문 수집 표시는 각각 5일 전·지난달이다. 같은 제목·25초 결과·오류 설명·영상 링크를 확인했다.
- 찾은 것: 두 본문 모두 요약에는 **“0.5초 단위로 빠르게 넘어갔습니다”**, 상세에는 **“0.1초 ~0.3초”**가 나온다. 상세 설명은 **“컷 길이는 3초가 맞는데, 그 컷 안에 원본 영상 자체의 장면 전환이 들어있었던 겁니다.”**라고 원인을 구분한다. [상세 본문](https://www.gpters.org/nocode/post/video-shorts-production-pipeline)
- 판정: **바탕 글을 고침.** 두 주소는 내용상 같은 사례이고 두 숫자도 같은 글 안에 공존한다. 서버의 동일 글 ID·리디렉션까지 확인한 것은 아니다. S18:35의 ‘3초 컷이 0.5초로 바뀜’은 원인을 오해하게 한다. S22:70은 상세 수치와 맞지만 원본 내부 전환이라는 설명을 더한다.
- 고칠 곳: S29:171, S18:26·35, S22:66–70, 한 장 1번/종합본의 사례 중복·검수 설명. **읽은 이의 판단:** 두 성공 사례로 세지 말고, ‘편집 조각 길이와 그 안의 장면 지속 시간을 따로 검사’하는 근거로 쓴다.

## 11. 자막 수정 기록·Reddit 재시도 청구

- 가릴 물음: 28–65곳은 사람이 고친 수인가. 이중 청구는 어떤 단계를 재실행한 사례인가.
- 연 주소·때: [지정 Markdown 주소](https://flaviocopes.com/agent-video-editing.md)는 실패, 검색에서 찾은 [같은 글 HTML](https://flaviocopes.com/agent-video-editing/)은 읽음. [지정 Reddit 원글·답글](https://www.reddit.com/r/n8n_ai_agents/comments/1y36cce/my_n8n_flow_breaks_at_the_voice_step_so_how_do_i/)도 읽음 — 묶음 A.
- 판·날짜·커밋: 블로그 **2026-11-11**, 판·커밋 없음. Reddit 반환 화면은 원글 ‘21h ago’, 답글 ‘6h ago’, 도구 수집 표시 ‘4일 전’이다. 절대 작성일은 안 보여 S16:56의 **11월 23일**을 재확인하지 못했다.
- 찾은 것: 블로그 원문 **“So the agent reads the whole transcript first and fixes the names.”** 이어지는 과정도 받아쓰기 세 결과를 맞대고 판단 가능한 것은 에이전트가 고친다. 표의 `Caption fixes`는 기록된 다섯 영상에서 **28·36·34·57·65**, 여섯째는 기록 없음. 사람이 듣는 `Listen list`는 **1·3·5·6·3·4**다. 사람이 최종 시청·제목/표지 승인·게시를 맡는다는 설명도 있다. [블로그](https://flaviocopes.com/agent-video-editing/)
- 판정(자막): **바탕 글을 고침.** S20:13·20·39의 ‘사람이 자막 28–65곳을 고침’은 교정 주체를 잘못 붙였다. 에이전트 중심 교정 수와 사람의 청취 판정 1–6곳을 나눈다. 같은 표에서 자르기도 **6–242곳**이므로 S20:39의 23–242 범위도 수정 대상이다.
- 찾은 것: Reddit 원글 **“I paid for the image and video twice.”** 이미지→6초 영상→음성 흐름에서 음성 응답이 늦자 전체를 다시 돌려 앞의 이미지·영상을 중복 결제했다는 자기 신고다. 서비스명·청구서·금액은 없다. 답글은 단계별 작업 ID·상태·산출물 URL 재사용과 기존 음성 작업 조회를 제안하면서 자신의 영상 처리 서비스를 홍보한다. [원글·답글](https://www.reddit.com/r/n8n_ai_agents/comments/1y36cce/my_n8n_flow_breaks_at_the_voice_step_so_how_do_i/)
- 판정(Reddit): 내용은 **바탕 글이 맞음**, 날짜·실제 청구 내역은 **여전히 가려지지 않음**. 특정 영상 API 전체의 이중 청구 정책을 증명하는 사례가 아니다.
- 고칠 곳: S29:172, S20:13·20·39의 자막 수치 주체, S16:56의 날짜 확실성. 한 장 0·1·2번/종합본에 같은 문장이 넘어갔다면 ‘에이전트 교정 + 사람의 불확실 구간 판정·최종 검수’로 고친다.

## 한 장 0번 칸에서 한알께 다시 고쳐 드릴 것

- **우선 정정:** ‘사람이 영상마다 자막 28–65곳을 고쳤다’가 전해졌다면, 에이전트 중심 교정 수치이며 사람의 청취 판정은 1–6곳이라고 고친다. 마지막 검수가 필요하다는 판단은 유지한다. 근거: 11행.
- **조건 정정:** ‘비VIP이면 내보내기 불가’는 VIP 기능 사용 여부의 조건을 붙이고, ‘새 CapCut 암호화’는 중국판·국제판과 파일별 읽기/쓰기를 나눈다. 근거: 1·2행.
- **기능 정정:** ‘deface가 기본으로 소리 보존’은 삭제, ‘Pixelle 자막 미확인’은 장면별 대본 글자 합성 코드 확인으로 바꾼다. 근거: 3·4행. 원점 한 장 자체의 실제 표현·전파 여부는 읽기 범위 밖이라 확인 못 했다.
- **읽은 이의 판단:** 이 재확인만으로 길 셋 중 선택을 뒤집거나 무인 성공률을 높여 잡을 근거는 없다. 사람 손의 양·도구 제약을 과장한 문장은 고쳐야 한다.

## 못 연 주소·못 한 것

- [블로그 지정 .md 주소](https://flaviocopes.com/agent-video-editing.md): `URL ... is not accessible via this tool.` — 권한 거부 표시는 없었고 같은 글의 공개 HTML을 읽었다.
- [pyJianYingDraft README 변경 이력](https://github.com/GuanYixuan/pyJianYingDraft/commits/main/README.md): `Failed to fetch ...: Cache miss`. 이력 비교는 못 했고 공개 배포의 고정 커밋 README로 조건을 확인했다.
- [Pixelle README가 가리킨 문서](https://aidc-ai.github.io/Pixelle-Video/zh): `(404) Not Found`. 같은 저장소의 [FAQ](https://github.com/ATH-MaaS/Pixelle-Video/blob/main/docs/FAQ_CN.md)·[폴더](https://github.com/ATH-MaaS/Pixelle-Video/tree/main/pixelle_video/services)는 본문을 읽을 수 있었다. GitHub 일부 페이지의 `There was an error while loading. Please reload this page.`는 부분 로딩 문구로 남긴다.
- 권한 거부·허락 창은 없었다. 로컬 `rg`는 명령을 찾지 못해 지정 파일·줄을 PowerShell로 읽었다. 앱 실행·실제 출력 품질·청구·현행 모든 커밋의 수정 이력·deface 관리자 답글·Reddit 절대 날짜·브리즈컷 공개 코드와 합성 내레이션 결과는 확인하지 못했다.
