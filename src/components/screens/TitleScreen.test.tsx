/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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
  it("renders branded route-driven entry links", () => {
    const { container } = render(
      <TitleScreen
        primaryHref="/campaigns"
        secondaryHref="/characters/vale-warden"
      />,
    );

    expect(
      screen.getByRole("link", { name: /enter the gate/i }),
    ).toHaveAttribute("href", "/campaigns");
    expect(
      screen.getByRole("link", { name: /open companion/i }),
    ).toHaveAttribute("href", "/characters/vale-warden");
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
});
