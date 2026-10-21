# Recovr

Spot gym members at risk of cancelling, understand why, and plan personal follow-up from your AI assistant, using the data already in your Recovr account.

## What the plugin adds

- **The Recovr connector**, Recovr's hosted MCP server at `https://retention-backend.recovr.com/mcp`. Its tools read members, attendance, analytics and conversations, and record follow-up.
- **Eight skills** built around the jobs gym staff do most:
  - `weekly-at-risk-review`: who needs attention this week, why, and who should contact them.
  - `recovr-member-lookup`: one member's situation, risk and score history.
  - `member-list-builder`: complete member lists with the definition you choose, ready to export.
  - `membership-report`: active members, joins, cancellations, churn and trials, with the parts behind each number.
  - `timetable-review`: busiest and quietest classes, instructors, staffing hours, no-shows.
  - `session-prep`: a one-line-per-member huddle sheet for upcoming classes.
  - `recovr-messaging`: replies owed, drafts in your gym's voice, and sending only after you approve.
  - `recovr-follow-up`: flag, snooze, assign, stop contact and log interactions.

## Set up

You need a Recovr staff account at a gym with an active Recovr subscription.

**Claude.** Install the plugin from the Claude directory, or in Claude Code run `/plugin install recovr-retention --marketplace Recovr-Rehab/recovr-plugins` (or `claude plugin marketplace add Recovr-Rehab/recovr-plugins` then `claude plugin install recovr-retention@recovr`). Connect Recovr from the plugin's **Connectors** tab in claude.ai, Desktop or Cowork, or run `/mcp` in Claude Code.

**ChatGPT and Codex.** Install Recovr from the ChatGPT plugin directory, or in Codex run `codex plugin marketplace add Recovr-Rehab/recovr-plugins` then `codex plugin add recovr-retention@recovr`.

**Grok Build.** Run `grok plugin marketplace add Recovr-Rehab/recovr-plugins` then `grok plugin install recovr-retention --trust` (trusting the plugin turns on its connector).

Then sign in with your Recovr staff account, choose your gym location and select **Allow**.

## Try asking

- "Who should we reach out to this week, and why?"
- "Which active members haven't been in for two weeks? Memberships only, as a spreadsheet."
- "How many active members do we have, and what was our churn last month?"
- "Give me a huddle sheet for tomorrow's classes."
- "Which messages still need a reply?"

## What it can and can't do

Your assistant can read members, attendance, analytics, conversations and staff. It can flag, snooze or assign members, stop outbound messages to a member, and log notes or calls; changes to more than five members are previewed before anything is applied. Drafts contact no one. Sending an SMS or email is a separate action that your assistant asks you to approve, and it can't be undone. The plugin can't book classes, take payments or refunds, send bulk messages, or build saved reports, workflows or boards.

## Data and privacy

The plugin contains only instructions and the connector address. It holds no credentials and stores nothing.

- **Network endpoint:** `https://retention-backend.recovr.com/mcp`, over HTTPS. The plugin contacts no other service.
- **Credentials:** OAuth sign-in with your Recovr staff account, handled by your assistant. Access is limited to the one location you approved.

Recovr returns the member information needed to answer each request. Depending on the request, that can include names, contact details, attendance, membership and billing history, staff notes, engagement scores and message history. Recovr doesn't keep a separate copy of what it returns, and deletes its records of assistant requests after 30 days. A member's health score measures engagement and cancellation risk, not medical health.

- Privacy policy: https://retention.recovr.com/privacy
- Terms: https://retention.recovr.com/terms
- Setup guide: https://retention.recovr.com/mcp

## Support

Visit https://support.recovr.com or email support@recovr.com for connection problems, access questions or to disconnect. You can also revoke access yourself from Account > MCP > Connected apps in Recovr.

Published by Recovr Pty Ltd. See [LICENSE](LICENSE).
