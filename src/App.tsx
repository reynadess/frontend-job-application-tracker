import { Route, Routes } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import MainLayout from "./Dashboard/MainLayout";
import JobTracker from "./pages/JobTracker";
import { ThemeProvider } from "./components/theme-provider";
import ProfilePage from "./pages/ProfilePage";
import GlobalJobs from "./pages/GlobalJobs";
import JobDetail from "./pages/JobDetail";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoutes";
import PublicRoute from "./auth/PublicRoute";
import NotFoundPage from "./components/404/PageNotFound";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import { useEffect } from "react";
import { useAuthStore } from "./hooks/zustand/store/useAuthStore";
import HomePage from "./pages/HomePage";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="job-tracker" replace />} />
            <Route path="job-tracker" element={<JobTracker />} />
            <Route path={`user/:username`} element={<ProfilePage />} />
            zus
            <Route path="jobsearch" element={<GlobalJobs />} />
            <Route path="job/details/:id" element={<JobDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
