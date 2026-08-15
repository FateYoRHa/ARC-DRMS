---
name: pr-generation
description: "Use when: preparing a pull request, writing a PR title, summarizing branch changes, or generating a PR description from the actual git diff. Helps review the current branch changes and produce a compliant conventional-commit title and template-based summary without inventing unsupported claims."
---

# Pull Request Generation

## When to use

- Drafting or updating a pull request description
- Summarizing the branch diff for reviewers
- Writing a conventional commit-style PR title
- Validating that the PR matches the repo's template and standards

## Workflow

1. Read the repository PR template in `.github/pull_request_template.md`.
2. Review the complete git diff against the target branch.
3. Identify the primary purpose of the branch and the main affected modules.
4. Decide the most accurate conventional commit type:
   - `feat` for new functionality
   - `fix` for bug fixes
   - `docs` for documentation-only work
   - `refactor` for structural or cleanup changes
   - `perf`, `test`, `build`, `ci`, `chore`, or `revert` when applicable
5. Write a concise PR title in the required format, preferably `type(scope): description`.
6. Draft the description using the repository template sections:
   - Summary of Changes
   - Context & Intent
   - Impacted Modules
7. Keep all claims aligned to the actual diff and modified files.
8. Preserve required headings, formatting, and template structure.
9. Do not add extra sections or unsupported details.
10. If no tests were run, state that explicitly instead of implying test coverage.

## Decision points

- If the branch adds a feature or user-facing capability, prefer `feat`.
- If the branch resolves a bug or regression, prefer `fix`.
- If the diff is documentation-only, prefer `docs`.
- If the work is primarily internal restructuring, prefer `refactor` unless a more specific type fits.
- If the change touches multiple areas, keep the title focused on the primary purpose rather than every implementation detail.
- If a claim is not present in the diff, do not include it in the PR summary.

## Completion checks

- The PR title follows Conventional Commits formatting.
- The description matches the required template structure.
- Summary and intent are grounded in actual changes.
- Impacted modules are listed accurately.
- No fabricated issue references, deployment changes, or test claims are included.
- No section is removed or altered beyond the project template.

## Example prompts

- "Draft a PR title and description for this branch based on the current diff."
- "Summarize the actual changes in this branch and write a compliant PR body."
- "Review the git changes and produce a conventional commit PR title with a brief description."
- "Prepare a PR using the repo template and avoid claiming tests that were not run."

## Related customizations

- A repository-level instruction file for PR generation already exists in `.github/copilot-instructions.md`.
- This skill can be extended later into a larger release workflow, code review checklist, or change-validation skill.
