# When a number looks wrong, or they want a different cut

Recovr is the gym's working surface and its source of truth for retention. Its counts follow one published definition and the gym's own settings, so staff never need to check them against another system. If they have to, Recovr has something to fix.

## What the settings change

Both settings live in Settings → Packages: https://retention.recovr.com/settings/packages

| Setting on a package | What it changes |
| --- | --- |
| Type (Membership, Intro, Class pack, other) | Which line its holders count in (`members_breakdown.by_package_type`, `package_type` filters). Only Membership packages count toward churn, and only Intro packages count as trials. |
| No type yet | Its holders are active members but in no type line, list filter or churn. Classifying it fixes all of those. |
| Show in reports off | Its holders leave the risk bands and risk lists (dashboard, Clients page, Ask Recovr) and churn. They stay in the active member total. |

The active member total counts everyone Active with a current package of any type. No setting takes a package out of it, so never promise one does.

## They want a different cut

Examples: memberships only, without staff or $0 packages, or including suspended members.

1. Answer that cut now.
   - Memberships only: `by_package_type.membership`.
   - Including suspended: say "212 active members, plus 9 suspended", with each number labelled.
   - Other cuts: build them with `recovr_find_clients` the way member-list-builder does. Each row carries `shown_in_reports`.
2. In one sentence, name the setting that would make this cut the default everywhere Recovr uses it, and link it. For example: "Your Staff package is classified as a Membership and shown in reports. Change its type and turn off Show in reports in Settings → Packages, and it drops out of your Membership line, churn and risk lists."
3. If no setting gives that cut, say how Recovr defines the number in one sentence. Suspended members, for example, are on hold, so they're never counted as active. If the definition doesn't suit them, offer to pass that on to Recovr support as feedback. Never suggest adjusting the number by hand each time.

## A number or a named member looks wrong

For example: "she has a 6-month membership", "he's done 134 classes", or "we have more members than that".

1. Look the member up. Use `recovr_find_clients` `search`, and if several people match, ask which one. Then read them with `recovr_get_client`.
2. Say plainly what Recovr holds: the current package, its type and dates, and the visits Recovr has.
3. If a setting explains it, name the setting and link it. Common cases are a package with no type, a package hidden from reports, or a package with a different type than expected. For example: "Her 6-Month Unlimited package has no type yet, so she isn't in the Membership line. Classify it in Settings → Packages and she, and everyone else on it, will count."
4. Otherwise say Recovr has it wrong or is missing data, for example earlier visit history. Offer to write it up for Recovr support at https://support.recovr.com, giving the member, what Recovr shows and what they expected.

Never ask for the booking system's figure, never suggest checking or fixing the booking system, and never defend Recovr's number.
