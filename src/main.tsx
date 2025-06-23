import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './shared/components/ui/toast.tsx';
import { Toaster } from './shared/components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ToastProvider>
                <App />
                <Toaster />
            </ToastProvider>
        </BrowserRouter>
    </StrictMode>
);
