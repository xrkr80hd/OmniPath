# Agent Trigger Registry

## Purpose

This is the central registry for trigger words, shorthand commands, and package-level aliases used by the agent system.

Use it to keep trigger language transportable across multiple workspaces.

## Package Rule

- Keep portable triggers here.
- If a trigger is workspace-specific, label it clearly.
- Do not duplicate trigger definitions across package docs unless a file is pointing back to this registry.
- Scribe owns consistency for this registry.

## Agent Triggers

| Trigger  | Maps To                          | Type  | Scope              | Notes                                   |
| -------- | -------------------------------- | ----- | ------------------ | --------------------------------------- |
| `Mo`     | `Moses / Structure`              | agent | portable           | Primary short trigger                   |
| `mo`     | `Moses / Structure`              | agent | portable           | Lowercase alias                         |
| `Ezra`   | `Ezra / Routing`                 | agent | portable           | Primary short trigger                   |
| `ezra`   | `Ezra / Routing`                 | agent | portable           | Lowercase alias                         |
| `Raph`   | `Ezra responsibilities`          | alias | workspace-specific | Companion alias defined in package docs |
| `Dan`    | `Dan / Schema`                   | agent | portable           | Primary short trigger                   |
| `dan`    | `Dan / Schema`                   | agent | portable           | Lowercase alias                         |
| `Gabe`   | `Gabe / UI`                      | agent | portable           | Primary short trigger                   |
| `gabe`   | `Gabe / UI`                      | agent | portable           | Lowercase alias                         |
| `Josh`   | `Josh / Execution`               | agent | portable           | Primary short trigger                   |
| `josh`   | `Josh / Execution`               | agent | portable           | Lowercase alias                         |
| `Mike`   | `Mike / Audit`                   | agent | portable           | Primary short trigger                   |
| `mike`   | `Mike / Audit`                   | agent | portable           | Lowercase alias                         |
| `Nathan` | `Nathan / Verify`                | agent | portable           | Primary short trigger                   |
| `nathan` | `Nathan / Verify`                | agent | portable           | Lowercase alias                         |
| `Nate`   | `Nathan / Verify`                | alias | portable           | Common short-name alias                 |
| `nate`   | `Nathan / Verify`                | alias | portable           | Lowercase alias                         |
| `Scribe` | `Scribe / Documentation Control` | agent | portable           | Primary short trigger                   |
| `scribe` | `Scribe / Documentation Control` | agent | portable           | Lowercase alias                         |

## Workflow Shorthand

| Trigger | Maps To              | Type     | Scope    | Notes                                              |
| ------- | -------------------- | -------- | -------- | -------------------------------------------------- |
| `NB`    | `NEW_BUILD`          | workflow | portable | Project classification shorthand                   |
| `OH`    | `SITE_OVERHAUL`      | workflow | portable | Project classification shorthand                   |
| `MOD`   | `MODIFICATION`       | workflow | portable | Project classification shorthand                   |
| `REF`   | `REFRESH`            | workflow | portable | Project classification shorthand                   |
| `BE`    | `BACKEND REQUIRED`   | workflow | portable | Backend flag shorthand                             |
| `UIO`   | `UI overhaul`        | workflow | portable | Full UI overhaul using the approved system         |
| `UII`   | `UI inventory`       | workflow | portable | Reusable UI inventory checklist                    |
| `UIX`   | `UI extract / remix` | workflow | portable | Transfer, adapt, rebuild, or reject pattern review |

## Local Testing Shorthand

| Trigger   | Maps To                         | Type     | Scope              | Notes                       |
| --------- | ------------------------------- | -------- | ------------------ | --------------------------- |
| `TOFTON`  | `Turn local testing bypass on`  | workflow | workspace-specific | Local admin bypass workflow |
| `TOFTOFF` | `Turn local testing bypass off` | workflow | workspace-specific | Local admin bypass workflow |

## Change Rule

- Update this file before spreading new trigger words into other docs.
- If a trigger conflicts with an existing meaning, stop and resolve the conflict before reuse.
- When packaging for another workspace, review workspace-specific triggers before carrying them over unchanged.

## Shared UI Snippet Routing

- Trigger: `Scribe, snippets`
- Lowercase alias: `scribe, snippets`
- Workflow phrase: `commit it to assets`
- Confirmation phrase: `this pushes the ratio`
- In this workspace, `Scribe, snippets` means shared snippet work belongs in `MASTER/assets/ui`.
- In this workspace, `commit it to assets` means categorize the asset in the shared catalogue and add an HTML showcase preview when the asset is visually previewable.
- In this workspace, `this pushes the ratio` means the proposed build is moving past the default restrained-effect baseline and must pause for an explicit yes-or-no confirmation before continuing.
- Do not place portable snippet assets inside `YourLocal_xrkr80hdstudio` or other live site builds unless the task is explicit app implementation rather than snippet-library work.
- The screenshot-matched training-index accordion pattern is named `accordion 2` and lives in `MASTER/assets/ui/templates/accordion-2.*`.
