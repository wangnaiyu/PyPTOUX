---
name: pyptoux-git-github
description: Use this skill when working inside the PyPTOUX repository and you need to create branches, stage and commit changes, push to GitHub, create pull requests, or clean up local and remote Git state with project-specific defaults.
---

# PyPTOUX Git & GitHub Workflow

Use this skill for Git and GitHub publishing tasks inside the PyPTOUX repository.

## What To Read First

- Read [references/workflow.md](references/workflow.md) for the default project workflow.
- Read [references/pr-template.md](references/pr-template.md) for the preferred PR structure.

## Core Workflow

1. Confirm the working directory is the PyPTOUX repo.
2. Check repository state with:
   - `git status -sb`
   - `git remote -v`
   - `git branch --show-current`
3. Before GitHub operations that require auth, verify `gh auth status`.
4. Branch strategy:
   - If currently on `main`, create a new working branch.
   - Prefer `codex-<short-description>` when slash-style branch names are inconvenient in the environment.
5. Stage only intended changes.
6. Commit tersely with a message that describes the repo-scoped change.
7. Push with upstream tracking.
8. PR creation:
   - Prefer `gh pr create` when available.
   - If a GitHub connector works, it may be used, but `gh` is the reliable fallback.
   - If the connector reports permission issues such as `must be a collaborator`, switch to `gh` rather than retrying the connector.
9. After PR merge:
   - switch back to `main`
   - pull latest `origin/main`
   - delete the merged local branch
   - `git fetch --prune`

## Default Decisions

- Prefer draft PRs unless the user clearly wants a ready-for-review PR.
- Prefer small, task-focused branches instead of reusing old branches.
- Do not store tokens, device codes, or sensitive credential details in repo files.
- Treat `gh auth status` as the source of truth for whether CLI-based PR creation is available.

## Safety Rules

- Do not stage unrelated work silently.
- Do not force-push unless the user explicitly asks.
- Do not delete branches before confirming the work is merged or no longer needed.
- If local and remote branch state diverge unexpectedly, inspect before acting.

## References

- Workflow details: [references/workflow.md](references/workflow.md)
- PR template: [references/pr-template.md](references/pr-template.md)
