---
name: recovr-member-lookup
description: Looks up one gym member in Recovr and explains their situation. Use when staff ask "summary of [member]", "has she been in lately?", "why is he high risk?", "why is her score dropping?", "what package is she on?", or say a member's numbers look wrong ("she's done 134 classes, not 0"). Not for lists of members (member-list-builder) or the weekly review (weekly-at-risk-review).
---

# Member lookup

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say Recovr's sync may be behind and offer https://support.recovr.com, rather than sending the gym to fix their booking system.
- Change records only when the user asks, and call a change done only after the tool reports success.
- Outside this connection: booking classes, payments and refunds, bulk sending, and building Builder workflows, boards, forms or saved reports. Point to the Recovr app at https://retention.recovr.com. For "how do I…" questions about Recovr, use `recovr_search_help` and share only the links it returns; without that tool, point to https://support.recovr.com.
<!-- ground-rules:end -->

## Steps

1. **Find them.** `recovr_find_clients` with `search` (a name, or part of one). If several people match, list them with something that tells them apart (package, last visit) and ask which one.
2. **Read.** `recovr_get_client` `view: "details"`, then `view: "timeline"` when the question is about what happened. Add `view: "health_trajectory"` (explicit `from` and `to`, ending at `studio_today`) for "is it dropping?".
3. **Answer the question asked**, with the evidence first and any explanation labelled as possible.

```
Member A: high risk (score 24), 3-year member on an unlimited membership.
Evidence: weekly 6am regular until 30 Sep; no visit in 21 days; nothing booked.
Score: 71 on 1 Oct → 24 today, falling with each week away.
Possible reasons: none recorded. No messages from the gym since August.
```

## Reading a profile correctly

- **Risk bands:** high 0–33, medium 34–69, low 70–100. Non-attender means no visit in the last 21 days. A score measures engagement and cancellation risk; it is not medical and not a prediction of certainty.
- Missing score history means the trend is unknown, not falling. A score dated after `studio_today` is a forecast.
- Zero remaining sessions on an unlimited membership doesn't mean it ran out. A next billing date is not the end of a recurring membership; Australian memberships often bill weekly or fortnightly.
- Tenure counts from when they started, not from the current billing cycle's purchase date.
- Contact-log entries from the booking system or automations are not staff outreach. A snooze, a note or being assigned is not a message.
- "New" means their first class here was less than 14 days ago.

## When staff say it's wrong

Staff usually know their member. Report exactly what Recovr holds and where it differs from what they said: lifetime visits can miss history from before the gym's data reached Recovr, pending or suspended memberships can show as not current, and synced data can lag the booking system. Say Recovr's data may be behind and offer https://support.recovr.com.

Changes go through `recovr-follow-up`; messages through `recovr-messaging`.
