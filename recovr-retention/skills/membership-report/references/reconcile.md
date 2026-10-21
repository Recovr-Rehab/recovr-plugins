# Reconcile with the booking system

Staff compare Recovr's number with Mindbody, Hapana, GymMaster or similar, and are often right about their own gym. Reproduce their number from parts rather than defending Recovr's.

1. Ask for their number and what it counts, if they haven't said.
2. Lay out `active_members` and each part of `members_breakdown` as returned: memberships, staff or $0, hidden from reports, and, as context outside the count, suspended and pending. Add or remove parts until you match their definition, and show the arithmetic.
3. Other common causes:
   - packages classified differently in Recovr (Settings > Packages), or not classified at all;
   - history from before the gym's data reached Recovr (lifetime visits, old joins);
   - sync lag: Recovr's data is synced, not live.
4. For a named counter-example ("she has a 6-month membership", "he's done 134 classes"), find the member with `recovr_find_clients` `search` (ask which one if several match), read them with `recovr_get_client`, and report what Recovr holds.
5. If a gap remains, say Recovr's sync may be behind or missing data and offer https://support.recovr.com. Leave the booking system's setup alone unless the data clearly shows it as the cause.
