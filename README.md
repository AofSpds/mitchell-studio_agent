# mitchell-studio_agent — MITCHELL_STUDIO 도메인 에이전트 공간 (임시)

**미첼 스튜디오(Mitchell Studio) — 미용실 영상 작업 공간**

- 도메인: **MITCHELL_STUDIO** (키 `mitchell_studio`). RHS·MPP와 같은 급의 도메인이며 AAA 규칙을 따릅니다. AAA 도메인 등록부(AofSpds/AAA `domains/`) 등록은 아직입니다 — AAA 조정 세션 몫.
- 첫 프로젝트: **BTSR(부트스트랩)** — `projects/btsr/`
- 역할: **RSCH**(연구) 하나 — 세션 이름 `MITCHELL_STUDIO/BTSR/RSCH`, 자리 `projects/btsr/roles/rsch/`. 요구사항과 구현을 연구합니다.
- 짝 제품 저장소(도메인 공간 — 제품 코드·요구·설계·자료): **AofSpds/mitchell-studio** — https://github.com/AofSpds/mitchell-studio
- 에이전트 기억은 이 임시 `_agent` 저장소에 둡니다.
- 규칙: [AGENTS.md](AGENTS.md)

## 한알 말씀 (원문 그대로 — 전체는 owner/utterances/2026-11-18.md)

2026-11-18 21:32:44 KST (uuid c4bcf9ce-ba98-4ea5-b41f-8beb0d1f4205):

> 네 둘이 섞여 있는게 좀 가장 큰 문제로 생각했습니다. 일단은 byul에서 모두 분리를 할 생각이라 byul이 선행되어야 하는것입니다.
>
> 그래서 임시로 다섯개의 새 프로젝트도 서픽스로 _agent를 붙여 그곳에 agent의 기억을 담을 생각입니다.

2026-11-18 21:42:50 KST (uuid a84e9602-2474-4cbb-bcb5-3fdaf07510d7):

> 아 분리는 아닙니다. 모두 aaa 하위예요. agent 공간이 통합된다는 게 뭐 그런 뜻입니다.

2026-11-18 21:44:02 KST (uuid 45ad2216-c203-4764-95a8-479e3ee77df4 — source_uuid, 진행 중에 보낸 글(transcript queued_command 줄)):

> rhs와 mpp 같은 형태로 하면 됩니다.

2026-11-18 21:44:34 KST (uuid 3b0bc49a-799a-462e-bf72-7679896a53ce — source_uuid, 진행 중에 보낸 글(transcript queued_command 줄)):

> 아 rsch는 모두 btsr이라는 프로젝트에 속해 있으면 됩니다.

2026-11-18 21:44:44 KST (uuid 9353e85a-30c1-4815-9184-55ab21dfb657 — source_uuid, 진행 중에 보낸 글(transcript queued_command 줄)):

> btsr은 부트스트랩입니다.

2026-11-18 21:46:51 KST (uuid d2d7dc31-a771-439f-b252-f11c9c156df4):

> 네 맞습니다. aaa에 domains가 있을겁니다.

## 폴더

```
<이름>_agent/
├─ README.md        이 저장소가 무엇이고 짝이 되는 제품 저장소가 어디인지
├─ AGENTS.md        모든 세션이 지킬 공통 규칙
├─ CLAUDE.md        한 줄: @AGENTS.md (Claude 세션이 같은 규칙을 읽게)
├─ owner/           한알 말씀 원문(날짜순)과 확정된 요구 목록 — 도메인 것
│  ├─ utterances/<날짜>.md   그날 이 도메인에 해당하는 한알 원문
│  └─ REQUIREMENTS.md        확정된 요구 목록(R-0001…)
├─ decisions/       결정 기록(D-0001…) — README.md에 양식 — 도메인 것
└─ projects/
   └─ btsr/         첫 프로젝트 BTSR(부트스트랩)
      └─ roles/
         └─ rsch/   역할 RSCH — 세션 <도메인>/BTSR/RSCH
            ├─ directives.md   한알이 정한 지침
            ├─ knowhow.md      일하며 배운 것
            ├─ CURRENT.md      지금 상태와 다음 할 일
            ├─ logs/           작업 기록(_template.md)
            └─ studies/        연구 결과
```

## 기록

- 2026-11-18 21:41 KST: 한알 말씀(2026-11-18 21:32:44·21:35:48·21:36:44 KST)에 따라 NORN 대리의 하위 세션(NORN/S5_REPO)이 뼈대만 만듦.
- 2026-11-18 21:50 KST: 한알 말씀(21:42:50~21:46:51 KST)에 따라 RHS 꼴로 맞춤 — MITCHELL_STUDIO 도메인 · BTSR 프로젝트 · RSCH 역할, `roles/rsch/` → `projects/btsr/roles/rsch/`.

요구사항·연구 내용은 아직 없습니다.
