---
name: quiz-me
description: |
  Run a short exam-style quiz using only sessions the learner has already completed. Use when the learner types /quiz-me.
allowed-tools:
  - Read
  - Write
---

# Quiz Me

## Read First

- `progress.json` (completed sessions + weak_concepts)
- `course/COMPETENCY_MAP.md`
- `course/DISTRACTOR-PATTERNS.md`

## Required Flow

1. Scope to `progress.json` sessions with `status: completed` only. If none, explain and recommend the start command.
2. Ask 5–6 questions from completed material: concept check · anti-pattern recognition · best-next-action · glossary token in context. At least one: name a nemesis and ask which principle it violated.
3. For each miss: right mechanism · distractor pattern (by name from `course/DISTRACTOR-PATTERNS.md`) · completed session to revisit.
4. End: score · covered sessions · weak concepts · exact next action.
5. Update `progress.json`: `weak_concepts` (append) · `last_updated`.
