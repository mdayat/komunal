import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toHaveValue } from "@testing-library/jest-dom/matchers";
import { LoginForm } from "./LoginForm";

expect.extend({ toHaveValue });

describe("LoginForm component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle email typing correctly", async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "example@gmail.com");
    expect(emailInput).toHaveValue("example@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    render(<LoginForm />);
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "examplepassword");
    expect(passwordInput).toHaveValue("examplepassword");
  });

  it("should handle password typing correctly", async () => {
    const submitLogin = vi.fn();
    render(<LoginForm submitLogin={submitLogin} />);

    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "example@gmail.com");

    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "examplepassword");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await userEvent.click(loginButton);

    expect(submitLogin).toBeCalled();
  });
});
