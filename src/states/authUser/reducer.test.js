import { describe, it, expect } from "vitest";

import { authUserReducer } from "./reducer";
import { ACTION_TYPE } from "./action";

describe("authUserReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = null;
    const action = { type: "UNKNOWN" };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it(`should return the authenticated user when given by ${ACTION_TYPE.SET_AUTH_USER} action`, () => {
    const initialState = null;
    const action = {
      type: ACTION_TYPE.SET_AUTH_USER,
      payload: {
        authUser: {
          id: "john_doe",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg",
        },
      },
    };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(action.payload.authUser);
  });

  it(`should invalidate the authenticated user when given by ${ACTION_TYPE.UNSET_AUTH_USER} action`, () => {
    const initialState = {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    };
    const action = {
      type: ACTION_TYPE.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(null);
  });
});
