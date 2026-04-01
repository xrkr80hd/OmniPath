import type { CharacterCardMetaProps } from "./CharacterCard.types";

export function CharacterCardMeta({
  ancestry,
  species,
  campaignBadges,
}: CharacterCardMetaProps) {
  return (
    <section className="character-card__meta" aria-label="Character summary">
      <div className="character-card__identity-row">
        <div className="character-card__identity-item">
          <span className="character-card__identity-label">Ancestry</span>
          <span className="character-card__identity-value">{ancestry}</span>
        </div>

        <div className="character-card__identity-item">
          <span className="character-card__identity-label">Species</span>
          <span className="character-card__identity-value">{species}</span>
        </div>
      </div>

      <div className="character-card__badges" aria-label="Campaign badges">
        {campaignBadges.map((badge) => (
          <span key={badge.id} className="character-card__badge">
            {badge.label}
          </span>
        ))}
      </div>
    </section>
  );
}

export default CharacterCardMeta;
