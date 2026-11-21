"""묶음 6 화면 시험 — 시험 폴더의 한 편을 정한 때(3판 화면 10 · 12 · 13)로 바꿈. 저장소 밖 시험 도구.
python screen_b6_state.py <시험 폴더> <저장소> <때>   때: s10 · s13 · show"""
import json
import os
import sys

base, repo, state = sys.argv[1], sys.argv[2], sys.argv[3]
os.environ.update(WEBAPP_DATA_DIR=os.path.join(base, "data"), WEBAPP_CONFIG_DIR=os.path.join(base, "config"),
                  CAPCUT_DRAFTS_DIR=os.path.join(base, "drafts"), WEBAPP_RUNNER="0", WEBAPP_DEV_PUSH="0")
for d in ("data/working", "data/incoming", "data/output", "config", "drafts"):
    os.makedirs(os.path.join(base, d), exist_ok=True)
sys.path.insert(0, os.path.join(repo, "app", "webapp"))
import jobs as J  # noqa: E402

JOB = "2099-12-02_1200"


def ex(v, ok, w=1080, h=1920, dur=14.4):
    name = f"{JOB}_v{v}.mp4"
    open(os.path.join(J.OUTPUT, name), "wb").write(b"fake")
    return {"v": v, "file": name, "spec_ok": ok, "spec": {"w": w, "h": h, "fps": 30, "dur": dur}, "project": f"{JOB}_v{v}"}


if state == "s10":
    J.new_job(JOB, "디지털펌 · 뒷볼륨")
    json.dump({"project": f"{JOB}_v2", "scenes": [], "captions": []}, open(os.path.join(J.job_dir(JOB), "scenes.json"), "w", encoding="utf-8"))
    with J.status_lock(JOB):
        s = J.load_status(JOB)
        for k in ("intake", "script", "face", "edit", "voice"):
            s["steps"][J.step_index(k)].update(state="done")
        s["steps"][6].update(state="check")
        s["exports"] = [ex(1, True, dur=14.2), ex(2, True)]
        s["fixes"] = [{"n": 1, "from_v": 1, "to_v": 2, "state": "done", "feedback": "feedback/x.txt"}]
        s["seen_output"] = f"{JOB}_v2.mp4"
        J.save_status(JOB, s)
elif state == "s13":
    with J.status_lock(JOB):
        s = J.load_status(JOB)
        s["fixes"][-1]["state"] = "done"
        s["exports"].append(ex(3, False, 720, 1280, 14.2))
        s["seen_output"] = f"{JOB}_v3.mp4"
        s["spec_redo"] = {"open": True, "tries": 1, "from_v": 3}
        for k in ("intake", "script", "face", "edit"):
            s["steps"][J.step_index(k)].update(state="done")
        ps = J.new_parts()
        for p in ("voice", "music"):
            ps[p]["state"] = "done"
        s["steps"][5].update(state="now", parts=ps, auto=True)
        s["steps"][6].update(state="check", reason="화면 크기가 낮아요 (720×1280)")
        J.save_status(JOB, s)
elif state == "s13ok":
    with J.status_lock(JOB):
        s = J.load_status(JOB)
        s["exports"].append(ex(4, True))
        s["seen_output"] = f"{JOB}_v4.mp4"
        s["spec_redo"]["open"] = False
        s["steps"][5].update(state="done")
        s["steps"][6].update(state="check", reason=None)
        J.save_status(JOB, s)
st = J.load_status(JOB)
print(json.dumps({"state": state, "busy": J.busy(), "fixes": st.get("fixes"), "approvals": st.get("approvals"),
                  "queue": [n for n in os.listdir(os.path.join(J.WORK, "_queue")) if n.endswith(".json")] if os.path.isdir(os.path.join(J.WORK, "_queue")) else []},
                 ensure_ascii=False))
