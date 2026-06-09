---
name: define
description: |
  Define a term in beginner-friendly language. Use when the learner types /define.
allowed-tools:
  - Read
  - Edit
---

# Define

## Read First

- `course/GLOSSARY.md` only.

## Required Flow

1. If no term given, ask once.
2. Check `course/GLOSSARY.md`.
   - **Found:** return glossary definition verbatim · exact exam token · which of the 7 principles it serves · analogy if helpful.
   - **Missing:** define in plain English from model knowledge · name the principle and domain · add to `course/GLOSSARY.md` (no duplicates). Only load `course/SOURCE.md` if the learner explicitly asks for verbatim official exam wording.
3. If exam-relevant, name the domain or scenario it appears in.
