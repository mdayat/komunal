import { configureStore } from "@reduxjs/toolkit";

// Reducer
import { authUserReducer } from "./authUser/reducer";
import { usersReducer } from "./users/reducer";
import { threadsReducer } from "./threads/reducer";
import { preloadReducer } from "./preload/reducer";

const store = configureStore({
  reducer: {
    preload: preloadReducer,
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
  },
});

export { store };
