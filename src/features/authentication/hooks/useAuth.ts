import { LoginInputType, SignupInputType } from "../schemas/auth.schema";
import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
  const store = useAuthStore();

  return {
    // State
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    loading: store.loading,

    // Actions
    login: async (input: LoginInputType) => {
      await store.login(input);
    },

    signup: async (input: SignupInputType) => {
      await store.signup(input);
    },

    logout: async () => {
      await store.logout();
    },

    checkAuth: () => {
      store.checkAuth();
    },

    // Computed values
    isLoggedIn: store.isAuthenticated && !!store.user,
    userId: store.user?.id,
    username: store.user?.username,
  };
};
