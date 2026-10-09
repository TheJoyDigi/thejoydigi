#!/bin/sh
# Vercel Ignored Build Step (vercel.json ignoreCommand): exit 0 skips the build, exit 1 builds.

if [ "$VERCEL_ENV" != "production" ]; then
  echo "skip: preview builds are off (build cost)"
  exit 0
fi

base="$VERCEL_GIT_PREVIOUS_SHA"
if [ -z "$base" ] || ! git cat-file -e "$base^{commit}" 2>/dev/null; then
  echo "build: no previous deploy commit to diff against"
  exit 1
fi

# Paths the site never reads at build time; mirror any new site input dirs out of this list.
if git diff --quiet "$base" HEAD -- . ':(exclude)video/' ':(exclude)podcast/' ':(exclude)docs/' ':(exclude).github/' ':(exclude).claude/' ':(top,glob,exclude)*.md'; then
  echo "skip: only video/, podcast/, docs/ or root Markdown changed since $base"
  exit 0
fi

echo "build: site files changed since $base"
exit 1
