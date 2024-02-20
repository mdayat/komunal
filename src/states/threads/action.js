import { createThread } from "../../utils/threads";
import { unsetAuthUserActionCreator } from "../authUser/action";

const ACTION_TYPE = {
  GET_THREADS: "threads/get",
  CREATE_THREAD: "threads/create",
};

function getThreadsActionCreator(threads) {
  return {
    type: ACTION_TYPE.GET_THREADS,
    payload: { threads },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ACTION_TYPE.CREATE_THREAD,
    payload: { thread },
  };
}

function asyncCreateThread(thread, callback) {
  return (dispatch) => {
    createThread(thread)
      .then((thread) => {
        dispatch(createThreadActionCreator(thread));
      })
      .catch((err) => {
        // If the cause of the error is "invalid" token,
        // then remove access token and invalidate user session
        localStorage.removeItem("accessToken");
        dispatch(unsetAuthUserActionCreator());

        console.error(err);
      })
      .finally(() => {
        callback();
      });
  };
}

export { ACTION_TYPE, getThreadsActionCreator, asyncCreateThread };
