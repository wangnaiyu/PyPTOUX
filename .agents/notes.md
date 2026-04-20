# PyPTOUX Notes

- Project name: `PyPTOUX`
- Local repository: `/Users/wny/Documents/1 项目 Projects/PyPTOUX`
- GitHub repository: `git@github.com:wangnaiyu/PyPTOUX.git`
- Default branch: `main`

## Git guidance

- When asked to operate on `PyPTOUX`, first confirm the working directory matches the local repository path above.
- Before `pull` or `push`, verify `origin` still points to the GitHub repository above.
- If the user later defines a commit message convention, record it here.
- GitHub CLI `gh` is installed on this machine.
- Before GitHub operations that depend on authentication, verify login with `gh auth status`.
- If the GitHub connector cannot create a PR or reports permission issues, prefer falling back to `gh`.

## Content routing guidance

- Primary routing rules live in `docs/conventions/content-routing.md`.
- Project skill lives in `.agents/skills/pyptoux-content-router/SKILL.md`.
- When creating new content, prefer canonical names and existing topic folders over inventing new structures.
- When introducing a new topic or shared framework, update the relevant file under `docs/indexes/`.
- In PyPTOUX, prefer Chinese for new written content by default; keep English mainly for directory names, stable filenames, code identifiers, and necessary technical labels.

## GitHub workflow guidance

- Project Git/GitHub workflow skill lives in `.agents/skills/pyptoux-git-github/SKILL.md`.
- Use project-specific Git/GitHub workflow guidance instead of mixing publish rules into the content router skill.
