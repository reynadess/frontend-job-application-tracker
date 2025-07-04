import { useEffect } from 'react';
import { ThemeProvider } from './shared/components/theme-provider';
import { RouteGuard } from './app/router/RouterGuard';
import { useAuth, useAuthStore } from './features/authentication';
import { useApplicantStore } from './features/applicant-portfolio/store/ApplicantProfile.Store';


function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const getApplicantInfo = useApplicantStore((state) => state.getApplicantInfo)
  const {username} = useAuth();
  //TODO: FIx this why applicant is undefined initially  
  useEffect(() => {
    checkAuth();
    getApplicantInfo(username);
  }, [checkAuth , getApplicantInfo , username]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouteGuard />
    </ThemeProvider>
  );
}

export default App;