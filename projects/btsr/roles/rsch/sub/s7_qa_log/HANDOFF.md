# S7_QA_LOG 승계 글 — 새 세션은 이것과 `OPEN_PACKET.md`만 읽고 이어 간다

- 쓴 이 · 때: 옛 S7(Claude 세션 45bf9ee4 · Paseo fd5d63e1 · Opus 5.5) · 2026-11-22 02:17 KST 무렵
- 근거: 한알 2026-11-22 02:13:40 (uuid 94130d14) 「s7도 승계시키세요.」 · RSCH가 새 세션을 열고, 새 세션이 '받음'을 알린 뒤 옛 세션에 CLOSED를 붙임

## 1. 하는 일 (한 줄)

RSCH PRIMARY가 「적어 주세요」를 보내면, RSCH 창의 지난번 뒤 한알 말씀(원문 그대로)과 RSCH 답(줄여서)을 `질답.md`에 덧붙이고, 열린 물음 표를 지금 상태로 고치고, owner/에 아직 없는 말씀만 `말씀_붙일것.md`에 써 둔 뒤 커밋 · push하고 한두 줄로 답한다.

## 2. 바뀐 것 (패킷 뒤에 정해진 것 — 꼭 지킴)

- **RSCH 창 지켜보기는 끔** — 한알 2026-11-22 01:27:45 (uuid 17923627) 「끄세요」. `tools/watch_primary.py` · Monitor를 켜지 않는다. 폴링 · 예약도 안 한다. **RSCH의 「적어 주세요」가 올 때만** 적는다.
- RSCH가 '답 필요 없음'이라고 하면 **답하지 않는다**(적고 커밋만).
- 이 S7 창에 한알이 직접 물으시면 답한다(패킷 덧붙임 · 2026-11-21 14:40). 정하는 일(결정 · 승인)은 받지 않고 원문을 적어 RSCH에 넘긴다. 그 말씀도 `질답.md` · `말씀_붙일것.md`에 같은 꼴로 적는다('어느 창'은 S7_QA_LOG 창).
- 여러 에이전트(서브 세션 · 보조)는 작업 의뢰서에 적고 한알 확인을 받은 뒤에만(한알 11-21 18:41:14). S7은 열지 않는다.
- '딱 한 명이 쓰는 개인 앱'(한알 11-21 18:33:56) — 막기 · 지키기 · 확인으로 일을 늘리지 않는다.

## 3. 읽는 곳

- RSCH 창 transcript(읽기만): `C:/Users/ms1pk/.claude/projects/C--Users-ms1pk-dev-mitchell-studio-agent/9281f0ee-13b1-464d-a5e0-cdf4f156a14e.jsonl` (RSCH Paseo ed5ef600 · 11-21 16:58 뒤). 11-21 16:58 앞은 `bb014593-1f51-4b36-aeac-c7a72356e466.jsonl`. RSCH가 또 승계되면 RSCH가 새 transcript를 알려 줌 — 그때 `tools/extract_qa.py`의 `TR`을 바꾼다.
- 말씀 원문 파일: `owner/utterances/<그날>.md` — 지금은 `2026-11-22.md`(자정 뒤 말씀은 그날 파일). 붙었는지는 `git show origin/main:owner/utterances/<날>.md | grep "uuid <앞 8자>"`로 본다.
- S7 창에서 하신 말씀은 S7 자기 transcript(새 세션의 Claude 세션 ID `.jsonl`)에서 찾는다.

## 4. 도구 (`tools/` · 명령 그대로 · 파이썬은 `python -I`)

```bash
cd /c/Users/ms1pk/dev/mitchell-studio_agent/projects/btsr/roles/rsch/sub/s7_qa_log/tools
python -I extract_qa.py 2026-11-22T02:15:05            # 이 KST 시각 뒤의 한알 말씀 · RSCH 답 · 다른 세션 글을 차례로
python -I extract_qa.py 2026-11-22T02:15:05 | grep -E '^=====' # 목록만
python -I extract_qa.py <시각> <다른 transcript 경로>    # 다른 transcript
```

- 종류 표시: `HANAL`(한알 말씀) · `HANAL_Q`(RSCH가 일하는 중에 보내심 — 말씀 파일 머리에 괄호) · `RSCH`(답) · `OTHER` · `OTHER_Q`(다른 세션 · 알림 — 말씀 아님, 맥락으로만). `isMeta` · 압축 요약 · `<`로 시작하는 글은 이미 거름.
- 그림만 있는 말씀은 글이 비어 목록에 안 나올 수 있다 — RSCH 알림의 uuid로 확인하고 '(글 없음 — 사진 1장 …)'로 적는다. 사진은 저장소에 넣지 않는다.
- `watch_primary.py`는 쓰지 않는다(위 2).
- 긴 기록 고침은 heredoc 안 인라인 파이썬이 글자 깨짐으로 실패한 적이 있다 → 파이썬 파일(예: `%TEMP%`의 임시 파일)로 써서 `python -I <파일>`로 돌린다. 줄을 고칠 때는 `assert a in s` 뒤 `replace(a,b,1)`.

## 5. 적는 꼴

`질답.md`
- 맨 위 머리: 읽은 곳 · **적은 끝(마지막 KST 시각)** · 시각 규칙.
- `## ★ …` 칸들: 큰 흐름(새 일 · 합침 · 승계 등). 위가 새것.
- `## 열린 물음 (지금 상태 · <시각>)` 한 줄에 지금 상태를 요약하고, 아래 표 `| 칸 | 무엇을 | 언제 여쭘 | 선택지 | 답 | 답 원문 |`. 칸 이름은 한 글자(가 · 나 · …). **이미 쓴 이름을 다시 쓰지 않는다**(쓴 것: 가 나 다 라 마 바 사 아 자 차 카 타 파 하 거 너 더 러 머 버 서 어 저 처 커 터 퍼 허 고 노 도 로 모 보 소 오 조 초 코 토 포 호). 다음은 '구'부터.
- `## 정해진 것` 표 `| 무엇을 | 언제 여쭘 | 어떻게 닫힘 |` — 닫힌 물음을 맨 위에 더한다(답 원문 · uuid · 넘긴 번호).
- `## 질답 (시간 순)` 아래(날이 바뀌면 `## 2026-11-22` 같은 날 칸): `### HH:MM:SS — 한알 (uuid 앞 8자)[ · RSCH가 일하는 중에 보내심 | · S7_QA_LOG 창에서 하신 말씀]` → 원문 `> `(줄 그대로 · 빈 줄도 `> `) → `- RSCH 답 (HH:MM:SS): …` 줄임. 다른 세션 글은 `맥락 — HH:MM:SS 누구: …`. 한알 말씀 없는 RSCH 알림은 `- RSCH (HH:MM:SS, 한알께 · 한알 말씀 없이): …`. transcript에 아직 없는 답은 '(PRIMARY 알림)'이라 밝혀 적고, 다음에 원문으로 바꾼다.

`말씀_붙일것.md` — owner/에 아직 없는 말씀만. 꼴은 `OPEN_PACKET.md` 3번(머리 `### <날> HH:MM:SS KST — uuid <전체>[ (RSCH가 일하는 중에 보내심)]` · 어느 창 · 앞 물음·맥락 · 뒤 처리 · 원문). 붙일 날 파일이 다르면 '(→ `owner/utterances/<날>.md`)'를 적는다. PRIMARY가 '붙였다'고 하거나 grep으로 붙은 것이 보이면 지운다.

## 6. 지키는 것

- 한알 말씀은 한 글자도 안 바꾼다(오타 · 띄어쓰기 · 줄 바꿈 · 끝 빈칸). 넘겨짚으면 'S7의 읽기' · 'RSCH의 읽기'라고 적는다.
- 주소 · 계정 · 손님 정보 · 키는 적지 않는다. **맥의 https 주소(`…ts.net`)는 옮기지 않고 '맥의 https 주소'로만**(PRIMARY 11-21 21:3x). 계정 메일 · 기기 이름 · 망 이름도 안 적음.
- 시각은 transcript `timestamp`(UTC) + 9시간으로 확인해서 적는다. 짐작하지 않는다.
- 쓰는 곳은 이 칸 `projects/btsr/roles/rsch/sub/s7_qa_log/`만. owner/ · CURRENT · directives · knowhow · 다른 칸 · 제품 저장소는 안 건드린다. 다른 세션에 먼저 연락하지 않는다(한알이 이 창에서 시키시면 예외 — 11-21 14:52:33처럼).

## 7. 커밋 · push

```bash
cd /c/Users/ms1pk/dev/mitchell-studio_agent
git fetch -q origin main && git status -sb | head -1          # 뒤처졌으면 pull --rebase (다른 세션의 커밋 안 된 수정이 있으면 pull이 막힘 — 그땐 내 커밋만 하고 push)
git add -- projects/btsr/roles/rsch/sub/s7_qa_log/
git commit -q -m "S7_QA_LOG: <무엇>" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- projects/btsr/roles/rsch/sub/s7_qa_log/
git push -q origin main   # 원격이 한 번 'failed'로 거절한 적 있음 — 그대로 다시 push · 강제 push 안 함
```

작업 사본은 PRIMARY · 다른 세션과 같다 — 남의 파일은 add하지 않는다. 저장소 뿌리의 이상한 폴더 `C:SERSMS1PKAPPDATAocaltemp/`는 건드리지 않는다.

## 8. 마지막으로 적은 곳 · 남은 것

- **마지막으로 적은 곳:** RSCH 창 2026-11-22 02:15:04 KST (RSCH 답 uuid b0bb2593) — 한알 02:13:40 (uuid 94130d14) 「s7도 승계시키세요.」까지. 다음 「적어 주세요」에서는 `python -I extract_qa.py 2026-11-22T02:15:05`부터.
- **열린 물음(표):** '보' — 「오늘 밤 맥에 한 줄을 넣어 두실지」(11-21 23:11:52). RSCH가 01:56:27에 '지금 넣지 말고 아침에 휴대폰 테스트를 시작하실 때'라고 답해 사실상 풀림 — RSCH가 닫으면 '정해진 것'으로 옮긴다. 그 밖에 '예시에서 빼거나 더할 것(없으면 이대로)'(01:39:32)이 가볍게 열려 있음.
- **기다리는 일(맥락):** 보내기 고침 2(가지 `feat/webapp-upload-stall2-20261122`) 합침 어림 03:40 → 그 뒤 PMO 저장 · 승계(한알 02:13:24) · 아침 휴대폰 테스트 — 맥 첫 줄 「fetch 하고 origin/main의 MAC_RUN 글대로 1-3(새 판 받기)을 다시 한 뒤 1-6부터 1회차 끝까지 해 줘. 묻지 말고. 2회차는 하지 마.」 · 제품 main 지금 8b0d084.
- **붙일 말씀 남은 것:** 1건 — S7 창 2026-11-21 17:34:41 (uuid 85a957c8) 「백그라운드 작업 뭘까요」 → `owner/utterances/2026-11-21.md`(아직 안 붙음 · `말씀_붙일것.md`에 있음).
- **새 세션 첫 일:** 이 글과 `OPEN_PACKET.md`를 읽고 → 이 글 끝에 '받음' 한 줄(시각 · 새 세션 ID) → 커밋 · push → RSCH에 '받음'만 알림(RSCH가 옛 세션에 CLOSED를 붙임). 지켜보기는 켜지 않는다.

## 9. 받음

- 받음: 2026-11-22 02:18:23 KST — 새 S7(Claude 세션 1af28c73-09c1-4135-b276-f7a3afea2881 · Paseo f6ef2ff6-1713-410f-8b72-2568d58733d8 · Opus 5.5). HANDOFF · OPEN_PACKET 읽음. 지켜보기는 켜지 않음 — 「적어 주세요」가 올 때만 `extract_qa.py 2026-11-22T02:15:05`부터 적음.
- 2026-11-28 01:25(옛 RSCH CLOSED 01:25:18): RSCH PRIMARY 승계(옛 ed5ef600 → 새 Paseo ae883848 · Claude 263f25e7 · 구글 계정 Fable). `tools/extract_qa.py`의 `TR`을 새 transcript `C:/Users/ms1pk/.claude-max/projects/C--Users-ms1pk-dev-mitchell-studio-agent/263f25e7-262c-41af-a244-677f9ac1ca21.jsonl`로 바꿈(옛 경로는 그 줄 위 주석). 「적어 주세요」는 이제 새 RSCH가 보냄.
