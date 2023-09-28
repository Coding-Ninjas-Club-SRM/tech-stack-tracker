import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    requireD: true,
  },
  password: {
    type: String,
    default: null,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  techStack: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    enum: ["member", "associate", "head", "board"],
    required: true,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
