# Recovr

Spot gym members at risk of cancelling, understand why, and plan personal follow-up from Claude, using the data already in your Recovr account.

## What the plugin adds

- **The Recovr connector**, Recovr's hosted MCP server at `https://retention-backend.recovr.com/mcp`. It gives Claude 15 tools for members, attendance, analytics, conversations and follow-up.
- **Four skills** that teach Claude how to use those tools well:
  - `recovr-member-lookup`: find members and explain their risk, profile and history.
  - `recovr-analytics`: attendance, class rosters, member counts, cancellations and trial conversion.
  - `recovr-messaging`: inbox search, replies owed, drafts, and sending only after you approve.
  - `recovr-follow-up`: flag, snooze, assign, do-not-contact and notes.

## Set up

1. Install the plugin from the Claude directory. In Claude Code you can instead run `claude plugin marketplace add Recovr-Rehab/recovr-plugins` and then `claude plugin install recovr-retention@recovr`.
2. Connect Recovr from the plugin's **Connectors** tab in claude.ai, Desktop or Cowork, or run `/mcp` in Claude Code.
3. Sign in with your Recovr staff account, choose your gym location and select **Allow**.

You need a Recovr staff account at a gym with an active Recovr subscription.

## Try asking

- "Which members are at high risk of cancelling this week?"
- "Why is Sarah's health score dropping?"
- "Draft a check-in text for members who haven't been in for a fortnight. Don't send it."
- "Show me conversations waiting on a reply."
- "Who came to class yesterday, grouped by class?"

## What it can and can't do

Claude can read members, attendance, analytics, conversations and staff. It can flag, snooze or assign members, stop outbound messages to a member, and add notes. Drafts contact no one. Sending an SMS or email is a separate action that Claude asks you to approve, and it can't be undone. The plugin can't book classes, take payments or refunds, send bulk messages, or build saved reports.

## Data and privacy

The plugin contains only instructions and the connector address. It holds no credentials and stores nothing. Every request goes over HTTPS to Recovr at `retention-backend.recovr.com`, authorised by your sign-in and limited to the one location you approved. Recovr returns the member information needed to answer each request to Claude. Depending on the request, that can include names, contact details, attendance, membership and billing history, staff notes, engagement scores and message history. Recovr doesn't keep a separate copy of what it returns, and deletes its records of assistant requests after 30 days. The plugin sends nothing to any other service. A member's health score measures engagement and cancellation risk, not medical health.

- Privacy policy: https://retention.recovr.com/privacy
- Terms: https://retention.recovr.com/terms
- Setup guide: https://retention.recovr.com/mcp

## Support

Email support@recovr.com for connection problems, access questions or to disconnect.

Published by Recovr Pty Ltd. See [LICENSE](LICENSE).
