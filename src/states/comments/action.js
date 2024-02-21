const ACTION_TYPE = {
  GET_COMMENTS: "comments/get",
};

function getCommentsActionCreator(comments) {
  return {
    type: ACTION_TYPE.GET_COMMENTS,
    payload: {
      comments,
    },
  };
}

export { ACTION_TYPE, getCommentsActionCreator };
