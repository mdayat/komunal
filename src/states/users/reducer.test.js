import { describe, it, expect } from "vitest";

import { usersReducer } from "./reducer";
import { ACTION_TYPE } from "./action";

describe("usersReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = usersReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it(`should return the users when given by ${ACTION_TYPE.GET_USERS} action`, () => {
    const initialState = [];
    const action = {
      type: ACTION_TYPE.GET_USERS,
      payload: {
        users: [
          {
            id: "john_doe",
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://generated-image-url.jpg",
          },
        ],
      },
    };

    const nextState = usersReducer(initialState, action);
    expect(nextState).toEqual(action.payload.users);
  });
});
