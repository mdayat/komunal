import { getThreads } from "../utils/threads";
import { getUsers } from "../utils/users";

// Actions
import {
  setLoadingActionCreator,
  unsetLoadingActionCreator,
} from "./loading/action";
import { getThreadsActionCreator } from "./threads/action";
import { getUsersActionCreator } from "./users/action";

function asyncGetUsersAndThreads() {
  return (dispatch) => {
    dispatch(setLoadingActionCreator());
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
        dispatch(unsetLoadingActionCreator());
      });
  };
}

export { asyncGetUsersAndThreads };
