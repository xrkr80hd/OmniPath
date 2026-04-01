# OmniPath VS Code Handoff

## Objective

Reset the build direction for **OmniPath** and get the project back on a clean, prioritized path.

## Project Correction

OmniPath must now be treated as a web-presented game interface.

- it is not a website build
- it is not a SaaS landing experience
- it should be approached like a game system interface with screen-by-screen progression

Current screen order:

1. title screen
2. game interface screen
3. create character, load character, or load or join campaign branches

Build page by page.
Do not jump ahead into the full later interface before the current screen is approved.

We drifted into building a Character Card system before locking the product entry flow and landing experience. The next move is **not** to keep stacking isolated components. The next move is to re-anchor the app around the core user journey, then connect the Character Card work into that structure.

This handoff is meant for VS Code / Codex so the repo can be inspected, planned, and built in the right order.

---

## Repo / Path

Work in:

`/Users/xrkr80hd/Library/Mobile Documents/com~apple~CloudDocs/xrkr_workspace/xrkr_workspace_prime/OmniPath`

Reference-only UI assets live in:

`/Users/xrkr80hd/Desktop/master_folder/MASTER/assets/ui`

Do not treat the assets folder as the implementation repo. It is a visual reference source only.

---

## What We Are Actually Building

OmniPath is evolving into a **system-agnostic campaign platform** with:

- campaign hubs
- character creation / import
- profile pages
- character portfolio cards
- session zero routing
- campaign membership / attendance logic
- reusable UI powered by an internal engine structure

This is **not just D&D**.
It must support fantasy, sci-fi, cyberpunk, homebrew, and mixed systems.

That means:

- avoid hardcoding D&D assumptions
- treat race/class/etc. as configurable system fields
- keep campaign and character logic system-aware

---

## Where We Got Off Track

We started building the **Character Card** before locking the top-level experience.

That work is still usable, but it is no longer the first thing to focus on.

Before more component work, we need to inspect the repo and determine:

1. what already exists
2. whether there is a current landing page or app shell
3. whether the Character Card work is isolated or already wired into routes
4. what the actual app entry flow should be

---

## Priority Reset

### Build Order From Here

1. **Inspect current OmniPath repo state**
2. **Lock landing / entry experience**
3. **Define primary route structure**
4. **Confirm campaign entry logic**
5. **Then reconnect Character Card work into the proper screens**

Do **not** continue adding random UI pieces until the top-level structure is clear.

---

## Immediate Questions To Resolve In Repo Inspection

Inspect first before changing anything.

### Check these areas

- app root structure
- current landing page
- auth-related routes if any
- campaign routes if any
- profile routes if any
- demo routes that may have been added
- Character Card files
- InventoryDrawer files
- current styling pattern
- whether an app shell/layout already exists

### Specifically verify

- Is there a homepage or landing page already?
- Is there a route structure already forming?
- Is the Character Card only in a demo/test area, or is it becoming production UI?
- Are we using app router patterns consistently?
- Is there already a profile or campaigns surface?
- Are there naming/path inconsistencies that need cleanup before more work?

---

## Recommended Direction

### We should come back to the landing page first

Yes.

Not because the Character Card work was wrong, but because the product needs its front door and route logic locked first.

The landing page needs to define:

- what OmniPath is
- where users go first
- whether they log in, view campaigns, or enter a workspace
- how the product distinguishes player flow vs GM flow
- how campaign entry begins

Only after that should we wire deeper UI systems into those routes.

---

## Product-Level Route Direction

This is the route direction to validate against the actual repo:

- `/` → Landing page
- `/login` → Auth entry
- `/profile` → User profile
- `/campaigns` → Campaign browser
- `/campaigns/[campaignId]` → Campaign hub
- `/campaigns/[campaignId]/lobby` → Lobby / entry room
- `/campaigns/[campaignId]/characters` → Character selection / roster
- `/campaigns/[campaignId]/session-zero` → Character creation flow when required
- `/characters/[characterId]` → Full character sheet
- `/demo/character-card` → Temporary test route only if needed

This is a direction, not a blind implementation order. Inspect current repo first.

---

## Character Entry Rules To Preserve

These rules are already decided and should remain intact:

### Session Zero

A user is routed to Session Zero **only if needed**.

Use Session Zero when:

- they are starting fresh
- they do not have a valid character for the campaign
- the campaign requires fresh characters

Do **not** force Session Zero when:

- the user already has a valid character for that campaign
- the campaign allows selecting or importing an existing character

### Import

A user may import a character if the campaign allows it.

### Campaign membership vs session attendance

These are separate:

- a DM can remove a player from a campaign
- a player missing a session does not lose campaign membership by default

### Profile requirement

A logged-in user must have a profile page that lists:

- their characters
- their campaigns
- which campaigns each character is involved in

---

## Character Card Work Status

The Character Card system is still valid and should be kept, but treated as **one reusable module**, not the current center of the app.

It should eventually appear in:

- profile page
- campaign party roster
- character selection screens
- possibly lobby/roster surfaces

It should **not** drive architecture decisions by itself.

---

## What To Do Next In VS Code / Codex

### Phase 1: Inspect and report

Do this first. No coding yet unless cleanup is obvious and low risk.

Inspect:

- current app folder structure
- top-level routes
- current landing page or homepage
- Character Card implementation status
- demo routes
- styling approach
- missing route/layout foundations

Then report:

1. current route map
2. what already exists
3. what is duplicated or drifting
4. what should be cleaned up before more feature work
5. whether landing page should be built next

### Phase 2: Decide the next build target

After inspection, recommend one of these:

- **A. Build/fix landing page first**
- **B. Build app shell / route skeleton first**
- **C. Clean Character Card integration before landing page**
- **D. Clean repo structure first, then build landing page**

Prefer the smallest correct next move.

---

## Guardrails

- Inspect first, do not assume
- In OmniPath, plan first before implementation
- Keep mobile responsiveness in mind
- Prefer root-cause fixes over patches
- Keep UI aligned to the existing card-based asset language
- Do not invent D&D-only data assumptions
- Do not continue isolated component work without route context
- Keep demo/test surfaces clearly separated from production UI

---

## Codex Prompt To Use Next

```text
You are working inside the OmniPath repo.

Repo path:
 /Users/xrkr80hd/Library/Mobile Documents/com~apple~CloudDocs/xrkr_workspace/xrkr_workspace_prime/OmniPath

Your job right now is NOT to jump into more feature implementation.

First inspect the repo and tell me the current state so we can reset build direction.

I think we may have drifted into Character Card work before locking the landing page and app entry flow.

Tasks:
1. Inspect the repo structure first
2. Identify the current app routes/pages/layouts
3. Check whether a landing page/homepage already exists
4. Check the current Character Card and InventoryDrawer build status
5. Check whether there are demo/test routes that should remain temporary
6. Tell me what the clean next priority should be

Return your answer in this format:

1. Objective: one short paragraph
2. Repo/Path: exact path inspected
3. First inspection steps: short list
4. Findings:
   - current route/page structure
   - current Character Card status
   - current landing page status
   - structural issues or drift
5. Recommendation:
   - whether to return to the landing page first
   - whether any cleanup should happen before that
6. Action:
   - the single best next implementation step

Constraints:
- inspect before assuming
- do not implement yet unless you find an obvious low-risk cleanup issue
- keep mobile responsiveness in mind
- focus on root causes, not patches
- keep the answer concise and practical
```

---

## Success Condition

We are back on track when:

- the repo has a clear top-level direction
- landing/app entry is decided
- demo work is separated from production work
- Character Card work is preserved but no longer driving the whole roadmap
- the next implementation step is obvious and small enough to execute cleanly
