// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://your-api-endpoint.com',
  ENDPOINTS: {
    GENERATE_TRIP: '',
  },
  TIMEOUT: 60000, // 60 seconds timeout for trip generation
};

// Form validation
export const FORM_VALIDATION = {
  REQUIRED_FIELDS: [
    'destination',
    'group',
    'month',
    'days',
    'budget',
    'nationality',
    'rhythm',
    'activities'
  ],
  MIN_ACTIVITIES: 1,
  MAX_DAYS: 365,
  MIN_DAYS: 1,
};

// Loading configuration
export const LOADING_CONFIG = {
  TOTAL_DURATION: 30000, // 30 seconds
  STEPS_COUNT: 6,
  UPDATE_INTERVAL: 100, // 100ms
};
