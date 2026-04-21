"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  backgroundPresets,
  buildCharacterPreviewData,
  buildPortraitPrompt,
  createInitialSessionZeroDraft,
  getCampaignOptions,
  getRaceOptionsForRealm,
  getRealmIdForRace,
  getRealmLabel,
  inventoryKitOptions,
  negativeTraitOptions,
  positiveTraitOptions,
  raceOptions,
  realmOptions,
  sessionZeroDraftStorageKey,
  statModeOptions,
  stepLabels,
  type SessionZeroDraft,
} from "@/lib/omnipath/sessionZeroData";

import styles from "./SessionZeroWizard.module.css";

const portalVideoSrc =
  "/omnipath/assets/session-zero/video/session_zero_portal_loop.mp4";
const portalAudioSrc =
  "/omnipath/assets/session-zero/audio/OmniPath_session_zero.mp3";
const crossfadeLeadSeconds = 1.75;

function attemptMediaPlay(
  element: HTMLAudioElement | HTMLVideoElement | null,
  onFailure?: () => void,
) {
  if (!element) {
    return;
  }

  if (
    typeof navigator !== "undefined" &&
    navigator.userAgent.toLowerCase().includes("jsdom")
  ) {
    return;
  }

  try {
    const playback = element.play();

    if (playback && typeof playback.catch === "function") {
      void playback.catch(() => onFailure?.());
    }
  } catch {
    onFailure?.();
  }
}

function readStoredDraft(initialCampaignId?: string, initialRealmId?: string) {
  if (typeof window === "undefined") {
    return createInitialSessionZeroDraft(initialCampaignId, initialRealmId);
  }

  const stored = window.localStorage.getItem(sessionZeroDraftStorageKey);

  if (!stored) {
    return createInitialSessionZeroDraft(initialCampaignId, initialRealmId);
  }

  try {
    const parsed = JSON.parse(stored) as Partial<SessionZeroDraft>;
    const parsedRealmId = parsed.realmId ?? getRealmIdForRace(parsed.raceId ?? "");
    const nextRealmId = initialRealmId ?? parsedRealmId;
    const nextRaceId =
      initialRealmId && parsedRealmId !== initialRealmId ? "" : (parsed.raceId ?? "");

    return {
      ...createInitialSessionZeroDraft(initialCampaignId, initialRealmId),
      ...parsed,
      realmId: nextRealmId,
      raceId: nextRaceId,
      selectedCampaignId: parsed.selectedCampaignId ?? initialCampaignId ?? "",
    };
  } catch {
    return createInitialSessionZeroDraft(initialCampaignId, initialRealmId);
  }
}

function canAdvance(step: number, draft: SessionZeroDraft) {
  switch (step) {
    case 0:
      return draft.name.trim().length > 0;
    case 1:
      return Boolean(draft.realmId && draft.raceId && draft.backgroundId);
    case 2:
      return (
        draft.positiveTraitIds.length === 2 &&
        draft.negativeTraitIds.length === 2 &&
        draft.inspirationTrait.trim().length > 0 &&
        draft.inspirationSource.trim().length > 0
      );
    case 3:
      return Boolean(draft.statModeId);
    case 4:
      return Boolean(draft.kitId);
    default:
      return true;
  }
}

function toggleTrait(current: string[], value: string, limit: number) {
  if (current.includes(value)) {
    return current.filter((entry) => entry !== value);
  }

  if (current.length >= limit) {
    return current;
  }

  return [...current, value];
}

function formatHeightBuildLine(
  height: SessionZeroDraft["height"],
  build: SessionZeroDraft["build"],
) {
  const heightLabel = {
    short: "Short of stature",
    average: "Even of stature",
    tall: "Tall in stature",
  }[height];

  const buildLabel = {
    lean: "lean in frame",
    balanced: "steady in frame",
    broad: "broad in frame",
  }[build];

  return `${heightLabel}, ${buildLabel}`;
}

export function SessionZeroWizard({
  initialCampaignId,
  initialRealmId,
}: {
  initialCampaignId?: string;
  initialRealmId?: string;
}) {
  const panelBodyRef = useRef<HTMLDivElement | null>(null);
  const primaryVideoRef = useRef<HTMLVideoElement | null>(null);
  const secondaryVideoRef = useRef<HTMLVideoElement | null>(null);
  const [draft, setDraft] = useState<SessionZeroDraft>(() =>
    createInitialSessionZeroDraft(initialCampaignId, initialRealmId),
  );
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [showBackdropMedia, setShowBackdropMedia] = useState(false);
  const [step, setStep] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [crossfading, setCrossfading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [audioHint, setAudioHint] = useState("Portal theme active.");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isRealmAnchored = Boolean(initialRealmId);

  useEffect(() => {
    setDraft(readStoredDraft(initialCampaignId, initialRealmId));
    setHasRestoredDraft(true);
  }, [initialCampaignId, initialRealmId]);

  useEffect(() => {
    setShowBackdropMedia(true);
  }, []);

  useEffect(() => {
    if (!hasRestoredDraft) {
      return;
    }

    window.localStorage.setItem(
      sessionZeroDraftStorageKey,
      JSON.stringify(draft),
    );
  }, [draft, hasRestoredDraft]);

  useEffect(() => {
    const active = primaryVideoRef.current;

    if (!active) {
      return;
    }

    attemptMediaPlay(active, () => {
      active.muted = true;
      attemptMediaPlay(active);
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
    audio.muted = audioMuted;
  }, [audioMuted, volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
    audio.muted = audioMuted;

    attemptMediaPlay(audio, () =>
      setAudioHint(
        "Portal theme ready. If your browser blocked autoplay, use the sound control.",
      ),
    );
  }, [audioMuted, volume]);

  useEffect(() => {
    const panelBody = panelBodyRef.current;

    if (!panelBody) {
      return;
    }

    panelBody.scrollTop = 0;
  }, [step]);

  const previewData = useMemo(() => buildCharacterPreviewData(draft), [draft]);
  const realmRaceOptions = useMemo(
    () => getRaceOptionsForRealm(draft.realmId),
    [draft.realmId],
  );
  const previewHref = `/characters/preview?draft=${encodeURIComponent(
    sessionZeroDraftStorageKey,
  )}&campaign=${encodeURIComponent(draft.selectedCampaignId || initialCampaignId || "")}`;
  const continueCharacterHref = draft.savedCharacterId
    ? `/characters/${draft.savedCharacterId}`
    : "/characters/load";

  function updateDraft(patch: Partial<SessionZeroDraft>) {
    setDraft((current) => ({
      ...current,
      ...patch,
    }));
  }

  function transitionStep(nextStep: number) {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    setStep(nextStep);
  }

  function handleRealmChange(realmId: string) {
    const nextRaceOptions = getRaceOptionsForRealm(realmId);
    const canKeepCurrentRace = nextRaceOptions.some(
      (option) => option.id === draft.raceId,
    );

    updateDraft({
      realmId,
      raceId: canKeepCurrentRace ? draft.raceId : "",
    });
  }

  function handleVideoTimeUpdate(index: number) {
    const video = index === 0 ? primaryVideoRef.current : secondaryVideoRef.current;

    if (!video || crossfading || activeVideoIndex !== index || !video.duration) {
      return;
    }

    if (video.duration - video.currentTime > crossfadeLeadSeconds) {
      return;
    }

    const nextIndex = index === 0 ? 1 : 0;
    const nextVideo =
      nextIndex === 0 ? primaryVideoRef.current : secondaryVideoRef.current;

    if (!nextVideo) {
      return;
    }

    setCrossfading(true);

    try {
      nextVideo.currentTime = 0;
      attemptMediaPlay(nextVideo);

      window.setTimeout(() => {
        video.pause();
        video.currentTime = 0;
        setActiveVideoIndex(nextIndex);
        setCrossfading(false);
      }, 900);
    } catch {
      setCrossfading(false);
    }
  }

  function renderBasicsStep() {
    return (
      <>
        <h1 className={styles.stepTitle}>Create a new character</h1>
        <p className={styles.stepSummary}>
          Start with the basics. Your character will keep saving as you move through each
          step.
        </p>

        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Character name</span>
            <input
              className={styles.input}
              type="text"
              value={draft.name}
              onChange={(event) => updateDraft({ name: event.target.value })}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Gender</span>
            <select
              className={styles.select}
              value={draft.gender}
              onChange={(event) =>
                updateDraft({ gender: event.target.value as SessionZeroDraft["gender"] })
              }
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </label>

          <label className={styles.wideField}>
            <span className={styles.label}>Short background</span>
            <textarea
              className={styles.textarea}
              value={draft.shortBackground}
              onChange={(event) =>
                updateDraft({ shortBackground: event.target.value })
              }
              placeholder="Optional: add one or two grounded lines about where they come from."
            />
          </label>
        </div>
      </>
    );
  }

  function renderIdentityStep() {
    const selectedRace = raceOptions.find((option) => option.id === draft.raceId);
    const selectedBackground = backgroundPresets.find(
      (option) => option.id === draft.backgroundId,
    );
    const anchoredRealmLabel = getRealmLabel(initialRealmId ?? draft.realmId);

    return (
      <>
        <h1 className={styles.stepTitle}>Choose identity</h1>
        <p className={styles.stepSummary}>
          {isRealmAnchored
            ? `The veil has already opened into ${anchoredRealmLabel}. Now choose the lineage and lived past your traveler carries into that world.`
            : "Pick the world first, then narrow into the race and background that fit your character. This step should feel quick on mobile and richer on desktop."}
        </p>

        <section className={styles.identityLayout}>
          <div className={styles.identityFormCard}>
            <div className={styles.identityStack}>
              {isRealmAnchored ? (
                <div className={styles.wideField}>
                  <span className={styles.label}>Realm</span>
                  <div className={styles.lockedField}>{anchoredRealmLabel}</div>
                </div>
              ) : (
                <label className={styles.wideField}>
                  <span className={styles.label}>Realm</span>
                  <select
                    className={styles.select}
                    value={draft.realmId}
                    onChange={(event) => handleRealmChange(event.target.value)}
                  >
                    <option value="">Choose a world</option>
                    {realmOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className={styles.wideField}>
                <span className={styles.label}>Race</span>
                <select
                  className={styles.select}
                  value={draft.raceId}
                  disabled={!draft.realmId}
                  onChange={(event) => updateDraft({ raceId: event.target.value })}
                >
                  <option value="">
                    {draft.realmId ? "Choose a race" : "Choose a realm first"}
                  </option>
                  {realmRaceOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.wideField}>
                <span className={styles.label}>Background preset</span>
                <select
                  className={styles.select}
                  value={draft.backgroundId}
                  onChange={(event) => updateDraft({ backgroundId: event.target.value })}
                >
                  <option value="">Choose a background</option>
                  {backgroundPresets.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span className={styles.label}>Height</span>
                  <select
                    className={styles.select}
                    value={draft.height}
                    onChange={(event) =>
                      updateDraft({
                        height: event.target.value as SessionZeroDraft["height"],
                      })
                    }
                  >
                    <option value="short">Short</option>
                    <option value="average">Average</option>
                    <option value="tall">Tall</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Build</span>
                  <select
                    className={styles.select}
                    value={draft.build}
                    onChange={(event) =>
                      updateDraft({
                        build: event.target.value as SessionZeroDraft["build"],
                      })
                    }
                  >
                    <option value="lean">Lean</option>
                    <option value="balanced">Balanced</option>
                    <option value="broad">Broad</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <aside className={styles.identityPreview}>
            <p className={styles.previewEyebrow}>Character feel</p>
            <h2 className={styles.previewTitle}>
              {selectedRace?.label ?? "A form stirs beyond the veil"}
            </h2>
            <p className={styles.previewBody}>
              {selectedRace?.portraitCue ??
                "The portal has not yet answered your call. Choose a realm and a lineage, and the shape waiting beyond the veil will begin to reveal itself."}
            </p>

            <div className={styles.previewThreads}>
              <p className={styles.previewThread}>
                {draft.realmId ? `${previewData.realmLabel} opens` : "Realm not yet named"}
              </p>
              <p className={styles.previewThread}>
                {selectedBackground?.label
                  ? `${selectedBackground.label} roots`
                  : "Past not yet woven"}
              </p>
              <p className={styles.previewThread}>
                {formatHeightBuildLine(draft.height, draft.build)}
              </p>
            </div>

            <p className={styles.previewNote}>
              {selectedBackground?.cue ??
                "Choose a past, and the portal will begin to show what kind of life has carried this soul to the threshold."}
            </p>
          </aside>
        </section>
      </>
    );
  }

  function renderTraitsStep() {
    return (
      <>
        <h1 className={styles.stepTitle}>Shape the personality</h1>
        <p className={styles.stepSummary}>
          Pick two strengths and two flaws, then name what drives this character forward.
        </p>

        <div className={styles.traitColumns}>
          <section className={styles.traitBox}>
            <p className={styles.label}>Positive traits (pick 2)</p>
            <div className={styles.traitGrid}>
              {positiveTraitOptions.map((trait) => {
                const active = draft.positiveTraitIds.includes(trait);

                return (
                  <label
                    key={trait}
                    className={active ? styles.traitChipActive : styles.traitChip}
                  >
                    <input
                      className={styles.choiceInput}
                      type="checkbox"
                      checked={active}
                      onChange={() =>
                        updateDraft({
                          positiveTraitIds: toggleTrait(
                            draft.positiveTraitIds,
                            trait,
                            2,
                          ),
                        })
                      }
                    />
                    {trait}
                  </label>
                );
              })}
            </div>
          </section>

          <section className={styles.traitBox}>
            <p className={styles.label}>Negative traits (pick 2)</p>
            <div className={styles.traitGrid}>
              {negativeTraitOptions.map((trait) => {
                const active = draft.negativeTraitIds.includes(trait);

                return (
                  <label
                    key={trait}
                    className={active ? styles.traitChipActive : styles.traitChip}
                  >
                    <input
                      className={styles.choiceInput}
                      type="checkbox"
                      checked={active}
                      onChange={() =>
                        updateDraft({
                          negativeTraitIds: toggleTrait(
                            draft.negativeTraitIds,
                            trait,
                            2,
                          ),
                        })
                      }
                    />
                    {trait}
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Inspiration trait</span>
            <input
              className={styles.input}
              type="text"
              value={draft.inspirationTrait}
              onChange={(event) =>
                updateDraft({ inspirationTrait: event.target.value })
              }
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>What gives them inspiration</span>
            <input
              className={styles.input}
              type="text"
              value={draft.inspirationSource}
              onChange={(event) =>
                updateDraft({ inspirationSource: event.target.value })
              }
            />
          </label>
        </div>

        <div className={styles.advanced}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={showAdvanced}
              onChange={() => setShowAdvanced((current) => !current)}
            />
            Show advanced options
          </label>

          {showAdvanced ? (
            <label className={styles.field}>
              <span className={styles.label}>Character scope</span>
              <select
                className={styles.select}
                value={draft.portabilityMode}
                onChange={(event) =>
                  updateDraft({
                    portabilityMode:
                      event.target.value as SessionZeroDraft["portabilityMode"],
                  })
                }
              >
                <option value="worldbound">Stay in this world</option>
                <option value="portable">Keep this character portable</option>
              </select>
            </label>
          ) : null}
        </div>
      </>
    );
  }

  function renderStatsStep() {
    return (
      <>
        <h1 className={styles.stepTitle}>Choose stats</h1>
        <p className={styles.stepSummary}>
          Choose the stat setup that best fits the kind of hero you want to play.
        </p>

        <div className={styles.choiceGrid}>
          {statModeOptions.map((option) => {
            const active = draft.statModeId === option.id;

            return (
              <label
                key={option.id}
                className={active ? styles.choiceCardActive : styles.choiceCard}
              >
                <input
                  className={styles.choiceInput}
                  type="radio"
                  name="stat-mode"
                  checked={active}
                  onChange={() => updateDraft({ statModeId: option.id })}
                />
                <span className={styles.choiceTitle}>{option.label}</span>
                <span className={styles.choiceMeta}>
                  {option.statline
                    .map((entry) => `${entry.label} ${entry.value}`)
                    .join(" • ")}
                </span>
              </label>
            );
          })}
        </div>
      </>
    );
  }

  function renderKitStep() {
    return (
      <>
        <h1 className={styles.stepTitle}>Pick a starting kit</h1>
        <p className={styles.stepSummary}>
          Pick the gear loadout that best matches how this character enters the world.
        </p>

        <div className={styles.choiceGrid}>
          {inventoryKitOptions.map((option) => {
            const active = draft.kitId === option.id;

            return (
              <label
                key={option.id}
                className={active ? styles.choiceCardActive : styles.choiceCard}
              >
                <input
                  className={styles.choiceInput}
                  type="radio"
                  name="kit"
                  checked={active}
                  onChange={() => updateDraft({ kitId: option.id })}
                />
                <span className={styles.choiceTitle}>{option.label}</span>
                <span className={styles.choiceMeta}>{option.items.join(" • ")}</span>
              </label>
            );
          })}
        </div>
      </>
    );
  }

  function renderReviewStep() {
    const campaignOptions = getCampaignOptions();

    return (
      <>
        <h1 className={styles.stepTitle}>Review your character</h1>
        <p className={styles.stepSummary}>
          Take one last look before you step into the campaign.
        </p>

        <div className={styles.reviewGrid}>
          <section className={styles.reviewPanel}>
            <p className={styles.label}>Core profile</p>
            <p className={styles.reviewCopy}>
              {draft.name}
              {"\n"}
              {previewData.raceLabel} • {previewData.backgroundLabel}
              {"\n"}
              {draft.height} • {draft.build} • {draft.gender}
            </p>

            <p className={styles.label}>Portrait prompt</p>
            <p className={styles.reviewCopy}>{buildPortraitPrompt(draft)}</p>
          </section>

          <aside className={styles.reviewPanel}>
            <p className={styles.label}>Choose campaign</p>
            <div className={styles.choiceGrid}>
              {campaignOptions.map((campaign) => {
                const active = draft.selectedCampaignId === campaign.id;

                return (
                  <label
                    key={campaign.id}
                    className={active ? styles.choiceCardActive : styles.choiceCard}
                  >
                    <input
                      className={styles.choiceInput}
                      type="radio"
                      name="campaign"
                      checked={active}
                      onChange={() =>
                        updateDraft({ selectedCampaignId: campaign.id })
                      }
                    />
                    <span className={styles.choiceTitle}>{campaign.label}</span>
                    <span className={styles.choiceMeta}>{campaign.summary}</span>
                  </label>
                );
              })}
            </div>

            <p className={styles.label}>{previewData.kitLabel}</p>
            <ul className={styles.list}>
              {previewData.kitItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </>
    );
  }

  return (
    <main className={styles.shell}>
      <audio ref={audioRef} loop preload="auto" src={portalAudioSrc} />

      <section className={styles.backdrop} aria-hidden="true">
        <div className={styles.videoLayer}>
          {showBackdropMedia
            ? [0, 1].map((index) => {
              const active = activeVideoIndex === index;
              const visible = active || (crossfading && activeVideoIndex !== index);

              return (
                <video
                  key={index}
                  ref={index === 0 ? primaryVideoRef : secondaryVideoRef}
                  className={`${styles.video} ${visible ? styles.videoLive : styles.videoIdle
                    }`}
                  autoPlay={index === 0}
                  muted
                  playsInline
                  preload="auto"
                  onTimeUpdate={() => handleVideoTimeUpdate(index)}
                  src={portalVideoSrc}
                />
              );
            })
            : null}
        </div>
        <div className={styles.shade} />
      </section>

      <div className={styles.content}>
        <header className={styles.topBar}>
          <div>
            <p className="omni-kicker">Session Zero - Character creation</p>
            <p className={styles.helper}>
              Build your character, save your place, and step into the world when you are
              ready.
            </p>
          </div>

          <div className={styles.topActions}>
            <Link href="/" className={styles.exitLink}>
              Exit to main screen
            </Link>
            <Link href={continueCharacterHref} className={styles.continueLink}>
              Continue Character
            </Link>
            <div className={styles.soundGroup}>
              <button
                type="button"
                className={styles.soundButton}
                onClick={() => {
                  const nextMuted = !audioMuted;
                  setAudioMuted(nextMuted);
                  setAudioHint(nextMuted ? "Portal theme muted." : "Portal theme active.");
                }}
              >
                {audioMuted ? "Unmute" : "Mute"}
              </button>
              <input
                className={styles.soundSlider}
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                aria-label="Portal music volume"
              />
              <p className={styles.soundHint}>{audioHint}</p>
            </div>
          </div>
        </header>

        <section className={styles.progressCard}>
          <div className={styles.progressHeading}>
            <p className={styles.progressText}>
              Step {step + 1} of {stepLabels.length}
            </p>
            <p className={styles.savedText}>Your progress is being saved.</p>
          </div>

          <ol className={styles.breadcrumbs}>
            {stepLabels.map((label, index) => (
              <li
                key={label}
                className={index === step ? styles.breadcrumbActive : styles.breadcrumb}
              >
                {label}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.panel}>
          <div
            ref={panelBodyRef}
            className={styles.panelBody}
            data-testid="session-zero-step-body"
          >
            {step === 0 ? renderBasicsStep() : null}
            {step === 1 ? renderIdentityStep() : null}
            {step === 2 ? renderTraitsStep() : null}
            {step === 3 ? renderStatsStep() : null}
            {step === 4 ? renderKitStep() : null}
            {step === 5 ? renderReviewStep() : null}
          </div>

          <footer className={styles.footer} data-testid="session-zero-footer">
            <p className={styles.helper}>
              You can leave anytime and come back where you left off.
            </p>

            <div className={styles.footerActions}>
              <button
                type="button"
                className={styles.button}
                onClick={() => transitionStep(Math.max(step - 1, 0))}
                disabled={step === 0}
              >
                Back
              </button>

              {step < stepLabels.length - 1 ? (
                <button
                  type="button"
                  className={styles.buttonPrimary}
                  onClick={() => transitionStep(Math.min(step + 1, stepLabels.length - 1))}
                  disabled={!canAdvance(step, draft)}
                >
                  Next
                </button>
              ) : (
                <Link href={previewHref} className={styles.previewLink}>
                  Preview character sheet
                </Link>
              )}
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
