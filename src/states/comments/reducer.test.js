import { describe, it, expect } from "vitest";

import { commentsReducer } from "./reducer";
import { ACTION_TYPE } from "./action";

describe("commentsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = commentsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it(`should return the comments when given by ${ACTION_TYPE.GET_COMMENTS} action`, () => {
    const initialState = [];
    const action = {
      type: ACTION_TYPE.GET_COMMENTS,
      payload: {
        comments: [
          {
            id: "comment-1",
            content: "Ini adalah komentar pertama",
            createdAt: "2021-06-21T07:00:00.000Z",
            owner: {
              id: "users-1",
              name: "John Doe",
              avatar: "https://generated-image-url.jpg",
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.comments);
  });

  it(`should update the comments with the new created comment when given by ${ACTION_TYPE.CREATE_COMMENT} action`, () => {
    const initialState = [];
    const action = {
      type: ACTION_TYPE.CREATE_COMMENT,
      payload: {
        comment: {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState).toContainEqual(action.payload.comment);
  });

  it(`should update the upVotesBy prop with the voter id when given by ${ACTION_TYPE.UP_VOTE_COMMENT} action`, () => {
    const initialState = [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
    ];

    const action = {
      type: ACTION_TYPE.UP_VOTE_COMMENT,
      payload: {
        commentID: initialState[0].id,
        userID: "users-1",
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState[0].upVotesBy).toContainEqual(action.payload.userID);
  });

  it(`should update the downVotesBy prop with the voter id when given by ${ACTION_TYPE.DOWN_VOTE_COMMENT} action`, () => {
    const initialState = [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
    ];

    const action = {
      type: ACTION_TYPE.DOWN_VOTE_COMMENT,
      payload: {
        commentID: initialState[0].id,
        userID: "users-1",
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState[0].downVotesBy).toContainEqual(action.payload.userID);
  });

  it(`should remove the voter id from the upVotesBy prop when given by ${ACTION_TYPE.NEUTRAL_VOTE_THREAD} action`, () => {
    const initialState = [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        upVotesBy: ["users-1"],
        downVotesBy: [],
        owner: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
    ];

    const action = {
      type: ACTION_TYPE.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentID: initialState[0].id,
        userID: "users-1",
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState[0].upVotesBy).not.toContainEqual(action.payload.userID);
  });

  it(`should remove the voter id from the downVotesBy prop when given by ${ACTION_TYPE.NEUTRAL_VOTE_COMMENT} action`, () => {
    const initialState = [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        upVotesBy: [],
        downVotesBy: ["users-1"],
        owner: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
        },
      },
    ];

    const action = {
      type: ACTION_TYPE.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentID: initialState[0].id,
        userID: "users-1",
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState[0].downVotesBy).not.toContainEqual(action.payload.userID);
  });
});
