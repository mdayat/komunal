import { describe, it, expect } from "vitest";

import { threadsReducer } from "./reducer";
import { ACTION_TYPE } from "./action";

describe("threadsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it(`should return the threads when given by ${ACTION_TYPE.GET_THREADS} action`, () => {
    const initialState = [];
    const action = {
      type: ACTION_TYPE.GET_THREADS,
      payload: {
        threads: [
          {
            id: "thread-1",
            title: "Thread Pertama",
            body: "Ini adalah thread pertama",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "users-1",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it(`should update the threads with the new created thread when given by ${ACTION_TYPE.CREATE_THREAD} action`, () => {
    const initialState = [];
    const action = {
      type: ACTION_TYPE.CREATE_THREAD,
      payload: {
        thread: {
          id: "thread-1",
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          ownerId: "users-1",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toContainEqual(action.payload.thread);
  });
});
