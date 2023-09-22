import { API_BASE_URL } from "../config";

type EnvironmentResponseType = {
  "session_storage": "redis" | "file" | string,
  "type": "production" | "staging" | "development" | string
}

export const ENVIRONMENT_PATH = `environment`
export const ENVIRONMENT_API_URI = `${API_BASE_URL}/${ENVIRONMENT_PATH}`;

export const fetchEnvironment = async (): Promise<EnvironmentResponseType> => {
  const response = await fetch(ENVIRONMENT_API_URI);
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to fetch environment');
  }
  const data = await response.json();

  return data as EnvironmentResponseType;
};
