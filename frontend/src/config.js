/** The Upsun deploy  hook in your ./upsun/config.yaml creates a var.js that sets this value */
const BASE_PATH = window.APP_BASE_URL || 'http://localhost:8000';

export const API_BASE_PATH = `/api/v1`
export const API_BASE_URL = `${BASE_PATH}${API_BASE_PATH}`;
