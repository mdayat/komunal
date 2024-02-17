const ACTION_TYPE = {
  SET_LOADING: "loading/set",
  UNSET_LOADING: "loading/unset",
};

function setLoadingActionCreator() {
  return {
    type: ACTION_TYPE.SET_LOADING,
  };
}

function unsetLoadingActionCreator() {
  return {
    type: ACTION_TYPE.UNSET_LOADING,
  };
}

export { ACTION_TYPE, setLoadingActionCreator, unsetLoadingActionCreator };
