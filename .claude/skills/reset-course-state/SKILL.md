---
name: reset-course-state
description: |
  Reset the CCA-F course to a clean project-local learner state. Use when the learner types /reset-course-state.
allowed-tools:
  - Read
  - Write
---

# Reset Course State

1. Warn that this resets only project-local course state (for a clean cohort copy or fresh restart).
2. Confirm the learner wants to proceed.
3. Reset root working files by copying from `templates/`:
   - `templates/progress.json` → `progress.json`
   - `templates/PROGRESS.md` → `PROGRESS.md`
   - `templates/MY_SYSTEM.md` → `MY_SYSTEM.md`
4. Reset `user.json` to blank (or delete it).
5. Point the learner to:
   - `/setup` (to re-enter name + prep timeline)
   - `/start-course` (to begin)
6. Remind them that global Claude settings were not touched.
