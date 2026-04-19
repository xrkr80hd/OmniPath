import type { CampaignFixture, StageId } from "@/lib/omnipath/demoData";

import styles from "./SharedStage.module.css";

function getStageCopy(campaign: CampaignFixture, activeStage: StageId) {
  if (activeStage === "encounter") {
    return {
      kicker: "Encounter stage",
      title: campaign.encounter.activeActor,
      body: `${campaign.encounter.enemies.length} threat markers are on the table. The DM can push a player-safe battle state from the private console.`,
    };
  }

  const stage = campaign.sharedStage[activeStage];

  return {
    kicker: `${activeStage} stage`,
    title: stage.title,
    body: stage.body,
  };
}

export function SharedStage({
  campaign,
  activeStage,
}: {
  campaign: CampaignFixture;
  activeStage: StageId;
}) {
  const stage = getStageCopy(campaign, activeStage);

  return (
    <section className={styles.stage} aria-label="Shared stage">
      <div className={styles.header}>
        <p className={styles.kicker}>{stage.kicker}</p>
        <h1 className={styles.title}>{stage.title}</h1>
        <p className={styles.body}>{stage.body}</p>
      </div>

      {activeStage === "encounter" ? (
        <ul className={styles.enemyList} aria-label="Encounter threats">
          {campaign.encounter.enemies.map((enemy) => (
            <li key={enemy.id} className={styles.enemyCard}>
              <p className={styles.enemyName}>{enemy.name}</p>
              <p className={styles.enemyStatus}>{enemy.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.sceneCard}>
          <p className={styles.sceneLabel}>Player-safe stage feed</p>
          <p className={styles.sceneText}>
            This center panel is where the TV cast, Discord share, or shared browser view
            stays focused while the DM leads the table.
          </p>
        </div>
      )}
    </section>
  );
}
