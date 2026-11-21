# SUB 개설 패킷 — MITCHELL_STUDIO/BTSR/RSCH/S7_QA_LOG

| 칸 | 값 |
|---|---|
| 연 이 | PRIMARY `MITCHELL_STUDIO/BTSR/RSCH` — Paseo a97bebab-51e4-4b70-b968-2177d6fe4f2e · Fable 5.2 · xhigh |
| SUB | `MITCHELL_STUDIO/BTSR/RSCH/S7_QA_LOG` (Paseo ID는 연 뒤 PRIMARY CURRENT에) |
| 실행기 | Paseo · claude(claude-naver) · **Opus 5.5 (claude-opus-5-5)** · high · auto |
| 자기 칸 | `projects/btsr/roles/rsch/sub/s7_qa_log/` (**이 칸에만 씀**) |
| 규칙 | 이 저장소 `AGENTS.md` + AAA 규칙 판 `C:/Users/ms1pk/dev/AAA/AGENTS.md`(읽기만 — 특히 9 · 25 · 30 · 34 · 35) |
| 패킷을 쓴 때 | 2026-11-21 14:34 KST (여는 것보다 먼저 — 규칙 40) |

## 근거 (한알 말씀, 원문 그대로)

- 2026-11-21 14:32:58 uuid 8886f54b: "질답을 적을 서브 세션 하나 만들어주세요 오퍼스로요."

## 왜

RSCH PRIMARY가 한알 말씀에 답하기 전에 기록부터 하다가 답이 늦었다(14:09:39 물음 → 14:15:12 답). 질답 적기는 이 SUB가 맡고, PRIMARY는 답부터 한다. 한알 = 주인이자 개발자. RSCH = 요구를 모으고 PLN · ARCH · PMO에 넘기는 역할.

## 하는 일 — PRIMARY가 「적어 주세요」를 보낼 때마다

1. **읽기(읽기만):** PRIMARY transcript `C:/Users/ms1pk/.claude/projects/C--Users-ms1pk-dev-mitchell-studio-agent/bb014593-1f51-4b36-aeac-c7a72356e466.jsonl`에서 지난번에 적은 뒤로 온 것.
   - 한알 말씀: `type == "user"`의 글(도구 결과가 아니고 `<`로 시작하지 않는 것) + `type == "attachment"` 가운데 `attachment.type == "queued_command"`(일하는 중에 온 말씀 — uuid는 `attachment.source_uuid`, 글은 `attachment.prompt`).
   - `<paseo-system …>`으로 시작하는 글은 다른 세션(PLN 등)의 글이다 — 한알 말씀이 아니다. 질답의 앞뒤 사정으로만 쓴다.
   - RSCH 답: `type == "assistant"`의 `text` 블록(생각 · 도구 부름은 아님).
   - 시각은 transcript의 `timestamp`(UTC)를 한국 시각(+9시간)으로 바꿔 적는다. 짐작하지 않는다.
   - transcript는 크다. 통째로 읽지 말고 스크립트로 필요한 줄만 뽑는다(스크립트는 자기 칸 `tools/`에 · 파이썬은 `python -I` · 경로는 `C:/…` 앞으로 빗금).
2. **`질답.md`(자기 칸)에 시간 순으로 덧붙임.** 한 건의 꼴:
   - `### HH:MM:SS — 한알 (uuid 앞 8자)` → 원문을 `> ` 인용으로 **한 글자도 바꾸지 않고**(오타 · 띄어쓰기 · 줄 바꿈 그대로)
   - `- RSCH 답 (HH:MM:SS):` 두세 줄로 줄임 — 무엇을 답했나 · 무엇을 여쭸나(번호와 선택지 · 권고)
   - 맨 위에 **'열린 물음' 표**(무엇을 · 언제 여쭘 · 선택지 · 답 받음/아직 · 답 원문)를 늘 지금 상태로 고친다. 답을 받은 물음은 '정해진 것' 표로 옮긴다.
3. **`말씀_붙일것.md`(자기 칸)** — `owner/utterances/2026-11-21.md`(날이 바뀌면 그날 파일)에 아직 없는 한알 말씀을 그 파일의 꼴 그대로 써 둔다. PRIMARY가 그대로 가져다 붙인다(**SUB는 owner/에 쓰지 않는다 — AAA 9 · 25**). 있는지는 uuid 앞 8자로 그 파일에서 찾아 본다. 꼴(한 건):

   ```
   ### 2026-11-21 HH:MM:SS KST — uuid <전체 uuid> (RSCH가 일하는 중에 보내심)   ← 괄호는 queued_command일 때만

   - 어느 창: RSCH 창 — 새 세션(Paseo a97bebab).
   - 앞 물음·맥락 · 뒤 처리(원문 아님): <앞에 무엇이 있었나>. → <RSCH가 어떻게 했나 — 읽기가 섞이면 'RSCH의 읽기'라고 적음>

   > <원문 그대로>

   ```
   PRIMARY가 붙였다고 알리면 그 건은 이 파일에서 지운다.
4. **커밋 · push — 자기 칸만, 경로를 주어:** `git add -- projects/btsr/roles/rsch/sub/s7_qa_log/` → `git commit -m "S7_QA_LOG: …" -- projects/btsr/roles/rsch/sub/s7_qa_log/` → `git push origin main`(막히면 `git pull --rebase` 뒤 다시 · 강제 push 금지). PRIMARY와 같은 작업 사본을 쓴다 — PRIMARY가 올려 둔 다른 파일을 건드리지 않는다. 커밋 끝 줄 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
5. **답은 짧게:** 적은 건수 · 커밋 해시 · 열린 물음 수 · PRIMARY가 붙일 말씀 건수. 첫 답 첫 줄은 `[MITCHELL_STUDIO/BTSR/RSCH/S7_QA_LOG · 규칙 판 v0.14 받음]`.

## 지킬 것

- 손님 · 개인 정보(이름 · 연락처 · 사진)와 키 · 비밀 값은 적지 않는다. 말씀에 있으면 그 자리만 `[가림]`으로 하고 답에 알린다.
- 한알 말씀은 고치거나 줄이지 않는다. 줄이는 것은 RSCH 답뿐이다. 말씀의 뜻을 넘겨짚어 적지 않는다(읽기는 '읽기'라고 적음).
- 하지 않는 것: `owner/` · `CURRENT.md` · `directives.md` · `knowhow.md` · 다른 칸 고치기 · 다른 세션에 연락 · 제품 저장소 · 설치 · 컴퓨터 유즈. transcript는 읽기만.
- 사용량을 아낀다: 부를 때만 일한다. 스스로 돌아보기(폴링) · 예약을 걸지 않는다.

## 첫 일

1. 오늘 14:09:39부터 지금까지의 질답을 `질답.md`에 적는다. 그 앞의 일은 `projects/btsr/roles/rsch/CURRENT.md` 맨 위 '★ 새 세션에 넘김 (14:05)' 칸 끝의 줄들만 훑어본다(더 읽지 않음).
2. `owner/utterances/2026-11-21.md`에는 14:23:51까지 적혀 있다. 그 뒤 것(14:25:05 a00ec79b · 14:32:58 8886f54b부터)을 `말씀_붙일것.md`에 쓴다.
3. 열린 물음 표를 만든다. 패킷을 쓰는 지금 열린 것: (가) 탭 · 단계 이름 — 1 원래대로 영어(권고) · 2 한글 (나) 진행 기록 자리 — 1 단계 아래 · 2 단계 위 · 3 운영자 화면에서 뺌. 아직 여쭙지 않은 것: PLN 묶음 4-b 두 물음(휴대폰 알림 글 셋 · 맥 파이썬에 `cryptography`).
