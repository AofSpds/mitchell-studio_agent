# BTSR-PLN-002 덧붙임 — 웹앱 1차 기획안을 제품 저장소에도 (글뿐) — ARCH께 요청

| 칸 | 내용 |
|---|---|
| 요청하는 역할 | `MITCHELL_STUDIO/BTSR/PLN` (Paseo be41b33c) → ARCH (Paseo 7621f3de) |
| 쓴 때 | 2026-11-21 21:16 KST |
| 근거 | 한알 19:07:25 「기획안  깃헙 미첼 스튜디오에서도 볼수 있나요」 · 21:12:48 「올립니다」(= 2 올림) — RSCH 요청서 003 50번(에이전트 저장소 main `e9747a4`) |
| 급함 | 급하지 않음 — 맥 테스트를 막지 않게(맥 사본이 쓰는 파일은 건드리지 않음) |

## 1. 무엇을 · 어디에 · 어떤 이름으로 (PLN이 정함)

- **무엇:** PLN의 기획안 초안 **1.9판** — 에이전트 저장소 `btsr/pln` `projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_PLAN_DRAFT_CLAUDE.md`(이 요청을 쓴 때의 머리 커밋에서 그대로).
- **어디에 · 이름:** 제품 저장소 **`app/webapp/PLAN_PHASE1.md`** — 같은 폴더의 `MAC_RUN_PHASE1.md` · `README.md` 옆. 한알이 깃헙 mitchell-studio → `app` → `webapp` → 이 파일(세 번 누름). 새 맨 위 폴더를 만들지 않음(제품 `CLAUDE.md` 폴더 칸을 바꾸지 않게).
- **바꿀 것은 셋만**(본문은 1.9판 그대로):
  1. 맨 위 한 줄 더함: `> 사본 — 원본은 에이전트 저장소 mitchell-studio_agent의 기획(PLN) 글(WEBAPP_PHASE1_PLAN_DRAFT_CLAUDE.md, 1.9판). 판이 바뀌면 이 파일도 같은 판으로 다시 옮깁니다. 고칠 말씀은 기획에 주세요.`
  2. 맨 끝 '이 글의 바탕'의 '같은 폴더의 요구 글 · 결정 글'은 이 저장소에 없음 → '에이전트 저장소 mitchell-studio_agent의 `projects/btsr/roles/pln/requirements/webapp-phase1/` 요구 글 · 결정 글'로.
  3. `app/webapp/README.md`에 한 줄: '웹앱 1차 기획안(쉬운 말 한 장) — `PLAN_PHASE1.md`'.
- **원본은 에이전트 저장소 쪽**(PLN이 고침 — 결정 · 요구 판과 함께 움직임). 제품 쪽은 그 판의 사본. 판이 오르면 PLN이 같은 길(글뿐 덧붙임)로 다시 옮기게 요청.

## 2. 가지 · 맡길 길 · 합치기

- 바탕 = 제품 main(보낼 때 다시 봄 — 맥 세션이 main에 바로 올림). 새 가지 하나 · 글 두 파일(`PLAN_PHASE1.md` 새로 · `README.md` 한 줄) · 코드 · 시험 · 템플릿 · `MAC_RUN_PHASE1.md` 안 바뀜.
- 맡길 길은 ARCH가(결정 46 — 새 에이전트 여럿 열지 않음).
- 반환: ARCH → PLN(가지 머리). PLN이 조건(main · 머리 · 앞으로 감기)을 적어 RSCH에 → RSCH가 그 두 파일뿐인지 보고 push 직전 main을 다시 본 뒤 합침 → 한알께 주소.
- 손님 정보 · 키는 들어 있지 않음(1.9판은 쉬운 말 요약 · 이름은 '미첼'만).
