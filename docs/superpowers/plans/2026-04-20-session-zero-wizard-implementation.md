# Session Zero Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Session Zero placeholder route with a portal-backed character-creation wizard that autosaves progress and hands off to a populated character preview.

**Architecture:** Keep the current App Router route structure, but move Session Zero into a dedicated client-side wizard component backed by typed option data and local draft persistence. Use the dropped portal video and audio assets as the ambience layer, keep the route server wrapper thin, and hydrate the final created draft into a preview surface instead of jumping directly to the old companion shell.

**Tech Stack:** Next.js 16.2.1 App Router, React 19.2.4, TypeScript 5, CSS Modules, Tailwind v4 globals, Vitest, Testing Library, jsdom

**Execution Discipline:** Follow `LICL` for every task: `Log planned_work`, `Implement planned_work`, `Check planned_work log so no task is missed`, then `Log to work_completed`.

---

## File Structure

### Create

- `src/lib/omnipath/sessionZeroData.ts`
- `src/components/omnipath/session-zero/SessionZeroWizard.tsx`
- `src/components/omnipath/session-zero/SessionZeroWizard.module.css`
- `src/components/omnipath/session-zero/SessionZeroWizard.test.tsx`
- `src/components/omnipath/session-zero/CharacterPreviewShell.tsx`
- `src/components/omnipath/session-zero/CharacterPreviewShell.module.css`
- `src/components/omnipath/session-zero/CharacterPreviewShell.test.tsx`
- `src/app/characters/preview/page.tsx`

### Modify

- `docs/superpowers/logs/planned_work.md`
- `src/components/screens/TitleScreen.test.tsx`
- `src/app/campaigns/[campaignId]/session-zero/page.tsx`
- `src/app/characters/new/page.tsx`
- `src/app/characters/[characterId]/page.tsx`
- `src/components/screens/TitleScreen.tsx`
- `src/app/globals.css`

## Task 1: Log And Replace The Placeholder Route

- [x] Write LICL task entries for Session Zero wizard implementation.
- [x] Replace the placeholder Session Zero route with the new wizard wrapper.
- [x] Add a real `/characters/new` route for character creation entry.
- [x] Update the branded landing menu so it uses `Create Character`, `Load Character`, and `Settings` instead of the stale shortcut labels.

## Task 2: Build The Session Zero Wizard With TDD

- [x] Write failing tests for the wizard step flow, autosave banner, and final preview CTA.
- [x] Add typed option data for races, backgrounds, traits, stats, and kits.
- [x] Implement the wizard UI with steps, breadcrumbs, back/next, exit-to-main, advanced portability toggle, and local draft persistence.
- [x] Add the portal video background, looping audio control, and readable overlay shell.

## Task 3: Preview Handoff

- [x] Write failing tests for a preview page that hydrates from the saved draft and shows the created character instead of demo fallback data.
- [x] Implement the preview page and preview shell.
- [x] Keep the existing player companion route intact for the demo fixture path while routing Session Zero completion to the new preview surface.

## Task 4: Verify And Log Completion

- [x] Run focused tests for the new wizard and preview shell.
- [x] Run the Title Screen test after the landing menu update.
- [x] Run targeted ESLint on the changed files.
- [x] Run `npm run build`.
- [x] Live-check the Session Zero route on `http://127.0.0.1:3000`.
- [x] Update LICL completion logs with the verified results.
