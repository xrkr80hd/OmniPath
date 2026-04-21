import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { pushSpy } = vi.hoisted(() => ({
  pushSpy: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushSpy,
  }),
}));

import {
  getSavedCharacterById,
  saveCharacter,
  savedCharactersStorageKey,
  type SavedCharacterRecord,
} from "@/lib/omnipath/savedCharacters";

import { PlayerCompanionShell } from "./PlayerCompanionShell";

function createCharacter(overrides: Partial<SavedCharacterRecord> = {}): SavedCharacterRecord {
  return {
    id: "ari-vale",
    name: "Ari Vale",
    gender: "female",
    realmId: "dnd",
    realmLabel: "DND",
    raceId: "hill-dwarf",
    raceLabel: "Hill Dwarf",
    backgroundId: "wayfarer",
    backgroundLabel: "Wayfarer",
    campaignId: "glass-harbor",
    campaignName: "Glass Harbor",
    shortBackground: "Harbor runner turned lantern keeper.",
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
    portraitPrompt: "Portrait of Ari Vale, a female hill dwarf wayfarer.",
    presenceMode: "active",
    presenceLocationLabel: "",
    status: "Waiting for turn",
    actionState: {
      canAct: false,
      lockReason: "Actions unlock only on your turn.",
      secondsRemaining: 0,
    },
    inventory: [
      { id: "bedroll", name: "Weathered bedroll", detail: "Issued from the selected Session Zero kit." },
      { id: "map", name: "Harbor map", detail: "Issued from the selected Session Zero kit." },
    ],
    feed: [
      { id: "stage", label: "Scene updated", detail: "DM switched the table view back to Scene." },
      { id: "absence", label: "Party status", detail: "One party member remains camped away from the group." },
    ],
    portraitImageSrc: null,
    portraitCrop: { zoom: 1, x: 50, y: 50 },
    tokenCrop: { zoom: 1.4, x: 50, y: 30 },
    updatedAt: "2026-04-20T23:45:00.000Z",
    ...overrides,
  };
}

describe("PlayerCompanionShell", () => {
  beforeEach(() => {
    window.localStorage.clear();
    pushSpy.mockReset();

    class MockFileReader {
      result: string | null = null;
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;

      readAsDataURL(file: File) {
        this.result = `data:${file.type};base64,portrait-preview`;
        this.onload?.();
      }
    }

    vi.stubGlobal("FileReader", MockFileReader);
  });

  it("keeps the action tray locked outside the player's turn while preserving the event feed", () => {
    const character = createCharacter();
    saveCharacter(character);

    render(<PlayerCompanionShell character={character} />);

    expect(screen.getByRole("heading", { name: /ari vale/i })).toBeInTheDocument();
    expect(screen.getByText(/scene updated/i)).toBeInTheDocument();
    expect(screen.getByText(/actions unlock only on your turn/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /step away for now/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /leave game/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /end turn/i })).toBeDisabled();
  });

  it("lets a waiting player step away with a natural MVP update and return later", async () => {
    const user = userEvent.setup();
    const character = createCharacter();
    saveCharacter(character);

    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0);

    render(<PlayerCompanionShell character={character} />);

    await user.click(screen.getByRole("button", { name: /step away for now/i }));

    expect(
      screen.getByRole("heading", { name: /ari vale/i }).nextElementSibling,
    ).toHaveTextContent(/stepped away • back at camp/i);
    expect(screen.getByText(/mvp update/i)).toBeInTheDocument();
    expect(screen.getByText(/ari vale has gone back to camp/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /return to table/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /return to table/i }));

    expect(screen.getByText(/ari vale has returned from camp/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /step away for now/i })).toBeInTheDocument();
  });

  it("lets a player leave the game cleanly and routes back out", async () => {
    const user = userEvent.setup();
    const character = createCharacter();
    saveCharacter(character);

    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.25);

    render(<PlayerCompanionShell character={character} />);

    await user.click(screen.getByRole("button", { name: /leave game/i }));

    expect(pushSpy).toHaveBeenCalledWith("/campaigns");
    expect(window.localStorage.getItem(savedCharactersStorageKey)).toContain(
      "has left the game and gone back",
    );
    expect(getSavedCharacterById("ari-vale")?.presenceMode).toBe("gone");
  });

  it("lets the player upload a local portrait and adjust portrait and token framing", async () => {
    const user = userEvent.setup();
    const character = createCharacter();
    saveCharacter(character);

    render(<PlayerCompanionShell character={character} />);

    const file = new File(["portrait"], "ari-vale.png", { type: "image/png" });

    await user.upload(screen.getByLabelText(/choose portrait image/i), file);

    await waitFor(() => {
      expect(screen.getByAltText(/ari vale portrait/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/portrait saved/i)).toBeInTheDocument();
    expect(window.localStorage.getItem(savedCharactersStorageKey)).toContain(
      "portrait-preview",
    );

    const portraitZoomSlider = screen.getByRole("slider", { name: /portrait zoom/i });
    const tokenZoomSlider = screen.getByRole("slider", { name: /token zoom/i });

    fireEvent.change(portraitZoomSlider, { target: { value: "1.4" } });
    fireEvent.change(tokenZoomSlider, { target: { value: "1.8" } });

    expect((portraitZoomSlider as HTMLInputElement).value).not.toBe("1");
    expect((tokenZoomSlider as HTMLInputElement).value).not.toBe("1.4");
    expect(screen.queryByRole("textbox", { name: /portrait url/i })).not.toBeInTheDocument();
  });

  it("shows the party roster for the current campaign on the companion screen", () => {
    const character = createCharacter();
    const secondCharacter = createCharacter({
      id: "bram-fell",
      name: "Bram Fell",
      updatedAt: "2026-04-20T23:46:00.000Z",
      status: "Waiting near the harbor gate",
    });

    saveCharacter(character);
    saveCharacter(secondCharacter);

    render(<PlayerCompanionShell character={character} />);

    const partyPanel = screen.getByText(/party presence/i).closest("article");

    if (!partyPanel) {
      throw new Error("missing party panel");
    }

    expect(screen.getByText(/party presence/i)).toBeInTheDocument();
    expect(within(partyPanel).getByText(/ari vale/i)).toBeInTheDocument();
    expect(within(partyPanel).getByText(/bram fell/i)).toBeInTheDocument();
  });
});
