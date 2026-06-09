---
name: mock-exam
description: |
  Run the final mock exam — 4 of the 6 official scenarios, picked at random. Pass bar: 72%. Use when the learner types /mock-exam.
allowed-tools:
  - Read
  - Write
  - Edit
---

# Mock Exam

## Read First

- `course/COMPETENCY_MAP.md` (domain weights + nemesis roster + 6 official scenario definitions)
- `course/DISTRACTOR-PATTERNS.md`
- `progress.json`

Optional — load only if needed: `PROGRESS.md` (for gate check context) · `MY_SYSTEM.md` (for personalised question framing) · `course/SOURCE.md` (only if verbatim official exam language is required).

## Gate Check

Warn (don't block) if any phase gate is uncleared (Phase 1 after S3, Phase 2 after S7, Phase 3 after S11, each ≥72%).

## Exam Rules

- 4 of 6 official scenarios, picked at random; cover all 5 domains.
- Calibrate to the 12 sample-question patterns in `course/SOURCE.md`.
- Mix: tradeoff · anti-pattern trap · best-next-action · principle identification.
- One question at a time; score only after all questions.
- Pass bar: **72%**.

## Required Flow

1. Announce the 4 selected scenarios before starting.
2. Administer one question at a time; track domain coverage internally.
3. After completion return: total score · domain breakdown · scenario breakdown · top misconceptions (≤3) · per-domain repair plan (sessions + nemeses) if below 72%.
4. For misses: name the distractor pattern and nemesis.

## Update `progress.json`

- `mock_exam_results`: append `{ date, score_pct, scenarios_presented, domain_scores, passed }`
- `current_mode`: `mock-exam`; `weak_concepts`: append failures; `last_updated`
- If passed ≥72% + all gates cleared + `MY_SYSTEM.md` done: set `completion_status: completed`, `course_completed: true`, `course_completed_at`, `course_completion_basis: all-phase-gates + mock-exam >= 72%`

Update `PROGRESS.md`.

## Output

Pass/fail + score · repair priority if below 72% · exact next command
