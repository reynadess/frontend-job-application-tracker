import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import api from '@/api/axiosInstance';
import API_ROUTES from '@/config/config';
import { ApplicantState } from '@/shared/types/user.types';

export const useApplicantStore = create<ApplicantState>()(
    persist(
        (set) => ({
            Applicant: null!,
            loading: false,

            getApplicantInfo: async (username: string) => {
                try {
                    set({ loading: true });
                    const response = await api.get(
                        `${API_ROUTES.APPLICANT.PROFILE}/${username}`
                    );
                    set({
                        Applicant: response.data,
                        loading: false,
                    });
                    return response.data;
                } catch (error: any) {
                    console.error("failed to fetch the data login again");
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: 'applicant-info',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
