import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { queryClient } from '@/app/providers/queryClient';
import SendbirdProviderWithAuth from '@/app/providers/SendbirdProviderWithAuth';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <SendbirdProviderWithAuth>
        <Outlet />
      </SendbirdProviderWithAuth>
    </QueryClientProvider>
  );
}
