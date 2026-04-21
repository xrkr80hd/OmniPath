import Link from "next/link";

import type { CharacterPreviewData } from "@/lib/omnipath/sessionZeroData";

import styles from "./CharacterPreviewShell.module.css";

export function CharacterPreviewShell({
  character,
}: {
  character: CharacterPreviewData;
}) {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <p className="omni-kicker">Character Preview</p>
        <h1 className={styles.title}>{character.name}</h1>
        <p className={styles.summary}>
          {character.raceLabel} • {character.backgroundLabel} •{" "}
          {character.selectedCampaignName}
        </p>
      </section>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <p className={styles.label}>Portrait Prompt</p>
          <p className={styles.prompt}>{character.portraitPrompt}</p>

          <p className={styles.label}>Inspiration</p>
          <p className={styles.meta}>
            <strong>{character.inspirationTrait}</strong>
            <br />
            {character.inspirationSource}
          </p>

          <p className={styles.label}>Trait Profile</p>
          <ul className={styles.chips} aria-label="Trait profile">
            {character.positiveTraits.map((trait) => (
              <li key={`positive-${trait}`} className={styles.chip}>
                {trait}
              </li>
            ))}
            {character.negativeTraits.map((trait) => (
              <li key={`negative-${trait}`} className={styles.chip}>
                {trait}
              </li>
            ))}
          </ul>
        </section>

        <aside className={styles.panel}>
          <p className={styles.label}>{character.statModeLabel}</p>
          <ul className={styles.stats}>
            {character.statline.map((entry) => (
              <li key={entry.label} className={styles.stat}>
                <span>{entry.label}</span>
                <strong>{entry.value}</strong>
              </li>
            ))}
          </ul>

          <p className={styles.label}>{character.kitLabel}</p>
          <ul className={styles.items}>
            {character.kitItems.map((item) => (
              <li key={item} className={styles.item}>
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Link href="/campaigns" className={styles.action}>
              Choose campaign
            </Link>
            <Link href="/characters/vale-warden" className={styles.action}>
              Open player companion
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
