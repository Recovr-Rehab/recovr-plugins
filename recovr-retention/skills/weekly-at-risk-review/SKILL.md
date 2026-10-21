---
name: weekly-at-risk-review
description: Runs a gym's weekly retention review from Recovr and turns it into a plan of who to contact, by whom and why. Use when staff ask "who needs attention?", "pull up Next Up", "who is starting to slip?", "who's about to churn?", "top 5 members to save" or want to plan the week's outreach. Not for exporting a fixed list (member-list-builder) or one member's details (recovr-member-lookup).
---

# Weekly at-risk review

The result is a decision: who gets contacted this week, by whom, and why. A list alone is not the result.

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say Recovr's sync may be behind and offer https://support.recovr.com, rather than sending the gym to fix their booking system.
- Change records only when the user asks, and call a change done only after the tool reports success.
- Outside this connection: booking classes, payments and refunds, bulk sending, and building Builder workflows, boards, forms or saved reports. Point to the Recovr app at https://retention.recovr.com. For "how do I…" questions about Recovr, use `recovr_search_help` and share only the links it returns; without that tool, point to https://support.recovr.com.
<!-- ground-rules:end -->

## Workflow

Copy this checklist and tick it off:

```
- [ ] 1. Restate the review settings
- [ ] 2. Owed a reply
- [ ] 3. Next Up, or the fallback
- [ ] 4. Extra passes: high risk, fading medium, first slip
- [ ] 5. Sort and read the top 10
- [ ] 6. The plan
- [ ] 7. Offer to record decisions
```

**1. Restate the review settings.** If the user has standing rules (labels to skip, their own band such as "medium under 60", a list size), restate them in one line at the top so next week's rerun is a single prompt. Frame the week from the summary's band counts, high risk first. Bands cover only members on packages shown in reports, so they can add up to less than `active_members`.

**2. Owed a reply.** `recovr_list_conversations` with `filter: "reply_owed"`. These members wrote and are waiting. Put them in their own section, first, and say they are owed an answer, not necessarily at risk.

**3. Next Up.** Call `recovr_get_next_up`, Recovr's ranked list of who to reach out to and why. Its owed-a-reply cards join step 2's section; the rest form the start of the plan. If the tool isn't available, or it says Next Up is off for this studio, skip to step 4 and say the list was built from risk bands instead.

**4. Extra passes.** Run each; they catch people Next Up may not show.

- **High risk:** `recovr_find_clients` with `risk: "high-risk"`, every page (`next_offset` → `offset`). Snoozed members are on this list: show them marked "Snoozed" and count them. Show assigned members with their coach; assigned is not the same as contacted.
- **Fading medium:** `risk: "medium-risk"` members whose score fell over the last 2 to 4 weeks (`recovr_get_client` `view: "health_trajectory"`, or the score-history recipe in `recovr_describe_analytics_model`'s `query_guide`). About 25 at most, none already in the high-risk pass.
- **First slip:** members who came regularly for the last couple of months and have no visit in the last 7 to 10 days (attended date filters on `recovr_find_clients`). The cheapest saves.

**5. Sort, then read.** Put each person in one group:

- **Never landed:** one or two visits ever. An onboarding check-in, not a "haven't seen you" message.
- **Admin:** a non-intro package genuinely ending (the `renewal` risk value: within 7 days of expiry) while they still attend. A renewal conversation. An expiry that is just a billing date on an auto-renewing membership, or one covered by a longer auto-renewing membership, is not a renewal. An ending intro package is conversion, and a New member's first pack running out is onboarding, not renewal.
- **Lapsing:** an established member whose visits fell. The group this review exists for.

For the 10 most urgent, read `recovr_get_client` `view: "details"` and `view: "timeline"` and their latest conversation. Find the specific reason, because the reason decides the message.

**6. The plan.** One row per member, ranked by how recoverable they are rather than by lowest score:

| Member | Band | Why (evidence) | Action | Owner |
| --- | --- | --- | --- | --- |
| Member A | High | 3 years, weekly 6am, no visit in 19 days, nothing booked | Call | Coach B |
| Member C | Medium, falling | 82 → 51 in 3 weeks after moving from 3 to 1 visit a week | Text | Coach D |
| Member E | High, Snoozed | Snoozed until 4 Nov: travelling | None this week | n/a |

**7. Record decisions.** Offer, then follow `recovr-follow-up`: assign each member to their owner (the coach gets a Recovr notification), flag those who need follow-up, snooze anyone with a good reason to drop out of Next Up. For wording, draft one message per member with `recovr-messaging`.

Nothing is sent during the review. It is done when the owed-reply section, every pass (or its quoted error) and a reason and action for each planned member are in the answer.
