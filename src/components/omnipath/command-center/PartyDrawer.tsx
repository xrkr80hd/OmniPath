import type { CampaignFixture } from "@/lib/omnipath/demoData";

import styles from "./CommandCenterShell.module.css";

export function PartyDrawer({ campaign }: { campaign: CampaignFixture }) {
  return (
    <aside className={styles.drawer} aria-label="Party drawer">
      <p className={styles.drawerTitle}>Party drawer</p>
      <p className={styles.drawerBody}>
        Local and remote players land in the same command center, while absent members
        can be staged back at the inn or camp without breaking the session.
      </p>

      <ul className={styles.detailList}>
        <li className={styles.detailItem}>
          {campaign.partySummary}
          <span className={styles.detailItemMuted}>Attendance stays visible to the table.</span>
        </li>
        <li className={styles.detailItem}>
          Vale Warden active
          <span className={styles.detailItemMuted}>Companion devices stay personal and turn-aware.</span>
        </li>
      </ul>
    </aside>
  );
}
