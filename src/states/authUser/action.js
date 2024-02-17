import { getProfile, login } from "../../utils/users";
import {
  setLoadingActionCreator,
  unsetLoadingActionCreator,
} from "../loading/action";

const ACTION_TYPE = {
  SET_AUTH_USER: "authUser/set",
  UNSET_AUTH_USER: "authUser/unset",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ACTION_TYPE.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ACTION_TYPE.SET_AUTH_USER,
  };
}

function asyncSetAuthUser(user, callback) {
  return (dispatch) => {
    dispatch(setLoadingActionCreator());
    login(user)
      .then((accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        getProfile()
          .then((res) => {
            if (res.status === "success") {
              dispatch(setAuthUserActionCreator(res.data.user));
            } else {
              const err = new Error(res.message);
              console.error(err);
            }

            callback(res);
          })
          .finally(() => {
            dispatch(unsetLoadingActionCreator());
          });
      })
      .catch((res) => {
        callback(res);
      })
      .finally(() => {
        dispatch(unsetLoadingActionCreator());
      });
  };
}

export {
  ACTION_TYPE,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
};
