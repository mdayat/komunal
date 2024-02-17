import { configureStore } from "@reduxjs/toolkit";

// Reducer
import { authUserReducer } from "./authUser/reducer";
import { loadingReducer } from "./loading/reducer";
import { usersReducer } from "./users/reducer";
import { threadsReducer } from "./threads/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    loading: loadingReducer,
    users: usersReducer,
    threads: threadsReducer,
  },
});

export { store };
