// Determine the base URL based on environment
// Check multiple environment variables to handle different deployment scenarios
const getBaseUrl = () => {
  // First check if we're in production based on APP_ENV
  if (process.env.APP_ENV === 'production') {
    return 'https://orfleisher.com'
  }

  // Check if we're in staging
  if (process.env.APP_ENV === 'staging') {
    return 'https://orfleisher-staging.ue.r.appspot.com'
  }

  // Check NODE_ENV as fallback
  if (process.env.NODE_ENV === 'production') {
    return 'https://orfleisher.com'
  }

  // Default to staging for development and other cases
  return 'https://orfleisher-staging.ue.r.appspot.com'
}

export const BASE_URL = getBaseUrl()
