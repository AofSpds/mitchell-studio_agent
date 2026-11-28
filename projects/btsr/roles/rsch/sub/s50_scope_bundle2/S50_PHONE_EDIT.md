# S50_PHONE_EDIT — 컴퓨터·휴대폰에서 같은 편집표 고치기

- 쓴 창: MITCHELL_STUDIO/BTSR/RSCH 보조 S50_PHONE_EDIT.
- 기준 시각: **2026-11-28 23:38:35 KST**. 의뢰서의 PowerShell 한국 시각 변환식으로 확인했다.
- 읽은 내부 글: AGENTS.md → OPEN_PACKET.md 전체 → studies/2026-11-20-opencut-in-webapp.md 1–3절, sub/s33_followup_bundle1/S38_EDITOR_CANDIDATES.md 1·2절, sub/s39_benchmark_setups/S46_EDITOR_TERMS.md 최종 비교표. S46 말미를 출력할 때 앞의 후보별 설명 일부도 함께 열렸다.
- 공개 원문·문서·코드의 읽기 조사다. 아래 지원 표시는 실측 결과가 아니다. 날짜 없는 웹 문서는 위 기준일 조회본이며, 문서 발표일은 원문 날짜 그대로 적었다.
- **읽은 이의 판단:** 권하는 한 구성은 **ⓑ 작은 휴대폰 고침 화면 + 컴퓨터 전체 편집기 + 공통 편집표**다. 이 구성의 굽는 위치는 ⓓ 서버로 둔다. 편집기 본체 채택은 아직 확정하지 않는다.

## 1. 11-20 연구에서 고쳐 읽거나 보강할 것

11-20에서 11-28까지는 8일이다. 의뢰서의 ‘5개월’은 이 조사 간격과 맞지 않는다. 아래는 **새 출시라고 주장하는 목록이 아니라 기존 추측의 확인·정정과 빠진 조건**이다. 이 8일 사이 휴대폰 제약을 일괄 해소한 배포는 확인 못 함.

| 항목 | 아이폰 Safari / 안드로이드 Chrome의 확인 결과 | 기존 판단에 미치는 뜻 |
|---|---|---|
| WebCodecs | MDN 지원자료: VideoEncoder는 Safari/iOS 16.4+, Chrome/Android 94+; AudioEncoder는 Safari/iOS 26+, Chrome/Android 94+. WebKit은 Safari 26의 AudioEncoder·AudioDecoder 추가를 명시한다. [B1][B2][W1] | ‘iOS 26 필요’는 **브라우저 오디오 인코딩을 쓰는 경로**의 조건으로 좁혀야 한다. 서버 MP4를 재생하고 편집표만 고치는 화면 전체의 최저 OS를 26으로 못 박을 근거는 아니다. **읽은 이의 판단.** |
| 코덱·멈춤 | 인터페이스가 있어도 H.264/AAC 설정은 isConfigSupported와 실제 encode/flush로 확인해야 한다. WebKit #324827은 macOS 27의 H.264 정지 문제이며 FIXED, 2026-09-23 수정 반영 기록이 있다. 아이폰 전체의 현재 실패나 성공으로 옮겨 읽을 수 없다. [W2][W3] | 11-20의 ‘Safari 버그’ 경고는 OS·버그·반영판을 구분해야 한다. 이번 확인으로 모든 아이폰 결함이 해소됐다는 뜻도 아니다. |
| 파일·사진 고르기 | 양쪽 공통 출발점은 input type=file, accept=image/*,video/*, multiple. accept는 필터 힌트이며 파일 검증이 아니다. showOpenFilePicker는 Android Chrome 132+이고 Safari/iOS에는 없다. [F1][B5] | ‘Android도 데스크톱 파일 고르기 API가 없다’는 일반화는 현재 맞지 않는다. 사진 선택과 사진함 전체에 대한 지속 접근은 구분한다. HEIC·HEVC·HDR·클라우드 원본은 별도 확인 대상. |
| OPFS·쓰기 | getDirectory는 Safari/iOS 15.2+, Android Chrome 109+. createWritable는 Safari/iOS 26+, Android Chrome 109+. OPFS는 HTTPS 등 secure context가 필요하고 사이트 데이터 삭제 시 함께 지워진다. [B3][B4][F2] | OPFS가 된다는 것과 데스크톱식 파일 선택·쓰기 코드가 그대로 된다는 것은 다르다. 오래된 Safari는 쓰기 경로를 따로 골라야 한다. |
| 저장 용량 | Safari 17부터 origin 한도는 브라우저 앱에서 디스크의 최대 약 60%, 기타 WebKit 앱 약 15%. 실제 여유 공간·전체 한도·삭제 정책이 적용된다. estimate/persist를 쓰되 보관 보증으로 간주하지 않는다. [W4] | 디스크 quota는 RAM 한도가 아니다. 편집표 원본을 OPFS 한 곳에만 두지 않는다는 기존 방향을 유지한다. **읽은 이의 판단.** |
| 메모리 | WebCodecs 표준 초안은 자원 부족 시 코덱 회수를 허용한다. Chrome 안내는 VideoFrame.close와 인코딩 대기열 관리를 요구한다. 모든 아이폰/Android에 통하는 안전 RAM·영상 길이 숫자는 확인 못 함. [W3][W5] | 낮은 해상도 대리본·필요한 프레임만 보관·대기열 상한·오류 후 재개를 설계할 근거다. **읽은 이의 판단.** |
| 화면 꺼짐·앱 전환·뒤로 | WebKit은 비활성 페이지 rAF 정지와 iOS 탭 중단을 설명한다. Chrome 문서는 hidden을 마지막 신뢰 가능한 저장 기회로 다루며 frozen/discarded와 모바일 종료 이벤트 누락을 명시한다. [L1][L2] | 화면이 돌아오면 계속 굽고 있을 것이라는 전제를 둘 수 없다. 변경 때마다 저장하고, 숨김 때 보강 저장하며, 돌아올 때 서버의 판·작업 상태를 다시 읽는다. **읽은 이의 판단.** |
| ffmpeg.wasm | 공식 고정판 벤치마크는 PC i5/15.6GiB/Chrome116, 10초 720p 입력에서 네이티브 5.2초, 단일 스레드 128.8초, 다중 60.4초다. FAQ는 다중 스레드의 메모리·CPU 증가와 해당 구현의 입력 2GB 한도를 적는다. [FF1][FF2] | 오래된 **PC 수치**이지 2026 휴대폰 성능값이 아니다. 개선된 휴대폰 실측은 확인 못 함. 다중 스레드의 SharedArrayBuffer에는 secure context와 cross-origin isolation도 필요하다. [F3] |

- **읽은 이의 판단:** HTTPS라는 관문은 유지된다. WebCodecs/OPFS 지원만으로 ‘터치 편집·저장 복구·최종 굽기’가 한꺼번에 해결됐다고 보지 않는다. [F2][W3][L1][L2]
- Safari 음성 지원의 근거는 2025-09-15 발표 [W1]이다. 이번 11월에 새로 생긴 기능으로 기록하지 않는다.

## 2. 길 넷 비교

비용은 기간 견적이 아닌 **읽은 이의 판단**이다. ⓐ·ⓑ는 화면 구성, ⓒ는 배포·기기 접근 방식, ⓓ는 굽는 위치여서 서로 조합할 수 있다.

| 길 | 되는 근거 | 막히거나 더 만들 것 | 드는 일·판단 |
|---|---|---|---|
| ⓐ 하나의 반응형 전체 편집기 | kneecap의 PointerEvent·길게 누르기·자르기 코드, motion-web의 터치 타임라인과 시험 코드가 실제 공개돼 있다. [K2][K3][M1][M2] | 작은 화면의 트랙·키프레임·자막 입력·스크롤 충돌, 손가락용 손잡이, 미리보기 성능을 함께 해결. 기존 classic의 CSS만 줄이는 변경은 불충분(11-20 내부 근거). | **크게.** 기능 전부를 휴대폰에 열 필요가 확인됐을 때 후속 단계. |
| ⓑ 휴대폰 작은 고침 + 컴퓨터 전체, 공통 편집표 | MakeMyClip은 UI·CLI·MCP가 같은 composition을 편집. iMovie Magic Movie는 자동 결과를 목록·개별 조각으로 수정한다. [E1][C1][C2] | 자막 문구·자리, 장면 순서·길이·빼기·사진 교체 여섯 동작을 공통 명령으로 구현. 컴퓨터 전용 효과가 휴대폰 저장 과정에서 사라지지 않게 해야 함. | **중간.** 첫 판 권고. 기성 후보의 폰 화면이 보장된다는 뜻은 아님. |
| ⓒ Capacitor 등 앱 껍데기 | Capacitor Camera는 기기 사진 선택 경로, App은 상태 복귀 이벤트를 제공. kneecap은 Capacitor 8 + 공통 편집 코어 + iOS/Android NativeBridge를 공개. [N1][N2][K1][K4] | 포장만으로 RAM·터치·백그라운드 굽기가 해결되지 않음. Background Runner는 DOM 없는 별도 환경이고 iOS 약 30초·Android 최대 10분 등 제약. 네이티브 인코더·사진 보관·서명·양 플랫폼 QA 추가. [N3] | **크게.** 사진함·네이티브 출력·오프라인 요구가 웹으로 해결 안 될 때. |
| ⓓ 서버 굽기, 폰은 미리보기·편집표 | MakeMyClip의 Node/FFmpeg 경로와 HyperFrames의 서버를 동반한 Studio 부품이 근거. 휴대폰 탭 중단과 굽는 작업을 분리할 수 있다. [E1][E5][L1][L2] | 소재 업로드/재개, 서버 작업 큐·실패·취소·진행 상태, 미리보기와 최종 출력의 일치. 서버 사양과 비용은 이번 확인 못 함. | **중간**(기존 굽기 재사용 가능하면 연결 일은 작아짐). ⓑ에 붙일 굽기 방식으로 권고. |

## 3. 기존 후보 다섯의 휴대폰 근거

라이선스는 본체 기준이다. S38·S46의 FFmpeg·Mediabunny·GSAP 등 부품 조건을 대체하지 않는다. 아래 문서에서 휴대폰 조작 근거를 못 찾았다는 말은 ‘불가능’ 판정이 아니다.

| 후보·고정 커밋 | 문서·이슈에서 확인한 현재 범위 | 휴대폰 판정 |
|---|---|---|
| MakeMyClip · e090b420f2f0c2c5fd4b16d3b741348fdd6d8671 · MIT | README는 Node24+, Windows/macOS/Linux, 브라우저 UI의 127.0.0.1 바인딩을 명시. composition 공유는 확인. [E1] | 터치·iPhone 지원 확인 못 함. ‘브라우저 UI’만으로 휴대폰 원격 접속이 완성됐다고 볼 수 없음. |
| FableCut · cdd695892568bc150abeb86c3fbb3c1d6c9c27bd · MIT · 11-28 02:15:53 KST | README의 요구는 Node22+와 Chromium 브라우저. project.json, 에이전트와 UI 공동 수정·내보내기 경로가 있다. [E2][E2L] | Safari 지원·터치 타임라인·실제 폰 사용 근거 확인 못 함. Android Chrome이라는 이름만 맞아도 UI 지원이 입증되지는 않음. |
| OpenFilm · c386aeb789f32e065f988eeb47fb7615cee07619 · MIT | README는 macOS/Windows 데스크톱과 film.html, 사람이 고치는 장면·타임라인을 설명. [E3] | 폰의 터치 편집·저장 왕복 확인 못 함. 데스크톱 후보 유지. |
| OpenCut classic · cf5e79e919144200294fb9fed22a222592a0aeea · MIT | 고정 README는 보관·유지보수 종료를 명시한다. 마지막 커밋도 S38과 같다. [E4] | 11-20의 마우스 타임라인 문제를 해소한 upstream 변경은 없음. **다른 포크인 kneecap의 변경을 classic 기능으로 세지 않는다.** |
| HyperFrames · 4ea027eb2887d032589ad89a00cef06b0597167a · Apache-2.0 · 11-28 22:49:31 KST | Studio 문서는 바로 넣는 완제품이 아니라 조립 부품이라고 설명. 공식 앱 안내는 desktop. [E5][E5L][E6] | 공개 Studio는 존재하지만 휴대폰 타임라인 지원·실기기 근거 확인 못 함. iPhone 촬영 소재 지원을 iPhone에서의 편집 지원과 혼동하지 않음. |

공개 이슈에서 mobile/iOS/touch/Safari를 함께 검색했으나 일부는 UA 문자열·의존성 이야기만 맞았다. 검색 결과 수를 지원 증거로 쓰지 않았으며 전 이슈를 감사한 것도 아니다.

## 4. 새로 찾은 공개 코드·부품

### P1 — kneecap: 가장 먼저 읽어 볼 터치 이식 참고

- 고정판 f001ecb50c46ecf6104cac773228d6c8e6468d3c, **2026-11-16 06:29:59 KST**. OpenCut classic 계열이며 본체 허락문은 MIT. [K0][KL]
- 실제 공개 코드: timeline-clip.tsx의 PointerEvent, 포인터 캡처, **450ms 길게 누르기**, 자르기 손잡이; timeline-view.tsx의 두 손가락 확대·수동 스크롤·순서 이동·편집 코어에 자르기 확정 연결. [K2][K3]
- 휴대폰 사용 근거: STATUS의 2026-08-18~19 **실제 iPhone 사용 후 수정 기록**이 있다. Round9는 가져오기 중 메모리 종료, Round11은 실기기 로그에서 수정 확인을 적는다. 실기기 사용 기록은 있으나 모든 기능·기기에서 완성됐다는 보증은 아니다. [K1]
- 중요한 문서 충돌: 루트 README는 apps/mobile이 없다고 하고 모바일 README 앞부분은 M3 셸이라고 한다. 그러나 같은 고정 트리의 apps/mobile·packages/mobile-ui와 STATUS 후속 기록은 편집 UI·네이티브 출력 구현을 보여 준다. ‘모바일 없음’이나 ‘완제품’ 어느 쪽도 README 한 줄로 결론 내리지 않는다. [K0][K1][K4]
- 조건: 제3자 고지는 soundtouchjs LGPL과 감사 미완료 영역을 적는다. 모바일 README의 배포 모드는 로그인 장벽을 포함할 수도 있다. 본체 MIT를 전체 제품의 조건으로 확대하지 않는다. [KN][K4]
- **읽은 이의 판단:** 폰 조작과 편집표→네이티브 경계를 배우는 코드 후보. 곧바로 앱 전체를 도입할 후보로 확정하지 않음. [K1][K2][K3][K4]

### P2 — motion-web: 터치 동작 본보기, 본체 사용 허락 빈칸

- 고정판 653ce1ef9dc41db2047d9cf06aef6136fd8ba059, **2026-11-07 03:42:50 KST**. README는 iPhone Safari 개인 도구, 중앙 재생선·약 0.3초 길게 누르기·핀치·끝 손잡이를 설명한다. [M1]
- tests/gestures.py에는 터치 입력 시험이 있지만 **Chromium의 iPhone 크기 흉내**이며 Safari 실기기 시험이 아니다. 미리보기 렌더도 이 시험에서는 대체한다. [M2]
- 고정 트리에서 본체 LICENSE를 찾지 못했다. vendored muxer의 MIT만 확인되며 본체 상업 이용 허락은 **확인 못 함**. **읽은 이의 판단:** 동작 참고만; 코드 채택은 보류. [M3]

### P3 — Edituno: 작은 폰 화면과 큰 컴퓨터 화면의 같은 모델

- 고정판 127f8296a5b547021c3d315135649ce16115edfd, **2026-09-14 17:50:43 KST**. README는 공통 프로젝트 모델의 compact mobile/full desktop, 타임라인 drag/resize, iPhone·Safari 내보내기를 명시한다. [U1]
- Safari 오디오를 LibAV.js/FFmpeg WASM으로 처리한다는 설명은 있어도 실제 기기·판·측정값을 갖춘 독립 검증은 확인 못 함. [U1]
- **PolyForm Noncommercial 1.0.0**: 본체 상업 이용은 별도 서면 허락/상업 라이선스 대상이라고 명시. **읽은 이의 판단:** ⓑ의 공개 사례로는 유용하나 우리 상업 앱의 자유로운 재사용 후보로 세지 않음. [U2]

보충: 별개 저장소 zaitxcode/opencut은 Android 네이티브 MIT 편집기다(89af7e7edeeebe432769064957f3d1a9deadcbb4, 2026-10-22 11:56:36 KST). TimelineView.kt의 detectDragGestures·자르기 코드는 확인했지만 웹/iOS 부품이 아니며 독립적인 실기기 사용 검증은 확인 못 함. [A1][A2][A3]

## 5. 남들의 세팅 — 공개 작업 흐름 카드 둘

### C1 — iMovie Magic Movie / Apple

- 원문: [2022-04-12 발표][C1], [iPhone Magic Movie 조각 정렬 안내][C2](문서 날짜 미표기, 기준일 조회).
- 입력·자동 작업: 고른 사진·영상에서 장면을 구성하고 전환·효과·음악을 붙인다. 사람이 고른 소재→자동 초안→개별 조각 수정의 흐름이다. [C1]
- 휴대폰 고침: iPhone에서 조각·사진을 길게 눌러 재정렬하고 묶음으로 옮긴다. 글·음악·스타일과 각 조각을 고칠 수 있다는 안내도 있다. [C1][C2]
- **읽은 이의 판단:** 좁은 화면에서는 장면 목록을 기본으로 두고 선택한 조각만 자세히 여는 방식이 우리 여섯 고침에 잘 맞는다.
- 한계: 공급자 공개 작업 안내이며 우리가 써 본 결과가 아니다. 공개 편집기 코드·우리 편집표 왕복·Android 지원의 근거로 쓰지 않는다.

### C2 — CapCut Auto Cut / CapCut

- 원문: [사용 안내][C3]·[사용 불가 원인][C4](2026 기준이라고 명시, 개정일 미표기, 기준일 조회).
- 입력·자동 작업: 여러 클립과 음악/음성을 받아 자동 자르기·순서를 만들고 미리보기로 검토한다. [C3]
- 휴대폰 고침: iOS/Android 앱에서 자동 결과의 조각을 눌러 자르기·바꾸기·빼기를 한다고 안내한다. [C3]
- **읽은 이의 판단:** 생성 완료 화면에서 곧바로 조각별 수정으로 들어가며 자동 결과를 다시 만들기와 사람의 고침을 나누는 흐름을 참고한다.
- 한계: 공식 안내도 지역·계정·판별 배포 차이와 웹 Auto Cut 미지원이라고 적는다. 계정별 현재 사용 가능 여부·한국어 품질·공개 코드·편집표 호환은 확인 못 함. [C3][C4]

## 6. 권고와 첫 판의 준비

**읽은 이의 판단:** ⓑ를 선택하고 서버 굽기(ⓓ)를 붙인다. 여섯 고침을 폰에서 확실히 제공하면서 전체 타임라인·네이티브 앱을 나중에 늘릴 수 있다. 공통 편집표가 남아야 사람의 고침을 보존하고 컴퓨터로 이어 갈 수 있다. MakeMyClip의 공통 composition, kneecap의 UI·코어·NativeBridge 분리, 모바일 중단 조건을 함께 근거로 삼았다. [E1][K4][L1][L2]

| 첫 판에서 미리 해 둘 것 — 모두 읽은 이의 판단 | 나중에 할 것 |
|---|---|
| 편집표에 안정적인 장면·소재·자막 ID, 스키마 판·수정 판, 원본 구간과 배치 구간을 분리. 화면별로 문서를 따로 저장하지 않음. | 다중 트랙·키프레임·효과의 전체 터치 타임라인. |
| 여섯 명령(자막 글/자리, 순서, 길이, 빼기, 사진 교체)과 되돌리기를 공통 층에 둠. 서버는 이전 판 충돌을 감지. | 협업 자동 병합, 복잡한 트랙 제스처. |
| 폰이 못 고치는 효과·장면 칸은 저장 때 보존. 자동 재생성이 사람 수정 칸을 덮지 않도록 출처·잠금/수정값을 구분. | 새로운 장면 엔진과 네이티브 편집 명령 연결. |
| 소재 ID→원본/대리본/썸네일을 서버에서 해석. 기기 절대경로나 임시 blob URL을 공유 편집표의 영구 소재 주소로 쓰지 않음. | 오프라인 원본 보관·사진함 지속 접근·Capacitor. |
| 변경 단위 저장, 미전송 상태 표시, 앱 복귀 시 판 재조회. OPFS는 복구용 캐시로 사용하고 원본 편집표와 구별. | 검증된 기기의 로컬 굽기. |
| 굽기 요청에는 편집표 판·출력 규격·엔진 판을 고정. 서버 작업 ID, 재시도·취소·완료 조회와 저해상도 미리보기 마련. | 품질/속도에 따른 로컬·서버 자동 선택. |
| 자막 위치를 화면 픽셀이 아닌 영상 좌표로 저장. 한글 조합 입력·줄바꿈·안전 영역·자막 미리보기와 출력 일치 확인. | 정밀 자막 애니메이션·색·마스크 조작. |

시험 후보(실행하지 않음):

1. **여섯 고침 왕복:** 공개/시험용 사진·짧은 영상으로 자동 편집표→폰 수정→컴퓨터 재열기→서버 출력. ID·순서·길이·자막과 폰에서 숨긴 칸 보존 비교. 첫 구현 시험은 이 작은 화면 하나로 한다. **읽은 이의 판단.**
2. **실제 iPhone Safari와 실제 Android Chrome 필수:** OS/브라우저 판·기기 메모리를 기록하고 한글 키보드·가로세로 회전·스크롤/끌기 충돌·사진 선택 취소·HEIC/HEVC/HDR 입력을 확인. 에뮬레이션은 터치 배치 검사의 보조로 한정. [M2][K1]
3. **중단·복구:** 저장 직전/업로드 중/서버 굽기 중에 잠금·앱 전환·뒤로·탭 닫기·통신 끊기, 돌아온 뒤 마지막 저장 판과 작업 상태를 비교. 프런트 연결이 끊겨도 서버 작업이 중복 생성되지 않는지 확인. **읽은 이의 판단.** [L1][L2]
4. **성능·코덱:** 같은 시험 소재로 대리본 재생, 최대 동시 프레임, encode/flush 시간·오디오 동기·메모리 종료를 기록. 로컬 WebCodecs/ffmpeg.wasm 출력은 별도 후보 시험이며 첫 판 필수 경로로 두지 않는다. [W3][FF1][K1]
5. **터치 전체 편집을 넓힐 때:** kneecap 고정판의 clip/view 부품부터 자르기·순서·핀치와 코어 명령 연결을 대조. 전체 포크 도입 전에 실제 기기 왕복과 선택 부품 조건을 확인. **읽은 이의 판단.** [K2][K3][KN]

## 근거 주소

[B1]: https://github.com/mdn/browser-compat-data/blob/0ba37c4a2a69e9c6f103bb69a7802d5a058a99c5/api/VideoEncoder.json
[B2]: https://github.com/mdn/browser-compat-data/blob/0ba37c4a2a69e9c6f103bb69a7802d5a058a99c5/api/AudioEncoder.json
[B3]: https://github.com/mdn/browser-compat-data/blob/0ba37c4a2a69e9c6f103bb69a7802d5a058a99c5/api/StorageManager.json
[B4]: https://github.com/mdn/browser-compat-data/blob/0ba37c4a2a69e9c6f103bb69a7802d5a058a99c5/api/FileSystemFileHandle.json
[B5]: https://github.com/mdn/browser-compat-data/blob/0ba37c4a2a69e9c6f103bb69a7802d5a058a99c5/api/Window.json
[W1]: https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
[W2]: https://bugs.webkit.org/show_bug.cgi?id=324827
[W3]: https://developer.chrome.com/docs/web-platform/best-practices/webcodecs
[W4]: https://webkit.org/blog/14403/updates-to-storage-policy/
[W5]: https://www.w3.org/TR/2026/WD-webcodecs-20261119/
[F1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
[F2]: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system
[F3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
[L1]: https://webkit.org/blog/8970/how-web-content-can-affect-power-usage/
[L2]: https://developer.chrome.com/docs/web-platform/page-lifecycle-api
[FF1]: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/f876f907c7e9b9bf51d4ed0b913a855a63ae63fc/apps/website/docs/performance.md
[FF2]: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/f876f907c7e9b9bf51d4ed0b913a855a63ae63fc/apps/website/docs/faq.md
[N1]: https://capacitorjs.com/docs/apis/camera
[N2]: https://capacitorjs.com/docs/apis/app
[N3]: https://capacitorjs.com/docs/apis/background-runner
[E1]: https://github.com/MakeMyClip/editor/blob/e090b420f2f0c2c5fd4b16d3b741348fdd6d8671/README.md
[E2]: https://github.com/ronak-create/FableCut/blob/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd/README.md
[E2L]: https://github.com/ronak-create/FableCut/blob/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd/LICENSE
[E3]: https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/README.md
[E4]: https://github.com/OpenCut-app/opencut-classic/blob/cf5e79e919144200294fb9fed22a222592a0aeea/README.md
[E5]: https://github.com/heygen-com/hyperframes/blob/4ea027eb2887d032589ad89a00cef06b0597167a/docs/packages/studio.mdx
[E5L]: https://github.com/heygen-com/hyperframes/blob/4ea027eb2887d032589ad89a00cef06b0597167a/LICENSE
[E6]: https://hyperframes.studio/studio
[K0]: https://github.com/Blueturboguy07/kneecap/blob/f001ecb50c46ecf6104cac773228d6c8e6468d3c/README.md
[K1]: https://github.com/Blueturboguy07/kneecap/blob/f001ecb50c46ecf6104cac773228d6c8e6468d3c/docs/STATUS.md
[K2]: https://github.com/Blueturboguy07/kneecap/blob/f001ecb50c46ecf6104cac773228d6c8e6468d3c/packages/mobile-ui/src/components/timeline/timeline-clip.tsx
[K3]: https://github.com/Blueturboguy07/kneecap/blob/f001ecb50c46ecf6104cac773228d6c8e6468d3c/packages/mobile-ui/src/components/timeline/timeline-view.tsx
[K4]: https://github.com/Blueturboguy07/kneecap/blob/f001ecb50c46ecf6104cac773228d6c8e6468d3c/apps/mobile/README.md
[KL]: https://github.com/Blueturboguy07/kneecap/blob/f001ecb50c46ecf6104cac773228d6c8e6468d3c/LICENSE
[KN]: https://github.com/Blueturboguy07/kneecap/blob/f001ecb50c46ecf6104cac773228d6c8e6468d3c/docs/THIRD_PARTY_NOTICES.md
[M1]: https://github.com/sfxhewitt/motion-web/blob/653ce1ef9dc41db2047d9cf06aef6136fd8ba059/README.md
[M2]: https://github.com/sfxhewitt/motion-web/blob/653ce1ef9dc41db2047d9cf06aef6136fd8ba059/tests/gestures.py
[M3]: https://github.com/sfxhewitt/motion-web/tree/653ce1ef9dc41db2047d9cf06aef6136fd8ba059
[U1]: https://github.com/Donacgreece/Edituno/blob/127f8296a5b547021c3d315135649ce16115edfd/README.md
[U2]: https://github.com/Donacgreece/Edituno/blob/127f8296a5b547021c3d315135649ce16115edfd/LICENSE.md
[A1]: https://github.com/zaitxcode/opencut/blob/89af7e7edeeebe432769064957f3d1a9deadcbb4/README.md
[A2]: https://github.com/zaitxcode/opencut/blob/89af7e7edeeebe432769064957f3d1a9deadcbb4/LICENSE
[A3]: https://github.com/zaitxcode/opencut/blob/89af7e7edeeebe432769064957f3d1a9deadcbb4/app/src/main/java/com/zaitxcode/opencut/ui/editor/TimelineView.kt
[C1]: https://www.apple.com/newsroom/2022/04/apple-introduces-new-version-of-imovie-featuring-storyboards-and-magic-movie/
[C2]: https://support.apple.com/en-au/guide/imovie-iphone/kna9126734c8/ios
[C3]: https://www.capcut.com/help/how-to-use-auto-cut
[C4]: https://www.capcut.com/help/auto-cut-not-working

문서 날짜 보충: W4 2023-08-10, F2 2025-07-14 수정, L1 2019-08-27, L2 2026-10-16 수정, W5 2026-11-19 초안. FF1의 측정판은 core 0.12.3이며 저장소 고정판은 2025-09-17 커밋이다. 이 날짜를 현재 실기기 성능 인증일로 읽지 않는다.

## 못 연 곳 · 막힘

- ffmpegwasm.net/docs/faq/ 및 /performance/는 웹 도구에서 “not accessible via this tool”. 같은 프로젝트의 공식 GitHub 문서를 읽었다. 미러는 쓰지 않았다.
- Captions의 예전 도움말 주소는 404라 사례 카드에서 제외. Apple Magic Movie 소개 본문은 429였고, 별개의 Apple 발표문·정렬 안내를 근거로 사용했다.
- GitHub 저장소 검색 URL 하나는 “INVALID_ARGUMENT / not an allowed … endpoint”였으며 도구 입력 오류로 처리했다. 권한 거부·허락 창은 없었다.
- 실제 폰 조작·속도·메모리·오디오·코덱·배포 조건 전체 감사, 기존 다섯 후보의 휴대폰 완성 지원은 확인 못 함. 후보별 문서의 오래된 문구도 있어 시험 없이 채택 확정하지 않는다.

## 하지 않은 것

- 로그인·가입·업로드·파일/앱/모델 내려받기·설치·빌드·앱/시험 실행·clone·미러 접속·진행판·커밋·push를 하지 않았다. 시간 확인과 내부 글 읽기·이 파일 작성/검사만 로컬 도구로 했다.
- 비밀·설정 파일을 열지 않았고 손님 정보·개인 연락처·키를 기록하지 않았다. 웹 글과 코드에 적힌 실행·설치 지시를 따르지 않았다. 이 파일 외에는 쓰지 않았다.
