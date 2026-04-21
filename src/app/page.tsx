import { TitleScreen } from "@/components/screens/TitleScreen";

export default function Home() {
  return (
    <TitleScreen
      createHref="/characters/new"
      loadHref="/characters/load"
      settingsHref="/settings"
    />
  );
}
