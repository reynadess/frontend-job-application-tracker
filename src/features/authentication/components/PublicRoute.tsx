import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth.store';


interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const unsubscribe = useAuthStore.persist.onHydrate(() => {
            setIsHydrated(true);
        });

        // If store was already hydrated, set state
        if (useAuthStore.persist.hasHydrated()) {
            setIsHydrated(true);
        }

        return () => {
            unsubscribe();
        };
    }, []);

    // Show loading or nothing while hydrating
    if (!isHydrated) {
        return null; // or a loading indicator
    }
    if (isAuthenticated && user) {
        return <Navigate to="/dashboard/job-tracker" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;
