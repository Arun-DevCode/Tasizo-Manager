import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreateTaskForm = () => {
  // pre Dat format option
  const options = {
    day: "2-digit", // 03
    month: "2-digit",
    year: "numeric",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "Not Completed",
      AssignTo: "65e1f7a2b3d1c2a3e4f56789",
      createdAt: new Date().toLocaleDateString("en-GB", options),
      deadLine: new Date().toLocaleDateString("en-GB", options),
    },
  });

  const onSubmit = async (data) => {
    try {
      // API call to your Node/Express backend
      const response = await axios.post(
        "http://localhost:4000/api/task/create-task",
        {
          ...data,
          createdAt: new Date(data.createdAt).toLocaleDateString(
            "en-GB",
            options,
          ),
          deadLine: new Date(data.createdAt).toLocaleDateString(
            "en-GB",
            options,
          ),
        },
      );

      if (response.status === 201 || response.status === 200) {
        alert("Task created successfully!");
        reset(); // Clears the form on success
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Something went wrong while creating the task.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg border border-gray-100">
        <div className="bg-slate-800 p-6 rounded-t-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">
            Add New Task
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Task Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Min 3 characters" },
              })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                errors.title ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <span className="text-red-500 text-xs italic">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Min 10 characters" },
                maxLength: { value: 250, message: "Max 250 characters" },
              })}
              rows="3"
              className={`w-full px-4 py-2 bg-gray-50 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                errors.description ? "border-red-400" : "border-gray-200"
              }`}
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-xs italic">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* CreatedAt */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Creation Date
              </label>
              <input
                type="date"
                {...register("createdAt")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none"
              />
            </div>
            {/* Deadline */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Deadline
              </label>
              <input
                type="date"
                {...register("deadLine")}
                className={`w-full px-4 py-2 bg-gray-50 border rounded-md text-sm outline-none ${
                  errors.deadLine ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none"
              >
                <option value="Not Completed">Not Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            {/* AssignTo */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Assignee ID
              </label>
              <input
                {...register("AssignTo")}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md text-xs"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-md font-bold text-white transition-all ${
              isSubmitting
                ? "bg-gray-400 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {isSubmitting ? "Creating..." : "Save Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
