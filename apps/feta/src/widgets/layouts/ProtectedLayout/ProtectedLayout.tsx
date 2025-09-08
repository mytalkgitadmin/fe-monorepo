import { useLocation } from '@tanstack/react-router';

import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

import MobileHeader from './MobileHeader';
import ProtectedHeader from './ProtectedHeader';
import styles from './ProtectedLayout.module.scss';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery(500);
  const location = useLocation();
  const renderHeader = () => {
    if (isMobile && location.pathname === '/chat') {
      return null;
    }
    if (isMobile) {
      return <MobileHeader />;
    }
    return <ProtectedHeader />;
  };
  return (
    <div className={`${styles.layoutWrap} ${isMobile ? styles.mobile : ''}`}>
      {renderHeader()}
      {children}
    </div>
  );
}
