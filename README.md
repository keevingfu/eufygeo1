# EufyGeoGem - Generative Engine Optimization Content Marketing

AI-powered content marketing platform for e-commerce operations with complete CI/CD integration.

## 🚀 Features

- **15+ Marketing Modules**: Complete marketing funnel from content creation to monetization
- **AI-Powered**: Intelligent content generation and optimization
- **Real-time Analytics**: Comprehensive tracking and attribution
- **Automated CI/CD**: Auto-sync to GitHub with documentation updates

## 📋 CI/CD Setup

### Prerequisites

1. Python 3.9+ installed
2. Git installed
3. GitHub account with repository access

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/keevingfu/eufygeo1.git
   cd eufygeo1
   ```

2. **Create `.env` file** (already included, but for reference)
   ```env
   GITHUB_TOKEN=your_github_token_here
   GITHUB_REPO=keevingfu/eufygeo1
   GITHUB_BRANCH=main
   ```

3. **Install Python dependencies** (for pipeline script)
   ```bash
   pip install pandas numpy matplotlib scikit-learn
   ```

### Automated Features

#### 🔄 Auto-sync to GitHub

Run the auto-sync script to commit and push changes:
```bash
./scripts/auto_commit_push.sh
```

This script will:
- Update CLAUDE.md automatically
- Commit all changes
- Push to GitHub repository

#### 🪝 Git Hooks

The project includes a pre-commit hook that:
- Automatically updates CLAUDE.md before each commit
- Ensures documentation stays in sync with code changes

#### 🤖 GitHub Actions

The CI/CD pipeline runs on every push to main branch:
- Updates documentation
- Validates HTML files
- Checks code quality
- Prepares for deployment

### Manual Commands

**Update CLAUDE.md manually:**
```bash
python scripts/update_claude_md.py
```

**Run local development server:**
```bash
python -m http.server 8000
```

## 🛠️ Development Workflow

1. Make your code changes
2. Test locally using the development server
3. Commit changes (pre-commit hook updates docs)
4. Push to GitHub (GitHub Actions runs CI/CD)

Or use the one-command sync:
```bash
./scripts/auto_commit_push.sh
```

## 📁 Project Structure

```
eufygeogem/
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions workflow
├── scripts/
│   ├── update_claude_md.py   # Auto-update documentation
│   └── auto_commit_push.sh   # One-command sync script
├── .git/hooks/
│   └── pre-commit           # Auto-update hook
├── *.html                   # Marketing modules
├── pipeline_demo.py         # Data processing pipeline
├── CLAUDE.md               # AI-readable documentation
├── README.md               # This file
├── .env                    # GitHub token (git-ignored)
└── .gitignore             # Git ignore rules
```

## 🔐 Security

- GitHub token is stored in `.env` file
- `.env` is excluded from version control
- Use GitHub Secrets for production workflows

## 🚦 Status

All systems operational and ready for continuous development!

---
Built with ❤️ using Claude Code