#!/usr/bin/env node
// Copies shared/ground-rules.md into every SKILL.md between the ground-rules markers,
// and checks that skills name only published Recovr tools.
// Usage: node scripts/sync-ground-rules.mjs          (write)
//        node scripts/sync-ground-rules.mjs --check  (fail if any skill is out of date)
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(root, "recovr-retention", "skills");
const START = "<!-- ground-rules:start (edit shared/ground-rules.md, then run scripts/sync-ground-rules.mjs) -->";
const END = "<!-- ground-rules:end -->";
const block = `${START}\n${readFileSync(join(root, "shared", "ground-rules.md"), "utf8").trim()}\n${END}`;

// The published Recovr MCP tools a skill may name. Keep in step with the server.
const TOOLS = new Set([
  "recovr_get_retention_summary", "recovr_find_clients", "recovr_get_client", "recovr_get_attendance",
  "recovr_list_conversations", "recovr_get_conversation_messages", "recovr_list_team_members",
  "recovr_describe_analytics_model", "recovr_query_analytics", "recovr_update_clients",
  "recovr_set_client_do_not_contact", "recovr_log_client_interaction", "recovr_draft_client_message",
  "recovr_send_client_message", "recovr_reply_to_conversation",
  // Newer tools; skills must work without them until each host approves them.
  "recovr_get_next_up", "recovr_search_help", "recovr_get_package_sales",
]);

const check = process.argv.includes("--check");
let problems = 0;
for (const name of readdirSync(skillsDir)) {
  const dir = join(skillsDir, name);
  const file = join(dir, "SKILL.md");
  if (!existsSync(file)) continue;
  const text = readFileSync(file, "utf8");
  const s = text.indexOf("<!-- ground-rules:start");
  const e = text.indexOf(END);
  if (s < 0 || e < 0) { console.error(`${name}: ground-rules markers missing`); problems++; continue; }
  const next = text.slice(0, s) + block + text.slice(e + END.length);
  if (next !== text) {
    if (check) { console.error(`${name}: ground rules out of date`); problems++; }
    else { writeFileSync(file, next); console.log(`${name}: ground rules updated`); }
  }
  const md = [file, ...(existsSync(join(dir, "references")) ? readdirSync(join(dir, "references")).map((f) => join(dir, "references", f)) : [])];
  for (const f of md) {
    for (const m of readFileSync(f, "utf8").matchAll(/\brecovr_[a-z_]+\b/g)) {
      if (!TOOLS.has(m[0])) { console.error(`${f.slice(root.length + 1)}: unknown tool ${m[0]}`); problems++; }
    }
  }
}
if (problems) process.exit(1);
console.log("skills ok");
