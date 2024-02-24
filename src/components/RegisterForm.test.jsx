import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toHaveValue } from "@testing-library/jest-dom/matchers";
import { RegisterForm } from "./RegisterForm";

expect.extend({ toHaveValue });

describe("RegisterForm component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle username typing correctly", async () => {
    render(<RegisterForm />);
    const usernameInput = screen.getByPlaceholderText("Name");
    await userEvent.type(usernameInput, "john doe");
    expect(usernameInput).toHaveValue("john doe");
  });

  it("should handle email typing correctly", async () => {
    render(<RegisterForm />);
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "example@gmail.com");
    expect(emailInput).toHaveValue("example@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "examplepassword");
    expect(passwordInput).toHaveValue("examplepassword");
  });

  it("should handle password typing correctly", async () => {
    const submitRegister = vi.fn();
    render(<RegisterForm submitRegister={submitRegister} />);

    const usernameInput = screen.getByPlaceholderText("Name");
    await userEvent.type(usernameInput, "john doe");

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "example@gmail.com");

    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "examplepassword");

    const loginButton = screen.getByRole("button", { name: "Register" });
    await userEvent.click(loginButton);

    expect(submitRegister).toBeCalled();
  });
});
