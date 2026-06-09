---
name: daily-review
description: |
  Run a review-only session for due concepts. Use when the learner types /daily-review.
allowed-tools:
  - Read
  - Write
---

# Daily Review

## Read First

- `progress.json` (review_queue with due dates + weak_concepts)
- `course/COMPETENCY_MAP.md` (to map concept slugs to principles/domains)

Only load `course/DISTRACTOR-PATTERNS.md` if a review item is a distractor/anti-pattern concept.

## Required Flow

1. Find all concepts due today or overdue in `progress.json` review queue (keyed to principles, not calendar weeks). Review only due concepts; don't open new material.
2. For each: short recall prompt · one scenario-based check · Feynman explanation in learner's words.
3. Miss: explain simply (name the principle) · reset due date. Queue empty: say so, suggest `/start-session <n>`.

## Update `progress.json`

`review_queue` (advance if cleared, reset if missed) · `weak_concepts` (append new) · `current_mode: review` · `due_reviews` (recalculate) · `last_updated`
