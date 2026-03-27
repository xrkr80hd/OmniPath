"use client";

import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";
import { useMemo, useState } from "react";

import styles from "./CharacterBranchScreen.module.css";

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

type CharacterIntent = "new-character" | "load-character";

type CharacterBranchScreenProps = {
  intent: CharacterIntent;
  onBack?: () => void;
};

type DemoCharacter = {
  id: string;
  name: string;
  roleLine: string;
  resumeState: string;
};

type DemoCampaignState = {
  id: string;
  title: string;
  partyName: string;
  lastSavedAt: string;
  resumeNode: string;
};

const demoCharacters: DemoCharacter[] = [
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
];

const campaignsByCharacter: Record<string, DemoCampaignState[]> = {
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
};

const canonicalCards = [
  {
    title: "Save Model Lock",
    body: "CharacterCampaignState is keyed by character plus campaign to prevent cross-campaign drift.",
  },
  {
    title: "Absence Return Lock",
    body: "If a player leaves mid-campaign, resume from the last safe hub with temporary fatigued state.",
  },
];

const queuedSystems = ["Party", "Party Summary", "Maps", "Assets", "Save / Load", "Settings"];

export function CharacterBranchScreen({ intent, onBack }: CharacterBranchScreenProps) {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(demoCharacters[0].id);

  const selectedCharacter = useMemo(
    () => demoCharacters.find((character) => character.id === selectedCharacterId) ?? demoCharacters[0],
    [selectedCharacterId],
  );

  const campaignOptions = campaignsByCharacter[selectedCharacter.id] ?? [];
  const isLoadPath = intent === "load-character";

  return (
    <main className={`${styles.screen} ${displayFont.variable} ${monoFont.variable}`}>
      <div className={styles.backplate} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <section className={`omni-shell ${styles.shell}`} aria-label="Page 3 character command screen">
        <header className={styles.commandDeck}>
          <p className={styles.pageLabel}>Page 3 // Character Branch Control</p>
          <h1 className={styles.title}>
            {isLoadPath ? "Load Character Into Campaign" : "Create New Character"}
          </h1>
          <p className={styles.subtitle}>
            {isLoadPath
              ? "Locked sequence: choose a character first, then select a campaign-specific save context."
              : "Creation sequence: forge a new identity in Session Zero, then attach campaign state."}
          </p>
        </header>

        {isLoadPath ? (
          <section className={styles.stageGrid}>
            <article className={styles.stagePanel}>
              <p className={styles.panelLabel}>Step 1</p>
              <h2 className={styles.panelTitle}>Choose Character</h2>
              <div className={styles.characterGrid}>
                {demoCharacters.map((character) => (
                  <button
                    key={character.id}
                    type="button"
                    className={`${styles.characterCard} ${
                      character.id === selectedCharacter.id ? styles.characterCardActive : ""
                    }`}
                    onClick={() => setSelectedCharacterId(character.id)}
                  >
                    <span className={styles.characterName}>{character.name}</span>
                    <span className={styles.characterLine}>{character.roleLine}</span>
                    <span className={styles.characterState}>{character.resumeState}</span>
                  </button>
                ))}
              </div>
            </article>

            <article className={styles.stagePanel}>
              <p className={styles.panelLabel}>Step 2</p>
              <h2 className={styles.panelTitle}>Load Into Campaign</h2>
              <p className={styles.ruleLine}>
                Lock: each campaign keeps its own state for this selected character.
              </p>

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
            </article>
          </section>
        ) : (
          <section className={styles.createPanel}>
            <p className={styles.panelLabel}>Creation Sequence</p>
            <h2 className={styles.panelTitle}>Start Session Zero</h2>
            <p className={styles.ruleLine}>
              New Character path remains direct and does not reuse prior campaign state.
            </p>
            <Link href="/campaigns/glass-harbor/session-zero" className={styles.creationLink}>
              Begin New Character In Session Zero
            </Link>
          </section>
        )}

        <section className={styles.metaGrid}>
          <article className={styles.metaPanel}>
            <p className={styles.panelLabel}>Canonical Rules</p>
            <div className={styles.canonicalGrid}>
              {canonicalCards.map((card) => (
                <div key={card.title} className={styles.canonicalCard}>
                  <span className={styles.canonicalTitle}>{card.title}</span>
                  <span className={styles.canonicalBody}>{card.body}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.metaPanel}>
            <p className={styles.panelLabel}>Queued Legacy Systems</p>
            <div className={styles.queueGrid}>
              {queuedSystems.map((item) => (
                <div key={item} className={styles.queueCard}>
                  <span className={styles.queueName}>{item}</span>
                  <span className={styles.queueState}>Staged</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className={styles.footerActions}>
          <button type="button" className={styles.backButton} onClick={onBack}>
            Back To Page 2
          </button>
          <Link href="/" className={styles.resetLink}>
            Restart From Title
          </Link>
        </footer>
      </section>
    </main>
  );
}
