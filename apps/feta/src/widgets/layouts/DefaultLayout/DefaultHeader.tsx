import { Link } from '@tanstack/react-router';

import { HeadingLogo } from '@/shared/ui/HeadingLogo';

import { useAuthStore } from '@/features/auth/authStore';

import styles from './DefaultHeader.module.scss';

export default function DefaultHeader() {
  const { isAuthenticated } = useAuthStore();
  return (
    <header className={styles.header}>
      <div className='max-width'>
        <HeadingLogo />
        {!isAuthenticated ? (
          <Link to='/login' className={styles.btn}>
            로그인
          </Link>
        ) : (
          <Link to='/friends' className={styles.btn}>
            FETA 열기
          </Link>
        )}
      </div>
    </header>
  );
}
