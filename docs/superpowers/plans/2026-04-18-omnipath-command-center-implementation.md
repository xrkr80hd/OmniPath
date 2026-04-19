# OmniPath Command Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the repo's mixed placeholder flows with one clean OmniPath command-center product shell, then rebuild the core routes around the approved DM-led shared-stage model.

**Architecture:** Keep the existing Next.js App Router structure, but remove the parallel screen-flow and route-placeholder systems so the repo has one coherent UI language. Rebuild the MVP around typed demo fixtures, a neutral theme token layer, a shared command-center shell, a DM-private control panel, and a player companion view that all reuse the same brand assets.

**Tech Stack:** Next.js 16.2.1 App Router, React 19.2.4, TypeScript 5, CSS Modules, Tailwind v4 globals, Vitest, Testing Library, jsdom

**Execution Discipline:** Follow `LICL` for every task: `Log planned_work`, `Implement planned_work`, `Check planned_work log so no task is missed`, then `Log to work_completed`.

---

## File Structure

### Create

- `vitest.config.mts`
- `src/test/setup.ts`
- `src/lib/omnipath/demoData.ts`
- `src/lib/omnipath/theme.ts`
- `src/components/omnipath/campaigns/CampaignBrowser.tsx`
- `src/components/omnipath/campaigns/CampaignBrowser.module.css`
- `src/components/omnipath/command-center/CommandCenterShell.tsx`
- `src/components/omnipath/command-center/CommandCenterShell.module.css`
- `src/components/omnipath/command-center/SharedStage.tsx`
- `src/components/omnipath/command-center/SharedStage.module.css`
- `src/components/omnipath/command-center/StageTabs.tsx`
- `src/components/omnipath/command-center/SceneRail.tsx`
- `src/components/omnipath/command-center/PartyDrawer.tsx`
- `src/components/omnipath/command-center/ContextDrawer.tsx`
- `src/components/omnipath/command-center/StatusStrip.tsx`
- `src/components/omnipath/command-center/DmConsolePanel.tsx`
- `src/components/omnipath/player/PlayerCompanionShell.tsx`
- `src/components/omnipath/player/PlayerCompanionShell.module.css`
- `src/components/omnipath/support/SimpleShell.tsx`
- `src/components/screens/TitleScreen.test.tsx`
- `src/components/omnipath/campaigns/CampaignBrowser.test.tsx`
- `src/components/omnipath/command-center/CommandCenterShell.test.tsx`
- `src/components/omnipath/player/PlayerCompanionShell.test.tsx`
- `src/lib/omnipath/demoData.test.ts`

### Modify

- `package.json`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/components/screens/TitleScreen.tsx`
- `src/components/screens/TitleScreen.module.css`
- `src/app/campaigns/page.tsx`
- `src/app/campaigns/[campaignId]/page.tsx`
- `src/app/campaigns/[campaignId]/lobby/page.tsx`
- `src/app/campaigns/[campaignId]/session-zero/page.tsx`
- `src/app/characters/[characterId]/page.tsx`
- `src/app/login/page.tsx`
- `src/app/profile/page.tsx`

### Delete

- `src/components/screens/HomeFlow.tsx`
- `src/components/screens/GameInterfaceScreen.tsx`
- `src/components/screens/GameInterfaceScreen.module.css`
- `src/components/screens/Page2aLoadCharacterScreen.tsx`
- `src/components/screens/Page2aLoadCharacterScreen.module.css`
- `src/components/screens/Page2bLoadCampaignScreen.tsx`
- `src/components/screens/Page2bLoadCampaignScreen.module.css`
- `src/components/screens/Page3CreateCharacterScreen.tsx`
- `src/components/screens/Page3CreateCharacterScreen.module.css`
- `src/components/screens/CharacterBranchScreen.tsx`
- `src/components/screens/CharacterBranchScreen.module.css`
- `src/components/screens/screenFlowData.ts`
- `src/components/screens/page3PromptBuilder.ts`
- `src/components/layout/RoutePlaceholder.tsx`
- `src/components/layout/SiteHeader.tsx`
- `src/components/layout/SiteFooter.tsx`

## Task 1: Add Test Harness And Typed Demo Fixtures

**Files:**
- Create: `vitest.config.mts`
- Create: `src/test/setup.ts`
- Create: `src/lib/omnipath/demoData.test.ts`
- Create: `src/lib/omnipath/demoData.ts`
- Modify: `package.json`

- [ ] **Step 1: Add the test runner wiring**

```ts
// vitest.config.mts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^25.0.1",
    "vite-tsconfig-paths": "^5.0.1",
    "vitest": "^2.1.3"
  }
}
```

- [ ] **Step 2: Write the failing demo-fixture test**

```ts
// src/lib/omnipath/demoData.test.ts
import { describe, expect, it } from "vitest";
import { getCampaignById, getCharacterById, stageOrder } from "@/lib/omnipath/demoData";

describe("demoData", () => {
  it("returns a command-center campaign fixture with all stage tabs", () => {
    const campaign = getCampaignById("glass-harbor");

    expect(campaign?.stageOrder).toEqual(stageOrder);
    expect(campaign?.sharedStage.scene.title).toMatch(/Glass Harbor/i);
    expect(campaign?.encounter.turnTimerSeconds).toBe(45);
  });

  it("returns a player fixture with turn-locked actions", () => {
    const character = getCharacterById("vale-warden");

    expect(character?.actionState.canAct).toBe(false);
    expect(character?.actionState.lockReason).toMatch(/turn/i);
    expect(character?.inventory[0]?.name).toBeTruthy();
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- src/lib/omnipath/demoData.test.ts`

Expected: FAIL with module resolution errors for `@/lib/omnipath/demoData`.

- [ ] **Step 4: Implement the typed demo fixture layer**

```ts
// src/lib/omnipath/demoData.ts
export const stageOrder = ["scene", "map", "art", "notes", "encounter"] as const;

export type StageId = (typeof stageOrder)[number];

export type CampaignFixture = {
  id: string;
  name: string;
  theme: "neutral" | "fantasy" | "scifi" | "lovecraft" | "retro";
  objective: string;
  location: string;
  partySummary: string;
  stageOrder: readonly StageId[];
  sharedStage: Record<Exclude<StageId, "encounter">, { title: string; body: string }>;
  encounter: {
    turnTimerSeconds: number;
    activeActor: string;
    enemies: { id: string; name: string; status: string }[];
  };
};

export type CharacterFixture = {
  id: string;
  name: string;
  campaignId: string;
  status: string;
  actionState: {
    canAct: boolean;
    lockReason: string;
    secondsRemaining: number;
  };
  inventory: { id: string; name: string; detail: string }[];
  feed: { id: string; label: string; detail: string }[];
};

const campaigns: CampaignFixture[] = [
  {
    id: "glass-harbor",
    name: "Glass Harbor",
    theme: "neutral",
    objective: "Return the party to the harbor vault before moonset.",
    location: "Breakwater Causeway",
    partySummary: "4 present • 1 absent at inn",
    stageOrder,
    sharedStage: {
      scene: {
        title: "Glass Harbor, after the storm",
        body: "The harbor lamps are back online and the party regroups under the breakwater arch.",
      },
      map: {
        title: "Breakwater route map",
        body: "A player-safe chart of the causeway, the old customs house, and the lower quay.",
      },
      art: {
        title: "Reveal art",
        body: "The shared display can promote full-bleed art without leaking DM notes.",
      },
      notes: {
        title: "Party-safe notes",
        body: "Session recap, current leads, and the next destination all stay readable here.",
      },
    },
    encounter: {
      turnTimerSeconds: 45,
      activeActor: "Vale Warden",
      enemies: [
        { id: "brine-1", name: "Brine Wretch", status: "engaged" },
        { id: "brine-2", name: "Lantern Eel", status: "hidden" },
      ],
    },
  },
];

const characters: CharacterFixture[] = [
  {
    id: "vale-warden",
    name: "Vale Warden",
    campaignId: "glass-harbor",
    status: "Waiting for turn",
    actionState: {
      canAct: false,
      lockReason: "Actions unlock only on your turn.",
      secondsRemaining: 0,
    },
    inventory: [
      { id: "hook", name: "Harbor Hook", detail: "Worn steel hook for rigging and climbing." },
      { id: "flask", name: "Signal Flask", detail: "Amber oil used to mark the safe return path." },
    ],
    feed: [
      { id: "stage", label: "Scene updated", detail: "DM switched the table view back to Scene." },
      { id: "absence", label: "Party status", detail: "One party member remains camped away from the group." },
    ],
  },
];

export function getCampaignById(id: string) {
  return campaigns.find((campaign) => campaign.id === id);
}

export function getCharacterById(id: string) {
  return characters.find((character) => character.id === id);
}

export function listCampaigns() {
  return campaigns;
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- src/lib/omnipath/demoData.test.ts`

Expected: PASS with `2 passed`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.mts src/test/setup.ts src/lib/omnipath/demoData.ts src/lib/omnipath/demoData.test.ts
git commit -m "test: add omnipath fixture baseline"
```

## Task 2: Strip The Legacy Root Flow And Keep One Branded Entry Surface

**Files:**
- Create: `src/components/screens/TitleScreen.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/screens/TitleScreen.tsx`
- Modify: `src/components/screens/TitleScreen.module.css`
- Delete: `src/components/screens/HomeFlow.tsx`
- Delete: `src/components/screens/GameInterfaceScreen.tsx`
- Delete: `src/components/screens/GameInterfaceScreen.module.css`
- Delete: `src/components/screens/Page2aLoadCharacterScreen.tsx`
- Delete: `src/components/screens/Page2aLoadCharacterScreen.module.css`
- Delete: `src/components/screens/Page2bLoadCampaignScreen.tsx`
- Delete: `src/components/screens/Page2bLoadCampaignScreen.module.css`
- Delete: `src/components/screens/Page3CreateCharacterScreen.tsx`
- Delete: `src/components/screens/Page3CreateCharacterScreen.module.css`
- Delete: `src/components/screens/CharacterBranchScreen.tsx`
- Delete: `src/components/screens/CharacterBranchScreen.module.css`
- Delete: `src/components/screens/screenFlowData.ts`
- Delete: `src/components/screens/page3PromptBuilder.ts`

- [ ] **Step 1: Write the failing entry test**

```tsx
// src/components/screens/TitleScreen.test.tsx
import { render, screen } from "@testing-library/react";
import { TitleScreen } from "@/components/screens/TitleScreen";

describe("TitleScreen", () => {
  it("renders branded entry links instead of the old multi-screen flow", () => {
    render(
      <TitleScreen
        primaryHref="/campaigns"
        secondaryHref="/characters/vale-warden"
      />,
    );

    expect(screen.getByRole("link", { name: /enter the gate/i })).toHaveAttribute("href", "/campaigns");
    expect(screen.getByRole("link", { name: /open companion/i })).toHaveAttribute("href", "/characters/vale-warden");
    expect(screen.queryByText(/Page 2 \/\/ What Do You Want To Do/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/screens/TitleScreen.test.tsx`

Expected: FAIL because `primaryHref` and `secondaryHref` do not exist on `TitleScreen`.

- [ ] **Step 3: Replace callback-driven entry with route-driven entry and update `/`**

User clarification adopted during execution:
- Keep the landing page as the branded OmniPath "start game" surface.
- Do not flatten it into a plain utility page.
- Preserve approved trademarked OmniPath logo treatment, atmospheric background treatment, and entry-screen feel while changing the interaction from in-page callback flow to route-driven navigation.
- Any existing approved OmniPath logo asset in the repo may be used if it preserves the branded landing treatment.

```tsx
// src/components/screens/TitleScreen.tsx
"use client";

import { Cinzel_Decorative, Oxanium } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./TitleScreen.module.css";

type TitleScreenProps = {
  primaryHref: string;
  secondaryHref: string;
};

export function TitleScreen({ primaryHref, secondaryHref }: TitleScreenProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(Math.floor(Math.random() * titleSequence.length));
  }, []);

  return (
    <main className={`${styles.screen} ${titleFont.variable} ${interfaceFont.variable}`}>
      <div className={styles.imageStack} aria-hidden="true">
        <div className={styles.imageFrame}>
          <Image src={titleSequence[activeImageIndex]} alt="" fill priority sizes="100vw" className={styles.sequenceImageActive} />
        </div>
      </div>

      <section className={styles.content} aria-label="Title screen">
        <Image
          src="/omnipath/assets/logos/omnipath-logo-solo.png"
          alt="OmniPath"
          width={180}
          height={180}
          className={styles.logo}
        />
        <p className={styles.eyebrow}>Shared command center</p>
        <div className={styles.entryZone}>
          <Link href={primaryHref} className={styles.enterButton}>
            Enter The Gate
          </Link>
          <Link href={secondaryHref} className={styles.secondaryLink}>
            Open Companion
          </Link>
        </div>
      </section>
    </main>
  );
}
```

```tsx
// src/app/page.tsx
import { TitleScreen } from "@/components/screens/TitleScreen";

export default function Home() {
  return <TitleScreen primaryHref="/campaigns" secondaryHref="/characters/vale-warden" />;
}
```

```css
/* src/components/screens/TitleScreen.module.css */
.logo {
  width: clamp(7rem, 16vw, 11rem);
  height: auto;
  filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0.45));
}

.secondaryLink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.85rem 1.25rem;
  color: rgba(255, 245, 225, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(7, 11, 20, 0.42);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

- [ ] **Step 4: Delete the old multi-screen flow files**

Run:

```powershell
Remove-Item 'src\components\screens\HomeFlow.tsx'
Remove-Item 'src\components\screens\GameInterfaceScreen.tsx','src\components\screens\GameInterfaceScreen.module.css'
Remove-Item 'src\components\screens\Page2aLoadCharacterScreen.tsx','src\components\screens\Page2aLoadCharacterScreen.module.css'
Remove-Item 'src\components\screens\Page2bLoadCampaignScreen.tsx','src\components\screens\Page2bLoadCampaignScreen.module.css'
Remove-Item 'src\components\screens\Page3CreateCharacterScreen.tsx','src\components\screens\Page3CreateCharacterScreen.module.css'
Remove-Item 'src\components\screens\CharacterBranchScreen.tsx','src\components\screens\CharacterBranchScreen.module.css'
Remove-Item 'src\components\screens\screenFlowData.ts','src\components\screens\page3PromptBuilder.ts'
```

Expected: the only surviving screen component in `src/components/screens/` is the branded `TitleScreen`.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- src/components/screens/TitleScreen.test.tsx`

Expected: PASS with `1 passed`.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/components/screens/TitleScreen.tsx src/components/screens/TitleScreen.module.css src/components/screens/TitleScreen.test.tsx
git add -u src/components/screens
git commit -m "refactor: remove legacy screen flow"
```

## Task 3: Build The Shared Theme Layer And Campaign Browser

**Files:**
- Create: `src/lib/omnipath/theme.ts`
- Create: `src/components/omnipath/campaigns/CampaignBrowser.tsx`
- Create: `src/components/omnipath/campaigns/CampaignBrowser.module.css`
- Create: `src/components/omnipath/campaigns/CampaignBrowser.test.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/campaigns/page.tsx`

- [ ] **Step 1: Write the failing campaign-browser test**

```tsx
// src/components/omnipath/campaigns/CampaignBrowser.test.tsx
import { render, screen } from "@testing-library/react";
import { listCampaigns } from "@/lib/omnipath/demoData";
import { CampaignBrowser } from "@/components/omnipath/campaigns/CampaignBrowser";

describe("CampaignBrowser", () => {
  it("renders campaign cards with resume-first copy and world skin labels", () => {
    render(<CampaignBrowser campaigns={listCampaigns()} />);

    expect(screen.getByRole("heading", { name: /resume a campaign/i })).toBeInTheDocument();
    expect(screen.getByText(/Glass Harbor/i)).toBeInTheDocument();
    expect(screen.getByText(/neutral shell/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/omnipath/campaigns/CampaignBrowser.test.tsx`

Expected: FAIL because `CampaignBrowser` does not exist.

- [ ] **Step 3: Add theme helpers, global tokens, and the browser component**

```ts
// src/lib/omnipath/theme.ts
export const themeLabels = {
  neutral: "neutral shell",
  fantasy: "fantasy skin",
  scifi: "sci-fi skin",
  lovecraft: "lovecraft skin",
  retro: "retro skin",
} as const;

export function getThemeLabel(theme: keyof typeof themeLabels) {
  return themeLabels[theme];
}
```

```tsx
// src/components/omnipath/campaigns/CampaignBrowser.tsx
import Link from "next/link";
import { getThemeLabel } from "@/lib/omnipath/theme";
import type { CampaignFixture } from "@/lib/omnipath/demoData";
import styles from "./CampaignBrowser.module.css";

export function CampaignBrowser({ campaigns }: { campaigns: CampaignFixture[] }) {
  return (
    <main className={styles.browser}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Campaigns</p>
        <h1>Resume a campaign</h1>
        <p>Enter the shared command center without bouncing through placeholder pages.</p>
      </header>
      <section className={styles.grid}>
        {campaigns.map((campaign) => (
          <Link key={campaign.id} href={`/campaigns/${campaign.id}`} className={styles.card}>
            <span className={styles.skin}>{getThemeLabel(campaign.theme)}</span>
            <h2>{campaign.name}</h2>
            <p>{campaign.objective}</p>
            <span>{campaign.partySummary}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
```

```tsx
// src/app/campaigns/page.tsx
import { CampaignBrowser } from "@/components/omnipath/campaigns/CampaignBrowser";
import { listCampaigns } from "@/lib/omnipath/demoData";

export default function CampaignsPage() {
  return <CampaignBrowser campaigns={listCampaigns()} />;
}
```

```css
/* src/app/globals.css */
:root {
  --op-bg: #0b1018;
  --op-surface: rgba(14, 19, 31, 0.82);
  --op-panel: rgba(20, 28, 44, 0.86);
  --op-border: rgba(245, 241, 231, 0.14);
  --op-text: #f2efe7;
  --op-muted: #afbbcb;
  --op-accent: #caa765;
}

body {
  background:
    radial-gradient(circle at top, rgba(202, 167, 101, 0.18), transparent 28%),
    linear-gradient(180deg, #08101a 0%, #0c1420 100%);
  color: var(--op-text);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- src/components/omnipath/campaigns/CampaignBrowser.test.tsx`

Expected: PASS with `1 passed`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/omnipath/theme.ts src/app/globals.css src/app/campaigns/page.tsx src/components/omnipath/campaigns
git commit -m "feat: add shared campaign browser"
```

## Task 4: Build The Command Center Shell And Replace The Campaign Hub Placeholder

**Files:**
- Create: `src/components/omnipath/command-center/CommandCenterShell.tsx`
- Create: `src/components/omnipath/command-center/CommandCenterShell.module.css`
- Create: `src/components/omnipath/command-center/SharedStage.tsx`
- Create: `src/components/omnipath/command-center/SharedStage.module.css`
- Create: `src/components/omnipath/command-center/StageTabs.tsx`
- Create: `src/components/omnipath/command-center/SceneRail.tsx`
- Create: `src/components/omnipath/command-center/PartyDrawer.tsx`
- Create: `src/components/omnipath/command-center/ContextDrawer.tsx`
- Create: `src/components/omnipath/command-center/StatusStrip.tsx`
- Create: `src/components/omnipath/command-center/CommandCenterShell.test.tsx`
- Modify: `src/app/campaigns/[campaignId]/page.tsx`

- [ ] **Step 1: Write the failing command-center test**

```tsx
// src/components/omnipath/command-center/CommandCenterShell.test.tsx
import { render, screen } from "@testing-library/react";
import { getCampaignById } from "@/lib/omnipath/demoData";
import { CommandCenterShell } from "@/components/omnipath/command-center/CommandCenterShell";

describe("CommandCenterShell", () => {
  it("renders the scene-first shared stage with persistent rail and status strip", () => {
    const campaign = getCampaignById("glass-harbor");
    if (!campaign) throw new Error("missing fixture");

    render(<CommandCenterShell campaign={campaign} role="player" />);

    expect(screen.getByRole("heading", { name: /Glass Harbor, after the storm/i })).toBeInTheDocument();
    expect(screen.getByText(/Breakwater Causeway/i)).toBeInTheDocument();
    expect(screen.getByText(/4 present • 1 absent at inn/i)).toBeInTheDocument();
    expect(screen.getByText(/Waiting for DM cue/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/omnipath/command-center/CommandCenterShell.test.tsx`

Expected: FAIL because the command-center components do not exist.

- [ ] **Step 3: Implement the shell, stage, rail, drawers, and route**

```tsx
// src/components/omnipath/command-center/CommandCenterShell.tsx
import type { CampaignFixture, StageId } from "@/lib/omnipath/demoData";
import { SceneRail } from "./SceneRail";
import { SharedStage } from "./SharedStage";
import { StageTabs } from "./StageTabs";
import { PartyDrawer } from "./PartyDrawer";
import { ContextDrawer } from "./ContextDrawer";
import { StatusStrip } from "./StatusStrip";
import styles from "./CommandCenterShell.module.css";

export function CommandCenterShell({
  campaign,
  role,
  activeStage = "scene",
}: {
  campaign: CampaignFixture;
  role: "player" | "dm";
  activeStage?: StageId;
}) {
  return (
    <main className={styles.shell}>
      <SceneRail campaign={campaign} />
      <StageTabs stageOrder={campaign.stageOrder} activeStage={activeStage} />
      <div className={styles.workspace}>
        <PartyDrawer campaign={campaign} />
        <SharedStage campaign={campaign} activeStage={activeStage} />
        <ContextDrawer campaign={campaign} activeStage={activeStage} />
      </div>
      <StatusStrip label={role === "dm" ? "DM live control" : "Waiting for DM cue"} timer={campaign.encounter.turnTimerSeconds} />
    </main>
  );
}
```

```tsx
// src/app/campaigns/[campaignId]/page.tsx
import { notFound } from "next/navigation";
import { CommandCenterShell } from "@/components/omnipath/command-center/CommandCenterShell";
import { getCampaignById } from "@/lib/omnipath/demoData";

type CampaignHubPageProps = {
  params: Promise<{ campaignId: string }>;
  searchParams?: Promise<{ role?: "player" | "dm"; stage?: "scene" | "map" | "art" | "notes" | "encounter" }>;
};

export default async function CampaignHubPage({ params, searchParams }: CampaignHubPageProps) {
  const { campaignId } = await params;
  const query = (await searchParams) ?? {};
  const campaign = getCampaignById(campaignId);

  if (!campaign) notFound();

  return (
    <CommandCenterShell
      campaign={campaign}
      role={query.role === "dm" ? "dm" : "player"}
      activeStage={query.stage ?? "scene"}
    />
  );
}
```

```css
/* src/components/omnipath/command-center/CommandCenterShell.module.css */
.shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  background: linear-gradient(180deg, rgba(8, 12, 20, 0.96), rgba(11, 17, 27, 1));
}

.workspace {
  display: grid;
  grid-template-columns: minmax(14rem, 18rem) 1fr minmax(16rem, 20rem);
  gap: 1rem;
  padding: 1rem 1rem 0;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- src/components/omnipath/command-center/CommandCenterShell.test.tsx`

Expected: PASS with `1 passed`.

- [ ] **Step 5: Commit**

```bash
git add src/app/campaigns/[campaignId]/page.tsx src/components/omnipath/command-center
git commit -m "feat: build shared command center shell"
```

## Task 5: Add DM Private Controls And Encounter Stage Behavior

**Files:**
- Create: `src/components/omnipath/command-center/DmConsolePanel.tsx`
- Modify: `src/components/omnipath/command-center/CommandCenterShell.tsx`
- Modify: `src/components/omnipath/command-center/SharedStage.tsx`
- Modify: `src/components/omnipath/command-center/StatusStrip.tsx`
- Modify: `src/components/omnipath/command-center/CommandCenterShell.test.tsx`

- [ ] **Step 1: Extend the failing command-center test for DM-only controls**

```tsx
// append to src/components/omnipath/command-center/CommandCenterShell.test.tsx
it("shows DM-only controls without leaking them into player view", () => {
  const campaign = getCampaignById("glass-harbor");
  if (!campaign) throw new Error("missing fixture");

  const { rerender } = render(<CommandCenterShell campaign={campaign} role="player" activeStage="encounter" />);
  expect(screen.queryByText(/Push to shared stage/i)).not.toBeInTheDocument();

  rerender(<CommandCenterShell campaign={campaign} role="dm" activeStage="encounter" />);
  expect(screen.getByText(/Push to shared stage/i)).toBeInTheDocument();
  expect(screen.getByText(/Vale Warden/i)).toBeInTheDocument();
  expect(screen.getByText(/45s remaining/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/omnipath/command-center/CommandCenterShell.test.tsx`

Expected: FAIL because DM controls are not rendered.

- [ ] **Step 3: Add the DM layer and encounter emphasis**

```tsx
// src/components/omnipath/command-center/DmConsolePanel.tsx
import type { CampaignFixture, StageId } from "@/lib/omnipath/demoData";

export function DmConsolePanel({
  campaign,
  activeStage,
}: {
  campaign: CampaignFixture;
  activeStage: StageId;
}) {
  return (
    <aside aria-label="DM private controls">
      <p>DM private console</p>
      <button type="button">Push to shared stage</button>
      <button type="button">Advance turn</button>
      <p>Hidden notes stay laptop-only.</p>
      {activeStage === "encounter" ? <p>{campaign.encounter.activeActor}</p> : null}
    </aside>
  );
}
```

```tsx
// updated fragment in src/components/omnipath/command-center/CommandCenterShell.tsx
{role === "dm" ? <DmConsolePanel campaign={campaign} activeStage={activeStage} /> : null}
<StatusStrip
  label={activeStage === "encounter" ? `${campaign.encounter.activeActor} active` : role === "dm" ? "DM live control" : "Waiting for DM cue"}
  timer={campaign.encounter.turnTimerSeconds}
/>
```

```tsx
// updated fragment in src/components/omnipath/command-center/SharedStage.tsx
if (activeStage === "encounter") {
  return (
    <section>
      <h1>{campaign.encounter.activeActor}</h1>
      <ul>
        {campaign.encounter.enemies.map((enemy) => (
          <li key={enemy.id}>{enemy.name} • {enemy.status}</li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- src/components/omnipath/command-center/CommandCenterShell.test.tsx`

Expected: PASS with `2 passed`.

- [ ] **Step 5: Commit**

```bash
git add src/components/omnipath/command-center
git commit -m "feat: add dm controls and encounter mode"
```

## Task 6: Build The Player Companion And Turn-Locked Action Tray

**Files:**
- Create: `src/components/omnipath/player/PlayerCompanionShell.tsx`
- Create: `src/components/omnipath/player/PlayerCompanionShell.module.css`
- Create: `src/components/omnipath/player/PlayerCompanionShell.test.tsx`
- Modify: `src/app/characters/[characterId]/page.tsx`

- [ ] **Step 1: Write the failing player-companion test**

```tsx
// src/components/omnipath/player/PlayerCompanionShell.test.tsx
import { render, screen } from "@testing-library/react";
import { getCharacterById } from "@/lib/omnipath/demoData";
import { PlayerCompanionShell } from "@/components/omnipath/player/PlayerCompanionShell";

describe("PlayerCompanionShell", () => {
  it("keeps the action tray locked outside the player's turn while preserving the event feed", () => {
    const character = getCharacterById("vale-warden");
    if (!character) throw new Error("missing fixture");

    render(<PlayerCompanionShell character={character} />);

    expect(screen.getByRole("heading", { name: /Vale Warden/i })).toBeInTheDocument();
    expect(screen.getByText(/Scene updated/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions unlock only on your turn/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /End Turn/i })).toBeDisabled();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/omnipath/player/PlayerCompanionShell.test.tsx`

Expected: FAIL because `PlayerCompanionShell` does not exist.

- [ ] **Step 3: Implement the player companion route and shell**

```tsx
// src/components/omnipath/player/PlayerCompanionShell.tsx
import type { CharacterFixture } from "@/lib/omnipath/demoData";
import styles from "./PlayerCompanionShell.module.css";

export function PlayerCompanionShell({ character }: { character: CharacterFixture }) {
  return (
    <main className={styles.shell}>
      <header className={styles.summary}>
        <h1>{character.name}</h1>
        <p>{character.status}</p>
      </header>

      <section className={styles.dashboard}>
        <article>
          <h2>Inventory</h2>
          <ul>
            {character.inventory.map((item) => (
              <li key={item.id}>{item.name} — {item.detail}</li>
            ))}
          </ul>
        </article>

        <aside>
          <h2>Event feed</h2>
          <ul>
            {character.feed.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.label}</strong>
                <span>{entry.detail}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <footer className={styles.actionTray}>
        <p>{character.actionState.lockReason}</p>
        <button type="button" disabled={!character.actionState.canAct}>
          End Turn
        </button>
      </footer>
    </main>
  );
}
```

```tsx
// src/app/characters/[characterId]/page.tsx
import { notFound } from "next/navigation";
import { PlayerCompanionShell } from "@/components/omnipath/player/PlayerCompanionShell";
import { getCharacterById } from "@/lib/omnipath/demoData";

type CharacterSheetPageProps = {
  params: Promise<{ characterId: string }>;
};

export default async function CharacterSheetPage({ params }: CharacterSheetPageProps) {
  const { characterId } = await params;
  const character = getCharacterById(characterId);

  if (!character) notFound();

  return <PlayerCompanionShell character={character} />;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- src/components/omnipath/player/PlayerCompanionShell.test.tsx`

Expected: PASS with `1 passed`.

- [ ] **Step 5: Commit**

```bash
git add src/app/characters/[characterId]/page.tsx src/components/omnipath/player
git commit -m "feat: add player companion shell"
```

## Task 7: Replace Remaining Placeholder Routes And Delete The Old Placeholder Chrome

**Files:**
- Create: `src/components/omnipath/support/SimpleShell.tsx`
- Modify: `src/app/campaigns/[campaignId]/lobby/page.tsx`
- Modify: `src/app/campaigns/[campaignId]/session-zero/page.tsx`
- Modify: `src/app/login/page.tsx`
- Modify: `src/app/profile/page.tsx`
- Delete: `src/components/layout/RoutePlaceholder.tsx`
- Delete: `src/components/layout/SiteHeader.tsx`
- Delete: `src/components/layout/SiteFooter.tsx`

- [ ] **Step 1: Write a failing cleanup smoke test**

```tsx
// add to src/components/omnipath/campaigns/CampaignBrowser.test.tsx
it("does not render legacy placeholder copy in the new shell", () => {
  render(<CampaignBrowser campaigns={listCampaigns()} />);

  expect(screen.queryByText(/route placeholder/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/phase 1 open/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/omnipath/campaigns/CampaignBrowser.test.tsx`

Expected: FAIL if any migrated component still leaks placeholder language.

- [ ] **Step 3: Replace the remaining placeholder pages with the shared support shell**

```tsx
// src/components/omnipath/support/SimpleShell.tsx
import type { ReactNode } from "react";

export function SimpleShell({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children?: ReactNode;
}) {
  return (
    <main className="omni-shell py-12">
      <p className="omni-kicker">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{summary}</p>
      <div className="mt-8">{children}</div>
    </main>
  );
}
```

```tsx
// src/app/campaigns/[campaignId]/lobby/page.tsx
import Link from "next/link";
import { SimpleShell } from "@/components/omnipath/support/SimpleShell";

export default async function CampaignLobbyPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params;

  return (
    <SimpleShell
      eyebrow="Lobby"
      title={`Campaign lobby: ${campaignId}`}
      summary="Use this room for attendance, ready-state, and staging before the shared command center goes live."
    >
      <Link href={`/campaigns/${campaignId}`}>Enter command center</Link>
    </SimpleShell>
  );
}
```

```tsx
// src/app/campaigns/[campaignId]/session-zero/page.tsx
import Link from "next/link";
import { SimpleShell } from "@/components/omnipath/support/SimpleShell";

export default async function SessionZeroPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params;

  return (
    <SimpleShell
      eyebrow="Session Zero"
      title={`Build a new character for ${campaignId}`}
      summary="Keep Session Zero focused on character creation and party setup, not on the old branching screen flow."
    >
      <Link href="/characters/vale-warden">Open companion preview</Link>
    </SimpleShell>
  );
}
```

```tsx
// src/app/login/page.tsx and src/app/profile/page.tsx
import { SimpleShell } from "@/components/omnipath/support/SimpleShell";

export default function LoginPage() {
  return (
    <SimpleShell
      eyebrow="Account"
      title="Account entry stays staged for the later auth phase"
      summary="This route remains simple and on-brand until Supabase-backed auth work is authorized."
    />
  );
}
```

- [ ] **Step 4: Delete the old placeholder chrome**

Run:

```powershell
Remove-Item 'src\components\layout\RoutePlaceholder.tsx'
Remove-Item 'src\components\layout\SiteHeader.tsx'
Remove-Item 'src\components\layout\SiteFooter.tsx'
```

Expected: no remaining route imports from `@/components/layout/RoutePlaceholder`, `SiteHeader`, or `SiteFooter`.

- [ ] **Step 5: Run the full test suite and the main app checks**

Run: `npm test`

Expected: PASS with all component tests green.

Run: `npm run lint`

Expected: PASS with no unresolved imports from deleted placeholder or screen-flow files.

- [ ] **Step 6: Commit**

```bash
git add src/app/campaigns/[campaignId]/lobby/page.tsx src/app/campaigns/[campaignId]/session-zero/page.tsx src/app/login/page.tsx src/app/profile/page.tsx src/components/omnipath/support/SimpleShell.tsx src/components/omnipath/campaigns/CampaignBrowser.test.tsx
git add -u src/components/layout
git commit -m "refactor: remove legacy placeholder chrome"
```

## Spec Coverage Check

- Shared command center: covered by Tasks 3, 4, and 5.
- DM private console: covered by Task 5.
- Player companion with turn gating: covered by Task 6.
- Neutral shell with skin support: covered by Task 3.
- Title screen preserving brand assets: covered by Task 2.
- Clean repo with no double-build confusion: covered by Tasks 2 and 7.
- Campaign browser and lobby/session-zero support: covered by Tasks 3 and 7.

## Placeholder Scan

No red-flag placeholder markers remain in the plan. Each task names concrete files, commands, and code snippets.

## Type Consistency Check

- Stage IDs stay consistent as `scene | map | art | notes | encounter`.
- Shared route roles stay consistent as `player | dm`.
- Demo fixtures are the single source for campaign and character state across all tasks.
