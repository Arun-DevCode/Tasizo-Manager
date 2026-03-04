import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

async function authentication(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1]; // token
  if (!accessToken) {
    return res.status(403).json({ message: "Access Denied!", error: true });
  }

  // Verify : Signature
  const decodedToken = jwt.verify(accessToken, "entri@2026");
  if (!decodedToken) {
    return res.json("Unauthorized user. please contact admin");
  }
  // Check user exits
  const isUserFound = await UserModel.findOne({ email: decodedToken.email });

  if (!isUserFound) {
    return res.json("Insufficient Access.");
  }

  // Forward User data to next function - Via Request{user : {}}
  req.user = isUserFound.email;

  // Req forward to next function
  next();
}

export default authentication;
