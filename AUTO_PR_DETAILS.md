# Auto PR Details GitHub Action

This GitHub Action automatically generates and posts a summary of PR changes using Claude AI.

## Features

- Triggers on PR open and when new commits are pushed
- Analyzes the PR diff using Claude 3.5 Sonnet
- Posts a summary as a comment
- Optionally updates the PR description (only when first opened)
- Handles large diffs gracefully

## Setup

### 1. Add Anthropic API Key to GitHub Secrets

1. Go to your repository's Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `ANTHROPIC_API_KEY`
4. Value: Your Anthropic API key
5. Click "Add secret"

### 2. Merge this PR

Once merged, the action will automatically run on future PRs.

## How It Works

1. When a PR is opened or updated, the action triggers
2. It fetches the diff of the PR
3. Sends the diff to Claude API with a prompt asking for a summary
4. Claude analyzes the changes and provides:
   - Brief overview
   - Key changes by area/component
   - Notable additions or removals
5. Posts the summary as a comment on the PR
6. (On PR open only) Appends the summary to the PR description

## What It Does NOT Do

- This is NOT a code review
- It doesn't provide feedback on code quality
- It doesn't suggest improvements
- It simply summarizes WHAT changed in a readable format

## Customization

You can customize the behavior by editing `.github/workflows/auto-pr-details.yml`:

- Change the Claude model (currently using `claude-3-5-sonnet-20241022`)
- Adjust the prompt to focus on different aspects
- Modify the max_tokens if you need longer/shorter summaries
- Remove the "Update PR description" step if you only want comments

## Cost Considerations

- Claude API usage is billed per token
- A typical PR summary costs a few cents
- Large PRs with many changes will cost more
- Consider the diff size limit (currently 100KB) to control costs
