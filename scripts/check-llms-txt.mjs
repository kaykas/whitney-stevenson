#!/usr/bin/env node
/**
 * Guardrail for the AEO audit item "[GEO:llms-txt-format] llms.txt has
 * malformed links or unseparated notes".
 *
 * public/llms.txt must follow the llms.txt format (https://llmstxt.org):
 *   1. Line 1 is the only H1.
 *   2. A `> ` blockquote summary follows it.
 *   3. Free prose (notes) is allowed only BEFORE the first H2. A prose
 *      paragraph sitting under an H2 is an "unseparated note": parsers read
 *      every H2 section as a link list and either drop the prose or misread it.
 *   4. Inside an H2 section, every non-blank line is a list item of the form
 *      `- [name](https://...)` optionally followed by `: notes`. Other
 *      separators (" — ", " - ") are malformed: the parser cannot split the
 *      link from its description.
 *   5. Every link is absolute https on the canonical www host.
 *
 * Runs as `postbuild`. Standalone: `npm run check:llms`.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const FILE = join(process.cwd(), "public", "llms.txt");
const CANONICAL = "https://www.whitneystevenson.com";
const LINK_ITEM = /^- \[([^\]]+)\]\(([^)\s]+)\)(?::\s+\S.*)?$/;

const lines = readFileSync(FILE, "utf8").split("\n");
const failures = [];
const fail = (n, msg) => failures.push(`line ${n + 1}: ${msg}`);

if (!/^# \S/.test(lines[0] ?? "")) fail(0, "first line must be the H1 title");
const firstContent = lines.slice(1).findIndex((l) => l.trim() !== "") + 1;
if (!lines[firstContent]?.startsWith("> ")) {
  fail(firstContent, "the H1 must be followed by a `> ` blockquote summary");
}

let inSection = false;
let linkCount = 0;
lines.forEach((line, i) => {
  if (i > 0 && /^# /.test(line)) fail(i, "only one H1 is allowed");
  if (/^### /.test(line)) fail(i, "use H2 sections only; H3+ breaks the section/list structure");
  if (/^## /.test(line)) {
    inSection = true;
    return;
  }
  if (!inSection || line.trim() === "") return;

  const m = line.match(LINK_ITEM);
  if (!m) {
    fail(
      i,
      line.startsWith("- [")
        ? `malformed link item (use "- [name](url): notes"): ${line.slice(0, 80)}`
        : `unseparated note under an H2 section (move prose above the first H2): ${line.slice(0, 80)}`,
    );
    return;
  }
  linkCount++;
  if (!m[2].startsWith(`${CANONICAL}/`) && m[2] !== CANONICAL) {
    fail(i, `link must be absolute on ${CANONICAL}: ${m[2]}`);
  }
});

if (!inSection) failures.push("no H2 link sections found");

if (failures.length) {
  console.error("\ncheck-llms-txt FAILED: public/llms.txt is not valid llms.txt format\n");
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("");
  process.exit(1);
}

console.log(`check-llms-txt: ${linkCount} links, format valid`);
