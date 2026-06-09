---
name: weak-areas
description: |
  Run a targeted weak-area repair session. Use when the learner types /weak-areas.
allowed-tools:
  - Read
  - Write
  - Edit
---

# Weak Areas

## Read First

- `progress.json` (review_queue + weak_concepts)
- `course/COMPETENCY_MAP.md` (principle each weak concept maps to)
- `course/DISTRACTOR-PATTERNS.md`

## Required Flow

1. Identify top 1–3 recurring weak areas from `progress.json` (`review_queue` + `weak_concepts`).
2. For each: name domain/subdomain · misconception · violated principle (keyed to `course/COMPETENCY_MAP.md`) · responsible nemesis.
3. Run one focused repair drill (explain again / guided retry / `/scenario-drill`). No new material.
4. One exact next action only.

## Update `progress.json`

`weak_concepts` (mark repaired) · `review_queue` (remove cleared) · `current_mode: repair` · `last_updated`
