import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type CharacterSheetPageProps = {
  params: Promise<{
    characterId: string;
  }>;
};

export default async function CharacterSheetPage({
  params,
}: CharacterSheetPageProps) {
  const { characterId } = await params;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <RoutePlaceholder
        eyebrow="Character sheet"
        title={`Character sheet placeholder for ${characterId}`}
        summary="The full character route is in place so character cards and campaign flows have a concrete destination before any backend schema is wired in."
        status="sheet staged"
        notes={[
          `Current character id: ${characterId}`,
          "No live character fetches are implemented in this local phase.",
          "The reusable Character Card module is available, but sheet composition waits for backend support.",
        ]}
        links={[
          { href: "/campaigns", label: "Back to campaigns" },
          { href: "/profile", label: "Profile placeholder" },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
