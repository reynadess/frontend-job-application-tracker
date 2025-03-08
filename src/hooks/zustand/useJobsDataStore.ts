import { JobApplication, dummyData as jobs } from "@/DummyData/Data";
import { create } from "zustand";

export interface useTasksDataStoreInterface {
  jobs: JobApplication[] | null;
  selectedJob: JobApplication | null;
  setSelectedJob: (job: JobApplication | null) => void;
  setJobs: (jobs: JobApplication[]) => void;
  fetchJobs: () => Promise<void>;
  updateJobs: (
    jobs: JobApplication[],
    operation?: string | undefined
  ) => Promise<{ success: boolean; message: string }>;
  addJob: (
    job: JobApplication
  ) => Promise<{ success: boolean; message: string }>;
}

export const useJobsDataStore = create<useTasksDataStoreInterface>((set) => ({
  jobs: null,
  selectedJob: null,
  setJobs: (jobProp) => {
    set({ jobs: jobProp });
  },
  setSelectedJob: (job) => {
    set({ selectedJob: job });
  },
  fetchJobs: async () => {
    try {
      // console.log("fetched data");

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          set({ jobs });
          resolve();
        }, 1000);
      });
    } catch (error) {
      console.error("Failed to fetch data");
      set({ jobs: null });
    }
  },
  updateJobs: async (
    updateJobsArray: JobApplication[],
    operation: string | undefined
  ) => {
    let successMessage = "";

    switch (operation) {
      case "copy":
        successMessage = "Job has been copied successfully!";
        break;
      case "delete":
        successMessage = "Task has been deleted successfully!";
        break;
      case "favorite":
        successMessage = "Job has been marked as favorite successfully!";
        break;
      default:
        successMessage = "Operation completed successfully!";
        break;
    }
    try {
      // simulate an async operation (api call)
      const result = await new Promise<{ success: boolean; message: string }>(
        (resolve) => {
          setTimeout(() => {
            set({ jobs: updateJobsArray });

            // resolve the promise with a success status and message
            resolve({
              success: true,
              message: successMessage,
            });
          }, 1233);
        }
      );
      return result;
    } catch (error: unknown) {
      console.log(error);

      // if an error occurs return failure status and generic error message
      return { success: false, message: "Something went wrong!" };
    }
  },

  addJob: async (job: JobApplication) => {
    try {
      const result = await new Promise<{ success: boolean; message: string }>(
        (resolve) => {
          setTimeout(() => {
            set((state) => {
              const updateJobs = state.jobs ? [...state.jobs, job] : [job];
              return { jobs: updateJobs };
            });
            resolve({
              success: true,
              message: "Job added successfully!",
            });
          }, 1000);
        }
      );
      return result;
    } catch (error) {
      console.log(error);

      return { success: false, message: "Something went wrong!" };
    }
  },
}));