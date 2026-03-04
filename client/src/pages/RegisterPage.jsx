import { useForm } from "react-hook-form";

//Import:Components
import FieldError from "../components/FieldError";

// Action : CreateUserAccount
import { CreateUserAccount } from "../api/user";

function RegisterPage() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  // Form Submission
  const FormSubmit = async (UserData) => {
    const { error, user, message } = await CreateUserAccount(UserData);

    // Error handling
    if (error === true) {
      alert(message);
    }
    console.log("Form Submission:", user);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        <form
          method="POST"
          className="space-y-5"
          onSubmit={handleSubmit(FormSubmit)}
        >
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required!",
              })}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${
                errors.name
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <FieldError message={errors.name?.message} />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="john@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <FieldError message={errors.email?.message} />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <FieldError message={errors.password?.message} />
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Role
            </label>
            <select
              {...register("role", {
                required: "Please select a role!",
              })}
              className={`w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 outline-none transition-all appearance-none cursor-pointer ${
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
            <FieldError message={errors.role?.message} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98]"
          >
            {isSubmitting ? "Registering..." : "Register User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
