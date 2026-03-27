import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type CampaignHubPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
  searchParams?: Promise<{
    characterId?: string;
  }>;
};

export default async function CampaignHubPage({ params, searchParams }: CampaignHubPageProps) {
  const { campaignId } = await params;
  const { characterId } = (await searchParams) ?? {};
  const characterQuery = characterId ? `?characterId=${encodeURIComponent(characterId)}` : "";

  const notes = [
    `Current campaign id: ${campaignId}`,
    characterId
      ? `Loaded character context: ${characterId}`
      : "No characterId provided in this entry.",
    "Membership, permissions, and campaign content are deferred until the Supabase phase.",
    "This route exists now so nested campaign pages do not grow from an undefined branch.",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <RoutePlaceholder
        eyebrow="Campaign hub"
        title={`Campaign hub placeholder for ${campaignId}`}
        summary="This page anchors the main campaign route so the browser, lobby, and Session Zero flow already have a stable parent location."
        status="hub staged"
        notes={notes}
        links={[
          { href: "/campaigns", label: "Back to campaigns" },
          { href: `/campaigns/${campaignId}/lobby${characterQuery}`, label: "Go to lobby" },
          {
            href: `/campaigns/${campaignId}/session-zero${characterQuery}`,
            label: "Go to Session Zero",
          },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
