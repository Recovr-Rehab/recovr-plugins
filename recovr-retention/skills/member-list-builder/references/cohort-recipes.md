# Cohort recipes

How common staff requests map to Recovr. `recovr_find_clients` handles current-state lists; `recovr_query_analytics` handles anything about dates of joining, buying, birthdays or visit counts (call `recovr_describe_analytics_model` first and start from its `query_guide` recipe).

| Staff ask | How |
| --- | --- |
| "Active but not in for two weeks" | `recovr_find_clients`: Active, current package, no attendance since `studio_today` minus 14 days. Members only, unless they say otherwise. |
| "Memberships only, no trials or packs" | `package_type: ["membership"]` with Active status. Types come from the gym's own Settings → Packages (https://retention.recovr.com/settings/packages). A package with no type yet matches no type, so say how many members that leaves out (`members_breakdown.by_package_type.unclassified`) and that classifying it there adds them. |
| "Everyone on the 21-day jumpstart" | `package_names` with the package's name as Recovr lists it. Plain lists include members on packages hidden from reports; rows with `shown_in_reports: false` are those members, so mark them. |
| "My coach's clients" | The assignment filters on `recovr_find_clients` (staff ids from `recovr_list_team_members`). If the schema can't narrow to one coach, say so rather than guessing. The coach who ran a session is a different thing, and some platforms don't send it. |
| "Who did [staff] sell to" | `recovr_get_package_sales` for the period, or the `sold_by` filter. Without that tool, the sold-by recipe in `query_guide`. |
| "Who bought a 3, 5 or 10-pack in the last 30 days" | Package sales for the period, or the package-purchase recipe in `query_guide`. |
| "High risk plus medium under 60, minus these labels" | Two `recovr_find_clients` calls (high-risk; medium-risk) with `exclude_labels`, then keep medium rows scoring under 60. Name it as the gym's own band. |
| "Whose birthday is today / this week" | Birthday recipe in `query_guide`. |
| "Who hit 100 classes this week", "who's close to 200" | Milestone recipe in `query_guide`. If the recipe gives lifetime counts but not the date a milestone was crossed, list members at or just past the number and say the week can't be confirmed. Lifetime counts can miss visits from before the gym's history reached Recovr; say so. |
| "Joined last week", "week 8 of their first contract" | Join or first-membership date recipe. Tenure counts from when they started, not from the current billing cycle's purchase date. |
| "Trials ending this week", "trialists with nothing booked" | Trial pipeline recipe, or `risk: "conversion"`. A long-standing member who buys an intro offer is not a new trialist. |
| "Who has a knee note" | Member-notes recipe (it searches both note stores). |
