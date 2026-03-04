import validator from "express-validator";

// User Data Validation - name , password , email

const nameValid = validator
  .body("name")
  .notEmpty()
  .withMessage("Name is required!")
  .isString()
  .withMessage("Name should be alphabets");

const UserDataValidation = [nameValid];
export default UserDataValidation;
