// Determine the base URL based on Google Cloud project
const getBaseUrl = () => {
  if (process.env.GOOGLE_CLOUD_PROJECT === 'orfleisher-staging') {
    return 'https://orfleisher-staging.ue.r.appspot.com'
  }

  if (process.env.GOOGLE_CLOUD_PROJECT === 'orfleisher-production') {
    return 'https://orfleisher.com'
  }

  // Default to staging for development and other cases
  return 'https://orfleisher-staging.ue.r.appspot.com'
}

export const BASE_URL = getBaseUrl()
