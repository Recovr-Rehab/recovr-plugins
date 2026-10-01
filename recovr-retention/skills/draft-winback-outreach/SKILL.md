---
description: Draft win-back or re-engagement messages to lapsing gym members in the gym's own voice. Use when asked to write, draft, or send outreach to a member, reach out to someone who has stopped coming, or compose a re-engagement SMS or email.
---

# Draft win-back outreach

A win-back message succeeds when it sounds like it came from someone who knows the person.
That is the whole job. Everything below is in service of it.

## Never send without explicit approval

This is not a style preference — an SMS reaches a real person's phone and cannot be recalled.

- `recovr_draft_client_message` drafts a message and posts it for staff approval inside Recovr. It
  contacts nobody. **This is the default.**
- `recovr_send_client_message` and `recovr_reply_to_conversation` deliver to the member immediately. Call these
  only after the user has seen the exact recipient and the exact text and said yes to both.
- If a send times out, **ask** before retrying. A retry is a second message to their phone.

## Read before writing

Never draft from a name and a score. Call `recovr_get_client_details` and `recovr_get_client_timeline` first, and
find the specific thing that makes this message theirs:

- **When did they last attend, and what did they do?** "We've missed you in Tuesday spin" beats
  "we've missed you at the gym."
- **How long were they a member?** Six years and six weeks warrant completely different tones.
- **What happened around the time they stopped?** An expired package, a changed class time, an
  injury mentioned in a contact log, a season change. The timeline usually shows it.
- **What has the gym already said to them?** Check `recovr_list_conversations` and
  `recovr_get_conversation_messages`. If they have an unanswered message from the gym, answer it — do not
  send fresh outreach on top of it. If they were contacted last week, do not contact them again.
- **Did they reply and get ignored?** Then the message is an apology, not a win-back.

## Writing it

- **Short.** Two or three sentences for SMS. A gym member reads it standing up.
- **One specific detail** that proves this is not a mail-merge — the class they liked, the
  instructor, how long they have been coming.
- **One clear next step**, and make it small. "Want me to book you into Thursday's 6am?" gets a
  reply. "We'd love to see you back soon" does not.
- **No guilt, no urgency theatre, no fake deadline.** These convert once and cost trust.
- **Discount last, if at all.** Lead with a discount and you teach members to lapse. Most people
  who stopped coming stopped for a reason money does not fix.
- **The gym's voice, not a template's.** If Recovr holds tone settings or sign-off preferences
  for this gym, follow them. If prior outbound messages are visible in the conversation history,
  match their register — some studios are warm and chatty, some are brisk.
- **Australian English** by default, and the gym's own word for members.

## Match the message to the reason

| What the data shows | What the message should do |
|---|---|
| Package expired, was attending steadily | Make renewing frictionless. This is admin, not persuasion. |
| Attendance faded gradually | Ask an open question. You do not know the reason yet, and guessing wrong is worse than asking. |
| Stopped abruptly after regular attendance | Something happened. Be warm, be brief, do not sell. |
| Injury or illness in the contact log | Ask after them. Do not pitch a class. Suggest a return path only if they raise it. |
| Never really started — one or two visits | Not a win-back. This is onboarding: help them book a first proper session. |
| Unanswered inbound message | Apologise for the delay, answer their actual question, then stop. |

## Bulk sends

Direct bulk messaging is deliberately not available through this connector. Where several
members need the same message, draft one per person with `recovr_draft_client_message` so a human
approves each, or ask the user to run the bulk send inside the Recovr app where the
per-recipient list is visible on screen.

If someone asks for "the same message to everyone in this group", push back once: a message
generic enough to send to forty people is generic enough that none of them will answer it.

## After it goes out

Offer to `recovr_log_client_interaction` if the user contacted the member another way — a call, or in person —
so the contact history stays complete. Calling it twice writes two records, so only do it once
per real interaction.
