---
item: BTSR-RSCH-001_opencut-test-code
stage: 반환
written_role: MITCHELL_STUDIO/BTSR/PMO (PRIMARY — Paseo f3cf6938, Claude Opus 5.5 high)
recorded_at: 2026-11-20 14:22 KST (PowerShell 확인)
requester: MITCHELL_STUDIO/BTSR/RSCH (Paseo 7993ff28)
request: main projects/btsr/roles/rsch/requests/BTSR-RSCH-001_opencut-test-code/요청.md (main 8723a4f)
---

# BTSR-RSCH-001_opencut-test-code — 반환

## 1. 결과

**C1 ~ C5를 짰고, 이 PC(윈도 · Chrome 157)에서 화면 없는 Chrome으로 C1 → C3 → C4 → C2 한 바퀴가 돎. 맥에서 볼 것만 남음.**

| # | 받아들임 기준(요청서) | 이 PC에서 본 것 | 남은 것 |
|---|---|---|---|
| C1 변환 | S4 Q5 최소 예와 같은 꼴 · 정수 틱 · 4,000 배수 · 불변식 · `muted` · 1080×1920 · 30fps · `\n` | **맞음.** 영상 0/960000 · trim 120000/120000 · 원본 1200000, 사진 배율 1.3333, 목소리 24000/744000/36000/48000 @1.5, 음악 trimEnd 2160000 — 최소 예와 같은 값. 자체 시험 6/6 | `sourceDuration`·`trimEnd`는 원본 파일 길이를 따라 4,000의 배수가 아닐 수 있음(옛 판도 그렇게 넣음). 글자 모양 값은 시안 |
| C2 되받기 | 손으로 고친 곳만 정확히 · 나눈 조각은 대응표로 | **맞음.** 6곳 고침 → 6곳만, 나눔 → '나뉨'으로 대응, fps 60 → 설정 바뀜. **옛 판에 들여오고 편집기 길로 열고 저장한 뒤 꺼낸 JSON과 견주면 바뀐 곳 0** | 사람이 옛 판 화면에서 실제로 고치고 나눈 것은 못 봄(맥) — 나눌 때 id가 어떻게 생기는지 |
| C3 들여오기 | 맥 Chrome에서 목록에 뜨고 열림 · 소재가 조용히 빠지지 않음 | **이 PC 화면 없는 Chrome에서:** 목록에 뜸 · 편집기가 여는 길(`EditorCore.project.loadProject`)로 열림 · 조각 9 · 소재 4/4 · 1080×1920 @30 · 썸네일이 저절로 생김. 소재가 빠지면 쓰지 않고 멈춤(코드) | **맥 Chrome 화면에서** 목록 · 편집기 화면 열림 (MAC_RUN 3번) |
| C4 뽑기 | h264 High · 1080×1920 · 30/1 · aac · 44100 · 2ch · Opus면 멈춤 · 30fps 옵션 · 걸린 시간 | **맞음**(ffprobe 대신 MP4 상자를 읽어 봄 — 아래 '배운 것'). 12초 → 뽑기 2.6초 · 전체 4.6초, GPU 켜짐, AAC 됨. 레벨은 **4.1**(S4가 셈한 4.0과 다름) | **맥에서** 화면 없이 / 창 띄운 채 둘 다 · ffprobe 확인 · 걸린 시간. Opus 멈춤은 이 PC가 AAC를 받아 **실제로 일으켜 보지 못함**(코드로만) |
| C5 포크 고침 | 미리보기와 뽑은 파일에 테두리 · 한글 글꼴이 같게 | **뽑은 파일에서** 자막 검은 테두리 · 굵은 한글(Noto Sans KR 묶음) 보임(evidence/07_frames.png). 소리: 영상 원래 소리 꺼짐 · 목소리 0~6초 · 음악 −28dB(evidence/08_audio.json) | **미리보기 화면과 견주기**(맥). 60fps 소재가 fps를 못 올리는지는 코드로만 |

## 2. 증거

- **코드**
  - 제품 저장소 `AofSpds/mitchell-studio` 가지 `test/opencut-classic-20261120` (main 0636fa0에서): `ee3e647`(C1 · C2) → **`c2d21a6`**(C3 · C4 · C5 · 맥 순서). 폴더 `app/opencut-test/`만. main에 합치지 않음.
  - 포크: `opencut-app/opencut-classic` **cf5e79e** 위 커밋 `0457760`(14파일, 이 PC 로컬 — 바깥에 안 올림). 같은 내용을 `app/opencut-test/fork/opencut-classic-cf5e79e-mitchell.patch`로 넣음. 깨끗한 cf5e79e에 `git apply --check` 통과 · 얹은 뒤 14파일이 포크 커밋과 같음(줄끝 빼고 비교).
- **시험 — 코드 `c2d21a6` + 포크 `0457760`으로 돌림** (2026-11-20 14:1x KST, 이 PC 윈도 · Node 24.22.0 · Bun 1.2.18 · Chrome 157.0.8103.80 · `bun run dev`(Next 16.2.4) 127.0.0.1:3417). 출력 원본은 [evidence/](evidence/):
  - `01_selftest.txt` — `node --test app/opencut-test/tests/convert_diff.test.mjs` → pass 6 · fail 0
  - `02_fixture.json` — 가짜 영상(ffmpeg 대신 `/mitchell/fixture`) h264 High · 1080×1920 · 30/1 · aac 44100 2ch
  - `03_convert.json` — C1: checks [] · 조각 9 · 소재 4
  - `04_render_headless.json` — C4: `--headless=new --enable-gpu`, ok · problems [] · exportMs 2619 · wall 4633 · gpuAvailable true · `avc1.640028` 1080×1920@30 지원 · AAC 44100/2 지원
  - `05_import.json` — C3: listed · 열림 · 조각 9 · 소재 4/4 · thumbnailMade
  - `06_diff_roundtrip.txt` — C2: 들여와 열고 저장한 뒤 꺼낸 것과 C1 출력 → 바뀐 곳 0
  - `07_frames.png` — 0.5 · 3 · 6 · 9 · 11.5초. 프레임 번호 45 · 120 · 210(= trimStart 1초가 맞음), 사진 채우기, 자막 테두리 · 줄바꿈, 'AI 합성' 표시, 끝 문구
  - `08_audio.json` — 1초마다 세기(dBFS): 440Hz(영상 원래 소리) −70~−99 · 220Hz(목소리) 0~6초 −18~−25 뒤로 −115 · 330Hz(음악) −28(원본 −16.5 + −12)
- **이 PC에 둔 것(git 밖):** 작업 폴더 `C:\Users\ms1pk\dev\btsr-pmo-work\` — `opencut-classic/`(포크 사본, `.env.local`은 예시 값 그대로) · `mitchell-studio/`(제품 저장소 새 사본) · `tools/bun-1.2.18/` · `evidence-c2d21a6/`(mp4 포함 원출력). 홈의 Bun 1.4.4와 제품 저장소 원래 사본(`dev\mitchell-studio`, main 0636fa0)은 건드리지 않음. 개발 서버 하나가 127.0.0.1:3417에 떠 있음.

## 3. 바뀐 것

- 제품 저장소 새 가지 하나(`app/opencut-test/` 13파일). 웹앱 · 캡컷 길 · `data/`는 안 건드림.
- 이 PC: Bun 1.2.18을 작업 폴더에만, 옛 판 사본 하나 + `bun install`(꾸러미 966), 글꼴 파일 하나(Noto Sans KR 가변, OFL, sha256 194018e6…e252).
- 에이전트 저장소 `btsr/pmo` 가지: PMO CURRENT · INDEX · 이 기록.

## 4. 남은 것

1. **맥에서 돌리기** — [`app/opencut-test/MAC_RUN.md`](https://github.com/AofSpds/mitchell-studio/blob/test/opencut-classic-20261120/app/opencut-test/MAC_RUN.md) (준비물 · 명령 줄 · 볼 것 · 적을 칸). RSCH가 순서서로 옮김. 맥에 이 가지를 받는 길은 RSCH가 정함(비공개 저장소).
2. **C4 꼴 마무리** — 오늘 밤 T0 · T2 결과로 '화면 없이 / 창을 띄운 채'를 고름. `render.mjs`는 둘 다 됨(`--headed`).
3. **글자 모양 값** — `convert.mjs`의 `STYLE`(크기 · 자리 · 테두리 굵기)은 시안. T8(1025 값) · 시험 4(나란히)로 맞춤. 끝 문구 기본 줄바꿈도 시안('예약은 네이버에서\n검색하세요').
4. **확인 못 한 것** — Opus 멈춤을 실제로 일으키기 · 60fps 소재를 화면에서 넣어 fps가 30에 머무는지 · 옛 판 화면에서 조각을 나눌 때의 id · 회전 정보가 있는 영상(아이폰 원본)의 채우기 배율 · `bun run build`(개발 서버를 같은 폴더에서 돌리고 있어 안 함. 타입 검사에서 옛 판 원래 오류 41건 — `migrations/runner.ts` 인자 수 등, S4 Q1 표 9번과 같은 곳 — 고친 파일에는 0건).
5. **목소리 파일** — 시험 3의 실물에는 캡컷 '텍스트 읽기' 대신 파일 목소리가 필요함. 지금은 `audio.json`으로 받는 꼴만 있음(Fit 결과 `keep [a, b]` · `rate`).

## 5. 배운 것

- **이 PC(윈도) Chrome 157의 화면 없는 모드에서 H.264(High) · AAC 인코딩과 GPU가 됨** — `isConfigSupported` 참 + 실제 뽑은 파일에 `mp4a`. 12초 한 편 뽑기 2.6초.
- **레벨이 4.1로 나옴**(`avcC` level 41) — S4가 셈한 `avc1.640028`(4.0)과 다름. mediabunny가 비트레이트로 고른 것 [추측]. 규격 판단에 쓸 때는 실제 파일 값으로.
- ffmpeg가 없어도 시험이 됨: 가짜 영상은 브라우저(mediabunny)로 만들고, 규격은 MP4 상자(stsd · avcC · mdhd · stts)로, 화면은 mediabunny로 풀어 PNG로, 소리는 Goertzel로 주파수마다 세기를 잼. 가짜 소재의 음을 서로 다르게(영상 440 · 목소리 220 · 음악 330) 두면 '영상 소리 꺼짐'까지 숫자로 볼 수 있음.
- 휴대용 ffmpeg 받기(실행 파일)는 자동 심사에서 막힘 — 우회하지 않음. Bun(한알 허락) · 글꼴(데이터) 받기는 됨.
- Chrome `--screenshot`으로 `<video>`를 찍으면 가상 시간 안에 프레임이 안 풀려 빈 그림이 나옴 → 브라우저 안에서 mediabunny로 푸는 쪽을 씀.
- 이 PC의 git은 줄끝을 CRLF로 바꿔 꺼냄 — 파이썬으로 고칠 때 줄끝을 그대로 두지 않으면 파일 전체가 바뀐 것처럼 보일 수 있음(`git diff`는 맞게 보임).

## 6. 다음

- 반환함. 다음 일은 스스로 시작하지 않음(AAA 규칙 18).
- RSCH가 MAC_RUN을 순서서에 넣고, 맥 결과(T0 · T2 · MAC_RUN의 칸)를 주시면 C4 꼴 마무리와 글자 모양 값 맞추기를 이어서 함.
- 개발 서버(127.0.0.1:3417)는 RSCH가 이 PC에서 직접 보려면 쓸 수 있게 켜 둠 — 끄라시면 끔.
