import {
  AdminMessage,
  BaseMessage,
  FileMessage as FileMessageType,
  MultipleFilesMessage,
  UserMessage,
} from '@sendbird/chat/message';

import Icons from '@/shared/ui/Icons';

import { parseData } from '@/features/chat/lib';

import File from './File';
import styles from './FileMessage.module.scss';
import ImageFile from './ImageFile';
import VideoFile from './VideoFile';

export type CoreMessageType =
  | BaseMessage
  | AdminMessage
  | UserMessage
  | FileMessageType
  | MultipleFilesMessage;

export interface Resource {
  fileType: 'document' | 'video' | 'image' | 'webp' | 'gif';
  originalFileName: string;
  originalFileSize: number;
  originalUrl: string;
  thumbUrl: string | null;
  shared: boolean;
}
export default function FileMessage({
  messageContent,
}: {
  messageContent: CoreMessageType;
}) {
  if (!messageContent) return;

  const parsedDate = parseData(messageContent.data);

  let messageInData = null;

  let fileMessageType = null;
  if (parsedDate) {
    fileMessageType = parsedDate?.resource[0].fileType || '';
    messageInData = parsedDate?.resource || [];
  }

  // const messageInData = parseData(messageContent.data)?.resource[0] || '';

  const IMAGE_FILE_TYPES = ['gif', 'image', 'webp'];
  const FILE_TYPES = ['document', 'audio'];

  if (!(messageInData && messageInData[0]))
    return (
      <span className={styles.nodata}>
        <Icons name='alert' />
        파일을 찾을 수 없습니다
      </span>
    );

  return (
    <div className={`file ${styles.messageWrap}`}>
      {IMAGE_FILE_TYPES.includes(fileMessageType) ? (
        <ImageFile messageInData={messageInData} />
      ) : fileMessageType === 'video' ? (
        <VideoFile messageInData={messageInData[0]} />
      ) : FILE_TYPES.includes(fileMessageType) ? (
        <File messageInData={messageInData[0]} />
      ) : (
        <File messageInData={messageInData[0]} />
      )}
    </div>
  );
}
