import type { CampaignFixture, StageId } from "@/lib/omnipath/demoData";

import { ContextDrawer } from "./ContextDrawer";
import styles from "./CommandCenterShell.module.css";
import { DmConsolePanel } from "./DmConsolePanel";
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
  const statusLabel =
    activeStage === "encounter"
      ? `${campaign.encounter.activeActor} active`
      : role === "dm"
        ? "DM live control"
        : "Waiting for DM cue";
  const timerLabel =
    activeStage === "encounter"
      ? `${campaign.encounter.turnTimerSeconds}s remaining`
      : `${campaign.encounter.turnTimerSeconds}s timer`;

  return (
    <main className={styles.shell}>
      <SceneRail campaign={campaign} />
      <StageTabs campaignId={campaign.id} role={role} stageOrder={campaign.stageOrder} activeStage={activeStage} />

      <div className={styles.workspace}>
        <PartyDrawer campaign={campaign} />
        <SharedStage campaign={campaign} activeStage={activeStage} />
        <div className={styles.sideStack}>
          <ContextDrawer campaign={campaign} activeStage={activeStage} />
          {role === "dm" ? <DmConsolePanel campaign={campaign} activeStage={activeStage} /> : null}
        </div>
      </div>

      <StatusStrip label={statusLabel} timerLabel={timerLabel} />
    </main>
  );
}
