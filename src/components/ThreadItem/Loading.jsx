import { Divider, Skeleton } from "@mui/material";
import styles from "../../styles/thread.module.css";

function Loading() {
  return (
    <div className={styles.threadItem}>
      <div className={styles.threadHeader}>
        <div className={styles.threadHeader__profile}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton width={128} height={28} />
        </div>
        <Skeleton width={128} height={20} />
      </div>

      <Skeleton height={28} sx={{ marginBottom: 1 }} />

      <Skeleton height={24} />
      <Skeleton height={24} sx={{ marginBottom: 0.75 }} />

      <div className={styles.threadFooter}>
        <Skeleton variant="text" width={256} height={24} />
        <Skeleton variant="text" width={128} height={36} />
      </div>

      <Divider sx={{ marginTop: 2 }} />
    </div>
  );
}

export { Loading };
