import api from "@/api/axiosInstance";
import API_ROUTES from "@/config/config";
import { userApplicationTypes } from "@/schema/userApplications";
import { ApplicationsState } from "@/types/applications.types";

import { StatusCodes } from "http-status-codes";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set) => ({
      Applications: [],
      loading: false,

      createApplication: async (application: userApplicationTypes) => {
        try {
          set({ loading: true });
          const response = await api.post(
            `${API_ROUTES.APPLICATIONS.CREATE}`,
            application
          );
          if (response.status === StatusCodes.CREATED) {
            toast.success(
              response.data.message || "Applications created successfully"
            );
          } else {
            toast.error("Something went wrong try again");
          }
        } catch (error: any) {
          console.error("Error while creating the Applications");
          toast.error(
            error.response?.data?.message || "Failed to create the application"
          );
        } finally {
          set({ loading: false });
        }
      },

      getAllUserApplications: async () => {
        try {
          const response = await api.get(`${API_ROUTES.APPLICATIONS.GET}`);
          if (response.status === StatusCodes.OK) {
            set({ Applications: response.data });
          } else {
            toast.error(
              "You dont have any applications to fetch please create one."
            );
          }
        } catch (error) {
          console.error(error);
          toast.error("Fetching applications failed");
        }
      },
    }),
    {
      name: "user-applications",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
