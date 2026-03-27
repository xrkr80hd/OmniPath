"use client";

import styles from "./SparkleEffect.module.css";

type SparkleEffectProps = {
  burstKey: number;
};

const sparkleSlots = Array.from({ length: 14 }, (_, index) => index + 1);

export function SparkleEffect({ burstKey }: SparkleEffectProps) {
  if (!burstKey) {
    return null;
  }

  return (
    <div key={burstKey} className={styles.root} aria-hidden="true">
      {sparkleSlots.map((slot) => (
        <span
          key={slot}
          className={`${styles.sparkle} ${styles[`sparkle${slot}` as keyof typeof styles]}`}
        />
      ))}
    </div>
  );
}
