import { ACTION_TYPE } from "./action";

function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ACTION_TYPE.GET_USERS:
      return action.payload.users;

    default:
      return users;
  }
}

export { usersReducer };
