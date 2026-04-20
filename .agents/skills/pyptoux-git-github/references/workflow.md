# Workflow

## Default Publish Path

1. Inspect repo state
2. Create a short-lived working branch from `main`
3. Stage intended files only
4. Commit with a concise message
5. Push with upstream tracking
6. Create a PR with `gh pr create`
7. Merge through GitHub
8. Clean local branch state

## Preferred Commands

- Check auth:
  - `gh auth status`
- Create branch:
  - `git switch -c codex-<short-description>`
- Push:
  - `git push -u origin <branch>`
- Create PR:
  - `gh pr create --draft`
- Cleanup after merge:
  - `git switch main`
  - `git pull origin main`
  - `git branch -d <branch>`
  - `git fetch --prune`

## Notes

- The GitHub connector may fail on PR creation even for user-owned repos if the app installation lacks write permissions.
- In that case, prefer `gh` instead of retrying the connector path.
