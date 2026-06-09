---
name: start-session
description: |
  Run a specific course session (0–12). Use when the learner types /start-session <n>, "Let's do Session X", or "Session X".
argument-hint: "<session number 0-12>"
allowed-tools:
  - Read
  - Write
  - Edit
---

# Start Session

## Read First

- `progress.json`
- `user.json`
- `lessons/<NN>-<slug>.md` — the file for the requested session only. Filename format: two-digit zero-padded number + slug (e.g. `lessons/01-agentic-loops.md`). Look up the slug in `course/LESSONS.md` Session Index table if needed, then close it.

## Required Flow

1. Parse the session number from the argument or the learner's plain-language request.
   - If no number given, ask once: "Which session? (0–12)"
2. **Prerequisite check** (warn, do not hard-block):
   - Session 1–12: confirm prior session is complete in `progress.json`. If not, say so and ask whether to proceed or go back.
   - Phase gate sessions (after S3, S7, S11): confirm the phase gate was cleared at ≥72%. If not, warn and recommend the gate drill first.
3. Load `lessons/<NN>-<slug>.md` for the requested session.
4. `user.json` — personalise every exercise around the learner's real system (`MY_SYSTEM.md`). Generic prompts in the session file are fallbacks.
5. State the one-sentence session objective, then execute the session format from the loaded file (Do This First → What Just Happened → Guided Practice → Explain It Back → Pattern/Anti-pattern → Scenario Check → Apply/Transfer).
6. Update `progress.json` + `PROGRESS.md`: `sessions[n].status: completed` · `scenario_check_score` · `active_minutes` · `weak_concepts` · `readiness_pct` (recalculate) · `last_updated`.

## Phase Gate Behaviour

After completing S3, S7, or S11, announce the phase gate and run it immediately unless the learner asks to defer. Gate = 72% on a mini scenario set covering that phase's sessions/nemeses.

## Output Requirements

End with:

1. One-line session verdict (cleared / weak spots flagged)
2. The nemeses met this session
3. Exact next recommended action (`/start-session <n+1>`, a phase gate, or `/mock-exam`)
