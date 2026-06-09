# Foundations Scaffold

Use this when a learner is missing a concept and needs to step back before moving forward.

## How To Use

When a learner fails a checkpoint, competency gate, or scenario question:

1. Identify the exact misconception.
2. Map it to the foundational concept below.
3. Re-teach the foundation first.
4. Then return to the scenario.

## Common Misconceptions -> Foundational Concepts

### Confuses model vs tool vs agent
- Re-teach:
  - model generates/reasons
  - tool acts
  - agent combines reasoning + tools + control flow
- Return to:
  - beginner support-agent scenario

### Uses assistant text instead of `stop_reason`
- Re-teach:
  - loop lifecycle
  - `tool_use` vs `end_turn`
- Return to:
  - Lab 1

### Uses prompts for hard business rules
- Re-teach:
  - prompt = probabilistic
  - hooks/gates = deterministic
- Return to:
  - customer support scenario

### Confuses project vs user scope
- Re-teach:
  - personal vs shared configuration
  - `CLAUDE.md` hierarchy
- Return to:
  - Lab 2

### Thinks schema validity means semantic correctness
- Re-teach:
  - syntax/shape vs meaning/business correctness
  - validation and retry boundaries
- Return to:
  - Lab 4

### Retries when the source lacks the information
- Re-teach:
  - retry only fixes retryable issues
  - absent data must be marked unavailable or escalated
- Return to:
  - extraction scenario

### Uses same-session self-review as independent review
- Re-teach:
  - reasoning contamination
  - why independent sessions catch more
- Return to:
  - CI/CD scenario

### Overloads agents with too many tools
- Re-teach:
  - scoped tool access
  - specialization and selection reliability
- Return to:
  - multi-agent research scenario
