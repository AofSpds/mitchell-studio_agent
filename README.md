# mitchell-studio_agent — 미첼 스튜디오(Mitchell Studio) 에이전트 공간 (임시)

이 저장소는 **미첼 스튜디오(Mitchell Studio) — 미용실 영상 작업 공간** 프로젝트의 **에이전트 공간**입니다.
세션의 지침·기억·상태·기록·연구를 둡니다.

- 짝 제품 저장소(도메인 공간 — 제품 코드·요구·설계·자료): **AofSpds/mitchell-studio** — https://github.com/AofSpds/mitchell-studio
- 임시 자리: 에이전트 공간과 도메인 공간의 최종 분리는 별(BYUL)에서 합니다. 그 전까지 이 저장소가 임시 자리이고, 별이 준비되면 통째로 옮깁니다.
- 지금 역할: rsch(연구) 하나 — 요구사항과 구현을 연구합니다.
- 규칙: [AGENTS.md](AGENTS.md)

## 폴더

```
<이름>_agent/
├─ README.md        이 저장소가 무엇이고 짝이 되는 제품 저장소가 어디인지
├─ AGENTS.md        모든 세션이 지킬 공통 규칙
├─ CLAUDE.md        한 줄: @AGENTS.md (Claude 세션이 같은 규칙을 읽게)
├─ owner/           한알 말씀 원문(날짜순)과 확정된 요구 목록
│  ├─ utterances/<날짜>.md   그날 이 프로젝트에 해당하는 한알 원문
│  └─ REQUIREMENTS.md        확정된 요구 목록(R-0001…)
├─ decisions/       결정 기록(D-0001…) — README.md에 양식
└─ roles/
   └─ rsch/
      ├─ directives.md   한알이 정한 지침
      ├─ knowhow.md      일하며 배운 것
      ├─ CURRENT.md      지금 상태와 다음 할 일
      ├─ logs/           작업 기록(_template.md)
      └─ studies/        연구 결과
```

## 처음

2026-11-18 21:41 KST, 한알(Owner) 말씀(2026-11-18 21:32:44·21:35:48·21:36:44 KST — owner/utterances/2026-11-18.md)에 따라 NORN 대리의 하위 세션(NORN/S5_REPO)이 뼈대만 만들었습니다. 요구사항·연구 내용은 아직 없습니다.
