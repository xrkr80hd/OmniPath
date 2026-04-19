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

function cloneCampaign(campaign: CampaignFixture): CampaignFixture {
  return {
    ...campaign,
    stageOrder: [...campaign.stageOrder],
    sharedStage: {
      scene: { ...campaign.sharedStage.scene },
      map: { ...campaign.sharedStage.map },
      art: { ...campaign.sharedStage.art },
      notes: { ...campaign.sharedStage.notes },
    },
    encounter: {
      ...campaign.encounter,
      enemies: campaign.encounter.enemies.map((enemy) => ({ ...enemy })),
    },
  };
}

function cloneCharacter(character: CharacterFixture): CharacterFixture {
  return {
    ...character,
    actionState: { ...character.actionState },
    inventory: character.inventory.map((item) => ({ ...item })),
    feed: character.feed.map((item) => ({ ...item })),
  };
}

export function getCampaignById(id: string) {
  const campaign = campaigns.find((entry) => entry.id === id);
  return campaign ? cloneCampaign(campaign) : undefined;
}

export function getCharacterById(id: string) {
  const character = characters.find((entry) => entry.id === id);
  return character ? cloneCharacter(character) : undefined;
}

export function listCampaigns() {
  return campaigns.map((campaign) => cloneCampaign(campaign));
}
