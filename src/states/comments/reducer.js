import { ACTION_TYPE } from "./action";

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ACTION_TYPE.GET_COMMENTS:
      return action.payload.comments;

    default:
      return comments;
  }
}

export { commentsReducer };
