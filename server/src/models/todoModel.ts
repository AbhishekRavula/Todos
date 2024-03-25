import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

export default model("todo", todoSchema);
