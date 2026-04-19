import { TitleScreen } from "@/components/screens/TitleScreen";

export default function Home() {
  return (
    <TitleScreen
      primaryHref="/campaigns"
      secondaryHref="/characters/vale-warden"
    />
  );
}
