import type { CampaignFixture } from "@/lib/omnipath/demoData";

import styles from "./CommandCenterShell.module.css";

export function SceneRail({ campaign }: { campaign: CampaignFixture }) {
  return (
    <section className={styles.rail} aria-label="Campaign summary rail">
      <div className={styles.railHeader}>
        <div className={styles.railTitleBlock}>
          <p className="omni-kicker">Command center</p>
          <h1 className={styles.railTitle}>{campaign.name}</h1>
          <p className={styles.railSummary}>{campaign.objective}</p>
        </div>
      </div>

      <div className={styles.railMeta}>
        <div className={styles.metaCard}>
          <p className={styles.metaLabel}>Location</p>
          <p className={styles.metaValue}>{campaign.location}</p>
        </div>
        <div className={styles.metaCard}>
          <p className={styles.metaLabel}>Party</p>
          <p className={styles.metaValue}>{campaign.partySummary}</p>
        </div>
        <div className={styles.metaCard}>
          <p className={styles.metaLabel}>Shared view</p>
          <p className={styles.metaValue}>Scene first, DM-led, player-safe</p>
        </div>
      </div>
    </section>
  );
}
