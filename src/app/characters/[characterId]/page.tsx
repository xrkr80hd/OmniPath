import { notFound } from "next/navigation";

import { PlayerCompanionShell } from "@/components/omnipath/player/PlayerCompanionShell";
import { getCharacterById } from "@/lib/omnipath/demoData";

type CharacterSheetPageProps = {
  params: Promise<{
    characterId: string;
  }>;
};

export default async function CharacterSheetPage({
  params,
}: CharacterSheetPageProps) {
  const { characterId } = await params;
  const character = getCharacterById(characterId);

  if (!character) {
    notFound();
  }

  return <PlayerCompanionShell character={character} />;
}
