"use client";

import Image from "next/image";
import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import { type CSSProperties, useState } from "react";

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
const promptBuilderFields = ["Race", "Gender", "Skin Tone", "Hair Color", "Eye Color"] as const;
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
              <div className={styles.promptGrid}>
                {promptBuilderFields.map((field) => (
                  <div key={field} className={styles.promptRow}>
                    <label className={styles.fieldLabel} htmlFor={`page3-prompt-${field.toLowerCase().replace(/\s+/g, "-")}`}>
                      {field}
                    </label>
                    <select
                      id={`page3-prompt-${field.toLowerCase().replace(/\s+/g, "-")}`}
                      className={styles.selectInput}
                      defaultValue=""
                    >
                      <option value="" />
                    </select>
                  </div>
                ))}
              </div>

              <h2 className={styles.sectionHeading}>Skills &amp; Traits</h2>
              <div className={styles.promptSkillTable}>
                <div className={styles.promptSkillHead}>
                  <span>Skill</span>
                  <span>Score</span>
                  <span>Notes</span>
                </div>
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={`prompt-skill-${index}`} className={styles.promptSkillRow}>
                    <input
                      className={styles.promptSkillName}
                      type="text"
                      aria-label={`Prompt skill name ${index + 1}`}
                    />
                    <input
                      className={styles.promptSkillScore}
                      type="number"
                      min="0"
                      aria-label={`Prompt skill score ${index + 1}`}
                    />
                    <select className={styles.promptSkillNotes} defaultValue="" aria-label={`Prompt skill notes ${index + 1}`}>
                      <option value="" />
                    </select>
                  </div>
                ))}
              </div>

              <div className={styles.promptActions}>
                <button type="button" className={styles.actionButton} disabled aria-disabled="true">
                  Generate Prompt
                </button>
                <button type="button" className={`${styles.actionButton} ${styles.actionButtonSecondary}`}>
                  Reset
                </button>
              </div>
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
