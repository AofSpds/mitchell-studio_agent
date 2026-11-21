"""묶음 4-a-2 화면 시험 — 시험 폴더의 한 편을 정한 때로 바꿈. 저장소 밖 시험 도구.
python screen_b4a2_state.py <시험 폴더> <저장소> <때>   때: new · s8 · shelve_all · show"""
import json
import os
import struct
import sys
import zlib

base, repo, state = sys.argv[1], sys.argv[2], sys.argv[3]
os.environ.update(WEBAPP_DATA_DIR=os.path.join(base, "data"), WEBAPP_CONFIG_DIR=os.path.join(base, "config"),
                  CAPCUT_DRAFTS_DIR=os.path.join(base, "drafts"), WEBAPP_RUNNER="0", WEBAPP_DEV_PUSH="0")
for d in ("data/working", "data/incoming", "data/output", "config", "drafts"):
    os.makedirs(os.path.join(base, d), exist_ok=True)
sys.path.insert(0, os.path.join(repo, "app", "webapp"))
import jobs as J  # noqa: E402
import runner as RN  # noqa: E402

JOB, BATCH = "2099-12-01_1200", "2099-12-01_1200"


def png(path, w, h, rgb):
    raw = b"".join(b"\x00" + bytes(rgb) * w for _ in range(h))
    ch = lambda t, b: struct.pack(">I", len(b)) + t + b + struct.pack(">I", zlib.crc32(t + b) & 0xFFFFFFFF)  # noqa: E731
    open(path, "wb").write(b"\x89PNG\r\n\x1a\n" + ch(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + ch(b"IDAT", zlib.compress(raw)) + ch(b"IEND", b""))


if state == "new":
    d = os.path.join(J.INCOMING, BATCH)
    os.makedirs(d, exist_ok=True)
    png(os.path.join(d, "a.png"), 9, 16, (200, 160, 120))
    png(os.path.join(d, "b.png"), 9, 16, (120, 160, 200))
    open(os.path.join(d, "request.txt"), "w", encoding="utf-8").write("레이어드 컷, 긴 머리, 가볍게 떨어지는 느낌\n")
    J.new_job(JOB, "레이어드 컷", BATCH)
    open(os.path.join(d, "job.txt"), "w").write(JOB + "\n")
elif state == "s8":
    open(os.path.join(J.job_dir(JOB), "script.md"), "w", encoding="utf-8").write("가볍게 떨어지는 레이어드\n긴 머리도 가볍게\n레이어드 · 긴 머리 · 가벼움\n")
    with J.status_lock(JOB):
        s = J.load_status(JOB)
        for k in ("intake", "script", "face", "edit"):
            s["steps"][J.step_index(k)].update(state="done")
        ps = J.new_parts()
        ps["voice"]["state"] = "done"
        s["steps"][5].update(state="now", parts=ps, auto=True)
        J.save_status(JOB, s)
    J.stop(JOB, "voice", "멈췄어요 — 이유: 고른 음악을 목록에서 못 찾음", "ask",
           ask={"key": "music_missing", "part": "music", "ask": "고른 음악을 못 찾았어요", "choices": ["비슷한 곡으로", "음악 없이"]})
elif state == "shelve_all":
    while J.current_job():
        J.shelve(J.current_job())
cur = J.current_job()
print(json.dumps({"state": state, "current": cur, "busy": J.busy(), "now": J.now_line(cur) if cur else None,
                  "batches": {b: sorted(os.listdir(os.path.join(J.INCOMING, b))) for b in sorted(os.listdir(J.INCOMING))}}, ensure_ascii=False))
