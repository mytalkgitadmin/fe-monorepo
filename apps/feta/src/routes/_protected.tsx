import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { useAuthStore } from '@/features/auth/authStore';

import { ProtectedLayout } from '@/widgets/layouts/ProtectedLayout';

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayoutComponent,

  beforeLoad: async () => {
    const { isAuthenticated, setReturnUrl } = useAuthStore.getState();
    if (!isAuthenticated) {
      const pathname = window.location.pathname;
      setReturnUrl(pathname);
      throw redirect({
        to: '/login',
      });
    }
  },
});

function ProtectedLayoutComponent() {
  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
}
