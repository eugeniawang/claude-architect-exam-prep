# Coverage Audit

Use this file as the human-readable proof map for the course package.

## Anthropic Source Links

- consolidated source index:
  `SOURCE-MATERIALS.md`
- Official exam guide URL:
  `https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1773274827%2FClaude+Certified+Architect+%E2%80%93+Foundations+Certification+Exam+Guide.pdf`
- Local exam guide file:
  `sources/anthropic/exam-overview.md`
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

## Delivery Engine

- Claude Code runtime: `CLAUDE.md`
- slash-command entrypoints: `.claude/commands/`
- local runtime skills: `.claude/skills/`
- project-only status line: `.claude/settings.local.json`, `.claude/hooks/cca-course-statusline.js`
- clean share/reset flow: `SHARE.md`, `scripts/reset-course-state.js`, `/reset-course-state`
- editor-agnostic onboarding surface: `START-HERE.md`, `RESUME-GUIDE.md`
- project-folder control surface: `COURSE-CONTROLS.md`, `scripts/course-control.js`
- optional start/resume helper: `scripts/start-or-resume.js`
- runtime proof status helper: `scripts/runtime-proof-status.js`
- optional folder-copy/share helpers: `scripts/build-share-package.js`, `scripts/build-share-zip.js`, `scripts/validate-share-artifacts.js`
- course help command: `/help`, `.claude/skills/help/SKILL.md`
- practice exam command: `/practice-exam`, `.claude/skills/practice-exam/SKILL.md`
- root-level launch helpers: `START.sh`, `START.command`
- glossary help command: `/define`, `.claude/skills/define/SKILL.md`
- local smoke test: `scripts/smoke-test-course.js`
- live proof quickstart: `LIVE-PROOF-QUICKSTART.md`
- live Claude Code validation checklist: `LIVE-RUNTIME-CHECKLIST.md`
- live Claude Code evidence log: `RUNTIME-EVIDENCE.md`
- machine-readable package summary: `COURSE-MANIFEST.json`
- local reference inventory: `SOURCE-MATERIALS.md`

## Beginner Scaffolding

- zero-knowledge vocabulary: `GLOSSARY.md`
- prerequisite repair map: `FOUNDATIONS-SCAFFOLD.md`
- guided workbooks: `workbooks/`
- practical labs: `labs/`
- shared lesson teaching contract: `LESSON-RUNTIME.md`

## Checkpoint System

- lesson checkpoints: `CHECKPOINTS.md`
- 8-question session quizzes: `CHECKPOINTS.md`, `LESSON-RUNTIME.md`
- competency gates: `COMPETENCY-CHECKS.md`
- weekly gates and mock exam: `CHECKPOINTS.md`, `TESTING-SYSTEM.md`
- readiness grading: `READINESS-RUBRIC.md`, `/grade-readiness`

## Official Domain Coverage

### Domain 1

- d1.1: `DOMAIN-MAP.md`, `LESSONS.md` Session 1.1 and 1.2
- d1.2: `DOMAIN-MAP.md`, `LESSONS.md` Session 4.1
- d1.3: `DOMAIN-MAP.md`, `LESSONS.md` Session 4.1
- d1.4: `DOMAIN-MAP.md`, `LESSONS.md` Session 4.1

### Domain 2

- d2.1: `DOMAIN-MAP.md`, `LESSONS.md` Session 1.3 and 3.2
- d2.2: `DOMAIN-MAP.md`, `LESSONS.md` Session 1.3 and 3.2
- d2.3: `DOMAIN-MAP.md`, `LESSONS.md` Session 2.2 and 4.1
- d2.4: `DOMAIN-MAP.md`, `LESSONS.md` Session 1.3 and 2.2
- d2.5: `DOMAIN-MAP.md`, `LESSONS.md` Session 1.1 and 4.2

### Domain 3

- d3.1: `DOMAIN-MAP.md`, `LESSONS.md` Session 2.1 and 4.2
- d3.2: `DOMAIN-MAP.md`, `LESSONS.md` Session 2.2 and 4.2
- d3.3: `DOMAIN-MAP.md`, `LESSONS.md` Session 2.3 and 4.2
- d3.4: `DOMAIN-MAP.md`, `LESSONS.md` Session 2.3, 4.2, and 4.3

### Domain 4

- d4.1: `DOMAIN-MAP.md`, `LESSONS.md` Session 3.1 and 4.3
- d4.2: `DOMAIN-MAP.md`, `LESSONS.md` Session 3.1
- d4.3: `DOMAIN-MAP.md`, `LESSONS.md` Session 3.2 and 4.3
- d4.4: `DOMAIN-MAP.md`, `LESSONS.md` Session 3.3 and 4.3

### Domain 5

- d5.1: `DOMAIN-MAP.md`, `LESSONS.md` Session 1.1, 1.2, and 4.1
- d5.2: `DOMAIN-MAP.md`, `LESSONS.md` Session 1.3, 3.3, and 4.1
- d5.3: `DOMAIN-MAP.md`, `LESSONS.md` Session 2.1, 2.3, and 4.2
- d5.4: `DOMAIN-MAP.md`, `LESSONS.md` Session 3.3, 4.1, and 4.3

## Official Scenario Coverage

- Customer Support Resolution Agent: `SCENARIOS.md`, `LESSONS.md` Session 4.1
- Code Generation with Claude Code: `SCENARIOS.md`, `LESSONS.md` Session 4.2
- Multi-Agent Research System: `SCENARIOS.md`, `LESSONS.md` Session 4.1
- Developer Productivity with Claude: `SCENARIOS.md`, `LESSONS.md` Session 4.2
- Claude Code for Continuous Integration: `SCENARIOS.md`, `LESSONS.md` Session 4.3
- Structured Data Extraction: `SCENARIOS.md`, `LESSONS.md` Session 4.3

## Learner State

- profile: `learner/learner-profile.md`
- progress: `learner/progress-log.md`
- quizzes: `learner/quiz-results.md`
- spaced review: `learner/learning-log.md`
- mock exam: `learner/mock-exam-results.md`
- feedback: `learner/feedback-log.md`
- notes: `learner/session-notes.md`, `learner/domain-*-notes.md`
- machine-readable progress: `.claude/cca-course-progress.json`

## What Is Proven vs Not Yet Proven

### Proven By Files And Validation

- self-contained project structure exists
- project-only status line wiring exists
- reset/share flow exists
- editor-agnostic onboarding and resume docs exist
- help flow exists for available commands, lesson counts, and next actions
- practice-exam flow exists as a retrieval-focused exam path in addition to the final mock exam
- local control script exists for start/resume/reset/validate guidance
- local runtime-proof status script exists to distinguish structural validation from recorded live-proof evidence
- local share-package build script exists to produce a clean validated handoff copy
- share-package build resets learner state and runtime proof evidence in the handoff copy
- local share-zip build script exists to produce a distributable archive from that handoff copy
- local share-artifact validation script exists to check the built folder and archive directly
- share-artifact validation also checks an extracted zip copy, not just the archive listing
- local start/resume helper exists for the simple project-folder start experience
- root-level launch helpers exist for cold-open discoverability
- machine-readable manifest exists for handoff and tooling
- local smoke test exists for fresh-state, resumed-state, and reset behavior on a copied folder
- local smoke test also checks completed-state recommendations from local progress files
- local smoke test asserts reset clears completion and learner-progress metadata
- 31 commands exist
- 31 skills exist
- 12 lesson skills follow a shared runtime contract
- 6 official scenarios exist in course materials
- all official `dX.Y` subdomains are represented in `DOMAIN-MAP.md` and `LESSONS.md`
- validation docs point to Anthropic source URLs and local source files
- requirement-by-requirement audit exists in `COMPLETION-AUDIT.md`
- delivery model mirrors the sample project-local Claude course pattern: local `.claude/` runtime, local progress JSON, project-only status line, explicit skills, and local learner-state files

### Not Yet Proven

- live Claude Code execution of slash commands end-to-end
- actual in-app progress-file mutation behavior during lessons
- real user interaction quality inside Claude Code across a full month of use
