---
name: resume-course
description: |
  Resume the CCA-F course from prior progress. Also use when the learner types continue, resume, or continue course.
allowed-tools:
  - Read
  - Write
  - Edit
---

# Resume Course

## Read First

- `progress.json`
- `PROGRESS.md`
- `user.json`

## Required Flow

1. From `progress.json` identify: last completed session + score · due reviews · weak concepts · unfinished phase gate · prep timeline urgency.
2. Summarise in plain language: last session · readiness % · what's due now · weak concepts.
3. Run due reviews first (reviews block advancement until cleared).
4. Recommend one exact next action: due review / `/start-session <n>` / phase gate / `/mock-exam`.
5. `continue` or `start next lesson` = equivalent trigger. Ask confirmation before opening new session material.

## Update `progress.json`

`current_session` · `current_mode: resume-ready` · `due_reviews` · `weak_concepts` · `last_updated`. Also update `PROGRESS.md`.
