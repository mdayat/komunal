import { ACTION_TYPE } from "./action";

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ACTION_TYPE.GET_THREAD_DETAIL:
      return action.payload.threadDetail;

    default:
      return threadDetail;
  }
}

export { threadDetailReducer };
