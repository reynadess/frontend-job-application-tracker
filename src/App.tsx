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

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const {isAuthenticated, user} = useUserStore();
//   if (!isAuthenticated || !user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// }

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, user } = useUserStore();
//   const [isHydrated, setIsHydrated] = useState(false);

// Wait for the store to hydrate from localStorage
//   useEffect(() => {
//     const unsubscribe = useUserStore.persist.onHydrate(() => {
//       setIsHydrated(true);
//     });

//     // If store was already hydrated, set state
//     if (useUserStore.persist.hasHydrated()) {
//       setIsHydrated(true);
//     }

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   // Show loading or nothing while hydrating
//   if (!isHydrated) {
//     return null; // or a loading indicator
//   }

//   if (!isAuthenticated || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
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
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="job-tracker" replace />} />
            <Route path="job-tracker" element={<JobTracker />} />
            <Route path="user/profile" element={<ProfilePage />} />
            zus
            <Route path="jobsearch" element={<GlobalJobs />} />
            <Route path="job/details/:id" element={<JobDetail />} />
          </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
