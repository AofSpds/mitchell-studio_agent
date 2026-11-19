# SUB 개설 패킷 — MITCHELL_STUDIO/BTSR/RSCH/S3_REQ_SUPPLEMENT

| 칸 | 값 |
|---|---|
| 연 이 | PRIMARY `MITCHELL_STUDIO/BTSR/RSCH` — Paseo 3233ba1f-9fe2-49b5-ac73-e9e42645d7ee · Fable 5.2 |
| SUB | `MITCHELL_STUDIO/BTSR/RSCH/S3_REQ_SUPPLEMENT` (Paseo ID는 연 뒤 PRIMARY CURRENT의 subs 칸에) |
| 실행기 | Paseo · codex · GPT-6.2-Astra (gpt-6.2-astra) · auto · xhigh(제공자 기본값) — AAA 규칙 44 "Codex(Astra) 보조는 쓸 수 있다" |
| 자기 칸 | `projects/btsr/roles/rsch/sub/s3_req_supplement/` (main 폴더. **이 칸에만 씀**) |
| 규칙 | 이 저장소 AGENTS.md + AAA 규칙 판 v0.14 (`C:\Users\ms1pk\dev\AAA\AGENTS.md`, 읽기만 — 특히 4·9·25·30·34·35·44) |
| 패킷을 쓴 때 | 2026-11-19 23:37 KST (여는 것보다 먼저 씀. 여는 것은 점검이 끝난 뒤) |

## 근거 (한알 말씀, 원문 그대로 — owner/utterances/2026-11-19.md)

- 23:32:33 uuid 4eef497b: "보고가 오면  요구사항 목록을 점검하시기 바랍니다. 오퍼스 서브에이전트들과 함께해도 좋습니다."
- 23:35:25 source_uuid de1654dd: "점검이 끝나면 아스트라 보조도 열어서 보완을 지시하세요."

## 무엇인가

미용실 릴스(짧은 세로 영상) 제작을 자동화하는 개인 웹앱 '미첼 스튜디오'의 **요구사항 목록을 보완**하는 일이다.

- 사람: **한알** = 제품 주인이자 개발자(이 저장소의 주인). **운영자** = 웹앱을 쓰는 미용실 사람(제품 저장소 기록에는 '총괄 디렉터'). 둘의 말을 섞지 않는다.
- 2026-11-19에 한알이 ChatGPT와 요구사항 인터뷰('프로챗', T1~T90)를 했고, 이어서 템플릿 인터뷰(말씀 8개)를 했다. PRIMARY가 그 둘에서 정해진 것을 목록으로 만들었고, Opus 하위 에이전트 셋이 그 목록을 점검했다. **너는 다른 계열의 모델로서 그 목록을 한 번 더 보고, 모자란 곳을 채울 안을 낸다.**
- 보완할 대상: `projects/btsr/roles/rsch/studies/2026-11-19-requirements-from-prochat.md` — 번호 요1~요29 · 템1~템5 · 미1~미11, 3번 '미루신 것', 4번 '바뀐 것', **9번 '점검 결과'**(Opus 셋이 찾은 것과 PRIMARY가 반영한 것). **이 파일을 직접 고치지 않는다** — 보완 안을 네 칸에 쓰면 PRIMARY가 옮긴다.

## 먼저 읽을 것

1. 이 저장소 `AGENTS.md`, `C:\Users\ms1pk\dev\AAA\AGENTS.md`(읽기만).
2. 보완 대상 파일 전체(위). 그리고 짝 글 `projects/btsr/roles/rsch/studies/2026-11-19-patch-plan-draft.md`(패치 기획 초벌 — 목록이 어디에 쓰이는지 알기 위해. 이 글은 보완 대상이 아님).
3. 원문(판정 기준) — `projects/btsr/roles/rsch/sub/s2_prochat_organize/`의 `PROCHAT_원문_GPT_PRO.md`(T1~T90, 134KB — 한알의 차례는 모두, ChatGPT의 차례는 필요한 곳) · `TEMPLATE_한알말씀_원문_CLAUDE.md` · 참고 `PROCHAT_정리_CLAUDE.md`.
4. 한알의 앞선 말씀 — `owner/utterances/2026-11-18.md` · `2026-11-19.md`(`>` 줄이 원문).
5. 제품 저장소 `C:\Users\ms1pk\dev\mitchell-studio`(**읽기만**, `apps/` 폴더는 보지 않음 — 내려받은 남의 코드): 확정 템플릿 `agents/rsch/templates/reel-workflow.md`, 기획서 `agents/pln/specs/`, 운영자 지침 `agents/creative_director/directives.md`, 웹앱 `app/webapp/README.md` · `jobs.py`. 필요한 줄만.
6. ChatGPT가 따로 정리한 저장본 — GitHub `AofSpds/mitchell-studio` 가지 `research/webapp-interview-20261119`의 `docs/requirements-interview/2026-11-19/`(`phase1-requirements.md` · `actual-answers.md` 등). 로컬에는 없으니 `gh api -H "Accept: application/vnd.github.raw" "repos/AofSpds/mitchell-studio/contents/docs/requirements-interview/2026-11-19/<파일>?ref=research/webapp-interview-20261119"`로 읽는다. **로컬 제품 저장소에서 fetch · checkout 하지 않는다.** 네트워크가 막혀 있으면 우회하지 말고 '읽지 못함'으로 적는다.

## 할 일 → `요구사항_보완_GPT_ASTRA.md`

항목마다 근거(프로챗 T번호 · 말씀 시각 · 파일:줄)를 달고, 한알의 말은 원문 그대로 따옴표로 인용한다.

- **가. 빠진 요구** — 한알의 말(프로챗 · 템플릿 인터뷰 · 앞선 말씀)에 근거가 있는데 목록에 없거나 약하게 적힌 것. 근거 없는 것은 넣지 않는다.
- **나. 문장을 다듬을 곳** — 요구 문장이 한알의 말보다 넘치거나 모자라거나, 두 가지 뜻으로 읽히는 곳. 고친 문장 안을 함께 적는다.
- **다. 받아들임 기준 안** — 요1~요29 · 템1~템5 가운데 "무엇을 보면 이 요구가 채워졌다고 할 수 있는지"가 목록만으로는 안 나오는 줄을 골라, 줄마다 확인할 수 있는 기준 한두 줄을 **제안**으로 적는다(`[제안]` 표시 — 한알이 정하신 것이 아님). 숫자를 지어내지 않는다. 숫자가 필요한데 말씀이 없으면 '한알께 여쭐 것'으로 돌린다.
- **라. 서로 부딪히는 곳** — 요구끼리, 또는 요구와 확정 템플릿 · 지금 웹앱의 기준이 부딪히는 곳. 어느 쪽이 나중 말씀인지.
- **마. 한알께 여쭐 것** — 목록을 닫으려면 꼭 필요한 물음만, 무거운 것부터 열 개 안쪽. 물음마다 권고안 하나와 그 까닭 한 줄. 이미 미1~미11에 있는 것은 번호로 가리키고 되풀이하지 않는다.
- **바. 점검 결과(9번)에 대한 네 판단** — 동의하지 않는 것, 점검이 놓친 것.
- **사. 확인하지 못한 것 · 읽지 못한 것.**

하지 않는 것: 설계 · 구현 방법 고르기 · 날수와 비용 어림 · 패치 기획 고치기. 요구를 지어내거나, 제안을 확정처럼 쓰지 않는다. 짐작은 `[짐작]`이라고 붙인다.

## 마무리

1. `반환.md` — 6항목(결과 · 증거 · 바뀐 것 · 남은 것 · 배운 것 · 다음). 결과에는 가~마의 줄 수와 읽은 범위를 적는다.
2. 이 칸만 경로를 지정해 커밋하고 push한다(main): `git add projects/btsr/roles/rsch/sub/s3_req_supplement/` → `git commit -m "RSCH/S3_REQ_SUPPLEMENT: 요구사항 보완 안" -- projects/btsr/roles/rsch/sub/s3_req_supplement/` → `git pull --rebase origin main` → `git push origin main`. `git add .` · `-A`는 쓰지 않는다. **커밋이나 push가 권한 · 샌드박스에 막히면 우회하지 말고 파일만 남긴 채 그대로 보고한다 — PRIMARY가 커밋한다.**
3. PRIMARY에게 보고(마지막 답): 첫 줄 `[MITCHELL_STUDIO/BTSR/RSCH/S3_REQ_SUPPLEMENT · 규칙 판 v0.14 받음]`, 이어서 **결론 한 줄 → 가장 무거운 보완 5~7줄 → 한알께 여쭐 것 → 못 한 것**, 파일 경로와 커밋 번호. 길게 쓰지 않는다.

## 지킬 것

- 이 칸 밖에는 쓰지 않는다. owner/ · CURRENT.md · studies/ · 다른 SUB 칸 · 다른 역할 폴더 · 제품 저장소 · AAA 저장소는 고치지 않는다.
- 손님 · 개인 정보(이름 · 연락처 · 사진)와 키 · 비밀 값은 어디에도 적지 않는다. 원문에 보이면 그 값만 `[가림]`.
- 프로챗 대화(ChatGPT 웹)에 접속하거나 글을 보내지 않는다. 브라우저 · 컴퓨터 유즈를 쓰지 않는다.
- 다른 세션(PLN · ARCH · PMO · S1 · S2)에 연락하지 않는다(규칙 9). 하위 세션을 더 열지 않는다.
- 지우지 않는다. Git 위험 명령(강제 push · reset --hard · 원격 삭제 등)을 쓰지 않는다. 내려받은 코드를 돌리지 않는다. 맥 전용 경로 · 명령을 쓰지 않는다(이 PC는 윈도).
- 시각은 한국 시각으로, 적기 전에 확인한다: PowerShell `[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'Korea Standard Time')`.
- 한글 파일은 UTF-8로 쓴다. 이 PC에서 파이썬으로 한글을 찍을 때는 `sys.stdout.reconfigure(encoding='utf-8')`, 파이썬은 `python -I`.
