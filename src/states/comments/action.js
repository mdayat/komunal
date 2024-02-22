import {
  createComment,
  downVoteComment,
  neutralVoteComment,
  upVoteComment,
} from "../../utils/comments";

const ACTION_TYPE = {
  GET_COMMENTS: "comments/get",
  CREATE_COMMENT: "comments/create",
  UP_VOTE_COMMENT: "comments/upVote",
  DOWN_VOTE_COMMENT: "comments/downVote",
  NEUTRAL_VOTE_COMMENT: "comments/neutralVote",
};

function getCommentsActionCreator(comments) {
  return {
    type: ACTION_TYPE.GET_COMMENTS,
    payload: {
      comments,
    },
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ACTION_TYPE.CREATE_COMMENT,
    payload: {
      comment,
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

function asyncCreateComment(comment, callback) {
  return (dispatch, getState) => {
    const threadID = getState().threadDetail.id;
    createComment(comment, threadID)
      .then((comment) => {
        dispatch(createCommentActionCreator(comment));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        callback();
      });
  };
}

function asyncUpVoteComment(commentID) {
  return (dispatch, getState) => {
    const threadID = getState().threadDetail.id;
    const userID = getState().authUser.id;

    dispatch(upVoteCommentActionCreator(commentID, userID));
    upVoteComment(threadID, commentID).catch((err) => {
      console.error(err);
      dispatch(neutralVoteCommentActionCreator(commentID, userID));
    });
  };
}

function asyncDownVoteComment(commentID) {
  return (dispatch, getState) => {
    const threadID = getState().threadDetail.id;
    const userID = getState().authUser.id;

    dispatch(downVoteCommentActionCreator(commentID, userID));
    downVoteComment(threadID, commentID).catch((err) => {
      console.error(err);
      dispatch(neutralVoteCommentActionCreator(commentID, userID));
    });
  };
}

function asyncNeutralVoteComment(commentID) {
  return (dispatch, getState) => {
    const threadID = getState().threadDetail.id;
    const userID = getState().authUser.id;

    dispatch(neutralVoteCommentActionCreator(commentID, userID));
    neutralVoteComment(threadID, commentID).catch((err) => {
      console.error(err);
    });
  };
}

export {
  ACTION_TYPE,
  getCommentsActionCreator,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};
