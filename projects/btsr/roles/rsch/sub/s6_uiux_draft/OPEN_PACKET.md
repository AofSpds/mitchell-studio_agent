# SUB 개설 패킷 — MITCHELL_STUDIO/BTSR/RSCH/S6_UIUX_DRAFT

| 칸 | 값 |
|---|---|
| 연 이 | PRIMARY `MITCHELL_STUDIO/BTSR/RSCH` — Paseo 14d04ad1-7592-436b-82c2-69ad9d02e2ae · Opus 5.5 · xhigh |
| SUB | `MITCHELL_STUDIO/BTSR/RSCH/S6_UIUX_DRAFT` (Paseo ID는 연 뒤 PRIMARY CURRENT에) |
| 실행기 | Paseo · claude-google · **Fable 5.2 (claude-fable-5-2)** · high |
| 자기 칸 | `projects/btsr/roles/rsch/sub/s6_uiux_draft/` (main 폴더 — **이 칸에만 씀**) |
| 규칙 | 이 저장소 `AGENTS.md` + AAA 규칙 판 `C:/Users/ms1pk/dev/AAA/AGENTS.md`(읽기만 — 특히 9 · 25 · 30 · 34 · 35 · 43) |
| 패킷을 쓴 때 | 2026-11-21 13:23 KST (여는 것보다 먼저 — 규칙 40) |

## 근거 (한알 말씀, 원문 그대로 — owner/utterances/2026-11-21.md)

- 13:21:46 uuid ac33cc03: "그리고 변경된 ui/ux 시안을 페이블 서브세션으로 뽑아보세요."
- 첫째 지침(11-21 03:32:07): **캡컷 기반 웹앱을 오늘(11-21) 완성한다.** 편집 엔진은 지금처럼 캡컷(OpenCut · OpenChatCut은 멈춤).

## 무엇인가

미용실 릴스(세로 영상 MP4 · 1080×1920 · 30fps, 12~15초)를 만드는 웹앱 '미첼 스튜디오'. 운영자(미용실 사람)가 **아이폰 사파리**로 사진 · 영상을 올리면, 맥이 캡컷으로 영상을 만든다. 오늘 1차 기능(묶음 1–6)을 정했고 일부는 만들어지는 중이다. **너는 바뀐 것을 담은 휴대폰 화면 시안을 만든다.** 코드가 아니라 보여 드릴 그림이다.

- 사람: **한알** = 주인이자 개발자(시안을 볼 사람). **운영자** = 웹앱을 쓰는 미용실 사람. 화면 글은 운영자에게 하는 말이다.

## 먼저 읽을 것 (읽기만)

1. 이 저장소 `AGENTS.md`.
2. **지금 웹앱 화면(바탕):** 제품 main `6cfbc5f` — `git -C C:/Users/ms1pk/dev/mitchell-studio show 6cfbc5f:app/webapp/static/app.html` (건의함까지 들어간 판). 제품 저장소에서는 `git show`만 쓰고 fetch · checkout · pull · 파일 고치기를 하지 않는다.
3. **지난 시안:** `projects/btsr/roles/rsch/studies/2026-11-20-plan-draft-ui.html` · `studies/2026-11-19-uiux-proposals.md`. 그 가운데 OpenCut · 휴대폰 직접 편집에 기댄 것은 버린다.
4. **1차 기획(정본):** `git show origin/btsr/pln:projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_REQUIREMENTS_CLAUDE.md` 와 같은 폴더 `WEBAPP_PHASE1_DECISIONS_CLAUDE.md` (가지 `btsr/pln` — 이 저장소 원격). 묶음 1–6의 하는 일 · 받아들임 기준.
5. **오늘 한알이 정한 것:** `projects/btsr/roles/rsch/requests/BTSR-RSCH-003_webapp-phase1-capcut/요청.md` 6–8번.

## 시안에 꼭 담을 것 (오늘 정해진 것)

1. **건의하기** — 머리의 단추 글은 「건의하기」만(영어 'Feedback' 없음). 건의 시트에 '손님 이름 · 연락처는 별명으로 바뀌어 저장돼요' 꼴의 안내(손님 정보는 걸러 내거나 맥에만 두고, 남는 글은 '손님 A' 같은 별명).
2. **올리면 바로 시작**(묶음 2) · **템플릿 고르기와 판**(묶음 8 — 여러 템플릿 · v1 · v2).
3. **접수에서 확인만**(묶음 3) — '빠졌어요'는 **웹앱이 만들 수 없는 자료(시술 전 · 시술 후 사진 등)가 빠졌을 때만** 묻는다. AI 얼굴 사진이 없으면 묻지 않고 「AI 얼굴: 만들 예정」.
4. **AI 얼굴 확인**(묶음 3-2) — 웹앱이 만든 AI 얼굴 사진을 보여 주고 단추 둘: **「이 사진으로 갈게요 →」**(주) · **「다시 만들기」**. 'AI 합성' 표시는 늘 보임.
5. **진행 보기와 알림**(묶음 4) — '지금 무엇을 하는 중' 한 줄 · 진행 기록 · 화면이 스스로 바뀜 · **휴대폰 알림**(https를 켜기로 함 — 처음 한 번 '알림 받기' 허락 · 홈 화면에 추가 안내).
6. **막혔을 때**(묶음 5) — 웹앱이 운영자에게 **먼저 쉬운 말로 묻고**(예: "시술 후 사진 한 장이 흐려요. 다시 올려 주세요"), 그래도 안 되면 「개발자에게 알렸어요」. 만들던 것은 지우지 않고 남김.
7. **다 된 뒤**(묶음 6) — 영상 보기 · **「사진 앱에 저장」**(https라 공유 창 → 비디오 저장) · 「고칠 점 적기」 → 새 판(v2) · **규격(1080×1920 · 30fps)이 다르면 완성이 아님** — 운영자 의견은 받되 「규격 맞추는 중」으로 보이고, 맞춘 판만 '완성'.
8. **넣지 않는 것:** 휴대폰에서 영상을 직접 고치는 화면(묶음 7 — 뒤로 미룸) · OpenCut · OpenChatCut.

## 지킬 것

- **쉬운 말**(운영자에게 영어 · 약어 · 개발 말 없음 — 상표 'Mitchell Studio'는 지금 화면대로 둬도 됨). 운영자 기준: AI 합성 표시 늘 · 손님 이름 · 연락처 · 얼굴 사진을 쓰지 않음 · 원본을 덮어쓰지 않고 v2 · v3.
- **가짜 자료만.** 손님 이름 · 전화 · 실제 사진 금지 — 회색 상자나 그린 그림으로. 바깥 인터넷을 부르지 않는 **한 파일 HTML**(바깥 글꼴 · CDN · 이미지 주소 없음).
- 휴대폰 폭(390px 안팎)에서 보이게. 지금 웹앱의 색 · 글꼴 · 꼴을 이어 쓴다(새 디자인을 만들지 않음 — 바뀐 곳이 보이게).
- 화면마다 **바뀐 곳 표시**(예: 노란 '새로' 띠)와 아래에 작은 글씨로 '어느 묶음 · 어느 결정'.
- 하지 않는 것: 제품 저장소 · 기획 · 다른 역할 칸 고치기 · 다른 세션에 연락 · 설치. 컴퓨터 유즈(사람 화면 보기 · 누르기) 없음.

## 낼 것 → 자기 칸

1. `UIUX_웹앱1차시안_CLAUDE.html` — 위 1–7을 화면 차례대로(올리기 → 접수 → AI 얼굴 확인 → 진행 · 알림 → 막힘 → 다 됨 · 저장 · 고칠 점 → 건의하기).
2. 될 수 있으면 화면 그림 PNG(이 PC의 화면 없는 Edge/Chrome으로 자기 HTML만 찍음 — 너의 HTML 말고 다른 것은 열지 않음) `shots/` 아래, 큰 그림 하나 3MB 안.
3. `반환.md` — 5항목(범위 · 산출물/판 · 권한 · 증거 · 충돌/중복) + **지금 화면과 바뀐 곳 표**(화면 · 바뀐 것 · 근거 묶음/결정) + **한알께 여쭐 것**(시안을 만들며 정하지 못한 것, 번호로 답할 수 있게, 권고를 1번에 · 3개 안).
4. 커밋은 자기 칸만 경로로: `git add -- projects/btsr/roles/rsch/sub/s6_uiux_draft/` → `git commit -m "S6_UIUX_DRAFT: …" -- projects/btsr/roles/rsch/sub/s6_uiux_draft/` → `git push origin main`(막히면 `git pull --rebase` 뒤 다시 — 강제 push 금지). 커밋 끝 줄 `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`. 안 되면 우회하지 말고 반환.md에 오류를 적음.
5. 끝나면 마지막 답에 결론 한 줄 + 커밋 해시. PRIMARY가 읽고 5항목으로 받는다.
