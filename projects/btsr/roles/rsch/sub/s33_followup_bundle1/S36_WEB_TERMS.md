# S36_WEB_TERMS — 약관 · 한도 · 값 여섯 줄 재확인

- 역할: MITCHELL_STUDIO/BTSR/RSCH 보조 S36_WEB_TERMS. 범위: `S29_FIXES.md` 5번 표의 5·6·7·8·12·13번째 줄(166–169, 173–174줄).
- 공개 웹 열람 구간: **2026-11-28 17:41:42–17:47:25 KST**. PowerShell의 UTC→Korea Standard Time 변환으로 확인한 구간이며, 아래 시각은 이 날짜의 KST이다.
- 의뢰서 전체와 지정된 바탕 글의 줄을 읽었다. 공개 문서만 조회했고 가입·로그인·게시·설치·생성 실행·커밋·push는 하지 않았다. 한 장과 다른 파일은 고치지 않았다.
- 웹 도구가 반환한 본문을 근거로 삼았다. 검색 색인만 읽힌 것은 따로 표시했다. 문서의 예제·가격·허용 문구가 실제 계정의 성공·청구·권리를 모두 입증하는 것은 아니다.

## 1. 표 5번째 — Instagram 게시 한도와 계정 조건

**가릴 물음:** 50건과 100건 중 무엇이 현행인가. 어떤 계정이며 한도는 어떻게 조회하는가. 바탕: `S19_X.md:198`, `S20_REDDIT.md:108`.

| 연 주소 · 때 | 판 · 날짜 · 커밋 |
|---|---|
| [S29의 게시 안내](https://developers.facebook.com/docs/instagram-platform/content-publishing/) → [현재 연결 문서](https://developers.facebook.com/documentation/instagram-platform/content-publishing), 17:41–17:45 | 본문의 예제는 v27.0. 열람 부분에 갱신일·커밋은 보이지 않음. S19의 ‘2026-06-30 고침’을 재확인하지 못함. |
| [공식 한도 조회 문서](https://developers.facebook.com/documentation/instagram-platform/instagram-graph-api/reference/ig-user/content_publishing_limit), 17:45 | 예제 v27.0, 갱신일·커밋 미표시. |

- **찾은 것:** 게시 안내의 Rate Limit은 “100 API-published posts”, 같은 문서의 Create a carousel container → Limitations는 “50 published posts”라고 쓴다. 두 곳 모두 24시간 기준이고, 캐러셀 한 개는 게시 한 건으로 센다. 한도 조회 문서의 `config.quota_total` 설명과 응답 예제도 50이다. [게시 안내](https://developers.facebook.com/documentation/instagram-platform/content-publishing) · [조회 문서](https://developers.facebook.com/documentation/instagram-platform/instagram-graph-api/reference/ig-user/content_publishing_limit)
- 프로 계정용이며 로그인 방식별 호스트·토큰·권한이 다르다. `GET /<IG_ID>/content_publishing_limit`으로 사용량을 확인하고 `config`의 총량·기간을 함께 보도록 설계할 수 있다. 다만 조회 문서 자체도 필드 설명은 `config`, 요청 예제는 `rate_limit_settings`라 어긋난다. 실제 호출은 하지 않았다. [계정 조건](https://developers.facebook.com/documentation/instagram-platform/content-publishing) · [조회 필드](https://developers.facebook.com/documentation/instagram-platform/instagram-graph-api/reference/ig-user/content_publishing_limit)
- **판정: 여전히 가려지지 않음.** `S20:108`의 문서 내 불일치는 맞음. `S19:198`의 ‘현행 50, 옛 판 100’이라는 시계열 단정은 **고침**. 같은 현행 문서의 서로 다른 절이다.
- **종합 반영:** `S19:198`의 한도 단정을 지우고, 한 장 2번의 게시 기능 조건에는 ‘프로 계정·로그인 방식·실제 계정 한도 조회 필요’를 넣는다. 50이나 100을 일률적인 제품 약속으로 쓰지 않는 것은 **읽은 이의 판단**이다.

## 2. 표 6번째 — 중국판 · 국제판의 음악과 소재

**가릴 물음:** 허용 게시처와 지역은 무엇이며, 1월 22일·4월 15일은 어느 약관의 날짜인가. 바탕: `S17_CN.md:40`, `S21_CN.md:118–120`, `S19_X.md:88,224`.

| 연 주소 · 때 | 판 · 날짜 · 커밋 |
|---|---|
| [剪映 소재 약관](https://lf9-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/faceu/Commercial_Material_User_Agreement_Cn.html), 17:41–17:42 | 2023-11-08 개정, 2023-11-15 시행. 개인·소기업 대상 문서이며 대·중기업은 별도 기업판 조건. |
| [CapCut 소재 약관](https://www.capcut.com/clause/material-license-agreement), 17:41–17:44 | **2026-01-22** 개정. 첫 문단이 “applies to United States users”라고 명시. |
| [소재 약관에서 연결된 서비스 약관](https://www.capcut.com/clause/terms-of-service), 17:45 | **2026-04-15** 개정. 위 소재 약관과 다른 문서. 세 문서 모두 커밋 미표시. |

- **찾은 것:** 중국판 6.2.3은 별도 허용 표시가 없으면 상업 소리를 넣은 영상을 “只能分发、共享和发布到剪映、抖音上”으로 제한한다. 다른 플랫폼은 별도 권리가 필요하다. 2.2·3.2의 기본 지역도 중국 본토이며, 6.2.8은 비상업 소재와 섞으면 비상업만 허용하고 서로 다른 상업 소재는 가장 좁은 허용 범위로 묶는다. [중국판 원문](https://lf9-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/faceu/Commercial_Material_User_Agreement_Cn.html)
- CapCut의 일반 Sounds는 개인·비상업용이다. Commercial Sounds는 **CapCut·TikTok·TikTok for Business** 안에서 공유할 수 있고 그 밖은 별도 허가가 필요하다. Dual Use 소재도 표시·기간·지역 조건을 따른다. 이 문서는 미국 이용자 적용본이므로 한국 이용자에게 그대로 적용된다고 확정할 수 없다. [소재 약관 1–3절](https://www.capcut.com/clause/material-license-agreement)
- **판정: 바탕 글을 고침.** `S17:40`의 중국판 소리 게시처는 맞음. `S19:88`의 두 날짜는 같은 소재 약관의 두 판이 아니라 **소재 약관 / 서비스 약관** 날짜로 분리한다. `S19:88,224`의 소재·음악 구분은 유지하되 미국 적용본이라는 범위를 붙인다. `S21:118–120`의 다른 음악 출처는 이 두 약관으로 검증되지 않는다.
- **종합 반영:** 한 장 2번의 음원 조건에 ‘상업 표시’ 외에 **게시 플랫폼·이용 지역·소재별 권리**를 추가한다. 한국에서 쓸 최신 적용본·실제 곡의 허용 게시처는 미확인으로 남긴다.

## 3. 표 7번째 — 무료 음성 후보의 사용 조건

**가릴 물음:** 코드·모델의 허가는 무엇이며 무료 API와 웹 플랜을 섞지 않았는가. 바탕: `S21_CN.md:103,254`, `S20_REDDIT.md:74,164`, `S18_KR.md:44,79`.

| 연 주소 · 때 | 판 · 날짜 · 커밋 |
|---|---|
| [CosyVoice 원주소](https://github.com/FunAudioLLM/CosyVoice) → QwenAudio/CosyVoice, [코드 LICENSE](https://github.com/QwenAudio/CosyVoice/blob/main/LICENSE)·[원문](https://raw.githubusercontent.com/QwenAudio/CosyVoice/refs/heads/main/LICENSE), 17:42–17:45 | main, Apache License 2.0(2004-01). 열람 화면의 코드 커밋·갱신일 미표시. |
| README에서 연결된 [Fun-CosyVoice3-0.5B-2512 모델 카드](https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512)·[파일 목록](https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512/tree/main), 17:44–17:47 | 모델명 2512, 카드 `apache-2.0`. 별도 LICENSE 파일은 열린 목록에서 찾지 못함. |
| [Supertonic 3 모델 카드](https://huggingface.co/Supertone/supertonic-3)·[LICENSE](https://huggingface.co/Supertone/supertonic-3/blob/main/LICENSE), 17:42–17:47 | 코드 MIT / 모델 OpenRAIL-M. LICENSE 표시 커밋 **724fb5a**, 라이선스 본문 날짜 2022-08-18(모델 출시일이 아님). |
| [타입캐스트 API 가격](https://typecast.ai/kr/pricing/api/), 17:42–17:43 | API 상품 페이지. 갱신일·커밋 미표시. |

- **CosyVoice:** 코드 LICENSE 원문의 “Apache License”와 “Version 2.0, January 2004”를 직접 읽었다. 2–4절은 이용·수정·배포 허가와 재배포 시 고지 보존 등을 규정하며 비상업 전용으로 묶지 않는다. 모델은 공식 카드의 Apache-2.0 표시까지 확인했다. 코드 라이선스만으로 특정 사람 목소리의 권리까지 얻었다고 읽지 않는다. [코드 허가](https://raw.githubusercontent.com/QwenAudio/CosyVoice/refs/heads/main/LICENSE) · [모델 표시](https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512)
- **Supertonic:** 한국어 `ko`와 로컬 실행 설명이 있다. 모델 LICENSE 부록 A(e)는 “without expressly and intelligibly disclaiming” 및 “machine generated”라고 하며 기계 생성임을 알리지 않는 사용을 제한한다. A(g)는 동의 없는 사칭을 제한한다. 상업 이용을 일괄 금지하지 않지만 이 조건은 붙는다. [모델 카드](https://huggingface.co/Supertone/supertonic-3) · [LICENSE 부록 A](https://huggingface.co/Supertone/supertonic-3/blob/main/LICENSE)
- **타입캐스트:** 무료 API는 “상업적 목적으로 이용할 수 없으며, 반드시 출처를 표기해야 합니다.” 월 15,000크레딧이다. 라이트는 월 $15·200,000크레딧, 글자당 1크레딧, 초과분은 **$9 / 100,000크레딧 단위 자동 결제**다. 웹 스튜디오와 API는 구독·사용량·결제가 별개라고 FAQ가 명시한다. [가격·FAQ](https://typecast.ai/kr/pricing/api/)
- **판정: 바탕 글이 맞음.** `S21:254`의 CosyVoice 코드 LICENSE ‘못 읽음’은 이번에 해소했다. 모델별 별도 허가 원문·실제 목소리 권리는 따로 남는다. `S20:74,164`, `S18:44,79`는 위 범위에서 맞음.
- **종합 반영:** 한 장 2번의 음성 후보를 ‘코드 허가 / 모델 허가 / 음성 권리 / 표시 조건 / 사용료’로 나눈다. `S18:79`의 $0.015/편은 200자×1,000편으로 월 제공량을 모두 쓴 **배분 산술**이며 한 편만 써도 월 $15라는 조건을 유지한다. 품질·속도·장비 적합성은 실행하지 않아 미확인이다.

## 4. 표 8번째 — edge-tts 상업 근거와 장애 범위

**가릴 물음:** 비공식 도구의 상업 허가를 입증했는가. 중국 전체 차단이라는 결론이 실제 글의 범위인가. 바탕: `S20_REDDIT.md:76`, `S17_CN.md:38,40`, `S21_CN.md:107,243,269`.

| 연 주소 · 때 | 판 · 날짜 · 커밋 |
|---|---|
| [pyVideoTrans 설명 원주소](https://pyvideotrans.com/en/edgetts-api) → [연결 주소](https://pyvideotrans.com/edgetts-api), 17:42–17:45 | 본문 갱신일·커밋 미확인. 제작 도구 측 설명이며 Microsoft 공식 허가문이 아님. |
| [장애 글 #1851](https://bbs.pyvideotrans.com/show/1851), 17:42–17:44 | 글에는 상대 날짜만 표시. 첨부 오류 기록은 **2025-12-09**이고 pyVideoTrans 3.89 경로가 보임. 로그 시각의 시간대는 확인하지 않음. |
| [Microsoft Azure / MCA 중국어 약관](https://www.microsoft.com/licensing/terms/zh-CN/productoffering/microsoftazure/mca), 17:42–17:47 | Microsoft 고객계약의 Azure 제품 조건. 선택된 약관의 발효일·커밋은 열람 본문에서 미확인. |

- **찾은 것:** 도구 설명은 상업적 남용 때문에 Microsoft가 중국 접속을 제한했다고 주장한다. 그러나 해당 원인은 이 글의 설명이며 Microsoft 발표로 확인된 것이 아니다. [도구 설명](https://pyvideotrans.com/edgetts-api)
- 장애 글에는 실제 “No audio was received” 오류와 실패 로그가 있다. 동시에 댓글 #6의 질문자는 **프록시 없이 도구함의 일괄 음성 생성은 성공했다**고 썼다. #1·#3·#5·#7 등 원인·해결책을 길게 설명하는 답변은 **DeepSeek 표기 답변**이다. 이를 여러 이용자의 독립 경험담이나 공식 장애 원인으로 세면 안 된다. [장애 원문 #4·#6·#7](https://bbs.pyvideotrans.com/show/1851)
- Azure 약관의 Foundry Tools 아래 TTS 절은 “付费 TTS 服务的客户”의 미리 만들어진 신경망 음성 출력을 상업적으로 사용할 수 있다고 쓴다. **유료 Azure TTS 고객**에게 주는 문구이며 비공식 edge-tts의 사용 허가는 찾지 못했다. [Azure 약관의 TTS 절](https://www.microsoft.com/licensing/terms/zh-CN/productoffering/microsoftazure/mca)
- **판정: 바탕 글을 고침.** `S21:107,243`의 장애 존재는 근거가 있으나 전국 차단·원인·403의 일반화는 도구 측 주장으로 낮춘다. 이 게시글의 직접 로그가 입증하는 오류는 NoAudioReceived 등이며 403 전체 범위는 확정하지 않는다. `S21:269`의 한 커뮤니티 출처라는 한계, `S17:40`의 유료 Azure와 무료 edge-tts 구분은 맞음.
- **종합 반영:** 한 장 1번의 커뮤니티 근거에는 ‘이용자 로그 / AI 답변 / 제작 도구 설명’을 나누고, 2번 음성 조건에는 **상업 허가 미확인**으로 남긴다. ‘허가를 못 찾음’을 ‘상업 사용이 금지됨’으로 바꾸지 않는다.

## 5. 표 12번째 — CML · Pexels · ElevenLabs 음악

**가릴 물음:** 미열람을 해소했는가. 음악 약관의 충돌이 현재도 같은가. 바탕: `S20_REDDIT.md:155–156`, `S19_X.md:116–120`.

| 연 주소 · 때 | 판 · 날짜 · 커밋 |
|---|---|
| [TikTok CML 안내](https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok?lang=en), 17:43; 같은 주소의 공식 검색 색인 17:45 | 직접 열기는 읽을 본문 0줄. 검색 결과는 5개월 전 수집 표기이며 글 갱신일 미표시. |
| [Pexels 상업 이용 안내](https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project), 17:43 | 사이트 갱신 표시 2026-11-28(시간대 미확인). 본문 읽힘. |
| [Eleven Music v1 옛 주소](https://elevenlabs.io/eleven-music-v1-terms), 17:43 | 404 Not Found. |
| [S29 모델별 약관 주소](https://elevenlabs.io/eleven-music-model-specific-terms) → [Music Terms](https://elevenlabs.io/music-terms), 17:43; [현재 약관 목록](https://elevenlabs.io/service-specific-terms), 17:45–17:47 | 두 현재 문서 모두 **2026-10-09** 개정. 목록도 Music Terms로 연결. 커밋 미표시. |

- **CML:** 공식 주소의 검색 색인에는 “pre-cleared for commercial use”라는 CML 설명과, CML 밖의 곡은 필요한 허가를 확보·지불했는지 확인한다는 내용이 있다. 홍보 게시물에 대한 기존 요지는 뒷받침되지만 **직접 본문·특정 곡·다른 SNS 사용권은 확인하지 못함**. [확인 대상 주소](https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok?lang=en)
- **Pexels:** “all photos and videos on Pexels are free for commercial use.” 다만 등장 인물·상표·작품 등의 별도 권리가 남을 수 있고, 그들이 제품을 추천하거나 참여한 것처럼 보이게 해서는 안 된다고 설명한다. [상업 이용 안내](https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project)
- **ElevenLabs:** 현행 Exhibit A는 “All online and offline commercial use permitted, except film, TV, radio, and Studio Games”라고 쓰며 Enterprise Music은 더 넓다. ‘Creator는 광고 불가’라는 옛 v1 표를 현재 조건으로 계속 인용하면 안 된다. [현행 음악 약관 4절·Exhibit A](https://elevenlabs.io/music-terms)
- 단, 같은 표의 **Free는 다운로드 불가·API 없음·출처 표시 필요**, Free–Pro는 개인만, Scale은 개인 또는 직원 10명 미만 조직, Business는 개인 또는 직원 50명 미만 조직이다. 음악 라이브러리 제작·모델 재판매도 별도 제한이다. 따라서 상업 허용 문장 하나로 무료 자동화나 모든 사업자 이용을 확정할 수 없다. [현행 표와 4.2–4.3절](https://elevenlabs.io/music-terms)
- **판정:** Pexels는 **바탕 글이 맞음**, `S20:156`의 미열람 해소. ElevenLabs는 **바탕 글을 고침**: `S19:116`을 10월 9일 통합 약관·플랜 자격·다운로드/API 조건으로 바꾼다. CML 직접 본문은 **여전히 가려지지 않음**. 기존 출력에 어느 과거 약관이 적용됐는지는 이번 열람으로 확정하지 않는다.
- **종합 반영:** 한 장 2번의 음악 후보에서 ‘무료/유료·상업 가능’만 적지 말고 **게시처·플랜 가입 자격·출력 시점·다운로드·API**를 같이 적는다. `S19:117–120`의 다른 서비스·Meta Audio API·음악 출처는 이번 여섯 줄의 지정 주소로 검증한 결과가 아니다.

## 6. 표 13번째 — 글 날짜 · 생성 한도 · 실제 단가

**가릴 물음:** 8월 25일의 연도, Flow의 모델별 크레딧, Kling의 소리·길이별 비용은 무엇인가. 바탕: `S19_X.md:146,153`, `S15_X.md:68`, `S20_REDDIT.md:119–120`.

| 연 주소 · 때 | 판 · 날짜 · 커밋 |
|---|---|
| [DEV 제작기](https://dev.to/humzakt/building-an-ai-video-generation-pipeline-from-scratch-1ka2) → 글이 연결한 [원문](https://humzakt.github.io/blog/ai-video-generation-pipeline-architecture.html), 17:43–17:45 | DEV는 “Posted on Aug 25”로 연도 미표시. 원문은 **June 28, 2026**. 두 게시일을 같다고 처리하지 않음. |
| [Flow 한국어 크레딧 안내](https://support.google.com/flow/answer/16526234?hl=ko), 17:43–17:44 | 갱신일·커밋 미표시. 모델 중단일 2026-11-05·2026-12-05는 본문에 명시. |
| [fal Kling 2.6 Pro 사진→영상](https://fal.ai/models/fal-ai/kling-video/v2.6/pro/image-to-video)·[API 문서](https://fal.ai/models/fal-ai/kling-video/v2.6/pro/image-to-video/api), 17:43–17:45 | 모델 경로 v2.6/pro/image-to-video. 가격 갱신일·커밋 미표시. |

- **날짜:** 연결된 제작 원문의 2026-06-28은 확인했다. DEV의 8월 25일에 연도는 여전히 안 보이므로 ‘2025 또는 2026’ 추정 대신 **DEV 연도 미확인 / 원문 2026-06-28**로 기록한다. [DEV](https://dev.to/humzakt/building-an-ai-video-generation-pipeline-from-scratch-1ka2) · [원문](https://humzakt.github.io/blog/ai-video-generation-pipeline-architecture.html)
- **Flow:** 일일 50, Pro 월 추가 1,000, 일일분 이월 없음은 맞다. Veo 3.1 Lite 720p의 4·6·8초는 일반·Pro 등 Ultra 이외 이용자에게 생성당 10크레딧, Ultra는 5이다. 따라서 일일분만으로 **생성 결과 5개분**이며 요청 5번 보장은 아니다. 안내는 “요청당이 아닌 생성당”이고 한 요청에서 두 영상이 나올 수도 있다고 명시한다. [공식 안내](https://support.google.com/flow/answer/16526234?hl=ko)
- 같은 안내에 비구독자의 혼잡 시간 생성 제한과 2026-12-05 Veo 3.1 Fast·Quality·Omni Flash 1.1 중단 예정이 있다. **Lite는 그 중단 목록에 없다.** 실제 제공 모델·설정은 사용할 때 확인해야 하며 이 구독 크레딧을 자체 앱 API 단가로 환산하지 않는다. [모델별 조건](https://support.google.com/flow/answer/16526234?hl=ko)
- **Kling:** 모델 페이지는 무음 **$0.07/초**, 기본 소리 **$0.14/초**, 소리+목소리 제어 **$0.168/초**를 적는다. API의 길이는 5·10초이고 `generate_audio`의 “Default value: `true`”를 확인했다. 5초라면 각각 $0.35 / $0.70 / $0.84, 10초라면 $0.70 / $1.40 / $1.68이라는 산술이다. [가격](https://fal.ai/models/fal-ai/kling-video/v2.6/pro/image-to-video) · [입력 기본값](https://fal.ai/models/fal-ai/kling-video/v2.6/pro/image-to-video/api)
- **판정: 바탕 글을 고침.** `S15:68`의 숫자는 맞되 ‘5회’를 생성 결과 기준으로 좁힌다. `S20:119`의 두 단가는 맞으며 목소리 제어 단가·소리 기본 켜짐을 추가한다. `S19:146`에는 원문 날짜를 별도로 보충한다. fal 전체 가격표·Wan 단가(`S20:120`)·실제 청구·재시도 비용은 이번에 확인하지 않았다.
- **종합 반영:** 한 장 2번의 비용에는 **모델·길이·소리·목소리 제어·생성 수**를 붙인다. 구독료 배분·공개 단가·실제 청구를 구분하는 것은 **읽은 이의 판단**이다.

## 한 장 0번 칸에서 한알께 다시 고쳐 드릴 것

- **읽은 이의 판단:** 세 길 중 무엇을 고를지의 권함을 바꿀 실행 근거는 이번 읽기로 얻지 못했다. 다만 ‘무료 음성·음악이면 홍보물과 자동화에 바로 쓸 수 있다’는 전제가 있다면 고쳐야 한다. 타입캐스트 무료 API는 비상업만, Supertonic은 생성 표시 조건, ElevenLabs 무료 음악은 다운로드·API 제한이 각각 있다(위 3·5번).
- CapCut·剪映의 상업 표시만으로 여러 SNS·한국에서의 권리까지 확보되는 것은 아니다. **한국 적용 약관·실제 소재·게시처 확인을 남겨 둔다**(위 2번).
- Instagram ‘하루 50건 확정’, Flow ‘하루 요청 5번’, Kling ‘항상 초당 $0.07’이라는 숫자를 요약에 썼다면 조건부 표현으로 고친다(위 1·6번). 한 장 본문은 읽기 범위 밖이므로 실제로 그 표현이 있다고 주장하지 않는다.

## 못 연 주소 · 못 한 것

- [TikTok CML 원주소](https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok?lang=en): **“This page has no readable lines.”** 검색 색인만 보충했다. 권한 거부가 아니라 본문 추출 실패다.
- [Eleven Music v1 옛 주소](https://elevenlabs.io/eleven-music-v1-terms): **“(404) Not Found”**. 과거 원문 재확인은 못 했다. 현재 모델별 주소의 공식 연결만 따라갔다.
- 권한 거부·승인 창은 없었다. `rg`가 없어 의뢰서대로 PowerShell 기본 조회를 썼다. 처음 읽은 의뢰서의 한글이 깨져 UTF-8로 다시 읽었고, 추측한 S17/S21 파일명이 없어 실제 이름 `S17_CN.md`·`S21_CN.md`를 확인한 뒤 지정 줄만 읽었다.
- 실제 계정 한도·토큰·결제·생성·음질·출력·한국 이용자 약관·특정 곡의 권리는 확인하지 않았다. API 문서의 게시 예제나 내려받기·설치 예제도 실행하지 않았다.
