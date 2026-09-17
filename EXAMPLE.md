# Example Usage

## Scenario: Adding a new feature

### 1. Create a feature branch and make changes

```bash
git checkout -b feature/add-rsvp-form
# ... make your changes ...
git add .
git commit  # Hook will suggest: "feat: add RSVP form component with validation"
```

### 2. Push and create a PR

```bash
git push -u origin feature/add-rsvp-form
gh pr create --title "Add RSVP Form" --body "Adding RSVP functionality"
```

### 3. Make more changes

```bash
# ... fix bugs, add tests ...
git add .
git commit  # Hook suggests: "test: add RSVP form validation tests"
git push    # Post-push hook auto-updates the PR description!
```

### 4. What the PR looks like

```markdown
Adding RSVP functionality

<!-- AUTO-GENERATED-SUMMARY -->
## 🤖 Auto-Generated Summary

### Overview
This PR introduces a new RSVP form component with client-side validation,
allowing guests to confirm attendance and dietary preferences.

### Key Changes

**Frontend Components**
- Added `RSVPForm.tsx` with form validation
- Created `GuestSelector` component for party member selection
- Implemented form state management with React hooks

**Validation**
- Added Zod schema for RSVP data validation
- Client-side validation for email and guest count
- Error messaging for invalid inputs

**Styling**
- New responsive form layouts
- Mobile-friendly design for RSVP submission
- Toast notifications for submission feedback

### Impact
- Enables guests to RSVP directly through the website
- Reduces manual email coordination
- Provides structured RSVP data for planning

---
*Last updated: 2024-01-15 18:30:45 UTC*
<!-- /AUTO-GENERATED-SUMMARY -->
```

## Customization Example

### Adding RAG Context

Edit `.github/hooks/post-push` to include project-specific context:

```bash
# Read your component guidelines
GUIDELINES=$(cat docs/COMPONENT_GUIDELINES.md)

# Enhanced prompt
read -r -d '' PROMPT << EOM
You are analyzing a wedding website project. Here are our component guidelines:

$GUIDELINES

Now analyze this PR following our conventions:

Files changed:
$FILES_CHANGED

Diff:
\`\`\`
$DIFF
\`\`\`

Provide a summary that highlights:
1. Which components were modified and why
2. How this fits our architecture
3. Any deviations from our guidelines
EOM
```

### Custom Summary Format

You can customize the markdown output structure:

```bash
# In the PROMPT variable
read -r -d '' PROMPT << EOM
Create a PR summary with this exact format:

## 📦 What's in this PR
[2-3 sentence overview]

## 🎯 Changes by Category
- **UI/UX**: [changes]
- **Logic**: [changes]
- **Tests**: [changes]

## ⚡ Performance Impact
[performance notes]

## 🧪 Testing
[what was tested]

Diff: ...
EOM
```

## MCP Tool Integration (Advanced)

If you want to use GitHub MCP tools directly in your hooks:

```bash
# Example: Automatically link related issues
RELATED_ISSUES=$(gh copilot -p "Find issues related to: $FILES_CHANGED" \
  --allow-tool 'github(search_issues)')

# Include in PR summary
echo "Related issues: $RELATED_ISSUES" >> summary.txt
```

## Workflow Tips

### For Large PRs

The hook automatically limits diff to 10000 characters. For large PRs, it focuses on file changes:

```bash
# The hook intelligently handles this:
if [ ${#DIFF} -gt 10000 ]; then
    # Use file list instead of full diff
    PROMPT="... Files changed: $FILES_CHANGED ..."
fi
```

### Team Conventions

You can enforce team conventions in the prompt:

```bash
PROMPT="Our team uses these PR description conventions:
- Start with ticket number (e.g., [WED-123])
- Include screenshots for UI changes
- List breaking changes under ## Breaking Changes

Analyze this diff and create a PR summary following our conventions..."
```

### Skip Auto-Summary for Specific PRs

Add this to the post-push hook:

```bash
# Check if PR has a skip flag
if gh pr view "$PR_NUMBER" --json labels --jq '.labels[].name' | grep -q "skip-auto-summary"; then
    echo "Skipping auto-summary (label: skip-auto-summary)"
    exit 0
fi
```

Then label PRs you want to skip:

```bash
gh pr edit 123 --add-label "skip-auto-summary"
```
