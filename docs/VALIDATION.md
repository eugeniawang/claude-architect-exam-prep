# VALIDATION — Architect on Call (first-principles rebuild)

Verification run against the **actual generated files** on branch `feat/first-principles-rebuild`,
2026-06-09. Course rebuilt in-place (brownfield, owner-authorized: no read-only copy).

## 1. Structural validation — PASS
- Required files present: `README.md`, `CLAUDE.md`, `LESSONS.md`, `SOURCE.md`, `COMPETENCY_MAP.md`,
  `DISTRACTOR-PATTERNS.md`, `GLOSSARY.md`, `COURSE_PLAN.md`, `index.html`, `VALIDATION.md`,
  `templates/{user.json,progress.json,PROGRESS.md,MY_SYSTEM.md}`.
- **Session count consistent = 13** across `LESSONS.md` (13 `### Session`), `templates/progress.json`
  (13 session objects), `templates/PROGRESS.md` (13 session checkboxes). 5 phase headings.
- Every session contains all 11 lesson parts (Overview, Skill built, Prerequisites, Do This First,
  What Just Happened, Guided Practice, Explain It Back, Pattern/Anti-pattern, Scenario Check,
  Apply/Transfer, Review Hooks) — verified by grep tally (≥13 each).
- JSON parses: `templates/progress.json`, `templates/user.json`, `.claude/settings.json` — all valid.
- Status line script `node -c` clean; runs in both pre-setup and populated states.
- **No unfilled placeholders** (TODO/TBD/PLACEHOLDER/Lorem/{{) in canonical files.
- Domain weights correct everywhere: **27 / 18 / 20 / 20 / 15** (fixes the earlier 25/20 error).
- `index.html` well-formed (closing `</html>`, CSP intact); README quick-start matches the adapter ("Start").

## 2. Self-contained folder audit — PASS
- A learner can start from this folder alone: open in Claude Code → "Start" → onboarding copies
  `templates/` → root working files (`user.json`, `progress.json`, `PROGRESS.md`, `MY_SYSTEM.md`).
- No dependency on the builder repo or any private path. `SOURCE.md` is the in-repo source of truth;
  the official PDF is bundled under `sources/anthropic/`.
- Status line + spinner verbs are **project-local** (`.claude/settings.json`, tracked) — they ship with
  a clone and never touch global settings. (Moved from the untracked `settings.local.json`, which would
  not have shipped.)

## 3. Harness-specific smoke proof (Claude Code) — STRUCTURAL PASS, live proof pending
- Adapter `CLAUDE.md` present and is the single delivery surface.
- Commands defined for: Start/Continue, Help, Define X, Quiz me, Distractor gauntlet, Practice exam,
  Mock exam, Show progress, What's next, Show me the principle map, Stuck, Parking lot, navigation modes.
- First-run setup path and a session-execution path dry-run cleanly by reading the adapter against the
  generated files (templates exist, progress schema matches the status line's reads).
- **Live runtime proof (running the slash flow end-to-end inside Claude Code) is still PENDING** — record
  results when run. This is structural proof only.

## 4. Adversarial coherence review
- **Faithfulness:** every concrete token traces to `SOURCE.md` (official PDF v0.1). `EXAM:`/`NOW:` labels
  carry the verified live-product drift (stop_reason set, tool_choice `none`, `allowed-tools` vs
  `allowed_tools`, `.claude/rules` `paths:` bug, ~27 built-ins, Batch multi-turn nuance). Scenario→domain
  mappings confirmed correct against the PDF (earlier community-site-based flags retracted).
- **Coverage:** `COMPETENCY_MAP.md` maps all official task statements (D1×7, D2×5, D3×6, D4×6, D5×6) to a
  session, principle, scenario, and source anchor. All 6 scenarios drilled; mock presents 4 of 6.
- **Pass mechanics:** 72% phase gates + final 4-of-6 timed mock wired in `CLAUDE.md` and `progress.json`.

### House-rule adherence + delivery style (revised 2026-06-09)
- **create-course house rule #6 ("never show code") is HONORED.** Lessons contain no code blocks, JSON, or
  config samples; exact tokens (`stop_reason`, `isError`, `.mcp.json`, `-p`, `tool_choice`, …) are named
  inline only, because the exam tests recognising the names. **Verified: 0 code fences in `LESSONS.md`.**
- **Succinct, non-chatty delivery.** Intake asks only four items (name · bad-joke tolerance · comfort 1–5
  per domain · 1/2/3-month timeline), one at a time — no role/system/fun-facts at intake (system captured
  later in one short question). Setup and tracking file operations run **silently** (no visible cp/Write/
  python). No cheerleading — the project-local spinner verbs carry encouragement. Analogies offered only
  when they genuinely clarify. Lessons were re-tightened to ~half length (LESSONS.md ≈ 16.4k words).

### Finalization pass (2026-06-09)
- **Per-week slash commands/skills — RESOLVED.** Regenerated to the 13-session/4-phase map; added
  `start-session`, `distractor-gauntlet`, `principle-map`; removed the 12 `start-wN-sN` pairs.
- **Progressive disclosure / token economy.** `LESSONS.md` split into `lessons/<NN>-*.md` (one file per
  session); the instructor loads only the current session file, not the whole corpus. `LESSONS.md` is now a
  lean index. `CLAUDE.md` dropped from skills' Read-First where self-contained.
- **Static study aids.** `reference/principle-map.html` (printable card) + `reference/distractor-gauntlet.html`
  (client-side quiz) — zero model tokens at use; wired into the `principle-map` / `distractor-gauntlet` skills.
- **BMAD skill best-practice audit applied** (per `bmad-agent-builder/references/skill-best-practices.md`):
  minimal `allowed-tools`, lean progressive-disclosure SKILL.md files, thin command wrappers.
- **Model guidance** added (Sonnet recommended; Haiku for light review + static drills; Opus unnecessary).

### Accepted with rationale (not blockers)
- **Legacy reference files** (`session-guides/`, `workbooks/`, `labs/`, `learner/`, `CHECKPOINTS.md`,
  `COMPETENCY-CHECKS.md`, `REVIEW-SYSTEM.md`, `OFFICIAL-EXAM-ANCHORS.md`, `SKILLS-MATRIX.md`,
  `DOMAIN-MAP.md`, `SCENARIOS.md`) are superseded by the canonical files and documented as such in
  `README.md` and `CLAUDE.md`. Kept as reference; optional future cleanup.
- **Spinner verbs** require a Claude Code restart to take effect (settings behavior); documented.

## Coverage gaps / unresolved
- Live Claude Code end-to-end run (Part 3) — pending a real session.

## Source credit
Official Anthropic CCA-F exam guide (v0.1, Feb 2025) is the source of truth. First-principles framing,
fun layer, and live-capability `NOW:` notes added for this course. Built with create-course; teaching style
inspired by the AIPM / Dynamic Workflows courses.
