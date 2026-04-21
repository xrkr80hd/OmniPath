import { SessionZeroWizard } from "@/components/omnipath/session-zero/SessionZeroWizard";

type SessionZeroPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function SessionZeroPage({ params }: SessionZeroPageProps) {
  const { campaignId } = await params;

  return <SessionZeroWizard initialCampaignId={campaignId} />;
}
