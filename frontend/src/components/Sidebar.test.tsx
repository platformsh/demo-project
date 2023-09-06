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
      appInstances: 1,
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
      appInstances: 1,
    };

    render(<Sidebar {...props} />);

    // Check if the staging icon is rendered
    expect(screen.getByText("staging-svg")).toBeInTheDocument();
    expect(screen.getByText("Staging")).toBeInTheDocument();
  });

  test("environment status section renders file as session service when set", () => {
    const props = {
      environment: "Production",
      sessionStorageType: "file",
      appInstances: 1,
    };

    render(<Sidebar {...props} />);

    const storageSection = screen.getByTestId("status-session-storage");
    expect(
      within(storageSection).getByText("status-incomplete-svg"),
    ).toBeInTheDocument();
    expect(
      within(storageSection).getByText("User session service: file"),
    ).toBeInTheDocument();
  });

  test("environment status section renders redis as session service when set", () => {
    const props = {
      environment: "Production",
      sessionStorageType: "redis",
      appInstances: 1,
    };

    render(<Sidebar {...props} />);

    const storageSection = screen.getByTestId("status-session-storage");
    expect(
      within(storageSection).getByText("status-complete-svg"),
    ).toBeInTheDocument();
    expect(
      within(storageSection).getByText("User session service: redis"),
    ).toBeInTheDocument();
  });

  const environments = ["Production", "Staging", "Other", null];
  const sessionStorageTypes = ["redis", "file", "Other", null];
  const appInstancesArray = [1, 5, null];

  environments.forEach((environment) => {
    sessionStorageTypes.forEach((sessionStorageType) => {
      appInstancesArray.forEach((appInstances) => {
        const props = { environment, sessionStorageType, appInstances };
        test(`environment status section renders green on Scaling: Ready for environment: ${environment}, sessionStorageType: ${sessionStorageType}, appInstances: ${appInstances}`, () => {
          render(<Sidebar {...props} />);

          const storageSection = screen.getByTestId("status-scaling-ready");
          expect(
            within(storageSection).getByText("status-complete-svg"),
          ).toBeInTheDocument();
          expect(
            within(storageSection).getByText("Scaling: Ready"),
          ).toBeInTheDocument();
        });
      });
    });
  });

  test("environment status section renders green when app scaled", () => {
    const props = {
      environment: "Production",
      sessionStorageType: "redis",
      appInstances: 1,
    };

    render(<Sidebar {...props} />);

    const storageSection = screen.getByTestId("status-app-scaled");
    expect(
      within(storageSection).getByText("status-complete-svg"),
    ).toBeInTheDocument();
    expect(
      within(storageSection).getByText("App scaled horizontally"),
    ).toBeInTheDocument();
  });
});
