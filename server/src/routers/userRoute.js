import express from "express";

//Imports
import {
  createUserAccount,
  UserLogin,
} from "../controllers/user.controller.js";
import UserDataValidation from "../validators/users.validator.js";
import ValidatorHandler from "../middleware/validator.js"; // Incoming Data Validate
import UserModal from "../model/user.model.js";
import authentication from "../middleware/auth.js";
import authorization from "../middleware/authorization.js";

// Router Setup
const UserRouter = express.Router();

// User Routes

// 1. Create User Account
UserRouter.post(
  "/create-account",
  UserDataValidation,
  ValidatorHandler,
  createUserAccount,
);

// 2. Access User Account
UserRouter.post("/login", UserLogin);

// 3. Get User By Name
UserRouter.get("/get-user", authentication, async (req, res) => {
  const email = req.user; // User Email

  const user = await UserModal.findOne({
    email,
  });

  if (!user) {
    return res.json({ error: true, message: "No User Found" });
  }

  res.json({
    error: false,
    message: "User Found",
    data: { name: user.name, email: user.email, role: user.role },
  });
});

// Export Router
export default UserRouter;
