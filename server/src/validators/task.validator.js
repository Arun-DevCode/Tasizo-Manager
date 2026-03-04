import { body } from "express-validator";

// title
const title = body("title")
  .notEmpty()
  .withMessage("Title is required!")
  .isString()
  .isLength({ min: 3 })
  .withMessage("Title should be at least 3 characters.");

const description = body("description")
  .notEmpty()
  .withMessage("Description is required!")
  .isString()
  .isLength({ min: 3 })
  .withMessage("Description should be at least 10 to 250 characters.");

const createdAt = body("createdAt")
  .notEmpty()
  .withMessage("createdAt is required!")
  .isString()
  .isDate({ format: "DD/MM/YYYY" })
  .withMessage("Invalid Date Format");

const deadLine = body("deadLine")
  .notEmpty()
  .withMessage("Deadline is required!")
  .isDate({ format: "DD/MM/YYYY" })
  .withMessage("Invalid Date Format. Use DD/MM/YYYY");

const status = body("status")
  .notEmpty()
  .withMessage("status is required!")
  .isString();

const AssignTo = body("AssignTo")
  .notEmpty()
  .withMessage("Please assign someone to task!")
  .isString()
  .isMongoId();

// Task Validator Rule
const taskValidation = [
  title,
  description,
  createdAt,
  deadLine,
  status,
  AssignTo,
];

export default taskValidation;
