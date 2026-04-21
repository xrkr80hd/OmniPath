/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TitleScreen } from "./TitleScreen";

vi.mock("next/font/google", () => ({
  Cinzel_Decorative: () => ({ variable: "font-title" }),
  Oxanium: () => ({ variable: "font-interface" }),
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    className,
    sizes,
  }: Pick<React.ComponentProps<"img">, "alt" | "src" | "className" | "sizes">) => (
    <img alt={alt} src={src} className={className} sizes={sizes} />
  ),
}));

describe("TitleScreen", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders branded route-driven entry links", () => {
    const { container } = render(
      <TitleScreen
        createHref="/characters/new"
        loadHref="/characters/load"
        settingsHref="/settings"
      />,
    );

    expect(
      screen.getByRole("link", { name: /create character/i }),
    ).toHaveAttribute("href", "/characters/new");
    expect(
      screen.getByRole("link", { name: /load character/i }),
    ).toHaveAttribute("href", "/characters/load");
    expect(
      screen.getByRole("link", { name: /settings/i }),
    ).toHaveAttribute("href", "/settings");
    const titleSequenceImages = Array.from(
      container.querySelectorAll('img[src^="/omnipath/screens/title-sequence/"]'),
    );
    expect(titleSequenceImages).toHaveLength(2);
    expect(titleSequenceImages[0]).toHaveAttribute(
      "src",
      "/omnipath/screens/title-sequence/OP_16bit1.jpg",
    );
    expect(screen.queryByAltText(/omnipath logo/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/page 2 \/\/ what do you want to do\?/i),
    ).not.toBeInTheDocument();
  });

  it("keeps the same title art while the visitor remains on the page", () => {
    vi.useFakeTimers();

    const { container } = render(
      <TitleScreen
        createHref="/characters/new"
        loadHref="/characters/load"
        settingsHref="/settings"
      />,
    );

    const getSequenceImages = () =>
      Array.from(
        container.querySelectorAll('img[src^="/omnipath/screens/title-sequence/"]'),
      );

    expect(getSequenceImages()[0]).toHaveAttribute(
      "src",
      "/omnipath/screens/title-sequence/OP_16bit1.jpg",
    );

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(getSequenceImages()[0]).toHaveAttribute(
      "src",
      "/omnipath/screens/title-sequence/OP_16bit1.jpg",
    );

    vi.useRealTimers();
  });

  it("advances to a different title art on the next visit", () => {
    const firstVisit = render(
      <TitleScreen
        createHref="/characters/new"
        loadHref="/characters/load"
        settingsHref="/settings"
      />,
    );

    const firstVisitImages = Array.from(
      firstVisit.container.querySelectorAll('img[src^="/omnipath/screens/title-sequence/"]'),
    );

    expect(firstVisitImages[0]).toHaveAttribute(
      "src",
      "/omnipath/screens/title-sequence/OP_16bit1.jpg",
    );

    firstVisit.unmount();

    const secondVisit = render(
      <TitleScreen
        createHref="/characters/new"
        loadHref="/characters/load"
        settingsHref="/settings"
      />,
    );

    const secondVisitImages = Array.from(
      secondVisit.container.querySelectorAll('img[src^="/omnipath/screens/title-sequence/"]'),
    );

    expect(secondVisitImages[0]).toHaveAttribute(
      "src",
      "/omnipath/screens/title-sequence/OP_8bit1.jpg",
    );
  });
});
