# Recovr Retention

Query and act on your gym's client retention data from Claude, ChatGPT or Codex.

[Recovr](https://recovr.com) is a client-retention platform for gyms and fitness studios. This
plugin connects your AI assistant to your Recovr account. You can ask which members are at risk of
cancelling, read their attendance and message history, and draft outreach in the gym's own voice.

## What you can ask

```
Who's at risk of cancelling this week?
Why did we lose so many members in March?
Draft a message to Sarah. She hasn't been in for a month.
Which class times have the worst attendance?
Show me conversations waiting on a reply.
```

## Skills

| Skill | What it does |
|---|---|
| `weekly-at-risk-review` | Turns the at-risk list into a prioritised, assigned follow-up plan, and records the decisions back in Recovr. |
| `draft-winback-outreach` | Drafts re-engagement messages grounded in what actually happened to that member, in the gym's voice. |
| `churn-postmortem` | Works out why members left by reading the histories of the ones who already did. |

The assistant uses these automatically when the task fits. In Claude Code you can also call one
directly, for example `/recovr-retention:weekly-at-risk-review`.

## What this plugin connects to

The plugin contains no code that runs on your machine. It has two parts:

- **The skills above:** written instructions that tell the assistant how to run each workflow.
- **One remote MCP server:** `https://retention-backend.recovr.com/mcp`, operated by Recovr.
  - Every tool reads or writes Recovr's own database for the one gym location you approve.
  - The plugin sends nothing anywhere else.
  - Messages you choose to send reach the member through the gym's messaging channel in Recovr, such as SMS or email.

## Sign-in and permissions

The first time the assistant uses a Recovr tool, your browser opens so you can sign in to Recovr
and approve access. Access is granted with OAuth against your own Recovr account. No API keys or
credentials are stored in the plugin. You can disconnect at any time from **Account → MCP** in the
Recovr app.

You need a Recovr account with access to a gym location. Data is scoped to that one location.

When you approve the connection, you grant these scopes:

- **read:** find and read clients, conversations, attendance, analytics and team members
- **write:** flag, snooze, assign, log interactions, draft and send messages

## Messaging safety

Sending an SMS to a member cannot be undone, so the plugin is deliberate about it:

- **Drafting is the default.** `recovr_draft_client_message` posts a message for staff approval inside Recovr and contacts nobody.
- **Sends are marked high-risk.** Sending tools are annotated destructive, non-idempotent and open-world. Your assistant asks before calling one and does not silently retry one after a timeout.
- **No bulk messaging.** It isn't available through this plugin. Send to a group from the Recovr app, where you can see the full recipient list on screen.

## Install

**Claude** (claude.ai, the desktop app, Cowork and Claude Code): add Recovr Retention from the
plugin directory once it is listed. Before that, in Claude Code:

```
/plugin marketplace add Recovr-Rehab/recovr-plugins
/plugin install recovr-retention@recovr
```

**Codex:**

```
codex plugin marketplace add Recovr-Rehab/recovr-plugins
codex plugin add recovr-retention@recovr
```

**ChatGPT:** add Recovr Retention from the plugin directory once it is listed.

## Support

- Email: [support@recovr.com](mailto:support@recovr.com)
- Help centre: https://support.recovr.com
- Privacy policy: https://retention.recovr.com/privacy
- Terms: https://retention.recovr.com/terms
- Sub-processors: https://retention.recovr.com/subprocessors
