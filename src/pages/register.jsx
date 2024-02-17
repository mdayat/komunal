import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

import { useInput } from "../hooks/useInput";
import { register } from "../utils/users";

export default function Register() {
  const { push } = useRouter();
  const [error, setError] = useState({ status: "success", message: "" });
  const [loading, setLoading] = useState(false);

  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");

  const [password, setPassword] = useInput("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function submitRegister(event) {
    event.preventDefault();
    const user = {
      name,
      email,
      password,
    };

    setLoading(true);
    register(user)
      .then(() => {
        push("/login");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Create New Account</title>
      </Head>

      <form action="" onSubmit={submitRegister}>
        <input
          required
          type="text"
          name="name"
          placeholder="John Doe"
          autoComplete="off"
          value={name}
          onChange={setName}
        />

        <input
          required
          type="email"
          name="email"
          placeholder="example@gmail.com"
          autoComplete="off"
          value={email}
          onChange={setEmail}
        />

        <input
          required
          type={passwordVisible ? "text" : "password"}
          name="password"
          value={password}
          onChange={setPassword}
        />

        <button type="button" onClick={togglePasswordVisibility}>
          Toggle Password Visible
        </button>

        {error.status !== "success" && <p>{error.message}</p>}
        {loading && <p>LOADING...</p>}

        <button type="submit">Register</button>
      </form>
    </>
  );
}
