"use client";

import Image from "next/image";
import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import { type CSSProperties, useState } from "react";

import {
  buildPrompt,
  canGeneratePrompt,
  CUSTOM_SPECIES_VALUE,
  eyeColorOptions,
  genderOptions,
  getPromptBuilderCategory,
  getResolvedSpeciesName,
  hairColorOptions,
  initialPromptBuilderState,
  isCustomSpecies,
  promptBuilderCategories,
  skinToneOptions,
  type PromptBuilderState,
} from "./page3PromptBuilder";
import { getRandomScreenFlowBackground } from "./screenFlowData";
import styles from "./Page3CreateCharacterScreen.module.css";

const displayFont = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-op-display",
});

const monoFont = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-op-mono",
});

const creationTabs = ["Identity", "Stats & Skills", "Inventory", "Prompt Builder"] as const;
const topNavItems = ["Home", "Session Zero", "Party", "Maps", "DM Tools/Hideout"] as const;

type Page3CreateCharacterScreenProps = {
  onBackToPage2: () => void;
  onBackToTitle: () => void;
};

export function Page3CreateCharacterScreen({
  onBackToPage2,
  onBackToTitle,
}: Page3CreateCharacterScreenProps) {
  const [activeBackground] = useState<string>(() => getRandomScreenFlowBackground());
  const [promptBuilderState, setPromptBuilderState] = useState<PromptBuilderState>(initialPromptBuilderState);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const selectedCategory = getPromptBuilderCategory(promptBuilderState.category);
  const resolvedSpeciesName = getResolvedSpeciesName(promptBuilderState);
  const isCustomSpeciesSelected = isCustomSpecies(promptBuilderState.speciesPreset);
  const isSpeciesReady = Boolean(resolvedSpeciesName);
  const canChooseGender = isSpeciesReady;
  const canChooseSkinTone = canChooseGender && Boolean(promptBuilderState.gender);
  const canChooseHairColor = canChooseSkinTone && Boolean(promptBuilderState.skinTone);
  const canChooseEyeColor = canChooseHairColor && Boolean(promptBuilderState.hairColor);
  const isPromptReady = canGeneratePrompt(promptBuilderState);

  function clearCopyStatus() {
    setCopyStatus("idle");
  }

  function resetPromptBuilder() {
    setPromptBuilderState(initialPromptBuilderState);
    clearCopyStatus();
  }

  function handleCategoryChange(nextCategory: PromptBuilderState["category"]) {
    setPromptBuilderState({
      ...initialPromptBuilderState,
      category: nextCategory,
    });
    clearCopyStatus();
  }

  function handleSpeciesChange(nextSpeciesPreset: string) {
    setPromptBuilderState((currentState) => ({
      ...currentState,
      speciesPreset: nextSpeciesPreset,
      customSpeciesName: "",
      gender: "",
      skinTone: "",
      hairColor: "",
      eyeColor: "",
      generatedPrompt: "",
    }));
    clearCopyStatus();
  }

  function handleCustomSpeciesChange(nextCustomSpeciesName: string) {
    setPromptBuilderState((currentState) => ({
      ...currentState,
      customSpeciesName: nextCustomSpeciesName,
      gender: "",
      skinTone: "",
      hairColor: "",
      eyeColor: "",
      generatedPrompt: "",
    }));
    clearCopyStatus();
  }

  function handleAppearanceFieldChange(field: "gender" | "skinTone" | "hairColor" | "eyeColor", value: string) {
    setPromptBuilderState((currentState) => {
      if (field === "gender") {
        return {
          ...currentState,
          gender: value,
          skinTone: "",
          hairColor: "",
          eyeColor: "",
          generatedPrompt: "",
        };
      }

      if (field === "skinTone") {
        return {
          ...currentState,
          skinTone: value,
          hairColor: "",
          eyeColor: "",
          generatedPrompt: "",
        };
      }

      if (field === "hairColor") {
        return {
          ...currentState,
          hairColor: value,
          eyeColor: "",
          generatedPrompt: "",
        };
      }

      return {
        ...currentState,
        eyeColor: value,
        generatedPrompt: "",
      };
    });
    clearCopyStatus();
  }

  function handleGeneratePrompt() {
    const nextPrompt = buildPrompt(promptBuilderState);

    if (!nextPrompt) {
      return;
    }

    setPromptBuilderState((currentState) => ({
      ...currentState,
      generatedPrompt: nextPrompt,
    }));
    clearCopyStatus();
  }

  async function handleCopyPrompt() {
    if (!promptBuilderState.generatedPrompt) {
      return;
    }

    try {
      await navigator.clipboard.writeText(promptBuilderState.generatedPrompt);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <main
      className={`${styles.screen} ${displayFont.variable} ${monoFont.variable}`}
      style={
        {
          "--page3-bg-image": `url("${activeBackground}")`,
        } as CSSProperties
      }
    >
      <div className={styles.backgroundLayer} aria-hidden="true" />
      <div className={styles.backplate} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <section className={`omni-shell ${styles.shell}`} aria-label="Page 3 create character">
        <div className={styles.cornerLogoWrap}>
          <Image
            src="/omnipath/assets/logos/omnipath-logo-solo.png"
            alt="OmniPath logo"
            width={150}
            height={100}
            className={styles.cornerLogo}
            priority
          />
        </div>

        <nav className={styles.topNav} aria-label="Character creation sections">
          {topNavItems.map((item) => (
            <button key={item} type="button" className={styles.topNavButton}>
              {item}
            </button>
          ))}
        </nav>

        <article className={styles.popout}>
          <header className={styles.windowHeader}>
            <h1 className={styles.windowTitle}>Character Creation</h1>

            <div className={styles.headerActions}>
              <button type="button" className={styles.headerButton}>
                Print
              </button>
              <button type="button" className={styles.headerButton} onClick={onBackToPage2}>
                Cancel
              </button>
            </div>
          </header>

          <div className={styles.bodyColumns}>
            <aside className={styles.leftRail}>
              <section className={styles.railSection}>
                <h2 className={styles.sectionTitle}>Print Options</h2>

                <label className={styles.checkRow}>
                  <input type="checkbox" />
                  <span>Include Portrait</span>
                </label>
                <label className={styles.checkRow}>
                  <input type="checkbox" />
                  <span>Compact / Full</span>
                </label>
                <label className={styles.checkRow}>
                  <input type="checkbox" />
                  <span>Include Inventory</span>
                </label>
                <label className={styles.checkRow}>
                  <input type="checkbox" />
                  <span>Include Notes</span>
                </label>
              </section>

              <section className={styles.railSection}>
                <div className={styles.portraitPlaceholder} aria-hidden="true" />
                <p className={styles.mutedText}>Upload / Replace Portrait</p>
              </section>

              <section className={styles.railSection}>
                <h3 className={styles.subSectionTitle}>Token Preview</h3>
                <div className={styles.tokenPlaceholder} aria-hidden="true" />
              </section>

              <section className={styles.railSection}>
                <label className={styles.fieldLabel} htmlFor="page3-inventory-item">
                  Item
                </label>
                <input id="page3-inventory-item" className={styles.textInput} type="text" />
                <button type="button" className={styles.smallButton}>
                  Open Inventory
                </button>
              </section>
            </aside>

            <section className={styles.centerPanel}>
              <nav className={styles.tabBar} aria-label="Character creation tabs">
                {creationTabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={`${styles.tab} ${index === 0 ? styles.tabActive : ""}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>

              <div className={styles.formBlock}>
                <h2 className={styles.sectionHeading}>Name &amp; Role</h2>
                <div className={styles.formGridSingle}>
                  <label className={styles.fieldLabel} htmlFor="page3-character-name">
                    Character Name
                  </label>
                  <input id="page3-character-name" className={styles.textInput} type="text" />
                </div>

                <div className={styles.formGridThree}>
                  <div className={styles.fieldBlock}>
                    <label className={styles.fieldLabel} htmlFor="page3-class-role">
                      Class / Role
                    </label>
                    <input id="page3-class-role" className={styles.textInput} type="text" />
                  </div>
                  <div className={styles.fieldBlock}>
                    <label className={styles.fieldLabel} htmlFor="page3-species-race">
                      Species / Race
                    </label>
                    <input id="page3-species-race" className={styles.textInput} type="text" />
                  </div>
                  <div className={styles.fieldBlock}>
                    <label className={styles.fieldLabel} htmlFor="page3-level">
                      Level
                    </label>
                    <input id="page3-level" className={styles.textInput} type="number" min="0" />
                  </div>
                </div>

                <div className={styles.formGridSingle}>
                  <label className={styles.fieldLabel} htmlFor="page3-archetype">
                    Archetype
                  </label>
                  <input id="page3-archetype" className={styles.textInput} type="text" />
                </div>

                <div className={styles.formGridSingle}>
                  <label className={styles.fieldLabel} htmlFor="page3-player">
                    Player
                  </label>
                  <input id="page3-player" className={styles.textInput} type="text" />
                </div>

                <h2 className={styles.sectionHeading}>Core Attributes</h2>
                <div className={styles.formGridSingle}>
                  <label className={styles.fieldLabel} htmlFor="page3-template">
                    Template
                  </label>
                  <select id="page3-template" className={styles.selectInput} defaultValue="">
                    <option value="" />
                  </select>
                </div>

                <div className={styles.statGrid}>
                  <div className={styles.fieldBlock}>
                    <label className={styles.fieldLabel} htmlFor="page3-hp">
                      HP
                    </label>
                    <input id="page3-hp" className={styles.textInput} type="number" min="0" />
                  </div>
                  <div className={styles.fieldBlock}>
                    <label className={styles.fieldLabel} htmlFor="page3-stamina">
                      Stamina
                    </label>
                    <input id="page3-stamina" className={styles.textInput} type="number" min="0" />
                  </div>
                  <div className={styles.fieldBlock}>
                    <label className={styles.fieldLabel} htmlFor="page3-mana">
                      Mana
                    </label>
                    <input id="page3-mana" className={styles.textInput} type="number" min="0" />
                  </div>
                  <div className={styles.fieldBlock}>
                    <label className={styles.fieldLabel} htmlFor="page3-conditions">
                      Conditions
                    </label>
                    <input id="page3-conditions" className={styles.textInput} type="text" />
                  </div>
                </div>

                <h2 className={styles.sectionHeading}>Skills &amp; Traits</h2>
                <div className={styles.tableShell}>
                  <div className={styles.tableHead}>
                    <span>Name</span>
                    <span>Type</span>
                    <span>Scale</span>
                  </div>
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={`stat-row-${index}`} className={styles.tableRow}>
                      <input
                        className={styles.tableCell}
                        type="text"
                        aria-label={`Custom stat name ${index + 1}`}
                      />
                      <input
                        className={styles.tableCell}
                        type="text"
                        aria-label={`Custom stat type ${index + 1}`}
                      />
                      <input
                        className={styles.tableCell}
                        type="text"
                        aria-label={`Custom stat scale ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <button type="button" className={styles.addButton}>
                  + Add Custom Stat
                </button>
              </div>
            </section>

            <aside className={styles.rightPanel}>
              <h2 className={styles.sectionHeading}>Prompt Builder</h2>
              <p className={styles.promptLead}>
                Build the prompt in order. Each choice unlocks the next part of the chain.
              </p>

              <div className={styles.promptGrid}>
                <section className={styles.promptSection}>
                  <p className={styles.promptSectionLabel}>Step 1</p>
                  <label className={styles.fieldLabel} htmlFor="page3-prompt-category">
                    Preset Category
                  </label>
                  <select
                    id="page3-prompt-category"
                    className={styles.selectInput}
                    value={promptBuilderState.category}
                    onChange={(event) => handleCategoryChange(event.target.value as PromptBuilderState["category"])}
                  >
                    <option value="">Choose a setting</option>
                    {promptBuilderCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <p className={styles.helperText}>
                    {selectedCategory
                      ? selectedCategory.description
                      : "Choose the world preset first so the builder can load the right race and species presets."}
                  </p>
                </section>

                <section className={styles.promptSection}>
                  <p className={styles.promptSectionLabel}>Step 2</p>
                  <label className={styles.fieldLabel} htmlFor="page3-prompt-species">
                    Race / Species
                  </label>
                  <select
                    id="page3-prompt-species"
                    className={styles.selectInput}
                    value={promptBuilderState.speciesPreset}
                    onChange={(event) => handleSpeciesChange(event.target.value)}
                    disabled={!selectedCategory}
                  >
                    <option value="">
                      {selectedCategory ? "Choose a preset species" : "Select a category first"}
                    </option>
                    {selectedCategory?.speciesPresets.map((speciesPreset) => (
                      <option key={speciesPreset} value={speciesPreset}>
                        {speciesPreset}
                      </option>
                    ))}
                    {selectedCategory ? <option value={CUSTOM_SPECIES_VALUE}>Add Custom</option> : null}
                  </select>
                  <p className={styles.helperText}>
                    {selectedCategory
                      ? "Each preset list is tied to the chosen setting. Use Add Custom if the race you want is missing."
                      : "Preset species stay locked until a setting is chosen."}
                  </p>

                  {isCustomSpeciesSelected ? (
                    <div className={styles.customFieldBlock}>
                      <label className={styles.fieldLabel} htmlFor="page3-prompt-custom-species">
                        Custom Race / Species Name
                      </label>
                      <input
                        id="page3-prompt-custom-species"
                        className={styles.textInput}
                        type="text"
                        value={promptBuilderState.customSpeciesName}
                        onChange={(event) => handleCustomSpeciesChange(event.target.value)}
                        placeholder="Enter a custom race or species"
                      />
                      <p className={styles.helperText}>
                        Custom species stays in this builder only for this pass and still has to clear the full prompt chain.
                      </p>
                    </div>
                  ) : null}
                </section>

                <section className={styles.promptSection}>
                  <p className={styles.promptSectionLabel}>Step 3</p>
                  <div className={styles.promptRow}>
                    <label className={styles.fieldLabel} htmlFor="page3-prompt-gender">
                      Gender
                    </label>
                    <select
                      id="page3-prompt-gender"
                      className={styles.selectInput}
                      value={promptBuilderState.gender}
                      onChange={(event) => handleAppearanceFieldChange("gender", event.target.value)}
                      disabled={!canChooseGender}
                    >
                      <option value="">
                        {canChooseGender ? "Choose a gender expression" : "Complete race / species first"}
                      </option>
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.promptRow}>
                    <label className={styles.fieldLabel} htmlFor="page3-prompt-skin-tone">
                      Skin Tone
                    </label>
                    <select
                      id="page3-prompt-skin-tone"
                      className={styles.selectInput}
                      value={promptBuilderState.skinTone}
                      onChange={(event) => handleAppearanceFieldChange("skinTone", event.target.value)}
                      disabled={!canChooseSkinTone}
                    >
                      <option value="">
                        {canChooseSkinTone ? "Choose a skin tone" : "Choose gender first"}
                      </option>
                      {skinToneOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.promptRow}>
                    <label className={styles.fieldLabel} htmlFor="page3-prompt-hair-color">
                      Hair Color
                    </label>
                    <select
                      id="page3-prompt-hair-color"
                      className={styles.selectInput}
                      value={promptBuilderState.hairColor}
                      onChange={(event) => handleAppearanceFieldChange("hairColor", event.target.value)}
                      disabled={!canChooseHairColor}
                    >
                      <option value="">
                        {canChooseHairColor ? "Choose a hair color" : "Choose skin tone first"}
                      </option>
                      {hairColorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.promptRow}>
                    <label className={styles.fieldLabel} htmlFor="page3-prompt-eye-color">
                      Eye Color
                    </label>
                    <select
                      id="page3-prompt-eye-color"
                      className={styles.selectInput}
                      value={promptBuilderState.eyeColor}
                      onChange={(event) => handleAppearanceFieldChange("eyeColor", event.target.value)}
                      disabled={!canChooseEyeColor}
                    >
                      <option value="">
                        {canChooseEyeColor ? "Choose an eye color" : "Choose hair color first"}
                      </option>
                      {eyeColorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className={styles.helperText}>
                    {isPromptReady
                      ? "The full chain is complete. Generate the final prompt when you are ready."
                      : "The builder unlocks one appearance field at a time so the prompt stays structured."}
                  </p>
                </section>

                <section className={styles.promptSection}>
                  <p className={styles.promptSectionLabel}>Step 4</p>
                  <h3 className={styles.promptOutputTitle}>Generated Prompt</h3>
                  <p className={styles.helperText}>
                    {promptBuilderState.generatedPrompt
                      ? "This output is read-only and ready to copy and paste."
                      : "Generate Prompt stays locked until every required selection is complete."}
                  </p>
                  <textarea
                    className={styles.promptOutput}
                    value={
                      promptBuilderState.generatedPrompt ||
                      "Complete each part of the builder to generate a copy-and-paste-ready prompt."
                    }
                    readOnly
                    aria-label="Generated prompt output"
                  />
                  <div className={styles.outputSummary}>
                    <span className={styles.outputSummaryLabel}>Current Species</span>
                    <span className={styles.outputSummaryValue}>{resolvedSpeciesName || "Not chosen yet"}</span>
                  </div>
                </section>
              </div>

              <div className={styles.promptActions}>
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={handleGeneratePrompt}
                  disabled={!isPromptReady}
                  aria-disabled={!isPromptReady}
                >
                  Generate Prompt
                </button>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                  onClick={handleCopyPrompt}
                  disabled={!promptBuilderState.generatedPrompt}
                  aria-disabled={!promptBuilderState.generatedPrompt}
                >
                  Copy Output
                </button>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                  onClick={resetPromptBuilder}
                >
                  Reset
                </button>
              </div>
              <p className={styles.promptStatus} aria-live="polite">
                {copyStatus === "copied"
                  ? "Prompt copied to clipboard."
                  : copyStatus === "error"
                    ? "Clipboard copy failed in this browser session."
                    : promptBuilderState.generatedPrompt
                      ? "Prompt generated. Copy Output is ready."
                      : isPromptReady
                        ? "Ready to generate the final prompt."
                        : "Complete each step in order to unlock Generate Prompt."}
              </p>
            </aside>
          </div>

          <footer className={styles.footerBar}>
            <div className={styles.footerSpacer} />
            <button type="button" className={styles.footerButton} disabled aria-disabled="true">
              Save
            </button>
            <button type="button" className={styles.footerButton}>
              Print Sheet
            </button>
            <button type="button" className={`${styles.footerButton} ${styles.footerMutedButton}`} onClick={onBackToTitle}>
              Cancel
            </button>
          </footer>
        </article>
      </section>
    </main>
  );
}
