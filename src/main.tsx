import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './components/ui/toast.tsx';
import { Toaster } from './components/ui/sonner.tsx';

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
