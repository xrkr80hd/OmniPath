"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { realmOptions } from "@/lib/omnipath/sessionZeroData";

import styles from "./ChooseRealmGateway.module.css";

const portalVideoSrc =
  "/omnipath/assets/session-zero/video/session_zero_portal_loop.mp4";

const realmCopy: Record<string, { omen: string; invitation: string }> = {
  dnd: {
    omen: "Old roads stir beneath dragon-shadow and lantern flame.",
    invitation:
      "Step into a realm of vows, ruins, wild magic, and names that echo through stone halls.",
  },
  pathfinder: {
    omen: "The map redraws itself in ink, steel, and hungry horizons.",
    invitation:
      "Cross into a realm of frontier legends, fractured empires, and hard-won heroism.",
  },
  warhammer: {
    omen: "The heavens split with omen-fire and the drums below answer back.",
    invitation:
      "Enter a realm of grim banners, sacred ruin, and courage tested against apocalypse.",
  },
  shadowrun: {
    omen: "Neon rain hisses over chrome while the astral hums just behind the glass.",
    invitation:
      "Walk into a realm where magic returned to a wired world and every deal leaves a scar.",
  },
  omnipath: {
    omen: "The threshold between worlds recognizes a traveler with no single home.",
    invitation:
      "Begin in OmniPath itself, where the traveler is forged for passage across every realm to come.",
  },
};

export function ChooseRealmGateway() {
  const router = useRouter();
  const [selectedRealmId, setSelectedRealmId] = useState("");
  const selectedRealmCopy = useMemo(
    () => realmCopy[selectedRealmId] ?? null,
    [selectedRealmId],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedRealmId) {
      return;
    }

    router.push(`/characters/new/${selectedRealmId}`);
  }

  return (
    <main className={styles.shell}>
      <section className={styles.backdrop} aria-hidden="true">
        <div className={styles.videoLayer}>
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={portalVideoSrc}
          />
        </div>
        <div className={styles.shade} />
      </section>

      <div className={styles.content}>
        <header className={styles.topBar}>
          <div className={styles.crumbs} aria-label="Navigation">
            <Link href="/" className={styles.returnLink}>
              Return to landing screen
            </Link>
            <p className={styles.pathText}>Landing Screen / Travel to a Realm</p>
          </div>
        </header>

        <section className={styles.gateway}>
          <div className={styles.copyBlock}>
            <p className={styles.kicker}>Travel To A Realm</p>
            <h1 className={styles.title}>The threshold is listening.</h1>
            <p className={styles.summary}>
              Choose the world that answers back, then step through the breach.
            </p>

            <form className={styles.gatewayForm} onSubmit={handleSubmit}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Realm</span>
                <select
                  className={styles.select}
                  aria-label="Choose realm"
                  value={selectedRealmId}
                  onChange={(event) => setSelectedRealmId(event.target.value)}
                >
                  <option value="">Choose a realm</option>
                  {realmOptions.map((realm) => (
                    <option key={realm.id} value={realm.id}>
                      {realm.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={!selectedRealmId}
              >
                Step through the breach
              </button>
            </form>

            {selectedRealmCopy ? (
              <div className={styles.selectionCopy}>
                <p className={styles.omen}>{selectedRealmCopy.omen}</p>
                <p className={styles.invitation}>{selectedRealmCopy.invitation}</p>
              </div>
            ) : (
              <p className={styles.placeholderCopy}>
                The gate remains closed until you name the world you intend to cross.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
