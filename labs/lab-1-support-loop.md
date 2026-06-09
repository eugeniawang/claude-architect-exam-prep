# Lab 1: Support Loop Safety

## Official Mapping

- d1.1
- d5.1

## Scenario

A support agent loops until assistant text contains `done` or `task complete`. It sometimes exits too early and sometimes never stops.

## Learner Task

1. State the root problem.
2. Name the correct control signal.
3. Explain the correct loop lifecycle.
4. Name one distractor pattern that could fool someone here.

## Pass Criteria

- uses `stop_reason`
- distinguishes `tool_use` from `end_turn`
- rejects natural-language termination
