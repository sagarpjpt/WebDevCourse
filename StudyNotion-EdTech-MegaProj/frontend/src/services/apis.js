const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const categories = {
    CATEGORIES_API: BASE_URL + '/api/v1/courses/get-all-categories'
}

export const auth = {
    LOGIN_API: BASE_URL + '/api/v1/auth/login',
    IS_LOGGED: BASE_URL + '/api/v1/auth/me',
    SEND_OTP: BASE_URL + '/api/v1/auth/sendotp',
    SIGNUP: BASE_URL + '/api/v1/auth/signup',
    LOG_OUT: BASE_URL + '/api/v1/auth/logout'
}

export const profile = {
    GET_USER_DETAILS: BASE_URL + '/api/v1/profiles/get-user-details',
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/api/v1/reach/contact",
}