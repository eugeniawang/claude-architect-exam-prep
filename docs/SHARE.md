# Share This Course

Use this checklist before handing the project to another learner.
Current course version: `0.7`
Current last updated: `2026-06-08`

## Goal

Make sure the next learner opens a clean, project-scoped Claude Code course with no inherited learner history and no global configuration changes.

## Reset Local Course State

From the course folder, use one of these:

- inside Claude Code: `/reset-course-state`
- in a terminal:

```bash
node scripts/reset-course-state.js .
```

This reset is project-only. It rewrites only:

- `learner/`
- `.claude/cca-course-config.json`
- `.claude/cca-course-progress.json`

It does not touch any global Claude settings.

## Build A Shareable Copy

Create a clean share package folder with:

```bash
node scripts/build-share-package.js .
```

Default output:

- `dist/cca-f-course-share`

That build:

- copies the course into a new folder
- resets learner state in the copy
- resets runtime proof evidence in the copy
- validates the copied folder
- writes `SHARE-PACKAGE-BUILD.md` into the copied folder

Create a zip archive from that clean share package with:

```bash
node scripts/build-share-zip.js .
```

Default zip output:

- `dist/cca-f-course-share.zip`

Validate the built share folder and zip with:

```bash
node scripts/validate-share-artifacts.js .
```

That validation now confirms the built folder and extracted zip carry the same version and `last_updated` metadata as the source course manifest.

## Verify Before Sharing

1. Run `node scripts/validate-course.js .`
2. Confirm `COURSE VALIDATION PASSED`
3. Optional stronger check: run `node scripts/smoke-test-course.js .`
4. Confirm `COURSE SMOKE TEST PASSED` if you ran it
5. Optional evidence check: run `node scripts/runtime-proof-status.js .`
6. Optional packaging check: run `node scripts/build-share-package.js .`
7. Optional archive check: run `node scripts/build-share-zip.js .`
8. Optional artifact validation check: run `node scripts/validate-share-artifacts.js .`
9. Open the folder in Claude Code
10. Confirm `/course-menu` shows the expected command list
11. Confirm the status line, if shown, is scoped to this project only
12. Confirm `START-HERE.md` is enough for a new learner to know how to start or resume
13. Use `LIVE-RUNTIME-CHECKLIST.md` if you want to capture a real Claude Code validation pass
14. Record any real Claude Code validation run in `RUNTIME-EVIDENCE.md`

## Recommended Hand-Off

Tell the learner:

1. Open `CCA-F Exam Prep Course` as its own Claude Code project or in another editor with Claude Code available
2. Start Claude in that project
3. Type `start`, `continue`, or `start next lesson`
4. Use slash commands like `/course-menu`, `/progress`, or `/resume-course` only when they want explicit control
5. Follow lessons in order unless the runtime recommends a review, gate, or repair step

## Distribution Note

If you zip or copy this course for public sharing, run the reset first so learner progress, weak-area notes, and mock-exam history are not carried forward.
