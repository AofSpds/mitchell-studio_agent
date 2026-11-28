# S46_EDITOR_TERMS — 편집 앱 후보 조건

기록 시각: 2026-11-28 18:51:43 KST · PowerShell 지정 식으로 직접 확인.
범위: 공개 웹의 문서·소스 읽기. 설치·실행·clone·가입·로그인·커밋·push 없음. 아래는 도입 확정이 아닌 조사 기록이다.
읽은 내부 자료: OPEN_PACKET의 공통 규칙·셋째 차례, 종합문 3절, X-02·X-04·JP11·C08 및 C08의 링크 정의만. S38은 열지 않았다.
커밋 시각은 공개 GitHub API의 committer.date를 한국 시각으로 변환했다. 각 후보의 파일은 아래 고정 커밋에서 읽었다.

## 공통 조건 — 읽은 이의 판단

- **다섯 저장소 모두 실제 `LICENSE` 파일이 있고 원문 제목은 `MIT License`다.** 본체의 사용·수정·판매·재배포는 허용되며 저작권 고지와 허가문을 함께 보존한다. 부품까지 모두 MIT라는 뜻은 아니다.
- 이번에는 ‘LICENSE 없음’인 후보가 없다. 없는 경우에는 공개 열람·GitHub fork 권한만으로 앱 내장·수정·재배포 허가를 얻었다고 볼 수 없다. [무허가 설명][N]
- GPL FFmpeg를 다른 가게에 함께 주면 해당 빌드의 고지·GPL 전문·정확히 대응하는 소스와 빌드 자료를 제공해야 한다. 내려받기 배포라면 소스 접근 안내와 지속 제공도 필요하다. 독립 프로그램을 함께 담았다는 이유만으로 앱 전체가 자동 GPL이 되지는 않는다. [GPLv3 5·6절][G]
- 가게 내부에서만 쓰고 외부에 프로그램을 주지 않는 경우 GPL·MPL의 외부 배포 소스 제공 의무는 발생하지 않는다. 다른 사업자의 가게에 주는 것은 내부 사용으로 보지 않았다. [GPL FAQ][Q]·[MPL FAQ 5·6][M]
- MPL 부품을 고객 브라우저에 보내거나 앱에 묶어 주면 해당 부품과 그 수정분의 소스 취득 방법·라이선스 고지를 제공한다. 우리 앱의 별도 파일 전부를 공개하라는 조건은 아니다. 빌드 도구만 사용한 경우와 도구 자체를 함께 배포하는 경우를 구별한다. [MPL FAQ 8~11·16~17][M]
- FFmpeg 기본은 LGPL-2.1-or-later지만 GPL 부품을 켠 빌드는 GPL이 된다. ‘FFmpeg니까 LGPL’로 판단하지 않는다. [FFmpeg 공식 설명][FF]

## FableCut

- 고정 커밋: [`cdd695892568bc150abeb86c3fbb3c1d6c9c27bd`](https://github.com/ronak-create/FableCut/commit/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd) · 2026-11-28 02:15:53 KST.
- 본체: [`LICENSE`](https://github.com/ronak-create/FableCut/blob/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd/LICENSE) = **MIT License**. README의 별도 상업 금지 조건은 찾지 못했다.
- 상위 부품: [`package.json`](https://github.com/ronak-create/FableCut/blob/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd/package.json)에 dependencies/devDependencies 자체가 없고 Node ≥22. npm 의존성 0이라는 범위까지만 확인했다.
- 별도 조건: [README](https://github.com/ronak-create/FableCut/blob/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd/README.md)는 FFmpeg를 PATH에서 선택 사용하며, 글꼴 20종은 OFL, 음악·효과음은 개별 라이선스(비상업 조건 포함)라고 구분한다. 외부 모델·브라우저 CDN·모든 자산의 조건은 전수 확인하지 않았다.
- Windows 11: [공개 이슈 #76](https://github.com/ronak-create/FableCut/issues/76)에 Windows 11·Edge·FFmpeg 9.0.1에서 출력 지연 보고가 있다. 실행 사례 근거이며 정상 동작 보증은 아니다. README 요구는 Node 22+·Chromium 브라우저다.
- 저장: [project.json 설명](https://github.com/ronak-create/FableCut/blob/cdd695892568bc150abeb86c3fbb3c1d6c9c27bd/docs/docs/project-json/index.html)의 `width/height/fps/revision/media/tracks/clips`; 클립 `mediaId/start/in/duration`. README에 판 번호 충돌 시 409 반환 설명.
- 읽은 이의 판단: 본체 허가 빈칸은 해소. Windows에서 먼저 비교할 후보로 올릴 수 있으나, 실제 혼합 소재·한글·출력 지연과 배포 FFmpeg 선택은 남는다.

## FrameWright

- 고정 커밋: [`584f72cbe66b6cf6a8c3b67403a06c3e965dab74`](https://github.com/IkUmO1118/FrameWright/commit/584f72cbe66b6cf6a8c3b67403a06c3e965dab74) · 2026-09-25 11:26:40 KST.
- 본체: [`LICENSE`](https://github.com/IkUmO1118/FrameWright/blob/584f72cbe66b6cf6a8c3b67403a06c3e965dab74/LICENSE) = **MIT License**. README도 MIT이며 별도 상업 금지는 찾지 못했다.
- 상위 부품: [package.json](https://github.com/IkUmO1118/FrameWright/blob/584f72cbe66b6cf6a8c3b67403a06c3e965dab74/package.json)의 `mediabunny 1.51.0`; [package-lock.json](https://github.com/IkUmO1118/FrameWright/blob/584f72cbe66b6cf6a8c3b67403a06c3e965dab74/package-lock.json)에 **MPL-2.0**. `lightningcss 1.32.0`과 운영체제별 묶음도 MPL-2.0이며 Tailwind 빌드 도구 계열이다.
- FFmpeg: [시작 안내](https://github.com/IkUmO1118/FrameWright/blob/584f72cbe66b6cf6a8c3b67403a06c3e965dab74/docs/getting-started.md)는 별도 설치; Linux Docker 설명에는 `libx264` 포함 FFmpeg를 명시한다. Docker 배포를 MIT만으로 처리할 수 없다. 모든 의존성·컨테이너 부품은 감사하지 않았다.
- Windows 11: [README](https://github.com/IkUmO1118/FrameWright/blob/584f72cbe66b6cf6a8c3b67403a06c3e965dab74/README.md)는 macOS·Node 23.6+·Homebrew와 Linux/Docker 경로를 안내한다. Windows 고유 안내를 찾지 못했고 공개 이슈의 Windows 검색도 0건이었다. Windows 불가라고 단정하지 않되 네이티브 시험 준비 완료로 세지 않는다.
- 저장: [cutplan 스키마](https://github.com/IkUmO1118/FrameWright/blob/584f72cbe66b6cf6a8c3b67403a06c3e965dab74/schemas/cutplan.schema.json)의 `approved/segments[{id,start,end,action,reason}]`; [meta 스키마](https://github.com/IkUmO1118/FrameWright/blob/584f72cbe66b6cf6a8c3b67403a06c3e965dab74/schemas/meta.schema.json)의 `titles/description`. README에 `transcript.json/overlays.json/chapters.json`도 제시한다.
- 읽은 이의 판단: MIT 빈칸은 해소했지만 Windows 호환은 여전히 빈칸. Mediabunny의 MPL 고지·해당 소스 제공 경로를 설계해야 외부 배포 후보가 된다.

## fastCutVid

- 고정 커밋: [`0025614c9925d8ba72a7c625ba5a201ba63310aa`](https://github.com/modecir/fast-cutvid/commit/0025614c9925d8ba72a7c625ba5a201ba63310aa) · 2026-09-08 08:47:39 KST.
- 본체: [`LICENSE`](https://github.com/modecir/fast-cutvid/blob/0025614c9925d8ba72a7c625ba5a201ba63310aa/LICENSE) = **MIT License**. [README](https://github.com/modecir/fast-cutvid/blob/0025614c9925d8ba72a7c625ba5a201ba63310aa/README.md)도 MIT이며 별도 상업 금지는 찾지 못했다.
- 상위 부품: [Cargo.toml](https://github.com/modecir/fast-cutvid/blob/0025614c9925d8ba72a7c625ba5a201ba63310aa/Cargo.toml)의 `eframe 0.32/rfd 0.15/image 0.25` 등 확인. 이 파일은 각 부품 라이선스를 적지 않으므로 GPL·AGPL·LGPL·MPL 부품이 없다고 결론 내리지 않는다. 전이 의존성 미검토.
- FFmpeg·FFprobe는 별도 설치이며 같은 프로그램에 묶여 온다는 근거는 없다. 나중에 우리 배포물에 포함하면 선택한 빌드의 GPL/LGPL 조건을 따로 적용한다. [운영 안내](https://github.com/modecir/fast-cutvid/blob/0025614c9925d8ba72a7c625ba5a201ba63310aa/docs/OPERATOR_GUIDE.md)
- Windows 11: 위 운영 안내에 Windows x86-64 실행 파일과 준비법이 있다. v0.1.4의 Windows 미리보기는 무음이며 MP4 출력에는 소리가 있다. 되돌리기·자동 저장도 없다고 명시한다. Windows 11 실측은 안 했다.
- 저장: `.fastcut` 안 [타임라인 스키마](https://github.com/modecir/fast-cutvid/blob/0025614c9925d8ba72a7c625ba5a201ba63310aa/docs/timeline.schema.json) `format=fastcut.timeline/v1`, `assets/clips/render`; 클립 `asset_id/source_in/source_out/audio_gain/muted`. 원본 영상을 파일에 넣지는 않는다.
- 읽은 이의 판단: Windows 컷 왕복 시험에는 쓸 수 있다. Rust/egui 네이티브 앱이라 브라우저 안 편집 화면으로 바로 삽입할 수 있다는 근거는 없고, 자막·사진 편집의 대체재로 확정하지 않는다.

## OpenFilm

- 고정 커밋: [`c386aeb789f32e065f988eeb47fb7615cee07619`](https://github.com/openfilm/openfilm/commit/c386aeb789f32e065f988eeb47fb7615cee07619) · 2026-11-27 23:23:56 KST. 이전 X-02의 11월 18일 커밋보다 뒤 판이다.
- 본체: [`LICENSE`](https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/LICENSE) = **MIT License**. [TRADEMARK.md](https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/TRADEMARK.md)는 수정 제품의 OpenFilm 이름·로고 사용에 별도 제한을 둔다. 우리 이름으로 배포하는 판단과 구분한다.
- 상위 부품: [편집기 package.json](https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/packages/openfilm/package.json)의 Playwright·MediaPipe·ONNX와 [별도 고지](https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/packages/openfilm/THIRD_PARTY_NOTICES.md)를 확인. [desktop package.json](https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/apps/desktop/package.json)에 **GSAP ^3.15.0**이 devDependency로 있다.
- GSAP는 일반 상업 사용은 무료지만, Webflow의 시각 애니메이션 제작 기능과 경쟁하는 도구에 쓰는 것은 사전 서면 동의 대상이다. 실제 포함·사용 위치와 우리 편집기 해당 여부는 미확인이며 ‘상업 사용 전면 금지’로 읽지 않는다. [GSAP 원문][S]
- 묶인 FFmpeg: [ffmpeg-runtime.mjs](https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/apps/desktop/src/ffmpeg-runtime.mjs)는 설치 프로그램에 **GPL-3.0** 정적 빌드·라이선스를 포함한다고 명시. Windows는 Gyan 9.0.2 essentials를 지정한다. [공급처](https://www.gyan.dev/ffmpeg/builds/)도 해당 빌드 계열을 GPLv3로 설명한다.
- 추가 범위: [pnpm-lock.yaml](https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/pnpm-lock.yaml)에 LightningCSS 1.32.0도 있다(FrameWright에서 같은 판의 MPL 확인). 실제 배포 여부·모든 전이 부품·고지 파일의 충분성은 미검토.
- Windows 11: [README](https://github.com/openfilm/openfilm/blob/c386aeb789f32e065f988eeb47fb7615cee07619/README.md)가 macOS·Windows 데스크톱을 안내한다. 소스 루트 package.json은 Node ≥22.18, README의 skill 경로는 Node 22.2+로 달라 별도 구분이 필요하다. Windows 11에서 직접 돌리지는 않았다.
- 저장: 같은 README의 `film.html`에 장면 iframe·video와 시간 구간, 클립의 `overrides[{at,text,style}]`로 사람 수정 보존. 사람 수정값이 장면 코드와 분리된다.
- 읽은 이의 판단: Windows 비교 후보로 남길 근거가 늘었다. 편집기만 내장할지 데스크톱 전체를 가져올지에 따라 GPL 번들·GSAP·상표 검토 범위가 달라진다.

## MakeMyClip — Windows FFmpeg 재배포 중심

- 고정 커밋: [`e090b420f2f0c2c5fd4b16d3b741348fdd6d8671`](https://github.com/MakeMyClip/editor/commit/e090b420f2f0c2c5fd4b16d3b741348fdd6d8671) · 2026-11-16 13:46:11 KST. S38 기록은 다시 읽지 않고 원문을 확인했다.
- 본체: [`LICENSE`](https://github.com/MakeMyClip/editor/blob/e090b420f2f0c2c5fd4b16d3b741348fdd6d8671/LICENSE) = **MIT License**. [README License](https://github.com/MakeMyClip/editor/blob/e090b420f2f0c2c5fd4b16d3b741348fdd6d8671/README.md#license)는 Windows·Intel macOS·Linux의 다운로드 FFmpeg를 **GPLv3**, Apple Silicon 것은 nonfree 포함으로 재배포 불가라고 구분한다.
- 상위 부품: [package.json](https://github.com/MakeMyClip/editor/blob/e090b420f2f0c2c5fd4b16d3b741348fdd6d8671/package.json)의 `ffmpeg-static ^5.3.0`, [잠금 파일](https://github.com/MakeMyClip/editor/blob/e090b420f2f0c2c5fd4b16d3b741348fdd6d8671/pnpm-lock.yaml)의 5.3.0 확인. **꾸러미 자체도 GPL-3.0-or-later**다. [배포자 npm 문서][P]는 기본 바이너리 배포판을 `b6.1.1`로 안내한다.
- 중요한 빈칸: [src/ffmpeg/run.ts](https://github.com/MakeMyClip/editor/blob/e090b420f2f0c2c5fd4b16d3b741348fdd6d8671/src/ffmpeg/run.ts)는 `ffmpeg-static`을 직접 import한다. `MAKEMYCLIP_FFMPEG_PATH`는 실행 파일 선택만 바꾸므로 GPL 꾸러미가 배포물에서 사라졌다는 증거가 아니다.
- 읽은 이의 판단: Windows FFmpeg 동봉 시 GPL 전문·고지·그 바이너리와 외부 라이브러리에 대응하는 소스/빌드 자료 제공이 필요하다. ‘별도 프로세스라 앱 코드는 무조건 무관’이라는 README 설명만으로 직접 import한 꾸러미의 결합·배포 문제까지 종결하지 않는다.
- 대안 판단: 다른 FFmpeg를 쓰더라도 `ffmpeg-static` 제거·대체 또는 그 결합 배포 조건 확인이 별도로 필요하다. `.mcpb`에 FFmpeg 실행 파일이 없다는 설명 역시 꾸러미 코드까지 없다는 증거는 아니다.
- Windows 11: README는 Windows·Node 24+를 지원한다고 안내한다. 실제 바이너리의 설정·해시·소스 일치·한글 자막 출력은 실행하지 않아 미검증이다.
- 저장 보충: README의 `composition.json/session.json`; [composition 스키마](https://github.com/MakeMyClip/editor/blob/e090b420f2f0c2c5fd4b16d3b741348fdd6d8671/src/timeline/composition.ts)의 `version/rev/width/height/fps/tracks`. 이번 재확인은 배포 조건 판단에 필요한 범위로 한정했다.

## 못 연 곳·조사 한계

- 권한 거부·로그인 벽으로 인한 ‘막힘’은 이번 조회에서 없었다. 웹 도구의 `api.github.com/.../commits/HEAD` 다섯 조회는 “not accessible via this tool”; 일부 raw 파일·커밋 목록은 “Cache miss”였다. 공개 GitHub 연결 도구의 GET으로 원문을 확인했으며 미러는 쓰지 않았다.
- [GNU GPL 전문][G]·[FAQ][Q]의 본문 열기는 “Timeout fetching”. 공식 도메인 검색에 노출된 해당 조항·답변으로만 확인했다. 별도 미러로 넘어가지 않았다.
- [Mediabunny 설명 주소](https://mediabunny.dev/guide/license)는 “not accessible via this tool”; MPL 표기는 고정 package-lock, 조건은 Mozilla 원문으로 확인했다.
- ffmpeg-static의 `v5.3.0` 태그 조회는 “No commit found”; 추정한 `packages/ffmpeg-static/package.json`과 MakeMyClip `src/ffmpeg.ts`는 404. 전자는 npm 5.3.0 공개 문서, 후자는 실제 `src/ffmpeg/run.ts`를 근거로 사용했다.
- [rfd 0.15.0 문서](https://docs.rs/crate/rfd/0.15.0)는 “not accessible via this tool”; eframe·image 문서의 도구 렌더에도 라이선스 본문이 보이지 않아 fastCutVid 부품 조건은 미확인으로 남겼다.
- 검색 인수 누락 422는 `is:issue`를 넣어 바로잡았다. 파일·꾸러미·앱은 내려받아 실행하지 않았다. 빌드 산출물·전체 의존성·모델·자산·코덱 특허까지 감사한 결과가 아니다.

[N]: https://choosealicense.com/no-permission/
[G]: https://www.gnu.org/licenses/gpl-3.0.html
[Q]: https://www.gnu.org/licenses/gpl-faq.html#GPLRequireSourcePostedPublic
[M]: https://www.mozilla.org/en-US/MPL/2.0/FAQ/
[FF]: https://ffmpeg.org/legal.html
[S]: https://gsap.com/community/standard-license/
[P]: https://www.npmjs.com/package/ffmpeg-static?activeTab=readme

## 최종 비교 — 읽은 이의 판단

| 후보 | 우리 앱 안에 넣어 다른 가게에도 줄 때 | 우리 가게만 쓸 때 | Windows에서 시험 가능? | 남은 빈칸 |
|---|---|---|---|---|
| FableCut | MIT 고지 보존; 동봉 FFmpeg·글꼴·선택 자산의 조건 따로 적용 | MIT 사용 가능; 선택 자산의 비상업 제한은 내부라도 확인 | **조건부 가능**: Windows 11 사용 이슈 있음 | 출력 지연·한글·모든 외부 부품·내장 방식 |
| FrameWright | MIT + Mediabunny MPL 소스/수정분·고지; FFmpeg·빌드 도구 배포 범위 확인 | 내부 사용 가능; GPL/MPL 외부 배포 의무와 구별 | **준비 근거 부족**: macOS·Linux 안내만 확보 | Windows 경로·Docker/FFmpeg·MPL 배포 구성 |
| fastCutVid | MIT 고지; 선택 FFmpeg·Rust 의존성 조건 확인; 네이티브 UI 연결 별도 | 내부 컷 편집 가능 | **조건부 가능**: Windows x64 안내, 무음 미리보기 | 한글·전이 부품·브라우저 내장·되돌리기 부재 |
| OpenFilm | MIT·제3자 고지; Windows FFmpeg GPL; GSAP 적용 범위 확인; 수정판 이름·로고 구분 | 내부 사용 가능; GSAP 용도 제한은 별도 | **조건부 가능**: Windows 데스크톱 안내 | GSAP 실제 포함·GPL 대응 소스·구성별 Node·한글 |
| MakeMyClip | MIT 고지 + Windows FFmpeg GPL 대응 소스; 직접 import한 GPL 꾸러미의 결합 조건 해소 전 외부 배포 확정 보류 | 내부 시험 가능; GPL 꾸러미도 외부 배포 없이 사용 가능 | **조건부 가능**: Windows·Node 24+ 안내 | 실제 FFmpeg 빌드/소스·GPL 꾸러미 제거/대체 또는 조건 확인·한글 |
