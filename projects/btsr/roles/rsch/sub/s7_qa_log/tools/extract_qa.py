"""PRIMARY transcript에서 한알 말씀 · RSCH 답(text) · 다른 세션 글을 시간 순으로 뽑는다(읽기만).
쓰임: python -I extract_qa.py <since_KST HH:MM:SS 또는 YYYY-MM-DDTHH:MM:SS> [transcript]
"""
import json, sys, datetime as dt

TR = "C:/Users/ms1pk/.claude/projects/C--Users-ms1pk-dev-mitchell-studio-agent/9281f0ee-13b1-464d-a5e0-cdf4f156a14e.jsonl"
KST = dt.timezone(dt.timedelta(hours=9))

def kst(ts):
    return dt.datetime.fromisoformat(ts.replace("Z", "+00:00")).astimezone(KST)

def main():
    since = sys.argv[1] if len(sys.argv) > 1 else "00:00:00"
    path = sys.argv[2] if len(sys.argv) > 2 else TR
    if "T" in since:
        since_dt = dt.datetime.fromisoformat(since).replace(tzinfo=KST)
    else:
        since_dt = None
    out = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            try:
                o = json.loads(line)
            except Exception:
                continue
            ts = o.get("timestamp")
            if not ts:
                continue
            t = kst(ts)
            if since_dt is not None:
                if t < since_dt:
                    continue
            elif t.strftime("%H:%M:%S") < since:
                continue
            typ = o.get("type")
            if o.get("isMeta") or o.get("isCompactSummary") or o.get("isVisibleInTranscriptOnly"):
                continue  # 도구가 붙인 글(예: RSCH가 그림 파일을 읽은 [Image: …]) — 한알 말씀 아님
            if typ == "user":
                c = o.get("message", {}).get("content")
                texts = []
                if isinstance(c, str):
                    texts = [c]
                elif isinstance(c, list):
                    if any(b.get("type") == "tool_result" for b in c if isinstance(b, dict)):
                        continue
                    texts = [b.get("text", "") for b in c if isinstance(b, dict) and b.get("type") == "text"]
                for s in texts:
                    if s.startswith("<paseo-system"):
                        out.append((t, "OTHER", o.get("uuid"), s[:1500]))
                    elif s.startswith("<"):
                        continue
                    else:
                        out.append((t, "HANAL", o.get("uuid"), s))
            elif typ == "attachment":
                a = o.get("attachment", {})
                if a.get("type") == "queued_command":
                    p = a.get("prompt")
                    if isinstance(p, list):
                        p = "".join(b.get("text", "") for b in p if isinstance(b, dict))
                    kind = "OTHER_Q" if str(p).startswith("<paseo-system") else "HANAL_Q"
                    out.append((t, kind, a.get("source_uuid"), p if kind == "HANAL_Q" else str(p)[:1500]))
            elif typ == "assistant":
                c = o.get("message", {}).get("content", [])
                if isinstance(c, list):
                    for b in c:
                        if isinstance(b, dict) and b.get("type") == "text" and b.get("text", "").strip():
                            out.append((t, "RSCH", o.get("uuid"), b["text"]))
    for t, k, u, s in out:
        print(f"===== {t.strftime('%Y-%m-%d %H:%M:%S')} KST {k} {u}")
        print(s)

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
