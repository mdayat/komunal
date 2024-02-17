import { ACTION_TYPE } from "./action";

function loadingReducer(loading = false, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_LOADING:
      return true;

    case ACTION_TYPE.UNSET_LOADING:
      return false;

    default:
      return loading;
  }
}

export { loadingReducer };
