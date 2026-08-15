## Pull Request Generation

When creating a pull request:

### Required workflow

1. Read `.github/pull_request_template.md`.
2. Review the complete git diff against the target branch.
3. Identify the primary purpose of the changes.
4. Generate a concise PR title following the repository's conventional naming style.
5. Generate the PR description using `.github/pull_request_template.md`.
6. Populate sections using only information supported by the actual changes.
7. Preserve all headings, formatting, and checklists from the template.
8. Do not create additional sections unless explicitly requested.
9. Do not remove existing template sections.
10. Do not claim tests were run unless they were actually run.

### PR Title

The PR title must:

- Clearly describe the primary change.
- Prefer conventional commit-style prefixes when the repository uses them.
- Use imperative wording where appropriate.
- Avoid vague titles such as `updates`, `fix stuff`, or `changes`.
- Avoid including implementation details that are irrelevant to reviewers.

### PR Description

The PR description must:

- Follow `.github/pull_request_template.md`.
- Summarize what changed and why.
- Mention relevant backend, frontend, database, API, or infrastructure changes when applicable.
- Explicitly identify testing performed.
- Accurately reflect the actual diff.
- Never fabricate functionality, tests, issue references, or deployment changes.