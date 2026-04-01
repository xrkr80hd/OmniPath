"use client";

import { Cinzel_Decorative, Oxanium } from "next/font/google";
import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";

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
  onEnter?: () => void;
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

export function TitleScreen({
  onEnter,
  footerNote,
}: TitleScreenProps) {
  const [burstKey, setBurstKey] = useState(0);
  const [isEntered, setIsEntered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setActiveImageIndex(Math.floor(Math.random() * titleSequence.length));

    return () => {
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
      }
    };
  }, []);

  function handleEnter() {
    if (isEntered) {
      return;
    }

    setBurstKey((current) => current + 1);

    startTransition(() => {
      setIsEntered(true);
    });

    if (onEnter) {
      enterTimeoutRef.current = setTimeout(() => {
        onEnter();
      }, 320);
    }
  }

  return (
    <main
      className={`${styles.screen} ${titleFont.variable} ${interfaceFont.variable}`}
      onClick={handleEnter}
    >
      <div className={styles.imageStack} aria-hidden="true">
        {titleSequence.map((imagePath, index) => {
          const imageClassName = [styles.imageBlur, index === activeImageIndex ? styles.imageBlurActive : ""]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={`blur-${imagePath}`} className={imageClassName}>
              <Image
                src={imagePath}
                alt=""
                fill
                sizes="100vw"
                className={styles.blurImage}
              />
            </div>
          );
        })}

        <div className={styles.imageFrame}>
          {titleSequence.map((imagePath, index) => {
            const imageClassName = [styles.sequenceImage, index === activeImageIndex ? styles.sequenceImageActive : ""]
              .filter(Boolean)
              .join(" ");

            return (
              <Image
                key={imagePath}
                src={imagePath}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className={imageClassName}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.aura} aria-hidden="true" />

      <section className={styles.content} aria-label="Title screen">
        <p className={styles.eyebrow}>Phase I</p>

        <div className={styles.entryZone}>
          <button type="button" className={styles.enterButton} onClick={handleEnter}>
            <span className={styles.enterPrimary}>Enter The Gate</span>
          </button>

          <p className={styles.enterSecondary}>
            {isEntered ? "Threshold engaged." : "Attune the passage and begin."}
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
