const API_URL = import.meta.env.VITE_API_URL as string || '';
const API_VERSION = import.meta.env.VITE_API_VERSION as string || '';

export const BASE_API_URL = `${API_URL}/api/${API_VERSION}`;
// export const BASE_API_URL = 'http://localhost:3000/api/v1';
