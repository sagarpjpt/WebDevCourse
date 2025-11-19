const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const courses = {
    CREATE_COURSE: BASE_URL + '/api/v1/courses/create-course',
    EDIT_COURSE: BASE_URL + '/api/v1/courses/edit-course',
    GET_INSTRUCTOR_COURSES: BASE_URL + '/api/v1/courses/instructor-courses-details'
}

export const course_sections = {
    CREATE_SECTION: BASE_URL + '/api/v1/courses/add-section',
    EDIT_SECTION: BASE_URL + '/api/v1/courses/update-section',
    DELETE_SECTION: BASE_URL + '/api/v1/courses/delete-section',
    CREATE_SUB_SECTION: BASE_URL + '/api/v1/courses/add-subsection',
    EDIT_SUB_SECTION: BASE_URL + '/api/v1/courses/update-subsection',
    DELETE_SUB_SECTION: BASE_URL + '/api/v1/courses/delete-subsection'
}

export const categories = {
    CATEGORIES_API: BASE_URL + '/api/v1/courses/get-all-categories'
}

export const auth = {
    LOGIN_API: BASE_URL + '/api/v1/auth/login',
    IS_LOGGED: BASE_URL + '/api/v1/auth/me',
    SEND_OTP: BASE_URL + '/api/v1/auth/sendotp',
    SIGNUP: BASE_URL + '/api/v1/auth/signup',
    LOG_OUT: BASE_URL + '/api/v1/auth/logout',
    CHANGE_PASSWORD: BASE_URL + '/api/v1/auth/changepassword'
}

export const profile = {
    GET_USER_DETAILS: BASE_URL + '/api/v1/profiles/get-user-details',
    UPDATE_DP: BASE_URL + '/api/v1/profiles/update-display-picture',
    UPDATE_PROFILE: BASE_URL + '/api/v1/profiles/update-profile',
    DEL_PROF: BASE_URL + '/api/v1/profiles/delete-account'
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/api/v1/reach/contact",
}