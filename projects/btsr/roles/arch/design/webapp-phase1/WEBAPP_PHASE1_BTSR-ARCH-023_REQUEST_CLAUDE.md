# BTSR-ARCH-023_webapp-terra-experience-fix3-1 — 요청 (급함 · 글 두 줄)

| 칸 | 내용 |
|---|---|
| 보내는 역할 | `MITCHELL_STUDIO/BTSR/ARCH` (PRIMARY — Paseo 7621f3de, 가지 `btsr/arch`) |
| 쓴 때 | 2026-11-22 04:20 KST |
| 받는 역할 | `MITCHELL_STUDIO/BTSR/PMO` (PRIMARY — Paseo 512aef6d) |
| 위 요청 | PLN `btsr/pln` 71caaac 고침 3 요청서 '덧붙임 5' ② — RSCH가 짚음 · 결정 49 |
| 바탕 | 고침 3이 합쳐진 main = **09655cd**(RSCH가 앞으로 감기 중 — 지금 원격 main은 아직 5bbe272). 09655cd에서 새 가지 `feat/webapp-terra-experience-20261122` · push 직전 main이 09655cd가 아니면 그 위로 다시 얹음 |
| 맥 일 | 없음 · 제품 main push 안 함 |

## 1. 고칠 것 — `agents/_terra/experience.md` '요령' 두 줄만

작업자가 카드 전에 이 '요령'을 읽고 옛 규칙대로 `pgrep`을 다시 함 → 샌드박스 안 오류 → 「멈춤 · 종료 확인」(내보내기는 저장본 대조가 없어 그대로 멈춤).

| 줄 (09655cd) | 지금 | 바꿀 글 (그대로) |
|---|---|---|
| 16 | 「카드의 Cmd+Q 끄기 확인: `sleep 3` 뒤 `pgrep -x CapCut`을 본다. …」 | `- 카드의 Cmd+Q: CapCut에 Cmd+Q를 보낸 뒤 바로 결과 줄을 쓴다. 꺼졌는지는 웹앱이 본다 (`pgrep`은 작업자 안에서 `sysmond service not found`로 안 됨 — 2026-11-22 맥).` |
| 20 | 「… **모두** 센다 (화면 보기·pgrep 포함).」 | `- 결과 줄의 「도구」 수는 카드를 읽은 명령부터 결과 줄을 쓰는 명령까지 **모두** 센다 (화면 보기 포함). 작업 로그 쓰기는 세지 않는다.` |

- 다른 줄 · 다른 파일 0. '새 기록' 칸은 그대로.

## 2. 받아들임 기준

1. `git diff --stat 09655cd <머리>` = `agents/_terra/experience.md` 하나 · 2줄 바뀜(뺀 2 · 더한 2).
2. `git grep -n pgrep <머리> -- agents/_terra/experience.md`가 16줄의 '안 됨' 설명 하나뿐 · 카드(`jobs.py`)와 서로 어긋남 0.
3. 회귀: 글뿐이므로 기본 환경 한 번(건너뜀 수 적음)이면 됨.

## 3. 반환

6항목 + 가지 머리. 반환은 ARCH(Paseo 7621f3de)로. 어림 **15분**.
