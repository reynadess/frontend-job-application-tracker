import api from '@/api/axiosInstance';
import API_ROUTES from '@/config/config';
import { userApplicationTypes } from '@/schema/userApplications';
import { ApplicationsState } from '@/types/applications.types';

import { StatusCodes } from 'http-status-codes';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
                        const newApplication =
                            response.data.application || response.data;
                        set((state) => ({
                            Applications: [
                                ...state.Applications,
                                newApplication,
                            ],
                            loading: false,
                        }));
                        return newApplication;
                    } else {
                        set({ loading: false });
                        toast.error('Something went wrong try again');
                    }
                } catch (error: any) {
                    console.error('Error while creating the Applications');
                    toast.error(
                        error.response?.data?.message ||
                            'Failed to create the application'
                    );
                    set({ loading: false });
                } finally {
                    set({ loading: false });
                }
            },

            getAllUserApplications: async () => {
                try {
                    set({ loading: true });
                    const response = await api.get(
                        `${API_ROUTES.APPLICATIONS.GET}`
                    );
                    if (response.status === StatusCodes.OK) {
                        set({ Applications: response.data, loading: false });
                    } else {
                        toast.error(
                            'You dont have any applications to fetch please create one.'
                        );
                    }
                } catch (error) {
                    console.error(error);
                    toast.error('Fetching applications failed');
                }
            },
            getApplicationById: async (id: number) => {
                try {
                    const response = await api.get(
                        `${API_ROUTES.APPLICATIONS.GETBYID}/${id}`
                    );
                    if (response) {
                        return response.data;
                    } else {
                        console.error(
                            'Something went wrong while fetching the application'
                        );
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            updateApplicationById: async (id: number, updatedData: any) => {
                try {
                    set({ loading: true });
                    const res = await api.patch(
                        `${API_ROUTES.APPLICATIONS.UPDATEBYID}/${id}`,
                        updatedData
                    );
                    if (res.status === StatusCodes.OK) {
                        const updatedApplication = res.data;

                        //update the application in state
                        set((state) => ({
                            Applications: state.Applications.map(
                                (application) =>
                                    application.id === id
                                        ? updatedApplication
                                        : application
                            ),
                            loading: false,
                        }));
                    } else {
                        toast.error('Failed to update the application');
                    }
                } catch (error) {
                    console.error(`Update application failed for id: ${id}`);
                    toast.error('Something went wrong, Please try again');
                } finally {
                    set({ loading: false });
                }
            },
            deleteApplicationById: async (id: number) => {
                try {
                    set({ loading: true });
                    const res = await api.delete(
                        `${API_ROUTES.APPLICATIONS.DELETEBYID}/${id}`
                    );
                    if (res.status === StatusCodes.OK) {
                        toast.success(
                            `Application with id : ${id} deleted successfully` ||
                                res.data.message
                        );

                        // After deleting update the state
                        set((state) => ({
                            Applications: state.Applications.filter(
                                (application) => application.id !== id
                            ),
                        }));
                    } else {
                        toast.error(
                            res.data.message || 'Failed to delete application'
                        );
                    }
                } catch (error) {
                    console.error(`Application deletion failed for id : ${id}`);
                    toast.error('Something went wrong');
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: 'user-applications',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
