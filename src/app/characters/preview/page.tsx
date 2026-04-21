import { CharacterPreviewPageClient } from "@/components/omnipath/session-zero/CharacterPreviewPageClient";
import { sessionZeroDraftStorageKey } from "@/lib/omnipath/sessionZeroData";

type CharacterPreviewPageProps = {
  searchParams: Promise<{
    campaign?: string;
    draft?: string;
  }>;
};

export default async function CharacterPreviewPage({
  searchParams,
}: CharacterPreviewPageProps) {
  const query = await searchParams;

  return (
    <CharacterPreviewPageClient
      campaignId={query.campaign ?? ""}
      draftKey={query.draft ?? sessionZeroDraftStorageKey}
    />
  );
}
