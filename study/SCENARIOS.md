# Scenario Practice Guide

This file expands the six official exam scenarios into guided practice material.

## Scenario 1: Customer Support Resolution Agent

- Primary domains: 1, 2, 5
- Beginner skill focus:
  - tool ordering
  - deterministic enforcement
  - escalation triggers
  - structured handoff summaries
- Common traps:
  - escalating on sentiment alone
  - using prompt wording instead of hooks for hard business rules
  - generic error handling
- Practice prompts:
  - Which tool should run first, and why?
  - What must be enforced programmatically?
  - When should the system escalate to a human?
  - What should the human handoff include?

## Scenario 2: Code Generation with Claude Code

- Primary domains: 3, 5
- Beginner skill focus:
  - `CLAUDE.md` hierarchy
  - skills vs commands vs always-loaded rules
  - plan mode vs direct execution
  - iterative refinement
- Common traps:
  - putting team rules in user-only memory
  - using direct execution for architecture-sized changes
  - relying on vague requests without examples
- Practice prompts:
  - What belongs in project `CLAUDE.md`?
  - When is a skill better than a memory file?
  - When should plan mode be used?
  - How would you improve a weak implementation request?

## Scenario 3: Multi-Agent Research System

- Primary domains: 1, 2, 5
- Beginner skill focus:
  - coordinator/subagent roles
  - explicit context passing
  - scoped tools
  - provenance
- Common traps:
  - assuming subagents inherit context
  - routing every task through every subagent
  - passing raw verbose content instead of structured findings
- Practice prompts:
  - What should the coordinator do?
  - What context must be passed explicitly?
  - Why should subagents have limited tools?
  - How do you preserve source attribution?

## Scenario 4: Developer Productivity with Claude

- Primary domains: 2, 3, 1
- Beginner skill focus:
  - Read/Grep/Glob/Bash selection
  - incremental codebase exploration
  - MCP vs built-in tools
  - task decomposition
- Common traps:
  - reading too much too early
  - choosing the wrong tool for search vs file matching
  - giving one agent too many tools
- Practice prompts:
  - When should Grep be used instead of Glob?
  - How should a codebase be explored incrementally?
  - When is an MCP tool preferable to a built-in tool?
  - How would you decompose a large review?

## Scenario 5: Claude Code for Continuous Integration

- Primary domains: 3, 4
- Beginner skill focus:
  - `-p` print mode
  - structured output in CI
  - independent review instances
  - review specificity
- Common traps:
  - interactive mode in automation
  - vague review prompts
  - reviewing code in the same reasoning session that produced it
- Practice prompts:
  - Why use `-p` in CI?
  - Why use `--output-format json` with schema?
  - Why is an independent review instance stronger?
  - What instructions should live in `CLAUDE.md` for better CI output?

## Scenario 6: Structured Data Extraction

- Primary domains: 4, 5
- Beginner skill focus:
  - schema-backed tool use
  - semantic validation
  - retry-with-feedback
  - provenance and uncertainty
- Common traps:
  - trusting valid JSON without checking meaning
  - retrying when data is absent
  - forcing required values when the source is unclear
- Practice prompts:
  - Why is tool use with schema more reliable?
  - What semantic checks still remain?
  - When does retry help?
  - How should uncertainty be represented?
