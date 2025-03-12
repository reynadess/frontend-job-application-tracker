import { LoginInputType, SignupInputType } from "@/schema/userSchema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "@/api/axiosInstance";
import {
  setToken,
  removeToken,
  getToken,
  isTokenExpired,
} from "@/utils/tokenUtils";
import API_ROUTES from "@/config/config";
import { toast } from "sonner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  username: string;
};

type UserState = {
  user: User | null;
  signup: (input: SignupInputType) => Promise<void>;
  login: (input: LoginInputType) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  loading: boolean;
  isAuthenticated: boolean;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      signup: async (input: SignupInputType) => {
        try {
          set({ loading: true });
          const response = await api.post(API_ROUTES.AUTH.SIGNUP, input);

          if (response.status === 201) {
            toast.success("Signup successful! Redirecting to login...");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
          } else {
            toast.error("Signup failed. Please try again.");
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Signup failed");
        } finally {
          set({ loading: false });
        }
      },

      login: async (input: LoginInputType) => {
        try {
          set({ loading: true });
          const response = await api.post(API_ROUTES.AUTH.LOGIN, input);

          if (response.data.access_token) {
            setToken(response.data.access_token);

            const decodedToken: any = jwtDecode(response.data.access_token);

            set({
              loading: false,
              user: {
                username: decodedToken.username || "",
                id: decodedToken.id || "",
              },
              isAuthenticated: true,
            });

            toast.success("Login successful");
          }
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            const errorMsg =
              error.response?.data?.message || error.message || "Login failed";
            toast.error(errorMsg);
          } else {
            toast.error("An unexpected error occurred");
          }
        } finally {
          set({ loading: false });
        }
      },
      // logout: async () => {
      //   try {
      //     set({ loading: true });
      //     await api.post(API_ROUTES.AUTH.LOGOUT);

      //     removeToken();
      //     set({ loading: false, user: null, isAuthenticated: false });
      //     toast.success("Logged out successfully");
      //   } catch (error: any) {
      //     toast.error(
      //       error.response?.data?.message || "Logout failed. Try again."
      //     );
      //   } finally {
      //     set({ loading: false });
      //   }
      // },
      logout: async () => {
        try {
          set({ loading: true });

          // Clear token and user data
          removeToken();

          set({ loading: false, user: null, isAuthenticated: false });

          // Redirect to login page
          window.location.href = "/login";

          toast.success("Logged out successfully");
        } catch (error: any) {
          toast.error("Logout failed. Please try again.");
          console.error(error);
          set({ loading: false });
        }
      },
      // ✅ Check if token is valid and set user state
      checkAuth: () => {
        const token = getToken();
        if (token && !isTokenExpired(token)) {
          const decodedToken: any = jwtDecode(token);
          set({
            user: {
              username: decodedToken.username || "",
              id: decodedToken.id || "",
            },
            isAuthenticated: true,
          });

          // ✅ Auto logout when token expires
          setTimeout(() => {
            console.log("Token expired. Auto-logging out...");
            removeToken();
            set({ user: null, isAuthenticated: false });
          }, decodedToken.exp * 1000 - Date.now());
        } else {
          removeToken(); // Clean up expired tokens
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
