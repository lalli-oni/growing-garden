#!/usr/bin/env bash
# PreToolUse hook: structural GitHub issue changes must go through the project-manager
# agent, which owns the label, backlog, and duplicate-search conventions. Reads, comments,
# and title/body edits stay open to every session.
# A guardrail, not a boundary: gh calls made inside other scripts (e.g. nu modules) aren't visible here.

input=$(cat)

# Fast gate before spawning jq: most commands never mention gh.
case "$input" in
	*gh[[:space:]]*) ;;
	*) exit 0 ;;
esac

# Fail open without jq rather than blocking every gh command.
command -v jq >/dev/null 2>&1 || exit 0

agent_type=$(printf '%s' "$input" | jq -r '.agent_type // empty')
agent_type=${agent_type%$'\r'} # Windows jq builds emit CRLF
[ "$agent_type" = "project-manager" ] && exit 0

command=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
command=${command//$'\r'/}
command=${command//$'\\\n'/ } # join backslash-continued lines

# gh must sit at a command position, so prose in heredocs or quoted bodies rarely matches.
# Backticks are deliberately excluded: markdown inline code in comment bodies would false-positive.
at='(^|[;&|({])[[:space:]]*'
issue_cmd="${at}gh[[:space:]]+issue[[:space:]]+(create|new|close|reopen|delete|transfer|pin|unpin)([[:space:]]|$)"
issue_edit="${at}gh[[:space:]]+issue[[:space:]]+edit[[:space:]].*--(add-label|remove-label|milestone|remove-milestone|add-project|remove-project)"
label_cmd="${at}gh[[:space:]]+label[[:space:]]+(create|edit|delete|clone)([[:space:]]|$)"
api_cmd="${at}gh[[:space:]]+api[[:space:]]"
api_path='/(sub_issues?|dependencies|labels|milestones)'
api_write='(-X|--method)[[:space:]=]*(POST|PATCH|PUT|DELETE)'
api_get='(-X|--method)[[:space:]=]*GET'
# gh api switches to POST when fields or --input are given
api_fields='[[:space:]](-f|-F|--field|--raw-field|--input)([[:space:]=]|$)'
gql_mutation='(create|close|reopen|delete|transfer|pin|unpin)Issue|(add|remove|reprioritize)SubIssue|(add|remove|clear)LabelsFrom?Labelable|(create|update|delete)Label|(add|remove)BlockedBy'

block() {
	echo "BLOCKED: structural GitHub issue changes (create/close/reopen, labels, milestones, sub-issue and dependency links) go through the project-manager agent so its conventions apply. Delegate this to the project-manager agent. Reading issues, commenting, and editing an issue's title or body are allowed directly. Matched: $1" >&2
	exit 2
}

while IFS= read -r line; do
	if [[ $line =~ $issue_cmd || $line =~ $issue_edit || $line =~ $label_cmd ]]; then
		block "$line"
	fi
	if [[ $line =~ $api_cmd ]]; then
		if [[ $line =~ ${at}gh[[:space:]]+api[[:space:]]+graphql ]]; then
			[[ $command =~ $gql_mutation ]] && block "$line"
		elif [[ $line =~ $api_path ]]; then
			if [[ $line =~ $api_write ]] || { [[ $line =~ $api_fields ]] && ! [[ $line =~ $api_get ]]; }; then
				block "$line"
			fi
		fi
	fi
done <<<"$command"

exit 0
