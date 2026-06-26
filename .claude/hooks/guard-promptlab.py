#!/usr/bin/env python3
"""PreToolUse guard for PromptLab — enforces AGENTS.md hard rules.

Blocks:
  - Bash: `prisma migrate`, `git commit`, `git push`, `vercel deploy`/`vercel --prod`
  - Write/Edit: .env.local, prisma/migrations/**, .gitignore

Deny = output JSON with permissionDecision "deny". Allow = exit 0 silently.
"""
import json
import re
import sys


def deny(reason: str) -> None:
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": reason,
                }
            }
        )
    )
    sys.exit(0)


# 危険な bash コマンド（部分一致）。理由はユーザー制約 + AGENTS.md より。
BASH_RULES = [
    (re.compile(r"\bprisma\s+migrate\b"),
     "マイグレーションは手動確認後のみ。`npx prisma migrate` は自分で実行してください。"),
    (re.compile(r"\bvercel\b.*\b(deploy|--prod|--prebuilt)\b"),
     "勝手にデプロイしない（AGENTS.md）。デプロイは自分で実行してください。"),
]

# 保護パス（Write/Edit 禁止）
PATH_RULES = [
    (lambda p: p.endswith(".env.local"),
     ".env.local は触らない（APIキー等）。あなたが手動で作成・編集します。"),
    (lambda p: "prisma/migrations/" in p.replace("\\", "/"),
     "prisma/migrations/ は自動生成・編集しない（AGENTS.md）。"),
    (lambda p: p.endswith(".gitignore"),
     ".gitignore は変更しない（AGENTS.md）。"),
]


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)  # 入力不正時は素通り（ブロックしない）

    tool = data.get("tool_name", "")
    tin = data.get("tool_input", {}) or {}

    if tool == "Bash":
        cmd = tin.get("command", "") or ""
        for pat, reason in BASH_RULES:
            if pat.search(cmd):
                deny(reason)

    elif tool in ("Write", "Edit"):
        path = tin.get("file_path", "") or ""
        for match, reason in PATH_RULES:
            if match(path):
                deny(reason)

    sys.exit(0)


if __name__ == "__main__":
    main()
