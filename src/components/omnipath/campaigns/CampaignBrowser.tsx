import Link from "next/link";

import styles from "./CampaignBrowser.module.css";

import type { CampaignFixture } from "@/lib/omnipath/demoData";
import { getThemeLabel } from "@/lib/omnipath/theme";

export function CampaignBrowser({
  campaigns,
}: {
  campaigns: CampaignFixture[];
}) {
  return (
    <main className={styles.page}>
      <section className={`${styles.shell} omni-shell`}>
        <header className={styles.hero}>
          <p className="omni-kicker">Campaigns</p>
          <h1 className={styles.title}>Resume a campaign</h1>
          <p className={styles.summary}>
            Pick up an existing party state without dropping back into a route map
            or placeholder flow.
          </p>
        </header>

        <div className={styles.browser}>
          <ol className={styles.list} aria-label="Available campaigns">
            {campaigns.map((campaign, index) => (
              <li key={campaign.id}>
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className={styles.row}
                >
                  <div className={styles.rank} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className={styles.primary}>
                    <div className={styles.nameRow}>
                      <h2 className={styles.name}>{campaign.name}</h2>
                      <span className={styles.theme}>
                        {getThemeLabel(campaign.theme)}
                      </span>
                    </div>

                    <p className={styles.objective}>{campaign.objective}</p>
                  </div>

                  <dl className={styles.meta}>
                    <div>
                      <dt>Location</dt>
                      <dd>{campaign.location}</dd>
                    </div>
                    <div>
                      <dt>Party</dt>
                      <dd>{campaign.partySummary}</dd>
                    </div>
                  </dl>

                  <span className={styles.action}>Resume</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
