import { API_BASE_URL } from '../config';

type EnvironmentResponseType = {
  "instance_count": null | number,
  "session_storage": "redis" | "file" | string,
  "type": "production" | "staging" | "development" | string
}

export const fetchEnvironment = async (): Promise<EnvironmentResponseType> => {
  const response = await fetch(`${API_BASE_URL}/environment`);
  if (!response.ok) {
    throw new Error('Failed to fetch environment');
  }
  const data = await response.json();
  return data as EnvironmentResponseType;
};
