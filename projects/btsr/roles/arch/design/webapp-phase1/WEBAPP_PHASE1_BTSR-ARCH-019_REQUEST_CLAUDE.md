# BTSR-ARCH-019_webapp-mac-test-doc-add3 — 요청

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 7621f3de, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-21 21:17 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 7837ebd8) |
| 위 요청 | PLN 요청 `btsr/pln` c6623fe `projects/btsr/roles/pln/requirements/webapp-phase1/WEBAPP_PHASE1_MACTEST_DOC_ADD3_REQUEST_CLAUDE.md` — RSCH 요청서 003 49 · 51번 · 맥 결과 글(제품 `mactest/webapp-phase1-results` b9ceefc) · 결정 45 |
| 급함 | 급하지 않음 — 맥은 RSCH 한 줄로 1-6부터 다시 도는 중. **맥 사본에 이 글을 넣는 일 없음** |
| 바탕 | 제품 main — push 직전 `origin/main`을 다시 보고 그 위로. **BTSR-ARCH-018(`PLAN_PHASE1.md`) 가지가 아직 안 올라갔으면 같은 가지에 커밋 하나 더해도 됨**(파일이 다름), 이미 올라갔으면 새 가지 `feat/webapp-mac-test-doc-add3-20261121` |
| 바꾸는 것 | `app/webapp/MAC_RUN_PHASE1.md` 한 파일 · 커밋 하나 · 글뿐 |
| 맥 일 · main push | 없음 · 보조 새로 열지 않음(결정 46) |

## 1. 넣을 것

1. **3-3 HTTPS 켜는 곳**(49번): 아이폰 Safari `login.tailscale.com/admin/dns` → ☰ → DNS → 맨 아래 **HTTPS Certificates** — 'Enable HTTPS'면 누름 / 'Disable HTTPS…'면 이미 켜진 것(누르지 않음).
2. **1-6 · 🖥 걸음 앞 한 줄**: 한알께 "지금부터 N분쯤 맥을 만지지 말아 주세요(다른 앱을 앞으로 꺼내지 않기)" — N은 그 걸음 어림. 휴대폰 https(다른 세션)는 🖥 걸음 사이나 테스트 뒤에.
3. **1-6 한 번 더**: 작업자가 답한 이름이 앞뒤 확인과 다르면 바로 끝내지 말고 한 번 더 — 두 번 다 다르면(아래 5의 기준으로도 안 되면) 멈춤.
4. **맡겨 둔 때 1-6이 두 번 다 안 되면(PLN이 정함)**: 작업자가 드는 걸음은 건너뛰고, 작업자 없이 되는 걸음(예: 2-11 · 2-12)만 하고 결과를 올린 뒤 한 줄 남기고 멈춤.
5. **1-6 '됨'의 기준을 바로잡음(ARCH가 정함)**: 1-6의 뜻은 '작업자가 허락 창 없이 맥 화면을 한 번 보고 앱 이름 하나를 답하고 끝나는지'(결정 15 · 맥 0-나). 이끄는 쪽의 '전면 앱' 확인은 OS가 보는 활성 앱(명령을 돌리는 이끄는 쪽 앱이 나오기 쉬움)이고, 작업자는 화면에 보이는 맨 위 창을 봄 — 둘은 같지 않을 수 있음. → **답한 이름이 그때 맥에 떠 있는(보이는) 앱 가운데 하나면 됨**(`osascript -e 'tell application "System Events" to get name of every process whose visible is true'`로 확인, 결과에는 이름 대조 '같음 / 보이는 앱 중 하나 / 없음'만). 허락 창 · 누름 · 창 바뀜 · 앱 목록에 없는 이름이면 안 됨.

## 2. 받아들임 기준

- `git diff --stat <바탕 main> <머리>`에서 이 건의 몫은 `MAC_RUN_PHASE1.md` 하나(018과 같은 가지면 `PLAN_PHASE1.md` · `README.md`가 함께 보임 — 커밋이 나뉨).
- 1–5가 1-6 · 3-3 · 공통 '맡겨 두기' 자리에 있음 · 회귀 OK.

## 3. 반환

가지 머리 · diff · 시험 결과. 반환은 ARCH(Paseo 7621f3de)로.
