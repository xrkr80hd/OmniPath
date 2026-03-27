"use client";

import { useId, useState } from "react";

import { InventoryDrawer } from "../../inventory/InventoryDrawer";
import styles from "./CharacterCard.module.css";
import type { CharacterCardProps } from "./CharacterCard.types";
import { CharacterCardAccordion } from "./CharacterCardAccordion";
import { CharacterCardActions } from "./CharacterCardActions";
import { CharacterCardHeader } from "./CharacterCardHeader";
import { CharacterCardMeta } from "./CharacterCardMeta";
import { CharacterCardStats } from "./CharacterCardStats";

const defaultActionLabels = {
  inventory: "Inventory",
  fullSheet: "Open Full Sheet",
};

export function CharacterCard({
  card,
  defaultExpanded = false,
  actionLabels,
  onInventoryClick,
  onOpenFullSheetClick,
  className,
}: CharacterCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const reactId = useId();
  const headingId = `character-card-heading-${card.id}-${reactId}`;
  const panelId = `character-card-panel-${card.id}-${reactId}`;
  const inventoryPanelId = `character-card-inventory-${card.id}-${reactId}`;
  const labels = { ...defaultActionLabels, ...actionLabels };
  const cardClassName = [styles.root, className].filter(Boolean).join(" ");

  function handleAccordionToggle() {
    setIsExpanded((current) => {
      const next = !current;

      if (!next) {
        setIsInventoryOpen(false);
      }

      return next;
    });
  }

  function handleInventoryToggle(cardId: string) {
    setIsInventoryOpen((current) => !current);
    onInventoryClick?.(cardId);
  }

  return (
    <article
      className={cardClassName}
      aria-labelledby={headingId}
      data-card-id={card.id}
      data-expanded={isExpanded ? "true" : "false"}
    >
      <div className="character-card__frame">
        <div className="character-card__portrait" aria-hidden="true">
          <div className="character-card__portrait-mark">
            {card.portraitLabel}
          </div>
        </div>

        <div className="character-card__body">
          <div id={headingId} className="character-card__heading-anchor">
            <CharacterCardHeader
              characterName={card.characterName}
              roleLine={card.roleLine}
              systemBadge={card.systemBadge}
              isExpanded={isExpanded}
              controlsId={panelId}
              onToggle={handleAccordionToggle}
            />
          </div>

          <CharacterCardMeta
            ancestry={card.ancestry}
            species={card.species}
            campaignBadges={card.campaignBadges}
          />

          <CharacterCardAccordion
            panelId={panelId}
            labelledBy={headingId}
            isExpanded={isExpanded}
          >
            <div className="character-card__expanded-panel">
              <CharacterCardStats stats={card.stats} />
              <CharacterCardActions
                cardId={card.id}
                inventoryLabel={labels.inventory}
                fullSheetLabel={labels.fullSheet}
                isInventoryOpen={isInventoryOpen}
                inventoryControlsId={inventoryPanelId}
                onInventoryClick={handleInventoryToggle}
                onOpenFullSheetClick={onOpenFullSheetClick}
              />

              <InventoryDrawer
                drawerId={inventoryPanelId}
                characterName={card.characterName}
                items={card.inventory ?? []}
                isOpen={isInventoryOpen}
                onClose={() => setIsInventoryOpen(false)}
              />
            </div>
          </CharacterCardAccordion>
        </div>
      </div>
    </article>
  );
}

export default CharacterCard;
