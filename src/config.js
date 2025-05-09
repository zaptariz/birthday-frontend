// Get the current hostname
const hostname = window.location.hostname;

// If running locally, use localhost, otherwise use the current hostname
export const API_URL = hostname === 'localhost' || hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : `http://${hostname}:5000`; 