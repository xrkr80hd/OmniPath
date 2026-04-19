import { notFound } from "next/navigation";

import { CommandCenterShell } from "@/components/omnipath/command-center/CommandCenterShell";
import { getCampaignById, stageOrder, type StageId } from "@/lib/omnipath/demoData";

type CampaignHubPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
  searchParams?: Promise<{
    role?: string | string[];
    stage?: string | string[];
  }>;
};

function isStageId(value: string | undefined): value is StageId {
  return value !== undefined && stageOrder.includes(value as StageId);
}

export default async function CampaignHubPage({ params, searchParams }: CampaignHubPageProps) {
  const { campaignId } = await params;
  const query = (await searchParams) ?? {};
  const requestedRole = typeof query.role === "string" ? query.role : undefined;
  const requestedStage = typeof query.stage === "string" ? query.stage : undefined;
  const campaign = getCampaignById(campaignId);

  if (!campaign) {
    notFound();
  }

  return (
    <CommandCenterShell
      campaign={campaign}
      role={requestedRole === "dm" ? "dm" : "player"}
      activeStage={isStageId(requestedStage) ? requestedStage : "scene"}
    />
  );
}
