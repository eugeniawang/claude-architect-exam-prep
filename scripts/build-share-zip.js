#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const sourceRoot = path.resolve(process.argv[2] || process.cwd());
const distRoot = path.join(sourceRoot, "dist");
const shareFolder = path.join(distRoot, "cca-f-course-share");
const zipPath = path.join(distRoot, "cca-f-course-share.zip");

function runNode(args, cwd) {
  return cp.execFileSync("node", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function runZip(args, cwd) {
  return cp.execFileSync("zip", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function ensureZipAvailable() {
  try {
    cp.execFileSync("zip", ["-v"], { stdio: "ignore" });
  } catch {
    throw new Error("zip command not available");
  }
}

function main() {
  ensureZipAvailable();

  runNode(["scripts/build-share-package.js", "."], sourceRoot);

  fs.rmSync(zipPath, { force: true });
  runZip(["-qr", zipPath, "cca-f-course-share"], distRoot);

  console.log("CCA-F SHARE ZIP BUILT");
  console.log(`Source: ${sourceRoot}`);
  console.log(`Share folder: ${shareFolder}`);
  console.log(`Zip: ${zipPath}`);
  console.log("Verified in build: clean share package created before zip");
}

try {
  main();
} catch (error) {
  console.error("CCA-F SHARE ZIP BUILD FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
