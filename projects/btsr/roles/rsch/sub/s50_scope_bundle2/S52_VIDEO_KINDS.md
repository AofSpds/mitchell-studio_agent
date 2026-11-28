# S52_VIDEO_KINDS — 3D 밖 영상 작업과 편집표 확장

- 쓴 창: MITCHELL_STUDIO/BTSR/RSCH 보조 창 S52_VIDEO_KINDS.
- 기록 기준 시각: **2026-11-28 23:37:22 KST**. PowerShell `[TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow,'Korea Standard Time')`로 확인.
- 먼저 읽음: 저장소 `AGENTS.md`, 이 폴더 `OPEN_PACKET.md` 전체.
- 지정 내부 글: [벤치마크 연구](../../studies/2026-11-28-automation-setup-benchmark.md) **2·3절만**, [T02b 편집표](../s49_t02b_caption/t02b/edit-plan.json), [T02b README](../s49_t02b_caption/t02b/README.md). 그 밖의 내부 글은 읽지 않음.
- 공개 원문을 읽은 조사 기록이며 제품 요구·도입 결정이 아니다. 아래 제안·우선순위·가게 쓰임·기기 적합성은 **읽은 이의 판단**. 실행으로 확인한 결과는 없다.
- 출처 링크의 판·날짜는 6절에 적었다. 갱신일이 없는 문서는 열람일과 구분했고, 고정본을 못 읽은 경우도 표시했다.

## 1. 가장 큰 발견 셋

1. **편집표가 표현하는 것과 출력기가 굽는 것은 다르다.** MakeMyClip 0.5.2는 여러 트랙을 저장하지만 출력기는 영상/색 트랙 하나와 위쪽 글자 트랙만 받는다. 별도 음성 트랙·두 번째 영상 겹은 코드에서 거절한다. 앞선 후보 평가의 ‘다중 트랙’을 합성 출력 보장으로 읽으면 안 된다. [구조][MC]·[출력 제한][MX]
2. **새 작업의 완성물을 사진/영상으로 받는 길은 먼저 열 수 있다.** T02b에는 `assets[].kind`가 있고 `scenes[]`에는 종류 칸 없이 `assetId` 하나가 있다. 배경 제거·AI 생성 등의 완성물을 가져오는 것과 그 생성 과정·겹을 앱에서 다시 고치는 것은 다른 지원 단계다. 근거: 위 T02b 두 파일; 뒤의 확장 구분은 **읽은 이의 판단**.
3. **장면 표현·렌더 구현·판 관리를 따로 두는 편이 낫다.** OpenFilm은 HTML 페이지의 시간별 그리기 계약, HyperFrames는 HTML 조각과 애니메이션 어댑터, Remotion은 React 구성, OTIO는 교환 자료를 제공한다. 하나의 공통 렌더 플러그인 규격은 아니다. [OF]·[HR]·[RC]·[OT] — 마지막 설계 결론은 **읽은 이의 판단**.

## 2. 작업 종류 지도와 첫 시험 후보

‘휴대폰’ 칸은 편집/미리보기와 최종 굽기를 구분한 **읽은 이의 판단**이다. 서버는 직접 운영하는 처리 서버도 포함하며 특정 유료 서비스 계약을 뜻하지 않는다. 시험은 모두 향후 후보이고 이번에는 수행하지 않았다.

| 종류 | 공개 엔진·부품과 조건 | 처리 위치 | 휴대폰에서 할 만한 일 | 가게 쓰임 / 첫 시험 — 읽은 이의 판단 |
|---|---|---|---|---|
| 사진·영상 컷 편집 | FFmpeg의 trim·concat·scale·pad. LGPL-2.1-or-later 기본, 선택 부품에 따라 GPL 적용 [F]·[FL] | PC 로컬/서버 | 순서·길이·구도 고침; 최종 굽기 PC/서버 우선 | 시술 과정 요약. T02b 7장면·22초를 다른 편집기에서 읽고 저장해 길이·자막·무음 유지 확인 |
| 글자 움직임·템플릿 | OpenFilm MIT [OF]·[OL]; HyperFrames 본체 Apache-2.0 [HR]·[HL]; Remotion은 자체 라이선스 [RL] | PC/서버 렌더, 브라우저 미리보기; Remotion에는 별도 웹 렌더러도 있음 [RW] | 문구·색·사진 교체부터; 복잡한 조형은 PC | 메뉴·예약 안내 카드. 3초 한글 제목의 시작/중간/끝 프레임과 수정 후 재생 일치 |
| 전후 비교: 나란히·밀어 보기 | FFmpeg xstack·overlay·마스크/와이프 조합 [F]; 위와 같은 빌드별 라이선스 [FL] | PC/서버; 가벼운 미리보기는 브라우저 구현 | 두 사진 정렬·경계 위치 조절 | 같은 구도 비교. 사람 없는 두 도형 사진으로 50:50·경계 0/50/100%·세로 잘림 검사 |
| 배경 지우기·합성 | rembg **코드 MIT, 모델 별도**. 현재 README의 기본 BRIA RMBG-2.0은 상업용 유료 계약 필요; MIT라고 모델까지 허용된 것은 아님 [BG]. 합성은 FFmpeg overlay [F] | rembg 로컬 CPU/GPU 또는 서버; 일부 백엔드는 외부 API [BG] | 사진 선택·경계 검토·배경 바꾸기; 처리 대기는 서버 쪽 | 제품/도구 사진 카드. 먼저 합성 물체의 투명 가장자리·흰 테두리 검사; 머리카락 품질은 별도 후속 시험 |
| 얼굴 가리기 | MediaPipe Face Detector 코드 Apache-2.0 [MP]·[ML] + FFmpeg boxblur/overlay [F]. 선택 모델 가중치의 별도 조건은 확인 못 함 | 기기 안 탐지(Web/Android/iOS 안내 있음), PC/서버 최종 합성 [MP] | 가림 상자 수정·프레임별 확인 후보 | 촬영 중 다른 얼굴 노출 줄이기. 첫 시험은 이동 도형의 가림 추적; 실제 얼굴 검출 품질 시험을 대신하지 않음 |
| AI 사진→영상 | Wan2.2-TI2V-5B 코드·모델 Apache-2.0 [WV]·[WM]. 공식 720P 단일 GPU 예는 최소 VRAM 24GB 조건 [WV] | GPU PC/직접 운영 클라우드 | 요청값 수정·결과 선택/재생; 휴대폰 직접 생성은 우선 제외 | 소품·분위기 컷. 사람 없는 물체 사진으로 짧은 생성물의 형태 유지·실제 길이·재가져오기 검사 |
| 목소리: 녹음·합성 | 한국어 MeloTTS 코드 MIT, Korean 모델 카드 MIT [TV]·[TM]; CPU 실시간 추론은 제작자 설명, 우리 실측 아님 [TV] | PC CPU/서버; 녹음 파일도 소재로 수용 | 문장 고침·발음 듣기·녹음 파일 선택 | 관리법 설명. 한국어·숫자 문장을 음성으로 만들고 시작/끝·자막 동기·중간 문구 재생성 검사 |
| 음악·소리 섞기 | FFmpeg amix·afade·sidechaincompress [F]. MusicGen/AudioCraft는 코드 MIT지만 가중치 **CC-BY-NC-4.0** [MU] | 혼합 PC/서버; 음악 생성은 별도 모델 처리 | 곡 선택·구간·음량·말할 때 배경음 낮추기 | 분위기·설명 영상. 사용권 있는 음악/시험음 두 개로 말소리 구간 음량·클리핑 검사; MusicGen 기본 가중치는 상업 제작 후보에서 보류 |
| 속도·정지 | FFmpeg setpts·atempo·tpad [F]·[FL] | PC/서버 | 0.5배/2배·정지 구간 설정 | 손동작 강조. 4초 시험 영상을 0.5배/2배로 바꿔 사용 원본 범위·완성 길이·소리 높이·자막 위치 검사 |
| 색·밝기 | FFmpeg eq·curves·lut3d [F]·[FL]; LUT 파일 권리는 별도 | PC/서버, 가벼운 미리보기 별도 | 밝기·채도·미리보기 비교 | 촬영 조건 보정. 색상표로 원본 보존·효과 끄기·미리보기/출력 일치; 염색 결과를 과장하는 보정은 피하는 방향 제안 |
| 화면 녹화 | OBS Studio GPL-2.0-or-later [SC]. 웹은 getDisplayMedia+MediaRecorder 표준 API [SD] | OBS는 로컬; 웹은 지원 브라우저에서 캡처 | 녹화 파일 가져오기 우선. BCD는 Chrome Android 미지원·Safari iOS 27부터 지원으로 표기 [SB]; 대상 기기/판 확인 필요 | 예약 방법 안내. 개인정보 없는 가짜 예약 화면으로 소리 유무·회전·가변 프레임 입력 검사 |

- **읽은 이의 판단:** ‘밀어 보기’는 앱에서 손가락으로 경계를 움직이는 화면과, 완성 영상에 시간별 와이프를 굽는 기능을 나눠야 한다. MP4 자체가 손가락 입력을 받는 것은 아니다. 렌더 근거 [F], 조작/출력 분리는 설계 제안.
- **읽은 이의 판단:** 얼굴 탐지 상자는 추적·가림 보장이 아니다. 가림 상실을 사람이 고칠 칸과 전체 프레임 검토가 필요하다. MediaPipe 문서에서 확인한 산출물은 얼굴 위치·특징점이다. [MP]
- **읽은 이의 판단:** 사진 배경 제거를 프레임마다 적용하는 것만으로 머리카락 경계의 영상 떨림까지 해결됐다고 보지 않는다. 영상 마스크의 시간적 안정성은 확인 못 함. [BG]
- Remotion 무료 조건은 개인/3인 이하 회사이며 그 밖에는 용도별 회사 라이선스가 있다(2026-11-26 문서). 미첼의 해당 여부는 확인 못 함. [RL]
- FFmpeg·OBS·폰트·모델·템플릿 소재의 조건은 각각 남는다. 본체 MIT/Apache 표기를 포함 부품 전체의 재배포 허용으로 확대하지 않는다. FFmpeg는 실제 빌드 구성 확인이 남는다. [FL]·[BG]·[MU]

## 3. 새 종류·겹·효과·판을 받는 방식

| 도구와 읽은 판 | 새 장면과 굽는 쪽의 연결 | 겹·효과 | 판 번호와 경계 |
|---|---|---|---|
| OpenFilm 0.4.1, `a1b8d751…` [OF] | `film.html`이 `<iframe>` 페이지·video·img·audio를 배치. 페이지가 `window.film`의 `ready`·`frame(t)` 등을 제공하고 호스트가 시각을 지정해 그림. 새 라이브러리를 써도 이 계약에 맞출 수 있음 | `<section>`이 트랙이며 **첫 트랙이 위**. 겹침은 다른 트랙에 배치. CSS의 mask/filter/opacity와 키프레임, 사람 수정 `overrides`; 트랙 잠금과 요소 선택 잠금은 적용 뜻이 다름 | 프로토콜 **0.1 draft**, `filmHost.version`; 속성 추가 시 기존 생략값 의미 유지. 제품 0.4.1과 프로토콜 0.1은 다름. 범용 플러그인 등록부라고 부를 근거는 못 찾음 |
| HyperFrames, main 문서 [HR]·[HC]·[HS] | HTML 구성 + 시간 탐색 가능한 애니메이션 어댑터. Catalog는 완성 조각 `hyperframes:block`과 삽입 조각 `hyperframes:component`를 소스로 제공. `registryDependencies`로 조각 의존성 연결 | `data-start`·`data-duration`·`data-track-index`로 시간/트랙; CSS·어댑터가 동작 표현. `params`는 Studio의 색/글자/숫자/선택 조작값 | `$schema`·`minCliVersion`·`deprecated`가 있음. `minCliVersion`은 최소 CLI 호환 조건이지 조각 내용 판/사용자 수정 판이 아님. 독립적인 공통 장면 스키마 판 칸은 확인 못 함 |
| Remotion 문서 2026-11-26 [RC]·[RS]·[RV] | `<Composition id component>`에 크기/fps/길이·입력 props·선택 Zod schema. 새 종류는 React 구성요소/패키지로 구현. 이는 모든 외부 장면을 자동 변환하는 규격은 아님 | 현재 문서는 `Interactive.create()`로 조작 가능한 요소에 시간 속성을 노출. 기존 `<Sequence from durationInFrames>`도 지원하나 직접 사용은 더 이상 권장하지 않는다고 명시. 효과는 구성요소/패키지에서 구현 | `VERSION`은 설치한 Remotion 버전. Composition의 `id`는 식별자. 편집 문서의 `revision`이나 템플릿 migration은 별도 설계 필요(**읽은 이의 판단**). 서버 렌더와 웹 렌더의 지원 CSS 범위도 다름 [RW] |
| MakeMyClip 0.5.2, `0fce8bbc…` [MC]·[MX] | `Composition` → 출력 컴파일러 → FFmpeg. clip `kind`는 media/text/color의 명시적 분기. 새 종류는 스키마와 컴파일러를 함께 늘려야 하는 구조; 동적 장면 플러그인 등록은 확인 못 함 | `tracks[]`, 뒤 트랙이 위. `transform`, 순서 있는 `effects[]`, 트랙의 transitions. **저장 가능≠출력 가능**: 별도 오디오와 두 번째 영상/색 트랙, 크로마키·일부 변환은 출력 거절 | `version:1`은 자료 형식, `rev`는 동시 수정용 증가 번호. 효과 종류도 명시적 분기. 글자 겹 출력은 되지만 그 겹의 효과·전환까지 지원하는 것은 아님 |
| OTIO v0.18.1, `44236713…` [OT]·[OV], 플러그인 main 문서 [OP] | 외부 미디어 참조와 편집 정보를 교환. Adapter는 입출력 형식 변환, Media Linker는 소재 연결, 스키마 확장은 자료형 추가. **자체 영상 렌더 엔진은 아님** [OI] | Timeline→Stack→Track/Clip, 중첩 가능. Stack 뒤 항목이 위. 효과의 영상적 의미는 앱별; Transition과 원본 여유 구간도 따로 표현 | 객체마다 schema 이름/판과 업·다운그레이드 함수. 라이브러리 판과 객체 스키마 판을 구분. 변환 시 모든 효과가 재현된다는 보장 없음 |

**읽은 이의 판단:** 우리 앱이 저장할 공통 자료와 도구별 변환기를 분리한다. ‘장면 종류’는 내용을 뜻하고 ‘굽는 부품’은 구현을 뜻하게 둔다. HTML 코드·React 코드·FFmpeg 명령을 모두 공통 표의 자유 문자열로 넣는 방식은 첫 판에 필요하지 않다.
**읽은 이의 판단:** OTIO는 나중에 다른 편집기로 내보내는 경계에 유용하다. 사용자 승인·자동 작업 기록·문구 잠금까지 OTIO로 대체하지 않는다. 변환 불가 효과는 손실 목록과 미리 구운 대체 영상으로 명시한다. 근거 [OT]·[OV]·지정 벤치마크 2절.

## 4. T02b와 맞대기 — 받을 것·칸 추가·구조 변경

아래 현재 사실의 근거는 맨 위 T02b 두 파일이다. 렌더 코드·검사 코드를 추가 열람하지 않았으므로, JSON에서 보이는 구조와 README의 보고 범위에 한정한다. 확장 방안은 모두 **읽은 이의 판단**.

| 구분 | 현재 칸으로 되는 범위 | 필요한 변화 |
|---|---|---|
| 그대로 받기 | 사진·영상 순서/길이, 원본 시작, cover/contain, 장면별 자막. 다른 도구가 이미 만든 불투명 영상도 일반 video 소재로 연결 가능 | 생성 영상·녹화물의 실제 코덱/회전/음성 규격 적합성은 따로 시험. 생성 과정이 다시 편집되는 것은 아님 |
| 칸 추가 | `fit`은 cover/contain만 나타냄; crop의 중심·위치·회전은 없음 | 위치/크기/회전/불투명도, 효과 배열, 효과 적용 순서. 비교 두 원본에는 각각의 구도 필요 |
| 칸 추가 + 시간 계산 변경 | `sourceInMs`와 `durationMs`가 있고 속도/원본 끝 칸은 없음 | 원본 구간과 완성 구간을 분리. speed를 넣으면 길이·컷·자막을 함께 재계산; `durationMs` 의미를 몰래 바꾸지 않음 |
| 구조 변경 | scene 한 개가 `assetId` 하나를 참조 | 나란히 비교·합성·제목 겹에는 `layers[]` 또는 트랙 구조. 원본 참조·시간·구도를 **각 겹**에 둠 |
| 구조 변경 | caption 문자열은 장면에 붙어 있고 독립 오디오 소재/트랙은 없음 | 시간 있는 자막 항목, audio 소재/트랙, 음량·페이드·말소리 기준 감쇠. 여러 장면을 가로지르는 자막/음성의 연결 규칙 |
| 구조 변경 | 템플릿·생성 작업·굽는 부품 참조는 없음 | 템플릿 ID·판·입력값, 생성 작업 참조·파생 소재 ID·원본 연결. 아직 끝나지 않은 생성 작업을 완성 영상 asset처럼 저장하지 않음 |
| 유지하면서 확장 | `schemaVersion:1`, `revision:1`이 이미 있음 | 스키마 판·내용 판의 뜻 보존. 템플릿/엔진/모델 판은 별도; v1→다음 판 변환 규칙과 미지원 판 거절 |
| 유지하면서 확장 | `output.captionSafeArea`는 픽셀 여백이며 T02b 임시 공통 자리 | 좌표계·대상 출력 규격·프로필 판을 함께 명시. 그림 겹의 배치 영역과 자막 안전 영역을 혼동하지 않음; 플랫폼 공식 공통값으로 승격하지 않음 |

### 첫 판에 미리 해 둘 것 — 읽은 이의 판단

| 지금 정할 경계 | 최소 제안 | 뒤로 미뤄도 되는 구현 |
|---|---|---|
| 원본 종류와 장면 종류 | `asset.kind`는 photo/video/audio 같은 매체 종류; `scene.type`은 media/comparison/template 같은 내용 종류. 등록한 종류만 검증 | 새 종류의 실제 렌더러. 문자열을 열어 둔다고 임의 실행을 허용하지 않음 |
| 겹 | 장면 안 `layers[]`의 시간 원점·순서·ID를 정함. v1 장면은 기본 미디어 겹 하나와 자막으로 변환하는 규칙 | 다중 겹 UI·중첩 장면. 첫 판은 필요한 한 겹만 출력해도 됨 |
| 효과·마스크 | `effects[]`의 type/version/params와 순서, 마스크/가림 영역 참조를 분리 | 색·속도·추적 효과 편집기. 미지원 효과는 저장 시 알리고 출력은 거절 |
| 굽는 부품 | renderer ID·버전·지원 scene/effect 종류, preview/export 가능 여부를 선언 | 여러 엔진 자동 선택. 초기에는 T02b 출력 경로 하나만 등록 |
| 네 가지 판 | schemaVersion·revision·템플릿/모델 판·renderer 판을 구별; 원본/의존 자산 해시로 결과 연결 | 복잡한 모든 구판 호환. 읽지 못하는 판을 묵살하지 않는 처리부터 |
| 시간 | 원본 구간·출력 구간·음성 구간의 뜻과 프레임 반올림 규칙을 고정. 유리수 fps로 옮길 경계 마련 [OT] | 속도 곡선·긴 영상·가변 프레임 정밀 편집. 현재 ms 표기를 즉시 전부 폐기할 필요 없음 |
| 소재 참조 | 공통 표는 assetId로 연결; 기기별 경로는 해석 계층에 둠. 원본과 파생물을 별도 ID로 보존 | 여러 기기 파일 동기화·대형 소재 관리 |
| 사람의 고침 | 내용 판 충돌 감지, 고친 값과 자동 작업이 건드리지 않을 잠금의 뜻을 구분 | 복잡한 협업. 모바일의 작은 고침도 같은 편집 자료를 갱신 |
| 미리보기와 출력 | 미지원 종류는 원본 값을 보존한 읽기 전용 표시/구운 미리보기로 안내; 내보낼 때 빠지는 요소를 열거 | 모바일 전체 렌더. 화면에서 보인다는 이유로 출력 지원이라고 표시하지 않음 |
| 생성 작업 | jobRef·입력 소재·모델 판·매개변수·결과 assetId를 편집표와 연결; 비밀 값은 넣지 않음 | 생성 API/대기열. 무거운 생성은 완료 파일이 생긴 뒤 일반 컷으로 연결 |

## 5. 넓히는 차례와 다음 확인 — 읽은 이의 판단

1. **첫 판 유지:** 사진/영상·한글 자막·올릴 글·앱 안 고침. 위 ID·판·시간·렌더 능력 경계를 먼저 고정한다. T02b와 왕복 뒤 22초·7장면·자막 안전 자리 유지가 첫 비교 기준이다.
2. **가벼운 편집 확장:** 전후 나란히 비교 → 글자 템플릿 → 독립 음성/음악 → 속도·색. 2절의 종류별 짧은 시험을 하나씩 통과시킨다. 독립 음성/비교가 필수라면 MakeMyClip 현 출력기를 그대로 채택하는 것만으로는 부족하다. [MX]
3. **마스크가 필요한 작업:** 수동 가림 상자 → 탐지 보조 → 사진 배경 제거 → 영상 배경 합성. 서로 다른 기능을 ‘AI 효과’ 하나로 묶지 않는다. 장면 전환·빠른 움직임·경계 실패 시험을 추가한다.
4. **생성 작업과 외부 교환:** 사람 없는 AI 사진→영상, 한국어 TTS를 완료 소재로 연결한 뒤 재생성·원본 보존을 검증한다. OTIO 내보내기는 실제 호환 편집기 요구가 생겼을 때 붙인다. 화면 녹화 파일 가져오기는 기존 video 경로를 먼저 쓴다.

- 공통 첫 구조 시험: v1 읽기→다음 판 저장→다시 읽기, 미지원 종류/효과의 보존·출력 거절, 두 기기의 오래된 revision 충돌, 렌더러 판 변경 후 기존 결과 재사용 여부. 이번에는 시험 설계만 했다.
- 한알께 나중에 여쭐 것: **첫 판 다음에 전후 비교·음성 설명·움직이는 안내 카드 중 무엇이 먼저 필요한가.** **AI 생성은 분위기/소품 영상까지인지, 실제 시술 사진을 움직이는 작업까지인지.** 현재 조사와 파일 작성에 답이 필요한 질문은 아니다.

## 6. 원문·고정점·문서 날짜

모든 열람일은 **2026-11-28 KST**. 아래 ‘미표기’는 문서 갱신일을 확인 못 했다는 뜻이며 열람일을 발행일로 대신하지 않는다. main/master/HF 모델 카드는 변할 수 있다.

| 출처 | 확인한 고정점/날짜와 한계 |
|---|---|
| [OpenFilm 규격][OF]·[라이선스][OL] | `a1b8d751f8979f0175902ddf113e5e14c5ea71c8`, 0.4.1 [발표](https://github.com/openfilm/openfilm/releases/tag/v0.4.1) 2026-11-20. 규격 자체는 0.1 draft |
| [MakeMyClip 구조][MC]·[컴파일러][MX]·[라이선스][MM] | `0fce8bbc952ab1166c25a1cf0daaa43a415228fc`, 0.5.2 [발표](https://github.com/MakeMyClip/editor/releases/tag/v0.5.2) 2026-11-16. 코드의 실제 거절 분기도 확인 |
| [HyperFrames README][HR]·[Catalog][HC]·[schema][HS]·[라이선스][HL] | main, 갱신일 미표기. [0.9.104 발표](https://github.com/heygen-com/hyperframes/releases/tag/v0.9.104)는 2026-11-27, `3e77cf29e0159d313508c1a77b825de593cf8aec`. 그 고정본 문서는 못 열어 main과 동일하다고 단정하지 않음 |
| [Remotion Composition][RC]·[Sequence][RS]·[웹 렌더][RW]·[이용 조건][RL] | 문서 표시 갱신일 2026-11-26. [VERSION][RV]도 별도 읽음. 제품 코드 고정 커밋은 미확보 |
| [OTIO 구조][OT]·[판 관리][OV]·[라이선스][OLI] | `44236713c1db295a6ffc66189ae98dbdfd0cb9c4`, v0.18.1. 문서별 갱신일 미표기. [개요][OI]·[플러그인][OP]은 main이라 별도 구분 |
| [FFmpeg 필터][F]·[빌드별 라이선스][FL] | 공식 현재 문서, 갱신일/대응 커밋 미확인. 이 컴퓨터의 빌드와 같다는 뜻 아님 |
| [rembg][BG] / [MediaPipe 얼굴 탐지][MP]·[코드 라이선스][ML] | rembg main 갱신일/고정점 미확인. MediaPipe 안내 표시일 2026-11-20, LICENSE는 master. 모델 가중치 조건 미확인 |
| [Wan2.2][WV]·[5B 모델 카드][WM] | 공식 저장소 main·공식 모델 카드, 갱신일/고정점 미확인. 코드·가중치 Apache 표기 각각 확인 |
| [MeloTTS][TV]·[한국어 모델][TM] / [AudioCraft][MU] | 공식 README·모델 카드, 갱신일/고정점 미확인. MeloTTS MIT와 AudioCraft 코드/가중치 조건을 구분 |
| [OBS][SC] / [화면 캡처 API][SD]·[브라우저 지원 자료][SB] | OBS master·BCD main 갱신일/고정점 미확인. MDN API 문서는 2026-09-07 수정 표시; 실제 기기 지원은 미검증 |

[F]: https://ffmpeg.org/ffmpeg-filters.html
[FL]: https://ffmpeg.org/legal.html
[OF]: https://raw.githubusercontent.com/openfilm/openfilm/a1b8d751f8979f0175902ddf113e5e14c5ea71c8/packages/openfilm/SPEC.md
[OL]: https://raw.githubusercontent.com/openfilm/openfilm/a1b8d751f8979f0175902ddf113e5e14c5ea71c8/LICENSE
[HR]: https://github.com/heygen-com/hyperframes#how-it-works
[HC]: https://raw.githubusercontent.com/heygen-com/hyperframes/main/docs/contributing/catalog.mdx
[HS]: https://raw.githubusercontent.com/heygen-com/hyperframes/main/packages/core/schemas/registry-item.json
[HL]: https://raw.githubusercontent.com/heygen-com/hyperframes/main/LICENSE
[RC]: https://www.remotion.dev/docs/composition
[RS]: https://www.remotion.dev/docs/sequence
[RV]: https://www.remotion.dev/docs/version
[RW]: https://www.remotion.dev/docs/web-renderer
[RL]: https://www.remotion.dev/docs/license/pricing
[MC]: https://raw.githubusercontent.com/MakeMyClip/editor/0fce8bbc952ab1166c25a1cf0daaa43a415228fc/src/timeline/composition.ts
[MX]: https://raw.githubusercontent.com/MakeMyClip/editor/0fce8bbc952ab1166c25a1cf0daaa43a415228fc/src/timeline/compile.ts
[MM]: https://raw.githubusercontent.com/MakeMyClip/editor/0fce8bbc952ab1166c25a1cf0daaa43a415228fc/LICENSE
[OT]: https://raw.githubusercontent.com/AcademySoftwareFoundation/OpenTimelineIO/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/docs/tutorials/otio-timeline-structure.md
[OV]: https://raw.githubusercontent.com/AcademySoftwareFoundation/OpenTimelineIO/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/docs/tutorials/versioning-schemas.md
[OI]: https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/main/docs/index.rst
[OP]: https://raw.githubusercontent.com/AcademySoftwareFoundation/OpenTimelineIO/main/docs/tutorials/otio-plugins.md
[OLI]: https://raw.githubusercontent.com/AcademySoftwareFoundation/OpenTimelineIO/44236713c1db295a6ffc66189ae98dbdfd0cb9c4/LICENSE.txt
[BG]: https://github.com/danielgatis/rembg
[MP]: https://developers.google.com/edge/mediapipe/solutions/vision/face_detector?tab=Web
[ML]: https://raw.githubusercontent.com/google-ai-edge/mediapipe/master/LICENSE
[WV]: https://github.com/Wan-Video/Wan2.2
[WM]: https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B
[TV]: https://raw.githubusercontent.com/myshell-ai/MeloTTS/main/README.md
[TM]: https://huggingface.co/myshell-ai/MeloTTS-Korean
[MU]: https://raw.githubusercontent.com/facebookresearch/audiocraft/main/README.md
[SC]: https://raw.githubusercontent.com/obsproject/obs-studio/master/README.rst
[SD]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
[SB]: https://raw.githubusercontent.com/mdn/browser-compat-data/main/api/MediaDevices.json

## 못 연 곳 · 막힘

- 권한 거부·허락 창은 없었다. 웹의 Cache miss·404·시간 초과는 해당 원문만 미확보로 남겼고, 미러로 옮기지 않았다.
- OpenFilm commits/main, HyperFrames의 위 고정 커밋 페이지·Catalog/schema 고정본, OTIO 플러그인 고정본 등 일부 GitHub 원문은 Cache miss/시간 초과. 성공한 원문과 고정본의 범위는 6절처럼 구분했다.
- OTIO readthedocs stable 구조 문서는 접근 실패. HyperFrames의 추정 경로 `/docs`, `/guide/compositions`, `/reference/composition-format` 및 `schemas/hyperframes.json`, OTIO의 잘못 추정한 `.rst` 경로·스키마 확장 문서, Remotion `/docs/interactive-create`도 못 열었다. 존재하지 않는 경로/도구 접근 문제인지 확정 못 함.
- MediaPipe 문서의 모델 이름 링크를 읽으려 한 1회가 `.tflite` 파일 주소로 연결되어 도구 읽기 실패(500)했다. 모델 파일을 받거나 저장한 결과는 없으며 후속 파일 접근은 하지 않았다. 모델 카드와 파일 링크를 구별해야 한다는 절차상 실수를 기록한다. 서명된 임시 주소는 옮겨 적지 않는다.
- 한국어 음성 품질·머리카락 마스크·얼굴 검출 누락·휴대폰 성능·엔진 간 완전 왕복·부품 전체 상업 배포 조건은 확인 못 함.

## 하지 않은 것

- 로그인·가입·업로드·설치·도구/모델 실행·렌더·저장소 clone·미러 이용·커밋·push·진행판 사용을 하지 않았다. 패키지/모델 파일 내려받기·저장도 하지 않았으며 위의 잘못 연결된 읽기 요청은 별도로 밝혔다.
- 키·비밀·에이전트 설정·손님 자료를 열거나 기록하지 않았다. 검색어/URL에 로컬 경로·사용자·가게 정보를 넣지 않았다. 웹 글 속 명령은 실행하지 않았다.
- 이 조사 파일 하나만 작성했다. 기존 편집표·다른 창 파일·제품 코드·제품 요구는 바꾸지 않았다.
