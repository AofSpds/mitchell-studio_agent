"""묶음 5 + 3-2 화면 시험 준비 — 시험 폴더에 작업 다섯(얼굴 확인 · 음악 물음 · 개발자 · 사용량 · 하는 중)을 만든다. 저장소 밖 시험 도구.
python b5_setup.py <시험 폴더> <저장소>"""
import json
import os
import struct
import sys
import time
import zlib

base, repo = sys.argv[1], sys.argv[2]
os.environ.update(WEBAPP_DATA_DIR=os.path.join(base, "data"), WEBAPP_CONFIG_DIR=os.path.join(base, "config"),
                  CAPCUT_DRAFTS_DIR=os.path.join(base, "drafts"), WEBAPP_RUNNER="0")
for d in ("data/working", "data/incoming", "config", "drafts"):
    os.makedirs(os.path.join(base, d), exist_ok=True)
sys.path.insert(0, os.path.join(repo, "app", "webapp"))
import jobs as J  # noqa: E402
import runner as RN  # noqa: E402


def png(path, w, h, rgb):
    raw = b"".join(b"\x00" + bytes(rgb) * w for _ in range(h))
    ch = lambda t, b: struct.pack(">I", len(b)) + t + b + struct.pack(">I", zlib.crc32(t + b) & 0xFFFFFFFF)  # noqa: E731
    open(path, "wb").write(b"\x89PNG\r\n\x1a\n" + ch(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + ch(b"IDAT", zlib.compress(raw)) + ch(b"IEND", b""))


def job(name, title):
    J.new_job(name, title)
    for k in ("intake", "script"):
        J.set_step(name, k, "done")
    return name


# 1) 얼굴 확인 (머리 다름)
f = job("2099-10-01_face", "시험 · 얼굴 확인")
s = J.load_status(f)
d = os.path.join(J.job_dir(f), "for_chatgpt")
os.makedirs(d, exist_ok=True)
png(os.path.join(d, "after.png"), 90, 160, (200, 160, 120))
png(os.path.join(d, "face_1.png"), 90, 160, (120, 160, 200))
s["face_candidates"] = [{"n": 1, "file": "for_chatgpt/face_1.png", "w": 90, "h": 160, "hair_diff": True, "at": J.now_iso()}]
s["face_flow"] = {"remakes": 1}
s["steps"][J.FACE].update(state="check", note="머리 색과 모양이 같은지 봐 주세요.")
J.save_status(f, s)


def six_job(name, title, fn):
    j = job(name, title)
    json.dump({"project": f"{j}_v1", "scenes": [], "captions": []}, open(os.path.join(J.job_dir(j), "scenes.json"), "w", encoding="utf-8"))
    s = J.load_status(j)
    s["steps"][J.FACE].update(state="done", note="해당 없음")
    s["steps"][3].update(state="done")
    v = s["steps"][5]
    v.update(state="now", parts=J.new_parts(), auto=True)
    fn(s, v)
    J.rollup(v)
    J.save_status(j, s)
    return j


# 2) 음악 물음
six_job("2099-10-02_ask", "시험 · 음악 물음", lambda s, v: (v["parts"]["voice"].update(state="done"), v["parts"]["music"].update(state="stop", stops=2, reason="멈췄어요 — 고른 음악을 못 찾음"),
                                                   v.__setitem__("ask", {"key": "music_missing", "part": "music", "ask": "고른 음악을 못 찾았어요",
                                                                         "choices": ["비슷한 곡으로", "음악 없이", "개발자에게 넘기기"], "why": "멈췄어요 — 고른 음악을 못 찾음", "at": J.now_iso()})))
# 3) 개발자
six_job("2099-10-03_dev", "시험 · 개발자", lambda s, v: (v["parts"]["voice"].update(state="stop", stops=2, reason="멈췄어요 — 창이 안 열려요"),
                                                v.__setitem__("dev", {"part": "voice", "why": "멈췄어요 — 창이 안 열려요", "words": None, "at": J.now_iso()}),
                                                v.__setitem__("note", "다른 작업은 그대로 진행돼요.")))
# 4) 사용량
u = six_job("2099-10-04_usage", "시험 · 사용량", lambda s, v: None)
it = RN.enqueue(u, "six")
t = RN.W.next_morning()
it.update(state="wait_usage", retry_at=t.isoformat(timespec="seconds"), retry_ts=t.timestamp())
RN._save(it)
# 5) 차례 기다림 (길이 사용량으로 쉬는 동안에는 '하는 중'이 없으므로 '지금' 줄만)
six_job("2099-10-05_wait", "시험 · 차례", lambda s, v: (v["parts"]["voice"].update(state="now"), v.__setitem__("note", "Voice 차례예요 — 맥의 도우미가 곧 해요")))
print(json.dumps({"jobs": J.list_jobs()}, ensure_ascii=False))
