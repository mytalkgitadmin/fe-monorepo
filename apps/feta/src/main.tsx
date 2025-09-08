import '@/styles/default.css';
import '@/styles/global.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Toaster } from 'sonner';

import { routeTree } from './routeTree.gen';
import { Alert } from './shared/ui/Alert';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />

    <Toaster
      position='top-center'
      richColors
      closeButton
      expand={true}
      toastOptions={{
        duration: 3500,
        style: {
          background: 'var(--background)',
          color: 'var(--text)',
          border: 'var(--border)',
        },
      }}
    />
    <Alert />
  </StrictMode>
);
