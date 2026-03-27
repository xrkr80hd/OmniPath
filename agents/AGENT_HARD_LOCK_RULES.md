# Agent Hard Lock Rules

## Purpose

This file stores non-negotiable interface and presentation locks that must be treated as hard rules, not optional style suggestions.

Use this file when a visual or interaction rule must stay stable across prompts, builds, reviews, and rebuilds.

## Scope

- portable unless a rule is labeled workspace-specific
- applies alongside `agents/AGENT_PERMISSIONS_ACTIONS_ONE_SHEET.md`
- UI work should treat these as hard constraints

## Current Hard Locks

### Shape And Surface

- no round pills
- no `rounded-full`
- no soft bubble UI
- use square, defined, clean, professional boxes only

### Mobile Menu Rule

- mobile menu items must live inside a hamburger menu

### Mobile Scaling Rule

- all shared builds must scale cleanly to mobile
- do not simply shrink desktop layouts until they become cramped or awkward
- stacked, reflowed, or breakpoint-specific layout changes are required when needed for readability and tap comfort
- text, controls, cards, drawers, and media areas must remain readable and usable on small screens

### Multi-Item Menu Rule

- do not scatter multiple pill boxes across the interface
- if there is more than one menu item or grouped option, use an accordion pattern instead
- for admin or multi-menu screens, prefer a stackable list accordion broken into clear categories

### Accordion Presentation Rule

- show a category title above the accordion
- the accordion header keeps the same color when expanded
- accordion items inside should use a lighter or brighter background than the header
- item text must use the opposite or a strongly contrasting color for visibility and readability

### Effect Ratio Confirmation Rule

- default builds may keep controlled shadows, overlays, and subtle depth
- if a proposed build uses staged enhanced assets or pushes the normal effect ratio, stop and ask for confirmation before proceeding
- use a plain confirmation gate such as: `This pushes the ratio. Do you still want to build? Yes or no?`
- do not treat silence as approval

### OmniPath Execution Lock (Workspace-Specific)

- applies to OmniPath work until the user explicitly removes this lock
- `Mo` plans only and must not implement UI or code
- implementation handoff is required: `Mo -> Ezra -> Dan (when backend is involved) -> Gabe`
- `Gabe` must not start coding until the `Mo` plan is approved by the user
- no bypass behavior: if user says stop, pause, or hold, do not continue implementation
- no Docker rebuild/restart before a visual checkpoint is shown and approved
- no commit, push, merge, or deploy unless the user explicitly authorizes it
- legacy prototype paths are read-only and non-buildable:
  - `/Users/xrkr80hd/Desktop/master_folder/OMNIPATH_git_online`
  - `/Users/xrkr80hd/Desktop/master_folder/OMNIPATH_git_online/Omni Path Screen + Graphics`
- if a target path is uncertain, stop and ask before writing
- every OmniPath pass must append a matching log entry to `agents/AGENT_ACTIVITY_LOG.md`

## Quick Read Version

- no pills
- no round UI
- mobile nav goes in hamburger
- all builds must reflow cleanly on mobile and must not feel awkward when compressed
- multiple menu items become categorized accordions
- accordion header color stays stable on expand
- child items must stay brighter and readable
- if effects move beyond the default restrained range, ask before building
- OmniPath: no bypass, Mo plans only, and no Docker refresh before visual approval

## Usage Rule

When a prompt, mockup, or implementation conflicts with this file, this file wins unless the user explicitly overrides it.
