import React from "react";
import { render, screen, within } from "@testing-library/react";
import Sidebar from "./Sidebar";

jest.mock("../assets/utility/production.svg", () => {
  return {
    __esModule: true,
    ReactComponent: () => "production-svg",
  };
});

jest.mock("../assets/utility/staging.svg", () => {
  return {
    __esModule: true,
    ReactComponent: () => "staging-svg",
  };
});

jest.mock("../assets/utility/status_complete.svg", () => {
  return {
    __esModule: true,
    ReactComponent: () => "status-complete-svg",
  };
});

jest.mock("../assets/utility/status_incomplete.svg", () => {
  return {
    __esModule: true,
    ReactComponent: () => "status-incomplete-svg",
  };
});

describe("<Sidebar />", () => {
  test("title section renders production icon when environment is Production", () => {
    const props = {
      environment: "Production",
      sessionStorageType: "Redis",
    };

    render(<Sidebar {...props} />);

    // Check if the production icon is rendered
    expect(screen.getByText("production-svg")).toBeInTheDocument();
    expect(screen.getByText("Production")).toBeInTheDocument();
  });

  test("title section renders staging icon when environment is not Production", () => {
    const props = {
      environment: "Staging",
      sessionStorageType: "Redis",
    };

    render(<Sidebar {...props} />);

    // Check if the staging icon is rendered
    expect(screen.getByText("staging-svg")).toBeInTheDocument();
    expect(screen.getByText("Staging")).toBeInTheDocument();
  });
});
