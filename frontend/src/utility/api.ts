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
  let override_state = "branch"
  // let override_state = "redis"
  // let override_state = "merge-production"
  // let override_state = "scale"
  // let override_state = "complete"

  if (BASE_PATH == "http://localhost:8000/") {

    if (override_state == "branch") {
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

  } else {
    data = await response.json();
  }

  return data as EnvironmentResponseType;
};
