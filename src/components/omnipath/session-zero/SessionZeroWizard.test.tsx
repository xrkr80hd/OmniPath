import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";

import { SessionZeroWizard } from "./SessionZeroWizard";

describe("SessionZeroWizard", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders a guided wizard with breadcrumbs and an exit path", () => {
    render(<SessionZeroWizard />);

    expect(
      screen.getByRole("heading", { name: /create a new character/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/step 1 of 6/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /exit to main screen/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /continue character/i })).toHaveAttribute(
      "href",
      "/characters/load",
    );
  });

  it("anchors the realm when character creation starts from a realm gateway", async () => {
    const user = userEvent.setup();

    render(<SessionZeroWizard initialRealmId="dnd" />);

    await user.type(screen.getByLabelText(/character name/i), "Ari Vale");
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText(/^DND$/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/^realm$/i)).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: /human/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: /ork runner/i }),
    ).not.toBeInTheDocument();
  });

  it("autosaves draft progress and unlocks the next step after entering basics", async () => {
    const user = userEvent.setup();

    render(<SessionZeroWizard />);

    await user.type(screen.getByLabelText(/character name/i), "Ari Vale");

    expect(screen.getByText(/your progress is being saved/i)).toBeInTheDocument();
    expect(
      JSON.parse(window.localStorage.getItem("omnipath:session-zero:draft") ?? "{}"),
    ).toMatchObject({
      name: "Ari Vale",
    });

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText(/step 2 of 6/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /choose identity/i })).toBeInTheDocument();
  });

  it("keeps scrolling inside the wizard body when advancing to the next step", async () => {
    const user = userEvent.setup();
    const scrollBySpy = vi.fn();

    Object.defineProperty(window, "scrollBy", {
      configurable: true,
      value: scrollBySpy,
    });

    render(<SessionZeroWizard />);
    const stepBody = screen.getByTestId("session-zero-step-body");

    Object.defineProperty(stepBody, "scrollTop", {
      configurable: true,
      writable: true,
      value: 180,
    });

    await user.type(screen.getByLabelText(/character name/i), "Ari Vale");
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(stepBody.scrollTop).toBe(0);
    expect(scrollBySpy).not.toHaveBeenCalled();
    expect(screen.getByTestId("session-zero-footer")).toBeInTheDocument();
  });

  it("filters race choices by realm inside the compact identity form", async () => {
    const user = userEvent.setup();

    render(<SessionZeroWizard />);

    await user.type(screen.getByLabelText(/character name/i), "Ari Vale");
    await user.click(screen.getByRole("button", { name: /next/i }));

    const realmSelect = screen.getByLabelText(/realm/i);
    const raceSelect = screen.getByLabelText(/race/i);

    expect(raceSelect).toBeDisabled();

    await user.selectOptions(realmSelect, "shadowrun");

    expect(raceSelect).not.toBeDisabled();
    expect(screen.getByRole("option", { name: /elf decker/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: /hill dwarf/i }),
    ).not.toBeInTheDocument();
  });

  it("uses the more mystical identity preview copy instead of placeholder pills", async () => {
    const user = userEvent.setup();

    render(<SessionZeroWizard />);

    await user.type(screen.getByLabelText(/character name/i), "Ari Vale");
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(
      screen.getByRole("heading", { name: /a form stirs beyond the veil/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the portal has not yet answered your call/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/your choice will appear here/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/background pending/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/world not chosen/i)).not.toBeInTheDocument();
  });

  it("builds a preview handoff after the review step", async () => {
    const user = userEvent.setup();

    render(<SessionZeroWizard initialCampaignId="glass-harbor" />);

    await user.type(screen.getByLabelText(/character name/i), "Ari Vale");
    await user.click(screen.getByRole("button", { name: /next/i }));

    await user.selectOptions(screen.getByLabelText(/realm/i), "dnd");
    await user.selectOptions(screen.getByLabelText(/race/i), "hill-dwarf");
    await user.selectOptions(screen.getByLabelText(/background preset/i), "wayfarer");
    await user.click(screen.getByRole("button", { name: /next/i }));

    await user.click(screen.getByRole("checkbox", { name: /steadfast/i }));
    await user.click(screen.getByRole("checkbox", { name: /curious/i }));
    await user.click(screen.getByRole("checkbox", { name: /stubborn/i }));
    await user.click(screen.getByRole("checkbox", { name: /reckless/i }));
    await user.type(screen.getByLabelText(/inspiration trait/i), "Harbor oath");
    await user.type(
      screen.getByLabelText(/what gives them inspiration/i),
      "Protecting the last lantern on the breakwater",
    );
    await user.click(screen.getByRole("button", { name: /next/i }));

    await user.click(screen.getByRole("radio", { name: /heroic array/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));

    await user.click(screen.getByRole("radio", { name: /wayfarer pack/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByRole("heading", { name: /review your character/i })).toBeInTheDocument();
    expect(screen.getAllByText(/ari vale/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/glass harbor/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /preview character sheet/i })).toHaveAttribute(
      "href",
      "/characters/preview?draft=omnipath%3Asession-zero%3Adraft&campaign=glass-harbor",
    );
  });

  it("hydrates without a mismatch when a saved draft exists", async () => {
    const originalWindow = globalThis.window;
    const originalDocument = globalThis.document;
    const originalLocalStorage = globalThis.localStorage;

    window.localStorage.setItem(
      "omnipath:session-zero:draft",
      JSON.stringify({
        name: "Ari Vale",
      }),
    );

    // Simulate the server render with no browser globals so the server markup uses the empty draft.
    Reflect.deleteProperty(globalThis, "window");
    Reflect.deleteProperty(globalThis, "document");
    Reflect.deleteProperty(globalThis, "localStorage");

    const serverMarkup = renderToString(<SessionZeroWizard />);

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: originalWindow,
    });
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: originalDocument,
    });
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: originalLocalStorage,
    });

    const container = document.createElement("div");
    container.innerHTML = serverMarkup;
    document.body.appendChild(container);

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => { });

    hydrateRoot(container, <SessionZeroWizard />);

    await screen.findByDisplayValue("Ari Vale");

    const hydrationWarnings = errorSpy.mock.calls
      .flat()
      .filter(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes("hydrated but some attributes"),
      );

    expect(hydrationWarnings).toEqual([]);

    errorSpy.mockRestore();
    container.remove();
  });
});
