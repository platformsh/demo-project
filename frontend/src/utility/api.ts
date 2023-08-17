import { API_BASE_URL } from '../config';

export const fetchEnvironment = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/environment`);
    if (!response.ok) {
      throw new Error('Failed to fetch environment');
    }
    const data = await response.json();
    return data.environment_type as string;
  } catch (error) {
    console.error('An error occurred while fetching the environment:', error);
    return null;
  }
};
