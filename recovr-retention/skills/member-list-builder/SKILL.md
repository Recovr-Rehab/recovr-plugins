---
name: member-list-builder
description: Builds a complete, exportable list of gym members from Recovr with an agreed definition. Use when staff ask "who hasn't been in for two weeks?", "everyone on the 21-day jumpstart", "my coach's active clients", "who bought a 10-pack last month", "whose birthday is this week", "who hit 100 classes", or want a list as CSV, a spreadsheet or a weekly rerun. Not for the weekly at-risk plan (weekly-at-risk-review) or headline counts and churn (membership-report).
---

# Member list builder

Most disagreements about a list are about who counts. Agree the definition, pull every match, return exactly the columns asked for.

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say Recovr's sync may be behind and offer https://support.recovr.com, rather than sending the gym to fix their booking system.
- Change records only when the user asks, and call a change done only after the tool reports success.
- Outside this connection: booking classes, payments and refunds, bulk sending, and building Builder workflows, boards, forms or saved reports. Point to the Recovr app at https://retention.recovr.com. For "how do I…" questions about Recovr, use `recovr_search_help` and share only the links it returns; without that tool, point to https://support.recovr.com.
<!-- ground-rules:end -->

## 1. Pin the cohort

Ask once, in one message, only about what the request leaves open:

- **Packages:** memberships only, or any current package? Trial passes and class packs are current packages too (`package_type`: membership, intro, class_pack, other).
- **Status:** Active only? Include Suspended or pending memberships?
- **Leave out:** staff, ambassador or $0 packages? Members whose packages are all hidden from reports? Plain lists include them (rows show `shown_in_reports: false`); risk lists leave them out unless you set `include_hidden_from_reports`.
- **Snoozed:** included and marked unless the user says otherwise.
- **Labels** (`labels`, `exclude_labels`), **risk, coach, seller, attendance window**, if relevant.

A member, by default, is Active status with a current package. Then restate the cohort as a block at the top of the answer, with relative windows resolved from `studio_today`:

```
Cohort (21 Oct 2026): Active, Membership packages only, Suspended excluded,
label "Staff" excluded, no visit since 7 Oct (14 days), snoozed included and marked.
```

Say that pasting this block next time reruns the same list in one prompt.

For how to express common cohorts (lapsed, coach's clients, packages bought, birthdays, milestones, tenure week N, trials), see [references/cohort-recipes.md](references/cohort-recipes.md).

## 2. Pull every match

- Page through `recovr_find_clients`, passing each `next_offset` back as `offset`, until no `next_offset` comes back. Report "N of N". If you stop early, say how many are missing.
- When `total_is_exact` is false, the total is a lower bound. Say so.
- When a part of the definition can't be filtered (for example $0 packages), say so, show how many rows it affects, and let the user decide.
- Check the count against `recovr_get_retention_summary`. When it differs from `active_members` or a band count, show the parts of `members_breakdown` that explain it. Suspended and pending members are context next to the count, not part of it.

## 3. Return what they asked for

- The columns the user named, in their order. A column the data doesn't have is left out and named, never estimated.
- Fetch per-member detail with `recovr_get_client` only for a column that needs it, and warn first when that means many calls.
- Mark snoozed members, members whose packages are hidden from reports (`shown_in_reports: false`) and flagged members.
- Offer a CSV or spreadsheet. The host makes the file; include every row and put the cohort line above the header.

## 4. Hand off

Offer the next step once:

- **Messages** (shout-outs, check-ins): one reviewed draft per member with `recovr-messaging`, leaving out snoozed and do-not-contact members and naming them.
- **Assign, flag, snooze or note:** `recovr-follow-up`.
- **Labels:** this connection can filter by labels but not apply them; apply them in the Recovr app.

The list is done when every match is in it (or the shortfall is stated), the cohort block is at the top, and the columns match the request.
