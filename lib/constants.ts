// Determine the base URL based on environment
// APP_ENV takes priority over NODE_ENV to handle staging vs production correctly
const getBaseUrl = () => {
  // First check if we're in production based on APP_ENV
  if (process.env.APP_ENV === 'production') {
    return 'https://orfleisher.com'
  }

  // Check if we're in staging - this takes priority over NODE_ENV
  if (process.env.APP_ENV === 'staging') {
    return 'https://orfleisher-staging.ue.r.appspot.com'
  }

  // Only use NODE_ENV as fallback if APP_ENV is not set
  if (process.env.NODE_ENV === 'production' && !process.env.APP_ENV) {
    return 'https://orfleisher.com'
  }

  // Default to staging for development and other cases
  return 'https://orfleisher-staging.ue.r.appspot.com'
}

export const BASE_URL = getBaseUrl()
