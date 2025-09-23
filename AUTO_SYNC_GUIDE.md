# Auto-Sync to GitHub & Vercel Guide

This project is configured to automatically sync to GitHub and trigger Vercel deployments.

## 🚀 How It Works

1. **Git Hooks** (Automatic)
   - **Pre-commit**: Updates CLAUDE.md automatically before each commit
   - **Post-commit**: Pushes to GitHub automatically after each commit

2. **Vercel Integration** (Automatic)
   - Vercel is connected to your GitHub repository
   - Every push to `main` branch triggers automatic deployment
   - Deployment URL: https://eufygeo1-rf8j7n52d-keevingfus-projects.vercel.app

## 📝 Usage

### Option 1: Regular Git Commands (Recommended)
```bash
# Make your changes, then:
git add .
git commit -m "Your commit message"
# Auto-push happens automatically via post-commit hook
```

### Option 2: One-Command Sync
```bash
# This script stages, commits, and pushes all changes
./scripts/auto_sync.sh
```

### Option 3: Manual Push (if hooks are disabled)
```bash
./scripts/auto_commit_push.sh
```

## 🔧 Configuration

### Environment Variables (.env)
```
GITHUB_TOKEN=your_github_token
GITHUB_REPO=keevingfu/eufygeo1
GITHUB_BRANCH=main
```

### Disable Auto-Push (if needed)
```bash
# Temporarily disable post-commit hook
mv .git/hooks/post-commit .git/hooks/post-commit.disabled

# Re-enable it
mv .git/hooks/post-commit.disabled .git/hooks/post-commit
```

## 📊 Monitoring

- **GitHub Repository**: https://github.com/keevingfu/eufygeo1
- **Vercel Dashboard**: https://vercel.com/keevingfus-projects/eufygeo1
- **Live Site**: https://eufygeo1-rf8j7n52d-keevingfus-projects.vercel.app

## 🔍 Troubleshooting

1. **Push fails**: Check your GitHub token in `.env`
2. **Vercel not deploying**: Check Vercel dashboard for build logs
3. **Hooks not working**: Ensure hooks have execute permission (`chmod +x .git/hooks/*`)

## 🎯 Best Practices

1. Commit frequently with meaningful messages
2. Test locally before committing
3. Monitor Vercel deployment status after pushing
4. Keep `.env` file secure and never commit it