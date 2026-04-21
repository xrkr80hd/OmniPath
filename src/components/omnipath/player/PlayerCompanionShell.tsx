"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import {
  getSavedCharactersForCampaign,
  saveCharacter,
  type SavedCharacterCrop,
  type SavedCharacterRecord,
} from "@/lib/omnipath/savedCharacters";

import styles from "./PlayerCompanionShell.module.css";

const departureOptions: Record<string, {
  grounded: string[];
  silly: string[];
}> = {
  dnd: {
    grounded: ["camp", "the tavern", "the harbor bunkhouse", "the watchfire"],
    silly: ["the snack cart", "the coziest barrel by the fire"],
  },
  pathfinder: {
    grounded: ["camp", "the tavern", "the watchfire", "the healer's tent"],
    silly: ["the pie stand", "a suspiciously musical mushroom circle"],
  },
  shadowrun: {
    grounded: ["the colony", "their bunk", "the station canteen", "the med bay"],
    silly: ["the synth-noodle kiosk", "the least cursed vending alcove"],
  },
  warhammer: {
    grounded: ["their rooming house", "the lamplit study", "the warded parlor"],
    silly: ["the only chair not whispering back", "the tea room with fewer omens"],
  },
  omnipath: {
    grounded: ["the roadside motel", "the diner", "the van", "the neon campsite"],
    silly: ["the arcade corner", "the snack machine with cosmic opinions"],
  },
  neutral: {
    grounded: ["camp", "the tavern", "the harbor bunkhouse", "the watchfire"],
    silly: ["the snack cart", "the coziest barrel by the fire"],
  },
};

function createStepAwayUpdate(characterName: string, realmId: string) {
  const options = departureOptions[realmId] ?? departureOptions.neutral;
  const sillyPool = Math.random() < 0.18 ? options.silly : [];
  const pool = sillyPool.length > 0 ? sillyPool : options.grounded;
  const locationLabel = pool[Math.floor(Math.random() * pool.length)] ?? "camp";

  return {
    locationLabel,
    lastUpdate: {
      id: `presence-away-${Date.now()}`,
      label: "MVP update",
      detail: `${characterName} has gone back to ${locationLabel}.`,
    },
  };
}

function createReturnUpdate(characterName: string, locationLabel: string) {
  return {
    id: `presence-return-${Date.now()}`,
    label: "MVP update",
    detail: `${characterName} has returned from ${locationLabel}.`,
  };
}

function createLeaveGameUpdate(characterName: string, realmId: string) {
  const nextDeparture = createStepAwayUpdate(characterName, realmId);

  return {
    locationLabel: nextDeparture.locationLabel,
    lastUpdate: {
      id: `presence-gone-${Date.now()}`,
      label: "MVP update",
      detail: `${characterName} has left the game and gone back to ${nextDeparture.locationLabel}.`,
    },
  };
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read image file."));
    };

    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });
}

function buildCropStyle(crop: SavedCharacterCrop) {
  return {
    objectPosition: `${crop.x}% ${crop.y}%`,
    transform: `scale(${crop.zoom})`,
  };
}

export function PlayerCompanionShell({
  character,
}: {
  character: SavedCharacterRecord;
}) {
  const router = useRouter();
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [characterState, setCharacterState] = useState(character);
  const [partyRoster, setPartyRoster] = useState(() =>
    getSavedCharactersForCampaign(character.campaignId),
  );
  const [dragActive, setDragActive] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(
    character.portraitImageSrc ? "Portrait saved." : "Add a portrait from your device.",
  );

  useEffect(() => {
    setCharacterState(character);
    setPartyRoster(getSavedCharactersForCampaign(character.campaignId));
    setUploadMessage(character.portraitImageSrc ? "Portrait saved." : "Add a portrait from your device.");
  }, [character]);

  function persistCharacter(
    updater: (current: SavedCharacterRecord) => SavedCharacterRecord,
  ) {
    setCharacterState((current) => {
      const next = saveCharacter({
        ...updater(current),
        updatedAt: new Date().toISOString(),
      });

      setPartyRoster(getSavedCharactersForCampaign(next.campaignId));
      return next;
    });
  }

  async function applyPortrait(file: File | null) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadMessage("Use an image file for the portrait.");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      persistCharacter((current) => ({
        ...current,
        portraitImageSrc: dataUrl,
      }));
      setUploadMessage("Portrait saved.");
    } catch {
      setUploadMessage("The portrait could not be read. Try another image.");
    }
  }

  function clearPortrait() {
    persistCharacter((current) => ({
      ...current,
      portraitImageSrc: null,
    }));
    setUploadMessage("Portrait removed.");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handlePresenceToggle() {
    if (characterState.presenceMode === "away") {
      persistCharacter((current) => ({
        ...current,
        presenceMode: "active",
        status: "Waiting for turn",
        feed: [createReturnUpdate(current.name, current.presenceLocationLabel), ...current.feed],
      }));
      return;
    }

    const nextDeparture = createStepAwayUpdate(characterState.name, characterState.realmId);

    persistCharacter((current) => ({
      ...current,
      presenceMode: "away",
      presenceLocationLabel: nextDeparture.locationLabel,
      status: `Stepped away • Back at ${nextDeparture.locationLabel}`,
      feed: [nextDeparture.lastUpdate, ...current.feed],
    }));
  }

  function handleLeaveGame() {
    const nextDeparture = createLeaveGameUpdate(characterState.name, characterState.realmId);

    persistCharacter((current) => ({
      ...current,
      presenceMode: "gone",
      presenceLocationLabel: nextDeparture.locationLabel,
      status: `Left the game • Back at ${nextDeparture.locationLabel}`,
      feed: [nextDeparture.lastUpdate, ...current.feed],
    }));
    router.push("/campaigns");
  }

  function updateCrop(target: "portraitCrop" | "tokenCrop", field: keyof SavedCharacterCrop, value: number) {
    persistCharacter((current) => ({
      ...current,
      [target]: {
        ...current[target],
        [field]: value,
      },
    }));
  }

  const portraitStyle = useMemo(
    () => buildCropStyle(characterState.portraitCrop),
    [characterState.portraitCrop],
  );
  const tokenStyle = useMemo(
    () => buildCropStyle(characterState.tokenCrop),
    [characterState.tokenCrop],
  );
  const displayedFeed = characterState.feed;
  const partyMembers = useMemo(() => {
    const seen = new Set<string>();

    return [characterState, ...partyRoster]
      .filter((entry) => {
        if (seen.has(entry.id)) {
          return false;
        }

        seen.add(entry.id);
        return true;
      })
      .sort((left, right) => {
        if (left.id === characterState.id) {
          return -1;
        }

        if (right.id === characterState.id) {
          return 1;
        }

        return right.updatedAt.localeCompare(left.updatedAt);
      });
  }, [characterState, partyRoster]);

  return (
    <main className={styles.shell}>
      <header className={styles.summary}>
        <section className={styles.identityBlock}>
          <p className="omni-kicker">Companion</p>
          <h1 className={styles.name}>{characterState.name}</h1>
          <p className={styles.status}>{characterState.status}</p>

          <div className={styles.identityMeta}>
            <span className={styles.metaPill}>{characterState.realmLabel}</span>
            <span className={styles.metaPill}>{characterState.raceLabel}</span>
            <span className={styles.metaPill}>{characterState.backgroundLabel}</span>
            <span className={styles.metaPill}>{characterState.campaignName}</span>
          </div>

          <p className={styles.identityCopy}>
            {characterState.shortBackground || characterState.portraitPrompt}
          </p>
        </section>

        <section className={styles.portraitPanel} aria-label="Character portrait">
          <div className={styles.portraitStack}>
            <label
              htmlFor={inputId}
              className={`${styles.portraitFrame} ${styles.portraitPicker} ${dragActive ? styles.portraitPickerActive : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setDragActive(false);
              }}
              onDrop={(event) => {
                event.preventDefault();
                setDragActive(false);
                void applyPortrait(event.dataTransfer.files[0] ?? null);
              }}
            >
              {characterState.portraitImageSrc ? (
                <img
                  src={characterState.portraitImageSrc}
                  alt={`${characterState.name} portrait`}
                  className={styles.portraitImage}
                  style={portraitStyle}
                />
              ) : (
                <div className={styles.portraitPlaceholder} aria-hidden="true">
                  <span className={styles.placeholderSigil}>OP</span>
                </div>
              )}

              <span className={styles.portraitOverlay}>
                <span className={styles.uploadTitle}>
                  {characterState.portraitImageSrc ? "Update portrait" : "Add portrait"}
                </span>
                <span className={styles.uploadCopy}>{uploadMessage}</span>
              </span>
            </label>

            <div className={styles.tokenCard} aria-label="Token preview">
              <p className={styles.panelLabel}>Board token</p>
              <div className={styles.tokenFrame}>
                {characterState.portraitImageSrc ? (
                  <img
                    src={characterState.portraitImageSrc}
                    alt={`${characterState.name} token`}
                    className={styles.tokenImage}
                    style={tokenStyle}
                  />
                ) : (
                  <div className={styles.tokenPlaceholder} aria-hidden="true">
                    <span className={styles.placeholderSigil}>OP</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            id={inputId}
            className={styles.fileInput}
            type="file"
            accept="image/*"
            aria-label="Choose portrait image"
            onChange={(event) => {
              void applyPortrait(event.target.files?.[0] ?? null);
            }}
          />

          {characterState.portraitImageSrc ? (
            <button type="button" className={styles.clearPortrait} onClick={clearPortrait}>
              Delete portrait
            </button>
          ) : null}
        </section>
      </header>

      <section className={styles.editorGrid}>
        <article className={styles.panel}>
          <p className={styles.panelLabel}>Portrait framing</p>
          <p className={styles.editorCopy}>
            Crop and expand the portrait so the character sheet shows the face exactly where
            you want it.
          </p>
          <div className={styles.controlGrid}>
            <label className={styles.rangeField}>
              <span>Zoom</span>
              <input
                aria-label="Portrait zoom"
                type="range"
                min="1"
                max="2.5"
                step="0.05"
                value={characterState.portraitCrop.zoom}
                onChange={(event) =>
                  updateCrop("portraitCrop", "zoom", Number(event.target.value))
                }
              />
            </label>
            <label className={styles.rangeField}>
              <span>Face left / right</span>
              <input
                aria-label="Portrait horizontal focus"
                type="range"
                min="0"
                max="100"
                step="1"
                value={characterState.portraitCrop.x}
                onChange={(event) =>
                  updateCrop("portraitCrop", "x", Number(event.target.value))
                }
              />
            </label>
            <label className={styles.rangeField}>
              <span>Face up / down</span>
              <input
                aria-label="Portrait vertical focus"
                type="range"
                min="0"
                max="100"
                step="1"
                value={characterState.portraitCrop.y}
                onChange={(event) =>
                  updateCrop("portraitCrop", "y", Number(event.target.value))
                }
              />
            </label>
          </div>
        </article>

        <article className={styles.panel}>
          <p className={styles.panelLabel}>Token framing</p>
          <p className={styles.editorCopy}>
            Pull the face in tighter for the smaller board icon so movement still reads clearly.
          </p>
          <div className={styles.controlGrid}>
            <label className={styles.rangeField}>
              <span>Zoom</span>
              <input
                aria-label="Token zoom"
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={characterState.tokenCrop.zoom}
                onChange={(event) =>
                  updateCrop("tokenCrop", "zoom", Number(event.target.value))
                }
              />
            </label>
            <label className={styles.rangeField}>
              <span>Face left / right</span>
              <input
                aria-label="Token horizontal focus"
                type="range"
                min="0"
                max="100"
                step="1"
                value={characterState.tokenCrop.x}
                onChange={(event) =>
                  updateCrop("tokenCrop", "x", Number(event.target.value))
                }
              />
            </label>
            <label className={styles.rangeField}>
              <span>Face up / down</span>
              <input
                aria-label="Token vertical focus"
                type="range"
                min="0"
                max="100"
                step="1"
                value={characterState.tokenCrop.y}
                onChange={(event) =>
                  updateCrop("tokenCrop", "y", Number(event.target.value))
                }
              />
            </label>
          </div>
        </article>
      </section>

      <section className={styles.dashboard}>
        <article className={styles.panel}>
          <p className={styles.panelLabel}>Inventory</p>
          <ul className={styles.list}>
            {characterState.inventory.map((item) => (
              <li key={item.id} className={styles.item}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemDetail}>{item.detail}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.panel}>
          <p className={styles.panelLabel}>Party presence</p>
          <ul className={styles.partyList}>
            {partyMembers.map((member) => (
              <li key={member.id} className={styles.partyCard}>
                <div className={styles.partyToken}>
                  {member.portraitImageSrc ? (
                    <img
                      src={member.portraitImageSrc}
                      alt={`${member.name} party token`}
                      className={styles.partyTokenImage}
                      style={buildCropStyle(member.tokenCrop)}
                    />
                  ) : (
                    <div className={styles.tokenPlaceholder} aria-hidden="true">
                      <span className={styles.placeholderSigil}>OP</span>
                    </div>
                  )}
                </div>
                <div className={styles.partyBody}>
                  <strong className={styles.itemName}>{member.name}</strong>
                  <span className={styles.itemDetail}>{member.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <aside className={styles.panel}>
          <p className={styles.panelLabel}>Event feed</p>
          <ul className={styles.feed}>
            {displayedFeed.map((entry) => (
              <li key={entry.id} className={styles.feedItem}>
                <strong className={styles.feedTitle}>{entry.label}</strong>
                <span className={styles.feedDetail}>{entry.detail}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <footer className={styles.actionTray}>
        <div>
          <p className={styles.panelLabel}>Turn state</p>
          <p className={styles.lockReason}>
            {characterState.presenceMode === "away"
              ? `The table can keep moving while ${characterState.name} is away.`
              : characterState.presenceMode === "gone"
                ? `${characterState.name} has stepped out of the game. The table can continue without blocking on this sheet.`
                : characterState.actionState.lockReason}
          </p>
        </div>

        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={handlePresenceToggle}
          >
            {characterState.presenceMode === "away" ? "Return to table" : "Step away for now"}
          </button>

          <button
            type="button"
            className={styles.leaveGame}
            onClick={handleLeaveGame}
          >
            Leave game
          </button>

          <button
            type="button"
            disabled={!characterState.actionState.canAct}
            className={styles.endTurn}
          >
            End Turn
          </button>
        </div>
      </footer>
    </main>
  );
}
