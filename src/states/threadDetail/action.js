import {
  downVoteThread,
  neutralVoteThread,
  upVoteThread,
} from "../../utils/threads";

const ACTION_TYPE = {
  GET_THREAD_DETAIL: "threadDetail/get",
  UP_VOTE_THREAD: "threadDetail/upVote",
  DOWN_VOTE_THREAD: "threadDetail/downVote",
  NEUTRAL_VOTE_THREAD: "threadDetail/neutralVote",
};

function getThreadDetailActionCreator(threadDetail) {
  return {
    type: ACTION_TYPE.GET_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function upVoteThreadActionCreator(userID) {
  return {
    type: ACTION_TYPE.UP_VOTE_THREAD,
    payload: {
      userID,
    },
  };
}

function downVoteThreadActionCreator(userID) {
  return {
    type: ACTION_TYPE.DOWN_VOTE_THREAD,
    payload: {
      userID,
    },
  };
}

function neutralVoteThreadActionCreator(userID) {
  return {
    type: ACTION_TYPE.NEUTRAL_VOTE_THREAD,
    payload: {
      userID,
    },
  };
}

function asyncUpVoteThread() {
  return (dispatch, getState) => {
    const threadID = getState().threadDetail.id;
    const userID = getState().authUser.id;

    dispatch(upVoteThreadActionCreator(userID));
    upVoteThread(threadID).catch((err) => {
      console.error(err);
      dispatch(neutralVoteThreadActionCreator(userID));
    });
  };
}

function asyncDownVoteThread() {
  return (dispatch, getState) => {
    const threadID = getState().threadDetail.id;
    const userID = getState().authUser.id;

    dispatch(downVoteThreadActionCreator(userID));
    downVoteThread(threadID).catch((err) => {
      console.error(err);
      dispatch(neutralVoteThreadActionCreator(userID));
    });
  };
}

function asyncNeutralVoteThread() {
  return (dispatch, getState) => {
    const threadID = getState().threadDetail.id;
    const userID = getState().authUser.id;

    dispatch(neutralVoteThreadActionCreator(userID));
    neutralVoteThread(threadID).catch((err) => {
      console.error(err);
    });
  };
}

export {
  ACTION_TYPE,
  getThreadDetailActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};
