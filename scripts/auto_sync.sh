#!/bin/bash

# Auto sync script - commits all changes and pushes to GitHub
# This will trigger Vercel deployment automatically

echo "🔄 Starting auto-sync process..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if there are changes
if [[ -z $(git status -s) ]]; then
    echo "✅ No changes detected. Repository is up to date."
    exit 0
fi

# Update CLAUDE.md
echo "📄 Updating CLAUDE.md..."
python scripts/update_claude_md.py

# Add all changes
echo "📦 Staging all changes..."
git add -A

# Create commit message with timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
COMMIT_MSG="Auto-sync: $TIMESTAMP

Changes detected and automatically synced to GitHub.
Vercel deployment will be triggered automatically.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Commit changes
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo "🚀 Pushing to GitHub (${GITHUB_REPO})..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully synced to GitHub!"
    echo "🌐 Vercel deployment triggered at: https://eufygeo1-rf8j7n52d-keevingfus-projects.vercel.app"
    echo "📊 Check deployment status at: https://vercel.com/keevingfus-projects/eufygeo1"
else
    echo "❌ Push failed. Please check your connection and try again."
    exit 1
fi