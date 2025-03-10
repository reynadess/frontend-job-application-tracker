import { LoginInputType, SignupInputType } from "@/schema/userSchema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;
console.log(AUTH_ENDPOINT);
if (!AUTH_ENDPOINT) {
  throw new Error("Please provide an AUTH_ENDPOINT in environmental variables");
}

// Ensure axios is configured consistently
axios.defaults.withCredentials = true;

type User = {
  id: string;
  //firstName: string;
  // lastName: string;
  username: string;
  // email: string;
  //password: string;
};

type UserState = {
  user: User | null;
  signup: (input: SignupInputType) => Promise<void>;
  login: (input: LoginInputType) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      // ✅ Signup - Just registers and redirects to login page
      signup: async (input: SignupInputType) => {
        try {
          set({ loading: true });

          const response = await axios.post(
            `${AUTH_ENDPOINT}/register`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

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
          const response = await axios.post(`${AUTH_ENDPOINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          if (response.data.access_token) {
            const decodedToken: any = jwtDecode(response.data.access_token); // Decode the token
            console.log("Decoded Token:", decodedToken);
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

          // if (response.data.success) {
          //   toast.success(response.data.success);
          //   set({
          //     loading: false,
          //     user: response.data.user,
          //     isAuthenticated: true,
          //   });
          //   console.log( " Login hain re bhai" , response.data.user);
          // }
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            const errorMsg =
              error.response?.data?.message || error.message || "Login failed";
            toast.error(errorMsg);
            console.error("Login Error:", error.response?.data);
          } else {
            toast.error("An unexpected error occurred");
            throw new Error("An unexpected error occurred");
          }
          set({ loading: false });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          await axios.post(`${AUTH_ENDPOINT}/logout`);

          set({ loading: false, user: null, isAuthenticated: false });
          toast.success("Logged out successfully");
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            const errorMsg =
              error.response?.data?.message || error.message || "Logout failed";
            toast.error(errorMsg);
            console.error("Logout Error:", error.response?.data);
          } else {
            toast.error("An unexpected error occurred");
            console.error(error);
          }
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
