import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

// import ReloadPrompt from '@fsd/widgets/ReloadPrompt';
import { useEffect } from 'react';

export default function App() {
  // const isOnline = useOnlineStatus();

  useEffect(() => {}, []);

  // if (!isOnline) {
  //   return <OfflinePage />;
  // }

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
      {/* <ReloadPrompt /> */}
    </>
  );
}
