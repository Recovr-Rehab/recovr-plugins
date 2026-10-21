---
name: session-prep
description: Makes a coach's huddle sheet for upcoming classes from Recovr, one line per booked member. Use when staff ask "who's in my next class?", "session report for tomorrow", "which at-risk members are booked in tonight?", "who's on a trial in the 6am?", "who has nothing booked after tonight?", or paste their own daily session-report template. Not for attendance trends across weeks (timetable-review).
---

# Session prep

A huddle sheet is read on a phone minutes before class. One line per member, only cues a coach can act on.

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say Recovr's sync may be behind and offer https://support.recovr.com, rather than sending the gym to fix their booking system.
- Change records only when the user asks, and call a change done only after the tool reports success.
- Outside this connection: booking classes, payments and refunds, bulk sending, and building Builder workflows, boards, forms or saved reports. Point to the Recovr app at https://retention.recovr.com. For "how do I…" questions about Recovr, use `recovr_search_help` and share only the links it returns; without that tool, point to https://support.recovr.com.
<!-- ground-rules:end -->

## 1. Find the classes

Use `recovr_get_attendance` with `view: "session_report"`.

- "Next class", "tonight", "this afternoon": omit `date` and use the returned `studio_time_now` to keep only classes still to start.
- "Tomorrow": the day after `studio_today`, as `date`.
- A time the user names: pass `session_time` as they said it ("6am").
- If `clients_not_shown` is above zero for a class, call once more for just that class (`session_time` or `session_name`). If members are still not shown, list who you have and say how many are missing.

## 2. Build each line

Take what the report row gives, and read `recovr_get_client` (`view: "details"` or `"timeline"`) only for what it lacks.

| Cue | Show when |
| --- | --- |
| Trial day N, or intro session N | Holds an intro package. Count days the way the gym does (from purchase or from first visit); ask once if unsure, then state it. |
| First few sessions | First class here less than 14 days ago. |
| Back from suspension | First visits after a suspension ended. |
| Risk | Medium or high band, plus "Snoozed" if snoozed. |
| Flagged | With the flag reason. |
| Lifetime visits | Always; call out milestones (50, 100, 200…). |
| Note | A recent injury or anything a coach should know, in a few words. |
| Next booking | The next booked class after this one, or "nothing booked after". Check actual bookings after this class; a single "next session" field can miss a later one. |

A long-standing member who buys a trial pack is not a new trialist; skip the trial cue for them.

## 3. Lay it out

Classes in start-time order with name, time, coach (if known) and booked count, then one bullet per member, most important cue first. Leave out classes with no bookings and say how many.

```
Tomorrow, Wed 22 Oct

6:00am Strength · Coach B · 12 booked
- Member A · Trial day 3 of 14 · 2nd visit · nothing booked after
- Member C · High risk · back from suspension · 214 visits
- Member E · 100th visit
(3 more with no cues)

9:30am Pilates · Coach D · 6 booked
- Member F · Flagged: shoulder, keep to modifications

2 classes with no bookings left out.
```

When the gym gives its own template, follow its fields and order exactly.

## 4. After the sheet

Offer to flag members or log a note (`recovr-follow-up`), or draft a welcome or milestone message (`recovr-messaging`). Lifetime visits can miss history from before the gym's data reached Recovr, and a missing coach name is a gap in synced data, not the gym's mistake.
