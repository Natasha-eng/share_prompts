"use client";

import LoginForm from "@components/LoginForm";
import { authenticate } from "@lib/actions";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setError("");
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const res = await authenticate(
        user.username.trim(),
        user.password.trim()
      );
    } catch (err) {
      setError(err.message);
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
        error={error}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default Login;
