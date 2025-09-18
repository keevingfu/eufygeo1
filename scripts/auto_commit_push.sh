#!/bin/bash

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if there are changes
if [[ -n $(git status -s) ]]; then
    echo "🔍 Detected changes in the repository..."
    
    # Update CLAUDE.md
    echo "📄 Updating CLAUDE.md..."
    python scripts/update_claude_md.py
    
    # Add all changes
    git add .
    
    # Create commit message
    COMMIT_MSG="Auto-update: $(date '+%Y-%m-%d %H:%M:%S')

Changes detected and documentation updated.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    
    # Commit changes
    git commit -m "$COMMIT_MSG"
    
    # Push to remote repository
    echo "🚀 Pushing to remote repository..."
    git push origin main
    
    echo "✅ Successfully synced to GitHub!"
else
    echo "✨ No changes detected. Repository is up to date."
fi