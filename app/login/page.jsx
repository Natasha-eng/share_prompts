"use client";

import LoginForm from "@components/LoginForm";
import { authenticate } from "@lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      authenticate(user.username, user.password);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <LoginForm
        handleSubmit={loginHandler}
        user={user}
        setUser={setUser}
        submitting={submitting}
      />
    </div>
  );
};

export default Login;
