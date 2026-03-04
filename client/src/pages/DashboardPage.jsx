import React, { useEffect, useState } from "react";
import { Link } from "react-router";

//Actions
import { getAllTasks } from "../api/tasks";
import SearchBar from "../components/Search";
import TaskList from "../components/TaskList";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);

  // Integrate the fetch call we created earlier
  useEffect(() => {
    getAllTasks()
      .then((result) => setTasks(result))
      .catch((err) => console.error("UI Error:", err));
  }, []);

  console.log("TaskState:", tasks);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Wireframe Top Header Bar */}
        <div className="w-full bg-white h-16 rounded-xl shadow-sm mb-10 flex items-center px-6">
          <h1 className="text-xl font-semibold text-gray-700">Task Overview</h1>
        </div>

        <div className="flex items-center justify-between w-full">
          <SearchBar />
          <Link
            to={"/create-task"}
            className="bg-blue-800 text-white font-medium px-5 py-2.5 rounded-sm hover:shadow hover:bg-blue-700"
          >
            Create task +
          </Link>
        </div>

        {/* Task Grid (The 4x2 Layout) */}
        <TaskList taskData={tasks} />
      </div>
    </div>
  );
};

export default TaskDashboard;
