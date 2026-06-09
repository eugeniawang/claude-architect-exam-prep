# Start Here

Open this folder in Claude Code or another editor that you use with Claude Code.
Course version: `0.7`
Last updated: `2026-06-08`

## Important Disclaimer

This course is a supplement to the official Anthropic certification materials.
It is not a replacement for Anthropic's actual CCA-F training content,
documentation, or exam guidance.

You should still study the official Anthropic materials directly. If anything in
this repo differs from Anthropic's official materials, Anthropic's materials win.

## Fast Start

1. Open `CCA-F Exam Prep Course` as the working folder.
2. Start Claude in this project.
3. Simplest prompt:
   - `start`
   - `continue`
   - `start next lesson`
4. Explicit command path if you prefer:
   - `/setup`
   - `/start-course`
   - `/resume-course`
5. If you want the full layout, read [README.md](/Users/Eugenia/Dropbox/ew-os/projects/cc-certification/CCA-F%20Exam%20Prep%20Course/README.md).

During setup, the course will ask whether you want a:

- 1-month sprint
- 2-month prep track
- 3-month prep track

The sessions stay the same. The pacing and review spacing change.

## Optional NotebookLM Hookup

NotebookLM is not required for this course.

If you want extra study support such as your own notes, summaries, or visual
study aids, you can connect your own NotebookLM workflow separately. Treat that
as optional enrichment only, not as the source of truth for the course.

If you want exact setup steps, read [NOTEBOOKLM.md](/Users/Eugenia/Dropbox/ew-os/projects/cc-certification/CCA-F%20Exam%20Prep%20Course/NOTEBOOKLM.md).

## If This Copy Was Used Before

Reset the local learner state first:

- inside Claude Code: `/reset-course-state`
- in a terminal:

```bash
node scripts/reset-course-state.js .
```

## Resume Later

This course stores progress inside this folder, not globally.

Resume files:

- `.claude/cca-course-progress.json`
- `learner/progress-log.md`
- `learner/quiz-results.md`
- `learner/learning-log.md`

When you come back, run:

- `continue`
- or `/resume-course`

## Optional Helpers

If you want optional terminal helpers, use:

```bash
node scripts/start-or-resume.js .
node scripts/course-control.js .
```

Advanced validation and sharing helpers are documented in:

- `COURSE-CONTROLS.md`
- `SHARE.md`
- `LIVE-PROOF-QUICKSTART.md`

## First Commands To Know

- `/help`
- `/course-menu`
- `/progress`
- `/define`
- `/quiz-me`
- `/daily-review`
- `/scenario-drill`
- `/weak-areas`
- `/practice-exam`
- `/mock-exam`

## One-Line Goal

This folder is meant to be self-contained: open it, start the course, leave, return later, and resume from local progress files.
