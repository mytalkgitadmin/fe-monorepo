import { CoreMessageType } from '../FileMessage/FileMessage';
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
