import { PlayerCompanionPageClient } from "@/components/omnipath/player/PlayerCompanionPageClient";

type CharacterSheetPageProps = {
  params: Promise<{
    characterId: string;
  }>;
};

export default async function CharacterSheetPage({
  params,
}: CharacterSheetPageProps) {
  const { characterId } = await params;

  return <PlayerCompanionPageClient characterId={characterId} />;
}
