import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const FriendsPage = lazy(() => import('@/pages/friends'));

export const Route = createFileRoute('/_protected/friends')({
  component: () => (
    <Suspense fallback={<div>채팅 로딩중...</div>}>
      <FriendsPage />
    </Suspense>
  ),
});
