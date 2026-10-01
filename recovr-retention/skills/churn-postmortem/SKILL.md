---
description: Work out why members are leaving a gym, by examining the ones who already left. Use when asked why churn is up, why members are cancelling, what is driving cancellations, to analyse a drop in attendance, or for a retention postmortem on a period or a cohort.
---

# Churn postmortem

"Why are people leaving?" is usually answered with a theory. This skill answers it with the
members who actually left.

A postmortem is worth doing when something changed — a bad month, a price rise, a timetable
change, an instructor leaving — or on a regular cadence to catch drift. It is different from
the weekly at-risk review: that one is about people you can still save, this one is about
learning from people you did not.

## Method

**1. Pin down the question.** "Churn is up" is not answerable. Get to a period, a cohort, or a
change: *which* months, *which* group, *what changed and when*. If the user cannot say, start
with the last quarter against the one before it.

**2. Establish the shape.** `recovr_get_retention_summary` for the current standing. Then use `recovr_find_clients`
to build the comparison — it filters on attended date ranges, package names, and status, which
is what lets you separate "members who lapsed in March" from "members who lapsed in June".

**3. Read individual histories. This is the step people skip and it is where the answer is.**
Take fifteen to twenty who actually lapsed and walk `recovr_get_client_timeline` and `recovr_get_client_details`
for each. You are looking for the shape of the ending, and the shapes are recognisable:

- **Faded** — attendance thinned over weeks. Usually life, sometimes boredom. The gym had a
  window and missed it.
- **Cliff** — regular, then nothing. Something specific happened on a specific date. Look at
  what else changed that week.
- **Never landed** — one or two visits after joining. This is an onboarding failure, and it is
  the most commonly misdiagnosed as churn.
- **Admin** — package expired and was never renewed while they were still attending. This is
  recoverable revenue lost to process, not a retention problem at all.
- **Voiced** — they said something in a conversation thread before leaving. Read it. This is the
  highest-value evidence in the whole exercise and it is sitting in `recovr_get_conversation_messages`.

**4. Look for what they had in common.** Class time, instructor, package type, day of week,
tenure at the point of leaving, whether anyone ever contacted them. `recovr_get_session_report` and
`recovr_list_recent_sessions` help test a timetable or instructor theory against attendance.

**5. Test the timing against events.** If cancellations cluster, find what happened that week.
A price change, a timetable change, a staff departure, a competitor opening, school holidays.
Correlation is not proof, and say so, but a cluster with an obvious cause is worth acting on.

**6. Check whether anyone tried.** For each lapsed member, did the gym ever make contact? If a
large share left with no outreach at all, the finding is not "members are unhappy" — it is
"nobody reached out", which is a far more fixable problem and a different conversation.

## Reporting it

Lead with the finding, not the method. Then:

- **The pattern**, with the count behind it — "11 of the 19 we looked at stopped within three
  weeks of the Tuesday 6am moving to 6.30".
- **What is not supported.** Naming the theories the data does *not* back is often the most
  valuable part, especially when someone arrived certain of one.
- **The distinction that matters most**: how much of this was never-started versus genuinely
  lapsed. They have completely different fixes, and conflating them wastes a quarter.
- **What to change**, concretely, in priority order — and separate the process fixes (expired
  packages nobody chased, members nobody contacted) from the harder product ones (timetable,
  pricing, instructor mix). Process fixes are cheap and usually the bigger number.
- **Sample size and its limits.** Say how many members you actually examined. Fifteen histories
  is enough to find a pattern and not enough to prove a rate. Do not dress it up as statistics.

## Rules

- **Read-only.** A postmortem changes no data. If it surfaces people still worth saving, hand
  that to the weekly at-risk review rather than acting here.
- **Do not invent causes.** If the histories do not show a common thread, the honest finding is
  that churn looks idiosyncratic — and that itself rules out the single-cause theories.
- Distinguish members who cancelled from members who merely stopped attending. Both matter;
  they are not the same event and often have different causes.
- All data is scoped to the authenticated staff member's gym automatically.
