const defaultApi = '/api';
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL || defaultApi;

document.querySelector('#api-base-url').textContent = `API base URL: ${configuredApiBaseUrl}`;
