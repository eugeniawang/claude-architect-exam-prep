# Course Controls

Use this file when you want the shortest operational view of the folder.

## In Claude Code

Default learner path:

- open this folder in Claude Code or another editor where Claude Code is available
- start Claude in this project
- type `start`, `continue`, or `start next lesson`
- use slash commands only when you want a more explicit control path

Explicit commands if you want them:

- `/help`
- `/setup`
- `/start-course`
- `/resume-course`
- `/course-menu`
- `/progress`
- `/define`
- `/reset-course-state`

Practice commands:

- `/daily-review`
- `/scenario-drill`
- `/weak-areas`
- `/quiz-me`
- `/practice-exam`
- `/mock-exam`

## In A Terminal

From this folder:

```bash
./START.sh
node scripts/start-or-resume.js .
node scripts/course-control.js .
```

These are the only terminal helpers most learners or maintainers should need at first:

- exact fresh-start vs resume recommendation
- learner name if set
- current week/session if set
- completion status if set
- whether the folder looks fresh or in-progress
- exact next Claude Code commands to use
- validate/reset helpers

On macOS, `START.command` provides the same first-step helper in a double-clickable form.

Maintainer-only validation, packaging, and proof helpers live in:

- `SHARE.md`
- `MAINTAINER-VALIDATION.md`

## Goal

Anyone opening the folder should be able to tell, quickly:

1. how to start
2. how to resume
3. how to reset
4. how to validate the package when needed
5. how to quiz only completed material
