import { useAuthStore } from '@/features/auth/authStore';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      throw redirect({ to: '/friends' });
    } else {
      throw redirect({ to: '/features' });
    }
  },
});
