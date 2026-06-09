# Resume Guide

Use this when a learner leaves the course and comes back later.

## Where Progress Lives

Machine-readable state:

- `.claude/cca-course-progress.json`
- `.claude/cca-course-config.json`

Progress state includes:

- current location
- completed sessions and gates
- weak domains and due reviews
- completion status and completion date when applicable

Learner-facing state:

- `learner/progress-log.md`
- `learner/quiz-results.md`
- `learner/learning-log.md`
- `learner/mock-exam-results.md`
- `learner/session-notes.md`
- `learner/domain-*-notes.md`

## How Resume Works

1. Open the same course folder again.
2. Run `/resume-course`.
3. Claude Code should:
   - inspect due reviews
   - summarize last completed work
   - identify weak domains
   - recommend the exact next command

Plain-language `continue` should work too when Claude is following this course runtime.

## If Progress Looks Wrong

Check:

- `.claude/cca-course-progress.json`
- `learner/progress-log.md`
- `learner/quiz-results.md`

If the folder was shared and should be blank, reset local state:

- `/reset-course-state`

## Project Scope

Resume behavior is project-local. This course should not depend on global Claude settings.
