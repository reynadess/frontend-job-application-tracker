import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import api from '@/api/axiosInstance';
import {
    setToken,
    removeToken,
    getToken,
    isTokenExpired,
} from '@/shared/utils/tokenUtils';
import API_ROUTES from '@/config/config';
import { toast } from 'sonner';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { StatusCodes } from 'http-status-codes';
import { UserState } from '@/shared/types/auth.types';
import { removeApplicantInfo } from '@/shared/utils/storage.utils';
import { useApplicantStore } from '@/features/applicant-portfolio/store/ApplicantProfile.Store';
import { LoginInputType, SignupInputType } from '../schemas/auth.schema';


interface UserStateWithTimer extends UserState {
    logoutTimer?: NodeJS.Timeout | null;
    setupAutoLogout: (token: string) => void; // Add this method to the interface
}

export const useAuthStore = create<UserStateWithTimer>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            loading: false,
            logoutTimer: null, // ADD: Initialize the timer

            signup: async (input: SignupInputType) => {
                try {
                    set({ loading: true });
                    const response = await api.post(
                        API_ROUTES.AUTH.SIGNUP,
                        input
                    );
                    if (response.status === StatusCodes.CREATED) {
                        toast.success(
                            'Signup successful! Redirecting to login...'
                        );
                    } else {
                        toast.error('Signup failed. Please try again.');
                    }
                } catch (error: any) {
                    toast.error(
                        error.response?.data?.message || 'Signup failed'
                    );
                } finally {
                    set({ loading: false });
                }
            },

            login: async (input: LoginInputType) => {
                try {
                    set({ loading: true });
                    const response = await api.post(
                        API_ROUTES.AUTH.LOGIN,
                        input
                    );

                    if (response.data.access_token) {
                        setToken(response.data.access_token);

                        const decodedToken: any = jwtDecode(
                            response.data.access_token
                        );

                        set({
                            loading: false,
                            user: {
                                username: decodedToken.username || '',
                                id: decodedToken.id || '',
                            },
                            isAuthenticated: true,
                        });
                        //TODO:Fethching applicant initially but might find some good way to do so
                        // After setting user in auth store
                        useApplicantStore.getState().getApplicantInfo(decodedToken.usernmae);
                        // ADD: Set up auto-logout after successful login
                        get().setupAutoLogout(response.data.access_token);

                        toast.success('Login successful');
                    } else {
                        // Handle the case where the access token is missing
                        toast.error('Login failed: Access token is missing');
                        set({ loading: false });
                    }
                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        const errorMsg =
                            error.response?.data?.message ||
                            error.message ||
                            'Login failed';
                        toast.error(errorMsg);
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                } finally {
                    set({ loading: false });
                }
            },

            logout: async () => {
                try {
                    set({ loading: true });
                    
                    // ADD: Clear the auto-logout timer when manually logging out
                    const currentState = get();
                    if (currentState.logoutTimer) {
                        clearTimeout(currentState.logoutTimer);
                    }
                    
                    // Clear token and user data
                    removeToken();
                    removeApplicantInfo();
                    set({
                        loading: false,
                        user: null,
                        isAuthenticated: false,
                        logoutTimer: null, // ADD: Clear timer reference
                    });
                    toast.success('Logged out successfully');
                } catch (error: any) {
                    toast.error('Logout failed. Please try again.');
                    console.error(error);
                    set({ loading: false });
                }
            },

            checkAuth: () => {
                const token = getToken();
                if (token && !isTokenExpired(token)) {
                    const decodedToken: any = jwtDecode(token);
                    set({
                        user: {
                            username: decodedToken.username || '',
                            id: decodedToken.id || '',
                        },
                        isAuthenticated: true,
                    });

                    // ADD: Set up auto-logout for existing sessions
                    get().setupAutoLogout(token);
                } else {
                    removeToken(); // Clean up expired tokens
                }
            },

            setupAutoLogout: (token: string) => {
                try {
                    const decodedToken: any = jwtDecode(token);
                    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
                    const currentTime = Date.now();
                    const timeUntilExpiration = expirationTime - currentTime;

                    // Clear any existing timer first
                    const currentState = get();
                    if (currentState.logoutTimer) {
                        clearTimeout(currentState.logoutTimer);
                    }

                    // Only set timer if token hasn't expired yet
                    if (timeUntilExpiration > 0) {
                        const timerId = setTimeout(() => {
                            removeToken();
                            removeApplicantInfo();
                            set({ 
                                user: null, 
                                isAuthenticated: false,
                                logoutTimer: null
                            });
                            window.location.href = "/home"
                            toast.info('Session expired. Please login again.');
                        }, timeUntilExpiration);

                        // Store the timer ID so we can clear it later
                        set({ logoutTimer: timerId });
                    } else {
                        // Token is already expired
                        removeToken();
                        removeApplicantInfo();
                        set({ 
                            user: null, 
                            isAuthenticated: false,
                            logoutTimer: null
                        });
                    }
                } catch (error) {
                    console.error('Error setting up auto-logout:', error);
                    // If we can't decode the token, it's probably invalid
                    removeToken();
                    removeApplicantInfo();
                    set({ 
                        user: null, 
                        isAuthenticated: false,
                        logoutTimer: null
                    });
                }
            },
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => localStorage),
            // ADD: Don't persist the logoutTimer
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                // logoutTimer is intentionally excluded from persistence
            }),
        }
    )
);