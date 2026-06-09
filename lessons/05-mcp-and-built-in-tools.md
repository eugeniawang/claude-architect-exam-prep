### Session 5 — MCP & Built-in Tools

**Domain 2.4, 2.5 · Principle P3 · Nemeses: The Secret-Spiller, The Bash Bludgeon**

---

#### Overview
You open a repo. There's an `.mcp.json` with a GitHub token hardcoded in it, committed six months ago. That's The Secret-Spiller. This session covers two things that share one principle (P3): where MCP config belongs (which file, and why), and which built-in tool to use for each file task — Grep, Glob, Read, Write, Edit are not interchangeable.

---

#### Skill Built
Configure MCP servers correctly for project vs personal scope, keep secrets out of version control using `${ENV_VAR}` expansion, and select the right built-in tool for each file operation.

---

#### Prerequisites / Foundations
- MCP servers are external processes that expose tools to Claude Code. They're discovered via config files at startup.
- Basic familiarity with environment variables and `.gitignore`.

---

#### Do This First
Check whether any MCP config on your machine has a hardcoded credential. Look for `"token":`, `"api_key":`, or `"secret":` in `.mcp.json` and `~/.claude.json`. If you find anything, you've found The Secret-Spiller's work. Note what you found — don't commit the output anywhere.

---

#### What Just Happened
Two config files, two scopes:

- `.mcp.json` at the project root is **project-level**. It's committed to version control and shared with the whole team.
- `~/.claude.json` is **user-level**. It's personal — lives only on your machine, never in version control.

`${ENV_VAR}` syntax in `.mcp.json` tells Claude Code to pull the value from your shell environment at runtime. The string `${GITHUB_TOKEN}` is safe to commit. The actual token is not. This isn't optional hygiene — it's the only correct way to handle credentials in a shared config file.

---

#### Guided Practice
**Exercise 5a — Fix the Secret-Spiller.** A `.mcp.json` has `"GITHUB_TOKEN": "ghp_abc123supersecrettoken"`. Replace the value with `"GITHUB_TOKEN": "${GITHUB_TOKEN}"`. Make sure the variable is set in your shell environment (via `.env`, shell profile, or secrets manager). Add `.env` to `.gitignore`.

**Exercise 5b — Pick the right built-in.** For each task, name the correct tool and explain why:
1. Find all files named `*.test.tsx` in the repository. → **Glob** — matching file paths by pattern.
2. Find every file that calls `useAuthContext`. → **Grep** — searching file *contents* for a string.
3. Make a targeted three-line change to a known function in a known file. → **Edit** — only the diff goes through.
4. Read an entire 200-line config file you've never seen before. → **Read** — you need the full content.

---

#### Explain It Back
Why does it matter whether an MCP config is project-level or user-level?

- Project-level (`.mcp.json`) is committed — every developer who clones the repo gets the same MCP tooling automatically. Team-standard integrations belong here.
- User-level (`~/.claude.json`) is personal — experimental servers, personal tokens. It never touches version control.
- Secrets hardcoded in project-level config get committed to permanent history and must be rotated with a new commit every time. `${ENV_VAR}` keeps the config shareable and the secret out of git.
- The second Secret-Spiller trap: team tools in personal scope, or personal tokens in project scope. Both break things for someone.

---

#### Pattern / Anti-pattern
**Good pattern:** `.mcp.json` committed at project root with all credential values as `${ENV_VAR}` references. The actual values live in CI secrets, developer `.env` files, or a secrets manager. MCP resources (issue catalogs, schemas) declared here too — lets the agent see a content catalog without burning tool calls on exploration.

**Nemesis: The Secret-Spiller**

Hardcodes a token "just for now." The config gets committed Friday. It sits in git history for 18 months. It gets rotated after an incident. Then the new token gets hardcoded. Violates **P7 — preserve provenance and uncertainty**: a committed secret is extremely hard to expunge from git history. `${ENV_VAR}` is not optional — it's the mechanism that keeps config shareable without permanently encoding secrets.

**Nemesis: The Bash Bludgeon**

Reaches for a shell command whenever a built-in exists. Uses `find . -name "*.tsx" | xargs grep useAuthContext` instead of Grep — because why not? Three reasons why not: (1) the built-in runs with model context and knows which files are relevant; (2) the shell pipeline pulls raw bytes into the conversation, burning context; (3) when the pipeline silently fails, the model can't tell. Explore incrementally: Grep entry points → Read to follow imports → Edit to change. Never `cat` the whole repo. Violates **P3** — using the wrong mechanism for a problem that has a cheaper, purpose-built solution.

---

#### Scenario Check
> A team's `.mcp.json` is committed to version control. It configures a GitHub MCP server. Which setup is correct?
>
> **A.** `"GITHUB_TOKEN": "ghp_live_abc123"` — hardcoded so every developer's session works without extra setup.
> **B.** `"GITHUB_TOKEN": "${GITHUB_TOKEN}"` — expanded from the environment at runtime; each developer sets the variable locally; CI injects from secrets.
> **C.** Move the GitHub MCP server config to `~/.claude.json` so the token never touches the repo.
> **D.** Use the Bash built-in to call the GitHub CLI directly; skip MCP for team workflows.

**Correct answer: B.** Config stays in the project (shared, versioned, consistent) and the secret stays in the environment (not versioned, rotatable without a commit). A commits a live credential to permanent history. C moves team tooling to personal scope — every developer has to configure it manually with no consistency guarantee. D pulls raw shell output into context and gives up MCP's structured tool interface.

**Pass bar: 72%**

---

#### Apply / Transfer
In `MY_SYSTEM.md`, add an **MCP Config** section: list project-level servers and their required env vars, note your secrets injection method, and list any MCP resources exposed. Add a **Built-in Tool Selection** table: task type · correct tool · why not Bash.

---

#### Review Hooks
- Check every `.mcp.json` you own for hardcoded credentials. Fix anything that turns up.
- Can you distinguish `.mcp.json` from `~/.claude.json` in one sentence each?
- For each file operation in your agent: is it using the right built-in rather than a Bash equivalent?
- Does your `.mcp.json` declare MCP resources? Could any exploratory tool calls be replaced by a resource catalog?

---

---

