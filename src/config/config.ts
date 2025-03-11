const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("The BASE_URL is not defined");
}

const API_ROUTES = Object.freeze({
  BASE_URL,
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/register",
    LOGOUT:"/auth/logout"
  },
//   USERS: {
//     PROFILE: "/users/profile",
//     UPDATE: "/users/update",
//   },
//   JOBS: {
//     LIST: "/jobs",
//     DETAILS: (id: string) => `/jobs/${id}`,
//   },
});

export default API_ROUTES;
