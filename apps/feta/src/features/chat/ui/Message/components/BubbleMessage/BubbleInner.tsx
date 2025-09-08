import defaultBubble from '@/assets/bubble/Emoji_Bubble_Type01.webp';

import { BASE_URL } from '@/shared/api/endpoints';

import { decryptData } from '@/features/chat/lib';
import { parseData } from '@/features/chat/lib';

import { CoreMessageType } from '../FileMessage/FileMessage';
import styles from './BubbleMessage.module.scss';

export default function BubbleInner({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  if (!messageContent) return;
  const { data } = messageContent;

  const thumbUrl = parseData(data)?.resource.thumbUrl;

  return (
    <>
      {messageContent.message !== 'EMOTICON' && (
        <div className={styles.talkBubble}>
          <img src={defaultBubble} alt='' />
          <span className={styles.innerText}>
            {decryptData(messageContent.message)}
          </span>
        </div>
      )}
      <img
        className={styles.emoticon}
        src={`${BASE_URL}${thumbUrl}`}
        alt=''
        width={140}
        height={140}
      />
    </>
  );
}
