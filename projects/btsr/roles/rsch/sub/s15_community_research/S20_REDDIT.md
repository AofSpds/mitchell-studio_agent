# S20_REDDIT — 커뮤니티 연구 (Reddit 자리)

> **이 세션은 Reddit을 읽지 못해 아래 두 가지를 봄:** ① Reddit이 아닌 영어권 만드는 사람 커뮤니티(n8n 커뮤니티 포럼 · GitHub Discussions · Issues · Indie Hackers · dev.to · 개인 제작기 블로그 등 — X · Hacker News는 S19_X 몫이라 뺌) ② `S16_REDDIT.md`가 근거로 든 Reddit 밖 주소를 직접 열어 맞대어 보기(끝쪽 'S16 맞대어 보기').
>
> 세션: `MITCHELL_STUDIO/BTSR/RSCH/S20_REDDIT` · 여는 쪽 RSCH PRIMARY(Paseo `ae883848`) · 실행기 Claude Opus 5.5 · 시작 2026-11-28 01:32 KST(01:33 Reddit 막힘으로 멈춤 · 01:34 여는 쪽 답 받고 다시 시작)

## 쓸 만한 것 다섯

1. **편집은 '파일로 적고 프로그램이 굽는' 꼴로.** 2026년 영어권 공개 도구(OpenChatCut · kinocut · MakeMyClip · OpenFilm)는 거의 다 편집 내용을 JSON · HTML 파일로 적고 FFmpeg · Remotion이 굽는다. 화면을 대신 눌러 편집하는 공개 도구는 하나도 못 찾았다. 까닭: 고치기 · 되돌리기 · 다시 굽기가 파일 하나로 된다. [2번 칸]
2. **돈이 드는 단계 앞에 사람 확인을 두고, 작업 번호부터 저장한다.** '다시 하기 버튼'으로는 안 고쳐진다(확인 자리 넷을 둔 제작자). 바깥 서비스를 부르기 전에 우리 번호를 저장하고, 결제는 한 번만 하며, 시간 초과면 다시 보내지 말고 먼저 상태를 묻는다. 까닭: 여러 글이 같은 탈(두 번 결제 · 렌더 낭비)을 겪었다. [5번 칸]
3. **영상 길이와 자막 시각은 실제 목소리에서 잰다.** 글자 수로 짐작하면 30초를 넘기며 어긋나고, 같은 목소리도 초당 2.08 – 2.70단어로 흔들린다. 받아쓰기 단어 시각이나 TTS가 돌려준 시각을 쓴다. 까닭: 직접 해 본 두 사람이 숫자로 보였다. [3 · 5번 칸]
4. **얼굴 가리기와 상품 사진은 자동으로 하되, 사람이 휴대폰에서 한 번 본다.** 공개 얼굴 가림 도구는 장면을 한 장씩 따로 봐서 한두 장면 동안 얼굴이 드러난다(2021년 이슈가 아직 열려 있음). AI 배경 바꾸기는 로고 · 글자를 가장 자주 망친다. → 상품은 진짜 사진을 오려 붙이고 배경만 만든다. [4번 칸]
5. **에이전트는 품을 맡고, 마지막 확인과 SNS 올리기는 사람이 한다.** 11월에 에이전트로 영상을 편집한 기록을 보면 영상마다 자막을 28 – 65곳 고쳤다. TikTok은 자기 계정에만 올리는 도구를 허용하지 않는다. YouTube 올리기 규칙은 2026-06 · 11월에 바뀌었다. → 완성본 · 글 · 배경음 없는 판을 휴대폰에 넘긴다. [1 · 6 · 8번 칸]

## 0. 처음부터 만든다면

**많이 쓰는 얼개 셋(이번에 본 영어권 공개 글 기준 — 사용률 순위는 알 수 없음).**
1. **자동화 도구 + 바깥 API 잇기.** n8n이 텔레그램이나 양식으로 받고, 대본은 언어 모델 API, 목소리는 ElevenLabs, 장면 생성은 중개 API로 받는다. 렌더는 바깥 렌더 서비스나 자기 서버가 맡는다. 만들기는 가장 쉽지만 n8n Cloud에는 FFmpeg가 없다. 포럼의 해법은 거의 다 그 서비스를 파는 사람의 글이다. 가져다 쓴 틀에서 고정 대화 번호 · 끊긴 실패 가지가 나왔다. [n-flow] · [S16 맞대어 보기]
2. **'주제 한 줄 → 자료 화면 영상' 공개 공장.** MoneyPrinterTurbo(별 6.6만쯤) · short-video-maker(1.5천)가 있다. 자료 화면(Pexels) · TTS · 자막 · FFmpeg 또는 Remotion으로 굽는다. **끝까지 도는 것은 이쪽이 가장 확실하다** — GPU 없는 빌린 서버에서 한 편에 1 – 2분이다. 그러나 **내 사진 · 내 영상을 넣는 자리가 없거나 약하다**(short-video-maker는 아예 못 넣는다고 적음). 그래서 '가게 사진 몇 장으로 만드는 영상'에는 그대로 맞지 않는다. [d-mpt] · [g-svm]
3. **(2026년에 커진 길) 코딩 에이전트 + 편집 도구를 MCP로 잇기.** Claude Code · Codex 같은 에이전트가 OpenChatCut · kinocut · MakeMyClip의 도구를 부르거나 Remotion 공식 스킬로 코드를 짠다. 원본은 그대로 두고 편집 파일과 기록을 남긴다. 11월의 직접 기록 하나(flaviocopes)는 끝까지 돌았다. 다만 사람이 자막을 수십 곳 고쳤고 올리기는 사람이 했다. [d-flavio] · [2번 칸]

**한 사람용 '사진 · 짧은 영상 몇 개 + 한 줄 → 세로 영상 + 글' 앱에 비춰 보면(내 정리).** 1번의 '받기 · 승인 · 돌려주기'(텔레그램 버튼)와 3번의 '편집을 파일로 · 원본 그대로 · 기록 남기기'를 합친 꼴이 글들에서 가장 덜 깨졌다. 렌더는 FFmpeg를 상시 서버나 자기 컴퓨터에서 돌린다. 영상 생성 모델은 꼭 필요한 한두 장면에만 쓴다(값과 상업 이용 조건 때문 · 7 · 8번 칸).

**여섯 달 전(2026-05)과 달라진 것.**
- **에이전트용 편집 도구가 '시제품'에서 '판을 내는 도구'로 넘어가는 중.** kinocut 2.2.0이 11-25에 나왔다. OpenChatCut은 별 3.4천에 설치판까지 냈다. Remotion은 공식 에이전트 스킬을 냈다. 5월 팟캐스트에서 Remotion을 만든 이는 쓰는 사람이 개발자 아닌 쪽으로 바뀌었다고 했다. 다만 이런 도구로 실제 영상을 편집해 숫자를 남긴 글은 아직 드물다(이번엔 11월 flaviocopes 하나).
- **자동화 도구 쪽의 문이 좁아짐.** n8n 2.0부터 명령 실행 노드가 기본으로 꺼졌다(공식 문서) [o-n8nexec]. 그래서 렌더를 바깥으로 빼는 흐름이 굳었다.
- **SNS 규칙이 여럿 바뀜.** YouTube 올리기 한도는 2026-06-01에 따로 된 칸으로 갔다. 2026-11-02부터는 심사 안 받은 앱의 영상도 비공개로 묶지 않는다. TikTok 게시 지침은 2026-08-04에 고쳤다. YouTube는 07월에 '찍어 낸 AI 영상' 규칙을 다시 풀어 설명했다. Suno 약관은 2026-09-03부터 새로 쓴다. → **여섯 달 넘은 제작기의 '올리기' 조언은 낡았을 수 있다.**
- **값 비교는 못 함.** 지금 값은 7번 칸에 적었다. 그러나 여섯 달 전 공식값을 따로 보지 못해 '얼마나 싸졌나'는 적지 않는다.

## 1. 끝까지 되는 보기

믿을 만한 정도: **상** = 공식 문서이거나 서로 맞대어 볼 수 있음 · **중** = 한 사람이 직접 해 보고 조건과 실패를 밝힘 · **하** = 광고이거나 근거를 확인하기 어려움. 날짜에 해가 안 적혀 있으면 2026년(글 아래쪽 표시로 확인).

| 무엇을 넣으면 → 무엇이 나오나 | 얼개 · 겪은 일 | 출처 · 날짜 · 직접/광고 · 믿을 만한 정도 |
|---|---|---|
| **한 줄 주제 → 60초 안쪽 세로 영상(1080×1920 · 자막 박힘)** | 대본은 OpenRouter 무료 모델 · 장면 그림은 Pollinations · 목소리는 edge-tts · 단어별 시각은 자기 PC의 faster-whisper · 자막은 ASS · 조립은 FFmpeg(사진을 천천히 당기는 움직임). 처음엔 글자 수로 시각을 짐작했더니 **30초를 넘기면 자막이 목소리와 어긋남** → 모든 시각을 받아쓰기 결과에서 뽑도록 고침. FFmpeg 부르는 곳을 한 군데로 모음. | dev.to (numbpill3d) 05-28 · 직접 만듦(자기 채널용) + 공개 저장소 소개 · **중**(고친 까닭이 구체적, 값 · 실패율 숫자 없음) [ffmpeg-ai][d-ffai] |
| **대본 파일 → YouTube Shorts** (명령 하나) | Google Cloud TTS(무료 구간) · Python Pillow로 그린 장면 · FFmpeg. AI 영상 조각(Veo · Kling · Hailuo)으로 바꾸려다 **무료 구간의 상업 이용 조건이 흐려서 접음** — Veo 무료 내보내기에 'Made with Veo' 표시, Kling · Hailuo 무료는 상업 이용 제외라고 적음. 결국 채널 대신 제작기 글쓰기로 돌아섬. | dev.to (just_a_side_project) 08-04(09-01 고침) · 직접 · **중**(접은 까닭이 분명, 성과 숫자 없음) [shorts 접음][d-pivot] |
| **틈새 주제 → 대본 → 목소리 → 자료 화면 · 자막 → 세로 MP4 → (고르면) YouTube 올리기** | n8n 틀. 대본 OpenRouter · 목소리 ElevenLabs · 자막은 ElevenLabs가 함께 돌려준 발음 시각 · 렌더는 Zvid. 댓글에서 '대본 뒤 · 목소리 앞에 사람 승인' · '구글 시트를 줄 세우기 겸 상태 기록으로 써서 다시 돌릴 때 돈 드는 단계를 되풀이하지 않기' · '목소리 주소와 렌더 작업 번호를 저장' 제안에 글쓴이가 동의. 시험 모드도 대본 · 목소리 값은 나간다는 지적. | n8n 커뮤니티 11-05 – 11-11 · 글쓴이가 렌더 서비스(Zvid) 쪽 · 광고 섞임 · **하 – 중**(얼개 토론은 쓸 만, 돌려 본 후기 없음) [n8n Shorts 틀][n-shorts] |
| **녹화 프로젝트(화면 · 카메라 · 마이크 따로 + 받아쓰기) → 자막 · 제목 · 설명 · 장 나눔 · 표지까지 붙은 완성본** (올리기는 사람이) | 녹화 프로그램(Borumi)의 MCP 도구 49개를 에이전트가 **'시작 → 확정' 묶음 단위**로 부르고, 편집은 JSON 구간 목록. FFmpeg는 자른 구간의 소리 크기를 재는 데만 씀. 받아쓰기 두 개(Whisper · Parakeet)를 맞대어 **서로 다른 곳만 사람이 들어 보는 목록**으로. 기록된 한 번: 8:02 → 7:07, 에이전트 편집 약 18분, 영상마다 자르기 23 – 242곳. 겪은 일: 녹화 프로그램의 '침묵 찾기'가 웅얼거린 말을 침묵으로 봄(소리 크기 검사로 막음) · 겹쳐 사라지기에서 잔상 · 연결이 일하다 끊김 · **영상마다 자막 고침 28 – 65곳, 들어 볼 곳 1 – 6곳**. 결론: '품은 에이전트가, 마지막 확인 · 제목 · 표지 승인 · 올리기는 사람이'. | 개인 블로그(flaviocopes) **11-11** · 직접 · 자기 맥 앱과 녹화 프로그램을 소개하는 면도 있음 · **상 – 중**(숫자가 기록에서 나옴 · 한 사람) [에이전트 편집기][d-flavio] |
| **텔레그램으로 글 · 사진 · 영상 → 1080×1920 영상 → 승인 뒤 Facebook · Instagram · YouTube · TikTok에 올림** | 개인 취미 작업(SMA). Temporal(오래 걸리는 일을 끊겨도 이어 가게 하는 작업 엔진)로 흐름 5개 · 작은 일 55개. 언어 모델은 자기 PC의 Ollama → 안 되면 GitHub Models → Claude 순. 목소리 XTTS-v2 → ElevenLabs → edge-tts 순, 음악 MusicGen, 자막 로컬 Whisper, 렌더 FFmpeg. **텔레그램 버튼(승인 / 거절)** → 거절하면 대본부터 다시(최대 5번). 품질 점검 5곳 · 곳마다 3번 다시 하기. 월 0달러라 하나 무료 구간에 기댐. | 개인 제작 소개 페이지 · 코드 비공개('요청하면') · **하 – 중**(얼개는 자세하나 확인할 길 없음 · 겪은 문제 안 적음) [SMA][d-sma] |
| **주제 한 줄 → 1분 안쪽 세로 영상** (MoneyPrinterTurbo) | 공개 저장소(별 6.6만쯤이라고 글이 적음). 대본 언어 모델 · 목소리 edge-tts · 자막도 edge-tts · 자료 화면 Pexels · CPU만으로 FFmpeg. **GPU 없는 4코어 8 GB 빌린 서버**에서 한 편 1 – 2분. Whisper large-v3를 CPU로 돌리니 60초 영상 받아쓰기에 5분 → 접고 edge 자막으로. 설치 걸림: Python 3.11 고정 · 주소 끝 `/v1` 빠지면 404 · 첫 실행 1.8 GB 내려받아 디스크 참. | 개인 블로그 06-07 · 자기 서버에서 7일 써 봄 · 제휴 링크 밝힘 · **중** [MPT 제작기][d-mpt] |
| **장면별 내레이션 글 + 자료 화면 검색어 → 세로 영상** (short-video-maker) | 공개 저장소(별 1.5천 · MIT). Remotion이 굽고 kokoro-js 목소리(**영어만**) · whisper.cpp 자막 · Pexels 화면 · 기분 꼬리표 붙은 음악. n8n에서 MCP나 REST로 부름. **사진 · 내 영상은 못 넣음** · Windows 안 됨 · 메모리 모자람을 막으려 동시 1개로 맞춤. | 저장소 첫 장 · 유튜브 채널이 공개 · **중**(한계를 스스로 밝힘) [short-video-maker][g-svm] |
| **영상 조각 · 내레이션 · SRT 자막 → MP4 하나** (n8n Cloud에서) | n8n Cloud에는 FFmpeg도 명령 실행 노드도 없음 → 바깥 렌더 서비스로 넘김. 겪은 일: 자료 화면의 제목판 · 검은 띠, 사용자 에이전트 없는 요청을 Wikimedia가 막음, 녹음과 자막이 어긋남. 글쓴이 서비스는 **완성본 한 편 0.20달러 · 조각 10개 · 60초 · 파일당 200 MB까지 · 원래 소리 버림 · 결과 주소는 오래 안 감**. | n8n 커뮤니티 10-08 – 10-19 · 글쓴이 자기 서비스(Apify) 홍보, 밝힘 · **하 – 중**(한도 숫자는 구체적, 남의 후기 없음) [n8n 조립][n-assemble] |


## 2. 편집을 무엇으로 하는가

**보이는 흐름: 화면을 대신 눌러 주는 편집 도구는 이번에 본 영어권 공개 저장소에서 하나도 못 찾았다.** 2026년에 올라온 '에이전트가 편집하는' 공개 도구는 거의 다 **편집 내용을 글(JSON · HTML) 파일로 적고, FFmpeg나 Remotion이 그 파일대로 굽는** 꼴이다. 에이전트는 Claude Code · Codex · Cursor 같은 코딩 에이전트를 바깥에서 붙이고(MCP라는 연결 규격), 도구 안에는 언어 모델이 없는 것이 많다. 아래 별 · 커밋 수는 2026-11-28에 저장소 첫 장에서 본 것(성숙도의 거친 신호일 뿐 품질이 아님).

| 도구 | 편집을 어떻게 적나 · 무엇이 굽나 | 한계(저장소가 스스로 적은 것) | 성숙도 · 출처 |
|---|---|---|---|
| **OpenChatCut** | 프로젝트 JSON + 여러 줄 타임라인 · 받아쓰기로 자르기. 바깥 에이전트는 MCP로 **'초안 편집 → 사람이 검토 → 승인하면 한 번에 되돌리기 한 칸'** 으로 붙음. Remotion · FFmpeg로 구움. MP4 · SRT · FCPXML로 내보냄 | 개발 중 · 데스크톱판 초기(맥판 서명 안 됨) · 한 컴퓨터 한 사람용 · Node 24 필요 · **AGPL**(고쳐서 서비스로 내면 코드 공개 의무) | 별 3.4천 · 커밋 1,134 · 설치판 있음 — 본 것 가운데 가장 많이 쓰임 · 직접 만든 이의 소개 · 중 [OpenChatCut][g-occ] |
| **kinocut** | 정해진 꼴의 MCP 도구(기본 18개, 다 켜면 208개) · `kino` 명령 · 여러 단계를 JSON으로 적은 흐름 · `video_direct` 계획을 **확인받은 뒤 적용**. FFmpeg로 구움. 원본을 덮어쓰지 않음 · 결과마다 '영상 영수증'과 품질 점검 보고 | 글→영상 · 유료 그림 생성 연결 없음 · 자막 읽는 목소리는 eSpeak(기계 소리) · 세로로 자르기는 가운데 자르기라 **눈으로 확인해야 함** | 2.2.0이 **2026-11-25** 나옴 · 별 285 · 커밋 2,040 · Apache-2.0 · 중 [kinocut][g-kino] |
| **MakeMyClip editor** | 원본을 안 건드리는 타임라인 문서(정해진 꼴) + 되돌리기 · 다시 하기 되는 작업 기록 + MCP 도구 19개쯤. FFmpeg · 로컬 whisper.cpp. MP4 · Final Cut/Resolve용 FCPXML · Premiere용 XML + SRT | 1.0 전 — 꼴이 바뀔 수 있음 · 「수백 조각 · 30분 넘는 것엔 안 맞춤」 · 속도 · 색 · 세로 맞추기는 XML로 못 넘김 · 리눅스 FFmpeg는 글자를 못 그림 | 별 53 · 커밋 223 · 시험 965개 통과 표시 · MIT · 중 [MakeMyClip][g-mmc] |
| **OpenFilm** | 영화 하나 = 폴더 하나 + `film.html`(CSS로 꾸민 트랙들). 에이전트가 고치는 것이 바로 보이고 사람이 장면 안에서 옮기기 · 키우기 · 돌리기 | 저장소 첫 장엔 한계 적힌 것 없음 · 내보내기 형식 이름 없음(S16 맞대어 보기 참고) | 별 9.6천 · MIT · 중 [OpenFilm][g-of] |
| **CutAgent** | 선언형 JSON 편집 목록(EDL — 돌리기 전에 맞는지 검사) · 결과도 JSON으로 돌려줌 · 에이전트용 도구 설명 파일 제공. FFmpeg | 적힌 것 없음 | 별 4 · 시험 · CI 있음 · 작지만 돌아가 보임 · 하 – 중 [CutAgent][g-cut] |
| **outtake** · **cutler** · **Orkas-VideoStudio** | MCP로 FFmpeg를 부르고 Remotion으로 자막 · 움직이는 글자 / 계획 JSON을 다시 돌려 고치기 / plan.json + HTML | 셋 다 스스로 '시제품 · 초기 MVP · 꾸러미 아직 안 냄'이라고 적음. outtake는 **도구 승인을 꺼 둔 채 돌림** | 별 0 – 3 · 하 [outtake][g-out] · [cutler][g-cutler] · [Orkas][g-orkas] |

**코딩 에이전트가 Remotion 코드를 짜는 길(2026년에 커진 것).** Remotion은 공식 '에이전트 스킬' 묶음을 냄(만들기 · 렌더 · 자막 · 라이선스 등 14개쯤 · Claude Code · Codex · Cursor 등에 붙임 · 언제 냈는지 날짜는 문서에 없음) [Remotion 스킬][o-rmskills]. 팟캐스트 Syntax #1005(05-18 · 게스트가 Remotion을 만든 사람 — 자기 제품 이야기 · 중): 에이전트 스킬 이야기가 퍼지면서 쓰는 사람이 늘었다고 함 · 요즘 쓰는 이들은 개발자가 아닌 사람이 '한 줄 요청'으로 짧은 소개 영상을 만드는 쪽으로 바뀌었는데 **만든 이 스스로 '한 줄로 영상 끝내기'는 아직 마음이 안 놓인다**고 함 · 진행자는 요청 · 코드 고치기 · 설정 화면 **세 갈래로 고치다 보니 '악몽'**이라 고친 값이 코드로 되돌아가는 화면을 직접 만듦 · **CSS 움직임은 깜박이므로 움직임을 장면 번호로 몰아야 함** · 진행자가 일부러 만든 '찍어 낸 영상'은 TikTok에서 안 되고 Instagram에선 괜찮았다(일화) · 만든 파일에 Remotion 인코더 꼬리표가 남아 SNS가 생성 영상을 가려내는 데 쓸 수 있다며 지워 달라는 사용자가 있다(짐작) [Syntax #1005][o-syntax]. 같은 주제의 회사 블로그 둘(OpenReplay 06-04 · Tella 10-12)은 돌려 본 기록 없이 설정 안내뿐 — '자료로 찍는 반복 영상엔 좋고, 실사 · 한 번뿐인 창작엔 코드가 짐'이라는 평(홍보 · 하) [OpenReplay][o-openreplay] · [Tella][o-tella].

**'FFmpeg만으로는 에이전트가 눈을 감고 편집한다'는 말.** 브라우저 편집기 FableCut을 만든 이(dev.to 07-09 · 자기 공개 도구 홍보 · 하 – 중): FFmpeg는 에이전트에게 '쓰기만 되는' 도구라 결과를 못 보고 고친다 → **사람과 에이전트가 같은 `project.json` 하나를 고치고, 고치면 0.15초 안에 미리보기가 바뀌는** 꼴을 제안(낡은 쓰기는 409로 거절). 단 내보내기는 브라우저를 열어 둬야 함. 실제 편집을 돌린 기록은 없음 [FableCut][d-fablecut]. 위 flaviocopes 사례도 에이전트가 편집하되 **받아쓰기 두 개를 맞대어 '눈 · 귀' 대신**으로 쓴 꼴(1번 칸).

**돌려 보고 겪은 일(커뮤니티 글).**
- **자막 시각은 짐작하지 말고 소리에서 뽑는다.** 글자 수로 짐작하면 30초를 넘기며 어긋남 → 받아쓰기(faster-whisper)의 단어 시각으로 고침(dev.to 05-28 · 직접 · 중) [ffmpeg-ai][d-ffai]. n8n 커뮤니티에서도 '녹음과 자막이 어긋남'이 같은 문제로 나옴(10월) [n8n 조립][n-assemble].
- **FFmpeg는 서버 없는 곳(Vercel Edge 등)에서 잘 안 돈다** → 무거운 영상 일은 Fly.io · Railway · Render 같은 상시 서버로 옮김(dev.to 06-26 · 자기 서비스 홍보 · 하 – 중) [aantraa][d-aantraa].
- **n8n Cloud에는 FFmpeg가 없다**(명령 실행 노드는 자기 서버용만 · 「n8n 2.0부터 기본으로 꺼짐」은 공식 문서로 확인 · 켜려면 설정을 따로 바꿔야 함 [o-n8nexec]) → 답은 늘 '바깥 렌더 API를 HTTP로 부르고 기다렸다 확인'. 그런데 그 답의 거의 전부가 그 서비스를 만든 사람의 글(RenderIO · KinoPipe · Zvid · Apify · QuickFFmpeg · Creatomate)이고, **남이 써서 잘 됐다는 확인은 한 건(베타 서비스 자기 보고)뿐**(n8n 커뮤니티 04 – 11월 네 글 · 하 – 중) [n8n FFmpeg][n-ffmpeg] · [n8n 영상 흐름][n-flow].
- **영상을 통째로 만드는 모델**은 이번에 본 영어권 글에서 '쓸 만한 조각 만들기'까지만 쓰였고, 편집의 뼈대로 쓴 사례는 못 찾음. 무료 구간은 상업 이용이 막히거나 표시가 붙어 접은 사례가 있음(1번 칸 [shorts 접음][d-pivot]).

## 3. 목소리 · 자막 · 음악

- **자막 시각은 목소리 파일에서 뽑는다 — 두 길.** ① 목소리 서비스가 함께 돌려주는 발음 시각을 쓴다(ElevenLabs — n8n Shorts 틀 [n-shorts]) ② 만든 목소리를 다시 받아써 단어 시각을 얻는다(자기 PC의 faster-whisper · Whisper — dev.to 두 글 [ffmpeg-ai][d-ffai]). **글자 수로 짐작하는 길은 30초를 넘기면 어긋나 버림**(직접 · 중). 번역 더빙에서는 '목소리 길이와 원래 길이를 견주는' 땜질을 쓰는데 만든 이 스스로 '단단한 해법은 아님'이라고 함 [aantraa][d-aantraa].
- **목소리 고르기와 상업 이용.**
  - ElevenLabs — **유료 플랜에서 만든 것은 상업 이용 권리, 무료는 출처 표시 조건의 비상업만**(공식 문서 확인 · 상) [ElevenLabs 요금 문서][o-eleven].
  - Supertonic 3 — 자기 기기에서 도는 TTS, **한국어 됨**. 모델 조건(OpenRAIL-M)은 상업 이용을 막지 않지만 **동의 없는 목소리 흉내 금지 · 만든 소리를 기계가 만든 것이라고 밝힐 것**(공식 모델 카드와 라이선스 파일 · 상) [Supertonic 3][o-supertonic].
  - MeloTTS 한국어판 — MIT(상업 이용 됨)라고 모델 카드에 적힘 · 한국어 품질의 독립 비교는 못 찾음(하 – 중) [MeloTTS-Korean][o-melo]. Kokoro는 한국어가 된다는 글과 '영어 위주'라는 글이 엇갈림(하). CosyVoice2 한국어 손질판은 개인이 올린 것으로 듣기 시험 결과 없음(하).
  - Google Cloud TTS 무료 구간 · edge-tts(무료)를 쓴 제작기가 있음 [shorts 접음][d-pivot] · [ffmpeg-ai][d-ffai]. (내 덧붙임: edge-tts는 브라우저의 읽어 주기 기능을 공식 API 밖에서 부르는 도구라 상업 이용 조건이 따로 적혀 있지 않음 — 가게 홍보물에는 피하는 편이 안전. 근거는 내 앎이라 RSCH가 확인할 것.)
- **음악.** AI 음악은 Suno 약관(2026-08-10 고침 · 09-03부터)을 직접 읽음: **무료 · 베이직은 개인 · 비상업만** · Pro · Premier는 결과물 권리를 넘겨받고 **허용된 내려받기를 한 곡만** 상업 이용 · 그 권리는 **구독을 끊어도 남음** · 남의 곡을 고쳐 부른 리믹스는 상업 이용 안 됨 · 저작권이 생긴다는 보장은 하지 않음(공식 약관 · 상) [Suno 약관][o-suno]. 다른 AI 음악(Udio 등)은 2025 – 2026 소송과 합의로 조건이 바뀌는 중이라는 글이 많고 서로 엇갈림(하). TikTok의 상업용 음악 보관함 안내는 이번에 본문이 안 열림(S16 맞대어 보기).
  - → 이 앱에 옮기면: **배경음 없는 판도 함께 돌려주고, 음악은 올릴 곳의 보관함에서 사람이 붙이는 길**을 기본으로 두는 편이 덜 걸림(S16의 브랜드 운영자 제안과 같은 쪽 · 내 정리).

## 4. 사진 · 얼굴

- **AI로 상품 사진 배경을 바꾸면 상품 자체가 바뀐다 — 가장 흔한 탈은 글자 · 로고.** 사진 편집 회사 Photoroom이 스스로 잰 숫자: 만든 것의 **20.1%에서 로고 · 글자가 일그러짐**, 가장 나은 기본 모델도 상품 전체를 정확히 지킨 것은 **29%**뿐. 까닭은 '새 장면에 놓거나 배경을 바꿀 때 모델이 상품을 그대로 베끼지 않고 다시 그려서'. 통째로 다시 돌리면 한 곳을 고치며 이미 맞던 다른 곳이 바뀐다고 함. 대책으로 '진짜 사진과 나란히 놓고 보기' · '여러 각도의 기준 사진' · '틀린 곳만 고치기'. 다른 매체(iLounge)도 '로고가 바뀌거나 포장 글자가 틀리면 아무리 그럴듯해도 못 씀'이라고 적음. → **상품은 진짜 사진을 오려 붙이고 배경만 만드는 편이 안전**하다는 쪽으로 모임. 회사 자기 제품 홍보 섞임 · 숫자는 그 회사 측정 · **글은 열지 않고 검색 요약으로만 봄** · **하 – 중**(독립 측정은 못 찾음 · RSCH가 원문 확인할 것) [Photoroom][p-photoroom] · [iLounge][p-ilounge]
- **얼굴 가리기 — 공개 도구는 있으나 '틈'이 약점.** 가장 많이 쓰이는 공개 도구 deface(명령 한 줄 · 흐림 · 검은 상자 · 모자이크 · 원래 소리 지킴)는 **장면을 한 장씩 따로 보고 얼굴을 찾는다** — 앞 장면과 잇는 추적이 없다. 그 저장소의 이슈 #8(직접 열어 읽음): 작은 것에 조금만 가려져도 **한두 장면 동안 얼굴이 드러나고**, 거꾸로 엉뚱한 곳이 한 장면 가려지기도 함 → '먼저 장면마다 찾아 두고, 두 번째로 앞뒤를 이어 메우자'는 제안. 관리자는 앞뒤 고르기를 해 보려다 '제대로 안 돼서' 접었다고 답함. **2021-03에 열린 이슈인데 지금도 열려 있고 고친 것이 합쳐진 흔적이 없음** — 오래된 글이지만 '아직 안 풀린 문제'라는 점이 요지. #56은 '몇 장면마다 찾고 사이는 추적'을 바람(검색 요약). Microsoft의 얼굴 가림 문서도 **옆얼굴 · 24×24 화소 이하 작은 얼굴은 어렵고 100% 보장 못 함**이라고 적음(검색 요약 · 그 서비스는 이미 문을 닫은 옛 문서로 앎 — 내 앎). 대시캠용 dashcamcleaner는 1분 영상에 약 3분(옛 GPU 기준 · 검색 요약). 사용자 이슈 · 문서 · **중** [deface][p-deface] · [deface 이슈 #8][p-deface8] · [Azure 얼굴 가림][p-azure] · [dashcamcleaner][p-dashcam]
  - → 이 앱에 옮기면: **자동으로 가린 뒤 사람이 휴대폰에서 장면을 넘겨 보며 놓친 곳을 확인**하는 자리가 꼭 필요(S16의 결론과 같은 쪽).
- **사진 → 영상 모델.** 커뮤니티 제작기에서는 '사진을 천천히 당기는 움직임(Ken Burns)'으로 대신하는 경우가 많았고(1번 칸 두 사례), 생성 모델은 값과 상업 이용 조건 때문에 뺀 사례가 있음 [shorts 접음][d-pivot]. 값은 7번 칸.
- **얼굴을 AI로 바꾸기.** 커뮤니티에서 직접 해 본 기록은 못 찾음. 연구 쪽만 검색 요약으로 봄: 사람을 그럴듯한 다른 얼굴로 바꾸는 공개 도구 DeepPrivacy2(2023 학회 · GAN)가 기준점으로 쓰이고, 2025년 한 논문은 '**영상에서는 바꾼 얼굴이 장면마다 흔들리기 쉬워**, 합성한 가짜 얼굴을 넣는 얼굴 바꾸기 모델이 더 고르다'고 함 · 2026년 1월 논문들(AnonNET 등)도 영상 일관성을 과제로 듦(논문 · 검색 요약 · 하 – 중) [DeepPrivacy2][p-dp2] · [얼굴 바꾸기로 가리기 논문][p-swap]. → 가게 영상에는 **흐림 · 모자이크가 값싸고 확실**, AI 바꾸기는 흔들림 확인이 더 필요하다는 쪽(내 읽기).

## 5. 에이전트의 얼개

**보이는 흐름: '에이전트 여럿'보다 '한 줄로 늘어선 단계 + 단계 사이 사람 확인 + 단계마다 남기는 기록'.** 이번에 본 영어권 글 가운데 여러 에이전트가 서로 말을 주고받는 얼개를 끝까지 돌린 사례는 못 찾았다. 실패 대책은 거의 다 '다시 돌리기'가 아니라 '어디서 멈출지'와 '무엇을 기록할지'였다.

- **돈이 드는 단계 앞에 사람 확인을 둔다 — 다시 하기 버튼으로는 안 고쳐진다.** 한 제작자는 확인 자리 넷을 둠: ① 첫 문장 · 대본 ② 화면 계획 ③ **실제 목소리 길이** ④ 완성 MP4 미리보기(올리기는 따로 확인). 127단어 대본이 목표 50초에 59.08초가 나옴, 같은 목소리라도 주제에 따라 **초당 2.08 – 2.70단어**로 흔들려 '초당 단어 수 하나로 길이 맞추기'는 접음. 길이가 틀리면 렌더를 다시 하지 않고 대본 · 목소리 결정으로 되돌림. 고치면 그 뒤 산출물만 버리도록 판(版)과 계보를 남김. dev.to 07-14 · 자기 제품에 쓴 방식 소개 · **중** [확인 자리 넷][d-gates]
- **작업 번호를 먼저 저장하고, 결제는 한 번만.** 한 글은 단계 13개쯤의 한 줄 흐름: 바깥 서비스를 부르기 **전에** 우리 쪽 작업 번호를 저장 → 받은 바깥 번호를 붙임 → 결제는 '같은 원본 번호에 한 번만'(DB가 겹침을 막음) → 늦게 온 성공이 이미 '실패'로 적힌 것을 덮어쓰지 못하게 → 끝나지 않은 것만 상태 확인. 시험 조건으로 '받아 준 생성 하나 = 결제 많아야 하나'. dev.to 07-31 · 영상 서비스 회사를 위해 쓴 글이라고 밝힘 · 코드는 보기용 · **중** [비동기 흐름][d-async]. 같은 말을 다른 글들도 함: '시간 초과면 결과를 모름으로 두고 서비스에 물어보라 · 다시 보내지 말라' [WorkOS][o-workos] · 'HTTP 성공 응답 안에 실패한 작업이 들어 있을 수 있다'(영상 API 회사 글) [Magic Hour][o-magichour] — 둘 다 회사 글 · 검색 요약으로만 봄 · 하 – 중.
- **사람 확인을 '멈춰 기다리기'로 만들지 않는다.** Make 커뮤니티(07-21): 한 흐름 안에서 기다리면 실행 시간 초과에 걸림 → **흐름을 셋으로 쪼갬**(받기 → 초안 붙고 '승인 / 고쳐 줘' 링크 보내기 → 승인 처리). 승인 처리는 상태를 먼저 읽어 이미 승인 · 처리 중이면 멈추고(두 번 눌림 막기), 고쳐 달라면 상태를 되돌림. 포럼 조언 · 돌려 본 확인 없음 · **중** [Make 승인][d-make]
- **오래 걸리는 일은 끊겨도 이어 가는 엔진에 맡긴다.** 텔레그램 승인 · 거절 버튼이 작업 엔진(Temporal)에 신호를 보내는 개인 작업 [SMA][d-sma]. (HeyGen이 같은 엔진으로 옮겼다는 Temporal 회사 글은 404로 못 엶.)
- **혼자 쓰는 쪽 기록 꼴.** n8n Shorts 틀의 댓글: 구글 시트를 줄 세우기 겸 상태 기록으로 · 목소리 주소와 렌더 번호 저장 [n-shorts]. 편집 쪽에서는 **원본을 덮어쓰지 않고 편집 기록(되돌리기 되는)을 파일로** 남기는 도구가 많음(2번 칸 MakeMyClip · kinocut의 '영상 영수증').

## 6. 휴대폰에서 쓰는 꼴

- **휴대폰 쪽은 거의 다 텔레그램 봇.** 글 · 사진 · 영상을 봇에 보냄 → 결과와 '승인 / 거절' 버튼이 돌아옴 [SMA][d-sma] · 상품 사진 → 광고 영상 [n8n 틀 — S16 맞대어 보기]. 휴대폰 앱이나 웹앱(PWA · 공유 버튼)으로 만든 개인 제작기는 이번에 못 찾음(못 본 것).
  - 걸리는 것: 텔레그램 공식 봇 서버로는 **큰 원본을 못 받음**(받기 20 MB 쪽 · 자체 Bot API 서버를 두면 받기 제한 없음 · 보내기 2,000 MB — 공식 · 상, S16 맞대어 보기). 휴대폰 영상 몇 개면 금방 넘음 → 자체 Bot API 서버나 따로 올리는 자리가 필요.
  - 앞의 n8n 틀은 결과를 **보낸 사람이 아니라 박아 둔 대화 번호로** 보냈다 — 틀을 가져다 쓸 때 놓치기 쉬운 곳(S16 맞대어 보기).
- **서버를 어디에 두나.**
  - **GPU 없는 빌린 서버 한 대**(4코어 8 GB, 달 약 6달러)로도 '자료 화면 + 목소리 + 자막' 꼴은 한 편 1 – 2분에 됨. 다만 CPU로 큰 받아쓰기 모델은 너무 느림(60초에 5분) [MPT 제작기][d-mpt]. short-video-maker도 메모리 3 – 4 GB · 2코어면 된다고 적음 [g-svm].
  - **자기 컴퓨터의 GPU**로 영상 생성까지 하면: RTX 3090 24 GB에서 Hunyuan 1280×720 · 13장면(약 1.1초)에 **약 7.8분**, 언어 모델(Ollama)과 영상 모델이 GPU 메모리를 다투어 영상 일 전에 언어 모델을 내리는 장치를 따로 만듦 · 미리 줄인 모델을 설정 하나 틀려 메모리 넘침(dev.to 03-04 · 직접 · 중) [Hunyuan 3090][d-hunyuan]. 집에 RTX 5090 7장을 둔 서비스 운영자는 열(약 3,150 W) · 메모리 넘침 · 대기열을 네 번 다시 짬 · Kubernetes를 3주 만에 버리고 400줄 Python으로 바꿈(dev.to 04-14 · 자기 서비스 홍보 섞임 · 중) [7 GPU][d-7gpu] — 한 사람 앱에는 지나친 길이라는 반면교사.
  - **n8n Cloud · 서버 없는 곳**에서는 FFmpeg가 안 돌아 바깥 렌더 서비스나 상시 서버가 필요(2번 칸).
- **SNS에 올리기(공식 문서 · 상, 2026-11-28에 읽음).**
  - **Instagram**: API로 릴스 올리기 됨(`media_type=REELS`) · '프로 계정'용이라고 적힘 · 하루 한도는 **같은 문서 안에서 '24시간에 100건'과 '50건'이 엇갈림** → 문서도 '쓸 때 한도 조회 주소로 확인하라'고 함 [Instagram 게시][o-ig].
  - **YouTube**: 올리기는 **따로 된 칸에서 하루 100번**(한 번에 1단위) · 그 밖은 하루 1만 단위 · 태평양 시각 자정에 새로 참. 옛 글이 말하는 '한 편 1,600단위'와 '심사 안 받은 앱은 비공개로만'은 **지금 문서와 다름** — 바뀐 날을 개정 기록에서 확인: 2025-12-04 올리기 값 약 1,600 → 약 100단위 · **2026-06-01 올리기와 검색이 따로 된 칸으로** · **2026-11-02 「심사 안 받은 앱에서 올린 영상도 더는 비공개로 묶이지 않음」**(값을 안 주면 공개가 기본) [YouTube 개정 기록][o-ytrev]. 여섯 달 안쪽의 바뀜이라 그 전 제작기의 조언은 낡았음. 올릴 때 'AI로 만든 것' 표시 칸(`containsSyntheticMedia`)이 있음 [YouTube 올리기][o-ytinsert] · [YouTube 한도][o-ytquota].
  - **TikTok**: 자기 계정용 도구는 허용 안 됨(8번 칸) → 사람이 올림.

## 7. 값과 한도

**공식 가격표(2026-11-28에 직접 읽음 · 상).**

| 무엇 | 값 | 출처 |
|---|---|---|
| ElevenLabs 목소리 API | 싼 모델(Flash / Turbo) **1천 자에 0.04달러** · 다국어 주력(v4 등) **1천 자에 0.08달러**. 표에는 말의 수만 적혀 한국어를 콕 집어 적진 않음 | [ElevenLabs API 값][o-elevenapi] |
| Kling 2.6 Pro 사진→영상(fal) | 소리 없이 **초당 0.07달러** · 소리 함께 **초당 0.14달러**(모델 쪽 표기 · fal 전체 가격표는 0.07만 적어 엇갈림) | [fal Kling][o-falkling] · [fal 가격표][o-falprice] |
| Wan 3.0 사진→영상(fal) | **초당 0.05달러** | [fal 가격표][o-falprice] |
| Google 그림 생성 가장 싼 것 | Nano Banana 2 Lite · 2.1 **1K 한 장 약 0.034달러**(묶어 돌리면 절반) | [Google AI Studio 가격][o-gprice] |
| Veo 3.1 | **Google 가격표에서 못 찾음**(이번에 연 쪽엔 Veo 항목이 없었음). 남의 정리 글은 초당 0.05 – 0.40달러로 들쭉날쭉(하) | 못 봄 |
| Remotion 회사 라이선스 | 개인 · 3인 이하 무료 · 넘으면 자동화용 렌더 1회 0.01달러(달 최소 100달러) | [Remotion][o-remotion] |

**한 편에 드는 돈 — 만든 이들이 밝힌 것(직접 · 중, 저마다 조건이 다름).**
- **GPU 없는 빌린 서버 + 자료 화면 + 무료 목소리**: 서버 달 약 6달러 + 언어 모델 달 1달러 안쪽(약 100편) ≈ **달 7달러**(MoneyPrinterTurbo 제작기 · 제휴 링크 밝힘) [d-mpt].
- **바깥 렌더 서비스**: 완성본 한 편 0.20달러(n8n 포럼의 서비스 주인 · 한도 많음) [n-assemble].
- **자기 열쇠(API 키)를 쓰는 데스크톱 도구**: 9편에 3.85달러 ≈ **한 편 0.43달러**라는 자기 보고(Indie Hackers — 글이 403으로 안 열려 **검색 요약으로만 봄 · 하**) [ih-ember].
- **영상 생성 모델을 넣으면 값이 확 뜀**: 위 값으로 셈하면 8초 장면 하나에 Kling 0.56 – 1.12달러 · Wan 0.40달러(내 셈). 30초를 다 생성으로 채우면 한 편 수 달러. → 생성은 '꼭 필요한 한두 장면'만.
- **자기 GPU의 시간 값**: RTX 3090에서 1.1초 장면에 7.8분 [d-hunyuan] — 돈은 안 들어도 한 편에 몇 시간.

**구독 · 하루 한도.**
- Gemini 앱: 5시간마다 채워지고 주간 한도까지 · 영상 생성은 '드는 양 높음' · 플랜별 하루 몇 편이라는 숫자는 공식 문서에 없음(S16 맞대어 보기) [o-gemini].
- 올리기 한도: YouTube 하루 100번 · Instagram 24시간 100건 또는 50건(문서 안에서 엇갈림) · TikTok 하루 보통 15건쯤(6번 칸).
- Claude Code 같은 구독형 코딩 에이전트로 Remotion 코드를 짜는 값은 '구독이나 API 요금 — 지금 조건을 확인하라'는 말뿐, 한 편 값을 밝힌 글은 못 찾음 [o-openreplay].

## 8. 하지 말라는 것

- **틀로 찍어 낸 듯한 AI 영상을 YouTube에서 돈 벌이로 올리기.** YouTube 파트너 프로그램 '진짜가 아닌 콘텐츠(inauthentic content)' 규칙(2025-07-15에 이름을 바꿈): 「대량 생산 · 뻔함 · 되풀이 · 조작」이면 안 됨, **'만든 사람의 고유한 생각 없이 뻔한 틀로 찍어 낸 AI 영상'은 수익 불가**로 적혀 있음. AI를 쓰는 것 자체는 막지 않음. **채널 전체에서 수익이 빠질 수 있음.** 2026-07에 다시 풀어 설명했다는 보도(TechCrunch · Tubefilter — 검색 요약으로만 봄) — 새 규칙은 아니라고 함(규칙 문서는 직접 읽음 · 상) [YouTube 규칙][o-ytinauth] · [TechCrunch 07-20][o-tc]. → 가게 홍보는 수익 목적이 아니라 직접 걸리진 않지만, 같은 틀의 영상을 줄줄이 올리면 노출이 줄 수 있다는 쪽으로 읽힘(내 읽기).
- **내 계정에만 올리는 개인 도구로 TikTok 자동 공개를 기대하기.** TikTok 개발자 지침(2026-08-04 고침): 「자기나 자기 팀이 관리하는 계정에 올리는 도구」는 **허용 안 됨** · 심사 전 앱은 본인만 보기로만 올라감 · 계정당 하루 보통 15건 안팎(모든 앱이 나눠 씀) — 공식 · 상 [TikTok 게시 지침][o-tiktok]. → 휴대폰으로 영상과 글을 넘겨 사람이 올리는 길이 맞음(S16과 같은 결론).
- **무료 구간의 영상 생성으로 홍보물 만들기.** Veo 무료 내보내기엔 'Made with Veo' 표시, Kling · Hailuo 무료는 상업 이용 제외 — 그래서 접은 제작기(직접 · 중) [shorts 접음][d-pivot]. Suno 무료 · 베이직도 비상업만(3번 칸).
- **n8n Cloud에 FFmpeg 렌더를 얹으려 하기.** 안 됨(명령 실행 노드 없음). 큰 영상 파일을 n8n 안으로 흘리지 말고 **주소만 넘기라**는 것이 되풀이된 조언(n8n 커뮤니티 · 중) [n8n 영상 흐름][n-flow].
- **서버 없는 곳(Vercel Edge 등)에서 FFmpeg 돌리기** — 잘 안 돌아 상시 서버로 옮긴 사례(하 – 중) [aantraa][d-aantraa].
- **에이전트에 도구 승인을 꺼 둔 채 편집을 맡기기.** 시제품 하나(outtake)가 그렇게 돌리고 스스로 '로컬 시제품'이라고 적음 — 남의 사진 · 영상을 다루는 앱에서는 피할 길(내 읽기) [outtake][g-out].
- **AI가 바꾼 상품 사진을 확인 없이 올리기** — 로고 · 글자 일그러짐이 가장 흔한 탈(4번 칸).
- **결과가 늦다고 통째로 다시 돌리기** — 이미 끝난 유료 단계를 또 결제. 작업 번호로 먼저 상태를 확인하라는 것이 여러 글의 공통 조언(5번 칸).

## S16 맞대어 보기

`S16_REDDIT.md`가 든 Reddit 밖 주소 11개를 2026-11-28 01:45 – 02:00 KST에 직접 열었다(웹 읽기 도구). 같은 글의 Reddit 주소 28개는 열 수 없어 그 주장들은 **확인 못 함** — S16 글 1·4·5·6·8번 칸의 사례(촬영본 34개 릴 · 250→550 mL · Resolve 추적 실패 · 이중 결제 · 집 미니 PC 운영 등)는 모두 여기에 든다. 덧붙여: S16의 '반환'은 Reddit 26건과 댓글을 **11분 42초**에 읽고 썼다고 적었다 — 모을 때 원문 대조가 특히 필요해 보인다(내 짐작 · 까닭은 걸린 시간뿐).

| S16의 주장 | 주소 | 맞대어 본 결과 |
|---|---|---|
| ElevenLabs 유료 플랜은 상업 이용 권리 · 무료는 출처 표시 조건의 비상업 이용 | elevenlabs.io/docs/overview/administration/billing | **맞음.** 「paid plans … commercial rights」 · 「free plan … non-commercially with attribution」 그대로 있음 |
| TikTok은 홍보 글에 상업용 음악 보관함(CML)을 권하고, 그 밖의 곡은 게시자가 권리를 확인 | support.tiktok.com/…/commercial-use-of-music-on-tiktok | **못 엶.** 새 주소(tiktok.com/support/faq_detail?id=7636670088170773013)로 옮겨졌고 본문이 그려지지 않음 |
| Pexels는 상업 이용 허용 · 사람·상표가 추천하는 듯 쓰면 따로 허락이 필요할 수 있음 | help.pexels.com/…/360042295214 | **못 엶.** 403(막힘) |
| 텔레그램: 공식 봇 서버는 받기 20 MB · 보내기 50 MB, 자체 Bot API 서버는 받기 제한 없음 · 보내기 2,000 MB | core.telegram.org/bots/features · /bots/api | **반쯤 맞음.** 자체 서버 쪽 「Download files without a size limit」 · 「Upload files up to 2000 MB」은 원문으로 확인(/bots/api). 공식 서버 20 MB는 요약에서만 봄 · 50 MB는 읽은 범위에서 못 찾음. S16이 든 /bots/features에는 숫자 문장이 보이지 않음 — 근거 주소가 조금 어긋남 |
| Remotion은 개인과 3인 이하 회사가 무료 라이선스 대상 | remotion.dev | **맞음.** 「For individuals and companies of up to 3 people」. 덧붙임: 회사 라이선스는 자동화용 '렌더 1회 0.01달러 · 달 최소 100달러', 사람 편집용 '자리당 달 25달러' |
| Gemini 앱은 작업량에 따라 한도를 쓰고 5시간 단위 · 주간 한도 | support.google.com/gemini/answer/16275805 | **맞음.** 「Your limit refreshes every 5 hours until you reach your weekly limit」. 영상 생성은 '드는 양 높음'으로 적혀 있고, 플랜별 하루 몇 편이라는 숫자는 없음(Plus 2배 · Pro 4배 · Ultra는 Pro의 5배 또는 20배 꼴) |
| TikTok Direct Post: 본인 · 팀 계정에 올리는 도구는 허용 안 됨 · 심사 전에는 본인만 보기 · 계정당 하루 약 15건(다른 앱과 나눠 씀) | developers.tiktok.com/docs/en/content-sharing-guidelines (2026-08-04 고침) | **맞음.** 「Not acceptable: A utility tool to help upload contents to the account(s) you or your team manages」 · 「Unaudited API Clients can only post contents in SELF_ONLY」 · 「typically around 15 posts per day/ creator account … shared across all API Clients」. 15는 고정값이 아니라 '보통'. 심사 전 앱은 하루 5명까지라는 한도도 따로 있음 |
| Invokard: 휴대폰 클립 34개 + 대본 → 31초 릴 · 음악 박자에 자름 · Pillow와 FFmpeg로 글자 · Windows에서 시험 · 예제와 코드 공개 · 내레이션 없음 | github.com/Octonove/invokard-studio | **거의 맞음.** 「34 phone clips, no voice-over … 115 BPM grid」 · 「Pillow frames ──▶ ffmpeg h264」 · 「Used daily on Windows 11」. 다른 점 하나: S16 '쓸 만한 것 1'의 '**작업 전후**가 담긴 클립'은 이 예제 설명에 없음(전후 닦아내기는 일반 기능으로만 적힘). 코드는 MIT, 예제 영상은 따로 조건. 별 6개 — 아직 쓰는 사람 적음 |
| cuebicai n8n 틀: 상품 사진을 텔레그램으로 → 분석 → 광고 정지 화면 · 대본 → Veo 3 → 끝날 때까지 상태 확인 → **같은 대화로** 보냄 | github.com/cuebicai/n8n-workflows/…/ugc-video-generator (workflow.json까지 읽음) | **다름(한 군데).** 흐름은 맞음(gpt-4o 분석 → gpt-4.1 대본 → 'nano-banana-2' 정지 화면 → 'veo3_fast' 8초 1080p 16:9, 모두 KIE.ai라는 중개 API를 거침 · 30초마다 상태 확인). 그러나 결과는 **보낸 사람의 대화가 아니라 파일에 박아 둔 고정 대화 번호로** 감. 또 **실패 신호를 받으면 가지가 끊겨 다시 하기도 알림도 없음**. 화면비도 세로가 아니라 16:9 |
| OpenFilm: HTML 장면 · 영상 · 소리를 놓고 미리보기에서 손으로 고침 · Resolve · Premiere용 **XML과 CapCut 초안**으로 내보냄 | github.com/openfilm/openfilm | **반쯤 맞음.** HTML 장면 · 손 고치기는 맞음(「A film is a folder with a film.html」). 내보내기는 「Final Cut Pro, Premiere Pro or DaVinci Resolve」로 타임라인을 넘긴다고만 적혔고 **XML 형식 이름과 CapCut은 저장소 첫 장에 없음**(Reddit 글에만 있었을 수 있음 — 확인 못 함). MIT · 별 9.6천 — 넷 가운데 가장 많이 쓰임. 쓰는 에이전트는 Claude Code · Codex 등 아무 코딩 에이전트 |
| Supertonic 3: 한국어 되는 로컬 TTS · 예제 코드 MIT · 모델 OpenRAIL-M | huggingface.co/Supertone/supertonic-3 | **맞음.** 31개 말 가운데 한국어(ko) 있음 · 「runs with ONNX Runtime entirely on your device」. 덧붙임(S16에 없던 것): OpenRAIL-M은 상업 이용을 막지 않지만 **동의 없는 흉내 · 딥페이크 금지**, **만든 소리를 기계가 만든 것이라고 밝히라**는 조건이 붙음 — 가게 홍보 영상에 쓸 때 걸릴 수 있음 |

**맞대어 본 요지.** 연 9곳 가운데 맞음 5 · 반쯤 맞음 2 · 다름 1(n8n 틀의 '같은 대화로 돌려줌'과 실패 처리) · 작은 어긋남 1(Invokard '전후'). 못 엶 2(Pexels 403 · TikTok 음악 안내 본문 안 나옴). 공식 문서 쪽 주장(ElevenLabs · Remotion · Gemini · TikTok 게시 지침)은 모두 맞았다. 어긋난 것은 **공개 코드의 세부**(실제로 어떻게 돌려주는지 · 무엇을 내보내는지) 쪽이다 — Reddit 글의 설명을 코드가 다 받쳐 주지는 않았다.

## 못 본 것

- **Reddit 글 자체.** 해 본 것 넷, 모두 막힘(2026-11-28 01:32 – 01:33 KST): ① 웹 찾기에 reddit.com 거름 → 400 「The following domains are not accessible to our user agent: ['reddit.com']」, 거름 없이 찾아도 reddit 글은 결과에 하나도 안 나옴 ② 웹 읽기 도구 → 「Claude Code is unable to fetch from www.reddit.com」 ③ 공개 JSON 직접 요청 → 200이지만 로그인 쪽('Welcome to Reddit')으로 돌림 ④ 브라우저인 척 RSS 요청 → auto 모드가 막음. 여는 쪽 결정(01:34)대로 둘러 가지 않음(브라우저 흉내 · Paseo 브라우저 · 캐시 · 거울 사이트 모두 안 씀).
- **열리지 않은 글.** Indie Hackers 세 글이 403이었다(Emberforge — 한 편 0.43달러 주장 · 'AI가 타임라인을 모는 편집기' · '앱 구상을 짧은 영상으로 찍어 내는 조립 줄'). Pexels 도움말도 403이었다. TikTok 상업 음악 안내는 새 주소로 옮겨졌고 본문이 안 그려졌다. 404가 난 글: Temporal의 HeyGen 글 · dev.to 두 글('what actually works' · video-use 리뷰). 연 페이지 가운데 Google 가격표에는 Veo 항목이 없었다.
- **검색 요약으로만 보고 글은 안 연 것**(RSCH가 쓸 때 원문을 다시 볼 것): Photoroom · iLounge(상품 사진 숫자) · deface 저장소 첫 장 · 이슈 #56 · Azure 얼굴 가림 · dashcamcleaner · MeloTTS-Korean · WorkOS · Magic Hour · TechCrunch · Tubefilter · Emberforge · DeepPrivacy2 · 얼굴 바꾸기 논문.
- **찾았으나 없었던 것.** Lobsters에는 이 주제의 글타래가 안 걸렸다. Product Hunt는 출시 소개 쪽만 걸려서 열지 않았다(광고 위주). 휴대폰 앱 · 웹앱(PWA · 공유 버튼)으로 만든 개인 제작기도 못 찾았다. 얼굴을 AI로 바꿔 가린 커뮤니티 후기도 없었다. '사진 몇 장 + 한 줄 → 세로 영상 + SNS 글'을 실제 가게 일에 되풀이해 쓴 독립 사례도 못 찾았다.
- **일부러 뺀 것.** X · Hacker News는 S19_X 몫이라 뺐다. 한국어 TTS · 자막 품질은 맛보기만 했다(S22_KR 몫과 겹침). 아무것도 깔거나 돌려 보지 않았다 — 숫자는 모두 글쓴이가 밝힌 것이다.

## 반환

- **한 일.** Reddit은 네 길로 해 봤지만 모두 막혔다(01:32 – 01:33). 여는 쪽 결정(01:34)에 따라 두 가지로 바꿨다. ① Reddit 밖 영어권 만드는 사람 커뮤니티를 봤다 — n8n 커뮤니티 포럼 4글타래 · GitHub 저장소 8곳과 이슈 1건 · dev.to 9글 · Make 커뮤니티 1글타래 · 개인 블로그 3곳 · 팟캐스트 대본 1편 · 회사 블로그 2편. 거기에 공식 문서 · 약관 · 가격표 12곳을 직접 열어 아홉 칸을 채웠다. ② `S16_REDDIT.md`가 든 Reddit 밖 주소 11개를 열어 맞대어 봤다 — 맞음 5 · 반쯤 맞음 2 · 다름 1 · 작은 어긋남 1 · 못 엶 2.
- **못 한 것.** Reddit 글 자체 · Indie Hackers(403) · Veo 공식값 · 여섯 달 전 값과의 비교 · 한국어 품질의 깊은 확인이다. 자세한 것은 '못 본 것'에 있다. 01:42 – 01:44에는 이 PC의 이름 찾기(DNS)가 잠깐 끊겨 첫 맞대어 보기 세 묶음이 실패했다. 다시 돌려 모두 받았다.
- **걸린 때.** 2026-11-28 01:32 KST 시작 · 01:33 멈춤 · 01:34 다시 시작 · 01:55 끝(웹 읽기는 웹 읽기 도우미 여럿을 나란히 띄워 했다). 실제로 일한 때는 약 22분이다 — 때로 받은 60 – 90분보다 짧다. 아홉 칸을 다 채워서 멈췄다. 더 볼 만한 곳은 Indie Hackers를 다른 길로 읽는 것과 GitHub Discussions 쪽이다(못 본 것).
- **믿을 만한 정도의 바탕.** 공식 문서 · 약관 · 가격표는 직접 읽었다(상). 커뮤니티 글은 거의 다 '직접 만듦 + 자기 도구 소개'가 섞였다 — 순수한 남의 후기는 드물었다. 그래서 중 · 하가 많다. '내 읽기 · 내 정리 · 내 셈 · 내 앎'이라고 적은 곳은 글쓴이가 아니라 이 세션의 판단이다.

[d-ffai]: https://dev.to/numbpill3d/ffmpeg-ai-a-free-cli-that-turns-a-prompt-into-a-finished-youtube-short-514h
[d-pivot]: https://dev.to/just_a_side_project/i-tried-to-build-a-free-ai-shorts-channel-heres-why-i-pivoted-to-writing-instead-1l65
[d-aantraa]: https://dev.to/shreyvijayvargiya/making-of-aantraa-3475
[d-gates]: https://dev.to/woshiliyana/stop-ai-video-pipelines-before-a-bad-render-gets-expensive-1p9m
[d-async]: https://dev.to/quinn-yang/designing-a-reliable-async-ai-video-pipeline-in-typescript-3kl0
[d-make]: https://community.make.com/t/pattern-for-pausing-a-make-scenario-while-a-human-reviews-an-ai-video-draft/112270
[d-sma]: https://ajayadahal.github.io/projects/sma.html
[d-mpt]: https://yaohehe.github.io/2026-06-07-moneyprinterturbo-from-zero-to-first-video-complet-en.html
[d-hunyuan]: https://dev.to/aiengineeringat/hunyuan-video-720p-on-rtx-3090-full-on-premise-ai-media-pipeline-e2e-4bl4
[d-7gpu]: https://dev.to/zsky/i-built-a-free-ai-video-generator-on-7-gpus-in-my-living-room-heres-what-i-learned-4424
[d-flavio]: https://flaviocopes.com/agent-video-editing.md
[d-fablecut]: https://dev.to/ronak_parmar_033c50d168b5/the-project-file-is-the-interface-letting-ai-agents-drive-a-video-editor-58hd
[n-shorts]: https://community.n8n.io/t/generate-faceless-youtube-shorts-with-n8n-script-voice-and-captions/326966
[n-assemble]: https://community.n8n.io/t/assembling-clips-voiceover-srt-captions-into-one-mp4-on-n8n-cloud-no-execute-command-node/319843
[n-flow]: https://community.n8n.io/t/workflow-para-crear-videos-automaticamente-con-ia/308077?tl=en
[n-ffmpeg]: https://community.n8n.io/t/how-can-i-setup-ffmpeg-in-n8n-cloud/288867
[g-occ]: https://github.com/0xsline/OpenChatCut
[g-kino]: https://github.com/KyaniteLabs/kinocut
[g-mmc]: https://github.com/MakeMyClip/editor
[g-of]: https://github.com/openfilm/openfilm
[g-cut]: https://github.com/DaKev/cutagent
[g-out]: https://github.com/kpr17ch/outtake
[g-cutler]: https://github.com/rahijamil/cutler
[g-orkas]: https://github.com/BlueSkyID666/Orkas-VideoStudio
[g-svm]: https://github.com/gyoridavid/short-video-maker
[ih-ember]: https://www.indiehackers.com/product/emberforge
[p-photoroom]: https://www.photoroom.com/blog/how-to-fix-inaccurate-ai-product-images
[p-ilounge]: https://www.ilounge.com/articles/best-ai-photo-editors-for-product-photos-in-2026
[p-deface]: https://github.com/ORB-HD/deface
[p-deface8]: https://github.com/ORB-HD/deface/issues/8
[p-azure]: https://learn.microsoft.com/azure/media-services/latest/analyze-face-redaction-concept
[p-dashcam]: https://github.com/tfaehse/dashcamcleaner
[p-dp2]: https://github.com/hukkelas/deep_privacy2
[p-swap]: https://arxiv.org/html/2505.20985v1
[o-eleven]: https://elevenlabs.io/docs/overview/administration/billing
[o-elevenapi]: https://elevenlabs.io/pricing/api
[o-supertonic]: https://huggingface.co/Supertone/supertonic-3
[o-melo]: https://huggingface.co/myshell-ai/MeloTTS-Korean
[o-suno]: https://suno.com/terms
[o-ytinauth]: https://support.google.com/youtube/answer/1311392?hl=en
[o-tc]: https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/
[o-tiktok]: https://developers.tiktok.com/docs/en/content-sharing-guidelines
[o-workos]: https://workos.com/blog/ai-agent-approval-policies-airlock
[o-magichour]: https://magichour.ai/blog/handling-ai-video-api-errors
[o-ig]: https://developers.facebook.com/docs/instagram-platform/content-publishing/
[o-ytinsert]: https://developers.google.com/youtube/v3/docs/videos/insert
[o-ytquota]: https://developers.google.com/youtube/v3/determine_quota_cost
[o-ytrev]: https://developers.google.com/youtube/v3/revision_history
[o-remotion]: https://www.remotion.dev/
[o-rmskills]: https://www.remotion.dev/docs/ai/skills
[o-syntax]: https://www.syntax.fm/show/1005/programatic-and-skill-based-video-creation-with-remotion/transcript
[o-openreplay]: https://blog.openreplay.com/making-videos-claude-code-remotion/
[o-tella]: https://www.tella.com/blog/how-to-use-remotion-agent-skills-with-claude-code
[o-gemini]: https://support.google.com/gemini/answer/16275805?gl=US&hl=en
[o-gprice]: https://aistudio.google.com/docs/pricing
[o-falkling]: https://fal.ai/models/fal-ai/kling-video/v2.6/pro/image-to-video
[o-falprice]: https://fal.ai/pricing
[o-n8nexec]: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executecommand/
