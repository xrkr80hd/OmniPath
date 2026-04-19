import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getCharacterById } from "@/lib/omnipath/demoData";

import { PlayerCompanionShell } from "./PlayerCompanionShell";

describe("PlayerCompanionShell", () => {
  it("keeps the action tray locked outside the player's turn while preserving the event feed", () => {
    const character = getCharacterById("vale-warden");

    if (!character) {
      throw new Error("missing fixture");
    }

    render(<PlayerCompanionShell character={character} />);

    expect(screen.getByRole("heading", { name: /vale warden/i })).toBeInTheDocument();
    expect(screen.getByText(/scene updated/i)).toBeInTheDocument();
    expect(screen.getByText(/actions unlock only on your turn/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /end turn/i })).toBeDisabled();
  });
});
