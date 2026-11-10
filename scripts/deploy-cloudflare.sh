#!/usr/bin/env bash
#
# Build and deploy CodeLearn to Cloudflare Pages.
#
# Usage:
#   export CLOUDFLARE_API_TOKEN="..."
#   export CLOUDFLARE_ACCOUNT_ID="..."
#   ./scripts/deploy-cloudflare.sh
#
# Optional overrides:
#   CLOUDFLARE_PAGES_PROJECT="codelearn"
#   CLOUDFLARE_PAGES_BRANCH="main"
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PROJECT_NAME="${CLOUDFLARE_PAGES_PROJECT:-codelearn}"
BRANCH="${CLOUDFLARE_PAGES_BRANCH:-main}"
WRANGLER="npx --yes wrangler@latest"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required. Install Node 20.19+ or 22.12+." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required." >&2
  exit 1
fi

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  cat >&2 <<'EOF'
Error: CLOUDFLARE_API_TOKEN is not set.

Create a token at:
  https://dash.cloudflare.com/profile/api-tokens

Use the "Edit Cloudflare Workers" template, or create a custom token with:
  Account > Cloudflare Pages > Edit

Then export it:
  export CLOUDFLARE_API_TOKEN="your-token"
EOF
  exit 1
fi

if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  cat >&2 <<'EOF'
Error: CLOUDFLARE_ACCOUNT_ID is not set.

Find it in the Cloudflare dashboard URL, or run:
  npx wrangler whoami

Then export it:
  export CLOUDFLARE_ACCOUNT_ID="your-account-id"
EOF
  exit 1
fi

echo "==> Installing dependencies"
if [[ ! -d node_modules ]]; then
  npm ci
else
  echo "node_modules already present; skipping npm ci"
fi

echo "==> Linting"
npm run lint

echo "==> Building"
npm run build

if [[ ! -f dist/index.html ]]; then
  echo "Error: dist/index.html was not created. The build failed." >&2
  exit 1
fi

if [[ ! -f dist/_redirects ]]; then
  echo "Error: dist/_redirects is missing. SPA routes will break on refresh." >&2
  exit 1
fi

echo "==> Ensuring Cloudflare Pages project '$PROJECT_NAME' exists"
# Safe to re-run: an existing project makes this command fail, which is fine.
$WRANGLER pages project create "$PROJECT_NAME" --production-branch "$BRANCH" >/dev/null 2>&1 || true

echo "==> Deploying dist/ to Cloudflare Pages"
$WRANGLER pages deploy dist --project-name "$PROJECT_NAME" --branch "$BRANCH"

echo
echo "Done. The deployment URL is printed above."
