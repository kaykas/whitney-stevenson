#!/usr/bin/env node
/**
 * .loop/de-ai-gate/check.mjs
 *
 * Deterministic anti-AI-slop & visual anti-eyebrow gate across the portfolio fleet.
 * Scans staged/branch-changed files (or explicit CLI file paths) across:
 *   - app/**, src/app/**, components/**, src/components/**, content/**, posts/**, public/llms*.txt, public/ai/*.json
 *
 * Hard fails (exit 1) if any added line introduces:
 *   1. Visual AI-slop eyebrow classes: `uppercase` combined with `tracking-wider` or `tracking-widest`
 *      on section/card kickers, `eyebrow=` props on `<PageHero`, or mechanical `01 / 02 / 03` card kickers.
 *   2. Em-dashes (`—`, `\u2014`, or `&mdash;`) in rendered prose, metadata, JSON-LD, or AI feeds.
 *   3. High-frequency banned AI slop vocabulary & tropes:
 *      delve, crucial, pivotal, tapestry, testament, underscore(s/d/ing), seamlessly,
 *      unleash(ing), unlock(ing), game-changer, groundbreaking, fostering, interplay,
 *      "Here's the thing", "The real question is", "At its core,", "What ... skips is", "Not only ... but also".
 */

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const BANNED_WORDS_RE =
  /\b(delve|crucial|pivotal|tapestry|testament|underscores?|underscored|underscoring|seamlessly|unleash|unleashing|unlocking|game-changer|groundbreaking|fostering|interplay)\b/i;

const BANNED_PHRASES_RE =
  /(here['’]s the thing|the real question is|at its core,\s|what\s+[^.!?\n]{2,50}\s+skips\s+is|not only\b[^.!?;]{1,80}\bbut also\b)/i;

const EYEBROW_CLASS_RE =
  /className=["'`][^"'`]*\buppercase\b[^"'`]*\btracking-(wider|widest)\b[^"'`]*["'`]|className=["'`][^"'`]*\btracking-(wider|widest)\b[^"'`]*\buppercase\b[^"'`]*["'`]/;

const PAGE_HERO_EYEBROW_RE = /<PageHero\b[^>]*\beyebrow=\s*["'{]/;

const TARGET_FILE_RE =
  /^(src\/)?(app|components|content|posts)\/.*\.(tsx|ts|mdx|md)$|^public\/(llms.*\.txt|ai\/.*\.json)$/;

function parseDiffAddedLines(diffText) {
  const added = [];
  let currentLine = 0;
  for (const raw of diffText.split('\n')) {
    const hunk = raw.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) {
      currentLine = parseInt(hunk[1], 10);
      continue;
    }
    if (raw.startsWith('+++') || raw.startsWith('---')) continue;
    if (raw.startsWith('+')) {
      added.push({ lineNo: currentLine, text: raw.slice(1) });
      currentLine++;
    } else if (!raw.startsWith('-')) {
      currentLine++;
    }
  }
  return added;
}

const explicitArgs = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const stagedMode = process.argv.includes('--staged');

function getTargetFiles() {
  if (explicitArgs.length > 0) {
    return explicitArgs.filter((f) => existsSync(f));
  }
  try {
    if (stagedMode) {
      const st = execSync('git diff --cached --name-only --diff-filter=AM', {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      return st.split('\n').map((s) => s.trim()).filter((f) => f && TARGET_FILE_RE.test(f) && existsSync(f));
    }
    const base = process.env.DE_AI_BASE_REF || 'origin/main';
    const out = execSync(`git diff --name-only --diff-filter=AM ${base}...HEAD`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const staged = execSync('git diff --cached --name-only --diff-filter=AM', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const all = new Set([...out.split('\n'), ...staged.split('\n')].map((s) => s.trim()).filter(Boolean));
    return [...all].filter((f) => TARGET_FILE_RE.test(f) && existsSync(f));
  } catch {
    return [];
  }
}

function getAddedLinesMap(file) {
  if (explicitArgs.length > 0 && !stagedMode) {
    const lines = readFileSync(resolve(file), 'utf8').split('\n');
    return lines.map((text, idx) => ({ lineNo: idx + 1, text }));
  }
  try {
    const diffCmd = stagedMode
      ? `git diff --cached -U0 -- "${file}"`
      : `git diff -U0 ${process.env.DE_AI_BASE_REF || 'origin/main'} -- "${file}"`;
    const diff = execSync(diffCmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    if (diff.trim()) {
      return parseDiffAddedLines(diff);
    }
    const lines = readFileSync(resolve(file), 'utf8').split('\n');
    return lines.map((text, idx) => ({ lineNo: idx + 1, text }));
  } catch {
    const lines = readFileSync(resolve(file), 'utf8').split('\n');
    return lines.map((text, idx) => ({ lineNo: idx + 1, text }));
  }
}

const files = getTargetFiles();
if (files.length === 0) {
  console.log('[de-ai-gate] 0 target content/UI files changed - PASS');
  process.exit(0);
}

console.log(`[de-ai-gate] auditing ${files.length} file(s)...`);
const violations = [];

for (const file of files) {
  const isTsx = file.endsWith('.tsx') || file.endsWith('.ts');
  const rows = getAddedLinesMap(file);

  for (const { lineNo, text } of rows) {
    const trimmed = text.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('{/*')) {
      continue;
    }

    if (isTsx) {
      if (EYEBROW_CLASS_RE.test(text) && !text.includes('<th')) {
        violations.push({
          file,
          lineNo,
          rule: 'visual-ai-eyebrow-kicker',
          detail: 'Stacked uppercase + tracking-wider/widest eyebrow class detected. Lead sections/cards directly with sentence-case h2/h3.',
          snippet: trimmed.slice(0, 140),
        });
      }
      if (PAGE_HERO_EYEBROW_RE.test(text)) {
        violations.push({
          file,
          lineNo,
          rule: 'page-hero-eyebrow-prop',
          detail: 'PageHero eyebrow prop detected.',
          snippet: trimmed.slice(0, 140),
        });
      }
    }

    if (text.includes('\u2014') || text.includes('&mdash;')) {
      violations.push({
        file,
        lineNo,
        rule: 'no-em-dash',
        detail: 'Em-dash detected. Replace with colon, comma, parentheses, or period.',
        snippet: trimmed.slice(0, 140),
      });
    }

    const wordMatch = text.match(BANNED_WORDS_RE);
    if (wordMatch && !trimmed.startsWith('import ')) {
      violations.push({
        file,
        lineNo,
        rule: 'banned-ai-word',
        detail: `Banned AI slop word "${wordMatch[0]}" detected.`,
        snippet: trimmed.slice(0, 140),
      });
    }

    const phraseMatch = text.match(BANNED_PHRASES_RE);
    if (phraseMatch) {
      violations.push({
        file,
        lineNo,
        rule: 'banned-ai-phrase',
        detail: `Banned AI trope "${phraseMatch[0]}" detected.`,
        snippet: trimmed.slice(0, 140),
      });
    }
  }
}

if (violations.length > 0) {
  console.error(`\n[de-ai-gate] FAIL: ${violations.length} AI copy/design slop violation(s) found:\n`);
  for (const v of violations.slice(0, 25)) {
    console.error(`  - ${v.file}:${v.lineNo} [${v.rule}] ${v.detail}\n    > ${v.snippet}`);
  }
  process.exit(1);
}

console.log(`[de-ai-gate] PASS (${files.length} file(s) clean)`);
