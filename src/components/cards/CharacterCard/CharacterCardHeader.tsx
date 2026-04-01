import type { CharacterCardHeaderProps } from "./CharacterCard.types";

export function CharacterCardHeader({
  characterName,
  roleLine,
  systemBadge,
  isExpanded,
  controlsId,
  onToggle,
}: CharacterCardHeaderProps) {
  return (
    <header className="character-card__header">
      <div className="character-card__title-block">
        <p className="character-card__eyebrow">Character Record</p>
        <h2 className="character-card__name">{characterName}</h2>
        <p className="character-card__role">{roleLine}</p>
      </div>

      <div className="character-card__header-tools">
        <span className="character-card__badge character-card__badge--system">
          {systemBadge}
        </span>

        <button
          type="button"
          className="character-card__toggle"
          aria-expanded={isExpanded ? "true" : "false"}
          aria-controls={controlsId}
          onClick={onToggle}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>
    </header>
  );
}

export default CharacterCardHeader;
