import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

import { ChooseRealmGateway } from "./ChooseRealmGateway";

describe("ChooseRealmGateway", () => {
  it("stages character creation through a realm gateway first", async () => {
    const user = userEvent.setup();

    render(<ChooseRealmGateway />);

    expect(
      screen.getByRole("heading", { name: /the threshold is listening/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return to landing screen/i })).toHaveAttribute(
      "href",
      "/",
    );

    const select = screen.getByRole("combobox", { name: /choose realm/i });
    const submit = screen.getByRole("button", { name: /step through the breach/i });

    expect(submit).toBeDisabled();

    await user.selectOptions(select, "shadowrun");

    expect(screen.getByText(/neon rain hisses over chrome/i)).toBeInTheDocument();
    expect(submit).toBeEnabled();
  });
});
