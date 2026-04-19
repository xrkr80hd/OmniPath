import type { CampaignFixture, StageId } from "@/lib/omnipath/demoData";

import { ContextDrawer } from "./ContextDrawer";
import styles from "./CommandCenterShell.module.css";
import { PartyDrawer } from "./PartyDrawer";
import { SceneRail } from "./SceneRail";
import { SharedStage } from "./SharedStage";
import { StageTabs } from "./StageTabs";
import { StatusStrip } from "./StatusStrip";

export function CommandCenterShell({
  campaign,
  role,
  activeStage = "scene",
}: {
  campaign: CampaignFixture;
  role: "player" | "dm";
  activeStage?: StageId;
}) {
  return (
    <main className={styles.shell}>
      <SceneRail campaign={campaign} />
      <StageTabs campaignId={campaign.id} role={role} stageOrder={campaign.stageOrder} activeStage={activeStage} />

      <div className={styles.workspace}>
        <PartyDrawer campaign={campaign} />
        <SharedStage campaign={campaign} activeStage={activeStage} />
        <ContextDrawer campaign={campaign} activeStage={activeStage} />
      </div>

      <StatusStrip
        label={role === "dm" ? "DM live control" : "Waiting for DM cue"}
        timer={campaign.encounter.turnTimerSeconds}
      />
    </main>
  );
}
