"use client";

import LoginForm from "@components/LoginForm";
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
      const res = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
        }
      );

      const data = await res.json();

      if (data) {
        router.push("/");
      }
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
