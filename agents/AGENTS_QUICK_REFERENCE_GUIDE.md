# Agents Quick Reference Guide

## What This Is

This is the fast lookup sheet for the custom agents in `agents/` (mirrored to `.git/agents/`).

Use it when you want to know:

- who to call
- what they are for
- what kind of input to give them

## Current Agents

### Dan

- File: `dan.agent.md`
- Role: Schema
- Job: data models, backend structure, relationships, constraints, migrations, access-aware rules
- Use Dan when: you need database tables, ownership, relations, validations, or backend data rules

### Ezra

- File: `ezra.agent.md`
- Role: Routing
- Job: route structure, page placement, navigation flow, area boundaries
- Use Ezra when: you need clean page structure, nav flow, or route planning

### Gabe

- File: `gabe.agent.md`
- Role: UI
- Job: screens, components, interaction behavior, interface implementation direction
- Use Gabe when: structure is approved and you need UI layout and component planning

### Josh

- File: `josh.agent.md`
- Role: Execution
- Job: implementation order, phased tickets, dependency-aware sequencing, build order
- Use Josh when: you know what to build and need the clean execution plan

### Mike

- File: `mike.agent.md`
- Role: Audit
- Job: inconsistency checks, scope creep detection, structural mistakes, drift review
- Use Mike when: you want someone to challenge the plan and find weak spots

### Mo

- File: `mo.agent.md`
- Role: Structure
- Job: product architecture, MVP boundaries, modules, phased structure, system shape
- Use Mo when: you need the product or system organized before building

### Nathan

- File: `nathan.agent.md`
- Role: Verify
- Job: compare claims to evidence, check what is proven, what is missing, what is overstated
- Use Nathan when: someone says work is done and you want proof

### Scribe

- File: `scribe.agent.md`
- Role: Documentation Control
- Job: maintain markdown docs, activity logs, trigger words, reference guides, portability docs, and written-system consistency
- Use Scribe when: you need docs updated, shorthand commands maintained, agent-package portability tightened, conflicts/drift found across markdown system files, or shared snippet placement routed into `MASTER/assets/ui`

## Fast Pick Guide

- Need schema or backend rules: `Dan`
- Need route map or navigation: `Ezra`
- Need screens and UI plan: `Gabe`
- Need build order: `Josh`
- Need an audit or stress test: `Mike`
- Need product structure or boundaries: `Mo`
- Need verification against evidence: `Nathan`
- Need markdown maintenance, doc consistency, or portable agent-package cleanup: `Scribe`
- Need a shared reusable snippet created outside a live site build: `Scribe, snippets`

## Full Sequence Vs Scoped Use

Use the full sequence when the work changes product shape, routing, backend behavior, UI behavior, or deploy risk.

- Full sequence default: `Mo -> Ezra -> Dan -> Gabe -> Josh -> Mike -> Nathan`
- Use a scoped path when the task is narrow and evidence does not require every stage

Quick route picks:

- Route placement, nav drift, or page boundaries only: `Ezra -> Mike -> Nathan`
- Backend/data rule only: `Dan -> Mike -> Nathan`
- UI implementation or UI review only: `Gabe -> Mike -> Nathan`
- Execution plan only: `Josh`, then `Mike` if risk review is needed
- Documentation/package cleanup only: `Scribe`, then `Nathan` if you need evidence verification

## Global UI System Directive

All agents now share one mandatory UI system for review, planning, rebuild, inventory, and remix work.

### Approved UI Stack

- Foundation (80%): `shadcn/ui` + `Tailwind CSS`
- Polish (15%): `Magic UI`
- Effects (5%): `Aceternity UI`
- Optional only if necessary: `HyperUI`, `Flowbite`, `DaisyUI`

### Visual Standard

- Clean
- Structured
- Professional
- Minimal
- Modern
- Production-ready

### Hard Style Rule

- No pill-shaped UI
- No `rounded-full`
- No bubble buttons
- No overly curved cards, inputs, tabs, or containers
- Prefer square, crisp, lightly rounded edges only when needed
- For multiple items, do not use random button clusters as navigation
- Use a defining stacked list or a structured accordion instead
- Navigation order must be obvious and readable at a glance

### Build Order Rule

1. Structure first
2. Polish second
3. Effects last and only lightly
4. If effects or staged assets push past the normal ratio, stop and ask: `This pushes the ratio. Do you still want to build? Yes or no?`

### Mobile Rule

- every shared build must be mobile-scalable and not awkward at small breakpoints
- if a desktop composition does not survive compression cleanly, rebuild the layout for mobile instead of forcing it smaller

### Command Meanings

- `UIO` = full UI overhaul using the approved system while preserving functionality
- `UII` = UI inventory with reusable checklist output
- `UIX` = UI extract / cross-site remix with transfer, adapt, rebuild, or reject decisions

### Shared Fail Conditions

- Pill-shaped or roundish UI
- Excessive effects
- Inconsistent components
- Visual clutter
- Copied patterns that do not fit the target system
- Polish before structure
- Design changes that break architecture, routing, backend logic, or data flow

## Good Prompt Pattern

Give the agent:

- the goal
- the governing reference
- the current state
- any constraints

Example:

```text
Mo, structure this feature using the current repo as the source of truth.
We need MVP boundaries, user roles, modules, and phased order.
```

## Important Note

These files live in:

- `agents/` (primary editable source)
- `.git/agents/` (hidden mirror, kept in sync)

See also:

- `agents/MY_WORKSPACE_GUIDE.md`
- `agents/AGENT_PACKAGE_PORTABILITY.md`
- `agents/AGENT_TRIGGER_REGISTRY.md`
- `.github/copilot-instructions.md`
