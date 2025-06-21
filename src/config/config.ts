const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
    throw new Error('The BASE_URL is not defined');
}

const API_ROUTES = Object.freeze({
    BASE_URL,
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/register',
        LOGOUT: '/auth/logout',
    },
    APPLICANT: {
        PROFILE: '/applicants',
        UPDATE: '/users/update',
    },
    APPLICATIONS: {
        CREATE: '/applications',
        GET: '/applications',
        GETBYID: '/applications',
        UPDATEBYID: '/applications',
        DELETEBYID: '/applications',
    },
});

export default API_ROUTES;
