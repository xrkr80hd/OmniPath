export type ScreenFlowCharacter = {
  id: string;
  name: string;
  roleLine: string;
  resumeState: string;
};

export type ScreenFlowCampaign = {
  id: string;
  title: string;
  partyName: string;
  lastSavedAt: string;
  resumeNode: string;
};

export const screenFlowCharacters: ScreenFlowCharacter[] = [
  {
    id: "vale-warden",
    name: "Vale Warden",
    roleLine: "Cartographer of breach roads and field guide for unstable realms.",
    resumeState: "Safe Hub: Dawnwatch Docks",
  },
  {
    id: "serin-ashfall",
    name: "Serin Ashfall",
    roleLine: "Negotiator of ruined courts and keeper of expedition debts.",
    resumeState: "Safe Hub: Choir Hall",
  },
  {
    id: "nyra-runeglass",
    name: "Nyra Runeglass",
    roleLine: "Ritual engineer balancing archive wards and relic contracts.",
    resumeState: "Safe Hub: Signal Bastion",
  },
];

export const campaignsByCharacterId: Record<string, ScreenFlowCampaign[]> = {
  "vale-warden": [
    {
      id: "glass-harbor",
      title: "Glass Harbor",
      partyName: "Warden Crew",
      lastSavedAt: "Last saved: Dawnwatch Docks",
      resumeNode: "Resume node: Harbor relay gate",
    },
    {
      id: "starfall-vault",
      title: "Starfall Vault",
      partyName: "Night Relay",
      lastSavedAt: "Last saved: Relay Camp",
      resumeNode: "Resume node: Vault staging ramp",
    },
  ],
  "serin-ashfall": [
    {
      id: "emberwake-choir",
      title: "Emberwake Choir",
      partyName: "Ashfall Circle",
      lastSavedAt: "Last saved: Choir Hall",
      resumeNode: "Resume node: West nave gate",
    },
    {
      id: "glass-harbor",
      title: "Glass Harbor",
      partyName: "Harbor Delegation",
      lastSavedAt: "Last saved: Ledger Point",
      resumeNode: "Resume node: Customs dock bridge",
    },
  ],
  "nyra-runeglass": [
    {
      id: "iron-vault-echo",
      title: "Iron Vault Echo",
      partyName: "Runeglass Accord",
      lastSavedAt: "Last saved: Signal Bastion",
      resumeNode: "Resume node: Vault lantern ring",
    },
    {
      id: "glass-harbor",
      title: "Glass Harbor",
      partyName: "Relay Annex",
      lastSavedAt: "Last saved: Tide Archive",
      resumeNode: "Resume node: East slipway",
    },
  ],
};

export const defaultScreenFlowCharacterId = screenFlowCharacters[0]?.id ?? "";

export const screenFlowBackgroundSequence = [
  "/omnipath/assets/backgrounds/screen-flow/courtyard-ii.jpg",
  "/omnipath/assets/backgrounds/screen-flow/dark-forge-ii.jpg",
  "/omnipath/assets/backgrounds/screen-flow/dark-forge.jpg",
  "/omnipath/assets/backgrounds/screen-flow/epic-mountain-peak.jpg",
  "/omnipath/assets/backgrounds/screen-flow/forge-i.jpg",
  "/omnipath/assets/backgrounds/screen-flow/frozen-throne.jpg",
  "/omnipath/assets/backgrounds/screen-flow/night-forest-i.jpg",
  "/omnipath/assets/backgrounds/screen-flow/night-forest-ii.jpg",
  "/omnipath/assets/backgrounds/screen-flow/obs-cit.jpg",
  "/omnipath/assets/backgrounds/screen-flow/temple-courtyard-i.jpg",
  "/omnipath/assets/backgrounds/screen-flow/world-tree-i.jpg",
  "/omnipath/assets/backgrounds/screen-flow/world-tree-ii.jpg",
];

export function getRandomScreenFlowBackground() {
  if (screenFlowBackgroundSequence.length === 0) {
    return "/omnipath/screens/title-sequence/OP_fantasy1.jpg";
  }

  const randomIndex = Math.floor(Math.random() * screenFlowBackgroundSequence.length);
  return screenFlowBackgroundSequence[randomIndex] ?? screenFlowBackgroundSequence[0];
}

export function getCharacterById(characterId: string) {
  return screenFlowCharacters.find((character) => character.id === characterId) ?? screenFlowCharacters[0];
}

export function getCampaignsForCharacter(characterId: string) {
  return campaignsByCharacterId[characterId] ?? [];
}
