export const CUSTOM_SPECIES_VALUE = "__custom__" as const;

export const promptBuilderCategories = [
  {
    id: "fantasy",
    label: "Fantasy",
    description: "Classic lineages such as elves, dwarves, gnomes, and orcs.",
    speciesPresets: ["Elf", "Orc", "Gnome", "Dwarf", "Tiefling", "Halfling", "Human"],
  },
  {
    id: "sci-fi",
    label: "Sci-Fi",
    description: "Spacefaring species, engineered beings, and alien cultures.",
    speciesPresets: ["Human Colonist", "Grey Alien", "Synthborn", "Insectoid Nomad", "Starforged", "Bio-Engineered Pilot"],
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    description: "Augmented street survivors, clones, and chrome-heavy identities.",
    speciesPresets: ["Baseline Human", "Street-Tuned Cyborg", "Corporate Clone", "Netborn Hybrid", "Chrome Adept", "Neon Drifter"],
  },
  {
    id: "post-apocalyptic",
    label: "Post-Apocalyptic",
    description: "Wasteland survivors, mutants, and bunker-raised descendants.",
    speciesPresets: ["Wasteland Human", "Mutant", "Vault Dweller", "Ash Nomad", "Scavenger Hybrid", "Rad-Born Survivor"],
  },
] as const;

export const genderOptions = ["Masculine", "Feminine", "Androgynous", "Nonbinary"] as const;
export const skinToneOptions = [
  "Porcelain",
  "Fair",
  "Olive",
  "Bronze",
  "Brown",
  "Deep Brown",
  "Onyx",
  "Synthetic Chrome",
  "Emerald",
  "Azure",
] as const;
export const hairColorOptions = [
  "Black",
  "Brown",
  "Blonde",
  "Red",
  "Silver",
  "White",
  "Blue",
  "Green",
  "Magenta",
  "Bald / None",
] as const;
export const eyeColorOptions = [
  "Brown",
  "Hazel",
  "Blue",
  "Green",
  "Amber",
  "Gray",
  "Violet",
  "Red",
  "Gold",
  "Black",
] as const;

export type PromptBuilderCategoryId = (typeof promptBuilderCategories)[number]["id"];

export type PromptBuilderState = {
  category: PromptBuilderCategoryId | "";
  speciesPreset: string;
  customSpeciesName: string;
  gender: string;
  skinTone: string;
  hairColor: string;
  eyeColor: string;
  generatedPrompt: string;
};

export const initialPromptBuilderState: PromptBuilderState = {
  category: "",
  speciesPreset: "",
  customSpeciesName: "",
  gender: "",
  skinTone: "",
  hairColor: "",
  eyeColor: "",
  generatedPrompt: "",
};

const resetFieldsByChange = {
  category: ["speciesPreset", "customSpeciesName", "gender", "skinTone", "hairColor", "eyeColor", "generatedPrompt"],
  speciesPreset: ["customSpeciesName", "gender", "skinTone", "hairColor", "eyeColor", "generatedPrompt"],
  customSpeciesName: ["gender", "skinTone", "hairColor", "eyeColor", "generatedPrompt"],
  gender: ["skinTone", "hairColor", "eyeColor", "generatedPrompt"],
  skinTone: ["hairColor", "eyeColor", "generatedPrompt"],
  hairColor: ["eyeColor", "generatedPrompt"],
  eyeColor: ["generatedPrompt"],
} as const satisfies Record<string, readonly (keyof PromptBuilderState)[]>;

export type PromptBuilderResetField = keyof typeof resetFieldsByChange;

export function getPromptBuilderCategory(categoryId: PromptBuilderCategoryId | "") {
  return promptBuilderCategories.find((category) => category.id === categoryId);
}

export function isCustomSpecies(speciesPreset: string) {
  return speciesPreset === CUSTOM_SPECIES_VALUE;
}

export function getResolvedSpeciesName(state: Pick<PromptBuilderState, "speciesPreset" | "customSpeciesName">) {
  if (!state.speciesPreset) {
    return "";
  }

  if (!isCustomSpecies(state.speciesPreset)) {
    return state.speciesPreset;
  }

  return state.customSpeciesName.trim();
}

export function canGeneratePrompt(state: PromptBuilderState) {
  return Boolean(
    state.category &&
      getResolvedSpeciesName(state) &&
      state.gender &&
      state.skinTone &&
      state.hairColor &&
      state.eyeColor,
  );
}

export function applyPromptBuilderChange<Field extends PromptBuilderResetField>(
  state: PromptBuilderState,
  field: Field,
  value: PromptBuilderState[Field],
) {
  const nextState = {
    ...state,
    [field]: value,
  } as PromptBuilderState;

  for (const fieldToReset of resetFieldsByChange[field]) {
    nextState[fieldToReset] = initialPromptBuilderState[fieldToReset];
  }

  return nextState;
}

export function buildPrompt(state: PromptBuilderState) {
  if (!canGeneratePrompt(state)) {
    return "";
  }

  const category = getPromptBuilderCategory(state.category);
  const speciesName = getResolvedSpeciesName(state);

  if (!category || !speciesName) {
    return "";
  }

  return `Create a ${category.label.toLowerCase()} character portrait featuring a ${speciesName} character with a ${state.gender.toLowerCase()} presentation, ${state.skinTone.toLowerCase()} skin tone, ${state.hairColor.toLowerCase()} hair, and ${state.eyeColor.toLowerCase()} eyes.`;
}
