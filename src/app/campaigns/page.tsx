import { CampaignBrowser } from "@/components/omnipath/campaigns/CampaignBrowser";
import { listCampaigns } from "@/lib/omnipath/demoData";

export default function CampaignsPage() {
  return <CampaignBrowser campaigns={listCampaigns()} />;
}
