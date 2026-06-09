# Live Runtime Checklist

Use this file when validating the course inside Claude Code itself.

## Purpose

The package is structurally validated already. This checklist is for the remaining proof gap: real Claude Code runtime behavior.

Record the results in `RUNTIME-EVIDENCE.md`.

## Setup

1. Open `CCA-F Exam Prep Course` as its own project in Claude Code.
2. Confirm the status line, if shown, is project-only.
3. If this copy has prior learner data, run `/reset-course-state`.

## Fresh Learner Pass

Record pass/fail and short notes for each step:

- plain-language `start` routes correctly
- `/setup` writes learner config locally
- `/start-course` recommends the correct first lesson
- `/help` shows available commands, lessons completed, lessons remaining, and best next action
- `/course-menu` shows the learner command map
- `/progress` shows `completion_status`, current week/session, and next action
- `/start-w1-s1` begins the expected beginner lesson
- a checkpoint can be answered and handled with remediation if needed
- completing the session updates:
  - `.claude/cca-course-progress.json`
  - `learner/progress-log.md`
  - `learner/quiz-results.md`
  - `learner/learning-log.md`

## Resume Pass

- plain-language `continue` routes correctly
- `/resume-course` summarizes last completed work and weak areas
- due reviews are recognized from `learner/learning-log.md`
- `start next lesson` advances to the correct next step when no gate blocks progress

## Practice And Assessment Pass

- `/define` reuses glossary entries when present
- `/define` adds a missing term cleanly when absent
- `/scenario-drill` runs scenario-based questioning
- `/quiz-me` only tests completed sections
- `/practice-exam` runs the mixed practice-exam flow
- `/weak-areas` uses logged weaknesses for repair
- `/grade-readiness` gives a sensible readiness rating
- `/mock-exam` runs the expected mixed exam structure

## Completion Pass

- when the learner has completed the four-week path and passes the mock exam, progress updates:
  - `completion_status`
  - `course_completed`
  - `course_completed_at`
  - `course_completion_basis`
  - `last_completed_item`

## Reset And Share Pass

- `/reset-course-state` clears local learner state without touching global settings
- `START-HERE.md` is enough for a new learner to begin
- `SHARE.md` is enough for a maintainer to hand the folder to another learner

## Evidence Capture

For a real proof pass, capture:

- date
- Claude Code version if relevant
- which steps passed/failed
- exact files confirmed to mutate
- any mismatch between docs and runtime behavior
