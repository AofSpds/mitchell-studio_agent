# 보강 자료 검토 — OpenChatCut · AI 목소리 (2026-11-20 21:30 KST)

- 쓴 세션: MITCHELL_STUDIO/BTSR/RSCH (Paseo 7993ff28 · Opus 5.5)
- 근거 말씀(`owner/utterances/2026-11-20.md`): 21:04:18 uuid f0db5d07 「기획안 보강 자료가 들어왔습니다. 검토해주세요.」 · 21:17:24 uuid f454faa1 「네 웹챗에서 연구를 해왔습니다. 자료 확인하시고, openChatCut 도 적극적으로 반영했으면 하네요.」
- 검토한 것: [`studies/2026-11-20-openchatcut-voice-supplement.md`](../studies/2026-11-20-openchatcut-voice-supplement.md) — 이 저장소 커밋 3a03e46(21:11:54 KST, 155줄). 한알이 웹챗에서 해 오신 연구이고, 자료 스스로 '연구 참고자료 / 변경 제안 — 지시가 아님'이라고 밝힘. 자료는 고치지 않았습니다.
- **결론:** 자료에 적힌 OpenChatCut 사실 열한 가지는 원 저장소와 맞았습니다. **(21:42 덧붙임) 다만 6번에서 끌어낸 결론 '명령줄로 소재 넣기 불가 — 무인의 핵심 공백'은 이 PC에서 돌려 보니 틀렸습니다 — 도구 호출로 창 없이 넣어지고, 진짜 빈칸은 자막입니다([이 PC 시험](2026-11-20-openchatcut-pc-trial.md)).** (11-21 00:32 덧붙임) 자막도 우리 모양 그림으로는 창 없이 됐습니다(같은 기록 5번). 고칠 곳은 우리 요구를 옮겨 적은 두 줄이고, 빠진 것 여섯을 더했습니다. 목소리 쪽은 Vrew의 '사업용 가능' 한 줄만 확인했고, 나머지는 이 PC에서 확인하지 못했습니다.
- 표시: **[소스 확인]** OpenChatCut 저장소의 글 · 코드에서 RSCH가 직접 봄 · **[미검증]** 확인 못 함.

## 1. 맞춰 본 것 — 모두 맞음 [소스 확인]

| # | 자료의 주장 | RSCH가 본 곳 | 결과 |
|---|---|---|---|
| 1 | AGPL-3.0-or-later · v0.2.17 · 마지막 커밋 2026-11-12 | GitHub API · `package.json` | 맞음 |
| 2 | MCP 주소 `localhost:5199` · Streamable HTTP | README | 맞음 |
| 3 | 편집 세션 `begin_edit_session` → `review_edit_session` → `get_edit_session`, `manual` · `auto` | README | 맞음 |
| 4 | MCP 편집 세션에는 생성 · 내보내기 · 지우기가 없음 | README | 맞음 |
| 5 | `occ render`가 저장된 프로젝트를 사람 없이 뽑음 — `--out` · `--fps` · `--codec` · `--dry-run` | `cli/commands/render.ts` | 맞음(그 밖에 `--resolution` · `--bitrate` · `--format` · `--from/--to`) |
| 6 | `occ media`는 목록만, 소재는 앱 미디어 풀이나 `import_asset` · `import_folder`로 | `cli/commands/media.ts` · `src/agent/external-tool-policy.ts` | `occ media`가 목록만인 것은 맞음. **그러나 자료의 결론('CLI로 소재 넣기 불가 — 핵심 공백')은 틀림** — `import_asset` · `import_folder`는 창 없이 도는 도구 목록에 있고, `occ tools call import_folder --apply`로 실제로 넣어짐 **[실측 — 21:42, [이 PC 시험](2026-11-20-openchatcut-pc-trial.md)]** |
| 7 | `occ edit --ops @ops.json --apply`로 여러 고침을 한 번에 | `cli/commands/edit.ts` | 맞음 |
| 8 | `occ project new --size 1080x1920 --fps 30` | `cli/commands/project.ts` | 맞음 |
| 9 | Node 24.22.1 이상 25 미만 | `package.json` engines | 맞음 |
| 10 | 다른 기기에서는 localhost가 아니면 https라야 편집기가 열림 | README 'Run from source' | 맞음 |
| 11 | MCP 다리는 한 사람 · 한 기계용, 토큰을 걸 수 있음 | README | 맞음 |

## 2. 고칠 곳 — 우리 요구를 옮겨 적은 두 줄 (자료 1번)

- "필수 소재가 없을 때에도 가능한 경로로 진행하되 누락을 알려야 한다" → 우리 요11은 "무엇이 빠졌는지 알리고, 소재를 더할지 지금 것으로 갈지 **운영자가 먼저 고름 — 고를 때까지 원고 작성을 기다림**"(「B」)입니다. 자료의 문장대로면 기다리지 않고 진행하는 것으로 읽혀 요구가 약해집니다. 기획안에는 요11을 그대로 둡니다.
- "운영비는 낮게 유지하는 방향을 검토한다"가 '이미 정해진 1차 범위'에 들어 있으나, 요구사항 정리에는 그런 말씀이 없습니다(찾아서 0건). 가르는 잣대의 하나로만 씁니다.

## 3. 자료에 빠진 것 — RSCH가 더함

1. `occ export jianying` — 캡컷 초안으로 내보내기(바깥 도구 capcut-cli) → 오2(캡컷을 사람이 열어 볼 사본으로 남기는지)와 닿음.
2. 맥 설치판은 서명 · 공증이 안 돼 처음 열 때 사람이 허락해야 함(README) → 시험은 소스에서 띄움 → Node 24 설치가 따로 듦(기획안 오9).
3. OpenChatCut이 그리고 뽑는 데 쓰는 Remotion의 회사 이용 조건(회사 크기에 따라 유료 — 다시 확인 필요).
4. 'OpenChatCut Pro'라는 데스크톱판이 따로 있음(README 머리) — 값 · 조건 모름.
5. 자료 7번의 세 갈래에 **④ 나눔**(맥 쪽 OpenChatCut + 휴대폰 쪽 OpenCut)을 더함 — 엔진이 둘이면 휴대폰에서 본 것과 맥이 뽑은 것이 다를 수 있음(글꼴 · 자막 모양).
6. SNS 올리기(Upload-Post 서비스 — 미리 보기와 명시적 확인 뒤) → 2차(요3 · 요4)와 닿음.

## 4. 목소리 (자료 5번)

| 후보 | 자료 | RSCH 확인 |
|---|---|---|
| TTSMaker 무료 | 주 2만 자 · 사업용 가능 · 무료에는 API 없음 | 공식 가격 · 약관 페이지가 이 PC에서 403으로 막혀 확인 못 함 **[미검증]** |
| Vrew 무료 | 월 200크레딧(목소리에만 쓰면 약 2만 자) · 사업용 가능 · 외부용 TTS API는 확인 안 됨 | 공식 도움말(2026-05-21 고침): AI 목소리는 사업용 · 비사업용 모두 가능, 출처 표기는 필요 없음(일본어 VOICEVOX 목소리만 표기). **무료 요금제도 그런지는 그 글에 없음.** 가격 페이지는 자바스크립트로만 떠 값을 못 봄. API는 두 페이지 어디에도 없음 |
| ElevenLabs | 무료 월 1만 크레딧 · 사업용은 Starter부터 | 11-19 [목소리](../studies/2026-11-19-voice.md) 글과 같음 |
| 맥에서 돌리는 공개 모델 | 품질 · 조건 · 운영비를 재야 함 | 조사 안 함 |

- → 기획안 오7을 고침: 19:34에 적은 '무료 요금제는 사업용 불가'는 ElevenLabs · 타입캐스트에만 맞는 말이었음. TTSMaker · Vrew 무료는 API가 없어 사람 손 없이는 못 돌리므로 목소리 고르기 · 운영자 듣기 시험용.
- '목소리 공급자를 한 자리(TTSProvider)로 갈라 두고 파일 · 길이 · 샘플레이트 · 권리 · 비용 · 오류 · 다시 한 횟수를 남김'은 받아들여 오7에 적음 **[제안]**.

## 5. 자료 7번의 요청과 한 것

| 7번 요청 | 한 것 |
|---|---|
| 1. 0-3 · T · 5 · 6 · 7에 OpenChatCut 대안 검토 — 지금 OpenCut 일 · 권한 · 일정을 바꾸지 않는 제안임을 밝힘 | 함 — 기획안 6번에 OpenChatCut 칸을 두고 0번 · 묶음 T(시험 5) · 5 · 6 · 7 · 2차 · 갈림길 ㄱ · 열린 물음 · 7번 · 8번에 가리킴. '오늘 밤 OpenCut 시험과 PMO 시험 코드는 그대로'를 밝힘 |
| 2. 네 사실을 따로 적음 | 함 |
| 3. 세 갈래 비교와 잣대 | 넷으로 함(④ 나눔을 더함) |
| 4. 목소리 공급자를 따로, 무료 한도와 API 자동화를 따로 | 함(오7) |
| 5. 확정 요구를 약하게 하지 않음 | 요11 · 요13 · 요22~요24 · 기1 · 기3을 그대로 둠. 자료 1번의 두 줄은 위 2에서 바로잡음 |
| 6. 표시 [미검증] · [제안] · [소스 확인] · [실측] | OpenChatCut 칸에서 씀. 초안의 다른 칸은 앞서의 표시 그대로 |
| 7. 오늘 밤 OpenCut 시험 · 진행 중 기획이 먼저, 새 일을 스스로 시작 · 배정하지 않음 | 지킴 — PMO · PLN · ARCH에 아무것도 보내지 않음. 시험 5는 '다음 맥북 시험에 넣을 안'으로만 둠 |

- **「적극적으로 반영」과 자료의 '격리된 경쟁 PoC로만'의 차이:** 한알 말씀이 앞섭니다. 그래서 각주가 아니라 기획 전반에 둘째 엔진 후보로 넣었고, 엔진을 바꾸는 결정은 맞대어 본 뒤로 둔 점은 자료와 같습니다 **[내 읽기]**.

## 6. 읽은 곳 (2026-11-20 21:1x~21:3x KST)

- 보강 자료(이 저장소 3a03e46)
- [OpenChatCut 저장소](https://github.com/0xsline/OpenChatCut) main(마지막 푸시 2026-11-12): README · `package.json` · `cli/commands/render.ts` · `media.ts` · `edit.ts` · `project.ts` · `export.ts` · `cli/tool-catalog.ts` · `server/external-agent/offline-tools.ts` · `MACOS-RENDER-TUNING.md`
- [Vrew 도움말 — AI 목소리 상업 이용](https://docs.channel.io/vrew-kr/ko/articles/%EC%83%81%EC%97%85-%EC%9D%B4%EC%9A%A9-AI-%EB%AA%A9%EC%86%8C%EB%A6%AC%EB%A5%BC-%EC%83%81%EC%97%85%EC%A0%81%EC%9D%B8-%EC%9A%A9%EB%8F%84%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C%EC%9A%94-addbf954) · [Vrew 가격](https://vrew.ai/ko/payment/pricepolicy/)(값이 자바스크립트로만 뜸)
- 열리지 않음(403): [TTSMaker 가격](https://pro.ttsmaker.com/pricing) · [TTSMaker 약관](https://pro.ttsmaker.com/terms-of-service)
- 웹 페이지 읽기는 보조 하나(web-fetch)가 했고, 결과의 인용을 이 글에 옮김. Vrew 가격 페이지 글에 이 일과 상관없는 지시문이 섞여 있었다고 보조가 알렸고, 따르지 않음.
