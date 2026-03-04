import UserModel from "../model/user.model.js";
import {
  compareHashPassword,
  generateHashedPassword,
} from "../utils/generateHash.js";
import { generateAccessToken } from "../utils/jwt.js";

// Create Account
export const createUserAccount = async (req, res) => {
  const { name, email, password, role } = req.body; // name , email ,password,role
  console.log(req.body.role);
  try {
    // Data Validation
    if (!role || !name || !email || !password) {
      // Stop Execution
      throw new Error({
        message: "Please fill all the required fields.",
      });
    }

    //Check user exists & Store
    const isUserFound = await UserModel.findOne({ email: email });
    if (isUserFound) {
      throw new Error("User already exits. Please go to login.");
    }

    // Hashing Password - Sensitive Info
    const hashedPassword = await generateHashedPassword(password);
    console.log(hashedPassword);
    if (!hashedPassword) {
      throw new Error("failed to generate hash Password!");
    }

    const newUser = await UserModel.insertOne({
      name: name,
      email: email,
      role,
      password: hashedPassword,
    });

    console.log(newUser);

    if (!newUser) {
      throw new Error("Failed to create user account. Please try again later.");
    }
    // Respond to client req
    res.json({
      error: false,
      message: "User Created Success..",
      user: newUser,
    });
  } catch (error) {
    if (error) {
      // Respond to client
      res.json({
        error: true,
        message: error.message,
      });
      return;
    }
  }
};

// User Login into account
export const UserLogin = async (req, res) => {
  const user = req.body; // raw password
  try {
    // Data Validation
    if (!user) {
      // Stop Execution
      throw new Error({
        message: "Please fill all the required fields.",
      });
    }

    // Check user exists
    const isUserFound = await UserModel.findOne({ email: user.email }); // get user details
    if (!isUserFound) {
      throw new Error(`No User Found ${user.email}`);
    }

    // Password Comparison : Check User Credentials + validate
    const { error } = await compareHashPassword(
      user.password,
      isUserFound.password,
    );
    if (error) {
      throw new Error("Invalid Credentials!");
    }

    // Generate Secret or Access Token
    const accessToken = generateAccessToken({ email: user.email });
    if (!accessToken) {
      throw new Error("Internal Server error!");
    }

    // Respond to client req
    res.json({
      error: false,
      message: "User Logged In Success..",
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    if (error) {
      // Respond to client
      res.json({
        error: true,
        message: error,
      });
      return;
    }
  }
};
