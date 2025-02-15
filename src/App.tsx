import { Link, Route, Routes } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import MainLayout from "./Dashboard/MainLayout";
import JobTracker from "./pages/JobTracker";
import { ThemeProvider } from "./components/theme-provider";
import ProfilePage from "./pages/ProfilePage";
import GlobalJobs from "./pages/GlobalJobs";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route path="job-tracker" element={<JobTracker />}></Route>
            <Route path="user/profile" element={<ProfilePage />}></Route>
            <Route path="jobsearch" element={<GlobalJobs />}></Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
