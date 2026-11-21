"""PRIMARY transcript를 지켜보다가 적을 때를 한 줄로 알린다(읽기만).
- HANAL: 한알 말씀이 새로 옴
- SETTLED: 한알 말씀 뒤 RSCH 답이 나오고 120초 조용함 → 적을 차례
쓰임: python -I -u watch_primary.py
"""
import json, os, sys, time, datetime as dt
TR = "C:/Users/ms1pk/.claude/projects/C--Users-ms1pk-dev-mitchell-studio-agent/bb014593-1f51-4b36-aeac-c7a72356e466.jsonl"
KST = dt.timezone(dt.timedelta(hours=9))
QUIET = 120

def kind(o):
    if o.get("isMeta") or o.get("isCompactSummary") or o.get("isVisibleInTranscriptOnly"):
        return None
    t = o.get("type")
    if t == "user":
        c = o.get("message", {}).get("content")
        if isinstance(c, list):
            if any(isinstance(b, dict) and b.get("type") == "tool_result" for b in c):
                return None
            c = "".join(b.get("text", "") for b in c if isinstance(b, dict) and b.get("type") == "text")
        if isinstance(c, str) and c and not c.startswith("<"):
            return "HANAL"
    elif t == "attachment":
        a = o.get("attachment", {})
        if a.get("type") == "queued_command" and not str(a.get("prompt", "")).startswith("<"):
            return "HANAL"
    elif t == "assistant":
        c = o.get("message", {}).get("content", [])
        if isinstance(c, list) and any(isinstance(b, dict) and b.get("type") == "text" and b.get("text", "").strip() for b in c):
            return "RSCH"
    return None

pos = os.path.getsize(TR)
pending = False; rsch_after = False; last = time.time(); buf = ""
while True:
    try:
        size = os.path.getsize(TR)
        if size > pos:
            with open(TR, "rb") as f:
                f.seek(pos); chunk = f.read(size - pos)
            pos = size; last = time.time()
            buf += chunk.decode("utf-8", "replace")
            lines = buf.split("\n"); buf = lines.pop()
            for l in lines:
                try:
                    o = json.loads(l)
                except Exception:
                    continue
                k = kind(o)
                if k == "HANAL":
                    ts = dt.datetime.fromisoformat(o["timestamp"].replace("Z", "+00:00")).astimezone(KST)
                    print(f"HANAL {ts.strftime('%H:%M:%S')} KST", flush=True)
                    pending = True; rsch_after = False
                elif k == "RSCH" and pending:
                    rsch_after = True
        if pending and rsch_after and time.time() - last >= QUIET:
            print("SETTLED — 적을 차례", flush=True)
            pending = False; rsch_after = False
    except Exception as e:
        print(f"ERROR {e}", flush=True)
    time.sleep(2)
