import { describe, it, afterEach, vi, expect } from "vitest";

import {
  asyncGetThreadDetailAndComments,
  asyncGetUsersAndThreads,
} from "./action";
import { getUsersActionCreator } from "./users/action";
import { getThreadsActionCreator } from "./threads/action";
import { getThreadDetailActionCreator } from "./threadDetail/action";
import { getCommentsActionCreator } from "./comments/action";

const fakeUsers = [
  {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
];

const fakeThreads = [
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
];

describe("asyncGetUsersAndThreads", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should dispatch actions correctly when data fetching success", () => {
    vi.mock("../utils/users", () => {
      return {
        getUsers: vi.fn(() => Promise.resolve(fakeUsers)),
      };
    });

    vi.mock("../utils/threads", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        getThreads: vi.fn(() => Promise.resolve(fakeThreads)),
      };
    });

    const dispatch = vi.fn();

    asyncGetUsersAndThreads(() => {
      expect(dispatch).toHaveBeenCalledWith(getUsersActionCreator(fakeUsers));
      expect(dispatch).toHaveBeenCalledWith(
        getThreadsActionCreator(fakeThreads)
      );
    })(dispatch);
  });
});

const fakeThreadDetail = {
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

const fakeComments = [
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
];

describe("asyncGetThreadDetailAndComments", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should dispatch actions correctly when data fetching success", () => {
    vi.mock("../utils/threads", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        getThread: vi.fn(() =>
          Promise.resolve({ ...fakeThreadDetail, comments: fakeComments })
        ),
      };
    });

    const dispatch = vi.fn();

    asyncGetThreadDetailAndComments(fakeThreadDetail.id, () => {
      expect(dispatch).toHaveBeenCalledWith(
        getThreadDetailActionCreator(fakeThreadDetail)
      );

      expect(dispatch).toHaveBeenCalledWith(
        getCommentsActionCreator(fakeComments)
      );
    })(dispatch);
  });
});
