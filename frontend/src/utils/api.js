import axios from 'axios';

// Determine backend URL based on environment
const getBackendUrl = () => {
  // In development, use localhost:3001
  if (process.env.NODE_ENV === 'development' && !window.location.host.includes('vercel.app')) {
    return 'http://localhost:3001';
  }
  
  // In production on Vercel, use the /_/backend route
  if (window.location.host.includes('vercel.app') || process.env.REACT_APP_ENV === 'production') {
    return '/_/backend';
  }
  
  // Fallback: use relative paths
  return '';
};

const api = axios.create({
  baseURL: getBackendUrl(),
  timeout: 30000,
});

export default api;
