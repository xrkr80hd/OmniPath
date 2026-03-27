"use client";

import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import { type CSSProperties, useState } from "react";

import {
  getCampaignsForCharacter,
  getCharacterById,
  getRandomScreenFlowBackground,
} from "./screenFlowData";
import styles from "./Page2bLoadCampaignScreen.module.css";

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

type Page2bLoadCampaignScreenProps = {
  selectedCharacterId: string;
  onBackToCharacterSelect: () => void;
  onBackToPage2: () => void;
  onBackToTitle: () => void;
};

export function Page2bLoadCampaignScreen({
  selectedCharacterId,
  onBackToCharacterSelect,
  onBackToPage2,
  onBackToTitle,
}: Page2bLoadCampaignScreenProps) {
  const selectedCharacter = getCharacterById(selectedCharacterId);
  const campaignOptions = getCampaignsForCharacter(selectedCharacter.id);
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

      <section className={`omni-shell ${styles.shell}`} aria-label="Page 2b load campaign">
        <header className={styles.commandDeck}>
          <p className={styles.pageLabel}>Page 2B // Load Campaign</p>
          <h1 className={styles.title}>Choose Campaign</h1>
          <p className={styles.subtitle}>
            Character lock: <strong>{selectedCharacter.name}</strong>. Campaign saves stay isolated
            per character and campaign.
          </p>
        </header>

        <section className={styles.campaignPanel}>
          <p className={styles.panelLabel}>Campaign Slots</p>
          <div className={styles.campaignGrid}>
            {campaignOptions.map((campaign) => (
              <Link
                key={`${selectedCharacter.id}-${campaign.id}`}
                href={`/campaigns/${campaign.id}?characterId=${selectedCharacter.id}`}
                className={styles.campaignCard}
              >
                <span className={styles.campaignTitle}>{campaign.title}</span>
                <span className={styles.campaignMeta}>Party: {campaign.partyName}</span>
                <span className={styles.campaignMeta}>{campaign.lastSavedAt}</span>
                <span className={styles.campaignMeta}>{campaign.resumeNode}</span>
              </Link>
            ))}
          </div>
        </section>

        <footer className={styles.footerActions}>
          <button type="button" className={styles.secondaryButton} onClick={onBackToCharacterSelect}>
            Back To Character Select
          </button>
          <button type="button" className={styles.secondaryButton} onClick={onBackToPage2}>
            Back To Page 2
          </button>
          <button type="button" className={styles.ghostButton} onClick={onBackToTitle}>
            Return To Title
          </button>
        </footer>
      </section>
    </main>
  );
}
