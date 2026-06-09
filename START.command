#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

node scripts/start-or-resume.js .
printf "\nPress Enter to close..."
read -r _
