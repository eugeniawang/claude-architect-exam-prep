---
name: progress
description: |
  Show current course progress. Use when the learner types /progress.
allowed-tools:
  - Read
---

# Progress

Read:

- `progress.json`
- `PROGRESS.md`
- `user.json` (for prep timeline)

Show:

- current session (number + title)
- prep timeline + sessions done vs total (13)
- cumulative active_minutes
- readiness % (from `progress.json`)
- weak concepts / domains
- due reviews (from review queue)
- phase gate status (Phase 1 after S3 / Phase 2 after S7 / Phase 3 after S11)
- exact next action
