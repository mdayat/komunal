import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { LoginForm } from "../components/LoginForm";
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

  function setPasswordVisibility() {
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
        <title>Login | Komunal</title>
      </Head>

      <LoginForm
        submitLogin={submitLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        passwordVisible={passwordVisible}
        setPasswordVisibility={setPasswordVisibility}
        error={error.status !== "success"}
        errorMessage={error.message}
        loading={loading}
      />
    </>
  );
}
