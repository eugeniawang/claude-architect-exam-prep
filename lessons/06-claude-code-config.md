### Session 6 — Claude Code Config: CLAUDE.md, Commands, Skills, Rules

**Domain 3.1, 3.2, 3.3 · Principle P3 · Nemesis: The Oversharer**

---

#### Overview
Your teammate cloned the repo and ran a review command. It didn't exist on their machine — it was in your `~/.claude/commands/`. The review never happened. The bug shipped. Where you put a rule, command, or skill determines who gets it and when. This session maps the full hierarchy.

---

#### Skill Built
Choose the correct config layer for any Claude Code configuration item — CLAUDE.md, slash command, skill, or path-specific rule — and know which scope makes it available to the right people at the right time.

---

#### Prerequisites / Foundations
- Claude Code reads config files at startup and loads CLAUDE.md files into context.
- Slash commands are invoked explicitly by the user.
- Basic familiarity with YAML frontmatter in Markdown.

---

#### Do This First
In a Claude Code session, run `/memory`. Note which files are loaded and whether they come from project-level or user-level paths — or both. This is your X-ray for "what does Claude actually know right now." Use it whenever you're debugging why Claude is or isn't following a rule.

---

#### What Just Happened
Claude Code loads CLAUDE.md files in a hierarchy — more specific wins over less specific. A subdirectory CLAUDE.md overrides the project root CLAUDE.md for files in that subtree. User-level (`~/.claude/CLAUDE.md`) holds personal preferences; project-level (`.claude/CLAUDE.md` or root `CLAUDE.md`) holds shared team standards.

Always check `/memory` before assuming a rule is wrong — verify the file is loaded first.

---

#### Guided Practice
**Exercise 6a — Hierarchy mapping.** Decide the correct config layer for each:

1. "Always use Conventional Commits format." (Team standard.) → **Project CLAUDE.md** — shared via VCS.
2. "I prefer responses in British English." (Personal.) → **User `~/.claude/CLAUDE.md`** — not the team's concern.
3. "When reviewing Terraform files, check for missing `description` fields." → **`.claude/rules/` with `paths: ["terraform/**/*"]`** — Terraform-specific, no directory CLAUDE.md needed.
4. A `/review` command that runs a standard PR checklist. → **`.claude/commands/review.md`** — shared, auto-available on clone.
5. An analysis workflow that must not pollute the main conversation. → **`.claude/skills/<name>/SKILL.md` with `context: fork`** — on-demand, isolated.

**Exercise 6b — Write a path-specific rule.** Create `.claude/rules/test-conventions.md` with frontmatter `paths: ["**/*.test.tsx", "**/*.spec.ts"]` and a few test conventions. This file loads only when Claude is editing a matching file — not for plain `.ts` files. That's the point.

---

#### Explain It Back
When would you use a skill instead of a slash command?

- A **slash command** is a reusable prompt or checklist that runs in the current conversation.
- A **skill** (`.claude/skills/<name>/SKILL.md`) is for on-demand workflows that benefit from being isolated. `context: fork` runs it in a sub-agent context — verbose intermediate output doesn't bloat your main conversation. Skills can restrict which tools are available via `allowed-tools` and accept input via `argument-hint`.
- Decision rule: simple reusable prompt → command. Multi-step workflow with potential output bloat, tool restrictions, or isolation needs → skill. P3 applies: match the mechanism to the problem.

---

#### Pattern / Anti-pattern
**Good pattern — Layered, purposeful config:**

- `~/.claude/CLAUDE.md` — personal preferences only
- `project/CLAUDE.md` — team standards (commit format, PR checklist, test framework)
- `project/.claude/commands/review.md` — shared slash command: `/review`
- `project/.claude/skills/architecture-review/SKILL.md` — on-demand, `context: fork`
- `project/.claude/rules/terraform-conventions.md` — `paths: ["terraform/**/*"]`
- `project/.claude/rules/test-conventions.md` — `paths: ["**/*.test.tsx", "**/*.spec.ts"]`

Each layer has one clear job. Nothing leaks across scope.

**Nemesis: The Oversharer**

Puts personal preferences in the project CLAUDE.md — now every developer works under your tab-width opinions. Or puts team-critical commands in `~/.claude/commands/` (personal scope) and wonders why new team members can't find them. Also loves monolithic CLAUDE.md files: one 800-line file "just in case," all of it loading all the time. Rules for Terraform load when editing React. Tokens spent on irrelevant rules are tokens not available for the actual task. Violates **P3** (wrong mechanism) and **P2** (context is finite and degrades).

**The `@import` escape hatch:** when a project CLAUDE.md starts growing unwieldy, use `@import` to pull in modular files (up to 5 levels deep). Keeps the root file readable while preserving specificity.

**EXAM:** `.claude/rules/` uses `paths:` frontmatter for glob-based file targeting. **NOW:** `paths:` has known bugs in current versions; `globs:` works as an alternative key. User-level rules are currently ignored — only project-level rules fire. Test your rules file after writing it.

---

#### Scenario Check
**Scenario A** (mirrors official Q4):

> A team wants a `/review` slash command that runs a standard PR checklist. It must be available to every developer automatically when they clone the repo. Where does the command file go?
>
> **A.** `project/.claude/commands/review.md`
> **B.** `~/.claude/commands/review.md`
> **C.** Added as a section in the project root `CLAUDE.md`
> **D.** Declared in a `.claude/config.json` `commands` array

**Correct answer: A.** `.claude/commands/` is the project-scoped command directory. It's committed to VCS and auto-discovered on clone. B fails for everyone else — user-level commands don't travel with the repo. C has no invocation mechanism — CLAUDE.md is always-loaded context, not a command registry. D doesn't exist in Claude Code.

---

**Scenario B** (mirrors official Q6):

> Test files are scattered across many subdirectories. The team wants consistent conventions applied whenever Claude edits any test file, regardless of directory. What is the best approach?
>
> **A.** A `.claude/rules/` file with glob patterns matching all test files
> **B.** A comprehensive root-level `CLAUDE.md` that includes all conventions for all file types
> **C.** A separate skill for each type of file being edited
> **D.** A `CLAUDE.md` in each directory that contains test files

**Correct answer: A.** Path-specific rules load exactly when the edited file matches the glob — regardless of directory structure. B loads all conventions all the time, wasting context and diluting attention (P2). C requires manual invocation; a test-conventions skill nobody runs is worse than a rule that fires automatically. D means duplicating the same file in every test directory and keeping them in sync — the exact problem glob-based rules exist to solve.

**Pass bar: 72%**

---

#### Apply / Transfer
In `MY_SYSTEM.md`, add a **Config Layer Map** table: config item · layer · file location · reason. Fill at least three rows. Identify anything currently in the wrong layer.

---

#### Review Hooks
- Run `/memory`. Does everything loaded belong there?
- Is anything in your project CLAUDE.md a personal preference? Move it.
- Is any slash command sitting in `~/.claude/commands/` that the whole team needs? Move it.
- Do you have file-type-specific conventions in root CLAUDE.md that belong in `.claude/rules/` with `paths:` globs?
- Do you have skills that should be commands, or commands complex enough to warrant `context: fork`?

---

---

