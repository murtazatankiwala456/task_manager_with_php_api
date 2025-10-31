// config.js
const BASE_URL = "http://localhost:8080/task-manager-with-api/backend/api/";
// Optional: Helper to build URLs easily

function api(endpoint) {
  return `${BASE_URL}/${endpoint}`;
}
