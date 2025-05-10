// Get the current hostname
const hostname = window.location.hostname;
// console.log("hostname :",hostname)
// If running locally, use localhost, otherwise use the current hostname
export const API_URL = hostname.toString() === "13.51.6.112" ? "http://13.51.6.112:5000" : "http://localhost:5000";