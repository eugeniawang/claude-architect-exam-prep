# Maintainer Validation

Use this before duplicating or publishing the course folder for another learner.

## Claude Code Runtime Checks

Open `CCA-F Exam Prep Course` in Claude Code and verify:

1. plain-language `start` routes correctly for a fresh learner
2. plain-language `continue` routes correctly for a returning learner
3. `/setup` works
4. `/start-course` works
5. `/progress` reflects course state
6. `/help` shows available commands, lesson count completed, lessons remaining, and best next options
7. `/start-w1-s1` starts the expected lesson
8. `/daily-review` reads due reviews from `learner/learning-log.md`
9. `/scenario-drill` runs scenario-based questioning
10. `/quiz-me` only tests completed sections
11. `/practice-exam` runs the mixed practice-exam flow
12. `/mock-exam` runs a 24-question mixed exam flow
13. `/grade-readiness` produces a sensible readiness rating
14. `/reset-course-state` returns the course to a clean project-local learner state
15. the status line reflects current course state if project status lines are supported
16. status line remains project-only and does not alter global Claude settings
17. onboarding, resume, review, drill, repair, help, and exam commands resolve to explicit local skills rather than relying on ad hoc inference
18. `START-HERE.md` is sufficient for a new learner opening the folder in Claude Code or another editor
19. `scripts/start-or-resume.js` gives a correct first-step start vs resume recommendation from local state
20. `scripts/course-control.js` prints the correct start/resume/reset/validate guidance from local state
21. `/define` returns a beginner-friendly term definition and adds missing terms to `GLOSSARY.md` without duplicating existing entries
22. `scripts/smoke-test-course.js` proves fresh-state, in-progress, reset, and copied-folder validation behavior
23. `scripts/runtime-proof-status.js` accurately reports whether live runtime evidence has been recorded
24. `COURSE-MANIFEST.json` correctly lists entrypoints, local scripts, local state files, and project-only delivery assumptions
25. `LIVE-RUNTIME-CHECKLIST.md` is usable for capturing a real end-to-end Claude Code proof pass
26. `RUNTIME-EVIDENCE.md` provides a canonical place to record the observed results and file mutations from that pass
27. if you choose to use the optional copy/zip helpers, they preserve the expected course `version` and `last_updated` metadata from `COURSE-MANIFEST.json`

## Structural Validator

Run:

```bash
node scripts/validate-course.js .
```

Expected result:

- `COURSE VALIDATION PASSED`

Optional stronger local proof:

```bash
node scripts/smoke-test-course.js .
```

Expected result:

- `COURSE SMOKE TEST PASSED`

Runtime-proof status:

```bash
node scripts/runtime-proof-status.js .
```

Expected result before a live Claude Code pass:

- `Status: NO_LIVE_PROOF_RECORDED`

Optional folder-copy build:

```bash
node scripts/build-share-package.js .
```

Expected result:

- `CCA-F SHARE PACKAGE BUILT`

Optional zip build:

```bash
node scripts/build-share-zip.js .
```

Expected result:

- `CCA-F SHARE ZIP BUILT`

Optional copy/zip validation:

```bash
node scripts/validate-share-artifacts.js .
```

Expected result:

- `CCA-F SHARE ARTIFACTS VALIDATED`

## Official Source Links

Use these during final spot checks:

- consolidated source index: `SOURCE-MATERIALS.md`
- local guide: `sources/anthropic/exam-overview.md`
- official guide URL:
  `https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1773274827%2FClaude+Certified+Architect+%E2%80%93+Foundations+Certification+Exam+Guide.pdf`
- Domain 1:
  `https://claudecertifications.com/claude-certified-architect/domains/agentic-architecture`
- Domain 2:
  `https://claudecertifications.com/claude-certified-architect/domains/tool-design-mcp`
- Domain 3:
  `https://claudecertifications.com/claude-certified-architect/domains/claude-code-config`
- Domain 4:
  `https://claudecertifications.com/claude-certified-architect/domains/prompt-engineering`
- Domain 5:
  `https://claudecertifications.com/claude-certified-architect/domains/context-management`

## Content Checks

Verify:

1. all 5 domains are covered
2. all 6 official scenarios are covered
3. each lesson maps to official `dX.Y` subdomains
4. scenario-based competency checks exist
5. practical labs exist for transfer-heavy topics

## Learner-State Checks

Verify the course can use and update:

- `.claude/cca-course-config.json`
- `.claude/cca-course-progress.json`
- `learner/progress-log.md`
- `learner/quiz-results.md`
- `learner/learning-log.md`
- `learner/mock-exam-results.md`
- `learner/feedback-log.md`

## Folder Handoff Checks

Verify a new learner can:

1. clone/download the project
2. duplicate the course folder directly if they want their own clean copy
3. open the course folder directly in Claude Code or another editor
4. find the command map in `SYLLABUS.md`
5. reset to a clean learner state without editing files by hand
6. start without reading the entire repo first

## Known Remaining Reality Check

This repo can be validated structurally from files alone, but Claude Code runtime behavior still needs a live pass in Claude Code itself.

See also:

- `COVERAGE-AUDIT.md`
- `COMPLETION-AUDIT.md`
- `LIVE-PROOF-QUICKSTART.md`
- `LIVE-RUNTIME-CHECKLIST.md`
- `RUNTIME-EVIDENCE.md`
