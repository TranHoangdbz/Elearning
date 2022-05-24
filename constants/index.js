const MAX_FILE_SIZE_IN_MB = 10;
const BASE_API_URL = "http://localhost:8000";
const MONGODB_URI = `mongodb://localhost:27017/procourse?retryWrites=true&w=majority`;
const PORT = 8000;

module.exports = {
  MAX_FILE_SIZE_IN_MB,
  BASE_API_URL,
  MONGODB_URI,
  PORT,
};
