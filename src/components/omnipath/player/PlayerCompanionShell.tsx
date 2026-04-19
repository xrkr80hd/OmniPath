import type { CharacterFixture } from "@/lib/omnipath/demoData";

import styles from "./PlayerCompanionShell.module.css";

export function PlayerCompanionShell({
  character,
}: {
  character: CharacterFixture;
}) {
  return (
    <main className={styles.shell}>
      <header className={styles.summary}>
        <p className="omni-kicker">Companion</p>
        <h1 className={styles.name}>{character.name}</h1>
        <p className={styles.status}>{character.status}</p>
      </header>

      <section className={styles.dashboard}>
        <article className={styles.panel}>
          <p className={styles.panelLabel}>Inventory</p>
          <ul className={styles.list}>
            {character.inventory.map((item) => (
              <li key={item.id} className={styles.item}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemDetail}>{item.detail}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className={styles.panel}>
          <p className={styles.panelLabel}>Event feed</p>
          <ul className={styles.feed}>
            {character.feed.map((entry) => (
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
          <p className={styles.lockReason}>{character.actionState.lockReason}</p>
        </div>

        <button type="button" disabled={!character.actionState.canAct} className={styles.endTurn}>
          End Turn
        </button>
      </footer>
    </main>
  );
}
