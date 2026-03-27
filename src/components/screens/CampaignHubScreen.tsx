import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import Link from "next/link";

import styles from "./CampaignHubScreen.module.css";

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

type CampaignHubScreenProps = {
  campaignId: string;
  characterId?: string;
};

const systemFeed = [
  "Campaign hub loaded from branch flow.",
  "Character campaign state remains isolated per campaign.",
  "Absence fallback lock: safe hub resume with fatigued return state.",
];

const stagedModules = ["Party Roster", "Maps", "Assets", "Save / Load", "Settings"];

export function CampaignHubScreen({ campaignId, characterId }: CampaignHubScreenProps) {
  const activeCharacterId = characterId ?? "vale-warden";

  const operationLinks = [
    {
      href: `/campaigns/${campaignId}/lobby`,
      label: "Enter Lobby",
      detail: "Move to pre-session staging and attendance flow.",
    },
    {
      href: `/campaigns/${campaignId}/session-zero`,
      label: "Session Zero",
      detail: "Create and calibrate new character records for this campaign.",
    },
    {
      href: `/characters/${activeCharacterId}`,
      label: "Character Sheet",
      detail: "Open the active character profile routed from Page 3.",
    },
  ];

  return (
    <main className={`${styles.screen} ${displayFont.variable} ${monoFont.variable}`}>
      <div className={styles.backplate} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <section className={`omni-shell ${styles.shell}`} aria-label="Campaign hub command screen">
        <header className={styles.commandDeck}>
          <p className={styles.pageLabel}>Page 4 // Campaign Command Hub</p>
          <h1 className={styles.title}>Campaign: {campaignId}</h1>
          <p className={styles.subtitle}>
            Active character context: {activeCharacterId}. This hub is the first live destination
            after Page 3 branch selection.
          </p>
        </header>

        <section className={styles.grid}>
          <article className={styles.panel}>
            <p className={styles.panelLabel}>Operations</p>
            <div className={styles.operationGrid}>
              {operationLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.operationCard}>
                  <span className={styles.operationTitle}>{link.label}</span>
                  <span className={styles.operationDetail}>{link.detail}</span>
                </Link>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <p className={styles.panelLabel}>System Feed</p>
            <ul className={styles.feedList}>
              {systemFeed.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>

          <article className={styles.panel}>
            <p className={styles.panelLabel}>Staged Modules</p>
            <div className={styles.moduleGrid}>
              {stagedModules.map((item) => (
                <div key={item} className={styles.moduleCard}>
                  <span className={styles.moduleName}>{item}</span>
                  <span className={styles.moduleState}>Queued</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
