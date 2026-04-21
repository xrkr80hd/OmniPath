"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  upsertSavedCharacterFromDraft,
  writeSavedCharacterIdToDraft,
} from "@/lib/omnipath/savedCharacters";
import {
  buildCharacterPreviewData,
  createInitialSessionZeroDraft,
  sessionZeroDraftStorageKey,
  type SessionZeroDraft,
} from "@/lib/omnipath/sessionZeroData";

import { CharacterPreviewShell } from "./CharacterPreviewShell";

export function CharacterPreviewPageClient({
  campaignId,
  draftKey = sessionZeroDraftStorageKey,
}: {
  campaignId: string;
  draftKey?: string;
}) {
  const [savedCharacterId, setSavedCharacterId] = useState<string | null>(null);

  const draft = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = window.localStorage.getItem(draftKey);

    if (!stored) {
      return null;
    }

    try {
      const parsed = JSON.parse(stored) as Partial<SessionZeroDraft>;

      return {
        ...createInitialSessionZeroDraft(campaignId),
        ...parsed,
        selectedCampaignId: parsed.selectedCampaignId ?? campaignId,
      } satisfies SessionZeroDraft;
    } catch {
      return null;
    }
  }, [campaignId, draftKey]);

  useEffect(() => {
    if (!draft) {
      return;
    }

    const savedCharacter = upsertSavedCharacterFromDraft(draft);

    setSavedCharacterId(savedCharacter.id);

    if (draft.savedCharacterId !== savedCharacter.id) {
      writeSavedCharacterIdToDraft(savedCharacter.id, draftKey);
    }
  }, [draft, draftKey]);

  const character = useMemo(() => {
    if (!draft) {
      return null;
    }

    return buildCharacterPreviewData(draft);
  }, [draft]);

  if (!character) {
    return (
      <main className="omni-shell py-16">
        <p className="omni-kicker">Character Preview</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
          No saved draft found
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Session Zero has not saved a usable draft yet. Start from the wizard, then come
          back here through the preview handoff.
        </p>
        <Link
          href="/characters/new"
          className="mt-8 inline-flex min-h-12 items-center justify-center border border-white/12 bg-white/5 px-4 py-3 font-medium text-slate-100 transition hover:border-amber-300/30 hover:bg-amber-200/10 hover:text-amber-100"
        >
          Return to character creation
        </Link>
      </main>
    );
  }

  return (
    <CharacterPreviewShell
      character={character}
      companionHref={savedCharacterId ? `/characters/${savedCharacterId}` : "/characters/load"}
    />
  );
}
