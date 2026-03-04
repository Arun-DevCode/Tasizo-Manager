import taskModal from "../model/task.model.js";
import { matchedData } from "express-validator";

// * 1. Create Task
export const createTask = async (req, res) => {
  try {
    const task = matchedData(req); // Validated Data

    // check task exists
    const isTaskFound = taskModal.find({ title: task.title });
    if (isTaskFound.length === 0) {
      throw new Error({
        error: true,
        message: "Already task is exits! Please create a new task",
      });
    }
    // Verify task
    const newTask = await taskModal.create(task);
    console.log(newTask);
    if (!newTask) {
      throw new Error({
        error: true,
        message: "failed to create task! try again later",
      });
    }

    // Respond to client req
    res
      .status(201)
      .json({ error: false, message: "Task created success", data: newTask });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModal.find({}).sort({ createdAt: -1 });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch tasks",
      error: error.message,
    });
  }
};



// @desc    Delete a task
// @route   DELETE /api/task/delete-task/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Attempt to find and delete the document
    const deletedTask = await taskModal.findByIdAndDelete(id);

    // 2. Check if the task existed
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found. It may have already been deleted.",
      });
    }

    // 3. Return success
    res.status(200).json({
      success: true,
      message: "Task successfully removed",
      id: id, // Return ID so frontend can update state easily
    });
  } catch (error) {
    // 4. Handle invalid ObjectIDs or server errors
    console.error("Delete Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not delete task",
      error: error.message,
    });
  }
};


