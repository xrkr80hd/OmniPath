import Link from "next/link";

import { SimpleShell } from "@/components/omnipath/support/SimpleShell";

type CampaignLobbyPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignLobbyPage({ params }: CampaignLobbyPageProps) {
  const { campaignId } = await params;

  return (
    <SimpleShell
      eyebrow="Lobby"
      title={`Campaign lobby: ${campaignId}`}
      summary="Use this room for attendance, ready-state, and staging before the shared command center goes live."
    >
      <Link href={`/campaigns/${campaignId}`} className="inline-flex border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-amber-300/30 hover:bg-amber-200/10 hover:text-amber-100">
        Enter command center
      </Link>
    </SimpleShell>
  );
}
