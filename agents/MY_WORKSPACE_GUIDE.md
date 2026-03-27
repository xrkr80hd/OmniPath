# My Workspace Guide

## What This Is

This is the super simple guide for using the workspace agents.

Think of it like this:

- Copilot = the main helper
- Agents = specialist helpers
- Quick reference = fast lookup sheet

## Where Things Are

- Agent files are maintained in `agents/` and mirrored to `.git/agents/`
- Fast lookup sheet is `AGENTS_QUICK_REFERENCE_GUIDE.md`
- Activity log is `AGENT_ACTIVITY_LOG.md`

## What Each Agent Does

- `Mo` = structure the product
- `Ezra` = map routes and navigation
- `Gabe` = plan UI and components
- `Dan` = define data and backend rules
- `Josh` = sequence implementation order
- `Mike` = audit weak spots and clutter
- `Nathan` = verify claims against evidence
- `Scribe` = maintain docs, trigger words, logs, and package portability

## Portable Package Rule

- `agents/` is the editable source of truth
- `.git/agents/` is the synced transport mirror
- portable rules go in the package docs inside `agents/`
- workspace-specific exceptions must be labeled clearly before reuse in another workspace

See:

- `AGENT_PACKAGE_PORTABILITY.md`
- `AGENT_TRIGGER_REGISTRY.md`

## The UI System

All agents now use the same UI system:

- `shadcn/ui` + `Tailwind CSS` for the main build
- `Magic UI` for light polish
- `Aceternity UI` for rare effects only

Simple rule:

- structure first
- polish second
- effects last

## Important Style Rule

Do not use soft bubble UI.

That means:

- no pill buttons
- no `rounded-full`
- no extra-round cards or inputs

Use:

- square
- crisp
- clean
- lightly rounded only if needed

## Quick Commands

### `UIO`

Means:

Overhaul this UI using the approved system.

### `UII`

Means:

Inventory this site or page and break it into reusable parts.

### `UIX`

Means:

Compare one site to another and decide what to transplant, adapt, rebuild, or reject.

## How To Ask For Help

Use this pattern:

```text
[Agent Name], [task].
Governing reference: [file / repo / prompt]
Current state: [what exists now]
Constraints: [limits or rules]
```

## Easy Examples

```text
Mo, structure this feature.
Governing reference: current repo
Current state: homepage and shop exist, dashboard does not
Constraints: MVP only
```

```text
Gabe, UIO this dashboard.
Governing reference: current repo
Current state: layout works but UI is inconsistent
Constraints: keep functionality, use shadcn and Tailwind
```

```text
Mike, UII this site.
Governing reference: current repo
Current state: old marketing pages and mixed styling
Constraints: flag clutter and pill UI
```

## If You Are Not Sure Who To Use

Start here:

- need structure: `Mo`
- need routes: `Ezra`
- need UI: `Gabe`
- need schema: `Dan`
- need order: `Josh`
- need critique: `Mike`
- need proof: `Nathan`

## Simplest Way To Think About It

1. `Mo` decides the shape
2. `Ezra` decides where things live
3. `Dan` decides the data rules
4. `Gabe` decides the interface
5. `Josh` decides build order
6. `Mike` checks for bad decisions
7. `Nathan` checks what is actually true
