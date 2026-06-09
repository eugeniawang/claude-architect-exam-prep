# Competency Checks

These checks are scenario-based gates. They are the main mastery checks for the course.

## Design Principles

- Prefer scenario judgment over recall.
- Check whether the learner can choose the best next action.
- Reuse patterns across weeks so skills layer instead of resetting.
- Treat a correct explanation without correct scenario judgment as partial mastery only.

## Week 1 Competency Checks

### C1: Support Loop Safety
- Scenario: A support resolution agent keeps looping because the developer is parsing text like `I'm done` instead of inspecting the API signal.
- Learner must:
  - identify the failure
  - name `stop_reason`
  - choose `tool_use` vs `end_turn`
  - explain why text parsing is an anti-pattern
- Skills built:
  - d1.1
  - d5.1

### C2: Tool Description Rescue
- Scenario: Two MCP tools overlap and Claude keeps choosing the wrong one.
- Learner must:
  - diagnose the overlap
  - improve the description
  - name one edge case or boundary condition
- Skills built:
  - d2.1
  - d2.3

## Week 2 Competency Checks

### C3: Claude Code Team Setup
- Scenario: A new teammate opens the project and misses key instructions.
- Learner must:
  - place instructions in the correct config layer
  - decide whether a rule belongs in `CLAUDE.md`, a command, or a skill
  - explain precedence simply
- Skills built:
  - d3.1
  - d3.2

### C4: Plan or Execute
- Scenario: Claude is asked to update a large repo-wide workflow with unclear blast radius.
- Learner must:
  - choose plan mode or direct execution
  - justify the choice
  - propose one iterative refinement tactic
- Skills built:
  - d3.3
  - d5.3

## Week 3 Competency Checks

### C5: CI Review Prompt Upgrade
- Scenario: A CI review agent produces too many false positives and devs are ignoring it.
- Learner must:
  - rewrite the prompt with explicit criteria
  - explain why vague instructions fail
  - add one few-shot example idea
- Skills built:
  - d4.1
  - d4.2

### C6: Extraction Reliability Decision
- Scenario: Extraction output matches schema but totals are wrong and one field is missing from the source.
- Learner must:
  - identify semantic vs structural correctness
  - choose validation and retry only where appropriate
  - explain how uncertainty should be represented
- Skills built:
  - d4.3
  - d4.4
  - d5.4

## Week 4 Competency Checks

### C7: Multi-Agent Research Routing
- Scenario: A coordinator sends full context to every subagent and quality drops.
- Learner must:
  - diagnose context pollution
  - propose explicit scoped context
  - explain why limited tool sets help
- Skills built:
  - d1.2
  - d2.3
  - d5.1

### C8: Mock Exam Recovery
- Scenario: The learner misses multiple questions across CI/CD, structured extraction, and escalation.
- Learner must:
  - identify the deeper misconception pattern
  - choose the next repair drill
  - explain why the tempting distractor was wrong
- Skills built:
  - mixed-domain transfer

## Pass Standard

Treat a competency check as passed only if the learner can:

- choose the correct action
- explain why at least one distractor is wrong
- connect the answer back to the official domain concept
