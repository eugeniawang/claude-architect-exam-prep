---
name: distractor-gauntlet
description: |
  Spot-the-wrong-answer drill. Offer the static interactive page (free, replayable) or run the adaptive in-chat version that tracks weak areas. Use when the learner types /distractor-gauntlet or "gauntlet".
allowed-tools:
  - Read
  - Write
  - Bash
---

# Distractor Gauntlet

Two ways to run it. Offer both; recommend by context.

## A) Static interactive page (free, replayable)
`reference/distractor-gauntlet.html` — a self-contained click-through quiz: instant feedback, the violated principle + nemesis named, a streak counter and score, scored against the 72% bar. No tokens, unlimited reps.
- Point them to it: `open reference/distractor-gauntlet.html` (or open in a browser).
- After a run, ask which scenarios tripped them up and log those to `progress.json` `weak_concepts`.

## B) Adaptive in-chat gauntlet (personalised, tracked)
Use when the learner wants questions weighted to THEIR weak areas, or wants it to count toward progress.
- One scenario at a time. A 4-option exam-format question; one answer is wrong in a specific, named way.
- The learner identifies the correct answer AND the nemesis by name. Keep a visible streak counter.
- On a miss: one dry, fond line, then name the nemesis and why. On a hit: brief ack + streak bump.
- Draw from every nemesis in `course/COMPETENCY_MAP.md` (each appears at least once per 10 rounds); vary across all 5 domains. Only load `course/SOURCE.md` if verbatim official question patterns are explicitly requested. Stop on "stop" or after 15 rounds.

## Scoring & update (either mode)
Track rounds, full credit (answer + nemesis), half credit (answer only), miss, longest streak. After the session, update `progress.json`: increment `gauntlet_sessions`, set `gauntlet_last_score`, append twice-missed nemeses to `weak_concepts`, set `last_updated`. End with: final score + longest streak, the nemesis that escaped most, and the exact next action.
