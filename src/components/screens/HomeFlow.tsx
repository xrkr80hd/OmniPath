"use client";

import { startTransition, useState } from "react";

import { GameInterfaceScreen } from "./GameInterfaceScreen";
import { Page2aLoadCharacterScreen } from "./Page2aLoadCharacterScreen";
import { Page2bLoadCampaignScreen } from "./Page2bLoadCampaignScreen";
import { Page3CreateCharacterScreen } from "./Page3CreateCharacterScreen";
import { TitleScreen } from "./TitleScreen";
import { defaultScreenFlowCharacterId } from "./screenFlowData";

type ActiveScreen =
  | "title"
  | "page2-decision"
  | "page2a-load-character"
  | "page2b-load-campaign"
  | "page3-create-character";

export function HomeFlow() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("title");
  const [selectedCharacterId, setSelectedCharacterId] = useState(defaultScreenFlowCharacterId);
  const [optionsStatus, setOptionsStatus] = useState<string | null>(null);

  function handleEnterFromTitle() {
    startTransition(() => {
      setOptionsStatus(null);
      setActiveScreen("page2-decision");
    });
  }

  function handleChooseCreateCharacter() {
    startTransition(() => {
      setOptionsStatus(null);
      setActiveScreen("page3-create-character");
    });
  }

  function handleChooseLoadCharacter() {
    startTransition(() => {
      setOptionsStatus(null);
      setActiveScreen("page2a-load-character");
    });
  }

  function handleChooseOptions() {
    startTransition(() => {
      setOptionsStatus("Options panel is staged for a follow-up pass.");
    });
  }

  function handleContinueToCampaignLoad() {
    startTransition(() => {
      setActiveScreen("page2b-load-campaign");
    });
  }

  function handleBackToPage2Decision() {
    startTransition(() => {
      setOptionsStatus(null);
      setActiveScreen("page2-decision");
    });
  }

  function handleBackToTitle() {
    startTransition(() => {
      setOptionsStatus(null);
      setActiveScreen("title");
    });
  }

  if (activeScreen === "page2a-load-character") {
    return (
      <Page2aLoadCharacterScreen
        selectedCharacterId={selectedCharacterId}
        onSelectCharacter={setSelectedCharacterId}
        onContinue={handleContinueToCampaignLoad}
        onBackToPage2={handleBackToPage2Decision}
        onBackToTitle={handleBackToTitle}
      />
    );
  }

  if (activeScreen === "page2b-load-campaign") {
    return (
      <Page2bLoadCampaignScreen
        selectedCharacterId={selectedCharacterId}
        onBackToCharacterSelect={handleChooseLoadCharacter}
        onBackToPage2={handleBackToPage2Decision}
        onBackToTitle={handleBackToTitle}
      />
    );
  }

  if (activeScreen === "page3-create-character") {
    return <Page3CreateCharacterScreen onBackToPage2={handleBackToPage2Decision} onBackToTitle={handleBackToTitle} />;
  }

  if (activeScreen === "page2-decision") {
    return (
      <GameInterfaceScreen
        onChooseCreateCharacter={handleChooseCreateCharacter}
        onChooseLoadCharacter={handleChooseLoadCharacter}
        onChooseOptions={handleChooseOptions}
        onBackToTitle={handleBackToTitle}
        optionsStatus={optionsStatus}
      />
    );
  }

  return <TitleScreen onEnter={handleEnterFromTitle} />;
}
