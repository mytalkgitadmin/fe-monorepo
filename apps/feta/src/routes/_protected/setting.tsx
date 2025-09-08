import { Suspense, lazy } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import Loading from '@/shared/ui/Loading';

const SettingPage = lazy(() => import('@/pages/setting'));

export const Route = createFileRoute('/_protected/setting')({
  component: () => (
    <Suspense fallback={<Loading />}>
      <SettingPage />
    </Suspense>
  ),
});
