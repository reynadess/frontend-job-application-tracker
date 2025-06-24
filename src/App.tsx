import { useEffect } from 'react';
import { ThemeProvider } from './shared/components/theme-provider';
import { RouteGuard } from './app/router/RouterGuard';
import { useAuthStore } from './features/authentication';


function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouteGuard />
    </ThemeProvider>
  );
}

export default App;