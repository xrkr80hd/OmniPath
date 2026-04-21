# Environment And Project Status Report

_Date: 2026-04-20 (America/Chicago)_

## Executive Summary

The current repository is a **working Next.js application**, not the older static prototype described in the previous draft of this report.

The main OmniPath command-center implementation appears to be **built and currently verifiable**:

- `npm test` passed: `6` files, `11` tests
- `npm run lint` passed
- `npm run build` passed on Next.js `16.2.1`

The unfinished work is now mostly about **repo hygiene and direction alignment**, not a missing app bootstrap.

---

## Current Stack

- Framework: Next.js `16.2.1`
- UI runtime: React `19.2.4`
- Language: TypeScript `5`
- Test runner: Vitest
- Linting: ESLint
- Styling: global CSS plus CSS Modules
- Container support: `Dockerfile` and `docker-compose.yml` are present

Key project files present now:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `vitest.config.mts`
- `Dockerfile`
- `docker-compose.yml`

Node version is **not pinned** yet:

- `.nvmrc`: missing
- `.node-version`: missing

---

## Fresh Verification

These checks were run during this review:

```bash
npm test
npm run lint
npm run build
```

Results:

- `npm test`: passed with `6` test files and `11` passing tests
- `npm run lint`: passed with no reported errors
- `npm run build`: passed and generated these app routes:
  - `/`
  - `/campaigns`
  - `/campaigns/[campaignId]`
  - `/campaigns/[campaignId]/lobby`
  - `/campaigns/[campaignId]/session-zero`
  - `/characters/[characterId]`
  - `/login`
  - `/profile`

What I did **not** verify in this pass:

- `docker compose up --build`
- any deployed environment
- Supabase, auth, or persistence integration

---

## What Looks Completed

The execution logs in `docs/superpowers/logs/` line up with the current codebase.

The recent commit history shows the command-center plan was implemented in sequence:

- `936ac47` `test: add omnipath fixture baseline`
- `90616b3` `refactor: remove legacy screen flow`
- `5bcfce1` `feat: add shared campaign browser`
- `0fa5264` `refactor: refine landing page entry layout`
- `188f1d8` `feat: build shared command center shell`
- `e783ecf` `feat: add dm controls and encounter mode`
- `cfb9123` `feat: add player companion shell`
- `d0c325d` `refactor: remove legacy placeholder chrome`

The repo now contains real implementations for:

- landing/title screen
- campaign browser
- campaign command-center shell
- DM console panel
- player companion shell
- compact support shells for staged routes

---

## What Is Still Unfinished Or Inconsistent

### 1) Planning documents disagree about product direction

`docs/omnipath-foundation-plan.md` still describes the older screen-by-screen flow:

- page 2 decision screen
- `Create New Character`
- `Load Character`
- `Options`
- `Return To Title`
- page `2a` and `2b` branching

That conflicts with the newer command-center direction recorded in:

- `docs/superpowers/specs/2026-04-18-omnipath-command-center-design.md`
- `docs/superpowers/plans/2026-04-18-omnipath-command-center-implementation.md`
- `docs/superpowers/logs/planned_work.md`
- `docs/superpowers/logs/work_completed.md`

Right now the **code matches the command-center plan**, not the older foundation-flow document.

### 2) Session Zero media is present but not wired into the app

This folder exists:

- `public/omnipath/assets/session-zero/`

It contains media placeholders and real asset files, but the local README in that folder explicitly says the app is **not wired to them yet**.

### 3) Untracked artifacts are left in the worktree

Current untracked paths:

- `docs/environment-setup-report.md`
- `output/`
- `public/omnipath/assets/session-zero/`

`output/` currently contains dev logs and Playwright screenshots. Those may be useful evidence, but they are not integrated into the tracked repo state.

### 4) Environment/tooling setup is still missing a pinned Node version

The app builds today, but the repo still does not declare a canonical Node version with:

- `.nvmrc`, or
- `.node-version`

### 5) Auth, persistence, and deployment phases are still deferred

There is still no evidence in this review of completed:

- Supabase Auth
- Supabase Storage
- route protection / middleware
- persistent character or campaign data
- deployment environment setup

That aligns with the later-phase notes in the existing docs, but it is still unfinished work.

---

## Recommended Next Cleanup

1. Choose the canonical product direction and reconcile the docs.
   The biggest remaining mismatch is `docs/omnipath-foundation-plan.md` versus the implemented command-center work.

2. Decide whether `output/` is disposable evidence or should be tracked selectively.

3. Decide whether Session Zero media is in scope now.
   If yes, wire it into the route.
   If no, keep only the README or move the assets out of the main repo.

4. Add a pinned Node version file so setup is reproducible across machines.

5. Keep future status reports grounded in fresh verification output, not older migration notes.

---

## Current Local Setup

Install and run:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Container path:

```bash
docker compose up --build
```

The Docker files are present, but that path was **not re-verified** in this review.
