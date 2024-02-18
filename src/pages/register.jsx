import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

import { RegisterForm } from "../components/RegisterForm";
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

  function setPasswordVisibility() {
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
        <title>Register | Komunal</title>
      </Head>

      <RegisterForm
        submitRegister={submitRegister}
        name={name}
        setName={setName}
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
