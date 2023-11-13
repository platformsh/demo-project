import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DesignDebugger from "./DesignDebugger";

describe("DesignDebugger", () => {
  // Test for initial state based on default props
  it("initializes with default props", () => {
    const defaultProps = {
      defaultEnvironment: "Development",
      defaultStorage: "redis",
      defaultErrorState: null,
    };
    render(<DesignDebugger {...defaultProps} />);

    // @ts-ignore
    expect(screen.getByTestId("environmentInput").value).toBe(
      defaultProps.defaultEnvironment,
    );
    // @ts-ignore
    expect(screen.getByTestId("sessionStorageTypeInput").value).toBe(
      defaultProps.defaultStorage,
    );
    expect(screen.getByTestId("fatalErrorInput")).not.toBeChecked();
  });

  // Test for environment change functionality
  it("changes environment selection", () => {
    const mockEnvironmentChange = jest.fn();
    render(<DesignDebugger onEnvironmentChange={mockEnvironmentChange} />);

    const select = screen.getByTestId("environmentInput");
    fireEvent.change(select, { target: { value: "Staging" } });

    // @ts-ignore
    expect(select.value).toBe("Staging");
    expect(mockEnvironmentChange).toHaveBeenCalledWith("Staging");
  });

  // Test for storage change functionality
  it("changes session storage selection", () => {
    const mockStorageChange = jest.fn();
    render(<DesignDebugger onStorageChange={mockStorageChange} />);

    const select = screen.getByTestId("sessionStorageTypeInput");
    fireEvent.change(select, { target: { value: "file" } });

    // @ts-ignore
    expect(select.value).toBe("file");
    expect(mockStorageChange).toHaveBeenCalledWith("file");
  });

  // Test for error emulation checkbox
  it("toggles error emulation", () => {
    const mockErrorChange = jest.fn();
    render(<DesignDebugger onErrorChange={mockErrorChange} />);

    const checkbox = screen.getByTestId("fatalErrorInput");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(mockErrorChange).toHaveBeenCalledWith("Emulated error message");

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(mockErrorChange).toHaveBeenCalledWith(null);
  });
});
