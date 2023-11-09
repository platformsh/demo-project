import { API_BASE_URL } from "../config";
import { BASE_PATH } from "../config";

export type EnvironmentResponseType = {
  session_storage: "redis" | "file" | string;
  type: "production" | "staging" | "development" | string;
};

export const ENVIRONMENT_PATH = `environment`;
export const ENVIRONMENT_API_URI = `${API_BASE_URL}/${ENVIRONMENT_PATH}`;

export const fetchEnvironment = async (): Promise<EnvironmentResponseType> => {
  const response = await fetch(ENVIRONMENT_API_URI);
  if (!response.ok) {
    throw new Error("Failed to fetch environment");
  }

  let data;

  let override_state = "default";

  if (BASE_PATH.toLocaleLowerCase() === "http://localhost:8000/") {
    if (override_state === "default") {
      data = await response.json();
    } else if (override_state.toLocaleLowerCase() === "branch") {
      data = {
        session_storage: "file",
        type: "production",
      };
    } else if (override_state.toLocaleLowerCase() === "redis") {
      data = {
        session_storage: "file",
        type: "staging",
      };
    } else if (override_state.toLocaleLowerCase() === "merge-production") {
      data = {
        session_storage: "redis",
        type: "staging",
      };
    } else if (override_state.toLocaleLowerCase() === "complete") {
      data = {
        session_storage: "redis",
        type: "production",
      };
    }

    // Default behavior of the production app.
  } else {
    data = await response.json();
  }

  return data as EnvironmentResponseType;
};
