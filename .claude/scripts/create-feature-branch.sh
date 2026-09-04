#!/bin/bash

# Create feature and phase branches for specs
# Usage: create-feature-branch.sh "spec-id" "phase-description" [phase-number]
# Example: create-feature-branch.sh "001-rsvp" "types-and-utilities"
#          create-feature-branch.sh "001-rsvp" "hooks" 2

set -e

SPEC_ID="${1:?Spec ID required (e.g., 001-rsvp)}"
PHASE_DESC="${2:?Phase description required (e.g., types-and-utilities)}"
PHASE_NUM="${3:-1}"

FEATURE_BRANCH="feature/spec-${SPEC_ID}"
PHASE_BRANCH="spec-${SPEC_ID}/phase-${PHASE_NUM}-${PHASE_DESC}"

echo "📦 Setting up branches for spec-${SPEC_ID}..."

# Create/switch to feature branch
if git rev-parse --verify "$FEATURE_BRANCH" > /dev/null 2>&1; then
  echo "✓ Feature branch already exists: $FEATURE_BRANCH"
  git checkout "$FEATURE_BRANCH"
else
  echo "Creating feature branch: $FEATURE_BRANCH"
  git checkout -b "$FEATURE_BRANCH"
  git push -u origin "$FEATURE_BRANCH" 2>/dev/null || echo "  (local branch, not pushed yet)"
fi

# Create phase branch
if git rev-parse --verify "$PHASE_BRANCH" > /dev/null 2>&1; then
  echo "✓ Phase branch already exists: $PHASE_BRANCH"
  git checkout "$PHASE_BRANCH"
else
  echo "Creating phase branch: $PHASE_BRANCH"
  git checkout -b "$PHASE_BRANCH"
  git push -u origin "$PHASE_BRANCH" 2>/dev/null || echo "  (local branch, not pushed yet)"
fi

echo ""
echo "✨ Ready to work!"
echo "Current branch: $(git branch --show-current)"
echo ""
echo "When done with this phase, commit and create a PR:"
echo "  git push"
echo "  gh pr create --base feature/spec-${SPEC_ID} --fill"
