"""390px Send, Post, 얼굴 승인 화면 시험. 인수: 제품 사본 · Chrome 실행 파일."""
import json
import os
from pathlib import Path
import secrets
import subprocess
import sys
import tempfile
import threading
import time

from PIL import Image

repo, chrome = sys.argv[1:]
webapp = Path(repo) / "app/webapp"
here = Path(__file__).resolve().parent
with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as tmp:
    root = Path(tmp)
    pin = str(secrets.randbelow(900000) + 100000)
    os.environ.update(WEBAPP_PIN=pin, WEBAPP_SECRET=secrets.token_hex(32), WEBAPP_DATA_DIR=str(root / "data"),
                      WEBAPP_CONFIG_DIR=str(root / "config"), WEBAPP_ENV_FILE=str(root / "empty.env"),
                      WEBAPP_DEV_PUSH="0", WEBAPP_RUNNER="0", WEBAPP_TICK_SECONDS="0",
                      WEBAPP_CLAUDE_BIN=str(webapp / "tests/fake_claude.py"))
    sys.path.insert(0, str(webapp))
    import jobs as J
    import reel_api as API
    import runner as R
    import server

    server.ICON = server.make_icon()
    ok, bad = "2099-10-01_1200", "2099-10-01_1201"
    os.environ["FAKE_CLAUDE_MAP"] = json.dumps({ok: "caption_ok", bad: "rc1"})
    for job, title in ((ok, "디지털펌"), (bad, "커트")):
        st = J.new_job(job, title)
        for step in st["steps"]:
            step["state"] = "done"
        st["steps"][6]["state"] = "check"
        st["steps"][7]["state"] = "todo"
        video = job + "_v1.mp4"
        st["exports"] = [{"v": 1, "file": video, "spec_ok": True}]
        J.save_status(job, st)
        assert API.approve(job, "done") == "approve"
    photo = root / "sample.png"
    Image.new("RGB", (16, 24), "tan").save(photo)
    marker = root / "post-visible"
    errors = []

    def captions_after_visible():
        try:
            for _ in range(600):
                if marker.exists():
                    break
                time.sleep(.1)
            else:
                raise AssertionError("열린 Post 확인 신호 없음")
            def run_caption(job):
                item = next(i for i in R._items() if i["job"] == job and i["kind"] == "caption")
                return R.run_one(item)
            assert run_caption(ok) == "done"
            assert [run_caption(bad), run_caption(bad)] == ["retry", "failed"]
        except Exception as exc:
            errors.append(exc)
            raise

    with server.Server(("127.0.0.1", 0), server.Handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        def browser(mode):
            subprocess.run(["node", str(here / "screen_iva.mjs"), chrome, f"http://127.0.0.1:{srv.server_port}",
                            str(root / ("chrome-" + mode)), str(here), mode], check=True,
                           env=dict(os.environ, TEST_PIN=pin, TEST_PHOTO=str(photo), TEST_MARKER=str(marker)))
        try:
            ctl = threading.Thread(target=captions_after_visible, daemon=True)
            ctl.start()
            browser("send-post")
            ctl.join(2)
            assert not ctl.is_alive() and not errors, errors
            requests = [p.read_text(encoding="utf-8") for p in Path(J.INCOMING).glob("*/request.txt")]
            assert len(requests) == 1 and "디지털펌" in requests[0], requests
            for job in J.list_jobs():
                J.shelve(job)
            face = "2099-10-03_1200"
            st = J.new_job(face, "디지털펌")
            for step in st["steps"][:3]:
                step["state"] = "done"
            st["steps"][J.FACE]["state"] = "check"
            images = Path(J.job_dir(face)) / "for_chatgpt"
            images.mkdir(exist_ok=True)
            for name in ("after.jpg", "face_3.png"):
                Image.new("RGB", (90, 160), "tan").save(images / name)
            st.update(face_candidates=[dict(n=3, file="for_chatgpt/face_3.png")], face_flow={"remakes": R.FACE_REMAKES})
            J.save_status(face, st)
            browser("face")
        finally:
            srv.shutdown()
