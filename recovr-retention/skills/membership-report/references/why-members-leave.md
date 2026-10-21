# Why are members leaving?

Read-only. Answers "why" from the members who actually left, not from a theory.

1. **Pin the question:** a period, a cohort or a change ("since the timetable change in August"). Default to last quarter against the one before.
2. **Cohort:** memberships cancelled in the period, by cancellation date, from `recovr_query_analytics`. Members who merely stopped attending are a separate group; say which you are looking at.
3. **Read 15 to 20 histories:** `recovr_get_client` `view: "timeline"` and `view: "details"`, plus `recovr_list_conversations` / `recovr_get_conversation_messages`. Sort each ending into one shape:
   - **Faded:** visits thinned over weeks.
   - **Cliff:** regular, then nothing from a specific date. Check what changed that week.
   - **Never landed:** one or two visits after joining. An onboarding gap, often misread as churn.
   - **Admin:** package ended while they were still attending and nobody renewed it.
   - **Voiced:** they said why in a message. Quote the gist.
4. **What they share:** class time, instructor, package, tenure at exit (from when they started, not the last billing cycle), and whether anyone at the gym messaged them before they left. "Messaged" means a staff-sent message, not a note, snooze or booking email. Use cancellation reasons where the platform sends them.
5. **Timing:** compare clusters with events the user knows (price or timetable changes, a coach leaving, holidays). A cluster is a lead, not proof.

## Report

- The pattern with counts: "11 of the 19 we read stopped within three weeks of the 6am moving to 6:30."
- The theories the data doesn't support.
- Never landed versus genuinely lapsed; they need different fixes.
- Fixes split into process (renewals nobody chased, members nobody contacted) and product (timetable, pricing, coaching).
- The sample size: 15 histories can show a pattern, not prove a rate.

Members still worth saving go to `weekly-at-risk-review`.
