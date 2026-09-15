#!/usr/bin/env bash
# Reports what the current session can do, so agents can scope recommendations.
# Read-only: never installs, authenticates, or starts anything. Always exits 0.
# Bash rather than a nushell module because it must also run in cloud sessions.

# Claude Code sets this to "true" in cloud (web/mobile) sessions, never locally.
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
	session="cloud"
else
	session="local"
fi

if ! command -v gh >/dev/null 2>&1; then
	github="no (gh not installed)"
elif gh api user --jq .login >/dev/null 2>&1; then
	github="yes"
else
	github="no (not authenticated, or offline)"
fi

# Any HTTP response means Vite is up; curl reports 000 when nothing is listening.
code=$(curl -s -o /dev/null --max-time 3 -w '%{http_code}' http://localhost:5173 2>/dev/null)
if [ -n "$code" ] && [ "$code" != "000" ]; then
	dev_server="yes (http://localhost:5173)"
else
	dev_server="no"
fi

echo "session: $session"
echo "github: $github"
echo "dev-server: $dev_server"
