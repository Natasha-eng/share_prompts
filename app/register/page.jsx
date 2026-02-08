"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@lib/actions";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const handleInput = (e) => {
    setError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!user.username || !user.email || !user.password) {
      setError("Must provide all the credentials");
    }

    try {
      setSubmitting(true);
      const res = await register(
        user.username.trim(),
        user.email.trim(),
        user.password.trim(),
      );

      if (res?.user?.username) {
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-[80vh] pt-[100px] w-full max-w-full flex-center flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Register</span>
      </h1>

      <form
        onSubmit={registerHandler}
        className="mt-10 w-full max-w-md flex flex-col gap-7 glassmorfism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Username
          </span>

          <input
            name="username"
            value={user.username}
            onChange={(e) => handleInput(e)}
            placeholder="username"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Email
          </span>

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleInput(e)}
            placeholder="email"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Password
          </span>
          <input
            value={user.password}
            name="password"
            onChange={(e) => handleInput(e)}
            type="password"
            placeholder="password"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-orange-400 hover:bg-orange-500 rounded-full text-white"
          >
            {submitting ? "Submitting..." : "Log In"}
          </button>
        </div>
        {error && (
          <span className="font-sans text-orange-700 font-bold">{error}</span>
        )}
      </form>
    </section>
  );
};

export default Register;
