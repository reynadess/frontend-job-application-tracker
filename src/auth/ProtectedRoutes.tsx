import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "@/hooks/zustand/store/useUserStore";
import { getToken, isTokenExpired, removeToken } from "@/utils/tokenUtils";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useUserStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useUserStore.persist.onHydrate(() => {
      setIsHydrated(true);
    });

    // If store was already hydrated, set state
    if (useUserStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    const token = getToken();

    if (token && isTokenExpired(token)) {
      removeToken();
      logout(); // Clear user state in Zustand
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
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
