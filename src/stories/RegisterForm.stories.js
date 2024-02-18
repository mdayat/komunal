import { RegisterForm } from "../components/RegisterForm";

export default {
  title: "Register Form",
  component: RegisterForm,
  parameters: {
    controls: {
      exclude: [
        "submitRegister",
        "setName",
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
    name: "John Doe",
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
