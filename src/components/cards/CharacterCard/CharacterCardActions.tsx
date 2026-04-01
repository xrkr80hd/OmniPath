import type { CharacterCardActionsProps } from "./CharacterCard.types";

export function CharacterCardActions({
  cardId,
  inventoryLabel,
  fullSheetLabel,
  isInventoryOpen,
  inventoryControlsId,
  onInventoryClick,
  onOpenFullSheetClick,
}: CharacterCardActionsProps) {
  return (
    <div className="character-card__actions">
      <button
        type="button"
        className="character-card__action character-card__action--secondary"
        aria-expanded={isInventoryOpen ? "true" : "false"}
        aria-controls={inventoryControlsId}
        onClick={() => onInventoryClick?.(cardId)}
      >
        {inventoryLabel}
      </button>

      <button
        type="button"
        className="character-card__action character-card__action--primary"
        onClick={() => onOpenFullSheetClick?.(cardId)}
      >
        {fullSheetLabel}
      </button>
    </div>
  );
}

export default CharacterCardActions;
