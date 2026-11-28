# S42_BM_JP — 일본어 공개 글에서 찾은 실제 편집 세팅

- 역할: MITCHELL_STUDIO/BTSR/RSCH의 보조 S42_BM_JP. 의뢰서: `OPEN_PACKET.md`.
- 확인 시각: 2026-11-28 18:23:40 KST — PowerShell로 한국 시각 확인.
- 범위: 일본어 검색 · Zenn / Qiita / note / はてなブログ / 연결된 일본어 GitHub. 공개 읽기만 했으며 설치·실행·로그인·구매·커밋은 하지 않았다.
- 새 사례 11건. 모두 2026-06 이후 글이다. 도구가 같아도 지난 S19_X에 없던 사용 사례와 편집 자료·수정 자리를 골랐다. 같은 글의 Qiita·Zenn 재게시는 한 건으로 셌다.
- 아래 시간·값·성과는 글쓴이의 기록이다. 직접 재현한 결과가 아니다. ‘없음’은 해당 공개 범위에 기재가 없다는 뜻이다. 모델 세부명이 없으면 추정하지 않았다.
- 읽은 이의 판단: 우선 볼 것은 JP11의 공통 편집 JSON, JP02의 앱 안 수정·되돌리기, JP06의 사람 수정 재반영이다. 한글 자막 품질과 우리 앱에 실제로 넣는 작업은 어느 카드도 검증하지 못했다.

## 1. 세팅 카드

### JP01 — localcut: 원본 대신 장면별 한 줄 설명으로 편집
- 근거: [일본어 소개 글](https://zenn.dev/yukurash/articles/c5ee6ecb076e7e), 2026-11-27 · 만든 사람·써 본 사람. 글은 검색의 공개 미리보기만 읽었고 본문 열기는 도구 오류. [일본어 README](https://github.com/yukurash/localcut)는 열어 확인했다.
- 결과·입력: 직접 찍은 여행 영상 → 1080×1920 세로 영상·제목·화면 글. 미리보기에는 40초 출력 사례가 있다. 게시글 본문·한글 자막은 없음.
- 차례: `analyze` → `caption` → `brief` → `footage_status` → `get_edit_brief` → `submit_edit_plan` → `render_preview` → `review_render` → `egress_report`.
- 중간 자료: 장면마다 한 줄 설명 → 편집 계획 JSON. 미리보기의 장면 설명 칸은 `place`, `subject`, `action`, `mood`, `people`, `text_visible`, `checks`, `highlight`. 원본 경로·촬영 시각·GPS는 설명에서 제외.
- 도구·공개 설정: Claude Code, LM Studio의 `google/gemma-4-e4b`, FFmpeg/ffprobe, YuNet. [README 파일](https://github.com/yukurash/localcut/blob/main/README.md)에 과정과 MCP 도구 목록. 저장소의 설정 파일 존재만 확인했고 열지 않았다. 계획 JSON 원본 파일은 미확인.
- 사람·환경: Windows ARM64 PC. 클라우드로 보낼 설명을 `brief`로 먼저 확인하고 `/vlog-edit`에 길이·분위기를 지시. 타임라인을 손으로 고치는 화면·검토 횟수는 없음.
- 시간·값: 실행 시간·사용료 없음. 공개 미리보기의 360MB 원본→3.6KB 전송은 작성자의 측정 주장. 다른 기종에서 1시간 소재를 8~10분에 처리한다는 수치는 **추정**이므로 실적으로 세지 않음.
- 실패·고침: 실제 실패 기록은 확인 못 함. README는 전송량 상한을 넘으면 보내지 않고 중지하며, 이 장치만으로 파일 읽기를 막는 것은 아니라고 구분한다.
- 읽은 이의 판단: 입력 단계에서 ‘클립 ID·장면 한 줄·품질 확인’ 목록을 만들어 편집표 재료로 쓰는 방식을 본뜬다. 공개 미리보기의 속도 전망이나 편집 화면 완성도를 확정 사실로 쓰지 않는다.
- 짧은 원문: “映像は手元、言葉は空へ”。

### JP02 — Sashimono Edit: 앱 안에서 계획을 고르고 한 번에 되돌리기
- 근거: [제작·사용 소개](https://zenn.dev/kagemorikosame/articles/sashimono-edit-intro), 2026-11-21 · 만든 사람. [현재 README](https://github.com/kagemorikosame/sashimono-edit)도 대조했다. 독립 사용자의 검증은 아님.
- 결과·입력: 직접 준비한 영상·사진·음성 → 컷·자막·효과가 있는 편집 프로젝트와 MP4 등. 세로 출력 실측 사례·게시글 생성은 없음.
- 차례: 소재 드래그 → 무음 컷·자막 요청 → 「計画」 표시 → 사람이 항목 선택 → 적용 → 그린 화면·수치 검사 → 사람 시청 → 내보내기.
- 중간 자료: 프로젝트 `.sme`, 휴대 묶음 `.smex`, SRT/VTT. 모든 변경은 `Command`를 통한다. 자막은 원본 소재에 연결하고, 편집 후 시각은 클립마다 다시 계산한다. [README 파일](https://github.com/kagemorikosame/sashimono-edit/blob/main/README.md)에 설명.
- 도구·공개 설정: Python/PySide6, PyAV·FFmpeg, OpenGL, faster-whisper, Claude Agent SDK와 앱 안 MCP. 소스 공개. 공개 목록에서 `CLAUDE.md` 존재 확인; 본문은 열지 않음. 모델 세부명 없음.
- 사람·환경: Windows 편집기 안 AI 패널의 ‘演出の計画’에서 시각·종류·강도를 보고 선택. 적용 묶음을 Undo 한 번으로 취소하며 손으로 만든 움직임을 덮지 않는다고 설명. 수정 횟수 없음.
- 시간·값: 앱 무료라고 소개. AI 사용료·실제 편집 시간 없음. 화면의 예시 채팅은 촬영용으로 만든 것이라고 README가 명시하므로 실제 대화 실행 증거로 세지 않음.
- 실패·고침: 호환 형식을 추측해 구현했던 문제는 실물 파일로 확인하는 방향으로 고쳤다고 소개. 현재 README는 HDR·광색역을 제대로 처리하지 못하고 SDR로 낸다고 명시한다.
- 읽은 이의 판단: 앱 안에서 계획 선택→적용→묶음 되돌리기를 본뜬다. 자막을 원본 시각에 붙여 속도·컷 변경 때 다시 맞추는 구조가 유용하다. 이 앱의 통째 도입이나 HDR 지원을 권하는 근거는 부족하다.
- 짧은 원문: “人が手で付けた動きは上書きしない”。

### JP03 — 실촬영 쇼트: 컷 뒤 멈추고 자막은 승인 뒤에
- 근거: [세 단계 편집 기록](https://note.com/asei_ikarashi/n/nc344e602f87a), 2026-11-20 · 써 본 사람. 공개 본문과 단계별 요청문 확인.
- 결과·입력: 직접 찍은 영상 + 참고 영상 한 편 → 쇼트 영상·자막. 정확한 세로 치수·게시글은 없음.
- 차례: 「見た目の決まり」 → 「文字起こしからカットして、一度止める」 → 사람 OK → 「テロップ・カメラ・効果音・BGM」 → 출력 검사 → 마지막 시청.
- 중간 자료: 참고 영상에서 글자 색·크기·자막 모양 등을 뽑은 `見た目の決まり.md`; 단어별 시각과 확인용 영상. 컷표 파일명·JSON 칸은 없음.
- 도구·공개 설정: Claude Code + Remotion. 모델 세부명 없음. [같은 글](https://note.com/asei_ikarashi/n/nc344e602f87a)에 세 단계 요청문 전문; 실제 규칙 파일 전문은 본문에 없음.
- 사람·환경: 컷 직후 필요한 말이 잘리지 않았는지 확인하고, 마지막에 글자 넘침·소리 어긋남을 시청한다. **확인 자리 두 곳**, 반복 횟수 없음. PC 작업으로 보이나 운영체제는 없음.
- 시간·값: 소요 시간·금액 없음. Claude Max 사용이라고만 적음.
- 실패·고침: 개별 실패 수치는 없음. 나중에 컷을 바꾸면 자막·소리 시각을 다시 맞춰야 하므로 컷을 먼저 확정한다고 설명.
- 읽은 이의 판단: 우리 흐름에도 ‘컷 초안 확인’과 ‘자막 포함 최종 확인’을 나눈다. 첫 판에는 이 사례의 음성·음악·효과음 단계를 가져오지 않는다.
- 짧은 원문: “そこで止まって”。

### JP04 — 고정 부품 + video.json + OK/FIX 검사
- 근거: [스킬·자막·자체 검사 설계](https://zenn.dev/heynstudio/articles/a21ba753d44618), 2026-11-06 · 만든 사람·파는 쪽. 유료 키트 홍보를 겸한 공개 코드 설명.
- 결과·입력: 대본 → 세로 영상·음성에 맞춘 자막. 실제 촬영 사진·영상 편집 사례는 아님. 게시글 없음.
- 차례: 「台本」·사람 승인 → 「仕様JSON」 → 「音声」 → 시각 확인 → 「レンダリング」 → 「QA」의 FIX 수정 → 결과·미확인 항목 보고.
- 중간 자료: `video.json`의 `format`, `script`, `scenes[{id,kind,start,at}]`; `alignment.json`; 단어의 `text,start,end`. 장면 시각을 `@why+0.35`처럼 말의 위치에 연결.
- 도구·공개 설정: Claude Code, Remotion, ElevenLabs, FFmpeg. [본문](https://zenn.dev/heynstudio/articles/a21ba753d44618)에 `SKILL.md` 골격·자막 코드·`qa.mjs` 공개. 완제품 키트는 유료이며 읽지 않음.
- 사람·환경: 대본 승인 뒤 비용이 드는 음성을 생성. 고정 컴포넌트에 JSON 값만 넣음. 타임라인 손편집 화면·횟수·운영체제 없음.
- 시간·값: 제작 시간 없음. 글의 키트 표시값 $39. 음성·렌더 사용료 없음.
- 실패·고침: 1.07초 지점의 정지와 -25 LUFS를 검출 → 느린 확대와 음량 보정 → 재검사. 글자 겹침·잘림은 0.5초 간격 모음 그림과 전환 순간 그림으로 살핌.
- 읽은 이의 판단: 매번 새 영상 코드를 만들지 않고 편집표만 채우기, 검사 결과를 OK/FIX로 돌려주기를 본뜬다. 사진이 잠시 정지하는 것은 우리 결과에서는 정상일 수 있으므로 ‘정지=실패’ 규칙은 그대로 쓰지 않는다.
- 짧은 원문: “エージェントが書くのは JSON だけにする”。

### JP05 — 실제 촬영 53분 본편과 세로 20편: 스크립트로 편집기 제어
- 근거: [Premiere 편집 실전 기록](https://zenn.dev/salt2/articles/2b6e403e059b10), 2026-11-04 · 써 본 사람·연결 도구를 만든 사람.
- 결과·입력: iPhone 4K 세 각도 약 36GB + 마이크 WAV 두 개 → 약 53분 본편·세로 쇼트 20개·자막. 사진 혼합·게시글 생성은 없음.
- 차례: 「同期」 → 「話者の判定」 → 「文字起こし」 → 컷·자막 배치 → 「確認と書き出し」. 사람은 쇼트를 하나씩 보고 수정 요청·제목 선택·색 수치 결정.
- 중간 자료: Premiere 시퀀스 복제본, `.mogrt` 자막 틀, 자막 속성 `textEditValue`, 검사 PNG, Media Encoder 대기열. 통합 편집표 파일은 없음.
- 도구·공개 설정: Claude Code, Python, mlx-whisper, BudouX, Premiere/After Effects, CEP·ExtendScript. [본문](https://zenn.dev/salt2/articles/2b6e403e059b10)에 브리지·manifest·배치 코드 일부와 지시 규칙 공개. 모델 세부명 없음.
- 사람·환경: macOS와 Adobe 2026 앱. 스크립트 약 340회(290+50), 못 닿는 화면 조작 약 6회는 Codex Computer Use. 사람은 Premiere에서 색만 직접 고치고 나머지는 주로 음성 입력으로 지시했다고 함.
- 시간·값: 첫 연결 확인부터 최종 출력까지 약 2일 반. 실제 손을 쓴 시간·금액은 없음.
- 실패·고침: 자막 추가가 뒤 네 장을 지움 → 복제 시퀀스에서 복구. iPhone 분할본의 색이 흐려짐 → 원본+프록시 사용. 문장 중간 줄바꿈 → 의미 경계로 다시 나눔.
- 읽은 이의 판단: 사람 수정 전 버전 보관, 사람이 정한 값 고정, 결과 장면 검사 뒤 시청을 본뜬다. 예전 조사의 ‘화면 조작 사례를 못 찾음’에 보탤 새 증거이나, 화면 조작은 이 사례에서도 보조 수단이다.
- 짧은 원문: “修正の前にシーケンスを複製しておく”。

### JP06 — YAML 컷표·자막표 ↔ 사람이 고친 편집 프로젝트
- 근거: [YouTube 편집 시행착오](https://qiita.com/tsukasa_japan/items/b8bca096170d087e271d), 2026-10-29 · 써 본 사람. 기존 CapCut 계열 도구 소개와 다른 새 사용 사례.
- 결과·입력: 직접 찍은 영상 네 개 + 설명용 PPT 하나 → YouTube 영상·수정 가능한 자막. 세로·게시글은 없음.
- 차례: 「文字起こし」 → 「カット表・字幕表作成」 → 「カット位置の調整」 → 그림 → 프로젝트 생성 → 사람 확인·수정 지시 → 손편집 → 「手編集の取り込み」 → 출력.
- 중간 자료: YAML 컷표 `type,src,in,out,section`; 장 표지 `kind,chapter`; 자막표 `src,at,dur,style,text`. 사람이 만든 빈 CapCut 프로젝트를 바탕으로 JSON 생성.
- 도구·공개 설정: Claude Code, Whisper, CapCut. [본문](https://qiita.com/tsukasa_japan/items/b8bca096170d087e271d)에 첫 요청과 YAML 예시 공개. 생성·역반영 스크립트 전문, 모델명, 운영체제는 없음.
- 사람·환경: PC의 CapCut 타임라인에서 컷·문구 수정. 시각과 화면 캡처로 AI에 수정 지시. 사람이 고친 컷 길이·문구 등을 표로 다시 읽어 다음 자동 수정의 입력으로 삼음.
- 시간·값: 수정 지시와 확인 50회 이상, 완성 약 10시간. 금액 없음. ‘대폭 쉬워졌다’는 성공담이 아니라고 글쓴이가 명시.
- 실패·고침: 컷의 잡음 → 무음 위치 검사·페이드. 이미지 자막은 손수 문구를 못 고침 → 편집기의 텍스트로 생성. 사람 수정과 표가 어긋남 → 역반영 스크립트.
- 읽은 이의 판단: 컷표와 자막표를 분리하고 사람 수정이 다음 자동 초안에서 보존되는 왕복을 본뜬다. CapCut 비공개 형식 자체를 채택할 근거는 아니며, 우리 앱의 편집 자료 계약으로 옮겨 생각한다.
- 짧은 원문: “手編集の取り込み”。

### JP07 — Drive 여행 영상: 그림 구성표를 네 단계에서 확인
- 근거: [직접 만든 MCP로 vlog 편집](https://zenn.dev/kitchy/articles/890a8f821869de), 2026-10-24 · 만든 사람·써 본 사람.
- 결과·입력: 직접 찍어 Drive에 둔 영상·사진 → 가로 vlog·설명문·YouTube 게시. 예: 219개 영상에서 13분43초, 다른 편은 71개에서 5분1초. 세로 소재를 쓰지만 결과는 16:9.
- 차례: 「すり合わせ」 → 「構成ボード」 → 「パーツ制作」 → 「結合」 → 사람이 동작·소리·템포 시청 → 게시. 구성 변경 시 구성표로 돌아감.
- 중간 자료: 파일 대신 `gcs_uri` 전달; 장별 정지 그림·내용·설명 초안과 초수 비례 전체 막대. `assets/*.json`의 컷 길이 등, `scripts/plan.py`의 길이 계산·규칙 검사.
- 도구·공개 설정: Claude, Cloud Run의 자체 MCP, Cloud Storage, FFmpeg; 생성 조각에는 Veo·Lyria·Nano Banana. [본문](https://zenn.dev/kitchy/articles/890a8f821869de)에 `SKILL.md/references/assets/scripts` 구조와 함수 일부. 전체 설정·흐름 저장소 주소는 확인 못 함.
- 사람·환경: 서버에서 처리, Claude 대화와 정지 그림 구성표에서 네 단계 OK. 두 번째 영상은 지시 약 5회. 타임라인 직접 수정 화면은 없음.
- 시간·값: 밤 동안 완성된다고 표현하며 정확한 총 시간·총액 없음. 생성 사진 조각은 720p 4초 약 48엔이라고 적음.
- 실패·고침: 일부 장을 만든 뒤 구성 변경으로 재작업. 회전 표식 때문에 옆으로 누움 → 정지 그림 확인 후 회전 수정. 긴 처리는 먼저 컷으로 나눔.
- 읽은 이의 판단: 미리보기 그림이 붙은 편집표와 구성 변경 시 이전 단계로 돌아가는 규칙을 본뜬다. 사진을 생성 영상으로 바꾸기·그림으로 글자 만들기·자동 게시까지는 첫 판에 가져오지 않는다.
- 짧은 원문: “構成ボード”。

### JP08 — cuts/telops 릴스: 공개된 중간 제작 기록과 유료 경계
- 근거: [Windows 릴스 자동화 기록의 무료 부분](https://note.com/yuki_rui0803/n/n9a7b6a325933), 2026-10-12 · 써 본 사람·파는 쪽. 완성 게시 사례가 아니라 중간 제작 기록.
- 결과·입력: 직접 찍은 iPhone HDR 소재 → 1080×1920·30fps 릴스 초안. v1~v6 미리보기 존재, v7 편집표는 30.07초지만 최종 MP4·게시 기록 없음. 게시글은 별도 과정이라 다루지 않음.
- 차례: 「台本JSON」 → 「素材を前処理」 → 필요할 때 소리 → 「台本JSONをチェック」 → 「プレビュー」·사람 OK → 본출력 → 검사·사람 게시. 뒤 단계는 실제 완성 증거와 구분.
- 중간 자료: `cuts`의 `media,durationSec,startFrom,playbackRate,volume,placeholder`; `telops`의 `start,duration,text,emphasis,pos`. 두 배열은 독립적이며 자막이 컷을 넘어갈 수 있음.
- 도구·공개 설정: Claude Code, Remotion, FFmpeg/ffprobe. [무료 본문](https://note.com/yuki_rui0803/n/n9a7b6a325933)에 필드와 검사 기준 공개. 최소 코드·체크 스크립트·요청문은 유료, 본운영 틀 전문은 미공개.
- 사람·환경: Windows 11. Studio·정지 그림·540×960 미리보기를 보며 수정. `preview_v1` 식으로 덮지 않고 보존; 여섯 판 확인 가능.
- 시간·값: v1 22:58 → v6 다음 날 00:36라는 기록. 실제 작업 시간·절약 시간·운영 비용 없음. 글 표시값 ¥900.
- 실패·고침: HDR→SDR 전처리, 없는 필터 대신 `playbackRate`; v7 음성 파일 누락을 검사로 발견. 원본을 덮지 않고 `_edited` 별도 저장.
- 읽은 이의 판단: 컷·자막 분리, 저해상도 미리보기 버전 보존, 파일 존재·총길이·자막 끝 검사부터 본뜬다. 유료 코드를 읽거나 최종 완성된 것으로 간주하지 않는다.
- 짧은 원문: “プレビューは、上書きせず”。

### JP09 — HTML 세로 영상: 굽기 전에 글자 위치 검사
- 근거: [세로 영상·검사 샘플 전문](https://qiita.com/ViewsEngineer/items/2c71b58ef03d1096d07b), 2026-09-24 · 만든 사람·써 본 사람. 반년 138편 운영에서 추린 샘플이라고 밝힘.
- 결과·입력: 대본 JSON → 1080×1920 영상·자막. 촬영 소재 혼합·게시글은 없음.
- 차례: 「声と時刻」 → 「長さ」 → 「文字の位置」 → 「書き出し」 → 「音を混ぜて、音量をそろえる」 → 「公開前の検査」 → 「音声の形」. NG가 나오면 해당 단계에서 중지.
- 중간 자료: `script.json`의 `text,caption,big`, `build/timing.json`, `scene.html`, `build/final.mp4`. `window.__setTime(t)`로 특정 시각 화면을 재현.
- 도구·공개 설정: Claude Code로 작성한 Python, Playwright, FFmpeg, 선택 VOICEVOX. [본문](https://qiita.com/ViewsEngineer/items/2c71b58ef03d1096d07b)에 `check_layout.py`, `video_qc.py`, `make_short.py`, `snap.py` 등 코드 전문 공개.
- 사람·환경: Windows 11 검증 기록. 대본·화면 파일 수정과 특정 시각 PNG 확인. 편집기 타임라인·사람 최종 승인 강제 장치는 없음.
- 시간·값: 23.3초 예제의 699프레임 촬영 53초. 전체 작업 시간·금액 없음.
- 실패·고침: 잘못된 읽기 검사·기호만 있는 줄·BOM 등 20개 문제를 찾아 수정하고 24개 입력 사례로 다시 확인했다고 기록. 폰트가 없어 네모가 나오는 문제는 이 검사로 못 잡는다고 명시.
- 읽은 이의 판단: 굽기 전 길이·글자 좌표 검사와 출력 후 검사 분리를 본뜬다. 검사 통과를 사람 승인과 같게 보지 않는다. 일본어 줄 나눔·읽기 규칙을 한글에 그대로 적용할 수는 없다.
- 짧은 원문: “どこかで NG が出たら、その工程で止まります”。

### JP10 — Weekly Slideshow Engine: 사진·영상 혼합과 길이 배분
- 근거: [사진·영상 1분 묶음 제작 기록](https://zenn.dev/yukimomo/articles/weekly-slideshow-engine), 2026-09-24 · 만든 사람·써 본 사람. 개발 시작은 2026-01이지만 조사 대상 글은 9월 공개.
- 결과·입력: 실제 카메라롤 사진·영상 폴더 → 약 1분 16:9 MP4. 세로 결과·자막·게시글·사람 편집 화면은 없음.
- 차례: 스캔 → 날짜 정렬 → 목표 길이 배분 → 「映像」(조각별 무음 영상·연결) → 「音声」(영상 소리·사진 길이만큼 무음) → 「結合」.
- 중간 자료: YAML 설정, 타임라인 `plans`; 사진 기본 2.5초·영상 최대 5초. 넘치면 끝에서 빼고 부족하면 남은 길이를 재배분. 사진은 EXIF, 영상은 파일 수정 시각 정렬.
- 도구·공개 설정: Python 3.11, FFmpeg, Pillow/pillow-heif; MoviePy는 대체 경로. [본문](https://zenn.dev/yukimomo/articles/weekly-slideshow-engine)에 `render_timeline(plans, output_path, ...)` 일부만 공개. 전체 YAML·저장소 주소 없음. 에이전트·모델 없음.
- 사람·환경: OneDrive 카메라롤을 입력으로 쓰는 로컬 PC. CLI 기본 출력은 8초 미리보기, 60초는 설정으로 지정. 사람이 고치는 화면·횟수·실사용 OS는 없음; Windows·Ubuntu CI는 별개 기록.
- 시간·값: 실행 시간·금액 없음.
- 실패·고침: OneDrive 소재에서 멎음 → 로컬 임시 영역으로 복사. fps 충돌→고정 fps; 길이 표기 오류→출력 옵션 수정; 영상·음성 분리로 신뢰성 보완. README와 구현이 일부 어긋난다고 밝힘.
- 읽은 이의 판단: 직접 찍은 사진·영상 혼합의 입력 정리와 총길이 배분을 본뜬다. 파일 수정 시각은 촬영 순서와 다를 수 있으므로 앱에서 순서를 사람이 바꿀 수 있어야 한다.
- 짧은 원문: “写真と動画を混ぜる”。

### JP11 — FrameWright: 편집 화면과 AI가 같은 자료를 고치는 실제 흐름
- 근거: [제작자의 사용 글](https://zenn.dev/kodomobeya_tech/articles/10e4ecf4fa19ad), 2026-08-01 · 만든 사람·써 본 사람. [일본어 README](https://github.com/IkUmO1118/FrameWright)와 공개 컷 요청문도 확인.
- 결과·입력: OBS 화면 녹화·말하는 영상 → 컷·자막·쇼트·제목·설명문 초안. 현재 README는 스마트폰 세로 영상과 9:16도 입력·화면 선택으로 명시. 사진 여러 장 혼합 실증·한글 검증은 없음.
- 차례: 글의 「素材作り」 → 「初期生成」(`run`, `plan-effects`) → 「確認」 → 「調節・仕上げ」 → 「書き出し」. 현재 README는 editor→자동 분석→선택 run→편집→preview→사람 approve→render 순서.
- 중간 자료: `cutplan.json`, `transcript.json`, `overlays.json`, `shorts.json`, `chapters.json`, `meta.json`. 각 단계가 JSON을 읽고 써 따로 재실행. [컷 요청문 파일](https://github.com/IkUmO1118/FrameWright/blob/main/prompts/plan-cuts.md)의 출력은 `cuts:[{id,reason}]`.
- 도구·공개 설정: Claude Code 등 LLM, whisper.cpp, FFmpeg, 브라우저 편집기. 글은 Remotion 출발을 설명. [공개 prompts 목록](https://github.com/IkUmO1118/FrameWright/tree/main/prompts)에 `editor-ai-propose.md`, `meta.md` 등 존재; 두 파일 본문은 조회 실패. 모델명 없음.
- 사람·환경: 로컬 브라우저에서 컷 경계·자막 위치·문구·제목 등을 고침. AI 변경은 타임라인 차이로 보이며 개별 승인/거부 가능. 사람 저장도 AI의 다음 입력이 됨. 횟수 없음; 현재 설치 안내는 macOS.
- 시간·값: 수치 없음. README는 받아쓰기·무음 검출을 로컬 무료라고 설명하며 LLM은 구독 CLI 또는 API를 선택.
- 실패·고침: Remotion 미리보기만으로는 손수 편집할 수 없어 재작업이 많음 → 자체 편집 화면 구현. AI에는 `describe/validate/apply/frames/materials/id-stamp`를 주고 최종 승인·렌더는 넘기지 않는다고 설명.
- 읽은 이의 판단: 우리 길과 가장 가깝다. 같은 편집표를 자동 초안·앱 화면·굽기가 함께 읽고, `meta.json`의 올릴 글도 마지막 검토에 묶는다. 현재 구현의 우리 환경 호환성·내장 가능성은 읽기만으로 확정하지 않는다.
- 짧은 원문: “同じ編集状態を共有”。

## 2. 이미 있음 목록

기준 파일: `projects/btsr/roles/rsch/sub/s15_community_research/S19_X.md` — 사례·도구 이름과 줄 번호만. 아래 도구의 반복 소개는 새 카드로 세지 않았다.
- HyperFrames · Remotion — 14, 57, 70~77줄; ffmpeg-skill — 15, 80줄.
- OpenMontage · OpenReels · short-video-maker · MoneyPrinterTurbo — 53~56줄.
- Claude Code · Codex · Cursor · Remotion skills · HyperFrames skills — 28, 53, 71줄.
- n8n · Telegram · fal · kie · AtlasCloud · Blotato · Late — 29줄.
- Mosaic · Cardboard · ChatCut · Kino — 31, 97~99줄.
- 단일 Remotion 파일 제품 데모 자동화 — 75줄; Framecall — 78줄.
- video-agent · mlx-whisper — 81줄; Diffusion Studio — 82줄; Shotstack — 83줄.
- CapCut/剪映 · Premiere/Resolve/FCP XML — 85줄; VectCutAPI(CapCutAPI) · capcut-mate · capcut-cli · pyJianYingDraft — 86~87줄.
- Resolve MCP · DaVinci Resolve · Premiere — 90~91줄.
- Kokoro · Piper · Edge TTS · ElevenLabs · Gemini TTS — 106줄; Whisper 계열 — 94, 111줄.
- ElevenLabs Music · Suno · Udio · Lyria 3 — 116~118줄.
- Nano Banana Pro · GPT Image 2 · Qwen-Image-Edit — 127~128줄; Seedance · Wan · Veo — 132줄.
- deface · DeepPrivacy2 — 137~138줄.
- 광고 영상 5단계 흐름 · vidpipe · GitHub Copilot SDK — 146~147줄; n8n 60일 사용 기록 — 150줄.
- 사진→Seedance 광고 / Nano Banana+Veo / fal+Telegram 승인 흐름 — 160줄.
- claude-telegram-remote — 163줄; Mac mini 자율 에이전트 운용 — 165줄; Remotion Lambda — 166줄.
- Ayrshare · Postiz — 168줄; Claude Code+Seedance 10분 영화 — 203줄.

## 3. 본뜰 것 다섯 — 읽은 이의 판단

1. **받기·고르기(JP01·JP10):** 원본을 보존하고 사진·영상의 방향·길이·색·클립 ID와 한 줄 설명을 만든다. 앱에서 순서를 바꾸고 선택할 수 있게 한다. 임시 전처리본과 원본을 구별한다.
2. **편집표·올릴 글(JP06·JP08·JP11):** 컷의 `src/in/out`과 자막의 `start/duration/text`를 분리한다. 제목·설명문 초안도 별도 자료로 보관한다. 매번 새 코드를 만들기보다 고정된 부품이 이 자료를 읽게 한다(JP04).
3. **사람 확인·앱 안 수정(JP02·JP03·JP11):** 컷 초안에서 한 번 멈추고, 앱 안에서 직접 수정하거나 AI 변경을 골라 적용한다. 묶음 Undo와 사람 수정 보존을 마련한다. 자막·게시글까지 포함한 마지막 확인은 별도로 둔다.
4. **굽기 전후 검사(JP08·JP09·JP05):** 파일 존재·총길이·자막 종료·화면 밖 글자를 먼저 검사한다. 저해상도 미리보기와 전환 순간 그림을 확인한 뒤 최종 치수·fps·길이를 검사한다. 한글 폰트·줄바꿈·오탈자는 실제 한글로 별도 검증해야 한다.
5. **고치기·내보내기(JP06·JP08·JP11):** 사람의 컷·문구 수정이 편집표로 돌아오게 하고, 수정마다 미리보기 판을 남긴다. 승인한 영상과 올릴 글을 함께 내보낸다. 사진을 생성 영상으로 바꾸기·합성 목소리·음악·자동 게시는 첫 판으로 옮기지 않는다.

## 4. 못 연 곳 · 막힌 곳

- 유료 경계: [JP08 note](https://note.com/yuki_rui0803/n/n9a7b6a325933)의 공개 끝에 “ここから先は”, “23,827字”, “¥900”, “購入手続きへ”, “ログイン”. 무료 부분만 읽고 구매·로그인하지 않음. 권한 오류와는 구분한다.
- 본문 조회 실패: [JP01 Zenn](https://zenn.dev/yukurash/articles/c5ee6ecb076e7e) — 도구 문구 “URL https://zenn.dev/yukurash/articles/c5ee6ecb076e7e is not accessible via this tool.” 검색 공개 미리보기와 글에 연결된 별도 공개 README까지만 근거로 사용.
- GitHub 파일 조회 실패: [FrameWright schemas](https://github.com/IkUmO1118/FrameWright/tree/main/schemas), [localcut 소스 폴더](https://github.com/yukurash/localcut/tree/main/localcut), [Sashimono 소스 폴더](https://github.com/kagemorikosame/sashimono-edit/tree/main/src/sashimono), [편집 제안 요청문](https://github.com/IkUmO1118/FrameWright/blob/main/prompts/editor-ai-propose.md), [게시글 요청문](https://github.com/IkUmO1118/FrameWright/blob/main/prompts/meta.md) — 각 주소의 도구 오류 끝에 “Cache miss”. 해당 코드 본문은 검증하지 못했다.
- [schemas](https://github.com/IkUmO1118/FrameWright/tree/main/schemas)와 [prompts](https://github.com/IkUmO1118/FrameWright/tree/main/prompts) 링크 첫 조회는 “Unable to resolve click call due to invalid arguments”. 뒤에 관찰한 경로의 공개 페이지를 열었으며 위 실패 목록과 성공한 prompts 목록을 구분했다. 권한 거부·로그인 벽 우회는 아님.
- 로컬 도구: `rg` 없음 — “'rg' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다.” 이후 허용된 이전 글 조회는 PowerShell `Get-Content`·`Select-String` 사용. 권한 거부는 없었다.
- はてなブログ도 일본어 검색했으나 이 글에 넣을 만큼 직접 촬영 자료·편집표·손수 수정 정보가 강한 사례는 위 11건에서 골랐다. 검색 실패나 사이트 차단으로 세지 않는다.
