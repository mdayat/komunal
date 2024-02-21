import { ACTION_TYPE } from "./action";

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ACTION_TYPE.GET_COMMENTS:
      return action.payload.comments;

    case ACTION_TYPE.UP_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentID) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.concat(action.payload.userID),
            downVotesBy: comment.downVotesBy.filter(
              (userID) => userID !== action.payload.userID
            ),
          };
        }

        return comment;
      });

    case ACTION_TYPE.DOWN_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentID) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (userID) => userID !== action.payload.userID
            ),
            downVotesBy: comment.downVotesBy.concat(action.payload.userID),
          };
        }

        return comment;
      });

    case ACTION_TYPE.NEUTRAL_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentID) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (userID) => userID !== action.payload.userID
            ),
            downVotesBy: comment.downVotesBy.filter(
              (userID) => userID !== action.payload.userID
            ),
          };
        }

        return comment;
      });

    default:
      return comments;
  }
}

export { commentsReducer };
