import { listCampaigns } from "@/lib/omnipath/demoData";

export const sessionZeroDraftStorageKey = "omnipath:session-zero:draft";

export type SessionZeroDraft = {
  name: string;
  gender: "male" | "female";
  shortBackground: string;
  realmId: string;
  raceId: string;
  backgroundId: string;
  height: "short" | "average" | "tall";
  build: "lean" | "balanced" | "broad";
  positiveTraitIds: string[];
  negativeTraitIds: string[];
  inspirationTrait: string;
  inspirationSource: string;
  portabilityMode: "worldbound" | "portable";
  statModeId: string;
  kitId: string;
  selectedCampaignId: string;
};

export type CharacterPreviewData = {
  name: string;
  gender: "male" | "female";
  realmLabel: string;
  raceLabel: string;
  backgroundLabel: string;
  inspirationTrait: string;
  inspirationSource: string;
  positiveTraits: string[];
  negativeTraits: string[];
  statModeLabel: string;
  statline: { label: string; value: number }[];
  kitLabel: string;
  kitItems: string[];
  portraitPrompt: string;
  selectedCampaignName: string;
};

export const raceOptions = [
  { id: "hill-dwarf", label: "Hill Dwarf", source: "DND", portraitCue: "broad cheekbones, weathered skin, practical braids, grounded traveler style" },
  { id: "mountain-dwarf", label: "Mountain Dwarf", source: "DND", portraitCue: "heavier armor lines, granite jaw, battle-worn presence, stoic bearing" },
  { id: "wood-elf", label: "Wood Elf", source: "DND", portraitCue: "keen eyes, woodland leathers, wind-cut hair, agile posture" },
  { id: "high-elf", label: "High Elf", source: "DND", portraitCue: "elegant posture, ceremonial details, refined features, luminous gaze" },
  { id: "human-freeblade", label: "Human Freeblade", source: "Pathfinder", portraitCue: "adaptable traveler gear, expressive face, well-used cloak, alert eyes" },
  { id: "half-orc", label: "Half-Orc", source: "Pathfinder", portraitCue: "scarred confidence, powerful build, worn steel accents, watchful expression" },
  { id: "gnome-tinker", label: "Gnome Tinker", source: "Pathfinder", portraitCue: "bright eyes, layered tools, clever grin, compact silhouette" },
  { id: "aelf-wanderer", label: "Aelf Wanderer", source: "Warhammer", portraitCue: "narrow silhouette, ritual fabrics, distant stare, windswept poise" },
  { id: "duardin-clansmith", label: "Duardin Clansmith", source: "Warhammer", portraitCue: "forge-marked hands, ash-dark beard, proud stance, tempered metal details" },
  { id: "stormcast-scion", label: "Stormcast Scion", source: "Warhammer", portraitCue: "heroic silhouette, celestial trim, calm intensity, radiant edge lighting" },
  { id: "ork-runner", label: "Ork Runner", source: "Shadowrun", portraitCue: "street-ready layers, sharpened tusks, practical cyber accents, restless posture" },
  { id: "elf-decker", label: "Elf Decker", source: "Shadowrun", portraitCue: "sleek jacket, faint neon reflections, focused eyes, urban elegance" },
  { id: "dwarf-rigger", label: "Dwarf Rigger", source: "Shadowrun", portraitCue: "mechanic's gloves, compact toolkit, grease-worn details, steady confidence" },
  { id: "troll-vanguard", label: "Troll Vanguard", source: "Shadowrun", portraitCue: "towering outline, reinforced straps, protective stance, lived-in armor plates" },
  { id: "voidborn-navigator", label: "Voidborn Navigator", source: "OmniPath", portraitCue: "dimensional cloak, starlit trim, far-traveled expression, quiet authority" },
] as const;

export const realmOptions = [
  { id: "dnd", label: "DND" },
  { id: "pathfinder", label: "Pathfinder" },
  { id: "warhammer", label: "Warhammer" },
  { id: "shadowrun", label: "Shadowrun" },
  { id: "omnipath", label: "OmniPath" },
] as const;

export const backgroundPresets = [
  { id: "wayfarer", label: "Wayfarer", cue: "seasoned traveler who survives by road sense and intuition" },
  { id: "temple-ward", label: "Temple Ward", cue: "guardian trained around sacred duties and quiet discipline" },
  { id: "harbor-hand", label: "Harbor Hand", cue: "dockside worker shaped by tides, cargo, and rough company" },
  { id: "frontier-scout", label: "Frontier Scout", cue: "pathfinder who learned to read danger before others notice it" },
  { id: "court-scribe", label: "Court Scribe", cue: "educated observer who notices patterns, politics, and hidden motives" },
  { id: "ruin-seeker", label: "Ruin Seeker", cue: "relic hunter drawn to forgotten places and dangerous history" },
  { id: "guild-apprentice", label: "Guild Apprentice", cue: "trade-trained worker with practical craft habits and ambition" },
  { id: "wasteland-runner", label: "Wasteland Runner", cue: "survivor shaped by scarcity, grit, and fast decisions" },
  { id: "arcology-drifter", label: "Arcology Drifter", cue: "urban survivor used to layered systems, surveillance, and improvisation" },
  { id: "star-pilgrim", label: "Star Pilgrim", cue: "traveler guided by belief, celestial signs, and a larger calling" },
] as const;

export const positiveTraitOptions = [
  "Steadfast", "Curious", "Compassionate", "Disciplined", "Protective",
  "Honorable", "Inventive", "Observant", "Patient", "Resolute",
  "Diplomatic", "Adaptable", "Fearless", "Hopeful", "Resourceful",
  "Loyal", "Focused", "Merciful", "Reliable", "Graceful",
] as const;

export const negativeTraitOptions = [
  "Stubborn", "Reckless", "Greedy", "Scheming", "Mistrustful",
  "Impulsive", "Jealous", "Proud", "Cold", "Secretive",
  "Abrasive", "Brooding", "Vain", "Overconfident", "Restless",
  "Suspicious", "Manipulative", "Hot-tempered", "Possessive", "Fatalistic",
] as const;

export const statModeOptions = [
  {
    id: "heroic-array",
    label: "Heroic array",
    statline: [
      { label: "Might", value: 15 },
      { label: "Agility", value: 13 },
      { label: "Wit", value: 12 },
      { label: "Resolve", value: 14 },
      { label: "Presence", value: 10 },
      { label: "Lore", value: 8 },
    ],
  },
  {
    id: "traveler-array",
    label: "Traveler array",
    statline: [
      { label: "Might", value: 12 },
      { label: "Agility", value: 14 },
      { label: "Wit", value: 13 },
      { label: "Resolve", value: 12 },
      { label: "Presence", value: 10 },
      { label: "Lore", value: 15 },
    ],
  },
  {
    id: "bonus-aware-roll",
    label: "Bonus-aware roll",
    statline: [
      { label: "Might", value: 14 },
      { label: "Agility", value: 12 },
      { label: "Wit", value: 11 },
      { label: "Resolve", value: 15 },
      { label: "Presence", value: 9 },
      { label: "Lore", value: 13 },
    ],
  },
] as const;

export const inventoryKitOptions = [
  { id: "wayfarer-pack", label: "Wayfarer Pack", items: ["Weathered bedroll", "Harbor map", "Signal chalk"] },
  { id: "warden-kit", label: "Warden Kit", items: ["Lantern token", "Bound field journal", "Coil of line"] },
  { id: "runner-cache", label: "Runner Cache", items: ["Compact med patch", "Tag-out marker", "Burner comm"] },
] as const;

export const stepLabels = ["Basics", "Identity", "Traits", "Stats", "Kit", "Review"] as const;

export function createInitialSessionZeroDraft(initialCampaignId?: string): SessionZeroDraft {
  return {
    name: "",
    gender: "female",
    shortBackground: "",
    realmId: "",
    raceId: "",
    backgroundId: "",
    height: "average",
    build: "balanced",
    positiveTraitIds: [],
    negativeTraitIds: [],
    inspirationTrait: "",
    inspirationSource: "",
    portabilityMode: "worldbound",
    statModeId: "",
    kitId: "",
    selectedCampaignId: initialCampaignId ?? "",
  };
}

export function getCampaignOptions() {
  return listCampaigns().map((campaign) => ({
    id: campaign.id,
    label: campaign.name,
    summary: `${campaign.location} • ${campaign.partySummary}`,
  }));
}

export function getRealmIdForRace(id: string) {
  return raceOptions.find((option) => option.id === id)?.source.toLowerCase() ?? "";
}

export function getRealmLabel(id: string) {
  return realmOptions.find((option) => option.id === id)?.label ?? "Unknown realm";
}

export function getRaceOptionsForRealm(realmId: string) {
  return raceOptions.filter((option) => option.source.toLowerCase() === realmId);
}

export function getRaceLabel(id: string) {
  return raceOptions.find((option) => option.id === id)?.label ?? "Unknown lineage";
}

export function getBackgroundLabel(id: string) {
  return backgroundPresets.find((option) => option.id === id)?.label ?? "Unknown background";
}

export function getStatModeLabel(id: string) {
  return statModeOptions.find((option) => option.id === id)?.label ?? "Custom stats";
}

export function getKitLabel(id: string) {
  return inventoryKitOptions.find((option) => option.id === id)?.label ?? "Unknown kit";
}

function getStatline(id: string) {
  const statline = statModeOptions.find((option) => option.id === id)?.statline ?? [];
  return statline.map((entry) => ({ ...entry }));
}

function getKitItems(id: string) {
  return [...(inventoryKitOptions.find((option) => option.id === id)?.items ?? [])];
}

function getCampaignName(id: string) {
  return getCampaignOptions().find((option) => option.id === id)?.label ?? "Campaign not selected";
}

export function buildPortraitPrompt(draft: SessionZeroDraft) {
  const race = raceOptions.find((option) => option.id === draft.raceId);
  const background = backgroundPresets.find((option) => option.id === draft.backgroundId);
  const positiveTraits = draft.positiveTraitIds.map((id) => id.toLowerCase()).join(", ");
  const negativeTraits = draft.negativeTraitIds.map((id) => id.toLowerCase()).join(", ");
  const backgroundNote = draft.shortBackground.trim() ? ` Background note: ${draft.shortBackground.trim()}.` : "";

  return `Portrait of ${draft.name}, a ${draft.gender} ${race?.label ?? "traveler"} with a ${draft.height} stature and ${draft.build} build. ${race?.portraitCue ?? "Grounded adventurer styling."} Background: ${background?.label ?? "Unknown"} from a ${background?.cue ?? "lived-in past"}. Positive traits: ${positiveTraits || "steady resolve"}. Negative traits: ${negativeTraits || "guarded tension"}. Inspiration trait: ${draft.inspirationTrait || "unwritten"}.${backgroundNote}`;
}

export function buildCharacterPreviewData(draft: SessionZeroDraft): CharacterPreviewData {
  return {
    name: draft.name,
    gender: draft.gender,
    realmLabel: getRealmLabel(draft.realmId),
    raceLabel: getRaceLabel(draft.raceId),
    backgroundLabel: getBackgroundLabel(draft.backgroundId),
    inspirationTrait: draft.inspirationTrait,
    inspirationSource: draft.inspirationSource,
    positiveTraits: draft.positiveTraitIds,
    negativeTraits: draft.negativeTraitIds,
    statModeLabel: getStatModeLabel(draft.statModeId),
    statline: getStatline(draft.statModeId),
    kitLabel: getKitLabel(draft.kitId),
    kitItems: getKitItems(draft.kitId),
    portraitPrompt: buildPortraitPrompt(draft),
    selectedCampaignName: getCampaignName(draft.selectedCampaignId),
  };
}
