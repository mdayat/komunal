const ACTION_TYPE = {
  GET_THREADS: "threads/get",
};

function getThreadsActionCreator(threads) {
  return {
    type: ACTION_TYPE.GET_THREADS,
    payload: { threads },
  };
}

export { ACTION_TYPE, getThreadsActionCreator };
