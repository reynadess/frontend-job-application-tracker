import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { useAuth } from '@/features/authentication';

export const AppRouter = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route
                        path="/*"
                        element={
                            <Navigate
                                to={`/dashboard${ROUTES.JOB_TRACKER}`}
                                replace
                            />
                        }
                    />
                    <Route path="/dashboard/*" element={<ProtectedRoutes />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
                    <Route path="/*" element={<PublicRoutes />} />
                </>
            )}
        </Routes>
    );
};
