# CCA-F Exam Overview

**Claude Certified Architect – Foundations**
Issued by Anthropic · Free · Proctored

| | |
|--|--|
| Format | Multiple choice, scenario-based |
| Passing Score | 720 / 1000 |
| Scenarios | 4 of 6 (randomly selected) |
| Target | Solution architects building production Claude apps |
| Registration | [Anthropic Skilljar Portal](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request) |

---

## 5 Domains

| Domain | Weight | Topics |
|--------|--------|--------|
| 1. Agentic Architecture & Orchestration | ~25% | Agentic loops, multi-agent orchestration, hooks, workflows, session management, task decomposition |
| 2. Tool Design & MCP Integration | ~20% | Tool description best practices, structured error responses, MCP config, Claude's built-in tools |
| 3. Claude Code Configuration & Workflows | ~20% | CLAUDE.md hierarchy, custom commands/skills, plan mode, iterative refinement, CI/CD, batch processing |
| 4. Prompt Engineering & Structured Output | ~20% | Explicit criteria, few-shot prompting, tool_use for structured output, JSON schema, validation-retry loops |
| 5. Context Management & Reliability | ~15% | Progressive summarization risks, context positioning, escalation patterns, error propagation, human review |

---

## 6 Exam Scenarios

You'll get **4 of these 6** randomly. Know all of them.

1. **Customer Support Resolution Agent** — Agent SDK, MCP tools, escalation logic, hook-based compliance
2. **Code Generation with Claude Code** — CLAUDE.md setup, plan mode, slash commands, TDD iteration
3. **Multi-Agent Research System** — Hub-and-spoke architecture, context isolation, error propagation, provenance
4. **Developer Productivity with Claude** — Built-in tools (Read/Write/Bash/Grep/Glob), MCP servers, codebase exploration
5. **Claude Code for CI/CD** — `-p` flag, structured output (`--output-format json`), Batch API, session isolation
6. **Structured Data Extraction** — JSON schema for tool_use, validation-retry loops, few-shot prompting, human review

---

## Anti-Patterns (Know These Cold)

These appear as distractor answers. Recognize them = free points.

| ✗ Wrong | ✓ Right |
|---------|---------|
| Parsing natural language for loop termination | Check `stop_reason` (`tool_use` vs `end_turn`) |
| Arbitrary iteration caps as primary stopping | Let loop terminate naturally via `stop_reason` |
| Prompt-based enforcement for critical business rules | Programmatic hooks for deterministic enforcement |
| Self-reported confidence scores for escalation | Structured criteria + programmatic checks |
| Sentiment-based escalation | Escalate on task complexity / policy gaps, not sentiment |
| Generic error messages ("Operation failed") | Include `isError`, `errorCategory`, `isRetryable`, context |
| Silently suppressing errors (empty results = success) | Distinguish access failures from genuinely empty results |
| Too many tools per agent (18+) | 4–5 tools per agent for optimal selection |
| Same-session self-review | Separate sessions to avoid reasoning context bias |
| Aggregate accuracy metrics only | Track accuracy per document type to catch masked failures |

---

## Key Resources

| Resource | Link |
|----------|------|
| Exam Guide | [claudecertifications.com/exam-guide](https://claudecertifications.com/claude-certified-architect/exam-guide) |
| All 5 Domains | [claudecertifications.com/domains](https://claudecertifications.com/claude-certified-architect/domains) |
| 25 Practice Questions | [claudecertifications.com/practice-questions](https://claudecertifications.com/claude-certified-architect/practice-questions) |
| 6 Scenario Walkthroughs | [claudecertifications.com/scenarios](https://claudecertifications.com/claude-certified-architect/scenarios) |
| Anti-Patterns Cheatsheet (18) | [claudecertifications.com/anti-patterns](https://claudecertifications.com/claude-certified-architect/anti-patterns) |
| 12-Week Study Plan | [claudecertifications.com/study-guide](https://claudecertifications.com/claude-certified-architect/study-guide) |
| Official Anthropic Docs | [docs.anthropic.com](https://docs.anthropic.com) |
