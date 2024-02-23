import { describe, it, expect } from "vitest";

import { threadDetailReducer } from "./reducer";
import { ACTION_TYPE } from "./action";

describe("threadDetailReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = null;
    const action = { type: "UNKNOWN" };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it(`should return the threadDetail when given by ${ACTION_TYPE.GET_THREAD_DETAIL} action`, () => {
    const initialState = null;
    const action = {
      type: ACTION_TYPE.GET_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: "thread-1",
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it(`should update the upVotesBy prop with the voter id when given by ${ACTION_TYPE.UP_VOTE_THREAD} action`, () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: ACTION_TYPE.UP_VOTE_THREAD,
      payload: {
        userID: "users-1",
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.upVotesBy).toContainEqual(action.payload.userID);
  });

  it(`should update the downVotesBy prop with the voter id when given by ${ACTION_TYPE.DOWN_VOTE_THREAD} action`, () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: ACTION_TYPE.DOWN_VOTE_THREAD,
      payload: {
        userID: "users-1",
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.downVotesBy).toContainEqual(action.payload.userID);
  });

  it(`should remove the voter id from the upVotesBy prop when given by ${ACTION_TYPE.NEUTRAL_VOTE_THREAD} action`, () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: ["users-1"],
      downVotesBy: [],
    };

    const action = {
      type: ACTION_TYPE.NEUTRAL_VOTE_THREAD,
      payload: {
        userID: "users-1",
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.upVotesBy).not.toContainEqual(action.payload.userID);
  });

  it(`should remove the voter id from the downVotesBy prop when given by ${ACTION_TYPE.NEUTRAL_VOTE_THREAD} action`, () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: ["users-1"],
    };

    const action = {
      type: ACTION_TYPE.NEUTRAL_VOTE_THREAD,
      payload: {
        userID: "users-1",
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.downVotesBy).not.toContainEqual(action.payload.userID);
  });
});
