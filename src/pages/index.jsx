import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { asyncGetUsersAndThreads } from "../states/action";

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
  const users = useSelector((states) => states.users);
  const threads = useSelector((states) => states.threads);
  const loading = useSelector((states) => states.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetUsersAndThreads());
  }, [dispatch]);

  let threadList = [];
  if (users.length !== 0 && threads.length !== 0) {
    threadList = threads.map((thread) => {
      const threadOwner = getThreadOwner(users, thread.ownerId);
      return { ...thread, owner: threadOwner };
    });
  }

  return (
    <>
      <Head>
        <title>Komunal | Komunikasi Massal</title>
      </Head>

      <main>{loading && <p>LOADING...</p>}</main>
    </>
  );
}
