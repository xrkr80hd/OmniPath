import Link from "next/link";

import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const sampleCampaigns = [
  {
    id: "glass-harbor",
    title: "Glass Harbor",
    summary: "A mixed-system maritime campaign hub used as a local routing stand-in.",
  },
  {
    id: "emberwake-choir",
    title: "Emberwake Choir",
    summary: "A high-fantasy campaign record reserved for hub, lobby, and Session Zero flow testing.",
  },
];

export default function CampaignsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <RoutePlaceholder
        eyebrow="Campaigns"
        title="Campaign browsing is now part of the local route map."
        summary="These sample links keep the campaign area navigable before any database or membership logic is connected."
        status="browser staged"
        notes={[
          "Campaign listings here are local placeholders only.",
          "Hub, lobby, and Session Zero routes already exist under the campaign branch.",
          "No campaign ownership or attendance data is being guessed yet.",
        ]}
        links={[
          { href: "/", label: "Landing page" },
          { href: "/profile", label: "Profile placeholder" },
        ]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {sampleCampaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/campaigns/${campaign.id}`}
              className="border border-white/10 bg-white/5 p-5 transition hover:border-amber-300/30 hover:bg-amber-200/10"
            >
              <p className="omni-kicker">Sample route</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                {campaign.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{campaign.summary}</p>
            </Link>
          ))}
        </div>
      </RoutePlaceholder>
      <SiteFooter />
    </div>
  );
}
