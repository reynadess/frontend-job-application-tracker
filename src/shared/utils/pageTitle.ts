export const APP_NAME = 'JobScanner';
export const APP_TAGLINE = 'Your Job Search Platform';

// For homepage
export const getHomePageTitle = (): string => {
  return `${APP_NAME} | ${APP_TAGLINE}`;
};

// For other pages - standalone descriptive names
export const getPageTitle = (pageName: string): string => {
  return pageName; 
};

export const PAGE_TITLES = {
  HOME: getHomePageTitle(),
  JOB_SEARCH: 'Job Search',
  JOB_TRACKER: 'Job Tracker', 
  PROFILE: 'Profile',
  LOGIN: 'JobScanner | Welcome Back',
  SIGNUP:'JobScanner | Register',
  DASHBOARD: 'Dashboard',
  APPLICATIONS: 'My Applications',
  SAVED_JOBS: 'Saved Jobs',
  RESUME_BUILDER: 'Resume Builder',
  INTERVIEW_PREP: 'Interview Prep',
  SALARY_INSIGHTS: 'Salary Insights',
  COMPANIES: 'Companies',
  SETTINGS: 'Settings'
} as const;
