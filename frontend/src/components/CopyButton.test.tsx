import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import CopyButton from "./CopyButton";

describe("<CopyButton />", () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
      writable: true,
      configurable: true,
    });

    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing here
      }
      unobserve() {
        // do nothing here
      }
      disconnect() {
        // do nothing here
      }
    };
  });

  const copyText = "Some text to copy";

  it("renders button with children", () => {
    render(<CopyButton copyText={copyText}>Click Me</CopyButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("copies text to clipboard and shows tooltip on click", async () => {
    render(<CopyButton copyText={copyText}>Click Me</CopyButton>);

    // Spy on setTimeout to control it
    jest.useFakeTimers();

    // Trigger button click
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByText("Click Me"));
      await Promise.resolve(); // Wait for promise to resolve
    });

    // Expect writeText to have been called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copyText);

    // Tooltip should be open
    expect(
      within(screen.getByRole("tooltip")).getByText("Copied!"),
    ).toBeInTheDocument();

    // Fast-forward time to test tooltip disappearance
    act(() => {
      jest.runAllTimers();
    });

    // Tooltip should be closed
    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();

    // Restore timers
    jest.useRealTimers();
  });
});
