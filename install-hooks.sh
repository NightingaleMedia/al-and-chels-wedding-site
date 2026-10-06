#!/bin/bash
# Install git hooks for auto-generating PR summaries with GitHub Copilot

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GIT_DIR="$(git rev-parse --git-dir)"
HOOKS_DIR="$GIT_DIR/hooks"

echo "Installing PR auto-summary git hooks..."
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check for gh CLI
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is required but not installed."
    echo "   Install it from: https://cli.github.com/"
    exit 1
fi
echo "✓ GitHub CLI found"

# Check for gh copilot
if ! gh copilot -- --version &> /dev/null; then
    echo "⚠️  GitHub Copilot CLI is not installed."
    echo "   Installing it now..."
    gh copilot
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install GitHub Copilot CLI"
        exit 1
    fi
fi
echo "✓ GitHub Copilot CLI found"

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI."
    echo "   Run: gh auth login"
    exit 1
fi
echo "✓ GitHub CLI authenticated"

echo ""
echo "Installing hooks..."

# Create hooks directory if it doesn't exist
mkdir -p "$HOOKS_DIR"

# Install post-push hook
if [ -f "$HOOKS_DIR/post-push" ]; then
    echo "⚠️  post-push hook already exists, creating backup..."
    cp "$HOOKS_DIR/post-push" "$HOOKS_DIR/post-push.backup.$(date +%s)"
fi

cp "$SCRIPT_DIR/.github/hooks/post-push" "$HOOKS_DIR/post-push"
chmod +x "$HOOKS_DIR/post-push"
echo "✓ Installed post-push hook"

# Install prepare-commit-msg hook (optional)
if [ -f "$HOOKS_DIR/prepare-commit-msg" ]; then
    echo "⚠️  prepare-commit-msg hook already exists, creating backup..."
    cp "$HOOKS_DIR/prepare-commit-msg" "$HOOKS_DIR/prepare-commit-msg.backup.$(date +%s)"
fi

cp "$SCRIPT_DIR/.github/hooks/prepare-commit-msg" "$HOOKS_DIR/prepare-commit-msg"
chmod +x "$HOOKS_DIR/prepare-commit-msg"
echo "✓ Installed prepare-commit-msg hook (bonus: AI commit messages!)"

echo ""
echo "✅ Installation complete!"
echo ""
echo "How it works:"
echo "  1. Make changes and push to a branch"
echo "  2. Create a PR with: gh pr create"
echo "  3. On subsequent pushes, the hook auto-updates the PR description"
echo ""
echo "Bonus: Your commit messages will now get AI suggestions!"
echo ""
echo "To test it:"
echo "  git push"
echo ""
