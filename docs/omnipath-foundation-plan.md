# OmniPath Foundation Plan

## Status

This document locks the current MVP foundation direction for OmniPath.

It exists to prevent drift while the repo is establishing landing flow, route structure, character-creation flow, and the later infrastructure phases.

## Project Correction

OmniPath must be treated as a web-presented game interface.

It is not a website build.
It is not a SaaS landing experience.

It should be built screen by screen, like a game interface progression.

Current progression rule:

1. page 1 is the title screen
2. the player clicks to enter
3. page 2 is the decision screen with `Create New Character`, `Load Character`, `Options`, and `Return To Title`
4. `Load Character` continues to page 2a (choose character) then page 2b (choose campaign for that character)
5. `Create New Character` continues to page 3 (new-character creation sequence)

Do not jump ahead and rebuild the project as a full website architecture while screen progression is still being established.

## Phase Split

### Phase 1: Current Auth-Free Foundation

This is the active build phase right now.

- all routes render without auth guards
- all screens are locally testable without Supabase setup
- Docker is the preferred validation path for this phase
- demo data and placeholder content are valid in this phase
- no session logic, no middleware guards, and no persistence should be added here
- pages should be built one screen at a time, with approval before moving to the next screen

### Phase 2: Auth and Persistence

This phase starts later, as a clean follow-up phase.

- Supabase Auth
- Supabase Storage
- middleware and server-side access checks
- profile ownership
- saved character and campaign data
- Vercel environment configuration when deployment is authorized

## Confirmed MVP Decisions

- Future auth provider: Supabase Auth
- Future file storage: Supabase Storage
- Future protected-route strategy: Next.js middleware plus server-side checks
- Character-entry MVP: create a new character in Session Zero
- Entry-screen lock: page 2 offers `Create New Character`, `Load Character`, `Options`, and `Return To Title`; `Load Character` continues through page 2a then page 2b by selected character

## Explicit Non-Improvisation Rule

If product, auth, storage, route, or data behavior is not defined by repo evidence or this document, stop and ask the user instead of inventing the missing rule.

## Product Shape

OmniPath is a system-agnostic campaign platform.

It must support multiple systems and settings rather than hardcoding D&D assumptions.

For implementation flow, it should be framed as a game interface first and a route map second.

Core product areas:

- title screen
- game interface screen
- sign-in flow
- user profile
- campaign browser and campaign hub
- character creation flow
- reusable character surfaces such as cards, rosters, and sheets

## MVP Scope

### In Scope

- landing page at `/`
- sign-in page at `/login`
- profile route at `/profile`
- campaign browser at `/campaigns`
- campaign hub at `/campaigns/[campaignId]`
- campaign character entry route at `/campaigns/[campaignId]/session-zero`
- full character page at `/characters/[characterId]`
- Docker-based local validation

### Not Yet In Scope

- Supabase Auth implementation
- protected-route middleware
- persisted profile ownership
- persisted character records
- persisted campaign records
- Supabase Storage implementation
- character import flow
- persisted select-existing-character data loading
- advanced attendance/session history workflows
- full admin tooling
- production deployment steps beyond environment planning

These can be added later, but they are not assumed for the current MVP.

## Route Foundation

### Public Routes

- `/` landing page
- `/login` sign-in entry
- `/profile`
- `/campaigns`
- `/campaigns/[campaignId]`
- `/campaigns/[campaignId]/session-zero`
- `/characters/[characterId]`

These routes are intentionally open during Phase 1 so the product can be tested cleanly without auth.

Protected-route enforcement begins in Phase 2.

### Temporary Route

- `/demo/character-card` only if needed for isolated UI verification

## Landing Page Media Direction

The landing page should support a rotating series of videos supplied by the user.

Current rule:

- the landing experience may source from multiple videos rather than a single static hero asset
- the active landing video should rotate through that series over time
- the user will provide the video assets
- the initial landing interaction is a simple tap or click to start
- the user will already provide the on-screen `click to start` prompt
- the planned interaction effect from implementation is a fantasy-style sparkle response on tap or click

### Landing Interaction Rule

The opening interaction should stay minimal.

- do not add extra CTA copy beyond the user's provided `click to start` prompt
- do not add extra onboarding UI to the first interaction layer unless the user asks for it
- the implementation focus for the first interaction is the sparkle effect and transition into the landing media experience

Do not improvise the unresolved playback rules.

These details still need explicit confirmation before implementation:

- autoplay behavior
- muted versus sound-enabled playback
- rotation trigger based on timer, completion, or both
- mobile fallback behavior
- whether videos are served from Supabase Storage, Vercel-hosted public assets, or another approved source

## Auth Foundation

Use Supabase Auth as the single planned MVP identity system when Phase 2 begins.

Foundation expectations:

- each authenticated user must map to one app profile row
- middleware guards protected routes
- server-side checks still validate access on protected screens and data reads
- no client-only auth protection should be treated as sufficient

## Storage Foundation

Use Supabase Storage for MVP character files and images when persistence begins.

Storage expectations:

- character assets must be owned and access-aware
- storage should be tied to character or profile ownership rules
- public-versus-private asset access must be decided during schema implementation, not guessed in UI code
- bucket naming and folder naming should be finalized during implementation, not improvised ad hoc in components

## Data Foundation

The minimum backend entities needed for MVP planning are:

- profiles
- campaigns
- campaign memberships
- characters
- character asset references

Likely ownership model:

- auth user owns one profile
- profile owns characters
- campaigns own membership records
- character access inside a campaign is decided by campaign membership and campaign rules

Do not hardcode race/class/system fields as fixed D&D-only columns. The character model must remain system-aware.

## Canonical Screen Decision (Page 2 Branching)

Locked progression for the current flow:

- page 2 asks: `What do you want to do?`
- page 2 offers:
  - `Create New Character`
  - `Load Character`
  - `Options`
  - `Return To Title`
- if the player chooses `Load Character`, flow must continue to page 2a (`Choose Character`) and then page 2b (`Choose Campaign`)
- page 2b campaign links are `/campaigns/[campaignId]?characterId=[selectedCharacterId]`
- if the player chooses `Create New Character`, flow continues to page 3 create-character sequence

## Canonical Save-State Model

Core entity shape to preserve:

- `Character`
- `Campaign`
- `Party`
- `CharacterCampaignState`

`CharacterCampaignState` stores:

- `characterId`
- `campaignId`
- `partyId`
- `currentLocationId`
- `currentSubLocationId`
- `lastKnownPartyMemberIds`
- `lastSavedAt`

Canonical interpretation:

- one character can join many campaigns
- progress is saved per character plus campaign, not globally on the base character
- party context is saved as party membership and/or a last-known snapshot, not only plain-text names
- this prevents cross-campaign progress bleed and keeps resume behavior deterministic

## Canonical Mid-Campaign Leave Rule

If a player leaves in the middle of active campaign play:

- do not freeze the character in a dangerous encounter position
- resume that character from the last safe hub (town, camp, ship, tavern, base, or equivalent safe checkpoint)
- apply a temporary fatigued return state as the absence consequence
- keep active area state for the party separate from that character's safe resume state

Default safety behavior:

- do not restore absent characters into battle tiles, trap rooms, or equivalent high-risk coordinates
- restore into the last safe narrative re-entry point

## Vercel Foundation

Vercel is the hosting target, but deploy actions remain separate from coding work.

Foundation expectations:

- local development uses `.env.local`
- Vercel must receive matching environment variables for Development, Preview, and Production when deployment is authorized
- minimum expected environment values:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` for server-only operations if needed
- do not push or deploy just to test infrastructure unless the user explicitly authorizes it

## Docker Validation

Current local testing should run in Docker without auth, middleware, or external service configuration.

Phase 1 expectations:

- the app should build and run in a local container
- the landing page and route skeletons should be testable at port 3000
- no Supabase environment variables are required in this phase
- no Docker service for Supabase should be added in this phase

## Repo Structure Direction

The current repo has route files under `src/app` but live reusable UI under root `app/components`.

That mismatch should be corrected before feature growth continues.

Direction:

- keep the Next app router under `src/app`
- move or rebuild live reusable UI under `src` so imports and structure align
- keep demo-only surfaces clearly separated from production routes
- keep shared MASTER assets as reference only

## Build Order

1. Update project-specific game-interface guardrails
2. Build page 1 as the title screen
3. Wait for approval before building page 2
4. Build the game interface screen
5. Add the create, load, and join branches screen by screen
6. Add auth, persistence, and deployment in the later infrastructure phase

## Immediate Next Implementation Target

The current implementation target is page 3: the character-entry branch screen, following approval of page 2 as the decision hub.

Do not start Supabase Auth, Supabase Storage, middleware, or Vercel configuration during this pass.

## Open Decisions For Later

These are intentionally not locked yet:

- whether MVP will allow import later in the same phase or a later phase
- whether assets are public, signed, or fully private by default
- exact campaign rule model for fresh-character requirements
- final database access layer choice beyond Supabase itself
