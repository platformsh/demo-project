import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DesignDebug from "./DesignDebug";

jest.mock("../theme/debug/DesignDebugger", () => {
  return ({
    defaultEnvironment,
    defaultStorage,
    defaultErrorState,
    onEnvironmentChange,
    onStorageChange,
    onErrorChange,
  }: any) => (
    <div data-testid="design-debugger">
      <span data-testid="env">{defaultEnvironment}</span>
      <span data-testid="storage">{defaultStorage}</span>
      <span data-testid="error">{defaultErrorState}</span>
      <button onClick={() => onEnvironmentChange("production")}>
        Change Env
      </button>
      <button onClick={() => onStorageChange("local")}>Change Storage</button>
      <button onClick={() => onErrorChange("fatal error")}>Change Error</button>
    </div>
  );
});

describe("DesignDebug", () => {
  it("renders nothing when disabled", () => {
    const { container } = render(
      <DesignDebug
        enabled={false}
        environment={null}
        storage={null}
        errorState={null}
        onEnvironmentChange={jest.fn()}
        onStorageChange={jest.fn()}
        onErrorChange={jest.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders DesignDebugger when enabled", () => {
    render(
      <DesignDebug
        enabled={true}
        environment="staging"
        storage="session"
        errorState="some error"
        onEnvironmentChange={jest.fn()}
        onStorageChange={jest.fn()}
        onErrorChange={jest.fn()}
      />,
    );

    expect(screen.getByTestId("design-debugger")).toBeInTheDocument();
    expect(screen.getByTestId("env")).toHaveTextContent("staging");
    expect(screen.getByTestId("storage")).toHaveTextContent("session");
    expect(screen.getByTestId("error")).toHaveTextContent("some error");
  });

  it("calls callbacks when triggered", () => {
    const mockEnv = jest.fn();
    const mockStorage = jest.fn();
    const mockError = jest.fn();

    render(
      <DesignDebug
        enabled={true}
        environment={null}
        storage={null}
        errorState={null}
        onEnvironmentChange={mockEnv}
        onStorageChange={mockStorage}
        onErrorChange={mockError}
      />,
    );

    fireEvent.click(screen.getByText("Change Env"));
    fireEvent.click(screen.getByText("Change Storage"));
    fireEvent.click(screen.getByText("Change Error"));

    expect(mockEnv).toHaveBeenCalledWith("production");
    expect(mockStorage).toHaveBeenCalledWith("local");
    expect(mockError).toHaveBeenCalledWith("fatal error");
  });
});
