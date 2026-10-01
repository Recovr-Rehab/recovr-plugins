# Recovr plugins

The Recovr Retention plugin for Claude, ChatGPT and Codex. It connects your AI assistant to your gym's
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
