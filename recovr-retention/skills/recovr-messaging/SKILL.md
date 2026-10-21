---
name: recovr-messaging
description: Handles member conversations and messages through Recovr. Use when staff ask "which messages need a reply?", "what did she say?", "draft a check-in", "write shout-outs for these five", "text the members who didn't come back", or "reply to him", and when sending an approved SMS or email. Not for changing flags, snoozes, assignment or contact preferences (recovr-follow-up).
---

# Messaging

<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->
## Ground rules

- Start with `recovr_get_retention_summary` for the studio name, `studio_today` and timezone. "Today", "tomorrow" and "last month" mean the studio's calendar days.
- Act only on ids a tool returned in this conversation. When a name matches several people, ask which one.
- A failed read is not zero or an empty list. Quote the error, say what couldn't be read, and never guess a cause. When data looks wrong, say what Recovr holds, check whether a Recovr setting explains it, and otherwise treat it as a Recovr data problem and offer to report it to Recovr support. Never send the gym to fix or check their booking system.
- Change records only when the user asks, and call a change done only after the tool reports success.
- Outside this connection: booking classes, payments and refunds, bulk sending, and building Builder workflows, boards, forms or saved reports. Point to the Recovr app at https://retention.recovr.com. For "how do I…" questions about Recovr, use `recovr_search_help` and share only the links it returns; without that tool, point to https://support.recovr.com.
<!-- ground-rules:end -->

## Inbox

- "Who needs a reply?": `recovr_list_conversations` with `filter: "reply_owed"`: the member wrote last and asked something. Unread and awaiting-reply are different lists. When `has_more` is true, say the page is partial.
- Read a thread with `recovr_get_conversation_messages` before drafting anything for that member. If they are waiting on an answer, the answer comes before any new outreach.
- "Who did we message?" means messages staff actually sent, not notes, snoozes or automated booking emails.

## Draft

Before writing any member-facing words, read [references/writing-messages.md](references/writing-messages.md).

1. For each member, read `recovr_get_client` `view: "details"` and `view: "timeline"` for one specific, true detail.
2. Call `recovr_draft_client_message` for one member at a time with your text in `message`. Leave out members who are snoozed or marked do-not-contact, and name them.
3. Show each returned `proposed_message` with recipient and channel. A draft sends nothing and is not saved in Recovr.
4. If the result has `draft_failed: true`, there is no draft: say so and show no text from that result.

When the user dictates the words, use their sentence as written.

## Send

Only after the user has approved the exact recipient, channel and text (any edit needs a new approval):

- New message: `recovr_send_client_message` (SMS or email).
- Reply on a thread: `recovr_reply_to_conversation` with its `conversation_id`. Replies work on SMS threads only. For an email, Instagram, Messenger or WhatsApp thread, tell the user to reply from the Recovr inbox, or offer a new SMS or email if they approve it.
- A member marked do-not-contact is refused. Report it; don't try another channel.
- Report what the result confirms. Accepted is not delivered or read.
- After a timeout or unclear result, read the thread with `recovr_get_conversation_messages` and tell the user what you see before any retry. A blind retry can text the member twice.
- There is no bulk send. For a group, offer one reviewed draft per member, or the Recovr app's bulk tools.

A sent message is recorded automatically. To stop contact or log an offline call, use `recovr-follow-up`.
