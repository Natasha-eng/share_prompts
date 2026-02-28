"use client";

import LoginForm from "@components/LoginForm";
import { authenticate } from "@lib/actions";
import { useActionState } from "react";

const Login = () => {
  const [formState, signinAction, isPending] = useActionState(loginHandler, {
    data: null,
    error: null,
  });

  async function loginHandler(prevState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await authenticate(username.trim(), password.trim());
    } catch (err) {
      return { ...prevState, error: err.message };
    }
  }

  return (
    <div>
      <LoginForm
        handleSubmit={signinAction}
        submitting={isPending}
        error={formState?.error}
      />
    </div>
  );
};

export default Login;
