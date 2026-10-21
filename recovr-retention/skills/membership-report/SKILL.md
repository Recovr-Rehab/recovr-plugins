---
name: membership-report
description: Reports a gym's membership numbers from Recovr, counted the way the gym's package settings define them. Use when staff ask "how many active members do we have?", "what was our churn last month?", "joins and cancellations this month", "how many trials converted?", "how is retention trending?", for month-end or owner reporting, "why isn't this member counted?", "that number looks wrong", or "why are members leaving?". Not for a list of named members (member-list-builder).
---

# Membership report

Recovr's numbers are the gym's numbers: one published definition, applied with the gym's own settings in Settings → Packages (https://retention.recovr.com/settings/packages), where they classify each package and choose whether it shows in reports. Give each number with confidence and one short sentence on what it counts. Don't ask for the booking system's figure or walk staff through arithmetic.

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say what Recovr holds, check whether a Recovr setting explains it, and otherwise treat it as a Recovr data problem and offer to report it to Recovr support. Never send the gym to fix or check their booking system.
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

Active members today   212   everyone Active with a current package of any type
  on a Membership      188   packages you've classified as a Membership
Shown alongside         suspended 9, starting soon 6 (not members yet)
Joins                   14   first membership purchased in September (Oct to date: 6)
Cancellations           11   processed in September (Oct to date: 4)
Scheduled to end         5   notice given, end dates in Oct–Nov
Churn, August         2.6%   7 of 270 at the start of the month (3 unverified)
Churn, September         –   not established yet: 30-day return window still open
Trials started          19   9 already on a membership (Oct to date: 8 started)
```

- **Active members:** Active status and a current package of any type, whatever its classification or report setting. Use `members_breakdown` for what's counted (`by_package_type`, so the Membership line can sit under the total) and what's shown alongside (`suspended`, `pending_start`). Suspended and not-yet-started members are never part of the count, and Active-status records without a package (leads, lapsed) are not members. These are labelled numbers in their own right, not parts to add up against another system.
- **Joins:** first membership purchase, not when the record was created. Name the definition used.
- **Cancellations:** processed (cancellation date) and scheduled (notice given) are separate lines. A current Cancelled status alone doesn't mean they left this month.
- **Churn:** only from `MembershipChurn`. Read [references/churn.md](references/churn.md) before writing the churn line or answering "what does provisional mean?".
- **Trials:** count packages the gym classified as Intro. Members whose package nobody classified (`by_package_type.unclassified`) are active members but in no type line; when there are any, say how many and that classifying those packages in Settings → Packages puts them in the right line. Someone holding an intro offer alongside a membership has already converted.

## 4. When they want a different cut, or a number looks wrong

Follow [references/when-a-number-looks-wrong.md](references/when-a-number-looks-wrong.md). Answer the cut they asked for now, name the setting that would make it the default, and treat a wrong-looking member or number as Recovr's to fix.

## 5. Why are members leaving? (only when asked)

Follow [references/why-members-leave.md](references/why-members-leave.md). It is read-only.
