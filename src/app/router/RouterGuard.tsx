// src/app/router/RouteGuard.tsx
import { Suspense } from 'react';
import { AppRouter } from './AppRouter';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';
import { PageLoader } from '../../shared/components/feedback/PageLoader';

export const RouteGuard = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <AppRouter />
      </Suspense>
    </ErrorBoundary>
  );
};