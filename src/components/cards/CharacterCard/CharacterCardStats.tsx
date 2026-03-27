import type { CharacterCardStatsProps } from "./CharacterCard.types";

export function CharacterCardStats({ stats }: CharacterCardStatsProps) {
  return (
    <section className="character-card__stats" aria-label="Character stats">
      <header className="character-card__stats-header">
        <h3 className="character-card__stats-title">Field Stats</h3>
        <p className="character-card__stats-note">
          App-layer skeleton mapped from the approved visual template.
        </p>
      </header>

      <dl className="character-card__stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="character-card__stat-cell">
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default CharacterCardStats;
