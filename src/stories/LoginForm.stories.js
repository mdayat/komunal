import { LoginForm } from "../components/LoginForm";

export default {
  title: "Login Form",
  component: LoginForm,
  parameters: {
    controls: {
      exclude: [
        "submitLogin",
        "setEmail",
        "setPassword",
        "setPasswordVisibility",
      ],
    },
  },
  tags: ["autodocs"],
};

export const Empty = {};

export const Filled = {
  args: {
    email: "example@gmail.com",
    password: "examplepassword",
  },
};

export const ErrorFilled = {
  args: {
    ...Filled.args,
    error: true,
    errorMessage: "Example of error message",
  },
};

export const Loading = {
  args: {
    ...Filled.args,
    loading: true,
  },
};
