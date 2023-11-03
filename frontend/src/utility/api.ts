import { API_BASE_URL } from "../config";
import { BASE_PATH } from "../config";

export type EnvironmentResponseType = {
  "session_storage": "redis" | "file" | string,
  "type": "production" | "staging" | "development" | string
}

export const ENVIRONMENT_PATH = `environment`
export const ENVIRONMENT_API_URI = `${API_BASE_URL}/${ENVIRONMENT_PATH}`;

export const fetchEnvironment = async (): Promise<EnvironmentResponseType> => {
  const response = await fetch(ENVIRONMENT_API_URI);
  if (!response.ok) {
    throw new Error('Failed to fetch environment');
  }

  let data;

  // If updating the design locally, this variable can help you quickly switch between steps.
  //  Note: this value MUST be returned to "default" when pushed to the project repo, or else tests will fail.
  let override_state = "default";
  // let override_state = "branch";
  // let override_state = "redis";
  // let override_state = "merge-production";
  // let override_state = "error_state"
  // let override_state = "complete";
  // let override_state = "scale";

  if (BASE_PATH == "http://localhost:8000/") {

    if (override_state == "default") {
      data = await response.json();
    } else if (override_state == "branch") {
      data = {
        "session_storage": "file",
        "type": "production"
      }
    } else if (override_state == "redis") {
      data = {
        "session_storage": "file",
        "type": "staging"
      }
    } else if (override_state == "merge-production") {
      data = {
        "session_storage": "redis",
        "type": "staging"
      }
    } else if (override_state == "complete") {
      data = {
        "session_storage": "redis",
        "type": "production"
      }
    }

  // Default behavior of the production app.
  } else {
    data = await response.json();
  }

  return data as EnvironmentResponseType;
};
