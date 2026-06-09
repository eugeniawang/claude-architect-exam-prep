# Official Exam Anchors

This file captures the specific things the official certification materials repeatedly emphasize:

- scenario framing
- anti-patterns
- code-sample mechanics
- exam-tip style distinctions

Use it as a teaching anchor, not a replacement for the source docs.

## Domain 1: Agentic Architecture & Orchestration

### Official scenario emphasis

- customer support resolution agent
- multi-agent research system

### Anti-patterns to surface repeatedly

- parsing assistant text instead of checking `stop_reason`
- arbitrary iteration caps as the primary loop control
- sharing full coordinator context with every subagent
- using prompts instead of hooks/gates for critical business rules
- escalating on sentiment or self-reported confidence

### Code-sample mechanics to teach

- loop control checks `response.stop_reason`
- append tool results back into conversation before next turn
- `Task` is required for subagent spawning
- coordinator passes only explicit relevant context
- objective escalation uses policy thresholds, gaps, or explicit requests

## Domain 2: Tool Design & MCP Integration

### Official scenario emphasis

- developer productivity with Claude
- customer support agent with MCP tools

### Anti-patterns to surface repeatedly

- vague, overlapping tool descriptions
- generic error messages with no structure
- too many tools per agent
- treating access failures as empty results

### Code-sample mechanics to teach

- tool descriptions define purpose, inputs, outputs, boundaries
- structured errors include category and retryability
- scoped tool sets improve selection reliability
- MCP project scope vs user scope matters

## Domain 3: Claude Code Configuration & Workflows

### Official scenario emphasis

- code generation with Claude Code
- Claude Code for CI/CD

### Anti-patterns to surface repeatedly

- putting shared rules in user-only scope
- using direct execution for architecture-sized changes
- same-session review treated like independent review
- interactive CLI behavior in CI

### Code-sample mechanics to teach

- `CLAUDE.md` hierarchy and scoping
- commands vs skills vs path-specific rules
- `-p` for non-interactive CI execution
- structured output for CI review workflows

## Domain 4: Prompt Engineering & Structured Output

### Official scenario emphasis

- CI/CD review prompts
- structured data extraction

### Anti-patterns to surface repeatedly

- vague instructions like `make it better`
- too many few-shot examples
- assuming tool use guarantees semantic correctness
- retrying when the source lacks the needed data

### Code-sample mechanics to teach

- measurable prompt criteria
- 2 to 4 few-shot examples with at least one edge case
- `tool_choice` differences: `auto`, `any`, forced tool
- validate semantics after schema-backed extraction

## Domain 5: Context Management & Reliability

### Official scenario emphasis

- long-running support sessions
- multi-agent error propagation
- long code/research workflows

### Anti-patterns to surface repeatedly

- progressive summarization of critical details
- ignoring lost-in-the-middle effects
- sentiment-based escalation
- silent error suppression
- long sessions without scratchpad or compaction strategy

### Code-sample mechanics to teach

- immutable case-facts blocks
- structured escalation criteria
- scratchpad files and `/compact`
- provenance preserved with source and reliability context

## Teaching Rule

When a lesson uses a scenario, checkpoint, quiz, or recap:

1. name the relevant official subdomain
2. surface the likely anti-pattern
3. point out the code-sample mechanic the exam wants
