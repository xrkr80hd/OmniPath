import type { ReactNode } from "react";

export type CharacterCardBadge = {
  id: string;
  label: string;
};

export type CharacterCardStat = {
  id: string;
  label: string;
  value: string | number;
};

export type CharacterInventoryItem = {
  id: string;
  name: string;
  quantity: number;
  itemType: string;
};

export type CharacterCardActionLabels = {
  inventory: string;
  fullSheet: string;
};

export type CharacterCardData = {
  id: string;
  portraitLabel: string;
  characterName: string;
  roleLine: string;
  ancestry: string;
  species: string;
  systemBadge: string;
  campaignBadges: CharacterCardBadge[];
  stats: CharacterCardStat[];
  inventory?: CharacterInventoryItem[];
};

export type CharacterCardProps = {
  card: CharacterCardData;
  defaultExpanded?: boolean;
  actionLabels?: Partial<CharacterCardActionLabels>;
  onInventoryClick?: (cardId: string) => void;
  onOpenFullSheetClick?: (cardId: string) => void;
  className?: string;
};

export type CharacterCardHeaderProps = {
  characterName: string;
  roleLine: string;
  systemBadge: string;
  isExpanded: boolean;
  controlsId: string;
  onToggle: () => void;
};

export type CharacterCardMetaProps = {
  ancestry: string;
  species: string;
  campaignBadges: CharacterCardBadge[];
};

export type CharacterCardAccordionProps = {
  panelId: string;
  labelledBy: string;
  isExpanded: boolean;
  children: ReactNode;
};

export type CharacterCardStatsProps = {
  stats: CharacterCardStat[];
};

export type CharacterCardActionsProps = {
  cardId: string;
  inventoryLabel: string;
  fullSheetLabel: string;
  isInventoryOpen: boolean;
  inventoryControlsId: string;
  onInventoryClick?: (cardId: string) => void;
  onOpenFullSheetClick?: (cardId: string) => void;
};
