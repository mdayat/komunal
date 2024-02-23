import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useInput } from "../hooks/useInput";
import { asyncSetAuthUser } from "../states/authUser/action";

// Lazy loaded components
const Head = dynamic(() => import("next/head"));
const LoginForm = dynamic(() =>
  import("../components/LoginForm").then((loginForm) => loginForm.LoginForm)
);

export default function Login() {
  const { push } = useRouter();
  const [error, setError] = useState({ status: "success", message: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const preload = useSelector((states) => states.preload);
  const authUser = useSelector((states) => states.authUser);

  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  if (preload) {
    return null;
  }

  // Push back to home page when user is authenticated
  if (preload === false && authUser !== null) {
    push("/");
    return null;
  }

  function setPasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function submitLogin(event) {
    event.preventDefault();
    const user = {
      email,
      password,
    };

    setLoading(true);
    dispatch(
      asyncSetAuthUser(user, (res) => {
        if (res.status === "success") {
          push("/");
        } else {
          setError(res);
        }
        setLoading(false);
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
