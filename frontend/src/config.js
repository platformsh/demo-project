/** The .environment file exports the relevant environment variable for you. */
export const BASE_PATH =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/";
export const API_BASE_PATH = `api/v1`;
export const API_BASE_URL = `${BASE_PATH}${API_BASE_PATH}`;
export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID || "XXX_ID_XXX";
