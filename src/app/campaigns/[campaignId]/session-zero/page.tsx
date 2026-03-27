import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type SessionZeroPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function SessionZeroPage({ params }: SessionZeroPageProps) {
  const { campaignId } = await params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <RoutePlaceholder
        eyebrow="Session Zero"
        title={`Create-new-character flow for ${campaignId}`}
        summary="The MVP character entry path is locked to Session Zero creation only. Import and existing-character selection remain out of scope for this local pass."
        status="creation staged"
        notes={[
          "Session Zero is the only locked MVP character-entry path right now.",
          "Phase 1 is for route and screen testing, not saved character data.",
          "This route exists so the campaign branch already knows where character creation belongs.",
        ]}
        links={[
          { href: `/campaigns/${campaignId}`, label: "Back to campaign hub" },
          { href: "/characters/vale-warden", label: "Character sheet placeholder" },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
