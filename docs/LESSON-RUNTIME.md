# Lesson Runtime Contract

Use this contract every time a lesson command such as `/start-w1-s1` or `/start-w4-s3` runs.

## Before Review

1. Read the matching session guide in `session-guides/`.
2. Read the relevant lesson block in `LESSONS.md`.
3. Read:
   - `CHECKPOINTS.md`
   - `COMPETENCY-CHECKS.md`
   - `FOUNDATIONS-SCAFFOLD.md`
   - `DOMAIN-MAP.md`
4. Update `.claude/cca-course-progress.json` to the current week, session, and `lesson` mode.

## During Review

1. Name the lesson focus.
2. Name the skills practiced.
3. Name the official `dX.Y` mappings.
4. Name the scenario anchor.
5. Review in beginner language first.
6. Run at least one lesson checkpoint from `CHECKPOINTS.md`.
7. Use a Feynman explain-back before treating understanding as stable.
8. Run the matching competency check from `COMPETENCY-CHECKS.md`.
9. End with the mapped 8-question session quiz.

## If The Learner Struggles

Use one of these modes explicitly:

- `explain again`
- `guided retry`
- `advance`

If the learner still misses the concept:

1. identify the likely misconception
2. map it to `FOUNDATIONS-SCAFFOLD.md`
3. review the prerequisite concept again
4. assign the matching lab or workbook section if needed

## After Review

Update:

- `learner/quiz-results.md`
- `learner/progress-log.md`
- `learner/learning-log.md`
- relevant `learner/domain-*-notes.md`
- `.claude/cca-course-progress.json`

Record:

- score
- weak domains
- missed concepts
- retry status
- exact next action

## Recap Requirement

End every lesson with:

1. what the learner did
2. what skills were practiced
3. which domains/subdomains were covered
4. which anti-patterns or code mechanics mattered
5. the exact next command
