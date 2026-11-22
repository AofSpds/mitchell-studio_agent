# webapp-phase1 맥 할 일 판 3 · 「테스트해주세요」 — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN `btsr/pln` 46d0c41 `WEBAPP_PHASE1_MAC_NOW_V3_REQUEST_CLAUDE.md` 본문 + 덧붙임 1(ade0d7e · 결정 52) — PMO 건 [BTSR-ARCH-026](WEBAPP_PHASE1_BTSR-ARCH-026_REQUEST_CLAUDE.md)(정정본 a955079) + 덧붙임 1(0527758) |
| 반환 시각 | 2026-11-22 17:37 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` c27dd28 `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_MAC_NOW_V3_RETURN_CODEX.md` (PMO 512aef6d) |
| **합칠 머리** | 제품 `feat/webapp-mac-now-v3-20261122` **1427a37**(원격 ls-remote로 봄) — 바탕 = 지금 제품 main **9c3b1c1**(조상 → 앞으로 감기 됨) |

## 1. 결과

**받음.** 두 파일 · 글뿐 — `app/webapp/MAC_NOW.md`(판 3 · 2 칸 전부 · 말 줄 · 3의 한 낱말) · 제품 `AGENTS.md`(024 칸 → 「테스트해주세요」 칸). 코드 · 시험 0. 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- `git diff --stat 9c3b1c1 1427a37` = `AGENTS.md`(+4 −3) · `app/webapp/MAC_NOW.md`(+12 −7) 둘뿐.
- MAC_NOW.md: 판 `2026-11-22 · 3` · 말 줄에 네 말 + '띄어쓰기 · 말끝이 달라도 같다' · **'## 2.' 칸이 요청서 글과 바이트까지 같음**(ARCH가 요청서의 글 덩이를 그대로 찾아 봄) · 3의 '2의 적을 것' · 0 · 1 칸은 9c3b1c1과 같음(diff 0 — 2 칸 제목만 다름).
- AGENTS.md: 같은 자리(「연습 카드 해 줘」 뒤 · 「경험 기록」 앞)에 칸 하나 — 제목 세 말 · 띄어쓰기 · 말끝 · 옛 말도 같은 뜻 · fetch → MAC_NOW → 한 편 끝까지 → 결과 올리기 · '새로 받고/받아서' = 0번.
- 시험: 글뿐이라 안 돌림 — 코드는 9c3b1c1과 같음.

## 3. PMO가 정한 것 — ARCH 판단

없음(글 그대로).

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 026 요청서(8d25a8c → a955079 정정) + 덧붙임 1 · 이 반환서 · CURRENT · INDEX.

## 5. 남은 것 · 한알께 드릴 두 말

1. **제품 main 합치기**: RSCH가 두 파일 · 글뿐인지 보고 앞으로 감기 — 합칠 머리 **1427a37**, 지금 main 9c3b1c1.
2. **한알께 드릴 두 말(그대로)**:
   - 맨 처음 한 번(맥 세션이 새 AGENTS.md를 모를 때): **「저장소 새로 받고 약속 글대로 테스트해주세요」**
   - 그다음부터: **「테스트해주세요」**
3. 한 편은 약 60분 — 맥 세션이 시작할 때 「60분쯤 맥을 만지지 말아 주세요」를 드림. PIN 창 · 허락 창이면 한알께 한 줄로 멈춤 → 해 주신 뒤 「테스트해주세요」로 이어 감.

## 6. 배운 것

- 요청서에 명령 글(역따옴표)을 heredoc으로 쓸 때는 **따옴표 친 heredoc(`<<'EOF'`)** 만 쓴다 — 8d25a8c에서 따옴표 없는 heredoc이 글 속 명령을 실행해 글이 빠짐(실패한 명령이라 바뀐 것은 없음 · a955079로 다시 씀).

## 7. 다음

- PLN: 이 반환 받음 · 합침 조건(main 9c3b1c1 · 머리 1427a37 · 두 파일 · 글뿐)을 RSCH에 → 한알께 두 말.
