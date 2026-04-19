import type { CampaignFixture } from "@/lib/omnipath/demoData";

export const themeLabels = {
  neutral: "neutral shell",
  fantasy: "fantasy skin",
  scifi: "sci-fi skin",
  lovecraft: "lovecraft skin",
  retro: "retro skin",
} as const satisfies Record<CampaignFixture["theme"], string>;

export function getThemeLabel(theme: CampaignFixture["theme"]) {
  return themeLabels[theme];
}
