import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/authStore';
import { DefaultLayout } from '@/widgets/layouts/DefaultLayout';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
});

function PublicLayout() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
