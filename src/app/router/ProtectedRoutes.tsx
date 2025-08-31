import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/features/authentication/components/ProtectedRoutes';
import MainLayout from '@/shared/components/layout/MainLayout';
import { ROUTES } from '@/config/routes';

// Lazy load components
import { lazy } from 'react';

const JobTracker = lazy(() => import('@/features/job-tracking/pages/JobTracker'));
const ProfilePage = lazy(() => import('@/features/applicant-portfolio/pages/ProfilePage'));
const GlobalJobs = lazy(() => import('@/features/job-search/pages/GlobalJobs'));
const JobDetail = lazy(() => import('@/features/job-search/pages/JobDetail'));
const NotFoundPage = lazy(() => import('@/shared/components/feedback/NotFoundPage'));

export const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route
        path='/*'
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="job-tracker" element={<JobTracker />} />
        <Route path="user/:username" element={<ProfilePage />} />
        {/* <Route path="jobsearch" element={<GlobalJobs />} /> */}
        {/* <Route path="job/details/:id" element={<JobDetail />} /> */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage title='Back to dashboard' url='/dashboard/job-tracker' />} />
      </Route>
    </Routes>
  );
};