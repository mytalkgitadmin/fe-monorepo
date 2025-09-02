import { ChatList } from '@/features/chat/ui/ChatList';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/_protected/chat-list')({
  component: () => (
    <Suspense fallback={<div>채팅 로딩중...</div>}>
      <div className="pageContainer">
        <ChatList />
      </div>
    </Suspense>
  ),
});
