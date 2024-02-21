import { getThread, getThreads } from "../utils/threads";
import { getUsers } from "../utils/users";

// Actions
import { getThreadsActionCreator } from "./threads/action";
import { getUsersActionCreator } from "./users/action";
import { getCommentsActionCreator } from "./comments/action";
import { getThreadDetailActionCreator } from "./threadDetail/action";

function asyncGetUsersAndThreads(callback) {
  return (dispatch) => {
    Promise.all([getUsers(), getThreads()])
      .then(([users, threads]) => {
        dispatch(getUsersActionCreator(users));
        dispatch(getThreadsActionCreator(threads));
      })
      .catch((errors) => {
        for (let i = 0; i < errors.length; i++) {
          console.error(errors[i]);
        }
      })
      .finally(() => {
        callback();
      });
  };
}

function asyncGetThreadDetailAndComments(threadID, callback) {
  return (dispatch) => {
    getThread(threadID)
      .then((threadDetail) => {
        const comments = threadDetail.comments;
        delete threadDetail.comments;

        dispatch(getThreadDetailActionCreator(threadDetail));
        dispatch(getCommentsActionCreator(comments));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        callback();
      });
  };
}

export { asyncGetUsersAndThreads, asyncGetThreadDetailAndComments };
