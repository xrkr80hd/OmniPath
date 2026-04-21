import {
  buildCharacterPreviewData,
  sessionZeroDraftStorageKey,
  type SessionZeroDraft,
} from "@/lib/omnipath/sessionZeroData";

export const savedCharactersStorageKey = "omnipath:saved-characters";
export const lastSavedCharacterIdStorageKey = "omnipath:last-character-id";

export type SavedCharacterCrop = {
  zoom: number;
  x: number;
  y: number;
};

export type SavedCharacterRecord = {
  id: string;
  name: string;
  gender: SessionZeroDraft["gender"];
  realmId: string;
  realmLabel: string;
  raceId: string;
  raceLabel: string;
  backgroundId: string;
  backgroundLabel: string;
  campaignId: string;
  campaignName: string;
  shortBackground: string;
  inspirationTrait: string;
  inspirationSource: string;
  positiveTraits: string[];
  negativeTraits: string[];
  statModeLabel: string;
  statline: { label: string; value: number }[];
  kitLabel: string;
  kitItems: string[];
  portraitPrompt: string;
  presenceMode: "active" | "away" | "gone";
  presenceLocationLabel: string;
  status: string;
  actionState: {
    canAct: boolean;
    lockReason: string;
    secondsRemaining: number;
  };
  inventory: { id: string; name: string; detail: string }[];
  feed: { id: string; label: string; detail: string }[];
  portraitImageSrc: string | null;
  portraitCrop: SavedCharacterCrop;
  tokenCrop: SavedCharacterCrop;
  updatedAt: string;
};

const defaultPortraitCrop: SavedCharacterCrop = {
  zoom: 1,
  x: 50,
  y: 50,
};

const defaultTokenCrop: SavedCharacterCrop = {
  zoom: 1.4,
  x: 50,
  y: 30,
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function cloneCrop(crop: SavedCharacterCrop) {
  return { ...crop };
}

function cloneCharacter(record: SavedCharacterRecord): SavedCharacterRecord {
  return {
    ...record,
    positiveTraits: [...record.positiveTraits],
    negativeTraits: [...record.negativeTraits],
    statline: record.statline.map((entry) => ({ ...entry })),
    kitItems: [...record.kitItems],
    actionState: { ...record.actionState },
    inventory: record.inventory.map((item) => ({ ...item })),
    feed: record.feed.map((item) => ({ ...item })),
    portraitCrop: cloneCrop(record.portraitCrop),
    tokenCrop: cloneCrop(record.tokenCrop),
  };
}

function slugifyName(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return slug || "traveler";
}

function createCharacterId(name: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${slugifyName(name)}-${crypto.randomUUID().slice(0, 8)}`;
  }

  return `${slugifyName(name)}-${Date.now().toString(36)}`;
}

function readRawCharacters() {
  if (!canUseStorage()) {
    return [] as SavedCharacterRecord[];
  }

  const stored = window.localStorage.getItem(savedCharactersStorageKey);

  if (!stored) {
    return [] as SavedCharacterRecord[];
  }

  try {
    const parsed = JSON.parse(stored) as SavedCharacterRecord[];
    return Array.isArray(parsed) ? parsed.map((record) => cloneCharacter(record)) : [];
  } catch {
    return [] as SavedCharacterRecord[];
  }
}

function writeRawCharacters(records: SavedCharacterRecord[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(savedCharactersStorageKey, JSON.stringify(records));
}

function buildDefaultInventory(kitItems: string[]) {
  if (kitItems.length > 0) {
    return kitItems.map((item, index) => ({
      id: `kit-${index}`,
      name: item,
      detail: "Issued from the selected Session Zero kit.",
    }));
  }

  return [
    {
      id: "journal",
      name: "Traveler's journal",
      detail: "A blank place to record omens, clues, and unfinished promises.",
    },
  ];
}

function buildDefaultFeed(name: string, campaignName: string) {
  return [
    {
      id: "companion-ready",
      label: "Companion ready",
      detail: `${name} now opens from the character created in Session Zero instead of the old fixture path.`,
    },
    {
      id: "campaign-link",
      label: "Campaign tether",
      detail:
        campaignName && campaignName !== "Campaign not selected"
          ? `${name} is attuned to ${campaignName}.`
          : `${name} has not chosen a campaign yet.`,
    },
  ];
}

export function listSavedCharacters() {
  return readRawCharacters();
}

export function getSavedCharacterById(id: string) {
  return listSavedCharacters().find((record) => record.id === id);
}

export function getSavedCharactersForCampaign(campaignId: string) {
  return listSavedCharacters()
    .filter((record) => record.campaignId === campaignId)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function getLastSavedCharacterId() {
  if (!canUseStorage()) {
    return "";
  }

  return window.localStorage.getItem(lastSavedCharacterIdStorageKey) ?? "";
}

export function saveCharacter(record: SavedCharacterRecord) {
  const records = listSavedCharacters();
  const nextRecord = cloneCharacter(record);
  const existingIndex = records.findIndex((entry) => entry.id === nextRecord.id);

  if (existingIndex >= 0) {
    records.splice(existingIndex, 1, nextRecord);
  } else {
    records.unshift(nextRecord);
  }

  writeRawCharacters(records);

  if (canUseStorage()) {
    window.localStorage.setItem(lastSavedCharacterIdStorageKey, nextRecord.id);
  }

  return nextRecord;
}

export function upsertSavedCharacterFromDraft(draft: SessionZeroDraft) {
  const preview = buildCharacterPreviewData(draft);
  const existing = draft.savedCharacterId
    ? getSavedCharacterById(draft.savedCharacterId)
    : undefined;
  const name = preview.name.trim() || existing?.name || "Unnamed Traveler";
  const nextRecord: SavedCharacterRecord = {
    id: existing?.id ?? createCharacterId(name),
    name,
    gender: draft.gender,
    realmId: draft.realmId,
    realmLabel: preview.realmLabel,
    raceId: draft.raceId,
    raceLabel: preview.raceLabel,
    backgroundId: draft.backgroundId,
    backgroundLabel: preview.backgroundLabel,
    campaignId: draft.selectedCampaignId,
    campaignName: preview.selectedCampaignName,
    shortBackground: draft.shortBackground,
    inspirationTrait: preview.inspirationTrait,
    inspirationSource: preview.inspirationSource,
    positiveTraits: [...preview.positiveTraits],
    negativeTraits: [...preview.negativeTraits],
    statModeLabel: preview.statModeLabel,
    statline: preview.statline.map((entry) => ({ ...entry })),
    kitLabel: preview.kitLabel,
    kitItems: [...preview.kitItems],
    portraitPrompt: preview.portraitPrompt,
    presenceMode: existing?.presenceMode ?? "active",
    presenceLocationLabel: existing?.presenceLocationLabel ?? "",
    status: existing?.status ?? "Waiting for turn",
    actionState: existing?.actionState
      ? { ...existing.actionState }
      : {
        canAct: false,
        lockReason: "Actions unlock only on your turn.",
        secondsRemaining: 0,
      },
    inventory: existing?.inventory?.length
      ? existing.inventory.map((item) => ({ ...item }))
      : buildDefaultInventory(preview.kitItems),
    feed: existing?.feed?.length
      ? existing.feed.map((item) => ({ ...item }))
      : buildDefaultFeed(name, preview.selectedCampaignName),
    portraitImageSrc: existing?.portraitImageSrc ?? null,
    portraitCrop: cloneCrop(existing?.portraitCrop ?? defaultPortraitCrop),
    tokenCrop: cloneCrop(existing?.tokenCrop ?? defaultTokenCrop),
    updatedAt: new Date().toISOString(),
  };

  return saveCharacter(nextRecord);
}

export function writeSavedCharacterIdToDraft(characterId: string, draftKey = sessionZeroDraftStorageKey) {
  if (!canUseStorage()) {
    return;
  }

  const stored = window.localStorage.getItem(draftKey);

  if (!stored) {
    return;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<SessionZeroDraft>;
    window.localStorage.setItem(
      draftKey,
      JSON.stringify({
        ...parsed,
        savedCharacterId: characterId,
      }),
    );
  } catch {
    // Preserve the current draft if it cannot be parsed.
  }
}
