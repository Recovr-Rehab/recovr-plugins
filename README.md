# Recovr plugins

The Recovr plugin for Claude, ChatGPT, Codex and Grok Build. It connects your AI assistant to your gym's
Recovr account. See [recovr-retention/README.md](recovr-retention/README.md) for what it does,
what it connects to and how to install it.

One folder serves every client:

| File | Read by |
|---|---|
| `recovr-retention/.claude-plugin/plugin.json`, `.mcp.json` | Claude (claude.ai, desktop, Cowork, Claude Code) |
| `recovr-retention/plugin.json`, `mcp.json`, `assets/` | Codex and the ChatGPT plugin directory |
| `recovr-retention/.grok-plugin/plugin.json`, `.mcp.json` | Grok Build |
| `recovr-retention/skills/` | All of them |
| `.claude-plugin/marketplace.json` | `claude plugin marketplace add Recovr-Rehab/recovr-plugins` and `grok plugin marketplace add Recovr-Rehab/recovr-plugins` |
| `.agents/plugins/marketplace.json` | `codex plugin marketplace add Recovr-Rehab/recovr-plugins` |

## Releasing

Raise `version` in all three plugin manifests together (`.claude-plugin/plugin.json`, `plugin.json`,
`.grok-plugin/plugin.json`) with every release. The Claude directory and the xAI catalog bot follow this
repository's default branch, so every merge to `main` is a release candidate. A ChatGPT release is a new
ZIP (built by `store-listing/openai/build-zip.sh` in the Retention repository) and a new OpenAI review.

## Skills

Each skill is a job gym staff do: the weekly at-risk review, one member's lookup, member lists,
the membership report, timetable review, session prep, messaging and follow-up actions.

Every skill starts with the same ground rules. Edit them once in `shared/ground-rules.md`, then run
`node scripts/sync-ground-rules.mjs` to copy them into each `SKILL.md`. `node scripts/sync-ground-rules.mjs --check`
fails if a skill is out of date or names a tool the Recovr MCP server doesn't publish. Hosts other than Claude Code
can't read files outside a skill's own folder, so the rules are copied in rather than linked.

Detail that only some requests need lives in a skill's `references/` folder, one level below its `SKILL.md`.

## Maintaining this repository

This repository owns the distributed manifests, icons and skills. It is maintained separately from the hosted MCP implementation in the Retention repository; changes there do not regenerate these files.

Update skills when the published MCP contract changes (and the tool list in `scripts/sync-ground-rules.mjs`), validate them against the live tool catalogue, raise the version and test the result in each host: `claude plugin validate ./recovr-retention --strict`, `grok plugin validate recovr-retention`, and a Codex install from a local marketplace.

The Git marketplace declares `authentication: ON_INSTALL`. That marketplace policy is outside a standalone plugin ZIP; verify authentication onboarding separately for the ZIP installation path. The server must require authentication for every member-data operation in either case.
