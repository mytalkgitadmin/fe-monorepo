import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';

import SendbirdProviderWithAuth from '@/app/providers/SendbirdProviderWithAuth';
import { queryClient } from '@/app/providers/queryClient';

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
