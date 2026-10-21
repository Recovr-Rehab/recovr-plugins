---
name: membership-report
description: Reports a gym's membership numbers from Recovr with the parts behind each one. Use when staff ask "how many active members do we have?", "what was our churn last month?", "joins and cancellations this month", "how many trials converted?", "how is retention trending?", for month-end or owner reporting, "why doesn't this match Mindbody/Hapana?", or "why are members leaving?". Not for a list of named members (member-list-builder).
---

# Membership report

Staff check these numbers against their booking system. Show the parts behind every number: a number with its parts can be reconciled, a bare number can only be argued with.

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say Recovr's sync may be behind and offer https://support.recovr.com, rather than sending the gym to fix their booking system.
- Change records only when the user asks, and call a change done only after the tool reports success.
- Outside this connection: booking classes, payments and refunds, bulk sending, and building Builder workflows, boards, forms or saved reports. Point to the Recovr app at https://retention.recovr.com. For "how do I…" questions about Recovr, use `recovr_search_help` and share only the links it returns; without that tool, point to https://support.recovr.com.
<!-- ground-rules:end -->

## 1. Set the scope

Default to the last full studio month plus month to date, from `studio_today`, and to Membership-classified packages. State both at the top.

## 2. Gather

1. `recovr_get_retention_summary`: `active_members` and `members_breakdown`.
2. `recovr_describe_analytics_model`, then `recovr_query_analytics` using its `query_guide` recipes for joins, cancellations, scheduled cancellations, `MembershipChurn`, and trials and conversion.
3. A line whose query fails or times out reads "couldn't be read" with the error; the rest of the report still goes out.

## 3. Report

Lead with one table, then a short note per caveat:

```
Membership report, September 2026 (memberships only; today is 21 Oct)

Active members today   212   all current packages; on a membership: 188
                             (the 212 includes staff/$0 9, hidden from reports 13)
Not counted, for context      suspended 9, pending 6
Joins                   14   first membership purchased in September (Oct to date: 6)
Cancellations           11   processed in September (Oct to date: 4)
Scheduled to end         5   notice given, end dates in Oct–Nov
Churn, August         2.6%   7 of 270 at the start of the month (3 unverified)
Churn, September         –   not established yet: 30-day return window still open
Trials started          19   9 already on a membership (Oct to date: 8 started)
```

- **Active members:** Active status and a current package. Show each part of `members_breakdown` as returned. Suspended and pending members are context next to the count, never part of it. Active-status records without a package (leads, lapsed) are not members; quote them only as a labelled second number.
- **Joins:** first membership purchase, not when the record was created. Name the definition used.
- **Cancellations:** processed (cancellation date) and scheduled (notice given) are separate lines. A current Cancelled status alone doesn't mean they left this month.
- **Churn:** only from `MembershipChurn`. Read [references/churn.md](references/churn.md) before writing the churn line or answering "what does provisional mean?".
- **Trials:** package classification is set in Recovr (Settings > Packages). A package nobody classified counts as no type, so if any exist, call the trial count a lower bound. Someone holding an intro offer alongside a membership has already converted.

## 4. When the user's number differs

Follow [references/reconcile.md](references/reconcile.md). Show the parts; never defend the figure.

## 5. Why are members leaving? (only when asked)

Follow [references/why-members-leave.md](references/why-members-leave.md). It is read-only.
