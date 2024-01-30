const LoginForm = ({ user, setUser, submitting, handleSubmit }) => {
  return (
    <section className="min-h-[80vh] pt-[100px] w-full max-w-full flex-center flex-col">
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
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            required
            className="form_input "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Password
          </span>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? "Submitting..." : "Log In"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
