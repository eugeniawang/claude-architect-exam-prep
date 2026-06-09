# MY_SYSTEM — the system I'm the architect for

> This is your running example. Every session applies its principle to *this*. By Session 12 the
> bottom section becomes your one-page **architecture brief** — and your night-before-the-exam revision sheet.
> No real system of your own? Use the default — *a customer-support agent that looks up orders and
> issues refunds* — and make it concrete.

## Snapshot (from onboarding)
- **What it does (one line):**
- **Who/what it talks to (tools, MCP servers, other agents):**
- **Where it's slow, flaky, or scary today:**
- **One recent moment it did something wrong:**

## What each session taught me about my system
_(the instructor adds a line per session — concept → how it applies to my system)_
- **S0 — Prime Directive:** one place I "ask the model harder" where I should enforce in code: ____
- **S1 — Loops/`stop_reason`:**
- **S2 — Multi-agent/context:**
- **S3 — Hooks/enforcement:**
- **S4 — Tools/errors:**
- **S5 — MCP/built-ins:**
- **S6 — Claude Code config:**
- **S7 — Plan/CI-CD/batch:**
- **S8 — Criteria/few-shot:**
- **S9 — Structured output/retry:**
- **S10 — Context/reliability:**
- **S11 — Escalation/propagation/provenance:**

---

## 🏛 Architecture Brief (assembled at the capstone)
- **Loop control:** how it stops (`stop_reason`), which stop reasons it handles —
- **Enforcement:** which rules are hooks/gates (not prompts) and why —
- **Tools & MCP:** tool-set size, descriptions, error shape, `.mcp.json` scope & secrets —
- **Config:** CLAUDE.md hierarchy, commands vs skills vs rules, plan vs direct —
- **Prompting & output:** explicit criteria, few-shot, schema, validation-retry —
- **Context & reliability:** case-facts, lost-in-the-middle, escalation triggers, provenance —
- **Top 3 risks today + the systems fix for each:**
  1.
  2.
  3.
- **One change I'll propose to my team on Monday:**
