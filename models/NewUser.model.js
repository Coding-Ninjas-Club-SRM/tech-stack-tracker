import { Schema, model, models } from "mongoose";

const NewUserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  designation: {
    type: String,
    enum: ["member", "associate", "head", "board"],
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const NewUser = models.NewUser || model("NewUser", NewUserSchema);

export default NewUser;
