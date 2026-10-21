---
name: recovr-follow-up
description: Records follow-up decisions on gym members in Recovr. Use when staff ask to flag, snooze, assign a member or a list to a coach ("assign these to Coach B"), stop or resume texts or emails to a member, or log a call, note or in-person chat. Not for sending messages (recovr-messaging) or for questions that only read data.
---

# Follow-up actions

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say what Recovr holds, check whether a Recovr setting explains it, and otherwise treat it as a Recovr data problem and offer to report it to Recovr support. Never send the gym to fix or check their booking system.
- Change records only when the user asks, and call a change done only after the tool reports success.
- Outside this connection: booking classes, payments and refunds, bulk sending, and building Builder workflows, boards, forms or saved reports. Point to the Recovr app at https://retention.recovr.com. For "how do I…" questions about Recovr, use `recovr_search_help` and share only the links it returns; without that tool, point to https://support.recovr.com.
<!-- ground-rules:end -->

## Choose the action

| Staff ask | Tool |
| --- | --- |
| "Flag her for follow-up" / "unflag" | `recovr_update_clients` `action: "flag"` / `"unflag"` |
| "Snooze him for two weeks, he's travelling" | `recovr_update_clients` `action: "snooze"` with `days` and a `reason`; `"unsnooze"` |
| "Assign these to Coach B" | `recovr_list_team_members` for the coach's id, then `recovr_update_clients` `action: "assign"`; `"unassign"` |
| "Stop texting her" / "she's happy to hear from us again" | `recovr_set_client_do_not_contact`, one member per call, with the channels named |
| "Log that I called him" / "add a note" | `recovr_log_client_interaction`, one member per call |

What each one means for the gym:

- **Snooze** pauses Next Up cards for that member. They stay on risk lists and counts, marked "Snoozed". It is not an opt-out and not a message.
- **Assign** sends that coach a Recovr notification. Say so before assigning.
- **Stop contact** stops Recovr's automated and assistant sends on those channels; staff can still message by hand from the inbox. At GoHighLevel locations, GoHighLevel can overwrite it; pass on the tool's note. Resume only when the user says so, never because a snooze ended.
- **Log** records something that happened. A note is not a call, and each call to the tool adds another record.

## Steps

1. Pin the exact action and the exact members, using ids from a read in this conversation. A question about a member is not a request to change them.
2. Confirm before writing: show who and what and get a clear yes. For several contact or log changes, one yes covers the list, then one call per member.
3. `recovr_update_clients` with more than five members returns a preview and a `confirm_token` and changes nothing. Show the preview, including anyone skipped and why. After a yes, call again with the same arguments plus the token. If the list changes, start over without it. Batches above 50 each get their own preview.
4. Check every result. Report failures and "already in that state" rows; partial success is partial.
5. Read back with `recovr_find_clients` (rows show flagged, snoozed and assigned) or `recovr_get_client` `view: "details"`.

After a timeout, read the member's timeline before retrying a log or a snooze, so nothing is written twice.
