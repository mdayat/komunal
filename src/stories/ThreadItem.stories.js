import { Provider } from "react-redux";

import { ThreadItem } from "../components/ThreadItem";
import { ThreadListLoading } from "../components/ThreadListLoading";
import { store } from "../states";

const thread = {
  id: "thread-1",
  title: "First Thread",
  body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  ownerId: "users-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  owner: {
    id: "users-1",
    name: "John Doe",
    avatar: "https://generated-image-url.jpg",
  },
};

export default {
  title: "Thread Item",
  component: ThreadItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export const Loading = {
  render: () => <ThreadListLoading />,
};

export const Normal = {
  args: { loading: false, ...thread },
};
