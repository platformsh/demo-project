import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchEnvironment } from "./utility/api";

jest.mock("./utility/api", () => ({
  fetchEnvironment: jest.fn(),
}));

const mockedFetchEnvironment = fetchEnvironment as jest.Mock;

describe("<App />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("uses production intro for production when no changes have been made", async () => {
    const mockData = {
      type: "production",
      session_storage: "file",
    };

    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    render(<App />);
    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      expect(title).toBe("Production");
    });
    await waitFor(() => {
      const intro = screen.queryByTestId("production-intro");
      expect(intro).toBeInTheDocument();
    });
  });

  it("hides production intro for production after changes have been made", async () => {
    const mockData = {
      type: "production",
      session_storage: "redis",
    };

    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    render(<App />);

    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      expect(title).toBe("Production");
    });
    await waitFor(() => {
      const intro = screen.queryByTestId("production-intro");
      expect(intro).not.toBeInTheDocument();
    });
  });

  it("uses staging copy for non-production when no other changes have been made", async () => {
    const mockData = {
      type: "other",
      session_storage: "file",
    };

    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    render(<App />);
    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      expect(title).toBe("Other");
    });
    await waitFor(() => {
      const intro = screen.queryByTestId("other-intro");
      expect(intro).toBeInTheDocument();
    });
  });

  it("hides staging copy for non-production when changes have been made", async () => {
    const mockData = {
      type: "other",
      session_storage: "redis",
    };

    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    render(<App />);

    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      expect(title).toBe("Other");
    });

    await waitFor(() => {
      const intro = screen.queryByTestId("other-intro");
      expect(intro).not.toBeInTheDocument();
    });
  });

  it("highlights create preview environment step when in production and session_storage is file", async () => {
    const mockData = {
      type: "production",
      session_storage: "file",
    };

    mockedFetchEnvironment.mockResolvedValueOnce(mockData);

    render(<App />);

    expect(await screen.findByTestId("step-deploy")).toHaveClass("is-disabled");

    await waitFor(() =>
      expect(screen.getByTestId("step-branch")).not.toHaveClass("is-disabled"),
    );

    expect(await screen.findByTestId("step-redis")).toHaveClass("is-disabled");

    expect(await screen.findByTestId("step-merge-production")).toHaveClass(
      "is-disabled",
    );

    expect(await screen.findByTestId("step-complete")).toHaveClass(
      "is-disabled",
    );
  });

  it("highlights redis step on file storage in staging", async () => {
    const mockData = {
      type: "staging",
      session_storage: "file",
    };

    mockedFetchEnvironment.mockResolvedValueOnce(mockData);

    render(<App />);

    expect(await screen.findByTestId("step-deploy")).toHaveClass("is-disabled");

    await waitFor(() =>
      expect(screen.getByTestId("step-branch")).toHaveClass("is-disabled"),
    );

    expect(await screen.findByTestId("step-redis")).not.toHaveClass(
      "is-disabled",
    );

    expect(await screen.findByTestId("step-merge-production")).toHaveClass(
      "is-disabled",
    );

    expect(await screen.findByTestId("step-complete")).toHaveClass(
      "is-disabled",
    );
  });

  it("highlights merge step to on redis storage set in staging", async () => {
    const mockData = {
      type: "staging",
      session_storage: "redis",
    };

    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    render(<App />);

    expect(await screen.findByTestId("step-deploy")).toHaveClass("is-disabled");

    await waitFor(() =>
      expect(screen.getByTestId("step-branch")).toHaveClass("is-disabled"),
    );

    await waitFor(() =>
      expect(screen.getByTestId("step-redis")).toHaveClass("is-disabled"),
    );

    expect(await screen.findByTestId("step-merge-production")).not.toHaveClass(
      "is-disabled",
    );

    expect(await screen.findByTestId("step-complete")).toHaveClass(
      "is-disabled",
    );
  });

  it("highlights all steps completed in production when redis storage set", async () => {
    const mockData = {
      type: "production",
      session_storage: "redis",
    };

    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    render(<App />);

    expect(await screen.findByTestId("step-deploy")).toHaveClass("is-disabled");

    await waitFor(() =>
      expect(screen.getByTestId("step-branch")).toHaveClass("is-disabled"),
    );

    await waitFor(() =>
      expect(screen.getByTestId("step-redis")).toHaveClass("is-disabled"),
    );

    expect(await screen.findByTestId("step-merge-production")).toHaveClass(
      "is-disabled",
    );

    expect(await screen.findByTestId("step-complete")).not.toHaveClass(
      "is-disabled",
    );
  });
});
