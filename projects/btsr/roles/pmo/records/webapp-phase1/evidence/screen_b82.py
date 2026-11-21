"""python screen_b82.py <제품 사본> <S8 시안 폴더> <Chrome>. 시안의 그림만 시험 소재로 사용."""
import hashlib
import os
from pathlib import Path
import secrets
import subprocess
import sys
import tempfile
import threading
from PIL import Image

repo, refs, chrome = sys.argv[1:]
with tempfile.TemporaryDirectory() as tmp:
    pin = str(secrets.randbelow(900000) + 100000)
    os.environ.update(WEBAPP_PIN=pin, WEBAPP_SECRET=secrets.token_hex(32), WEBAPP_DATA_DIR=str(Path(tmp)/"data"),
                      WEBAPP_CONFIG_DIR=str(Path(tmp)/"config"), WEBAPP_ENV_FILE=str(Path(tmp)/"empty.env"),
                      WEBAPP_DEV_PUSH="0", WEBAPP_RUNNER="0", WEBAPP_TICK_SECONDS="0")
    sys.path.insert(0, str(Path(repo)/"app/webapp"))
    import server
    import intake as I
    import jobs as J
    import runner as R
    server.ICON = server.make_icon()
    job = "2099-10-01_1200"
    st = J.new_job(job, "디지털펌 · 뒷볼륨", job)
    batch = Path(J.INCOMING)/job
    batch.mkdir(parents=True)
    thumbs = Path(J.WORK)/"_webapp/thumbs"
    thumbs.mkdir(parents=True)
    materials = []
    with Image.open(Path(refs)/"s17.png") as original:
        for n, left in enumerate((62, 145, 228)):
            photo = batch/f"sample{n}.jpg"
            original.crop((left, 304, left+70, 411)).convert("RGB").save(photo)
            stat = photo.stat()
            digest = hashlib.sha1(f"{photo}:{stat.st_mtime}:{stat.st_size}".encode()).hexdigest()[:16]
            (thumbs/f"in_{digest}.jpg").write_bytes(photo.read_bytes())
            materials.append(dict(file=photo.name, kind="after" if n < 2 else "before", sure=True, face_visible=False))
    facts = {k: dict(value=v, sure=True, **{"from":"request"}) for k,v in
             zip(I.FACTS, ("디지털펌","뒷볼륨","성인"))}
    J.write_json(I.path(job, "intake.json"), dict(materials=materials, facts=facts, ai_face=dict(have=False, plan="make"), missing=[]))
    R.after_intake(job)
    with server.Server(("127.0.0.1", 0), server.Handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            for screen in ("17", "05"):
                if screen == "05":
                    job2 = "2099-10-02_1200"
                    st = J.new_job(job2, "디지털펌 · 뒷볼륨", job2)
                    J.shelve(job)
                    for step in st["steps"][1:3]:
                        step["state"]="done"
                    st["steps"][J.FACE]["state"]="check"
                    target=Path(J.job_dir(job2))/"for_chatgpt"
                    target.mkdir()
                    with Image.open(Path(refs)/"s05.png") as img:
                        for name,x in (("after.jpg",70),("face_1.png",232)):
                            img.crop((x,363,x+140,574)).convert("RGB").save(target/name)
                    st["face_candidates"]=[dict(n=1,file="for_chatgpt/face_1.png")]
                    J.save_status(job2,st)
                subprocess.run(["node",str(Path(__file__).with_suffix(".mjs")),chrome,f"http://127.0.0.1:{srv.server_port}",
                                str(Path(tmp)/("chrome"+screen)),str(Path(__file__).parent),screen],check=True,
                               env=dict(os.environ,TEST_PIN=pin))
        finally:
            srv.shutdown()
