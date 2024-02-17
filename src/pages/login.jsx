import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useInput } from "../hooks/useInput";
import { asyncSetAuthUser } from "../states/authUser/action";

export default function Login() {
  const { push } = useRouter();
  const [error, setError] = useState({ status: "success", message: "" });
  const loading = useSelector((states) => states.loading);
  const dispatch = useDispatch();

  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function submitLogin(event) {
    event.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(
      asyncSetAuthUser(user, (res) => {
        if (res.status === "success") {
          push("/");
        } else {
          setError(res);
        }
      })
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login | Komunal</title>
      </Head>

      <form action="" onSubmit={submitLogin}>
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
          name="password"
          min={6}
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={setPassword}
        />

        <button type="button" onClick={togglePasswordVisibility}>
          Toggle Password Visible
        </button>

        {error.status !== "success" && <p>{error.message}</p>}
        {loading && <p>LOADING...</p>}

        <button type="submit">Login</button>
      </form>
    </>
  );
}
