export const ROUTES = {
  // Public routes
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Protected routes
  JOB_TRACKER: '/job-tracker',
  PROFILE: '/user/:username',
  JOB_SEARCH: '/jobsearch',
  JOB_DETAIL: '/job/details/:id',
  
  // Utility
  NOT_FOUND: '*'
} as const;



// Helper functions for dynamic routes
export const getProfileRoute = (username: string) => `/user/${username}`;
export const getJobDetailRoute = (id: string) => `/job/details/${id}`;

