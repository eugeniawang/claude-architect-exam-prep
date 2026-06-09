#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || process.cwd());

const learnerRoot = path.join(root, "learner");
const templatesRoot = path.join(root, "templates");
const claudeRoot = path.join(root, ".claude");

const learnerTemplateMap = [
  ["learner-profile.md", "learner-profile.md"],
  ["progress-log.md", "progress-log.md"],
  ["quiz-results.md", "quiz-results.md"],
  ["learning-log.md", "learning-log.md"],
  ["session-notes.md", "session-notes.md"],
  ["mock-exam-results.md", "mock-exam-results.md"],
  ["feedback-log.md", "feedback-log.md"],
];

const domainFiles = [
  "domain-1-notes.md",
  "domain-2-notes.md",
  "domain-3-notes.md",
  "domain-4-notes.md",
  "domain-5-notes.md",
];

const domainHeadings = {
  "domain-1-notes.md": [
    "# Domain 1 Notes",
    "",
    "## d1.1 Agentic Loops & Core API",
    "",
    "## d1.2 Multi-Agent Orchestration",
    "",
    "## d1.3 Hooks & Programmatic Enforcement",
    "",
    "## d1.4 Session Management & Workflows",
    "",
  ].join("\n"),
  "domain-2-notes.md": [
    "# Domain 2 Notes",
    "",
    "## d2.1 Tool Description Best Practices",
    "",
    "## d2.2 Structured Error Responses",
    "",
    "## d2.3 Tool Distribution & Selection",
    "",
    "## d2.4 MCP Server Configuration",
    "",
    "## d2.5 Built-in Tools",
    "",
  ].join("\n"),
  "domain-3-notes.md": [
    "# Domain 3 Notes",
    "",
    "## d3.1 `CLAUDE.md` Scope and Hierarchy",
    "",
    "## d3.2 Skills, Commands, and Reuse",
    "",
    "## d3.3 Workflows, Plan Mode, and Iteration",
    "",
    "## d3.4 CI/CD Integration and Batch Processing",
    "",
  ].join("\n"),
  "domain-4-notes.md": [
    "# Domain 4 Notes",
    "",
    "## d4.1 Explicit Criteria and Instruction Design",
    "",
    "## d4.2 Few-Shot Prompting and Example Choice",
    "",
    "## d4.3 Tool Use for Structured Output",
    "",
    "## d4.4 Validation-Retry Loops and Multi-Pass Review",
    "",
  ].join("\n"),
  "domain-5-notes.md": [
    "# Domain 5 Notes",
    "",
    "## d5.1 Context Optimization and Positioning",
    "",
    "## d5.2 Escalation and Error Propagation",
    "",
    "## d5.3 Context Degradation and Extended Sessions",
    "",
    "## d5.4 Human Review and Information Provenance",
    "",
  ].join("\n"),
};

const blankConfig = {
  student_name: "",
  start_date: "",
  target_exam: "Claude Certified Architect - Foundations",
};

const blankProgress = {
  current_week: "",
  current_session: "",
  current_mode: "",
  completion_status: "not-started",
  course_completed: false,
  course_completed_at: "",
  course_completion_basis: "",
  completed_sessions: [],
  completed_gates: [],
  due_reviews: [],
  weak_domains: [],
  last_completed_item: "",
  last_updated: "",
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readTemplate(name) {
  return fs.readFileSync(path.join(templatesRoot, name), "utf8");
}

function writeFile(relPath, content) {
  const dest = path.join(root, relPath);
  ensureDir(path.dirname(dest));
  fs.writeFileSync(dest, content.endsWith("\n") ? content : `${content}\n`);
}

function main() {
  ensureDir(learnerRoot);
  ensureDir(claudeRoot);

  for (const [destName, templateName] of learnerTemplateMap) {
    writeFile(path.join("learner", destName), readTemplate(templateName));
  }

  for (const domainFile of domainFiles) {
    writeFile(path.join("learner", domainFile), domainHeadings[domainFile]);
  }

  writeFile(
    path.join(".claude", "cca-course-config.json"),
    JSON.stringify(blankConfig, null, 2)
  );

  writeFile(
    path.join(".claude", "cca-course-progress.json"),
    JSON.stringify(blankProgress, null, 2)
  );

  console.log("COURSE STATE RESET");
  console.log(`Root: ${root}`);
  console.log("Reset: learner files, course config, course progress");
  console.log("Scope: project-only");
}

try {
  main();
} catch (error) {
  console.error("COURSE STATE RESET FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
