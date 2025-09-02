import { Link } from '@tanstack/react-router';
import styles from './HeadingLogo.module.scss';
export default function HeadingLogo() {
  return (
    <h1 className={styles.logo}>
      <Link to="/features">
        <img src="/logo_feta.png" alt="FETA" />
      </Link>
    </h1>
  );
}
