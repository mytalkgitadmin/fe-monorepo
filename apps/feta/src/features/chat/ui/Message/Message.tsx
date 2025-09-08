import { MessageContentProps } from '@sendbird/uikit-react/ui/MessageContent';

import { parseData } from '@/features/chat/lib';
import { isAdminMessage } from '@/features/chat/lib/validators/messageValidators';
import { MessageContent } from '@/features/chat/ui/Message//components/MessageContent';
import { AdminMessage } from '@/features/chat/ui/Message/components/AdminMessage';
import { MessageLayout } from '@/features/chat/ui/Message/components/MessageLayout';

export default function Message({
  messageContent,
}: {
  messageContent: MessageContentProps;
}) {
  if (!messageContent) {
    return <></>;
  }

  const { message: _messageContent } = messageContent;
  const { message, messageType, customType, data } = _messageContent;
  const { type: messageInDataType } = parseData(data);

  if (!message || message.length === 0) return <></>;

  // Admin 메시지
  if (isAdminMessage(messageType, customType, messageInDataType)) {
    return <AdminMessage message={message} />;
  }

  return (
    <MessageLayout messageContent={messageContent}>
      <MessageContent messageContent={_messageContent} />
    </MessageLayout>
  );
}
