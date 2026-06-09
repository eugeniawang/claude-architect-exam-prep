#!/usr/bin/env node
// Status line for "Architect on Call" (CCA-F). PROJECT-LOCAL ONLY.
// Wired via this project's .claude/settings.local.json — it never touches global settings.
// Shows the real stuff (lesson position · sessions done · cumulative active time · readiness)
// and then a rotating, deadpan quip that calls the learner by name and uses their fun facts.

const fs = require("fs");
const path = require("path");

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return null; }
}
function fmtTime(mins) {
  const m = Math.max(0, Math.round(Number(mins) || 0));
  const h = Math.floor(m / 60), r = m % 60;
  return h > 0 ? `${h}h ${String(r).padStart(2, "0")}m` : `${r}m`;
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const cwd = process.cwd();
const progress = readJson(path.join(cwd, "progress.json"));
const user = readJson(path.join(cwd, "user.json")) || {};

// Claude Code pipes session context (incl. the model) to the status line on stdin.
let cc = {};
try { cc = JSON.parse(fs.readFileSync(0, "utf8")); } catch { cc = {}; }
const model = (cc.model && (cc.model.display_name || cc.model.id)) || null;
const onOpus = model && /opus/i.test(String(model));

// ---- pre-setup ----
if (!progress) {
  process.stdout.write(
    pick([
      "Architect on Call  |  not set up yet  |  say \"Start\" — the nemeses won't wait",
      "Architect on Call  |  no learner found  |  say \"Start\" and tell me a fun fact",
    ])
  );
  return;
}

const sessions = Array.isArray(progress.sessions) ? progress.sessions : [];
const teaching = sessions.filter((s) => s.id >= 1);
const total = teaching.length || 12;
const done = teaching.filter((s) => s.status === "completed").length;
const cur = progress.current_session;
const curLabel = cur === 0 ? "Onboarding" : cur != null ? `S${cur}/${total}` : "—";
const mins = (progress.time_tracking && progress.time_tracking.total_active_minutes) || 0;
const running = progress.time_tracking && progress.time_tracking.current_timer && progress.time_tracking.current_timer.running;
const r = (progress.readiness && typeof progress.readiness.percent === "number") ? progress.readiness.percent : 0;

const name = (user.name && String(user.name).trim()) || "Architect";
const facts = Array.isArray(user.fun_facts) ? user.fun_facts.filter(Boolean) : [];
const fact = facts.length ? String(pick(facts)) : null;

// ---- the factual segment (this is the bit you actually need) ----
const info = [
  `Architect on Call · ${name}`,
  curLabel,
  `✓${done}/${total}`,
  `⏱ ${fmtTime(mins)}${running ? "▮" : ""}`,
  `ready ${r}%`,
  model ? `🤖 ${model}` : null,
].filter(Boolean).join("  |  ");

// ---- the quip pool (deadpan; some conditioned on state) ----
const quips = [
  "Padding the timeline.", // a fond callback
  "Currently asking the model harder. It is not working.",
  "Somewhere a prompt is cosplaying as a hook. Shameful.",
  "stop_reason: 'procrastination'. Not a real value. Back in.",
  "Glob finds files, Grep finds content, you find excuses.",
  "Reminder: you cannot fine-tune your way out. It's out of scope.",
  "The exam is not, sadly, graded on vibes.",
  "18 tools on one agent is a cry for help, not an architecture.",
  "Live look at your context window: lost in the middle.",
];
if (done === 0) quips.push(`Day one, ${name}. The Hoarder doesn't know you're coming.`);
if (done >= 1 && done < total / 2) quips.push(`${done} nemeses down. ${name}, the Text Whisperer is nervous.`);
if (done >= total / 2 && done < total) quips.push(`Halfway, ${name}. The Sentiment-Based Escalator has gone quiet.`);
if (cur === total) quips.push("One session left. Try not to peak too early.");
if (mins >= 180) quips.push(`${name}, ${fmtTime(mins)} logged. Touch grass after the gate.`);
if (r >= 72) quips.push(`Readiness ${r}%. ${name}, you're allowed to book the exam now.`);
if (r > 0 && r < 50) quips.push(`Readiness ${r}%. We do not panic. We re-derive from first principles.`);
if (fact) {
  quips.push(`"${fact}"? Bold thing to tell a status bar, ${name}.`);
  quips.push(`${name} — ${fact} — and yet here we are, dodging distractors.`);
}

quips.push("Psst — this course runs fine on Sonnet. Save the Opus for prod.");
if (onOpus) quips.push(`${name}, you're on ${model}. Sonnet handles this course happily — switch with /model.`);

process.stdout.write(`${info}   —   ${pick(quips)}`);
