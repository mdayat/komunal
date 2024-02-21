const ACTION_TYPE = {
  GET_THREAD_DETAIL: "threadDetail/get",
};

function getThreadDetailActionCreator(threadDetail) {
  return {
    type: ACTION_TYPE.GET_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

export { ACTION_TYPE, getThreadDetailActionCreator };
