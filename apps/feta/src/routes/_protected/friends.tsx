import { Suspense, lazy } from 'react';

import { createFileRoute } from '@tanstack/react-router';

const FriendsPage = lazy(() => import('@/pages/friends'));

export const Route = createFileRoute('/_protected/friends')({
  component: () => (
    <Suspense fallback={<div>채팅 로딩중...</div>}>
      <FriendsPage />
    </Suspense>
  ),
});
