const ACTION_TYPE = {
  GET_USERS: "users/get",
};

function getUsersActionCreator(users) {
  return {
    type: ACTION_TYPE.GET_USERS,
    payload: {
      users,
    },
  };
}

export { ACTION_TYPE, getUsersActionCreator };
