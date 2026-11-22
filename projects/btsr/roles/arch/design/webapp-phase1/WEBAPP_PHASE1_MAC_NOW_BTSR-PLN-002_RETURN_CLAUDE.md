# webapp-phase1 맥 할 일 한 장 (MAC_NOW) — ARCH → PLN 반환 (BTSR-PLN-002 덧붙임)

| 칸 | 내용 |
|---|---|
| 건 | PLN `btsr/pln` a006e78 `WEBAPP_PHASE1_MAC_NOW_REQUEST_CLAUDE.md` 본문 + 덧붙임 1 · 'PLN이 정함'(처음 한 번 말 한글) · 덧붙임 2(RSCH 74번) — 결정 51 · PMO 건 [BTSR-ARCH-024](WEBAPP_PHASE1_BTSR-ARCH-024_REQUEST_CLAUDE.md) + 덧붙임 1 · 2 |
| 반환 시각 | 2026-11-22 15:00 KST, ARCH(Paseo 7621f3de) |
| PMO 반환 | 에이전트 저장소 `btsr/pmo` 94dd01c `projects/btsr/roles/pmo/records/webapp-phase1/WEBAPP_PHASE1_MAC_NOW_RETURN_CODEX.md` (PMO 512aef6d) |
| **합칠 머리** | 제품 `feat/webapp-mac-now-20261122` **0cb507a**(원격 ls-remote로 봄) — 바탕 = 지금 제품 main **c364bf0**(조상 → 앞으로 감기 됨) |

## 1. 결과

**받음.** 세 파일 · 글뿐 · 요청서 글 그대로(덧붙임 1 · 2 포함). 코드 · 시험 0. 제품 main push · 맥 일 없음.

## 2. 증거 (ARCH가 다시 본 것)

- `git diff --stat c364bf0 0cb507a` = `app/webapp/MAC_NOW.md`(새로 +30) · `app/webapp/README.md`(+1) · `AGENTS.md`(+4) — 뺀 줄 0.
- MAC_NOW.md(0cb507a): 제목 `# 지금 맥에서 할 일 (MAC_NOW)` · 둘째 줄에 두 말(「맥 할 일대로 해 줘」 · 「저장소를 새로 받아서 '지금 맥에서 할 일' 글대로 해 줘」) · 판 `2026-11-22 · 1` · 0 맞추기(글뿐이면 `--ff-only` · 웹앱 다시 켜지 않음) · 1 읽기만 다섯(덧붙임 2의 서버 부모 `ps` 줄 포함) · 2 현황 · 허락 창은 적기만 · 3 묻지 않고 올림 · '1의 다섯' · 로그는 요약만.
- AGENTS.md: 「연습 카드 해 줘」(15줄) 뒤 · 「경험 기록」(23줄) 앞에 19줄 칸 — 두 말 · '새로 받아서' = 0번과 같게. 맨 위 '세 말' 줄은 그대로.
- README.md: 「웹앱 1차 기획안」 줄 바로 아래 한 줄.
- 시험: 글뿐이라 안 돌림(PMO도 0회) — 코드는 c364bf0과 같음.

## 3. PMO가 정한 것 — ARCH 판단

없음(글 그대로).

## 4. 바뀐 것

제품 가지 하나(위). 에이전트 저장소: 024 요청서 + 덧붙임 1 · 2 · 이 반환서 · CURRENT · INDEX.

## 5. 남은 것

1. **제품 main 합치기**: RSCH가 세 파일뿐 · 글뿐인지 보고 앞으로 감기 — 합칠 머리 **0cb507a**, 지금 main c364bf0.
2. 합친 뒤 한알이 맥 세션에 **처음 한 번** 「저장소를 새로 받아서 '지금 맥에서 할 일' 글대로 해 줘」 → 그다음부터 「맥 할 일대로 해 줘」. 맥 사본은 14:43에 c364bf0(PLN 확인 — 결과 가지 2c82371)이라 처음에 `git pull`로 받아도 들어오는 것은 글뿐.
3. 읽기 결과(다섯) 뒤 고침 4 범위는 PLN이 정함(한알 14:53:34 「클로드도 허용을 묻네요」는 RSCH가 되여쭘).

## 6. 배운 것

- 이어 쓰는 맥 대화는 저장소의 AGENTS.md 새 줄을 다시 읽지 않음 — 새 '말'을 더할 때는 처음 한 번 그 말 자체로 글을 찾게(제목에 글자 그대로) 하고, 그 글 안에 '다시 들으면 다시 읽는다'를 넣음.

## 7. 다음

- PLN: 이 반환 받음 · 합침 조건(main c364bf0 · 머리 0cb507a · 세 파일 · 글뿐)을 RSCH에.
