---
name: setup
description: |
  Set up the CCA-F course for a new learner. Use when the learner types /setup. This is optional — learners can also begin with plain-language start prompts.
allowed-tools:
  - Read
  - Write
---

# Setup

## Read First

- `user.json` (if it exists)

## Required Flow

1. Collect **one at a time** (if not in `user.json`):
   - Name
   - Joke tolerance 1–10 (store as `joke_tolerance`)
   - Comfort 1–5 on each domain: agent loops · tools+MCP · Claude Code config · prompting+schemas · context+reliability (store as `comfort`)
   - Prep timeline: `1 month` aggressive / `2 months` standard / `3 months` relaxed (default 2; store as `prep_timeline`)
2. Write/update `user.json`: `name` · `joke_tolerance` · `comfort` · `prep_timeline` · `setup_at`.
3. If `progress.json` missing, copy templates: `templates/progress.json` → `progress.json` · `templates/PROGRESS.md` → `PROGRESS.md` · `templates/MY_SYSTEM.md` → `MY_SYSTEM.md`.
4. End: name + timeline confirmed · exact next: `/start-course`.
