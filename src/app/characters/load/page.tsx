"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getLastSavedCharacterId } from "@/lib/omnipath/savedCharacters";

export default function LoadCharacterPage() {
  const router = useRouter();
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const lastCharacterId = getLastSavedCharacterId();

    if (lastCharacterId) {
      router.replace(`/characters/${lastCharacterId}`);
      return;
    }

    setResolved(true);
  }, [router]);

  if (!resolved) {
    return (
      <main className="omni-shell py-16">
        <p className="omni-kicker">Load Character</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
          Opening your latest traveler
        </h1>
      </main>
    );
  }

  return (
    <main className="omni-shell py-16">
      <p className="omni-kicker">Load Character</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
        No saved character found yet
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
        Finish Session Zero preview once, and OmniPath will route this button into that
        saved character from then on.
      </p>
      <Link
        href="/characters/new"
        className="mt-8 inline-flex min-h-12 items-center justify-center border border-white/12 bg-white/5 px-4 py-3 font-medium text-slate-100 transition hover:border-amber-300/30 hover:bg-amber-200/10 hover:text-amber-100"
      >
        Create a new character
      </Link>
    </main>
  );
}
