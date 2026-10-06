# Auto PR Details with GitHub Copilot

Automatically generates and updates PR descriptions using **GitHub Copilot CLI with MCP** - a fully GitHub-native solution!

## ✨ Features

- 🤖 Uses GitHub Copilot CLI (no external AI APIs needed!)
- 🔄 Auto-updates PR description on every push
- 📝 Bonus: AI-generated commit messages
- 🎯 Customizable prompts and RAG context
- 🆓 Included with your GitHub Copilot subscription
- 🔒 Fully GitHub-native (no external services)

## 🚀 Quick Start

### Prerequisites

1. **GitHub Copilot subscription** (Individual, Business, or Enterprise)
2. **GitHub CLI** installed: https://cli.github.com/
3. Authenticated with `gh auth login`

### Installation

Run the installation script in your repository:

```bash
./install-hooks.sh
```

That's it! The hooks are now installed.

## 📖 How It Works

### Post-Push Hook (PR Summary Generation)

1. You push changes to a branch that has a PR
2. The `post-push` hook automatically triggers
3. It uses `gh copilot` to analyze the diff
4. Updates the PR description with a structured summary
5. Uses HTML comments to track and update the same section

### Prepare-Commit-Msg Hook (Bonus!)

1. You stage changes with `git add`
2. Run `git commit` (without `-m`)
3. The hook generates a suggested commit message
4. You can edit or accept it in your editor

## 🎨 Customization

### Customize the PR Summary Prompt

Edit `.github/hooks/post-push` and modify the `PROMPT` variable to customize what information you want in your PR summaries:

```bash
# Example: Focus on architectural changes
PROMPT="Analyze this PR focusing on:
1. Architectural decisions
2. Breaking changes
3. Migration steps needed
..."
```

### Add RAG Context

You can enhance the prompts with repository-specific context:

```bash
# Read your architecture docs
ARCH_CONTEXT=$(cat docs/ARCHITECTURE.md)

# Include in prompt
PROMPT="Given this architecture:
$ARCH_CONTEXT

Analyze the PR and explain how it fits into the architecture..."
```

### Using MCP Tools Directly

The GitHub Copilot CLI supports MCP tools. You can allow specific tools:

```bash
gh copilot -p "Summarize PR #123" --allow-tool 'github(get_pull_request)'
```

## 🔧 Configuration

### Disable Specific Hooks

If you only want PR summaries (not commit messages):

```bash
rm .git/hooks/prepare-commit-msg
```

If you only want commit messages (not PR summaries):

```bash
rm .git/hooks/post-push
```

### Manual PR Update

You can also manually update a PR anytime:

```bash
# From your branch
git push && echo "PR updated!"
```

Or create a custom alias:

```bash
git config alias.push-and-summarize '!git push && .git/hooks/post-push'
git push-and-summarize
```

## 📋 What It Does

- ✅ Summarizes WHAT changed in the PR
- ✅ Organizes changes by component/area
- ✅ Explains the impact of changes
- ✅ Updates automatically on each push
- ✅ Preserves manual edits outside the auto-generated section

## ❌ What It Does NOT Do

- This is NOT a code review
- It doesn't critique code quality
- It doesn't suggest improvements
- It simply summarizes changes in a readable format

## 💡 Advanced Usage

### Custom Instructions Per PR

You can set custom instructions for specific PRs by adding them to the PR body before the first push:

```markdown
<!-- CUSTOM-INSTRUCTIONS
Focus on database migration steps and API contract changes
-->

Your manual PR description here...
```

The hook can be modified to read these instructions and include them in the prompt.

## 🆚 Comparison to GitHub Actions Approach

| Feature | Git Hooks (This) | GitHub Actions |
|---------|-----------------|----------------|
| External API | ❌ No (GitHub native) | ✅ Yes (requires Anthropic/OpenAI) |
| Cost | Included with Copilot | Pay per API call |
| Setup | Run one script | Configure secrets |
| Triggers | Every push | PR events only |
| Customization | Edit hook scripts | Edit workflow YAML |
| Offline | ❌ No (needs GitHub CLI) | ❌ No (needs Actions) |

## 🐛 Troubleshooting

### Hook doesn't run

```bash
# Check if hooks are executable
ls -la .git/hooks/post-push
# Should show -rwxr-xr-x

# If not, make executable:
chmod +x .git/hooks/post-push
```

### Copilot CLI not found

```bash
# Test gh copilot
gh copilot -- --version

# If not installed:
gh copilot  # This will install it
```

### Not authenticated

```bash
gh auth status
# If not logged in:
gh auth login
```

## 📚 Learn More

- [GitHub Copilot CLI Documentation](https://gh.io/copilot-cli)
- [MCP (Model Context Protocol)](https://github.com/github/github-mcp-server)
- [GitHub CLI](https://cli.github.com/manual/)
