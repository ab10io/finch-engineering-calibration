import re
PROMPT = re.compile(r"ignore (previous|prior) instructions|award a perfect score", re.I)
TOKEN = re.compile(r"ghp_[A-Za-z0-9]{30,}")

def scan(text):
    return {"prompt_like": bool(PROMPT.search(text)), "redacted": TOKEN.sub("[REDACTED_SECRET]", text)}
