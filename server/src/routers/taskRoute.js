import express from "express";

//Imports
import {
  createTask,
  deleteTask,
  getAllTasks,
} from "../controllers/task.controller.js";
import taskValidation from "../validators/task.validator.js";
import ValidatorHandler from "../middleware/validator.js";
import authentication from "../middleware/auth.js";
import authorization from "../middleware/authorization.js";

// Router Setup
const TaskRouter = express.Router();

// Task Routes
TaskRouter.post("/create-task", taskValidation, ValidatorHandler, createTask);

TaskRouter.get("/get-all-tasks", getAllTasks);

TaskRouter.delete(
  "/delete-task/:id",
  authentication,
  authorization("ADMIN"),
  deleteTask,
);

// Export Router
export default TaskRouter;
