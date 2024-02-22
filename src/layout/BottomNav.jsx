import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";

import { asyncPreloadProcess } from "../states/preload/action";
import { unsetAuthUserActionCreator } from "../states/authUser/action";

import styles from "../styles/navigation.module.css";

// Dynamic loaded components
const ForumIcon = dynamic(() => import("@mui/icons-material/Forum"));
const LoginIcon = dynamic(() => import("@mui/icons-material/Login"));
const LogoutIcon = dynamic(() => import("@mui/icons-material/Logout"));

function BottomNav() {
  const { pathname } = useRouter();

  const authUser = useSelector((states) => states.authUser);
  const preload = useSelector((states) => states.preload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (preload) {
    return (
      <nav className={styles.nav}>
        <Skeleton width={44} height={44} />
        <Skeleton width={44} height={44} />
      </nav>
    );
  }

  function logout() {
    dispatch(unsetAuthUserActionCreator());
    localStorage.removeItem("accessToken");
  }

  const threadNavColor = pathname === "/" ? styles.navItem__active : "";
  const loginNavColor = pathname === "/login" ? styles.navItem__active : "";

  return (
    <nav className={styles.nav}>
      <Link href="/" className={`${styles.navItem} ${threadNavColor}`}>
        <ForumIcon color={pathname === "/" ? "primary" : "action"} />
        <p>Threads</p>
      </Link>

      {authUser === null ? (
        <Link href="/login" className={`${styles.navItem} ${loginNavColor}`}>
          <LoginIcon color={pathname === "/login" ? "primary" : "action"} />
          <p>Login</p>
        </Link>
      ) : (
        <button
          type="button"
          className={`${styles.navItem} ${styles.navItem__logout}`}
          onClick={logout}
        >
          <LogoutIcon color="error" />
          <p>Logout</p>
        </button>
      )}
    </nav>
  );
}

export { BottomNav };
