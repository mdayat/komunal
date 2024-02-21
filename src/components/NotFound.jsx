import Link from "next/link";
import { Button, Typography } from "@mui/material";

import styles from "../styles/not-found.module.css";

function NotFound() {
  return (
    <article className={styles.notFoundContainer}>
      <Typography gutterBottom variant="h4" component="h1">
        Ooops! Page not found!
      </Typography>

      <Typography
        gutterBottom
        paragraph
        variant="body1"
        sx={{ textAlign: "center", maxWidth: 444 }}
      >
        It looks like you are trying to access a page that has been deleted or
        never even existed.
      </Typography>

      <Button disableElevation variant="contained">
        <Link href="/">Back to home</Link>
      </Button>
    </article>
  );
}

export { NotFound };
