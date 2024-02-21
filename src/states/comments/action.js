import {
  downVoteComment,
  neutralVoteComment,
  upVoteComment,
} from "../../utils/comments";

const ACTION_TYPE = {
  GET_COMMENTS: "comments/get",
  UP_VOTE_COMMENT: "voteComment/up",
  DOWN_VOTE_COMMENT: "voteComment/down",
  NEUTRAL_VOTE_COMMENT: "voteComment/neutral",
};

function getCommentsActionCreator(comments) {
  return {
    type: ACTION_TYPE.GET_COMMENTS,
    payload: {
      comments,
    },
  };
}

function upVoteCommentActionCreator(commentID, userID) {
  return {
    type: ACTION_TYPE.UP_VOTE_COMMENT,
    payload: {
      commentID,
      userID,
    },
  };
}

function downVoteCommentActionCreator(commentID, userID) {
  return {
    type: ACTION_TYPE.DOWN_VOTE_COMMENT,
    payload: {
      commentID,
      userID,
    },
  };
}

function neutralVoteCommentActionCreator(commentID, userID) {
  return {
    type: ACTION_TYPE.NEUTRAL_VOTE_COMMENT,
    payload: {
      commentID,
      userID,
    },
  };
}

function asyncUpVoteComment(threadID, commentID, userID) {
  return (dispatch) => {
    dispatch(upVoteCommentActionCreator(commentID, userID));
    upVoteComment(threadID, commentID).catch((err) => {
      console.error(err);
      dispatch(neutralVoteCommentActionCreator(commentID, userID));
    });
  };
}

function asyncDownVoteComment(threadID, commentID, userID) {
  return (dispatch) => {
    dispatch(downVoteCommentActionCreator(commentID, userID));
    downVoteComment(threadID, commentID).catch((err) => {
      console.error(err);
      dispatch(neutralVoteCommentActionCreator(commentID, userID));
    });
  };
}

function asyncNeutralVoteComment(threadID, commentID, userID) {
  return (dispatch) => {
    dispatch(neutralVoteCommentActionCreator(commentID, userID));
    neutralVoteComment(threadID, commentID).catch((err) => {
      console.error(err);
    });
  };
}

export {
  ACTION_TYPE,
  getCommentsActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};
