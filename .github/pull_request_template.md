# GitHub Copilot Pull Request Instructions

## Pull Request Title Formatting
* You MUST format the PR title using the Conventional Commits specification.
* Use the structure: `feat(<scope>): <short description>`
* Lowercase the scope and description.
* Do not add a period at the end of the title string.
* Valid types include: feat, fix, docs, style, refactor, perf, test, build, ci, chore, or revert.

## Pull Request Description Formatting
* Analyze the code modifications and commit changes in this branch to generate the description body.
* Do not include the PR template itself in the generated output text.
* Populate the fields using the structural template provided below.

### Description Body Template
## Summary of Changes
- [Brief bullet points summarizing what structural or logical changes were committed]

## Context & Intent
- [Provide technical context derived from the commits regarding why this was built]

## Impacted Modules
- [List specific files or modules affected by the changes]
