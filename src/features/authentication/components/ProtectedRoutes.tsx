import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, isTokenExpired, removeToken } from '@/shared/utils/tokenUtils';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth.store';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = useAuthStore.persist.onHydrate(() => {
            setIsHydrated(true);
        });

        // If store was already hydrated, set state
        if (useAuthStore.persist.hasHydrated()) {
            setIsHydrated(true);
        }

        const token = getToken();

        if (!token && isTokenExpired(token as string)) {
            removeToken();
            logout(); // Clear user state in Zustand
            toast.error('Session expired. Please log in again.');
            navigate('/home');
        }

        return () => {
            unsubscribe();
        };
    }, []);

    // Show loading or nothing while hydrating
    if (!isHydrated) {
        return null; // or a loading indicator
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
