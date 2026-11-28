# S51_3D_VIDEO — 나중에 3D 영상을 붙이는 길

- 쓴 창: MITCHELL_STUDIO/BTSR/RSCH 보조 창 S51_3D_VIDEO.
- 기록 기준 시각: **2026-11-28 23:36:08 KST**. 의뢰서의 PowerShell 시간대 변환식으로 측정.
- 읽은 내부 글: `AGENTS.md` → 이 폴더 `OPEN_PACKET.md` 전부.
- 지정 선행 자료: `studies/2026-11-28-automation-setup-benchmark.md` **3·4절만**; `sub/s39_benchmark_setups/S39_BM_X.md` **X-02만**, `S41_BM_CN.md` **C3만**, `S43_BM_KR.md` **K08만**. 그 밖의 내부 본문은 읽지 않음.
- 아래는 공개 문서 조사와 **읽은 이의 판단**이다. 설치·성능 시험·도입 결정이 아니다. 날짜가 없는 웹 문서는 위 KST 시각에 확인한 내용이며, 원문 게시일은 **확인 못 함**. 원문이 날짜만 표시하면 시간대까지 확인한 것으로 보지 않는다.
- 고정 커밋은 재검토할 소스 좌표다. 검색 도구의 커밋 목록에 과거 캐시가 섞여 있어 **최신판 선정으로 보지 않는다**. 기능 문서와 고정 라이선스의 확인 범위를 구분했다.

## 1. 결론과 3D를 넣는 세 가지 꼴

**읽은 이의 판단:** 첫 연결은 **3D 원본 → 별도 굽기 작업 → 보통 영상 조각**이 적절하다. 첫 판 편집기는 사진·영상·자막을 유지하되, 구운 조각이 어느 장면·카메라·엔진에서 왔는지 되짚을 수 있게 한다. 이후 가벼운 Three.js 미리보기, 무거운 서버 굽기를 같은 장면 식별자로 붙인다. 근거는 Blender의 배경 렌더와 Remotion/HyperFrames의 프레임별 렌더 경로다. [Blender 명령행][Bcmd] · [Remotion 3D][R3] · [HyperFrames][Hread]

| 꼴 | 되는 근거·용도 | 편집표에 필요한 칸 — 읽은 이의 판단 | 막히는 것·드는 일 — 읽은 이의 판단 |
|---|---|---|---|
| ⓐ 먼저 영상 조각으로 굽기 | Blender `.blend`·Python → 프레임/영상; 아래 사례 A도 이 경로. [Bcmd] | 기존 영상의 `assetId`, `inFrame`, `durationFrames` + `sourceSceneId`, `cameraId`, `renderEngine`, `engineVersion`, `sourceRevision`, `renderRecipeId` | 카메라·재질 변경은 다시 굽기. **작게~중간**; 기존 영상·자막 편집을 재사용 |
| ⓑ 편집기에서 직접 그리기 | Three.js WebGL2/WebGPU; R3F를 Remotion `ThreeCanvas`에 연결. [Tgl] [Tgpu] [R3] | `kind: scene3d`, `sceneRef`, `sceneFormat`, `cameraId/parameters`, `durationFrames`, `fps`, `rendererId/version`, `params`, `seed`, `previewAssetId` | 휴대폰 GPU·메모리, 재질 호환, 로딩 완료와 프레임 재현을 확인해야 함. **크게** |
| ⓒ 서버/클라우드에서 굽기 | Blender 배경 실행 또는 브라우저 렌더를 별도 작업기로 구성 가능. Remotion은 서버 API를 문서화. [Bcmd] [R3] | ⓐ/ⓑ의 원본·카메라·길이·엔진·판 + `jobId`, `status`, `attempt`, `outputAssetId`, `recipeHash`, `workerProfile` | 대기열·취소·재시도·파일 이동·비용 관리. **중간~크게**; 서버라고 GPU가 있는 것은 아님 |

- ⓐ와 ⓒ는 배타적이지 않다. ⓒ에서 만든 조각을 ⓐ로 받으면 휴대폰도 기존 영상 미리보기를 이용할 수 있다는 **읽은 이의 판단**이다.
- 움직임은 현재 프레임의 함수로 만들 필요가 있다. Remotion은 `useCurrentFrame()`으로 R3F 장면을 구동하고, HyperFrames는 탐색 가능한 애니메이션 어댑터를 쓴다. 벽시계·임의 난수·누적 물리 계산만으로 재생하면 임의 위치 이동과 다시 굽기가 달라질 수 있다는 **읽은 이의 판단**이다. [R3] [Hread]
- WebGPURenderer의 WebGL2 대체 경로가 모든 장면의 동일 결과를 보장하지는 않는다. 지원 불가 기기는 구운 미리보기로 돌리는 쪽을 권한다(**읽은 이의 판단**). [Tgpu]

## 2. 엔진·연결 도구와 앱에 넣을 때의 조건

| 후보 | 고정 소스 좌표·확인 범위 | 기능·Windows·GPU | 앱 포함 / 별도 프로그램 호출 |
|---|---|---|---|
| Blender | [38b62279b884baac032b8dec3cdd93bc00cd2cdf][Bpin]; 공식 저장소 검색 색인에서 좌표·GPLv3 확인, 본문은 못 엶 | `--background`와 Python 실행·프레임 렌더. Windows 안내 있음. Cycles는 CPU 또는 지원 GPU 사용; CUDA/OptiX/HIP/oneAPI/Metal은 기기·OS 조건이 다름. [Bcmd] [Bgpu] | 배포 바이너리는 **GPL-3.0-or-later**; 코드 결합·공개 `bpy` 스크립트와 외부 자료 전달형 호출을 구분. 아래 설명 참조. [Blic] [Bfaq] |
| Three.js | [a09daaefa77dcbf83a685d399ae062b62afef076][Tpin]; 커밋 목록에서 좌표 확인, 고정 LICENSE는 cache miss; 현재 저장소 MIT 표시는 확인 | 브라우저용. WebGLRenderer는 WebGL2 필수(r163부터 WebGL1 제외); WebGPU는 지원 브라우저에서 사용, 아니면 WebGL2 대체. Windows에서도 브라우저·드라이버 기능 확인 필요. [Tread] [Tgl] [Tgpu] | **MIT**. 포함 배포 시 저작권·허가문 보존. 별도 프로세스 여부가 MIT 조건을 없애지는 않음; 모델·텍스처는 별도 |
| React Three Fiber | [ff3899dbf43d2a88895fecf53c147192abfd7431의 LICENSE][Fpin] 본문 확인 | Three.js의 React 렌더러. React와 R3F 주 버전 짝을 맞춤; GPU 조건은 실제 Three.js 렌더 경로에 따름. [Fread] | **MIT**; 앱에 넣을 수 있고 배포 고지 보존. 별도 호출보다 브라우저 구성요소로 쓰는 도구 |
| Remotion + `@remotion/three` | [0e67e49ef6c9d402502a3489a5fdd338b222f6a3][Rpin]; 커밋 확인. 기능 문서는 **2026-11-26 갱신** | `ThreeCanvas`/`ThreeWebGPUCanvas`; 서버 Three.js 렌더는 `gl: angle` 안내. 헤드리스 GPU 비활성으로 느려질 수 있음. **Lambda에는 GPU 없음**. 이 조사에서 최신 Windows 요구 문서 전문은 확인 못 함. [R3] [Rgpu] | MIT가 아닌 **Remotion License**. 개인·3인 이하 회사 무료 범주와 유료 Company/Automators 조건 존재; 앱 내장·외부 호출 모두 자격 검토 필요. [Rlic] [Rterms] |
| HyperFrames | [51a88b95660c5f67e66e9c5977226f6ae7b31255의 LICENSE][Hpin] 본문 확인 | Three.js/사용자 어댑터 → headless Chrome 프레임 캡처 → FFmpeg. 현재 README에 Windows Studio·로컬/Docker·Lambda 경로 명시; 3D GPU 실행은 별도 검증. [Hread] | **Apache-2.0**. 배포 시 LICENSE·관련 고지·존재하는 NOTICE 보존, 수정 파일 변경 표시. FFmpeg·추가 애니메이션 부품 조건까지 자동 해결되는 것은 아님 |
| MCP for Blender(옛 blender-mcp) | [2e4b0bc294694b1570d76ed01be657c22e6d02a0][Mpin]; 커밋 확인, 고정 LICENSE 시간초과; 현재 README·LICENSE의 MIT 확인 | 에이전트 ↔ Python MCP 서버 ↔ Blender 애드온 소켓. Python으로 모델·카메라·애니메이션을 만들고 여러 시점/프레임으로 확인. Blender 3.0+, Python 3.10+, Windows 안내. [Mread] [Mlic] | 연결 코드 **MIT** 표시와 Blender `bpy` 애드온의 배포 조건을 함께 검토. 생성 서비스·외부 에셋의 상업 조건은 이 연결 도구가 허가해 주지 않음 |

- **Blender를 우리 앱에 넣는 경우:** 바이너리/수정본을 함께 배포하면 GPL 고지와 해당 소스 제공 의무를 챙긴다. `bpy`를 쓰는 공개 애드온·스크립트는 Blender 공식 FAQ가 GPL 배포를 요구한다. 렌더 영상·일반 `.blend` 자료 자체에 GPL이 자동 적용되지는 않는다. [Blic] [Bfaq]
- **Blender를 별도 프로그램으로 부르는 경우:** 공식 FAQ는 Blender 코드/API를 포함하지 않는 외부 프로그램이 자료를 만들고 Blender를 실행해 처리시키는 구조를 구분한다. 내부용 굽기 작업기, 외부 앱, 배포하는 `bpy` 스크립트를 각각 나누어 판단해야 한다. 단순히 소켓/프로세스를 나눴다는 이유만으로 결합 문제가 모두 해결되는 것은 아니라는 FSF 설명도 있다. [Bfaq] [Gfaq]
- **읽은 이의 판단:** 앱은 중립 장면 자료와 작업 요청을 보내고, Blender 전용 `bpy` 어댑터는 별도 부품으로 관리한다. GPL 코드나 모델 가중치를 첫 판 웹 앱에 묶지 않아도 이 경로는 설계할 수 있다. 이것은 배포 승인이나 개별 법률 판단이 아니다.
- Remotion 약관은 매개값 편집형 서비스·서비스가 AI로 만든 코드의 렌더를 허용하지만, **이용자가 자기 Remotion 코드를 올리는 렌더 서비스에는 사전 서면 허락**을 요구한다. 코드 내보내기에는 라이선스 안내도 요구한다. 고정 커밋의 과거 조건으로 현재 서비스 조건을 대신하지 않는다. [Rterms]

## 3. 휴대폰 사진·영상에서 3D로

| 공개 후보 | 고정 커밋·라이선스 | 자료 흐름·실행 조건 |
|---|---|---|
| COLMAP(사진측량) | [2d2f00a9fae7db7e2ed8f027a67e8f8576dfd214][Cpin]; 고정 COPYING 못 엶, 현재 README의 **BSD-3-Clause** 본문 확인. 포함 의존성은 별도 [Cread] | 여러 각도의 겹치는 사진 → 카메라 위치·희소점 → 조밀점/메시. Windows GUI/CLI 제공, Windows 빌드 안내는 CUDA 11 이상·VS2019 이상 권장. 모든 단계가 GPU 필수라는 뜻은 아님. [Ctut] [Cinstall] |
| gsplat(가우시안 스플랫) | [28e794ca44a4c25ffc39175370c5ee7b38bfcc36의 LICENSE][Gpin] **Apache-2.0** 본문 확인 | COLMAP 캡처로 학습하는 예제와 렌더 예제. PyTorch·CUDA 경로; Windows용 조합별 wheel/빌드 문서 있음. 휴대폰에서 학습한다는 근거는 없음. [Gread] |

- **읽은 이의 판단:** 휴대폰은 촬영 입력, 복원은 PC/서버 작업으로 분리한다. 영상은 겹치는 프레임을 골라 사진 입력으로 만든다. COLMAP은 영상 프레임 수를 줄이고, 같은 자리 회전만 하지 말고 시점을 옮겨 찍도록 안내한다. 무늬·비슷한 조명·시야 겹침이 중요하며 반짝이는 표면을 피하라고 한다. [Ctut]
- 스플랫은 새로운 시점의 외관 재생, 메시는 표면·재질 편집에 각각 쓸 후보라는 **읽은 이의 판단**이다. `sceneFormat`을 `mesh`와 `gaussian-splat`으로 구별하고, 같은 `.ply` 확장자만 보고 자료 종류를 결정하지 않는다. [Cread] [Gread]
- 휴대폰 입력의 상용 비교 기준: Polycam은 Web/iOS 기존 사진·영상 업로드와 iOS/Android Object Mode 캡처를 구분하고, 클라우드 처리·요금제별 스플랫 조건을 안내한다. **공개 소스 내장 후보가 아니며**, 이 조사에서는 사용·업로드·상업 약관 판정까지 하지 않음. [Pcapture]
- **미용·가게 사례 있음, 범위 제한:** [폐미용실 스플랫 제작자의 원문][Salon]은 사진 **900장 이상**, 격자식 촬영, Postshot 처리를 명시한다. 게시 화면은 ‘2년 전’만 표시해 정확한 게시일은 **확인 못 함**. 휴대폰 사용·영업 중 홍보영상·매출 효과·상업 재사용 허락은 확인 못 함. 손님 머리 모양을 정확히 복원한 실사용 사례도 이번 범위에서 확인 못 함.
- **읽은 이의 판단:** 가게는 거울·유리·금속·움직이는 인물이 장애 후보다. 고정 소품/비어 있는 공간으로 먼저 시험하고, 반사·움직임이 있는 부분의 찌그러짐을 확인한다. Polycam도 움직이는 대상을 두 복원 모드의 부적합 대상으로 표시한다. [Ctut] [Pobject]

## 4. AI 3D 생성 — 이름·조건만

| 후보 | 고정 자료·상업 이용 조건 | 로컬/클라우드·Windows/GPU |
|---|---|---|
| TRELLIS.2(이미지→3D/PBR) | [75fbf0183001ed9876c8dbb35de6b68552ee08bd의 LICENSE][A1pin] **MIT**. README는 모델과 코드를 MIT라고 명시하지만 `nvdiffrast`·`nvdiffrec` 별도 조건도 명시. **의존성까지 상업 사용 가능 판정은 못 함**. [A1read] | 로컬/자체 클라우드. 공식 검증은 Linux, NVIDIA **24GB 이상**, CUDA 12.4 권장. Windows 네이티브는 확인 못 함 |
| Stable Fast 3D(한 장→GLB) | [ff21fc491b4dc5314bf6734c7c0dabd86b5f5bb2의 LICENSE.md][A2pin] **Stability AI Community License**. 상업 사용 등록, 제품/서비스 제공 시 약관·Notice·Powered by Stability AI 표시 조건. 연매출 경계는 현재 안내의 **100만 달러 미만** 무료 범주로 보수적으로 구분; 이상은 Enterprise 확인. [A2license] | 로컬 CPU 지원, 기본 단일 이미지 GPU 약 **6GB VRAM**. Windows는 실험적(VS2022·PyTorch/CUDA). 가중치 접근은 Hugging Face 승인·로그인 필요하다고 명시; 접근하지 않음. [A2read] |
| Hunyuan3D-2.1 | [82920d643c0dc2f7bfd7255f45f62d386edfe60c의 LICENSE][A3pin] **Tencent Hunyuan 3D 2.1 Community License**, 원문 출시일 2025-06-13. **한국·EU·영국 제외**를 본문 확인 | 공개 가중치/코드의 로컬·자체 서버 사용은 해당 약관 대상. Windows/GPU 상세 요구는 확인 못 함. **읽은 이의 판단:** 한국 적용 허락이 없어 도입 후보에서 보류. 별도 상용 API 계약까지 이 라이선스로 단정하지 않음 |
| Meshy(텍스트/이미지→3D 서비스) | [이용약관][MeshyTerms]·[상업 이용 안내][MeshyUse](원문 날짜 2026-08-27). 무료 출력 **CC BY 4.0·표시 필요**, 유료는 입력 권리와 공개 여부 조건 아래 사적 소유 안내 | 클라우드 서비스; 가중치 로컬 제공은 확인 못 함. 공개 웹/서비스 API와 앱 소스 내장 허가는 다름. 이번에 계정·호출·결제 없음 |

**읽은 이의 판단:** 생성 3D는 촬영 대상의 사실 복원과 분리한다. 제품·가게를 실제처럼 보여야 하면 원본 대조가 필요하다. 코드 라이선스, 모델 가중치, 의존 라이브러리, 입력 에셋, 출력의 권리를 각각 기록해야 한다. MIT 연결 도구를 써도 생성 서비스의 지역·매출 조건이 바뀌지 않는다. [A1read] [A2pin] [A3pin] [MeshyTerms]

## 5. 남들의 공개 세팅 — 카드 셋

### A. OpenFilm 소개 작품 — 선행 카드 X-02 인계
- 원문·날짜·종류: [제작 README 고정본][OFmake], 내부 카드 기록은 2026-10-10 20:18 KST 갱신; 만든 사람. 이번 웹 재열람은 cache miss라 **내부 검증 인계**로만 사용.
- 입력·산출·차례: 대본/박자표 → Blender 3D·앱 녹화 → 장면 HTML → `film.html` → Studio 수정 → 1분 42초 MP4. 장면 원본·프레임 재시도 장치가 공개됐다고 카드에 기록.
- 사람 수정·자리·값·한계: macOS/Metal 사례; Studio에서 수정. 총 제작비·성공률 확인 못 함. 소개 영상의 에이전트 채팅은 대본 시연이며 실제 모델을 부르지 않았다는 기록. 자율 자동화 성공 근거로 세지 않음.
- **읽은 이의 판단:** 3D를 먼저 영상 자산으로 만드는 경계와 사람 수정값 분리를 참고. CN C3·KR K08은 받은 카드에 생성 영상/그림 흐름만 있어 실제 3D 장면 편집·렌더 사례로 추가 집계하지 않음.

### B. 코드만으로 15초 Blender 애니메이션 — 공개 절차
- [제작 절차 원문][CaseB], 원문 날짜 **2026-10-21**; 제작 안내자. Python 장면·UI 위치 JSON·착지 프레임 JSON·음향 → Blender 배경 프레임 렌더 → FFmpeg MP4. Windows용 배치 파일까지 요구하는 예시 요청을 공개.
- 수정·자리·값·한계: 색·박자·카메라를 코드로 고치고 일부 프레임/반해상도로 확인. 로컬 GPU에 따라 시간 변동; 총비용·실제 성공률·완성 소스 커밋은 확인 못 함. **재현 절차의 공개이지 무검수 한 번 성공의 증거는 아님**.
- **읽은 이의 판단:** 첫 시험에 필요한 원본·프레임·메타데이터·저화질 검토 경계를 보여 준다. 이 글의 모델명·가격 정보는 별도 검증하지 않아 채택하지 않음.

### C. Blender MCP + Claude Code + HyperFrames — 제작자 영상 설명
- [원문 영상][CaseC], 공개 검색의 원문 날짜 **2026-07-18**; 직접 작업 시연자·유료 커뮤니티 안내 있음. 설명에 4시간 실험, Blender MCP로 장면 구성, 외부 모델, 후속 요청으로 카메라/기하 수정, HyperFrames로 15초 영상이라는 흐름을 기재.
- 중간 자료·수정·값·한계: 장면 파일 규격·전체 소스·고정 커밋·실제 렌더 시간·총비용 확인 못 함. 원문 페이지는 본문 없이 열려 **검색에 잡힌 제작자 설명까지만 확인**, 영상 재생/화면 검증 없음. 4시간을 한 편의 렌더 시간으로 쓰지 않음.
- **읽은 이의 판단:** 자동 생성 후 카메라·기하 수정이 남는 사례로 참고하며, Three.js/Blender 장면이 HyperFrames에 어떤 형식으로 전달됐는지는 확정하지 않음.

## 6. 나중에 붙이려면 지금 해 둘 것 — 모두 읽은 이의 판단

| 지금 준비할 경계/칸 | 까닭·나중에 붙일 부품 |
|---|---|
| 편집용 조각 ID와 원본 `sourceSceneId` 분리 | 구운 영상·낮은 해상도 미리보기·3D 원본을 교체해도 자막/사용자 수정이 남도록 함 |
| `schemaVersion`, `sourceRevision`, `rendererId`, `rendererVersion`, `recipeHash` | 엔진/소스 변경 때 이전 결과와 새 결과를 구분. 미리보기 캐시도 같은 키로 무효화 |
| `sceneRef`, `sceneFormat`, `assetRefs` | `.blend`, GLB/glTF, 장면 코드, 스플랫을 하나의 확장자나 영상 경로에 억지로 넣지 않음. 첫 판은 선택적 원본 메타데이터까지만 |
| `cameraId`, 카메라 매개값/키프레임, `params`, `seed` | 사람은 카메라·색·글자 등 허용한 값만 고치고, 장면 재생성 때 수정값을 따로 보존 |
| 정수 프레임 길이·`fps`·해상도·화면비·색공간·알파 방식 | 3D 렌더와 편집 시간선의 길이/합성이 맞도록 함. 카메라 움직임도 프레임으로 탐색 |
| 미리보기/최종 출력 분리, `capabilities`, 대체 영상 | 휴대폰·GPU 없는 기기에서 작은 고침과 미리보기를 계속할 수 있게 함 |
| `renderJob` 비동기 상태·취소·재시도·출력 검증 | 브라우저 편집 세션과 긴 렌더 수명을 분리. 실패한 프레임을 다시 만들고 완성 전 자료를 최종으로 표시하지 않음 |
| 에셋/모델별 `licenseRef`, 출처, 판, 허용 지역, 고지 | 엔진의 허용 조건과 에셋·가중치 조건을 함께 추적. 비밀 키 자체는 편집표에 넣지 않음 |
| 편집기 ↔ 중립 편집표 ↔ 엔진별 어댑터 ↔ 작업기 | Blender/Three.js를 교체해도 기존 사진·영상 경로가 지속되게 함. 생성 코드는 브라우저의 임의 코드 실행 칸으로 직접 받지 않음 |

이 표는 기존 T02b 스키마를 직접 읽고 낸 변경안이 아니다(이번 지정 읽기 범위 밖). S52가 기존 칸과 대조할 제안이며, 첫 판에 3D 편집 UI·모델 생성·스캔 학습까지 구현하자는 뜻은 아니다.

## 7. 첫 시험 후보와 이 컴퓨터에서 확인할 것

1. **첫 시험 — 읽은 이의 판단:** 외부 에셋 없이 기본 도형 소품을 5초 회전시키는 Blender 장면. 540×960·30fps·150프레임으로 먼저 굽고, 일반 영상 조각 + 한글 자막으로 넣는다. 카메라 한 값 변경 후 해당 조각만 다시 만들고 자막·길이 유지, 시작/중간/끝 프레임, 색·검은 프레임을 확인. 수치는 시험 제안이지 성능 측정값이 아니다.
2. **둘째 후보 — 읽은 이의 판단:** 같은 장면을 Three.js로 만들어 프레임 0→90→30 이동과 순차 렌더를 비교한다. Remotion/R3F 또는 HyperFrames 중 기존 편집기와 맞는 하나만 붙이고 휴대폰은 구운 미리보기와 직접 그리기를 비교한다.
3. **셋째 후보 — 읽은 이의 판단:** 인물 없는 고정 소품 사진 → COLMAP → gsplat. 정합 실패·거울 반사·빈 부분·새 시점 품질과 처리시간/최대 메모리를 잰 뒤 빈 공간으로 넓힌다. AI 이미지→3D는 별도 시험이며 먼저 위 라이선스 빈칸을 닫는다.
4. **이 컴퓨터 적합성은 확인 못 함:** OS 세부판·CPU/RAM·GPU 모델/VRAM·드라이버, Blender/Node/Python/FFmpeg 유무와 판, 브라우저 WebGL2/WebGPU·헤드리스 GPU를 아직 조사/실행하지 않음. 공개 요구표만으로 동작을 단정할 수 없음.
5. **다음 실행 단계에 필요한 것:** 하드웨어/설치 상태 읽기, 필요한 프로그램·의존성 내려받기/설치, 격리된 시험 폴더에서 실행할 **별도 허락**. MCP를 택하면 애드온·연결/설정 변경 허락도 필요. 클라우드 모델/굽기는 계정·자료 전송·비용 승인이 따로 필요하나 이번에 요청하거나 진행하지 않음. 이는 의뢰서의 공개 읽기 한정에 따른 다음 단계 조건이다.

## 원문 주소 묶음

[Bpin]: https://projects.blender.org/blender/blender/src/commit/38b62279b884baac032b8dec3cdd93bc00cd2cdf
[Bcmd]: https://docs.blender.org/manual/en/latest/advanced/command_line/render.html
[Bgpu]: https://projects.blender.org/blender/blender-manual/src/commit/910d343046bb7112dc5515639f155c84730d0cfa/manual/render/cycles/gpu_rendering.rst
[Blic]: https://www.blender.org/about/license/
[Bfaq]: https://www.blender.org/support/faq/
[Gfaq]: https://www.gnu.org/licenses/gpl-faq.html#MereAggregation
[Tpin]: https://github.com/mrdoob/three.js/commit/a09daaefa77dcbf83a685d399ae062b62afef076
[Tread]: https://github.com/mrdoob/three.js
[Tgl]: https://threejs.org/docs/pages/WebGLRenderer.html
[Tgpu]: https://threejs.org/docs/pages/WebGPURenderer.html
[Fpin]: https://github.com/pmndrs/react-three-fiber/blob/ff3899dbf43d2a88895fecf53c147192abfd7431/LICENSE
[Fread]: https://github.com/pmndrs/react-three-fiber
[Rpin]: https://github.com/remotion-dev/remotion/commit/0e67e49ef6c9d402502a3489a5fdd338b222f6a3
[R3]: https://www.remotion.dev/docs/three
[Rgpu]: https://www.remotion.dev/docs/gpu
[Rlic]: https://www.remotion.dev/pricing
[Rterms]: https://www.remotion.dev/docs/terms
[Hpin]: https://github.com/heygen-com/hyperframes/blob/51a88b95660c5f67e66e9c5977226f6ae7b31255/LICENSE
[Hread]: https://github.com/heygen-com/hyperframes
[Mpin]: https://github.com/ahujasid/mcp-for-blender/commit/2e4b0bc294694b1570d76ed01be657c22e6d02a0
[Mread]: https://github.com/ahujasid/mcp-for-blender
[Mlic]: https://github.com/ahujasid/blender-mcp/blob/main/LICENSE
[Cpin]: https://github.com/colmap/colmap/commit/2d2f00a9fae7db7e2ed8f027a67e8f8576dfd214
[Cread]: https://github.com/colmap/colmap
[Ctut]: https://colmap.github.io/tutorial.html?highlight=sift
[Cinstall]: https://colmap.github.io/install.html
[Gpin]: https://github.com/nerfstudio-project/gsplat/blob/28e794ca44a4c25ffc39175370c5ee7b38bfcc36/LICENSE
[Gread]: https://github.com/nerfstudio-project/gsplat
[Pcapture]: https://learn.poly.cam/hc/en-us/articles/30549121659412-How-to-Create-Photogrammetry-and-Gaussian-splats-from-Existing-Images-and-Videos-on-Mobile-and-Web
[Pobject]: https://learn.poly.cam/hc/en-us/articles/27425185907348-How-to-Use-Object-Mode
[Salon]: https://www.reddit.com/r/GaussianSplatting/comments/1fj3nnv/abandoned_coiffeur_shop_gaussian_splatting/
[A1pin]: https://github.com/microsoft/TRELLIS.2/blob/75fbf0183001ed9876c8dbb35de6b68552ee08bd/LICENSE
[A1read]: https://github.com/microsoft/TRELLIS.2
[A2pin]: https://github.com/Stability-AI/stable-fast-3d/blob/ff21fc491b4dc5314bf6734c7c0dabd86b5f5bb2/LICENSE.md
[A2license]: https://stability.ai/license
[A2read]: https://github.com/Stability-AI/stable-fast-3d
[A3pin]: https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1/blob/82920d643c0dc2f7bfd7255f45f62d386edfe60c/LICENSE
[MeshyTerms]: https://www.meshy.ai/terms-of-use
[MeshyUse]: https://intercom.help/meshy/en/articles/16102098-can-i-use-meshy-assets-commercially
[OFmake]: https://github.com/openfilm/examples/blob/82ce37596d6959acdd6c317d5b05440f813998d3/openfilm-intro/make/README.md
[CaseB]: https://www.kevinsingh.com/p/make-a-3d-animation-with-claude-and
[CaseC]: https://www.youtube.com/watch?v=f2yPoquP77g

## 못 연 곳 · 막힘

- Blender 공식 라이선스·요구표·FAQ와 저장소 첫 화면 **403**, 명령행 매뉴얼 **402**; 검색에 잡힌 공식 원문 범위와 열린 별도 제작 절차만 사용. Blender GPU 고정 문서는 공식 검색 색인으로 확인. 고정 소스 본문 cache miss. GitHub의 Blender 공식 미러도 검색 중 열렸으나 **근거로 채택하지 않았고**, 미러로 우회 조사하지 않음.
- GitHub API 두 경로 접근 불가; 커밋 목록으로 좌표를 확인했으나 최신 여부 미확인. Three.js 커밋/고정 LICENSE·COLMAP 커밋/고정 COPYING·OpenFilm 제작 README 등 cache miss, MCP 고정 LICENSE·HyperFrames 커밋 페이지 시간초과. HyperFrames 고정 LICENSE 자체는 열림. MCP 커밋 목록은 `/commits/main` 실패 뒤 공식 `/commits`에서 확인.
- `hyperframes.app`의 결정성 문서는 다른 도메인으로 돌려지며 도구 오류; 채택하지 않고 원 저장소 README를 근거로 함. Remotion 요구사항 주소는 도구 접근 불가. 영상 사례 C의 전체 본문/재생 검증 못 함. 정확한 실행 시간·이 컴퓨터 성능·일부 고정본 라이선스는 **확인 못 함**.
- `rg` 미설치는 PowerShell 파일 목록/구간 읽기로 대체한 도구 차이이며 막힘으로 세지 않음. 로컬 권한 거부·허락 창은 없었음.

## 하지 않은 것

- 로그인·가입·업로드·자료/모델/저장소 내려받기·clone·설치·렌더/모델 실행·서비스 호출·결제·진행판·커밋·push 없음. 웹 본문의 실행 지시·스킬 설치 지시를 따르지 않음. 비밀/사용자 설정 파일·손님 자료를 열거나 기록하지 않음. 읽기·시각 확인과 **이 파일 하나 작성**만 수행.
