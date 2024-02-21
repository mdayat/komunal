import {
  downVoteThread,
  neutralVoteThread,
  upVoteThread,
} from "../../utils/threads";

const ACTION_TYPE = {
  GET_THREAD_DETAIL: "threadDetail/get",
  UP_VOTE_THREAD: "voteThread/up",
  DOWN_VOTE_THREAD: "voteThread/down",
  NEUTRAL_VOTE_THREAD: "voteThread/neutral",
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

function asyncUpVoteThread(threadID, userID) {
  return (dispatch) => {
    dispatch(upVoteThreadActionCreator(userID));
    upVoteThread(threadID).catch((err) => {
      console.error(err);
      dispatch(neutralVoteThreadActionCreator(userID));
    });
  };
}

function asyncDownVoteThread(threadID, userID) {
  return (dispatch) => {
    dispatch(downVoteThreadActionCreator(userID));
    downVoteThread(threadID).catch((err) => {
      console.error(err);
      dispatch(neutralVoteThreadActionCreator(userID));
    });
  };
}

function asyncNeutralVoteThread(threadID, userID) {
  return (dispatch) => {
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
