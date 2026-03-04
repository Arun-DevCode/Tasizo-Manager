import axios from "axios";

export const getAllTasks = async () => {
  try {
    const response = await fetch(
      "https://api-tasizomanager.onrender.com/api/task/get-all-tasks",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // If you use JWT authentication, add it here:
          // 'Authorization': `Bearer ${token}`
        },
      },
    );

    // Check if the server responded
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json(); // Conversion JSON -> Object

    return result.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error.message);
    return null;
  }
};

export const deleteTask = async (id) => {
  console.log("taskID :", id);
  // 1. Confirm with the user
  if (!window.confirm("Are you sure you want to delete this task?")) {
    return;
  }

  try {
    // 2. Make the API call
    const response = await axios.delete(
      `https://api-tasizomanager.onrender.com/api/task/delete-task/${id}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    );

    if (response.status === 200) {
      alert("Task deleted successfully!");

      // 3. Update the UI locally (assuming 'tasks' is your state)
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
    alert("Failed to delete the task. Please try again.");
  }
};
