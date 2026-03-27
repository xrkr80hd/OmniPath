import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type CampaignLobbyPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function CampaignLobbyPage({ params }: CampaignLobbyPageProps) {
  const { campaignId } = await params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <RoutePlaceholder
        eyebrow="Lobby"
        title={`Lobby placeholder for ${campaignId}`}
        summary="The lobby route is reserved for entry-room behavior once campaign membership and live session rules are backed by data."
        status="lobby staged"
        notes={[
          "This page exists to lock route placement, not to simulate live player presence.",
          "Session attendance remains separate from campaign membership by product rule.",
          "Realtime or room-state logic does not begin until backend work is authorized.",
        ]}
        links={[
          { href: `/campaigns/${campaignId}`, label: "Back to campaign hub" },
          {
            href: `/campaigns/${campaignId}/session-zero`,
            label: "Session Zero branch",
          },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
