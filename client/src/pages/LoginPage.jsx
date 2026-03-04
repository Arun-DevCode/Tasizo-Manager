import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

// Import: Components
import FieldError from "../components/FieldError";

// Action : User Login
import { UserLoginAction } from "../api/user";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "USER", // Defaulting to USER is common for login
    },
  });

  // Navigate
  const navigate = useNavigate();

  // Form Submission Logic
  const onLogin = async (data) => {
    const { error, message, token } = await UserLoginAction(data);

    // Error handling
    if (error === true) {
      alert(message);
    }

    // Validation
    if (!token) {
      alert("Failed to Login User");
    }

    // Store in Local Storage
    localStorage.setItem("accessToken", token);

    // Redirection to Dashboard Page
    // redirect("/dashboard");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 transition duration-200 outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <FieldError message={errors.email?.message} />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-1">
              <label
                htmlFor="password"
                class="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              className={`block w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 transition duration-200 outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <FieldError message={errors.password?.message} />
          </div>

          {/* Role Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-700"
            >
              Login As
            </label>
            <div className="relative mt-1">
              <select
                {...register("role", { required: "Please select a role" })}
                className={`block w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 appearance-none transition duration-200 outline-none cursor-pointer focus:ring-2 ${
                  errors.role
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="" disabled>
                  Select a role...
                </option>
                <option value="USER">Standard User</option>
                <option value="ADMIN">Administrator</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <FieldError message={errors.role?.message} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:bg-blue-400"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
