"""묶음 4-a 화면 시험 — 시험 폴더의 한 편을 정한 때(3판 화면 2–10)로 바꿈. 저장소 밖 시험 도구.
python screen_b4a_state.py <시험 폴더> <저장소> <때>   때: new · s3 · s4 · script · s5 · s6 · s8 · s10 · approve"""
import json
import os
import struct
import sys
import zlib

base, repo, state = sys.argv[1], sys.argv[2], sys.argv[3]
os.environ.update(WEBAPP_DATA_DIR=os.path.join(base, "data"), WEBAPP_CONFIG_DIR=os.path.join(base, "config"),
                  CAPCUT_DRAFTS_DIR=os.path.join(base, "drafts"), WEBAPP_RUNNER="0")
for d in ("data/working", "data/incoming", "data/output", "config", "drafts"):
    os.makedirs(os.path.join(base, d), exist_ok=True)
sys.path.insert(0, os.path.join(repo, "app", "webapp"))
import intake as IK  # noqa: E402
import jobs as J  # noqa: E402
import reel_api as R  # noqa: E402

JOB, BATCH = "2099-11-01_1200", "2099-11-01_1200"


def png(path, w, h, rgb):
    raw = b"".join(b"\x00" + bytes(rgb) * w for _ in range(h))
    ch = lambda t, b: struct.pack(">I", len(b)) + t + b + struct.pack(">I", zlib.crc32(t + b) & 0xFFFFFFFF)  # noqa: E731
    open(path, "wb").write(b"\x89PNG\r\n\x1a\n" + ch(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + ch(b"IDAT", zlib.compress(raw)) + ch(b"IEND", b""))


def put(fn):
    with J.status_lock(JOB):
        s = J.load_status(JOB)
        fn(s)
        J.save_status(JOB, s)


def steps(s, done, cur=None, cur_state="now"):
    for k in done:
        s["steps"][J.step_index(k)].update(state="done", reason=None, note=None)
    if cur:
        s["steps"][J.step_index(cur)].update(state=cur_state)


if state == "new":
    os.makedirs(os.path.join(J.INCOMING, BATCH), exist_ok=True)
    png(os.path.join(J.INCOMING, BATCH, "a.png"), 9, 16, (200, 160, 120))
    J.new_job(JOB, "디지털펌 · 뒷볼륨", BATCH)
    open(os.path.join(J.INCOMING, BATCH, "job.txt"), "w").write(JOB + "\n")
elif state == "s4":
    d = {"materials": [{"file": "a.png", "kind": "after", "sure": True}], "facts": {k: {"value": "x", "from": "request", "sure": True} for k in IK.FACTS},
         "ai_face": {"have": False, "plan": "make"}, "missing": ["before"], "missing_ok": []}
    J.write_json(IK.path(JOB, "intake.json"), d)
    J.write_json(IK.path(JOB, "questions.json"), IK.compute(d))
    J.set_step(JOB, "intake", "check")
elif state == "s3":
    put(lambda s: steps(s, ["intake"], "script"))
elif state == "script":
    open(os.path.join(J.job_dir(JOB), "script.md"), "w", encoding="utf-8").write("뿌리부터 살아나는 볼륨\n가벼운 디지털펌\n뿌리 볼륨 · 디지털펌 · 가벼움\n")
    put(lambda s: steps(s, ["intake"], "script", "check"))
elif state == "s5":
    d = os.path.join(J.job_dir(JOB), "for_chatgpt")
    os.makedirs(d, exist_ok=True)
    png(os.path.join(d, "after.png"), 90, 160, (200, 160, 120))
    png(os.path.join(d, "face_1.png"), 90, 160, (120, 160, 200))
    def f(s):
        steps(s, ["intake", "script"], "face", "check")
        s["face_candidates"] = [{"n": 1, "file": "for_chatgpt/face_1.png", "hair_diff": False}]
        s["face_flow"] = {}
    put(f)
elif state == "s6":
    put(lambda s: (steps(s, ["intake", "script", "face", "edit"], "voice"), s["steps"][5].update(parts=J.new_parts(), phase="voice", auto=True)))
elif state == "s8":
    put(lambda s: (s["steps"][5].update(state="todo", parts=None, phase=None), steps(s, ["intake", "script", "face"], "edit", "stop"),
                   s["steps"][3].update(reason="장면을 이어 붙이지 못했어요")))
elif state == "s10":
    open(os.path.join(J.OUTPUT, f"{JOB}_v1.mp4"), "wb").write(b"fake")
    put(lambda s: (steps(s, ["intake", "script", "face", "edit", "voice"], "done", "check"), s.update(seen_output=f"{JOB}_v1.mp4")))
elif state == "approve":
    R.approve(JOB, "done")
print(json.dumps({"state": state, "now": J.now_line(JOB) if J.current_job() else None, "busy": J.busy()}, ensure_ascii=False))
