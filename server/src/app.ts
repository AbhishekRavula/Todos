import express from "express";
import todosRouter from "./routes/todos";
import authRouter from "./routes/auth";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${encodeURIComponent(
      process.env.MONGO_DB_PASSWORD ?? ""
    )}@cluster0.mbrefad.mongodb.net/todoApp?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to db!"))
  .catch((err) => {
    console.log("Error connecting to db", err.message);
  });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/todos", todosRouter);
app.use("/auth", authRouter);

export default app;
