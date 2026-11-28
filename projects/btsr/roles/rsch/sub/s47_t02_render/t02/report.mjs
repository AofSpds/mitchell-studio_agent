import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { here, work, log, kst, config } from './common.mjs';

const now = await kst();
const content = await readFile(path.join(here, 'results.txt'), 'utf8');
const second = content.split('=== 둘째 시도 / SECOND ATTEMPT ===').at(-1);
const verification = JSON.parse(await readFile(path.join(work, 'verification.json'), 'utf8'));
const summaries = [...second.matchAll(/^STAGE_SUMMARY (\w+) (\{.*\})$/gm)].map(match => ({ name: match[1], ...JSON.parse(match[2]) }));
const expected = ['MATERIALS', 'PLAN', 'RENDER', 'VERIFY'];
if (expected.some(name => !summaries.some(summary => summary.name === name && summary.fail === 0))) throw new Error('Required successful stage missing; do not report completion.');
const pass = (second.match(/^PASS /gm) ?? []).length;
const fail = (second.match(/^FAIL /gm) ?? []).length;
const stopped = (second.match(/^STAGE_STOP /gm) ?? []).length;
if (fail || stopped) throw new Error('Current attempt contains failure; do not report completion.');
const started = second.match(/^START (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) KST$/m)?.[1];
const asDate = value => new Date(`${value.replace(' ', 'T')}+09:00`);
const wallSeconds = (asDate(now.slice(0, -4)) - asDate(started)) / 1000;
const summary = { completedKst: now, pass, fail, firstAttempt: { pass: 1, stopped: 1, reason: 'HTTP 303; no redirect followed' }, secondAttemptWallSeconds: wallSeconds, stages: summaries, output: verification.measured, frames: verification.frames, visualCaptionJudgement: 'Pending RSCH direct image review' };
const setup = await config();
await writeFile(path.join(work, 'summary.json'), JSON.stringify(summary, null, 2), { encoding: 'utf8', flag: 'wx' });
await log(`\n=== FINAL MACHINE SUMMARY ===\nCOMPLETED ${now}\nSECOND_ATTEMPT PASS=${pass} FAIL=${fail} wallElapsedSeconds=${wallSeconds}\nFIRST_ATTEMPT PRESERVED PASS=1 STOP=1 (HTTP 303)\nTOTAL_HISTORY PASS=${pass + 1} FAIL_OR_STOP=1\nSTAGES ${JSON.stringify(summaries)}\nOUTPUTS ${JSON.stringify(verification.measured)}\nFRAME_PATHS ${JSON.stringify(verification.frames)}\nPENDING RSCH direct Korean-caption image review; no visual-quality pass claimed.\nOUT_OF_SCOPE phone, actual footage, editing applications, subjective quality judgement.\nNO commit, push, deletion, PATH/environment/registry/system-setting change, npm/pip install or other download.`);
const readme = `# T02 첫 시험 영상

완료 시각: ${now}. 둘째 시도 기계 검사 통과 ${pass} / 실패 ${fail}.
첫 시도는 통과 1 / HTTP 303 중단 1이며 results.txt 앞부분을 그대로 보존했다.
둘째 시도 전체 경과 시간: ${wallSeconds}초(다운로드 대기와 준비 시간 포함).

## 무엇을 했는가

${setup.version}
RSCH가 추가 허용한 버전별 ZIP·SHA-256 주소 두 곳만 직접 요청했다.
ZIP 공개값과 실측값: ${setup.actual}
두 값 일치 후 압축을 풀고 libfreetype·drawtext 활성화를 확인했다.
Node 내장 모듈만 사용했다. ZIP 해제와 한국 시각 확인에는 Windows 기본 PowerShell을 호출했다.
다운로드 폴더에는 스크립트를 두지 않았고, 미디어 처리 실행 파일은 절대 경로로 호출했다.
FFmpeg는 shell:false의 spawn과 인수 배열로 실행했다. 전체 인수·시각·소요 시간은 results.txt에 있다.

## 파일과 실행 순서

setup.mjs → materials.mjs → plan.mjs → render.mjs → verify.mjs → report.mjs.
common.mjs는 기록·실행, validator.mjs는 사전 검사, renderer.mjs는 편집표에서 인수 배열을 만든다.
edit-plan.json은 실제 사용한 편집표다. 스크립트·편집표·README·results.txt는 이 폴더에 둔다.
기존 자료를 덮어쓰지 않는다. 현재 결과가 남아 있는 상태의 단순 재실행은 중단된다.

| 저장소 밖 경로 | 내용 |
|---|---|
| C:/Users/ms1pk/dev/mitchell-studio_t02/ffmpeg_dl/ | 내려받은 ZIP·SHA-256·압축 해제 파일 |
| C:/Users/ms1pk/dev/mitchell-studio_t02/work/assets/ | 만든 원본 넷 |
| C:/Users/ms1pk/dev/mitchell-studio_t02/work/run_1.mp4 | 첫 렌더 |
| C:/Users/ms1pk/dev/mitchell-studio_t02/work/run_2.mp4 | 같은 편집표의 두 번째 실제 렌더 |
| C:/Users/ms1pk/dev/mitchell-studio_t02/work/frames/ | s1_midpoint.png부터 s4_midpoint.png까지 |
| C:/Users/ms1pk/dev/mitchell-studio_t02/work/ | setup·assets-before·render-outputs·verification·summary JSON, 오류 편집표 둘 |

## 소재와 편집표

사람·얼굴·글자가 없는 색면 도형을 FFmpeg 생성기로 만들었다. 다른 사진은 읽지 않았다.
세로 PNG 3024×4032(세로사진_01.png), 가로 PNG 4000×3000,
가로 영상 1920×1080·30fps·8초·440Hz 생성음, 세로 영상 1080×1920·60fps·6초·무음이다.
원본 넷의 SHA-256을 생성 뒤와 검사 뒤에 재서 일치함을 확인했다.

T01의 schemaVersion·jobId·revision·assets·scenes와 기존 장면 칸을 유지했다.
T01 검사기는 정확히 3장면과 추가 칸 거부 조건 때문에 그대로 사용할 수 없었다.
T02 검사기는 번호·정수 시각·범위·겹침·빈틈 검사를 유지하고 실제 파일·실측 길이를 더 검사한다.

| 추가 칸 | 뜻 |
|---|---|
| assets[].kind | photo / video |
| assets[].path | 이 시험의 assets 폴더 안 실제 파일 절대 경로 |
| output.width / height / fps | 1080 / 1920 / 30 |
| scenes[].fit | cover: 채우고 자름, contain: 전체를 담고 여백 채움 |

사진의 기존 durationMs=6000은 표시 허용 길이이며 실측 영상 길이가 아니다. 사진 sourceInMs는 0이다.
장면은 2.5초·3.5초·4초·3초, 합계 13초·390프레임이다. 넷 소재를 모두 사용했다.
가로 영상은 1초부터, 세로 영상은 1.5초부터 사용했다.
한글 자막은 UTF-8 파일로 전달하고 C:/Windows/Fonts/malgun.ttf를 사용했다.
긴 원문 한 줄은 글자 폭의 보수적 추정치로 자동 줄바꿈했다. 실제 글꼴 모양·잘림은 아래 시각 검토 대상이다.
사진과 무음 영상은 48kHz 스테레오 무음으로 채워 전체에 오디오 한 줄을 이어 붙였다.

## 검사 결과와 남은 판정

두 출력 모두 MP4·H.264·YUV420p·1080×1920·30fps·13초·390프레임이다.
AAC 스테레오 48kHz 한 줄, 시작·끝·패킷 시간 연속성과 장면별 생성음/무음 샘플을 확인했다.
두 출력의 길이와 프레임 수가 같다. 출력 파일 바이트가 동일하다고 주장하지 않는다.
원본 범위 초과·실제 파일 없음의 오류 편집표 둘은 FFmpeg 호출과 렌더 폴더 생성 전에 거절됐다.
장면 가운데 요청 시각은 1.25초·4.25초·8초·11.5초다. 첫 출력에서 PNG 넷을 뽑았다.
한글 자막의 실제 표시·줄바꿈·잘림은 RSCH가 PNG를 직접 보고 판정해야 한다. 기계 통과 수에 넣지 않았다.

## 하지 않은 것

휴대폰·실제 촬영본·편집 앱·주관적 품질 판정은 범위 밖이다.
PATH·레지스트리·환경 변수·시스템 설정 변경, 다른 다운로드, npm/pip 설치, 삭제, 커밋·push를 하지 않았다.
손님·개인 자료·다른 사진·키·비밀을 사용하거나 저장하지 않았다.
`;
if (readme.split('\n').length > 120) throw new Error('README exceeds 120 lines.');
await writeFile(path.join(here, 'README.md'), readme, 'utf8');
console.log(JSON.stringify(summary, null, 2));
