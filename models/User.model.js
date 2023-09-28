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
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    enum: ["web", "app", "aiml", "cp"],
    required: true,
  },
  techStack: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: ["member", "associate", "head", "board"],
    required: true,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
