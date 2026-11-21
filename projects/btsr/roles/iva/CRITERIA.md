# 웹앱 1차 검증 기준

출처는 에이전트 저장소 `main`의 `projects/btsr/roles/rsch/requests/BTSR-RSCH-005_iva-verify-webapp-phase1/요청.md` 3번이다.

| 기준 자료 | 읽은 판 |
|---|---|
| 요청서 005 · 한알 말씀 · 요청서 003 1–37번 · 화면 시안 3판 | `main` · `def026e656148a51601ce8b681dcd3808745c45d` |
| 결정 1–40 · 요구 2.15판 · 기획안 초안 1.6판 | `btsr/pln` · `94786bb63d21edb9c3546d5ccca0e0cb4424f1a1` |

## 3. 기준 (`CRITERIA.md`에 출처 · 판과 함께 옮긴다 — AAA 7)

어긋날 때 앞서는 차례: **① 한알 말씀 원문 → ② RSCH 요청서 003(뒤 번호가 앞 번호를 고침) → ③ 결정 글 · 요구 글 → ④ 기획안 초안 → ⑤ 시안.**

1. **한알 말씀 원문:** main `owner/utterances/2026-11-21.md`(길다 — 14:09 뒤부터 · 필요하면 앞과 `2026-11-19.md` · `2026-11-20.md`). 말씀 아래 '앞 물음 · 맥락 · 뒤 처리' 줄은 RSCH가 쓴 것(원문 아님 — 참고만).
2. **RSCH 요청서 003:** main `projects/btsr/roles/rsch/requests/BTSR-RSCH-003_webapp-phase1-capcut/요청.md` 1 – 37번. '확정'이라고 적힌 줄이 기준이고 'RSCH의 읽기 · [안]'은 한알께 되짚어 드린 것(다른 말씀이 없던 것).
3. **결정 글(결정 1 – 40) · 요구 글(2.15판):** `git show origin/btsr/pln:projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_DECISIONS_CLAUDE.md` · `…/WEBAPP_PHASE1_REQUIREMENTS_CLAUDE.md`(가지 `btsr/pln` 94786bb 또는 그 뒤).
4. **기획안 초안(1.6판 — 한알이 보시는 글):** 같은 폴더 `WEBAPP_PHASE1_PLAN_DRAFT_CLAUDE.md`. **'정하심' 줄이 기준**, '안' 줄은 보여 드렸고 다른 말씀이 없던 것, '만듦 / 아직' 표시가 실제와 맞는지도 본다.
5. **시안 3판(화면 17개):** main `projects/btsr/roles/rsch/sub/s8_uiux_rework/`(`README.md` · `s01.png` – `s17.png`).

- 기준의 판은 읽은 때의 커밋으로 적는다. **기준끼리 어긋나는 곳을 찾으면 그것도 걸린 것**으로 적는다(판정은 앞서는 쪽으로).
- 만든 쪽의 글(묶음 반환서 `origin/btsr/pln`의 `WEBAPP_PHASE1_B*_RETURN_CLAUDE.md` · 설계 글 `origin/btsr/arch` · 이 글의 설명)은 **기준이 아니다** — 길잡이로만 쓰고 그대로 믿지 않는다.
