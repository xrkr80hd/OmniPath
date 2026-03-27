"use client";

import { startTransition, useState } from "react";

import { SparkleEffect } from "./SparkleEffect";

export type LandingVideo = {
  id: string;
  label: string;
  title: string;
  description: string;
  src?: string;
  poster?: string;
};

type VideoHeroProps = {
  videos: LandingVideo[];
  promptText: string;
};

export function VideoHero({ videos, promptText }: VideoHeroProps) {
  const [isActivated, setIsActivated] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const activeVideo = videos[0];

  function handleActivate() {
    setBurstKey((current) => current + 1);

    startTransition(() => {
      setIsActivated(true);
    });
  }

  return (
    <section className="omni-shell py-8 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,24rem)] lg:items-end">
        <div className="space-y-5">
          <p className="omni-kicker">Landing sequence</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-none tracking-[-0.06em] text-white md:text-7xl">
            Enter a campaign platform built for worlds that do not fit one rulebook.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            OmniPath is being staged around entry flow first: landing, sign-in,
            campaigns, profile, and Session Zero before backend wiring begins.
          </p>
        </div>

        <div className="omni-card space-y-4 lg:max-w-sm">
          <p className="omni-kicker">Foundation status</p>
          <ul className="space-y-3 text-sm leading-6 text-slate-300">
            <li>Local landing interaction is active.</li>
            <li>Route skeletons are present without auth wiring.</li>
            <li>Supabase and Vercel integration remain intentionally paused.</li>
          </ul>
        </div>
      </div>

      <div className="relative mt-10 min-h-[28rem] overflow-hidden border border-amber-300/20 bg-slate-950 shadow-[0_30px_80px_rgba(8,15,32,0.55)]">
        {activeVideo?.src ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={activeVideo.src}
            poster={activeVideo.poster}
            preload="metadata"
            playsInline
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,155,88,0.26),_rgba(9,14,26,0.92)_48%,_rgba(2,6,23,1)_100%)]" />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,22,0.22),rgba(5,10,22,0.8))]" />
        <SparkleEffect burstKey={burstKey} />

        <div className="relative flex min-h-[28rem] flex-col justify-between p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">
            {videos.map((video, index) => (
              <span
                key={video.id}
                className={`border px-3 py-2 ${index === 0
                    ? "border-amber-300/40 bg-amber-200/10 text-amber-100"
                    : "border-white/10 bg-white/5 text-slate-300"
                  }`}
              >
                {video.label}
              </span>
            ))}
          </div>

          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-100/80">
              {activeVideo?.title ?? "Hero sequence pending media"}
            </p>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">
              {activeVideo?.description ??
                "Video assets will be loaded into this sequence once the source path is defined."}
            </p>
            <button
              type="button"
              onClick={handleActivate}
              className="group inline-flex min-h-16 items-center border border-amber-300/35 bg-slate-950/65 px-6 py-4 text-left text-lg font-medium tracking-[0.08em] text-amber-50 transition hover:border-amber-200/60 hover:bg-amber-200/10"
            >
              <span>{promptText}</span>
              <span className="ml-4 text-sm uppercase tracking-[0.24em] text-amber-100/80">
                {isActivated ? "spark awakened" : "touch or click"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
