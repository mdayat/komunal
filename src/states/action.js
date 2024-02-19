import { getThreads } from "../utils/threads";
import { getUsers } from "../utils/users";

// Actions
import { getThreadsActionCreator } from "./threads/action";
import { getUsersActionCreator } from "./users/action";

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

export { asyncGetUsersAndThreads };
