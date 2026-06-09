---
name: give-feedback
description: |
  Capture learner feedback about the course. Use when the learner types /give-feedback.
allowed-tools:
  - Read
  - Write
---

# Give Feedback

Ask what helped, what confused them, and what should change.

Append a concise entry to `progress.json` under a `feedback` array:
`{ "date": "<ISO date>", "helped": "...", "confused": "...", "change": "..." }`

Update `last_updated` in `progress.json`.
