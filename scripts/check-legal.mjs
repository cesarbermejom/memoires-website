// Fails if a legal page still carries an unresolved placeholder.
// The legal drafts use <mark class="todo">[…]</mark> for facts only the
// operator can supply. Publishing one of those would be worse than
// publishing nothing, so the build refuses.

import { readFileSync } from "node:fs";

const pages = ["privacy/index.html", "terms/index.html"];
const pattern = /<mark class="todo">([\s\S]*?)<\/mark>/g;

let total = 0;

for (const page of pages) {
  const html = readFileSync(new URL(`../${page}`, import.meta.url), "utf8");
  const found = [...html.matchAll(pattern)].map((m) =>
    m[1].replace(/\s+/g, " ").trim(),
  );
  if (found.length === 0) continue;

  total += found.length;
  console.error(`\n${page} — ${found.length} unresolved:`);
  for (const item of found) console.error(`  • ${item}`);
}

if (total > 0) {
  console.error(
    `\n${total} placeholder${total === 1 ? "" : "s"} left in the legal pages.` +
      `\nReplace the real values and delete the <mark class="todo"> wrappers,` +
      `\nthen bump "Last updated" on any page you changed.\n`,
  );
  process.exit(1);
}

console.log("Legal pages: no unresolved placeholders.");
