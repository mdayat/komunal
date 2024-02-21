import { Divider, Skeleton } from "@mui/material";
import styles from "../../styles/thread.module.css";

function Loading() {
  return (
    <div className={styles.threadDetail}>
      <div className={styles.threadHeader}>
        <div className={styles.threadHeader__profile}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton width={128} height={32} />
        </div>
        <Skeleton width={128} height={20} />
      </div>

      <Skeleton height={32} sx={{ marginBottom: 2 }} />

      <Skeleton height={24} />
      <Skeleton height={24} />
      <Skeleton height={24} />

      <div className={`${styles.threadFooter} ${styles.threadDetailFooter}`}>
        <Skeleton variant="text" width={256} height={24} />
        <Skeleton variant="text" width={128} height={36} />
      </div>

      <Divider sx={{ marginTop: 2 }} />
    </div>
  );
}

export { Loading };
