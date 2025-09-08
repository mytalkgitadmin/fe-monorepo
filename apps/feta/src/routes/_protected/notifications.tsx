import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/notifications')({
  component: Notifications,
});

function Notifications() {
  return (
    <section className='max-width'>
      <h2>알림설정</h2>
      {/* <NotificationPermissionManager />
      <NotificationList /> */}
    </section>
  );
}
