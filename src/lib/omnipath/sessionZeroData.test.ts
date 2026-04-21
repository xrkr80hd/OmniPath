import { describe, expect, it } from "vitest";

import {
  dndRaceOptions,
  getRaceLabel,
  getRaceOptionsForRealm,
  getRealmIdForRace,
} from "@/lib/omnipath/sessionZeroData";

describe("sessionZeroData", () => {
  it("keeps the DND list focused on main playable 5e character options", () => {
    const dndRaceLabels = getRaceOptionsForRealm("dnd").map((option) => option.label);

    expect(dndRaceOptions).toHaveLength(27);
    expect(dndRaceLabels).toEqual(expect.arrayContaining([
      "Human",
      "Half-Elf",
      "Half-Orc",
      "Tiefling",
      "Aarakocra",
      "Warforged",
      "Tortle",
      "Tabaxi",
      "Aasimar",
    ]));
    expect(dndRaceLabels).not.toEqual(expect.arrayContaining([
      "Bugbear",
      "Goblin",
      "Hobgoblin",
      "Yuan-ti",
      "Dhampir",
      "Minotaur",
    ]));
  });

  it("maps the curated DND race ids back to the DND realm", () => {
    expect(getRealmIdForRace("human")).toBe("dnd");
    expect(getRealmIdForRace("warforged")).toBe("dnd");
    expect(getRaceLabel("tabaxi")).toBe("Tabaxi");
  });
});
