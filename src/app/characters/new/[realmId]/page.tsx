import { notFound } from "next/navigation";

import { SessionZeroWizard } from "@/components/omnipath/session-zero/SessionZeroWizard";
import { realmOptions } from "@/lib/omnipath/sessionZeroData";

type CharacterCreationRealmPageProps = {
  params: Promise<{
    realmId: string;
  }>;
};

export default async function CharacterCreationRealmPage({
  params,
}: CharacterCreationRealmPageProps) {
  const { realmId } = await params;

  if (!realmOptions.some((option) => option.id === realmId)) {
    notFound();
  }

  return <SessionZeroWizard initialRealmId={realmId} />;
}
