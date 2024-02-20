import { ACTION_TYPE } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ACTION_TYPE.GET_THREADS:
      return action.payload.threads;

    case ACTION_TYPE.CREATE_THREAD:
      return [action.payload.thread, ...threads];

    default:
      return threads;
  }
}

export { threadsReducer };
