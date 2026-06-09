# Runtime Mutation Map

This file documents which course commands are expected to update which project-local state files.

## Project Rule

All mutations must stay inside this project. No command should rely on or modify global Claude configuration.

## Setup Flow

### `/setup`

Expected writes:

- `.claude/cca-course-config.json`
- `.claude/cca-course-progress.json`

### `/start-course`

Expected writes:

- `.claude/cca-course-config.json` when learner profile is blank
- `.claude/cca-course-progress.json`
- `learner/learner-profile.md` when learner profile is blank

### `/resume-course`

Expected writes:

- `.claude/cca-course-progress.json`

### `/reset-course-state`

Expected writes:

- `.claude/cca-course-config.json`
- `.claude/cca-course-progress.json`
- all files under `learner/`

## Review And Repair

### `/daily-review`

Expected writes:

- `.claude/cca-course-progress.json`
- `learner/learning-log.md`
- `learner/progress-log.md` when a meaningful review session occurs

### `/scenario-drill`

Expected writes:

- `.claude/cca-course-progress.json`
- `learner/progress-log.md`
- `learner/quiz-results.md` when a recurring weak area appears

### `/weak-areas`

Expected writes:

- `.claude/cca-course-progress.json`
- `learner/progress-log.md`
- `learner/learning-log.md`
- relevant `learner/domain-*-notes.md`

## Assessment

### `/quiz-me`

Expected writes:

- `learner/quiz-results.md` when a recurring weak area appears

Quiz scope rule:

- only use material from `completed_sessions` and `completed_gates`
- do not test future or unfinished sections

### `/mock-exam`

Expected writes:

- `.claude/cca-course-progress.json`
- `learner/mock-exam-results.md`
- `learner/progress-log.md`

Completion fields that may be updated at end-of-course:

- `completion_status`
- `course_completed`
- `course_completed_at`
- `course_completion_basis`
- `last_completed_item`

### `/grade-readiness`

Expected writes:

- none required

### `/define`

Expected writes:

- `GLOSSARY.md` when the term does not already exist

## Notes And Feedback

### `/notes`

Expected writes:

- `learner/session-notes.md` or relevant `learner/domain-*-notes.md`

### `/give-feedback`

Expected writes:

- `learner/feedback-log.md`

## Lesson Commands

All `/start-w*-s*` lesson commands should update:

- `.claude/cca-course-progress.json`
- `learner/quiz-results.md`
- `learner/progress-log.md`
- `learner/learning-log.md`
- relevant `learner/domain-*-notes.md`

They should also maintain completion metadata inside `.claude/cca-course-progress.json`:

- `completion_status`
- `completed_sessions`
- `last_completed_item`

## Read-Only Commands

These commands should remain read-only:

- `/course-menu`
- `/progress`
- `/recap`
- `/reference`
- `/grade-readiness`
