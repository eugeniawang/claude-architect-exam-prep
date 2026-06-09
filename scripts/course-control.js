#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || process.cwd());

function readJson(relPath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
  } catch {
    return {};
  }
}

function hasNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function main() {
  const config = readJson(".claude/cca-course-config.json");
  const progress = readJson(".claude/cca-course-progress.json");
  const totalLessons = 12;

  const learnerName = hasNonEmptyString(config.student_name) ? config.student_name.trim() : "Not set";
  const week = hasNonEmptyString(progress.current_week) ? progress.current_week.trim() : "Not set";
  const session = hasNonEmptyString(progress.current_session) ? progress.current_session.trim() : "Not set";
  const mode = hasNonEmptyString(progress.current_mode) ? progress.current_mode.trim() : "Not set";
  const completionStatus = hasNonEmptyString(progress.completion_status) ? progress.completion_status.trim() : "not-started";
  const completedSessions = Array.isArray(progress.completed_sessions) ? progress.completed_sessions.length : 0;
  const remainingSessions = Math.max(totalLessons - completedSessions, 0);
  const dueReviews = Array.isArray(progress.due_reviews) ? progress.due_reviews.length : 0;
  const weakDomains = Array.isArray(progress.weak_domains) ? progress.weak_domains : [];
  const completedAt = hasNonEmptyString(progress.course_completed_at) ? progress.course_completed_at.trim() : "";

  const freshState =
    !hasNonEmptyString(config.student_name) &&
    !hasNonEmptyString(progress.current_week) &&
    completedSessions === 0;

  console.log("CCA-F COURSE CONTROLS");
  console.log(`Root: ${root}`);
  console.log(`Learner: ${learnerName}`);
  console.log(`Current week: ${week}`);
  console.log(`Current session: ${session}`);
  console.log(`Mode: ${mode}`);
  console.log(`Completion: ${completionStatus}${completedAt ? ` (${completedAt})` : ""}`);
  console.log(`Completed lessons: ${completedSessions}/${totalLessons}`);
  console.log(`Lessons remaining: ${remainingSessions}`);
  console.log(`Due reviews: ${dueReviews}`);
  console.log(`Weak domains: ${weakDomains.length ? weakDomains.join(", ") : "None logged"}`);
  console.log("");

  if (progress.course_completed === true) {
    console.log("State: Course completed");
    console.log("Next in Claude Code:");
    console.log("  1. /progress");
    console.log("  2. /quiz-me");
    console.log("  3. /mock-exam");
  } else if (freshState) {
    console.log("State: Fresh or reset");
    console.log("Next in Claude Code:");
    console.log("  1. type: start");
    console.log("  2. or type: help");
    console.log("  3. or use: /start-course");
  } else {
    console.log("State: In progress");
    console.log("Next in Claude Code:");
    console.log("  1. type: continue");
    console.log("  2. or type: help");
    console.log("  3. or use: /resume-course");
  }

  console.log("");
  console.log("Available now:");
  console.log("  /help");
  console.log("  /course-menu");
  console.log("  /progress");
  console.log("  /daily-review");
  console.log("  /define");
  console.log("  /quiz-me");
  console.log("  /scenario-drill");
  console.log("  /weak-areas");
  console.log("  /practice-exam");
  console.log("  /mock-exam");
  console.log("");
  console.log("Maintenance:");
  console.log("  node scripts/validate-course.js .");
  console.log("  node scripts/reset-course-state.js .");
}

try {
  main();
} catch (error) {
  console.error("COURSE CONTROL FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
