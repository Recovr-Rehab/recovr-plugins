---
name: recovr-member-lookup
description: Looks up one gym member in Recovr and explains their situation. Use when staff ask "summary of [member]", "has she been in lately?", "why is he high risk?", "why is her score dropping?", "what package is she on?", or say a member's numbers look wrong ("she's done 134 classes, not 0"). Not for lists of members (member-list-builder) or the weekly review (weekly-at-risk-review).
---

# Member lookup

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say what Recovr holds, check whether Recovr's published definition or one of the gym's Recovr settings explains it, and otherwise treat it as a Recovr data problem and offer to report it to Recovr support. Never send the gym to fix or check their booking system.
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
- "New" means their first class here was less than 14 days ago; with no class yet, their start date (or join date) was less than 14 days ago. Next Up's "New member" chip is a wider 30-day window.

## When staff say it's wrong

Staff usually know their member, so treat a mismatch as Recovr's to fix. Say plainly what Recovr holds and where it differs from what they said. If a setting explains it, name the setting and link it: a package with no type, or one hidden from reports, in Settings → Packages (https://retention.recovr.com/settings/packages). Suspended clients aren't counted as active members, but a suspension can keep a current package, so check the package dates before calling it expired or not current. A package that starts in the future isn't current yet. Otherwise say Recovr has it wrong or is missing data, such as visits from before the gym joined Recovr. Offer to write it up for Recovr support at https://support.recovr.com with the member, what Recovr shows and what they expected. Never send them to check their booking system, and never defend the figure.

Changes go through `recovr-follow-up`; messages through `recovr-messaging`.
