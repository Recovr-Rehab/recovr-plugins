# Recovr plugins

The Recovr plugin for Claude, ChatGPT and Codex. It connects your AI assistant to your gym's
Recovr account. See [recovr-retention/README.md](recovr-retention/README.md) for what it does,
what it connects to and how to install it.

One folder serves every client:

| File | Read by |
|---|---|
| `recovr-retention/.claude-plugin/plugin.json`, `.mcp.json` | Claude (claude.ai, desktop, Cowork, Claude Code) |
| `recovr-retention/plugin.json`, `mcp.json`, `assets/` | Codex and the ChatGPT plugin directory |
| `recovr-retention/skills/` | Both |
| `.claude-plugin/marketplace.json` | `claude plugin marketplace add Recovr-Rehab/recovr-plugins` |
| `.agents/plugins/marketplace.json` | `codex plugin marketplace add Recovr-Rehab/recovr-plugins` |

Raise `version` in the manifest you change with every release. The Claude directory follows this
repository's default branch.

## Maintaining this repository

This repository owns the distributed manifests, icons and skills. It is maintained separately from the hosted MCP implementation in the Retention repository; changes there do not regenerate these files. There is currently no automatic build or sync workflow here.

Update guides when the published MCP contract changes, validate them against the live tool catalogue, increment the release version and test the exact resulting archive in its intended host. The Retention script `store-listing/openai/build-zip.sh` packages this repository; it does not author or synchronise it.

The Git marketplace declares `authentication: ON_INSTALL`. That marketplace policy is outside a standalone plugin ZIP; verify authentication onboarding separately for the ZIP installation path. The server must require authentication for every member-data operation in either case.
