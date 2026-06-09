# Live Proof Quickstart

Use this when you want the shortest possible real-world check inside Claude Code.

## Goal

Prove that the duplicated folder works as an actual interactive course inside Claude Code, not just as a validated file package.

## Exact Flow

1. Open this folder as its own project in Claude Code.
2. Type `start`
3. Type `/help`
4. Type `/progress`
5. Type `/start-w1-s1`
6. Answer at least one checkpoint prompt
7. Type `continue`
8. Type `/quiz-me`
9. Type `/practice-exam`
10. Type `/reset-course-state`

## What To Confirm

- `start` routes into the beginner course flow
- `/help` shows lesson counts, lessons remaining, and available commands
- `/progress` reads local project progress correctly
- `/start-w1-s1` starts the expected first lesson
- a wrong or partial answer triggers scaffolded remediation
- `continue` resumes from local state
- `/quiz-me` only uses completed material
- `/practice-exam` runs the mixed practice-exam flow
- `/reset-course-state` clears project-local learner state

## Files To Check

- `.claude/cca-course-config.json`
- `.claude/cca-course-progress.json`
- `learner/progress-log.md`
- `learner/quiz-results.md`
- `learner/learning-log.md`

## Record Evidence

Copy results into:

- `RUNTIME-EVIDENCE.md`

If you want the fuller checklist, use:

- `LIVE-RUNTIME-CHECKLIST.md`
