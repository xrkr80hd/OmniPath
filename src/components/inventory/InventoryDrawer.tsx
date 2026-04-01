"use client";

import { useEffect, useId } from "react";

import type { CharacterInventoryItem } from "../cards/CharacterCard/CharacterCard.types";

import styles from "./InventoryDrawer.module.css";

type InventoryDrawerProps = {
  drawerId: string;
  characterName: string;
  items: CharacterInventoryItem[];
  isOpen: boolean;
  onClose: () => void;
};

export function InventoryDrawer({
  drawerId,
  characterName,
  items,
  isOpen,
  onClose,
}: InventoryDrawerProps) {
  const headingId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <section
      id={drawerId}
      className={styles.root}
      aria-labelledby={headingId}
      aria-hidden={isOpen ? "false" : "true"}
      data-state={isOpen ? "open" : "closed"}
      hidden={!isOpen}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Inventory</p>
            <h3 id={headingId} className={styles.title}>
              {characterName}
            </h3>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={`Close inventory for ${characterName}`}
          >
            Close
          </button>
        </header>

        {items.length ? (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.itemRow}>
                <div className={styles.itemIdentity}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemType}>{item.itemType}</span>
                </div>
                <span className={styles.quantity}>x{item.quantity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No inventory items</p>
            <p className={styles.emptyNote}>
              Placeholder inventory panel ready for typed app-layer data.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default InventoryDrawer;
