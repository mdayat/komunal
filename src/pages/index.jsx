import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";

import { Loading as ThreadItemLoading } from "../components/ThreadItem/Loading";
import { asyncGetUsersAndThreads } from "../states/action";
import { asyncPreloadProcess } from "../states/preload/action";

import styles from "../styles/home.module.css";

// Lazy loaded components
const Snackbar = dynamic(() => import("@mui/material/Snackbar"));
const ThreadItem = dynamic(() =>
  import("../components/ThreadItem").then((threadItem) => threadItem.ThreadItem)
);
const CreateThread = dynamic(() =>
  import("../components/CreateThread").then(
    (threadItem) => threadItem.CreateThread
  )
);

function getThreadOwner(users, ownerID) {
  const threadOwner = { id: "", name: "", avatar: "" };
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === ownerID) {
      threadOwner.id = users[i].id;
      threadOwner.name = users[i].name;
      threadOwner.avatar = users[i].avatar;
      break;
    }
  }
  return threadOwner;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [dialogOpened, setDialogOpened] = useState(false);

  const users = useSelector((states) => states.users);
  const threads = useSelector((states) => states.threads);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  function openDialog() {
    setDialogOpened(true);
  }

  function closeDialog() {
    setDialogOpened(false);
  }

  useEffect(() => {
    dispatch(asyncPreloadProcess());
    dispatch(
      asyncGetUsersAndThreads(() => {
        setLoading(false);
      })
    );
  }, [dispatch]);

  let threadList = [];
  if (users.length !== 0 && threads.length !== 0) {
    threadList = threads.map((thread) => {
      const threadOwner = getThreadOwner(users, thread.ownerId);
      // I'm not using spread operator because i don't need "ownerId" property
      return {
        id: thread.id,
        title: thread.title,
        body: thread.body,
        category: thread.category,
        createdAt: thread.createdAt,
        upVotesBy: thread.upVotesBy,
        downVotesBy: thread.downVotesBy,
        totalComments: thread.totalComments,
        owner: threadOwner,
      };
    });
  }

  return (
    <>
      <Head>
        <title>Komunal | Komunikasi Massal</title>
      </Head>

      <section className={styles.threadListHeader}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: 600, lineHeight: "normal" }}
        >
          All Threads
        </Typography>

        <Button disableElevation variant="contained" onClick={openDialog}>
          New Thread
        </Button>

        {authUser !== null && dialogOpened && (
          <CreateThread dialogOpened={dialogOpened} closeDialog={closeDialog} />
        )}

        {authUser === null && dialogOpened && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={dialogOpened}
            onClose={closeDialog}
            autoHideDuration={5000}
            message="You need to login before create a thread"
          />
        )}
      </section>

      {loading ? (
        <ThreadItemLoading />
      ) : (
        threadList.map((thread) => <ThreadItem key={thread.id} {...thread} />)
      )}
    </>
  );
}
