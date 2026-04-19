import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getCampaignById } from "@/lib/omnipath/demoData";

import { CommandCenterShell } from "./CommandCenterShell";

describe("CommandCenterShell", () => {
  it("renders the scene-first shared stage with persistent rail and status strip", () => {
    const campaign = getCampaignById("glass-harbor");

    if (!campaign) {
      throw new Error("missing fixture");
    }

    render(<CommandCenterShell campaign={campaign} role="player" />);

    expect(
      screen.getByRole("heading", { name: /glass harbor, after the storm/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/breakwater causeway/i)).toBeInTheDocument();
    expect(screen.getAllByText(/4 present • 1 absent at inn/i)).toHaveLength(2);
    expect(screen.getByText(/waiting for dm cue/i)).toBeInTheDocument();
  });

  it("renders stage tabs as route links that preserve campaign and role context", () => {
    const campaign = getCampaignById("glass-harbor");

    if (!campaign) {
      throw new Error("missing fixture");
    }

    render(<CommandCenterShell campaign={campaign} role="dm" activeStage="map" />);

    expect(
      screen.getByRole("heading", { name: /breakwater route map/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /scene/i })).toHaveAttribute(
      "href",
      "/campaigns/glass-harbor?role=dm&stage=scene",
    );
    expect(screen.getByRole("link", { name: /map/i })).toHaveAttribute(
      "href",
      "/campaigns/glass-harbor?role=dm&stage=map",
    );
    expect(screen.getByRole("link", { name: /encounter/i })).toHaveAttribute(
      "href",
      "/campaigns/glass-harbor?role=dm&stage=encounter",
    );
  });
});
