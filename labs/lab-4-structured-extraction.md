# Lab 4: Structured Extraction Reliability

## Official Mapping

- d4.3
- d4.4
- d5.4

## Scenario

An invoice extractor returns valid structured output. But:

- `date` is malformed
- `total` is negative
- `purchase_order_number` is absent from the source

## Learner Task

1. Separate structural correctness from semantic correctness.
2. Decide which issues call for validation + retry.
3. Decide which issue should be marked unavailable.
4. Explain one tempting but wrong answer.

## Pass Criteria

- knows schema != semantic correctness
- retries only retryable issues
- absent source data is not treated as retryable
