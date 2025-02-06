import { LoginInputType, SignupInputType } from "@/schema/userSchema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:3000/api/auth";

type User = {
  firstname: string;
  lastname: string;
  username:string;
  email: string;
  password: string;
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
      // signup api implementation
      signup: async (input: SignupInputType) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/register`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.success);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
            console.log(error);
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      login: async (input: LoginInputType) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            toast.success(response.data.success);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      // logout api implementation
      logout: async () => {
        try {
          set({ loading: true });
          await axios.post(
            `${API_END_POINT}/logout`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          set({ loading: false, user: null, isAuthenticated: false });
          toast.success("Logged out successfully");
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
