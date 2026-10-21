# Churn from MembershipChurn

Churn is membership exits in a studio month divided by the Active membership base at the start of that month. It comes only from the `MembershipChurn` cube, filtered by `MembershipChurn.month`.

Query `churn_rate` with `starting_members`, `churned_members`, `pending_churn_members`, `review_required_members` and `provisional`. Report all of them, one month per row.

## What the states mean, in staff words

| Field or state | Say |
| --- | --- |
| `provisional` | "Members who left still have 30 days to come back, so this month can still change." |
| `review_required_members` | "Exits Recovr couldn't confirm from your synced data." Show it beside the rate: "2.6% (7 members unverified)". |
| No rate (NULL) | "Not established yet." Never 0%. It stays unset until the 30-day window has closed and unverified exits are at most 5% of the starting members. |
| `pending_churn_members` | "Exits still inside their 30-day return window." |

## Examples

- Closed month with a rate: "August churn was 2.6%: 7 of 270 memberships ended (3 unverified)."
- Open month: "September is provisional: 5 exits so far from 268 at the start of the month. The rate firms up 30 days after month end."
- Too many unverified: "October's rate isn't established: 41 of 266 exits couldn't be verified from synced data, which is above the 5% Recovr needs. That points to a sync gap; support can check it."

## Never

- Substitute cancellations divided by today's members, or any other formula, when the cube returns no rate or can't be read. Say the rate can't be verified yet.
- Quote an industry churn benchmark as fact.
- Restrict exits to the members present at the start of the month, or cap the rate at 100%.

If a query times out, retry one month at a time before reporting it as unavailable.
