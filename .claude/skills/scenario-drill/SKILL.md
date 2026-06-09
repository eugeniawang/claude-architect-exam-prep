---
name: scenario-drill
description: |
  Run a focused official-scenario drill. Use when the learner types /scenario-drill.
allowed-tools:
  - Read
  - Write
  - Edit
---

# Scenario Drill

## Read First

- `course/COMPETENCY_MAP.md` (scenario coverage + nemesis roster)
- `course/DISTRACTOR-PATTERNS.md`
- `progress.json`

Only load `course/SOURCE.md` if the learner requests verbatim official scenario text.

## Required Flow

1. If scenario not given, ask which of the 6 to drill.
2. Brief the scenario in 3–4 lines from `course/COMPETENCY_MAP.md` (context · stakes · what the architect must decide).
3. Ask ≥4 exam-style questions: anti-pattern recognition (name the nemesis) · best-next-action · tradeoff · distractor explanation (violated principle from `course/DISTRACTOR-PATTERNS.md`).
4. For each miss: name distractor pattern + nemesis. One wry line, then explain. Ask learner to name the violated principle on ≥1 wrong answer.

## Update `progress.json`

`scenario_drill_results`: append `{ date, scenario, score_pct, weak_concepts }` · `weak_concepts` · `current_mode: scenario-drill` · `last_updated`
