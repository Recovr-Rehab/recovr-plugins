---
description: Run a weekly review of members at risk of cancelling, and turn it into a prioritised, assigned follow-up list. Use when asked for a retention review, a weekly check-in, "who needs attention", "who's about to churn", or when planning the week's outreach.
---

# Weekly at-risk review

The point of this review is not a list. Staff can already get a list. The point is deciding
**who gets contacted this week, by whom, and why** — and leaving the gym with that decision
recorded in Recovr rather than in a chat window they will close.

## Health score bands

- **0–33** — high risk. Likely to cancel. Needs contact now.
- **34–69** — medium risk. Warning signs. Worth watching, and worth contacting if the trend is down.
- **70–100** — low risk. Engaged.

A score is a starting point, not a verdict. Always look at *why* a score is what it is before
recommending action — `recovr_get_client_details` returns the analysis behind the number.

## How to run it

**1. Frame the week.** Start with `recovr_get_retention_summary` for the counts by risk band. Say what
changed if the user has run this before, and lead with the number that matters: how many
high-risk members there are, not a full breakdown of every band.

**2. Pull the at-risk cohort.** `recovr_find_clients` with `risk: "high-risk"`. If that returns more
people than anyone can realistically contact in a week, this is the moment to say so plainly
rather than presenting 60 names as a to-do list.

**3. Separate the genuinely at-risk from the noise.** Three groups routinely appear in a
high-risk list and should not be treated the same way:

- **Already handled** — snoozed, or assigned to a staff member who is on it. The `snoozed`
  and `assigned` flags are on every `recovr_find_clients` row. Exclude these and say how many you excluded.
- **Never really started** — someone who bought a pass and attended once or twice. This is an
  onboarding problem, not a retention problem, and a "we miss you" message reads as absurd to
  someone who was never there. Check attended counts in `recovr_get_client_details`.
- **Actually lapsing** — an established member whose attendance has fallen off. This is the
  group the review exists for.

**4. Look before you recommend.** For the ten or so most urgent, call `recovr_get_client_details` and
`recovr_get_client_timeline`. You are looking for the reason, because the reason determines the message:
a member who stopped after an injury, one whose package expired, one who never rebooked after
a class time changed, and one who is quietly unhappy all need different outreach.

**5. Check whether they are already talking to you.** `recovr_list_conversations` before recommending
any outreach. Contacting someone who is sitting on an unanswered message from the gym is worse
than not contacting them. Deal with the inbox first.

**6. Produce the plan.** For each person: who they are, the score, **the specific reason**, and
the recommended action. Rank by how recoverable they are, not by how low the score is — a
long-standing member who missed three weeks is a better use of a phone call than someone who
never came back after their intro pass.

**7. Record the decision.** A review that ends in chat has changed nothing. Offer to:
- `recovr_assign_client` each person to the staff member who should own them — call `recovr_list_team_members`
  first so you assign to a real person
- `recovr_flag_client` (or `recovr_flag_clients_bulk`) the ones needing follow-up so they surface in the app
- `recovr_snooze_client` anyone who should legitimately drop out of the review — someone travelling,
  injured, or on a seasonal break. Snoozing is reversible and stops the same name resurfacing
  every week and being ignored.

## Rules

- **Never send anything during a review.** Reviews decide who to contact; sending is a separate,
  explicitly confirmed act. Use `recovr_draft_client_message` if the user wants wording drafted — it
  posts a draft for staff approval inside Recovr and contacts nobody.
- **Confirm every write.** Show the exact list and the exact count before calling any bulk tool,
  and wait for a clear yes.
- All data is automatically scoped to the authenticated staff member's gym. Never ask the user
  for a location.
- Australian context by default: local timezone, "member" unless the gym uses another word.
- Be concise. A gym owner is reading this between classes.
