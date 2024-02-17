import { configureStore } from "@reduxjs/toolkit";

// Reducer
import { authUserReducer } from "./authUser/reducer";
import { loadingReducer } from "./loading/reducer";

const store = configureStore({
  reducer: { authUser: authUserReducer, loading: loadingReducer },
});

export { store };
