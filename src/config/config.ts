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
    JOB : {
        GET_ALL_JOBS : '/jobs',
        GET_JOB_BY_ID : (id: number) => `/jobs/${id}`,
        GET_JOB_BY_IDS : (ids: number[]) => `/jobs/by-ids=${ids.join(',')}`,
        CREATE_JOB : '/jobs',
        UPDATE_JOB : (id: number) => `/jobs/${id}`,
        DELETE_JOB : (id: number) => `/jobs/${id}`,
    }
});

export default API_ROUTES;
