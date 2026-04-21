"use client";

import { Cinzel_Decorative, Oxanium } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { SparkleEffect } from "@/components/landing/SparkleEffect";

import styles from "./TitleScreen.module.css";

const titleFont = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-omni-title",
});

const interfaceFont = Oxanium({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-omni-interface",
});

type TitleScreenProps = {
  createHref: string;
  loadHref: string;
  settingsHref: string;
  footerNote?: string;
};

const titleSequence = [
  "/omnipath/screens/title-sequence/OP_16bit1.jpg",
  "/omnipath/screens/title-sequence/OP_8bit1.jpg",
  "/omnipath/screens/title-sequence/OP_8bit2.jpg",
  "/omnipath/screens/title-sequence/OP_comic1.jpg",
  "/omnipath/screens/title-sequence/OP_comic2.jpg",
  "/omnipath/screens/title-sequence/OP_fantasy1.jpg",
  "/omnipath/screens/title-sequence/OP_fantasy2.jpg",
  "/omnipath/screens/title-sequence/OP_lovecraft1.jpg",
  "/omnipath/screens/title-sequence/OP_lovecraft2.jpg",
  "/omnipath/screens/title-sequence/OP_medieval1.jpg",
  "/omnipath/screens/title-sequence/OP_medieval2.jpg",
  "/omnipath/screens/title-sequence/OP_ps1-1.jpg",
  "/omnipath/screens/title-sequence/OP_ps1-2.jpg",
  "/omnipath/screens/title-sequence/OP_rustic1.jpg",
  "/omnipath/screens/title-sequence/OP_rustic2.jpg",
  "/omnipath/screens/title-sequence/OP_scifi1.jpg",
  "/omnipath/screens/title-sequence/OP_scifi2.jpg",
  "/omnipath/screens/title-sequence/OP_seampunk2.jpg",
  "/omnipath/screens/title-sequence/OP_steampunk1.jpg",
];

const defaultTitleImage = titleSequence[0];

export function TitleScreen({
  createHref,
  loadHref,
  settingsHref,
  footerNote,
}: TitleScreenProps) {
  const [burstKey, setBurstKey] = useState(0);

  function handleEntryFocus() {
    setBurstKey((current) => current + 1);
  }

  return (
    <main className={`${styles.screen} ${titleFont.variable} ${interfaceFont.variable}`}>
      <div className={styles.imageStack} aria-hidden="true">
        <div className={`${styles.imageBlur} ${styles.imageBlurActive}`}>
          <Image
            src={defaultTitleImage}
            alt=""
            fill
            sizes="100vw"
            className={styles.blurImage}
          />
        </div>

        <div className={styles.imageFrame}>
          <Image
            src={defaultTitleImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${styles.sequenceImage} ${styles.sequenceImageActive}`}
          />
        </div>
      </div>

      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.aura} aria-hidden="true" />

      <section className={styles.content} aria-label="Title screen">
        <p className={styles.eyebrow}>Character Creation</p>

        <div className={styles.entryZone}>
          <Link
            href={createHref}
            className={styles.enterButton}
            onMouseEnter={handleEntryFocus}
            onFocus={handleEntryFocus}
          >
            <span className={styles.enterPrimary}>Create Character</span>
          </Link>

          <Link
            href={loadHref}
            className={`${styles.enterButton} ${styles.secondaryButton}`}
            onMouseEnter={handleEntryFocus}
            onFocus={handleEntryFocus}
          >
            <span className={styles.enterPrimary}>Load Character</span>
          </Link>

          <Link
            href={settingsHref}
            className={`${styles.enterButton} ${styles.tertiaryButton}`}
            onMouseEnter={handleEntryFocus}
            onFocus={handleEntryFocus}
          >
            <span className={styles.enterPrimary}>Settings</span>
          </Link>

          <p className={styles.enterSecondary}>
            Choose how you want to begin.
          </p>

          <div className={styles.sparkleAnchor}>
            <SparkleEffect burstKey={burstKey} />
          </div>
        </div>

        {footerNote ? <p className={styles.footerNote}>{footerNote}</p> : null}
      </section>
    </main>
  );
}
