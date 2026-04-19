import Link from "next/link";

import type { StageId } from "@/lib/omnipath/demoData";

import styles from "./CommandCenterShell.module.css";

function formatStageLabel(stage: StageId) {
  return stage.charAt(0).toUpperCase() + stage.slice(1);
}

export function StageTabs({
  campaignId,
  role,
  stageOrder,
  activeStage,
}: {
  campaignId: string;
  role: "player" | "dm";
  stageOrder: readonly StageId[];
  activeStage: StageId;
}) {
  return (
    <nav className={styles.stageTabs} aria-label="Command center stages">
      {stageOrder.map((stage) => {
        const active = stage === activeStage;
        const searchParams = new URLSearchParams();

        if (role === "dm") {
          searchParams.set("role", role);
        }

        searchParams.set("stage", stage);
        const href = `/campaigns/${campaignId}?${searchParams.toString()}`;

        return (
          <Link
            key={stage}
            href={href}
            className={`${styles.stageTab} ${active ? styles.stageTabActive : ""}`.trim()}
            aria-current={active ? "page" : undefined}
          >
            <span className={styles.tabLabel}>Stage</span>
            <span className={styles.stageTabValue}>{formatStageLabel(stage)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
