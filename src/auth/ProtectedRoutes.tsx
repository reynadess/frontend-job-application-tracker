import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "@/hooks/zustand/store/useUserStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useUserStore.persist.onHydrate(() => {
      setIsHydrated(true);
    });

    // If store was already hydrated, set state
    if (useUserStore.persist.hasHydrated()) {
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

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
