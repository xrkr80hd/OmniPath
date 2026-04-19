import type { CampaignFixture, StageId } from "@/lib/omnipath/demoData";

import styles from "./CommandCenterShell.module.css";

export function DmConsolePanel({
  campaign,
  activeStage,
}: {
  campaign: CampaignFixture;
  activeStage: StageId;
}) {
  return (
    <aside className={styles.drawer} aria-label="DM private controls">
      <p className={styles.drawerTitle}>DM private console</p>
      <p className={styles.drawerBody}>
        This panel stays on the laptop view so the DM can direct the shared stage without
        leaking hidden notes to the table.
      </p>

      <div className={styles.consoleActions}>
        <button type="button" className={styles.consoleButton}>
          Push to shared stage
        </button>
        <button type="button" className={styles.consoleButton}>
          Advance turn
        </button>
      </div>

      {activeStage === "encounter" ? (
        <p className={styles.drawerBody}>Active actor: {campaign.encounter.activeActor}</p>
      ) : null}
    </aside>
  );
}
