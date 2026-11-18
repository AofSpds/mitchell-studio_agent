# 제품 저장소 '지금 모습' — AofSpds/mitchell-studio

- 쓴 세션: MITCHELL_STUDIO/BTSR/RSCH · 쓴 시각: 2026-11-18 22:05 KST (읽기 21:57~22:00, 이 PC 시계로 확인)
- 근거 말씀: owner/utterances/2026-11-18.md — 21:56:59 uuid e0cec51e-2ed5-4eb5-8b19-054f163d274e
- 읽은 것: `C:\Users\ms1pk\dev\mitchell-studio` main `0636fa0`(마지막 커밋 2026-11-12 18:14 KST). `pull --ff-only` 결과 이미 최신.
- 짝 문서: [개선 후보와 여쭐 것](2026-11-18-improvement-candidates.md)
- 표시: 따로 표시가 없으면 파일에서 직접 본 사실. **(추측)** 은 내 짐작. 경로 뒤 숫자는 줄 번호.
- 손님·개인 정보 값은 옮겨 적지 않음. 어느 파일에 있는지만 8번에 적음.

## 읽은 범위

| 깊이 | 무엇 |
|---|---|
| 끝까지 읽음 | `CLAUDE.md` · `AGENTS.md` · `.claude/settings*.json` · `.mcp.json` · `.gitignore` · `.claude/hooks/load-context.sh` · 역할 정의 2개(pmo·rsch) · 9개 역할 `directives.md`·`knowhow.md` · `agents/_terra/*` · `directive-candidates.md` · `status.json` · `manual.md` · `manual-webapp.md` · `pmo/builds.md` · `pln/ideas.md` · `uploader/setup-checklist.md` · `auto-resume-log.md` · `app/webapp/README.md` · `app/agent-bridge.md` · `app/agent_bridge.py` · pmo 최근 기록(`2026-11-11_terra-small-cards.md`) · tester 기록 · pln `terra-test-plan` 기획서 · 커밋 이력 112개 제목 |
| 뼈대만 봄 | `app/webapp/*.py`(머리말·함수 목록·접속 허용/PIN 부분) · `app/scripts/voice_fit.py`(머리말·함수 목록) · pln 기획서 8개(머리말·로드맵·결정 칸) · `app/vendor/capcut-mcp`(README 앞·package.json) · `dashboard/build.py` 앞 30줄 · `folder-tree.md` 일부 |
| 안 읽음 | `app/webapp/static/*.html` · `app/scripts/capcut_build.mjs`·`*.sh` 본문 · vendor `src/*.js` · capcut·pln·uploader·rsch의 나머지 기록 · `creative_director/requests/`·`plans/` · `rsch/research/` 4개 중 3개 본문 · `dashboard.html`(생성물) |
| 이 PC에 없음 | `data/` · `config/` · `~/.codex/sessions/` 기록 · 맥 `scratchpad/` 시험 스크립트 · 설치 스크립트 (모두 저장소 밖) |

- 못 본 것에 대해 — 한알: "아 테스트 결과는 내재화 됩니다." (2026-11-18 22:09:14 KST, uuid 2dc3779d — owner/utterances/2026-11-18.md. 범위·시기·누가 하는지는 아직 말씀 없음)

## 1. 무엇을 하는 공간인가

- 미용실 운영자(저장소 안 호칭 '총괄 디렉터')의 **SNS 영상(주로 인스타 릴스) 작업**을 역할별 Claude 세션이 나눠 맡는 맥 작업 공간 — `CLAUDE.md`:6, `agents/creative_director/knowhow.md`:29.
- 올리는 곳은 5곳(인스타 릴스·유튜브 쇼츠·틱톡·네이버 블로그 클립·당근 스토리) — `agents/uploader/knowhow.md`:13.
- 한 저장소에 두 가지가 같이 있음: ① 역할 세션들의 기억(`agents/`) ② 그 세션들이 만든 도구(`app/`). 영상·사진·`data/`·`config/`는 git에서 막음 — `.gitignore`:7-27.
- 운영자는 휴대폰으로만 보고, 처음 설정 뒤에는 맥을 만지지 않는 것이 목표 — `agents/creative_director/manual.md`:4.
- 맥 한 대(가게에 켜 둠)에서만 도는 구조: CapCut 데스크톱, launchd, 사진 앱 AppleScript, Codex 데스크톱 — `manual.md`:54, `agents/capcut/knowhow.md`:7.

## 2. 역할과 일의 흐름

### 역할 (세션 이름 = 역할) — `CLAUDE.md`:11-23

| 역할 | 맡은 일 | 지금 상태(`status.json` 2026-11-12 18:14) |
|---|---|---|
| Creative Director | 총괄 세션: 요청 받기·나눠 주기·결과 정리·상황판·매뉴얼 | 진행 관리 |
| pln | 콘텐츠 기획 + 도구 기획서 | 승인 대기 |
| pmo | 기획서대로 웹앱·공용 명령·자동화 구현 | 대기 |
| rsch | 기존 작업 조사, 자동화 요구사항, Terra 기록 검토 | 대기 |
| tester | 시연 전 점검, Terra 결과 확인 (2026-11-12 새로 생김) | 새 역할 |
| capcut | CapCut 편집(프로젝트 파일을 밖에서 만들고 고침) | 대기 |
| uploader | 5곳 캡션·업로드 준비 | 대기 |
| ffmpeg | 영상 변환 | 대기 — 지침 0개, 작업 기록 없음(`agents/ffmpeg/logs/`에 양식만) |
| higgsfield | AI 영상 | 제외 — `agents/creative_director/directives.md`:29 |
| (Codex) Terra | 맥 화면 조작으로 CapCut 목소리·음악·내보내기. Codex `executor` 스레드 | 첫 연습 P0·P4 통과 |

- 규칙의 뼈대: 세션은 자기 폴더만 쓰고 다른 역할 폴더는 읽기만(`CLAUDE.md`:26-27). 도구는 **pln 기획서 → pmo 구현**, 기획서 없이 만들지 않음(`creative_director/directives.md`:28).
- 기억 두 종류: `directives.md`(운영자가 정함, 1순위) / `knowhow.md`(세션이 배운 것, 2순위) — `CLAUDE.md`:29-37.
- '지침 후보' 흐름: 세션이 보고 끝에 후보를 올림 → Creative Director가 모아 여쭘 → "네, 지침으로" 한 것만 저장 — `creative_director/directives.md`:32, `directive-candidates.md`:12-14(18개 모두 처리됨, 여쭙는 중 0).

### 릴스 한 편의 흐름 (8단계) — `manual.md`:22-31, `app/webapp/README.md`:6-48

| # | 단계 | 누가 | 사람 손이 닿는 곳 |
|---|---|---|---|
| ① | Send — 휴대폰 웹앱으로 소재 3가지 + 요청 한 줄 | 운영자 | 촬영, ChatGPT로 AI 얼굴 사진 받기, 보내기, Claude 앱에 "업로드 확인" 한마디 |
| ② | Intake — 접수 카드 | Claude | 필수 3칸이 비면 질문 |
| ③ | Script — 원고 7~10문장 | Claude | 「좋아요」/「고칠 점」 |
| ④ | Edit — 장면표 → CapCut 프로젝트 | capcut (`capcut_build.mjs`) | — |
| ⑤ | Preview | (2단계 로드맵, 아직 없음) | — |
| ⑥ | Voice · Music · Fit · Export | Terra(화면 조작) + 웹앱(Fit) | Preflight 3칸 체크, Codex에서 모델을 Terra로, "작업 카드대로 해 줘", 카드마다 "다음 카드 해 줘" |
| ⑦ | Done — 완성 영상 확인 | 운영자 | 「승인」/「고칠 점」 |
| ⑧ | Post — 5곳 캡션 준비 | uploader | 각 앱에 직접 올리고 「올림」 |

## 3. 도구가 어디까지 되어 있나

### 웹앱 `app/webapp/` (맥 기본 python3만, 설치·비용 0 — `pmo/builds.md`:43)

| 파일 | 줄 | 하는 일 |
|---|---|---|
| `server.py` | 701 | 서버, PIN 로그인, 소재 받기, 결과 보기, 15초 tick + 결과 파일 2초 감시 |
| `jobs.py` | 1821 | 작업 파일 규칙·8단계 상태·⑥ 네 칸·카드 만들기·결과 줄 확인·백업/되살리기·CapCut 목록 맨 위 올리기·바깥 파일 비교·CLI |
| `practice.py` | 626 | Terra 연습 카드(P0~P5), 통과 판정, Codex 기록에서 도구 횟수 세기 |
| `preflight.py` | 252 | 시작 전 점검표 C1~C15 |
| `reel_api.py` | 349 | Jobs·Post·Manual 화면용 주소 |
| `static/app.html`·`pin.html` | 764·78 | 화면 (탭 Send · Jobs · Post · Manual) |

- 된 것: Send(215MB도 원본 그대로, 덮어쓰기 없음 — `pmo/knowhow.md`:40), Jobs 8단계·산출물·좋아요/고칠 점/승인, Post(영상 저장·캡션 복사·올림), Manual+Helpdesk, 옵션 — `pmo/builds.md`:35-40.
- 접속 제한: 사설망·이 맥·Tailscale 주소만 허용(`server.py`:88-101), PIN 6자리·5번 틀리면 10분 잠금·30일 기억(`pmo/builds.md`:48). 주소는 http.
- 자동 시작(launchd) 등록됨 2026-11-09(`pmo/builds.md`:44). Tailscale은 연결 끝, **자동 시작은 미등록**(맥이 다시 켜지면 꺼짐 — `pmo/builds.md`:11).
- 시험: 시험용 폴더에서 124/124, 사전 리허설 28/28(`pmo/logs/2026-11-11_terra-small-cards.md`:39, 86). **시험 스크립트는 맥 `scratchpad/`에 있고 저장소에는 없음**(`git ls-files`에 시험 파일 0개; `pmo/logs/2026-11-09_upload-webapp.md`:26, `pmo/knowhow.md`:45).
  - 한알: "아 테스트 결과는 내재화 됩니다." (2026-11-18 22:09:14 KST, uuid 2dc3779d — owner/utterances/2026-11-18.md. 범위·시기·누가 하는지는 아직 말씀 없음)
- **휴대폰에서의 시험은 아직** — 매뉴얼 '휴대폰 시험 일정' 4~9번이 모두 ⬜(`manual.md`:15-20), `pmo/builds.md`:9-10.

### 공용 명령 `app/scripts/`

- `capcut_build.mjs`(276줄): 장면표 `scenes.json` → CapCut 프로젝트. 연습 폴더와 실제 목록에서 1101 다시 만들기 성공 — `agents/capcut/knowhow.md`:50-51.
- `voice_fit.py`(423줄): 목소리 앞뒤 조용한 부분 자르기 → 차례로 붙이기 → 자막 맞춤. capcut 세션의 실제 결과와 마이크로초까지 같음 — `pmo/knowhow.md`:42.
- `import_from_photos.sh` · `send_to_phone_album.sh` · `quit_capcut.sh`: 맥 앞 시험 성공(2026-11-08) — `pmo/builds.md`:52-55. `.claude/settings.json`:4-6에 허용 등록.

### 자동화 (서버가 저절로 하는 것) — `app/webapp/README.md`:16-46

- ④ done → ⑥ 카드 한 장 + 모음 카드 자동 생성.
- Terra 결과 줄 → 2초 안에 다음 카드. 프로젝트 파일로 목소리 수·속도·음악 끝을 확인하고 빠진 것만 다시 하는 카드.
- Fit(간격 맞추기)은 웹앱이 혼자. 겹침 0이어야 Export 카드가 나옴.
- 완성 영상 감지: 판 번호 없는 이름 고쳐 받기, `.mov` → MP4 포장, 크기·fps·소리·겹침 ⚠.
- 카드마다 프로젝트 백업, `restore`. ⑥ 앞뒤 '작업 밖 파일' 비교 → ⑦ ⚠.
- 연습: 하루 한 번 카드 1~2장, 3번 연달아 통과하면 졸업.
- **꺼 둔 것:** 자동 이어 가기 예약 — `auto-resume-log.md`:7, `creative_director/knowhow.md`:7.

### Codex 연결

- `AGENTS.md`: Codex(Terra)가 세 말("작업 카드대로 해 줘"·"다음 카드 해 줘"·"연습 카드 해 줘")을 들었을 때 따르는 약속 — `AGENTS.md`:9-21.
- `app/agent_bridge.py`(44줄) + `app/agent-bridge.md`: Claude Code ↔ Codex가 서로의 CLI를 한 번 부르고 답을 받음. 기본은 읽기 전용, `--edit`·`--session` 선택. 2026-11-12 양쪽 호출과 세션 ID 재개 시험됨. **이미 진행 중인 대화끼리 실시간 연결은 시험 안 함** — `agent-bridge.md`:24-29.
- 「Claude가 직접 시작」(`codex exec`로 ⑥ 시작)은 **승인 범위 밖**이라 만들지 않음 — `pln/specs/2026-11-10_chatgpt-one-word-start.md`:93, `pmo/logs/2026-11-11_terra-small-cards.md`:7.
- Codex 권한은 지금 "전체 권한 + 승인 안 물음"(권한 A). 기본으로 둘지는 미정 — `status.json`:70.

### 그 밖

- CapCut 연결 도구 `app/vendor/capcut-mcp/`: 외부 제작(MIT). CapCut 초안 형식은 비공개라 업데이트로 깨질 수 있다고 README가 밝힘. **AI 목소리(텍스트 읽기)와 내보내기는 이 도구로 못 함** — `pln/knowhow.md`:19. 그래서 ⑥이 화면 조작(Terra)에 기댐.
- 상황판: `dashboard/build.py`가 역할마다 `agents/<역할>/dashboard.html`을 만들고, 총괄 것을 온라인 주소에 올림 — `CLAUDE.md`:43-50.
- 기억 로더: `.claude/hooks/load-context.sh`가 세션 시작 때 **모든 역할**의 지침·노하우·최근 기록 3개를 넣음 — `load-context.sh`:50-55. `CLAUDE.md`:69-90도 18개 파일을 `@`로 늘 올림.

### 진행 상태 한눈에 (마지막 커밋 2026-11-12 18:14 기준)

| 일 | 상태 | 근거 |
|---|---|---|
| 1101 릴스 v2 | 승인·5곳 캡션 준비 끝, **게시 전** | `manual.md`:34 |
| 로드맵 1단계(8단계 흐름) | 구현·맥 안 리허설 통과 | `pmo/builds.md`:14-40 |
| Terra 1단계 연습 | P0·P4 한 번 통과. P1·P2 → P3·P5 남음 | `pmo/builds.md`:7, `terra-test-plan.md`:44-54 |
| Terra 2단계(이어 하기)·3단계(진짜 작업 한 건) | 아직 | `pmo/builds.md`:8 |
| 로드맵 2단계: AI 얼굴(Face)·미리보기 | 기획 승인, 미구현. Face 기획서에 '여쭤볼 것' 2개가 남아 있음(답 여부는 못 봄) | `pln/specs/2026-11-09_reel-automation.md`:181-193, `2026-11-10_ai-face-step.md`:89-91 |
| 로드맵 3단계: SNS 앱 바로 열기·사진만 릴스·⑥ 자동 시작 | 아직 | `reel-automation.md`:195-198 |
| 자동 업로드 | 도구 없음, 방법 미정 | `uploader/knowhow.md`:11-12 |
| 휴대폰 시험 4~9 | 아직 | `manual.md`:15-20 |
| GitHub 저장소 주인 | 미정(1번 ⬜) | `manual.md`:10 |

- 2026-11-12 18:14 뒤로 커밋이 없음(11-18 현재 6일). 그 사이 맥에서 일이 있었는지는 저장소로는 알 수 없음.

## 4. 총괄 디렉터가 정한 지침의 큰 줄기

저장소의 지침은 운영자가 정한 것. 아래는 요약이며 평가가 아님. 원문은 각 `directives.md`.

- **소통:** 호칭은 '총괄 디렉터'. 쉬운 한국어, 전문용어는 풀어서. 시각은 KST로 확인해서 — `creative_director/directives.md`:7-9.
- **손님 정보:** 영상·사진은 git에 안 올림. 기록에 이름·연락처 안 씀. 손님 동의는 운영자가 따로 받으니 도구가 묻거나 막지 않음 — :12-15.
- **비용:** 크레딧·돈이 드는 일은 먼저 물음 — :18.
- **파일:** 원본 덮어쓰기 금지. 폴더·파일 이름은 영어, 안의 글은 한국어. SNS 완성본에는 소리 — :21-25.
- **작업 방식:**
  - pln 기획 → pmo 구현 — :28
  - Higgsfield 제외 — :29
  - 화면 조작은 GPT-6.1 Terra, 일을 잘게 나누고 계속 시험해 경험을 쌓음 — :30-31
  - 노하우·지침 후보를 많이 찾음 — :32
  - 역할마다 세션, 같은 양식, HTML 상황판(파스텔), 일 끝나면 상황판 갱신 + 링크 — :33-38
  - 진짜 파일이 닿는 시험은 practice 이름으로 — :40
- **역할별:** capcut 4개(백업 뒤 연습 사본에서 먼저 · 겹침 0 전 내보내기 금지 · AI 얼굴 표시 · 남이 CapCut 쓰는 중엔 안 건드림), uploader 6개(가게 이름·해시태그·AI 표시·당근·쇼츠 제목), pmo 3개(①~⑧ 리허설 뒤 켜기 · 옮긴 스크립트는 원본 결과와 같은지 확인 · 멈춤에는 푸는 길), pln 2개(승인 뒤에 상위 보고 · 이름표는 영어만/설명은 한국어만), rsch 6개, higgsfield 3개, ffmpeg·tester 0개.
- **취향(노하우에 적힌 것):** 새 허락 창·설정 변경 요청을 싫어함, 화면 조작·얼굴 이미지는 ChatGPT를 더 믿음(`pln/knowhow.md`:32). 세션 일의 결정은 그 세션에서 직접 물음(`creative_director/knowhow.md`:28).

## 5. 기록에 드러난 막힘·되풀이되는 불편·미완

### 가. ⑥(목소리·음악·내보내기)이 화면 조작에 기댐
- 내보내기 창의 해상도·형식 목록은 Sol·Terra 모두 못 고름 = 도구 한계. 그래서 CapCut이 기억하는 '마지막 내보낸 값'에 기댐 — `agents/_terra/experience.md`:9, `rsch/knowhow.md`:15, `terra-test-plan.md`:27.
- Terra는 한 차례 11분·도구 85번에서 대화가 꽉 참 → 카드 한 장 20번·3분으로 잘게 — `pln/knowhow.md`:21.
- 예상 못 한 안내창·자동 심사에서 바로 멈춤 — `terra-test-plan.md`:13-17.
- 카드가 끝날 때마다 운영자가 "다음 카드 해 줘"를 말해야 이어짐 — `AGENTS.md`:12, `manual.md`:43.
- Codex 기본 모델이 Sol이라 매번 Terra로 바꿔야 함. 실제로 시범이 Sol로 돈 적 있음 — `manual.md`:41, `rsch/knowhow.md`:14.
- ChatGPT 사용량 한도로 멈춤(오전 7시 뒤 다시) — `manual-webapp.md`:35, `rsch/knowhow.md`:9.
- AI가 스스로 센 숫자가 실제보다 적음 → 기계가 기록에서 세게 고침 — `pln/knowhow.md`:27.

### 나. 운영자가 맥 앞에서 해야 하는 일이 남음
- Preflight C3 모델·C4 사용량·C7 권한은 사람이 체크 — `terra-test-plan.md`:28-32.
- 맥 보안 허락 창은 원격 불가 — `capcut/knowhow.md`:15.
- 맥 뚜껑 열기·충전·Claude 앱 켜 두기, 다시 시동하면 로그인 한 번 — `manual.md`:52, 66-69.
- CapCut은 Cmd+Q로 완전히 꺼야 저장됨 — `capcut/knowhow.md`:60-62.

### 다. CapCut 프로젝트 파일을 밖에서 고치는 방식의 손이 많이 감
- 파일 여러 개(루트·Timelines·meta)를 같이 맞춰야 함 — `capcut/knowhow.md`:33.
- CapCut이 열고 닫으며 값을 반올림하고, 저절로 클라우드에 올리기도 함 — :35-36, :44, :63.
- 연결 도구 검사가 늘 "missing media"를 냄 — :43.
- 이 맥 ffmpeg에는 글자 그리기가 없어 자막 있는 미리보기를 못 만듦 — :29.

### 라. 휴대폰 쪽
- http 주소라 아이폰에서 클립보드·공유 창·화면 꺼짐 막기가 안 됨. https(Tailscale serve)는 검토만 — `pmo/knowhow.md`:24.
- Send 뒤 Claude 앱에 "업로드 확인"을 말해야 접수가 시작됨 — `manual.md`:27.
- ⑧ 게시는 5곳 모두 손으로 — `manual.md`:31.

### 마. 계정·소유
- GitHub 계정 주인을 잘못 알고 저장소를 넘긴 일이 '실수'로 기록됨. 지금 주인을 누가 할지 미정 — `creative_director/knowhow.md`:15, `manual.md`:10.
- origin 주소 바꾸기가 권한 심사에 막혀 옛 주소로 push 중 — `creative_director/knowhow.md`:16.

### 바. 글·기록 관리
- 일이 끝날 때마다 기록 → `build.py` → 상황판 링크, 총괄은 온라인 재게시까지 — `CLAUDE.md`:45-50. 커밋 112개 가운데 제목에 '상황판'이 들어간 것이 17개.
- 상황판은 기획서(`specs/`)를 보여 주지 않음 — `pln/knowhow.md`:9.
- 매뉴얼이 두 벌: `manual.md`(마지막 수정 11-12)와 `manual-webapp.md`(11-09). "함께 고친다"는 규칙이 있으나(`manual-webapp.md`:4) 웹앱용에는 ⑥이 아직 "ChatGPT에서 한마디"로 적혀 있고(:12, :21) executor·네 칸·Preflight 안내가 없음.
- `uploader/setup-checklist.md`:17의 해시태그 예시는 뒤에 정해진 지침(`uploader/directives.md`:19, 21)과 다른 옛 글.
- 시각을 짐작해 적었다가 고친 일이 되풀이됨 — `pln/knowhow.md`:24.
- 같은 사실이 여러 역할 노하우에 따로 적힘(예: CapCut이 마지막 내보낸 값을 기억 — `pmo/knowhow.md`:30, `rsch/knowhow.md`:11, `_terra/experience.md`:9).

### 사. 저장소·코드 쪽
- 맥 절대 경로가 박혀 있음: `.mcp.json`:7, `CLAUDE.md`:24, 기획서·카드 문구 여러 곳.
- 설치 스크립트가 저장소 밖(맥 Downloads)에 있고 `.gitignore`와 내용이 같아야 한다는 규칙 — `CLAUDE.md`:67. `config/runtime.env.example`은 `config/`가 git에서 막혀 저장소에 없음(`.gitignore`:11).
- 생성물이 커밋됨: `dashboard.html` 9개(각 431줄) + `folder-tree.md`(745줄, 세션 시작 때마다 다시 만들어짐).
- `jobs.py` 한 파일 1821줄에 상태·카드·검사·백업·CapCut 목록 조작·CLI가 같이 있음.
- 커밋은 모두 한 계정이 main에 바로(112/112). 가지·검토 흔적 없음.
- "agents/에는 글만"(`CLAUDE.md`:64)인데 `agents/capcut/reference/practice/*.py`, `agents/creative_director/dashboard/build.py`처럼 코드가 있음.

## 6. 에이전트 기억과 제품이 한 저장소에 섞여 있는 곳 (나중에 떼어 낼 때 볼 목록)

| 자리 | 성격 | 떼어 낼 때 걸리는 것 |
|---|---|---|
| `agents/<역할>/directives.md`·`knowhow.md`·`logs/` | 에이전트 기억 | `CLAUDE.md`:69-90이 `@`로 올리고 `load-context.sh`가 읽음. 경로가 바뀌면 둘 다 고쳐야 함 |
| `agents/creative_director/requests/`·`plans/`·`directive-candidates.md`·`auto-resume-log.md` | 에이전트 기억(운영자 말씀 원문 포함) | 요청 원문 = 요구의 출처이기도 함 |
| `agents/pln/specs/` | **제품 요구·설계**(기획서)인데 역할 폴더 안 | `app/` 코드 머리말이 기획서 경로를 가리킴(`jobs.py`:2, `practice.py`:2, `preflight.py`:2, `voice_fit.py`:2) |
| `agents/rsch/research/`·`templates/` | 요구사항·워크플로우 = 제품 쪽에 가까움 | 기획서가 바탕으로 가리킴 |
| `agents/pmo/builds.md` | 만든 것 목록·쓰는 법 = 제품 문서에 가까움 | 로더가 pmo에 통째로 넣음(`load-context.sh`:33) |
| `agents/creative_director/manual.md`·`manual-webapp.md` | **제품 문서.** 웹앱 Manual 탭이 `manual-webapp.md`를 그대로 읽음(`app/webapp/reel_api.py`:18) | 제품 코드가 `agents/` 아래 파일에 기댐 |
| `agents/_terra/experience.md`·`archive/` | Terra의 기억. 그런데 `jobs.py`:1050이 경로를 직접 쓰고 `AGENTS.md`:20이 가리킴 | 제품 코드가 에이전트 기억 파일에 기댐 |
| `agents/capcut/reference/`(로직 글·`practice/*.py`·기대값 json) | 코드·시험 기대값 | `voice_fit.py`의 원본 로직·기대값 |
| `agents/creative_director/dashboard/build.py`·`template.html` | 도구 코드 | 모든 세션이 일 끝에 돌림(`CLAUDE.md`:43) |
| `agents/*/dashboard.html`·`creative_director/folder-tree.md` | 생성물 | 온라인 상황판에 올리는 원본 |
| `agents/creative_director/status.json` | 세션 상태·남은 일·끝난 일 = 에이전트 운영 상태 | 상황판이 읽음 |
| `.claude/agents/*.md`·`.claude/hooks/`·`.claude/settings.json`·`.claude/skills/` | 에이전트 운영 설정(역할 정의·기억 로더·허용 명령·스킬 사본) | Claude Code가 저장소 뿌리에서 찾음. 스킬은 `app/vendor/capcut-mcp/skills/`와 같은 파일 |
| `CLAUDE.md` | 역할 규칙 + 폴더 규칙 + 자동 로드 목록이 한 파일 | 규칙과 제품 폴더 설명이 섞임 |
| `AGENTS.md` | Codex 약속. 카드 흐름 = 제품 동작의 일부 | Codex가 저장소 뿌리에서 자동으로 읽음(`rsch/knowhow.md`:12) |
| `app/` | 제품 코드 | `practice.py`:44가 `~/.codex/sessions`(에이전트 기록)를 읽어 통과 판정 |
| `data/working/_chatgpt_cards.md` 등(git 밖) | 작업 카드 = 제품이 에이전트에게 주는 지시 | 저장소에는 없음 |

- 눈에 띄는 점: 떼어 내는 선이 폴더 선(`agents/` 대 `app/`)과 맞지 않음. 기획서·연구·매뉴얼은 `agents/` 안에 있지만 제품 쪽 글이고, 제품 코드는 `agents/` 안 파일 2곳(`manual-webapp.md` — `reel_api.py`:18, `_terra/experience.md` — `jobs.py`:1050)에 직접 기댐.

## 7. 커밋 이력의 큰 흐름 (112개, 2026-11-08 ~ 11-12, 모두 main)

| 날 | 커밋 | 큰 일 |
|---|---|---|
| 11-08 | 21 | 첫 기록, 상황판, 매뉴얼, 호칭 정리, 파일 관리 계획, 업로드 웹앱으로 결정, pmo·pln 역할 추가, 웹앱 기획서 |
| 11-09 | 24 | rsch 역할, 업로드 웹앱 구현, 릴스 자동화 기획 확정, Manual·Helpdesk, Tailscale 준비, ChatGPT 시범, v0.1 웹앱(Send·Jobs·Post·Manual), 장면표 → CapCut |
| 11-10 | 46 | 시범 결과 반영, Higgsfield 제외, Terra 지침, 1101 v1 → 겹침 → v2 승인, 겹침 대책(voice_fit)·전체 리허설, 지침 후보 17개 저장, GitHub 계정 문제로 push 멈춤 |
| 11-11 | 6 | 밀린 커밋 push, Terra 기획 3개 승인, 카드 나누기·Preflight·연습 구현 |
| 11-12 | 15 | 지침 R3, 저장소 주인 넘기기와 정정, 휴대폰 연결, tester 역할, Terra 첫 연습 통과, 도구 횟수 세기 |

## 8. 개인 정보가 적힌 곳 (값은 옮기지 않음)

- `agents/creative_director/knowhow.md`:12-16 — GitHub 계정 이름, 메일 주소, 계정 주인의 가족 관계.
- `agents/creative_director/status.json`:89 · `manual.md`:10 — 계정 이름과 가족 관계.
- `agents/creative_director/manual.md`:11, 15 · `agents/pmo/builds.md`:11, 46 · `agents/pmo/knowhow.md`:7 — 맥 기기 이름, Tailscale 주소.
- `agents/pln/knowhow.md`:8 · `agents/uploader/directives.md`:19 · `agents/uploader/knowhow.md`:21 — 가게 정식 이름·주소·SNS 계정(공개된 사업장 정보).
- `agents/creative_director/folder-tree.md`:205~ — `data/` 아래 파일 이름 목록(ChatGPT 대화 제목, 소재 파일 이름). 내가 본 줄에는 손님 이름이 없었음(작업 번호는 '시술-손님코드' 꼴).
- git 커밋 작성자 — 112개 모두 한 개인 계정.
- 손님 이름·연락처·사진: 읽은 범위에서는 **보지 못함**. `.gitignore`가 `data/`·사진·영상을 막고 있음.
