"use client";

import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import { type CSSProperties, useState } from "react";

import {
  getRandomScreenFlowBackground,
} from "./screenFlowData";
import styles from "./GameInterfaceScreen.module.css";

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

type GameInterfaceScreenProps = {
  onChooseCreateCharacter?: () => void;
  onChooseLoadCharacter?: () => void;
  onChooseOptions?: () => void;
  onBackToTitle?: () => void;
  optionsStatus?: string | null;
};

export function GameInterfaceScreen({
  onChooseCreateCharacter,
  onChooseLoadCharacter,
  onChooseOptions,
  onBackToTitle,
  optionsStatus,
}: GameInterfaceScreenProps) {
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
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <section className={`omni-shell ${styles.shell}`} aria-label="Page 2 decision screen">
        <p className={styles.pageLabel}>Page 2 // What Do You Want To Do?</p>
        <h1 className={styles.title}>Choose Your Path</h1>
        <p className={styles.subtitle}>Create a new hero, load an existing hero, or adjust options.</p>

        <div className={styles.menuStack}>
          <button type="button" className={styles.menuButton} onClick={onChooseCreateCharacter}>
            <span className={styles.menuIndex}>01</span>
            <span className={styles.menuText}>Create New Character</span>
          </button>

          <button type="button" className={styles.menuButton} onClick={onChooseLoadCharacter}>
            <span className={styles.menuIndex}>02</span>
            <span className={styles.menuText}>Load Character</span>
          </button>

          <button type="button" className={styles.menuButton} onClick={onChooseOptions}>
            <span className={styles.menuIndex}>03</span>
            <span className={styles.menuText}>Options</span>
          </button>

          <button type="button" className={`${styles.menuButton} ${styles.menuButtonMuted}`} onClick={onBackToTitle}>
            <span className={styles.menuIndex}>04</span>
            <span className={styles.menuText}>Return To Title</span>
          </button>
        </div>

        <p className={styles.flowLock}>
          {"Load Character lock: Page 2 -> Page 2a (Choose Character) -> Page 2b (Choose Campaign)."}
        </p>

        {optionsStatus ? <p className={styles.optionsStatus}>{optionsStatus}</p> : null}
      </section>
    </main>
  );
}
