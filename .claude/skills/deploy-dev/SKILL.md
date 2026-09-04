---
name: deploy-dev
description: Automatically discovers deployment configurations in the project root and executes the appropriate deployment commands.
model: haiku
---

# Deploy to Dev

When the user invokes `/deploy-dev`:

1. Look for `scripts/agent-deploy.json` in the project root.
   - If missing, check for `package.json`, `poetry.lock`, or `Makefile` and offer to create an `agent-deploy.json`:
     ```json
     {
       "project_name": "example-app",
       "engine": "bash",
       "command": "npm run build && npm run deploy"
     }
     ```
2. Reject commands containing `sudo`, `rm -rf /`, or `curl | sh`. Otherwise run without prompting.
3. Execute the `command` from the project root and stream output.
