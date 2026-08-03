#!/usr/bin/env bash
# Builds the site and publishes dist/ to the gh-pages branch via a git worktree.
# No external deploy package required - just git.
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build

WORKTREE_DIR=".gh-pages-worktree"
rm -rf "$WORKTREE_DIR"

if git show-ref --verify --quiet refs/heads/gh-pages; then
  git worktree add "$WORKTREE_DIR" gh-pages
else
  git worktree add --orphan -b gh-pages "$WORKTREE_DIR"
fi

find "$WORKTREE_DIR" -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
cp -r dist/. "$WORKTREE_DIR"/
find "$WORKTREE_DIR" -name '._*' -delete
touch "$WORKTREE_DIR"/.nojekyll

cd "$WORKTREE_DIR"
git add -A
git commit -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)" --allow-empty
git push origin gh-pages
cd ..
git worktree remove "$WORKTREE_DIR" --force
