# MITCHELL_STUDIO/BTSR/RSCH — 기획 보강용 연구 패킷

- 작성 기준: 2026-11-20 (KST)
- 전달 대상: 현재 `MITCHELL_STUDIO/BTSR/RSCH` 작업자
- 목적: 진행 중인 시술 릴스 1차 기획에 **OpenChatCut 경쟁 후보**와 **AI 내레이션 공급자** 검토 결과를 보충한다.
- 성격: **연구 참고자료 / 변경 제안**. 기존 확정 요구사항이나 역할 권한을 변경하는 지시가 아니다. 코드 변경·머지·배포·유료 결제는 승인 전 실행하지 않는다.

## 0. 결론 요약

**권고: 지금의 OpenCut Classic 맥북 실험(T)은 그대로 진행하고, OpenChatCut은 별도 비교 PoC 후보로 등록한다.** 기존 Mitchell Studio 웹앱·에이전트·품질 검사·원본 보호 체계는 보존한다. 편집 엔진 교체 여부는 재현 품질, 무인 작업 범위, 편집 상태 왕복, 모바일 UX, 라이선스, 비용을 실제 측정한 다음 판단한다.

이번 신규 확인 사항 가운데 특히 중요한 것은 **OpenChatCut이 외부 MCP에서 `export`를 제외하지만, 별도 `occ render` CLI가 저장된 프로젝트를 무인 렌더링할 수 있다는 점**이다. 따라서 `MCP 편집 → 승인/적용 → CLI 렌더`는 PoC 가치가 있다. **반대로 `occ media`는 현재 읽기 전용이며 CLI 자체에서 원본 영상 가져오기를 지원하지 않는다.** 완전 무인 파이프라인의 선결 과제는 **소재 인입·프로젝트 매핑**이다. OpenChatCut의 코드 제공 여부는 실제 통합·실행 가능성의 증거가 아니다.

## 1. 기존 프로젝트와 충돌하지 않을 기준

확인한 기준 저장소:
- [제품 저장소 `AofSpds/mitchell-studio`](https://github.com/AofSpds/mitchell-studio), `main` HEAD `0636fa0d16cc56050dd026465184cab2e52ecdc4`.
- [에이전트 저장소 `AofSpds/mitchell-studio_agent`](https://github.com/AofSpds/mitchell-studio_agent), `main` HEAD `9b22e8270b0c08421fab80ac0ed209defade5e01`.
- [현재 RSCH 기획 초안](https://github.com/AofSpds/mitchell-studio_agent/blob/main/projects/btsr/roles/rsch/studies/2026-11-20-plan-draft.md)과 [OpenCut 통합 연구](https://github.com/AofSpds/mitchell-studio_agent/blob/main/projects/btsr/roles/rsch/studies/2026-11-20-opencut-in-webapp.md).
- [OpenCut Classic 시험 브랜치](https://github.com/AofSpds/mitchell-studio/tree/test/opencut-classic-20261120/app/opencut-test): `convert.mjs`(장면표→프로젝트), `diff.mjs`(변경분 되받기), `render.mjs`(무인 렌더), 포크 패치, 테스트가 있음. 연구 기록상 PC 합성 시연은 통과했으나 실제 Mac·iPhone·기존 승인 릴스 품질은 미검증.

이미 정해진 1차 범위: **시술 릴스**. 기존 연출을 우선 정확히 재현한다. 운영자는 비개발자이며 웹앱에서 쉽게 확인·승인·수정할 수 있어야 한다. 필수 소재가 없을 때에도 가능한 경로로 진행하되 누락을 알려야 한다. 연출 변경은 제안 후 사용자 승인. 실패는 로그로 남기고 운영자 판단을 구하며, 해결되지 않으면 개발자가 개입할 수 있게 한다. **게시 자동화는 2차**. 성능보다 원본·편집 상태·기존 기능의 보존이 우선이며, 운영비는 낮게 유지하는 방향을 검토한다.

현재 역할 분담(`RSCH → PLN → ARCH → PMO`)은 유지한다. 신규 제안을 곧바로 확정 요구(R-) 또는 결정(D-)으로 승격하지 않는다.

## 2. OpenChatCut 조사: 확인된 구현

소스 기준: [0xsline/OpenChatCut](https://github.com/0xsline/OpenChatCut), `main` HEAD `f96502a18e65a09c19324b10feb671bb505056bd`(최종 확인 커밋 시각 2026-11-12 UTC), `package.json` 버전 `0.2.17`, 라이선스 `AGPL-3.0-or-later`. 공식 README는 활성 개발·로컬 우선 편집기라고 설명한다.

| 계층 | 소스에서 확인한 사실 | 의미·주의 |
|---|---|---|
| 편집 코어 | 실제 멀티트랙 타임라인, 편집 명령, 되돌리기·버전, 제안 적용 구조 | AI 변경을 검토하고 원복할 수 있는 후보 |
| 외부 MCP | `http://localhost:5199/api/external-mcp/mcp` (Streamable HTTP) | Claude Code·Codex 연결 가능; 앱 및 대상 프로젝트를 열어야 하는 기능 있음 |
| MCP 승인 | `begin_edit_session` → 편집 도구 → `review_edit_session` → `get_edit_session`; `manual`과 `auto` 모드 존재 | `auto`는 제안 적용을 자동 처리하므로 운영자 승인 정책과 혼동 금지 |
| MCP 제한 | 원상복구 불가능한 생성·내보내기·프로젝트 삭제 도구는 외부 편집 세션에 노출하지 않음 | **MCP만 연결했다고 무인 MP4 완성은 아님** |
| 별도 CLI | `occ project`, `occ timeline`, `occ edit --ops`, `occ tools`, `occ render`, `occ export jianying` | 앱 화면을 누르지 않고 일부 프로젝트 작업과 최종 렌더링 가능 |
| 렌더링 | `cli/commands/render.ts`는 기존 서버의 export plan과 Remotion 렌더 경로를 이용, `--out`, `--fps`, `--codec`, `--dry-run` 지원 | H.264 실출력·오디오 코덱·시간·화질은 Mac에서 측정 필요. 내부적으로 헤드리스 렌더 인프라는 사용됨 |
| CLI 편집 | `occ edit --ops @ops.json --apply`로 여러 변경을 한 번에 커밋, `--apply` 생략 시 드라이런 | 수정·검증·이력 추적에 유리. 실제 사용 가능 도구 목록은 `occ tools ls`로 확인 필요 |
| **CLI 미지원** | `cli/commands/media.ts` 명시: 원본 미디어 import는 현재 CLI에서 불가, `media ls`만 지원 | **무인 업로드→타임라인 변환의 핵심 공백**. 앱 media pool/데스크톱 agent import 도구의 안전한 연동 방식 별도 설계 필요 |
| 실행환경 | Node.js `>=24.22.1 <25`, React/TypeScript/Remotion/FFmpeg, 웹·Electron | 기존 Mitchell Studio 환경과 의존성·자원 사용량 비교 필요 |
| 원격 접속 | localhost 또는 HTTPS가 필요. 외부 HTTP 접근만으로는 브라우저 편집 불가 | 기존 Tailscale/HTTPS 및 iPhone Safari 검증 과제와 연결 |
| 보안 | API 키 서버 보관, MCP 토큰 설정 가능. README는 단일 사용자·단일 머신 용도라고 명시 | 운영자 원격 접속 경계, 손님 데이터·로컬 경로·임시 작업 저장소 분리 필요 |

정확한 구현 근거:
- [README — MCP 및 승인](https://github.com/0xsline/OpenChatCut/blob/main/README.md#using-openchatcut-with-codex--claude-code)
- [CLI 명령](https://github.com/0xsline/OpenChatCut/blob/main/cli/main.ts)
- [CLI 실제 렌더](https://github.com/0xsline/OpenChatCut/blob/main/cli/commands/render.ts)
- [CLI 미디어 가져오기 한계](https://github.com/0xsline/OpenChatCut/blob/main/cli/commands/media.ts)
- [CLI 원자적 편집](https://github.com/0xsline/OpenChatCut/blob/main/cli/commands/edit.ts)
- [macOS 렌더 벤치(기종 한정)](https://github.com/0xsline/OpenChatCut/blob/main/MACOS-RENDER-TUNING.md)
- [LICENSE](https://github.com/0xsline/OpenChatCut/blob/main/LICENSE)

## 3. OpenCut Classic과의 기획상 비교

| 기준 | OpenCut Classic(현재 PoC) | OpenChatCut(신규 비교 PoC) | 기획 판단 |
|---|---|---|---|
| 기존 시스템 연결 | 장면표 변환·되받기·렌더 패치 작성됨 | 편집 상태·프로젝트 포맷 변환기를 새로 검증해야 함 | **현행 우세** |
| AI 외부 편집 | 기존 판에 별도 통합 필요 | 외부 MCP 편집 세션 이미 구현 | **OpenChatCut 우세** |
| 무인 MP4 | 현재 시험용 headless Chrome 구현 | 저장된 프로젝트는 `occ render`로 출력 가능 | 두 엔진 같은 소재로 비교 필요 |
| 무인 미디어 인입 | 현재 `convert.mjs`가 파일 묶음 생성 | `occ media`로는 import 불가 | **OpenChatCut의 주요 공백** |
| 편집 승인·이력 | Mitchell 자체 승인/리비전 설계 중 | proposal/manual·auto 및 편집 히스토리 제공 | 참고 가치 높음, 기존 사용자 승인 정책과 별도 |
| Mac/iPhone | Mac·iPhone 실제 시험 예정 | Mac·iPhone 적합성 별도 검증 | 어느 쪽도 최종 통합 확정 아님 |
| 라이선스 | Classic: MIT(의존성·브랜드 별도 확인) | `AGPL-3.0-or-later` | **OpenChatCut 포크·내장·네트워크 제공 시 법무 검토** |

AGPL은 공개 리포지토리라는 뜻이지 내부 제품에 제약 없이 복사해도 된다는 뜻이 아니다. 특히 수정된 AGPL 소프트웨어를 네트워크 사용자가 이용하는 구성에서 소스 제공 의무가 발생할 수 있다. 독립 프로세스와 연계하는 방식도 구체적 결합과 배포 형태에 따라 검토해야 하므로 **라이선스 결론을 사전에 단정하지 말 것**. 공식 라이선스 본문과 배포 구조를 기준으로 확인한다.

## 4. 완전 무인 편집 실현을 위한 추가 조사

**제안 아키텍처(확정 아님)**

```text
운영자 웹앱/원본 등록 → 공통 작업·장면·자막·음성 상태(리비전)
                         ↓
             Editor Adapter (엔진 교체 가능)
            ↙                         ↘
OpenCut Classic                   OpenChatCut
변환/패치/헤드리스 렌더            미디어 인입 검증 → MCP 또는 CLI 편집
                                     ↓
                              적용된 프로젝트 → occ render
            ↘                         ↙
             MP4 검사/음성 겹침 검사/프리뷰
                         ↓
                운영자 승인 또는 수정 요청
```

공통 편집 상태는 원본·시술 장면·AI 합성 표시·반복 장면·자막↔목소리 연계·시간·템플릿 버전·승인 상태를 보존해야 한다. OpenCut과 OpenChatCut 각각의 프로젝트 포맷을 곧바로 시스템의 유일한 진실로 고정하지 말고, **손실 없는 왕복 변환과 리비전 복구가 가능한지 ARCH가 결정**하도록 한다. OpenChatCut의 제안 적용 완료는 **Mitchell 운영자 최종 승인과 별도 사건**으로 기록한다.

### OpenChatCut 격리 PoC 명령 예시 (실행 지시 아님)

```bash
# 독립된 테스트 체크아웃 + 가짜 소재만 사용; Node 24.22.1 이상 25 미만 필요
npm install
npm run occ -- project new ms-poc --size 1080x1920 --fps 30 --json
npm run occ -- tools ls --json
npm run occ -- project list --json
# 편집 가능한 테스트 프로젝트에 가짜 소재를 정식으로 import한 뒤에만:
npm run occ -- render ms-poc --out /tmp/ms-poc.mp4 --codec h264 --fps 30 --dry-run --json
npm run occ -- render ms-poc --out /tmp/ms-poc.mp4 --codec h264 --fps 30 --json
```

주의: 이 명령만으로는 미디어가 자동 추가되지 않는다. `occ render`는 **저장된 유효한 타임라인**이 있어야 작동한다. `occ media import` 명령을 임의로 만들지 말 것. 실제 PoC에서는 **앱의 미디어 풀 또는 데스크톱 에이전트가 지원하는 `import_asset`/`import_folder`**로 먼저 소재를 넣고, 웹앱의 승인된 소재만 선택하도록 한다. `--data-dir`와 dev profile 차이에 따른 프로젝트 불일치도 검증한다.

## 5. AI 음성 공급자: 이번 대화의 보강 사항

| 후보 | 공식 조건/확인 | 기획 반영 |
|---|---|---|
| **TTSMaker Free** | 주당 2만 자, 상업 이용 가능. **무료 플랜 API 없음**. Pro/Studio만 공식 API, Lite도 API 없음 | 무료 보이스 품질 비교 용도는 가능. **완전 무인 운영의 기본 API 경로로 가정 금지** |
| **Vrew Free** | 월 200크레딧, 전부 음성에 사용하면 최대 약 2만 자. 상업적 사용 가능 | 시료 제작·운영자 청취 시험 후보. 외부 에이전트용 공식 TTS API는 확인되지 않아 자동 연동을 사실로 쓰지 말 것 |
| **ElevenLabs** | 무료 월 1만 크레딧. 상업용 라이선스는 Starter 이상에 표시됨 | 한국어 자연스러움·정식 API·단가를 별도 검증; 실제 상업 운영은 적절한 요금제에서 |
| **로컬 TTS** | 별도 모델·한국어 품질·이용 조건·운영비 측정 필요 | 무료 자동화 대안 후보이나 품질 동등성을 주장하지 말 것 |

기존 2026-11-19 음성 연구(`studies/2026-11-19-voice.md`)에는 **기존 CapCut 목소리 수준과 동일해야 한다는 품질 기준** 및 운영자가 귀로 확인해야 한다는 시험이 있다. 사용자 승인 없이 임의의 TTS로 고정하거나, 목소리 복제·비공개 API 우회 호출을 하지 않는다. 공급자는 `TTSProvider` 인터페이스로 분리하고 음성 파일·길이·샘플레이트·권리·비용·오류·재시도 횟수를 로그에 남길 것을 **제안**한다.

공식 근거:
- TTSMaker 플랜/무료 API 제한: https://pro.ttsmaker.com/pricing
- TTSMaker API 문서: https://pro.ttsmaker.com/api-platform/ko/api-docs-v2
- TTSMaker 약관(허가된 인터페이스로만 자동 접근): https://pro.ttsmaker.com/terms-of-service
- Vrew 상업 사용: https://docs.channel.io/vrew-kr/ko/articles/%EC%83%81%EC%97%85-%EC%9D%B4%EC%9A%A9-AI-%EB%AA%A9%EC%86%8C%EB%A6%AC%EB%A5%BC-%EC%83%81%EC%97%85%EC%A0%81%EC%9D%B8-%EC%9A%A9%EB%8F%84%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C%EC%9A%94-addbf954
- Vrew 요금: https://vrew.ai/ko/payment/pricepolicy/
- ElevenLabs 요금/상업 라이선스: https://elevenlabs.io/pricing

## 6. PoC의 구체적 검증 매트릭스(제안)

가짜 시술 소재로 시작해, 검증 승인 후 권리 문제가 없는 비교 영상에 한정한다. 손님 원본·현행 배포·CapCut 프로젝트는 수정하지 않는다.

| 시험 | 무엇을 기록할 것인가 | 실패/보류 판단 |
|---|---|---|
| A. 미디어 인입 | 업로드된 MP4/MOV·이미지·WAV를 새 프로젝트에 **무인** 등록, 로컬 경로·메타데이터·재시작 후 유지 | 단순 GUI 수작업만 가능하면 완전 무인 경로 미달 |
| B. 편집 | 컷 분할·순서·트림·자막·목소리·BGM 반영; MCP `manual/auto` 각각의 수정 범위 | 승인 없는 원본 덮어쓰기/다른 작업 접근 발견 시 중단 |
| C. 변경 승인 | 제안→검토→적용/거절→되돌리기·리비전 충돌 시 처리 | 적용 상태와 운영자 승인을 혼동하면 보류 |
| D. CLI 렌더 | 실제 H.264/AAC, 1080×1920, 30fps, 오디오 길이, 로그, 오류 코드; Cold/Warm 시간과 CPU/GPU | 코덱·규격 불일치, 무음/끊김, 실패 원인 미기록 시 미달 |
| E. 왕복/이식 | Mitchell 장면표→OpenChatCut→운영자 수정→공통 상태로 되받기 | AI 합성 표시·자막-음성 링크·리비전 유실 시 미달 |
| F. 모바일 | 기존 운영자 iPhone에서 미리보기, 텍스트 수정, 수정 제안 승인; HTTPS·권한 | 기기 조건이 맞지 않으면 모바일 네이티브 타임라인 포기/경량 UI 검토 |
| G. 품질 | **동일 원고·동일 음성·동일 소재**로 기존 승인본과 나란히 확인(자막·효과·컷·색·음량) | 단순히 렌더에 성공했다는 이유로 엔진 전환 불가 |
| H. 사용량·비용 | 1편당 모델 호출/토큰, TTS 크레딧, 렌더 시간, 수동 개입, 복구 횟수 | 유지·운영비 불리하거나 품질이 떨어지면 보류 |
| I. 라이선스·보안 | AGPL 결합 방식, 하위 의존성 라이선스, AI API 데이터 반출, 원본 보호 | 불명확하면 운영 도입 보류 |

**중요:** 기존 OpenCut T/시험 4 결과보다 앞서 최종 엔진 선택을 하지 않는다. 신규 PoC는 `main`과 분리된 읽기·격리 실험으로만 진행하며 비용·외부 서비스·자료 반출은 사전 승인 후.

## 7. 현재 RSCH 작업자에게 요청할 기획 반영 산출물(제안)

1. `2026-11-20-plan-draft.md`의 0-3(미완료), 묶음 T, 5(자동화), 6(편집 상태), 7(직접 편집)에 **'OpenChatCut 대안 검토'** 절을 넣되, 기존 OpenCut 개발·시험 결과와 권한·일정을 **변경하지 않는 제안**임을 명시.
2. OpenChatCut의 **MCP 편집은 가능 / MCP export는 불가 / CLI render는 가능 / CLI media import는 미지원**을 네 개의 독립된 사실로 표기. 특히 `occ render` 존재만으로 '업로드에서 렌더까지 무인 가능'이라고 쓰지 말 것.
3. `OpenCut 유지 / OpenChatCut 채택 / OpenCut+외부 에이전트 API 보강` 세 갈래를 비교하고, 품질·통합 비용·의존성·라이선스·모바일 UX를 결정 기준으로 제안.
4. Vrew/TTSMaker/ElevenLabs/로컬 TTS는 **보이스 공급자 후보**로 분리하고, 무료 한도와 **API를 통한 자동화 가능 여부**를 따로 판단.
5. 기존 승인 연출 재현, 운영자 쉬운 UI, 변경 시 사용자 승인, 실패 로그·복구·에스컬레이션, 원본 보호, 업로드 2차 등 **확정 요구를 약화하지 않을 것**.
6. 아직 확인되지 않은 부분은 `[미검증]`, 권고는 `[제안]`, 저장소 코드로 확인된 부분은 `[소스 확인]`, 실행 결과는 `[실측]`으로 구분.
7. 우선순위 충돌 시 **오늘의 OpenCut 맥북 시험 및 진행 중인 기획을 우선**. 신규 기술 조사로 다른 작업을 자동 중단·배정·착수하지 말고, 추가 연구 작업은 작업자에게 제안한 뒤 승인 절차를 따를 것.

## 8. 조사 한계·최종 결론

- 이번 패킷 작성자는 두 Mitchell Studio 저장소와 OpenChatCut 공식 GitHub의 **문서 및 일부 구현 파일**을 읽었다. OpenChatCut을 직접 설치·실행하거나 편집·렌더하지 않았다.
- 현재 제품의 실제 고객 영상·CapCut 프로젝트·맥북 환경·운영자 아이폰은 열지 않았다. `main` 및 시험 브랜치는 변경하지 않았다.
- OpenChatCut `occ render`의 존재와 동작 경로는 소스상 확인되었으나 실제 소스/미디어 인입, macOS 성공, 영상 품질, 전체 프로젝트 포맷 변환은 **미검증**이다.
- **잠정 권고:** 현행 OpenCut Classic PoC를 계속하고, OpenChatCut은 `MCP 편집 + CLI 렌더 + 원본 인입`을 최소 범위로 검증하는 **격리된 경쟁 PoC**로만 기획에 추가한다. 엔진 확정이나 교체는 실측 비교 후에만 제안한다.
