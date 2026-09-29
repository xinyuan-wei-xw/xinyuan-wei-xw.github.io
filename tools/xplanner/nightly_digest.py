#!/usr/bin/env python3
"""Nightly digest for X Planner.

Runs on GitHub Actions (schedule). Reads tomorrow's data from Firestore
(planners/{uid} doc, `data` field), asks Gemini to write a short Chinese
"明日日程" digest, and emails it.

All secrets come from environment variables (GitHub Secrets) — nothing
is hardcoded. Recipients default to xwei6@student.gsu.edu and
xinyuan.wei.xw@gmail.com (comma-separated DIGEST_TO overrides).
"""
import json
import os
import smtplib
import sys
from datetime import datetime, timedelta
from email.header import Header
from email.mime.text import MIMEText
from zoneinfo import ZoneInfo

NY = ZoneInfo("America/New_York")
WEEKDAY_ZH = "一二三四五六日"


def task_line(t):
    """One human-readable line for a task dict, or None to skip."""
    if not isinstance(t, dict):
        return None
    title = (t.get("t") or "").strip()
    if not title or t.get("d"):
        return None
    s, e = (t.get("start") or "").strip(), (t.get("end") or "").strip()
    when = f"{s}–{e} " if s and e else (f"{s} " if s else "")
    place = (t.get("place") or "").strip()
    where = f" @{place}" if place else ""
    return f"{when}{title}{where}".strip()


def collect(data, key):
    """Pull tomorrow's items out of the planner DB dict."""
    day = (data.get("days") or {}).get(key) or {}
    events = (data.get("events") or {}).get(key) or []
    deadlines = [d for d in (data.get("deadlines") or [])
                 if isinstance(d, dict) and d.get("due") == key
                 and d.get("title") and not d.get("done")]

    seen = set()
    timed, todo = [], []
    for t in (day.get("top3") or []) + (day.get("tasks") or []):
        line = task_line(t)
        if not line:
            continue
        tid = t.get("id")
        if tid and tid in seen:
            continue
        if tid:
            seen.add(tid)
        if t.get("start") and t.get("end"):
            timed.append(line)
        else:
            todo.append(line)

    # free-text time blocks, e.g. {"09:00": "Team standup"}
    blocks = day.get("blocks") or {}
    for slot in sorted(blocks):
        text = (blocks[slot] or "").strip()
        if text:
            timed.append(f"{slot} {text}")

    # matrix tasks due tomorrow that aren't already listed
    for t in (data.get("matrix") or []):
        if not isinstance(t, dict) or t.get("due") != key or t.get("d"):
            continue
        tid = t.get("id")
        if tid and tid in seen:
            continue
        line = task_line(t)
        if line:
            todo.append(line)
            if tid:
                seen.add(tid)

    ev_lines = []
    for ev in events:
        if not isinstance(ev, dict) or not (ev.get("title") or "").strip():
            continue
        parts = []
        tm = (ev.get("time") or "").strip()
        if tm:
            parts.append(tm)
        parts.append(ev["title"].strip())
        place = (ev.get("place") or "").strip()
        if place:
            parts.append("@" + place)
        ev_lines.append(" ".join(parts))

    dl_lines = [d["title"].strip() for d in deadlines]
    note = (day.get("note") or "").strip()
    return {"timed": timed, "todo": todo, "events": ev_lines,
            "deadlines": dl_lines, "note": note}


def plain_fallback(items, date_label):
    """Readable digest without AI, used when Gemini is unavailable."""
    secs = []
    if items["timed"]:
        secs.append("⏰ 有固定时间的安排：\n" + "\n".join("· " + x for x in items["timed"]))
    if items["events"]:
        secs.append("📌 事件：\n" + "\n".join("· " + x for x in items["events"]))
    if items["todo"]:
        secs.append("📝 待办：\n" + "\n".join("· " + x for x in items["todo"]))
    if items["deadlines"]:
        secs.append("⏳ 明天截止：\n" + "\n".join("· " + x for x in items["deadlines"]))
    if items["note"]:
        secs.append("🗒 当天备注：\n" + items["note"])
    body = "\n\n".join(secs) if secs else "明天暂无安排，好好休息。"
    return f"{date_label}日程\n\n{body}"


def ai_digest(items, date_label, gemini_key):
    """Ask Gemini for a short, warm Chinese digest."""
    from google import genai
    raw = json.dumps(items, ensure_ascii=False)
    prompt = (
        "你是一位贴心的中文日程助理。根据下面这位用户明天的 X Planner 数据"
        f"（{date_label}），写一封简短的「明日日程」晚间简报，直接给用户看。\n"
        "要求：\n"
        "1. 全部用简体中文，语气自然、温暖、简洁。\n"
        "2. 按时间顺序先列有固定时间的安排，再列事件、待办和截止事项。\n"
        "3. 如果某类没有内容就省略该类，不要写「无」。\n"
        "4. 数据为空时只回一句：明天暂无安排，好好休息。\n"
        "5. 纯文本，不要 Markdown 标记，不要寒暄客套话，直接给内容。\n"
        f"数据：{raw}"
    )
    client = genai.Client(api_key=gemini_key)
    last_err = None
    for model in ("gemini-2.5-flash", "gemini-2.0-flash"):
        try:
            resp = client.models.generate_content(model=model, contents=prompt)
            text = (resp.text or "").strip()
            if text:
                return text
        except Exception as e:
            last_err = e
    raise RuntimeError(f"gemini failed: {last_err}")


def send_email(subject, body, smtp_user, smtp_pw, to_addrs):
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = Header(subject, "utf-8")
    msg["From"] = smtp_user
    msg["To"] = ", ".join(to_addrs)
    with smtplib.SMTP("smtp.gmail.com", 587, timeout=30) as s:
        s.starttls()
        s.login(smtp_user, smtp_pw)
        s.sendmail(smtp_user, to_addrs, msg.as_string())


def main():
    sa_json = os.environ["FIREBASE_SERVICE_ACCOUNT_JSON"]
    gemini_key = os.environ["GEMINI_API_KEY"]
    smtp_user = os.environ["DIGEST_SMTP_USER"]
    smtp_pw = os.environ["DIGEST_SMTP_APP_PASSWORD"]
    to_addrs = [a.strip() for a in
                os.environ.get("DIGEST_TO",
                               "xwei6@student.gsu.edu, xinyuan.wei.xw@gmail.com"
                               ).split(",") if a.strip()]

    import firebase_admin
    from firebase_admin import auth, credentials, firestore

    cred = credentials.Certificate(json.loads(sa_json))
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    users = list(auth.list_users(max_results=10).iterate_all())
    if not users:
        print("no firebase auth users found", file=sys.stderr)
        sys.exit(1)
    uid = users[0].uid

    snap = db.collection("planners").document(uid).get()
    data = (snap.to_dict() or {}).get("data") or {}

    tomorrow = (datetime.now(NY) + timedelta(days=1)).date()
    key = tomorrow.strftime("%Y-%m-%d")
    date_label = (f"{tomorrow.month}月{tomorrow.day}日 "
                  f"周{WEEKDAY_ZH[tomorrow.weekday()]}")

    items = collect(data, key)
    try:
        body = ai_digest(items, date_label, gemini_key)
    except Exception as e:
        print(f"AI digest failed, using plain fallback: {e}", file=sys.stderr)
        body = plain_fallback(items, date_label)

    send_email(f"明日日程 · {date_label}", body, smtp_user, smtp_pw, to_addrs)
    print(f"digest sent to {', '.join(to_addrs)} for {key}")


if __name__ == "__main__":
    main()
