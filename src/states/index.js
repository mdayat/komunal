import { configureStore } from "@reduxjs/toolkit";

// Reducer
import { authUserReducer } from "./authUser/reducer";
import { usersReducer } from "./users/reducer";
import { threadsReducer } from "./threads/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
  },
});

export { store };
