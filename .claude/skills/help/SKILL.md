---
name: help
description: |
  Show the course help menu, available commands, lesson progress, and best next actions. Use when the learner types help or /help.
allowed-tools:
  - Read
---

# Course Help

Read:

- `study/SYLLABUS.md`
- `progress.json`

Show:

- The simplest plain-language path: `start`, `continue`, or `start next lesson`
- Sessions: 13 total (Session 0 onboarding + Sessions 1–12). How many done / remaining.
- Current session if known; best next action.
- Current command set:

  **Navigation:** Start · Continue/Resume · `start-session <n>` · Help · Show my progress · What's next
  **Learning tools:** Define X · Quiz me · Distractor gauntlet · Practice exam · Mock exam
  **Drilling:** Show me the principle map · Scenario drill · Weak areas · Daily review · Recap · Reference · Parking lot
  **Admin:** Reset course state

Rules:

- `/quiz-me` uses completed sessions only — say this.
- `/practice-exam` = mixed scenario set, repair plan, NOT a gate.
- `/mock-exam` = 4-of-6 official scenarios, 72% pass bar — the final gate.
- Keep the answer short, practical, course-focused.
- If not started: recommend `start`.
- If mid-course: recommend `continue` or exact next session.
- If near the end: flag `/mock-exam` as the final gate.
