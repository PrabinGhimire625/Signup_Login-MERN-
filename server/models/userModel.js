import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "visitor" },
});

const User = mongoose.model("User", userSchema);
export default User;  // Ensure this is a default export
