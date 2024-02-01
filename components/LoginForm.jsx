import Link from "next/link";

const LoginForm = ({
  handleInputChange,
  error,
  user,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="min-h-[80vh] pt-[100px] w-full max-w-full flex-center flex-col">
      <div>
        create your own account or use credentials:
        <div>username: Natasha</div>
        <div> password: 123</div>
      </div>
      <h1 className="head_text text-left">
        <span className="blue_gradient">Log In</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-md flex flex-col gap-7 glassmorfism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Username
          </span>

          <input
            value={user.username}
            onChange={(e) => handleInputChange(e)}
            placeholder="username"
            required
            className="form_input "
            name="username"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Password
          </span>
          <input
            value={user.password}
            onChange={(e) => handleInputChange(e)}
            type="password"
            placeholder="password"
            required
            className="form_input"
            name="password"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? "Submitting..." : "Log In"}
          </button>
        </div>
      </form>
      <div>
        Don&apos;t have an account?{" "}
        <Link className="text-teal-600" href="/register">
          Create an account
        </Link>{" "}
      </div>
      {error && (
        <span className="font-sans text-orange-700 font-bold">{error}</span>
      )}
    </section>
  );
};

export default LoginForm;
