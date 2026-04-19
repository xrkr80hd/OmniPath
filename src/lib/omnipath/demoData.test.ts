import { describe, expect, it } from "vitest";

import {
  getCampaignById,
  getCharacterById,
  listCampaigns,
  stageOrder,
} from "@/lib/omnipath/demoData";

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

  it("keeps fixture reads isolated from caller mutation", () => {
    const campaigns = listCampaigns();
    campaigns[0]!.name = "Mutated Campaign";
    campaigns[0]!.sharedStage.scene.title = "Mutated Scene";

    const campaign = getCampaignById("glass-harbor");
    expect(campaign?.name).toBe("Glass Harbor");
    expect(campaign?.sharedStage.scene.title).toMatch(/Glass Harbor/i);

    const character = getCharacterById("vale-warden");
    if (!character) {
      throw new Error("Expected vale-warden fixture");
    }

    character.inventory[0]!.name = "Mutated Item";

    const rereadCharacter = getCharacterById("vale-warden");
    expect(rereadCharacter?.inventory[0]?.name).toBe("Harbor Hook");
  });
});
