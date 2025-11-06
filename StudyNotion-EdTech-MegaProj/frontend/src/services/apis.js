const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const categories = {
    CATEGORIES_API: BASE_URL + '/api/v1/courses/get-all-categories'
}