import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import api from '@/api/axiosInstance';
import API_ROUTES from '@/config/config';
import { Job, JobActions } from '../types/job.types';

export const useJobStore = create<JobActions>()(
  persist(
    (set, get) => ({
      jobs: [],
      loading: false,
      error: null,
      getJobList: async () => {
        try {
          set({ loading: true });
          const response = await api.get(API_ROUTES.JOB.GET_ALL_JOBS);
          set({ jobs: response.data, loading: false });
        } catch (error: any) {
          console.error('Failed to fetch job list:', error);
          set({ error: error.message, loading: false });
        }
      },

      getJobById: async (id: number) => {
        try {
          set({ loading: true });
          const response = await api.get(API_ROUTES.JOB.GET_JOB_BY_ID(id));
          set({ jobs: response.data, loading: false });
        } catch (error: any) {
          console.error('Failed to fetch job list:', error);
          set({ error: error.message, loading: false });
        }
      },

      getJobByIds: async (ids: number[]) => {
        try {
          set({ loading: true });
          const response = await api.get(API_ROUTES.JOB.GET_JOB_BY_IDS(ids));
          set({ jobs: response.data, loading: false });
        } catch (error: any) {
          console.error('Failed to fetch job list:', error);
          set({ error: error.message, loading: false });
        }
      },

      addJob: async (job: Job) => {
        try {
          set({ loading: true });
          const response = await api.post(API_ROUTES.JOB.CREATE_JOB, job);
          const currJobs = get().jobs;
          set({ jobs: [...currJobs, response.data], loading: false });
        } catch (error: any) {
          console.error('Failed to fetch job list:', error);
          set({ error: error.message, loading: false });
        }
      },

      updateJob: async (jobId: number, job: Job) => {
        try {
          set({ loading: true });
          const response = await api.put(API_ROUTES.JOB.UPDATE_JOB(jobId), job);
          const currentJobs = get().jobs;
          set({
            jobs: currentJobs.map((j) => (j.id === jobId ? response.data : j)),
            loading: false,
          });
        } catch (error: any) {
          console.error('Failed to fetch job list:', error);
          set({ error: error.message, loading: false });
        }
      },

      deleteJob: async (jobId: number) => {
        try {
          set({ loading: true });
          const response = await api.delete(API_ROUTES.JOB.DELETE_JOB(jobId));
          const currJobs = get().jobs;
          set({
            jobs: currJobs.filter((job) => job.id != jobId),
            loading: false,
          });
        } catch (error: any) {
          console.error('Failed to fetch job list:', error);
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: 'job-list',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
