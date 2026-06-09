---
name: grade-readiness
description: |
  Grade current exam readiness. Use when the learner types /grade-readiness.
allowed-tools:
  - Read
---

# Grade Readiness

Read:

- `progress.json` (readiness_pct + mock_exam_results + phase gate status + weak_concepts)
- `PROGRESS.md`

Classify the learner as:

- Not Ready (< 50% readiness or multiple phase gates uncleared)
- Emerging (50–71% — gaps remain)
- Practice-Exam Ready (72%+ but final mock not yet cleared)
- Real-Exam Ready (all phase gates cleared + final mock ≥72%)

Cite evidence from `progress.json` for the classification. Name the next best action — one command, not a menu.
