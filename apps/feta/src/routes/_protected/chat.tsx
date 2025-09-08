import { Suspense, lazy } from 'react';

import { createFileRoute } from '@tanstack/react-router';

const ChatPage = lazy(() => import('@/pages/chat'));

export const Route = createFileRoute('/_protected/chat')({
  component: () => (
    <Suspense fallback={<div>채팅 로딩중...</div>}>
      <ChatPage />
    </Suspense>
  ),
});
