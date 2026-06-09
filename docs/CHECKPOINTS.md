# Checkpoint Bank

## Scoring Rules

- Session quiz pass target: 6/8
- Weekly gate pass target: 75%
- On failure: explain again -> guided retry -> targeted review

## Lesson Checkpoints

### W1-S1-L1
- Prompt: A teammate says, "Claude is the same thing as an agent." In beginner language, correct them using a simple support-agent example.
- Success criteria:
  - model generates language/reasoning
  - tool does a specific action
  - agent uses model plus tools to complete a task

### W1-S2-L1
- Prompt: A support agent keeps looping forever because the developer watches the assistant text instead of the API signal. What should they check instead, and why?
- Success criteria:
  - `tool_use` means tool call needed
  - `end_turn` means loop can stop

### W1-S3-L1
- Prompt: Two tools both say `gets data from the system`. In a developer productivity scenario, what risk does that create and how would you fix it?
- Success criteria:
  - helps tool selection
  - clarifies inputs/outputs
  - reduces overlap/confusion

### W2-S1-L1
- Prompt: A new teammate does not receive the team's test-review rules. Which Claude Code config layer was probably used incorrectly, and what should change?
- Success criteria:
  - shared team instruction
  - version-controlled project behavior

### W2-S2-L1
- Prompt: Your team wants a reusable mock-exam starter that learners invoke on demand. Should this be a skill/command or always-loaded guidance, and why?
- Success criteria:
  - skill is on-demand task workflow
  - `CLAUDE.md` is always loaded project guidance

### W2-S3-L1
- Prompt: A learner asks Claude to redesign a repo-wide workflow touching dozens of files. Should Claude plan first or execute directly, and why?
- Success criteria:
  - larger or ambiguous changes
  - multiple valid approaches
  - architectural impact

### W3-S1-L1
- Prompt: In a CI/CD review scenario, rewrite `be conservative` into a measurable criterion that reduces false positives.
- Success criteria:
  - names what to flag
  - names what to ignore
  - avoids vague confidence language

### W3-S2-L1
- Prompt: In a structured extraction workflow, why is tool use with schema safer than asking Claude to `return valid JSON`?
- Success criteria:
  - more reliable schema compliance
  - avoids syntax errors
  - still may need semantic validation

### W3-S3-L1
- Prompt: A document extractor returns structurally valid output, but the total is wrong and one field is absent from the source. Which part should be retried, and which part should not?
- Success criteria:
  - helps with format/structural mistakes
  - does not help when information is absent

## Session Quizzes

Each session ends with 8 questions:

- 2 short warm-up questions
- 4 scenario judgment questions
- 2 anti-pattern spotting questions

Question mix requirements:

- map to session domains
- include one rationale tied to the Foundations Guide
- include one wrong-answer explanation for each missed question
- include one "why this distractor is tempting" explanation for at least 2 missed questions
- default to "best next action" or tradeoff framing whenever possible

## Weekly Gates

### Week 1 Gate
- 12 questions
- Topics:
  - beginner vocabulary
  - agentic loops
  - tool descriptions
  - MCP basics
  - structured errors
- Format:
  - one simplified support scenario
  - one simplified developer productivity scenario

### Week 2 Gate
- 12 questions
- Topics:
  - `CLAUDE.md` hierarchy
  - skills and slash commands
  - path-specific rules
  - plan mode vs direct execution
  - iterative refinement
- Format:
  - one Claude Code team setup scenario
  - one repo-change planning scenario

### Week 3 Gate
- 12 questions
- Topics:
  - explicit criteria
  - few-shot examples
  - JSON schemas
  - validation and retry
  - reliability and provenance
- Format:
  - one CI/CD review scenario
  - one structured extraction scenario

### Final Gate
- 24 questions
- Coverage:
  - all 5 domains
  - all 6 official scenarios
- at least 6 anti-pattern traps
- at least 6 tradeoff-judgment questions
- at least 4 "best next action" questions
- should feel like exam decisions, not flashcards

## Logging Schema

After each session quiz or gate, capture:

- `date`
- `session`
- `score`
- `weak_domains`
- `missed_concepts`
- `retry_status`
- `recommended_next_action`

## Mastery Signals

Use these signals before treating a topic as stable:

- learner can explain it without jargon
- learner can map it to the official exam term
- learner can choose the right pattern in a scenario
- learner can reject the most tempting anti-pattern
