"use client";

import Link from "next/link";
import { useMemo } from "react";

import { getSavedCharacterById } from "@/lib/omnipath/savedCharacters";

import { PlayerCompanionShell } from "./PlayerCompanionShell";

export function PlayerCompanionPageClient({
  characterId,
}: {
  characterId: string;
}) {
  const character = useMemo(() => getSavedCharacterById(characterId), [characterId]);

  if (!character) {
    return (
      <main className="omni-shell py-16">
        <p className="omni-kicker">Player Companion</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
          No saved character found
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          This companion link no longer falls back to demo data. Open the character from
          Session Zero preview, or start a fresh traveler from the realm gateway.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/characters/load"
            className="inline-flex min-h-12 items-center justify-center border border-white/12 bg-white/5 px-4 py-3 font-medium text-slate-100 transition hover:border-amber-300/30 hover:bg-amber-200/10 hover:text-amber-100"
          >
            Open latest character
          </Link>
          <Link
            href="/characters/new"
            className="inline-flex min-h-12 items-center justify-center border border-white/12 bg-white/5 px-4 py-3 font-medium text-slate-100 transition hover:border-amber-300/30 hover:bg-amber-200/10 hover:text-amber-100"
          >
            Create a new character
          </Link>
        </div>
      </main>
    );
  }

  return <PlayerCompanionShell character={character} />;
}
