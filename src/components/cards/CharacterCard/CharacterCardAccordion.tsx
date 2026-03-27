import styles from "./CharacterCard.module.css";
import type { CharacterCardAccordionProps } from "./CharacterCard.types";

export function CharacterCardAccordion({
  panelId,
  labelledBy,
  isExpanded,
  children,
}: CharacterCardAccordionProps) {
  return (
    <section
      id={panelId}
      className={[styles.accordion, "character-card__accordion"]
        .filter(Boolean)
        .join(" ")}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={isExpanded ? "false" : "true"}
      data-state={isExpanded ? "expanded" : "collapsed"}
      hidden={!isExpanded}
    >
      {children}
    </section>
  );
}

export default CharacterCardAccordion;
