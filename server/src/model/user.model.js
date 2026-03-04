import mongoose from "mongoose";

// User Schema
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    require: true,
    default: "USER",
  },
});

// User Collection
const UserModel = mongoose.model("users", UserSchema);

//Indexing - User (Single Field Indexing)
UserSchema.index({ email: 1 });

export default UserModel;
