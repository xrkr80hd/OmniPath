import type { CampaignFixture, StageId } from "@/lib/omnipath/demoData";

import { getThemeLabel } from "@/lib/omnipath/theme";

import styles from "./CommandCenterShell.module.css";

export function ContextDrawer({
  campaign,
  activeStage,
}: {
  campaign: CampaignFixture;
  activeStage: StageId;
}) {
  return (
    <aside className={styles.drawer} aria-label="Context drawer">
      <p className={styles.drawerTitle}>Context drawer</p>
      <p className={styles.drawerBody}>
        The shell stays neutral and system-agnostic. Theme skins and world flavor can swap
        later without replacing the underlying table layout.
      </p>

      <ul className={styles.detailList}>
        <li className={styles.detailItem}>
          {getThemeLabel(campaign.theme)}
          <span className={styles.detailItemMuted}>Current shell skin label.</span>
        </li>
        <li className={styles.detailItem}>
          Active stage: {activeStage}
          <span className={styles.detailItemMuted}>The DM chooses what the shared screen shows.</span>
        </li>
      </ul>
    </aside>
  );
}
