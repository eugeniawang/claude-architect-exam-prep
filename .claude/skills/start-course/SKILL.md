---
name: start-course
description: |
  Start the CCA-F course — runs onboarding (Session 0) then recommends Session 1. Also use when the learner types start, start course, or start next lesson.
allowed-tools:
  - Read
  - Write
  - Edit
---

# Start Course

## Read First

- `progress.json`
- `user.json` (if it exists)
- `lessons/00-the-prime-directive.md` — Session 0 content only.

## Required Flow

1. Check `progress.json`. If prior progress exists, offer to resume at the correct session instead of re-running onboarding.
2. If the learner is brand new (or confirms restart):
   - If `user.json` is missing, run the four intake questions from CLAUDE.md first-run setup — plain text, one at a time, no structured input tool. Collect all four answers, then write ALL setup files in one go: `user.json` + copy templates to root (`progress.json`, `PROGRESS.md`, `MY_SYSTEM.md`).
   - Run **Session 0** from `lessons/00-the-prime-directive.md`:
     - The Prime Directive + the 7 principles (brief overview — one line each)
     - Meet the nemeses (name the full roster from `course/COMPETENCY_MAP.md`; introduce 2–3 by name with a one-liner on their favourite trick)
     - Start the learner's system stub (`MY_SYSTEM.md`)
   - Explain the course structure: 4 phases, 13 sessions (S0 onboarding + S1–S12), phase gates at 72% after S3 / S7 / S11, final mock = 4-of-6 official scenarios at 72%.
3. After Session 0: recommend `/start-session 1` as the exact next command. Explain that "Session 1" or "Let's do Session 1" also works.
4. Do not begin teaching Session 1 until the learner confirms.

## Progress State

Update `progress.json`:
- `sessions[0].status`: `completed`
- `current_session`: `1`
- `prep_timeline` (from `user.json`)
- `current_mode`: `ready`
- `completion_status`: `in-progress`
- `last_updated`

Also update `PROGRESS.md`.

## Output Requirements

Before ending:

1. One-line summary of what Session 0 covered
2. Exact next command: `/start-session 1`
3. Mention that `continue` or `start next lesson` also works
