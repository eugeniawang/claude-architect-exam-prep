# Runtime Evidence Log

Use this file to record real Claude Code validation passes for this course.

## Purpose

`LIVE-RUNTIME-CHECKLIST.md` defines what to test.
This file records what actually happened during a live proof pass.

## Run Metadata

- Date:
- Maintainer:
- Claude Code version:
- Environment:
- Course folder path used:
- Fresh learner or returning learner:

## Command Evidence

| Step | Command or Prompt | Expected Behavior | Observed Result | Files Confirmed Mutated | Pass / Fail | Notes |
|---|---|---|---|---|---|---|
| 1 | `start` | Fresh learner routing works |  |  |  |  |
| 2 | `/setup` | Learner config written locally |  |  |  |  |
| 3 | `/start-course` | First lesson recommended correctly |  |  |  |  |
| 4 | `/help` | Shows available commands, lesson count, lessons left, and next action |  |  |  |  |
| 5 | `/progress` | Shows current state and next action |  |  |  |  |
| 6 | `/start-w1-s1` | Begins expected lesson |  |  |  |  |
| 7 | checkpoint response | Remediation / advance logic works |  |  |  |  |
| 8 | `continue` | Resume routing works |  |  |  |  |
| 9 | `/resume-course` | Reads last progress and weak areas |  |  |  |  |
| 10 | `/quiz-me` | Only uses completed sections |  |  |  |  |
| 11 | `/scenario-drill` | Scenario questioning works |  |  |  |  |
| 12 | `/practice-exam` | Mixed practice-exam flow works |  |  |  |  |
| 13 | `/weak-areas` | Repair flow uses logged weaknesses |  |  |  |  |
| 14 | `/mock-exam` | Mixed final exam flow works |  |  |  |  |
| 15 | `/reset-course-state` | Local learner state resets cleanly |  |  |  |  |

## Completion Evidence

- Was `completion_status` updated correctly?
- Was `course_completed` updated correctly?
- Was `course_completed_at` written?
- Was `course_completion_basis` written?
- Was `last_completed_item` written?

## File Mutation Summary

- `.claude/cca-course-config.json`:
- `.claude/cca-course-progress.json`:
- `learner/progress-log.md`:
- `learner/quiz-results.md`:
- `learner/learning-log.md`:
- `learner/mock-exam-results.md`:
- `learner/domain-*-notes.md`:

## Mismatches

List any differences between:

- docs and observed behavior
- expected file mutations and observed file mutations
- plain-language prompts and slash-command behavior

## Verdict

- Runtime proof status:
- Safe to share broadly:
- Follow-up fixes required:
