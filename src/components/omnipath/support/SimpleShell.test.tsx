import { render, screen } from "@testing-library/react";
import Link from "next/link";
import { describe, expect, it } from "vitest";

import { SimpleShell } from "./SimpleShell";

describe("SimpleShell", () => {
  it("renders a compact on-brand shell instead of placeholder chrome", () => {
    render(
      <SimpleShell
        eyebrow="Lobby"
        title="Campaign lobby: glass-harbor"
        summary="Use this room for attendance, ready-state, and staging before the shared command center goes live."
      >
        <Link href="/campaigns/glass-harbor">Enter command center</Link>
      </SimpleShell>,
    );

    expect(
      screen.getByRole("heading", { name: /campaign lobby: glass-harbor/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/ready-state/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /enter command center/i })).toHaveAttribute(
      "href",
      "/campaigns/glass-harbor",
    );
    expect(screen.queryByText(/route placeholder/i)).not.toBeInTheDocument();
  });
});
