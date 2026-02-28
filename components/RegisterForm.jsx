const RegisterForm = ({ submitting, error, handleSubmit }) => {
  return (
    <section className="min-h-[80vh] pt-25 w-full max-w-full flex-center flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Register</span>
      </h1>

      <form
        action={handleSubmit}
        className="mt-10 w-full max-w-md flex flex-col gap-7 glassmorfism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Username
          </span>

          <input
            placeholder="username"
            required
            className="form_input "
            name="username"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Email
          </span>

          <input
            type="email"
            placeholder="email"
            required
            className="form_input "
            name="email"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Password
          </span>
          <input
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

export default RegisterForm;
