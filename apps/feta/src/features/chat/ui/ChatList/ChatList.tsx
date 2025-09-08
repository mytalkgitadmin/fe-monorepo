import GroupChannelListUI from '@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI';
import { GroupChannelListProvider } from '@sendbird/uikit-react/GroupChannelList/context';
import { useRouter } from '@tanstack/react-router';

import { useChannelStore } from '@/features/chat/store';
import { ChatListHeader } from '@/features/chat/ui/ChatList/components/ChatListHeader';
import { ChatListItem } from '@/features/chat/ui/ChatList/components/ChatListItem';

export default function ChatList() {
  const { currentChannelUrl, setCurrentChannelUrl } = useChannelStore();
  const router = useRouter();

  return (
    <>
      <ChatListHeader />
      <GroupChannelListProvider
        onChannelSelect={(channel) => {
          setCurrentChannelUrl(channel?.url);
          router.navigate({ to: '/chat' });
        }}
        onChannelCreated={(channel) => {
          setCurrentChannelUrl(channel.url);
        }}
        selectedChannelUrl={currentChannelUrl}
        channelListQueryParams={{
          // 운영 PRIVATE 제외
          customTypesFilter: ['PRIVATE', 'DIRECT', 'MY', 'GROUP'], // 'PRIVATE', 'DIRECT', 'MY', 'GROUP'
        }}
      >
        <GroupChannelListUI
          renderHeader={() => <></>}
          renderChannelPreview={({ channel, isSelected }) => (
            <ChatListItem channel={channel} isSelected={!!isSelected} />
          )}
        />
      </GroupChannelListProvider>
    </>
  );
}
