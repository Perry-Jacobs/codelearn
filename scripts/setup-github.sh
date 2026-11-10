#!/usr/bin/env bash
#
# One-time GitHub bootstrap for CodeLearn.
#
# Usage:
#   ./scripts/setup-github.sh [repo-name] [public|private]
#
# Examples:
#   ./scripts/setup-github.sh codelearn public
#   ./scripts/setup-github.sh codelearn private
#
# Requires the GitHub CLI:
#   https://cli.github.com/
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

REPO_NAME="${1:-codelearn}"
VISIBILITY="${2:-public}"

if [[ "$VISIBILITY" != "public" && "$VISIBILITY" != "private" ]]; then
  echo "Error: visibility must be 'public' or 'private'." >&2
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is required." >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: the GitHub CLI (gh) is required." >&2
  echo "Install it from https://cli.github.com/ then run: gh auth login" >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Error: GitHub CLI is not authenticated." >&2
  echo "Run: gh auth login" >&2
  exit 1
fi

if [[ ! -d .git ]]; then
  echo "==> Initializing git repository"
  git init -b main
fi

echo "==> Staging files"
git add .

if ! git diff --cached --quiet; then
  echo "==> Creating commit"
  git commit -m "Initial commit"
else
  echo "==> Nothing new to commit"
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "==> Pushing to existing origin"
  git push -u origin HEAD
else
  echo "==> Creating GitHub repository '$REPO_NAME' and pushing"
  gh repo create "$REPO_NAME" "--$VISIBILITY" --source=. --remote=origin --push
fi

echo
echo "Done. Next:"
echo "  1. Add the Cloudflare secrets to the repository:"
echo "       gh secret set CLOUDFLARE_API_TOKEN"
echo "       gh secret set CLOUDFLARE_ACCOUNT_ID"
echo "  2. Push to main; .github/workflows/deploy-cloudflare.yml deploys the site."
