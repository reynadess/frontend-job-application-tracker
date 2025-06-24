import { Routes, Route } from 'react-router-dom';
import PublicRoute from '@/features/authentication/components/PublicRoute';
import { ROUTES } from '../../config/routes';

// Lazy load components for better performance
import { lazy } from 'react';

const HomePage = lazy(() => import('@/features/landing/pages/HomePage'));
const LoginPage = lazy(() => import('@/features/authentication/pages/LoginPage'));
const SignupPage = lazy(() => import('@/features/authentication/pages/SignupPage'));
const ForgotPassword = lazy(() => import('@/features/authentication/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/features/authentication/pages/ResetPassword'));
const NotFoundPage = lazy(() => import('@/shared/components/feedback/NotFoundPage'));

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.SIGNUP}
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.FORGOT_PASSWORD}
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.RESET_PASSWORD}
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage title='Back to Login' url='/login' />} />
    </Routes>
  );
};