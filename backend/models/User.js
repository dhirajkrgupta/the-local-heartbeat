import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const UserModel= mongoose.model("User", UserSchema);
export default UserModel;
