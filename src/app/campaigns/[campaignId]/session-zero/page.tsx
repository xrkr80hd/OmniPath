import Link from "next/link";

import { SimpleShell } from "@/components/omnipath/support/SimpleShell";

type SessionZeroPageProps = {
  params: Promise<{
    campaignId: string;
  }>;
};

export default async function SessionZeroPage({ params }: SessionZeroPageProps) {
  const { campaignId } = await params;

  return (
    <SimpleShell
      eyebrow="Session Zero"
      title={`Build a new character for ${campaignId}`}
      summary="Keep Session Zero focused on character creation and party setup, not on the old branching screen flow."
    >
      <Link href="/characters/vale-warden" className="inline-flex border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-amber-300/30 hover:bg-amber-200/10 hover:text-amber-100">
        Open companion preview
      </Link>
    </SimpleShell>
  );
}
