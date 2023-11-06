import {
  fetchEnvironment,
  EnvironmentResponseType,
  ENVIRONMENT_API_URI,
} from "./api"; // Replace 'your-file-path' with the actual path

describe("fetchEnvironment", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches environment successfully", async () => {
    const mockData: EnvironmentResponseType = {
      session_storage: "some-file-storage",
      type: "some-environment",
    };

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response),
    );

    const result = await fetchEnvironment();

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(ENVIRONMENT_API_URI);
    expect(result.session_storage).toBe(mockData.session_storage);
    expect(result.type).toBe(mockData.type);
  });

  it("fetches environment and fails with an error", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    );

    await expect(fetchEnvironment()).rejects.toThrow(
      "Failed to fetch environment",
    );
  });
});
