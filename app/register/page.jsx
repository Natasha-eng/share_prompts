"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { register } from "@lib/actions";
import RegisterForm from "@components/RegisterForm";

const Register = () => {
  const [formState, signupAction, isPending] = useActionState(registerHandler, {
    data: null,
    error: null,
  });

  const router = useRouter();

  async function registerHandler(prevState, formData) {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
      return { ...prevState, error: "Must provide all the credentials" };
    }

    try {
      const res = await register(
        username.trim(),
        email.trim(),
        password.trim(),
      );

      if (res?.user?.username) {
        router.push("/login");
      } else {
        return { ...prevState, error: res.message };
      }
    } catch (err) {
      return { ...prevState, error: err.massage };
    }
  }

  return (
    <RegisterForm
      handleSubmit={signupAction}
      submitting={isPending}
      error={formState?.error}
    />
  );
};

export default Register;
