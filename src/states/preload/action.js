import { getProfile } from "../../utils/users";
import { setAuthUserActionCreator } from "../authUser/action";

const ACTION_TYPE = {
  SET_PRELOAD: "preload/set",
};

function setPreloadActionCreator(preload) {
  return {
    type: ACTION_TYPE.SET_PRELOAD,
    payload: {
      preload,
    },
  };
}

function asyncPreloadProcess() {
  return (dispatch) => {
    getProfile()
      .then((res) => {
        if (res.status === "success") {
          dispatch(setAuthUserActionCreator(res.data.user));
        } else {
          dispatch(setAuthUserActionCreator(null));
        }
      })
      .finally(() => {
        dispatch(setPreloadActionCreator(false));
      });
  };
}

export { ACTION_TYPE, asyncPreloadProcess };
