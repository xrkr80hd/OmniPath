import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CharacterPreviewShell } from "./CharacterPreviewShell";

describe("CharacterPreviewShell", () => {
  it("shows the created character summary instead of the stale companion shortcut", () => {
    render(
      <CharacterPreviewShell
        character={{
          name: "Ari Vale",
          gender: "female",
          raceLabel: "Hill Dwarf",
          backgroundLabel: "Wayfarer",
          inspirationTrait: "Harbor oath",
          inspirationSource: "Protecting the last lantern on the breakwater",
          positiveTraits: ["Steadfast", "Curious"],
          negativeTraits: ["Stubborn", "Reckless"],
          statModeLabel: "Heroic array",
          statline: [
            { label: "Might", value: 15 },
            { label: "Agility", value: 13 },
            { label: "Wit", value: 12 },
            { label: "Resolve", value: 14 },
            { label: "Presence", value: 10 },
            { label: "Lore", value: 8 },
          ],
          kitLabel: "Wayfarer Pack",
          kitItems: ["Weathered bedroll", "Harbor map", "Signal chalk"],
          portraitPrompt:
            "Portrait of Ari Vale, a female hill dwarf wayfarer with a grounded traveler look.",
          selectedCampaignName: "Glass Harbor",
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: /ari vale/i })).toBeInTheDocument();
    expect(screen.getByText(/harbor oath/i)).toBeInTheDocument();
    expect(screen.getByText(/steadfast/i)).toBeInTheDocument();
    expect(screen.getByText(/weathered bedroll/i)).toBeInTheDocument();
    expect(screen.getByText(/glass harbor/i)).toBeInTheDocument();
    expect(screen.getByText(/portrait of ari vale/i)).toBeInTheDocument();
  });
});
