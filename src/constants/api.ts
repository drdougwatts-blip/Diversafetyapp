export const API_BASE_URL = 'https://hbot-spoc-869020288631.europe-west2.run.app';

export const API_ENDPOINTS = {
  chamberFinder: `${API_BASE_URL}/api/find`,
  chamberFinderLite: `${API_BASE_URL}/api/lite`,
  reportSubmit: `${API_BASE_URL}/api/report`,
  safetyBriefings: `${API_BASE_URL}/api/content/safety-briefings`,
  courses: `${API_BASE_URL}/api/content/courses`,
} as const;
