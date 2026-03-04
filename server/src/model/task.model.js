import mongoose from "mongoose";

// Task Schema
const taskSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    minLength: 3,
  },
  description: {
    type: String,
    require: true,
    minLength: 10,
    maxLength: 250,
  },
  createdAt: {
    type: String,
    require: true,
  },
  deadLine: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: "Not Completed",
    enum: ["Not Completed", "Completed", "In Progress"],
  },
  AssignTo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    default: "65e1f7a2b3d1c2a3e4f56789",
  },
});

// Modal Create
const taskModal = mongoose.model("tasks", taskSchema);

export default taskModal;
