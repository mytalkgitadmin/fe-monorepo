import { CoreMessageType } from '@/features/chat/ui/Message/components/FileMessage/FileMessage';

import BubbleInner from './BubbleInner';
import styles from './BubbleMessage.module.scss';

export default function BubbleMessage({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  if (!messageContent) return;

  return (
    <div className={`bubble ${styles.messageWrap}`}>
      <BubbleInner messageContent={messageContent} />
    </div>
  );
}
