// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      SIGNUP: '/api/auth/signup',
      BASES: '/api/auth/bases'
    },
    ASSETS: '/api/assets',
    TRANSFERS: '/api/transfers',
    PURCHASES: '/api/purchases',
    ASSIGNMENTS: '/api/assignments'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export API configuration
export default API_CONFIG;
