/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchEnvironment } from "./utility/api";
import { act } from "react-dom/test-utils";

// Mock the module and function
jest.mock("./utility/api", () => ({
  fetchEnvironment: jest.fn(),
}));

// Cast the function to its mocked version
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

    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    render(<App />);
    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      const intro = screen.queryByTestId("production-intro");
      expect(title).toBe("Production");
      expect(intro).toBeInTheDocument();
    });
  });

  it("hides production intro for production after changes have been made", async () => {
    const mockData = {
      type: "production",
      session_storage: "redis",
    };

    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      const intro = screen.queryByTestId("production-intro");
      expect(title).toBe("Production");
      expect(intro).not.toBeInTheDocument();
    });
  });

  it("uses staging copy for non-production when no other changes have been made", async () => {
    const mockData = {
      type: "other",
      session_storage: "file",
    };

    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    render(<App />);
    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      const intro = screen.queryByTestId("other-intro");
      expect(title).toBe("Other");
      expect(intro).toBeInTheDocument();
    });
  });

  it("hides staging copy for non-production when changes have been made", async () => {
    const mockData = {
      type: "other",
      session_storage: "redis",
    };

    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      const intro = screen.queryByTestId("other-intro");
      expect(title).toBe("Other");
      expect(intro).not.toBeInTheDocument();
    });
  });

  it("highlights create preview environment step when in production and session_storage is file", async () => {
    const mockData = {
      type: "production",
      session_storage: "file",
    };

    // Mock the fetch call
    mockedFetchEnvironment.mockResolvedValueOnce(mockData);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<App />);
    });

    expect(
      screen.getByText("1. Deploy to Upsun").parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("2. Create your first preview environment").parentElement
        ?.parentElement,
    ).not.toHaveClass("is-disabled");

    expect(
      screen.getByText("3. Add Redis to staging").parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("4. Merge changes into production & scale up")
        .parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("5. You did it!").parentElement?.parentElement,
    ).toHaveClass("is-disabled");
  });

  it("highlights redis step on file storage in staging", async () => {
    const mockData = {
      type: "staging",
      session_storage: "file",
    };

    // Mock the fetch call
    mockedFetchEnvironment.mockResolvedValueOnce(mockData);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<App />);
    });

    expect(
      screen.getByText("1. Deploy to Upsun").parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("2. Create your first preview environment").parentElement
        ?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("3. Add Redis to staging").parentElement?.parentElement,
    ).not.toHaveClass("is-disabled");

    expect(
      screen.getByText("4. Merge changes into production & scale up")
        .parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("5. You did it!").parentElement?.parentElement,
    ).toHaveClass("is-disabled");
  });

  it("highlights merge step to on redis storage set in staging", async () => {
    const mockData = {
      type: "staging",
      session_storage: "redis",
    };

    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<App />);
    });

    expect(
      screen.getByText("1. Deploy to Upsun").parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("2. Create your first preview environment").parentElement
        ?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("3. Add Redis to staging").parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("4. Merge changes into production & scale up")
        .parentElement?.parentElement,
    ).not.toHaveClass("is-disabled");

    expect(
      screen.getByText("5. You did it!").parentElement?.parentElement,
    ).toHaveClass("is-disabled");
  });

  it("highlights all steps completed in production when redis storage set", async () => {
    const mockData = {
      type: "production",
      session_storage: "redis",
    };

    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() =>
      Promise.resolve(mockData),
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<App />);
    });

    expect(
      screen.getByText("1. Deploy to Upsun").parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("2. Create your first preview environment").parentElement
        ?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("3. Add Redis to staging").parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("4. Merge changes into production & scale up")
        .parentElement?.parentElement,
    ).toHaveClass("is-disabled");

    expect(
      screen.getByText("5. You did it!").parentElement?.parentElement,
    ).not.toHaveClass("is-disabled");
  });
});
