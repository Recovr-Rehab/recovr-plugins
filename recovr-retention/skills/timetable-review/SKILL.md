---
name: timetable-review
description: Analyses class attendance in Recovr to inform the timetable and staffing. Use when staff ask "which classes were busiest last week?", "most under-used class", "which instructors draw the biggest classes?", "best hours to staff", "top 10 attenders this year", "who no-showed or late-cancelled the 6am this week?", or "who came on Tuesday?". Not for tomorrow's huddle sheet (session-prep).
---

# Timetable review

Attendance questions start broad and get refined ("exclude weekends", "last 12 weeks", "only the three core classes"). Keep each refinement and restate the current filters with every answer.

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say what Recovr holds, check whether Recovr's published definition or one of the gym's Recovr settings explains it, and otherwise treat it as a Recovr data problem and offer to report it to Recovr support. Never send the gym to fix or check their booking system.
- Change records only when the user asks, and call a change done only after the tool reports success.
- Outside this connection: booking classes, payments and refunds, bulk sending, and building Builder workflows, boards, forms or saved reports. Point to the Recovr app at https://retention.recovr.com. For "how do I…" questions about Recovr, use `recovr_search_help` and share only the links it returns; without that tool, point to https://support.recovr.com.
<!-- ground-rules:end -->

## Choose the source

| Question | Source |
| --- | --- |
| One day ("who came Tuesday?", "no-shows this morning") | `recovr_get_attendance` `view: "session_report"` for that date. |
| A few recent days of visits | `recovr_get_attendance` `view: "recent_sessions"`. |
| Anything across weeks: busiest, under-used, instructors, hours, top attenders, no-show rates | `recovr_describe_analytics_model`, then `recovr_query_analytics` from its `query_guide` attendance recipes (`AttendanceBySlot`, `ClassRoster`, `Sessions`). One query per question; no looping over days. |

## Rules that change the answer

- **Per class run.** Compare average attendance per run and show the number of runs. Totals favour classes that ran more often. Leave out one-off classes unless asked.
- **Same weekday.** Compare a slot with the same slot on the same weekday. Read weekday names from the data.
- **Instructors.** Some platforms don't send the instructor for every class. Report how many runs have no instructor and leave them out of instructor rankings; it is a gap in Recovr's data, not the gym's error. Rank an instructor only across the slots they actually teach.
- **No-shows and late cancels.** Keep booked, attended, no-show, late-cancelled and cancelled separate. A no-show on a day the member attended another class is usually a class switch. Zero no-shows across a busy week means none are recorded in Recovr, not a perfect week; say that, and if it looks wrong, offer to report it to Recovr support.
- **People vs visits.** Distinct people and class attendances are different counts; label which one each number is.
- **Dates.** State the exact range. "Last 7 days" in analytics excludes today.

## Example

User: "Which classes were busiest last week, weekdays only?"

```
Weekday classes, Mon 13 – Fri 17 Oct (by average attendance per run)

Class            Slot      Runs  Avg per run  Total
Strength         6:00am      5      18.4        92
HIIT             5:30pm      5      16.0        80
Mobility         12:15pm     3       4.3        13   <- least used

Excludes 2 one-off workshops. 4 runs had no instructor recorded.
```

Offer the natural next cut (same view over 12 weeks, by class category, AM vs PM) rather than a long menu.
