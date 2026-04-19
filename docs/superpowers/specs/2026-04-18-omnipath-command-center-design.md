# OmniPath Command Center Design

Date: 2026-04-18
Status: Draft for user review

## Goal

Redesign OmniPath from a collection of screen-specific MVP placeholders into a usable, branded, web-presented game interface centered on a DM-led shared command center.

This design must preserve the existing OmniPath trademarked visual assets already present in the repo, improve usability, and support hybrid play:

- remote players on their own devices
- local players viewing a TV or extended display
- a DM operating private controls on a laptop

The system must remain system-agnostic and theme-agnostic at its core so it can encapsulate multiple world styles without becoming a different product per theme.

## Product Model

OmniPath is not a generic website and not a SaaS dashboard.

It is a web-presented tabletop command system with three coordinated surfaces:

1. Shared stage
   Player-safe command center for TV, Discord cast, or remote shared viewing.
2. DM private console
   The same command center shell with additional hidden controls and private information.
3. Player companion
   A personal character-focused device view for each player.

This model supports the approved session behavior:

- the DM leads stage changes
- the party follows the DM-selected view
- absent characters resolve to a safe narrative re-entry state
- voice remains out of band through Discord or another VoIP tool
- players can act directly only when it is their turn

## Core Design Thesis

The primary anchor surface is the campaign command center at `/campaigns/[campaignId]`.

The command center should feel like a scene-first tabletop operations surface with enough atmosphere to feel like a game, but never so much ornament that it becomes hard to read on a TV, laptop, or phone.

The center of the shared UI is a flexible stage controlled by the DM. It can switch between:

- Scene
- Map
- Art
- Notes
- Encounter

The shell remains stable while the stage content changes.

## Visual Direction

### Brand Preservation

The redesign must reuse the existing OmniPath logos, branded screen assets, title-sequence imagery, and UI mood references already stored in:

- `public/omnipath/assets/logos/`
- `public/omnipath/screens/title-sequence/`
- `public/omnipath/assets/title-backgrounds/`
- `public/omnipath/assets/ui-mockups/`
- `PROTYPE DRAFT/`

The work is productization of the existing trademarked look, not a rebrand.

### Shell Style

The base shell is neutral and system-agnostic.

It should use:

- strong typography hierarchy
- restrained chrome
- large readable content planes
- panels that feel intentional and premium without defaulting to card-grid SaaS UI
- edge-based HUD framing instead of center-screen clutter

The UI should feel like a world container rather than a single fixed genre.

### Theme System

World presentation is handled through skins, not layout forks.

The initial MVP supports light skinning through theme tokens:

- palette
- textures
- frame accents
- icon tone
- ambient motion
- optional background media

The layout, navigation model, and component behavior remain stable across themes.

This enables support for Lovecraft, post-apocalyptic, sci-fi, medieval, fantasy, comic, 8-bit, 16-bit, 32-bit, and related world styles without fracturing the product.

## Route Roles

The current route structure is preserved, but each route gets a clearer product role.

### `/`

Branded title and entry flow using the existing OmniPath logo and title-sequence assets.

This remains the emotional front door, but not the primary product anchor.

### `/campaigns`

Campaign picker and resume surface.

This route helps a player or DM:

- continue a recent campaign
- browse available campaigns
- enter the selected campaign command center

### `/campaigns/[campaignId]`

Main command center shell.

This becomes the persistent hub of play.

### `/campaigns/[campaignId]/lobby`

Pre-session staging surface for:

- attendance
- join flow
- readiness
- pre-session checks

### `/campaigns/[campaignId]/session-zero`

Character creation and party setup flow.

### `/characters/[characterId]`

Player companion surface with character dashboard, inventory, conditions, notes, and event feed.

### `/profile`

Profile shell. Secondary in MVP priority.

## Shared Command Center

### Purpose

Provide the player-safe shared screen for the table, cast display, or remote party view.

### Layout Zones

#### Scene Rail

A persistent top rail showing:

- campaign name
- current location
- active objective
- current session state
- concise party status summary

This is scene-first, not roster-first.

#### Shared Stage

The dominant center area. The DM chooses the active tab.

Supported stage modes:

- Scene: narrative context, location, prompts, current state
- Map: map or spatial board view
- Art: illustration or visual reveal
- Notes: player-safe reference notes
- Encounter: initiative-driven battle or conflict state

The center should remain visually dominant in all modes.

#### Party Drawer

An edge drawer, collapsed by default outside high-information moments.

It shows:

- roster
- player presence
- summarized health or condition state
- who is connected or absent

Outside encounter-focused moments it stays secondary.

#### Context Drawer

A secondary drawer for:

- notes
- lore
- mission context
- tab-specific support content

It should never replace the stage as the main focal plane.

#### Status Strip

A persistent bottom strip for:

- current phase
- turn state
- countdown timer when relevant
- system prompts
- DM-driven status updates

This strip is the main always-visible status channel.

### Behavior Rules

- The shared command center is always player-safe.
- The DM controls the active stage.
- Players do not freely browse away from the DM-led stage on the shared surface.
- The UI must stay readable at living-room distance.
- The center of the screen remains clear enough to feel like play is happening there.
- Outside encounter mode, avoid over-exposing party and systems detail at the expense of the scene.

## DM Private Console

### Purpose

Give the DM private controls without creating a second unrelated application.

### Model

The DM sees the same core command center shell plus a hidden control layer on the laptop.

### Private Controls

The DM layer may include:

- stage switching
- reveal or hide controls
- encounter start and end
- turn advancement
- timers
- hidden notes
- enemy controls
- NPC or party management tools
- hidden assets and references

### Rules

- The DM must always know what players currently see.
- Secret information stays private by default.
- The DM should be able to change the shared stage quickly without getting buried in menus.
- The DM console should feel like the same product, not a separate admin dashboard.

## Player Companion

### Purpose

Provide each player with their personal active play surface during a live session.

### Default Structure

#### Character Summary

Top-level character identity and state:

- portrait
- name
- active campaign
- health or status summary
- conditions
- current turn state

#### Character Dashboard

The default home area on the player’s device.

Primary tabs may include:

- Character
- Inventory
- Abilities
- Notes

#### Event Feed

A persistent live feed of DM-driven status and session events:

- stage changes
- scene updates
- prompts
- encounter start
- turn changes
- attention-worthy status shifts

#### Action Tray

A bottom action tray gated by turn state.

It stays locked outside the player’s turn.

When active, it exposes:

- allowed actions
- a turn timer
- an explicit end-turn action

### Optional Minimal Mode

Players may reduce their device to a lightweight companion mode showing:

- current status
- event feed
- essential turn prompts

This supports lower-noise use without changing the underlying product model.

## Encounter Mode

Encounter is a stage mode, not a separate product surface.

### Shared Screen Changes

When encounter mode is active:

- the center stage becomes battle-focused
- initiative and active actor state become prominent
- party and enemy presence become visible
- turn and timer information become unmistakable

### Player Device Changes

- the current player’s action tray unlocks
- event feed intensifies around turn changes and encounter prompts
- character and inventory data remain accessible
- off-turn players remain view-first

## Status Signaling

Players need clear cues when the session state changes.

The system should use one consistent signaling language across shared stage, player companion, and DM console for:

- scene updated
- encounter started
- your turn
- waiting
- DM prompt
- reveal
- location or objective change

This signaling should be noticeable but restrained.

Avoid:

- constant blinking
- stacked noisy toasts
- decorative motion with no state meaning

## Component Architecture

The redesign should replace isolated screen-specific layout invention with a reusable command-center system.

Planned core components:

- `CommandCenterShell`
- `SharedStage`
- `StageTabs`
- `SceneRail`
- `PartyDrawer`
- `ContextDrawer`
- `StatusStrip`
- `DmConsolePanel`
- `PlayerCompanionShell`
- `ThemeSkinProvider`

These components must define the stable chassis for the rest of the repo.

## Reuse And Replacement

### Reuse

- existing title screen assets and screen-flow imagery
- OmniPath logos
- existing route progression concept
- usable character card and inventory building blocks
- existing mockups and draft screens as design reference

### Replace Or Fold Into New Architecture

- `GameInterfaceScreen` as the long-term decision hub concept
- current `CampaignHubScreen` card-grid layout
- route placeholders that do not fit the shared-stage model
- one-off page compositions that work against a unified shell

## MVP Implementation Order

1. Global design tokens and shell rules
   Neutral command-center foundation, typography, spacing, panels, signaling, and theme tokens.
2. Title screen cleanup
   Preserve branding while improving readability and entry clarity.
3. Campaign command center
   Shared shell with scene rail, stage tabs, shared stage, drawers, and status strip.
4. DM private layer
   DM-only controls added to the command center.
5. Player companion
   Character dashboard, event feed, and gated action tray.
6. Encounter mode
   Shared stage variant and turn-state behavior.
7. Campaign browser and lobby
   Resume and join flow into the command center.

## Data And State Boundaries

This design stays aligned with the existing foundation documents:

- route and auth work remain separate from this UI redesign pass
- the safe-return rule for absent players remains intact
- character progress remains per character plus campaign
- world and system assumptions must remain system-agnostic

For MVP design and implementation:

- UI should run against local demo data
- auth, persistence, and voice integration remain out of scope for this pass
- the design should not assume D&D-specific schema or hardcoded rule terminology

## Error Handling Expectations

The UI should degrade cleanly when session state is incomplete or mocked.

Examples:

- if no encounter is active, the encounter tab should show a clear empty state
- if no player action is available, the action tray should state why it is locked
- if a cast or shared view is not active, the shared stage still renders locally
- if a player is absent, the roster should communicate safe-return status clearly

Error messaging should stay plain and operational, not lore-heavy.

## Testing Expectations

The redesign should be validated as a product shell before backend integration.

Minimum verification targets:

- title screen loads with branded assets intact
- command center is readable on desktop and mobile
- player-safe shared stage can swap between stage modes
- DM-only controls do not leak onto player-safe surfaces
- player companion clearly reflects off-turn vs active-turn states
- encounter mode can surface party, enemy, timer, and turn state without layout collapse
- theme tokens can swap atmosphere without breaking structure

## Anti-Patterns To Avoid

- generic SaaS dashboard card mosaics
- full-width top navigation that dominates the play surface
- multiple equal-weight permanent panels around every edge
- theme systems that amount to a single fantasy skin with sci-fi recolor
- per-world layout forks in MVP
- ornamental animation that competes with readability
- center-screen clutter that obscures the shared stage
- separate DM and player apps with incompatible mental models
- language that assumes a single tabletop ruleset

## Out Of Scope For This Design Pass

- full auth and persistence implementation
- real-time multiplayer infrastructure
- Discord or VoIP integration
- backend dice logic and rules engines
- production deployment steps
- deep world-specific layout transformations beyond skinning

## Success Criteria

This redesign succeeds when:

- OmniPath feels like a usable command surface for real family or party play
- the shared TV view is player-safe and easy to follow
- the DM can run the session from a laptop without exposing hidden information
- players can manage their own characters from their own devices
- the experience remains coherent across fantasy, sci-fi, horror, retro, and other supported themes
- the repo has one clear command-center direction instead of disconnected placeholder screens
