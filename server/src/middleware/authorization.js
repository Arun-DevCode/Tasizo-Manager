import UserModel from "../model/user.model.js";

// Middleware : HOF (Higher Order Function)
const authorization = (permittedRoles) => {
  return async (req, res, next) => {
    try {
      const userEmail = req.user;
      if (!userEmail) {
        throw new Error("Unauthorized: No user found");
      }

      const user = await UserModel.findOne({ email: userEmail }); // User Information : Query response
      if (!user) {
        throw new Error("User not found");
      }

      if (permittedRoles !== user.role) {
        throw new Error("You don't have permission");
      }

      // Permission granted
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
};

export default authorization;
