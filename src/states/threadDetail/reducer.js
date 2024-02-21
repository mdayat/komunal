import { ACTION_TYPE } from "./action";

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ACTION_TYPE.GET_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ACTION_TYPE.UP_VOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.concat(action.payload.userID),
        downVotesBy: threadDetail.downVotesBy.filter(
          (userID) => userID !== action.payload.userID
        ),
      };

    case ACTION_TYPE.DOWN_VOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (userID) => userID !== action.payload.userID
        ),
        downVotesBy: threadDetail.downVotesBy.concat(action.payload.userID),
      };

    case ACTION_TYPE.NEUTRAL_VOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (userID) => userID !== action.payload.userID
        ),
        downVotesBy: threadDetail.downVotesBy.filter(
          (userID) => userID !== action.payload.userID
        ),
      };

    default:
      return threadDetail;
  }
}

export { threadDetailReducer };
