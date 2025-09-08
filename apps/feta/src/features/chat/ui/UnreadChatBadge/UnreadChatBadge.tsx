import { memo } from 'react';

import { useTotalNotificationStore } from '@/features/notifications/store/useTotalNotificationStore';

import styles from './UnreadChatBadge.module.scss';

const UnreadChatBadge = ({
  className,
  type,
}: {
  className?: string;
  type: 'friend' | 'message';
}) => {
  const { chatUnreadCount, friendRequestCount } = useTotalNotificationStore();

  if (type === 'message') {
    if (chatUnreadCount <= 0) return null;
    const displayCount = chatUnreadCount > 999 ? '999+' : chatUnreadCount;

    return <div className={`${styles.badge} ${className}`}>{displayCount}</div>;
  }

  if (type === 'friend') {
    if (friendRequestCount <= 0) return null;
    const displayCount = friendRequestCount > 999 ? '999+' : friendRequestCount;

    return <div className={`${styles.badge} ${className}`}>{displayCount}</div>;
  }
};

export default memo(UnreadChatBadge);
