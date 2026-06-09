---
name: practice-exam
description: |
  Run a mixed scenario practice exam from course/COMPETENCY_MAP.md with a repair plan. NOT a gate. Use when the learner types /practice-exam.
allowed-tools:
  - Read
  - Write
  - Edit
---

# Practice Exam

## Read First

- `course/COMPETENCY_MAP.md` (domain weights + nemesis roster + scenario coverage)
- `course/DISTRACTOR-PATTERNS.md`
- `progress.json`

Only load `course/SOURCE.md` if verbatim official sample-question language is explicitly needed.

## Required Flow

1. Frame as practice (not a gate) — spaced retrieval + misconception repair. If <4 sessions complete, redirect to `/quiz-me`.
2. Draw questions across all 5 domains per `course/COMPETENCY_MAP.md` weights. One question at a time.
3. After completion: total score · domain breakdown · top misconceptions (≤3) · named nemeses · repair plan (sessions + nemeses per weak domain).

## Update `progress.json`

`practice_exam_results`: append `{ date, score_pct, domain_scores }` · `weak_concepts` · `last_updated`
