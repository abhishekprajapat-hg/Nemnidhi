#!/usr/bin/env bash
# Git-clone-and-swap deploy for the Nemnidhi website production site.
#
# Clones the latest main into a temp directory, builds it there, and only
# swaps it into place if the build succeeds - production is never touched by
# a failed build. Run this directly on the VPS as the `nemnidhi` user.
#
# Until this script existed, this app had no deploy pipeline at all: it was
# put on the box once by hand-copying files, with no .git directory, so a
# code change (even a merged PR) never actually reached production without
# someone manually cloning, building and swapping the directory in by hand.
set -euo pipefail

APP_DIR="/home/nemnidhi/apps/nemnidhi"
TMP_DIR="/home/nemnidhi/apps/nemnidhi-deploy-$(date +%Y%m%d%H%M%S)"
BACKUP_DIR="/home/nemnidhi/apps/nemnidhi-backup-$(date +%Y%m%d%H%M%S)"

echo "==> Cloning latest main into $TMP_DIR"
git clone --depth 1 --branch main https://github.com/abhishekprajapat-hg/Nemnidhi.git "$TMP_DIR"

echo "==> Copying env file"
cp "$APP_DIR/.env" "$TMP_DIR/.env"

cd "$TMP_DIR"
echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building (production is untouched until this succeeds)"
npm run build

echo "==> Build succeeded - swapping into place"
mv "$APP_DIR" "$BACKUP_DIR"
mv "$TMP_DIR" "$APP_DIR"

echo "==> Restarting PM2"
pm2 restart nemnidhi-website --update-env
pm2 save

echo "==> Health check"
HEALTH_URL="https://nemnidhi.com/"
HEALTH_MAX_WAIT=60
HEALTH_POLL_INTERVAL=5
elapsed=0
# Same pattern as Vega's deploy-via-git.sh: poll with retry rather than a
# fixed sleep, so a slow-but-successful boot doesn't look like a failed
# deploy.
until curl --fail --show-error --silent --max-time 10 "$HEALTH_URL" > /dev/null; do
  elapsed=$((elapsed + HEALTH_POLL_INTERVAL))
  if [ "$elapsed" -ge "$HEALTH_MAX_WAIT" ]; then
    echo
    echo "Health check did not pass within ${HEALTH_MAX_WAIT}s - last response:"
    curl --show-error --silent --max-time 10 "$HEALTH_URL" || true
    exit 1
  fi
  echo "   ...not ready yet (${elapsed}s elapsed), retrying in ${HEALTH_POLL_INTERVAL}s"
  sleep "$HEALTH_POLL_INTERVAL"
done
echo
echo "==> Health check passed after ${elapsed}s"
echo "==> Deploy complete. Previous release backed up at: $BACKUP_DIR"
