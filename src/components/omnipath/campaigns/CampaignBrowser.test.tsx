import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { listCampaigns } from "@/lib/omnipath/demoData";

import { CampaignBrowser } from "./CampaignBrowser";

describe("CampaignBrowser", () => {
  it("renders accessible resume links for the provided campaigns", () => {
    render(<CampaignBrowser campaigns={listCampaigns()} />);

    expect(
      screen.getByRole("heading", { name: /resume a campaign/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Glass Harbor")).toBeInTheDocument();
    expect(screen.getByText("neutral shell")).toBeInTheDocument();

    const glassHarborLink = screen.getByRole("link", { name: /glass harbor/i });

    expect(glassHarborLink).toHaveAttribute("href", "/campaigns/glass-harbor");
    expect(glassHarborLink).toHaveAccessibleName(
      /glass harbor.*neutral shell.*breakwater causeway.*4 present/i,
    );
  });

  it("does not render legacy placeholder copy in the new shell", () => {
    render(<CampaignBrowser campaigns={listCampaigns()} />);

    expect(screen.queryByText(/route placeholder/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/phase 1 open/i)).not.toBeInTheDocument();
  });
});
