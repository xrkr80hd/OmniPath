"use client";

import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import { type CSSProperties, useState } from "react";

import {
  getCharacterById,
  getRandomScreenFlowBackground,
  screenFlowCharacters,
} from "./screenFlowData";
import styles from "./Page2aLoadCharacterScreen.module.css";

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

type Page2aLoadCharacterScreenProps = {
  selectedCharacterId: string;
  onSelectCharacter: (characterId: string) => void;
  onContinue: () => void;
  onBackToPage2: () => void;
  onBackToTitle: () => void;
};

export function Page2aLoadCharacterScreen({
  selectedCharacterId,
  onSelectCharacter,
  onContinue,
  onBackToPage2,
  onBackToTitle,
}: Page2aLoadCharacterScreenProps) {
  const selectedCharacter = getCharacterById(selectedCharacterId);
  const [activeBackground] = useState<string>(() => getRandomScreenFlowBackground());

  return (
    <main
      className={`${styles.screen} ${displayFont.variable} ${monoFont.variable}`}
      style={
        {
          "--screen-bg-image": `url("${activeBackground}")`,
        } as CSSProperties
      }
    >
      <div className={styles.backgroundLayer} aria-hidden="true" />
      <div className={styles.backplate} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <section className={`omni-shell ${styles.shell}`} aria-label="Page 2a load character">
        <header className={styles.commandDeck}>
          <p className={styles.pageLabel}>Page 2A // Load Character</p>
          <h1 className={styles.title}>Choose Character</h1>
          <p className={styles.subtitle}>
            Select who you want to load. The next step shows only that character&apos;s campaign saves.
          </p>
        </header>

        <section className={styles.characterPanel}>
          <p className={styles.panelLabel}>Character Roster</p>
          <div className={styles.characterGrid}>
            {screenFlowCharacters.map((character) => (
              <button
                key={character.id}
                type="button"
                className={`${styles.characterCard} ${
                  character.id === selectedCharacter.id ? styles.characterCardActive : ""
                }`}
                onClick={() => onSelectCharacter(character.id)}
              >
                <span className={styles.characterName}>{character.name}</span>
                <span className={styles.characterLine}>{character.roleLine}</span>
                <span className={styles.characterState}>{character.resumeState}</span>
              </button>
            ))}
          </div>
        </section>

        <footer className={styles.footerActions}>
          <button type="button" className={styles.secondaryButton} onClick={onBackToPage2}>
            Back To Page 2
          </button>
          <button type="button" className={styles.primaryButton} onClick={onContinue}>
            Continue To Campaigns
          </button>
          <button type="button" className={styles.ghostButton} onClick={onBackToTitle}>
            Return To Title
          </button>
        </footer>
      </section>
    </main>
  );
}
